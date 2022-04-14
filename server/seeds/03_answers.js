const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createColumns = (id, answer, correct, questionId) => ({
  id: id,
  question_id: questionId,
  correct: correct,
  answer: answer,
})

exports.seed = async knex => {
  await knex('answers').del();

  await knex('answers').insert([
    {
      ...createColumns('1', 'Talouspolitiikalla pyritään edistämään työllisyyttä ja talouskasvua. Yksitalouspolitiikan osa-alue on tulopolitiikka, mistä esimerkkinä on työmarkkinajärjestöjen palkkaneuvottelut.', false, '1'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('2', 'Laskusuhdanteessa työttömyyskorvausten ja muiden tulonsiirtojen määrä lisääntyy tyypillisesti. Nämä toimivat osaltaan Suomen valtion harjoittaman rahapolitiikan niin sanottuina automaattisina vakauttajina.', true, '1'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('3', 'Finanssipolitiikalla tarkoitetaan julkisen vallan tulojen ja menojen säätelyä. Valtion talousarvio on siten keskeisessä asemassa finanssipolitiikassa.', false, '1'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('4', 'Rooman imperiumi ylsi laajimmillaan pohjoisessa Itämerelle ja etelässä Egyptiin. Etelässä Rooman imperiumin vaikutusalueeseen kuului lähes koko Pohjois-Afrikan rannikko.', false, '2'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('5', 'Kreikan valtakausi Välimeren alueen suurvaltana alkoi Rooman imperiumin luhistuttua. Kreikkalaiset laajensivat vaikutusaluettaan huomattavasti kauemmas itään, jopa Intiaan saakka.', false, '2'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('6', 'Jokilaaksojen korkeakulttuureissa kehittyi monia nykyisinkin käytössä olevia keksintöjä. Näitä olivat esimerkiksi pyörä ja aura. Myös nykyisen kaltainen ajanlasku kehittyi silloin.', true, '2'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('7', 'Eri maiden tuotantoon liittyvä työnjako hämärtyi globalisaation myötä 1800-luvulla.', false, '3'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('8', '1800-luvun lopun tavarakauppaa vauhditti kuljetuskustannusten aleneminen ja kuljetusmahdollisuuksien monipuolistuminen.', true, '3'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('9', 'Globalisaatio ilmenee nykyisin edelleen saman toimialan yritysten maailmanlaajuisena kilpailuna, missä työntekijät jäävät pääasiassa kansainvälisen keskinäisen kilpailun ulkopuolelle.', false, '3'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('10', 'Kiinteistöveroa peritään, kun kiinteistö vaihtaa omistajaa. Kiinteistövero tilitetään kiinteistön sijaintikunnalle.', false, '4'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('11', 'Henkilöiden tuloverotus on verokertymän kannalta merkittävä. Se tilitetään valtiolle, kunnille ja seurakunnille.', true, '4'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('12', 'Esimerkiksi asunto- ja kiinteistökauppojen yhteydessä perittävä varallisuusvero muodostaa osan valtiolle tilitettävistä veroista.', false, '4'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('13', 'Asiakas ostaa kaupasta tietyn ruokalajin ainekset ja valmistaa aterian kotonaan.', false, '5'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('14', 'Asiakas lataa sähköauton myyjän latausasemalla.', false, '5'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('15', 'Asiakas valitsee kangaslaadun ja värin sohvalle, joka tilataan kotiin.', true, '5'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
  ]);
};