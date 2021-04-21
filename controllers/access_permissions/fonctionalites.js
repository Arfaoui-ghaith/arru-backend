const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_fonctionalites = catchAsync(async (req, res, next) => {

    const fonctionalites = await models.Fonctionalité.findAll({});
  
    if(!fonctionalites){
       return next(new AppError('No fonctionalites found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: fonctionalites.length,
        fonctionalites
    });
    
});

exports.consulter_fonctionalite = catchAsync(async (req, res, next) => {

    const fonctionalite = await models.Fonctionalité.findByPk(req.params.id);
  
    if(!fonctionalite){
      return next(new AppError('No fonctionalite with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      fonctionalite
   });

});

exports.ajout_fonctionalite = catchAsync(async (req, res, next) => {

    const nouveau_fonctionalite = await models.Fonctionalité.create({id: uuidv4(), ...req.body});
  
    if(!nouveau_fonctionalite){
       return next(new AppError('Invalid fields or duplicate fonctionalite', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_fonctionalite
    });

});

exports.supprimer_fonctionalite = catchAsync(async(req, res, next) => {

    const fonctionalite = await models.Fonctionalité.destroy({ where: { id: req.params.id } });
  
    if(!fonctionalite){
       return next(new AppError('Invalid fields or No fonctionalite found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });

});