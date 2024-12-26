'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      // Define association for roles
      users.belongsToMany(models.roles, {
        through: 'userroles',
        foreignKey: 'userId',
      });

      // Define association for userclient
      users.hasMany(models.userclient, {
        foreignKey: 'userid',
      });

      // Define association for userTeamLeaders (user can be assigned multiple team leaders)
      users.hasMany(models.userteamleaders, {
        foreignKey: 'userId',
        as: 'teamLeaders',
      });

      // Define reverse association for teamLeaderId (team leader can have multiple users)
      users.hasMany(models.userteamleaders, {
        foreignKey: 'teamLeaderId',
        as: 'users',
      });
    }
  }

  users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });

  return users;
};
