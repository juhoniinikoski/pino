import { Pressable, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from '../../utils/types';
import BodyText from '../common/BodyText';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4C3C6',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },
});

interface Props {
  stack: Stack;
}

const StackBox = ({ stack }: Props) => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Ionicons name="layers" size={24} color="black" />
          <BodyText style={{ marginLeft: 2 }}>{stack.name}</BodyText>
        </View>
        <BodyText textType="secondary">{stack.questions} tehtävää</BodyText>
        {stack.tags.map(tag => (
          <BodyText key={tag.id}>{tag.name}</BodyText>
        ))}
      </View>
    </Pressable>
  );
};

export default StackBox;
