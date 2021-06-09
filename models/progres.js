'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Progres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Infrastructure, {
        foreignKey: 'infrastructure_id'
      });
    }
  };
  Progres.init({
    infrastructure_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cout: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Progres',
  });
  return Progres;
};