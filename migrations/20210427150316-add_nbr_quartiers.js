'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'zone_interventions', // table name
      'nbr_quartier', // new field name
      {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('zone_interventions', 'nbr_quartier')
  }
};
