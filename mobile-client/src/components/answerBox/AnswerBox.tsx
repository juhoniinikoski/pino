import { Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import BodyText from '../common/BodyText';
import { Answer } from '../../utils/types';
import CheckCircle from '../../assets/icons/check-circle.svg';
import XCircle from '../../assets/icons/x-circle.svg';

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
    borderColor: 'rgba(74, 194, 107, 0.4)',
    backgroundColor: '#DAFBE1',
  },
  incorrect: {
    borderColor: 'rgba(255, 129, 130, 0.4)',
    backgroundColor: '#FFEBE9',
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
    <Pressable
      onPress={handlePress}
      style={
        answered && answer.correct
          ? [styles.container, styles.correct]
          : answered
          ? [styles.container, styles.incorrect]
          : styles.container
      }
    >
      {answered && answer.correct && (
        <CheckCircle style={{ position: 'absolute', top: -8, right: 8 }} />
      )}
      {answered && !answer.correct && (
        <XCircle style={{ position: 'absolute', top: -8, right: 8 }} />
      )}
      <BodyText>{answer.answer}</BodyText>
    </Pressable>
  );
};

export default AnswerBox;
