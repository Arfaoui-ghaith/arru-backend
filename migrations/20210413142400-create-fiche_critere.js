'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fiche_criteres', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      gouvernorat_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'gouvernorats',
          key: 'id'
        }
      },
      nbr_quartier_min: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('fiche_criteres');
  }
};