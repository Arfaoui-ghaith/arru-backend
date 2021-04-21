'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commune extends Model {
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
  Commune.init({
    nom_fr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nom_ar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gouvernorat_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Commune',
    tableName: 'communes'
  });
  return Commune;
};