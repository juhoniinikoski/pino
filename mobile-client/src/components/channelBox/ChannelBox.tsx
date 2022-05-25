import { Pressable, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BodyText from '../common/BodyText';
import { Channel } from '../../utils/types';
import { LibraryStackParamList } from '../../navigation/LibraryStack';
import CaptionText from '../common/CaptionText';
import Mention from '../../assets/icons/mention.svg';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C8E1FF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

type Props = {
  channel: Channel;
  followedByUser: boolean;
};

type NavigationProps = NativeStackNavigationProp<LibraryStackParamList>;

const ChannelBox = ({ channel, followedByUser }: Props) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    navigation.navigate('Channel', { channel, followedByUser });
  };

  return (
    <Pressable
      testID="channel-box"
      style={styles.container}
      onPress={handlePress}
    >
      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <Mention />
          <BodyText textType="medium" style={{ marginLeft: 6 }}>
            {channel.name}
          </BodyText>
        </View>
        <CaptionText style={{ marginTop: 4 }}>
          {channel.questions} tehtävää
        </CaptionText>
      </View>
    </Pressable>
  );
};

export default ChannelBox;
