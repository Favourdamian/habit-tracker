import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DashboardPage from '../../src/app/dashboard/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));

describe('habit form', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: 'u1', email: 'test@example.com' }));
  });

  it('shows a validation error when habit name is empty', async () => {
    render(<DashboardPage />);
    
    const createButton = await screen.findByTestId('create-habit-button');
    fireEvent.click(createButton);
    fireEvent.click(screen.getByTestId('habit-save-button'));
    
    expect(await screen.findByText('Habit name is required')).toBeInTheDocument();
  });

  it('creates a new habit and renders it in the list', async () => {
    render(<DashboardPage />);
    
    const createButton = await screen.findByTestId('create-habit-button');
    fireEvent.click(createButton);
    fireEvent.change(screen.getByTestId('habit-name-input'), { target: { value: 'New Habit' } });
    fireEvent.click(screen.getByTestId('habit-save-button'));
    
    expect(await screen.findByTestId('habit-card-new-habit')).toBeInTheDocument();
  });

  it('edits an existing habit and preserves immutable fields', async () => {
    const createdAt = new Date().toISOString();
    const habit = {
      id: 'h1',
      userId: 'u1',
      name: 'Old Habit',
      description: 'Old Desc',
      frequency: 'daily',
      createdAt,
      completions: []
    };
    localStorage.setItem('habit-tracker-habits', JSON.stringify([habit]));
    
    render(<DashboardPage />);
    
    const editButton = await screen.findByTestId('habit-edit-old-habit');
    fireEvent.click(editButton);
    fireEvent.change(screen.getByTestId('habit-name-input'), { target: { value: 'Updated Habit' } });
    fireEvent.click(screen.getByTestId('habit-save-button'));
    
    expect(await screen.findByTestId('habit-card-updated-habit')).toBeInTheDocument();
    
    const savedHabits = JSON.parse(localStorage.getItem('habit-tracker-habits')!);
    expect(savedHabits[0].id).toBe('h1');
    expect(savedHabits[0].createdAt).toBe(createdAt);
  });

  it('deletes a habit only after explicit confirmation', async () => {
    localStorage.setItem('habit-tracker-habits', JSON.stringify([{
      id: 'h1',
      userId: 'u1',
      name: 'Delete Me',
      description: '',
      frequency: 'daily',
      createdAt: '',
      completions: []
    }]));
    
    render(<DashboardPage />);
    
    const deleteButton = await screen.findByTestId('habit-delete-delete-me');
    fireEvent.click(deleteButton);
    expect(screen.getByTestId('confirm-delete-button')).toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('confirm-delete-button'));
    expect(screen.queryByTestId('habit-card-delete-me')).not.toBeInTheDocument();
  });

  it('toggles completion and updates the streak display', async () => {
    localStorage.setItem('habit-tracker-habits', JSON.stringify([{
      id: 'h1',
      userId: 'u1',
      name: 'Streak Habit',
      description: '',
      frequency: 'daily',
      createdAt: '',
      completions: []
    }]));
    
    render(<DashboardPage />);
    
    const streakDisplay = await screen.findByTestId('habit-streak-streak-habit');
    expect(streakDisplay).toHaveTextContent('0');
    
    fireEvent.click(screen.getByTestId('habit-complete-streak-habit'));
    expect(streakDisplay).toHaveTextContent('1');
    
    fireEvent.click(screen.getByTestId('habit-complete-streak-habit'));
    expect(streakDisplay).toHaveTextContent('0');
  });
});
