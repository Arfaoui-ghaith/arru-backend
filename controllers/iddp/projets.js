const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('./../utils/codification');

exports.consulter_tous_les_projets = catchAsync(async (req, res, next) => {
    const projets = await models.Projet.findAll({
        include: { model: models.Infr },
        include: { model: models.Memoire }
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

    const projet = await models.Projet.findByPk(req.params.id, {
        include: { model: models.Quartier, as: 'quartiers', include: models.Point }
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

    if(!req.body.projet){
        return next(new AppError('projet not found', 404));
    }

    if(!req.body.infrastructures){
        return next(new AppError('infrastructures not found', 404));
    }

    if(!req.body.etude){
        return next(new AppError('etude not found', 404));
    }

    const nouveau_projet = await models.Projet.create({id: await codification.codeProjet(req.body.projet.zone_intervention_id), zone_intervention_id: req.body.projet.zone_intervention_id });
  
    if(!nouveau_projet){
       return next(new AppError('Invalid fields or duplicate projet', 401));
    }

    req.infrastructures = req.body.infrastructures;
    req.projet = nouveau_projet.id;
    req.etude = req.body.etude;

    next();
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
