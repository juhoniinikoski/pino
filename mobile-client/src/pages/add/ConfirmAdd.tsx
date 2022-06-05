import { ScrollView } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BodyText from '../../components/common/BodyText';
import { AddModalStackParamList } from '../../navigation/AddModal';

type Props = NativeStackScreenProps<AddModalStackParamList, 'ConfirmAdd'>;

const ConfirmAdd = ({ route }: Props) => {
  const { question } = route.params.initialValues;

  return (
    <ScrollView>
      <BodyText>{question}</BodyText>
    </ScrollView>
  );
};

export default ConfirmAdd;
