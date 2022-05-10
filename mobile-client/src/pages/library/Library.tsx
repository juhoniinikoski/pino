import { FlatList, StyleSheet, Text } from 'react-native';
import * as React from 'react';
import Layout from '../../components/layout/Layout';
import parseNodes from '../../utils/parseNodes';
import { Channel, Stack } from '../../utils/types';
import ChannelBox from '../../components/channelBox/ChannelBox';
import useUserChannels from '../../hooks/useUserChannels';
import useStacks from '../../hooks/useStacks';
import StackBox from '../../components/stackBox/StackBox';

/* eslint-disable no-underscore-dangle */

const styles = StyleSheet.create({
  channelLoadText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  header: {
    marginTop: 16,
    marginBottom: 8,
  },
});

type DataType = Stack | Channel;

function isChannel(item: DataType): item is Channel {
  return item.__typename === 'Channel';
}

const Library = () => {
  const [followedChannels, setFollowedChannels] = React.useState<Channel[]>([]);
  const [userStacks, setUserStacks] = React.useState<Stack[]>([]);

  const [data, setData] = React.useState<DataType[]>([]);

  const { channels: followedRaw, loading: channelLoad } = useUserChannels();
  const { stacks: userStacksRaw, loading: stackLoad } = useStacks();

  React.useEffect(() => {
    const followed = followedRaw ? parseNodes<Channel>(followedRaw) : [];
    const userStacks = userStacksRaw ? parseNodes<Stack>(userStacksRaw) : [];
    setFollowedChannels(followed);
    setUserStacks(userStacks);
  }, [followedRaw, userStacksRaw, setFollowedChannels, setUserStacks]);

  React.useEffect(() => {
    if (!(channelLoad || stackLoad)) {
      setData([...followedChannels, ...userStacks]);
    }
  }, [followedChannels, userStacks, channelLoad, stackLoad]);

  if (
    (channelLoad || stackLoad) &&
    (!followedChannels.length || !userStacks.length)
  ) {
    return (
      <Layout>
        <Text style={styles.channelLoadText}>Loading</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <FlatList
      testID='library-list'
        data={data}
        keyExtractor={(item: DataType) => item.id + item.__typename}
        renderItem={({ item }) =>
          isChannel(item) ? (
            <ChannelBox channel={item} followedByUser />
          ) : (
            <StackBox stack={item} />
          )
        }
      />
    </Layout>
  );
};

export default Library;
