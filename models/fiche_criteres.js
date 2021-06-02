'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fiche_criteres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Gouvernorat, {
        as: 'gouvernorat',
        foreignKey: 'gouvernorat_id'
      });
    }
  };
  Fiche_criteres.init({
    gouvernorat_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    
    surface_totale: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    surface_urbanisée_totale: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    },
    nombre_logements_totale:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    nombre_habitants_totale:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Fiche_criteres',
    tableName: 'fiche_criteres',
  });
  return Fiche_criteres;
};