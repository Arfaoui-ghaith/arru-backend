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

      this.hasMany(models.Roles_specifications, {
        foreignKey: 'role_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasMany(models.Roles_Interfaces, {
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
      unique: { msg: "Le titre de role doit être unique" },
      allowNull: false,
      validate: {
        is(value){
          if (!value.match(/^[A-Za-z ]+$/)) {
            throw new Error('Please role titre must contains only letters!');
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles'
  });
  return Role;
};