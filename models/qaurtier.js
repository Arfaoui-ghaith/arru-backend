'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Qaurtier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Qaurtier.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
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
    iat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    ing:{
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Qaurtier',
    tableName: 'qaurtiers'
  });
  return Qaurtier;
};