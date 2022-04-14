exports.seed = await = (knex) => {
  return knex('question_stack').del()
    .then(function () {
      return knex('question_stack').insert([
        {
          question_id: '1',
          stack_id: 'kauppis-yh1234'
        },
        {
          question_id: '2',
          stack_id: 'kauppis-yh1234'
        },
        {
          question_id: '3',
          stack_id: 'kauppis-yh1234'
        },
        {
          question_id: '3',
          stack_id: 'kauppis-yh1234'
        },
        {
          question_id: '5',
          stack_id: 'kauppis-yh1234'
        }
      ])
    })
}