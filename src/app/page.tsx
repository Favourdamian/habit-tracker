'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '../components/shared/SplashScreen';
import { getSession } from '../lib/storage';

export default function Home() {
  const router = useRouter();
  const [showSplash] = useState(true);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('Service Worker registration failed', err);
      });
    }

    const timer = setTimeout(() => {
      const session = getSession();
      if (session) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }, 1000); // Between 800ms and 2000ms

    return () => clearTimeout(timer);
  }, [router]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return null;
}
