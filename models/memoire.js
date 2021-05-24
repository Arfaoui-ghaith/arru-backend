'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Memoire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Projet, {
        foreignKey: 'projet_id'
      });

      this.belongsTo(models.Bailleur_fonds, {
        foreignKey: 'source_financement'
      });

      this.hasMany(models.Financement, {
        foreignKey: 'memoire_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasOne(models.Decompte, {
        foreignKey: 'memoire_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Memoire.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projet_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    htva: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
    tva: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
    gestion_frais_tva: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
    frais_gestion: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
    timbre_fiscale: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
  }, {
    sequelize,
    modelName: 'Memoire',
    tableName: 'memoires'
  });
  return Memoire;
};