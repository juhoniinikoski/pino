const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createColumns = (name, no, createdBy) => ({
  id: `${name}1234`,
  name: name,
  public: false,
  no_of_questions: no,
  created_by_id: createdBy
})

exports.seed = async knex => {
  await knex('stacks').del();

  await knex('stacks').insert([
    {
      ...createColumns('kauppis-yh', 5, 'bbe42984-051b-4a01-b45d-b8d29c32200c'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('DIA2022', 0, 'bbe42984-051b-4a01-b45d-b8d29c32200c'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('yomatematiikka', 0, 'bbe42984-051b-4a01-b45d-b8d29c32200c'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('yofysiikka', 0, 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('tuta1', 0, 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
  ]);
};