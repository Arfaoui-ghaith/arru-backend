const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_communes = catchAsync(async (req, res, next) => {

    const communes = await models.Commune.findAll({});
  
    if(!communes){
       return next(new AppError('No communes found.', 404));
    }
  
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

exports.consulter_les_municipalites_par_commune = catchAsync(async (req, res, next) => {

    const municipalites = await models.sequelize.query(
        "select m.id, m.nom, m.nom_ar from municipalites as m, communes as c where c.id = m.commune_id and m.commune_id = :commune",        
        { 
            replacements: { commune: req.params.id },
            type: models.sequelize.QueryTypes.SELECT
        }
      );
  
    if(!municipalites){
       return next(new AppError('No municipalites found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: municipalites.length,
        municipalites
    });
});

exports.consulter_commune = catchAsync(async (req, res, next) => {
    const commune = await models.Commune.findByPk(req.params.id);
  
    if(!commune){
      return next(new AppError('No commune with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      commune
   });
});

exports.ajout_commune = catchAsync(async (req, res, next) => {

    const nouveau_commune = await models.Commune.create({id: uuidv4(),...req.body});
  
    if(!nouveau_commune){
       return next(new AppError('Invalid fields or duplicate commune', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_commune
    });
});

exports.modifier_commune = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Commune.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No commune found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_commune = catchAsync(async(req, res, next) => {

    const commune = await models.Commune.destroy({ where: { id: req.params.id } });
  
    if(!commune){
       return next(new AppError('Invalid fields or No commune found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});
