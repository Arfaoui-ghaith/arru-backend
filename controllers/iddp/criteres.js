const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const codification = require('./../utils/codification');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_criteres = catchAsync(async (req, res, next) => {

    const criteres = await models.Fiche_criteres.findAll({});
  
    if(!criteres){
       return next(new AppError('No Fiche de criteres found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: criteres.length,
        criteres
    });
    
});

exports.consulter_critere = catchAsync(async (req, res, next) => {

    const critere = await models.Fiche_criteres.findByPk(req.params.id);
  
    if(!critere){
      return next(new AppError('No critere with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      critere
   });

});

exports.consulter_critere_par_gouvernorat = catchAsync(async (req, res, next) => {

    const critere = await models.Fiche_criteres.findAll({ limit: 1, where: { gouvernorat_id: req.params.id}, order: [ [ 'createdAt', 'DESC' ]]});
  
    if(!critere){
      return next(new AppError('No critere with this ID.',404));
    }
   
    res.status(200).json({
      status: 'success',
      critere: critere[0]
    });

});

exports.ajout_critere = catchAsync(async (req, res, next) => {

    const nouveau_critere = await models.Fiche_criteres.create({id: await codification.codeCritere(req.body.gouvernorat_id), ...req.body});
  
    if(!nouveau_critere){
       return next(new AppError('Invalid fields or duplicate critere', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_critere
    });

});

exports.modifier_critere = catchAsync(async(req, res, next) => {

    const fiche_critere = await models.Fiche_criteres.update(req.body, { where: {id: req.params.id } });

    if(!fiche_critere){
        return next(new AppError('Invalid fields or No projet found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.test_eligible = catchAsync( async(req, res, next) => {
    const projets = await models.sequelize.query("SELECT p.id FROM projets as p, fiche_criteres as f, zone_interventions as z, communes as c, gouvernorats as g WHERE z.id = p.zone_intervention_id and z.commune_id = c.id and c.gouvernorat_id = g.id and g.id = f.gouvernorat_id and z.surface_totale >= f.surface_totale and z.surface_urbanisée_totale >= f.surface_urbanisée_totale and z.nombre_logements_totale >= f.nombre_logements_totale and z.nombre_habitants_totale >= f.nombre_habitants_totale and z.nbr_quartier >= f.nbr_quartier and p.eligible = 0",
    {
        type: models.sequelize.QueryTypes.SELECT 
    });

    if(!projets){
        return next(new AppError('No projets found', 404));
    }

    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    projets.map(async(projet) => {
        await models.Projet.update({ eligible: true },{ where: { id: projet.id } });
    });

    await models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    res.status(203).json({
        status: 'success'
    });
});

exports.ineligible = catchAsync( async(req, res, next) => {

    const projet = await models.Projet.update({ eligible: false }, { where: { id: req.params.id } });
  
    if(!projet){
       return next(new AppError('Invalid fields or No projet found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});

exports.eligible = catchAsync( async(req, res, next) => {

    const projet = await models.Projet.update({ eligible: true }, { where: { id: req.params.id } });
  
    if(!projet){
       return next(new AppError('Invalid fields or No projet found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});
