import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardDash from './CardDash';

describe('CardDash Component', () => {
  test('renders the title and count correctly', () => {
    const title = 'Test Title';
    const count = 42;
    const orientation = 'column';

    render(<CardDash title={title} count={count} orientation={orientation} />);

    // Check title rendered correctly
    const titleElement = screen.getByText(title.toUpperCase());
    expect(titleElement).toBeInTheDocument();

    // Check count rendered correctly
    const countElement = screen.getByText(count.toString());
    expect(countElement).toBeInTheDocument();
  });

  test('renders Divider when orientation is row', () => {
    const title = 'Test Title';
    const count = 42;
    const orientation = 'row';

    render(<CardDash title={title} count={count} orientation={orientation} />);

    // Check Divider is rendered row
    const dividerElement = screen.getByRole('separator');
    expect(dividerElement).toBeInTheDocument();
  });

  test('does not render Divider when orientation is column', () => {
    const title = 'Test Title';
    const count = 42;
    const orientation = 'column';

    render(<CardDash title={title} count={count} orientation={orientation} />);

    // Check if the Divider is not rendered if column
    const dividerElement = screen.queryByRole('separator');
    expect(dividerElement).not.toBeInTheDocument();
  });
});
