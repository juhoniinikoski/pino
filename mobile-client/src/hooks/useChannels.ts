import { useQuery } from '@apollo/client';
import { GET_CHANNELS } from '../graphql/queries';
import parseSortBy from '../utils/parseSortBy';

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
}

const useChannels = (after?: string, sortBy?: string, filterText?: string) => {
  const sortVariables = parseSortBy(sortBy || 'ASC');

  const queryVariables: QueryVariables = {
    sortVariables,
    searchKeyword: filterText || '',
    first: 10,
    after: after || '',
  };

  const { data, loading, fetchMore, ...result } = useQuery(GET_CHANNELS, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.channels.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_CHANNELS,
      variables: {
        after: data.channels.pageInfo.endCursor,
        ...queryVariables,
      },
    });
  };

  return {
    channels: data ? data.channels.edges : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useChannels;
