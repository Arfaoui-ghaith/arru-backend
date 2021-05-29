'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bailleur_fonds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Financement, {
        foreignKey: 'bailleur_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Bailleur_fonds.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: {msg: "Le nom doit être unique "},
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bailleur_fonds',
    tableName: 'bailleur_fonds'
  });
  return Bailleur_fonds;
};