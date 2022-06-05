import * as React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  regular: {
    fontSize: 20,
    fontWeight: '400',
    letterSpacing: -0.45,
    lineHeight: 25,
  },
  medium: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: -0.45,
    lineHeight: 25,
  },
  semibold: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.45,
    lineHeight: 25,
  },
  bold: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.45,
    lineHeight: 25,
  },
});

type HeaderTextProps = {
  textType?: 'bold' | 'semibold' | 'medium' | 'regular';
  style?: TextStyle | TextStyle[];
};

const HeaderText: FunctionComponent<HeaderTextProps> = ({
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

HeaderText.defaultProps = {
  textType: undefined,
  style: {},
};

export default HeaderText;
