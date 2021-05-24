'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('infrastructures', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'projets',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      type: {
        type: Sequelize.ENUM,
        values: ['drainage des eaux pluviales','assainissement','eau potable','eclairage public','voirie'],
        unique: true
      },
      quantité: Sequelize.DOUBLE,
      cout: Sequelize.DOUBLE,
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
    await queryInterface.dropTable('infrastructures');
  }
};