'use strict';
const { UUIDv4 } = require('uuid-v4-validator');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Municipalite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Projet, {
        foreignKey: 'municipalite_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.belongsTo(models.Commune, {
        foreignKey: 'commune_id'
      });
    }
  };
  Municipalite.init({
    commune_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        is(value){
          if(!UUIDv4.validate(value)){
            throw new Error('This request is rejected for invalid id!');
          }
        }
      }
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nom_ar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Municipalite',
    tableName: 'municipalites'
  });
  return Municipalite;
};