'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class clientinfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  clientinfos.init({
    name: DataTypes.STRING,
    mobileno: DataTypes.STRING,
    address: DataTypes.STRING,
    occupation: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'clientinfos',
  });
  return clientinfos;
};