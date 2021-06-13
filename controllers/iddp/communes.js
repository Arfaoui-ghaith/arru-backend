const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('../utils/codification');
const { v4: uuidv4 } = require('uuid');
const trace = require('./../access_permissions/traces');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const publishCommunes = catchAsync(async() => {
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

    const communes = await models.Commune.findAll({
        include: [
            { model: models.Gouvernorat, as: 'gouvernorat', attributes: { exclude: ['createdAt', 'updatedAt'] } },
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updatedAt','point_id', 'commune_id']},
                include: [
                    { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                    { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
                ] 
            }
        ],
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] } 
    });

    pubsub.publish('COMMUNES', { communes });
    pubsub.publish('GOUVERNORATS', { gouvernorats });
});

exports.consulter_tous_les_communes = catchAsync(async (req, res, next) => {

    const communes = await models.Commune.findAll({
        include: [
            { model: models.Gouvernorat, as: 'gouvernorat', attributes: { exclude: ['createdAt', 'updatedAt'] } },
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updatedAt','point_id', 'commune_id']},
                include: [
                    { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                    { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
                ] 
            }
        ],
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] } 
    });
    
    if(!communes){
       return next(new AppError('No communes found.', 404));
    }

    await publishCommunes();

    res.status(200).json({
        status: 'success',
        results: communes.length,
        communes
    });

});

exports.consulter_les_projets_par_commune = catchAsync(async (req, res, next) => {

    const projets = await models.sequelize.query(
        "select m.id, m.nom, m.nom_ar from municipalites as m, projets as p, communes as c where c.id = m.commune_id and m.id = p.municipalite_id and c.id = :commune",        
        {
            replacements: { commune: req.params.id },
            type: models.sequelize.QueryTypes.SELECT
        }
      );
  
    if(!projets){
       return next(new AppError('No projets found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: projets.length,
        projets
    });

});

exports.consulter_commune = catchAsync(async (req, res, next) => {
    const commune = await models.Commune.findByPk(req.params.id, { 
        include: { model: models.Gouvernorat, attributes: { exclude: ['createdAt', 'updatedAt'] } }, 
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] }
     });
  
    if(!commune){
      return next(new AppError('No commune with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      commune
   });
});

exports.ajout_commune = catchAsync(async (req, res, next) => {

    const nouveau_commune = await models.Commune.create({
        id: uuidv4(),
        code: codification.codeCommune(req.body.gouvernorat_code,req.body.nom_fr),
        ...req.body
    });
  
    if(!nouveau_commune){
       return next(new AppError('Invalid fields or duplicate commune', 401));
    }

    await publishCommunes();

    await trace.ajout_trace(req.user, `Ajouter la commune ${nouveau_commune.nom_fr}`);
  
    res.status(201).json({
        status: 'success',
        nouveau_commune
    });

});

exports.modifier_commune = catchAsync(async(req, res, next) => {

    const commune = await models.Commune.update(req.body, { where: { id: req.params.id } });
  
    if(!commune){
       return next(new AppError('Invalid fields or No commune found with this ID', 404));
    }

    await publishCommunes();

    await trace.ajout_trace(req.user, `Modifier la commune ${commune.nom_fr}`);
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_commune = catchAsync(async(req, res, next) => {

    const communeInfo = await models.Commune.findByPk(req.params.id);

    const commune = await models.Commune.destroy({ where: { id: req.params.id } });
  
    if(!commune){
       return next(new AppError('Invalid fields or No commune found with this ID', 404));
    }

    await publishCommunes();

    await trace.ajout_trace(req.user, `Supprimer la commune ${communeInfo.nom_fr}`);
  
    res.status(203).json({
        status: 'success',
    });
});


exports.communeResolvers = {
    Subscription: {
        communes: {
            subscribe: async (_,__,{id}) => {

                /*const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter tous les utilisateurs" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }*/

                return pubsub.asyncIterator(['COMMUNES']);
            }
        },
        gouvernorats: {
            subscribe: async (_,__,{id}) => {

                /*const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter tous les utilisateurs" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }*/

                return pubsub.asyncIterator(['GOUVERNORATS']);
            }
        }
    }
}