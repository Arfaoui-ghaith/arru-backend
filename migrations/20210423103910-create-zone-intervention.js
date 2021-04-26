'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Zone_Interventions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      commune_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Communes',
          key: 'id'
        }
      },
      nom_fr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nom_ar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      surface_totale: {
        type: Sequelize.DOUBLE,
      },
      surface_urbanisée_totale: {
        type: Sequelize.DOUBLE,
      },
      nombre_logements_totale:{
        type: Sequelize.INTEGER,
      },
      nombre_habitants_totale:{
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
    await queryInterface.dropTable('Zone_Interventions');
  }
};