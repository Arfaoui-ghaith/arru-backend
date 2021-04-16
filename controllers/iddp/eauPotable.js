const models = require('./../../models/index');
const codification = require('./../utils/codification');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_eau_potables = catchAsync(async (req, res, next) => {

    const eau_potables = await models.Eau_potable.findAll({ where: { active: true } });
  
    if(!eau_potables){
       return next(new AppError('No eau_potables found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: eau_potables.length,
        eau_potables
    });
});

exports.consulter_eau_potable_par_infrastructure = catchAsync(async (req, res, next) => {

    const eau_potable = await models.Eau_potable.findOne({ where: { infrastructure_id: req.params.id, active: true } });
  
    if(!eau_potable){
       return next(new AppError('No eau_potable found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        eau_potable
    });
});

exports.consulter_eau_potable_par_projet = catchAsync(async (req, res, next) => {

    const eau_potable = await models.sequelize.query(
    "select eau_potables.* from eau_potables as d, projets as p, infrastructures as i where p.id = i.projet_id and i.id = d.infrastructure_id and d.infrastructure_id = :infrastructure and d.active = true",        
        { 
            replacements: { infrastructure: req.params.id },
            type: models.sequelize.QueryTypes.SELECT
        }
    );
  
    if(!eau_potable){
       return next(new AppError('No eau_potable found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        eau_potable
    });
});

exports.ajout_eau_potable = catchAsync(async (req, res, next) => {

    const nouveau_eau_potable = await models.Eau_potable.create({id: codification.codeEauPotable(req.body.infrastructure_id) ,...req.body});
  
    if(!nouveau_eau_potable){
       return next(new AppError('Invalid fields or duplicate eau_potable', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_eau_potable
    });
});

exports.modifier_eau_potable = catchAsync(async(req, res, next) => {

    const eau_potable = await models.Eau_potable.update(req.body, { where: { id: req.params.id } });
  
    if(!eau_potable){
       return next(new AppError('Invalid fields or No eau_potable found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});
