'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Quartier, {
        as: 'quartiers',
        foreignKey: 'projet_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasMany(models.Infrastructure, {
        foreignKey: 'projet_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasOne(models.Memoire, {
        foreignKey: 'projet_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Projet.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    surface_totale: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    surface_urbanisée_totale: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    nombre_logements_totale:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    nombre_habitants_totale:{
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    bureau_etude: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    cout_etude: {
      type: DataTypes.DOUBLE,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Projet',
    tableName: 'projets'
  });
  return Projet;
};