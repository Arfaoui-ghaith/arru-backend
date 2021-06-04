'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'prestataires',
      'abreviation',
      {
        type: Sequelize.STRING,
        allowNull: false
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('prestataires', 'abreviation')
  }
};
