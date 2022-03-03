const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createColumns = (type, title, createdBy, id) => ({
  id: id,
  title: title,
  created_by_id: createdBy,
  type: type
})

exports.seed = async knex => {
  await knex('blocks').del();

  await knex('blocks').insert([
    {
      ...createColumns('collection', 'yofysiikka', 'bbe42984-051b-4a01-b45d-b8d29c32200c', 'index1'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('collection', 'diffis1', 'bbe42984-051b-4a01-b45d-b8d29c32200c', 'index2'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('open', 'mitä tarkoitetaan keskipakoisvoimalla', 'bbe42984-051b-4a01-b45d-b8d29c32200c', 'index3'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('answer', 'Keskipakoisvoima eli keskipakovoima on näennäisvoima, joka vaikuttaa vetävän esimerkiksi ympyräliikettä tekevää kappaletta kauemmaksi liikkeen keskipisteestä.', 'bbe42984-051b-4a01-b45d-b8d29c32200c', 'index4'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('multi', 'mihin käytetään epsilon delta todistusta', 'bbe42984-051b-4a01-b45d-b8d29c32200c', 'index5'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('answer', 'funktion raja-arvon laskemiseen', 'bbe42984-051b-4a01-b45d-b8d29c32200c', 'index6'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('answer', 'funktion maksimikohdan laskemiseen', 'bbe42984-051b-4a01-b45d-b8d29c32200c', 'index7'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('collection', 'Toisen tekijän collection', '9b9d927e-2ee9-4f93-b96b-c8f677c63a5f', 'index8'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
  ]);
};