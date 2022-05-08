import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import BodyText from '../common/BodyText';
import { FOLLOW_CHANNEL } from '../../graphql/mutations';
import { Channel } from '../../utils/types';
import { ChannelContext } from '../../contexts/channelContext';

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
  channel: Channel;
  followedByUser: boolean;
};

const FollowBox = ({ channel, followedByUser }: Props) => {
  const [followChannel] = useMutation(FOLLOW_CHANNEL);
  const {
    followedChannels,
    setFollowedChannels,
    recommendedChannels,
    setRecommendedChannels,
  } = React.useContext(ChannelContext);

  const [followed, setFollowed] = React.useState<boolean>(followedByUser);
  const [followerCount, setFollowerCount] = React.useState<number>(
    channel.followedBy,
  );

  const handleFollow = (channel: Channel, type: string) => {
    if (type === 'followed') {
      const index = recommendedChannels.indexOf(channel);
      if (index > -1) {
        const newRecommended = recommendedChannels;
        newRecommended.splice(index, 1);
        const modifiedChannel: Channel = {
          ...channel,
          followedBy: channel.followedBy + 1,
        };
        setFollowedChannels([...followedChannels, modifiedChannel]);
        setRecommendedChannels(newRecommended);
      }
    } else {
      const index = followedChannels.indexOf(channel);
      if (index > -1) {
        const newFollowed = followedChannels;
        newFollowed.splice(index, 1);
        const modifiedChannel: Channel = {
          ...channel,
          followedBy: channel.followedBy - 1,
        };
        setFollowedChannels(newFollowed);
        setRecommendedChannels([...recommendedChannels, modifiedChannel]);
      }
    }
  };

  const handlePress = () => {
    let type = 'followed';
    if (followed) {
      type = 'unfollowed';
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }
    followChannel({ variables: { channelId: channel.id } });
    setFollowed(!followed);
    handleFollow(channel, type);
  };

  if (followed) {
    return (
      <Pressable
        style={{
          ...styles.followContainer,
          backgroundColor: '#EFEFEF',
        }}
        onPress={handlePress}
      >
        <BodyText style={{ marginRight: 4 }} textType="medium-light">
          {followerCount}
        </BodyText>
        <Ionicons name="heart" size={20} color="red" />
      </Pressable>
    );
  }

  return (
    <Pressable
      style={{
        ...styles.followContainer,
        backgroundColor: '#EFEFEF',
      }}
      onPress={handlePress}
    >
      <BodyText style={{ marginRight: 4 }} textType="medium-light">
        {followerCount}
      </BodyText>
      <Ionicons name="heart-outline" size={20} color="black" />
    </Pressable>
  );
};

export default FollowBox;
