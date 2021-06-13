const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('./../utils/codification');
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");
const trace = require('./../access_permissions/traces');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const publishProjets = async() => {
    let projets = await models.Projet.findAll({
        include: [
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updated', 'projet_id']},
                
            },
            { model: models.Infrastructure, as: 'infrastructures', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] } },

        ], 
        attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

    projets = await models.Projet.findAll({
        include: [
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updated', 'projet_id']}},
            { model: models.Infrastructure, as: 'infrastructures', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] } }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    
    pubsub.publish('PROJETS', { projets });
}

exports.consulter_tous_les_projets = catchAsync(async (req, res, next) => {
    const projets = await models.Projet.findAll({
        include: [
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updated', 'projet_id']},
                include: [
                    { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                    { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
                ]
            },
            { model: models.Infrastructure, as: 'infrastructures', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] } },
            { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] },
                include: { model: models.Financement, as: 'financements', attributes: { exclude: [ 'createdAt', 'updatedAt', 'memoire_id'] } } 
            }
        ], 
        attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
  
    if(!projets){
       return next(new AppError('No projets found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: projets.length,
        projets
    });
});

exports.consulter_tous_les_projets_sans_memoire = catchAsync(async (req, res, next) => {
    const projets = await models.Projet.findAll({
        where: { eligible: true },
        include: [
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updated', 'projet_id']} },
            { model: models.Memoire, as: 'memoire', required: false, where: { projet_id: null }, attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] } }
        ],
        subQuery: false,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  
    if(!projets){
       return next(new AppError('No projets found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: projets.length,
        projets
    });
});

exports.consulter_tous_les_projets_sans_tranche = catchAsync(async (req, res, next) => {
    const projets = await models.Projet.findAll({
        where: { eligible: true, tranche_id: null },
        include: [
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updated', 'projet_id']} },
            { model: models.Memoire, as: 'memoire', required: false, where: { projet_id: null }, attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] } }
        ],
        subQuery: false,
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  
    if(!projets){
       return next(new AppError('No projets found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: projets.length,
        projets
    });
});

exports.consulter_quartiers_par_projet = catchAsync(async (req, res, next) => {

    const projets = await models.Projet.findAll({
        where: { id: req.params.id },
        include: [
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updated', 'projet_id']},
            include: [
                { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
            ]},
            { model: models.Infr, as: 'infrastructure', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] } },
            { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] },
        include: { model: models.Financement, as: 'financements', attributes: { exclude: [ 'createdAt', 'updatedAt', 'memoire_id'] } } }
        ], attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  
  
    if(!projet){
       return next(new AppError('No projet found.', 404));
    }

    res.status(200).json({
        status: 'success',
        projet
    });
});

exports.consulter_projet = catchAsync(async (req, res, next) => {
    console.log("fsdf")
    const projet = await models.Projet.findOne({
        where: { id: req.params.id },
        include: [
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updated', 'projet_id']},
            include: [
                { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
            ]},
            { model: models.Infrastructure, as: 'infrastructures', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] } },
            { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] },
        include: { model: models.Financement, as: 'financements', attributes: { exclude: [ 'createdAt', 'updatedAt', 'memoire_id'] } } }
        ], attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
  
    if(!projet){
      return next(new AppError('No projet with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      projet
   });
});

exports.ajout_projet = catchAsync(async (req, res, next) => {

    console.log(req.body);
    if(!req.body.quartiers){
        return next(new AppError('you need at least one quartier to create projet', 401));
    }

    const nouveau_projet = await models.Projet.create({
        id: uuidv4(), 
        code: codification.codeProjet(req.body.commune_code, req.body.projet.nom),
        ...req.body.projet
    });

    if(!nouveau_projet){
        return next(new AppError('Invalid fields or duplicate projet', 401));
    }

    console.log(req.body.infrastructures);

    req.body.infrastructures.map(async (infra) => {
        console.log(await models.Infrastructure.create({
            id: uuidv4(),
            projet_id: nouveau_projet.id,
            code: codification.codeInfrastructure(nouveau_projet.code),
            ...infra
        }));
    });

    req.body.quartiers.map(async (id) => {
        await models.Quartier.update({ projet_id: nouveau_projet.id }, { where: { id } });
    });

    await trace.ajout_trace(req.user, `Ajouter la projet ${nouveau_projet.code}`);

    await publishProjets();

    res.status(200).json({
        status: 'success',
    });
    
});

exports.modifier_projet = catchAsync(async(req, res, next) => {

    const projet = await models.Projet.findByPk(req.params.id);

    if(req.body.projet){
        await models.Projet.update(req.body.projet, { where: { id: req.params.id } });
        
        await trace.ajout_trace(req.user, `Modifier la projet ${projet.code}`);
    }

    if(req.body.infrastructures){
        req.body.infrastructures.map(async(infra) => {
            await models.Infrastructure.update(infra,{ where: { [Op.and]: [{projet_id: req.params.id }, {type: infra.type}] }});
        });
        await trace.ajout_trace(req.user, `Modifier l'infrastructure de la projet ${projet.code}`);
    }
    
    if(req.body.eligible){
        const projet = await models.Projet.update(req.body.eligible, { where: { id: req.params.id } });
        
        if(!projet){
            return next(new AppError('Invalid fields or No projet found with this ID', 404));
        }

        await trace.ajout_trace(req.user, `Modifier l'egibilité de la projet ${projet.code}`);
    }

    await publishProjets();
    
    res.status(203).json({
        status: 'success',
    });
    
});

exports.consulter_les_projets_eligible = catchAsync(async(req,res,next) => {

    const projets = await models.Projet.findAll({
        where: { eligible: true },
        include: [
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updated', 'projet_id']},
                include: [
                    { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                    { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
                ]
            },
            { model: models.Infrastructure, as: 'infrastructures', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] } },
            { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] },
                include: { model: models.Financement, as: 'financements', attributes: { exclude: [ 'createdAt', 'updatedAt', 'memoire_id'] } } 
            }
        ], 
        attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

    res.status(203).json({
        status: 'success',
        projets
    });
});

exports.consulter_les_projets_ineligible = catchAsync(async(req,res,next) => {

    const projets = await models.Projet.findAll({
        where: { eligible: false },
        include: [
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updated', 'projet_id']},
                include: [
                    { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                    { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
                ]
            },
            { model: models.Infrastructure, as: 'infrastructures', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] } },
            { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] },
                include: { model: models.Financement, as: 'financements', attributes: { exclude: [ 'createdAt', 'updatedAt', 'memoire_id'] } } 
            }
        ], 
        attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

    res.status(203).json({
        status: 'success',
        projets
    });
});

exports.supprimer_projet = catchAsync(async(req,res,next) => {

    await models.Quartier.update({ projet_id: null }, { where: { projet_id: req.params.id } });
    const projet = await models.Projet.destroy({ where: { id: req.params.id } });

    await publishProjets();

    res.status(203).json({
        status: 'success',
    });
})

exports.projetResolvers = {
    Subscription: {
        projets: {
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

                return pubsub.asyncIterator(['PROJETS']);
            }
        }
    }
}