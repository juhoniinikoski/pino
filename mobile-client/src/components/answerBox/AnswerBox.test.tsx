import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Answer } from '../../utils/types';
import AnswerBox from './AnswerBox';

/* eslint-disable no-unused-expressions */

const mockAnswer: Partial<Answer> = {
  id: 'testianswer',
  answer: 'testivastaus',
  correct: false,
};

describe('render tests', () => {
  it('should render an actual question', () => {
    const { getByText, queryByText } = render(
      <AnswerBox answer={mockAnswer} />,
    );
    expect(getByText('testivastaus')).toBeTruthy;
    expect(queryByText('joku muu')).toBeFalsy;
  });
});
