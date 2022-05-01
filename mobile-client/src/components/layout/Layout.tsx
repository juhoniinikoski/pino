import { StyleSheet, ViewStyle } from 'react-native';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 16,
  },
});

interface Props {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

const Layout = ({ children, style }: Props): JSX.Element => {
  return (
    <SafeAreaView edges={['left', 'right']} style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

export default Layout;
