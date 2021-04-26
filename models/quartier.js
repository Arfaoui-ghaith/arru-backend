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
      this.belongsTo(models.Zone_Intervention, {
        foreignKey: 'zone_intervention_id'
      });

      this.hasMany(models.Point, {
        foreignKey: 'quartier_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.belongsTo(models.Point, {
        foreignKey: 'projet_id'
      });
    }
  };
  
  Quartier.init({
    zone_intervention_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    point_id: {
      allowNull: false,
      type: DataTypes.UUID
    },
    nom_fr: {
      allowNull: false,
      type: DataTypes.STRING
    },
    nom_ar: {
      allowNull: false,
      type: DataTypes.STRING
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
  }, {
    sequelize,
    modelName: 'Quartier',
    tableName: 'quartiers'
  });

  Quartier.beforeCreate((quartier, options) => {
    
  });

  return Quartier;
};