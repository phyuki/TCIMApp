'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
    VALUES
      ('K205-X','Amor Patologico','Agora eu gostaria de lhe fazer algumas perguntas sobre seus relacionamentos românticos/amorosos. Você já esteve envolvido em um relacionamento amoroso por 30 dias, ou mais, ao menos uma vez na vida?', NOW(), NOW()),
      ('K205-Y','Amor Patologico','Você já sentiu que alguma vez sua forma de amar lhe trouxe algum prejuízo, ou que a(o) fez sofrer demais?', NOW(), NOW()),
      ('K206-A','Amor Patologico','O seu sono piorava?', NOW(), NOW()),
      ('K206-B','Amor Patologico','Sentia o coração disparado, tremores pelo corpo, ou suadouro?', NOW(), NOW()),
      ('K206-C','Amor Patologico','Sentia os músculos, ou o corpo todo tenso?', NOW(), NOW()),
      ('K206-D','Amor Patologico','Sentia muita fome, ou perdia o apetite?', NOW(), NOW()),
      ('K206-E','Amor Patologico','Alternava momentos de abatimento e agitação motora?', NOW(), NOW()),
      ('K206-F','Amor Patologico','Outro sintoma causado pelo afastamento, ou ameaça do mesmo?', NOW(), NOW()),
      ('K207','Amor Patologico','Você dava mais atenção ao(à) parceiro(a) do que gostaria ou do que havia planejado? Preocupava-se mais com o bem-estar (saúde, alimentação) do(a) parceiro(a) do que com suas próprias necessidades?', NOW(), NOW()),
      ('K208','Amor Patologico','Você tentou diminuir a atenção e os cuidados destinados ao(à) parceiro(a), mas não conseguiu?', NOW(), NOW()),
      ('K209','Amor Patologico','Você gastava muito tempo tentando controlar as atividades do(a) parceiro(a)? Você ligava para saber onde ele(a) estava? Você elaborava planos para ficar mais perto do(a) parceiro(a)?', NOW(), NOW()),
      ('K210-A','Amor Patologico','Teve prejuízos no trabalho, não conseguia se concentrar, por estar pensando no(a) parceiro(a)?', NOW(), NOW()),
      ('K210-B','Amor Patologico','Deixou de se encontrar com amigos ou familiares por causa do seu relacionamento?', NOW(), NOW()),
      ('K210-C','Amor Patologico','Negligenciou os cuidados dos seus filhos por causa do parceiro(a)?', NOW(), NOW()),
      ('K210-D','Amor Patologico','Teve complicações financeiras, gastou dinheiro, ou se endividou por causa do seu relacionamento?', NOW(), NOW()),
      ('K211','Amor Patologico','Você tentava manter o relacionamento amoroso apesar dos problemas pessoais, familiares e/ou profissionais que ele trazia para você?', NOW(), NOW()),
      ('K211-A','Amor Patologico','Quando você estava se sentindo agitada(o)/eufórica(o) ou irritável?', NOW(), NOW()),
      ('K211-B','Amor Patologico','Quando você estava muito confusa(o), ouvindo vozes, ou tendo experiências estranhas e difíceis de explicar?', NOW(), NOW()),
      ('K211-C','Amor Patologico','Com parceiros socialmente distantes, com quem você raramente se encontrava, ou nem tinha um relacionamento concreto?', NOW(), NOW()),
      ('K213','Amor Patologico','Você apresentou problemas relacionados ao comportamento amoroso durante o mês passado?', NOW(), NOW()),
      ('K214','Amor Patologico','Como você classificaria a gravidade do Amor Patológico dessa(e) paciente?', NOW(), NOW()),
      ('K215','Amor Patologico','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
      ('K216','Amor Patologico','Quando foi a última vez que você perdeu o controle de uma relação amorosa?', NOW(), NOW()),
      ('K217','Amor Patologico','Quantos anos você tinha quando teve os primeiros sintomas de perda de controle da relação amorosa?', NOW(), NOW());
  `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE disorder = 'Amor Patologico'
    `)
  }
};
