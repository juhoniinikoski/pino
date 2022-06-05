import { Pressable, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FieldArray } from 'formik';
import FormikTextInput from '../common/FormikTextInput';
import Layout from '../layout/Layout';
import { FormValues } from '../../pages/add/AddQuestion';
import BodyText from '../common/BodyText';
import { AddModalStackParamList } from '../../navigation/AddModal';
import EmptyCircle from '../../assets/icons/empty-circle.svg';

const styles = StyleSheet.create({
  questionText: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: -0.43,
    lineHeight: 25,
    marginBottom: 28,
  },
  answerContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D0D7DE',
    marginVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.43,
    lineHeight: 22,
    display: 'flex',
    flex: 1,
    paddingTop: 0,
    paddingBottom: 2,
  },
  tagContainer: {
    marginStart: 0,
    marginEnd: 0,
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 16,
  },
});

interface AnswerType {
  answer: string;
  correct: boolean;
}

type Props = {
  onSubmit: () => void;
  values: FormValues;
};

type NavigationProps = NativeStackNavigationProp<AddModalStackParamList>;

type NavPressableProps = {
  onSubmit: () => void;
  disabled: boolean;
};

const NavPressable = ({ onSubmit, disabled }: NavPressableProps) => {
  return (
    <Pressable onPress={onSubmit} disabled={disabled}>
      {disabled ? (
        <BodyText style={{ color: '#959DA5' }}>Seuraava</BodyText>
      ) : (
        <BodyText textType="semibold">Seuraava</BodyText>
      )}
    </Pressable>
  );
};

const QuestionForm = ({ onSubmit, values }: Props) => {
  const [disabled, setDisabled] = React.useState<boolean>(true);

  const navigation = useNavigation<NavigationProps>();

  const MemoizedNestedComponent = React.useCallback(
    () => <NavPressable onSubmit={onSubmit} disabled={disabled} />,
    [disabled, onSubmit],
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: MemoizedNestedComponent,
    });
  }, [navigation, MemoizedNestedComponent]);

  const isntEmpty = (value: AnswerType) => value.answer !== '';

  React.useEffect(() => {
    setDisabled(
      !(values.answers.slice(0, 2).every(isntEmpty) && values.question !== ''),
    );
  }, [values]);

  return (
    <View>
      <Layout>
        <FormikTextInput
          name="question"
          placeholder="Kirjoita kysymys tähän..."
          style={styles.questionText}
        />
        <FieldArray name="answers">
          {({ push }) => (
            <View>
              {values.answers.length > 0 &&
                values.answers.map((_a, index) => (
                  // eslint-disable-next-line
                  <View key={index}> 
                    <View style={styles.answerContainer}>
                      <EmptyCircle style={{ marginRight: 12 }} />
                      <FormikTextInput
                        name={`answers.${index}.answer`}
                        style={styles.inputText}
                        placeholder={`Ratkaisu ${index + 1}`}
                      />
                    </View>
                  </View>
                ))}
              {values.answers.length < 6 && (
                <Pressable
                  testID="add-button"
                  onPress={() => push({ answer: '', correct: false })}
                  style={{
                    ...styles.answerContainer,
                    borderStyle: 'dashed',
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
              )}
            </View>
          )}
        </FieldArray>
      </Layout>
    </View>
  );
};

export default QuestionForm;
