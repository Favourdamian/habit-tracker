'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession, saveSession, getHabits, saveHabits } from '../../lib/storage';
import { Habit } from '../../types/habit';
import { Session } from '../../types/auth';
import HabitCard from '../../components/habit/HabitCard';
import HabitForm from '../../components/habit/HabitForm';
import { toggleHabitCompletion as toggleHabitLogic } from '../../lib/habits';

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const currentSession = getSession();
    if (!currentSession) {
      router.replace('/login');
      return;
    }
    setSession(currentSession);
    setHabits(getHabits().filter(h => h.userId === currentSession.userId));
  }, [router]);

  const handleLogout = () => {
    saveSession(null);
    router.replace('/login');
  };

  const handleSaveHabit = (habitData: Partial<Habit>) => {
    if (!session) return;

    const allHabits = getHabits();
    let updatedAllHabits: Habit[];

    if (editingHabit) {
      updatedAllHabits = allHabits.map(h => 
        h.id === editingHabit.id 
          ? { ...h, ...habitData } 
          : h
      );
    } else {
      const newHabit: Habit = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        userId: session.userId,
        name: habitData.name!,
        description: habitData.description || '',
        frequency: habitData.frequency || 'daily',
        createdAt: new Date().toISOString(),
        completions: []
      };
      updatedAllHabits = [...allHabits, newHabit];
    }

    saveHabits(updatedAllHabits);
    setHabits(updatedAllHabits.filter(h => h.userId === session.userId));
    setIsAdding(false);
    setEditingHabit(null);
  };

  const handleDeleteHabit = (id: string) => {
    const allHabits = getHabits();
    const updatedAllHabits = allHabits.filter(h => h.id !== id);
    saveHabits(updatedAllHabits);
    setHabits(updatedAllHabits.filter(h => h.userId === session?.userId));
  };

  const handleToggleCompletion = (id: string, date: string) => {
    const allHabits = getHabits();
    const updatedAllHabits = allHabits.map(h => 
      h.id === id ? toggleHabitLogic(h, date) : h
    );
    saveHabits(updatedAllHabits);
    setHabits(updatedAllHabits.filter(h => h.userId === session?.userId));
  };

  if (!mounted || !session) return null;

  return (
    <main data-testid="dashboard-page" className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Premium Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-card-border/50 px-4 py-3">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">HabitFlow</h1>
              <p className="text-xs text-muted font-medium uppercase tracking-wider">{session.email.split('@')[0]}&apos;s Dashboard</p>
            </div>
          </div>
          <button
            data-testid="auth-logout-button"
            onClick={handleLogout}
            className="flex items-center space-x-2 text-sm font-semibold text-muted hover:text-error transition-colors px-3 py-2 rounded-lg hover:bg-error/5"
          >
            <span>Logout</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-2">Build your ritual.</h2>
            <p className="text-muted text-lg max-w-md">Small steps lead to big changes. Track your daily habits and see your progress grow.</p>
          </div>
          {!isAdding && !editingHabit && (
            <button
              data-testid="create-habit-button"
              onClick={() => setIsAdding(true)}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 animate-fade-in"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add New Habit</span>
            </button>
          )}
        </header>

        <section className="relative">
          {(isAdding || editingHabit) && (
            <div className="mb-12 animate-fade-in">
              <div className="bg-card border border-card-border p-6 rounded-3xl shadow-xl">
                <HabitForm
                  key={editingHabit?.id || 'new'}
                  initialData={editingHabit || undefined}
                  onSave={handleSaveHabit}
                  onCancel={() => {
                    setIsAdding(false);
                    setEditingHabit(null);
                  }}
                />
              </div>
            </div>
          )}

          {habits.length === 0 ? (
            <div data-testid="empty-state" className="text-center py-24 bg-card/50 border-2 border-dashed border-card-border rounded-3xl animate-fade-in">
              <div className="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-muted/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">No habits tracked yet</h3>
              <p className="text-muted mb-8">Start your journey by adding your first habit.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {habits.map(habit => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onEdit={() => setEditingHabit(habit)}
                  onDelete={() => handleDeleteHabit(habit.id)}
                  onComplete={(date) => handleToggleCompletion(habit.id, date)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
