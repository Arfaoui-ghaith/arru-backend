'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Point extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Quartier, {
        foreignKey: 'quartier_id'
      });
    }
  };
  Point.init({
    quartier_id: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    lng:{
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Point',
    tableName: 'points'
  });
  return Point;
};