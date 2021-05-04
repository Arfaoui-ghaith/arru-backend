const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('./../utils/codification');

exports.consulter_tous_les_projets = catchAsync(async (req, res, next) => {
    const projets = await models.Projet.findAll({});
  
    if(!projets){
       return next(new AppError('No projets found.', 404));
    }

    let projetInfo = [];

    for(const projet of projets){
        let gouvernorat = await models.Gouvernorat.findByPk(projet.id.slice(0,3),{ attributes: [['nom_fr','nom']] });
        let commune = await models.Commune.findByPk(projet.id.slice(0,8),{ attributes: [['nom_fr','nom']] });
        let zone = await models.Zone_Intervention.findOne({ where: { id: projet.zone_intervention_id } });
        let infrastructures = await models.Infrastructure.findAll({ where: { projet_id: projet.id } });
        let etude = await models.Etude.findByPk(projet.id+'-ET');
        const quartiers = await models.Quartier.findAll({ where: { zone_intervention_id: zone.id }, attributes: [['nom_fr','nom']] });
        projetInfo.push({ gouvernorat, commune, ...projet.dataValues, infrastructures, zone, etude, quartiers });
    }
  
    res.status(200).json({
        status: 'success',
        results: projetInfo.length,
        projets: projetInfo
    });
});

exports.consulter_quartiers_par_projet = catchAsync(async (req, res, next) => {

    const projet = await models.Projet.findByPk(req.params.id);
  
    if(!projet){
       return next(new AppError('No projet found.', 404));
    }

    const quartiers = await models.Quartier.findAll({ where: { projet_id: req.params.id } });
    const quartiersInfos = [];
    for(const quartier of quartiers){
        let limites_quartier = await models.Limite_quartier.findAll({ where: { quartier_id: quartier.id  } });
        let quartierOBJ = { ...quartier, limites_quartier };
        quartiersInfos.push(quartierOBJ);
    }

    res.status(200).json({
        status: 'success',
        projet: {...projet, quartiersInfos}
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
