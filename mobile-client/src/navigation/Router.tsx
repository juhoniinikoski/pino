import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/auth';
import AppTab from './AppTab';
import AuthStack from './AuthStack';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
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
      {authData ? <AppTab /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
