# Habit Tracker PWA

I built this mobile-first Habit Tracker Progressive Web App using Next.js 16 and React 19. It's designed to help users stay consistent with their daily routines through a highly responsive interface, persistent local state, and intelligent streak tracking logic.

## 🚀 Setup Instructions

If you'd like to run my habit tracker locally, just follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher recommended)
- `npm` (comes bundled with Node.js)

### Installation
1. **Clone or Download the repository.**
2. **Navigate to the project directory:**
   ```bash
   cd habit-tracker
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Install Playwright browsers (for E2E tests):**
   ```bash
   npx playwright install chromium
   ```
5. **Start the development server:**
   ```bash
   npm run dev
   ```
6. **Open in Browser:**
   Visit `http://localhost:3000` to view the application!

---

## 🏗️ Architecture Explanation

I built this application using the **Next.js App Router**, focusing on a client-side architecture that enables full offline functionality and deterministic local behavior.

- **Persistence Layer (LocalStorage)**: I decided to handle all data persistence entirely through `localStorage` to ensure privacy and eliminate backend dependencies.
  - I created a centralized `storage.ts` library to manage users, sessions, and habit data.
  - I implemented strict key-naming conventions (e.g., `habit-tracker-habits`) to prevent conflicts with other local data.
- **PWA Integration**: I manually configured the service worker (`sw.js`) and web manifest to allow the app to be "installed" on mobile devices and function without an internet connection.
- **State Management**: I leveraged React 19's features and standard hooks to maintain habit states and completion history. The habit logic (streaks, slugs, and validation) is isolated into pure utility functions for maximum testability.
- **Styling**: I used **Tailwind CSS 4** to build a modern, glassmorphic UI that feels premium and adapts perfectly to any screen size.

---

## ⚖️ Trade-offs

While building this, I made several deliberate technical choices:

1. **LocalStorage vs. Database**:
   - *Decision*: I chose `localStorage` over a traditional backend.
   - *Trade-off*: This allows for instant load times and zero server costs, but it means data is local to the device and cannot be synced across browsers without a manual export/import.
2. **Client-Side Authentication**:
   - *Decision*: I implemented a secure local authentication flow that validates against stored user objects.
   - *Trade-off*: This provides a personalized experience for multiple users on the same machine, but it isn't a replacement for enterprise-grade server-side security.
3. **Daily-Only Frequency**:
   - *Decision*: I focused on perfecting the "daily" tracking flow first.
   - *Trade-off*: While the system is extensible, I prioritized a polished daily experience over adding complexity for weekly or monthly habits in this version.

---

## ♿ Accessibility Notes

I put a strong emphasis on meeting accessibility standards to ensure the app is usable by everyone:

- **Semantic HTML**: I used proper heading hierarchies and semantic form elements throughout the login and habit creation flows.
- **Interactive Elements**: Every button and input has clearly defined labels and data-testids for both screen readers and automated testing.
- **Keyboard Navigation**: The app supports full keyboard focus trapping in modals and logical tab indexing for all habit management operations.
- **Color Contrast**: I curated a high-contrast color palette using Tailwind's system to ensure all text is easily readable on both dark and light surfaces.

---

## ✨ Improvements Beyond Requirements

I decided to add a few extra touches that elevate the user experience:

- **Intelligent Streak Calculation**: I wrote a custom algorithm that calculates current streaks by analyzing completion gaps, ensuring users get accurate credit for their consistency.
- **Custom Splash Screen**: I built a dedicated splash screen component that provides a premium app-like feel during the initial hydration and session check.
- **Slug-based Navigation**: Habits are automatically given URL-safe slugs, allowing for clean routing and a professional URL structure within the app.
- **Comprehensive Test Suite**: Beyond simple unit tests, I implemented full E2E Playwright tests to verify the entire user journey from signup to habit completion.

---

## 🧪 Required Test Suite Mapping

As per the technical requirements, here is how each test file verifies the application's behavior:

| Test File | Behavior Verified |
|-----------|-------------------|
| `tests/unit/slug.test.ts` | **Slug Generation**: Ensures habit names are correctly transformed into stable, URL-friendly slugs for test IDs and routing. |
| `tests/unit/validators.test.ts` | **Input Validation**: Verifies that habit names are required and capped at 60 characters with appropriate error messages. |
| `tests/unit/streaks.test.ts` | **Streak Logic**: Validates the complex calculation of consecutive daily completions, handling duplicates and missing days. |
| `tests/unit/habits.test.ts` | **Habit Toggle**: Ensures completion dates can be added or removed without mutating the original object or creating duplicates. |
| `tests/integration/auth-flow.test.tsx` | **Authentication**: Verifies signup/login form submissions, session persistence in `localStorage`, and error handling for duplicates. |
| `tests/integration/habit-form.test.tsx` | **Dashboard CRUD**: Validates that habits can be created, edited, and deleted (with confirmation) correctly in the UI. |
| `tests/e2e/app.spec.ts` | **End-to-End Flows**: Tests the full user journey, including PWA splash screen redirects, offline support, and persistence after reloads. |
