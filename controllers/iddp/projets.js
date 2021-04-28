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
        let infrastructures = await models.Infrastructure.findAll({ where: { projet_id: projet.id } });
        projetInfo.push({ ...projet.dataValues, infrastructures });
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

    const quartiers = await models.Quartier.findAll({ where: { projet_id: req.params.id } })
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

    const nouveau_projet = await models.Projet.create({id: await codification.codeProjet(req.body.projet.zone_intervention_id), zone_intervention_id: req.body.projet.zone_intervention_id });
  
    if(!nouveau_projet){
       return next(new AppError('Invalid fields or duplicate projet', 401));
    }

    req.infrastructures = req.body.infrastructures;
    req.projet = nouveau_projet.id;
  
    console.log(req.projet);
    next();
});

exports.modifier_projet = catchAsync(async(req, res, next) => {

    const projet = await models.Projet.update(req.body, { where: { id: req.params.id } });
  
    if(!projet){
       return next(new AppError('Invalid fields or No projet found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});
