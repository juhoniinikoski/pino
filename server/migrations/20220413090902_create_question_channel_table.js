exports.up = function(knex) {
  return knex.schema.createTable('question_channel', table => {
    table.increments('id').primary()
    table.text('question_id').notNullable()
    table.text('channel_id').notNullable()

    table.foreign('question_id')
      .references('id')
      .inTable('questions')
      .onDelete('cascade')
    
    table.foreign('channel_id')
      .references('id')
      .inTable('channels')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('question_channel')
}