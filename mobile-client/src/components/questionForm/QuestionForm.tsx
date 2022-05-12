import { Button, Pressable, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import FormikTextInput from '../common/FormikTextInput';
import Layout from '../layout/Layout';
import { FormValues } from '../../pages/add/AddQuestion';
import TagBox from '../tagBox/TagBox';
import BodyText from '../common/BodyText';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  regular: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.41,
    lineHeight: 22,
    marginBottom: 24,
  },
  answerContainer: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.41,
    lineHeight: 22,
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#EFEFEF',
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tagContainer: {
    marginStart: 0,
    marginEnd: 0,
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 16
  },
  addTag: {
    alignSelf: 'flex-start',
    paddingRight: 16,
    marginLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  }
});

type Props = {
  onSubmit: () => void;
  values: FormValues;
};

const QuestionForm = ({ onSubmit, values }: Props) => {
  const [answers, setAnswers] = React.useState<Array<string>>([
    'answers[0]',
    'answers[1]',
  ]);

  return (
    <View>
      <ScrollView testID='tag-carousel' style={styles.tagContainer} horizontal>
        <Pressable style={styles.addTag}>
          <Ionicons name="add" size={24} color="black"/>
          <BodyText textType='small'>Lisää tagi</BodyText>
        </Pressable>
        {values.tags?.map(t => (
          <TagBox key={t.id} tag={t} />
        ))}
      </ScrollView>
      <Layout>
        <FormikTextInput
          style={styles.regular}
          name="question"
          placeholder="Kirjoita kysymys tähän..."
        />
        {answers.map((a, index) => (
          <View key={a}>
            <FormikTextInput
              name={a}
              style={styles.answerContainer}
              placeholder={`Anna ${index + 1}. ratkaisuvaihtoehto tähän`}
            />
          </View>
        ))}
        <Button title="submit" onPress={onSubmit} />
      </Layout>
    </View>
  );
};

export default QuestionForm;
