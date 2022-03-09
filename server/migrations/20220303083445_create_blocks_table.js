exports.up = function(knex) {
  return knex.schema.createTable('blocks', table => {
    table.text('id').primary()
    table
      .text('created_by_id')
      .references('users.id')
      .onDelete('cascade');
    table.text('title')
    table.text('type')
    table.timestamp('created_at')
    table.timestamp('updated_at')
    table.index(['id', 'type'])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('blocks');
};