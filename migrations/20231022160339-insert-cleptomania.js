'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
      VALUES
        ('K10','Clepto','Você já roubou alguma vez na vida coisas das quais não precisava, ou coisas que você até poderia pagar, mas preferiu roubar mesmo assim?', NOW(), NOW()),
        ('K10A','Clepto','O que você rouba/roubava com mais frequência?', NOW(), NOW()),
        ('K10B','Clepto','O que você rouba/roubava com mais frequência?', NOW(), NOW()),
        ('K10C','Clepto','O que você rouba/roubava com mais frequência?', NOW(), NOW()),
        ('K10D','Clepto','O que você fez ou faz normalmente com as coisas que você pega? ', NOW(), NOW()),
        ('K10E','Clepto','Com que frequência você furta ou furtava?', NOW(), NOW()),
        ('K11','Clepto','Como você se sentia imediatamente antes de roubar esses objetos? Você sentia uma tensão crescente antes de roubar esses objetos?', NOW(), NOW()),
        ('K12','Clepto','Como você se sente, ou sentia no momento em que pegava esses objetos? Você sentiu prazer ou alívio?', NOW(), NOW()),
        ('K13.1','Clepto','Estava bravo e queria se vingar de alguém?', NOW(), NOW()),
        ('K13.2','Clepto','Porque vozes, ou coisas estranhas e difíceis de explicar estavam lhe forçando a fazer isso?', NOW(), NOW()),
        ('K14.1','Clepto','Os furtos ocorrem, ou ocorreram somente durante a adolescência, juntamente com outros comportamentos como destruir propriedade alheia, usar drogas, fugir da escola, ou passar a noite fora de casa sem o consentimento dos seus pais?', NOW(), NOW()),
        ('K14.2','Clepto','Você tem comportamentos frequentes como destruir propriedade alheia, vender droga, mentir, ou passar a perna nos outros sem sentir culpa por isso?', NOW(), NOW()),
        ('K14.3','Clepto','Os furtos ocorreram somente quando você estava se sentindo agitada(o)/eufórica(o) ou irritável?', NOW(), NOW()),
        ('K16','Clepto','Você apresentou esses problemas relacionados a furtos durante o mês passado?', NOW(), NOW()),
        ('K17','Clepto','Como você classificaria a gravidade da Cleptomania desse paciente?', NOW(), NOW()),
        ('K18','Clepto','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
        ('K19','Clepto','Quando você teve o último episódio de furto, desejo ou pensamentos de furtar?', NOW(), NOW()),
        ('K20','Clepto','Quantos anos você tinha quando teve os primeiros episódios de furto?', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE question IN
      ('Você já roubou alguma vez na vida coisas das quais não precisava, ou coisas que você até poderia pagar, mas preferiu roubar mesmo assim?', 
      'O que você rouba/roubava com mais frequência?',
      'O que você fez ou faz normalmente com as coisas que você pega? ',
      'Com que frequência você furta ou furtava?',
      'Como você se sentia imediatamente antes de roubar esses objetos? Você sentia uma tensão crescente antes de roubar esses objetos?', 
      'Como você se sente, ou sentia no momento em que pegava esses objetos? Você sentiu prazer ou alívio?', 
      'Estava bravo e queria se vingar de alguém?', 
      'Porque vozes, ou coisas estranhas e difíceis de explicar estavam lhe forçando a fazer isso?', 
      'Os furtos ocorrem, ou ocorreram somente durante a adolescência, juntamente com outros comportamentos como destruir propriedade alheia, usar drogas, fugir da escola, ou passar a noite fora de casa sem o consentimento dos seus pais?',
      'Você tem comportamentos frequentes como destruir propriedade alheia, vender droga, mentir, ou passar a perna nos outros sem sentir culpa por isso?', 
      'Os furtos ocorreram somente quando você estava se sentindo agitada(o)/eufórica(o) ou irritável?', 
      'Você apresentou esses problemas relacionados a furtos durante o mês passado?', 
      'Como você classificaria a gravidade da Cleptomania desse paciente?', 
      'Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', 
      'Quando você teve o último episódio de furto, desejo ou pensamentos de furtar?', 
      'Quantos anos você tinha quando teve os primeiros episódios de furto?');
    `);
  }
};
