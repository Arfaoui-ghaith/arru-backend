'use strict';
const { UUIDv4 } = require('uuid-v4-validator');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles_specifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Role, {
        foreignKey: 'role_id'
      });
      this.belongsTo(models.Specification, {
        foreignKey: 'specification_id'
      });
    }
  };
  Roles_specifications.init({
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        is(value){
          if(UUIDv4.validate(value)){
            throw new Error('This request is rejected for invalid id!');
          }
        }
      }
    },
    specification_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        is(value){
          if(UUIDv4.validate(value)){
            throw new Error('This request is rejected for invalid id!');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Roles_specifications',
    tableName: 'roles_specifications'
  });
  return Roles_specifications;
};