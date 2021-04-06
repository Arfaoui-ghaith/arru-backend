'use strict';
const { UUIDv4 } = require('uuid-v4-validator');
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
      this.belongsTo(models.Municipalite, {
        foreignKey: 'municipalite_id'
      });

      this.hasMany(models.Quartier, {
        foreignKey: 'projet_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasMany(models.Image, {
        foreignKey: 'projet_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Projet.init({
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    municipalite_id: {
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
   
    nbr_qaurtier: {
      type: DataTypes.INTEGER,
      
    },
    nbr_maison: {
      type: DataTypes.INTEGER,
      
    },
    nbr_habitant: {
      type: DataTypes.INTEGER,
      
    },
    taux_habitation: {
      type: DataTypes.INTEGER,
    },
    assainissement_qte: {
      type: DataTypes.DOUBLE,
    },
    assainissement_cout: {
      type: DataTypes.INTEGER,
    },
    assainissement_taux: {
      type: DataTypes.INTEGER,
    },
    eclairage_public_qte: {
      type: DataTypes.INTEGER,
    },
    eclairage_public_cout: {
      type: DataTypes.INTEGER,
    },
    eclairage_public_taux: {
      type: DataTypes.INTEGER,
    },
    voirie_qte: {
      type: DataTypes.DOUBLE,
    },
    voirie_cout: {
      type: DataTypes.INTEGER,
    },
    voirie_taux: {
      type: DataTypes.INTEGER,
    },
    eau_potable_qte: {
      type: DataTypes.DOUBLE,
    },
    eau_potable_cout: {
      type: DataTypes.INTEGER,
    },
    eau_potable_taux: {
      type: DataTypes.INTEGER,
    },
    drainage_qte: {
      type: DataTypes.DOUBLE,
    },
    drainage_cout: {
      type: DataTypes.INTEGER,
    },
    drainage_taux: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Projet',
    tableName: 'projets'
  });
  return Projet;
};