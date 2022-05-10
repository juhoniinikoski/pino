import * as React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import { GET_CHANNELS, GET_STACKS } from '../../graphql/queries';
import Library from './Library';

jest.useFakeTimers()

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
      ],
    },
  },
  {
    request: {
      query: GET_STACKS,
    },
    result: {
      data: [
        {
          cursor:
            'WyIyMDIyLTA1LTA3VDEyOjUwOjU5LjE3N1oiLCJrYXVwcGlzLXloMTIzNCJd',
          node: {
            id: 'kauppis-yh1234',
            name: 'kauppis-yh',
            public: false,
            questions: 3,
            followedBy: 0,
            createdById: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
            createdAt: '2022-05-07T12:50:59.177Z',
            updatedAt: '2022-05-07T12:50:59.177Z',
            tags: [],
          },
        },
        {
          cursor: 'WyIyMDIyLTA1LTA3VDExOjUwOjU5LjE3N1oiLCJESUEyMDIyMTIzNCJd',
          node: {
            id: 'DIA20221234',
            name: 'DIA2022',
            public: false,
            questions: 0,
            followedBy: 0,
            createdById: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
            createdAt: '2022-05-07T11:50:59.177Z',
            updatedAt: '2022-05-07T11:50:59.177Z',
            tags: [],
          },
        },
        {
          cursor:
            'WyIyMDIyLTA1LTA3VDEwOjUwOjU5LjE3N1oiLCJ5b21hdGVtYXRpaWtrYTEyMzQiXQ==',
          node: {
            id: 'yomatematiikka1234',
            name: 'yomatematiikka',
            public: false,
            questions: 0,
            followedBy: 0,
            createdById: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
            createdAt: '2022-05-07T10:50:59.177Z',
            updatedAt: '2022-05-07T10:50:59.177Z',
            tags: [],
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
      <MockedProvider mocks={mocks} addTypename={true}>
        <Library />
      </MockedProvider>,
    );
  });

  test('should show loading indicator when data is initially loaded', async () => {
    await waitFor(() => {
      expect(component.getByText('Loading')).toBeTruthy;
    })
  });
  
  test('should render the flatlist when not loading', async () => {
    await waitFor(async () => {
      expect(component.getAllByTestId('library-list').length).toBe(1);
      expect(component).toMatchSnapshot();
    });
  })
});
