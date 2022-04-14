exports.up = function(knex) {
  return knex.schema.createTable('sessions', table => {
    table.text('id').primary();
    table.integer('correct');
    table.integer('total');
    table.text('statistics_id')
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.index('statistics_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sessions');
};