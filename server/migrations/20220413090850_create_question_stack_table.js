exports.up = function(knex) {
  return knex.schema.createTable('question_stack', table => {
    table.increments('id').primary()
    table.text('question_id').notNullable()
    table.text('stack_id').notNullable()

    table.foreign('question_id')
      .references('id')
      .inTable('questions')
      .onDelete('cascade')
    
    table.foreign('stack_id')
      .references('id')
      .inTable('stacks')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('question_stack')
}