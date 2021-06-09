'use strict';
const validator = require('validator');
const AppError = require('./../utils/appError');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Utilisateures_roles, {
        foreignKey: 'utilisateur_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasMany(models.Trace, {
        as: 'traces',
        foreignKey: 'utilisateur_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Utilisateur.init({
    cin: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: {msg: 'cin must be unique'},
      validate: {
        is(value){
          if (!(validator.isNumeric(value) && value.length === 8)) {
            throw new Error('Please cin must contains only 8 chiffres!');
          }
        }
      }
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      validate: {
        is(value){
          if (!value.match(/^[A-Za-z ]+$/)) {
            throw new Error('Please nom must contains only letters!');
          }
        }
      }
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is(value){
          if (!value.match(/^[A-Za-z ]+$/)) {
            throw new Error('Please prenom must contains only letters!');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is(value){
          if (!validator.isEmail(value)) {
            throw new Error('Please provide a valid email!');
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is(value){
          if(value !== undefined){
          if (!validator.isNumeric(value)) {
            throw new Error('Please provide a valid phone!');
            }
          }
        }
      }
    },
    image: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Utilisateur',
    tableName: 'utilisateurs'
  });

  return Utilisateur;
};