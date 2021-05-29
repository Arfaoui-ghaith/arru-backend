const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('../utils/codification');
const { v4: uuidv4 } = require('uuid');

exports.consulter_tous_les_prestataires = catchAsync(async (req, res, next) => {

    const prestataires = await models.Prestataire.findAll({
        include: { model: models.Decompte, as: 'decomptes', attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt'] } } },
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] }
    });
    
    if(!prestataires){
       return next(new AppError('No prestataires found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: prestataires.length,
        prestataires
    });

});

exports.consulter_prestataire = catchAsync(async (req, res, next) => {

    const prestataire = await models.Prestataire.findByPk(req.params.id, {
        include: { model: models.Decompte, as: 'decomptes', attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt'] } } },
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] }
    });
  
    if(!prestataire){
        return next(new AppError('No commune with this ID.',404));
    }
   
    res.status(200).json({
        status: 'success',
        prestataire
    });

});

exports.ajout_prestataire = catchAsync(async (req, res, next) => {

    const nouveau_prestataire = await models.Prestataire.create({
        id: uuidv4(),
        code: codification.codeCommune(req.body.gouvernorat_code,req.body.nom_fr),
        ...req.body
    });
  
    if(!nouveau_prestataire){
       return next(new AppError('Invalid fields or duplicate commune', 401));
    }
  
    res.status(201).json({
        status: 'success',
        nouveau_prestataire
    });

});

exports.modifier_prestataire = catchAsync(async(req, res, next) => {

    const prestataire = await models.Prestataire.update(req.body, { where: { id: req.params.id } });
  
    if(!prestataire){
       return next(new AppError('Invalid fields or No commune found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_prestataire = catchAsync(async(req, res, next) => {

    await models.Decompte.update({ prestataire_id: null }, { where: { prestataire_id: req.params.id } })
    const prestataire = await models.Prestataire.destroy({ where: { id: req.params.id } });
  
    if(!prestataire){
       return next(new AppError('No prestataire found with this ID', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });

});
