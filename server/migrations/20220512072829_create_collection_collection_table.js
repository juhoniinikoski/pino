exports.up = function(knex) {
  return knex.schema.createTable('collection_collection', table => {
    table.increments('id').primary();
    table.text('collection_id').notNullable();
    table.text('tag_id').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.foreign('tag_id')
      .references('id')
      .inTable('collections')
      .onDelete('cascade')
    
    table.foreign('collection_id')
      .references('id')
      .inTable('collections')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('collection_collection')
}