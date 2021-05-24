'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles_interfaces', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        
        primaryKey: true,
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
      interface_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'interfaces',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    await queryInterface.dropTable('roles_interfaces');
  }
};