exports.up = function(knex) {
  return knex.schema.createTable('block_block', table => {
    table.increments('id').primary()
    table.text('parent_id').notNullable()
    table.text('block_id').notNullable()

    table.foreign('parent_id')
      .references('id')
      .inTable('blocks')
      .onDelete('cascade')
    
    table.foreign('block_id')
      .references('id')
      .inTable('blocks')
      .onDelete('cascade')

    table.index(['parent_id', 'block_id'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('block_block')
}