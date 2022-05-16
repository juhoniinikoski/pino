import * as React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  regular2: {
    fontSize: 11,
    fontWeight: '400',
    letterSpacing: 0.06,
    lineHeight: 13,
  },
  medium2: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.06,
    lineHeight: 13,
  },
  semibold2: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.06,
    lineHeight: 13,
  },
  bold2: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.06,
    lineHeight: 13,
  },
  regular1: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 16,
  },
  medium1: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
  },
  semibold1: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 16,
  },
  bold1: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 16,
  },
});

type CaptionTextProps = {
  textType?:
    | 'bold1'
    | 'semibold1'
    | 'medium1'
    | 'regular1'
    | 'bold2'
    | 'semibold2'
    | 'medium2'
    | 'regular2';
  style?: TextStyle | TextStyle[];
};

const CaptionText: FunctionComponent<CaptionTextProps> = ({
  children,
  textType,
  style,
}) => {
  let textStyle: TextStyle;
  switch (textType) {
    case 'bold1':
      textStyle = styles.bold1;
      break;
    case 'semibold1':
      textStyle = styles.semibold1;
      break;
    case 'medium1':
      textStyle = styles.medium1;
      break;
    case 'bold2':
      textStyle = styles.bold2;
      break;
    case 'semibold2':
      textStyle = styles.semibold2;
      break;
    case 'medium2':
      textStyle = styles.medium2;
      break;
    case 'regular2':
      textStyle = styles.regular2;
      break;
    default:
      textStyle = styles.regular1;
      break;
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return <Text style={[textStyle, { ...passedStyles }]}>{children}</Text>;
};

CaptionText.defaultProps = {
  textType: undefined,
  style: {},
};

export default CaptionText;
