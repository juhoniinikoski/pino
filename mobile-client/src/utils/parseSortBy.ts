const parseSortBy = (sortBy: string) => {
  let variablesObject;
  switch (sortBy) {
    case 'ASC':
      variablesObject = {
        orderDirection: 'ASC',
      };
      break;
    case 'DESC':
      variablesObject = {
        orderDirection: 'DESC',
      };
      break;
    case 'CREATED_AT':
      variablesObject = {
        orderBy: 'createdAt',
      };
      break;
    case 'UPDATED_AT':
      variablesObject = {
        orderBy: 'updatedAt',
      };
      break;
    case 'CONNECTION_DATE':
      variablesObject = {
        orderBy: 'connectionDate',
      };
      break;
    default:
      variablesObject = {};
  }

  return variablesObject;
};

export default parseSortBy;
