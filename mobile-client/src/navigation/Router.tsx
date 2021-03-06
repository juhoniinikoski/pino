import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/auth';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

const Router = () => {
  const { authData, loading } = useAuth();

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={theme}>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
