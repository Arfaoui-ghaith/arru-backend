const models = require('../../models/index');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const codification = require('../utils/codification');

exports.consulter_tous_les_zone_interventions = catchAsync(async (req, res, next) => {

    const zone_interventions = await models.Zone_Intervention.findAll({});
  
    if(!zone_interventions){
       return next(new AppError('No zone_interventions found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: zone_interventions.length,
        zone_interventions
    });

});

exports.consulter_zone_intervention = catchAsync(async (req, res, next) => {
    const zone_intervention = await models.Zone_Intervention.findByPk(req.params.id);
  
    if(!zone_intervention){
      return next(new AppError('No zone_intervention with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      zone_intervention
   });
});

exports.ajout_zone_intervention = catchAsync(async (req, res, next) => {

    const nouveau_zone_intervention = await models.Zone_Intervention.create({id: codification.codeZone_Intervention(req.body.commune_id, req.body.nom_fr),...req.body});
    
    if(!nouveau_zone_intervention){
       return next(new AppError('Invalid fields or duplicate zone_intervention', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_zone_intervention
    });

});

exports.modifier_zone_intervention = catchAsync(async(req, res, next) => {

    const zone_intervention = await models.Zone_Intervention.update(req.body, { where: { id: req.params.id } });
  
    if(!zone_intervention){
       return next(new AppError('Invalid fields or No zone_intervention found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});
