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
      this.belongsTo(models.Commune, {
        as: 'communetoQuartier',
        foreignKey: 'commune_id'
      });

      this.belongsTo(models.Projet, {
        as: 'projet',
        foreignKey: 'projet_id'
      });

      this.hasMany(models.Point, {
        as: 'latlngs',
        foreignKey: 'quartier_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.belongsTo(models.Point, {
        as: 'center',
        foreignKey: 'point_id'
      });
    }
  };
  
  Quartier.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commune_id: {
      allowNull: false,
      type: DataTypes.UUID
    },
    projet_id: {
      type: DataTypes.UUID
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
  }, {
    sequelize,
    modelName: 'Quartier',
    tableName: 'quartiers'
  });

  return Quartier;
};