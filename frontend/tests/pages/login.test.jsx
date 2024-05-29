import { render, fireEvent, waitFor } from '@testing-library/react';
import { expect, test, vi } from '@vitest/vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../src/App'; 

test('login allows input and redirects on success', async () => {

  const mockNavigate = vi.fn();

 
  vi.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  
  const { getByPlaceholderText, getByRole } = render(
    <Router>
      <App />
    </Router>
  );
  
  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByRole('button', { name: 'Login' });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
  fireEvent.click(loginButton);

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});
