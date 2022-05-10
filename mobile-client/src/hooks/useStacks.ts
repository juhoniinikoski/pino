import { useQuery } from '@apollo/client';
import { GET_STACKS } from '../graphql/queries';
import parseSortBy from '../utils/parseSortBy';
import { Connection, Stack } from '../utils/types';

interface QueryVariables {
  sortVariables:
    | {
        orderDirection: string;
        orderBy?: undefined;
      }
    | {
        orderBy: string;
        orderDirection?: undefined;
      }
    | {
        orderDirection?: undefined;
        orderBy?: undefined;
      };
  searchKeyword?: string;
  first?: number;
  after?: string;
  createdById?: string;
}

interface QueryData {
  stacks: Connection<Stack>;
}

const useStacks = (
  createdById?: string,
  after?: string,
  sortBy?: string,
  filterText?: string,
) => {
  const sortVariables = parseSortBy(sortBy || 'ASC');

  const queryVariables: QueryVariables = {
    sortVariables,
    searchKeyword: filterText || '',
    first: 10,
    after: after || '',
  };

  const { data, loading, fetchMore, ...result } = useQuery<
    QueryData,
    QueryVariables
  >(GET_STACKS, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.stacks.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_STACKS,
      variables: {
        after: data.stacks.pageInfo.endCursor,
        ...queryVariables,
      },
    });
  };

  return {
    stacks: data ? data.stacks.edges : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useStacks;
