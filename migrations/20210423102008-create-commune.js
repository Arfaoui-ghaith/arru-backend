'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('communes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      gouvernorat_id: {
        type: Sequelize.STRING,
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