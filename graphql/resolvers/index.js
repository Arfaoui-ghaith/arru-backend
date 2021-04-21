const utilisateurs = require('./../../controllers/access_permissions/utilisateurs');
const roles = require('./../../controllers/access_permissions/roles');
module.exports = {
    Query: {
        ...utilisateurs.utilisateurResolvers.Query,
    },
    Subscription: {
        ...utilisateurs.utilisateurResolvers.Subscription,
        ...roles.rolesResolvers.Subscription
    }
}