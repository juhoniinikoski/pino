exports.up = function(knex) {
  return knex.schema.createTable('collections', table => {
    table.text('id').primary();
    table.text('type').notNullable().checkIn(['channel', 'stack']);
    table.text('name').notNullable();
    table.boolean('public');
    table.text('created_by_id');
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();

    table.index('name');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('collections');
};