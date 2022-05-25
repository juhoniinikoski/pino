import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import BodyText from './BodyText';
import Mention from '../../assets/icons/mention.svg';

const styles = StyleSheet.create({
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const CustomTitleChannel = ({ title }: { title: string }) => {
  return (
    <View style={styles.nameContainer}>
      <Mention />
      <BodyText textType="semibold" style={{ marginLeft: 6 }}>
        {title}
      </BodyText>
    </View>
  );
};

export default CustomTitleChannel;
