import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import axios from 'axios';
import App from '../../src/App'; 

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login Component within App', () => {
  it('renders correctly', () => {
    render(<App />);
 
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('calls handleLogin on login button click with correct inputs', async () => {
    const mockedResponse = { data: { accessToken: 'fakeAccessToken', refreshToken: 'fakeRefreshToken' } };

    axios.post.mockResolvedValue(mockedResponse);

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Login'));

    expect(axios.post).toHaveBeenCalledWith(`${config.API}/login`, {
      email: 'test@example.com',
      password: 'password123',
    });

    // Wait for async actions to complete
    await screen.findByText('Login');

    expect(localStorage.getItem('accessToken')).toBe('fakeAccessToken');
    expect(localStorage.getItem('refreshToken')).toBe('fakeRefreshToken');
  });

  it('handles login error', async () => {
    axios.post.mockRejectedValue(new Error('Login error'));

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByText('Login'));

    // Wait for async actions to complete
    await screen.findByText('Login');

    expect(console.error).toHaveBeenCalledWith('Login error:', expect.any(Error));
  });
});
