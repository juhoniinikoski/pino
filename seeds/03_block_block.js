exports.seed = await = (knex) => {
  return knex('block_block').del()
    .then(function () {
      return knex('block_block').insert([
        {
          parent_id: 'index1',
          block_id: 'index3'
        },
        {
          parent_id: 'index3',
          block_id: 'index4'
        },
        {
          parent_id: 'index2',
          block_id: 'index5'
        },
        {
          parent_id: 'index5',
          block_id: 'index6'
        },
        {
          parent_id: 'index5',
          block_id: 'index7'
        },
      ])
    })
}