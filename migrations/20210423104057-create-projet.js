'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
  
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      eligible: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      surface_totale: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      surface_urbanisée_totale: {
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },
      nombre_logements_totale:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      nombre_habitants_totale:{
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      bureau_etude: {
        type: Sequelize.STRING,
        defaultValue: ""
      },
      cout_etude: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
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