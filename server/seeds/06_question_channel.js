exports.seed = await = (knex) => {
  return knex('question_channel').del()
    .then(function () {
      return knex('question_channel').insert([
        {
          question_id: '1',
          channel_id: 'kauppikseen1234'
        },
        {
          question_id: '2',
          channel_id: 'kauppikseen1234'
        },
        {
          question_id: '3',
          channel_id: 'kauppikseen1234'
        },
        {
          question_id: '4',
          channel_id: 'kauppikseen1234'
        },
        {
          question_id: '5',
          channel_id: 'DIA20221234'
        }
      ])
    })
}