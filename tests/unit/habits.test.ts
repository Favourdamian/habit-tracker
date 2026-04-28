import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '../../src/lib/habits';
import { Habit } from '../../src/types/habit';

describe('toggleHabitCompletion', () => {
  const mockHabit: Habit = {
    id: '1',
    userId: 'u1',
    name: 'Read',
    description: '',
    frequency: 'daily',
    createdAt: '2023-10-01',
    completions: ['2023-10-14']
  };

  it('adds a completion date when the date is not present', () => {
    const updated = toggleHabitCompletion(mockHabit, '2023-10-15');
    expect(updated.completions).toContain('2023-10-15');
    expect(updated.completions).toHaveLength(2);
  });

  it('removes a completion date when the date already exists', () => {
    const updated = toggleHabitCompletion(mockHabit, '2023-10-14');
    expect(updated.completions).not.toContain('2023-10-14');
    expect(updated.completions).toHaveLength(0);
  });

  it('does not mutate the original habit object', () => {
    const originalCompletions = [...mockHabit.completions];
    toggleHabitCompletion(mockHabit, '2023-10-15');
    expect(mockHabit.completions).toEqual(originalCompletions);
  });

  it('does not return duplicate completion dates', () => {
    const habitWithDupes = { ...mockHabit, completions: ['2023-10-14', '2023-10-14'] };
    const updated = toggleHabitCompletion(habitWithDupes, '2023-10-15');
    const set = new Set(updated.completions);
    expect(set.size).toBe(updated.completions.length);
  });
});
