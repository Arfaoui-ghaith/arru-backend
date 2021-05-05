'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
    queryInterface.changeColumn('fiche_criteres', 'nbr_quartier', {
      type: Sequelize.STRING,
      defaultValue: 0,
    }),
    queryInterface.changeColumn('fiche_criteres', 'surface_totale', {
      type: Sequelize.DOUBLE,
      defaultValue: 0,
    }),
    queryInterface.changeColumn('fiche_criteres', 'surface_urbanisée_totale', {
      type: Sequelize.DOUBLE,
      defaultValue: 0,
    }),
    queryInterface.changeColumn('fiche_criteres', 'nombre_logements_totale', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }),
    queryInterface.changeColumn('fiche_criteres', 'nombre_habitants_totale', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('fiche_criteres', 'nbr_quartier'),
      queryInterface.removeColumn('fiche_criteres', 'surface_totale'),
      queryInterface.removeColumn('fiche_criteres', 'surface_urbanisée_totale'),
      queryInterface.removeColumn('fiche_criteres', 'nombre_logements_totale'),
      queryInterface.removeColumn('fiche_criteres', 'nombre_habitants_totale'),
    ]);
  }
};
