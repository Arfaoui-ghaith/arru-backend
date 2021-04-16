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
      this.hasOne(models.Assainissement, {
        foreignKey: 'infrastructure_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
      this.hasOne(models.Drainage, {
        foreignKey: 'infrastructure_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
      this.hasOne(models.Eau_potable, {
        foreignKey: 'infrastructure_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
      this.hasOne(models.Eclairage_public, {
        foreignKey: 'infrastructure_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
      this.hasOne(models.Voirie, {
        foreignKey: 'infrastructure_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Infrastructure.init({
    projet_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Infrastructure',
  });
  return Infrastructure;
};