import { Text, StyleSheet, FlatList } from 'react-native';
import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from '../../components/layout/Layout';
import { LibraryStackParamList } from '../../navigation/LibraryStack';
import useQuestions from '../../hooks/useQuestions';
import { Question } from '../../utils/types';
import parseNodes from '../../utils/parseNodes';
import QuestionBox from '../../components/questionBox/QuestionBox';
import NewQuestionButton from '../../components/newQuestionButton/NewQuestionButton';

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

type Props = NativeStackScreenProps<LibraryStackParamList, 'Channel'>;

const Channel = ({ route }: Props) => {
  const { channel } = route.params;
  const { questions: raw, loading } = useQuestions(channel.id);
  const questions = raw ? parseNodes<Question>(raw) : [];

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
        renderItem={({ item, index }) => (
          <QuestionBox
            question={item}
            collectionId={channel.id}
            index={index}
          />
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <NewQuestionButton channel={route.params.channel} />
    </Layout>
  );
};

export default Channel;
