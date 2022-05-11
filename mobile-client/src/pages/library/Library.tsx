import { FlatList, StyleSheet, Text } from 'react-native';
import * as React from 'react';
import Layout from '../../components/layout/Layout';
import parseNodes from '../../utils/parseNodes';
import { FollowedChannel, FollowedStack } from '../../utils/types';
import ChannelBox from '../../components/channelBox/ChannelBox';
import useFollowedCollections from '../../hooks/useFollowedCollections';
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

type DataType = FollowedStack | FollowedChannel;

function isChannel(item: DataType): item is FollowedChannel {
  return item.__typename === 'Channel';
}

const Library = () => {
  const [data, setData] = React.useState<DataType[]>([]);

  const { followedCollections: followedRaw, loading } = useFollowedCollections(
    '',
    'CONNECTION_DATE',
  );

  React.useEffect(() => {
    const followed = followedRaw
      ? parseNodes<FollowedChannel>(followedRaw)
      : [];
    setData(followed);
  }, [followedRaw, setData]);

  if (loading && !data.length) {
    return (
      <Layout>
        <Text style={styles.channelLoadText}>Loading</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <FlatList
        testID="library-list"
        data={data}
        keyExtractor={(item: DataType) => item.id + item.__typename}
        renderItem={({ item }) =>
          isChannel(item) ? (
            <ChannelBox channel={item} followedByUser />
          ) : (
            <StackBox stack={item} followedByUser />
          )
        }
      />
    </Layout>
  );
};

export default Library;
