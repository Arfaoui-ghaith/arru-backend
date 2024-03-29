'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prestataire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Decompte, {
        as: 'decomptes',
        foreignKey: 'prestataire_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Prestataire.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    abreviation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Prestataire',
    tableName: 'prestataires',
  });
  return Prestataire;
};