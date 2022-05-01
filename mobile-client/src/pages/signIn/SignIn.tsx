import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../../contexts/auth';

const SignIn = () => {
  const auth = useAuth();

  const handlePress = async () => {
    await auth.signIn('juhoniinikoski', 'password');
  };

  return (
    <View>
      <Text>SignIn</Text>
      <Pressable onPress={handlePress}>
        <Text>Paina tästä kirjautuksesi</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
