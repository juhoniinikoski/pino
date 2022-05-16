import { Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import BodyText from '../common/BodyText';
import { Answer } from '../../utils/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C8E1FF',
    width: '100%',
  },
});

type Props = {
  answer: Partial<Answer>;
};

const AnswerBox = ({ answer }: Props) => {
  const handlePress = () => {
    console.log(`painettu vastausta: ${answer.id}`);
    if (answer.correct === true) {
      console.log('vastaus on oikein');
    } else {
      console.log('vastaus on väärin');
    }
    console.log(answer.correct);
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <BodyText style={{ textAlign: 'center' }}>{answer.answer}</BodyText>
    </Pressable>
  );
};

export default AnswerBox;
