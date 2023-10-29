'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
      VALUES
        ('K21','Piromania','Alguma vez você provocou um incêndio de propósito? SE SIM: Fale mais sobre isso. Quantas vezes você provocou um incêndio?', NOW(), NOW()),
        ('K22','Piromania','Como você se sentia antes de provocar o incêndio? Você experimentou uma sensação de tensão ou excitação antes de provocar o incêndio?',  NOW(), NOW()),
        ('K23','Piromania','Você é, ou já foi, fascinado ou especialmente interessado por incêndios, ou coisas relacionadas a fogo? Você gosta, ou gostava, de ficar observando quando há um incêndio em sua vizinhança? Alguma vez você provocou um alarme falso para que você pudesse ver os bombeiros chegando? Você gasta, ou gastava tempo perambulando próximo ao corpo de bombeiros da sua vizinhança?', NOW(), NOW()),
        ('K24','Piromania','Como você se sente, ou sentia, ao ver um incêndio? Você sentia prazer intenso ou sentia alívio depois de provocar ou assistir um incêndio?',  NOW(), NOW()),
        ('K25A.1','Piromania','Incendiava coisas por dinheiro?', NOW(), NOW()),
        ('K25A.2','Piromania','Incendiava coisas como uma forma de protesto?', NOW(), NOW()),
        ('K25A.3','Piromania','Para ocultar provas de algum delito?', NOW(), NOW()),
        ('K25A.4','Piromania','Para fazer o seguro pagar um carro, ou uma casa nova, ou melhorar sua vida de alguma forma?', NOW(), NOW()),
        ('K25B','Piromania','Você provocava incêndios porque vozes, ou coisas estranhas e difíceis de explicar estavam lhe forçando a fazer isso?', NOW(), NOW()),
        ('K25C','Piromania','Você provocava incêndios somente quando estava bêbado ou drogado?', NOW(), NOW()),
        ('K25D','Piromania','Assinalar ao lado se o paciente é provável portador de transtorno neurocognitivo maior ou deficiência intelectual que o impeça de avaliar e conter o comportamento incendiário.', NOW(), NOW()),
        ('K25X-A1','Piromania','Os incêndios ocorrem, ou ocorreram somente durante a adolescência, juntamente com outros comportamentos como destruir propriedade alheia, usar drogas, fugir da escola, ou passar a noite fora de casa sem o consentimento dos seus pais?', NOW(), NOW()),
        ('K25X-A2','Piromania','Você tem comportamentos frequentes como destruir propriedade alheia, vender droga, mentir, ou passar a perna nos outros sem sentir culpa por isso?', NOW(), NOW()),
        ('K25X-A3','Piromania','Os furtos ocorreram somente quando você estava se sentindo agitada(o)/eufórica(o) ou irritável?', NOW(), NOW()),
        ('K27','Piromania','Você apresentou esses problemas relacionados à provocação de incêndios durante o mês passado?', NOW(), NOW()),
        ('K28','Piromania','Como você classificaria a gravidade da Piromania desse paciente?', NOW(), NOW()),
        ('K29','Piromania','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
        ('K30','Piromania','Quando você provocou seu último incêndio, desejou ou pensou em provocar um incêndio?', NOW(), NOW()),
        ('K31','Piromania','Quantos anos você tinha quando provocou seu primeiro incêndio?', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE question IN
      ('Alguma vez você provocou um incêndio de propósito? SE SIM: Fale mais sobre isso. Quantas vezes você provocou um incêndio?',
      'Como você se sentia antes de provocar o incêndio? Você experimentou uma sensação de tensão ou excitação antes de provocar o incêndio?',
      'Você é, ou já foi, fascinado ou especialmente interessado por incêndios, ou coisas relacionadas a fogo? Você gosta, ou gostava, de ficar observando quando há um incêndio em sua vizinhança? Alguma vez você provocou um alarme falso para que você pudesse ver os bombeiros chegando? Você gasta, ou gastava tempo perambulando próximo ao corpo de bombeiros da sua vizinhança?',
      'Como você se sente, ou sentia, ao ver um incêndio? Você sentia prazer intenso ou sentia alívio depois de provocar ou assistir um incêndio?',
      'Incendiava coisas por dinheiro?',
      'Incendiava coisas como uma forma de protesto?',
      'Para ocultar provas de algum delito?',
      'Para fazer o seguro pagar um carro, ou uma casa nova, ou melhorar sua vida de alguma forma?',
      'Você provocava incêndios porque vozes, ou coisas estranhas e difíceis de explicar estavam lhe forçando a fazer isso?',
      'Você provocava incêndios somente quando estava bêbado ou drogado?',
      'Assinalar ao lado se o paciente é provável portador de transtorno neurocognitivo maior ou deficiência intelectual que o impeça de avaliar e conter o comportamento incendiário.',
      'Os incêndios ocorrem, ou ocorreram somente durante a adolescência, juntamente com outros comportamentos como destruir propriedade alheia, usar drogas, fugir da escola, ou passar a noite fora de casa sem o consentimento dos seus pais?',
      'Você tem comportamentos frequentes como destruir propriedade alheia, vender droga, mentir, ou passar a perna nos outros sem sentir culpa por isso?',
      'Os furtos ocorreram somente quando você estava se sentindo agitada(o)/eufórica(o) ou irritável?',
      'Você apresentou esses problemas relacionados à provocação de incêndios durante o mês passado?',
      'Como você classificaria a gravidade da Piromania desse paciente?',
      'Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?,
      'Quando você provocou seu último incêndio, desejou ou pensou em provocar um incêndio?',
      'Quantos anos você tinha quando provocou seu primeiro incêndio?');
    `);
  }
};
