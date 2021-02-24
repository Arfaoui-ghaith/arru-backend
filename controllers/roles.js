const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


exports.consulter_tous_les_roles = catchAsync(async (req, res, next) => {

    const roles = await models.Role.findAll({});
  
    if(!roles){
       return next(new AppError('No roles found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: roles.length,
        roles
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

    const nouveau_role = await models.Role.create({id: uuidv4(), ...req.body});
  
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