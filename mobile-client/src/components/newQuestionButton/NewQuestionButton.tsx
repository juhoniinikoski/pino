import { Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Channel, Stack } from '../../utils/types';
import PaintBrush from '../../assets/icons/paintbrush.svg';

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: 64,
    borderRadius: 100,
    backgroundColor: '#EFEFEF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    right: 0,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: 'black',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
});

interface Props {
  stack?: Stack;
  channel?: Channel;
}

const NewQuestionButton = ({ stack, channel }: Props) => {
  const navigation = useNavigation<any>(); // eslint-disable-line

  const handlePress = () => {
    navigation.navigate('AddModal', {
      screen: 'AddQuestion',
      params: {
        tags: channel ? new Array(channel) : stack?.tags,
      },
    });
  };

  return (
    <Pressable testID="button" style={styles.container} onPress={handlePress}>
      <PaintBrush />
    </Pressable>
  );
};

export default NewQuestionButton;
