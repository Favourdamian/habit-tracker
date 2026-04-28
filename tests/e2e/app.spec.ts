import { test, expect } from '@playwright/test';

test.describe('Habit Tracker app', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('splash-screen')).toBeVisible();
    await expect(page).toHaveURL(/.*login/);
  });

  test('redirects authenticated users from / to /dashboard', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('user@example.com');
    await page.getByTestId('auth-signup-password').fill('password');
    await page.getByTestId('auth-signup-submit').click();
    await expect(page).toHaveURL(/.*dashboard/);
    
    await page.goto('/');
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('prevents unauthenticated access to /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/.*login/);
  });

  test('signs up a new user and lands on the dashboard', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('new@example.com');
    await page.getByTestId('auth-signup-password').fill('password');
    await page.getByTestId('auth-signup-submit').click();
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
  });

  test("logs in an existing user and loads only that user's habits", async ({ page }) => {
    // Setup users and habits
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('habit-tracker-users', JSON.stringify([
        { id: 'u1', email: 'u1@ex.com', password: 'p1', createdAt: '' },
        { id: 'u2', email: 'u2@ex.com', password: 'p2', createdAt: '' }
      ]));
      localStorage.setItem('habit-tracker-habits', JSON.stringify([
        { id: 'h1', userId: 'u1', name: 'User 1 Habit', description: '', frequency: 'daily', createdAt: '', completions: [] },
        { id: 'h2', userId: 'u2', name: 'User 2 Habit', description: '', frequency: 'daily', createdAt: '', completions: [] }
      ]));
    });

    await page.goto('/login');
    await page.getByTestId('auth-login-email').fill('u1@ex.com');
    await page.getByTestId('auth-login-password').fill('p1').then(() => page.getByTestId('auth-login-submit').click());
    
    await expect(page.getByTestId('habit-card-user-1-habit')).toBeVisible();
    await expect(page.getByTestId('habit-card-user-2-habit')).not.toBeVisible();
  });

  test('creates a habit from the dashboard', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('test@ex.com');
    await page.getByTestId('auth-signup-password').fill('pass');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('create-habit-button').click();
    await page.getByTestId('habit-name-input').fill('Morning Run');
    await page.getByTestId('habit-save-button').click();
    
    await expect(page.getByTestId('habit-card-morning-run')).toBeVisible();
  });

  test('completes a habit for today and updates the streak', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('test@ex.com');
    await page.getByTestId('auth-signup-password').fill('pass');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('create-habit-button').click();
    await page.getByTestId('habit-name-input').fill('Water');
    await page.getByTestId('habit-save-button').click();

    const streak = page.getByTestId('habit-streak-water');
    await expect(streak).toHaveText('0');
    
    await page.getByTestId('habit-complete-water').click();
    await expect(streak).toHaveText('1');
  });

  test('persists session and habits after page reload', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('persist@ex.com');
    await page.getByTestId('auth-signup-password').fill('pass');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('create-habit-button').click();
    await page.getByTestId('habit-name-input').fill('Persistent Habit');
    await page.getByTestId('habit-save-button').click();

    await page.reload();
    await expect(page.getByTestId('habit-card-persistent-habit')).toBeVisible();
  });

  test('logs out and redirects to /login', async ({ page }) => {
    await page.goto('/signup');
    await page.getByTestId('auth-signup-email').fill('out@ex.com');
    await page.getByTestId('auth-signup-password').fill('pass');
    await page.getByTestId('auth-signup-submit').click();

    await page.getByTestId('auth-logout-button').click();
    await expect(page).toHaveURL(/.*login/);
  });

  test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
    await page.goto('/');
    // Wait for SW to register and be ready
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForTimeout(1000); // Small buffer
    
    // Go offline
    await context.setOffline(true);
    await page.reload();
    
    // Should still show splash screen (app shell)
    await expect(page.getByTestId('splash-screen')).toBeVisible();
    await context.setOffline(false);
  });
});
