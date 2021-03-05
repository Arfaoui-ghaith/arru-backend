const utilisateurs = require('./../../controllers/utilisateurs');
const roles = require('./../../controllers/roles');
module.exports = {
    Query: {
        ...utilisateurs.utilisateurResolvers.Query,
    },
    Subscription: {
        ...utilisateurs.utilisateurResolvers.Subscription,
        ...roles.rolesResolvers.Subscription
    }
}