exports.up = function(knex) {
  return knex.schema.createTable('stack_channel', table => {
    table.increments('id').primary();
    table.text('stack_id').notNullable();
    table.text('channel_id').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.foreign('stack_id')
      .references('id')
      .inTable('stacks')
      .onDelete('cascade')
    
    table.foreign('channel_id')
      .references('id')
      .inTable('channels')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('stack_channel')
}