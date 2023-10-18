'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('professionals', 'password');
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('professionals', 'password', {
        type: Sequelize.STRING,
        allowNull: false
      });
  }
};
