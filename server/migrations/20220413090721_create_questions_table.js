exports.up = function(knex) {
  return knex.schema.createTable('questions', table => {
    table.text('id').primary();
    table.text('question')
    table.text('type')
    table.text('created_by_id')
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.index('question');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('questions');
};