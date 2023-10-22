'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('scidreports', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lifetime_criteria: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      past_criteria: {
        type: Sequelize.CHAR(1),
        allowNull: false,
      },
      disorder: {
        type: Sequelize.STRING,
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'patients', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('scidreports');
  }
};
