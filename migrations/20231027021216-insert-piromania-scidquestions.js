'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
      VALUES
        ('K21','Piromania','Alguma vez você provocou um incêndio de propósito? SE SIM: Fale mais sobre isso. Quantas vezes você provocou um incêndio?', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE question IN
      ('Alguma vez você provocou um incêndio de propósito? SE SIM: Fale mais sobre isso. Quantas vezes você provocou um incêndio?');
    `);
  }
};
