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
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projet_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['drainage des eaux pluviales','assainissement','eau potable','eclairage public','voirie'],
      unique: true
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