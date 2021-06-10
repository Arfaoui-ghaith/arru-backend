'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
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

      this.hasMany(models.Progres, {
        as: 'progres',
        foreignKey: 'infrastructure_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
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

  Infrastructure.afterCreate( async(infra) => {
    await sequelize.models.Progres.create({ id: uuidv4(), infrastructure_id: infra.id, cout: 0});
  });

  return Infrastructure;
};