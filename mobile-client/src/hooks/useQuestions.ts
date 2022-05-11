import { useQuery } from '@apollo/client';
import { GET_QUESTIONS } from '../graphql/queries';
import parseSortBy from '../utils/parseSortBy';
import { Connection, Question } from '../utils/types';

interface QueryVariables {
  collectionId: string;
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
  first?: number;
  after?: string;
}

interface QueryData {
  questions: Connection<Question>;
}

const useQuestions = (collectionId: string, sortBy?: string) => {
  const sortVariables = parseSortBy(sortBy || 'ASC');

  const queryVariables: QueryVariables = {
    collectionId,
    sortVariables,
    first: 20,
  };

  const { data, loading, fetchMore, error, ...result } = useQuery<
    QueryData,
    QueryVariables
  >(GET_QUESTIONS, {
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.questions.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_QUESTIONS,
      variables: {
        after: data.questions.pageInfo.endCursor,
        ...queryVariables,
      },
    });
  };

  return {
    questions: data ? data.questions.edges : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useQuestions;
