import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useHeaderHeight } from '@react-navigation/elements';
import { Question as QuestionType } from '../../utils/types';
import { AppStackParamList } from '../../navigation/AppStack';
import useQuestions from '../../hooks/useQuestions';
import parseNodes from '../../utils/parseNodes';
import HeaderText from '../../components/common/HeaderText';
import AnswerBox from '../../components/answerBox/AnswerBox';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

type Props = NativeStackScreenProps<AppStackParamList, 'Question'>;

interface ScreenProps {
  question: QuestionType;
}

const QuestionScreen = ({ question }: ScreenProps) => {
  const { height } = Dimensions.get('screen');

  const paddingTop = useHeaderHeight() + 64;

  return (
    <View style={{ ...styles.container, height }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <HeaderText
          textType="semibold"
          style={{ paddingTop, marginHorizontal: 8, marginBottom: 16 }}
        >
          {question.question}
        </HeaderText>
        {question.answers.map(a => (
          <AnswerBox key={a.id} answer={a} />
        ))}
      </ScrollView>
    </View>
  );
};

const Question = ({ route }: Props) => {
  const { questions: raw } = useQuestions(route.params.collectionId);
  const questions = raw ? parseNodes<QuestionType>(raw) : [];

  const { height } = Dimensions.get('screen');
  const { initialScrollIndex } = route.params;

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      initialScrollIndex={initialScrollIndex}
      data={questions}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <QuestionScreen question={item} />}
      getItemLayout={(_data, index: number) => ({
        length: height,
        offset: height * index,
        index,
      })}
      // onEndReached={onEndReach}
      onEndReachedThreshold={2}
    />
  );
};

export default Question;
