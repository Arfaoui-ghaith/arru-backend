'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quartier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Projet, {
        foreignKey: 'projet_id'
      });
    }
  };
  Quartier.init({
    projet_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nom_fr: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nom_ar: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    lng:{
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    surface: {
      type: DataTypes.DOUBLE,
    },
    surface_urbanisée: {
      type: DataTypes.DOUBLE,
    },
    nombre_logements:{
      type: DataTypes.INTEGER,
    },
    nombre_habitants:{
      type: DataTypes.INTEGER,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Quartier',
    tableName: 'quartiers'
  });
  return Quartier;
};