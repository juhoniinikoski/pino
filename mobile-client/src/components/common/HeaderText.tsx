import * as React from 'react';
import { FunctionComponent } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  large: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  regular: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  small: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  smallest: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});

type HeaderTextProps = {
  textType?: 'large' | 'regular' | 'small' | 'smallest';
  style?: TextStyle | TextStyle[];
};

const HeaderText: FunctionComponent<HeaderTextProps> = ({
  children,
  textType,
  style,
}) => {
  let textStyle: TextStyle;
  switch (textType) {
    case 'large':
      textStyle = styles.large;
      break;
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'small':
      textStyle = styles.small;
      break;
    case 'smallest':
      textStyle = styles.smallest;
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
  textType: 'regular',
  style: {},
};

export default HeaderText;
