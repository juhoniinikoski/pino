import { Text, StyleSheet, FlatList, View } from 'react-native';
import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from '../../components/layout/Layout';
import { LibraryStackParamList } from '../../navigation/AppTab';
import useQuestions from '../../hooks/useQuestions';
import { Question } from '../../utils/types';
import parseNodes from '../../utils/parseNodes';
import QuestionBox from '../../components/questionBox/QuestionBox';
import NewQuestionButton from '../../components/newQuestionButton/NewQuestionButton';
import useAuthorizedUser from '../../hooks/useAuthorizedUser';

const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  header: {
    marginTop: 16,
    marginBottom: 8,
  },
});

type Props = NativeStackScreenProps<LibraryStackParamList, 'Stack'>;

const Stack = ({ route }: Props) => {
  const { stack } = route.params;

  const { questions: raw, loading } = useQuestions(stack.id);
  const questions = raw ? parseNodes<Question>(raw) : [];

  const { user } = useAuthorizedUser();

  const SeparatorItem = React.useCallback(
    () => (
      <View
        style={{
          marginTop: 24,
          borderBottomColor: 'grey',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    ),
    [],
  );

  if (loading) {
    return (
      <Layout>
        <Text style={styles.loadingText}>Loading</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <FlatList
        testID="question-list"
        data={questions}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={SeparatorItem}
        renderItem={({ item }) => <QuestionBox question={item} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      {user && user.id === stack.createdById && (
        <View testID="add-question">
          <NewQuestionButton stack={stack} />
        </View>
      )}
    </Layout>
  );
};

export default Stack;
