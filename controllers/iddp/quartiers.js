const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('./../utils/codification');
const { Op } = require("sequelize");
const trace = require('./../access_permissions/traces');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const publishQuartiers = catchAsync(async() => {
    const quartiers = await models.Quartier.findAll({
        include:[
            { model: models.Point, as: 'center', attributes: { exclude: ['updatedAt', 'quartier_id', 'id'] } },
            { model: models.Point, as: 'latlngs', attributes: { exclude: ['updatedAt', 'quartier_id', 'id'] }, order: ['createdAt', 'ASC'], }
        ],
        attributes: { exclude: ['quartier_id', 'createdAt', 'updatedAt', 'point_id'] },
    });

    const gouvernorats = await models.Gouvernorat.findAll({
        include:[
            { model: models.Fiche_criteres, as: 'fiche_criteres', attributes: { exclude: ['createdAt', 'updatedAt'] } },
            { model: models.Commune, as: 'communes', attributes: { exclude: ['createdAt', 'updatedAt'] }, 
                include: { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updatedAt']},
                    include: [
                        { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                        { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
                    ]
                }
            }
        ],
        attributes: { exclude: ['commune_id', 'createdAt', 'updatedAt'] }
    });

    pubsub.publish('QUARTIERS', { quartiers });
    pubsub.publish('GOUVERNORATS', { gouvernorats });

});

exports.consulter_tous_les_quartiers = catchAsync(async (req, res, next) => {

    const quartiers = await models.Quartier.findAll({
        include:[
            { model: models.Point, as: 'center', attributes: { exclude: ['updatedAt', 'quartier_id', 'id'] } },
            { model: models.Point, as: 'latlngs', attributes: { exclude: ['updatedAt', 'quartier_id', 'id'] }, order: ['createdAt', 'ASC'], }
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
    
        for(const latlng of quartier.latlngs){
            await models.Point.create({ id: uuidv4(), quartier_id: nouveau_quartier.id, ...latlng });
        }

        await trace.ajout_trace(req.user, `Ajouter le quartier ${nouveau_quartier.nom_fr}`);
    });

    await publishQuartiers()

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

        await trace.ajout_trace(req.user, `Modifier le quartier ${quartier.nom_fr}`);
    }

    if(req.body.latlngs){
        await models.Point.destroy({ where: { quartier_id: quartier.id } });
        req.body.latlngs.forEach(async (latlng) => {
            await models.Point.create({ id: uuidv4(), quartier_id: quartier.id, ...latlng });
        });

        await trace.ajout_trace(req.user, `Modifier les coordonnées pour le quartier ${quartier.nom_fr}`);
    }
    
    if(req.body.center){
        const point = await models.Point.create({ id: uuidv4(), lat: req.body.center.lat, lng: req.body.center.lng });
        let id = quartier.point_id;
        await models.Quartier.update({ point_id: point.id }, { where: { id: quartier.id } });
        await models.Point.destroy({ where: { id } });

        await trace.ajout_trace(req.user, `Modifier les coordonnées pour le quartier ${quartier.nom_fr}`);
    }

    await publishQuartiers()
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_quartier = catchAsync(async(req, res, next) => {

    const quartierInfo = await models.Quartier.findByPk(req.params.id);

    const quartier = await models.Quartier.destroy({ where: { id: req.params.id } });

    if(!quartier){
       return next(new AppError('Invalid fields or No quartier found with this ID', 404));
    }

    await trace.ajout_trace(req.user, `Supprimer le quartier ${quartierInfo.nom_fr}`);

    await publishQuartiers()

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

exports.quartiersResolvers = {
    Subscription: {
        quartiers: {
            subscribe: async (_,__,{id}) => {
                const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter les quartiers" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }

                return pubsub.asyncIterator(['QUARTIERS']);
            }
        }
    }
}