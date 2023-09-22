'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO dassquestions (question, createdAt, updatedAt)
      VALUES
        ('Achei difícil me acalmar', NOW(), NOW()),
        ('Senti minha boca seca', NOW(), NOW()),
        ('Não consegui vivenciar nenhum sentimento positivo', NOW(), NOW()),
        ('Tive dificuldade em respirar em alguns momentos (ex. respiração ofegante, falta de ar, sem ter feito nenhum esforço físico)', NOW(), NOW()),
        ('Achei difícil ter iniciativa para fazer as coisas', NOW(), NOW()),
        ('Tive a tendência de reagir de forma exagerada às situações', NOW(), NOW()),
        ('Senti tremores (ex. nas mãos)', NOW(), NOW()),
        ('Senti que estava sempre nervoso', NOW(), NOW()),
        ('Preocupei-me com situações em que eu pudesse entrar em pânico e parecesse ridículo(a)', NOW(), NOW()),
        ('Senti que não tinha nada a desejar', NOW(), NOW()),
        ('Senti-me agitado', NOW(), NOW()),
        ('Achei difícil relaxar', NOW(), NOW()),
        ('Senti-me depressivo(a) e sem ânimo', NOW(), NOW()),
        ('Fui intolerante com as coisas que me impediam de continuar o que eu estava fazendo', NOW(), NOW()),
        ('Senti que ia entrar em pânico', NOW(), NOW()),
        ('Não consegui me entusiasmar com nada', NOW(), NOW()),
        ('Senti que não tinha valor como pessoa', NOW(), NOW()),
        ('Senti que estava um pouco emotivo/sensível demais', NOW(), NOW()),
        ('Sabia que meu coração estava alterado mesmo não tendo feito nenhum esforço físico (ex. aumento da frequência cardíaca, disritmia cardíaca)', NOW(), NOW()),
        ('Senti medo sem motivo', NOW(), NOW()),
        ('Senti que a vida não tinha sentido', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM dassquestions WHERE question IN ('Achei difícil me acalmar',
      'Senti minha boca seca',
      'Não consegui vivenciar nenhum sentimento positivo',
      'Tive dificuldade em respirar em alguns momentos (ex. respiração ofegante, falta de ar, sem ter feito nenhum esforço físico)',
      'Achei difícil ter iniciativa para fazer as coisas',
      'Tive a tendência de reagir de forma exagerada às situações',
      'Senti tremores (ex. nas mãos)',
      'Senti que estava sempre nervoso',
      'Preocupei-me com situações em que eu pudesse entrar em pânico e parecesse ridículo(a)',
      'Senti que não tinha nada a desejar',
      'Senti-me agitado',
      'Achei difícil relaxar',
      'Senti-me depressivo(a) e sem ânimo',
      'Fui intolerante com as coisas que me impediam de continuar o que eu estava fazendo',
      'Senti que ia entrar em pânico',
      'Não consegui me entusiasmar com nada',
      'Senti que não tinha valor como pessoa',
      'Senti que estava um pouco emotivo/sensível demais',
      'Sabia que meu coração estava alterado mesmo não tendo feito nenhum esforço físico (ex. aumento da frequência cardíaca, disritmia cardíaca)',
      'Senti medo sem motivo',
      'Senti que a vida não tinha sentido');
    `);
  }
};
