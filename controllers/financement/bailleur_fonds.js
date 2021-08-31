const models = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const trace = require('./../access_permissions/traces');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const publishBailleurs = catchAsync(async() => {
    const bailleurs = await models.Bailleur_fonds.findAll({});
    pubsub.publish('BAILLEURS', { bailleurs });
});

exports.consulter_tous_les_bailleur_fonds = catchAsync(async (req, res, next) => {

    const bailleur_fonds = await models.Bailleur_fonds.findAll({});
  
    if(!bailleur_fonds){
       return next(new AppError('No bailleur_fonds found.', 404));
    }

    res.status(200).json({
        status: 'success',
        results: bailleur_fonds.length,
        bailleur_fonds
    });

});

exports.consulter_bailleur_fond = catchAsync(async (req, res, next) => {

    const bailleur_fond = await models.Bailleur_fonds.findByPk(req.params.id);
  
    if(!bailleur_fond){
      return next(new AppError('No bailleur_fond with this ID.',404));
    }
   
    res.status(200).json({
      status: 'success',
      bailleur_fond
    });

});

exports.ajout_bailleur_fond = catchAsync(async (req, res, next) => {

    const nouveau_bailleur_fond = await models.Bailleur_fonds.create({id: uuidv4(),...req.body, image: req.file.filename});
  
    if(!nouveau_bailleur_fond){
        return next(new AppError('Invalid fields or duplicate bailleur_fond', 401));
    }

    await publishBailleurs();

    await trace.ajout_trace(req.user, "Ajouter Bailleur de fonds "+nouveau_bailleur_fond.nom);
  
    res.status(201).json({
        status: 'success',
        nouveau_bailleur_fond
    });

});

exports.modifier_bailleur_fond = catchAsync(async(req, res, next) => {

    if(req.file && req.file.filename){
        req.body.image = req.file.filename;
    }

    const bailleur_fond = await models.Bailleur_fonds.update(req.body, { where: { id: req.params.id } });
  
    if(!bailleur_fond){
       return next(new AppError('Invalid fields or No point found with this ID', 404));
    }

    await publishBailleurs();

    await trace.ajout_trace(req.user, "Modifier Bailleur de fonds "+bailleur_fond.nom);
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.supprimer_bailleur_fond = catchAsync(async(req, res, next) => {

    const bailleur = await models.Bailleur_fonds.findByPk(req.params.id);

    const bailleur_fond = await models.Bailleur_fonds.destroy({ where: { id: req.params.id } });
  
    if(!bailleur_fond){
       return next(new AppError('Invalid fields or No bailleur_fond found with this ID', 404));
    }

    await publishBailleurs();

    await trace.ajout_trace(req.user, `Supprimer le bailleur de fonds ${bailleur.nom}`);
  
    res.status(203).json({
        status: 'success',
    });
    
});

exports.bailleursResolvers = {
    Subscription: {
        bailleurs: {
            subscribe: async (_,__,{id}) => {

                /*const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter les bailleurs" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }*/

                return pubsub.asyncIterator(['BAILLEURS']);
            }
        }
    }
}