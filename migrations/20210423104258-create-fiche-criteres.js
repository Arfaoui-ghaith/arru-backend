'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Fiche_criteres', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      gouvernorat_id: {
        type: Sequelize.STRING,
        references: {
          model: 'Gouvernorats',
          key: 'id'
        }
      },
      nbr_quartier: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Fiche_criteres');
  }
};