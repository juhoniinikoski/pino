import { SectionList, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import Layout from '../../components/layout/Layout';
import useChannels from '../../hooks/useChannels';
import HeaderText from '../../components/common/HeaderText';
import parseNodes from '../../utils/parseNodes';
import { Channel, Section } from '../../utils/types';
import ChannelBox from '../../components/channelBox/ChannelBox';
import useUserChannels from '../../hooks/useUserChannels';

const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  header: {
    marginTop: 16,
    marginBottom: 8,
  },
});

interface Data {
  title: string;
  data: Channel[];
  renderItem: ({ item }: { item: Channel }) => JSX.Element;
}

export const renderItemFollowed = ({ item }: { item: Channel }) => (
  <ChannelBox channel={item} followedByUser />
);
export const renderItemOther = ({ item }: { item: Channel }) => (
  <ChannelBox channel={item} followedByUser={false} />
);

const ChannelsPage = () => {
  const [followedChannels, setFollowedChannels] = React.useState<Channel[]>([]);
  const [recommendedChannels, setRecommendedChannels] = React.useState<
    Channel[]
  >([]);

  const [data, setData] = React.useState<Data[]>([]);

  const { channels: followedRaw, loading } = useUserChannels();
  const { channels: recommendedRaw, loading: newLoading } = useChannels();

  React.useEffect(() => {
    const followed = followedRaw ? parseNodes<Channel>(followedRaw) : [];
    const recommended = recommendedRaw
      ? parseNodes<Channel>(recommendedRaw)
      : [];
    const savedIds = followed.map(c => c.id);
    setFollowedChannels(followed);
    setRecommendedChannels(recommended.filter(c => !savedIds.includes(c.id)));
  }, [
    followedRaw,
    recommendedRaw,
    setFollowedChannels,
    setRecommendedChannels,
  ]);

  React.useEffect(() => {
    if (!(loading || newLoading)) {
      setData([
        {
          title: 'Omat kanavat',
          data: followedChannels,
          renderItem: renderItemFollowed,
        },
        {
          title: 'Suositellut kanavat',
          data: recommendedChannels,
          renderItem: renderItemOther,
        },
      ]);
    }
  }, [followedChannels, recommendedChannels, loading, newLoading]);

  if (
    (loading || newLoading) &&
    (!followedChannels.length || !recommendedChannels.length)
  ) {
    return (
      <Layout>
        <Text style={styles.loadingText}>Loading</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <SectionList<Channel, Section<Channel>>
        testID="channels-list"
        sections={data}
        keyExtractor={(item: Channel, index) => item.id + index.toString}
        renderItem={({ section: { renderItem } }) => (
          <View testID="render-item">{renderItem}</View>
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <HeaderText
            testID="subheader"
            style={styles.header}
            textType="smallest"
          >
            {title}
          </HeaderText>
        )}
        stickySectionHeadersEnabled={false}
        style={{ marginTop: 8 }}
      />
    </Layout>
  );
};

export default ChannelsPage;
