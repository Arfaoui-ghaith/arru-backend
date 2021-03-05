const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const recall = require('./utils/recall');

exports.consulter_tous_les_roles = catchAsync(async (req, res, next) => {

    const roles = await models.Role.findAll({});
  
    if(!roles){
       return next(new AppError('No roles found.', 404));
    }

    var roles_specifications_fonctionalites = []
    roles.forEach( async (role,index) => {
        let obj = {id: role.id, titre: role.titre};
        const specification = await models.sequelize.query("SELECT s.titre FROM `roles` as r, `roles_specifications` as rs, `specifications` as s WHERE r.id = :role AND r.id = rs.role_id AND rs.specification_id = s.id",
        { 
            replacements: { role: role.id },
            type: models.sequelize.QueryTypes.SELECT 
        });

        const fonctionalites = await models.sequelize.query("SELECT f.titre FROM `roles` as r, `roles_fonctionalités` as rf, `fonctionalités` as f WHERE r.id = :role AND r.id = rf.role_id AND rf.fonctionalite_id = f.id",
        { 
            replacements: { role: role.id },
            type: models.sequelize.QueryTypes.SELECT 
        });

        obj.specification = specification;
        obj.fonctionalites = fonctionalites
        roles_specifications_fonctionalites.push(obj);
        
        if(index >= (roles.length - 1)){
            res.status(200).json({
                status: 'success',
                results: roles_specifications_fonctionalites.length,
                roles: roles_specifications_fonctionalites
            });
        }
    });
    
    pubsub.publish('ROLES', { roles: await recall.findAllRoles() });
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

    const nouveau_role = await models.Role.create({id: uuidv4(), ...req.body});

    console.log(nouveau_role);
  
    if(!nouveau_role){
       return next(new AppError('Invalid fields or duplicate role', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_role
    });

});

exports.modifier_role = catchAsync(async(req, res, next) => {

    const role = await models.Role.update(req.body, { where: { id: req.params.id } });
  
    if(!role){
       return next(new AppError('Invalid fields or No role found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});


exports.supprimer_role = catchAsync(async(req, res, next) => {

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