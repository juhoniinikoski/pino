exports.up = function(knex) {
  return knex.schema.createTable('stacks', table => {
    table.text('id').primary();
    table.text('name')
    table.boolean('public')
    table.text('created_by_id')
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.index('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('stacks');
};