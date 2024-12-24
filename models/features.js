'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class features extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      features.belongsToMany(models.roles, {
        through: 'rolefeatures',
        foreignKey: 'featureId',
      });
    }
  }
  features.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'features',
  });
  return features;
};