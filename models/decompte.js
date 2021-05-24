'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Decompte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Memoire, {
        foreignKey: 'memoire_id'
      });

      this.belongsTo(models.Prestataire, {
        foreignKey: 'prestataire_id'
      });
    }
  };
  Decompte.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prestataire_id: {
      type: DataTypes.UUID,
    },
    memoire_id:{
      type: DataTypes.UUID,
    },
    montant: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
    date_paiement: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Decompte',
  });
  return Decompte;
};