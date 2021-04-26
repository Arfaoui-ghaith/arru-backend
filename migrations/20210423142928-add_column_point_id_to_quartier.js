'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Quartiers', // table name
      'point_id', // new field name
      {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Points',
          key: 'id'
        }
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Quartiers', 'point_id')
  }
};
