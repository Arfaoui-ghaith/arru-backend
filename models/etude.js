'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Etude extends Model {
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
  Etude.init({
    projet_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bureau:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    cout: {
      type: DataTypes.DOUBLE,
    }
  }, {
    sequelize,
    modelName: 'Etude',
    tableName: 'Etudes'
  });
  return Etude;
};