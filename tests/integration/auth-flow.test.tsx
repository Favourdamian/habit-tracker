import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SignupForm from '../../src/components/auth/SignupForm';
import LoginForm from '../../src/components/auth/LoginForm';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

describe('auth flow', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('submits the signup form and creates a session', async () => {
    render(<SignupForm />);
    
    fireEvent.change(screen.getByTestId('auth-signup-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-signup-password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('auth-signup-submit'));
    
    await waitFor(() => {
      const session = localStorage.getItem('habit-tracker-session');
      expect(session).not.toBeNull();
      expect(JSON.parse(session!).email).toBe('test@example.com');
    });
  });

  it('shows an error for duplicate signup email', async () => {
    localStorage.setItem('habit-tracker-users', JSON.stringify([{ id: '1', email: 'test@example.com', password: '123', createdAt: '' }]));
    
    render(<SignupForm />);
    
    fireEvent.change(screen.getByTestId('auth-signup-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-signup-password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('auth-signup-submit'));
    
    expect(await screen.findByText('User already exists')).toBeInTheDocument();
  });

  it('submits the login form and stores the active session', async () => {
    localStorage.setItem('habit-tracker-users', JSON.stringify([{ id: '1', email: 'test@example.com', password: 'password123', createdAt: '' }]));
    
    render(<LoginForm />);
    
    fireEvent.change(screen.getByTestId('auth-login-email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('auth-login-password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByTestId('auth-login-submit'));
    
    await waitFor(() => {
      const session = localStorage.getItem('habit-tracker-session');
      expect(session).not.toBeNull();
      expect(JSON.parse(session!).email).toBe('test@example.com');
    });
  });

  it('shows an error for invalid login credentials', async () => {
    render(<LoginForm />);
    
    fireEvent.change(screen.getByTestId('auth-login-email'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByTestId('auth-login-password'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByTestId('auth-login-submit'));
    
    expect(await screen.findByText('Invalid email or password')).toBeInTheDocument();
  });
});
