import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../common/BodyText';

const styles = StyleSheet.create({
  followContainer: {
    height: 36,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
});

type Props = {
  followedBy: number;
  channelId: string;
  followedByUser: boolean;
};

const FollowBox = ({ followedBy, channelId, followedByUser }: Props) => {
  const handleFollow = () => {
    console.log(`painettu seuraamisnappia: ${channelId}`);
  };

  

  return (
    <Pressable
      style={{
        ...styles.followContainer,
        backgroundColor: followedByUser ? 'red' : '#EFEFEF',
      }}
      onPress={handleFollow}
    >
      <BodyText style={{ marginRight: 4 }} textType="medium-light">
        {followedBy}
      </BodyText>
      <Ionicons name="heart-outline" size={20} color="black" />
    </Pressable>
  );
};

export default FollowBox;
