import * as React from 'react';
import SideBar from './SideBar';
import { render } from '@testing-library/react';

describe('render of the component', () => {
  test('should render a sidebar', () => {
    render(<SideBar />);
  });
});
