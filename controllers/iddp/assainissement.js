const models = require('./../../models/index');
const codification = require('./../utils/codification');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_assainissements = catchAsync(async (req, res, next) => {

    const assainissements = await models.Assainissement.findAll({ where: { active: true } });
  
    if(!assainissements){
       return next(new AppError('No assainissements found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: assainissements.length,
        assainissements
    });
});

exports.consulter_assainissement_par_infrastructure = catchAsync(async (req, res, next) => {

    const assainissement = await models.Assainissement.findOne({ where: { infrastructure_id: req.params.id, active: true } });
  
    if(!assainissement){
       return next(new AppError('No assainissement found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        assainissement
    });
});

exports.consulter_assainissement_par_projet = catchAsync(async (req, res, next) => {

    const assainissement = await models.sequelize.query(
    "select assainissements.* from assainissements as d, projets as p, infrastructures as i where p.id = i.projet_id and i.id = d.infrastructure_id and d.infrastructure_id = :infrastructure and d.active = true",        
        { 
            replacements: { infrastructure: req.params.id },
            type: models.sequelize.QueryTypes.SELECT
        }
    );
  
    if(!assainissement){
       return next(new AppError('No assainissement found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        assainissement
    });
});

exports.ajout_assainissement = catchAsync(async (req, res, next) => {

    const nouveau_assainissement = await models.Assainissement.create({id: codification.codeAssainissement(req.body.infrastructure_id) ,...req.body});
  
    if(!nouveau_assainissement){
       return next(new AppError('Invalid fields or duplicate assainissement', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_assainissement
    });
});

exports.modifier_assainissement = catchAsync(async(req, res, next) => {

    const assainissement = await models.Assainissement.update(req.body, { where: { id: req.params.id } });
  
    if(!assainissement){
       return next(new AppError('Invalid fields or No assainissement found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});
