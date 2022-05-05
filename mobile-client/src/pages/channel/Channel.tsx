import { Text, StyleSheet, FlatList, View } from 'react-native';
import * as React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Layout from '../../components/layout/Layout';
import { ChannelStackParamList } from '../../navigation/AppTab';
import useChannelQuestions from '../../hooks/useChannelQuestions';
import { Question } from '../../utils/types';
import parseNodes from '../../utils/parseNodes';
import QuestionBox from '../../components/questionBox/QuestionBox';

const styles = StyleSheet.create({
  loadingText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  header: {
    marginTop: 16,
    marginBottom: 8,
  },
});

type Props = NativeStackScreenProps<ChannelStackParamList, 'Channel'>;

const ChannelPage = ({ route }: Props) => {
  const { questions: raw, loading } = useChannelQuestions(
    route.params.channel.id,
  );
  const questions = raw ? parseNodes<Question>(raw) : [];

  const SeparatorItem = React.useCallback(
    () => (
      <View
        style={{
          marginTop: 24,
          borderBottomColor: 'grey',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    ),
    [],
  );

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
        keyExtractor={item => item.id}
        ItemSeparatorComponent={SeparatorItem}
        renderItem={({ item }) => <QuestionBox question={item} />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </Layout>
  );
};

export default ChannelPage;
