'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userteamleaders extends Model {
    static associate(models) {
      // userId references the user table
      userteamleaders.belongsTo(models.users, {
        foreignKey: 'userId',
      });

      // teamLeaderId references the users table (team leader)
      userteamleaders.belongsTo(models.users, {
        foreignKey: 'teamLeaderId',
      });
    }
  }

  userteamleaders.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamLeaderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'userteamleaders',
  });

  return userteamleaders;
};
