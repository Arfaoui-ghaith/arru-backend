'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('financements', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        
        primaryKey: true,
      },
      bailleur_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'bailleur_fonds',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      memoire_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'memoires',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      montant: {
        type: Sequelize.DOUBLE
      },
      type: {
        type: Sequelize.ENUM,
        values: ['prévisionnel','deblocage','reliquat'],
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
    await queryInterface.dropTable('financements');
  }
};