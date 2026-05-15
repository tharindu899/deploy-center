# FlowFi — Money Manager

> A polished personal finance Android app, built with React Native + Expo.
> Track expenses, income, accounts, loans, and budgets — all synced to Google Drive.
> Dark/light theme, multi-account, biometric lock, CSV/PDF export, and offline-first.
> Supports 40+ world currencies.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Supported Currencies](#supported-currencies)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started — Termux](#getting-started--termux)
- [Google Cloud Setup](#google-cloud-setup)
- [Environment Variables & Secrets](#environment-variables--secrets)
- [Phase-by-Phase Build Guide](#phase-by-phase-build-guide)
- [Deployment on GitHub](#deployment-on-github)
- [Useful Commands — Termux](#useful-commands--termux)
- [License](#license)

---

## Overview

FlowFi is a fully offline-first Android money manager app with multi-currency support. It uses Google Sign-In for identity and Google Drive for cloud backup. There is no Firebase — all authentication goes through Google Cloud OAuth 2.0, and all data is stored locally in SQLite on the device.

The app has five main screens: Dashboard (Home), Analytics, Loans, Accounts, and Settings. A floating action button opens the Add Transaction modal. All screens match the pixel-perfect design from the HTML preview file.

> **Built entirely from a mobile device using Termux + GitHub. No PC required.**

---

## Features

| Area | Details |
|------|---------|
| Dashboard | Total balance card, income/expense summary, account pills, quick actions, transaction list grouped by date |
| Analytics | Monthly bar chart, spending-by-category donut chart, income/expense/savings summary row |
| Loans | Lending and borrowing cards with progress bars, due dates, partial payments |
| Accounts | Bank accounts, cash wallets, mobile wallets, add/edit/delete accounts |
| Settings | Google account, Google Drive backup status, currency selector (40+ currencies), dark/light theme toggle, notification toggle, sound toggle, biometric lock toggle, data export (CSV / PDF / Excel), app update checker, sign out |
| Transactions | Add expense / income / transfer with category grid, account picker, amount input |
| Notifications | Budget alerts, loan reminders, salary credits, Drive sync status |
| Security | Biometric (fingerprint / face) lock using expo-local-authentication |
| Export | CSV, PDF, and Excel export via expo-file-system and expo-sharing |
| Themes | Dark (default) and Light mode with full theming |
| Icons | Tabler Icons throughout — no emoji in the app UI |
| Offline | All data stored locally in SQLite; Drive sync is optional and background |

---

## Supported Currencies

FlowFi supports 40+ world currencies. The default is LKR. Users can switch currency at any time from Settings.

| Code | Currency | Symbol |
|------|----------|--------|
| LKR | Sri Lankan Rupee | Rs. |
| USD | US Dollar | $ |
| EUR | Euro | € |
| GBP | British Pound | £ |
| INR | Indian Rupee | ₹ |
| JPY | Japanese Yen | ¥ |
| CNY | Chinese Yuan | ¥ |
| AUD | Australian Dollar | A$ |
| CAD | Canadian Dollar | C$ |
| SGD | Singapore Dollar | S$ |
| NZD | New Zealand Dollar | NZ$ |
| HKD | Hong Kong Dollar | HK$ |
| CHF | Swiss Franc | CHF |
| SEK | Swedish Krona | kr |
| NOK | Norwegian Krone | kr |
| DKK | Danish Krone | kr |
| AED | UAE Dirham | د.إ |
| SAR | Saudi Riyal | ﷼ |
| KWD | Kuwaiti Dinar | KD |
| QAR | Qatari Riyal | QR |
| OMR | Omani Rial | ﷼ |
| BHD | Bahraini Dinar | BD |
| JOD | Jordanian Dinar | JD |
| MYR | Malaysian Ringgit | RM |
| THB | Thai Baht | ฿ |
| IDR | Indonesian Rupiah | Rp |
| PHP | Philippine Peso | ₱ |
| VND | Vietnamese Dong | ₫ |
| KRW | South Korean Won | ₩ |
| PKR | Pakistani Rupee | ₨ |
| BDT | Bangladeshi Taka | ৳ |
| NPR | Nepali Rupee | ₨ |
| MMK | Myanmar Kyat | K |
| EGP | Egyptian Pound | E£ |
| NGN | Nigerian Naira | ₦ |
| ZAR | South African Rand | R |
| BRL | Brazilian Real | R$ |
| MXN | Mexican Peso | $ |
| TRY | Turkish Lira | ₺ |
| RUB | Russian Ruble | ₽ |

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
| Build | EAS Build (Expo Application Services — cloud) | — |
| CI/CD | GitHub Actions | — |
| Release | GitHub Releases (APK hosting) | — |

---

## Project Structure

```
📁 flowfi/
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
│   │   │   ├── 📄 BalanceCard.tsx
│   │   │   ├── 📄 TransactionCard.tsx
│   │   │   ├── 📄 AccountPill.tsx
│   │   │   ├── 📄 QuickActionGrid.tsx
│   │   │   ├── 📄 SectionLabel.tsx
│   │   │   ├── 📄 SummaryRow.tsx
│   │   │   ├── 📄 UpdateBanner.tsx
│   │   │   └── 📄 NotificationBadge.tsx
│   │   │
│   │   ├── 📁 charts/
│   │   │   ├── 📄 MonthlyBarChart.tsx
│   │   │   └── 📄 CategoryPieChart.tsx
│   │   │
│   │   ├── 📁 loans/
│   │   │   ├── 📄 LoanCard.tsx
│   │   │   └── 📄 LoanBadge.tsx
│   │   │
│   │   ├── 📁 accounts/
│   │   │   └── 📄 AccountCard.tsx
│   │   │
│   │   ├── 📁 settings/
│   │   │   ├── 📄 SettingsItem.tsx
│   │   │   └── 📄 ProfileBanner.tsx
│   │   │
│   │   ├── 📁 modals/
│   │   │   ├── 📄 AddTransactionModal.tsx
│   │   │   ├── 📄 AddLoanModal.tsx
│   │   │   └── 📄 AddAccountModal.tsx
│   │   │
│   │   └── 📁 navigation/
│   │       ├── 📄 CustomTabBar.tsx
│   │       └── 📄 NotificationPanel.tsx
│   │
│   ├── 📁 database/
│   │   ├── 📄 client.ts
│   │   ├── 📄 schema.ts
│   │   ├── 📄 transactions.ts
│   │   ├── 📄 accounts.ts
│   │   ├── 📄 loans.ts
│   │   ├── 📄 categories.ts
│   │   └── 📄 budgets.ts
│   │
│   ├── 📁 services/
│   │   ├── 📄 googleAuth.ts
│   │   ├── 📄 googleDrive.ts
│   │   └── 📄 exportService.ts
│   │
│   ├── 📁 store/
│   │   ├── 📄 useAuthStore.ts
│   │   ├── 📄 useTransactionStore.ts
│   │   ├── 📄 useAccountStore.ts
│   │   ├── 📄 useLoanStore.ts
│   │   └── 📄 useSettingsStore.ts
│   │
│   ├── 📁 hooks/
│   │   ├── 📄 useTransactions.ts
│   │   ├── 📄 useAccounts.ts
│   │   ├── 📄 useLoans.ts
│   │   ├── 📄 useBiometric.ts
│   │   └── 📄 useDriveSync.ts
│   │
│   ├── 📁 theme/
│   │   ├── 📄 colors.ts
│   │   ├── 📄 typography.ts
│   │   ├── 📄 spacing.ts
│   │   └── 📄 index.ts
│   │
│   ├── 📁 types/
│   │   └── 📄 index.ts
│   │
│   └── 📁 utils/
│       ├── 📄 formatCurrency.ts      ← Formats amount with correct symbol per currency
│       ├── 📄 currencies.ts          ← Full list of 40+ supported currencies
│       ├── 📄 dateHelpers.ts
│       └── 📄 categoryIcons.ts
│
├── 📁 assets/
│   ├── 📄 icon.png
│   ├── 📄 splash.png
│   ├── 📄 adaptive-icon.png
│   └── 📁 fonts/
│       ├── 📄 DMSans-Regular.ttf
│       ├── 📄 DMSans-Medium.ttf
│       ├── 📄 DMSans-SemiBold.ttf
│       ├── 📄 DMSans-Bold.ttf
│       └── 📄 DMMono-Regular.ttf
│
├── 🔐 .env                           ← SECRET — never commit
├── 📄 .env.example                   ← Safe template — commit this
├── 📄 .gitignore
├── 🔧 app.json
├── 🔧 eas.json
├── 📦 package.json
├── 🔧 tsconfig.json
└── 📄 README.md
```

---

## Getting Started — Termux

> **Everything below runs on your Android phone inside Termux. No PC needed.**

### Step 1 — Install Termux

Download **Termux** from [F-Droid](https://f-droid.org/en/packages/com.termux/) (recommended — always up to date).
Do NOT use the Play Store version (outdated).

### Step 2 — Set Up Termux

Open Termux and run these commands one by one:

```bash
# Update package lists
pkg update && pkg upgrade -y

# Install required tools
pkg install nodejs git openjdk-17 -y

# Verify installations
node -v       # should print v20.x or later
npm -v        # should print v10.x or later
git --version
java -version
```

### Step 3 — Install Global CLI Tools

```bash
npm install -g expo-cli eas-cli
```

### Step 4 — Clone Your Repo

```bash
git clone https://github.com/YOUR_USERNAME/flowfi.git
cd flowfi
npm install
```

### Step 5 — Configure Environment

```bash
cp .env.example .env
nano .env   # fill in your Google Cloud credentials
```

### Step 6 — Run for Development (Expo Go)

Since there is no emulator on mobile, use **Expo Go** + tunnel mode:

```bash
npx expo start --tunnel
```

1. Install **Expo Go** from the Play Store on your phone (or another Android device).
2. Scan the QR code shown in Termux with the Expo Go app.
3. The app loads live on your device — every save in Termux auto-reloads it.

> **Tip:** Keep Termux running in the background. Use a split-screen or a second Termux session (`termux-open`) to edit files while the server runs.

### Step 7 — Edit Files in Termux

```bash
# Install a terminal text editor
pkg install micro -y      # modern, easy editor (Ctrl+S to save, Ctrl+Q to quit)
# OR
pkg install vim -y        # if you prefer vim
```

You can also push files from GitHub's web editor and pull them in Termux.

---

## Google Cloud Setup

FlowFi uses Google Cloud only — no Firebase. Follow these steps exactly.

### Step 1 — Create a Google Cloud Project

1. Open https://console.cloud.google.com on your phone browser
2. Click the project dropdown → **New Project**
3. Name it `FlowFi` → **Create**

### Step 2 — Enable Required APIs

Go to **APIs & Services → Library** and enable:

```
Google Identity / People API
Google Drive API
```

### Step 3 — Configure OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen**
2. Choose **External** → **Create**
3. Fill in:
   - App name: `FlowFi`
   - User support email: your Gmail
   - Developer contact email: your Gmail
4. Click **Save and Continue** through all steps
5. On **Test users**, add your own Gmail address

### Step 4 — Create OAuth 2.0 Credentials

Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.

Create **two** client IDs:

**Android client ID:**
- Application type: `Android`
- Package name: `com.yourname.flowfi`
- SHA-1 fingerprint: run this in Termux:

```bash
# Generate debug SHA-1 in Termux
keytool -keystore ~/.android/debug.keystore \
        -list -v -alias androiddebugkey \
        -storepass android -keypass android
```

**Web client ID:**
- Application type: `Web application`
- Name: `FlowFi Web`
- Authorized redirect URIs: `https://auth.expo.io/@YOUR_EXPO_USERNAME/flowfi`

### Step 5 — Enable Google Drive Scope

Go to **OAuth consent screen → Scopes → Add or remove scopes** and add:

```
https://www.googleapis.com/auth/drive.appdata
```

---

## Environment Variables & Secrets

> **IMPORTANT:** Never commit `.env`. It is in `.gitignore`. Only commit `.env.example`.

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
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=123456789-xxxx.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=123456789-yyyy.apps.googleusercontent.com
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_APP_VERSION=1.0.0
```

### GitHub Actions Secrets

Add these in **GitHub → Repo → Settings → Secrets and variables → Actions → New repository secret**:

| Secret Name | Where to get it | What it's for |
|------------|----------------|---------------|
| `EXPO_TOKEN` | expo.dev → Account Settings → Access Tokens | EAS Build auth |
| `GOOGLE_WEB_CLIENT_ID` | Google Cloud Console → Credentials | OAuth Web Client ID |
| `GOOGLE_ANDROID_CLIENT_ID` | Google Cloud Console → Credentials | OAuth Android Client ID |
| `KEYSTORE_BASE64` | Generated in Termux (see below) | Signing the APK |
| `KEYSTORE_ALIAS` | The alias you set when generating | Signing the APK |
| `KEYSTORE_PASSWORD` | Your keystore password | Signing the APK |
| `KEY_PASSWORD` | Your key password | Signing the APK |

### Generate the Release Keystore in Termux

```bash
# Generate the keystore (run once — store it safely)
keytool -genkeypair -v \
  -keystore release.keystore \
  -alias flowfi \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

```bash
# Encode for GitHub Secrets (Termux syntax)
base64 release.keystore
```

Copy the output and paste it as the value of `KEYSTORE_BASE64` in GitHub Secrets.

---

## Phase-by-Phase Build Guide

Each phase has a list of files to create and a ready-to-copy prompt for Claude AI.
Work through phases in order. Each prompt builds on the previous.

---

### Phase 1 — Project Setup & Foundation

**Files in this phase:**
```
📁 flowfi/
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
I am building a React Native + Expo SDK 52 app called FlowFi (multi-currency money manager
supporting 40+ world currencies, default LKR).

Generate the following files with TypeScript:

1. app.json — Expo config with:
   - name: "FlowFi", slug: "flowfi", version: "1.0.0"
   - package: "com.yourname.flowfi"
   - Android permissions: CAMERA, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE,
     USE_BIOMETRIC, USE_FINGERPRINT, RECEIVE_BOOT_COMPLETED, VIBRATE
   - plugins: expo-font, expo-sqlite, expo-local-authentication, expo-notifications
   - scheme: "flowfi" (for OAuth deep link)

2. eas.json — EAS Build profiles:
   - development: developmentClient, simulator false
   - preview: internal distribution, APK build
   - production: store distribution, APK build
   - All profiles use Android platform

3. tsconfig.json — strict TypeScript with path alias "@/*" pointing to "src/*"

4. .gitignore — standard Expo .gitignore including .env, node_modules, .expo,
   android/, ios/, *.jks, *.keystore

5. src/theme/colors.ts — dark and light color tokens as TypeScript constants:
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

6. src/theme/typography.ts — font styles using DM Sans (300/400/500/600/700) and DM Mono

7. src/theme/spacing.ts — radius: 18, radiusSm: 10, radiusXs: 6, standard spacing scale

8. src/theme/index.ts — exports useTheme() hook that reads from useSettingsStore isDark boolean

9. app/_layout.tsx — root layout that loads fonts, shows SplashScreen, wraps children
   in ThemeProvider, uses expo-router Stack navigator
```

---

### Phase 2 — Types, Currency Utils & Database Schema

**Files in this phase:**
```
📁 src/
├── 📄 types/index.ts
├── 📄 utils/currencies.ts
├── 📄 utils/formatCurrency.ts
├── 📄 database/client.ts
└── 📄 database/schema.ts
```

**Claude AI Prompt — copy this exactly:**

```
For the FlowFi React Native app (Expo SDK 52, TypeScript, expo-sqlite v14), generate:

1. src/types/index.ts with these TypeScript interfaces:

Transaction: id, uuid, type ('expense'|'income'|'transfer'), amount (number),
  category_id, account_id, to_account_id (transfer), note, date (ISO string),
  created_at, updated_at

Account: id, name, type ('bank'|'cash'|'mobile_wallet'), balance (number),
  color (hex string), icon (tabler icon name string), mask (last 4 digits optional),
  created_at

Loan: id, person_name, initials (2 chars), avatar_color (hex),
  direction ('lending'|'borrowing'), purpose, total_amount, paid_amount,
  interest_rate (optional), due_date (ISO string optional), created_at

Category: id, name, icon (tabler icon name), color (hex), type ('expense'|'income'|'both')

Budget: id, category_id, month (YYYY-MM string), limit_amount, spent_amount

User: google_id, name, email, photo_url, access_token, refresh_token, token_expiry

Currency: code (string), name (string), symbol (string), symbolPosition ('before'|'after')

2. src/utils/currencies.ts — export CURRENCIES array of Currency objects for all 40 currencies:
   LKR (Rs., before), USD ($, before), EUR (€, before), GBP (£, before),
   INR (₹, before), JPY (¥, before), CNY (¥, before),
   AUD (A$, before), CAD (C$, before), SGD (S$, before), NZD (NZ$, before),
   HKD (HK$, before), CHF (CHF, before), SEK (kr, after), NOK (kr, after), DKK (kr, after),
   AED (د.إ, before), SAR (﷼, before), KWD (KD, before), QAR (QR, before),
   OMR (﷼, before), BHD (BD, before), JOD (JD, before),
   MYR (RM, before), THB (฿, before), IDR (Rp, before), PHP (₱, before),
   VND (₫, after), KRW (₩, before), PKR (₨, before), BDT (৳, before),
   NPR (₨, before), MMK (K, before), EGP (E£, before), NGN (₦, before),
   ZAR (R, before), BRL (R$, before), MXN ($, before), TRY (₺, before), RUB (₽, before)
   Also export getCurrency(code: string): Currency helper function.

3. src/utils/formatCurrency.ts — formatAmount(amount: number, currencyCode: string): string
   - Looks up the Currency from CURRENCIES
   - Formats with 2 decimal places (except JPY, KRW, VND, IDR — 0 decimals)
   - Places symbol before or after based on symbolPosition
   - Handles thousands separator with commas
   Example: formatAmount(1500.50, 'USD') → '$1,500.50'
   Example: formatAmount(1500, 'JPY') → '¥1,500'
   Example: formatAmount(1500.50, 'SEK') → '1,500.50 kr'

4. src/database/client.ts — SQLite singleton using expo-sqlite openDatabaseAsync('flowfi.db'),
   exported as a lazy singleton with a getDb() async function

5. src/database/schema.ts — SQL CREATE TABLE IF NOT EXISTS for all 5 tables,
   plus initDatabase() async function that runs all migrations in order,
   seeds categories: Food (ti-tools-kitchen-2, red), Transport (ti-car, accent),
   Shopping (ti-shopping-bag, amber), Health (ti-heartbeat, green),
   Utilities (ti-bolt, purple), Entertainment (ti-device-tv, pink),
   Education (ti-school, teal), Salary (ti-cash, green), Other (ti-dots, text2)
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
For FlowFi (React Native, Expo, TypeScript, expo-sqlite v14, Zustand v4), generate:

1. src/database/transactions.ts — async functions:
   getAllTransactions(): Promise<Transaction[]> — ordered by date DESC
   getTransactionsByAccount(accountId): Promise<Transaction[]>
   getTransactionsByMonth(year, month): Promise<Transaction[]>
   insertTransaction(tx: Omit<Transaction,'id'>): Promise<number>
   updateTransaction(id, data: Partial<Transaction>): Promise<void>
   deleteTransaction(id): Promise<void>

2. src/database/accounts.ts — CRUD for accounts,
   plus updateBalance(id, delta) that adds/subtracts from balance

3. src/database/loans.ts — CRUD for loans,
   plus recordPayment(id, amount) that adds to paid_amount

4. src/database/categories.ts — getCategories(), getCategoriesByType(type)

5. src/database/budgets.ts — getBudgetsForMonth(year, month), upsertBudget(...),
   incrementSpent(categoryId, month, amount)

6. src/store/useAuthStore.ts — Zustand: user (User|null), isSignedIn, setUser(), clearUser(),
   updateTokens()

7. src/store/useTransactionStore.ts — Zustand: transactions[], activeAccountFilter (number|null),
   isLoading, loadTransactions(), addTransaction(data), deleteTransaction(id),
   setAccountFilter(id|null)

8. src/store/useAccountStore.ts — Zustand: accounts[], totalBalance, loadAccounts(),
   addAccount(data), deleteAccount(id)

9. src/store/useLoanStore.ts — Zustand: loans[], loadLoans(), addLoan(data),
   recordPayment(id, amount)

10. src/store/useSettingsStore.ts — Zustand persisted with AsyncStorage:
    isDark (true by default),
    currency ('LKR' by default — supports all 40 currency codes from CURRENCIES),
    notificationsEnabled (true), soundEnabled (true), biometricEnabled (false),
    toggleDark(), setCurrency(code: string)
    The setCurrency action must validate that the code exists in CURRENCIES before saving.

Import Transaction, Account, Loan, User types from src/types/index.ts.
Import formatAmount from src/utils/formatCurrency.ts where needed.
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
For FlowFi (React Native, Expo SDK 52, TypeScript), build Google OAuth 2.0 sign-in
WITHOUT Firebase — using expo-auth-session and Google Identity REST API only.

1. src/services/googleAuth.ts:
   - Use expo-auth-session/providers/google with WebBrowser
   - Read EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID and EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID from env
   - Export signInWithGoogle(): opens Google OAuth, returns { user: User, accessToken, refreshToken }
   - Export refreshAccessToken(refreshToken): exchanges refresh token for new access token
   - Export signOut(): clears stored tokens
   - After sign-in, call https://www.googleapis.com/oauth2/v2/userinfo to get name, email, picture
   - Request scopes: openid, email, profile, https://www.googleapis.com/auth/drive.appdata

2. app/login.tsx — Login screen:
   - Dark background (#0d0f14)
   - Centered layout: app logo ("FF" initials in accent gradient circle 80px),
     app name "FlowFi" in DM Sans Bold 28px, tagline "Your money, your flow" in text2
   - Google sign-in button: white pill with inline SVG Google "G" logo + "Continue with Google"
   - On press: call signInWithGoogle(), save user to useAuthStore, router.replace('/(tabs)')
   - ActivityIndicator while loading
   - Red error text on failure

3. app/index.tsx — Entry point:
   - Check useAuthStore.isSignedIn
   - If signed in: router.replace('/(tabs)')
   - If not: router.replace('/login')
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
For FlowFi (React Native, Expo, TypeScript, @tabler/icons-react-native, DM Sans font),
build the Home Dashboard screen. No emoji — Tabler Icons only.
All amounts must use formatAmount(amount, currencyCode) from src/utils/formatCurrency.ts,
reading currencyCode from useSettingsStore.currency.

1. src/components/common/BalanceCard.tsx:
   - Dark gradient: LinearGradient '#1a2340' → '#1a1040' → '#0f1a38'
   - "Total Balance" label (small, uppercase, white 60% opacity)
   - Balance with correct currency symbol via formatAmount()
   - Two chips: Income (ti-trending-up, green) and Expenses (ti-trending-down, red)
   - Props: totalBalance, monthlyIncome, monthlyExpenses (numbers), currencyCode (string)

2. src/components/common/AccountPill.tsx:
   - Horizontal scroll: colored dot + name + balance (formatted with formatAmount)
   - Active: accent background, "All" pill first, Add pill last (dashed, ti-plus)

3. src/components/common/QuickActionGrid.tsx:
   - 2×4 grid: Expense (ti-minus-circle, red), Income (ti-plus-circle, green),
     Transfer (ti-arrows-exchange, accent), Loan (ti-clock-dollar, amber),
     Bank Pay (ti-building-bank, purple), Budget (ti-target, pink),
     Scan Bill (ti-qrcode, teal), More (ti-dots, text2)

4. src/components/common/TransactionCard.tsx:
   - Icon + name + meta (category • account) + formatted amount
   - Expense: red with "−", Income: green with "+", Transfer: accent

5. src/components/navigation/NotificationPanel.tsx:
   - Full-screen overlay, slide-in from right animation
   - Header: back arrow + "Notifications" + "Mark all read"
   - List: colored dot + title + description + time + unread dot

6. app/(tabs)/index.tsx — Home screen:
   - "Good morning/afternoon/evening" + user first name
   - Bell icon (with badge) → opens NotificationPanel
   - User avatar circle (initials, accent gradient)
   - ScrollView: UpdateBanner, BalanceCard, AccountPill, QuickActionGrid,
     grouped transaction list (date headers + TransactionCards)
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
For FlowFi (React Native, Expo, TypeScript, react-native-gifted-charts),
build the Analytics screen. No emoji — Tabler Icons only.
All amounts formatted with formatAmount() from src/utils/formatCurrency.ts.

1. src/components/charts/MonthlyBarChart.tsx:
   - BarChart from react-native-gifted-charts
   - 5-month expense bars, active month in accent, others red at 70%
   - Props: monthlyData (Array<{month, amount, isActive}>)

2. src/components/charts/CategoryPieChart.tsx:
   - PieChart donut style, centerLabel shows month name
   - Legend: colored square + category name + percentage
   - Props: categoryData (Array<{name, color, value, percentage}>)

3. src/components/common/SummaryRow.tsx:
   - 3-column (or 2-column) summary cards: value in color + small label
   - Props: items (Array<{value: string, label: string, color: string}>)

4. app/(tabs)/analytics.tsx:
   - Header: "Analytics" title + month pill + calendar icon
   - Month navigation arrows
   - SummaryRow: Income (green), Expenses (red), Savings (accent)
   - MonthlyBarChart card
   - CategoryPieChart card
   - All data from useTransactionStore filtered by selected month/year
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
For FlowFi (React Native, Expo, TypeScript), build the Loans screen. No emoji — Tabler Icons only.
All amounts formatted with formatAmount() from src/utils/formatCurrency.ts.

1. src/components/loans/LoanCard.tsx:
   - Avatar circle (initials + gradient) + name + purpose + due date + lending/borrowing badge
   - Amount in green (lending) or red (borrowing), DM Sans Bold 22px
   - Progress bar (5px height, rounded) showing paid/total ratio
   - "Paid: [amount]" left, "Remaining: [amount]" right
   - Props: loan (Loan type)

2. src/components/loans/LoanBadge.tsx:
   - Pill: "Lending" in green, "Borrowing" in red
   - Props: direction ('lending'|'borrowing')

3. src/components/modals/AddLoanModal.tsx:
   - Bottom sheet: Person Name, Direction toggle, Purpose, Total Amount, Interest Rate, Due Date
   - Avatar color auto-assigned from preset palette
   - Save: calls useLoanStore.addLoan()

4. src/hooks/useLoans.ts:
   - On mount: calls useLoanStore.loadLoans()
   - Returns { loans, isLoading }

5. app/(tabs)/loans.tsx:
   - Header: "Loans" + "+" button
   - SummaryRow: Total Lent (green), Total Owed (red), Net (accent)
   - "You Lent" section + "You Owe" section with LoanCards
   - Empty states per section
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
For FlowFi (React Native, Expo, TypeScript), build the Accounts screen. No emoji — Tabler Icons only.
All amounts use formatAmount() from src/utils/formatCurrency.ts.

1. src/components/accounts/AccountCard.tsx:
   - 50×50 icon container (rounded 16px) + account name + type + mask number
   - Balance value (DM Sans Bold 18px) + "Available"/"On hand" label
   - Last card: dashed "Add New Account" card with ti-plus icon

2. src/components/modals/AddAccountModal.tsx:
   - Bottom sheet: name input, type selector (Bank/Cash/Mobile Wallet),
     initial balance input, icon picker, color picker (6 preset colors)
   - Save: calls useAccountStore.addAccount()

3. src/hooks/useAccounts.ts:
   - Loads accounts on mount
   - Returns { accounts, totalBalance, isLoading }

4. app/(tabs)/accounts.tsx:
   - Header: "Accounts" + "+"
   - SummaryRow: Net Worth + Accounts count
   - "Bank Accounts" section + "Wallets" section
   - Add New Account dashed card at bottom
   - Swipe-to-delete (react-native-gesture-handler)
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
For FlowFi (React Native, Expo, TypeScript, @tabler/icons-react-native), build:

1. src/components/modals/AddTransactionModal.tsx:
   - Bottom sheet: drag handle, title "Add Transaction"
   - Type tabs: Expense (red) / Income (green) / Transfer (accent)
   - Amount input: currency symbol prefix from useSettingsStore.currency + DM Mono 32px
   - Category grid: 4 columns, Food (ti-tools-kitchen-2 red), Transport (ti-car accent),
     Shopping (ti-shopping-bag amber), Health (ti-heartbeat green), Utilities (ti-bolt purple),
     Entertainment (ti-device-tv pink), Education (ti-school teal), Other (ti-dots text2)
   - Account selector pill
   - "Save Transaction" button: full-width accent gradient
   - On save: calls useTransactionStore.addTransaction(), updates account balance, closes modal

2. src/components/navigation/CustomTabBar.tsx:
   - 5 items: Home (ti-home-2), Analytics (ti-chart-pie), [FAB center], Loans (ti-clock-dollar),
     Settings (ti-settings-2)
   - FAB: 58×58 accent gradient circle, margin-top -22px, 3px white border
   - Active: accent, inactive: text3 — label below icon, 10px DM Sans Medium
   - Safe area bottom inset support

3. app/(tabs)/_layout.tsx:
   - Expo Router Tabs using CustomTabBar
   - 5 tab screens: index, analytics, loans, accounts, settings
   - headerShown: false for all
```

---

### Phase 10 — Settings Screen, Currency Picker & Export

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
For FlowFi (React Native, Expo, TypeScript, expo-file-system, expo-sharing), build:

1. src/components/settings/ProfileBanner.tsx:
   - Gradient banner (#1a2340 → #0f1a38)
   - User avatar (60px, initials DM Sans Bold 22px)
   - Name, email, Drive sync status (green dot + "Google Drive synced")

2. src/components/settings/SettingsItem.tsx:
   - Row: colored icon square (34×34, rounded 9px) + label + optional subtitle + right element
   - Right: ti-chevron-right OR Toggle switch (42×24px pill, animated) OR badge

3. src/services/exportService.ts:
   - exportToCSV(transactions, accounts, currencyCode): generates CSV with formatted amounts,
     saves to DocumentDirectory, opens share sheet
   - exportToPDF(transactions, currencyCode): generates HTML string, converts with expo-print,
     saves PDF, shares
   - exportToExcel(transactions, currencyCode): generates XLSX using SheetJS, saves, shares

4. app/(tabs)/settings.tsx:
   - ProfileBanner at top
   - Section "Account": Google Account (ti-brand-google), Google Drive Backup (ti-cloud-upload),
     Currency (ti-world, amber) → shows current currency name, tap opens a searchable modal
     listing all 40 currencies from CURRENCIES array with code + name + symbol
   - Section "Preferences": Dark Theme toggle, Notifications toggle,
     Transaction Sounds toggle, Biometric Lock toggle
   - Section "More": Export Data → CSV/PDF/Excel action sheet,
     Check for Updates, Sign Out
   
   Currency Picker Modal:
   - Full-screen modal with search bar (filter by code or name)
   - FlatList of all 40 currencies: symbol badge + code (bold) + full name
   - Active currency has accent checkmark
   - On select: calls useSettingsStore.setCurrency(code), closes modal
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
For FlowFi (React Native, Expo, TypeScript), build:

1. src/services/googleDrive.ts — Google Drive REST API v3 (no Firebase, no SDK):
   - uploadBackup(accessToken, data: object):
     * Checks if flowfi-backup.json exists in appDataFolder
     * If exists: PATCH update; if not: POST create with metadata {name:'flowfi-backup.json', parents:['appDataFolder']}
   - downloadBackup(accessToken):
     * Finds backup file id, downloads content, returns parsed JSON
   - All functions handle 401 errors by calling refreshAccessToken from googleAuth.ts
   - Export: uploadBackup, downloadBackup, getLastSyncTime

2. src/hooks/useDriveSync.ts:
   - On mount: check if last sync was >24 hours ago (AsyncStorage)
   - If yes: collect transactions + accounts + loans, call uploadBackup()
   - Save current timestamp as last sync time
   - Export: { syncNow, lastSyncTime, isSyncing }

3. src/hooks/useBiometric.ts:
   - On app foreground (AppState 'active'), if biometricEnabled:
     * Call LocalAuthentication.authenticateAsync()
     * On fail: Alert with retry or "Use passcode"
     * Block UI with overlay while pending
   - Export: { isLocked, unlock() }
```

---

### Phase 12 — Build & Release APK via GitHub Actions

**Files in this phase:**
```
📁 .github/workflows/
├── 📄 build-apk.yml
└── 📄 pr-check.yml
🔧 eas.json (final update)
```

**Claude AI Prompt — copy this exactly:**

```
For FlowFi (React Native, Expo, EAS Build, GitHub Actions), generate:

1. .github/workflows/build-apk.yml:
   - Trigger: push to main OR manual workflow_dispatch
   - Job: build on ubuntu-latest
     * Checkout code
     * Setup Node 20
     * npm install
     * npm install -g eas-cli
     * Login to Expo with EXPO_TOKEN secret
     * Write .env from secrets: EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID, EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID
     * Decode keystore: echo $KEYSTORE_BASE64 | base64 -d > release.keystore
     * Build APK: eas build --platform android --profile preview --non-interactive --no-wait → get build ID
     * Wait for build, download APK artifact
     * Create GitHub Release with tag v1.0.${{ github.run_number }}
     * Upload APK as release asset
   - All sensitive values from GitHub Secrets

2. .github/workflows/pr-check.yml:
   - Trigger: pull_request to main
   - Steps: checkout, setup node, npm install, npx tsc --noEmit, npx expo-doctor

3. eas.json final version:
   - development: developmentClient true, distribution internal
   - preview: distribution internal, android.buildType apk, channel preview
   - production: distribution store, android.buildType apk, channel production

Generate all files with complete YAML, no placeholder comments.
```

---

## Deployment on GitHub

### How It Works

FlowFi is deployed entirely through GitHub with no external hosting services.

The APK is built using **EAS Build** (Expo's cloud build — free tier: 30 builds/month) and published to a **GitHub Release**. Users download the APK directly from GitHub Releases and sideload it on their Android device.

### Step-by-Step First Deployment from Termux

```bash
# 1. Create the repo (do this on GitHub.com via browser first, then:)
cd ~
git clone https://github.com/YOUR_USERNAME/flowfi.git
cd flowfi
```

```bash
# 2. Initial commit
git add .
git commit -m "feat: initial FlowFi project"
git push -u origin main
```

Before pushing, confirm `.env` is in `.gitignore`. Never push your `.env` file.

```bash
# 3. Log in to Expo and link project
npx eas-cli login
npx eas-cli init
# Sets projectId in app.json automatically
```

```bash
# 4. Add GitHub Secrets
# Go to: GitHub (browser) → Your Repo → Settings → Secrets → Actions
# Add all secrets from the table above
```

```bash
# 5. Trigger first build
# In GitHub browser → Your Repo → Actions → "Build APK" → Run workflow
# OR just push a commit to main
```

```bash
# 6. Download the APK
# GitHub browser → Your Repo → Releases → Latest Release → download .apk
# Install directly on your device (enable "Install from unknown sources")
```

### Updating the App

Any push to `main` triggers a new build and release automatically.
Version tag is `v1.0.{run_number}` — each release gets a unique version.

### Free Tier Limits

| Service | Free Limit |
|---------|-----------|
| EAS Build | 30 builds / month, max 15 min per build |
| GitHub Actions | 2,000 minutes / month |
| GitHub Releases | Unlimited, 2 GB per file |
| Google Cloud | OAuth 2.0 is free |
| Google Drive API | Free up to 15 GB per user's Drive |

---

## Useful Commands — Termux

```bash
# Update Termux packages
pkg update && pkg upgrade -y

# Start development server (Termux + Expo Go on same device)
npx expo start --tunnel

# Push changes to GitHub
git add .
git commit -m "your message"
git push

# Pull latest changes
git pull

# Type check
npx tsc --noEmit

# Lint
npx eslint src/ app/

# Trigger cloud APK build (no PC needed — runs on EAS servers)
npx eas build --platform android --profile preview

# Check Expo project health
npx expo-doctor

# Clear metro bundler cache
npx expo start --tunnel --clear

# Update Expo SDK
npx expo install expo@latest

# Generate keystore (Termux)
keytool -genkeypair -v \
  -keystore release.keystore \
  -alias flowfi \
  -keyalg RSA -keysize 2048 -validity 10000

# Encode keystore for GitHub Secrets (Termux syntax)
base64 release.keystore
```

---

## License

MIT License. See `LICENSE` for details.

---

## Notes for Developers

**Currency:** All amounts are stored as integers (multiplied by 100) in SQLite to avoid floating-point errors. `formatAmount()` in `src/utils/formatCurrency.ts` divides by 100 and applies the correct symbol and decimal rules per currency (JPY, KRW, VND, IDR use 0 decimals).

**Multi-currency:** The active display currency is stored in `useSettingsStore.currency`. All UI components read this and pass it to `formatAmount()`. Changing the currency in Settings instantly reformats all displayed amounts.

**Offline first:** The app works fully offline. Google Drive sync happens in the background only when a network connection is available and the user is signed in.

**No Firebase:** Authentication is handled entirely through Google Cloud OAuth 2.0 using expo-auth-session. No Realtime Database, Firestore, or any other Firebase service.

**Termux workflow:** All development, git operations, and EAS cloud builds run from Termux on Android. No PC or emulator needed — use Expo Go with `--tunnel` flag for live development preview.

**Tabler Icons:** All icons use `@tabler/icons-react-native`. No emoji anywhere in the app UI.

**SQLite migrations:** `schema.ts` tracks a `schema_version` in a `meta` table. Each migration runs only if the current version is lower than the target, allowing safe updates without data loss.
