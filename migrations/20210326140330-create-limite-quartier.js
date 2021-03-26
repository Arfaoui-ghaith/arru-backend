'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('limite_quartiers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      qaurtier_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'quartiers',
          key: 'id'
        }
      },
      iat: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      ing:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('limite_quartiers');
  }
};