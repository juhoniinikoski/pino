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
        orderBy: 'CREATED_AT',
      };
      break;
    case 'UPDATED_AT':
      variablesObject = {
        orderBy: 'UPDATED_AT',
      };
      break;
    default:
      variablesObject = {};
  }

  return variablesObject;
};

export default parseSortBy;
