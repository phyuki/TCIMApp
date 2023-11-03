'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
      VALUES
        ('K115A','Uso Indevido de Internet','Quanto tempo por dia você gasta acessando a Internet?', NOW(), NOW()),
        ('K115B','Uso Indevido de Internet','Alguma vez você sentiu que seu uso da Internet estava fora de controle?', NOW(), NOW()),
        ('K115C','Uso Indevido de Internet','O seu uso da Internet alguma vez lhe causou problemas?', NOW(), NOW()),
        ('K115D','Uso Indevido de Internet','Alguém alguma vez reclamou sobre o tempo que você gasta usando a Internet?', NOW(), NOW()),
        ('K116','Uso Indevido de Internet','Jogos online', NOW(), NOW()),
        ('K117','Uso Indevido de Internet','Páginas de informação', NOW(), NOW()),
        ('K118','Uso Indevido de Internet','Páginas de busca (ex., Google)', NOW(), NOW()),
        ('K119','Uso Indevido de Internet','E-mail', NOW(), NOW()),
        ('K120','Uso Indevido de Internet','WhatsApp ou outro serviços de mensagem instantânea', NOW(), NOW()),
        ('K121','Uso Indevido de Internet','Salas de bate papo (chat)', NOW(), NOW()),
        ('K121A','Uso Indevido de Internet','Facebook', NOW(), NOW()),
        ('K121B','Uso Indevido de Internet','Instagram', NOW(), NOW()),
        ('K121C','Uso Indevido de Internet','Twitter', NOW(), NOW()),
        ('K121D','Uso Indevido de Internet','Snapchat', NOW(), NOW()),
        ('K121E','Uso Indevido de Internet','Outras redes sociais', NOW(), NOW()),
        ('K121F','Uso Indevido de Internet','Tinder ou outros aplicativos para encontros', NOW(), NOW()),
        ('K121G','Uso Indevido de Internet','Youtube e vídeos em geral', NOW(), NOW()),
        ('K121H','Uso Indevido de Internet','Sites com conteúdo sexual', NOW(), NOW()),
        ('K122','Uso Indevido de Internet','Outros sites, serviços, aplicativos, etc.', NOW(), NOW()),
        ('K124','Uso Indevido de Internet','Você já teve dificuldade em controlar seu uso da Internet? Você já percebeu que quando utiliza a Internet você acaba permanecendo por períodos de tempo maiores do que você planejava?', NOW(), NOW()),
        ('K125','Uso Indevido de Internet','Você tentou, mais de uma vez, controlar seu uso da Internet, diminuindo ou parando de usar? Você foi bem-sucedido? Em caso afirmativo, foi por esforço próprio, ou você estava temporariamente sem acesso?', NOW(), NOW()),
        ('K126','Uso Indevido de Internet','Você ficou inquieto ou irritado quando tentou reduzir ou parar de usar a Internet? Ou, houve momentos em você ficou sem teve acesso à Internet? Se sim, você se sentiu inquieto ou irritado porque estava sem acesso?', NOW(), NOW()),
        ('K127a','Uso Indevido de Internet','Precisou aumentar o período de tempo gasto na Internet para obter a mesma sensação?', NOW(), NOW()),
        ('K127b','Uso Indevido de Internet','A satisfação que você experimentava quando usava a Internet diminuiu com o passar do tempo?', NOW(), NOW()),
        ('K128','Uso Indevido de Internet','Você costumava pensar muito sobre o uso da Internet, imagina, ou planeja o próximo acesso? Com que frequência?', NOW(), NOW()),
        ('K129A','Uso Indevido de Internet','Incontrolável?', NOW(), NOW()),
        ('K129B','Uso Indevido de Internet','Intrusivos, isto é invade a sua cabeça de repente?', NOW(), NOW()),
        ('K129C','Uso Indevido de Internet','Sem sentido?', NOW(), NOW()),
        ('K130a','Uso Indevido de Internet','Você sentia uma tensão ou excitação aparecendo antes de acessar a Internet?', NOW(), NOW()),
        ('K130b','Uso Indevido de Internet','Você se sentia ansioso, deprimido, ou tinha sentimentos ou sensações desagradáveis antes de acessar a Internet?', NOW(), NOW()),
        ('K131','Uso Indevido de Internet','Você sentia uma sensação de prazer, satisfação, ou alívio durante o uso da Internet ou após completar um acesso?', NOW(), NOW()),
        ('K132','Uso Indevido de Internet','Você costumava usar a Internet como uma forma de fugir dos problemas difíceis da vida ou para aliviar sentimentos desconfortáveis como se sentir desamparado, ansioso, culpado, ou deprimido?', NOW(), NOW()),
        ('K133','Uso Indevido de Internet','Você costumava acessar a Internet quando deveria estar trabalhando ou estudando ou passando seu tempo em hobbies ou com a família ou amigos?', NOW(), NOW()),
        ('K134','Uso Indevido de Internet','Você se sentiu culpado ou com remorso sobre sua forma de usar a Internet? SE SIM: ainda assim, você ainda usava de forma exagerada?', NOW(), NOW()),
        ('K135','Uso Indevido de Internet','Você já mentiu para alguém sobre o seu uso da Internet para esconder quanto tempo você passa conectado, ou disfarçar o quanto isso interfere na sua vida?', NOW(), NOW()),
        ('K136a','Uso Indevido de Internet','Prejudicar suas amizades ou relacionamento com colegas do trabalho?', NOW(), NOW()),
        ('K136b','Uso Indevido de Internet','Prejudicar seu relacionamento com a família?', NOW(), NOW()),
        ('K136c','Uso Indevido de Internet','Prejudicar um relacionamento amoroso, ou a relação com sua/seu parceira(o)?', NOW(), NOW()),
        ('K136d','Uso Indevido de Internet','Comprometer o seu emprego, ou uma oportunidade de estudos?', NOW(), NOW()),
        ('K136e','Uso Indevido de Internet','Já interferiu no seu trabalho, ou estudos?', NOW(), NOW()),
        ('K137','Uso Indevido de Internet','O fato de você não conseguir controlar o uso da Internet lhe preocupava ou aborrecia?', NOW(), NOW()),
        ('K138','Uso Indevido de Internet','Você costumava desligar-se ou perder a noção de tempo quando usava a Internet? Sentia como se estivesse no “piloto automático”?', NOW(), NOW()),
        ('K139','Uso Indevido de Internet','Você perdeu o controle da Internet somente quando está se sentindo agitado, eufórico ou irritável?', NOW(), NOW()),
        ('K140A','Uso Indevido de Internet','Sites de aposta?', NOW(), NOW()),
        ('K140B','Uso Indevido de Internet','Sites de compras?', NOW(), NOW()),
        ('K140C','Uso Indevido de Internet','Sites de sexo ou pornografia?', NOW(), NOW()),
        ('K141','Uso Indevido de Internet','Quanta dificuldade o uso excessivo da Internet tem causado para você trabalhar, cuidar da casa ou relacionar-se com outras pessoas?', NOW(), NOW()),
        ('K142','Uso Indevido de Internet','Durante o último mês você teve problemas com uso excessivo da Internet?', NOW(), NOW()),
        ('K143','Uso Indevido de Internet','Como você classificaria a gravidade do Transtorno de Uso Indevido de Internet desse paciente?', NOW(), NOW()),
        ('K144','Uso Indevido de Internet','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
        ('K145','Uso Indevido de Internet','Quando foi o seu último episódio de uso excessivo da Internet?', NOW(), NOW()),
        ('K145X','Uso Indevido de Internet','Quantos anos você tinha quando começou a usar excessivamente a Internet a ponto de causar problemas para você ou para sua família?', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE disorder = 'Uso Indevido de Internet'
    `)
  }
};
