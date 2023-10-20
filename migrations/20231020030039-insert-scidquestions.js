'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO scidquestions (cod, question, createdAt, updatedAt)
      VALUES
        ('K1a.1','Você tem ou tinha acessos de raiva, xingava, ou discutia com frequência?', NOW(), NOW()),
        ('K1a.2','Você já ficou tão irritado que ameaçou, ou tentou se impor fisicamente a uma pessoa, ou animal?', NOW(), NOW()),
        ('K1a','Alguma dessas coisas já lhe aconteceu ao menos duas vezes por semana ao longo de três meses?', NOW(), NOW()),
        ('K1b.1','Quebrar alguma coisa, ou destruir propriedade?', NOW(), NOW()),
        ('K1b.2','Machucar fisicamente alguém, ou um animal?', NOW(), NOW()),
        ('K1b','Alguma dessas coisas aconteceu pelo menos três vezes ao longo de um ano?', NOW(), NOW()),
        ('K2','O que aconteceu para aborrecer você? Você acha que sua reação foi desproporcional? Alguém disse que sua reação foi desproporcional ao que aconteceu?', NOW(), NOW()),
        ('K-TEI-A','As suas explosões aconteceram sem que você conseguisse controlar? Ou você planejava suas ações com vistas a um objetivo específico?', NOW(), NOW()),
        ('K-TEI-B1','As suas explosões já prejudicaram o seu trabalho, ou um relacionamento profissional?', NOW(), NOW()),
        ('K-TEI-B2','Você já comprometeu um relacionamento pessoal por causa das explosões?', NOW(), NOW()),
        ('K-TEI-B3','Você já perdeu dinheiro, ou teve problema financeiro por causa das explosões?', NOW(), NOW()),
        ('K-TEI-B4','Você já teve complicações legais por causa das explosões?', NOW(), NOW()),
        ('K-TEI-B5','Você já teve algum outro tipo de problema por causa das explosões?', NOW(), NOW()),
        ('K-TEI-B6','Que tipo de problema?', NOW(), NOW()),
        ('K-TEI-C','O paciente tinha mais de 6 anos quando esses sintomas ocorreram?', NOW(), NOW()),
        ('K3.1','Quando estava muito deprimido, sem sentir prazer na vida, ou achando que viver não valia à pena?', NOW(), NOW()),
        ('K3.2','Quando estava se sentindo agitado/eufórico ou irritável?', NOW(), NOW()),
        ('K3.3','Quando era criança ou adolescente, sendo que acordava irritado e permanecia assim quase todo o dia?', NOW(), NOW()),
        ('K3.4','Quando você estava muito confuso(a), ouvindo vozes, ou tendo experiências estranhas e difíceis de explicar?', NOW(), NOW()),
        ('K3.5','Depois que você teve um acidente grave em que você bateu a cabeça?', NOW(), NOW()),
        ('K3.6','Depois dos 45 anos de idade, junto com outras dificuldades de memória, ou de compreensão?', NOW(), NOW()),
        ('K3.7','Quando estava sob efeito de álcool, drogas, ou algum tipo de medicamento?', NOW(), NOW()),
        ('K3.8','Quando era uma criança ou adolescente e estava passando por uma crise na sua vida?', NOW(), NOW()),
        ('K3.9','Você tem comportamentos frequentes que os outros achariam irresponsáveis, como destruir a propriedade alheia, ou vender drogas? Mentiu, passou a perna ou enganou os outros para obter vantagens, sem sentir culpa por isso?', NOW(), NOW()),
        ('K3.10','Desde jovem, você sente como se você não fosse real, ou que suas emoções são instáveis e que manter qualquer relacionamento é muito difícil para você?', NOW(), NOW()),
        ('K5','Você apresentou esses problemas relacionados às suas explosões durante o mês passado?', NOW(), NOW()),
        ('K6','Como você classificaria a gravidade do Transtorno Explosivo Intermitente desse paciente?', NOW(), NOW()),
        ('K7','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
        ('K8','Quando foi a última vez que você teve uma explosão, ou ataque de raiva?', NOW(), NOW()),
        ('K9','Quantos anos você tinha quando teve os primeiros episódios de explosão ou ataque de raiva?', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE question IN
        ('Você tem ou tinha acessos de raiva, xingava, ou discutia com frequência?',
        'Você já ficou tão irritado que ameaçou, ou tentou se impor fisicamente a uma pessoa, ou animal?',
        'Alguma dessas coisas já lhe aconteceu ao menos duas vezes por semana ao longo de três meses?',
        'Quebrar alguma coisa, ou destruir propriedade?',
        'Machucar fisicamente alguém, ou um animal?',
        'Alguma dessas coisas aconteceu pelo menos três vezes ao longo de um ano?',
        'O que aconteceu para aborrecer você? Você acha que sua reação foi desproporcional? Alguém disse que sua reação foi desproporcional ao que aconteceu?',
        'As suas explosões aconteceram sem que você conseguisse controlar? Ou você planejava suas ações com vistas a um objetivo específico?',
        'As suas explosões já prejudicaram o seu trabalho, ou um relacionamento profissional?',
        'Você já comprometeu um relacionamento pessoal por causa das explosões?',
        'Você já perdeu dinheiro, ou teve problema financeiro por causa das explosões?',
        'Você já teve complicações legais por causa das explosões?',
        'Você já teve algum outro tipo de problema por causa das explosões?',
        'Que tipo de problema?',
        'O paciente tinha mais de 6 anos quando esses sintomas ocorreram?',
        'Quando estava muito deprimido, sem sentir prazer na vida, ou achando que viver não valia à pena?',
        'Quando estava se sentindo agitado/eufórico ou irritável?',
        'Quando era criança ou adolescente, sendo que acordava irritado e permanecia assim quase todo o dia?',
        'Quando você estava muito confuso(a), ouvindo vozes, ou tendo experiências estranhas e difíceis de explicar?',
        'Depois que você teve um acidente grave em que você bateu a cabeça?',
        'Depois dos 45 anos de idade, junto com outras dificuldades de memória, ou de compreensão?',
        'Quando estava sob efeito de álcool, drogas, ou algum tipo de medicamento?',
        'Quando era uma criança ou adolescente e estava passando por uma crise na sua vida?',
        'Você tem comportamentos frequentes que os outros achariam irresponsáveis, como destruir a propriedade alheia, ou vender drogas? Mentiu, passou a perna ou enganou os outros para obter vantagens, sem sentir culpa por isso?',
        'Desde jovem, você sente como se você não fosse real, ou que suas emoções são instáveis e que manter qualquer relacionamento é muito difícil para você?',
        'Você apresentou esses problemas relacionados às suas explosões durante o mês passado?',
        'Como você classificaria a gravidade do Transtorno Explosivo Intermitente desse paciente?',
        'Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?',
        'Quando foi a última vez que você teve uma explosão, ou ataque de raiva?',
        'Quantos anos você tinha quando teve os primeiros episódios de explosão ou ataque de raiva?');
    `);
  }
};
