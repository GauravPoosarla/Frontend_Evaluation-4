// write tests for this component

import React from 'react';
import { render, screen } from '@testing-library/react';
import AddNewEntry from '../AddNewEntry';

describe('AddNewEntry', () => {
  it('renders AddNewEntry component', () => {
    render(<AddNewEntry />);
    screen.toMatchSnapshot();
  });
});
