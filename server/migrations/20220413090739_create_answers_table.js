exports.up = function(knex) {
  return knex.schema.createTable('answers', table => {
    table.text('id').primary();
    table.text('answer')
    table.text('question_id');
    table.boolean('correct')
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.foreign('question_id')
      .references('id')
      .inTable('questions')
      .onDelete('cascade')

    table.index('answer');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('answers');
};