'use strict';
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bailleur_fonds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Financement, {
        as: 'financements',
        foreignKey: 'bailleur_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        hooks: true,
      });
    }
  };
  Bailleur_fonds.init({
    nom: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: {msg: "Le nom doit être unique "},
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bailleur_fonds',
    tableName: 'bailleur_fonds'
  });

  Bailleur_fonds.afterCreate( async(bailleur) => {
    const memoires = await sequelize.models.Memoire.findAll({ attributes: ['id'] });

    memoires.map(async(memoire) => {
        await sequelize.models.Financement.bulkCreate([
          {
              id: uuidv4(),
              bailleur_id: bailleur.id,
              memoire_id: memoire.id,
              type: "prévisionnel"
          },
          {
              id: uuidv4(),
              bailleur_id: bailleur.id,
              memoire_id: memoire.id,
              type: "deblocage"
          },
          {
              id: uuidv4(),
              bailleur_id: bailleur.id,
              memoire_id: memoire.id,
              type: "reliquat"
          },
      ]);
    });
    
  });


  return Bailleur_fonds;
};