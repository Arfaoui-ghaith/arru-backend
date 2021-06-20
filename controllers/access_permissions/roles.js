const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

exports.consulter_tous_les_roles = catchAsync(async (req, res, next) => {

    const roles = await models.Role.findAll({});
    
    if(roles.length == 0){
       return next(new AppError('No roles found.', 404));
    }

    /*var roles_specifications_fonctionalites = []
    for(const  role of roles){
        
        let obj = {id: role.id, titre: role.titre};
        const specification = await models.sequelize.query("SELECT s.id, s.titre FROM `roles` as r, `roles_specifications` as rs, `specifications` as s WHERE r.id = :role AND r.id = rs.role_id AND rs.specification_id = s.id",
        { 
            replacements: { role: role.id },
            type: models.sequelize.QueryTypes.SELECT 
        });
        
        const fonctionalites = await models.sequelize.query("SELECT f.id, f.titre FROM `roles` as r, `roles_fonctionalites` as rf, `fonctionalites` as f WHERE r.id = :role AND r.id = rf.role_id AND rf.fonctionalite_id = f.id",
        { 
            replacements: { role: role.id },
            type: models.sequelize.QueryTypes.SELECT 
        });

        const interfaces = await models.sequelize.query("SELECT i.id, i.titre FROM `roles` as r, `roles_interfaces` as ri, `interfaces` as i WHERE r.id = :role AND r.id = ri.role_id AND ri.interface_id = i.id",
        { 
            replacements: { role: role.id },
            type: models.sequelize.QueryTypes.SELECT 
        });
        
        obj.interfaces = interfaces;
        obj.specification = specification;
        obj.fonctionalites = fonctionalites;
        roles_specifications_fonctionalites.push(obj);  
    }*/
    
    //pubsub.publish('ROLES', { roles: await recall.findAllRoles() });

    res.status(200).json({
        status: 'success',
        results: roles_specifications_fonctionalites.length,
        roles: roles_specifications_fonctionalites
    });

});

exports.consulter_role = catchAsync(async (req, res, next) => {

    const role = await models.Role.findByPk(req.params.id);
  
    if(!role){
      return next(new AppError('No user with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      role
   });

});

exports.ajout_role = catchAsync(async (req, res, next) => {

    console.log({id: uuidv4(), ...req.body});

    const nouveau_role = await models.Role.create({id: uuidv4(), titre: req.body.titre});

    console.log(nouveau_role);
  
    if(!nouveau_role){
       return next(new AppError('Invalid fields or duplicate role', 401));
    }

    if(req.body.relations.fonctionalites && req.body.relations.fonctionalites.length > 0){
        
        let relations = [];
		for(const fonctionalite_id of req.body.relations.fonctionalites){
			let obj = { id: uuidv4(), role_id: nouveau_role.id, fonctionalite_id }
			relations.push(obj);
		}
        
        console.log(relations)
        models.Roles_fonctionalités.bulkCreate(relations).then(() => console.log("res")).catch((err) => console.log(err));

    }

    if(req.body.relations.interfaces && req.body.relations.interfaces.length > 0){
        
        let relations = [];
		for(const interface_id of req.body.relations.interfaces){
			let obj = { id: uuidv4(), role_id: nouveau_role.id, interface_id }
			relations.push(obj);
		}
        
        console.log(relations)
        models.Roles_Interfaces.bulkCreate(relations).then(() => console.log("res")).catch((err) => console.log(err));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_role
    });

});

exports.modifier_role = catchAsync(async(req, res, next) => {

    const role = await models.Role.update({...req.body.role}, { where: { id: req.params.id } });
  
    if(!role){
       return next(new AppError('Invalid fields or No role found with this ID', 404));
    }

    console.log(role);

    if(req.body.relations.fonctionalites){
        
        await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        const d1 = await models.Roles_fonctionalités.destroy({ where: { role_id: req.params.id } });
        await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        
        if(req.body.relations.fonctionalites.length > 0){
            let relations = [];
            for(const fonctionalite_id of req.body.relations.fonctionalites){
                let obj = { id: uuidv4(), role_id: req.params.id, fonctionalite_id }
                relations.push(obj);
            }
            
            console.log(relations)
            models.Roles_fonctionalités.bulkCreate(relations).then(() => console.log("res")).catch((err) => console.log(err));
        }

    }

    if(req.body.relations.interfaces){
        
        await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        const d2 = await models.Roles_Interfaces.destroy({ where: { role_id: req.params.id } });
        await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        
        if(req.body.relations.interfaces.length > 0){
            let relations = [];
            for(const interface_id of req.body.relations.interfaces){
                let obj = { id: uuidv4(), role_id: req.params.id, interface_id }
                relations.push(obj);
            }
            
            console.log(relations)
            models.Roles_Interfaces.bulkCreate(relations).then(() => console.log("res")).catch((err) => console.log(err));
        }

    }

    if(req.body.relations.specifications){
        
        await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        const d3 = await models.Roles_specifications.destroy({ where: { role_id: req.params.id } });
        await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        
        if(req.body.relations.specifications.length > 0){
            let relations = [];
            for(const specification_id of req.body.relations.specifications){
                let obj = { id: uuidv4(), role_id: req.params.id, specification_id }
                relations.push(obj);
            }
            
            console.log(relations)
            models.Roles_specifications.bulkCreate(relations).then(() => console.log("res")).catch((err) => console.log(err));
        }

    }
  
    res.status(203).json({
        status: 'success',
    });
    
});


exports.supprimer_role = catchAsync(async(req, res, next) => {

    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    const role = await models.Role.destroy({ where: { id: req.params.id } });
  
    if(!role){
       return next(new AppError('Invalid fields or No role found with this ID', 404));
    }

    
  
    res.status(203).json({
        status: 'success',
    });

});


exports.rolesResolvers = {
    Subscription: {
        roles: {
          subscribe: () => pubsub.asyncIterator(['ROLES'])
        }
    }
}