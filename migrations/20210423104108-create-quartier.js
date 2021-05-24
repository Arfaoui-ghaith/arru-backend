'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quartiers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        
        primaryKey: true,
      },
      projet_id: {
        
        type: Sequelize.UUID,
        references: {
          model: 'projets',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      /*point_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'points',
          key: 'id'
        }
      },*/
      commune_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'communes',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nom_fr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nom_ar: {
        allowNull: false,
        type: Sequelize.STRING
      },
      surface: {
        type: Sequelize.DOUBLE,
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
    await queryInterface.dropTable('quartiers');
  }
};