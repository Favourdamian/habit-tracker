export function calculateCurrentStreak(completions: string[], frequency: 'daily' | 'weekly' | 'monthly' = 'daily', today?: string): number {
  if (!completions || completions.length === 0) return 0;

  const todayStr = today || new Date().toISOString().split('T')[0];
  const uniqueDates = Array.from(new Set(completions)).sort((a, b) => b.localeCompare(a));

  if (!uniqueDates.includes(todayStr)) {
    return 0;
  }

  let streak = 0;
  const todayDate = new Date(todayStr);

  if (frequency === 'daily') {
    for (let i = 0; ; i++) {
      const targetDate = new Date(todayDate);
      targetDate.setDate(targetDate.getDate() - i);
      const targetDateStr = targetDate.toISOString().split('T')[0];

      if (uniqueDates.includes(targetDateStr)) {
        streak++;
      } else {
        break;
      }
    }
  } else if (frequency === 'weekly') {
    // For weekly, we check if there's at least one completion in each 7-day window
    let currentWindowEnd = new Date(todayDate);
    
    while (true) {
      const windowStart = new Date(currentWindowEnd);
      windowStart.setDate(windowStart.getDate() - 6);
      
      const hasCompletionInWindow = uniqueDates.some(date => {
        const d = new Date(date);
        return d >= windowStart && d <= currentWindowEnd;
      });

      if (hasCompletionInWindow) {
        streak++;
        currentWindowEnd = new Date(windowStart);
        currentWindowEnd.setDate(currentWindowEnd.getDate() - 1);
      } else {
        break;
      }
    }
  } else if (frequency === 'monthly') {
    // For monthly, we check if there's at least one completion in each calendar month
    let currentMonth = todayDate.getMonth();
    let currentYear = todayDate.getFullYear();

    while (true) {
      const hasCompletionInMonth = uniqueDates.some(date => {
        const d = new Date(date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });

      if (hasCompletionInMonth) {
        streak++;
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
      } else {
        break;
      }
    }
  }

  return streak;
}
