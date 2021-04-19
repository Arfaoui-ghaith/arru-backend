'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fiche_critere extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Gouvernorat, {
        foreignKey: 'gouvernorat_id'
      });
    }
  };
  critere.init({
    gouvernorat_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nbr_quartier_min: {
      type: Sequelize.INTEGER,
    },
    surface_totale: {
      type: Sequelize.DOUBLE,
    },
    surface_urbanisée_totale: {
      type: Sequelize.DOUBLE,
    },
    nombre_logements_totale:{
      type: Sequelize.INTEGER,
    },
    nombre_habitants_totale:{
      type: Sequelize.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'fiche_critere',
    tableName: 'fiche_criteres'
  });
  return Fiche_critere;
};