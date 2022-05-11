import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import * as React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BodyText from '../common/BodyText';
import { Channel } from '../../utils/types';
import { LibraryStackParamList } from '../../navigation/AppTab';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4C3C6',
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
    marginLeft: -4,
  },
  followContainer: {
    height: 36,
    backgroundColor: '#EFEFEF',
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
          <MaterialIcons name="tag" size={24} color="black" />
          <BodyText style={{ marginLeft: 2 }}>{channel.name}</BodyText>
        </View>
        <BodyText textType="secondary">{channel.questions} tehtävää</BodyText>
      </View>
      <Entypo name="pin" size={20} color="#DADADA" />
    </Pressable>
  );
};

export default ChannelBox;
