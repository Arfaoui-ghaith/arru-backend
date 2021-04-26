'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Quartiers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      zone_intervention_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Zone_Interventions',
          key: 'id'
        }
      },
      /*point_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Points',
          key: 'id'
        }
      },*/
      nom_fr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nom_ar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      surface: {
        type: Sequelize.DOUBLE,
      },
      surface_urbanisée: {
        type: Sequelize.DOUBLE,
      },
      nombre_logements:{
        type: Sequelize.INTEGER,
      },
      nombre_habitants:{
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Quartiers');
  }
};