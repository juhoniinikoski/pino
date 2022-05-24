import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import LibraryStack from './LibraryStack';

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
  const IconComponent = React.useCallback(() => <PlaceHolderIcon />, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIcon: IconComponent,
      }}
    >
      <Tab.Screen name="Oma kirjasto" component={LibraryStack} />
    </Tab.Navigator>
  );
};

export default AppTab;
