const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_gouvernorats = catchAsync(async (req, res, next) => {

    const gouvernorats = await models.Gouvernorat.findAll({});
  
    if(!gouvernorats){
       return next(new AppError('No gouvernorats found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: gouvernorats.length,
        gouvernorats
    });
});

exports.consulter_gouvernorat = catchAsync(async (req, res, next) => {
    const gouvernorat = await models.Gouvernorat.findByPk(req.params.id);
  
    if(!gouvernorat){
      return next(new AppError('No gouvernorat with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      gouvernorat
   });
});

exports.consulter_les_projets_par_gouvernorat = catchAsync(async (req, res, next) => {

    const projets = await models.sequelize.query(
        "select m.id, m.nom, m.nom_ar from municipalites as m, projets as p, communes as c, gouvernorats as g where g.id = c.gouvernorat_id and c.id = m.commune_id and m.id = p.municipalite_id and g.id = :gouvernorat",        
        { 
            replacements: { gouvernorat: req.params.id },
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

exports.consulter_les_communes_par_gouvernorat = catchAsync(async (req, res, next) => {

    const communes = await models.sequelize.query(
        "select c.id, c.nom_fr, c.nom_ar from communes as c, gouvernorats as g where g.id = c.gouvernorat_id and c.gouvernorat_id = :gouvernorat",
        { 
            replacements: { gouvernorat: req.params.id },
            type: models.sequelize.QueryTypes.SELECT
        }
      );
  
    if(!communes){
       return next(new AppError('No communes found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: communes.length,
        communes
    });
});

exports.ajout_gouvernorat = catchAsync(async (req, res, next) => {

    const nouveau_gouvernorat = await models.Gouvernorat.create({id: uuidv4(),...req.body});
  
    if(!nouveau_gouvernorat){
       return next(new AppError('Invalid fields or duplicate gouvernorat', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_gouvernorat
    });
});

exports.modifier_gouvernorat = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Gouvernorat.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No gouvernorat found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_gouvernorat = catchAsync(async(req, res, next) => {

    const gouvernorat = await models.Gouvernorat.destroy({ where: { id: req.params.id } });
  
    if(!gouvernorat){
       return next(new AppError('Invalid fields or No gouvernorat found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});
