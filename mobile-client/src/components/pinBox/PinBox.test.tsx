import * as React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react-native';
import PinBox from './PinBox';

/* eslint-disable no-unused-expressions */

const mockProps = {
  channel: {
    id: 'kauppikseen1234',
    name: 'kauppikseen',
    followedBy: 2,
    questions: 4,
    updatedAt: new Date('2022-05-07T10:50:58.983Z'),
    createdAt: new Date('2022-05-07T10:50:58.983Z'),
  },
  followedByUser: true,
};

const mockProps2 = {
  channel: {
    id: 'kauppikseen1234',
    name: 'kauppikseen',
    followedBy: 2,
    questions: 4,
    updatedAt: new Date('2022-05-07T10:50:58.983Z'),
    createdAt: new Date('2022-05-07T10:50:58.983Z'),
  },
  followedByUser: false,
};

describe('rendering tests', () => {
  test('should render a follower count', async () => {
    const { getByText } = render(
      <MockedProvider>
        <PinBox
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
        <PinBox
          channel={mockProps.channel}
          followedByUser={mockProps.followedByUser}
        />
      </MockedProvider>,
    );
    const element = getByTestId('pin');
    expect(element.props.style[0].color).toEqual('white');
  });

  test('should not be colored by if it is not followed by user', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <PinBox
          channel={mockProps2.channel}
          followedByUser={mockProps2.followedByUser}
        />
      </MockedProvider>,
    );
    const element = getByTestId('pin');
    expect(element.props.style[0].color).toEqual('black');
  });
});
