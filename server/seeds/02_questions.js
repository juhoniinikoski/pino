const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createColumns = (id, question, createdBy) => ({
  id: id,
  created_by_id: createdBy,
  publish: true,
  type: 'multi',
  question: question,
})

exports.seed = async knex => {
  await knex('questions').del();

  await knex('questions').insert([
    {
      ...createColumns('1', 'Mikä seuraavista väittämistä ei pidä paikkaansa?', 'bbe42984-051b-4a01-b45d-b8d29c32200c'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('2', 'Mikä seuraavista väittämistä pitää paikkansa?', 'bbe42984-051b-4a01-b45d-b8d29c32200c'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('3', 'Mikä seuraavista väittämistä pitää paikkansa?', 'bbe42984-051b-4a01-b45d-b8d29c32200c'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('4', 'Verohallinnon vuonna 2020 keräämien verojen nettokertymät olivat yhteensä 69 217 miljoonaa euroa, joka oli 1 141 miljoonaa euroa (-1,6 %) vähemmän kuin vuonna 2019, mutta enemmän kuin sitä edeltävinä vuosina. Vuonna 2020 kerätyistä veroista 59,5 prosenttia tilitettiin valtiolle ja 34,6 prosenttia kunnille. Muita veronsaajia ovat lisäksi seurakunnat 1,3 prosentin ja Kela 4,6 prosentin osuuksilla. (Lähde: vero.fi)\n\nMikä seuraavista väittämistä pitää paikkaansa?', '9b9d927e-2ee9-4f93-b96b-c8f677c63a5f'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('5', 'Mikä seuraavista tilanteista on esimerkki siitä, että asiakas osallistuu tuotteen luomiseen yhdessä tuottajan/myyjän kanssa?', '9b9d927e-2ee9-4f93-b96b-c8f677c63a5f'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
  ]);
};