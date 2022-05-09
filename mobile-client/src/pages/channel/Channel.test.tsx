import { MockedProvider } from '@apollo/client/testing';
import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import React from 'react';
import { GET_QUESTIONS } from '../../graphql/queries';
import ChannelPage from './Channel';

/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

const mocks = [
  {
    request: {
      query: GET_QUESTIONS,
      variables: {
        channelId: 'kauppikseen1234',
      },
    },
    result: {
      data: [
        {
          cursor: 'WyIyMDIyLTA1LTA3VDEyOjUwOjU4Ljk4MloiLCIxIl0=',
          node: {
            id: '1',
            question: 'Mikä seuraavista väittämistä ei pidä paikkaansa?',
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
            updatedAt: '2022-05-07T12:50:58.982Z',
            createdAt: '2022-05-07T12:50:58.982Z',
          },
        },
        {
          cursor: 'WyIyMDIyLTA1LTA3VDExOjUwOjU4Ljk4M1oiLCIyIl0=',
          node: {
            id: '2',
            question: 'Mikä seuraavista väittämistä pitää paikkansa?',
            answers: [
              {
                answer:
                  'Rooman imperiumi ylsi laajimmillaan pohjoisessa Itämerelle ja etelässä Egyptiin. Etelässä Rooman imperiumin vaikutusalueeseen kuului lähes koko Pohjois-Afrikan rannikko.',
                correct: false,
                id: '4',
              },
              {
                answer:
                  'Kreikan valtakausi Välimeren alueen suurvaltana alkoi Rooman imperiumin luhistuttua. Kreikkalaiset laajensivat vaikutusaluettaan huomattavasti kauemmas itään, jopa Intiaan saakka.',
                correct: false,
                id: '5',
              },
              {
                answer:
                  'Jokilaaksojen korkeakulttuureissa kehittyi monia nykyisinkin käytössä olevia keksintöjä. Näitä olivat esimerkiksi pyörä ja aura. Myös nykyisen kaltainen ajanlasku kehittyi silloin.',
                correct: true,
                id: '6',
              },
            ],
            updatedAt: '2022-05-07T11:50:58.983Z',
            createdAt: '2022-05-07T11:50:58.983Z',
          },
        },
        {
          cursor: 'WyIyMDIyLTA1LTA3VDEwOjUwOjU4Ljk4M1oiLCIzIl0=',
          node: {
            id: '3',
            question: 'Mikä seuraavista väittämistä pitää paikkansa?',
            answers: [
              {
                answer:
                  'Eri maiden tuotantoon liittyvä työnjako hämärtyi globalisaation myötä 1800-luvulla.',
                correct: false,
                id: '7',
              },
              {
                answer:
                  '1800-luvun lopun tavarakauppaa vauhditti kuljetuskustannusten aleneminen ja kuljetusmahdollisuuksien monipuolistuminen.',
                correct: true,
                id: '8',
              },
              {
                answer:
                  'Globalisaatio ilmenee nykyisin edelleen saman toimialan yritysten maailmanlaajuisena kilpailuna, missä työntekijät jäävät pääasiassa kansainvälisen keskinäisen kilpailun ulkopuolelle.',
                correct: false,
                id: '9',
              },
            ],
            updatedAt: '2022-05-07T10:50:58.983Z',
            createdAt: '2022-05-07T10:50:58.983Z',
          },
        },
        {
          cursor: 'WyIyMDIyLTA1LTA3VDEwOjUwOjU4Ljk4M1oiLCI0Il0=',
          node: {
            id: '4',
            question:
              'Verohallinnon vuonna 2020 keräämien verojen nettokertymät olivat yhteensä 69 217 miljoonaa euroa, joka oli 1 141 miljoonaa euroa (-1,6 %) vähemmän kuin vuonna 2019, mutta enemmän kuin sitä edeltävinä vuosina. Vuonna 2020 kerätyistä veroista 59,5 prosenttia tilitettiin valtiolle ja 34,6 prosenttia kunnille. Muita veronsaajia ovat lisäksi seurakunnat 1,3 prosentin ja Kela 4,6 prosentin osuuksilla. (Lähde: vero.fi)\n\nMikä seuraavista väittämistä pitää paikkaansa?',
            answers: [
              {
                answer:
                  'Kiinteistöveroa peritään, kun kiinteistö vaihtaa omistajaa. Kiinteistövero tilitetään kiinteistön sijaintikunnalle.',
                correct: false,
                id: '10',
              },
              {
                answer:
                  'Henkilöiden tuloverotus on verokertymän kannalta merkittävä. Se tilitetään valtiolle, kunnille ja seurakunnille.',
                correct: true,
                id: '11',
              },
              {
                answer:
                  'Esimerkiksi asunto- ja kiinteistökauppojen yhteydessä perittävä varallisuusvero muodostaa osan valtiolle tilitettävistä veroista.',
                correct: false,
                id: '12',
              },
            ],
            updatedAt: '2022-05-07T10:50:58.983Z',
            createdAt: '2022-05-07T10:50:58.983Z',
          },
        },
      ],
    },
  },
];

const createTestProps = (props: Record<string, unknown>) => ({
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params: {
      channel: {
        followedBy: 2,
        id: 'kauppikseen1234',
        name: 'kauppikseen',
        questions: 4,
      },
    },
  },
  ...props,
});

describe('render tests', () => {
  let component: RenderAPI;
  let props: any;

  beforeEach(() => {
    props = createTestProps({});
    component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChannelPage route={props.route} navigation={props.navigation} />
      </MockedProvider>,
    );
  });

  test('should display a name of the channel', async () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should show loading indicator when questions are loaded', async () => {
    await waitFor(() => {
      expect(component.getByText('Loading')).toBeTruthy;
      expect(component).toMatchSnapshot();
    });
  });

  test('should render a list containing questions succesfully', async () => {
    await waitFor(async () => {
      expect(component.getAllByTestId('question-list').length).toBe(1);
      expect(component).toMatchSnapshot();
    });
  });
});
