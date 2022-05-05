import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import ChannelBox from './ChannelBox';

/* eslint-disable no-unused-expressions */

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const testProps = {
  id: 'kauppikseen1234',
  name: 'kauppikseen',
  followedBy: 2,
  questions: 4,
};

describe('box rendering', () => {
  test('should render a name of channel', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <ChannelBox channel={testProps} />
      </NavigationContainer>,
    );
    return expect(getByText('kauppikseen')).toBeTruthy;
  });

  test('should render number of followers of channel', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <ChannelBox channel={testProps} />
      </NavigationContainer>,
    );
    return expect(getByText('2')).toBeTruthy;
  });
});

describe('block press gestures', () => {
  test('navigate function is called when pressing the box', async () => {
    const component = (
      <NavigationContainer>
        <ChannelBox channel={testProps} />
      </NavigationContainer>
    );

    const { findByText } = render(component);
    const toClick = await findByText('kauppikseen');

    fireEvent(toClick, 'press');

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  test.todo('should follow the channel when clicked the small box');
});
