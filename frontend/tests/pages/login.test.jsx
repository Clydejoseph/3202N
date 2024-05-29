import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for testing with routing

// Import your App component
import App from '../../src/App.jsx'; 

// Mock (optional) - comment out if using browser navigation during testing
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('user can input email and password, and login redirects to dashboard', async () => {
  // Render the App component with mocked useNavigate (optional)
  const mockNavigate = jest.fn(); // For testing redirection without actual navigation
  const { getByLabelText, getByRole } = render(
    <BrowserRouter>
      <App navigate={mockNavigate} />
    </BrowserRouter>
  );

  // Find email and password input fields and button
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  const loginButton = getByRole('button', { name: 'Login' });

  // Simulate user input for email and password
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Simulate clicking the login button
  fireEvent.click(loginButton);

  // Assert successful redirection (replace with expected redirect path if different)
  expect(mockNavigate).toHaveBeenCalledWith('/dashboard'); // Using mocked navigate

});
