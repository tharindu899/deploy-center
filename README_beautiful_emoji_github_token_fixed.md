# 💰 CashWise — Personal Money Manager

<p align="center">
  <b>✨ A clean, offline-first Android money manager built with Expo + React Native + TypeScript ✨</b>
</p>

<p align="center">
  <img alt="Expo" src="https://img.shields.io/badge/Expo-SDK%2051-000000?style=for-the-badge&logo=expo&logoColor=white" />
  <img alt="React Native" src="https://img.shields.io/badge/React%20Native-0.74-61DAFB?style=for-the-badge&logo=react&logoColor=111111" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="APK" src="https://img.shields.io/badge/Release-GitHub%20APK-181717?style=for-the-badge&logo=github&logoColor=white" />
</p>

> 🚀 **CashWise** is a modern Android finance tracker with local-first storage, Google Sign-In, Google Drive backup, biometric lock, charts, notifications, and GitHub APK delivery.
>
> 🔐 **No Firebase. No ads. No subscriptions.** Data stays on the device and in the user's own Google Drive backup.
>
> 📝 This README uses emojis for clarity and style. The app UI/code can still stay emoji-free.

---

## ✨ Quick Highlights

| 🚀 Area | ✅ What CashWise Includes |
|---|---|
| 💸 Money Tracking | Income, expenses, transfers, categories, accounts |
| 🏦 Accounts | Bank accounts, cash wallet, mobile wallet, net worth |
| 📊 Analytics | Monthly summary, category pie chart, 6-month bar chart |
| 🤝 Loans | Lending, borrowing, repayment progress, due reminders |
| 🔐 Security | Google Sign-In, biometric lock, local-first data |
| ☁️ Backup | Google Drive export and restore |
| 📦 Release | APK builds delivered through GitHub Releases |

---

## 🧭 Table of Contents

- [📱 App Identity](#app-identity)
- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [🗂️ Project Structure](#project-structure)
- [🔑 Shared Types](#shared-types)
- [✅ Prerequisites](#prerequisites)
- [⚙️ Local Development Setup](#local-development-setup)
- [📲 app.json — Full APK-Ready Config](#appjson--full-apk-ready-config)
- [☁️ Google Cloud Setup](#google-cloud-setup--sign-in-only)
- [🔐 GitHub Secrets](#github-secrets)
- [🏗️ EAS Build Configuration](#eas-build-configuration)
- [🔒 Biometric Lock Implementation](#biometric-lock-implementation)
- [🔔 Local Notifications Setup](#local-notifications-setup)
- [🚀 GitHub Actions — APK Build and Release](#github-actions--apk-build-and-release)
- [🧪 Testing with Expo Go](#testing-with-expo-go)
- [📱 Termux Workflow](#termux-workflow--git-push-from-phone)
- [🧩 Phase-by-Phase TODO List](#phase-by-phase-todo-list)
- [📦 GitHub APK Release](#github-apk-release)
- [🛟 Troubleshooting](#troubleshooting)

---

<a id="app-identity"></a>
## 📱 App Identity

| Field              | Value                                         |
|--------------------|-----------------------------------------------|
| App Name           | CashWise                                      |
| Package Name       | `com.tharindu899.cashwise`                    |
| Bundle Identifier  | `com.tharindu899.cashwise`                    |
| GitHub Repo        | `https://github.com/tharindu899/cashwise`     |
| Version            | 1.0.0                                         |
| Platform           | Android (APK release via GitHub Releases)     |
| Min SDK            | Android 6.0 — API 23                          |
| Target SDK         | Android 14 — API 34                           |
| Framework          | Expo SDK 51 / React Native 0.74               |
| Language           | TypeScript 5.3 — TSX components, TS utilities |
| Author             | tharindu899                                   |

---

<a id="features"></a>
## ✨ Features

### 🏠 Home Screen

- 💳 Total balance card with monthly income and expense summary
- 🏦 Multi-account filter pills — All, BOC Bank, Cash, HNB, eZ Cash
- ⚡ Quick action grid — Expense, Income, Transfer, Loan, Bank Pay, Budget, Scan Bill
- 🗓️ Date-grouped transaction list with category icons
- 🔔 Notification bell with unread badge count
- ⬆️ In-app update banner with version info

### 📊 Analytics Screen

- 📈 Monthly summary row — income, expenses, savings
- 📊 Bar chart — 6-month spending trend by category
- 🥧 Pie chart — category breakdown with legend
- 🗓️ Month picker — arrow navigation

### 🤝 Loans Screen

- 🧾 Summary row — total lent, total owed, active loans
- 🤝 You Lent section — lending cards with progress bar and due date
- 🧮 You Owe section — borrowing cards with interest rate and repayment progress
- 🟢 Green lending badge and red borrowing badge

### 🏦 Accounts Screen

- 💼 Net worth and account count summary
- 🏛️ Bank accounts list — name, masked number, available balance
- 👛 Wallets list — Cash wallet, eZ Cash mobile wallet
- ➕ Add new account dashed-border card

### ⚙️ Settings Screen

- 👤 Google account profile banner with Drive sync status
- ☁️ Google Drive backup — export and restore full data
- 💱 Currency selector — default Sri Lankan Rupee (LKR)
- 🌙 Dark theme toggle persisted across launches
- 🔔 Notification toggle — bill reminders, budget alerts
- 🔊 Transaction sounds toggle
- 🔐 Biometric lock toggle — fingerprint / face unlock
- 📤 Export data — CSV via system share sheet
- 🔄 Check for updates via GitHub Releases API
- 🚪 Sign out

### ➕ Add Transaction Modal

- Type selector — Expense, Income, Transfer
- Amount input with Rs. currency prefix
- Category picker — Food, Transport, Shopping, Health, Utilities, Entertainment, Education, Other
- Account selector and optional note field
- Save button with gradient

### 🔔 Notifications Panel

- Slide-in panel from home screen header bell icon
- Budget alert, loan due reminder, salary received, sync status items
- Mark all read action

### 📣 Local Notifications

- Android notification channel `cashwise_alerts` — importance HIGH, sound enabled
- Budget alert triggered when category spending crosses 80% of rolling average
- Loan due reminder triggers 3 days before each active loan due date
- Daily log reminder optional 8 PM nudge
- Notification permission requested on first post-sign-in launch (Android 13+ / API 33+)

---

<a id="tech-stack"></a>
## 🛠️ Tech Stack

| Layer          | Library / Tool                                        | Version   |
|----------------|-------------------------------------------------------|-----------|
| Framework      | Expo                                                  | SDK 51    |
| Language       | TypeScript                                            | 5.3.x     |
| UI Runtime     | React Native                                          | 0.74      |
| React          | React                                                 | 18.2      |
| Navigation     | React Navigation — Bottom Tabs + Stack                | v6        |
| Local Storage  | `@react-native-async-storage/async-storage`           | 1.23      |
| Icons          | `@expo/vector-icons` MaterialCommunityIcons           | —         |
| Charts         | `react-native-gifted-charts`                          | latest    |
| Gradients      | `expo-linear-gradient`                                | —         |
| Google Sign-In | `@react-native-google-signin/google-signin`           | 11.x      |
| Google Drive   | REST API via native fetch — no SDK                    | —         |
| File Export    | `expo-file-system` + `expo-sharing`                   | —         |
| Biometric      | `expo-local-authentication`                           | —         |
| Notifications  | `expo-notifications`                                  | —         |
| Camera         | `expo-camera`                                         | —         |
| App Constants  | `expo-constants`                                      | —         |
| Build          | EAS Build — Expo free tier (30 builds/month)          | —         |
| CI/CD          | GitHub Actions                                        | —         |
| APK Release    | GitHub Releases                                       | —         |
| Git on Phone   | Termux                                                | —         |

---

<a id="project-structure"></a>
## 🗂️ Project Structure

Icon legend:
`📂` Directory | `⚛️` TSX Component | `🟦` TS File | `⚙️` Config/JSON | `🖼️` Image Asset | `📋` Markdown | `🔒` Secret/Env | `🎨` Theme/Colors | `🧭` Navigation | `🪝` Hook | `🔌` Service | `🗄️` Storage | `🔧` Utility | `📌` Constants | `🏗️` Context | `🔑` Types | `🔄` Workflow/CI | `📦` Package Config

```
📂 cashwise/                               ← GitHub repo: tharindu899/cashwise
│
├── 📂 .github/
│   └── 📂 workflows/
│       ├── 🔄 build-apk.yml              ← Trigger on git tag v* → EAS build → GitHub Release APK
│       └── 🔄 preview.yml               ← Trigger on PR → Expo update QR for phone preview
│
├── 📂 assets/
│   ├── 🖼️  icon.png                      ← App icon 1024×1024 PNG, no transparency
│   ├── 🖼️  splash.png                    ← Splash screen 1284×2778 PNG, dark bg #0d0f14
│   ├── 🖼️  adaptive-icon.png             ← Android adaptive icon 1024×1024 PNG
│   └── 🖼️  favicon.png                   ← Web favicon 48×48 PNG
│
├── 📂 src/
│   │
│   ├── 📂 types/
│   │   └── 🔑 index.ts                   ← All shared interfaces: Transaction, Account, Loan, User, Category
│   │
│   ├── 📂 screens/
│   │   ├── ⚛️  HomeScreen.tsx             ← Dashboard: balance card, accounts, quick actions, transactions
│   │   ├── ⚛️  AnalyticsScreen.tsx        ← Charts: bar chart, pie chart, monthly summary row
│   │   ├── ⚛️  LoansScreen.tsx            ← Loans: lend/borrow cards with progress bars
│   │   ├── ⚛️  AccountsScreen.tsx         ← Accounts: bank accounts and wallets list
│   │   ├── ⚛️  SettingsScreen.tsx         ← Settings: Google auth, Drive backup, all toggles
│   │   └── ⚛️  OnboardingScreen.tsx       ← First launch: Google Sign-In button and branding
│   │
│   ├── 📂 components/
│   │   ├── ⚛️  BalanceCard.tsx            ← Gradient card with total balance, income, expense stats
│   │   ├── ⚛️  TransactionCard.tsx        ← Single transaction row: icon, name, meta, colored amount
│   │   ├── ⚛️  AccountPill.tsx            ← Scrollable horizontal filter pill per account
│   │   ├── ⚛️  QuickActionGrid.tsx        ← 4x2 icon grid of quick action buttons
│   │   ├── ⚛️  AddTransactionModal.tsx    ← Bottom sheet: type tabs, amount input, category, save
│   │   ├── ⚛️  NotificationPanel.tsx      ← Animated slide-in notification list panel
│   │   ├── ⚛️  LoanCard.tsx               ← Loan card: avatar initials, progress bar, lend/borrow badge
│   │   ├── ⚛️  AccountCard.tsx            ← Account card for accounts screen with icon and balance
│   │   ├── ⚛️  SummaryRow.tsx             ← 2 or 3 column stat cards used on multiple screens
│   │   ├── ⚛️  BarChart.tsx               ← Grouped bar chart via react-native-gifted-charts
│   │   ├── ⚛️  PieChart.tsx               ← Donut chart with custom legend via gifted-charts
│   │   ├── ⚛️  CategoryGrid.tsx           ← 4-column pressable category picker for modal
│   │   ├── ⚛️  UpdateBanner.tsx           ← Dismissible in-app update banner card
│   │   ├── ⚛️  ToggleSwitch.tsx           ← Animated custom toggle switch for settings rows
│   │   └── ⚛️  BiometricLockScreen.tsx    ← Full-screen overlay: authenticate or show error, app-lock gate
│   │
│   ├── 📂 navigation/
│   │   ├── 🧭 AppNavigator.tsx            ← Root: shows Onboarding if signed out, Tabs if signed in
│   │   └── 🧭 BottomTabNavigator.tsx      ← 5-tab bar: Home, Analytics, FAB (+), Loans, Settings
│   │
│   ├── 📂 context/
│   │   ├── 🏗️  ThemeContext.tsx            ← isDark state, colors object, toggleTheme, persisted to storage
│   │   ├── 🏗️  AuthContext.tsx             ← User state, signIn, signOut via Google Sign-In service
│   │   └── 🏗️  DataContext.tsx             ← Transactions, accounts, loans CRUD — AsyncStorage backed
│   │
│   ├── 📂 hooks/
│   │   ├── 🪝 useTransactions.ts          ← Read/add/edit/delete transactions from DataContext
│   │   ├── 🪝 useAccounts.ts              ← Read/add/edit accounts from DataContext
│   │   ├── 🪝 useLoans.ts                 ← Read/add/update loans from DataContext
│   │   └── 🪝 useAnalytics.ts             ← Compute monthly totals, category breakdown, bar chart data
│   │
│   ├── 📂 services/
│   │   ├── 🔌 googleAuth.ts               ← Configure, signIn, signOut, getAccessToken for Google OAuth
│   │   ├── 🔌 driveBackup.ts              ← Upload/download cashwise-backup.json via Drive REST API
│   │   └── 🔌 notificationService.ts      ← Channel setup, permission request, schedule/cancel notifications
│   │
│   ├── 📂 storage/
│   │   └── 🗄️  asyncStorage.ts             ← Typed wrapper: getJSON<T>, setJSON, removeKey, clearAll
│   │
│   ├── 📂 utils/
│   │   ├── 🔧 formatCurrency.ts           ← formatLKR(n) → "Rs. 1,234.00", formatShort(n) → "Rs. 82K"
│   │   ├── 🔧 dateHelpers.ts              ← groupByDate(), formatRelativeTime() — no external libraries
│   │   └── 🔧 exportData.ts               ← generateCSV(transactions) → shareCSV() via expo-sharing
│   │
│   └── 📂 constants/
│       ├── 📌 categories.ts               ← 8 category objects: id, name, icon, colorKey
│       ├── 🎨 colors.ts                   ← Dark and light theme color token objects
│       └── 🎨 theme.ts                    ← Spacing, radius, fontSize, fontWeight constants
│
├── ⚛️  App.tsx                             ← Root: wraps NavigationContainer in all Context providers
├── ⚙️  app.json                            ← Expo config: name, slug, package, icon, permissions, extras
├── ⚙️  eas.json                            ← EAS Build profiles: development, preview, production
├── ⚙️  babel.config.js                     ← Babel with expo preset and path alias plugin
├── ⚙️  tsconfig.json                       ← TypeScript config: strict mode, path aliases @/*
├── 📦 package.json                         ← All dependencies and npm scripts
├── 🔒 .gitignore                           ← Ignores: node_modules, .expo, android, ios, .env, *.apk
├── 🔒 .env.example                         ← Template showing key names with no values — safe to commit
├── 📋 CHANGELOG.md                         ← Version history in Keep a Changelog format
└── 📋 README.md                            ← This file
```

---

<a id="shared-types"></a>
## 🔑 Shared Types

All interfaces live in one file and are imported everywhere.
File: `src/types/index.ts`

```ts
export type TransactionType = 'expense' | 'income' | 'transfer';
export type AccountType    = 'bank' | 'cash' | 'wallet';
export type LoanType       = 'lend' | 'borrow';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  accountId: string;
  toAccountId?: string;
  note?: string;
  date: string;           // ISO 8601 string
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  color: string;          // hex color string
  icon: string;           // MaterialCommunityIcons icon name
}

export interface Loan {
  id: string;
  personName: string;
  personInitials: string;
  type: LoanType;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;        // ISO 8601 string
  note?: string;
  interest?: number;      // annual percentage
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;       // MaterialCommunityIcons name
  colorKey: string;       // key into Colors object e.g. 'red', 'accent'
}

export interface User {
  name: string;
  email: string;
  photo?: string;
}

export interface MonthlyAnalytics {
  income: number;
  expenses: number;
  savings: number;
}

export interface CategoryBreakdown {
  categoryId: string;
  total: number;
  percentage: number;
}

export interface BarChartEntry {
  month: string;          // e.g. "Jan", "Feb"
  income: number;
  expense: number;
}

export interface BackupPayload {
  transactions: Transaction[];
  accounts: Account[];
  loans: Loan[];
  exportedAt: string;
}
```

---

<a id="prerequisites"></a>
## ✅ Prerequisites

### 🧰 Tools required on your computer or code editor

| Tool         | Purpose                    | Install                        |
|--------------|----------------------------|--------------------------------|
| Node.js 20 LTS | Run JavaScript tooling   | https://nodejs.org             |
| npm          | Package manager            | Included with Node.js          |
| Expo CLI     | Expo project tooling       | `npm install -g expo-cli`      |
| EAS CLI      | Cloud APK builds           | `npm install -g eas-cli`       |
| Git          | Version control            | https://git-scm.com            |

### 👤 Accounts required

| Account                      | Purpose                                      | Cost  |
|------------------------------|----------------------------------------------|-------|
| GitHub — tharindu899          | Repo, Actions, Releases                     | Free  |
| Expo account                 | EAS Build — 30 builds/month                  | Free  |
| Google Cloud Console         | OAuth 2.0 for Sign-In and Drive              | Free  |

### 📱 On your Android phone

| App                | Purpose                               |
|--------------------|---------------------------------------|
| Expo Go            | UI preview during development         |
| Termux             | Git push from phone                   |
| GitHub app         | Monitor Actions workflow status       |

---

<a id="local-development-setup"></a>
## ⚙️ Local Development Setup

### 1️⃣ Step 1 — Clone the repository

```bash
git clone https://github.com/tharindu899/cashwise.git
cd cashwise
```

### 2️⃣ Step 2 — Install dependencies

```bash
npm install
```

### 3️⃣ Step 3 — Create your local environment file

```bash
cp .env.example .env
```

Edit `.env`:

```
GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
GOOGLE_ANDROID_CLIENT_ID=your_android_client_id.apps.googleusercontent.com
```

### 4️⃣ Step 4 — Start the development server

```bash
npx expo start
```

Scan the QR code with Expo Go on your phone to preview the UI.

---

<a id="appjson--full-apk-ready-config"></a>
## 📲 app.json — Full APK-Ready Config

```json
{
  "expo": {
    "name": "CashWise",
    "slug": "cashwise",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0d0f14"
    },
    "notification": {
      "icon": "./assets/icon.png",
      "color": "#4f8ef7",
      "androidMode": "default",
      "androidCollapsedTitle": "CashWise"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.tharindu899.cashwise"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0d0f14"
      },
      "package": "com.tharindu899.cashwise",
      "versionCode": 1,
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.USE_BIOMETRIC",
        "android.permission.USE_FINGERPRINT",
        "android.permission.VIBRATE",
        "android.permission.POST_NOTIFICATIONS",
        "android.permission.RECEIVE_BOOT_COMPLETED",
        "android.permission.SCHEDULE_EXACT_ALARM",
        "android.permission.FOREGROUND_SERVICE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-local-authentication",
      "expo-camera",
      [
        "expo-notifications",
        {
          "icon": "./assets/icon.png",
          "color": "#4f8ef7",
          "sounds": [],
          "mode": "production"
        }
      ]
    ],
    "extra": {
      "googleWebClientId": "$GOOGLE_WEB_CLIENT_ID",
      "eas": {
        "projectId": "YOUR_EAS_PROJECT_ID"
      }
    }
  }
}
```

### 🧠 Critical fields explained

| Field                                   | Why it matters                                                                          |
|-----------------------------------------|-----------------------------------------------------------------------------------------|
| `notification.icon`                     | Icon shown in Android status bar for all local notifications                            |
| `notification.color`                    | Accent tint on notification icon background                                             |
| `notification.androidMode`              | `"default"` shows each notification separately                                          |
| `android.versionCode`                   | Integer used to detect upgrades — increment on every release                            |
| `android.permissions POST_NOTIFICATIONS`| Required on Android 13+ (API 33+) for the runtime permission dialog                    |
| `android.permissions RECEIVE_BOOT_COMPLETED` | Allows expo-notifications to reschedule alarms after device reboot               |
| `android.permissions SCHEDULE_EXACT_ALARM` | Required for precise notification timing (loan due reminders)                      |
| `plugins expo-local-authentication`     | Adds USE_BIOMETRIC and USE_FINGERPRINT to native Android manifest automatically         |
| `plugins expo-notifications`            | Adds notification receiver, boot receiver, and FCM config to native manifest            |
| `extra.eas.projectId`                   | Replace with your real project ID from `eas init` — EAS Build will fail without it     |

> **versionCode rule:** Every APK you distribute must have a `versionCode` higher than the previously installed one. For every GitHub release: increment `versionCode` in `app.json` and `version` in both `app.json` and `package.json`.

---

<a id="google-cloud-setup--sign-in-only"></a>
## ☁️ Google Cloud Setup — Sign-In Only

No Firebase. Google is used only for user identity (Sign-In) and the user's own Drive storage (backup). All data lives on the user's device and their personal Google Drive.

### 1️⃣ Step 1 — Create Project

1. Open https://console.cloud.google.com
2. Click the project dropdown → **New Project**
3. Name: `CashWise` → **Create**

### 2️⃣ Step 2 — Enable APIs

Go to **APIs & Services → Library** and enable:

- ☁️ Google Drive API — for backup and restore
- People API — for user name, email, profile photo

### 3️⃣ Step 3 — OAuth Consent Screen

1. **APIs & Services → OAuth consent screen**
2. User type: **External** → Create
3. Fill in App name `CashWise`, support email, developer email
4. Scopes — add all three:
   - `https://www.googleapis.com/auth/drive.file`
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`
5. Save through all steps

### 4️⃣ Step 4 — Create OAuth Credentials

#### Web Client ID (required by the Google Sign-In library even on Android)

1. **Credentials → Create Credentials → OAuth client ID**
2. Type: **Web application**
3. Name: `CashWise Web Client`
4. **Create** → copy the Client ID → this is `GOOGLE_WEB_CLIENT_ID`

#### Android Client ID

1. **Credentials → Create Credentials → OAuth client ID**
2. Type: **Android**
3. Package name: `com.tharindu899.cashwise`
4. SHA-1 fingerprint — get your debug SHA-1:

```bash
keytool -list -v \
  -keystore ~/.android/debug.keystore \
  -alias androiddebugkey \
  -storepass android \
  -keypass android
```

5. Paste the SHA-1 → **Create** → copy the Client ID → this is `GOOGLE_ANDROID_CLIENT_ID`

> After your first EAS production build, run `eas credentials` to get the production SHA-1 and add a second Android credential for the signed APK.

### 5️⃣ Step 5 — Add Test Users

**OAuth consent screen → Test users → Add Users** — add your Gmail address so you can sign in while the app is still in Testing mode.

---

<a id="github-secrets"></a>
## 🔐 GitHub Secrets

These values are stored encrypted in GitHub and injected into GitHub Actions at build time. They are never in any code file.

### 🔧 How to add secrets

1. Go to `https://github.com/tharindu899/cashwise`
2. **Settings → Secrets and variables → Actions**
3. Click **New repository secret** for each row below

### 🔑 Required secrets

| Secret Name                 | What it is                  | Where to get it                                     |
|-----------------------------|-----------------------------|-----------------------------------------------------|
| `EXPO_TOKEN`                | Expo account access token   | expo.dev → Settings → Access Tokens → Create        |
| `GOOGLE_WEB_CLIENT_ID`      | OAuth Web client ID         | Google Cloud → Credentials → Web client             |
| `GOOGLE_ANDROID_CLIENT_ID`  | OAuth Android client ID     | Google Cloud → Credentials → Android client         |

### 🛡️ Security rules

- Never commit `.env` — it is in `.gitignore`
- `.env.example` is committed with key names and empty values only
- `GITHUB_TOKEN` is not a repository secret — use the automatic GitHub Actions token with `permissions: contents: write`
- Rotate your `EXPO_TOKEN` if you suspect it was exposed

### 🔍 What each secret does in the workflow

```
EXPO_TOKEN              → authenticates eas-cli so it can trigger a build on Expo's cloud
GOOGLE_WEB_CLIENT_ID    → injected into the built APK via app.json extra field
GOOGLE_ANDROID_CLIENT_ID → used in the Google Sign-In native configuration
GITHUB_TOKEN            → automatic GitHub Actions token, used with `github.token` for Releases
```

---

<a id="eas-build-configuration"></a>
## 🏗️ EAS Build Configuration

File: `eas.json`

```json
{
  "cli": {
    "version": ">= 10.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleDebug"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

> `buildType: apk` is used for all profiles because the app is distributed through GitHub Releases. This project builds installable APK files only.

### 🎯 Profile purposes

| Profile      | When to use                                                          |
|--------------|----------------------------------------------------------------------|
| `development`| Daily dev — installs a dev client APK on your phone to test native modules including Google Sign-In |
| `preview`    | Share builds with testers before a release                          |
| `production` | Final release APK — triggered automatically by GitHub Actions on every `v*` tag push |

---

<a id="biometric-lock-implementation"></a>
## 🔒 Biometric Lock Implementation

### ⚙️ How it works

When the user enables Biometric Lock in Settings, the preference is stored with key `biometric_enabled` in AsyncStorage. An `AppState` listener in `App.tsx` fires on every transition from `background` to `active`. If the preference is enabled, a `BiometricLockScreen` overlay is rendered above all navigation until the user authenticates.

### 📁 Required files

| File                                   | Role                                                              |
|----------------------------------------|-------------------------------------------------------------------|
| `src/components/BiometricLockScreen.tsx` | Full-screen overlay rendered by App.tsx when locked             |
| `src/screens/SettingsScreen.tsx`         | Toggle reads/writes `biometric_enabled` preference              |
| `App.tsx`                                | Hosts the AppState listener and isLocked state                  |

### 🧩 App.tsx integration

```tsx
import { AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BiometricLockScreen from '@/components/BiometricLockScreen';

// Inside App component:
const [isLocked, setIsLocked] = useState(false);

useEffect(() => {
  const sub = AppState.addEventListener('change', async (state: AppStateStatus) => {
    if (state === 'active') {
      const enabled = await AsyncStorage.getItem('biometric_enabled');
      if (enabled === 'true') {
        setIsLocked(true);
      }
    }
  });
  return () => sub.remove();
}, []);

// In JSX, after all providers but inside the root view:
{isLocked && <BiometricLockScreen onUnlock={() => setIsLocked(false)} />}
```

### 🛡️ Settings toggle guard

```ts
import * as LocalAuthentication from 'expo-local-authentication';

async function canUseBiometric(): Promise<boolean> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled  = await LocalAuthentication.isEnrolledAsync();
  return hasHardware && isEnrolled;
}
```

If `canUseBiometric()` returns false, show an alert directing the user to Android Settings → Security and keep the toggle off.

---

<a id="local-notifications-setup"></a>
## 🔔 Local Notifications Setup

### 🤖 Android channel setup

```ts
// src/services/notificationService.ts
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const CHANNEL_ID = 'cashwise_alerts';

export async function setupNotificationChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: 'CashWise Alerts',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#4f8ef7',
    sound: 'default',
  });
}
```

### 📬 Notification handler

```ts
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge:  false,
  }),
});
```

### 📌 Where to call each function

| Call                               | When                                                   |
|------------------------------------|--------------------------------------------------------|
| `setupNotificationChannel()`       | App.tsx `useEffect` on mount                           |
| `requestNotificationPermission()`  | After successful Google Sign-In in AuthContext         |
| `scheduleLoanReminder()`           | `DataContext.addLoan()` and `DataContext.updateLoan()` |
| `sendBudgetAlert()`                | `DataContext.addTransaction()` after recomputing totals|
| `cancelNotification(loanId)`       | `DataContext.updateLoan()` when active set to false    |
| `cancelAllNotifications()`         | Settings sign-out flow                                 |

---

<a id="github-actions--apk-build-and-release"></a>
## 🚀 GitHub Actions — APK Build and Release

### 🔄 File: `.github/workflows/build-apk.yml`

Triggers automatically when you push a version tag like `v1.0.0`. Builds the APK on Expo's cloud servers, downloads it, and publishes it as a GitHub Release attachment.

```yaml
name: Build APK and Create Release

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write

jobs:
  build:
    name: Build Android APK via EAS
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install EAS CLI
        run: npm install -g eas-cli

      - name: Verify Expo authentication
        run: eas whoami
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}

      - name: Build APK with EAS (production profile)
        id: eas_build
        run: |
          BUILD_JSON=$(eas build \
            --platform android \
            --profile production \
            --non-interactive \
            --json 2>/dev/null)
          BUILD_URL=$(echo "$BUILD_JSON" | jq -r '.[0].artifacts.buildUrl')
          echo "build_url=$BUILD_URL" >> $GITHUB_OUTPUT
          echo "APK URL: $BUILD_URL"
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}

      - name: Download APK from EAS
        run: |
          curl -L "${{ steps.eas_build.outputs.build_url }}" \
            -o "cashwise-${{ github.ref_name }}.apk"
          echo "APK size: $(du -sh cashwise-${{ github.ref_name }}.apk)"

      - name: Create GitHub Release with APK
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ github.ref_name }}
          name: "CashWise ${{ github.ref_name }}"
          body: |
            ## CashWise ${{ github.ref_name }}

            ### How to install
            1. Download cashwise-${{ github.ref_name }}.apk below
            2. On your Android phone open Settings → Security
            3. Enable Install unknown apps for your browser or file manager
            4. Open the downloaded APK file and tap Install
            5. Open CashWise and sign in with your Google account

            ### Requirements
            - Android 6.0 or higher
            - Google account for sign-in and Drive backup

            See CHANGELOG.md for what changed in this version.
          files: cashwise-${{ github.ref_name }}.apk
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: ${{ github.token }}
```

> ✅ `GITHUB_TOKEN` uses the normal GitHub Actions method here. Do not create a `GITHUB_TOKEN` secret manually. GitHub provides it automatically for each workflow run, and `permissions: contents: write` allows the release action to upload the APK.

### 👀 File: `.github/workflows/preview.yml`

```yaml
name: Expo Preview on PR

on:
  pull_request:
    branches:
      - main

jobs:
  preview:
    name: Create Expo Go Preview
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - run: npm install -g eas-cli

      - name: Publish Expo update for PR preview
        run: |
          eas update \
            --branch "pr-${{ github.event.number }}" \
            --message "Preview for PR #${{ github.event.number }}" \
            --non-interactive
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
```

### 🚀 How to trigger a release from Termux or terminal

```bash
git add .
git commit -m "Release v1.0.0"
git push origin main

git tag v1.0.0
git push origin v1.0.0
```

The Actions workflow starts immediately. The APK appears at `https://github.com/tharindu899/cashwise/releases` within 15 to 20 minutes.

---

<a id="testing-with-expo-go"></a>
## 🧪 Testing with Expo Go

Expo Go lets you test UI and navigation on your phone during development without building a full APK. Google Sign-In does not work in Expo Go because it requires native modules — use the development build for that.

```bash
# Start the dev server
npx expo start

# Scan the QR code in Expo Go on your Android phone
```

### 🔐 For Google Sign-In testing — build a dev client

```bash
eas build --platform android --profile development
```

Install the resulting APK once. Then use:

```bash
npx expo start --dev-client
```

Your phone connects to the dev server with full native module support, including Google Sign-In.

---

<a id="termux-workflow--git-push-from-phone"></a>
## 📱 Termux Workflow — Git Push from Phone

### 🛠️ One-time setup in Termux

```bash
# Update and install tools
pkg update && pkg upgrade
pkg install git openssh

# Set your Git identity
git config --global user.email "your-email@gmail.com"
git config --global user.name "tharindu899"

# Generate SSH key for GitHub
ssh-keygen -t ed25519 -C "your-email@gmail.com"

# Show the public key — copy this entire output
cat ~/.ssh/id_ed25519.pub
```

Go to `https://github.com/settings/ssh/new`, paste the key, and save. Then test:

```bash
ssh -T git@github.com
# Expected: Hi tharindu899! You've successfully authenticated
```

Set your remote to use SSH:

```bash
cd /storage/emulated/0/cashwise
git remote set-url origin git@github.com:tharindu899/cashwise.git
```

### 📆 Daily workflow in Termux

```bash
# Navigate to the project
cd /storage/emulated/0/cashwise

# See what changed
git status

# Stage everything
git add .

# Commit
git commit -m "Update HomeScreen balance card"

# Push
git push origin main
```

### 🚀 Release workflow in Termux

```bash
git add .
git commit -m "Release v1.0.1"
git push origin main

git tag v1.0.1
git push origin v1.0.1
```

Check build progress at `https://github.com/tharindu899/cashwise/actions`

---

<a id="phase-by-phase-todo-list"></a>
## 🧩 Phase-by-Phase TODO List

Each phase is self-contained. Finish one phase and test it in Expo Go before starting the next. Every AI prompt is ready to copy and paste directly into Claude (claude.ai free tier). Paste the prompt exactly as written — do not add extra context. Claude will generate complete TypeScript files you can copy into your editor.

---

### ⚙️ Phase 1 — Project Initialization

**Goal:** Create the Expo TypeScript project, set up the full folder structure, and install all packages.

**Files created in this phase:**

```
⚙️  app.json
⚙️  eas.json
⚙️  tsconfig.json
⚙️  babel.config.js
📦 package.json
⚛️  App.tsx
🔒 .gitignore
🔒 .env.example
🔑 src/types/index.ts
```

**Step-by-step checklist:**

- ⬜ Run `npx create-expo-app cashwise --template expo-template-blank-typescript`
- ⬜ Install all packages listed in the AI prompt below
- ⬜ Create every folder under `src/` (empty folders are fine at this stage)
- ⬜ Create `src/types/index.ts` with all interfaces from the Types section above
- ⬜ Update `app.json` with correct package name `com.tharindu899.cashwise`, permissions, and extra fields
- ⬜ Create `eas.json` with development, preview, production profiles all using `buildType: apk`
- ⬜ Update `tsconfig.json` with strict mode and path alias `@/*` → `src/*`
- ⬜ Update `babel.config.js` to support path aliases using `babel-plugin-module-resolver`
- ⬜ Create `.env.example` with `GOOGLE_WEB_CLIENT_ID=` and `GOOGLE_ANDROID_CLIENT_ID=` (empty values)
- ⬜ Add `.gitignore` entries for `.env`, `android/`, `ios/`, `*.apk`
- ⬜ Create the GitHub repository at `https://github.com/tharindu899/cashwise`
- ⬜ Push initial commit to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial project setup"
  git branch -M main
  git remote add origin git@github.com:tharindu899/cashwise.git
  git push -u origin main
  ```
- ⬜ Run `eas init` in the project folder to get your real `projectId` and update `app.json`

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo app called CashWise.
Package name: com.tharindu899.cashwise
Language: TypeScript strict mode
Framework: Expo SDK 51

Task 1 — Write complete app.json with:
- name "CashWise", slug "cashwise", version "1.0.0"
- package "com.tharindu899.cashwise", versionCode 1
- Android permissions: CAMERA, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE,
  USE_BIOMETRIC, USE_FINGERPRINT, VIBRATE,
  POST_NOTIFICATIONS, RECEIVE_BOOT_COMPLETED, SCHEDULE_EXACT_ALARM, FOREGROUND_SERVICE
- notification block: icon './assets/icon.png', color '#4f8ef7',
  androidMode 'default', androidCollapsedTitle 'CashWise'
- splash backgroundColor #0d0f14, resizeMode contain
- android adaptive icon foregroundImage './assets/adaptive-icon.png', backgroundColor '#0d0f14'
- plugins: 'expo-local-authentication', 'expo-camera',
  ['expo-notifications', { icon: './assets/icon.png', color: '#4f8ef7', mode: 'production' }]
- extra.googleWebClientId: "$GOOGLE_WEB_CLIENT_ID"
- extra.eas.projectId: "YOUR_EAS_PROJECT_ID"

Task 2 — Write the full npm install command for these packages in one line:
@react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
react-native-screens react-native-safe-area-context
@react-native-async-storage/async-storage
@react-native-google-signin/google-signin
react-native-gifted-charts expo-linear-gradient
expo-local-authentication expo-file-system expo-sharing
expo-camera expo-notifications expo-constants

Task 3 — Write tsconfig.json with:
- strict: true, target: ES2020, moduleResolution: bundler, jsx: react-native
- paths alias: "@/*" → ["src/*"]

Task 4 — Write babel.config.js using expo preset and babel-plugin-module-resolver
with alias "@" pointing to "./src"

Task 5 — Write App.tsx that only wraps NavigationContainer inside
ThemeContext.Provider, AuthContext.Provider, DataContext.Provider.
Import contexts from @/context/. No logic inside App.tsx — just the provider stack.

Task 6 — Write .gitignore for Expo TypeScript including:
node_modules/, .expo/, android/, ios/, .env, *.apk, dist/

Task 7 — Write src/types/index.ts with all these interfaces:
TransactionType, AccountType, LoanType (union types)
Transaction, Account, Loan, Category, User, MonthlyAnalytics,
CategoryBreakdown, BarChartEntry, BackupPayload

All files use TypeScript. No emojis in code. No hardcoded colors. No any types.
```

---

### 🎨 Phase 2 — Theme and Constants

**Goal:** Build the color system, spacing constants, category list, and theme context with persistence.

**Files created in this phase:**

```
🎨 src/constants/colors.ts
🎨 src/constants/theme.ts
📌 src/constants/categories.ts
🏗️  src/context/ThemeContext.tsx
```

**Step-by-step checklist:**

- ⬜ Create `colors.ts` with full dark and light token objects
- ⬜ Create `theme.ts` with spacing, radius, fontSize, fontWeight constants
- ⬜ Create `categories.ts` as a typed array of Category objects
- ⬜ Create `ThemeContext.tsx` with toggle function and AsyncStorage persistence
- ⬜ Update `App.tsx` to wrap children in `ThemeContext.Provider`
- ⬜ Test: Add a temporary button that calls `toggleTheme()`, confirm colors change on screen

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import Category interface from src/types/index.ts.

Task 1 — Write src/constants/colors.ts:
Export a Colors interface and two objects: darkColors and lightColors.
Both implement Colors and have these tokens:
bg, surface, surface2, surface3, border, border2,
text1, text2, text3, accent, accent2, green, red, amber, purple, teal, pink

Dark values:
bg:#0d0f14  surface:#161a23  surface2:#1e2330  surface3:#252b3a
border:rgba(255,255,255,0.07)  border2:rgba(255,255,255,0.12)
text1:#f0f2f8  text2:#8a90a8  text3:#555c75
accent:#4f8ef7  accent2:#7b6cf7  green:#30d48a  red:#f05c6e
amber:#f5a623  purple:#a78bfa  teal:#2dd4bf  pink:#f472b6

Light values:
bg:#f0f2f8  surface:#ffffff  surface2:#f5f7fc  surface3:#eaedf5
border:rgba(0,0,0,0.06)  border2:rgba(0,0,0,0.10)
text1:#0d0f14  text2:#5a607a  text3:#9aa0b8
accent:#3b6ef0  accent2:#6c52e8  green:#18b870  red:#e03349
amber:#d48c0a  purple:#7c5ccf  teal:#0fa89a  pink:#d44d95

Task 2 — Write src/constants/theme.ts:
Export const spacing = { xs:4, sm:8, md:16, lg:24, xl:32 }
Export const radius  = { xs:6, sm:10, md:18, lg:44 }
Export const fontSize = { xs:10, sm:12, md:14, lg:16, xl:18, xxl:22, xxxl:36 }
Export const fontWeight = { regular:'400', medium:'500', semibold:'600', bold:'700' }

Task 3 — Write src/constants/categories.ts:
Export a const array CATEGORIES of Category objects:
{ id:'food', name:'Food', iconName:'food-fork-drink', colorKey:'red' }
{ id:'transport', name:'Transport', iconName:'car', colorKey:'accent' }
{ id:'shopping', name:'Shopping', iconName:'shopping', colorKey:'amber' }
{ id:'health', name:'Health', iconName:'heart-pulse', colorKey:'green' }
{ id:'utilities', name:'Utilities', iconName:'lightning-bolt', colorKey:'purple' }
{ id:'entertainment', name:'Entertainment', iconName:'television-play', colorKey:'pink' }
{ id:'education', name:'Education', iconName:'school', colorKey:'teal' }
{ id:'other', name:'Other', iconName:'dots-horizontal', colorKey:'text2' }

Task 4 — Write src/context/ThemeContext.tsx:
State: isDark boolean, default true.
On mount: load 'cashwise_theme' key from AsyncStorage.
toggleTheme: flip isDark, save to AsyncStorage.
Context value: { isDark, colors: isDark ? darkColors : lightColors, toggleTheme }
Export useTheme hook that returns context and throws if used outside provider.

TypeScript strict. No any. No emojis in code. Colors only from the token objects.
```

---

### 🧭 Phase 3 — Navigation

**Goal:** Build the bottom tab navigator and root navigator so all screens can be reached.

**Files created in this phase:**

```
🧭 src/navigation/AppNavigator.tsx
🧭 src/navigation/BottomTabNavigator.tsx
⚛️  src/screens/HomeScreen.tsx        (placeholder)
⚛️  src/screens/AnalyticsScreen.tsx   (placeholder)
⚛️  src/screens/LoansScreen.tsx       (placeholder)
⚛️  src/screens/AccountsScreen.tsx    (placeholder)
⚛️  src/screens/SettingsScreen.tsx    (placeholder)
⚛️  src/screens/OnboardingScreen.tsx  (placeholder)
```

**Step-by-step checklist:**

- ⬜ Create all 6 screen files as placeholder components showing the screen name centered
- ⬜ Create `BottomTabNavigator.tsx` with 5 tabs including the floating FAB center button
- ⬜ Create `AppNavigator.tsx` with auth-based routing — Onboarding vs Tabs
- ⬜ Style the tab bar: dark background, accent active color, no emoji labels
- ⬜ The center FAB uses LinearGradient and floats above the bar with a negative margin
- ⬜ Test in Expo Go: all 4 real tabs switch correctly and FAB button is visible and pressable

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo TypeScript app called CashWise.
Use React Navigation v6. Import types from src/types/index.ts.
Import useTheme from src/context/ThemeContext.tsx.

Task 1 — Write src/navigation/BottomTabNavigator.tsx:
5 tabs in order: Home, Analytics, CENTER_FAB, Loans, Settings.
CENTER_FAB is not a screen. Use tabBarButton prop to render a custom Pressable:
- 58x58 circle using LinearGradient from expo-linear-gradient
  (colors from useTheme(): [colors.accent, colors.accent2])
- marginTop: -22 so it floats above the bar
- 3px border in colors.surface
- MaterialCommunityIcons 'plus' icon, size 28, color white
- Pressing calls setModalVisible(true) from useState in this component

Tab bar style:
- backgroundColor: colors.surface from useTheme()
- borderTopColor: colors.border
- height: 70, paddingBottom: 10
Active tint: colors.accent. Inactive tint: colors.text3.
Label font size 10, fontWeight '500'. No emoji in tab labels.

Icons (MaterialCommunityIcons from @expo/vector-icons):
Home: 'home-variant' active / 'home-variant-outline' inactive
Analytics: 'chart-pie' both states
Loans: 'clock-time-four' active / 'clock-time-four-outline' inactive
Settings: 'cog' active / 'cog-outline' inactive

Render AddTransactionModal placeholder with visible={modalVisible} onClose={() => setModalVisible(false)}.

Task 2 — Write src/navigation/AppNavigator.tsx:
Use useAuth() from AuthContext.tsx to get user.
If user is null: show Stack navigator with only OnboardingScreen.
If user exists: show BottomTabNavigator.
Wrap in NavigationContainer with dark theme using colors.bg from useTheme() for background.

Task 3 — Write placeholder TSX for each screen:
HomeScreen, AnalyticsScreen, LoansScreen, AccountsScreen, SettingsScreen, OnboardingScreen.
Each renders a View filling the screen with centered Text of the screen name.
Use useSafeAreaInsets for paddingTop. Use colors.bg for background, colors.text1 for text.

TypeScript strict. No any. No emojis. All colors from useTheme().
```

---

### 🗄️ Phase 4 — Data Context and Local Storage

**Goal:** Build the complete data layer. All app data lives in AsyncStorage and is managed through context with typed CRUD operations.

**Files created in this phase:**

```
🗄️  src/storage/asyncStorage.ts
🏗️  src/context/DataContext.tsx
🏗️  src/context/AuthContext.tsx
🪝 src/hooks/useTransactions.ts
🪝 src/hooks/useAccounts.ts
🪝 src/hooks/useLoans.ts
🪝 src/hooks/useAnalytics.ts
🔧 src/utils/formatCurrency.ts
🔧 src/utils/dateHelpers.ts
```

**Step-by-step checklist:**

- ⬜ Create `asyncStorage.ts` typed wrapper with generic `getJSON<T>` and `setJSON`
- ⬜ Create `DataContext.tsx` with transactions, accounts, loans state and full CRUD
- ⬜ Seed default data on first launch — 3 accounts, 4 transactions, 2 loans
- ⬜ Create `AuthContext.tsx` with a mock user for now (Google Sign-In wired in Phase 9)
- ⬜ Create all 4 custom hooks reading from context
- ⬜ Create `formatCurrency.ts` and `dateHelpers.ts`
- ⬜ Test: Add a transaction via context, close Expo Go, reopen — verify it persisted in AsyncStorage

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all interfaces from src/types/index.ts.

Task 1 — Write src/storage/asyncStorage.ts:
Prefix all keys automatically with 'cashwise_'.
Export these typed async functions:
- getJSON<T>(key: string): Promise<T | null>
- setJSON<T>(key: string, value: T): Promise<void>
- removeKey(key: string): Promise<void>
- clearAll(): Promise<void>  removes only keys with 'cashwise_' prefix

Task 2 — Write src/context/DataContext.tsx:
State: transactions: Transaction[], accounts: Account[], loans: Loan[]
On mount: load all three arrays from AsyncStorage using getJSON.
If all three are empty (first launch), seed default data below.
After every add/update/delete: save the updated array to AsyncStorage using setJSON.

Functions exported via context:
addTransaction(tx: Omit<Transaction, 'id'>): void — generates id with Date.now().toString()
updateTransaction(id: string, updates: Partial<Transaction>): void
deleteTransaction(id: string): void
addAccount(acc: Omit<Account, 'id'>): void
updateAccount(id: string, updates: Partial<Account>): void
addLoan(loan: Omit<Loan, 'id'>): void
updateLoan(id: string, updates: Partial<Loan>): void

Default seed data:
Accounts:
{ name:'BOC Bank', type:'bank', balance:320000, color:'#30d48a', icon:'bank' }
{ name:'Cash', type:'cash', balance:85000, color:'#f5a623', icon:'cash' }
{ name:'HNB Savings', type:'bank', balance:80000, color:'#a78bfa', icon:'bank-outline' }

Transactions (use first account id for accountId):
{ type:'income', amount:82000, categoryId:'other', note:'Salary May', date: today ISO }
{ type:'expense', amount:4280, categoryId:'shopping', note:'Keells Super', date: today ISO }
{ type:'expense', amount:1250, categoryId:'food', note:'Uber Eats', date: yesterday ISO }
{ type:'expense', amount:2990, categoryId:'utilities', note:'Dialog Bill', date: yesterday ISO }

Loans:
{ personName:'Ranil Mendis', personInitials:'RM', type:'lend',
  totalAmount:25000, paidAmount:10000, dueDate:'2025-06-30', active:true }
{ personName:'People Bank', personInitials:'PB', type:'borrow',
  totalAmount:120000, paidAmount:78000, dueDate:'2025-12-31',
  interest:18, active:true }

Export useData hook.

Task 3 — Write src/context/AuthContext.tsx:
State: user: User | null, loading: boolean.
For now signIn sets mock user { name:'Kasun Perera', email:'kasun@gmail.com' }.
signOut sets user to null.
Export useAuth hook.
(Google Sign-In replaces the mock in Phase 9.)

Task 4 — Write src/utils/formatCurrency.ts:
formatLKR(amount: number): string  returns "Rs. 4,280.00"
formatShort(amount: number): string returns "Rs. 82K" or "Rs. 1.2M"

Task 5 — Write src/utils/dateHelpers.ts — no external date libraries, only built-in Date:
groupByDate(transactions: Transaction[]): Array<{ dateLabel: string; items: Transaction[] }>
  Sorted newest first. Labels: "Today — May 11", "Yesterday — May 10", or "May 9"
formatRelativeTime(isoDate: string): string
  Returns "Just now" (<1min), "2 hours ago", "Yesterday", or "May 10, 2025"

Task 6 — Write src/hooks/useAnalytics.ts:
Uses useData() from DataContext.
monthlyTotal(month: number, year: number): MonthlyAnalytics
categoryBreakdown(month: number, year: number): CategoryBreakdown[]
last6MonthsBar(): BarChartEntry[]  last 6 calendar months including current

TypeScript strict. No any. No emojis in code.
```

---

### 🏠 Phase 5 — Home Screen

**Goal:** Build the complete Home screen and all its child components.

**Files created in this phase:**

```
⚛️  src/screens/HomeScreen.tsx        (full implementation)
⚛️  src/components/BalanceCard.tsx
⚛️  src/components/AccountPill.tsx
⚛️  src/components/QuickActionGrid.tsx
⚛️  src/components/TransactionCard.tsx
⚛️  src/components/UpdateBanner.tsx
⚛️  src/components/NotificationPanel.tsx
```

**Step-by-step checklist:**

- ⬜ Build `BalanceCard.tsx` with LinearGradient, total balance, income and expense stats
- ⬜ Build `AccountPill.tsx` as a pressable pill with active state
- ⬜ Build `QuickActionGrid.tsx` as a 4-column grid with 8 quick action buttons
- ⬜ Build `TransactionCard.tsx` with colored icon, name, meta, signed amount
- ⬜ Build `UpdateBanner.tsx` — dismissible with useState
- ⬜ Build `NotificationPanel.tsx` — animated slide from right using Animated.Value
- ⬜ Assemble into `HomeScreen.tsx` with FlatList for transactions and grouped date headers
- ⬜ Test in Expo Go: scroll transactions, tap account pills to filter, open notification panel

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all types from src/types/index.ts.
Import useTheme from src/context/ThemeContext.
Import useData from src/context/DataContext.
Import useAuth from src/context/AuthContext.
Import formatLKR from src/utils/formatCurrency.
Import groupByDate from src/utils/dateHelpers.
Import CATEGORIES from src/constants/categories.

Task 1 — Write src/components/BalanceCard.tsx:
Props: { totalBalance: number; income: number; expenses: number }
Uses LinearGradient from expo-linear-gradient.
Dark gradient: ['#1a2340','#0f1a38','#1a1040']
Label "Total Balance" 12px rgba(255,255,255,0.6) uppercase.
Amount 36px bold white, "Rs." prefix 20px.
Two stat boxes side by side inside the card:
  Income: green icon box (trending-up) + "Income" label + formatted value
  Expenses: red icon box (trending-down) + "Expenses" label + formatted value
Stat box background: rgba(255,255,255,0.08), radius 12.

Task 2 — Write src/components/AccountPill.tsx:
Props: { account: Account; isActive: boolean; onPress: () => void }
Pressable pill with colored dot, account name, short balance.
Active: background colors.accent, all text white.
Inactive: background colors.surface2, text colors.text2 and colors.text3.

Task 3 — Write src/components/QuickActionGrid.tsx:
Props: { onAction: (actionId: string) => void }
8 actions: expense/red, income/green, transfer/accent, loan/amber,
bankpay/purple, budget/pink, scan/teal, more/text2.
4-column grid. Each item: 52x52 icon box (16px radius) + 11px label below.
Icon box background is tinted color at 12% opacity. No emojis. MaterialCommunityIcons only.

Task 4 — Write src/components/TransactionCard.tsx:
Props: { transaction: Transaction }
Resolve category from CATEGORIES by transaction.categoryId.
Resolve account name from useData() by transaction.accountId.
Left: colored icon box (42x42, 12px radius) with category icon.
Middle: note or category name 14px bold, account + category 12px text3.
Right: amount 15px bold. Income: green with + prefix. Expense: red with - prefix.
Transfer: accent color, no prefix.

Task 5 — Write src/components/UpdateBanner.tsx:
Props: { version: string; onDismiss: () => void }
Card with border rgba(79,142,247,0.3) and background rgba(79,142,247,0.1).
Left: sparkles icon (MaterialCommunityIcons) in colors.accent.
Middle: "v{version} Available" title + "Budget goals, new charts + fixes" subtitle.
Right: "Update" button in colors.accent background, white text, 20px radius.

Task 6 — Write src/components/NotificationPanel.tsx:
Props: { visible: boolean; onClose: () => void }
Absolute overlay covering the full screen, background colors.surface.
Slide in from right using Animated.Value(screenWidth) animating to 0 when visible.
Header: back arrow + "Notifications" title + "Mark all read" in colors.accent.
5 hardcoded notification items with colored dot, title, description, time, and unread dot.

Task 7 — Write src/screens/HomeScreen.tsx:
Header: "Good morning," + user name from useAuth() on left.
Right: bell icon with red badge (count 3) + avatar circle with initials.
Tapping bell sets showNotifications true, renders NotificationPanel.
Sections in a ScrollView:
  UpdateBanner (dismiss hides it via useState)
  BalanceCard (totalBalance = sum of all accounts, income/expense from today's transactions)
  "Accounts" label + horizontal FlatList of AccountPills (first pill is "All")
  "Quick Actions" label + QuickActionGrid
  Grouped transactions from groupByDate() with date header rows
Each date header: label left + "See All" in colors.accent right (first group only).

TypeScript strict. No any. No emojis. All colors from useTheme(). All amounts via formatLKR.
```

---

### 📊 Phase 6 — Analytics Screen

**Goal:** Build the Analytics screen with real computed data feeding both charts.

**Files created in this phase:**

```
⚛️  src/screens/AnalyticsScreen.tsx   (full implementation)
⚛️  src/components/SummaryRow.tsx
⚛️  src/components/BarChart.tsx
⚛️  src/components/PieChart.tsx
```

**Step-by-step checklist:**

- ⬜ Build `SummaryRow.tsx` as a flexible 2 or 3 stat card row
- ⬜ Build `BarChart.tsx` using `react-native-gifted-charts` with grouped bars
- ⬜ Build `PieChart.tsx` using `react-native-gifted-charts` donut with legend
- ⬜ Build `AnalyticsScreen.tsx` with month picker and real data from `useAnalytics()`
- ⬜ Test: Change the month with arrow buttons — verify charts re-render with different data

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import types from src/types/index.ts.
Import useTheme from ThemeContext. Import useAnalytics from hooks/useAnalytics.ts.
Import CATEGORIES from src/constants/categories.
Import formatLKR from src/utils/formatCurrency.

Task 1 — Write src/components/SummaryRow.tsx:
Props: { items: Array<{ label: string; value: number | string; color: string }> }
Renders a horizontal row of equally-spaced cards.
Each card: value text 16px bold (colored), label 10px text3 below.
Background colors.surface2, border colors.border, radius 12, padding 12x10.

Task 2 — Write src/components/BarChart.tsx:
Props: { data: BarChartEntry[]; title: string }
Uses BarChart from react-native-gifted-charts.
Each entry renders two bars side by side: income (colors.green) and expense (colors.red).
barWidth 14, spacing between groups 30, barSpacing 4.
chartHeight 140, noOfSections 4, hideRules true.
X-axis labels from entry.month. Y-axis values in colors.text3.
Wrapped in card: background colors.surface2, border colors.border, radius 18, padding 16.
Title 14px bold text1 at top. Color legend below: green dot + "Income", red dot + "Expenses".

Task 3 — Write src/components/PieChart.tsx:
Props: { data: CategoryBreakdown[]; title: string }
Uses PieChart from react-native-gifted-charts. Donut: radius 80, innerRadius 52.
Map each CategoryBreakdown to a pie slice using the category color from CATEGORIES.
Right side: vertical legend list. Each legend item: 10x10 colored square + name + percentage.
Center of donut: "Spending" in 11px text3.
Wrapped in same card style as BarChart.

Task 4 — Write src/screens/AnalyticsScreen.tsx:
Header: "Analytics" title left. Right: month label pill + calendar icon.
State: selectedMonth (0-11) and selectedYear defaulting to current date.
Left/right chevron buttons in header to change month (and year when crossing boundaries).
Sections:
  SummaryRow for income, expenses, savings of selected month
  BarChart with last6MonthsBar() data, title "6-Month Overview"
  PieChart with categoryBreakdown() for selected month, title "Spending by Category"

TypeScript strict. No any. No emojis. All colors from useTheme(). All amounts via formatLKR.
```

---

### 💸 Phase 7 — Loans Screen

**Goal:** Build the Loans screen with full lending and borrowing management.

**Files created in this phase:**

```
⚛️  src/screens/LoansScreen.tsx       (full implementation)
⚛️  src/components/LoanCard.tsx
```

**Step-by-step checklist:**

- ⬜ Build `LoanCard.tsx` with avatar initials, progress bar, type badge, due date
- ⬜ Build `LoansScreen.tsx` with summary row, You Lent section, You Owe section
- ⬜ Add a bottom sheet modal for adding a new loan entry
- ⬜ Test: Add a new loan — verify it appears in the correct section with correct colors

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all types from src/types/index.ts.
Import useTheme from ThemeContext. Import useData from DataContext.
Import SummaryRow from src/components/SummaryRow.
Import formatLKR from src/utils/formatCurrency.

Task 1 — Write src/components/LoanCard.tsx:
Props: { loan: Loan }
Row 1: Avatar circle 38x38 (gradient lend:[accent,accent2] borrow:[red,amber]) + initials 14px bold white
        + name 14px bold + "due {date}" 11px text3
        + badge right: "Lending" green tinted / "Borrowing" red tinted, 11px, 20px radius
Row 2: Amount 22px bold (green if lend, red if borrow)
Row 3: Progress bar — 5px height, surface3 background, colored fill.
  Fill width = (paidAmount / totalAmount) * 100%.
Row 4: "Paid: Rs. X" left + "Remaining: Rs. Y" right in 11px text3.
Card: background colors.surface2, border colors.border, radius 18, padding 16, marginBottom 12.

Task 2 — Write src/screens/LoansScreen.tsx:
Header: "Loans" title left, plus icon button right (opens add loan modal).
SummaryRow with 3 items:
  { label:'Total Lent', value: sum of lend loan totalAmounts, color: colors.green }
  { label:'Total Owed', value: sum of borrow loan totalAmounts, color: colors.red }
  { label:'Active', value: count of active loans.toString(), color: colors.amber }
Section label "You Lent" + list of LoanCard where loan.type === 'lend'.
Section label "You Owe" + list of LoanCard where loan.type === 'borrow'.
Empty state text "No loans here" in colors.text3 if section has no loans.

Add Loan Modal (slide-up Animated bottom sheet):
Fields: person name (required), type selector Lend/Borrow (tab style),
total amount (numeric), due date (text, placeholder "YYYY-MM-DD"),
interest rate (optional numeric), note (optional text).
Save button calls addLoan from useData() then closes modal.

TypeScript strict. No any. No emojis. All colors from useTheme().
```

---

### 🏦 Phase 8 — Accounts Screen and Add Transaction Modal

**Goal:** Build the Accounts screen and complete the Add Transaction modal that opens from the FAB.

**Files created in this phase:**

```
⚛️  src/screens/AccountsScreen.tsx    (full implementation)
⚛️  src/components/AccountCard.tsx
⚛️  src/components/AddTransactionModal.tsx  (full implementation)
⚛️  src/components/CategoryGrid.tsx
⚛️  src/components/ToggleSwitch.tsx
```

**Step-by-step checklist:**

- ⬜ Build `AccountCard.tsx` with icon box, name, account type, balance
- ⬜ Build `AccountsScreen.tsx` with net worth summary, bank list, wallets list, add dashed card
- ⬜ Build `CategoryGrid.tsx` as 4-column pressable category picker
- ⬜ Build `ToggleSwitch.tsx` with smooth Animated.timing toggle animation
- ⬜ Build `AddTransactionModal.tsx` with all fields, slide-up animation, and save to context
- ⬜ Connect the FAB button in `BottomTabNavigator.tsx` to open this modal
- ⬜ Test: Add an expense from the FAB — verify it appears in Home and Analytics

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all types from src/types/index.ts.
Import useTheme from ThemeContext. Import useData from DataContext.
Import CATEGORIES from src/constants/categories.

Task 1 — Write src/components/AccountCard.tsx:
Props: { account: Account }
Left: icon box 50x50 (16px radius, account.color at 15% opacity background)
      + MaterialCommunityIcons account.icon in account.color, size 24.
Middle: name 15px bold + type subtitle 12px text3.
  Type labels: bank:"Bank Account", cash:"Cash Wallet", wallet:"Mobile Wallet".
Right: balance 18px bold + "Available" label 11px text3.
Card: background colors.surface2, border colors.border, radius 18, padding 16.

Task 2 — Write src/screens/AccountsScreen.tsx:
Header: "Accounts" title left, plus icon right (opens Add Account modal).
SummaryRow 2 items: Net Worth (sum all account balances), Account Count (number, not currency).
Section "Bank Accounts": AccountCard list for type==='bank'.
Section "Wallets": AccountCard list for type==='cash' or type==='wallet'.
Last item in each section list: dashed-border card with plus icon + "Add New Account" text.
Tapping it opens Add Account modal.
Add Account Modal: name TextInput, type selector (bank/cash/wallet tabs),
initial balance numeric input, icon picker (a few preset icons).
Save calls addAccount from useData().

Task 3 — Write src/components/CategoryGrid.tsx:
Props: { selectedId: string; onSelect: (id: string) => void }
4-column grid of pressable items using CATEGORIES.
Each item: icon box 38x38 + category name 10px text2 below.
Active: 2px border colors.accent + rgba(79,142,247,0.08) background.
Icon box background: colorKey color at 12% opacity.

Task 4 — Write src/components/ToggleSwitch.tsx:
Props: { value: boolean; onToggle: () => void; disabled?: boolean }
42x24 pill. Off: colors.surface3. On: colors.accent.
18x18 white circle thumb animating: off→translateX 2, on→translateX 20, duration 200ms.
Wrap in TouchableOpacity calling onToggle. Opacity 0.5 when disabled.

Task 5 — Write src/components/AddTransactionModal.tsx:
Props: { visible: boolean; onClose: () => void }
Slide up: Animated.Value starts at screenHeight, animates to 0 when visible becomes true.
Content:
- Drag handle 40x4 centered, colors.border2 background
- "Add Transaction" 18px bold centered
- Type tabs row: Expense (red) / Income (green) / Transfer (accent)
  Selected tab gets tinted background and matching color border.
- Amount input: 28px monospace font, "Rs." prefix 20px text3, background colors.surface2
- CategoryGrid with selectedId state
- Account picker row (TouchableOpacity showing selected account name, bank icon left)
- Note TextInput optional, placeholder "Add a note..."
- "Save Transaction" full-width button, LinearGradient accent to accent2, 16px radius
On Save: call addTransaction from useData() with all fields, then call onClose().
Validate: amount must be greater than 0, categoryId must be selected.

TypeScript strict. No any. No emojis. All colors from useTheme().
```

---

### 🔐 Phase 9 — Settings Screen and Google Sign-In

**Goal:** Build the full Settings screen and replace the mock auth with real Google Sign-In.

**Files created / updated in this phase:**

```
⚛️  src/screens/SettingsScreen.tsx    (full implementation)
⚛️  src/screens/OnboardingScreen.tsx  (full implementation)
🔌 src/services/googleAuth.ts         (new)
🏗️  src/context/AuthContext.tsx       (updated — replace mock with real Sign-In)
```

**Step-by-step checklist:**

- ⬜ Create `googleAuth.ts` using `@react-native-google-signin/google-signin`
- ⬜ Update `AuthContext.tsx` to use real `googleAuth.signIn()` and `signOut()`
- ⬜ Build `OnboardingScreen.tsx` with Google Sign-In button, branding, loading state
- ⬜ Build `SettingsScreen.tsx` with profile banner and all toggle/navigation rows
- ⬜ Build a dev APK: `eas build --platform android --profile development`
- ⬜ Install the dev APK on your phone and sign in with a real Google account
- ⬜ Verify name and email appear correctly in the settings profile banner

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all types from src/types/index.ts.
Import useTheme from ThemeContext. Import useAuth from AuthContext.
The package @react-native-google-signin/google-signin is already installed.

Task 1 — Write src/services/googleAuth.ts:
Import Constants from 'expo-constants' to read:
  Constants.expoConfig?.extra?.googleWebClientId

configure(): void
  Calls GoogleSignin.configure({ webClientId, scopes: ['https://www.googleapis.com/auth/drive.file'] })
  Call this once on app start from App.tsx useEffect.

signIn(): Promise<User>
  Calls GoogleSignin.hasPlayServices() then GoogleSignin.signIn()
  Maps result to User type: { name, email, photo: photoUrl }
  Returns the User object.

signOut(): Promise<void>
  Calls GoogleSignin.signOut()

getCurrentUser(): User | null
  Calls GoogleSignin.getCurrentUser() synchronously.
  Returns mapped User or null.

getAccessToken(): Promise<string>
  Calls GoogleSignin.getTokens() and returns the accessToken string.
  Always call fresh — token expires in 1 hour.

Task 2 — Write src/context/AuthContext.tsx (full replacement):
On mount: call configure() from googleAuth, then getCurrentUser() to restore session.
signIn(): calls googleAuth.signIn(), sets user state.
signOut(): calls googleAuth.signOut(), sets user to null.
loading: true during mount restore, false after.
Export useAuth hook.

Task 3 — Write src/screens/OnboardingScreen.tsx:
Full-screen colors.bg background. Centered layout:
  "CW" initials in 64px large rounded square with accent gradient
  "CashWise" 32px bold text1
  "Track money. Stay wise." 16px text2
  Spacer
  Google Sign-In button: white background, 14px bold dark text,
    AntDesign 'google' icon from @expo/vector-icons
    "Continue with Google" label, 14px radius, full width max 320px
  ActivityIndicator shown instead of button while loading
  Error text in colors.red if signIn throws

Task 4 — Write src/screens/SettingsScreen.tsx:
Profile banner: LinearGradient (accent to accent2), 20px padding.
  Avatar circle 60x60 with initials, border rgba(255,255,255,0.2)
  Name 17px bold white + email 12px rgba(255,255,255,0.7) + green dot + "Google Drive synced" 11px

Reusable SettingsRow inner component (not exported):
Props: { icon: string; iconColor: string; iconBg: string; title: string;
         subtitle?: string; right: ReactNode; onPress?: () => void }

Section "Account" — 3 rows:
  Google Account: google icon, email subtitle, chevron-right
  Google Drive Backup: cloud-upload icon, "Tap to backup" subtitle, chevron-right
  Currency: currency-usd icon, "Sri Lankan Rupee (LKR)" subtitle, chevron-right

Section "Preferences" — 4 toggle rows using ToggleSwitch component:
  Dark Theme: moon icon, connected to toggleTheme from useTheme()
  Notifications: bell icon, useState local
  Transaction Sounds: volume-high icon, useState local
  Biometric Lock: fingerprint icon, useState local (full biometric wired in Phase 9.5)

Section "More" — 3 rows:
  Export Data: download icon, "CSV via share sheet" subtitle, chevron
  Check for Updates: refresh icon, "v1.0.0" subtitle, chevron
  Sign Out: logout icon, colors.red icon background tint, calls signOut() from useAuth()

TypeScript strict. No any. No emojis. All colors from useTheme().
```

---

### 🔔 Phase 9.5 — Biometric Lock and Local Notifications

**Goal:** Add app-lock via fingerprint/face ID and schedule local notifications for budget alerts and loan reminders. These features require a real device and a built APK — they do not work in Expo Go.

**Files created / updated in this phase:**

```
⚛️  src/components/BiometricLockScreen.tsx   (new)
🔌 src/services/notificationService.ts       (new)
⚛️  App.tsx                                  (updated — AppState listener + lock overlay)
🏗️  src/context/DataContext.tsx              (updated — trigger notifications on data changes)
🏗️  src/context/AuthContext.tsx             (updated — requestPermission after signIn)
⚙️  app.json                                (updated — POST_NOTIFICATIONS + SCHEDULE_EXACT_ALARM)
```

**Step-by-step checklist:**

- ⬜ Confirm `app.json` has `POST_NOTIFICATIONS`, `RECEIVE_BOOT_COMPLETED`, `SCHEDULE_EXACT_ALARM` in permissions
- ⬜ Confirm `app.json` has the `notification` block with icon and color
- ⬜ Create `notificationService.ts` — channel setup, permission request, schedule/cancel helpers
- ⬜ Call `setupNotificationChannel()` and `setNotificationHandler()` in `App.tsx` on mount
- ⬜ Call `requestNotificationPermission()` in `AuthContext.signIn()` after user is set
- ⬜ Create `BiometricLockScreen.tsx` — full-screen overlay calling `authenticateAsync`
- ⬜ Add `AppState` listener in `App.tsx` — sets `isLocked = true` on every `active` event when preference is `true`
- ⬜ Render `<BiometricLockScreen onUnlock={() => setIsLocked(false)} />` above navigation when `isLocked`
- ⬜ Wire biometric toggle in `SettingsScreen.tsx` with `hasHardwareAsync()` guard
- ⬜ Wire notification toggle in `SettingsScreen.tsx` checking system permission state
- ⬜ Call `scheduleLoanReminder()` from `DataContext.addLoan()` and `DataContext.updateLoan()`
- ⬜ Call `sendBudgetAlert()` from `DataContext.addTransaction()` when category total crosses 80%
- ⬜ Call `cancelAllNotifications()` from `AuthContext.signOut()`
- ⬜ Build dev APK and test on real device: `eas build --platform android --profile development`

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo TypeScript app called CashWise.
expo-local-authentication and expo-notifications are already installed.
Import all types from src/types/index.ts.
Import useTheme from ThemeContext.

Task 1 — Write src/components/BiometricLockScreen.tsx:
Props: { onUnlock: () => void }
Full-screen View backgroundColor colors.bg, centered content.
On mount:
  1. Call LocalAuthentication.hasHardwareAsync() and isEnrolledAsync()
  2a. If both true: call authenticateAsync({ promptMessage: 'Unlock CashWise', fallbackLabel: 'Use PIN' })
      On success: call onUnlock()
      On failure/cancel: show "Try Again" button that re-calls authenticateAsync
  2b. If hardware missing or not enrolled: show "Biometric not available" message
      + "Use PIN" button calling authenticateAsync({ disableDeviceFallback: false })
      + "Open Settings" text button calling Linking.openSettings()
Layout centered with gap 20:
  MaterialCommunityIcons 'fingerprint' size 64 colors.accent
  "CashWise" 22px bold text1
  "Unlock to continue" 14px text2
  Status message 12px text3 (loading or error state)
  "Try Again" or "Use PIN" button: accent background, white 15px bold, 14px radius, 200px wide

Task 2 — Write src/services/notificationService.ts:
Set at module level before any function definition:
  Notifications.setNotificationHandler({
    handleNotification: async () => ({ shouldShowAlert:true, shouldPlaySound:true, shouldSetBadge:false })
  })

Export 6 async functions (all typed, no any):

setupNotificationChannel(): Promise<void>
  Android only. Channel id 'cashwise_alerts', name 'CashWise Alerts',
  importance HIGH, vibrationPattern [0,250,250,250], lightColor '#4f8ef7'.

requestNotificationPermission(): Promise<boolean>
  Gets existing status. If 'granted' return true.
  Otherwise calls requestPermissionsAsync() and returns status === 'granted'.

scheduleLoanReminder(loanId: string, personName: string, dueDate: string): Promise<string | null>
  fireDate = dueDate minus 3 days at 9:00 AM local time.
  If fireDate <= now return null.
  identifier: 'loan_'+loanId
  title: 'Loan Due Soon', body: 'Payment to '+personName+' is due in 3 days.'
  channelId: 'cashwise_alerts', trigger: { date: fireDate }
  Returns identifier string.

sendBudgetAlert(categoryName: string, percent: number): Promise<void>
  trigger: null (immediate)
  title: 'Budget Alert', body: 'You have used '+percent+'% of your '+categoryName+' budget this month.'
  channelId: 'cashwise_alerts'

cancelNotification(identifier: string): Promise<void>
  Calls cancelScheduledNotificationAsync(identifier).

cancelAllNotifications(): Promise<void>
  Calls cancelAllScheduledNotificationsAsync().

Task 3 — Write the updated App.tsx:
Keep existing provider stack. Add:
- import AppState, AppStateStatus from react-native
- import AsyncStorage from @react-native-async-storage/async-storage
- import { setupNotificationChannel } from @/services/notificationService
- import BiometricLockScreen from @/components/BiometricLockScreen
Inside App component:
  - useState<boolean>(false) for isLocked
  - useEffect on mount: call setupNotificationChannel()
  - useEffect on mount: AppState.addEventListener('change', async handler)
    handler: if state === 'active', read 'biometric_enabled' from AsyncStorage,
    if value === 'true' call setIsLocked(true)
  - cleanup: sub.remove() in return
  - Inside the innermost View below the navigator:
    {isLocked && <BiometricLockScreen onUnlock={() => setIsLocked(false)} />}

Task 4 — Write the updated biometric and notification rows in SettingsScreen:
Biometric Lock row:
  - On mount: canBiometric = hasHardwareAsync() && isEnrolledAsync()
  - On mount: read 'biometric_enabled' from AsyncStorage into biometricEnabled state
  - On toggle press:
      if !canBiometric: Alert 'No biometric enrolled. Go to Android Settings → Security.'
      if turning on: write 'true' to AsyncStorage
      if turning off: write 'false' to AsyncStorage
  - ToggleSwitch value={biometricEnabled} disabled={!canBiometric}

Notification toggle row:
  - On mount: getPermissionsAsync(), set notifEnabled = status === 'granted'
  - On toggle press to turn on: requestNotificationPermission() then update state
  - On toggle press to turn off: Alert directing user to Android Settings → Apps → CashWise → Notifications
  - ToggleSwitch value={notifEnabled}

TypeScript strict. No any. No emojis. All colors from useTheme().
```

---

### ☁️ Phase 10 — Google Drive Backup

**Goal:** Implement backup and restore via the user's own Google Drive. No Firebase — raw Drive REST API only.

**Files created in this phase:**

```
🔌 src/services/driveBackup.ts
🔧 src/utils/exportData.ts
```

**Step-by-step checklist:**

- ⬜ Create `driveBackup.ts` with upload (create or update) and download functions
- ⬜ Create `exportData.ts` with CSV generation and system share
- ⬜ Wire Google Drive Backup row in SettingsScreen to trigger `exportToDrive`
- ⬜ Show last sync timestamp from the Drive file `modifiedTime`
- ⬜ Test: Back up → clear AsyncStorage → restore → verify transactions reappear correctly

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import BackupPayload, Transaction, Account from src/types/index.ts.
Import CATEGORIES from src/constants/categories.
No Firebase. No Drive npm SDK. Only raw fetch calls to Google Drive REST API v3.

Task 1 — Write src/services/driveBackup.ts:

type DriveResult = { success: boolean; fileId?: string; timestamp?: string; error?: string }

exportToDrive(accessToken: string, payload: BackupPayload): Promise<DriveResult>
  Step 1: Search for existing file:
    GET https://www.googleapis.com/drive/v3/files
    params: q="name='cashwise-backup.json' and spaces='appDataFolder' and trashed=false"
            fields="files(id,name,modifiedTime)" spaces="appDataFolder"
    Header: Authorization: Bearer {accessToken}
  Step 2a: If file found (files.length > 0) — update:
    PATCH https://www.googleapis.com/upload/drive/v3/files/{fileId}
    params: uploadType=multipart
    Multipart body: metadata (name, mimeType) + JSON content
  Step 2b: If not found — create:
    POST https://www.googleapis.com/upload/drive/v3/files
    params: uploadType=multipart
    Multipart body: metadata (name:'cashwise-backup.json', mimeType:'application/json',
    parents:['appDataFolder']) + JSON content
  Return { success:true, fileId, timestamp: ISO string }
  Catch all errors and return { success:false, error: message }

importFromDrive(accessToken: string): Promise<BackupPayload | null>
  Search same way to get fileId.
  If found: GET https://www.googleapis.com/drive/v3/files/{fileId}?alt=media
  Parse response JSON and return as BackupPayload.
  Return null if not found.

getLastSyncTime(accessToken: string): Promise<string | null>
  Search for the file, return files[0].modifiedTime or null.

Task 2 — Write src/utils/exportData.ts using expo-file-system and expo-sharing:

generateCSV(transactions: Transaction[], accounts: Account[]): string
  Header row: Date,Type,Amount,Category,Account,Note
  One row per transaction sorted newest first.
  Resolve category name from CATEGORIES. Resolve account name from accounts array.
  Amount as plain number without "Rs." prefix.
  Enclose fields containing commas in double quotes.
  Return full CSV string with newline line endings.

shareCSV(csvString: string): Promise<void>
  Write to FileSystem.cacheDirectory + 'cashwise-export.csv' using writeAsStringAsync.
  Check Sharing.isAvailableAsync() is true.
  Call Sharing.shareAsync with file URI and mimeType 'text/csv'.

TypeScript strict. No any. Handle all network errors gracefully. No emojis.
```

---

### 🚀 Phase 11 — GitHub Actions and APK Release

**Goal:** Set up CI/CD to automatically build and publish the APK to GitHub Releases on every version tag push.

**Files created in this phase:**

```
🔄 .github/workflows/build-apk.yml
🔄 .github/workflows/preview.yml
📋 CHANGELOG.md
```

**Step-by-step checklist:**

- ⬜ Create `.github/workflows/build-apk.yml` exactly as shown in the GitHub Actions section above
- ⬜ Create `.github/workflows/preview.yml` for PR Expo preview QR
- ⬜ Create `CHANGELOG.md` with the `v1.0.0` entry
- ⬜ Add all 3 GitHub secrets: `EXPO_TOKEN`, `GOOGLE_WEB_CLIENT_ID`, `GOOGLE_ANDROID_CLIENT_ID`
- ⬜ Push all code to main: `git push origin main`
- ⬜ Create and push first release tag: `git tag v1.0.0 && git push origin v1.0.0`
- ⬜ Monitor progress at `https://github.com/tharindu899/cashwise/actions`
- ⬜ Download the APK from the Releases page and install on your phone
- ⬜ Full end-to-end test: sign in → add transaction → back up to Drive → sign out → sign in → restore

**Claude AI Prompt — copy and paste into claude.ai:**

```
I am finalizing the CashWise Expo TypeScript app for release.
Package: com.tharindu899.cashwise. GitHub repo: tharindu899/cashwise.

Task 1 — Write .github/workflows/build-apk.yml:
Trigger: push to tags matching 'v*'
Runner: ubuntu-latest
Steps:
1. actions/checkout@v4
2. actions/setup-node@v4 node-version '20' cache 'npm'
3. run: npm ci
4. run: npm install -g eas-cli
5. run: eas whoami  env: EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
6. run build and capture artifact URL:
   BUILD_JSON=$(eas build --platform android --profile production --non-interactive --json 2>/dev/null)
   BUILD_URL=$(echo "$BUILD_JSON" | jq -r '.[0].artifacts.buildUrl')
   echo "build_url=$BUILD_URL" >> $GITHUB_OUTPUT
   id: eas_build  env: EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
7. run: curl -L "${{ steps.eas_build.outputs.build_url }}" -o "cashwise-${{ github.ref_name }}.apk"
8. softprops/action-gh-release@v1:
   tag_name: ${{ github.ref_name }}
   name: "CashWise ${{ github.ref_name }}"
   body: Install instructions (download APK, enable unknown sources, install, sign in with Google)
   files: cashwise-${{ github.ref_name }}.apk
   permissions: contents: write
   env: GITHUB_TOKEN: ${{ github.token }}

Task 2 — Write .github/workflows/preview.yml:
Trigger: pull_request targeting main
Runner: ubuntu-latest
Steps: checkout, node 20 setup, npm ci, eas-cli install,
eas update --branch "pr-${{ github.event.number }}" --message "Preview PR #${{ github.event.number }}" --non-interactive
env EXPO_TOKEN from secrets.

Task 3 — Write CHANGELOG.md in Keep a Changelog format:
## [Unreleased]
## [1.0.0] - 2025-05-16
### Added
- Home screen: balance card, multi-account filter pills, quick action grid, transaction list
- Analytics screen: bar chart and donut pie chart with month selector
- Loans screen: lending and borrowing tracking with progress bars and due dates
- Accounts screen: bank accounts and mobile wallets with net worth summary
- Settings screen: Google account, Drive backup, dark/light theme, biometric lock, CSV export
- Add Transaction modal: expense, income, and transfer with category picker
- Google Sign-In via Google Cloud OAuth (no Firebase)
- Google Drive backup and restore — data stays in user's own Google Drive
- Biometric lock — fingerprint/face unlock via expo-local-authentication
- Local notifications — budget alerts, loan reminders via expo-notifications
- GitHub Releases APK distribution
- Dark and light theme with persistence via AsyncStorage
- TypeScript strict mode throughout the entire codebase

No emojis in any code files.
```

---

<a id="github-apk-release"></a>
## 📦 GitHub APK Release

CashWise is released through GitHub Releases as an installable APK.

### How to publish a new version

```bash
# Termux or terminal — bump version first in app.json and package.json
git add .
git commit -m "Release v1.0.1 — fix balance card total"
git push origin main

git tag v1.0.1
git push origin v1.0.1
```

APK appears at `https://github.com/tharindu899/cashwise/releases` within 20 minutes.

### Version increment rules

Every new release requires:

1. Increment `version` in `app.json` (e.g. `"1.0.0"` → `"1.0.1"`)
2. Increment `versionCode` in `app.json` (e.g. `1` → `2`)
3. Increment `version` in `package.json` to match
4. Create a matching git tag (e.g. `v1.0.1`)

Failure to increment `versionCode` means Android will refuse to install over the previous version.

### In-app update check

The UpdateBanner checks the GitHub Releases API:

```
GET https://api.github.com/repos/tharindu899/cashwise/releases/latest
```

Compare `tag_name` (e.g. `"v1.0.1"`) against `Constants.expoConfig?.version` (e.g. `"1.0.0"`). If the tag version is higher, show the UpdateBanner with the download URL from `assets[0].browser_download_url`.

### Installing on Android

Users who receive the APK link:

1. Download the APK in their browser
2. Open Android **Settings → Security → Install unknown apps**
3. Enable for their browser or file manager
4. Tap the downloaded APK and install
5. Open CashWise, tap **Continue with Google**

---

<a id="troubleshooting"></a>
## 🛟 Troubleshooting

### Google Sign-In fails with "developer error 10"

The SHA-1 fingerprint in Google Cloud does not match the APK's signing certificate.

Fix: After your first EAS production build, run `eas credentials` to get the production keystore SHA-1. Add a second Android OAuth client in Google Cloud with that SHA-1. The debug SHA-1 only works with development builds.

### EAS build fails — "not authenticated"

The `EXPO_TOKEN` secret is missing, wrong, or expired.

Fix: Go to `https://expo.dev/accounts/tharindu899/settings/access-tokens`, create a new token, update the GitHub secret under **Settings → Secrets and variables → Actions**.

### Google Drive backup returns 401 Unauthorized

The access token expired. Google OAuth tokens expire after 1 hour.

Fix: Always call `getAccessToken()` from `googleAuth.ts` immediately before each Drive API call. This fetches a fresh token rather than using a cached one.

### App builds but Google Sign-In button does nothing or crashes

The `@react-native-google-signin/google-signin` package requires a custom dev build — it will not work in Expo Go.

Fix: Run `eas build --platform android --profile development`, install that APK once, then test Google Sign-In.

### Termux git push asks for a password

Your remote is using HTTPS instead of SSH.

Fix:
```bash
git remote set-url origin git@github.com:tharindu899/cashwise.git
ssh -T git@github.com
```

### Data disappears after uninstalling the app

AsyncStorage is tied to the app installation. Uninstalling wipes local data.

Fix: The Google Drive backup feature prevents permanent data loss. Remind users to back up before uninstalling via Settings → Google Drive Backup.

### TypeScript errors from `@react-native-google-signin`

Add a declaration file if types are missing:

```ts
// src/types/google-signin.d.ts
declare module '@react-native-google-signin/google-signin';
```

### Biometric toggle does nothing or shows error immediately

`expo-local-authentication` requires a real device — it does not work in Expo Go or in the Android Emulator unless the emulator has a fingerprint configured.

Fix: Build a dev APK with `eas build --platform android --profile development` and test on a physical phone with a fingerprint enrolled.

### Notifications not appearing on Android 13+

The `POST_NOTIFICATIONS` permission must be in `app.json` and the user must grant the runtime permission. Without the grant, `scheduleNotificationAsync` silently succeeds but no notification appears.

Fix:
1. Verify `android.permission.POST_NOTIFICATIONS` is in `app.json`
2. Call `requestNotificationPermission()` and check the returned boolean
3. If false, alert the user and direct them to Android Settings → Apps → CashWise → Notifications

### Scheduled notifications disappear after device reboot

Fix: Confirm `android.permission.RECEIVE_BOOT_COMPLETED` is in `app.json`. Then reschedule all active loan reminders on app launch by iterating `DataContext.loans` and calling `scheduleLoanReminder()` for each active loan.

### SCHEDULE_EXACT_ALARM — SecurityException on Android 12+

Android 14 (API 34) may require the user to grant this manually.

Fix: On Android 14+, check `AlarmManager.canScheduleExactAlarms()`. If false, open the special settings screen using `Linking.openURL('android.settings.REQUEST_SCHEDULE_EXACT_ALARM')`.

---

---

<p align="center">
  <b>💰 CashWise — Built for real personal finance tracking</b><br/>
  🚫 No subscriptions · 🚫 No ads · 🔐 Local-first data · ☁️ User-owned Google Drive backup
</p>
