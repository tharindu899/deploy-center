# PocketLedger — Money Manager

> A polished personal finance Android app for Sri Lanka, built with React Native + Expo.
> Track expenses, income, accounts, loans, and budgets — all synced to Google Drive.
> Dark/light theme, multi-account, biometric lock, CSV/PDF export, and offline-first.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Google Cloud Setup](#google-cloud-setup)
- [Environment Variables & Secrets](#environment-variables--secrets)
- [Phase-by-Phase Build Guide](#phase-by-phase-build-guide)
- [Deployment on GitHub](#deployment-on-github)
- [Useful Commands](#useful-commands)
- [License](#license)

---

## Overview

PocketLedger is a fully offline-first Android money manager app built for Sri Lankan users (LKR currency). It uses Google Sign-In for identity and Google Drive for cloud backup. There is no Firebase — all authentication goes through Google Cloud OAuth 2.0, and all data is stored locally in SQLite on the device.

The app has five main screens: Dashboard (Home), Analytics, Loans, Accounts, and Settings. A floating action button opens the Add Transaction modal. All screens match the pixel-perfect design from the HTML preview file.

---

## Features

| Area | Details |
|------|---------|
| Dashboard | Total balance card, income/expense summary, account pills, quick actions, transaction list grouped by date |
| Analytics | Monthly bar chart (Jan–May), spending-by-category donut chart, income/expense/savings summary row |
| Loans | Lending and borrowing cards with progress bars, due dates, partial payments |
| Accounts | Bank accounts, cash wallets, mobile wallets, add/edit/delete accounts |
| Settings | Google account, Google Drive backup status, currency selector, dark/light theme toggle, notification toggle, sound toggle, biometric lock toggle, data export (CSV / PDF / Excel), app update checker, sign out |
| Transactions | Add expense / income / transfer with category grid, account picker, amount input |
| Notifications | Budget alerts, loan reminders, salary credits, Drive sync status |
| Security | Biometric (fingerprint / face) lock using expo-local-authentication |
| Export | CSV, PDF, and Excel export via expo-file-system and expo-sharing |
| Themes | Dark (default) and Light mode with full CSS-variable-equivalent theming in React Native |
| Icons | Tabler Icons throughout — no emoji in the app UI |
| Offline | All data stored locally in SQLite; Drive sync is optional and background |

---

## Tech Stack

| Layer | Library / Tool | Version |
|-------|---------------|---------|
| Framework | React Native + Expo | SDK 52 |
| Language | TypeScript | 5.x |
| Navigation | Expo Router (file-based) | 3.x |
| State | Zustand | 4.x |
| Local DB | expo-sqlite | 14.x |
| Auth | expo-auth-session + Google OAuth 2.0 | — |
| Drive API | Google Drive REST API v3 (fetch) | — |
| Icons | @tabler/icons-react-native | 3.x |
| Charts | react-native-gifted-charts | 1.x |
| Fonts | expo-font (DM Sans, DM Mono) | — |
| Biometric | expo-local-authentication | 14.x |
| Notifications | expo-notifications | 0.28.x |
| File/Export | expo-file-system + expo-sharing | — |
| Build | EAS Build (Expo Application Services) | — |
| CI/CD | GitHub Actions | — |
| Release | GitHub Releases (APK hosting) | — |

---

## Project Structure

```
📁 pocketledger/
│
├── 📁 .github/
│   └── 📁 workflows/
│       ├── 📄 build-apk.yml          ← EAS build + upload APK to GitHub Release
│       └── 📄 pr-check.yml           ← Lint + TypeScript check on pull requests
│
├── 📁 app/                           ← Expo Router file-based screens
│   ├── 📄 _layout.tsx                ← Root layout, fonts, theme provider
│   ├── 📄 index.tsx                  ← Redirect: auth check → login or tabs
│   ├── 📄 login.tsx                  ← Google Sign-In screen
│   └── 📁 (tabs)/
│       ├── 📄 _layout.tsx            ← Bottom tab navigator with custom tab bar
│       ├── 📄 index.tsx              ← Home / Dashboard screen
│       ├── 📄 analytics.tsx          ← Analytics screen
│       ├── 📄 loans.tsx              ← Loans screen
│       ├── 📄 accounts.tsx           ← Accounts screen
│       └── 📄 settings.tsx           ← Settings screen
│
├── 📁 src/
│   │
│   ├── 📁 components/
│   │   ├── 📁 common/
│   │   │   ├── 📄 BalanceCard.tsx        ← Total balance + income/expense stats
│   │   │   ├── 📄 TransactionCard.tsx    ← Single transaction row
│   │   │   ├── 📄 AccountPill.tsx        ← Horizontal scrollable account filter
│   │   │   ├── 📄 QuickActionGrid.tsx    ← 2×4 quick action buttons
│   │   │   ├── 📄 SectionLabel.tsx       ← Uppercase section heading
│   │   │   ├── 📄 SummaryRow.tsx         ← 3-column summary cards (Analytics)
│   │   │   ├── 📄 UpdateBanner.tsx       ← "v2.4.0 Available" banner
│   │   │   └── 📄 NotificationBadge.tsx  ← Red dot badge on bell icon
│   │   │
│   │   ├── 📁 charts/
│   │   │   ├── 📄 MonthlyBarChart.tsx    ← Monthly income/expense bar chart
│   │   │   └── 📄 CategoryPieChart.tsx   ← Spending-by-category donut chart
│   │   │
│   │   ├── 📁 loans/
│   │   │   ├── 📄 LoanCard.tsx           ← Single loan card with progress bar
│   │   │   └── 📄 LoanBadge.tsx          ← "Lending" / "Borrowing" badge
│   │   │
│   │   ├── 📁 accounts/
│   │   │   └── 📄 AccountCard.tsx        ← Bank/wallet card with balance
│   │   │
│   │   ├── 📁 settings/
│   │   │   ├── 📄 SettingsItem.tsx       ← Settings row with icon + toggle/arrow
│   │   │   └── 📄 ProfileBanner.tsx      ← User avatar, name, email, Drive status
│   │   │
│   │   ├── 📁 modals/
│   │   │   ├── 📄 AddTransactionModal.tsx  ← Bottom sheet: expense/income/transfer
│   │   │   ├── 📄 AddLoanModal.tsx         ← Bottom sheet: new loan
│   │   │   └── 📄 AddAccountModal.tsx      ← Bottom sheet: new account
│   │   │
│   │   └── 📁 navigation/
│   │       ├── 📄 CustomTabBar.tsx       ← Bottom nav with floating + button
│   │       └── 📄 NotificationPanel.tsx  ← Full-screen notification overlay
│   │
│   ├── 📁 database/
│   │   ├── 📄 client.ts              ← SQLite connection singleton
│   │   ├── 📄 schema.ts              ← CREATE TABLE statements + migrations
│   │   ├── 📄 transactions.ts        ← CRUD for transactions table
│   │   ├── 📄 accounts.ts            ← CRUD for accounts table
│   │   ├── 📄 loans.ts               ← CRUD for loans table
│   │   ├── 📄 categories.ts          ← Seed + query categories
│   │   └── 📄 budgets.ts             ← CRUD for budgets table
│   │
│   ├── 📁 services/
│   │   ├── 📄 googleAuth.ts          ← OAuth 2.0 sign-in, token refresh, sign-out
│   │   ├── 📄 googleDrive.ts         ← Upload / download backup JSON to Drive
│   │   └── 📄 exportService.ts       ← Generate CSV, PDF, Excel files for sharing
│   │
│   ├── 📁 store/
│   │   ├── 📄 useAuthStore.ts        ← Google user, tokens, sign-in state
│   │   ├── 📄 useTransactionStore.ts ← Transactions list, filters, CRUD actions
│   │   ├── 📄 useAccountStore.ts     ← Accounts list, active account filter
│   │   ├── 📄 useLoanStore.ts        ← Loans list, lend/borrow split
│   │   └── 📄 useSettingsStore.ts    ← Theme, currency, notification prefs
│   │
│   ├── 📁 hooks/
│   │   ├── 📄 useTransactions.ts     ← Load transactions from SQLite into store
│   │   ├── 📄 useAccounts.ts         ← Load accounts from SQLite into store
│   │   ├── 📄 useLoans.ts            ← Load loans from SQLite into store
│   │   ├── 📄 useBiometric.ts        ← Prompt biometric auth on app foreground
│   │   └── 📄 useDriveSync.ts        ← Auto-sync to Drive every 24 hours
│   │
│   ├── 📁 theme/
│   │   ├── 📄 colors.ts              ← Dark + light color tokens (matches HTML CSS vars)
│   │   ├── 📄 typography.ts          ← DM Sans + DM Mono font styles
│   │   ├── 📄 spacing.ts             ← Radii, padding, margin constants
│   │   └── 📄 index.ts               ← Re-export + useTheme() hook
│   │
│   ├── 📁 types/
│   │   └── 📄 index.ts               ← Transaction, Account, Loan, Category, User types
│   │
│   └── 📁 utils/
│       ├── 📄 formatCurrency.ts      ← Format number as "Rs. 1,234.00"
│       ├── 📄 dateHelpers.ts         ← "Today", "Yesterday", "May 11" labels
│       └── 📄 categoryIcons.ts       ← Map category name → Tabler icon name + color
│
├── 📁 assets/
│   ├── 📄 icon.png                   ← 1024×1024 app icon
│   ├── 📄 splash.png                 ← Splash screen (1284×2778)
│   ├── 📄 adaptive-icon.png          ← Android adaptive icon foreground
│   └── 📁 fonts/
│       ├── 📄 DMSans-Regular.ttf
│       ├── 📄 DMSans-Medium.ttf
│       ├── 📄 DMSans-SemiBold.ttf
│       ├── 📄 DMSans-Bold.ttf
│       └── 📄 DMMono-Regular.ttf
│
├── 🔐 .env                           ← SECRET — never commit (see Secrets section)
├── 📄 .env.example                   ← Safe template — commit this
├── 📄 .gitignore
├── 🔧 app.json                       ← Expo app config
├── 🔧 eas.json                       ← EAS Build profiles
├── 📦 package.json
├── 🔧 tsconfig.json
└── 📄 README.md
```

---

## Getting Started

### Prerequisites

Make sure the following tools are installed on your machine before starting.

```
Node.js       v20 or later      https://nodejs.org
npm           v10 or later      bundled with Node
Git           any recent        https://git-scm.com
Expo CLI      latest            npm install -g expo-cli
EAS CLI       latest            npm install -g eas-cli
```

You also need a physical Android device or Android emulator (API 26+). For emulator, install Android Studio and create an AVD through the Device Manager.

### Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/pocketledger.git
cd pocketledger
npm install
```

### Configure Environment

Copy the example env file and fill in your Google Cloud credentials:

```bash
cp .env.example .env
```

Then open `.env` and fill in all values (see the Secrets section below).

### Run Locally

```bash
npx expo start
```

Press `a` to open on a connected Android device or emulator. Press `w` for a web preview.

---

## Google Cloud Setup

PocketLedger uses Google Cloud only — no Firebase. Follow these steps exactly.

### Step 1 — Create a Google Cloud Project

1. Go to https://console.cloud.google.com
2. Click the project dropdown at the top → **New Project**
3. Name it `PocketLedger` → **Create**
4. Select the new project from the dropdown

### Step 2 — Enable Required APIs

In the left sidebar go to **APIs & Services → Library** and enable these APIs one by one:

```
Google Identity / People API       ← for user profile (name, email, photo)
Google Drive API                   ← for backup and restore
```

Search each one, click it, then click **Enable**.

### Step 3 — Configure OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen**
2. Choose **External** → **Create**
3. Fill in:
   - App name: `PocketLedger`
   - User support email: your Gmail
   - Developer contact email: your Gmail
4. Click **Save and Continue** through all steps
5. On the **Test users** step, add your own Gmail address so you can sign in during development

### Step 4 — Create OAuth 2.0 Credentials

Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.

You need to create **two** client IDs:

**Android client ID (for the APK):**
- Application type: `Android`
- Package name: `com.yourname.pocketledger`  ← must match `app.json`
- SHA-1 fingerprint: run the command below to get it

```bash
# Debug SHA-1 (for development)
keytool -keystore ~/.android/debug.keystore \
        -list -v -alias androiddebugkey \
        -storepass android -keypass android
```

For the release APK you will need the SHA-1 of your release keystore too (created in Phase 12).

**Web client ID (for expo-auth-session):**
- Application type: `Web application`
- Name: `PocketLedger Web`
- Authorized redirect URIs: add `https://auth.expo.io/@YOUR_EXPO_USERNAME/pocketledger`

### Step 5 — Enable Google Drive Scope

After creating credentials, go back to **OAuth consent screen → Scopes → Add or remove scopes**.
Add this scope:

```
https://www.googleapis.com/auth/drive.appdata
```

This gives the app access only to its own folder in Drive, not the user's full Drive.

---

## Environment Variables & Secrets

> **IMPORTANT:** The `.env` file must never be committed to Git.
> It is listed in `.gitignore` already. Only commit `.env.example`.
> For GitHub Actions, all secrets are stored in the repository's **Settings → Secrets and variables → Actions** — never in the code.

### .env.example (safe to commit)

```bash
# ─── Google Cloud OAuth ───────────────────────────────────────────
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=YOUR_WEB_CLIENT_ID_HERE
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=YOUR_ANDROID_CLIENT_ID_HERE

# ─── App Config ───────────────────────────────────────────────────
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### .env (your local secret file — never commit)

```bash
# ─── Google Cloud OAuth ───────────────────────────────────────────
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=123456789-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=123456789-yyyyyyyyyyyyyyyyyyyyyyyyyyyy.apps.googleusercontent.com

# ─── App Config ───────────────────────────────────────────────────
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### GitHub Actions Secrets (for CI/CD)

Add these in **GitHub → Your Repo → Settings → Secrets and variables → Actions → New repository secret**:

| Secret Name | Where to get it | What it's for |
|------------|----------------|---------------|
| `EXPO_TOKEN` | expo.dev → Account Settings → Access Tokens → Create | EAS Build authentication |
| `GOOGLE_WEB_CLIENT_ID` | Google Cloud Console → Credentials | OAuth Web Client ID |
| `GOOGLE_ANDROID_CLIENT_ID` | Google Cloud Console → Credentials | OAuth Android Client ID |
| `KEYSTORE_BASE64` | `base64 -i release.keystore` (your release keystore) | Signing the release APK |
| `KEYSTORE_ALIAS` | The alias you used when generating the keystore | Signing the release APK |
| `KEYSTORE_PASSWORD` | Your keystore password | Signing the release APK |
| `KEY_PASSWORD` | Your key password | Signing the release APK |

### How to generate the release keystore

Run this once on your machine and store the file safely (outside the project folder):

```bash
keytool -genkeypair -v \
  -keystore release.keystore \
  -alias pocketledger \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Then encode it for GitHub secrets:

```bash
base64 -i release.keystore | pbcopy    # macOS
base64 -w 0 release.keystore           # Linux/Windows WSL
```

Paste the output as the value of `KEYSTORE_BASE64` in GitHub Secrets.

---

## Phase-by-Phase Build Guide

Each phase below has:
- A list of files to create or edit
- A ready-to-copy prompt for Claude AI (free tier at claude.ai)

Work through phases in order. Each prompt builds on the previous.

---

### Phase 1 — Project Setup & Foundation

**Files in this phase:**
```
📁 pocketledger/
├── 🔧 app.json
├── 🔧 eas.json
├── 📦 package.json
├── 🔧 tsconfig.json
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 app/_layout.tsx
├── 📄 src/theme/colors.ts
├── 📄 src/theme/typography.ts
├── 📄 src/theme/spacing.ts
└── 📄 src/theme/index.ts
```

**Claude AI Prompt — copy this exactly:**

```
I am building a React Native + Expo SDK 52 app called PocketLedger (money manager for Sri Lanka, LKR currency).

Generate the following files with TypeScript:

1. app.json — Expo config with:
   - name: "PocketLedger", slug: "pocketledger", version: "1.0.0"
   - package: "com.yourname.pocketledger"
   - Android permissions: CAMERA, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE, USE_BIOMETRIC, USE_FINGERPRINT, RECEIVE_BOOT_COMPLETED, VIBRATE
   - plugins: expo-font, expo-sqlite, expo-local-authentication, expo-notifications
   - scheme: "pocketledger" (for OAuth deep link)

2. eas.json — EAS Build profiles:
   - development: developmentClient, simulator false
   - preview: internal distribution, APK build
   - production: store distribution, APK build
   - All profiles use Android platform

3. tsconfig.json — strict TypeScript with path alias "@/*" pointing to "src/*"

4. .gitignore — standard Expo .gitignore including .env, node_modules, .expo, android/, ios/, *.jks, *.keystore

5. src/theme/colors.ts — dark and light color tokens as TypeScript constants matching these CSS variables exactly:
   Dark: bg=#0d0f14, surface=#161a23, surface2=#1e2330, surface3=#252b3a
   border=rgba(255,255,255,0.07), border2=rgba(255,255,255,0.12)
   text1=#f0f2f8, text2=#8a90a8, text3=#555c75
   accent=#4f8ef7, accent2=#7b6cf7, green=#30d48a, red=#f05c6e
   amber=#f5a623, purple=#a78bfa, teal=#2dd4bf, pink=#f472b6
   Light: bg=#f0f2f8, surface=#ffffff, surface2=#f5f7fc, surface3=#eaedf5
   border=rgba(0,0,0,0.06), border2=rgba(0,0,0,0.10)
   text1=#0d0f14, text2=#5a607a, text3=#9aa0b8
   accent=#3b6ef0, accent2=#6c52e8, green=#18b870, red=#e03349
   amber=#d48c0a, purple=#7c5ccf, teal=#0fa89a, pink=#d44d95

6. src/theme/typography.ts — font styles using DM Sans (300/400/500/600/700) and DM Mono (400/500)

7. src/theme/spacing.ts — radius: 18, radiusSm: 10, radiusXs: 6, and standard spacing scale

8. src/theme/index.ts — exports useTheme() hook that reads from useSettingsStore isDark boolean

9. app/_layout.tsx — root layout that:
   - Loads DM Sans and DM Mono fonts via expo-font
   - Shows SplashScreen until fonts are loaded
   - Wraps children in a ThemeProvider context
   - Uses expo-router Stack navigator
```

---

### Phase 2 — Types & Database Schema

**Files in this phase:**
```
📁 src/
├── 📄 types/index.ts
├── 📄 database/client.ts
└── 📄 database/schema.ts
```

**Claude AI Prompt — copy this exactly:**

```
For the PocketLedger React Native app (Expo SDK 52, TypeScript, expo-sqlite v14), generate:

1. src/types/index.ts with these TypeScript interfaces:

Transaction: id, uuid, type ('expense'|'income'|'transfer'), amount (number),
  category_id, account_id, to_account_id (transfer), note, date (ISO string),
  created_at, updated_at

Account: id, name, type ('bank'|'cash'|'mobile_wallet'), balance (number),
  color (hex string), icon (tabler icon name string), mask (last 4 digits optional),
  created_at

Loan: id, person_name, initials (2 chars), avatar_color (hex), direction ('lending'|'borrowing'),
  purpose, total_amount, paid_amount, interest_rate (optional), due_date (ISO string optional),
  created_at

Category: id, name, icon (tabler icon name), color (hex), type ('expense'|'income'|'both')

Budget: id, category_id, month (YYYY-MM string), limit_amount, spent_amount

User: google_id, name, email, photo_url, access_token, refresh_token, token_expiry

2. src/database/client.ts — SQLite singleton using expo-sqlite openDatabaseAsync('pocketledger.db'),
   exported as a lazy singleton with a getDb() async function

3. src/database/schema.ts — SQL CREATE TABLE IF NOT EXISTS statements for all 5 tables above,
   plus an initDatabase() async function that runs all migrations in order,
   and seeds the categories table with: Food (ti-tools-kitchen-2, red), Transport (ti-car, accent),
   Shopping (ti-shopping-bag, amber), Health (ti-heartbeat, green), Utilities (ti-bolt, purple),
   Entertainment (ti-device-tv, pink), Education (ti-school, teal), Other (ti-dots, text2)
```

---

### Phase 3 — Database CRUD & Stores

**Files in this phase:**
```
📁 src/
├── 📄 database/transactions.ts
├── 📄 database/accounts.ts
├── 📄 database/loans.ts
├── 📄 database/categories.ts
├── 📄 database/budgets.ts
├── 📄 store/useAuthStore.ts
├── 📄 store/useTransactionStore.ts
├── 📄 store/useAccountStore.ts
├── 📄 store/useLoanStore.ts
└── 📄 store/useSettingsStore.ts
```

**Claude AI Prompt — copy this exactly:**

```
For PocketLedger (React Native, Expo, TypeScript, expo-sqlite v14, Zustand v4), generate:

1. src/database/transactions.ts — async functions:
   getAllTransactions(): Promise<Transaction[]> — ordered by date DESC
   getTransactionsByAccount(accountId): Promise<Transaction[]>
   getTransactionsByMonth(year, month): Promise<Transaction[]>
   insertTransaction(tx: Omit<Transaction,'id'>): Promise<number>
   updateTransaction(id, data: Partial<Transaction>): Promise<void>
   deleteTransaction(id): Promise<void>

2. src/database/accounts.ts — CRUD for accounts, plus updateBalance(id, delta) that adds/subtracts from balance

3. src/database/loans.ts — CRUD for loans, plus recordPayment(id, amount) that adds to paid_amount

4. src/database/categories.ts — getCategories(), getCategoriesByType(type)

5. src/database/budgets.ts — getBudgetsForMonth(year, month), upsertBudget(...), incrementSpent(categoryId, month, amount)

6. src/store/useAuthStore.ts — Zustand store with: user (User|null), isSignedIn (bool), setUser(user), clearUser(), updateTokens(accessToken, refreshToken, expiry)

7. src/store/useTransactionStore.ts — Zustand store with: transactions[], activeAccountFilter (number|null), isLoading, loadTransactions(), addTransaction(data), deleteTransaction(id), setAccountFilter(id|null). The loadTransactions action calls the database and sets the array.

8. src/store/useAccountStore.ts — Zustand store with: accounts[], totalBalance (computed), loadAccounts(), addAccount(data), deleteAccount(id)

9. src/store/useLoanStore.ts — Zustand store with: loans[], loadLoans(), addLoan(data), recordPayment(id, amount)

10. src/store/useSettingsStore.ts — Zustand store persisted with AsyncStorage: isDark (true by default), currency ('LKR'), notificationsEnabled (true), soundEnabled (true), biometricEnabled (false), toggleDark(), setCurrency(c)

Use the Transaction, Account, Loan, User TypeScript types from src/types/index.ts. Import db functions from src/database/*.
```

---

### Phase 4 — Google Authentication

**Files in this phase:**
```
📁 src/
├── 📄 services/googleAuth.ts
├── 📄 app/login.tsx
└── 📄 app/index.tsx
```

**Claude AI Prompt — copy this exactly:**

```
For PocketLedger (React Native, Expo SDK 52, TypeScript), build Google OAuth 2.0 sign-in
WITHOUT Firebase — using expo-auth-session and the Google Identity REST API only.

1. src/services/googleAuth.ts:
   - Use expo-auth-session/providers/google with WebBrowser
   - Read EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID and EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID from env
   - Export signInWithGoogle(): opens the Google OAuth consent screen, returns { user: User, accessToken, refreshToken }
   - Export refreshAccessToken(refreshToken): exchanges refresh token for a new access token
   - Export signOut(): clears stored tokens
   - After sign-in, call https://www.googleapis.com/oauth2/v2/userinfo with the access token to get name, email, picture
   - Request scopes: openid, email, profile, https://www.googleapis.com/auth/drive.appdata

2. app/login.tsx — Login screen:
   - Dark background (#0d0f14)
   - Centered layout: app logo (large "PL" in accent gradient circle, 80px), app name "PocketLedger" in DM Sans Bold 28px, tagline "Your pocket money manager" in text2 color
   - A Google sign-in button styled as a white pill with Google "G" SVG icon and text "Continue with Google" — NO emoji, use SVG G logo inline
   - On press, call signInWithGoogle(), save user to useAuthStore, then router.replace('/(tabs)')
   - Show ActivityIndicator while loading
   - Handle errors with a red error text below the button

3. app/index.tsx — Entry point:
   - Check useAuthStore.isSignedIn
   - If signed in: router.replace('/(tabs)')
   - If not: router.replace('/login')
   - Show a blank screen while checking
```

---

### Phase 5 — Home Dashboard Screen

**Files in this phase:**
```
📁 src/components/common/
├── 📄 BalanceCard.tsx
├── 📄 TransactionCard.tsx
├── 📄 AccountPill.tsx
├── 📄 QuickActionGrid.tsx
├── 📄 UpdateBanner.tsx
└── 📄 SectionLabel.tsx
📁 src/components/navigation/
└── 📄 NotificationPanel.tsx
📄 app/(tabs)/index.tsx
```

**Claude AI Prompt — copy this exactly:**

```
For PocketLedger (React Native, Expo, TypeScript, @tabler/icons-react-native, DM Sans font), 
build the Home Dashboard screen and its components. No emoji anywhere — use Tabler Icons only.

1. src/components/common/BalanceCard.tsx:
   - Dark gradient card: LinearGradient from '#1a2340' to '#1a1040' via '#0f1a38'
   - "Total Balance" label (small, uppercase, white 60% opacity)
   - Balance amount "Rs. X,XXX.XX" in DM Sans Bold 36px, white
   - Two side-by-side stat chips: Income (ti-trending-up, green) and Expenses (ti-trending-down, red)
   - Each chip shows label and "Rs. XX,XXX" value
   - Decorative circle overlays (top-right and bottom-left) using absolute positioning
   - Props: totalBalance, monthlyIncome, monthlyExpenses (all numbers)

2. src/components/common/AccountPill.tsx:
   - Horizontal scroll pill: small colored dot + account name + balance
   - Active state: accent blue background, white text
   - "All" pill as first item (no balance shown)
   - Add pill: dashed border, ti-plus icon
   - Props: accounts[], activeId, onSelect(id|null), onAddPress()

3. src/components/common/QuickActionGrid.tsx:
   - 2-row × 4-column grid of action buttons
   - Each button: rounded square icon container + label below
   - Actions: Expense (ti-minus-circle, red), Income (ti-plus-circle, green), Transfer (ti-arrows-exchange, accent), Loan (ti-clock-dollar, amber), Bank Pay (ti-building-bank, purple), Budget (ti-target, pink), Scan Bill (ti-qrcode, teal), More (ti-dots, text2)
   - Props: onPress(actionName: string)

4. src/components/common/TransactionCard.tsx:
   - Category icon (colored rounded square) + name + meta (category • account) + amount
   - Expense amounts in red with "−" prefix, income in green with "+" prefix, transfers in accent
   - Subtle border, hover/press state darkens background
   - Props: transaction (Transaction), accounts[], categories[]

5. src/components/common/UpdateBanner.tsx:
   - Subtle blue-purple gradient border card
   - ti-sparkles icon + "v2.4.0 Available" title + subtitle + "Update" button (accent pill)
   - Props: version, subtitle, onUpdate()

6. src/components/navigation/NotificationPanel.tsx:
   - Full-screen overlay panel (absolute positioned, z-index 200)
   - Header: back arrow + "Notifications" title + "Mark all read" link
   - List of notification items: colored dot + title + description + time + unread indicator
   - Slide-in animation from right using Animated.Value
   - Props: visible, onClose()

7. app/(tabs)/index.tsx — Home screen:
   - "Good morning/afternoon/evening" greeting + user first name
   - Bell icon button (with badge count) that opens NotificationPanel
   - User avatar circle (initials, accent gradient)
   - ScrollView containing: UpdateBanner, BalanceCard, AccountPill, SectionLabel "Quick Actions", QuickActionGrid, SectionLabel "Transactions", grouped transaction list (date headers + TransactionCard rows)
   - Load data from useTransactionStore and useAccountStore on mount
   - "Add Transaction" FAB at bottom center (floating, opens AddTransactionModal)
```

---

### Phase 6 — Analytics Screen

**Files in this phase:**
```
📁 src/components/charts/
├── 📄 MonthlyBarChart.tsx
└── 📄 CategoryPieChart.tsx
📄 src/components/common/SummaryRow.tsx
📄 app/(tabs)/analytics.tsx
```

**Claude AI Prompt — copy this exactly:**

```
For PocketLedger (React Native, Expo, TypeScript, react-native-gifted-charts), 
build the Analytics screen and chart components. No emoji — Tabler Icons only.

1. src/components/charts/MonthlyBarChart.tsx:
   - Uses BarChart from react-native-gifted-charts
   - Shows 5 months of expense data (Jan–May) as vertical bars
   - Active month (current) bar in accent blue, others in red at 70% opacity
   - Bar labels below (Jan, Feb, etc.), active label in accent blue bold
   - Card wrapper with title "Monthly Overview"
   - Props: monthlyData (Array of {month: string, amount: number, isActive: boolean})

2. src/components/charts/CategoryPieChart.tsx:
   - Uses PieChart from react-native-gifted-charts (donut style, centerLabel shows month name)
   - Slices: Food (red), Shopping (amber), Utilities (green), Other (purple) — matches HTML SVG
   - Legend on the right: colored square dot + category name + percentage
   - Card wrapper with title "Spending by Category"
   - Props: categoryData (Array of {name, color, value, percentage})

3. src/components/common/SummaryRow.tsx:
   - 3-column row of summary cards (or 2-column for Accounts screen)
   - Each card: large value in color + small label
   - Props: items (Array of {value: string, label: string, color: string})

4. app/(tabs)/analytics.tsx — Analytics screen:
   - Header: "Analytics" title + month display ("May 2025" pill) + calendar icon button
   - Month navigation: tap calendar opens a month picker modal
   - SummaryRow: Income (green), Expenses (red), Savings (accent)
   - MonthlyBarChart card
   - CategoryPieChart card
   - All data computed from useTransactionStore filtered by selected month/year
```

---

### Phase 7 — Loans Screen

**Files in this phase:**
```
📁 src/components/loans/
├── 📄 LoanCard.tsx
└── 📄 LoanBadge.tsx
📁 src/components/modals/
└── 📄 AddLoanModal.tsx
📄 src/hooks/useLoans.ts
📄 app/(tabs)/loans.tsx
```

**Claude AI Prompt — copy this exactly:**

```
For PocketLedger (React Native, Expo, TypeScript), build the Loans screen. No emoji — Tabler Icons only.

1. src/components/loans/LoanCard.tsx:
   - Header row: avatar circle (initials + gradient color) + name + purpose+due date label + lending/borrowing badge
   - Amount in green (lending) or red (borrowing), DM Sans Bold 22px
   - Progress bar (thin 5px height, rounded) showing paid/total ratio
   - Meta row below: "Paid: Rs. X,XXX" on left, "Remaining: Rs. X,XXX" on right
   - Press opens a detail/payment modal
   - Props: loan (Loan type)

2. src/components/loans/LoanBadge.tsx:
   - Pill badge: "Lending" in green, "Borrowing" in red
   - Props: direction ('lending'|'borrowing')

3. src/components/modals/AddLoanModal.tsx:
   - Bottom sheet modal (same style as AddTransactionModal)
   - Fields: Person Name (text), Direction toggle (Lending/Borrowing), Purpose (text), Total Amount, Interest Rate (optional), Due Date (date picker)
   - Avatar color auto-assigned from a preset palette
   - Save button: calls useLoanStore.addLoan()

4. src/hooks/useLoans.ts:
   - On mount: calls useLoanStore.loadLoans() which reads from SQLite
   - Returns { loans, isLoading }

5. app/(tabs)/loans.tsx — Loans screen:
   - Header: "Loans" title + "+" icon button
   - Summary row: Total Lent (green), Total Owed (red), Net (accent)
   - SectionLabel "You Lent" + list of lending LoanCards
   - SectionLabel "You Owe" + list of borrowing LoanCards
   - Pressing "+" opens AddLoanModal
   - Empty states per section if no loans
```

---

### Phase 8 — Accounts Screen

**Files in this phase:**
```
📁 src/components/accounts/
└── 📄 AccountCard.tsx
📁 src/components/modals/
└── 📄 AddAccountModal.tsx
📄 src/hooks/useAccounts.ts
📄 app/(tabs)/accounts.tsx
```

**Claude AI Prompt — copy this exactly:**

```
For PocketLedger (React Native, Expo, TypeScript), build the Accounts screen. No emoji — Tabler Icons only.

1. src/components/accounts/AccountCard.tsx:
   - Large icon container (50×50, rounded 16px) + account name + type + mask number on left
   - Balance value (DM Sans Bold 18px) + "Available"/"On hand"/"Balance" label on right
   - Card background: surface2 with border
   - Last card: dashed border "Add New Account" card with ti-plus icon
   - Props: account (Account type), onPress()

2. src/components/modals/AddAccountModal.tsx:
   - Bottom sheet: account name input, type selector (Bank / Cash / Mobile Wallet),
     initial balance input, icon picker (grid of ti-building-bank, ti-wallet, ti-device-mobile-dollar, etc.),
     color picker (6 preset colors: accent, green, amber, purple, pink, teal)
   - Save: calls useAccountStore.addAccount()

3. src/hooks/useAccounts.ts:
   - Loads accounts on mount, returns { accounts, totalBalance, isLoading }

4. app/(tabs)/accounts.tsx — Accounts screen:
   - Header: "Accounts" title + "+" add button
   - SummaryRow: Net Worth + Accounts count (2-column version)
   - SectionLabel "Bank Accounts" → bank type AccountCards
   - SectionLabel "Wallets" → cash + mobile_wallet AccountCards
   - Add New Account dashed card at bottom
   - Swipe-to-delete on AccountCards (using react-native-gesture-handler)
```

---

### Phase 9 — Add Transaction Modal & Tab Navigator

**Files in this phase:**
```
📁 src/components/modals/
└── 📄 AddTransactionModal.tsx
📁 src/components/navigation/
└── 📄 CustomTabBar.tsx
📄 app/(tabs)/_layout.tsx
```

**Claude AI Prompt — copy this exactly:**

```
For PocketLedger (React Native, Expo, TypeScript, @tabler/icons-react-native), build:

1. src/components/modals/AddTransactionModal.tsx:
   - Full bottom sheet (slides up from bottom, backdrop blur)
   - Drag handle (40×4px pill at top)
   - Title "Add Transaction" centered
   - Type tabs: Expense / Income / Transfer (3-column grid)
     Expense active: red border+background, Income: green, Transfer: accent
   - Amount input: "Rs." prefix + large number input (DM Mono font 32px)
   - Field row: Category (ti-tag) and Account (ti-building-bank) side-by-side selector pills
   - Category grid: 4 columns × 2 rows, each item has colored icon + label, active has accent border
     Categories: Food (ti-tools-kitchen-2 red), Transport (ti-car accent), Shopping (ti-shopping-bag amber),
     Health (ti-heartbeat green), Utilities (ti-bolt purple), Entertainment (ti-device-tv pink),
     Education (ti-school teal), Other (ti-dots text2)
   - "Save Transaction" button: full-width, accent gradient, DM Sans Bold 16px
   - On save: calls useTransactionStore.addTransaction(), updates account balance, closes modal
   - Props: visible, onClose()

2. src/components/navigation/CustomTabBar.tsx:
   - Custom bottom tab bar matching the HTML design exactly
   - 5 items: Home (ti-home-2), Analytics (ti-chart-pie), [FAB], Loans (ti-clock-dollar), Settings (ti-settings-2)
   - Center: floating "+" button (58×58, accent gradient circle, margin-top -22px, 3px white border)
   - Active item: accent color, inactive: text3
   - Label below icon, 10px DM Sans Medium
   - Pressing FAB dispatches a global event that opens AddTransactionModal in the active screen
   - Safe area bottom inset support

3. app/(tabs)/_layout.tsx:
   - Expo Router Tabs layout using CustomTabBar as the tabBar prop
   - 5 tab screens: index (Home), analytics, loans, accounts, settings
   - headerShown: false for all tabs
   - Tab bar background: surface color from theme
```

---

### Phase 10 — Settings Screen & Export

**Files in this phase:**
```
📁 src/components/settings/
├── 📄 SettingsItem.tsx
└── 📄 ProfileBanner.tsx
📄 src/services/exportService.ts
📄 app/(tabs)/settings.tsx
```

**Claude AI Prompt — copy this exactly:**

```
For PocketLedger (React Native, Expo, TypeScript, expo-file-system, expo-sharing), build:

1. src/components/settings/ProfileBanner.tsx:
   - Gradient banner (same as balance card: #1a2340 to #0f1a38)
   - User avatar circle (60px, initials in DM Sans Bold 22px, semi-transparent white background)
   - Name (DM Sans Bold 17px white), email (12px white 65%), Drive sync status row (green dot + "Google Drive synced")
   - Props: user (User type), isSynced (bool), lastSyncTime (string)

2. src/components/settings/SettingsItem.tsx:
   - Settings row: colored icon square (34×34, rounded 9px) + label + optional subtitle + right element
   - Right element: ti-chevron-right arrow OR Toggle switch OR version badge
   - Toggle switch: 42×24px pill, accent when on, surface3 when off, animated thumb
   - Press handler for arrow items
   - Props: icon (tabler name), iconBg (color), iconColor, label, subtitle?, rightType ('arrow'|'toggle'|'badge'), toggleValue?, onToggle?, badgeText?, onPress?

3. src/services/exportService.ts:
   - exportToCSV(transactions, accounts): generates CSV string, saves to DocumentDirectory, opens share sheet
   - exportToPDF(transactions): generates a simple HTML string, converts with expo-print, saves PDF, opens share sheet
   - exportToExcel(transactions): generates XLSX using a library like xlsx (SheetJS), saves, shares

4. app/(tabs)/settings.tsx — Settings screen:
   - ProfileBanner at top
   - Section "Account":
     Google Account item (ti-brand-google, accent) → shows connected email
     Google Drive Backup (ti-cloud-upload, green) → shows last sync time, tap to sync now
     Currency (ti-currency-dollar, amber) → shows "Sri Lankan Rupee (LKR)", tap opens picker
   - Section "Preferences":
     Dark Theme (ti-moon, purple) → toggle, calls useSettingsStore.toggleDark()
     Notifications (ti-bell, red) → toggle
     Transaction Sounds (ti-volume, teal) → toggle
     Biometric Lock (ti-fingerprint, accent) → toggle, enables expo-local-authentication
   - Section "More":
     Export Data (ti-download, amber) → opens action sheet: CSV / PDF / Excel
     Check for Updates (ti-refresh, green) → shows version, "New" badge if update available
     Sign Out (ti-logout, red) → Alert confirmation, then useAuthStore.clearUser() + router.replace('/login')
```

---

### Phase 11 — Google Drive Backup & Biometric

**Files in this phase:**
```
📄 src/services/googleDrive.ts
📄 src/hooks/useDriveSync.ts
📄 src/hooks/useBiometric.ts
```

**Claude AI Prompt — copy this exactly:**

```
For PocketLedger (React Native, Expo, TypeScript), build:

1. src/services/googleDrive.ts — Google Drive REST API v3 integration (no Firebase, no SDK):
   - Uses fetch() with Bearer token from useAuthStore.user.access_token
   - uploadBackup(accessToken, data: object): 
     * Serializes data to JSON
     * Checks if backup file already exists in appDataFolder (GET /drive/v3/files?spaces=appDataFolder&q=name='pocketledger-backup.json')
     * If exists: updates file (PATCH /upload/drive/v3/files/{id}?uploadType=media)
     * If not: creates file (POST /upload/drive/v3/files?uploadType=multipart) with metadata {name:'pocketledger-backup.json', parents:['appDataFolder']}
   - downloadBackup(accessToken): 
     * Finds the backup file id
     * Downloads content (GET /drive/v3/files/{id}?alt=media)
     * Returns parsed JSON object
   - All functions handle 401 errors by calling refreshAccessToken from googleAuth.ts
   - Export: uploadBackup, downloadBackup, getLastSyncTime

2. src/hooks/useDriveSync.ts:
   - On mount, check if last sync was more than 24 hours ago (stored in AsyncStorage)
   - If yes: collect all transactions + accounts + loans from their stores, call uploadBackup()
   - Save current timestamp as last sync time
   - Export: { syncNow, lastSyncTime, isSyncing }

3. src/hooks/useBiometric.ts:
   - On app foreground (AppState change to 'active'), if useSettingsStore.biometricEnabled is true:
     * Call expo-local-authentication LocalAuthentication.authenticateAsync()
     * If fails: show Alert with retry or "Use passcode" option
     * Block app UI with an overlay while authentication is pending
   - Export: { isLocked, unlock() }
```

---

### Phase 12 — Build & Release APK

**Files in this phase:**
```
📁 .github/workflows/
├── 📄 build-apk.yml
└── 📄 pr-check.yml
🔧 eas.json  (update profiles)
```

**Claude AI Prompt — copy this exactly:**

```
For PocketLedger (React Native, Expo, EAS Build, GitHub Actions), generate:

1. .github/workflows/build-apk.yml — GitHub Actions workflow:
   - Trigger: push to main branch OR manual workflow_dispatch
   - Jobs:
     a. build:
        - Runs on: ubuntu-latest
        - Steps:
          * Checkout code
          * Setup Node 20
          * npm install
          * Install EAS CLI: npm install -g eas-cli
          * Login to Expo: uses EXPO_TOKEN secret
          * Write .env file from secrets: EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
          * Decode keystore: echo $KEYSTORE_BASE64 | base64 -d > release.keystore
          * Build APK: eas build --platform android --profile preview --non-interactive --no-wait → get build ID
          * Wait for build to finish, then download APK artifact
          * Create GitHub Release with tag v1.0.${{ github.run_number }}
          * Upload APK as release asset using actions/upload-release-asset
   - All sensitive values read from GitHub Secrets (never hardcoded)

2. .github/workflows/pr-check.yml — PR validation:
   - Trigger: pull_request to main
   - Steps: checkout, setup node, npm install, npx tsc --noEmit, npx expo-doctor

3. eas.json final version:
   - development: developmentClient true, distribution internal
   - preview: distribution internal, android.buildType apk, channel preview
   - production: distribution store, android.buildType apk, channel production
   - env vars injected via GitHub Secrets for preview and production profiles

Generate all files with complete YAML content, no placeholder comments.
```

---

## Deployment on GitHub

### How It Works

PocketLedger is deployed entirely through GitHub with no external hosting services.

The APK is built using EAS Build (Expo's cloud build service — free tier allows 30 builds/month) and then automatically published to a GitHub Release. Users download the APK directly from GitHub Releases and sideload it on their Android device.

### Step-by-Step First Deployment

```bash
# 1. Create the GitHub repository
git init
git remote add origin https://github.com/YOUR_USERNAME/pocketledger.git

# 2. Initial commit
git add .
git commit -m "feat: initial PocketLedger project"
git push -u origin main
```

Before pushing, make sure `.env` is in `.gitignore`. Never push your `.env` file.

```bash
# 3. Log in to Expo and link the project
npx eas-cli login
npx eas-cli init
# This sets the projectId in app.json automatically
```

```bash
# 4. Add GitHub Secrets
# Go to: GitHub → Your Repo → Settings → Secrets and variables → Actions
# Add all secrets listed in the "GitHub Actions Secrets" table above
```

```bash
# 5. Trigger first build (manual)
# In GitHub → Your Repo → Actions → "Build APK" → Run workflow
# Or push a commit to main — the workflow fires automatically
```

```bash
# 6. Download the APK
# Go to: GitHub → Your Repo → Releases → Latest Release
# Download the .apk file
# Transfer to Android device and install (enable "Install from unknown sources" in settings)
```

### Updating the App

Any push to `main` triggers a new build and release automatically.
The version tag is `v1.0.{run_number}` so each release gets a unique version.

### Free Tier Limits

| Service | Free Limit |
|---------|-----------|
| EAS Build | 30 builds / month, max 15 min per build |
| GitHub Actions | 2,000 minutes / month |
| GitHub Releases | Unlimited, 2 GB per file limit |
| Google Cloud | OAuth 2.0 is free (no quota for user sign-in) |
| Google Drive API | Free up to 15 GB per user's Drive storage |

---

## Useful Commands

```bash
# Start development server
npx expo start

# Run on Android (device/emulator must be connected)
npx expo run:android

# Type check
npx tsc --noEmit

# Lint
npx eslint src/ app/

# Build preview APK locally (requires EAS CLI + Expo login)
npx eas build --platform android --profile preview

# Build production APK
npx eas build --platform android --profile production

# Check Expo project health
npx expo-doctor

# Clear metro bundler cache
npx expo start --clear

# Update Expo SDK
npx expo install expo@latest
```

---

## License

MIT License. See `LICENSE` for details.

---

## Notes for Developers

**Currency:** All amounts are stored as integers (paise/cents multiplied by 100) in SQLite to avoid floating-point errors. The `formatCurrency` utility divides by 100 before displaying.

**Offline first:** The app works fully offline. Google Drive sync happens in the background only when a network connection is available and the user is signed in.

**No Firebase:** Authentication is handled entirely through Google Cloud OAuth 2.0 using expo-auth-session. There is no Realtime Database, Firestore, or any other Firebase service.

**Tabler Icons:** The app uses `@tabler/icons-react-native`. All icon names in the codebase follow the pattern `ti-icon-name` matching the Tabler Icons web library (https://tabler.io/icons). No emoji is used anywhere in the app UI.

**Theme:** The theme system mirrors the CSS variable approach in the HTML preview exactly. `colors.ts` exports both `darkColors` and `lightColors` objects. `useTheme()` reads `isDark` from `useSettingsStore` and returns the correct set at runtime.

**SQLite migrations:** `schema.ts` tracks a `schema_version` number in a `meta` table. Each migration runs only if the current version is lower than the target. This allows safe over-the-air updates without data loss.
