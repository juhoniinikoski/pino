import * as React from 'react';
import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import QuestionForm from './QuestionForm';

/* eslint-disable no-unused-expressions */

const fieldMock = {};
const metaMock = {};
const helperMock = {};

jest.mock('formik', () => ({
  ...jest.requireActual('formik'),
  useField: jest.fn(() => {
    return [fieldMock, metaMock, helperMock];
  }),
}));

const mockValues = {
  question: "testiquestion",
  answers: ['ans1', 'ans2'],
  tags: [
    {
      id: '12345',
      name: 'Tagi 1'
    },
    {
      id: '123456',
      name: 'Tagi 2'
    }
  ]
}

describe('rendering tests', () => {
  let component: RenderAPI;

  const onSubmit = jest.fn();

  beforeEach(() => {
    component = render(<QuestionForm values={mockValues} onSubmit={onSubmit} />);
  });

  it('should render placeholders', async () => {
    await waitFor(() => {
      expect(component.getByPlaceholderText('Kirjoita kysymys tähän...'))
        .toBeTruthy;
      expect(component.getByPlaceholderText('Anna 1. ratkaisuvaihtoehto tähän'))
        .toBeTruthy;
      expect(component.getByPlaceholderText('Anna 2. ratkaisuvaihtoehto tähän'))
        .toBeTruthy;
    });
  });

  it('renders tag carousel', async () => {
    await waitFor(() => {
      expect(component.getByTestId('tag-carousel')).toBeTruthy
      expect(component.getByText(`# ${mockValues.tags[0].name}`)).toBeTruthy
    })
  });

  it.todo('adds new answerbox');

  it.todo('should render a button for adding answer');
});
