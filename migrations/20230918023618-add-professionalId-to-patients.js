'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('patients', 'professionalId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'professionals', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('patients', 'professionalId');
  }
};
