import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable } from 'react-native';
import { LibraryStackParamList } from '../../navigation/LibraryStack';
import BodyText from './BodyText';

type NavigationProps = NativeStackNavigationProp<LibraryStackParamList>;

const BackButton = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <Pressable onPress={() => navigation.goBack()}>
      <BodyText>Takaisin</BodyText>
    </Pressable>
  );
};

export default BackButton;
