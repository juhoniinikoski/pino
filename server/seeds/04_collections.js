const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createChannelColumns = (name, type) => ({
  id: `${name}1234${type}`,
  type: type,
  name: name
})

const createStackColumns = (name, type, createdById, public) => ({
  id: `${name}1234${type}`,
  type: type,
  name: name,
  public: public,
  created_by_id: createdById
})

exports.seed = async knex => {
  await knex('collections').del();

  await knex('collections').insert([
    {
      ...createChannelColumns('kauppikseen', 'channel'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createChannelColumns('DIA2022', 'channel'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createChannelColumns('yomatematiikka', 'channel'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createChannelColumns('yofysiikka', 'channel'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createChannelColumns('tuta1', 'channel'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
    {
      ...createStackColumns('kauppis-yh', 'stack', 'bbe42984-051b-4a01-b45d-b8d29c32200c', false),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createStackColumns('DIA2022', 'stack', 'bbe42984-051b-4a01-b45d-b8d29c32200c', false),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createStackColumns('yomatematiikka', 'stack', 'bbe42984-051b-4a01-b45d-b8d29c32200c', true),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createStackColumns('yofysiikka', 'stack', 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2', true),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createStackColumns('tuta1', 'stack', 'cff8872a-8ff5-4092-ac2f-d79e65f18aa2', false),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
  ]);
};