import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import BodyText from '../common/BodyText';
import { Channel } from '../../utils/types';
import { ChannelStackParamList } from '../../navigation/AppTab';

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
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
};

type NavigationProps = NativeStackNavigationProp<ChannelStackParamList>;

const ChannelBox = ({ channel }: Props) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    navigation.navigate('Channel', { channel });
  };

  const handleFollow = () => {
    console.log(`painettu seuraamisnappia: ${channel.name}`);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.nameContainer}>
        <MaterialIcons name="tag" size={24} color="black" />
        <BodyText style={{ marginLeft: 2 }}>{channel.name}</BodyText>
      </View>
      <Pressable style={styles.followContainer} onPress={handleFollow}>
        <BodyText style={{ marginRight: 4 }} textType="medium-light">
          {channel.followedBy}
        </BodyText>
        <Ionicons name="heart-outline" size={20} color="black" />
      </Pressable>
    </Pressable>
  );
};

export default ChannelBox;
