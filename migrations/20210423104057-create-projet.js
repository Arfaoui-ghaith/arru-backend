'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      eligible: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      zone_intervention_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'zone_interventions',
          key: 'id'
        }
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
    await queryInterface.dropTable('projets');
  }
};