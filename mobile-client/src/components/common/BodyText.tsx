import * as React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  regular: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.43,
    lineHeight: 22,
  },
  medium: {
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: -0.43,
    lineHeight: 22,
  },
  semibold: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.43,
    lineHeight: 22,
  },
  bold: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.43,
    lineHeight: 22,
  },
});

type BodyTextProps = {
  textType?: 'bold' | 'semibold' | 'medium' | 'regular';
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
    case 'semibold':
      textStyle = styles.semibold;
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
  textType: undefined,
  style: {},
};

export default BodyText;
