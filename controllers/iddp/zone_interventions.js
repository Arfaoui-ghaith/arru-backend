const models = require('../../models/index');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const codification = require('../utils/codification');

exports.consulter_tous_les_zone_interventions = catchAsync(async (req, res, next) => {

    const zone_interventions = await models.Zone_Intervention.findAll({});
  
    if(!zone_interventions){
       return next(new AppError('No zone_interventions found.', 404));
    }

    let zones = [];
    for(const zone of zone_interventions){
        const gouvernorat = await models.Gouvernorat.findByPk(zone.id.slice(0,3));
        
        const commune = await models.Commune.findByPk(zone.id.slice(0,8));
        
        const quartiers = await models.Quartier.findAll({ where: { zone_intervention_id: zone.id }, attributes: [['nom_fr','nom']] });
        console.log(quartiers);

        let obj = { gouvernorat: gouvernorat.nom_fr, commune: commune.nom_fr, quartiers, ...zone.dataValues }
        console.log(obj);
        zones.push(obj);
    }
  
    res.status(200).json({
        status: 'success',
        results: zones.length,
        zone_interventions: zones
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
