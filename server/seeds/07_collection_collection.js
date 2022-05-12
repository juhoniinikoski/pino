
const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

exports.seed = await = (knex) => {
  return knex('collection_collection').del()
    .then(function () {
      return knex('collection_collection').insert([
        {
          collection_id: 'kauppis-yh1234stack',
          tag_id: 'kauppikseen1234channel',
          ...createDateColumns(new Date(Date.now() - oneHour)),
        },
        {
          collection_id: 'DIA20221234stack',
          tag_id: 'DIA20221234channel',
          ...createDateColumns(new Date(Date.now() - 48)),
        }
      ])
    })
}