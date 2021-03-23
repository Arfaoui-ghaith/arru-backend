'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Projet.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nbr_qaurtier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nbr_qaurtier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nbr_qaurtier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Projet',
    tableName: 'projets'
  });
  return Projet;
};