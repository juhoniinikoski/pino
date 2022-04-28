import * as React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  bold: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  medium: {
    fontSize: 16,
    fontWeight: '500',
  },
  regular: {
    fontSize: 14,
    fontWeight: '400',
  },
});

type BodyTextProps = {
  textType?: 'bold' | 'medium' | 'regular';
  style?: TextStyle | TextStyle[];
};

const BodyText: FunctionComponent<BodyTextProps> = ({
  children,
  textType,
  style,
}) => {
  let textStyle: TextStyle;
  switch (textType) {
    case 'bold':
      textStyle = styles.bold;
      break;
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'medium':
      textStyle = styles.medium;
      break;
    default:
      textStyle = styles.regular;
      break;
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return <Text style={[textStyle, { ...passedStyles }]}>{children}</Text>;
};

BodyText.defaultProps = {
  textType: 'regular',
  style: {},
};

export default BodyText;
