import { Pressable, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Stack } from '../../utils/types';
import BodyText from '../common/BodyText';
import { LibraryStackParamList } from '../../navigation/AppTab';
import TagBox from '../tagBox/TagBox';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    marginTop: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4C3C6',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },
});

interface Props {
  stack: Stack;
  followedByUser: boolean;
}

type NavigationProps = NativeStackNavigationProp<LibraryStackParamList>;

const StackBox = ({ stack, followedByUser }: Props) => {
  const navigation = useNavigation<NavigationProps>();

  const handlePress = () => {
    navigation.navigate('Stack', { stack, followedByUser });
  };

  return (
    <Pressable style={styles.mainContainer} onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.nameContainer}>
            <Ionicons name="layers" size={24} color="black" />
            <BodyText style={{ marginLeft: 2 }}>
              {}
              {stack.name}
            </BodyText>
          </View>
          <BodyText textType="secondary">{stack.questions} tehtävää</BodyText>
        </View>
        <Entypo name="pin" size={20} color="#DADADA" />
      </View>
      <View style={{ marginTop: 4 }}>
        {stack.tags.map(t => (
          <TagBox key={t.id} tag={t} />
        ))}
      </View>
    </Pressable>
  );
};

export default StackBox;
