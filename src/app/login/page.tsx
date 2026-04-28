'use client';
import LoginForm from '../../components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 transition-colors duration-500">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="text-muted mt-2 font-medium">Continue your journey with HabitFlow</p>
        </div>
        
        <div className="bg-card border border-card-border p-8 rounded-3xl shadow-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <LoginForm />
          
          <div className="mt-8 pt-6 border-t border-card-border text-center">
            <p className="text-muted font-medium">
              New here?{' '}
              <Link href="/signup" className="text-primary hover:text-primary-hover font-bold transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

