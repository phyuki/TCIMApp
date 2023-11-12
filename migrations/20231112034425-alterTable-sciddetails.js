'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameTable('sciddetails', 'scidcriteria');
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameTable('scidcriteria', 'sciddetails');
  }
};
