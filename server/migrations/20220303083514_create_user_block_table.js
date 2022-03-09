exports.up = function(knex) {
  return knex.schema.createTable('user_block', table => {
    table.increments('id').primary()
    table.text('user_id').notNullable()
    table.text('block_id').notNullable()

    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
    
    table.foreign('block_id')
      .references('id')
      .inTable('blocks')
      .onDelete('cascade')

    table.index(['user_id', 'block_id'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('block_block')
}