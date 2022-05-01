import { SectionList, StyleSheet, Text } from 'react-native';
import * as React from 'react';
import Layout from '../../components/layout/Layout';
import useChannels from '../../hooks/useChannels';
import HeaderText from '../../components/common/HeaderText';
import parseNodes from '../../utils/parseNodes';
import { Channel, Section } from '../../utils/types';
import ChannelBox from '../../components/box/ChannelBox';

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

const ChannelsPage = () => {
  const { channels: saved, loading } = useChannels();
  const { channels: recommended, loading: newLoading } = useChannels(
    'WyIyMDIyLTA0LTI4VDA3OjEyOjQ2LjI0MVoiLCJESUEyMDIyMTIzNCJd',
  );

  const channels = saved ? parseNodes<Channel>(saved) : [];
  const recommendedChannels = recommended
    ? parseNodes<Channel>(recommended)
    : [];

  const data = [
    {
      title: 'Omat kanavat',
      data: channels,
    },
    {
      title: 'Suositellut kanavat',
      data: recommendedChannels,
    },
  ];

  if (loading || newLoading) {
    return (
      <Layout>
        <Text style={styles.loadingText}>Loading</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <SectionList<Channel, Section<Channel>>
        sections={data}
        keyExtractor={(item: Channel) => item.id}
        renderItem={({ item }) => <ChannelBox channel={item} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <HeaderText style={styles.header} textType="smallest">
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
