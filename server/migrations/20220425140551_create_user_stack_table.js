exports.up = function(knex) {
  return knex.schema.createTable('user_stack', table => {
    table.increments('id').primary();
    table.text('user_id').notNullable();
    table.text('stack_id').notNullable();
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade')
    
    table.foreign('stack_id')
      .references('id')
      .inTable('stacks')
      .onDelete('cascade')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_stack')
}