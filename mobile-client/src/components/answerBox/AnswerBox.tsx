import { Pressable, StyleSheet, View } from 'react-native';
import * as React from 'react';
import BodyText from '../common/BodyText';
import { Answer } from '../../utils/types';

/* eslint-disable no-nested-ternary */

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C8E1FF',
    width: '100%',
  },
  radioButton: {
    height: 16,
    width: 16,
    marginRight: 16,
    borderRadius: 50,
    borderColor: '#BEBEBE',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  correct: {
    borderWidth: 0,
    backgroundColor: 'green',
  },
  incorrect: {
    borderWidth: 0,
    backgroundColor: 'red',
  },
});

type Props = {
  answer: Partial<Answer>;
};

const AnswerBox = ({ answer }: Props) => {
  const [answered, setAnswered] = React.useState<boolean>(false);

  const handlePress = () => {
    setAnswered(true);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setAnswered(false), 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [answered]);

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View
        testID="radio-button"
        style={
          answer.correct && answered
            ? [styles.radioButton, styles.correct]
            : answered
            ? [styles.radioButton, styles.incorrect]
            : styles.radioButton
        }
      />
      <View style={{ flex: 1 }}>
        <BodyText>{answer.answer}</BodyText>
      </View>
    </Pressable>
  );
};

export default AnswerBox;
