'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      // Define associations here
      roles.belongsToMany(models.users, {
        through: 'userroles',
        foreignKey: 'roleId',
      });

      // Many-to-Many: Role ↔ Feature through RoleFeature
      roles.belongsToMany(models.features, {
        through: 'rolefeatures',
        foreignKey: 'roleId',
      });
    }
  }
  roles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'roles',
    }
  );
  return roles;
};
