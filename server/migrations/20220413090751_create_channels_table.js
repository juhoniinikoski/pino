exports.up = function(knex) {
  return knex.schema.createTable('channels', table => {
    table.text('id').primary();
    table.text('name')
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.index('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('channels');
};