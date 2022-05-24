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
  answers: string[];
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
    answers: [],
    tags: initialTags,
  };

  const navigation = useNavigation<NavigationProps>();

  const onSubmit = (values: any, resetForm: () => void) => {
    console.log(values);
    navigation.navigate('ConfirmAdd', { initialValues: values });
    resetForm();
  };

  return (
    <ScrollView
      contentContainerStyle={{ marginTop: 24 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values, resetForm);
        }}
        // validationSchema={validationSchema}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <QuestionForm
            values={values}
            onSubmit={handleSubmit}
            setFieldValue={setFieldValue}
          />
        )}
      </Formik>
    </ScrollView>
  );
};

export default AddQuestion;
