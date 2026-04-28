import { User, Session } from '../types/auth';
import { Habit } from '../types/habit';

export function getUsers(): User[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem('habit-tracker-users');
    const parsed = item ? JSON.parse(item) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error parsing users from storage', e);
    return [];
  }
}

export function saveUsers(users: User[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('habit-tracker-users', JSON.stringify(users));
  }
}

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem('habit-tracker-session');
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error('Error parsing session from storage', e);
    return null;
  }
}

export function saveSession(session: Session | null) {
  if (typeof window !== 'undefined') {
    if (session) {
      localStorage.setItem('habit-tracker-session', JSON.stringify(session));
    } else {
      localStorage.removeItem('habit-tracker-session');
    }
  }
}

export function getHabits(): Habit[] {
  if (typeof window === 'undefined') return [];
  try {
    const item = localStorage.getItem('habit-tracker-habits');
    const parsed = item ? JSON.parse(item) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error parsing habits from storage', e);
    return [];
  }
}

export function saveHabits(habits: Habit[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('habit-tracker-habits', JSON.stringify(habits));
  }
}
