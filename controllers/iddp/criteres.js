const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const codification = require('./../utils/codification');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_criteres = catchAsync(async (req, res, next) => {

    const criteres = await models.Fiche_criteres.findAll({
        include: { model: models.Gouvernorat, as: 'gouvernorat', attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt']}}
    });
  
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

    const critere = await models.Fiche_criteres.findByPk(req.params.id,
        {
            include: { model: models.Gouvernorat, as: 'gouvernorat', attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt']}}
        }
    );
  
    if(!critere){
      return next(new AppError('No critere with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      critere
   });

});

exports.ajout_critere = catchAsync(async (req, res, next) => {

    const nouveau_critere = await models.Fiche_criteres.create({id: uuidv4(), ...req.body});
  
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
    const projets = await models.sequelize.query("SELECT DISTINCT(p.id) FROM projets as p, fiche_criteres as f, quartiers as q, communes as c, gouvernorats as g WHERE g.id = f.gouvernorat_id and g.id = c.gouvernorat_id and c.id = q.commune_id and q.projet_id = p.id and p.surface_totale >= f.surface_totale and p.surface_urbanisée_totale >= f.surface_urbanisée_totale and p.nombre_logements_totale >= f.nombre_logements_totale and p.nombre_habitants_totale >= f.nombre_habitants_totale and p.eligible = 0",
    {
        type: models.sequelize.QueryTypes.SELECT 
    });

    if(!projets){
        return next(new AppError('No projets found', 404));
    }

    projets.map(async(projet) => {
        await models.Projet.update({ eligible: true },{ where: { id: projet.id } });
    });

    res.status(203).json({
        status: 'success'
    });
});
