const models = require('./../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.consulter_tous_les_projets = catchAsync(async (req, res, next) => {

    const projets = await models.Projet.findAll({});
  
    if(!projets){
       return next(new AppError('No projets found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: projets.length,
        projets
    });
});

exports.consulter_projet = catchAsync(async (req, res, next) => {
    const projet = await models.Projet.findByPk(req.params.id);
  
    if(!projet){
      return next(new AppError('No projet with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      projet
   });
});

exports.ajout_projet = catchAsync(async (req, res, next) => {

    const nouveau_projet = await models.Projet.create({id: uuidv4(),...req.body});
  
    if(!nouveau_projet){
       return next(new AppError('Invalid fields or duplicate projet', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_projet
    });
});

exports.modifier_projet = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Projet.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No projet found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_projet = catchAsync(async(req, res, next) => {

    const projet = await models.Projet.destroy({ where: { id: req.params.id } });
  
    if(!projet){
       return next(new AppError('Invalid fields or No projet found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});
