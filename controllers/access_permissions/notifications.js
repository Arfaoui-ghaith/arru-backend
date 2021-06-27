const models = require('./../../models/index');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const { v4: uuidv4 } = require('uuid');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

exports.consulter_tous_les_notifications = catchAsync(async (req, res, next) => {

    const notifications = await models.Notification.findAll({ include: { model: models.Interface, as: 'interface' }, order: [['updatedAt', 'DESC']] });
  
    if(!notifications){
       return next(new AppError('No notifications found.', 404));
    }
  
    res.status(200).json({
        status: 'success',
        results: notifications.length,
        notifications
    });

});

exports.ajout_notification = catchAsync(async(interface_id,message,type) => {
    const notification = await models.Notification.create({ id: uuidv4(), interface_id, message, type});
    if(!notification){
        return next(new AppError('Invalid fields or duplicate notification', 401));
    }

    console.log("hello notification",notification);
    
    const notifications = await models.Notification.findAll({ include: { model: models.Interface, as: 'interface' } });
    pubsub.publish('NOTIFICATIONS', { notifications });
});

exports.notificationResolvers = {
    Subscription: {
        notifications: {
            subscribe: async (_,__,{id}) => {

                /*const roles = await models.sequelize.query(
                    "SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur, `roles_fonctionalités` as rf, `fonctionalités` as f "
                    +"WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur AND r.id = rf.role_id AND rf.interface_id = f.id AND f.titre = :interface",
                    { 
                        replacements: { utilisateur: id, interface: "consulter tous les utilisateurs" },
                        type: models.sequelize.QueryTypes.SELECT 
                    }
                );
        
                if (roles.length == 0) {    
                       throw new AppError('You do not have permission to perform this action', 403);
                }*/

                return pubsub.asyncIterator(['NOTIFICATIONS']);
            }
        }
    }
}