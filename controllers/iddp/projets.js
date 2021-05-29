const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('./../utils/codification');

exports.consulter_tous_les_projets = catchAsync(async (req, res, next) => {
    const projets = await models.Projet.findAll({
        include: [
            { model: models.Quartier, as: 'quartiers', attributes: { exclude: ['createdAt', 'updated', 'projet_id']},
                include: [
                    { model: models.Point, as: 'center', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } },
                    { model: models.Point, as: 'latlngs', attributes: { exclude: ['createdAt', 'updatedAt', 'quartier_id'] } }
                ]},
            { model: models.Infrastructure, as: 'infrastructures', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] } },
            { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt', 'projet_id'] },
                include: { model: models.Financement, as: 'financements', attributes: { exclude: [ 'createdAt', 'updatedAt', 'memoire_id'] } } }
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
    const projet = await models.Projet.findByPk(req.params.id);
  
    if(!projet){
      return next(new AppError('No projet with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      projet
   });
});

exports.ajout_projet = catchAsync(async (req, res, next) => {

    

    const nouveau_projet = await models.Projet.create({id: await codification.codeProjet(req.body.projet.zone_intervention_id), zone_intervention_id: req.body.projet.zone_intervention_id });
  
    if(!nouveau_projet){
       return next(new AppError('Invalid fields or duplicate projet', 401));
    }

    
});

exports.modifier_projet = catchAsync(async(req, res, next) => {

    if(req.body.etude){
        await models.Infrastructure.update(req.body.etude, { where: { id: req.params.id+'-ET' } });
    }

    if(req.body.infrastructures){
        req.body.infrastructures.map(async(infra) => {
            await models.Infrastructure.update(infra,{ where: { id: req.params.id+'-INF-'+infra.type.slice(0,2).toUpperCase() } });
        });
    }

    if(req.body.eligible){
        const projet = await models.Projet.update(req.body, { where: { id: req.params.id } });
        if(!projet){
            return next(new AppError('Invalid fields or No projet found with this ID', 404));
        }
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.consulter_les_projets_eligible = catchAsync(async(req,res,next) => {
    const projets = await models.Projet.findAll({ where: { eligible: true } });

    res.status(203).json({
        status: 'success',
        projets
    });
});

exports.consulter_les_projets_ineligible = catchAsync(async(req,res,next) => {
    const projets = await models.Projet.findAll({ where: { eligible: false } });

    res.status(203).json({
        status: 'success',
        projets
    });
})
