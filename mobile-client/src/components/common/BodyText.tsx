import * as React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  bold: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.41,
    lineHeight: 22,
    textAlign: 'center',
  },
  medium: {
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: -0.41,
    lineHeight: 22,
    textAlign: 'center',
  },
  regular: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: -0.41,
    lineHeight: 22,
    textAlign: 'center',
  },
  mediumLight: {
    fontSize: 17,
    fontWeight: '300',
    letterSpacing: -0.41,
    lineHeight: 22,
    textAlign: 'center',
  },
});

type BodyTextProps = {
  textType?: 'bold' | 'medium-light' | 'regular';
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
    case 'medium-light':
      textStyle = styles.mediumLight;
      break;
    case 'regular':
      textStyle = styles.regular;
      break;
    default:
      textStyle = styles.medium;
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
