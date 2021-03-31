const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_criteres = catchAsync(async (req, res, next) => {

    const criteres = await models.Critere.findAll({});
  
    if(!criteres){
       return next(new AppError('No criteres found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: criteres.length,
        criteres
    });
    
});

exports.consulter_critere = catchAsync(async (req, res, next) => {

    const critere = await models.Critere.findByPk(req.params.id);
  
    if(!critere){
      return next(new AppError('No critere with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      critere
   });

});

exports.ajout_critere = catchAsync(async (req, res, next) => {

    const nouveau_critere = await models.Critere.Create({id: uuidv4(), ...req.body});
  
    if(!nouveau_critere){
       return next(new AppError('Invalid fields or duplicate critere', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_critere
    });

});

exports.modifier_critere = catchAsync(async(req, res, next) => {

    const critere = await models.Critere.update(req.body, { where: { id: req.params.id } });
  
    if(!critere){
       return next(new AppError('Invalid fields or No projet found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_critere = catchAsync(async(req, res, next) => {

    const critere = await models.Critere.destroy({ where: { id: req.params.id } });
  
    if(!critere){
       return next(new AppError('Invalid fields or No critere found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });

});