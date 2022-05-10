
const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

exports.seed = await = (knex) => {
  return knex('user_channel').del()
    .then(function () {
      return knex('user_channel').insert([
        {
          user_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
          channel_id: 'kauppikseen1234',
          ...createDateColumns(new Date(Date.now() - oneHour)),
        },
        {
          user_id: 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2',
          channel_id: 'kauppikseen1234',
          ...createDateColumns(new Date(Date.now() - oneHour * 7)),
        },
        {
          user_id: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
          channel_id: 'DIA20221234',
          ...createDateColumns(new Date(Date.now() - 48)),
        }
      ])
    })
}