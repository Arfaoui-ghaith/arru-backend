'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tranche extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Projet, {
        as: 'projets',
        foreignKey: 'tranche_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Tranche.init({
    numero: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Tranche',
    tableName: 'tranches'
  });
  return Tranche;
};