const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createColumns = (name, createdBy, public) => ({
  id: `${name}1234`,
  name: name,
  public: public,
  created_by_id: createdBy
})

exports.seed = async knex => {
  await knex('stacks').del();

  await knex('stacks').insert([
    {
      ...createColumns('kauppis-yh', 'bbe42984-051b-4a01-b45d-b8d29c32200c', false),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('DIA2022', 'bbe42984-051b-4a01-b45d-b8d29c32200c', false),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('yomatematiikka', 'bbe42984-051b-4a01-b45d-b8d29c32200c', true),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('yofysiikka', 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2', true),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('tuta1', 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2', false),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
  ]);
};