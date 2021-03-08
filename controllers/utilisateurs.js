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

    const roles = await models.sequelize.query("SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur",
    { 
        replacements: { utilisateur: utilisateur.id },
        type: models.sequelize.QueryTypes.SELECT 
    });
    
    

    var roles_specifications = [];
    let obj = {id: utilisateur.id, nom: utilisateur.nom, prenom: utilisateur.prenom, cin: utilisateur.cin, email: utilisateur.email, image: utilisateur.image, telephone: utilisateur.telephone};
    roles.forEach( async (role,index) => {
    
    let specification = await models.sequelize.query("SELECT s.titre FROM `roles` as r, `roles_specifications` as rs, `specifications` as s WHERE r.id = :role AND r.id = rs.role_id AND rs.specification_id = s.id",
    { 
        replacements: { role: role.id || "" },
        type: models.sequelize.QueryTypes.SELECT 
    });

        role.specification = specification
        roles_specifications.push(role);

        if(index >= (roles.length - 1)){
            obj.roles = {...roles_specifications};
            res.status(200).json({
                status: 'success',
                utilisateur: obj
            });
        }

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

    pubsub.publish('UTILISATEURS', { utilisateurs: await recall.findAllUsers() });
  
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

    console.log("in modifierr!!",req.file);

    if(req.file){
        if(req.file.filename) {
            req.body.image = req.file.filename;
        }
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

exports.update_password = catchAsync(async(req, res, next) => {

    if(req.body.currentPassword){
        if (!(await bcrypt.compare(req.body.currentPassword, req.user.password))){
            return next(new AppError('Incorrect current password! please try again.', 401));
        }
    } else {
        return next(new AppError('you didnt tell us your current password! please try again.', 401));
    }

    if(req.body.password){
        const password = await bcrypt.hash(req.body.password, 12);
        req.body.password = password;
    }else{
        return next(new AppError('you didnt tell us your new password! please try again.', 401));
    }

    const utlisateur = await models.Utilisateur.update({ password: req.body.password }, { where: { id: req.user.id } });
  
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
      utilisateurs: async (_, __,{id}) => {
        
      try{
        
        const utilisateurs = await models.Utilisateur.findAll();

        var users = [];
        for( const user of utilisateurs ){

          let obj = {id: user.id, nom: user.nom, prenom: user.prenom, cin: user.cin, email: user.email, image: user.image, telephone: user.telephone};
          const roles = await models.sequelize.query("SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur",
          { 
              replacements: { utilisateur: id },
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
            subscribe: async (_,__,{id}) => {

                const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter tous les utilisateurs" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }

                return pubsub.asyncIterator(['UTILISATEURS']);
            }
        }
    }
}

