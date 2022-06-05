import { ScrollView } from 'react-native';
import * as React from 'react';
import { Formik } from 'formik';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import QuestionForm from '../../components/questionForm/QuestionForm';
import { AddModalStackParamList } from '../../navigation/AddModal';

// const styles = StyleSheet.create({});

type Props = NativeStackScreenProps<AddModalStackParamList, 'AddQuestion'>;

export interface FormValues {
  question: string;
  answers: {
    answer: string;
    correct: boolean;
  }[];
  tags:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
}

type NavigationProps = NativeStackNavigationProp<AddModalStackParamList>;

const AddQuestion = ({ route }: Props) => {
  const initialTags = route.params.tags?.map(t => ({ id: t.id, name: t.name }));

  const initialValues: FormValues = {
    question: '',
    answers: [
      {
        answer: '',
        correct: false,
      },
      {
        answer: '',
        correct: false,
      },
    ],
    tags: initialTags,
  };

  const navigation = useNavigation<NavigationProps>();

  const onSubmit = (values: FormValues) => {
    console.log(values);
    navigation.navigate('ConfirmAdd', { initialValues: values });
  };

  return (
    <ScrollView
      contentContainerStyle={{ marginTop: 24 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          onSubmit(values);
        }}
        // validationSchema={validationSchema}
      >
        {({ handleSubmit, values }) => (
          <QuestionForm values={values} onSubmit={handleSubmit} />
        )}
      </Formik>
    </ScrollView>
  );
};

export default AddQuestion;
