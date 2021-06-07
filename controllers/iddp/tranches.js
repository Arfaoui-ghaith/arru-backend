const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('../utils/codification');
const { v4: uuidv4 } = require('uuid');

exports.consulter_tous_les_tranches = catchAsync(async (req, res, next) => {

    const tranches = await models.Tranche.findAll({
        include: { model: models.Projet, as: 'projets', attributes: { exclude: ['tranche_id', 'createdAt', 'updatedAt']},
            include: { model: models.Quartier, as: 'quartiers' } },
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] },
        order: ['numero']
    });
    
    if(!tranches){
       return next(new AppError('No communes found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: tranches.length,
        tranches
    });

});

exports.consulter_tranche = catchAsync(async (req, res, next) => {

    const tranche = await models.Tranche.findByPk(
        req.params.id,
        {
            include: { model: models.Projet, as: 'projets', exclude: ['tranche_id', 'createdAt', 'updatedAt']},
            attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] },
            order: ['numero']
        }
    );
    
    if(!tranche){
       return next(new AppError('No tranche found.', 404));
    }

    res.status(200).json({
        status: 'success',
        tranche
    });

});

exports.ajout_tranche = catchAsync(async (req, res, next) => {

    const nouveau_tranche = await models.Tranche.create({
        id: uuidv4(),
        numero: req.body.numero
    });
  
    if(!nouveau_tranche){
       return next(new AppError('Invalid fields or duplicate commune', 401));
    }

    req.body.projets.map(async (id) => {
        await models.Projet.update({ tranche_id: nouveau_tranche.id },{ where: { id } })
    });
  
    res.status(201).json({
        status: 'success',
        nouveau_tranche
    });

});

exports.modifier_tranche = catchAsync(async(req, res, next) => {

    const tranche = await models.Tranche.findByPk(req.params.id, {
        where: { id: req.params.id },
        include: { model: models.Projet, as: 'projets', exclude: ['tranche_id', 'createdAt', 'updatedAt']},
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] },
        order: ['numero']
    });

    if(!tranche){
        return next(new AppError('tranche no found', 404));
    }

    if(req.body.numero){
        await models.Tranche.update({ numero: req.body.numero }, { id: tranche.id });
    }

    if(req.body.projets){
        await models.Projet.update({ tranche_id: null }, { where: { tranche_id: tranche.id } });

        req.body.projets.map(async (id) => {
            await models.Projet.update({ tranche_id: tranche.id }, { where: { id } });
        });
    }
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_tranche = catchAsync(async(req, res, next) => {

    await models.Projet.update({ tranche_id: null }, { where: { tranche_id: req.params.id } });
    const tranche = await models.Tranche.destroy({ where: { id: req.params.id } });
  
    if(!tranche){
       return next(new AppError('tranche not found', 404));
    }
  
    res.status(203).json({
        status: 'success',
    });
});
