'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
    VALUES
      ('K228','Dependencia de Comida','Você poderia, por favor, informar o seu peso?', NOW(), NOW()),
      ('K229','Dependencia de Comida','Você poderia, por favor, me informar a sua altura?', NOW(), NOW()),
      ('K230','Dependencia de Comida','Alguma vez você sentiu que seus hábitos alimentares estavam fora de controle?', NOW(), NOW()),
      ('K231','Dependencia de Comida','Existe ou existiu algum tipo de alimento ou bebida não alcoólica que você tem ou tinha mais dificuldade em controlar o consumo? SE SIM, diga os três principais, por favor.', NOW(), NOW()),
      ('K232','Dependencia de Comida','Existe ou existiu algum tipo de alimento ou bebida não alcoólica que você tem ou tinha mais dificuldade em controlar o consumo? SE SIM, diga os três principais, por favor.', NOW(), NOW()),
      ('K234','Dependencia de Comida','Existe ou existiu algum tipo de alimento ou bebida não alcoólica que você tem ou tinha mais dificuldade em controlar o consumo? SE SIM, diga os três principais, por favor.', NOW(), NOW()),
      ('K235','Dependencia de Comida','Alguma vez alguém já lhe criticou por causa dos seus hábitos alimentares?', NOW(), NOW()),
      ('K236','Dependencia de Comida','Os seus hábitos alimentares alguma vez já lhe causaram problemas?', NOW(), NOW()),
      ('K237','Dependencia de Comida','Houve uma época em sua vida em que você teve uma dificuldade continuada em controlar seus hábitos alimentares? SE SIM, você pode me dizer quantos anos você tinha quando esta fase começou?', NOW(), NOW()),
      ('K238','Dependencia de Comida','Quantos anos você tinha quando esta fase terminou? OU, você diria que o momento atual é a fase em que você mais teve dificuldade em controlar os seus hábitos alimentares?', NOW(), NOW()),
      ('K239','Dependencia de Comida','Quantos meses esta fase durou, ou está durando?', NOW(), NOW()),
      ('K240','Dependencia de Comida','Você notou se, por vezes, ao consumir determinados alimentos ou bebidas não alcoólicas, você tinha dificuldade em controlar a quantidade ou o tempo que você gastou se alimentando/bebendo?', NOW(), NOW()),
      ('K241','Dependencia de Comida','Você já tentou controlar o seu hábito alimentar diminuindo ou eliminando alimentos/bebidas não alcoólicas da sua dieta? Quantas vezes? Você teve sucesso ao tentar diminuir ou interromper o consumo desses alimentos?', NOW(), NOW()),
      ('K242','Dependencia de Comida','Você gasta ou gastava muito tempo consumindo alimentos ou bebidas não alcoólicas de forma excessiva ou se recuperando após fazer isso?', NOW(), NOW()),
      ('K243','Dependencia de Comida','Existe ou existia algum tipo, ou tipos de alimentos ou bebidas não alcoólicas específicas, que você sentia uma necessidade ou um desejo intenso de consumir?', NOW(), NOW()),
      ('K244a','Dependencia de Comida','No trabalho?', NOW(), NOW()),
      ('K244b','Dependencia de Comida','Nos estudos?', NOW(), NOW()),
      ('K244c','Dependencia de Comida','Em casa?', NOW(), NOW()),
      ('K245','Dependencia de Comida','Você continuou consumindo alimentos ou bebidas não alcoólicas em excesso, apesar disso estar lhe causando problemas?', NOW(), NOW()),
      ('K246a','Dependencia de Comida','Sociais?', NOW(), NOW()),
      ('K246b','Dependencia de Comida','Profissionais?', NOW(), NOW()),
      ('K246c','Dependencia de Comida','Recreativas?', NOW(), NOW()),
      ('K247','Dependencia de Comida','Você alguma vez já comeu impulsivamente numa situação em que isso poderia representar um perigo à saúde, como dirigindo, após uma cirurgia, ou outra situação em que deveria restringir a alimentação por indicação médica (ex.: açúcar, sal, gordura, etc.)?', NOW(), NOW()),
      ('K248','Dependencia de Comida','O seu hábito alimentar já prejudicou sua saúde física ou emocional? SE SIM, você manteve este o consumo excessivo de alimentos ou bebidas não alcoólicas mesmo assim?', NOW(), NOW()),
      ('K249','Dependencia de Comida','Com o passar do tempo, você sentiu necessidade de aumentar o consumo desses alimentos ou bebidas (não alcoólicas) para experimentar o mesmo prazer que você tinha antes?', NOW(), NOW()),
      ('K250','Dependencia de Comida','Você acha que a intensidade do prazer que você tinha quando consumia esses alimentos ou bebidas não alcoólicas diminuiu com o passar do tempo? Quanto diminuiu?', NOW(), NOW()),
      ('K251','Dependencia de Comida','Quando comia menos ou parava de consumir esses alimentos ou bebidas (não alcoólicas), as suas mãos tremiam, transpiravam ou você sentia-se agitado(a)?', NOW(), NOW()),
      ('K252','Dependencia de Comida','Alguma vez consumiu esses alimentos ou bebidas não alcoólicas para cessar o mal estar, ou porque tinha medo de passar mal se não o fizesse?', NOW(), NOW()),
      ('K253','Dependencia de Comida','Você apresentou esses problemas relacionados ao seu hábito alimentar durante o mês passado?', NOW(), NOW()),
      ('K254','Dependencia de Comida','Como você classificaria a gravidade da Dependência de Comida desse paciente?', NOW(), NOW()),
      ('K255','Dependencia de Comida','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
      ('K256','Dependencia de Comida','Quando foi a última vez que você teve um período de perda de controle com comida?', NOW(), NOW()),
      ('K256A','Dependencia de Comida','Quantos anos você tinha quando teve a primeira fase de comer sem controle na sua vida?', NOW(), NOW());
  `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE disorder = 'Dependencia de Comida'
    `)
  }
};
