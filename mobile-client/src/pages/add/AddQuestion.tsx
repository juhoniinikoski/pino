import { Button, ScrollView } from 'react-native';
import * as React from 'react';
import { Formik } from 'formik';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import QuestionForm from '../../components/questionForm/QuestionForm';
import { LibraryStackParamList } from '../../navigation/AppTab';

// const styles = StyleSheet.create({});

type Props = NativeStackScreenProps<LibraryStackParamList, 'AddQuestion'>;

export interface FormValues {
  question: string;
  answers: string[];
  tags:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
}

const AddQuestion = ({ route }: Props) => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  const initialTags = route.params.tags?.map(t => ({ id: t.id, name: t.name }));

  const initialValues: FormValues = {
    question: '',
    answers: [],
    tags: initialTags,
  };

  return (
    <ScrollView
      contentContainerStyle={{ marginTop: 24 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
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
