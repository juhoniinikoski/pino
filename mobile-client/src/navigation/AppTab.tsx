import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import LibraryPage from '../pages/library/Library';
import ChannelPage from '../pages/channel/Channel';
import StackPage from '../pages/stack/Stack';
import { Channel, Stack } from '../utils/types';
import CustomTitle from '../components/common/CustomTitle';
import PinBox from '../components/pinBox/PinBox';

const Tab = createBottomTabNavigator();
const StackNav = createNativeStackNavigator<LibraryStackParamList>();

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

export type LibraryStackParamList = {
  Library: undefined;
  Channel: { channel: Channel; followedByUser: boolean };
  Stack: { stack: Stack; followedByUser: boolean };
};

const LibraryStack = () => {
  const HeaderTitle = React.useCallback(
    title => <CustomTitle title={title} />,
    [],
  );

  const HeaderRight = React.useCallback(
    (channel, followedByUser) => (
      <PinBox channel={channel} followedByUser={followedByUser} />
    ),
    [],
  );

  return (
    <StackNav.Navigator
      initialRouteName="Library"
      screenOptions={{ headerTintColor: 'black', headerBackTitle: '' }}
    >
      <StackNav.Screen name="Library" component={LibraryPage} />
      <StackNav.Screen
        name="Channel"
        component={ChannelPage}
        options={({ route }) => ({
          headerTitle: () => HeaderTitle(route.params.channel.name),
          headerRight: () =>
            HeaderRight(route.params.channel, route.params.followedByUser),
        })}
      />
      <StackNav.Screen
        name="Stack"
        component={StackPage}
        options={({ route }) => ({
          headerTitle: () => HeaderTitle(route.params.stack.name),
          headerRight: () =>
            HeaderRight(route.params.stack, route.params.followedByUser),
        })}
      />
    </StackNav.Navigator>
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
