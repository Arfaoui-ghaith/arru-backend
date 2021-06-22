const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('../utils/codification');
const { v4: uuidv4 } = require('uuid');
const trace = require('./../access_permissions/traces');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

/*const publishprogress = catchAsync(async() => {
    const progress = await models.progres.findAll({
        include: { model: models.Decompte, as: 'decomptes', attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt'] } } },
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] }
    });
    pubsub.publish('progresS', { progress });
});*/

exports.ajout_progres = catchAsync(async (req, res, next) => {

    const infra = await models.Infrastructure.findByPk(req.body.infrastructure_id,{
        include: { model: models.Projet, as: 'projet' }
    });

    if(!infra){
        return next(new AppError('No Infrastructure with this ID', 404));
    }

    const sum = await models.Progres.sum('quantite',{ where: { infrastructure_id: req.body.infrastructure_id } } );

    /*if((sum + req.body.quantite) > infra.quantite){
        return next(new AppError('this value out of range', 401));
    }*/

    const nouveau_progres = await models.Progres.create({
        id: uuidv4(),
        ...req.body
    });
  
    if(!nouveau_progres){
       return next(new AppError('Invalid fields or duplicate commune', 401));
    }

    /*await publishProgress();*/
  
    await trace.ajout_trace(req.user, `Ajouter avancement de ${nouveau_progres.quantite} de ${infra.type} pour le projet ${infra.projet.code}`);

    res.status(201).json({
        status: 'success',
        nouveau_progres
    });

});

exports.modifier_progres = catchAsync(async(req, res, next) => {

    const progres = await models.Progres.update(req.body, { where: { id: req.params.id } });
  
    if(!progres){
       return next(new AppError('Invalid fields or No commune found with this ID', 404));
    }

    await publishprogress();

    //await trace.ajout_trace(req.user, `Modifier le progres ${progres.abreviation}`);
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_progres = catchAsync(async(req, res, next) => {

    const avancementInfo = await models.Progres.findByPk(req.params.id);
    const avancement = await models.Progres.destroy({ where: { id: req.params.id } });
  
    if(!avancement){
       return next(new AppError('No avancement found with this ID', 404));
    }
    
    //await trace.ajout_trace(req.user, `Supprimer avancement ${progresInfo.abreviation}`);

    res.status(203).json({
        status: 'success',
    });

});