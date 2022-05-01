import { Text, StyleSheet, FlatList, View } from 'react-native';
import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from '../../components/layout/Layout';
import HeaderText from '../../components/common/HeaderText';
import { ChannelStackParamList } from '../../navigation/AppTab';
import useChannelQuestions from '../../hooks/useChannelQuestions';
import { Question } from '../../utils/types';
import parseNodes from '../../utils/parseNodes';
import QuestionBox from '../../components/box/QuestionBox';

const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  header: {
    marginTop: 16,
    marginBottom: 8,
  },
  separator: {
    flex: 1, 
    borderWidth: 1,
    marginVertical: -1,
    marginLeft: 48,
    borderColor: 'black'
},
});

type Props = NativeStackScreenProps<ChannelStackParamList, 'Channel'>;

const SeparatorItem = () => (
  <View style={styles.separator}/>
)

const ChannelPage = ({ route }: Props) => {
  const { questions: raw, loading } = useChannelQuestions(route.params.channel.id);
  const questions = raw ? parseNodes<Question>(raw) : [];

  if (loading) {
    return (
      <Layout>
        <Text style={styles.loadingText}>Loading</Text>
      </Layout>
    );
  }

  return (
    <Layout>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <QuestionBox question={item} />}
      />
    </Layout>
  );
};

export default ChannelPage;
