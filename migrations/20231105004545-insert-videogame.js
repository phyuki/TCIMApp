'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
    VALUES
      ('K163','Videogame','Você alguma vez já jogou videogame OU jogou no computador, ou celular? SE SIM: Houve algum momento de sua vida em que você jogou videogame com frequência, mais do que seis vezes em um ano?', NOW(), NOW()),
      ('K163A','Videogame','Quantos anos você tinha quando esta fase começou?', NOW(), NOW()),
      ('K163B','Videogame','Quantos anos você tinha quando esta fase terminou? OU, você diria que o momento atual é a fase em que você mais jogou na sua vida?', NOW(), NOW()),
      ('K163C','Videogame','Quantos meses esta fase durou, ou está durando?', NOW(), NOW()),
      ('K163D','Videogame','Quanto tempo por dia você gasta jogando videogame OU jogo de celular?', NOW(), NOW()),
      ('K163E','Videogame','Você joga videogame OU jogo de celular com que frequência?', NOW(), NOW()),
      ('K163Ea','Videogame','Quantos jogos diferentes você vem praticando de forma regular (ao menos duas vezes por mês) ultimamente?', NOW(), NOW()),
      ('K163F1','Videogame','Primeiro jogo mais preferido', NOW(), NOW()),
      ('K163F2','Videogame','Primeiro jogo mais preferido (classificação)', NOW(), NOW()),
      ('K163G1','Videogame','Segundo jogo mais preferido', NOW(), NOW()),
      ('K163G2','Videogame','Segundo jogo mais preferido (classificação)', NOW(), NOW()),
      ('K163H1','Videogame','Terceiro jogo mais preferido', NOW(), NOW()),
      ('K163H2','Videogame','Terceiro jogo mais preferido (classificação)', NOW(), NOW()),
      ('K163Ia','Videogame','Alguma vez você sentiu que seu uso do videogame estava fora de controle?', NOW(), NOW()),
      ('K163Ib','Videogame','O seu uso do videogame alguma vez lhe causou problemas?', NOW(), NOW()),
      ('K163Ic','Videogame','Alguém alguma vez reclamou sobre o tempo que você gasta jogando videogame?', NOW(), NOW()),
      ('K164','Videogame','Videogame em casa (Nintendo, Play-station, Xbox, etc.)', NOW(), NOW()),
      ('K165','Videogame','Casas de videogame (fliperama)', NOW(), NOW()),
      ('K166','Videogame','Lan-House', NOW(), NOW()),
      ('K167','Videogame','Games online do computador da sua casa', NOW(), NOW()),
      ('K168','Videogame','Games offline do computador da sua casa', NOW(), NOW()),
      ('K168a','Videogame','Tablet, IPad, ou similar', NOW(), NOW()),
      ('K168b','Videogame','Celular', NOW(), NOW()),
      ('K169','Videogame','Outro', NOW(), NOW()),
      ('K172','Videogame','Você teve dificuldade em controlar seu uso do videogame? Você costumava perceber que quando utilizava o videogame você acabava permanecendo por períodos de tempo maiores do que você planejava?', NOW(), NOW()),
      ('K173','Videogame','Você tentou controlar seu uso do videogame, diminuindo ou parando de usar? Quantas vezes? Você diria que não foi bem-sucedido na maior parte das vezes, ou teve muita dificuldade?', NOW(), NOW()),
      ('K174','Videogame','Você ficou inquieto ou irritado quando tentou reduzir ou parar, ou quando teve que reduzir ou parar o uso do videogame?', NOW(), NOW()),
      ('K175a','Videogame','Precisou aumentar o período de tempo jogando videogame para obter a mesma sensação?', NOW(), NOW()),
      ('K175b','Videogame','A satisfação que você experimentava quando jogava videogame diminuiu com o passar do tempo?', NOW(), NOW()),
      ('K176','Videogame','Você pensava em videogame com frequência? Você ficava pensando na última partida ou costuma planejar a próxima oportunidade de jogar videogame?', NOW(), NOW()),
      ('K177A','Videogame','Incontroláveis?', NOW(), NOW()),
      ('K177B','Videogame','Intrusivos, isto é invadem a sua consciência de repente?', NOW(), NOW()),
      ('K177C','Videogame','Sem sentido?', NOW(), NOW()),
      ('K178a','Videogame','Você sentia uma tensão ou excitação aparecendo pouco antes de começar a jogar videogame?', NOW(), NOW()),
      ('K178b','Videogame','Você se sentia ansioso, deprimido, ou tinha sentimentos ou sensações desagradáveis antes de começar a jogar videogame?', NOW(), NOW()),
      ('K179','Videogame','Você sente ou sentia uma sensação de prazer, satisfação, ou alívio durante o uso do videogame ou assim que começa a jogar?', NOW(), NOW()),
      ('K180','Videogame','Você costumava usar o videogame como uma forma de fugir dos problemas difíceis da vida ou para aliviar sentimentos desconfortáveis como se sentir desamparado, ansioso, culpado, ou deprimido?', NOW(), NOW()),
      ('K181','Videogame','Você costumava acessar o videogame quando deveria estar trabalhando ou estudando ou passando seu tempo em hobbies ou com a família ou amigos?', NOW(), NOW()),
      ('K182','Videogame','Você chegou a perceber se o videogame estava lhe prejudicando e mesmo assim, você continuou jogando?', NOW(), NOW()),
      ('K183','Videogame','Você mente ou mentia sobre o seu uso do videogame para que as pessoas não saibam quanto tempo você passa jogando?', NOW(), NOW()),
      ('K184','Videogame','Seu uso do videogame causou problemas sérios para você com seus familiares ou amigos, esposo (a) ou parceiro (a), no trabalho, ou na escola? Você já perdeu um relacionamento importante ou amizade por causa disto? E quanto a perder o emprego ou uma oportunidade de trabalho?', NOW(), NOW()),
      ('K185','Videogame','O fato de você não conseguir controlar o uso do videogame lhe aborrece?', NOW(), NOW()),
      ('K186','Videogame','Você costuma desligar-se ou perder a noção de tempo quando joga videogame? Você se sente como se estivesse no “piloto automático” enquanto usa o videogame, de tal forma que você não percebe o que está fazendo?', NOW(), NOW()),
      ('K187','Videogame','Você jogava apenas quando estava se sentindo agitado/eufórico ou irritável?', NOW(), NOW()),
      ('K189','Videogame','Quanta dificuldade o uso excessivo do videogame tem causado para você trabalhar, cuidar da casa ou relacionar-se com outras pessoas?', NOW(), NOW()),
      ('K190','Videogame','Durante o último mês, você teve problemas com uso excessivo do videogame?', NOW(), NOW()),
      ('K191','Videogame','Como você classificaria a gravidade do Transtorno do Videogame desse paciente?', NOW(), NOW()),
      ('K192','Videogame','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
      ('K193','Videogame','Quando foi a última vez que você teve dificuldades com o videogame?', NOW(), NOW()),
      ('K193X','Videogame','Quantos anos você tinha quando começou a ter problemas com videogame pela primeira vez?', NOW(), NOW());
  `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE disorder = 'Videogame'
    `)
  }
};
