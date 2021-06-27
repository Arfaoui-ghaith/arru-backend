const { gql } = require('apollo-server');

const { GraphQLScalarType, Kind } = require('graphql');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to Int for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming Int to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // Convert hard-coded AST string to type expected by parseValue
    }
    return null; // Invalid hard-coded value (not an Int)
  },
});

module.exports = gql`
scalar dateScalar
type Fonctionalite {
    titre: String!
}
type Interface {
    titre: String!
}
type Notification {
  message: String!
  type: String!
  interface: Interface
}
type Specification {
    titre: String!
}
type Role {
    id: String
    titre: String
    specification: [Specification]
    fonctionalites: [Fonctionalite]
}
type RoleInfo {
  id: String
  role: Role
}
type User {
    id: String!
    nom: String!
    prenom: String!
    cin: String!
    email: String!
    telephone: String!
    password: String!
    roles: [RoleInfo]
    createdAt: dateScalar
    updatedAt: dateScalar
    token: String
}
type Bailleur {
  id: String!
  nom: String!
  image: String!
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
    surface: Float!
}
type Tranche {
    id: String
    numero: Int
    projets: [Projet]!
}
type Gouvernorat {
    id: String
    code: String
    nom_fr: String
    nom_ar: String
    fiche_criteres: Fiche
}
type Gouvernorat_Quartiers {
    id: String!
    code: String!
    nom_fr: String!
    nom_ar: String!
    communes: [Commune]!
}
type Fiche {
    id: String!
    gouvernorat_id: String!
    surface_totale: Float!,
    surface_urbanisee_totale: Float!
    nombre_logements_totale: Float!
    nombre_habitants_totale: Float!
    gouvernorat: Gouvernorat
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
type Infrastructure {
  id: String!
  code: String!
  type: String!
  quantite: Float
  cout: Float
}
type Projet {
  id: String!
  code: String!
  eligible: Boolean!
  nbr_quartiers: Int!
  surface_totale: Float!,
  surface_urbanisee_totale: Float!
  nombre_logements_totale: Float!
  nombre_habitants_totale: Float!
  bureau_etude: String
  cout_etude: Float
  tranche: String
  quartiers: [Quartier]!
  infrastructures: [Infrastructure]
}
type Financement {
  id: String!
  montant: Float!
  type: String!
  bailleur_fond: Bailleur
}
type Memoire {
  id: String!
  projet_id: String!
  htva: Float!
  montant_exonere: Float!
  tva: Float!
  gestion_frais_tva: Float!
  frais_gestion: Float!
  timbre_fiscale: Float!
  financements: [Financement]!
  projet: Projet
}
type Prestataire {
  id: String!
  nom: String!
  abreviation: String!
  decomptes: [Decompte]!
}
type Decompte {
  id: String!
  montant: Float!
  date_paiement: dateScalar
  memoire: Memoire
  prestataire: Prestataire
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
    projets: [Projet]!
    gouvernorats: [Gouvernorat_Quartiers]!
    quartiers: [Quartier]!
    criteres: [Fiche]!
    tranches: [Tranche]!
    bailleurs: [Bailleur]!
    memoires: [Memoire]!
    decomptes: [Decompte]!
    prestataires: [Prestataire]!
    notifications: [Notification]!
}`