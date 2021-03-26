'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quartiers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      projet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'projets',
          key: 'id'
        }
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      iat: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      ing:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      superficie: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      superficie_couvert: {
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
    await queryInterface.dropTable('quartiers');
  }
};