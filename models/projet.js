'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Infrastructure, {
        foreignKey: 'projet_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
      this.hasMany(models.Quartier, {
        foreignKey: 'projet_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Projet.init({
    commune_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nom_fr: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nom_ar: {
      allowNull: false,
      type: DataTypes.STRING
    },
    surface_totale: {
      type: DataTypes.DOUBLE,
    },
    surface_urbanisée_totale: {
      type: DataTypes.DOUBLE,
    },
    nombre_logements_totale:{
      type: DataTypes.INTEGER,
    },
    nombre_habitants_totale:{
      type: DataTypes.INTEGER,
    },
    eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    tranche: {
      type: DataTypes.INTEGER,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Projet',
    tableName: 'projets'
  });
  return Projet;
};