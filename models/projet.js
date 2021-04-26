'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Zone_Intervention, {
        foreignKey: 'zone_intervention_id'
      });

      this.hasMany(models.Infrastructure, {
        foreignKey: 'projet_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasOne(models.Etude, {
        foreignKey: 'projet_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Projet.init({
    eligible: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    zone_intervention_id: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Projet',
    tableName: 'projets'
  });
  return Projet;
};