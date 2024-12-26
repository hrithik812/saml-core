'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userteamleaders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',  // Reference to the users table
          key: 'id',       // Primary key of the users table
        },
        onDelete: 'SET NULL', // If the user is deleted, set the value to NULL
        onUpdate: 'CASCADE',  // If the user id changes, update the foreign key
      },
      teamLeaderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',  // Reference to the users table (team leader)
          key: 'id',       // Primary key of the users table
        },
        onDelete: 'SET NULL', // If the team leader is deleted, set the value to NULL
        onUpdate: 'CASCADE',  // If the team leader's id changes, update the foreign key
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userteamleaders');
  }
};
