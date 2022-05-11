import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import BodyText from '../common/BodyText';
import { FOLLOW_COLLECTION } from '../../graphql/mutations';
import { Channel } from '../../utils/types';
import { GET_FOLLOWED } from '../../graphql/queries';

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

const PinBox = ({ channel, followedByUser }: Props) => {
  const [followChannel] = useMutation(FOLLOW_COLLECTION, {
    refetchQueries: [GET_FOLLOWED],
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
    followChannel({ variables: { collectionId: channel.id } });
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
        <BodyText
          style={{ marginRight: 6, color: 'white' }}
          textType="medium-light"
        >
          {followerCount}
        </BodyText>
        <Entypo testID="pin" name="pin" size={18} color="white" />
      </Pressable>
    );
  }

  return (
    <Pressable
      style={{
        ...styles.followContainer,
        backgroundColor: 'pink',
      }}
      onPress={handlePress}
    >
      <BodyText style={{ marginRight: 6 }} textType="medium-light">
        {followerCount}
      </BodyText>
      <Entypo testID="pin" name="pin" size={18} color="black" />
    </Pressable>
  );
};

export default PinBox;
