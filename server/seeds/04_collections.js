const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createColumns = (name, type, createdById, public) => ({
  id: `${name}1234${type}`,
  type: type,
  name: name,
  public: public ? public : null,
  created_by_id: createdById ? createdById : null
})

exports.seed = async knex => {
  await knex('collections').del();

  await knex('collections').insert([
    {
      ...createColumns('kauppikseen', 'channel'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('DIA2022', 'channel'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('yomatematiikka', 'channel'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('yofysiikka', 'channel'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('tuta1', 'channel'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createColumns('kauppis-yh', 'stack', 'bbe42984-051b-4a01-b45d-b8d29c32200c', false),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('DIA2022', 'stack', 'bbe42984-051b-4a01-b45d-b8d29c32200c', false),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('yomatematiikka', 'stack', 'bbe42984-051b-4a01-b45d-b8d29c32200c', true),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('yofysiikka', 'stack', 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2', true),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('tuta1', 'stack', 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2', false),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
  ]);
};