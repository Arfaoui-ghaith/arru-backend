'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      municipalite_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'municipalites',
          key: 'id'
        }
      },
      nom: {
        type: Sequelize.STRING
      },
      nbr_qaurtier: {
        type: Sequelize.INTEGER,
        
      },
      nbr_maison: {
        type: Sequelize.INTEGER,
        
      },
      nbr_habitant: {
        type: Sequelize.INTEGER,
        
      },
      taux_habitation: {
        type: Sequelize.INTEGER,
      },
      assainissement_qte: {
        type: Sequelize.DOUBLE,
      },
      assainissement_cout: {
        type: Sequelize.INTEGER,
      },
      assainissement_taux: {
        type: Sequelize.INTEGER,
      },
      eclairage_public_qte: {
        type: Sequelize.INTEGER,
      },
      eclairage_public_cout: {
        type: Sequelize.INTEGER,
      },
      eclairage_public_taux: {
        type: Sequelize.INTEGER,
      },
      voirie_qte: {
        type: Sequelize.DOUBLE,
      },
      voirie_cout: {
        type: Sequelize.INTEGER,
      },
      voirie_taux: {
        type: Sequelize.INTEGER,
      },
      eau_potable_qte: {
        type: Sequelize.DOUBLE,
      },
      eau_potable_cout: {
        type: Sequelize.INTEGER,
      },
      eau_potable_taux: {
        type: Sequelize.INTEGER,
      },
      drainage_qte: {
        type: Sequelize.DOUBLE,
      },
      drainage_cout: {
        type: Sequelize.INTEGER,
      },
      drainage_taux: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('projets');
  }
};