'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('municipalites', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      gouvernorat_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'gouvernorates',
          key: 'id'
        }
      },
      commune_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'communes',
          key: 'id'
        }
      },
      nom: {
        type: Sequelize.STRING
      },
      nom_ar: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('municipalites');
  }
};