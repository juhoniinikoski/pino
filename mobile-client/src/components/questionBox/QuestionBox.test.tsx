import * as React from 'react';
import { render } from '@testing-library/react-native';
import QuestionBox from './QuestionBox';

/* eslint-disable no-unused-expressions */

const testProps = {
  answers: [
    {
      answer:
        'Talouspolitiikalla pyritään edistämään työllisyyttä ja talouskasvua. Yksitalouspolitiikan osa-alue on tulopolitiikka, mistä esimerkkinä on työmarkkinajärjestöjen palkkaneuvottelut.',
      correct: false,
      id: '1',
    },
    {
      answer:
        'Laskusuhdanteessa työttömyyskorvausten ja muiden tulonsiirtojen määrä lisääntyy tyypillisesti. Nämä toimivat osaltaan Suomen valtion harjoittaman rahapolitiikan niin sanottuina automaattisina vakauttajina.',
      correct: true,
      id: '2',
    },
    {
      answer:
        'Finanssipolitiikalla tarkoitetaan julkisen vallan tulojen ja menojen säätelyä. Valtion talousarvio on siten keskeisessä asemassa finanssipolitiikassa.',
      correct: false,
      id: '3',
    },
  ],
  createdAt: new Date('2022-04-28T08:12:46.157Z'),
  createdById: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
  id: '1',
  question: 'Mikä seuraavista väittämistä ei pidä paikkaansa?',
  type: 'multi',
  updatedAt: new Date('2022-04-28T08:12:46.157Z'),
};

describe('testing render', () => {
  it('should render a question and list of answers', async () => {
    const { getByText } = render(<QuestionBox question={testProps} />);
    expect(getByText(testProps.question)).toBeTruthy;
    expect(getByText(testProps.answers[0].answer)).toBeTruthy;
    expect(getByText(testProps.answers[1].answer)).toBeTruthy;
    expect(getByText(testProps.answers[2].answer)).toBeTruthy;
  });
});

describe('interactions', () => {
  it.todo('should open more-menu when clicking three buttons');
});
