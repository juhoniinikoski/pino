import { Pressable, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import BodyText from '../common/BodyText';
import { Question } from '../../utils/types';
import AnswerBox from '../answerBox/AnswerBox';

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    display: 'flex',
    alignItems: 'center',
  },
});

type Props = {
  question: Question;
};

const QuestionBox = ({ question }: Props) => {
  const handleMorePress = () => {
    console.log('painettu kolmea pistettä');
  };

  return (
    <View style={styles.container}>
      <BodyText style={{ marginBottom: 16 }}>{question.question}</BodyText>
      {question.answers.map(a => (
        <AnswerBox key={a.id} answer={a} />
      ))}
      <Pressable onPress={handleMorePress}>
        <MaterialIcons
          style={{ marginTop: 16 }}
          name="more-horiz"
          size={24}
          color="black"
        />
      </Pressable>
    </View>
  );
};

export default QuestionBox;
