# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Habit Tracker app >> persists session and habits after page reload
- Location: tests\e2e\app.spec.ts:92:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('habit-card-persistent-habit')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByTestId('habit-card-persistent-habit')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e7] [cursor=pointer]:
    - button "Open issues overlay" [ref=e8]:
      - img [ref=e10]
      - generic [ref=e12]:
        - generic [ref=e13]: "0"
        - generic [ref=e14]: "1"
      - generic [ref=e15]: Issue
    - button "Collapse issues badge" [ref=e16]:
      - img [ref=e17]
  - main [ref=e19]:
    - navigation [ref=e20]:
      - generic [ref=e21]:
        - generic [ref=e22]:
          - img [ref=e24]
          - generic [ref=e26]:
            - heading "HabitFlow" [level=1] [ref=e27]
            - paragraph [ref=e28]: persist's Dashboard
        - button "Logout" [ref=e29]:
          - generic [ref=e30]: Logout
          - img [ref=e31]
    - generic [ref=e33]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - heading "Build your ritual." [level=2] [ref=e36]
          - paragraph [ref=e37]: Small steps lead to big changes. Track your daily habits and see your progress grow.
        - button "Add New Habit" [ref=e38]:
          - img [ref=e39]
          - generic [ref=e41]: Add New Habit
      - generic [ref=e43]:
        - img [ref=e45]
        - heading "No habits tracked yet" [level=3] [ref=e47]
        - paragraph [ref=e48]: Start your journey by adding your first habit.
  - alert [ref=e49]
```

# Test source

```ts
  3   | test.describe('Habit Tracker app', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     // Clear localStorage before each test
  6   |     await page.goto('/');
  7   |     await page.evaluate(() => localStorage.clear());
  8   |   });
  9   | 
  10  |   test('shows the splash screen and redirects unauthenticated users to /login', async ({ page }) => {
  11  |     await page.goto('/');
  12  |     await expect(page.getByTestId('splash-screen')).toBeVisible();
  13  |     await expect(page).toHaveURL(/.*login/);
  14  |   });
  15  | 
  16  |   test('redirects authenticated users from / to /dashboard', async ({ page }) => {
  17  |     await page.goto('/signup');
  18  |     await page.getByTestId('auth-signup-email').fill('user@example.com');
  19  |     await page.getByTestId('auth-signup-password').fill('password');
  20  |     await page.getByTestId('auth-signup-submit').click();
  21  |     await expect(page).toHaveURL(/.*dashboard/);
  22  |     
  23  |     await page.goto('/');
  24  |     await expect(page).toHaveURL(/.*dashboard/);
  25  |   });
  26  | 
  27  |   test('prevents unauthenticated access to /dashboard', async ({ page }) => {
  28  |     await page.goto('/dashboard');
  29  |     await expect(page).toHaveURL(/.*login/);
  30  |   });
  31  | 
  32  |   test('signs up a new user and lands on the dashboard', async ({ page }) => {
  33  |     await page.goto('/signup');
  34  |     await page.getByTestId('auth-signup-email').fill('new@example.com');
  35  |     await page.getByTestId('auth-signup-password').fill('password');
  36  |     await page.getByTestId('auth-signup-submit').click();
  37  |     await expect(page.getByTestId('dashboard-page')).toBeVisible();
  38  |   });
  39  | 
  40  |   test("logs in an existing user and loads only that user's habits", async ({ page }) => {
  41  |     // Setup users and habits
  42  |     await page.goto('/');
  43  |     await page.evaluate(() => {
  44  |       localStorage.setItem('habit-tracker-users', JSON.stringify([
  45  |         { id: 'u1', email: 'u1@ex.com', password: 'p1', createdAt: '' },
  46  |         { id: 'u2', email: 'u2@ex.com', password: 'p2', createdAt: '' }
  47  |       ]));
  48  |       localStorage.setItem('habit-tracker-habits', JSON.stringify([
  49  |         { id: 'h1', userId: 'u1', name: 'User 1 Habit', description: '', frequency: 'daily', createdAt: '', completions: [] },
  50  |         { id: 'h2', userId: 'u2', name: 'User 2 Habit', description: '', frequency: 'daily', createdAt: '', completions: [] }
  51  |       ]));
  52  |     });
  53  | 
  54  |     await page.goto('/login');
  55  |     await page.getByTestId('auth-login-email').fill('u1@ex.com');
  56  |     await page.getByTestId('auth-login-password').fill('p1').then(() => page.getByTestId('auth-login-submit').click());
  57  |     
  58  |     await expect(page.getByTestId('habit-card-user-1-habit')).toBeVisible();
  59  |     await expect(page.getByTestId('habit-card-user-2-habit')).not.toBeVisible();
  60  |   });
  61  | 
  62  |   test('creates a habit from the dashboard', async ({ page }) => {
  63  |     await page.goto('/signup');
  64  |     await page.getByTestId('auth-signup-email').fill('test@ex.com');
  65  |     await page.getByTestId('auth-signup-password').fill('pass');
  66  |     await page.getByTestId('auth-signup-submit').click();
  67  | 
  68  |     await page.getByTestId('create-habit-button').click();
  69  |     await page.getByTestId('habit-name-input').fill('Morning Run');
  70  |     await page.getByTestId('habit-save-button').click();
  71  |     
  72  |     await expect(page.getByTestId('habit-card-morning-run')).toBeVisible();
  73  |   });
  74  | 
  75  |   test('completes a habit for today and updates the streak', async ({ page }) => {
  76  |     await page.goto('/signup');
  77  |     await page.getByTestId('auth-signup-email').fill('test@ex.com');
  78  |     await page.getByTestId('auth-signup-password').fill('pass');
  79  |     await page.getByTestId('auth-signup-submit').click();
  80  | 
  81  |     await page.getByTestId('create-habit-button').click();
  82  |     await page.getByTestId('habit-name-input').fill('Water');
  83  |     await page.getByTestId('habit-save-button').click();
  84  | 
  85  |     const streak = page.getByTestId('habit-streak-water');
  86  |     await expect(streak).toHaveText('0');
  87  |     
  88  |     await page.getByTestId('habit-complete-water').click();
  89  |     await expect(streak).toHaveText('1');
  90  |   });
  91  | 
  92  |   test('persists session and habits after page reload', async ({ page }) => {
  93  |     await page.goto('/signup');
  94  |     await page.getByTestId('auth-signup-email').fill('persist@ex.com');
  95  |     await page.getByTestId('auth-signup-password').fill('pass');
  96  |     await page.getByTestId('auth-signup-submit').click();
  97  | 
  98  |     await page.getByTestId('create-habit-button').click();
  99  |     await page.getByTestId('habit-name-input').fill('Persistent Habit');
  100 |     await page.getByTestId('habit-save-button').click();
  101 | 
  102 |     await page.reload();
> 103 |     await expect(page.getByTestId('habit-card-persistent-habit')).toBeVisible();
      |                                                                   ^ Error: expect(locator).toBeVisible() failed
  104 |   });
  105 | 
  106 |   test('logs out and redirects to /login', async ({ page }) => {
  107 |     await page.goto('/signup');
  108 |     await page.getByTestId('auth-signup-email').fill('out@ex.com');
  109 |     await page.getByTestId('auth-signup-password').fill('pass');
  110 |     await page.getByTestId('auth-signup-submit').click();
  111 | 
  112 |     await page.getByTestId('auth-logout-button').click();
  113 |     await expect(page).toHaveURL(/.*login/);
  114 |   });
  115 | 
  116 |   test('loads the cached app shell when offline after the app has been loaded once', async ({ page, context }) => {
  117 |     await page.goto('/');
  118 |     // Wait for SW to register and be ready
  119 |     await page.evaluate(() => navigator.serviceWorker.ready);
  120 |     await page.waitForTimeout(1000); // Small buffer
  121 |     
  122 |     // Go offline
  123 |     await context.setOffline(true);
  124 |     await page.reload();
  125 |     
  126 |     // Should still show splash screen (app shell)
  127 |     await expect(page.getByTestId('splash-screen')).toBeVisible();
  128 |     await context.setOffline(false);
  129 |   });
  130 | });
  131 | 
```