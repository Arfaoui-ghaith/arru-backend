const resolvers = require('./../../controllers/utilisateurs');

module.exports = {
    Query: {
        ...resolvers.utilisateurResolvers.Query,
    },
    Subscription: {
        ...resolvers.utilisateurResolvers.Subscription
    }
}