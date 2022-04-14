exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.text('id').primary();
    table.text('email').unique();
    table.text('password');
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.index('email');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};