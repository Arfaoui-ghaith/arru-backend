'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Limite_quartier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Limite_quartier.init({
    quartier_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    iat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    ing:{
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Limite_quartier',
  });
  return Limite_quartier;
};