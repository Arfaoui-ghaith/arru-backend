'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('memoires', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      projet_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'projets',
          key: 'id'
        }
      },
      source_financement: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'bailleur_fonds',
          key: 'id'
        }
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
      brut: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
      },
      composante: {
        type: Sequelize.ENUM,
        values: ['Infrastructure','Etude'],
        allowNull: false
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