'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('scidquestions', 'disorder', {
      type: Sequelize.STRING,
      allowNull: true, // Você pode ajustar isso para true ou false, dependendo dos requisitos
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('scidquestions', 'disorder');
  }
};
