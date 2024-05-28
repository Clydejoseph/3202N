import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import CardDash from './CardDash';

describe('CardDash Component', () => {
  it('renders the title and count correctly', () => {
    const title = 'Test Title';
    const count = 42;
    const orientation = 'column';

    render(<CardDash title={title} count={count} orientation={orientation} />);

    // Check if the title is rendered correctly
    const titleElement = screen.getByText(title.toUpperCase());
    expect(titleElement).toBeInTheDocument();

    // Check if the count is rendered correctly
    const countElement = screen.getByText(count.toString());
    expect(countElement).toBeInTheDocument();
  });

  it('renders Divider when orientation is row', () => {
    const title = 'Test Title';
    const count = 42;
    const orientation = 'row';

    render(<CardDash title={title} count={count} orientation={orientation} />);

    // Check if the Divider is rendered when orientation is row
    const dividerElement = screen.getByRole('separator');
    expect(dividerElement).toBeInTheDocument();
  });

  it('does not render Divider when orientation is column', () => {
    const title = 'Test Title';
    const count = 42;
    const orientation = 'column';

    render(<CardDash title={title} count={count} orientation={orientation} />);

    // Check if the Divider is not rendered when orientation is column
    const dividerElement = screen.queryByRole('separator');
    expect(dividerElement).not.toBeInTheDocument();
  });
});
