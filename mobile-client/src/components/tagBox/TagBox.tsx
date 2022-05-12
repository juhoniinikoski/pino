import { Pressable, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { Channel } from '../../utils/types';
import BodyText from '../common/BodyText';

type Props = {
  tag: Partial<Channel>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7BA078',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
});

const TagBox = ({ tag }: Props) => {
  return (
    <Pressable style={styles.container}>
      <BodyText style={{ color: 'white' }} textType="small">
        # {tag.name}
      </BodyText>
    </Pressable>
  );
};

export default TagBox;
