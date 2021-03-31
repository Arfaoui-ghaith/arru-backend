'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('criteres', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      nbr_quartier_min: {
        type: Sequelize.INTEGER,
      },
      nbr_quartier_max: {
        type: Sequelize.INTEGER,
      },
      nbr_maison_min: {
        type: Sequelize.INTEGER,
      },
      nbr_maison_max: {
        type: Sequelize.INTEGER,
      },
      nbr_habitant_min: {
        type: Sequelize.INTEGER,
      },
      nbr_habitant_max: {
        type: Sequelize.INTEGER,
      },
      taux_habitation_min: {
        type: Sequelize.INTEGER,
      },
      taux_habitation_max: {
        type: Sequelize.INTEGER,
      },
      assainissement_qte_min: {
        type: Sequelize.DOUBLE,
      },
      assainissement_qte_max: {
        type: Sequelize.DOUBLE,
      },
      assainissement_cout_min: {
        type: Sequelize.INTEGER,
      },
      assainissement_cout_max: {
        type: Sequelize.INTEGER,
      },
      assainissement_taux_min: {
        type: Sequelize.INTEGER,
      },
      assainissement_taux_max: {
        type: Sequelize.INTEGER,
      },
      eclairage_public_qte_min: {
        type: Sequelize.INTEGER,
      },
      eclairage_public_qte_max: {
        type: Sequelize.INTEGER,
      },
      eclairage_public_cout_min: {
        type: Sequelize.INTEGER,
      },
      eclairage_public_cout_max: {
        type: Sequelize.INTEGER,
      },
      eclairage_pubic_taux_min: {
        type: Sequelize.INTEGER,
      },
      eclairage_public_taux_max: {
        type: Sequelize.INTEGER,
      },
      voirie_qte_min: {
        type: Sequelize.DOUBLE,
      },
      voirie_qte_max: {
        type: Sequelize.DOUBLE,
      },
      voirie_cout_min: {
        type: Sequelize.INTEGER,
      },
      voirie_cout_max: {
        type: Sequelize.INTEGER,
      },
      voirie_taux_min: {
        type: Sequelize.INTEGER,
      },
      voirie_taux_max: {
        type: Sequelize.INTEGER,
      },
      eau_potable_qte_min: {
        type: Sequelize.DOUBLE,
      },
      eau_potable_qte_max: {
        type: Sequelize.DOUBLE,
      },
      eau_potable_cout_min: {
        type: Sequelize.INTEGER,
      },
      eau_potable_cout_max: {
        type: Sequelize.INTEGER,
      },
      eau_potable_taux_min: {
        type: Sequelize.INTEGER,
      },
      eau_potable_taux_max: {
        type: Sequelize.INTEGER,
      },
      drainage_qte_min: {
        type: Sequelize.DOUBLE,
      },
      drainage_qte_max: {
        type: Sequelize.DOUBLE,
      },
      drainage_cout_min: {
        type: Sequelize.INTEGER,
      },
      drainage_cout_max: {
        type: Sequelize.INTEGER,
      },
      drainage_taux_min: {
        type: Sequelize.INTEGER,
      },
      drainage_taux_max: {
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('criteres');
  }
};