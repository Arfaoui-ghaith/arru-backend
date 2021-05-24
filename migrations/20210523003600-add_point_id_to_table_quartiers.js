'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'quartiers', // table name
      'point_id', // new field name
      {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'points',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('quartiers', 'point_id')
  }
};
