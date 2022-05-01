import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import Layout from '../../components/layout/Layout';
import useChannels from '../../hooks/useChannels';
import HeaderText from '../../components/common/HeaderText';

const styles = StyleSheet.create({});

const Channels = () => {

  const { channels, loading } = useChannels()
  console.log(channels)
  console.log("loading: " + loading)

  return (
    <Layout>
      <HeaderText textType='smallest'>Omat kanavat</HeaderText>
    </Layout>
  );
};

export default Channels;
