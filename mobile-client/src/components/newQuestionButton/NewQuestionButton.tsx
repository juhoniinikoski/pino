import { Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

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
  channelId?: string;
  stackId?: string;
}

const NewQuestionButton = ({ channelId, stackId }: Props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (channelId) {
      console.log(`lisätään oletusarvoisesti kanavalle: ${channelId}`);
    } else if (stackId) {
      console.log(`lisätään oletusarvoisesti stackiin: ${stackId}`);
    }
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
