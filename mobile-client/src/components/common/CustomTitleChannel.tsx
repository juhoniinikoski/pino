import { Octicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import BodyText from './BodyText';

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
      <Octicons name="mention" size={16} style={{ marginTop: 2 }} />
      <BodyText textType="semibold" style={{ marginLeft: 6 }}>
        {title}
      </BodyText>
    </View>
  );
};

export default CustomTitleChannel;
