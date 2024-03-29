'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Financement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Memoire, {
        as: 'memoire',
        foreignKey: 'memoire_id'
      });

      this.belongsTo(models.Bailleur_fonds, {
        as: 'bailleur_fond',
        foreignKey: 'bailleur_id'
      });
    }
  };
  Financement.init({
    bailleur_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    memoire_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    montant: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0
    },
    type: {
      type: DataTypes.ENUM,
      values: ['prévisionnel','deblocage','reliquat'],
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Financement',
    tableName: 'financements'
  });
  
  return Financement;
};