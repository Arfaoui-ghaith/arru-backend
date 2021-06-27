const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const { v4: uuidv4 } = require('uuid');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

exports.consulter_tous_les_traces = catchAsync(async (req, res, next) => {

    const traces = await models.Trace.findAll({ include: { model: models.Utilisateur, as: 'utilisateur' } });
  
    if(!traces){
       return next(new AppError('No traces found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: traces.length,
        traces
    });

});

exports.consulter_tous_les_traces_par_utilisateur = catchAsync(async (req, res, next) => {

    const traces = await models.Trace.findAll({ include: { model: models.Utilisateur, as: 'utilisateur', where: { id: req.params.id } } });
  
    if(!traces){
       return next(new AppError('No traces found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: traces.length,
        traces
    });

});


exports.ajout_trace = catchAsync(async(user,action) => {
    const trace = await models.Trace.create({ id: uuidv4(), utilisateur_id: user.id, action});
    console.log("hello",trace);
    if(!trace){
        return next(new AppError('Invalid fields or duplicate trace', 401));
    }
    const traces = await models.Trace.findAll({ include: { model: models.Utilisateur, as: 'utilisateur' } });
    pubsub.publish('TRACES', { traces });
});

exports.traceResolvers = {
    Subscription: {
        traces: {
            subscribe: async (_,__,{id}) => {

                /*const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.fonctionalite_id = f.id AND f.titre = :fonctionalite",
                    { 
                        replacements: { utilisateur: id, fonctionalite: "consulter tous les utilisateurs" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }*/

                return pubsub.asyncIterator(['TRACES']);
            }
        }
    }
}