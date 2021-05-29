'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('memoires', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        
        primaryKey: true,
      },
      projet_id: {
        type: Sequelize.UUID,
        references: {
          model: 'projets',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      htva: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
      },
      tva: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
      },
      gestion_frais_tva: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
      },
      frais_gestion: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
      },
      timbre_fiscale: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
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
    await queryInterface.dropTable('memoires');
  }
};