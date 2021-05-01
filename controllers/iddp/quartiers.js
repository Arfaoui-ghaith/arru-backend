const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('./../utils/codification');
const { Op } = require("sequelize");

exports.consulter_tous_les_quartiers = catchAsync(async (req, res, next) => {

    const quartiers = await models.Quartier.findAll({});

    let quartiersInfos = [];

    for(const quartier of quartiers){
        let latlngs = await models.Point.findAll({ where: { quartier_id: quartier.id } });
        let center = await models.Point.findByPk(quartier.point_id,{ attributes: ['lat','lng'] });
        console.log(center);
        let quartierInfo = { ...quartier.dataValues, latlngs};
        quartiersInfos.push(quartierInfo)
    };
  
    res.status(200).json({
        status: 'success',
        results: quartiersInfos.length,
        quartiers: quartiersInfos
    });

});

exports.consulter_tous_les_quartiers_par_gouvernourat = catchAsync(async (req, res, next) => {

    const quartiers = await models.Quartier.findAll({ where: { id: { [Op.startsWith]: req.params.id } } });

    let quartiersInfos = [];

    for(const quartier of quartiers){
        let latlngs = await models.Point.findAll({ where: { quartier_id: quartier.id } });
        let quartierInfo = { ...quartier.dataValues, latlngs};
        quartiersInfos.push(quartierInfo)
    };
  
    res.status(200).json({
        status: 'success',
        results: quartiersInfos.length,
        quartiers: quartiersInfos
    });
});

exports.consulter_tous_les_quartiers_par_commune = catchAsync(async (req, res, next) => {

    const quartiers = await models.Quartier.findAll({ where: { id: { [Op.like]: '____'+req.params.id+'%' } } });

    let quartiersInfos = [];

    for(const quartier of quartiers){
        let latlngs = await models.Point.findAll({ where: { quartier_id: quartier.id } });
        let quartierInfo = { ...quartier.dataValues, latlngs};
        quartiersInfos.push(quartierInfo)
    };
  
    res.status(200).json({
        status: 'success',
        results: quartiersInfos.length,
        quartiers: quartiersInfos
    });
});

exports.consulter_quartier = catchAsync(async (req, res, next) => {
    const quartier = await models.Quartier.findByPk(req.params.id);
  
    if(!quartier){
      return next(new AppError('No quartier with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      quartier
   });
});

exports.ajout_quartier = catchAsync(async (req, res, next) => {

    for(const q of req.body.quartiers){
        const center = await models.Point.create({id: uuidv4(),...q.center});

        const quartier = await models.Quartier.create({ id: codification.codeQuartier(q.zone_intervention_id, q.quartier.nom_fr), zone_intervention_id: q.zone_intervention_id, point_id: center.id ,...q.quartier});

        q.latlngs.forEach(async (latlng) => {
            await models.Point.create({ id: uuidv4(), quartier_id: quartier.id, ...latlng });
        });
    }
  
    res.status(201).json({
        status: 'success'
    });
});

exports.modifier_quartier = catchAsync(async(req, res, next) => {

    const quartier = await models.Quartier.findByPk(req.params.id);

    console.log(quartier);
    if(req.body.latlngs && req.body.center){
        await Promise.all([
            models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0'),
            models.Point.destroy({ where: { id: quartier.point_id } }),
            models.Point.destroy({ where: { quartier_id: req.params.id } })
            
        ]).then(async ()=>{
            req.body.latlngs.forEach(async (latlng) => {
                await models.Point.create({ id: uuidv4(), quartier_id: quartier.id, ...latlng });
            });

            console.log("im here");
            const center = await models.Point.create({ id: uuidv4(), ...req.body.center });
            await models.Quartier.update({ point_id: center.id }, { where: { id: req.params.id } });
        })
    }

    models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')

    if(req.body.quartier){
        const quartierUpdated = await models.Quartier.update(req.body.quartier, { where: { id: req.params.id } });
  
        if(!quartierUpdated){
           return next(new AppError('Invalid fields or No quartier found with this ID', 404));
        }
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_quartier = catchAsync(async(req, res, next) => {

    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    const quartier = await models.Quartier.findByPk(req.params.id);
    await models.Quartier.destroy({ where: { id: req.params.id } });
    const point = await models.Point.destroy({ where: { id: quartier.point_id } });

    if(!quartier){
       return next(new AppError('Invalid fields or No quartier found with this ID', 404));
    }

    const points = await models.Point.destroy({ where: { id: req.params.id } });
    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    res.status(203).json({
        status: 'success',
    });
});
