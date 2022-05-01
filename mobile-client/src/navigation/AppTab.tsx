import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import ChannelsPage from '../pages/channels/Channels';
import ChannelPage from '../pages/channel/Channel';
import { Channel } from '../utils/types';
import CustomTitle from '../components/common/CustomTitle';

const Tab = createBottomTabNavigator();
const ChanStack = createNativeStackNavigator<ChannelStackParamList>();

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

export type ChannelStackParamList = {
  Channels: undefined;
  Channel: { channel: Channel };
};

const ChannelStack = () => {
  return (
    <ChanStack.Navigator
      initialRouteName="Channels"
      screenOptions={{ headerTintColor: 'black', headerBackTitle: '' }}
    >
      <ChanStack.Screen name="Channels" component={ChannelsPage} />
      <ChanStack.Screen
        name="Channel"
        component={ChannelPage}
        options={({ route }) => ({
          headerTitle: () => <CustomTitle title={route.params.channel.name} />,
        })}
      />
    </ChanStack.Navigator>
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
      <Tab.Screen name="Kanavat" component={ChannelStack} />
    </Tab.Navigator>
  );
};

export default AppTab;
