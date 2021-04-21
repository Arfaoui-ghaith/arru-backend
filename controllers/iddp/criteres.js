const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const codification = require('./../utils/codification');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

exports.consulter_tous_les_criteres = catchAsync(async (req, res, next) => {
    
    const criteres = await models.Fiche_critere.findAll({ where: { active: true } });
  
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

    const critere = await models.Fiche_critere.findByPk(req.params.id);
  
    if(!critere){
      return next(new AppError('No critere with this ID.',404));
    }
   
   res.status(200).json({
      status: 'success',
      critere
   });

});

exports.ajout_critere = catchAsync(async (req, res, next) => {

    const nouveau_critere = await models.Fiche_critere.create({id: codification.codeCritere(req.body.gouvernorat_id), ...req.body});
  
    if(!nouveau_critere){
       return next(new AppError('Invalid fields or duplicate critere', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_critere
    });

});

exports.modifier_critere = catchAsync(async(req, res, next) => {

    const fiche_critere = await models.Fiche_critere.findOne({id: req.params.id });

    if(!fiche_critere){
        return next(new AppError('Invalid fields or No projet found with this ID', 404));
    }

    fiche_critere.active = false;
    await fiche_critere.save();

    req.body.fiche_critere.id = codification.codeCritere(fiche_critere.gouvernorat_id);
  
    const critere = await models.Fiche_critere.create(req.body.fiche_critere);

    if(!critere){
        return next(new AppError('Invalid fields or duplicate critere', 401));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});