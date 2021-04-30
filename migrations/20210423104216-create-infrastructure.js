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
      type: {
        type: Sequelize.ENUM,
        values: ['Drainage','Assainissement','Eau potable','Eclairage public','Voirie']
      },
      quantité: Sequelize.DOUBLE,
      cout: Sequelize.DOUBLE,
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