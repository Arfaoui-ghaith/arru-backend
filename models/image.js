'use strict';
const { UUIDv4 } = require('uuid-v4-validator');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
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
  Image.init({
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projet_id: {
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
  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'images'
  });
  return Image;
};