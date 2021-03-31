const models = require('./../../models/index');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');

exports.consulter_tous_les_municipalites = catchAsync(async (req, res, next) => {

    const municipalites = await models.Municipalite.findAll({});
  
    if(!municipalites){
       return next(new AppError('No municipalites found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: municipalites.length,
        municipalites
    });
});

exports.consulter_les_projets_par_municipalite = catchAsync(async (req, res, next) => {

    const projets = await models.sequelize.query(
        "select m.id, m.nom, m.nom_ar from municipalites as m, projets as p where m.id = p.municipalite_id and p.municipalite_id = :municipalite",        
        { 
            replacements: { municipalite: req.params.id },
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

exports.consulter_municipalite = catchAsync(async (req, res, next) => {
    const municipalite = await models.Municipalite.findByPk(req.params.id);
  
    if(!municipalite){
      return next(new AppError('No municipalite with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      municipalite
   });
});

exports.ajout_municipalite = catchAsync(async (req, res, next) => {

    const nouveau_municipalite = await models.Municipalite.create({id: uuidv4(),...req.body});
  
    if(!nouveau_municipalite){
       return next(new AppError('Invalid fields or duplicate municipalite', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_municipalite
    });
});

exports.modifier_municipalite = catchAsync(async(req, res, next) => {

    const utlisateur = await models.Municipalite.update(req.body, { where: { id: req.params.id } });
  
    if(!utlisateur){
       return next(new AppError('Invalid fields or No municipalite found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_municipalite = catchAsync(async(req, res, next) => {

    const municipalite = await models.Municipalite.destroy({ where: { id: req.params.id } });
  
    if(!municipalite){
       return next(new AppError('Invalid fields or No municipalite found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});
