'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Etudes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projet_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Projets',
          key: 'id'
        }
      },
      bureau:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      cout: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable('Etudes');
  }
};