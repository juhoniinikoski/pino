import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import BodyText from '../common/BodyText';
import { FOLLOW_CHANNEL } from '../../graphql/mutations';
import { Channel } from '../../utils/types';
import { GET_USERS_CHANNELS } from '../../graphql/queries';

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
  const [followChannel] = useMutation(FOLLOW_CHANNEL, {
    refetchQueries: [GET_USERS_CHANNELS],
  });

  const [followed, setFollowed] = React.useState<boolean>(followedByUser);
  const [followerCount, setFollowerCount] = React.useState<number>(
    channel.followedBy,
  );

  const handlePress = () => {
    if (followed) {
      setFollowerCount(followerCount - 1);
    } else {
      setFollowerCount(followerCount + 1);
    }
    followChannel({ variables: { channelId: channel.id } });
    setFollowed(!followed);
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
        <Ionicons testID="icon" name="heart" size={20} color="red" />
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
      <Ionicons testID="icon" name="heart-outline" size={20} color="black" />
    </Pressable>
  );
};

export default FollowBox;
