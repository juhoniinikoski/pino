import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTab from './AppTab';
import QuestionScreen from '../pages/question/Question';

export type AppStackParamList = {
  AppTab: undefined;
  Question: { collectionId: string; initialScrollIndex: number };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="AppTab">
      <Stack.Screen
        name="AppTab"
        component={AppTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Question"
        component={QuestionScreen}
        options={{
          title: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
