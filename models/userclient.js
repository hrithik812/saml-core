'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userclient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userclient.init({
    userid: DataTypes.INTEGER,
    clientid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userclient',
  });
  return userclient;
};