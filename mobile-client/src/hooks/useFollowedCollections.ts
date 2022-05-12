import { useQuery } from '@apollo/client';
import { GET_FOLLOWED } from '../graphql/queries';
import parseSortBy from '../utils/parseSortBy';
import { Connection, FollowedChannel } from '../utils/types';

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

interface QueryData {
  followedCollections: Connection<FollowedChannel>;
}

const useFollowedCollections = (
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
  >(GET_FOLLOWED, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.followedCollections.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_FOLLOWED,
      variables: {
        after: data.followedCollections.pageInfo.endCursor,
        ...queryVariables,
      },
    });
  };

  return {
    followedCollections: data ? data.followedCollections.edges : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useFollowedCollections;
