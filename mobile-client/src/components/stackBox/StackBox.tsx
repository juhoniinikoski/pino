import { Pressable, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Stack } from '../../utils/types';
import BodyText from '../common/BodyText';
import { LibraryStackParamList } from '../../navigation/LibraryStack';
import TagBox from '../tagBox/TagBox';
import CaptionText from '../common/CaptionText';
import Verified from '../../assets/icons/verified.svg';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    marginTop: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C8E1FF',
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
            <Verified />
            <BodyText textType="medium" style={{ marginLeft: 6 }}>
              {}
              {stack.name}
            </BodyText>
          </View>
          <CaptionText style={{ marginTop: 4, marginBottom: 8 }}>
            {stack.questions} tehtävää
          </CaptionText>
        </View>
      </View>
      <View>
        {stack.tags.map(t => (
          <TagBox key={t.id} tag={t} />
        ))}
      </View>
    </Pressable>
  );
};

export default StackBox;
