'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
      VALUES
        ('K61x','Oniomania','Alguma vez você sentiu que suas compras estavam fora de controle?', NOW(), NOW()),
        ('K61y','Oniomania','As suas compras alguma vez lhe causaram problemas?', NOW(), NOW()),
        ('K61w','Oniomania','Alguém alguma vez reclamou do seu comportamento de comprar?', NOW(), NOW()),
        ('K61z','Oniomania','Você já se endividou por causa das compras?', NOW(), NOW()),
        ('K61A1','Oniomania','Qual o período da sua vida em que você mais comprou? Quando começou esse período?', NOW(), NOW()),
        ('K61A2','Oniomania','Quando terminou esse período? Você diria que o período atual é o período que você mais comprou na sua vida?', NOW(), NOW()),
        ('K61B','Oniomania','Lojas/shoppings', NOW(), NOW()),
        ('K61C','Oniomania','Catálogos', NOW(), NOW()),
        ('K61D','Oniomania','Televisão (ex. canais de compra)', NOW(), NOW()),
        ('K61E','Oniomania','Internet', NOW(), NOW()),
        ('K61F','Oniomania','Feiras e eventos', NOW(), NOW()),
        ('K61H','Oniomania','Programas de pontos do cartão de crédito', NOW(), NOW()),
        ('K61I','Oniomania','Aplicativos de compras no celular', NOW(), NOW()),
        ('K61G','Oniomania','Outro', NOW(), NOW()),
        ('K62','Oniomania','Você teve dificuldades em controlar suas compras? Ou seja, você geralmente percebe que quando vai às compras acaba gastando mais tempo do que havia planejado ou gastando mais dinheiro do que pretendia?', NOW(), NOW()),
        ('K63','Oniomania','Você já tentou controlar ou reduzir as suas compras? Quantas vezes? Você teve sucesso em alguma tentativa?', NOW(), NOW()),
        ('K64','Oniomania','Como você se sentiu quando tentou controlar ou reduzir as suas compras? Em algum momento você ficou inquieto(a), ansioso(a) ou irritado(a)?', NOW(), NOW()),
        ('K65a','Oniomania','Precisou aumentar o tempo ou quantia de dinheiro gastos, ou ainda aumentar o número de coisas que você comprava para obter a mesma sensação?', NOW(), NOW()),
        ('K65b','Oniomania','A intensidade dos sentimentos que você tinha enquanto comprava diminuiu com o passar do tempo?', NOW(), NOW()),
        ('K66','Oniomania','Você frequentemente pensa, ou pensava, em comprar, imaginava ou planejava oportunidades futuras para as compras? Você pensava mais em comprar ao invés de focar em coisas como trabalho ou escola? Com que frequência?', NOW(), NOW()),
        ('K67A','Oniomania','Incontroláveis?', NOW(), NOW()),
        ('K67B','Oniomania','Intrusivos, isto é invadem a sua consciência de repente?', NOW(), NOW()),
        ('K67C','Oniomania','Sem sentido?', NOW(), NOW()),
        ('K68','Oniomania','Você sentia uma sensação de tensão crescente antes de comprar? Você sentia ansiedade, tristeza ou tem sentimentos ou sensações desagradáveis antes de comprar?', NOW(), NOW()),
        ('K69','Oniomania','Você tinha sensação de prazer, satisfação ou alívio enquanto comprava ou logo após a compra?', NOW(), NOW()),
        ('K70','Oniomania','Você já comprou como uma forma de escapar dos problemas do dia-a-dia ou para aliviar sentimentos desconfortáveis tais como desesperança, ansiedade, culpa ou tristeza?', NOW(), NOW()),
        ('K71','Oniomania','Você frequentemente fez compras enquanto deveria estar trabalhando, estudando ou passando tempo com a família, amigos ou outra atividade de lazer?', NOW(), NOW()),
        ('K72','Oniomania','Você sente ou sentia com frequência remorso ou culpa após uma compra?', NOW(), NOW()),
        ('K73','Oniomania','Você mentia para alguém sobre suas compras, como por exemplo, se você teve problemas financeiros por gastar demais, ou quanto você gastou no seu cartão de crédito ou quanto tempo gastou comprando?', NOW(), NOW()),
        ('K74','Oniomania','O seu comprar excessivo já lhe trouxe problemas com a sua família ou amigos, com o seu (sua) companheiro(a), com o seu trabalho ou com a escola? Você já perdeu algum relacionamento importante ou amizade devido às compras? E com relação a perda de emprego ou oportunidade na carreira?', NOW(), NOW()),
        ('K75','Oniomania','O fato de você não poder controlar o ato de comprar lhe deixou triste?', NOW(), NOW()),
        ('K76','Oniomania','As compras excessivas levaram você a ter problemas financeiros? Isso levou você a fazer dívidas?', NOW(), NOW()),
        ('K77','Oniomania','Você pediu dinheiro a alguém para lhe ajudar com os problemas financeiros causados pela compra excessiva?', NOW(), NOW()),
        ('K78','Oniomania','Muitas das coisas que você comprou não foram usadas, ou você frequentemente comprou coisas e nem desembrulhou quando chegou em casa?', NOW(), NOW()),
        ('K79','Oniomania','Você perdeu o controle com as compras somente quando estava se sentindo agitada(o), eufórica(o) ou irritável?', NOW(), NOW()),
        ('K80','Oniomania','Quanta dificuldade o comprar excessivo causou a você na sua vida, considerando o trabalho, cuidar da casa ou estar com outras pessoas?', NOW(), NOW()),
        ('K81','Oniomania','Durante o último mês, você teve problemas com as compras?', NOW(), NOW()),
        ('K82','Oniomania','Como você classificaria a gravidade da Oniomania desse paciente?', NOW(), NOW()),
        ('K83','Oniomania','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
        ('K84','Oniomania','Quanto tempo faz desde a última vez que você teve problemas com as compras?', NOW(), NOW()),
        ('K84X','Oniomania','Quantos anos você tinha quando começou a comprar excessivamente?', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE disorder = 'Oniomania'
    `)
  }
};
