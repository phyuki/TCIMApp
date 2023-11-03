'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      INSERT INTO scidquestions (cod, disorder, question, createdAt, updatedAt)
      VALUES
        ('K85A','Hipersexualidade','Você já sentiu alguma vez que seu comportamento sexual era compulsivo ou excessivo?', NOW(), NOW()),
        ('K85B','Hipersexualidade','Alguma vez o seu comportamento sexual lhe causou problemas?', NOW(), NOW()),
        ('K85C','Hipersexualidade','Alguma vez você sentiu que seu comportamento sexual estava fora de controle?', NOW(), NOW()),
        ('K85D','Hipersexualidade','Alguma vez os seus problemas sexuais o fizeram se sentir incomodado ou causaram problemas nos seus relacionamentos?', NOW(), NOW()),
        ('K85E','Hipersexualidade','Alguma vez alguém criticou o seu comportamento sexual?', NOW(), NOW()),
        ('K85a','Hipersexualidade','Qual o período da sua vida em que sua atividade sexual foi mais intensa? Quando começou esse período?', NOW(), NOW()),
        ('K85b','Hipersexualidade','Quando terminou esse período? Você diria que o período atual é o período de maior atividade sexual da sua vida?', NOW(), NOW()),
        ('K86','Hipersexualidade','Pornografia', NOW(), NOW()),
        ('K87','Hipersexualidade','Masturbação', NOW(), NOW()),
        ('K88','Hipersexualidade','Relações casuais', NOW(), NOW()),
        ('K89','Hipersexualidade','Múltiplos parceiros (em um curto espaço de tempo ou ao mesmo tempo)', NOW(), NOW()),
        ('K90','Hipersexualidade','Prostitutas (ou qualquer outra forma de sexo pago)', NOW(), NOW()),
        ('K91','Hipersexualidade','Clubes de strip', NOW(), NOW()),
        ('K92','Hipersexualidade','Sexo virtual pela Internet', NOW(), NOW()),
        ('K93','Hipersexualidade','Sexo por telefone', NOW(), NOW()),
        ('K94','Hipersexualidade','Outro', NOW(), NOW()),
        ('K95','Hipersexualidade','Você já teve dificuldade de controlar seu comportamento sexual? Você percebeu, com frequência, que acabava gastando mais tempo com isso do que tinha planejado, seja buscando ou se envolvendo com sexo?', NOW(), NOW()),
        ('K96','Hipersexualidade','Você já tentou reduzir ou controlar a frequência das fantasias, dos impulsos e dos comportamentos sexuais, mas sem muito sucesso?', NOW(), NOW()),
        ('K97','Hipersexualidade','Quando você tentou reduzir, você ficou inquieto ou irritado quando diminuiu ou parou os comportamentos sexual problemático?', NOW(), NOW()),
        ('K98','Hipersexualidade','Com o passar do tempo, houve necessidade de aumentar o tempo gasto com este comportamento sexual para obter os mesmos sentimentos que você tinha quando começou a praticá-lo?', NOW(), NOW()),
        ('K99','Hipersexualidade','Você pensava ou fantasiava com frequência sobre sexo? Você imaginava ou planejava as futuras oportunidades de se envolver no em sexo, ou fica pensando em sexo ao invés de se concentrar no que deveria estar fazendo, como trabalho ou estudo?', NOW(), NOW()),
        ('K100A','Hipersexualidade','Incontroláveis?', NOW(), NOW()),
        ('K100B','Hipersexualidade','Intrusivos, isto é invadem a sua consciência de repente?', NOW(), NOW()),
        ('K100C','Hipersexualidade','Sem sentido?', NOW(), NOW()),
        ('K101','Hipersexualidade','Você continuou realizando esses comportamentos sexuais de risco, mesmo que eles pudessem ou já tivessem causado lesões, doenças ou danos emocionais a você, aos seus (suas) parceiros(as) ou a alguém com quem tenha relacionamento significativo?', NOW(), NOW()),
        ('K102','Hipersexualidade','Você já fez uso de fantasias sexuais e comportamentos sexuais para lidar com sentimentos difíceis (por exemplo, preocupação, tristeza, tédio, frustração, culpa ou vergonha)?', NOW(), NOW()),
        ('K103','Hipersexualidade','Você dedicou grande parte do seu tempo a fantasias e impulsos sexuais, bem como a planejar ou praticar comportamentos sexuais?', NOW(), NOW()),
        ('K104','Hipersexualidade','Você sente culpa ou remorso sobre a forma como você se comporta, ou se comportava, sexualmente? SE SIM: Você manteve este comportamento mesmo assim?', NOW(), NOW()),
        ('K105','Hipersexualidade','Você já mentiu para alguém sobre o seu comportamento sexual? SE SIM: Conte-me sobre isso. Para quem você mentiu?', NOW(), NOW()),
        ('K106','Hipersexualidade','O comportamento sexual já causou problemas sérios para você com seu trabalho ou estudo? Ou com namorada(o), parceira(a), ou amigos?', NOW(), NOW()),
        ('K10@','Hipersexualidade','Você já fez uso de fantasias sexuais e comportamentos sexuais para evitar, adiar ou lidar com estresses e outros problemas difíceis ou responsabilidades em sua vida?', NOW(), NOW()),
        ('K107a-1','Hipersexualidade','Fizeram com que você se sentisse muito incomodado ou desgostoso com você mesmo (por exemplo, sentindo vergonha, culpa, tristeza, preocupação ou repugnância)?', NOW(), NOW()),
        ('K107a-2','Hipersexualidade','Você procurou ocultar a extensão do seu envolvimento com essas atividades?', NOW(), NOW()),
        ('K107b-1','Hipersexualidade','Lhe causaram problemas significativos na sua vida pessoal?', NOW(), NOW()),
        ('K107b-2','Hipersexualidade','Lhe causaram problemas significativos no seu convívio social?', NOW(), NOW()),
        ('K107b-3','Hipersexualidade','Lhe causaram problemas significativos no seu trabalho?', NOW(), NOW()),
        ('K107b-4','Hipersexualidade','Lhe causaram problemas significativos em outras áreas da sua vida?', NOW(), NOW()),
        ('K107b-5','Hipersexualidade','Que tipo de problema?', NOW(), NOW()),
        ('K108','Hipersexualidade','Você perdeu o controle sobre seu comportamento sexual apenas quando estava se sentindo agitado/eufórico ou irritável?', NOW(), NOW()),
        ('K109','Hipersexualidade','Você perdeu o controle sobre seu comportamento sexual apenas quando sob efeito de droga, medicamento, ou outra substância?', NOW(), NOW()),
        ('K110','Hipersexualidade','Quanta dificuldade o seu comportamento sexual gerou para você realizar seus trabalhos, tarefas de casa, ou estar junto com outras pessoas?', NOW(), NOW()),
        ('K111','Hipersexualidade','Durante o último mês, você teve problemas com seu comportamento sexual?', NOW(), NOW()),
        ('K112','Hipersexualidade','Como você classificaria a gravidade do Transtorno de Hipersexualidade desse paciente?', NOW(), NOW()),
        ('K113','Hipersexualidade','Se os critérios atuais não estiverem totalmente presentes, como você classificaria o status atual do paciente?', NOW(), NOW()),
        ('K114','Hipersexualidade','Quanto tempo faz desde a última vez que você perdeu o controle do seu comportamento sexual?', NOW(), NOW()),
        ('K114X','Hipersexualidade','Quantos anos você tinha quando notou pela primeira vez que seu comportamento sexual estava fora de controle?', NOW(), NOW());
    `);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DELETE FROM scidquestions WHERE disorder = 'Hipersexualidade'
    `)
  }
};
