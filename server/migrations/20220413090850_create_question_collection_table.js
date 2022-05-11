exports.up = function(knex) {
  return knex.schema.createTable('question_collection', table => {
    table.increments('id').primary();
    table.text('question_id').notNullable();
    table.text('collection_id').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.foreign('question_id')
      .references('id')
      .inTable('questions')
      .onDelete('cascade')
    
    table.foreign('collection_id')
      .references('id')
      .inTable('collections')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('question_collection')
}