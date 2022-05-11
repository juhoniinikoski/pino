exports.up = function(knex) {
  return knex.schema.createTable('user_collection', table => {
    table.increments('id').primary();
    table.text('user_id').notNullable();
    table.text('collection_id').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
    
    table.foreign('collection_id')
      .references('id')
      .inTable('collections')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_collection')
}