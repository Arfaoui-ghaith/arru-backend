'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateures_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateur_id'
      });

      this.belongsTo(models.Role, {
        foreignKey: 'role_id'
      });
    }
  };
  Utilisateures_roles.init({
    utilisateur_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Utilisateures_roles',
    tableName: 'utilisateures_roles'
  });
  return Utilisateures_roles;
};