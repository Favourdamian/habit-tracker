'use client';
import React, { useState } from 'react';
import { validateHabitName } from '../../lib/validators';
import { Habit } from '../../types/habit';

interface HabitFormProps {
  initialData?: Habit;
  onSave: (habitData: Partial<Habit>) => void;
  onCancel: () => void;
}

export default function HabitForm({ initialData, onSave, onCancel }: HabitFormProps) {
  const [name, setName] = useState<string>(initialData?.name || '');
  const [description, setDescription] = useState<string>(initialData?.description || '');
  const [frequency, setFrequency] = useState<Habit['frequency']>(initialData?.frequency || 'daily');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateHabitName(name);
    if (!validation.valid) {
      setError(validation.error || 'Invalid name');
      return;
    }
    onSave({ name: validation.value, description, frequency });
  };

  return (
    <form onSubmit={handleSubmit} data-testid="habit-form" className="flex flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-2xl font-bold tracking-tight">
          {initialData ? 'Refine your habit' : 'Define a new ritual'}
        </h3>
        <button 
          type="button" 
          onClick={onCancel}
          className="text-muted hover:text-foreground transition-colors p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="habit-name" className="text-sm font-bold text-muted uppercase tracking-wider px-1">Habit Name</label>
          <input
            id="habit-name"
            data-testid="habit-name-input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="e.g., Morning Meditation"
            autoFocus
            className={`bg-background border border-card-border p-4 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-lg font-medium ${error ? 'border-error ring-1 ring-error/20' : ''}`}
          />
          {error && <p data-testid="habit-error" className="text-error text-xs font-bold px-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="habit-desc" className="text-sm font-bold text-muted uppercase tracking-wider px-1">Description (Optional)</label>
          <textarea
            id="habit-desc"
            data-testid="habit-description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's the goal? Why does this matter?"
            className="bg-background border border-card-border p-4 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[100px] resize-none font-medium"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="habit-freq" className="text-sm font-bold text-muted uppercase tracking-wider px-1">Frequency</label>
          <div className="relative">
            <select
              id="habit-freq"
              data-testid="habit-frequency-select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Habit['frequency'])}
              className="w-full bg-background border border-card-border p-4 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none font-medium"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-[10px] text-muted font-medium px-1 italic">Choose how often you want to track this ritual.</p>
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-4 rounded-2xl font-bold text-muted hover:bg-card-border/30 transition-all border border-card-border"
        >
          Cancel
        </button>
        <button
          data-testid="habit-save-button"
          type="submit"
          className="flex-1 bg-primary hover:bg-primary-hover text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {initialData ? 'Update Habit' : 'Commit to Habit'}
        </button>
      </div>
    </form>
  );
}
