'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
    VALUES
      ('K217-X','Ciume Patologico','Agora eu gostaria de continuar lhe fazendo mais perguntas sobre seus relacionamentos românticos/amorosos, mas dessa vez vamos conversar sobre o ciúme. Você se vê como uma pessoa ciumenta?', NOW(), NOW()),
      ('K217-Y','Ciume Patologico','Você já sentiu que alguma vez o seu ciúme lhe trouxe algum prejuízo, ou que a(o) fez sofrer demais?', NOW(), NOW()),
      ('K218','Ciume Patologico','Você pensava frequentemente que sua/seu parceira(o) poderia ser ou era infiel a você? Passava a maior parte do tempo com medo de ser traído(a), ou pensando que isto poderia acontecer?', NOW(), NOW()),
      ('K219-1','Ciume Patologico','Procurar informações sobre a infidelidade da(o) parceira(o) no celular, na agenda, ou em outros pertences sem autorização?', NOW(), NOW()),
      ('K219-2','Ciume Patologico','Perseguir a(o) parceira(o) na rua, sem que ela(e) perceba?', NOW(), NOW()),
      ('K219-3','Ciume Patologico','Vasculhar as redes sociais dela(e) em busca de outro relacionamentos?', NOW(), NOW()),
      ('K219-4','Ciume Patologico','Perguntar a outras pessoas, ou pedir para lhe avisarem se elas virem alguma atitude suspeita da(o) sua/seu parceira(o)?', NOW(), NOW()),
      ('K219-5','Ciume Patologico','Contratar alguém para vigiar a(o) sua/seu parceira(o)?', NOW(), NOW()),
      ('K219-6','Ciume Patologico','Instalar rastreadores no carro, no telefone, ou outro pertence dela(e) para saber onde ela(e) vai?', NOW(), NOW()),
      ('K220','Ciume Patologico','O que deixava você com ciúme? Você acha que seu ciúme era desproporcional, ou as pessoas lhe diziam que você estava exagerando?', NOW(), NOW()),
      ('K221','Ciume Patologico','As suas manifestações de ciúme aconteciam de repente sem que você conseguisse controlá-las? Ou, você reagia de forma súbita porque estava com medo de ser traído naquele momento?', NOW(), NOW()),
      ('K222-A','Ciume Patologico','Xingou, ou discutiu com alguém? Agrediu com palavras, ameaçou, empurrou ou tentou se impor fisicamente a alguém?', NOW(), NOW()),
      ('K222-B','Ciume Patologico','Você já perdeu o controle a ponto de quebrar coisas, destruir propriedades, ou machucar alguém durante um acesso de ciúme?', NOW(), NOW()),
      ('K223-A','Ciume Patologico','Brigou no emprego, ficou desconcentrado, ou não conseguia trabalhar direito por causa do seu ciúme?', NOW(), NOW()),
      ('K223-B','Ciume Patologico','Comprometeu seu relacionamento amoroso, uma amizade, ou o relacionamento com pessoas da família?', NOW(), NOW()),
      ('K223-C','Ciume Patologico','Teve complicações financeiras, gastou dinheiro, ou se endividou por causa do seu ciúme?', NOW(), NOW()),
      ('K223-D','Ciume Patologico','Teve complicações jurídicas/legais, foi detido, chamado à delegacia para depor, ou foi processado por causa do seu ciúme?', NOW(), NOW()),
      ('K223-E','Ciume Patologico','Quando você estava se sentindo agitado(a)/eufórico(a) ou irritável?', NOW(), NOW()),
      ('K223-F','Ciume Patologico','Quando você estava muito confusa(o), ouvindo vozes, ou tendo experiências estranhas e difíceis de explicar?', NOW(), NOW()),
      ('K223-G','Ciume Patologico','Quando uma certeza absoluta e difícil de explicar fez você perceber que sua/seu parceira(o) era infiel?', NOW(), NOW()),
      ('K223-H','Ciume Patologico','Quando você estava sob efeito de álcool, ou outra droga?', NOW(), NOW()),
      ('K224','Ciume Patologico','Você apresentou problemas relacionados ao ciúme durante o mês passado?', NOW(), NOW()),
      ('K225','Ciume Patologico','Como você classificaria a gravidade do Ciúme Patológico dessa(e) paciente?', NOW(), NOW()),
      ('K225-A','Ciume Patologico','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
      ('K226','Ciume Patologico','Quando foi a última vez que você perdeu o controle do seu ciúme?', NOW(), NOW()),
      ('K227','Ciume Patologico','Quantos anos você tinha quando teve os primeiros sintomas de perda de controle do seu ciúme?', NOW(), NOW());
  `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE disorder = 'Ciume Patologico'
    `)
  }
};
