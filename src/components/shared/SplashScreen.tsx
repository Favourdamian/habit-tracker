import React from 'react';

export default function SplashScreen() {
  return (
    <div
      data-testid="splash-screen"
      className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-primary via-primary-hover to-accent text-white overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] opacity-30"></div>
      
      <div className="z-10 flex flex-col items-center animate-fade-in">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-2xl border border-white/30">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
          Habit<span className="text-white/80">Flow</span>
        </h1>
        <p className="mt-4 text-white/60 font-medium tracking-wide uppercase text-sm">Master your routine</p>
      </div>

      <div className="absolute bottom-10 animate-bounce text-white/40">
        <div className="w-1 h-8 bg-white/20 rounded-full"></div>
      </div>
    </div>
  );
}
