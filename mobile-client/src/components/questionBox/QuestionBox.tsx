import { Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BodyText from '../common/BodyText';
import { Question } from '../../utils/types';
import { AppStackParamList } from '../../navigation/AppStack';
import colors from '../../styles/colors';

/* eslint-disable no-underscore-dangle */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.BORDER_LIGHT,
    display: 'flex',
    alignItems: 'flex-start',
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
      {/* <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginRight: -8,
          marginBottom: 8,
        }}
      >
        {tags.map(t => (
          <TagBox
            style={{ marginRight: 8, marginBottom: 8 }}
            key={t.id}
            tag={t}
          />
        ))}
      </View> */}
      <BodyText style={{ color: colors.TEXT_COLOR_PRIMARY }}>
        {question.question}
      </BodyText>
    </Pressable>
  );
};

export default QuestionBox;
