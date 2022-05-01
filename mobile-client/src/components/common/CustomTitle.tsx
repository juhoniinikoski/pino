import { MaterialIcons } from '@expo/vector-icons';
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

const CustomTitle = ({ title }: { title: string }) => {
  return (
    <View style={styles.nameContainer}>
      <MaterialIcons name="tag" size={24} color="black" />
      <BodyText textType="bold" style={{ marginLeft: 2 }}>
        {title}
      </BodyText>
    </View>
  );
};

export default CustomTitle;
