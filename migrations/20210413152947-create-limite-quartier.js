'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('limite_quartiers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      quartier_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'quartiers',
          key: 'id'
        }
      },
      iat: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      ing: {
        type: Sequelize.DOUBLE,
        allowNull: false
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
    await queryInterface.dropTable('limite_quartiers');
  }
};