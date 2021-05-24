'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('points', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        
        primaryKey: true,
      },
      quartier_id: {
        type: Sequelize.UUID,
        references: {
          model: 'quartiers',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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