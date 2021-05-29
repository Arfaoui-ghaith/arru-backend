'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'projets', // table name
      'tranche_id', // new field name
      {
        type: Sequelize.UUID,
        references: {
          model: 'tranches',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projets', 'tranche_id')
  }
};
