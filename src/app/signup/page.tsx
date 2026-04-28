'use client';
import SignupForm from '../../components/auth/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 transition-colors duration-500">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 animate-fade-in">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center shadow-xl shadow-accent/20 mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Start Your Journey</h1>
          <p className="text-muted mt-2 font-medium">Join HabitFlow and master your routine</p>
        </div>
        
        <div className="bg-card border border-card-border p-8 rounded-3xl shadow-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <SignupForm />
          
          <div className="mt-8 pt-6 border-t border-card-border text-center">
            <p className="text-muted font-medium">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:text-primary-hover font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

