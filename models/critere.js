'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class critere extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  critere.init({
    nbr_quartier_min: {
      type: DataTypes.INTEGER,
    },
    nbr_quartier_max: {
      type: DataTypes.INTEGER,
    },
    nbr_maison_min: {
      type: DataTypes.INTEGER,
    },
    nbr_maison_max: {
      type: DataTypes.INTEGER,
    },
    nbr_habitant_min: {
      type: DataTypes.INTEGER,
    },
    nbr_habitant_max: {
      type: DataTypes.INTEGER,
    },
    taux_habitation_min: {
      type: DataTypes.INTEGER,
    },
    taux_habitation_max: {
      type: DataTypes.INTEGER,
    },
    assainissement_qte_min: {
      type: DataTypes.DOUBLE,
    },
    assainissement_qte_max: {
      type: DataTypes.DOUBLE,
    },
    assainissement_cout_min: {
      type: DataTypes.INTEGER,
    },
    assainissement_cout_max: {
      type: DataTypes.INTEGER,
    },
    assainissement_taux_min: {
      type: DataTypes.INTEGER,
    },
    assainissement_taux_max: {
      type: DataTypes.INTEGER,
    },
    eclairage_public_qte_min: {
      type: DataTypes.INTEGER,
    },
    eclairage_public_qte_max: {
      type: DataTypes.INTEGER,
    },
    eclairage_public_cout_min: {
      type: DataTypes.INTEGER,
    },
    eclairage_public_cout_max: {
      type: DataTypes.INTEGER,
    },
    eclairage_pubic_taux_min: {
      type: DataTypes.INTEGER,
    },
    eclairage_public_taux_max: {
      type: DataTypes.INTEGER,
    },
    voirie_qte_min: {
      type: DataTypes.DOUBLE,
    },
    voirie_qte_max: {
      type: DataTypes.DOUBLE,
    },
    voirie_cout_min: {
      type: DataTypes.INTEGER,
    },
    voirie_cout_max: {
      type: DataTypes.INTEGER,
    },
    voirie_taux_min: {
      type: DataTypes.INTEGER,
    },
    voirie_taux_max: {
      type: DataTypes.INTEGER,
    },
    eau_potable_qte_min: {
      type: DataTypes.DOUBLE,
    },
    eau_potable_qte_max: {
      type: DataTypes.DOUBLE,
    },
    eau_potable_cout_min: {
      type: DataTypes.INTEGER,
    },
    eau_potable_cout_max: {
      type: DataTypes.INTEGER,
    },
    eau_potable_taux_min: {
      type: DataTypes.INTEGER,
    },
    eau_potable_taux_max: {
      type: DataTypes.INTEGER,
    },
    drainage_qte_min: {
      type: DataTypes.DOUBLE,
    },
    drainage_qte_max: {
      type: DataTypes.DOUBLE,
    },
    drainage_cout_min: {
      type: DataTypes.INTEGER,
    },
    drainage_cout_max: {
      type: DataTypes.INTEGER,
    },
    drainage_taux_min: {
      type: DataTypes.INTEGER,
    },
    drainage_taux_max: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'critere',
    tableName: 'criteres'
  });
  return critere;
};