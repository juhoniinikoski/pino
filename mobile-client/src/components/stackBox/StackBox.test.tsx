import * as React from 'react';
import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackBox from './StackBox';

const mockStack = {
  id: 'kauppis-yh1234',
  name: 'kauppis-yh',
  questions: 3,
  public: false,
  createdById: 'bbe42984-051b-4a01-b45d-b8d29c32200c',
  createdAt: new Date('2022-05-07T12:50:59.177Z'),
  updatedAt: new Date('2022-05-07T12:50:59.177Z'),
  followedBy: 0,
  tags: [],
};

describe('rendering tests', () => {
  let component: RenderAPI;

  beforeEach(() => {
    component = render(
      <NavigationContainer>
        <StackBox stack={mockStack} followedByUser />
      </NavigationContainer>,
    );
  });

  it('should display the name of the stack', async () => {
    await waitFor(() => expect(component.getByText('kauppis-yh')).toBeTruthy);
  });

  it('should display the number of questions inside stack', async () => {
    await waitFor(() => expect(component.getByText('3 tehtävää')).toBeTruthy);
  });
});
