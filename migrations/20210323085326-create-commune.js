'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('communes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      gouvernorat_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'gouvernorats',
          key: 'id'
        }
      },
      nom_fr: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nom_ar: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('communes');
  }
};