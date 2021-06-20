'use strict';
const { UUIDv4 } = require('uuid-v4-validator');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateures_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateur_id'
      });

      this.belongsTo(models.Role, {
        as: 'role',
        foreignKey: 'role_id'
      });

      this.belongsTo(models.Specification, {
        foreignKey: 'specification_id'
      });
    }
  };
  Utilisateures_roles.init({
    utilisateur_id: {
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
    role_id: {
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
    specification_id: {
      type: DataTypes.UUID,
      validate: {
        is(value){
          if(!UUIDv4.validate(value)){
            throw new Error('This request is rejected for invalid id!');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Utilisateures_roles',
    tableName: 'utilisateures_roles'
  });
  return Utilisateures_roles;
};