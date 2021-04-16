const models = require('./../../models/index');
const codification = require('./../utils/codification');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_voiries = catchAsync(async (req, res, next) => {

    const voiries = await models.Voirie.findAll({ where: { active: true } });
  
    if(!voiries){
       return next(new AppError('No voiries found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: voiries.length,
        voiries
    });
});

exports.consulter_voirie_par_infrastructure = catchAsync(async (req, res, next) => {

    const voirie = await models.Voirie.findOne({ where: { infrastructure_id: req.params.id, active: true } });
  
    if(!voirie){
       return next(new AppError('No voirie found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        voirie
    });
});

exports.consulter_voirie_par_projet = catchAsync(async (req, res, next) => {

    const voirie = await models.sequelize.query(
    "select voiries.* from voiries as d, projets as p, infrastructures as i where p.id = i.projet_id and i.id = d.infrastructure_id and d.infrastructure_id = :infrastructure and d.active = true",        
        { 
            replacements: { infrastructure: req.params.id },
            type: models.sequelize.QueryTypes.SELECT
        }
    );
  
    if(!voirie){
       return next(new AppError('No voirie found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        voirie
    });
});

exports.ajout_voirie = catchAsync(async (req, res, next) => {

    const nouveau_voirie = await models.Voirie.create({id: codification.codeVoirie(req.body.infrastructure_id) ,...req.body});
  
    if(!nouveau_voirie){
       return next(new AppError('Invalid fields or duplicate voirie', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_voirie
    });
});

exports.modifier_voirie = catchAsync(async(req, res, next) => {

    const voirie = await models.Voirie.update(req.body, { where: { id: req.params.id } });
  
    if(!voirie){
       return next(new AppError('Invalid fields or No voirie found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});
