import * as React from 'react';
import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';
import { Formik } from 'formik';
import QuestionForm from './QuestionForm';

/* eslint-disable no-unused-expressions */

const fieldMock = {};
const metaMock = {};
const helperMock = {};

const mockedNavigate = jest.fn();
const mockedOptionSet = jest.fn();

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useField: jest.fn(() => {
    return [fieldMock, metaMock, helperMock];
  }),
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      setOptions: mockedOptionSet,
    }),
  };
});

const mockValues = {
  question: '',
  answers: [
    {
      answer: '',
      correct: false,
    },
    {
      answer: '',
      correct: false,
    },
  ],
  tags: [
    {
      id: '12345',
      name: 'Tagi 1',
    },
    {
      id: '123456',
      name: 'Tagi 2',
    },
  ],
};

describe('rendering tests', () => {
  let component: RenderAPI;

  const onSubmit = jest.fn();

  beforeEach(() => {
    component = render(
      <NavigationContainer>
        <MockedProvider>
          <Formik initialValues={mockValues} onSubmit={onSubmit}>
            <QuestionForm values={mockValues} onSubmit={onSubmit} />
          </Formik>
        </MockedProvider>
      </NavigationContainer>,
    );
  });

  it('renders placeholders', async () => {
    await waitFor(() => {
      expect(component.getByPlaceholderText('Kirjoita kysymys tähän...'))
        .toBeTruthy;
      expect(component.getByPlaceholderText('Ratkaisu 1')).toBeTruthy;
      expect(component.getByPlaceholderText('Ratkaisu 2')).toBeTruthy;
    });
  });
});
