'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Roles_specifications, {
        foreignKey: 'specification_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Specification.init({
    titre: { 
    type: DataTypes.STRING,
    unique: { msg: 'Le titre de specification doit être unique' },
    allowNull: false,
    validate: {
      is(value){
        if (!value.match(/^[A-Za-z ]+$/)) {
          throw new Error('La specification doit contenir seulement des lettres.');
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Specification',
    tableName: 'specifications'
  });
  return Specification;
};