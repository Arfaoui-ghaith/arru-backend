const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('../utils/codification');
const { v4: uuidv4 } = require('uuid');
const trace = require('./../access_permissions/traces');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const publishPrestataires = catchAsync(async() => {
    const prestataires = await models.Prestataire.findAll({
        include: { model: models.Decompte, as: 'decomptes', attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt'] } } },
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] }
    });
    pubsub.publish('PRESTATAIRES', { prestataires });
});

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
        ...req.body
    });
  
    if(!nouveau_prestataire){
       return next(new AppError('Invalid fields or duplicate commune', 401));
    }

    await publishPrestataires();
  
    await trace.ajout_trace(req.user, `Ajouter le prestataire ${nouveau_prestataire.abreviation}`);

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

    await publishPrestataires();

    await trace.ajout_trace(req.user, `Modifier le prestataire ${prestataire.abreviation}`);
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_prestataire = catchAsync(async(req, res, next) => {

    const prestataireInfo = await models.Prestataire.findByPk(req.params.id);
    await models.Decompte.update({ prestataire_id: null }, { where: { prestataire_id: req.params.id } });
    const prestataire = await models.Prestataire.destroy({ where: { id: req.params.id } });
  
    if(!prestataire){
       return next(new AppError('No prestataire found with this ID', 404));
    }
  
    await publishPrestataires();
    
    await trace.ajout_trace(req.user, `Supprimer le prestataire ${prestataireInfo.abreviation}`);

    res.status(203).json({
        status: 'success',
    });

});

exports.prestatairesResolvers = {
    Subscription: {
        prestataires: {
            subscribe: async (_,__,{id}) => {

                /*const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter les prestataires" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }*/

                return pubsub.asyncIterator(['PRESTATAIRES']);
            }
        }
    }
}