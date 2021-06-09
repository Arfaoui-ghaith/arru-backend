'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('progres', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      infrastructure_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'infrastructures',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      cout: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('progres');
  }
};