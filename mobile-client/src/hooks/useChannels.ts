import { useQuery } from '@apollo/client'
import { GET_CHANNELS } from '../graphql/queries'
import parseSortBy from "../utils/parseSortBy";

const useChannels = (sortBy?: string, filterText?: string) => {

  const sortVariables = parseSortBy(sortBy ? sortBy : "ASC")

  const queryVariables = {
    ...sortVariables,
    searchKeyword: filterText ? filterText : "",
    first: 10,
  }

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.channels.pageInfo.hasNextPage;

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

  const { data, loading, fetchMore, ...result } = useQuery(GET_CHANNELS, {
    variables: queryVariables,
    fetchPolicy: "cache-and-network",
  });

  return {
    channels: data ? data.channels.edges : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useChannels