const { ApolloServer } = require('apollo-server-express');
const { sequelize } = require('./models');
const dotenv = require('dotenv');

//const contextMiddleware = require('./utils/contextMiddleware');

process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNCAUGHT EXCEPTION! Shutting down....');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const apollo = new ApolloServer({
    typeDefs, 
    resolvers
});

apollo.applyMiddleware({ app });


const server = app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${apollo.graphqlPath}`);
  sequelize.authenticate().then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));
});

process.on('unHandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLER REJECTION! Shutting down....');
  server.close(() => {
    process.exit(1);
  });
});