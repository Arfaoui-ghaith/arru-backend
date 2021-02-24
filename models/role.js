'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Utilisateures_roles, {
        foreignKey: 'role_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasMany(models.Roles_fonctionalités, {
        foreignKey: 'role_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Role.init({
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "titre role must be unique"},
      validate: {
        is(value){
          if (!validator.isAlpha(value)) {
            throw new Error('Please role titre must contains only letters!');
          }
        }
      }
    },
    specification: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is(value){
          if (!validator.isAlphanumeric(value)) {
            throw new Error('Please role specification must contains only letters!');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles'
  });
  return Role;
};