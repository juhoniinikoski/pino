import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BodyText from '../common/BodyText';
import { Channel, Question } from '../../utils/types';
import { ChannelStackParamList } from '../../navigation/AppTab';

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    display: 'flex'
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  followContainer: {
    height: 36,
    backgroundColor: '#EFEFEF',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
});

type Props = {
  question: Question;
};

const QuestionBox = ({ question }: Props) => {

  return (
    <View style={styles.container}>
      <BodyText style={{ marginLeft: 2 }}>{question.question}</BodyText>
    </View>
  );
};

export default QuestionBox;
