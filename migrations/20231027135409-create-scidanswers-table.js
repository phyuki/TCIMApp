'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('scidanswers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      disorder: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'patients',
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'scidquestions',
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
    return queryInterface.dropTable('scidanswers');
  }
};
