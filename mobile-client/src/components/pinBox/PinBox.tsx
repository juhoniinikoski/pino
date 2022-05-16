import { Pressable, StyleSheet } from 'react-native';
import * as React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import { FOLLOW_COLLECTION } from '../../graphql/mutations';
import { Channel } from '../../utils/types';
import { GET_FOLLOWED } from '../../graphql/queries';
import CaptionText from '../common/CaptionText';

const styles = StyleSheet.create({
  followContainer: {
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#A0E4B2',
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
          backgroundColor: '#DAFBE1',
        }}
        onPress={handlePress}
      >
        <CaptionText style={{ marginRight: 4 }} textType="semibold1">
          {followerCount}
        </CaptionText>
        <Entypo testID="pin" name="pin" size={16} color="#1A7F37" />
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
      <CaptionText style={{ marginRight: 4 }} textType="semibold1">
        {followerCount}
      </CaptionText>
      <Entypo testID="pin" name="pin" size={16} color="black" />
    </Pressable>
  );
};

export default PinBox;
