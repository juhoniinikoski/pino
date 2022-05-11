exports.seed = await = (knex) => {
  return knex('question_collection').del()
    .then(function () {
      return knex('question_collection').insert([
        {
          question_id: '1',
          collection_id: 'kauppikseen1234channel'
        },
        {
          question_id: '2',
          collection_id: 'kauppikseen1234channel'
        },
        {
          question_id: '3',
          collection_id: 'kauppikseen1234channel'
        },
        {
          question_id: '4',
          collection_id: 'kauppikseen1234channel'
        },
        {
          question_id: '5',
          collection_id: 'DIA20221234channel'
        },
        {
          question_id: '1',
          collection_id: 'kauppis-yh1234stack'
        },
        {
          question_id: '2',
          collection_id: 'kauppis-yh1234stack'
        },
        {
          question_id: '3',
          collection_id: 'yofysiikka1234stack'
        },
        {
          question_id: '4',
          collection_id: 'yofysiikka1234stack'
        },
        {
          question_id: '5',
          collection_id: 'kauppis-yh1234stack'
        }
      ])
    })
}