const { gql } = require('apollo-server');

const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // Convert hard-coded AST string to type expected by parseValue
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

module.exports = gql`
scalar dateScalar
type Role {
    titre: String!
}
type User {
    id: String!
    nom: String!
    prenom: String!
    cin: String!
    email: String!
    password: String!
    roles: [Role]
    createdAt: dateScalar
    updatedAt: dateScalar
    token: String
}
type Query {
    utilisateurs: [User]!
}
type Subscription {
    utilisateurs: [User]
}`