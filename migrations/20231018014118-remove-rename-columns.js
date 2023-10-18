'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('professionals', 'lastName'),
      queryInterface.renameColumn('professionals', 'firstName', 'name'),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('professionals', 'lastName', {
        type: Sequelize.STRING,
      }),
      queryInterface.renameColumn('professionals', 'name', 'firstName'),
    ]);
  }
};
