import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import BackButton from '../components/common/BackButton';
import AddQuestion from '../pages/add/AddQuestion';
import ConfirmAdd from '../pages/add/ConfirmAdd';
import { Channel } from '../utils/types';

export type AddModalStackParamList = {
  AddQuestion: { tags?: Channel[] };
  ConfirmAdd: { initialValues: any };
};

const StackNav = createNativeStackNavigator<AddModalStackParamList>();

const AddModal = () => {
  return (
    <StackNav.Navigator
      initialRouteName="AddQuestion"
      screenOptions={{ headerTintColor: 'black', headerBackTitle: '' }}
    >
      <StackNav.Screen
        name="AddQuestion"
        component={AddQuestion}
        options={{
          title: '',
          headerLeft: BackButton,
        }}
      />
      <StackNav.Screen
        name="ConfirmAdd"
        component={ConfirmAdd}
        options={{
          title: '',
          headerLeft: BackButton,
        }}
      />
    </StackNav.Navigator>
  );
};

export default AddModal;
