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

  } else { // Operation is a Query/Mutation
    // Obtain header-provided token from req.headers
    let token;
    let id;
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token){
      throw new AppError('You are not logged In ! Please log in to get access.',403);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if(err) {
        console.log(err);
        throw new AppError('Invalid Or Expired Token !',400);
      }
      
      models.Utilisateur.findByPk(decodedToken.payload.id).catch((err) => { throw new AppError('The user belonging to this token does not exist.',401); });
      id = decodedToken.payload.id;
    });
  
    console.log(id);
    return { id };
  }
};


/*module.exports = async context => {
  console.log(await context.currentUser);    
  /*let token;
  let user;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
      throw Error('You are not logged In ! Please log in to get access.');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if(err) {return {user};}
      user = decodedToken;
    });

  return { user };
    
}*/