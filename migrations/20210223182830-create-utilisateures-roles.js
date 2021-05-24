'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('utilisateures_roles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
     
        primaryKey: true,
      },
      utilisateur_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'utilisateurs',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      specification_id: {
        type: Sequelize.UUID,
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
    await queryInterface.dropTable('utilisateures_roles');
  }
};