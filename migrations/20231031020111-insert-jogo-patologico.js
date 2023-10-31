'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
      VALUES
        ('K32a1','Jogo','Você alguma vez já jogou apostando dinheiro ou outros itens de valor?', NOW(), NOW()),
        ('K32a2','Jogo','Qual o período da sua vida em que você mais jogou? Quando começou e terminou esse período? Você diria que o período atual é o período que você mais jogou na sua vida?', NOW(), NOW()),
        ('K32a3','Jogo','Nesse período, você sentiu que suas apostas estavam fora de controle?', NOW(), NOW()),
        ('K32a4','Jogo','Nesse período, apostar lhe causou algum tipo de problema?', NOW(), NOW()),
        ('K32a5','Jogo','Nesse período, alguém reclamou da suas apostas?', NOW(), NOW()),
        ('K32a6','Jogo','Hoje em dia você ainda tem que lidar com problemas causados pelas apostas?', NOW(), NOW()),
        ('K32b','Jogo','Jogos de cartas (carteado)', NOW(), NOW()),
        ('K32c','Jogo','Loterias (sena, quina, etc.)', NOW(), NOW()),
        ('K32d','Jogo','Corridas de cavalo', NOW(), NOW()),
        ('K32e','Jogo','Apostas em resultados de eventos esportivos', NOW(), NOW()),
        ('K32e1','Jogo','Jogos em cassinos (roleta, dados)', NOW(), NOW()),
        ('K32h','Jogo','Bingo eletrônico, caça níquel ou videopôquer', NOW(), NOW()),
        ('K32i','Jogo','Jogo do bicho', NOW(), NOW()),
        ('K32j','Jogo','Pôquer online', NOW(), NOW()),
        ('K32k','Jogo','Casino online', NOW(), NOW()),
        ('K32l','Jogo','Outros jogos de cartas online', NOW(), NOW()),
        ('K32m','Jogo','Apostas em eventos esportivos online', NOW(), NOW()),
        ('K32n','Jogo','Outras formas de apostas online', NOW(), NOW()),
        ('K32o','Jogo','Especulação no mercado financeiro (opções, índice futuro, outros derivativos)', NOW(), NOW()),
        ('K32g','Jogo','Outro', NOW(), NOW()),
        ('K33','Jogo','Com que frequência você pensava sobre jogo? Quanto tempo você passava pensando sobre momentos passados no qual você estava ganhando? Com que frequência você pensava em maneiras de conseguir dinheiro para jogar? Você perdia muito tempo fazendo planos para sua próxima oportunidade de jogar?', NOW(), NOW()),
        ('K34','Jogo','Você aumentava a quantidade de dinheiro que você apostava ao longo do tempo? SE SIM: Porque isso ocorria? Foi porque isso fazia o jogo ficar mais emocionante para você?', NOW(), NOW()),
        ('K35','Jogo','Você tentou controlar o seu comportamento de jogo diminuindo ou parando de jogar? Quantas vezes? Você teve sucesso ao tentar diminuir ou para de jogar?', NOW(), NOW()),
        ('K36','Jogo','Como você se sentiu quando tentou diminuir ou parar de jogar? Em algum momento você ficou inquieto, ansioso ou irritado?', NOW(), NOW()),
        ('K37','Jogo','Além de querer ganhar, existiam outras razões para jogar? Você já jogou para escapar de seus problemas ou para aliviar sensações desconfortáveis como desamparo, culpa, tristeza ansiedade, ou depressão?', NOW(), NOW()),
        ('K38','Jogo','Quando você perdia dinheiro jogando, você tentava “correr atrás” das suas perdas? Ou seja, depois de um dia de azar, você volta a jogar para tentar recuperar as suas perdas?', NOW(), NOW()),
        ('K39','Jogo','Você mentia com frequência para encobrir seu comportamento de jogo, como, por exemplo, mentir sobre quanto tempo você passou jogando ou quanto dinheiro você perdeu?', NOW(), NOW()),
        ('K40','Jogo','Você já cometeu algum ato ilegal para conseguir dinheiro para jogar ou para pagar dívidas de jogo? Coisas como passar cheques sem fundo, falsificar a assinatura ou pegar dinheiro de outra pessoa?', NOW(), NOW()),
        ('K41','Jogo','Quanto o seu comportamento de jogo afetou a sua vida? Você já perdeu algum emprego ou foi mal na escola por causa disso? Você já se pôs em perigo ou perdeu um relacionamento sério por causa disso?', NOW(), NOW()),
        ('K42','Jogo','Você já teve que pedir dinheiro emprestado a outras pessoas para saldar dívidas de jogo? Você já fez empréstimos para resolver uma dívida financeira causada ou agravada pelo jogo?', NOW(), NOW()),
        ('K44','Jogo','Você jogava apenas quando estava se sentindo agitado/eufórico ou irritável?', NOW(), NOW()),
        ('K45','Jogo','Você apresentou esses problemas relacionados às apostas durante o mês passado?', NOW(), NOW()),
        ('K46','Jogo','Como você classificaria a gravidade do Transtorno do Jogo desse paciente?', NOW(), NOW()),
        ('K47','Jogo','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
        ('K48','Jogo','Quando você realizou sua última aposta, pensou em ou teve desejo de apostar?', NOW(), NOW()),
        ('K49','Jogo','Quantos anos você tinha quando começou a apostar regularmente (pelo menos 1 vez por mês)?', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE question IN
      ('Você alguma vez já jogou apostando dinheiro ou outros itens de valor?',
        'Qual o período da sua vida em que você mais jogou? Quando começou e terminou esse período? Você diria que o período atual é o período que você mais jogou na sua vida?',
        'Nesse período, você sentiu que suas apostas estavam fora de controle?',
        'Nesse período, apostar lhe causou algum tipo de problema?',
        'Nesse período, alguém reclamou da suas apostas?',
        'Hoje em dia você ainda tem que lidar com problemas causados pelas apostas?', 
        'Jogos de cartas (carteado)',
        'Loterias (sena, quina, etc.)',
        'Corridas de cavalo',
        'Apostas em resultados de eventos esportivos',
        'Jogos em cassinos (roleta, dados)',
        'Bingo eletrônico, caça níquel ou videopôquer', 
        'Jogo do bicho',
        'Pôquer online', 
        'Casino online',
        'Outros jogos de cartas online',
        'Apostas em eventos esportivos online',
        'Outras formas de apostas online',
        'Especulação no mercado financeiro (opções, índice futuro, outros derivativos)',
        'Outro',
        'Com que frequência você pensava sobre jogo? Quanto tempo você passava pensando sobre momentos passados no qual você estava ganhando? Com que frequência você pensava em maneiras de conseguir dinheiro para jogar? Você perdia muito tempo fazendo planos para sua próxima oportunidade de jogar?', 
        'Você aumentava a quantidade de dinheiro que você apostava ao longo do tempo? SE SIM: Porque isso ocorria? Foi porque isso fazia o jogo ficar mais emocionante para você?',
        'Você tentou controlar o seu comportamento de jogo diminuindo ou parando de jogar? Quantas vezes? Você teve sucesso ao tentar diminuir ou para de jogar?', 
        'Como você se sentiu quando tentou diminuir ou parar de jogar? Em algum momento você ficou inquieto, ansioso ou irritado?',
        'Além de querer ganhar, existiam outras razões para jogar? Você já jogou para escapar de seus problemas ou para aliviar sensações desconfortáveis como desamparo, culpa, tristeza ansiedade, ou depressão?',
        'Quando você perdia dinheiro jogando, você tentava “correr atrás” das suas perdas? Ou seja, depois de um dia de azar, você volta a jogar para tentar recuperar as suas perdas?',
        'Você mentia com frequência para encobrir seu comportamento de jogo, como, por exemplo, mentir sobre quanto tempo você passou jogando ou quanto dinheiro você perdeu?', 
        'Você já cometeu algum ato ilegal para conseguir dinheiro para jogar ou para pagar dívidas de jogo? Coisas como passar cheques sem fundo, falsificar a assinatura ou pegar dinheiro de outra pessoa?', 
        'Quanto o seu comportamento de jogo afetou a sua vida? Você já perdeu algum emprego ou foi mal na escola por causa disso? Você já se pôs em perigo ou perdeu um relacionamento sério por causa disso?', 
        'Você já teve que pedir dinheiro emprestado a outras pessoas para saldar dívidas de jogo? Você já fez empréstimos para resolver uma dívida financeira causada ou agravada pelo jogo?', 
        'Você jogava apenas quando estava se sentindo agitado/eufórico ou irritável?', 
        'Você apresentou esses problemas relacionados às apostas durante o mês passado?', 
        'Como você classificaria a gravidade do Transtorno do Jogo desse paciente?', 
        'Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?',
        'Quando você realizou sua última aposta, pensou em ou teve desejo de apostar?', 
        'Quantos anos você tinha quando começou a apostar regularmente (pelo menos 1 vez por mês)?');
    `);
  }
};
