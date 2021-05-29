'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('decomptes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
       
        primaryKey: true,
      },
      prestataire_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'prestataires',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      memoire_id:{
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'memoires',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      montant: {
        type: Sequelize.DOUBLE,
        defaultValue: 0.0,
      },
      date_paiement: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('decomptes');
  }
};