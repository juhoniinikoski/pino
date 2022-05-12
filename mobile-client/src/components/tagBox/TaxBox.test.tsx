import * as React from 'react';
import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import TagBox from './TagBox';

const mockProps = {
  tag: {
    id: 'kauppikseen1234',
    name: 'kauppikseen',
    followedBy: 2,
    questions: 4,
    updatedAt: new Date('2022-05-07T10:50:58.983Z'),
    createdAt: new Date('2022-05-07T10:50:58.983Z'),
  },
};

describe('render', () => {
  let component: RenderAPI;

  beforeEach(() => {
    component = render(<TagBox tag={mockProps.tag} />);
  });

  it('renders a name of tagged channel', async () => {
    await waitFor(() => {
      expect(component.getByText(`# ${mockProps.tag.name}`));
    });
  });
});
