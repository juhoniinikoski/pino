import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Channels from '../pages/channels/Channels';

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
      <Tab.Screen name="Channels" component={Channels} />
    </Tab.Navigator>
  );
};

export default AppTab;
