const models  = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const AppError = require('./../../utils/appError');
const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

module.exports = {
    Query: {
      utilisateurs: async (_, __,{user}) => {
        
      try{

        if(!user){
          throw new AppError('You are not logged In ! Please log in to get access.',401);
        }else {
          models.Utilisateur.findByPk(user.payload.id).then((user) => console.log(user)).catch((err) => {throw new AppError('The user belonging to this token does not exist.',401);});
        }
        
        const utilisateurs = await models.Utilisateur.findAll();

        var users = [];
        for( const user of utilisateurs ){

          let obj = {id: user.id, nom: user.nom, prenom: user.prenom, cin: user.cin, email: user.email, image: user.image, telephone: user.telephone};
          const roles = await models.sequelize.query("SELECT r.titre FROM `roles` as r, `utilisateures_roles` as ur WHERE r.id = ur.role_id AND ur.utilisateur_id = :utilisateur",
          { 
              replacements: { utilisateur: user.id },
              type: models.sequelize.QueryTypes.SELECT 
          });

          obj.roles = roles;
          users.push(obj);

        }
        console.log(users);
        return users;

      }catch(error){
        throw error
      }

    },
      
    },
    Subscription: {
      utilisateurs: {
        subscribe: () => pubsub.asyncIterator('UTILISATEURS')
      }
    }
}