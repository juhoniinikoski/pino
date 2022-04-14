exports.up = function(knex) {
  return knex.schema.createTable('statistics', table => {
    table.text('id').primary();
    table.text('stack_id')
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.index('stack_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('statistics');
};