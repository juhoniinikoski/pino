import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import ChannelsPage from '../pages/library/Library';
import LibraryPage from '../pages/channel/Channel';
import { Channel } from '../utils/types';
import CustomTitle from '../components/common/CustomTitle';
import FollowBox from '../components/followBox/FollowBox';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<LibraryStackParamList>();

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
};

const LibraryStack = () => {
  const HeaderTitle = React.useCallback(
    title => <CustomTitle title={title} />,
    [],
  );

  const HeaderRight = React.useCallback(
    (channel, followedByUser) => (
      <FollowBox channel={channel} followedByUser={followedByUser} />
    ),
    [],
  );

  return (
    <Stack.Navigator
      initialRouteName="Library"
      screenOptions={{ headerTintColor: 'black', headerBackTitle: '' }}
    >
      <Stack.Screen name="Library" component={ChannelsPage} />
      <Stack.Screen
        name="Channel"
        component={LibraryPage}
        options={({ route }) => ({
          headerTitle: () => HeaderTitle(route.params.channel.name),
          headerRight: () =>
            HeaderRight(route.params.channel, route.params.followedByUser),
        })}
      />
    </Stack.Navigator>
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
      <Tab.Screen name="Kanavat" component={LibraryStack} />
    </Tab.Navigator>
  );
};

export default AppTab;
