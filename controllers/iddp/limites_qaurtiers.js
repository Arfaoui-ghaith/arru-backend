const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.consulter_tous_les_limites = catchAsync(async (req, res, next) => {

    const limites = await models.Limite_quartier.findAll({});
  
    if(!limites){
       return next(new AppError('No limites found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: limites.length,
        limites
    });
});

exports.consulter_limite = catchAsync(async (req, res, next) => {
    const limite = await models.Limite_quartier.findByPk(req.params.id);
  
    if(!limite){
      return next(new AppError('No limite with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      limite
   });
});

exports.ajout_limite = catchAsync(async (req, res, next) => {

    const nouveau_limite = await models.Limite_quartier.create({id: uuidv4(),...req.body});
  
    if(!nouveau_limite){
       return next(new AppError('Invalid fields or duplicate limite', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_limite
    });
});

exports.modifier_limite = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Limite_quartier.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No limite found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_limite = catchAsync(async(req, res, next) => {

    const limite = await models.Limite_quartier.destroy({ where: { id: req.params.id } });
  
    if(!limite){
       return next(new AppError('Invalid fields or No limite found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});
