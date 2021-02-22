const models  = require('../../models/index');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');


module.exports = {
    Query: {
      users: async (_, __,{user}) => {
      try{
        /*if(!user){
          throw new AuthenticationError('UNAUTHENTICATED');
        }else {
          models.User.findByPk(user.id).then((user) => console.log(user)).catch((err) => {throw new AuthenticationError('UNAUTHENTICATED');});
        }
        console.log('userAuth',user);*/
        const users = await models.User.findAll();
        
        return users;

      }catch(error){
        throw error
      }

    },
      
    },
    Mutation: {

    },
}