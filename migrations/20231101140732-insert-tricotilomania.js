'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
      VALUES
        ('K50','Trico','Você já arrancou cabelo ou pelos de alguma parte do seu corpo? SE SIM: Com que frequência? Isso resultou em lesões, clarões ou falhas notáveis?', NOW(), NOW()),
        ('K51','Trico','Você sentiu algum desconforto ou um aumento crescente de tensão antes de arrancar o cabelo/pelo, ou tentou resistir a fazer isso?', NOW(), NOW()),
        ('K51A','Trico','Você tentou controlar o seu comportamento de arrancar cabelos, reduzindo ou tentando parar de arrancar? Quantas vezes? Quão bem-sucedido você foi ao tentar diminuir ou parar de arrancar?', NOW(), NOW()),
        ('K52','Trico','Você sentiu prazer, satisfação, ou alívio quando arrancou seu cabelo/pelo?', NOW(), NOW()),
        ('K53A','Trico','Você tem ou tinha alguma doença física, ou de pele que lhe causava coceira, ou desconforto e o forçava a arrancar cabelos ou pelos do seu corpo? Se sim, qual era?', NOW(), NOW()),
        ('K53B','Trico','Você tem ou tinha algum outro problema emocional que o levava a arrancar cabelos ou pelos? Por exemplo, você achava que uma parte do seu corpo era feia e queria corrigi-la, ou você achava que seu cabelo ou pelo de uma determinada região não estava do jeito certo e queria deixar ele bem certo?', NOW(), NOW()),
        ('K54','Trico','Quanto arrancar o cabelo prejudicou a sua vida? Isso aborrece você? Você evitava alguma situação ou pessoas porque você não queria ser visto arrancando o cabelo, ou ficava envergonhada(o) pelas falhas? Você já teve problemas de concentração no trabalho ou na escola devido a isto?', NOW(), NOW()),
        ('K56','Trico','Durante o último mês você arrancou seu cabelo, ou pelos?', NOW(), NOW()),
        ('K57','Trico','Como você classificaria a gravidade da Tricotilomania desse paciente?', NOW(), NOW()),
        ('K58','Trico','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
        ('K59','Trico','Quanto tempo faz desde a última vez que você arrancou cabelos ou pelos?', NOW(), NOW()),
        ('K60','Trico','Quantos anos você tinha quando começou a arrancar cabelos ou pelos?', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE question IN
      ('Você já arrancou cabelo ou pelos de alguma parte do seu corpo? SE SIM: Com que frequência? Isso resultou em lesões, clarões ou falhas notáveis?',
      'Você sentiu algum desconforto ou um aumento crescente de tensão antes de arrancar o cabelo/pelo, ou tentou resistir a fazer isso?',
      'Você tentou controlar o seu comportamento de arrancar cabelos, reduzindo ou tentando parar de arrancar? Quantas vezes? Quão bem-sucedido você foi ao tentar diminuir ou parar de arrancar?',
      'Você sentiu prazer, satisfação, ou alívio quando arrancou seu cabelo/pelo?',
      'Você tem ou tinha alguma doença física, ou de pele que lhe causava coceira, ou desconforto e o forçava a arrancar cabelos ou pelos do seu corpo? Se sim, qual era?',
      'Você tem ou tinha algum outro problema emocional que o levava a arrancar cabelos ou pelos? Por exemplo, você achava que uma parte do seu corpo era feia e queria corrigi-la, ou você achava que seu cabelo ou pelo de uma determinada região não estava do jeito certo e queria deixar ele bem certo?',
      'Quanto arrancar o cabelo prejudicou a sua vida? Isso aborrece você? Você evitava alguma situação ou pessoas porque você não queria ser visto arrancando o cabelo, ou ficava envergonhada(o) pelas falhas? Você já teve problemas de concentração no trabalho ou na escola devido a isto?',
      'Durante o último mês você arrancou seu cabelo, ou pelos?',
      'Como você classificaria a gravidade da Tricotilomania desse paciente?',
      'Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?',
      'Quanto tempo faz desde a última vez que você arrancou cabelos ou pelos?',
      'Quantos anos você tinha quando começou a arrancar cabelos ou pelos?');
    `)
  }
};
