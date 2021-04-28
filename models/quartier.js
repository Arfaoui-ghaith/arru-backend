'use strict';
const Zone_Intervention = require('./../models/zone_intervention');
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
        foreignKey: 'point_id'
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

  Quartier.beforeCreate(async (quartier, options) => {
    const count = await Quartier.count({ where: { zone_intervention_id: quartier.zone_intervention_id } });
    const zone = await sequelize.query("SELECT count(*) as nbr_quartier FROM `zone_interventions` WHERE id = :zone",
    { 
        replacements: { zone: quartier.zone_intervention_id },
        type: sequelize.QueryTypes.SELECT
    });
    
    console.log((count != 0) && (count >= zone[0].nbr_quartier));
    if((count != 0) && (count >= zone[0].nbr_quartier)){
      throw new Error("You cant create more !");
    }
  });

  return Quartier;
};