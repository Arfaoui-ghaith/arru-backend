'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'projets', // table name
      'nbr_quartiers', // new field name
      {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projets', 'nbr_quartiers')
  }
};
