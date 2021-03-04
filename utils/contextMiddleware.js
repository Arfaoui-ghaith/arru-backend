const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

module.exports =  context => {
        
        let token;
        if (
          context.req.headers.authorization &&
          context.req.headers.authorization.startsWith('Bearer')
        ) {
          token = context.req.headers.authorization.split(' ')[1];
        }
        
        if(!token){
            context.user = null; return context;
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
          if(err) {context.user = null; return context;}
              
          context.user = decodedToken;
          
        });

        return context;
}