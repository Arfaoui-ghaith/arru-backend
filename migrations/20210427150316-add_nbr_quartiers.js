'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Zone_Interventions', // table name
      'nbr_quartier', // new field name
      {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Zone_Interventions', 'nbr_quartier')
  }
};
