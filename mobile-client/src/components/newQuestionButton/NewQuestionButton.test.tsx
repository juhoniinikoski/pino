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
  it('should render the button', async () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <NewQuestionButton collectionId="kauppikseen1234channel" />
      </NavigationContainer>,
    );
    expect(getByTestId('button')).toBeTruthy;
  });
});

describe('interactions', () => {
  it.todo('should open the new question modal when pressed');
});
