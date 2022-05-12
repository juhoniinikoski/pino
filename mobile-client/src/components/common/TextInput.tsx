import * as React from 'react';
import { TextInput as NativeTextInput, ViewStyle } from 'react-native';

interface Props {
  style?: ViewStyle;
  multiline: boolean;
  placeholder: string;
  placeholderTextColor: string;
  onChangeText: (value: string) => void;
  onBlur: () => void;
  value: string;
  error: string | false | undefined;
  secureTextEntry: boolean;
  autoFocus: boolean;
}

const TextInput = ({ style, multiline, placeholder, ...props }: Props) => {
  return (
    <NativeTextInput
      autoCorrect={false}
      autoCapitalize="none"
      style={style}
      placeholder={placeholder}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
      multiline={multiline}
    />
  );
};

export default TextInput;
