const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.consulter_tous_les_roles_specifications = catchAsync(async (req, res, next) => {

    const roles_specifications = await models.Roles_specifications.findAll({});
  
    if(!roles_specifications){
       return next(new AppError('No fonctionalites_roles found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: roles_specifications.length,
        roles_specifications
    });
    
});

exports.consulter_role_specification = catchAsync(async (req, res, next) => {

    const role_specification = await models.Roles_specifications.findByPk(req.params.id);
  
    if(!role_specification){
      return next(new AppError('No role_specification with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      role_specification
   });

});

exports.ajout_role_specification = catchAsync(async (req, res, next) => {

    const nouveau_role_specification = await models.Roles_specifications.create({id: uuidv4(), ...req.body});
  
    if(!nouveau_role_specification){
       return next(new AppError('Invalid fields or duplicate role_specification', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_role_specification
    });

});

exports.modifier_role_specification = catchAsync(async(req, res, next) => {

    const role_specification = await models.Roles_specifications.update(req.body, { where: { id: req.params.id } });
  
    if(!role_specification){
       return next(new AppError('Invalid fields or No role_specification found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_role_specification = catchAsync(async(req, res, next) => {

    const role_specification = await models.Roles_specifications.destroy({ where: { id: req.params.id } });
  
    if(!role_specification){
       return next(new AppError('Invalid fields or No role_specification found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });

});