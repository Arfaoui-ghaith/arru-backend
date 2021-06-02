const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('./../utils/codification');
const { Op } = require("sequelize");

exports.consulter_tous_les_quartiers = catchAsync(async (req, res, next) => {

    const quartiers = await models.Quartier.findAll({
        include:[
            { model: models.Point, as: 'center', attributes: { exclude: ['', 'createdAt', 'updatedAt', 'quartier_id', 'id'] } },
            { model: models.Point, as: 'latlngs', attributes: { exclude: ['', 'createdAt', 'updatedAt', 'quartier_id', 'id'] } }
        ],
        attributes: { exclude: ['quartier_id', 'createdAt', 'updatedAt', 'point_id'] },
    });

    res.status(200).json({
        status: 'success',
        results: quartiers.length,
        quartiers
    });

});

exports.consulter_tous_les_quartiers_par_gouvernourat = catchAsync(async (req, res, next) => {

    const quartiers = await models.Commune.findAll({
        where: { gouvernorat_id: req.params.id },
        include:{ model: models.Quartier, as: 'quartiers', attributes: { exclude: ['point_id', 'projet_id', 'commune_id', 'createdAt', 'updatedAt'] },
        include:[
            { model: models.Point, as: 'center', attributes: { exclude: ['', 'createdAt', 'updatedAt', 'quartier_id', 'id'] } },
            { model: models.Point, as: 'latlngs', attributes: { exclude: ['', 'createdAt', 'updatedAt', 'quartier_id', 'id'] } }
        ]},
        attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'gouvernorat_id', 'code', 'nom_fr', 'nom_ar'] },
    });

    res.status(200).json({
        status: 'success',
        results: quartiers.length,
        quartiers
    });
});

exports.consulter_tous_les_quartiers_par_commune = catchAsync(async (req, res, next) => {

    const quartiers = await models.Commune.findAll({
        where: { id: req.params.id },
        include:{ model: models.Quartier, as: 'quartiers', attributes: { exclude: ['point_id', 'projet_id', 'commune_id', 'createdAt', 'updatedAt'] },
        include:[
            { model: models.Point, as: 'center', attributes: { exclude: ['', 'createdAt', 'updatedAt', 'quartier_id', 'id'] } },
            { model: models.Point, as: 'latlngs', attributes: { exclude: ['', 'createdAt', 'updatedAt', 'quartier_id', 'id'] } }
        ]},
        attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'gouvernorat_id', 'code', 'nom_fr', 'nom_ar'] },
    });

    res.status(200).json({
        status: 'success',
        results: quartiers.length,
        quartiers
    });
});

exports.consulter_quartier = catchAsync(async (req, res, next) => {
    const quartier = await models.Quartier.findByPk(
        req.params.id,{
        include:[
            { model: models.Point, as: 'center', attributes: { exclude: ['', 'createdAt', 'updatedAt', 'quartier_id', 'id'] } },
            { model: models.Point, as: 'latlngs', attributes: { exclude: ['', 'createdAt', 'updatedAt', 'quartier_id', 'id'] } }
        ],
        attributes: { exclude: ['quartier_id', 'createdAt', 'updatedAt', 'point_id'] },
    });
  
    if(!quartier){
      return next(new AppError('No quartier with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      quartier
   });
});

exports.ajout_quartier = catchAsync(async (req, res, next) => {

    req.body.quartiers.map(async(quartier) => {
        const center = await models.Point.create({id: uuidv4(),...quartier.center});

        const nouveau_quartier = await models.Quartier.create({id: uuidv4(), code: codification.codeQuartier(quartier.commune_code, quartier.quartier.nom_fr), commune_id: quartier.commune_id, point_id: center.id ,...quartier.quartier});
    
        quartier.latlngs.forEach(async (latlng) => {
            await models.Point.create({ id: uuidv4(), quartier_id: nouveau_quartier.id, ...latlng });
        });
    })

    res.status(201).json({
        status: 'success'
    });
});

exports.modifier_quartier = catchAsync(async(req, res, next) => {

    const quartier = await models.Quartier.findByPk(req.params.id);

    if(!quartier){
        return next(new AppError('Invalid fields or No quartier found with this ID', 404));
    }

    if(req.body.quartier){
        await models.Quartier.update(req.body.quartier,{ where: { id: quartier.id } });
    }

    if(req.body.latlngs){
        await models.Point.destroy({ where: { quartier_id: quartier.id } });
        req.body.latlngs.forEach(async (latlng) => {
            await models.Point.create({ id: uuidv4(), quartier_id: quartier.id, ...latlng });
        });
    }
    
    if(req.body.center){
        const point = await models.Point.create({ id: uuidv4(), lat: req.body.center.lat, lng: req.body.center.lng });
        let id = quartier.point_id;
        await models.Quartier.update({ point_id: point.id }, { where: { id: quartier.id } });
        await models.Point.destroy({ where: { id } });
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_quartier = catchAsync(async(req, res, next) => {

    const quartier = await models.Quartier.destroy({ where: { id: req.params.id } });

    if(!quartier){
       return next(new AppError('Invalid fields or No quartier found with this ID', 404));
    }

    res.status(203).json({
        status: 'success',
    });
});

exports.consulter_tous_les_quartiers_sans_projets = catchAsync(async (req, res, next) => {
    const gouvernorats = await models.Gouvernorat.findAll({
        include:[
            { model: models.Commune, as: 'communes', attributes: { exclude: ['createdAt', 'updatedAt'] }, 
                include: { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updatedAt']},
                    where: { projet_id: null },
                    include: [
                        { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                        { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
                    ]
                }
            }
        ],
        attributes: { exclude: ['commune_id', 'createdAt', 'updatedAt'] }
    });
  
    if(!gouvernorats){
       return next(new AppError('No gouvernorats found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: gouvernorats.length,
        gouvernorats
    });
});