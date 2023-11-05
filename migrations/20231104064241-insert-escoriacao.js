'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
      VALUES
        ('K146','Escoriacao','Alguma vez você beliscou, coçou ou espremeu sua pele repetidamente ou ocupou-se em arrancar sua “pele morta” com frequência? Você rói suas cutículas? SE SIM: O fato de cutucar, coçar, espremer, tirar a pele ou roer cutículas criaram dano considerável na pele, ou criaram, feridas ou infecções?', NOW(), NOW()),
        ('K147','Escoriacao','Quando foi a última vez que você fez isso? Por quantos dias este período durou?', NOW(), NOW()),
        ('K148a','Escoriacao','Qual a área da sua pele que você (cutucava) mais?', NOW(), NOW()),
        ('K148b','Escoriacao','Você usou outros instrumentos como pinças, lixas de unha, alfinetes, estilete, faca, etc. para (cutucar) sua pele?', NOW(), NOW()),
        ('K149b','Escoriacao','Você tentou controlar o seu comportamento de (cutucar) a pele diminuindo ou parando de (cutucar)? Quantas vezes? Quão bem-sucedida você foi ao tentar diminuir ou parar de (cutucar)? Ou, nem tentou porque sabia que não seria capaz?', NOW(), NOW()),
        ('K150','Escoriacao','Como você se sentia enquanto (cutucava) sua pele? Você sentia prazer, satisfação ou alívio quando você estava (cutucando) sua pele?', NOW(), NOW()),
        ('K151','Escoriacao','Você acha que você “viajava” ou perdia a noção do tempo quando você estava (cutucando)?', NOW(), NOW()),
        ('K152a','Escoriacao','Lhe causar angústia e aborrecimento?', NOW(), NOW()),
        ('K152b','Escoriacao','Já interferiu no seu trabalho, ou estudos?', NOW(), NOW()),
        ('K152c','Escoriacao','Já interferiu na sua vida social, fez você evitar eventos, ou encontros com amigos ou familiares?', NOW(), NOW()),
        ('K152d','Escoriacao','Já interferiu na sua vida amorosa, ou sexual?', NOW(), NOW()),
        ('K152e','Escoriacao','Lhe causar um problema de saúde que precisou de atenção médica?', NOW(), NOW()),
        ('K152f','Escoriacao','(Cutucar) a pele já lhe causou algum outro tipo de problema?', NOW(), NOW()),
        ('K152g','Escoriacao','Que tipo de problema?', NOW(), NOW()),
        ('K154A1','Escoriacao','Apenas quando estava drogado (por exemplo cocaína, anfetamina, outros estimulantes)?', NOW(), NOW()),
        ('K154A2','Escoriacao','Por que você tinha um problema clínico ou dermatológico que fazia com que você (cutucasse) sua pele?', NOW(), NOW()),
        ('K155A1','Escoriacao','Parasitas ou insetos os quais você sentia que estavam debaixo da sua pele?', NOW(), NOW()),
        ('K155A2','Escoriacao','Inchaços, manchas ou algum outro tipo de defeito que fazia com que você parecesse especialmente sem atrativos ou feia?', NOW(), NOW()),
        ('K156','Escoriacao','Quanta dificuldade o transtorno de escoriação gerou para você realizar seus trabalhos, tarefas de casa, ou estar junto com outras pessoas?', NOW(), NOW()),
        ('K158','Escoriacao','Você apresentou esses problemas relacionados a (cutucar) a pele durante o mês passado?', NOW(), NOW()),
        ('K159','Escoriacao','Como você classificaria a gravidade do Transtorno de Escoriação desse paciente?', NOW(), NOW()),
        ('K160','Escoriacao','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
        ('K161','Escoriacao','Quando você teve o último episódio de (cutucar) a pele?', NOW(), NOW()),
        ('K162','Escoriacao','Quantos anos você tinha quando teve o primeiro episódio de (cutucar) a pele até machucar?', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE disorder = 'Escoriacao'
    `)
  }
};
