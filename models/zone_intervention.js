'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zone_Intervention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.Commune, {
        foreignKey: 'commune_id'
      });

      this.hasOne(models.Projet, {
        foreignKey: 'zone_intervention_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasMany(models.Quartier, {
        foreignKey: 'zone_intervention_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

    }
  };
  Zone_Intervention.init({
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
    nbr_quartier: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    surface_totale: {
      type: DataTypes.DOUBLE,
    },
    surface_urbanisée_totale: {
      type: DataTypes.DOUBLE,
    },
    nombre_logements_totale: {
      type: DataTypes.INTEGER,
    },
    nombre_habitants_totale: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Zone_Intervention',
    tableName: 'zone_interventions'
  });
  return Zone_Intervention;
};