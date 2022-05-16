import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import * as React from 'react';
import { Channel } from '../../utils/types';
import CaptionText from '../common/CaptionText';

type Props = {
  tag: Partial<Channel>;
  style?: ViewStyle;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDF4FF',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 100,
  },
});

const TagBox = ({ tag, style }: Props) => {
  return (
    <Pressable style={[style, styles.container]}>
      <CaptionText style={{ color: '#0969DA' }} textType="semibold1">
        @ {tag.name}
      </CaptionText>
    </Pressable>
  );
};

export default TagBox;
