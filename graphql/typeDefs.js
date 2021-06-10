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
type Fonctionalite {
    titre: String!
}
type Specification {
    titre: String!
}
type Role {
    id: String!
    titre: String
    specification: [Specification]
    fonctionalites: [Fonctionalite]
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
type Point {
  id: String!
  lat: Float!
  lng: Float!
  quartier_id: String
}
type Quartier {
    id: String!
    code: String!
    nom_fr: String!
    nom_ar: String!
    center: Point!
    latlngs: [Point]!
}
type Gouvernorat {
    id: String!
    code: String!
    nom_fr: String!
    nom_ar: String!
}
type Commune {
    id: String!
    code: String!
    nom_fr: String!
    nom_ar: String!
    gouvernorat: Gouvernorat!
    quartiers: [Quartier]!
}
type Trace {
  utilisateur: User
  action: String!
  createdAt: dateScalar
}
type Query {
    utilisateurs: [User]!
    communes: [Commune]!
}
type Subscription {
    utilisateurs: [User]
    roles: [Role]
    communes: [Commune]!
    traces: [Trace]
}`