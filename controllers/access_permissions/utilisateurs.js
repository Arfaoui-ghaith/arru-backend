const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');

const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const bcrypt = require('bcryptjs');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const publishUtilisateurs = async() => {
    let utilisateurs = await models.Utilisateur.findAll({
        include: { model: models.Utilisateures_roles, as: 'roles',
            attributes: ['id'],
            include: { model: models.Role, as:'role', attributes: ['titre'] } 
        }
    });
    
    pubsub.publish('UTILISATEURS', { utilisateurs });
}


exports.consulter_tous_les_utilisateurs = catchAsync(async (req, res, next) => {

    const utilisateurs = await models.Utilisateur.findAll({
        include: { model: models.Utilisateures_roles, as: 'roles',
            attributes: ['id'],
            include: { model: models.Role, as:'role', attributes: ['titre'] } 
        }
    });

    if(!utilisateurs){
        return next(new AppError('No users found.', 404));
    }
  
    await publishUtilisateurs();

    res.status(200).json({
        status: 'success',
        results: utilisateurs.length,
        utilisateurs
    });
});

exports.consulter_utilisateur = catchAsync(async (req, res, next) => {

    const utilisateur = await models.Utilisateur.findByPk(req.params.id);

    if(!utilisateur){
        return next(new AppError('No user with this ID.',404));
      }

      const roles = await models.sequelize.query(
        "SELECT r.titre, (SELECT s.titre from `specifications` as s where ur.specification_id = s.id ) as specification FROM `roles` as r, `utilisateures_roles` as ur "
        +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur ",
        { 
            replacements: { utilisateur: utilisateur.id },
            type: models.sequelize.QueryTypes.SELECT
        }
      );
    
      const interfaces = await models.sequelize.query(
        "SELECT i.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_interfaces` as ri,`interfaces` as i WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = ri.role_id AND ri.interface_id = i.id ",
        { 
            replacements: { utilisateur: utilisateur.id },
            type: models.sequelize.QueryTypes.SELECT
        }
      );
    
      const utilisateurInfo = { id: utilisateur.id, cin: utilisateur.cin, nom: utilisateur.nom, prenom: utilisateur.prenom, email: utilisateur.email, telephone: utilisateur.telephone, image: utilisateur.image, roles, interfaces }

      res.status(200).json({
          status: "success",
          utilisateur: utilisateurInfo
      })
});

exports.ajout_utilisateur = catchAsync(async (req, res, next) => {

    if(req.body.utilisateur.password){
        const password = await bcrypt.hash(req.body.utilisateur.password, 12);
        req.body.utilisateur.password = password;
    }

    const nouveau_utilisateur = await models.Utilisateur.create({id: uuidv4(), ...req.body.utilisateur });
    
    if(req.body.relations){
        let relations = [];
		for(const relation of req.body.relations){
			let obj = { id: uuidv4(), role_id: relation.role_id, specification_id: relation.specification_id !== undefined ? relation.specification_id : null, utilisateur_id: nouveau_utilisateur.id }
			relations.push(obj);
		}

        models.Utilisateures_roles.bulkCreate(relations).then(async () => {
            await publishUtilisateurs();

            res.status(201).json({
                status: 'success',
                nouveau_utilisateur
            });
            
        }).catch((err) => console.log(err));
    }else{
        return next(new AppError('User must have at least one role', 401));
    }
  
    if(!nouveau_utilisateur){
       return next(new AppError('Invalid fields or duplicate user', 401));
    }

});

exports.modifier_utilisateur = catchAsync(async(req, res, next) => {

    if(req.body.utilisateur.password){
        const password = await bcrypt.hash(req.body.utilisateur.password, 12);
        req.body.utilisateur.password = password;
    }

    const utilisateur = await models.Utilisateur.update(req.body.utilisateur, { where: { id: req.params.id } });
  
    if(!utilisateur){
       return next(new AppError('Invalid fields or No user found with this ID', 404));
    }

    console.log(utilisateur);

    if(req.body.relations){
        
        await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        models.Utilisateures_roles.destroy({ where: { utilisateur_id: req.params.id } });
        await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        
        if(req.body.relations.length > 0){
            let relations = [];
            for(const relation of req.body.relations){
                let obj = { id: uuidv4(), role_id: relation.role_id, specification_id: relation.specification_id !== undefined ? relation.specification_id : null, utilisateur_id: req.params.id }
                relations.push(obj);
            }
            
            console.log(relations)
            models.Utilisateures_roles.bulkCreate(relations).then((res) => console.log("res**************")).catch((err) => console.log(err));
        }
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

    const utilisateur = await models.Utilisateur.update(req.body, { where: { id: req.user.id } });
  
    if(!utilisateur){
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

    const utilisateur = await models.Utilisateur.update({ password: req.body.password }, { where: { id: req.user.id } });
  
    if(!utilisateur){
       return next(new AppError('Invalid fields or No user found with this ID', 404));
    }

    pubsub.publish('UTILISATEURS', { utilisateurs: recall.findAllUsers() });
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_utilisateur = catchAsync(async(req, res, next) => {

    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    const utilisateur = await models.Utilisateur.destroy({ where: { id: req.params.id } });
  
    if(!utilisateur){
       return next(new AppError('Invalid fields or No user found with this ID', 404));
    }

    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  
    pubsub.publish('UTILISATEURS', { utilisateurs: recall.findAllUsers() });

    res.status(203).json({
        status: 'success',
    });
});

exports.utilisateurResolvers = {
    Subscription: {
        utilisateurs: {
            subscribe: async (_,__,{id}) => {

                /*const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter tous les utilisateurs" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {
                       throw new AppError('You do not have permission to perform this action', 403);
                }*/

                return pubsub.asyncIterator(['UTILISATEURS']);
            }
        }
    }
}

