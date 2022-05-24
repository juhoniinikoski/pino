import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import LibraryPage from '../pages/library/Library';
import ChannelPage from '../pages/channel/Channel';
import StackPage from '../pages/stack/Stack';
import CustomTitleChannel from '../components/common/CustomTitleChannel';
import PinBox from '../components/pinBox/PinBox';
import CustomTitleStack from '../components/common/CustomTitleStack';
import { Channel, Stack } from '../utils/types';
import AddModal, { AddModalStackParamList } from './AddModal';

export type LibraryStackParamList = {
  Library: undefined;
  Channel: { channel: Channel; followedByUser: boolean };
  Stack: { stack: Stack; followedByUser: boolean };
  AddModal: NavigatorScreenParams<AddModalStackParamList>;
};

const StackNav = createNativeStackNavigator<LibraryStackParamList>();

const LibraryStack = () => {
  const HeaderTitleChannel = React.useCallback(
    title => <CustomTitleChannel title={title} />,
    [],
  );

  const HeaderTitleStack = React.useCallback(
    title => <CustomTitleStack title={title} />,
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
      <StackNav.Group>
        <StackNav.Screen name="Library" component={LibraryPage} />
        <StackNav.Screen
          name="Channel"
          component={ChannelPage}
          options={({ route }) => ({
            headerTitle: () => HeaderTitleChannel(route.params.channel.name),
            headerRight: () =>
              HeaderRight(route.params.channel, route.params.followedByUser),
          })}
        />
        <StackNav.Screen
          name="Stack"
          component={StackPage}
          options={({ route }) => ({
            headerTitle: () => HeaderTitleStack(route.params.stack.name),
            headerRight: () =>
              HeaderRight(route.params.stack, route.params.followedByUser),
          })}
        />
      </StackNav.Group>
      <StackNav.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}
      >
        <StackNav.Screen name="AddModal" component={AddModal} />
      </StackNav.Group>
    </StackNav.Navigator>
  );
};

export default LibraryStack;
