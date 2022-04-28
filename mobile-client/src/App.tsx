import { ApolloProvider } from '@apollo/client';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './contexts/auth';
import Router from './navigation/Router';
import apolloClient from './utils/apolloClient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <SafeAreaProvider>
            <Router />
          </SafeAreaProvider>
        </ApolloProvider>
      </AuthProvider>
    </View>
  );
};

export default App;
