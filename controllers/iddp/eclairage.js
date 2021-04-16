const models = require('../../models/index');
const codification = require('../utils/codification');
const { QueryTypes } = require('sequelize');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_eclairages = catchAsync(async (req, res, next) => {

    const eclairages = await models.Eclairage.findAll({ where: { active: true } });
  
    if(!eclairages){
       return next(new AppError('No eclairages found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: eclairages.length,
        eclairages
    });
});

exports.consulter_eclairage_par_infrastructure = catchAsync(async (req, res, next) => {

    const eclairage = await models.Eclairage.findOne({ where: { infrastructure_id: req.params.id, active: true } });
  
    if(!eclairage){
       return next(new AppError('No eclairage found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        eclairage
    });
});

exports.consulter_eclairage_par_projet = catchAsync(async (req, res, next) => {

    const eclairage = await models.sequelize.query(
    "select eclairages.* from eclairages as d, projets as p, infrastructures as i where p.id = i.projet_id and i.id = d.infrastructure_id and d.infrastructure_id = :infrastructure and d.active = true",        
        { 
            replacements: { infrastructure: req.params.id },
            type: models.sequelize.QueryTypes.SELECT
        }
    );
  
    if(!eclairage){
       return next(new AppError('No eclairage found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        eclairage
    });
});

exports.ajout_eclairage = catchAsync(async (req, res, next) => {

    const nouveau_eclairage = await models.Eclairage.create({id: codification.codeEclairage(req.body.infrastructure_id) ,...req.body});
  
    if(!nouveau_eclairage){
       return next(new AppError('Invalid fields or duplicate eclairage', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_eclairage
    });
});

exports.modifier_eclairage = catchAsync(async(req, res, next) => {

    const eclairage = await models.Eclairage.update(req.body, { where: { id: req.params.id } });
  
    if(!eclairage){
       return next(new AppError('Invalid fields or No eclairage found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});
