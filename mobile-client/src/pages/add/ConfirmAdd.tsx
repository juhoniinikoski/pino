import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BodyText from '../../components/common/BodyText';
import { AddModalStackParamList } from '../../navigation/AddModal';

const styles = StyleSheet.create({});

type Props = NativeStackScreenProps<AddModalStackParamList, 'ConfirmAdd'>;

const ConfirmAdd = ({ route }: Props) => {
  const { question, answers, tags } = route.params.initialValues;
  const answersWithKeys = answers.map((a: string, i: number) => ({
    answer: a,
    i,
  }));

  return (
    <ScrollView>
      <BodyText>{question}</BodyText>
      {answersWithKeys.map((a: any) => (
        <BodyText key={a.i}>{a.answer}</BodyText>
      ))}
    </ScrollView>
  );
};

export default ConfirmAdd;
