# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Habit Tracker app >> completes a habit for today and updates the streak
- Location: tests\e2e\app.spec.ts:75:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('habit-streak-water')
Expected: "0"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for getByTestId('habit-streak-water')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [active]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - navigation [ref=e7]:
            - button "previous" [disabled] [ref=e8]:
              - img "previous" [ref=e9]
            - generic [ref=e11]:
              - generic [ref=e12]: 1/
              - text: "1"
            - button "next" [disabled] [ref=e13]:
              - img "next" [ref=e14]
          - img
        - generic [ref=e16]:
          - generic [ref=e17]:
            - img [ref=e18]
            - generic "Latest available version is detected (16.2.4)." [ref=e20]: Next.js 16.2.4
            - generic [ref=e21]: Turbopack
          - img
      - dialog "Runtime Error" [ref=e23]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - generic [ref=e28]:
              - generic [ref=e30]: Runtime Error
              - generic [ref=e31]:
                - button "Copy Error Info" [ref=e32] [cursor=pointer]:
                  - img [ref=e33]
                - button "No related documentation found" [disabled] [ref=e35]:
                  - img [ref=e36]
                - button "Attach Node.js inspector" [ref=e38] [cursor=pointer]:
                  - img [ref=e39]
            - generic [ref=e48]: "Objects are not valid as a React child (found: object with keys {valid, value, error}). If you meant to render a collection of children, use an array instead."
          - generic [ref=e50]:
            - paragraph [ref=e52]:
              - text: Call Stack
              - generic [ref=e53]: "19"
            - generic [ref=e54]:
              - generic [ref=e55]:
                - text: throwOnInvalidObjectTypeImpl
                - button "Sourcemapping failed. Click to log cause of error." [ref=e56] [cursor=pointer]:
                  - img [ref=e57]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (3922:15)
            - generic [ref=e59]:
              - generic [ref=e60]:
                - text: throwOnInvalidObjectType
                - button "Sourcemapping failed. Click to log cause of error." [ref=e61] [cursor=pointer]:
                  - img [ref=e62]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (3926:110)
            - generic [ref=e64]:
              - generic [ref=e65]:
                - text: createChild
                - button "Sourcemapping failed. Click to log cause of error." [ref=e66] [cursor=pointer]:
                  - img [ref=e67]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (4029:17)
            - generic [ref=e69]:
              - generic [ref=e70]:
                - text: reconcileChildrenArray
                - button "Sourcemapping failed. Click to log cause of error." [ref=e71] [cursor=pointer]:
                  - img [ref=e72]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (4129:72)
            - generic [ref=e74]:
              - generic [ref=e75]:
                - text: reconcileChildFibersImpl
                - button "Sourcemapping failed. Click to log cause of error." [ref=e76] [cursor=pointer]:
                  - img [ref=e77]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (4236:51)
            - generic [ref=e79]:
              - generic [ref=e80]:
                - text: <unknown>
                - button "Sourcemapping failed. Click to log cause of error." [ref=e81] [cursor=pointer]:
                  - img [ref=e82]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (4261:39)
            - generic [ref=e84]:
              - generic [ref=e85]:
                - text: reconcileChildren
                - button "Sourcemapping failed. Click to log cause of error." [ref=e86] [cursor=pointer]:
                  - img [ref=e87]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (5898:51)
            - generic [ref=e89]:
              - generic [ref=e90]:
                - text: beginWork
                - button "Sourcemapping failed. Click to log cause of error." [ref=e91] [cursor=pointer]:
                  - img [ref=e92]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (6758:1573)
            - generic [ref=e94]:
              - generic [ref=e95]:
                - text: runWithFiberInDEV
                - button "Sourcemapping failed. Click to log cause of error." [ref=e96] [cursor=pointer]:
                  - img [ref=e97]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (965:74)
            - generic [ref=e99]:
              - generic [ref=e100]:
                - text: performUnitOfWork
                - button "Sourcemapping failed. Click to log cause of error." [ref=e101] [cursor=pointer]:
                  - img [ref=e102]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (9555:97)
            - generic [ref=e104]:
              - generic [ref=e105]:
                - text: workLoopSync
                - button "Sourcemapping failed. Click to log cause of error." [ref=e106] [cursor=pointer]:
                  - img [ref=e107]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (9449:40)
            - generic [ref=e109]:
              - generic [ref=e110]:
                - text: renderRootSync
                - button "Sourcemapping failed. Click to log cause of error." [ref=e111] [cursor=pointer]:
                  - img [ref=e112]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (9433:13)
            - generic [ref=e114]:
              - generic [ref=e115]:
                - text: performWorkOnRoot
                - button "Sourcemapping failed. Click to log cause of error." [ref=e116] [cursor=pointer]:
                  - img [ref=e117]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (9098:47)
            - generic [ref=e119]:
              - generic [ref=e120]:
                - text: performSyncWorkOnRoot
                - button "Sourcemapping failed. Click to log cause of error." [ref=e121] [cursor=pointer]:
                  - img [ref=e122]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (10263:9)
            - generic [ref=e124]:
              - generic [ref=e125]:
                - text: flushSyncWorkAcrossRoots_impl
                - button "Sourcemapping failed. Click to log cause of error." [ref=e126] [cursor=pointer]:
                  - img [ref=e127]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (10179:316)
            - generic [ref=e129]:
              - generic [ref=e130]:
                - text: processRootScheduleInMicrotask
                - button "Sourcemapping failed. Click to log cause of error." [ref=e131] [cursor=pointer]:
                  - img [ref=e132]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (10200:106)
            - generic [ref=e134]:
              - generic [ref=e135]:
                - text: <unknown>
                - button "Sourcemapping failed. Click to log cause of error." [ref=e136] [cursor=pointer]:
                  - img [ref=e137]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_compiled_react-dom_058-ah~._.js (10274:158)
            - generic [ref=e139]:
              - generic [ref=e140]:
                - text: DashboardPage
                - button "Sourcemapping failed. Click to log cause of error." [ref=e141] [cursor=pointer]:
                  - img [ref=e142]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/_09y1d_0._.js (1056:249)
            - generic [ref=e144]:
              - generic [ref=e145]:
                - text: ClientPageRoot
                - button "Sourcemapping failed. Click to log cause of error." [ref=e146] [cursor=pointer]:
                  - img [ref=e147]
              - text: file:///C:/Users/USER/OneDrive/Desktop/HNG%2014/habit-tracker/.next/dev/static/chunks/node_modules_next_dist_0tt2wve._.js (4461:50)
        - generic [ref=e149]: "1"
        - generic [ref=e150]: "2"
    - generic [ref=e156] [cursor=pointer]:
      - button "Open issues overlay" [ref=e157]:
        - img [ref=e159]
        - generic [ref=e161]:
          - generic [ref=e162]: "0"
          - generic [ref=e163]: "1"
        - generic [ref=e164]: Issue
      - button "Collapse issues badge" [ref=e165]:
        - img [ref=e166]
  - generic [ref=e169]:
    - img [ref=e170]
    - heading "This page couldn’t load" [level=1] [ref=e172]
    - paragraph [ref=e173]: Reload to try again, or go back.
    - generic [ref=e174]:
      - button "Reload" [ref=e176] [cursor=pointer]
      - button "Back" [ref=e177] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
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
> 86  |     await expect(streak).toHaveText('0');
      |                          ^ Error: expect(locator).toHaveText(expected) failed
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
  103 |     await expect(page.getByTestId('habit-card-persistent-habit')).toBeVisible();
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