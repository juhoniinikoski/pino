import * as React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import ConfirmAdd from './ConfirmAdd';

const createTestProps = (props: Record<string, unknown>) => ({
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params: {
      initialValues: {
        answers: ['vastaus1', 'vastaus2', 'vastaus3'],
        question: 'Testikysymys',
        tags: [
          {
            id: 'kauppikseen1234channel',
            name: 'kauppikseen',
          },
        ],
      },
    },
  },
  ...props,
});

describe('render', () => {
  let component: RenderAPI;
  let props: any;

  beforeEach(() => {
    props = createTestProps({});
    component = render(
      <ConfirmAdd route={props.route} navigation={props.navigation} />,
    );
  });

  it('renders question given as parameter', () => {
    expect(
      component.getByText(props.route.params.initialValues.question),
    ).toBeTruthy();
  });

  it('renders answers given as parameter', () => {
    expect(
      component.getByText(props.route.params.initialValues.answers[0]),
    ).toBeTruthy();
    expect(
      component.getByText(props.route.params.initialValues.answers[1]),
    ).toBeTruthy();
    expect(
      component.getByText(props.route.params.initialValues.answers[2]),
    ).toBeTruthy();
  });

  it.todo('renders all tags given as parameter');
  it.todo(
    'renders confirm button as undefined when correct answer is not selected',
  );
  it.todo('renders confirm button as defined when correct answer is selected');
});
