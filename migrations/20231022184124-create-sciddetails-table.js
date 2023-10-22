'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('sciddetails', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      criteria: {
        type: Sequelize.STRING,
      },
      score: {
        type: Sequelize.STRING,
      },
      disorder: {
        type: Sequelize.STRING,
      },
      patientId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'patients', // Substitua 'patients' pelo nome da tabela de pacientes
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
    return queryInterface.dropTable('sciddetails');
  }
};
