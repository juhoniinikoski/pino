import { Button, Pressable, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons';
import FormikTextInput from '../common/FormikTextInput';
import Layout from '../layout/Layout';
import { FormValues } from '../../pages/add/AddQuestion';
import TagBox from '../tagBox/TagBox';
import CaptionText from '../common/CaptionText';
import BodyText from '../common/BodyText';

const styles = StyleSheet.create({
  medium: {
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: -0.43,
    lineHeight: 22,
    marginBottom: 20,
  },
  answerContainer: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.43,
    lineHeight: 22,
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#F6F8FA',
    borderWidth: 1,
    borderColor: '#D0D7DE',
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  tagContainer: {
    marginStart: 0,
    marginEnd: 0,
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 16,
  },
  addTag: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 100,
  },
  addTagBack: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: '#DDF4FF',
    paddingVertical: 1,
    paddingHorizontal: 1,
    borderRadius: 100,
  },
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
      <ScrollView testID="tag-carousel" style={styles.tagContainer} horizontal>
        <Pressable style={styles.addTagBack}>
          <Pressable style={styles.addTag}>
            <Octicons name="plus" size={13} color="black" />
            <CaptionText textType="semibold1" style={{ marginLeft: 1 }}>
              {' '}
              lisää tagi
            </CaptionText>
          </Pressable>
        </Pressable>
        {values.tags?.map(t => (
          <TagBox style={{ marginLeft: 8 }} key={t.id} tag={t} />
        ))}
      </ScrollView>
      <Layout>
        <FormikTextInput
          color="#6E7781"
          style={styles.medium}
          name="question"
          placeholder="Kirjoita kysymys tähän..."
        />
        {answers.map((a, index) => (
          <View key={a}>
            <FormikTextInput
              color="#6E7781"
              name={a}
              style={styles.answerContainer}
              placeholder={`Anna ${index + 1}. ratkaisuvaihtoehto tähän`}
            />
          </View>
        ))}
        <Pressable
          style={{
            ...styles.answerContainer,
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Octicons name="plus" size={16} color="#6E7781" />
          <BodyText style={{ marginLeft: 6, color: '#6E7781' }}>
            Lisää ratkaisu
          </BodyText>
        </Pressable>
        <Button title="submit" onPress={onSubmit} />
      </Layout>
    </View>
  );
};

export default QuestionForm;
