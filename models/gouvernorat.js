'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gouvernorat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Commune, {
        as: 'communes',
        foreignKey: 'gouvernorat_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasOne(models.Fiche_criteres, {
        as: 'fiche_criteres',
        foreignKey: 'gouvernorat_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Gouvernorat.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nom_ar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Gouvernorat',
    tableName: 'gouvernorats'
  });
  return Gouvernorat;
};