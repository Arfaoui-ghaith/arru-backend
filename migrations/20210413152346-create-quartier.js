'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quartiers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      projet_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'projets',
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
      lat: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      lng: {
        type: Sequelize.DOUBLE,
        allowNull: false
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
    await queryInterface.dropTable('quartiers');
  }
};