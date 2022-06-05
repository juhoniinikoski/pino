import * as React from 'react';
import { useField } from 'formik';
import { TextStyle, ViewStyle } from 'react-native';
import TextInput from './TextInput';
import BodyText from './BodyText';

interface Props {
  name: string;
  style?: ViewStyle | TextStyle;
  placeholder: string;
  color?: string;
}

const FormikTextInput = ({
  name,
  style,
  placeholder,
  color,
  ...props
}: Props) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const notMultiline = ['category', 'password', 'email'];

  return (
    <>
      <TextInput
        placeholderTextColor={color || 'grey'}
        placeholder={placeholder}
        style={style}
        multiline={!notMultiline.find(n => n === name)}
        onChangeText={(value: string) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value || ''}
        error={showError}
        secureTextEntry={name === 'password'}
        autoFocus={name === 'question'}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
      />
      {showError && <BodyText>{meta.error}</BodyText>}
    </>
  );
};

export default FormikTextInput;
