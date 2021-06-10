const utilisateurs = require('./../../controllers/access_permissions/utilisateurs');
const communes = require('./../../controllers/iddp/communes');
const roles = require('./../../controllers/access_permissions/roles');
const traces = require('./../../controllers/access_permissions/traces');
module.exports = {
    Query: {
        ...utilisateurs.utilisateurResolvers.Query,
        ...communes.communeResolvers.Query
    },
    Subscription: {
        ...utilisateurs.utilisateurResolvers.Subscription,
        ...roles.rolesResolvers.Subscription,
        ...communes.communeResolvers.Subscription,
        ...traces.traceResolvers.Subscription
    }
}