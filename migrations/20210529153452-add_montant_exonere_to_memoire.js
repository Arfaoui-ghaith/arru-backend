'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'memoires', // table name
      'montant_exonere', // new field name
      {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('memoires', 'montant_exonere')
  }
};
