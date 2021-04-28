'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Infrastructure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Projet, {
        foreignKey: 'projet_id'
      });
    }
  };
  Infrastructure.init({
    projet_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['Drainage','Assainissement','Eau potable','Eclairage public','Voirie'],
    },
    quantité: DataTypes.DOUBLE,
    cout: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'Infrastructure',
    tableName: 'infrastructures'
  });
  return Infrastructure;
};