'use strict';
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");
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
        as: 'projet',
        foreignKey: 'projet_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasMany(models.Financement, {
        as: 'financements',
        foreignKey: 'memoire_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });

      this.hasOne(models.Decompte, {
        as: 'decompte',
        foreignKey: 'memoire_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Memoire.init({
    projet_id: {
      type: DataTypes.UUID,
    },
    htva: {
      type: DataTypes.DOUBLE,
      defaultValue: 0.0,
    },
    montant_exonere: {
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

  Memoire.afterCreate( async(memoire) => {
    const bailleurs = await sequelize.models.Bailleur_fonds.findAll({ where: { nom: { [Op.ne]: "Etat" } }, attributes: ['id'] });

    console.log(bailleurs);
    bailleurs.map(async(bailleur) => {
        await sequelize.models.Financement.bulkCreate([
          {
              id: uuidv4(),
              bailleur_id: bailleur.dataValues.id,
              memoire_id: memoire.dataValues.id,
              type: "prévisionnel"
          },
          {
              id: uuidv4(),
              bailleur_id: bailleur.dataValues.id,
              memoire_id: memoire.dataValues.id,
              type: "deblocage"
          },
          {
              id: uuidv4(),
              bailleur_id: bailleur.dataValues.id,
              memoire_id: memoire.dataValues.id,
              type: "reliquat"
          },
      ]);
    });
    
  });


  return Memoire;
};