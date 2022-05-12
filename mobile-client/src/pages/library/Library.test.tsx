import * as React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import { GET_FOLLOWED } from '../../graphql/queries';
import Library from './Library';

jest.useFakeTimers();

/* eslint-disable no-unused-expressions */

const mocks = [
  {
    request: {
      query: GET_FOLLOWED,
    },
    result: {
      data: [
        {
          node: {
            id: 'DIA20221234channel',
            name: 'DIA2022',
            followedBy: 1,
            questions: 1,
            connectionDate: '2022-05-11T10:36:25.877Z',
          },
          cursor: 'WzE2NTIyNjUzODU4NzcsIkRJQTIwMjIxMjM0Y2hhbm5lbCJd',
        },
        {
          node: {
            id: 'DIA20221234stack',
            name: 'DIA2022',
            followedBy: 1,
            questions: 0,
            connectionDate: '2022-05-11T10:36:25.877Z',
            tags: [
              {
                id: 'DIA20221234channel',
                name: 'DIA2022',
              },
            ],
          },
          cursor: 'WzE2NTIyNjUzODU4NzcsIkRJQTIwMjIxMjM0c3RhY2siXQ==',
        },
        {
          node: {
            id: 'kauppikseen1234channel',
            name: 'kauppikseen',
            followedBy: 2,
            questions: 4,
            connectionDate: '2022-05-11T09:36:25.925Z',
          },
          cursor: 'WzE2NTIyNjE3ODU5MjUsImthdXBwaWtzZWVuMTIzNGNoYW5uZWwiXQ==',
        },
      ],
    },
  },
];

describe('rendering tests', () => {
  let component: RenderAPI;

  beforeEach(() => {
    component = render(
      <MockedProvider mocks={mocks} addTypename>
        <Library />
      </MockedProvider>,
    );
  });

  it('should show loading indicator when data is initially loaded', async () => {
    await waitFor(() => {
      expect(component.getByText('Loading')).toBeTruthy;
    });
  });

  it('should render the flatlist when not loading', async () => {
    await waitFor(async () => {
      expect(component.getAllByTestId('library-list').length).toBe(1);
      expect(component).toMatchSnapshot();
    });
  });
});
