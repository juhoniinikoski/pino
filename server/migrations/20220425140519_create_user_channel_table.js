exports.up = function(knex) {
  return knex.schema.createTable('user_channel', table => {
    table.increments('id').primary();
    table.text('user_id').notNullable();
    table.text('channel_id').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
    
    table.foreign('channel_id')
      .references('id')
      .inTable('channels')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_channel')
}