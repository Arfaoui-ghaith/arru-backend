'use strict';
const { UUIDv4 } = require('uuid-v4-validator');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Limite_quartier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Quartier, {
        foreignKey: 'quartier_id'
      });
    }
  };
  Limite_quartier.init({
    qaurtier_id: {
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
    modelName: 'Limite_quartier',
    tableName: 'limite_quartiers'
  });
  return Limite_quartier;
};