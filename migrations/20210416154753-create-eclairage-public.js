'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eclairage_publics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      infrastructure_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'infrastructures',
          key: 'id'
        }
      },
      p_lumineux: {
        type: Sequelize.DOUBLE
      },
      cout: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('eclairage_publics');
  }
};