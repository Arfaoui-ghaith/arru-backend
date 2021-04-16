'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voirie extends Model {
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
  Voirie.init({
    infrastructure_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantité: DataTypes.DOUBLE,
    cout: DataTypes.DOUBLE,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Voirie',
  });
  return Voirie;
};