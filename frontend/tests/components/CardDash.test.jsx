import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import CardDash from '../../src/component/CardDash.jsx'; 

describe('CardDash Component', () => {
  test('renders correctly with default props', () => {
    render(<CardDash title="My Card" count={0} />); 

    
    expect(screen.getByRole('heading', { name: /My Card/i })).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // Assuming count is rendered as text
  });
});
