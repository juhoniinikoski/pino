import { Pressable, StyleSheet, View } from 'react-native';
import { Entypo, Octicons } from '@expo/vector-icons';
import * as React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BodyText from '../common/BodyText';
import { Channel } from '../../utils/types';
import { LibraryStackParamList } from '../../navigation/AppTab';
import CaptionText from '../common/CaptionText';

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
          <Octicons
            iconStyle={{}}
            style={{ marginTop: 2 }}
            name="mention"
            size={16}
            color="black"
          />
          <BodyText textType="medium" style={{ marginLeft: 6 }}>
            {channel.name}
          </BodyText>
        </View>
        <CaptionText style={{ marginTop: 4 }}>
          {channel.questions} tehtävää
        </CaptionText>
      </View>
      <Entypo name="pin" size={20} color="#DADADA" />
    </Pressable>
  );
};

export default ChannelBox;
