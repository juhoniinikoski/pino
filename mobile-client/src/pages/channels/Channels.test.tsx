import * as React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import { GET_CHANNELS } from '../../graphql/queries';
import ChannelsPage from './Channels';

/* eslint-disable no-unused-expressions */

const mocks = [
  {
    request: {
      query: GET_CHANNELS,
    },
    result: {
      data: [
        {
          cursor:
            'WyIyMDIyLTA0LTI4VDA4OjEyOjQ2LjI0MVoiLCJrYXVwcGlrc2VlbjEyMzQiXQ==',
          node: {
            followedBy: 2,
            id: 'kauppikseen1234',
            name: 'kauppikseen',
            questions: 4,
          },
        },
        {
          cursor: 'WyIyMDIyLTA0LTI4VDA3OjEyOjQ2LjI0MVoiLCJESUEyMDIyMTIzNCJd',
          node: {
            followedBy: 1,
            id: 'DIA20221234',
            name: 'DIA2022',
            questions: 1,
          },
        },
        {
          cursor:
            'WyIyMDIyLTA0LTI4VDA2OjEyOjQ2LjI0MVoiLCJ5b2Z5c2lpa2thMTIzNCJd',
          node: {
            followedBy: 0,
            id: 'yofysiikka1234',
            name: 'yofysiikka',
            questions: 0,
          },
        },
        {
          cursor:
            'WyIyMDIyLTA0LTI4VDA2OjEyOjQ2LjI0MVoiLCJ5b21hdGVtYXRpaWtrYTEyMzQiXQ==',
          node: {
            followedBy: 0,
            id: 'yomatematiikka1234',
            name: 'yomatematiikka',
            questions: 0,
          },
        },
        {
          cursor: 'WyIyMDIyLTA0LTI4VDA1OjEyOjQ2LjI0MVoiLCJ0dXRhMTEyMzQiXQ==',
          node: {
            followedBy: 0,
            id: 'tuta11234',
            name: 'tuta1',
            questions: 0,
          },
        },
      ],
    },
  },
];

describe('rendering tests', () => {
  let component: RenderAPI;

  beforeEach(() => {
    component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChannelsPage />
      </MockedProvider>,
    );
  });

  test('renders without error', () => {
    expect(component).toBeDefined;
  });

  test('renders subheaders', async () => {
    expect((await component.findAllByTestId('subheader')).length).toBe(2);
  });

  test('should render lists of channels succesfully', async () => {
    await waitFor(async () => {
      expect(component.getAllByTestId('channels-list').length).toBe(1);
      expect(component).toMatchSnapshot();
    });
  });

  test('should show loading indicator when data is initially loaded', async () => {
    await waitFor(() => {
      expect(component.getByText('Loading')).toBeTruthy;
      expect(component).toMatchSnapshot();
    });
  });
});
