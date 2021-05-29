'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('fiche_criteres', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        
        primaryKey: true,
      },
      gouvernorat_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'gouvernorats',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      surface_totale: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      surface_urbanisée_totale: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      nombre_logements_totale:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      nombre_habitants_totale:{
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('fiche_criteres');
  }
};