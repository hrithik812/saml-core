'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userclients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Name of the referenced table
          key: 'id',      // Primary key in the referenced table
        },
      },
      clientid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientinfos', // Name of the referenced table
          key: 'id',      // Primary key in the referenced table
        },
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
    await queryInterface.dropTable('userclients');
  }
};