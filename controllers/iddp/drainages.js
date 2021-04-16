const models = require('./../../models/index');
const codification = require('./../utils/codification');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_drainages = catchAsync(async (req, res, next) => {

    const drainages = await models.Drainage.findAll({ where: { active: true } });
  
    if(!drainages){
       return next(new AppError('No drainages found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: drainages.length,
        drainages
    });
});

exports.consulter_drainage_par_infrastructure = catchAsync(async (req, res, next) => {

    const drainage = await models.Drainage.findOne({ where: { infrastructure_id: req.params.id, active: true } });
  
    if(!drainage){
       return next(new AppError('No drainage found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        drainage
    });
});

exports.consulter_drainage_par_projet = catchAsync(async (req, res, next) => {

    const drainage = await models.sequelize.query(
    "select drainages.* from drainages as d, projets as p, infrastructures as i where p.id = i.projet_id and i.id = d.infrastructure_id and d.infrastructure_id = :infrastructure and d.active = true",        
        { 
            replacements: { infrastructure: req.params.id },
            type: models.sequelize.QueryTypes.SELECT
        }
    );
  
    if(!drainage){
       return next(new AppError('No drainage found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        drainage
    });
});

exports.ajout_drainage = catchAsync(async (req, res, next) => {

    const nouveau_drainage = await models.Drainage.create({id: codification.codeDrainage(req.body.infrastructure_id) ,...req.body});
  
    if(!nouveau_drainage){
       return next(new AppError('Invalid fields or duplicate drainage', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_drainage
    });
});

exports.modifier_drainage = catchAsync(async(req, res, next) => {

    const drainage = await models.Drainage.update(req.body, { where: { id: req.params.id } });
  
    if(!drainage){
       return next(new AppError('Invalid fields or No drainage found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});
