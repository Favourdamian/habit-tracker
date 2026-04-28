export function calculateCurrentStreak(completions: string[], today?: string): number {
  if (!completions || completions.length === 0) return 0;

  // Use provided today or current local date in YYYY-MM-DD
  const todayStr = today || new Date().toISOString().split('T')[0];

  // Remove duplicates and sort descending
  const uniqueDates = Array.from(new Set(completions)).sort((a, b) => b.localeCompare(a));

  if (!uniqueDates.includes(todayStr)) {
    return 0;
  }

  let streak = 0;
  const todayDate = new Date(todayStr);

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

  return streak;
}
