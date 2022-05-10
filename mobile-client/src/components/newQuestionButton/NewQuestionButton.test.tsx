import * as React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import NewQuestionButton from './NewQuestionButton';

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

describe('render tests', () => {
  test('should render the button', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <NewQuestionButton channelId="kauppikseen1234" />
      </NavigationContainer>,
    );
    expect(getByTestId('button')).toBeTruthy;
  });
});

describe('interactions', () => {
  test.todo('should open the new question modal when pressed');
});
