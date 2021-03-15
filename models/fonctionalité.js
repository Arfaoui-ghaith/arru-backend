'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fonctionalité extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Roles_fonctionalités, {
        foreignKey: 'fonctionalite_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true,
      });
    }
  };
  Fonctionalité.init({
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: "fonctionalité titre must be unique"},
      validate: {
        is(value){
          if (!value.match(/^[A-Za-z0-9 ]+$/)) {
            throw new Error('Please role titre must contains only letters!');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Fonctionalité',
    tableName: 'fonctionalites'
  });
  return Fonctionalité;
};