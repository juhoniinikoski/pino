import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChannelBox from './ChannelBox';

const testProps = {
  id: 'kauppikseen1234',
  name: 'kauppikseen',
  followedBy: 2,
  questions: 4,
};

describe('box rendering', () => {
  it('should render a name of channel', async () => {
    const { getByText } = render(<ChannelBox channel={testProps} />);
    expect(getByText('kauppikseen')).toBeTruthy;
    expect(getByText('2')).toBeTruthy;
    expect(getByText('4')).toBeTruthy;
  });

  it.todo('should render number of followers of channel');
});

describe('block press gestures', () => {
  test.todo('should navigte to channel main page when clicked the box');
  test.todo('should follow the channel when clicked the small box');
});
