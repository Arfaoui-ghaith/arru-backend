const utilisateurs = require('./../../controllers/access_permissions/utilisateurs');
const communes = require('./../../controllers/iddp/communes');
const roles = require('./../../controllers/access_permissions/roles');
const traces = require('./../../controllers/access_permissions/traces');
const projets = require('./../../controllers/iddp/projets');
const quartiers = require('./../../controllers/iddp/quartiers');
const gouvernorats = require('./../../controllers/iddp/gouvernorats');
const criteres = require('./../../controllers/iddp/criteres');
const tranches = require('./../../controllers/iddp/tranches');

module.exports = {
    Subscription: {
        ...utilisateurs.utilisateurResolvers.Subscription,
        ...roles.rolesResolvers.Subscription,
        ...gouvernorats.gouvernoratResolvers.Subscription,
        ...communes.communeResolvers.Subscription,
        ...traces.traceResolvers.Subscription,
        ...projets.projetResolvers.Subscription,
        ...quartiers.quartiersResolvers.Subscription,
        ...criteres.critereResolvers.Subscription,
        ...tranches.trancheResolvers.Subscription
    }
}