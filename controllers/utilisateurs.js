const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const bcrypt = require('bcryptjs');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const recall = require('./utils/recall');


exports.consulter_tous_les_utilisateurs = catchAsync(async (req, res, next) => {

    const utilisateurs = await models.Utilisateur.findAll({});

    var users = []
    utilisateurs.forEach( async (user,index) => {
        let obj = {id: user.id, nom: user.nom, prenom: user.prenom, cin: user.cin, email: user.email, image: user.image, telephone: user.telephone};
        const roles = await models.sequelize.query("SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur",
        { 
            replacements: { utilisateur: user.id },
            type: models.sequelize.QueryTypes.SELECT 
        });

        obj.roles = roles;
        users.push(obj);
        
        if(index >= (utilisateurs.length - 1)){
            res.status(200).json({
                status: 'success',
                results: users.length,
                utilisateurs: users
            });
        }
    });

    
    pubsub.publish('UTILISATEURS', { utilisateurs: recall.findAllUsers() });
  
    if(!utilisateurs){
       return next(new AppError('No users found.', 404));
    }
    
});

exports.consulter_utilisateur = catchAsync(async (req, res, next) => {
    const utilisateur = await models.Utilisateur.findByPk(req.params.id);
  
    if(!utilisateur){
      return next(new AppError('No user with this ID.',404));
    }

    pubsub.publish('UTILISATEURS', { utilisateurs: recall.findAllUsers() });
   
   res.status(200).json({
      status: 'success',
      utilisateur
   });
});

exports.ajout_utilisateur = catchAsync(async (req, res, next) => {

    if(req.body.password){
        const password = await bcrypt.hash(req.body.password, 12);
        req.body.password = password;
    }

    const nouveau_utlisateur = await models.Utilisateur.create({id: uuidv4(), ...req.body });
  
    if(!nouveau_utlisateur){
       return next(new AppError('Invalid fields or duplicate user', 401));
    }

    pubsub.publish('UTILISATEURS', { utilisateurs: recall.findAllUsers() });
  
    res.status(201).json({
        status: 'success',
        nouveau_utlisateur
    });

});

exports.modifier_utilisateur = catchAsync(async(req, res, next) => {

    if(req.body.password){
        const password = await bcrypt.hash(req.body.password, 12);
        req.body.password = password;
    }

    const utlisateur = await models.Utilisateur.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No user found with this ID', 404));
    }

    pubsub.publish('UTILISATEURS', { utilisateurs: recall.findAllUsers() });
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.modifier_profile = catchAsync(async(req, res, next) => {

    if(req.file.filename){
        req.body.image = req.file.filename;
    }

    if(req.body.password){
        const password = await bcrypt.hash(req.body.password, 12);
        req.body.password = password;
    }

    const utlisateur = await models.Utilisateur.update(req.body, { where: { id: req.user.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No user found with this ID', 404));
    }

    pubsub.publish('UTILISATEURS', { utilisateurs: recall.findAllUsers() });
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_utilisateur = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Utilisateur.destroy({ where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No user found with this ID', 404));
    }
  
    pubsub.publish('UTILISATEURS', { utilisateurs: recall.findAllUsers() });

    res.status(203).json({
        status: 'success',
    });
});

exports.utilisateurResolvers = {
    Query: {
      utilisateurs: async (_, __,{user}) => {
        
      try{

        if(!user){
          throw new AppError('You are not logged In ! Please log in to get access.',401);
        }else {
          models.Utilisateur.findByPk(user.payload.id).then((user) => console.log(user)).catch((err) => {throw new AppError('The user belonging to this token does not exist.',401);});
        }
        
        const utilisateurs = await models.Utilisateur.findAll();

        var users = [];
        for( const user of utilisateurs ){

          let obj = {id: user.id, nom: user.nom, prenom: user.prenom, cin: user.cin, email: user.email, image: user.image, telephone: user.telephone};
          const roles = await models.sequelize.query("SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur",
          { 
              replacements: { utilisateur: user.id },
              type: models.sequelize.QueryTypes.SELECT 
          });

          obj.roles = roles;
          users.push(obj);

        }
        
        return users;

      }catch(error){
        throw error
      }

    },
      
    },
    Subscription: {
        utilisateurs: {
          subscribe: () => pubsub.asyncIterator(['UTILISATEURS'])
        }
    }
}
