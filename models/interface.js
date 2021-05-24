'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interface extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Roles_Interfaces, {
        foreignKey: 'interface_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Interface.init({
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
    modelName: 'Interface',
    tableName: 'interfaces'
  });
  return Interface;
};