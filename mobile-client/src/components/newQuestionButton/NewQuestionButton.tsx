import { Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LibraryStackParamList } from '../../navigation/AppTab';
import { Channel, Stack } from '../../utils/types';

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

type NavigationProps = NativeStackNavigationProp<LibraryStackParamList>;

interface Props {
  stack?: Stack;
  channel?: Channel;
}

const NewQuestionButton = ({ stack, channel }: Props) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    navigation.navigate('AddQuestion', {
      tags: channel ? new Array(channel) : stack?.tags,
    });
  };

  return (
    <Pressable testID="button" style={styles.container} onPress={handlePress}>
      <FontAwesome
        style={{ marginLeft: 6 }}
        name="pencil-square-o"
        size={28}
        color="black"
      />
    </Pressable>
  );
};

export default NewQuestionButton;
