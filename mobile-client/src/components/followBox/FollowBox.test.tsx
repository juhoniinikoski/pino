import * as React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react-native';
import FollowBox from './FollowBox';

/* eslint-disable no-unused-expressions */

const mockProps = {
  channel: {
    id: 'kauppikseen1234',
    name: 'kauppikseen',
    followedBy: 2,
    questions: 4,
  },
  followedByUser: true,
};

const mockProps2 = {
  channel: {
    id: 'kauppikseen1234',
    name: 'kauppikseen',
    followedBy: 2,
    questions: 4,
  },
  followedByUser: false,
};

describe('rendering tests', () => {
  test('should render a follower count', async () => {
    const { getByText } = render(
      <MockedProvider>
        <FollowBox
          channel={mockProps.channel}
          followedByUser={mockProps.followedByUser}
        />
      </MockedProvider>,
    );
    expect(getByText('2')).toBeTruthy;
  });
  test('should be colored by if its followed by user', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <FollowBox
          channel={mockProps.channel}
          followedByUser={mockProps.followedByUser}
        />
      </MockedProvider>,
    );
    const element = getByTestId('icon');
    expect(element.props.style[0].color).toEqual('red');
  });

  test('should not be colored by if it is not followed by user', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <FollowBox
          channel={mockProps2.channel}
          followedByUser={mockProps2.followedByUser}
        />
      </MockedProvider>,
    );
    const element = getByTestId('icon');
    expect(element.props.style[0].color).toEqual('black');
  });
});
