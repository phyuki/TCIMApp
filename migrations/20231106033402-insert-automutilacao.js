'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
    VALUES
      ('K194a','Automutilacao','Fez vários pequenos cortes superficiais na pele?', NOW(), NOW()),
      ('K194b','Automutilacao','Fez um corte mais fundo usando uma lâmina?', NOW(), NOW()),
      ('K194c','Automutilacao','Se bateu?', NOW(), NOW()),
      ('K194d','Automutilacao','Se arranhou?', NOW(), NOW()),
      ('K194e','Automutilacao','Se queimou?', NOW(), NOW()),
      ('K194f','Automutilacao','Se machucou de propósito de alguma outra forma?', NOW(), NOW()),
      ('K194g','Automutilacao','Como foi que você machucou?', NOW(), NOW()),
      ('K194h','Automutilacao','Você já se machucou de propósito cinco ou mais dias no intervalo de um ano?', NOW(), NOW()),
      ('K194i','Automutilacao','Todas as vezes em que você fez isso, você estava tentando se matar?', NOW(), NOW()),
      ('K195A','Automutilacao','Foi para aliviar um sentimento ruim, ou tirar uma ideia ruim da sua cabeça?', NOW(), NOW()),
      ('K195B','Automutilacao','Foi depois de brigar com alguém, ou para chamar a atenção de alguém?', NOW(), NOW()),
      ('K195C','Automutilacao','Foi para obter prazer, satisfação, ou sentir-se alegre?', NOW(), NOW()),
      ('K-196-B1','Automutilacao','Brigas, discussões, ou sentimento de culpa, raiva, tristeza ou nervoso?', NOW(), NOW()),
      ('K-196-B2','Automutilacao','Ficar pensando muito em se machucar, ao ponto em que ficava difícil de se controlar?', NOW(), NOW()),
      ('K-196-B3','Automutilacao','Ficar pensando nos machucados que você provocou no passado?', NOW(), NOW()),
      ('K197A','Automutilacao','Tentativas de colocar um piercing ou fazer uma tatuagem?', NOW(), NOW()),
      ('K197B','Automutilacao','De um ato religioso, ou um desafio para ser aceito em um grupo?', NOW(), NOW()),
      ('K197C','Automutilacao','Uma “mania” que você tem arrancar casca de feridas, ou roer unhas?', NOW(), NOW()),
      ('K198A','Automutilacao','Isso lhe aborrece, entristece ou a faz sofrer?', NOW(), NOW()),
      ('K198B','Automutilacao','Você evita algumas situações ou pessoas porque você não quer ser visto se machucando, ou tem vergonha das lesões?', NOW(), NOW()),
      ('K198C','Automutilacao','Isso interferiu com seus deveres no trabalho, nos estudos, ou nas tarefas domésticas?', NOW(), NOW()),
      ('K199A','Automutilacao','Você estava muito confusa(o), ouvindo vozes, ou tendo experiências estranhas e difíceis de explicar?', NOW(), NOW()),
      ('K199B','Automutilacao','Você estava acamada(o) e um pouco “fora do ar” por causa de uma febre ou doença grave?', NOW(), NOW()),
      ('K199C','Automutilacao','Você estava sob efeito de álcool, drogas, ou algum tipo de medicamento?', NOW(), NOW()),
      ('K199D','Automutilacao','Você tinha “mania” de cutucar sua pele, ou arrancar cabelos e pelos do corpo?', NOW(), NOW()),
      ('K199E','Automutilacao','Assinalar embaixo se a(o) paciente é provável portador(a) de deficiência intelectual, ou transtorno neurocognitivo.', NOW(), NOW()),
      ('K199F','Automutilacao','Assinalar embaixo se a(o) paciente é provável portador(a) de transtorno do movimento estereotipado com autolesão, ou de transtorno do espectro autista.', NOW(), NOW()),
      ('K201','Automutilacao','Você apresentou problemas relacionados ao comportamento de se machucar durante o mês passado?', NOW(), NOW()),
      ('K202','Automutilacao','Como você classificaria a gravidade do Transtorno de Automutilação dessa paciente?', NOW(), NOW()),
      ('K203','Automutilacao','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
      ('K204','Automutilacao','Quando foi a última vez que você se machucou?', NOW(), NOW()),
      ('K205','Automutilacao','Quantos anos você tinha quando se machucou de propósito pela primeira vez?', NOW(), NOW());
  `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE disorder = 'Automutilacao'
    `)
  }
};
