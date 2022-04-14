const oneHour = 1000 * 60 * 60;

const createDateColumns = date => ({
  created_at: date,
  updated_at: date,
})

const createColumns = (name) => ({
  id: `${name}1234`,
  name: name
})

exports.seed = async knex => {
  await knex('channels').del();

  await knex('channels').insert([
    {
      ...createColumns('kauppikseen'),
      ...createDateColumns(new Date(Date.now() - oneHour)),
    },
    {
      ...createColumns('DIA2022'),
      ...createDateColumns(new Date(Date.now() - 2 * oneHour)),
    },
    {
      ...createColumns('yomatematiikka'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('yofysiikka'),
      ...createDateColumns(new Date(Date.now() - 3 * oneHour)),
    },
    {
      ...createColumns('tuta1'),
      ...createDateColumns(new Date(Date.now() - 4 * oneHour)),
    },
  ]);
};