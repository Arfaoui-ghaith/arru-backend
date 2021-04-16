'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('infrastructures', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      projet_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'projets',
          key: 'id'
        }
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
    await queryInterface.dropTable('infrastructures');
  }
};