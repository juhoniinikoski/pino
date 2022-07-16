import * as React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MockedProvider } from '@apollo/client/testing';
import QuestionBox from './QuestionBox';

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
  collections: [
    {
      __typename: 'Channel',
      id: 'DIA20221234channel',
      name: 'DIA2022',
    },
  ],
};

describe('testing render', () => {
  it('should render a question', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <MockedProvider>
          <QuestionBox
            question={testProps}
            collectionId="kauppikseenchannel1234"
            index={0}
          />
        </MockedProvider>
      </NavigationContainer>,
    );
    expect(getByText(testProps.question)).toBeTruthy;
  });

  it.todo('displays tags');
  it.todo('navigates to the tag page');
  it.todo('displays likes');
});

describe('interactions', () => {
  it.todo('open full screen view when clicked');
});
