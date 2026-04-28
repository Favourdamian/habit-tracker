'use client';
import React, { useState, useEffect } from 'react';
import { Habit } from '../../types/habit';
import { getHabitSlug } from '../../lib/slug';
import { calculateCurrentStreak } from '../../lib/streaks';

interface HabitCardProps {
  habit: Habit;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: (date: string) => void;
}

export default function HabitCard({ habit, onEdit, onDelete, onComplete }: HabitCardProps) {
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(new Date().toISOString().split('T')[0]);
    // eslint-disable-next-line react-hooks/set-state-in-effect
  }, []);

  const slug = getHabitSlug(habit.name);
  
  if (!mounted || !today) {
    return (
      <div className="group relative p-6 bg-card border border-card-border rounded-3xl animate-pulse min-h-[200px]">
        {/* Skeleton state during hydration */}
      </div>
    );
  }

  const streak = calculateCurrentStreak(habit.completions, habit.frequency, today);
  const isCompletedToday = habit.completions.includes(today);

  return (
    <div 
      data-testid={`habit-card-${slug}`} 
      className="group relative p-6 bg-card border border-card-border rounded-3xl habit-card-transition animate-fade-in"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-primary transition-colors">{habit.name}</h3>
            {habit.description && <p className="text-muted text-sm line-clamp-2">{habit.description}</p>}
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.450.385c-.39.232-.821.516-1.268.824a14.95 14.95 0 01-5.965 3.592c-.366.136-.66.407-.81.763L2.046 10.15a1 1 0 00.385 1.45c.232.39.516.821.824 1.268a14.95 14.95 0 013.592 5.965c.136.366.407.66.763.81l1.867.854a1 1 0 001.45-.385c.232-.39.516-.821.824-1.268a14.95 14.95 0 015.965-3.592c.366-.136.66-.407.81-.763l.854-1.867a1 1 0 00-.385-1.45c-.232-.39-.516-.821-.824-1.268a14.95 14.95 0 01-3.592-5.965c-.136-.366-.407-.66-.763-.81l-1.867-.854z" clipRule="evenodd" />
              </svg>
              <span data-testid={`habit-streak-${slug}`}>{streak}</span>
            </div>
            <p className="text-[10px] text-muted font-bold uppercase mt-1 tracking-widest">{habit.frequency} Streak</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-card-border/30 rounded-md text-muted border border-card-border/50">
            {habit.frequency}
          </span>
        </div>
        
        <div className="mt-auto pt-6 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              data-testid={`habit-edit-${slug}`}
              onClick={onEdit}
              className="p-2 text-muted hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
              title="Edit Habit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            {!showDeleteConfirm ? (
              <button
                data-testid={`habit-delete-${slug}`}
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-muted hover:text-error hover:bg-error/5 rounded-xl transition-all"
                title="Delete Habit"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            ) : (
              <div className="flex gap-2 items-center animate-fade-in">
                <button
                  data-testid="confirm-delete-button"
                  onClick={onDelete}
                  className="bg-error text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-error/20"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-muted hover:text-foreground text-xs font-bold px-2"
                >
                  Exit
                </button>
              </div>
            )}
          </div>

          <button
            data-testid={`habit-complete-${slug}`}
            onClick={() => onComplete(today)}
            className={`flex-1 max-w-[140px] px-4 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-lg flex items-center justify-center space-x-2 ${
              isCompletedToday 
                ? 'bg-success text-white shadow-success/20 ring-1 ring-success' 
                : 'bg-primary text-white shadow-primary/20 hover:bg-primary-hover active:scale-95'
            }`}
          >
            {isCompletedToday ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span>Done</span>
              </>
            ) : (
              <span>Mark Today</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
