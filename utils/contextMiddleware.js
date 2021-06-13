const jwt = require('jsonwebtoken');
const models = require('./../models/index');

const { AuthenticationError } = require('apollo-server');
const AppError = require('./../utils/appError');

module.exports = async ({ req, connection }) => {
  if (connection) { 

  let token;
  let id;
  if ( connection.context.user && connection.context.user.startsWith('Bearer') ) {
      token = connection.context.user.split(' ')[1];
    }
  
  if(!token){
    throw new AppError('You are not logged In ! Please log in to get access.',403);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if(err) {
      throw new AppError('Invalid Or Expired Token !',400);
    }
    
    models.Utilisateur.findByPk(decodedToken.payload.id).catch((err) => { throw new AppError('The user belonging to this token does not exist.',401); });
    
    id = decodedToken.payload.id;
  });
  
  return { id };

  }
};