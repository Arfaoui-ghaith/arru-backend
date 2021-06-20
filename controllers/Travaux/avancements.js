const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const codification = require('../utils/codification');
const { v4: uuidv4 } = require('uuid');
const trace = require('./../access_permissions/traces');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const publishprogress = catchAsync(async() => {
    const progress = await models.progres.findAll({
        include: { model: models.Decompte, as: 'decomptes', attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt'] } } },
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] }
    });
    pubsub.publish('progresS', { progress });
});

exports.consulter_progres = catchAsync(async (req, res, next) => {

    const progres = await models.progres.findByPk(req.params.id, {
        include: { model: models.Decompte, as: 'decomptes', attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: { model: models.Memoire, as: 'memoire', attributes: { exclude: ['createdAt', 'updatedAt'] } } },
        attributes: { exclude: ['gouvernorat_id', 'createdAt', 'updatedAt'] }
    });
  
    if(!progres){
        return next(new AppError('No commune with this ID.',404));
    }
   
    res.status(200).json({
        status: 'success',
        progres
    });

});

exports.ajout_progres = catchAsync(async (req, res, next) => {

    const nouveau_progres = await models.progres.create({
        id: uuidv4(),
        ...req.body
    });
  
    if(!nouveau_progres){
       return next(new AppError('Invalid fields or duplicate commune', 401));
    }

    await publishprogress();
  
    await trace.ajout_trace(req.user, `Ajouter le progres ${nouveau_progres.abreviation}`);

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

/*exports.progressResolvers = {
    Subscription: {
        progress: {
            subscribe: async (_,__,{id}) => {

                const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter tous les utilisateurs" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }

                return pubsub.asyncIterator(['PROGRES']);
            }
        }
    }
}*/