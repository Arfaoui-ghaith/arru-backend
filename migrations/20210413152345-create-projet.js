'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      commune_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'communes',
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
      eligible: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      tranche: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('projets');
  }
};