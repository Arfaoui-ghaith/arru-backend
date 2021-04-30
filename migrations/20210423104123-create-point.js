'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('points', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      quartier_id: {
        type: Sequelize.STRING,
        references: {
          model: 'quartiers',
          key: 'id'
        }
      },
      lat: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      lng:{
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
    await queryInterface.dropTable('points');
  }
};