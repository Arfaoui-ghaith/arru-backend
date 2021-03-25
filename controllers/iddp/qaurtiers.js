const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.consulter_tous_les_quartiers = catchAsync(async (req, res, next) => {

    const quartiers = await models.Quartier.findAll({});
  
    if(!quartiers){
       return next(new AppError('No quartiers found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: quartiers.length,
        quartiers
    });
});

exports.consulter_quartier = catchAsync(async (req, res, next) => {
    const quartier = await models.Quartier.findByPk(req.params.id);
  
    if(!quartier){
      return next(new AppError('No quartier with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      quartier
   });
});

exports.ajout_quartier = catchAsync(async (req, res, next) => {

    const nouveau_quartier = await models.Quartier.create({id: uuidv4(),...req.body});
  
    if(!nouveau_quartier){
       return next(new AppError('Invalid fields or duplicate quartier', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_quartier
    });
});

exports.modifier_quartier = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Quartier.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No quartier found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_quartier = catchAsync(async(req, res, next) => {

    const quartier = await models.Quartier.destroy({ where: { id: req.params.id } });
  
    if(!quartier){
       return next(new AppError('Invalid fields or No quartier found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});
