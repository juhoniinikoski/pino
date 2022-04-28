import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Home from '../pages/home/Home';

const Tab = createBottomTabNavigator();

const PlaceHolderIcon = () => {
  return (
    <View
      style={{
        height: 28,
        width: 28,
        backgroundColor: '#f1f2f4',
        borderRadius: 50,
      }}
    />
  );
};

const AppTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIcon: () => <PlaceHolderIcon />,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

export default AppTab;
