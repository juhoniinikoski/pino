import { Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BodyText from '../common/BodyText';
import { Question } from '../../utils/types';
import { AppStackParamList } from '../../navigation/AppStack';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C8E1FF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

type Props = {
  question: Question;
  collectionId: string;
  index: number;
};

type NavigationProps = NativeStackNavigationProp<AppStackParamList>;

const QuestionBox = ({ question, collectionId, index }: Props) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    navigation.navigate('Question', {
      collectionId,
      initialScrollIndex: index,
    });
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <BodyText textType="medium">{question.question}</BodyText>
    </Pressable>
  );
};

export default QuestionBox;
