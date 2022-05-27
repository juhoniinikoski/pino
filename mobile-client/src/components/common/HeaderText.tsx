import * as React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  regular: {
    fontSize: 22,
    fontWeight: '400',
    letterSpacing: -0.26,
    lineHeight: 34,
  },
  medium: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: -0.26,
    lineHeight: 34,
  },
  semibold: {
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: -0.26,
    lineHeight: 34,
  },
  bold: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.26,
    lineHeight: 34,
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
