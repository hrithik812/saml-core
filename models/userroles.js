'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userroles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      userroles.belongsTo(models.users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      userroles.belongsTo(models.roles, {
        foreignKey: 'roleId',
        onDelete: 'CASCADE',
      });
    }
  }
  userroles.init({
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userroles',
  });
  return userroles;
};