'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('scoresdass', 'dassscores');
    await queryInterface.renameTable('scidreports', 'scidscores');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('dassscores', 'scoresdass');
    await queryInterface.renameTable('scidscores', 'scidreports');
  }
};
