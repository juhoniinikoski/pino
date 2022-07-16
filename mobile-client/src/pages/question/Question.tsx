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
import colors from '../../styles/colors';
import CaptionText from '../../components/common/CaptionText';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 64,
  },
  tagContainer: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
  },
});

type Props = NativeStackScreenProps<AppStackParamList, 'Question'>;

interface ScreenProps {
  question: QuestionType;
}

const QuestionScreen = ({ question }: ScreenProps) => {
  const { height } = Dimensions.get('screen');

  const paddingTop = useHeaderHeight() + 32;

  return (
    <View style={{ ...styles.container, height }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingTop, marginHorizontal: 8, marginBottom: 16 }}>
          <CaptionText
            textType="bold1"
            style={{ color: colors.BORDER_LIGHT, marginBottom: 16 }}
          >
            SELECT ONE
          </CaptionText>
          <HeaderText
            textType="semibold"
            style={{ color: colors.TEXT_COLOR_PRIMARY }}
          >
            {question.question}
          </HeaderText>
        </View>
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
