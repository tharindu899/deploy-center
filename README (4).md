# 💰 CashWise — Personal Money Manager

> A clean, offline-first Android money manager built with **Expo** & **React Native + TypeScript**.
> Google Sign-In for identity. Google Drive for backup. GitHub Actions for APK delivery.
> No Firebase. No Google Play Store. No emojis inside the app.

---

## 📚 Table of Contents

- [App Identity](#-app-identity)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Local Development Setup](#-local-development-setup)
- [Google Cloud Setup](#-google-cloud-setup--sign-in-only)
- [GitHub Secrets](#-github-secrets)
- [EAS Build Configuration](#-eas-build-configuration)
- [GitHub Actions — APK Build & Release](#-github-actions--apk-build--release)
- [Testing with Expo Go](#-testing-with-expo-go)
- [Termux Workflow](#-termux-workflow--git-push-from-phone)
- [Phase-by-Phase TODO List](#-phase-by-phase-todo-list-with-ai-prompts)
- [Release Without Google Play Store](#-release-without-google-play-store)
- [Troubleshooting](#-troubleshooting)

---

## 🪪 App Identity

| Field | Value |
|---|---|
| App Name | CashWise |
| Package Name | `com.tharindu899.cashwise` |
| Bundle Identifier | `com.tharindu899.cashwise` |
| GitHub Repo | `https://github.com/tharindu899/cashwise` |
| Version | 1.0.0 |
| Platform | Android (APK release via GitHub) |
| Min SDK | Android 6.0 — API 23 |
| Target SDK | Android 14 — API 34 |
| Framework | Expo SDK 51 / React Native 0.74 |
| Language | **TypeScript 5.3 — TSX components, TS utilities** |
| Author | tharindu899 |

---

## ✨ Features

### 🏠 Home Screen
- Total balance card with monthly income and expense summary
- Multi-account filter pills — All, BOC Bank, Cash, HNB, eZ Cash
- Quick action grid — Expense, Income, Transfer, Loan, Bank Pay, Budget, Scan Bill
- Date-grouped transaction list with category icons
- Notification bell with unread badge count
- In-app update banner with version info

### 📊 Analytics Screen
- Monthly summary row — income, expenses, savings
- Bar chart — 6-month spending trend by category
- Pie chart — category breakdown with legend
- Month picker — swipe or arrow navigation

### 💸 Loans Screen
- Summary row — total lent, total owed, active loans
- You Lent section — lending cards with progress bar and due date
- You Owe section — borrowing cards with interest rate and repayment progress
- Green lending badge and red borrowing badge

### 🏦 Accounts Screen
- Net worth and account count summary
- Bank accounts list — name, masked number, available balance
- Wallets list — Cash wallet, eZ Cash mobile wallet
- Add new account dashed-border card

### ⚙️ Settings Screen
- Google account profile banner with Drive sync status
- Google Drive backup — export and restore full data
- Currency selector — default Sri Lankan Rupee (LKR)
- Dark theme toggle (persisted across launches)
- Notification toggle — bill reminders, budget alerts
- Transaction sounds toggle
- Biometric lock toggle — fingerprint / face unlock
- Export data — CSV via system share sheet
- Check for updates via GitHub Releases API
- Sign out

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

---

## 🛠️ Tech Stack

| Layer | Library / Tool | Version |
|---|---|---|
| Framework | Expo | SDK 51 |
| Language | TypeScript | 5.3.x |
| UI Runtime | React Native | 0.74 |
| React | React | 18.2 |
| Navigation | React Navigation — Bottom Tabs + Stack | v6 |
| Local Storage | `@react-native-async-storage/async-storage` | 1.23 |
| Icons | `@expo/vector-icons` MaterialCommunityIcons | — |
| Charts | `react-native-gifted-charts` | latest |
| Gradients | `expo-linear-gradient` | — |
| Google Sign-In | `@react-native-google-signin/google-signin` | 11.x |
| Google Drive | REST API via native `fetch` — no SDK | — |
| File Export | `expo-file-system` + `expo-sharing` | — |
| Biometric | `expo-local-authentication` | — |
| Notifications | `expo-notifications` | — |
| Camera | `expo-camera` | — |
| App Constants | `expo-constants` | — |
| Build | EAS Build — Expo free tier (30 builds/month) | — |
| CI/CD | GitHub Actions | — |
| APK Distribution | GitHub Releases | — |
| Code Editor | Any — VS Code, code-server, or phone editor | — |
| Git on Phone | Termux | — |

---

## 🗂️ Project Structure

> Icon legend used below:
> `📂` Directory &nbsp;|&nbsp; `⚛️` TSX Component &nbsp;|&nbsp; `🟦` TS File &nbsp;|&nbsp; `⚙️` Config/JSON &nbsp;|&nbsp; `🖼️` Image Asset &nbsp;|&nbsp; `📋` Markdown &nbsp;|&nbsp; `🔒` Secret/Env &nbsp;|&nbsp; `🎨` Theme/Colors &nbsp;|&nbsp; `🧭` Navigation &nbsp;|&nbsp; `🪝` Hook &nbsp;|&nbsp; `🔌` Service &nbsp;|&nbsp; `🗄️` Storage &nbsp;|&nbsp; `🔧` Utility &nbsp;|&nbsp; `📌` Constants &nbsp;|&nbsp; `🏗️` Context &nbsp;|&nbsp; `🔑` Types

```
📂 cashwise/
│
├── 📂 .github/
│   └── 📂 workflows/
│       ├── ⚙️  build-apk.yml         ← Trigger on git tag v* → EAS build → GitHub Release APK
│       └── ⚙️  preview.yml           ← Trigger on PR → Expo update QR for phone preview
│
├── 📂 assets/
│   ├── 🖼️  icon.png                  ← App icon  1024×1024 PNG, no transparency
│   ├── 🖼️  splash.png                ← Splash screen  1284×2778 PNG, dark bg #0d0f14
│   ├── 🖼️  adaptive-icon.png         ← Android adaptive icon  1024×1024 PNG
│   └── 🖼️  favicon.png               ← Web favicon  48×48 PNG
│
├── 📂 src/
│   │
│   ├── 📂 types/
│   │   └── 🔑 index.ts               ← All shared interfaces: Transaction, Account, Loan, User, Category
│   │
│   ├── 📂 screens/
│   │   ├── ⚛️  HomeScreen.tsx         ← Dashboard: balance card, accounts, quick actions, transactions
│   │   ├── ⚛️  AnalyticsScreen.tsx    ← Charts: bar chart, pie chart, monthly summary row
│   │   ├── ⚛️  LoansScreen.tsx        ← Loans: lend/borrow cards with progress bars
│   │   ├── ⚛️  AccountsScreen.tsx     ← Accounts: bank accounts and wallets list
│   │   ├── ⚛️  SettingsScreen.tsx     ← Settings: Google auth, Drive backup, all toggles
│   │   └── ⚛️  OnboardingScreen.tsx   ← First launch: Google Sign-In button and branding
│   │
│   ├── 📂 components/
│   │   ├── ⚛️  BalanceCard.tsx        ← Gradient card with total balance, income, expense stats
│   │   ├── ⚛️  TransactionCard.tsx    ← Single transaction row: icon, name, meta, colored amount
│   │   ├── ⚛️  AccountPill.tsx        ← Scrollable horizontal filter pill per account
│   │   ├── ⚛️  QuickActionGrid.tsx    ← 4×2 icon grid of quick action buttons
│   │   ├── ⚛️  AddTransactionModal.tsx← Bottom sheet: type tabs, amount input, category, save
│   │   ├── ⚛️  NotificationPanel.tsx  ← Animated slide-in notification list panel
│   │   ├── ⚛️  LoanCard.tsx           ← Loan card: avatar initials, progress bar, lend/borrow badge
│   │   ├── ⚛️  AccountCard.tsx        ← Account card for accounts screen with icon and balance
│   │   ├── ⚛️  SummaryRow.tsx         ← 2 or 3 column stat cards used on multiple screens
│   │   ├── ⚛️  BarChart.tsx           ← Grouped bar chart via react-native-gifted-charts
│   │   ├── ⚛️  PieChart.tsx           ← Donut chart with custom legend via gifted-charts
│   │   ├── ⚛️  CategoryGrid.tsx       ← 4-column pressable category picker for modal
│   │   ├── ⚛️  UpdateBanner.tsx       ← Dismissible in-app update banner card
│   │   └── ⚛️  ToggleSwitch.tsx       ← Animated custom toggle switch for settings rows
│   │
│   ├── 📂 navigation/
│   │   ├── 🧭 AppNavigator.tsx        ← Root: shows Onboarding if signed out, Tabs if signed in
│   │   └── 🧭 BottomTabNavigator.tsx  ← 5-tab bar: Home, Analytics, FAB (+), Loans, Settings
│   │
│   ├── 📂 context/
│   │   ├── 🏗️  ThemeContext.tsx        ← isDark state, colors object, toggleTheme, persisted to storage
│   │   ├── 🏗️  AuthContext.tsx         ← User state, signIn, signOut via Google Sign-In service
│   │   └── 🏗️  DataContext.tsx         ← Transactions, accounts, loans CRUD — AsyncStorage backed
│   │
│   ├── 📂 hooks/
│   │   ├── 🪝 useTransactions.ts      ← Read/add/edit/delete transactions from DataContext
│   │   ├── 🪝 useAccounts.ts          ← Read/add/edit accounts from DataContext
│   │   ├── 🪝 useLoans.ts             ← Read/add/update loans from DataContext
│   │   └── 🪝 useAnalytics.ts         ← Compute monthly totals, category breakdown, bar chart data
│   │
│   ├── 📂 services/
│   │   ├── 🔌 googleAuth.ts           ← Configure, signIn, signOut, getAccessToken for Google OAuth
│   │   └── 🔌 driveBackup.ts          ← Upload/download cashwise-backup.json via Drive REST API
│   │
│   ├── 📂 storage/
│   │   └── 🗄️  asyncStorage.ts         ← Typed wrapper: getJSON<T>, setJSON, removeKey, clearAll
│   │
│   ├── 📂 utils/
│   │   ├── 🔧 formatCurrency.ts       ← formatLKR(n) → "Rs. 1,234.00", formatShort(n) → "Rs. 82K"
│   │   ├── 🔧 dateHelpers.ts          ← groupByDate(), formatRelativeTime() — no external libraries
│   │   └── 🔧 exportData.ts           ← generateCSV(transactions) → shareCSV() via expo-sharing
│   │
│   └── 📂 constants/
│       ├── 📌 categories.ts           ← 8 category objects: id, name, icon, colorKey
│       ├── 🎨 colors.ts               ← Dark and light theme color token objects
│       └── 🎨 theme.ts                ← Spacing, radius, fontSize, fontWeight constants
│
├── ⚛️  App.tsx                         ← Root: wraps NavigationContainer in all Context providers
├── ⚙️  app.json                        ← Expo config: name, slug, package, icon, permissions, extras
├── ⚙️  eas.json                        ← EAS Build profiles: development, preview, production
├── ⚙️  babel.config.js                 ← Babel with expo preset
├── ⚙️  tsconfig.json                   ← TypeScript config: strict mode, path aliases
├── ⚙️  package.json                    ← All dependencies and npm scripts
├── 🔒 .gitignore                       ← Ignores: node_modules, .expo, android, ios, .env, *.apk
├── 🔒 .env.example                     ← Template showing key names with no values — safe to commit
├── 📋 CHANGELOG.md                     ← Version history in Keep a Changelog format
└── 📋 README.md                        ← This file
```

---

## 🔑 Shared Types — `src/types/index.ts`

All interfaces live in one file and are imported everywhere. This keeps AI-generated code consistent across all phases.

```ts
// src/types/index.ts

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

## 📋 Prerequisites

### On your computer or code editor

| Tool | Purpose | Install |
|---|---|---|
| Node.js 20 LTS | Run JavaScript tooling | https://nodejs.org |
| npm | Package manager | Included with Node.js |
| Expo CLI | Expo project tooling | `npm install -g expo-cli` |
| EAS CLI | Cloud build and submit | `npm install -g eas-cli` |
| Git | Version control | https://git-scm.com |

### Accounts required

| Account | Purpose | Cost |
|---|---|---|
| GitHub — tharindu899 | Repo, Actions, Releases | Free |
| Expo account | EAS Build — 30 builds/month | Free |
| Google Cloud Console | OAuth 2.0 for Sign-In and Drive | Free |

### On your Android phone

| App | Purpose |
|---|---|
| Expo Go | UI preview during development |
| Termux | Git push from phone |
| GitHub app (optional) | Monitor Actions workflow status |

---

## 💻 Local Development Setup

### 1 — Clone the repository

```bash
git clone https://github.com/tharindu899/cashwise.git
cd cashwise
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Create your local environment file

```bash
cp .env.example .env
```

Edit `.env`:

```
GOOGLE_WEB_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
GOOGLE_ANDROID_CLIENT_ID=your_android_client_id.apps.googleusercontent.com
```

### 4 — Start the development server

```bash
npx expo start
```

Scan the QR code with Expo Go on your phone to preview.

---

## ☁️ Google Cloud Setup — Sign-In Only

No Firebase. Google is used only for user identity (Sign-In) and the user's own Drive storage (backup). All data lives on the user's device and their personal Google Drive — Anthropic or any third party never touches it.

### Step 1 — Create Project

1. Open https://console.cloud.google.com
2. Click the project dropdown → **New Project**
3. Name: `CashWise` → **Create**

### Step 2 — Enable APIs

Go to **APIs & Services → Library** and enable:

- ✅ **Google Drive API** — for backup and restore
- ✅ **People API** — for user name, email, profile photo

### Step 3 — OAuth Consent Screen

1. **APIs & Services → OAuth consent screen**
2. User type: **External** → Create
3. Fill in App name `CashWise`, support email, developer email
4. Scopes — add all three:
   - `https://www.googleapis.com/auth/drive.file`
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`
5. Save through all steps

### Step 4 — Create OAuth Credentials

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

### Step 5 — Add Test Users

**OAuth consent screen → Test users → Add Users** — add your Gmail address so you can sign in while the app is still in Testing mode.

---

## 🔐 GitHub Secrets

These values are stored encrypted in GitHub and injected into GitHub Actions at build time. They are never in any code file.

### How to add secrets

1. Go to `https://github.com/tharindu899/cashwise`
2. **Settings → Secrets and variables → Actions**
3. **New repository secret** for each row below

### Required secrets

| Secret Name | What it is | Where to get it |
|---|---|---|
| `EXPO_TOKEN` | Expo account access token | expo.dev → Settings → Access Tokens → Create |
| `GOOGLE_WEB_CLIENT_ID` | OAuth Web client ID | Google Cloud → Credentials → Web client |
| `GOOGLE_ANDROID_CLIENT_ID` | OAuth Android client ID | Google Cloud → Credentials → Android client |

### Security rules

- Never commit `.env` — it is in `.gitignore`
- `.env.example` is committed with key names and empty values only
- `GITHUB_TOKEN` for creating releases is provided automatically by GitHub Actions — you do not add it

---

## 🏗️ EAS Build Configuration

**File:** `eas.json`

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
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

> `buildType: apk` is used for all profiles because the app is distributed through GitHub Releases, not Google Play Store. Google Play requires `.aab` — this project does not use it.

---

## 🚀 GitHub Actions — APK Build & Release

### File: `.github/workflows/build-apk.yml`

Triggers automatically when you push a version tag like `v1.0.0`. Builds the APK on Expo's cloud servers, downloads it, and publishes it as a GitHub Release attachment.

```yaml
name: 🔨 Build APK and Create Release

on:
  push:
    tags:
      - 'v*'

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
            1. Download **cashwise-${{ github.ref_name }}.apk** below
            2. On your Android phone open **Settings → Security**
            3. Enable **Install unknown apps** for your browser or file manager
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
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### File: `.github/workflows/preview.yml`

Generates a QR code for Expo Go preview on every pull request — useful for reviewing UI changes on your phone before merging.

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

### How to trigger a release from Termux or terminal

```bash
git add .
git commit -m "Release v1.0.0"
git push origin main

git tag v1.0.0
git push origin v1.0.0
```

The Actions workflow starts immediately. The APK appears at `https://github.com/tharindu899/cashwise/releases` within 15 to 20 minutes.

---

## 📱 Testing with Expo Go

Expo Go lets you test UI and navigation on your phone during development without building a full APK. Google Sign-In does not work in Expo Go because it requires native modules — use the development build for that.

```bash
# Start the dev server
npx expo start

# Scan the QR code in Expo Go on your Android phone
```

### For Google Sign-In testing — build a dev client

```bash
eas build --platform android --profile development
```

Install the resulting APK once. Then use:

```bash
npx expo start --dev-client
```

Your phone connects to the dev server with full native module support, including Google Sign-In, exactly like Expo Go but with all native libraries available.

---

## 📲 Termux Workflow — Git Push from Phone

### One-time setup in Termux

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

### Daily workflow in Termux

```bash
# Navigate to the project (adjust path to your code editor's save location)
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

### Release workflow in Termux

```bash
git add .
git commit -m "Release v1.0.1"
git push origin main

git tag v1.0.1
git push origin v1.0.1
```

Check build progress at `https://github.com/tharindu899/cashwise/actions`

---

## ✅ Phase-by-Phase TODO List with AI Prompts

Each phase is self-contained. Finish one phase and test it before starting the next. Every AI prompt is ready to copy and paste directly into Claude, Gemini, or ChatGPT free tier.

---

### 🚀 Phase 1 — Project Initialization

**Goal:** Create the Expo TypeScript project, set up the full folder structure, and install all packages.

**Files touched in this phase:**
```
⚙️  app.json
⚙️  eas.json
⚙️  tsconfig.json
⚙️  babel.config.js
⚙️  package.json
⚛️  App.tsx
🔒 .gitignore
🔒 .env.example
🔑 src/types/index.ts
```

**Checklist:**
- [ ] Run `npx create-expo-app cashwise --template expo-template-blank-typescript`
- [ ] Install all packages listed in the AI prompt below
- [ ] Create every folder under `src/` as shown in Project Structure (empty folders are fine)
- [ ] Create `src/types/index.ts` with all interfaces from the Types section above
- [ ] Update `app.json` with correct package name, permissions, and Google client ID extra
- [ ] Create `eas.json` with development, preview, production profiles
- [ ] Update `tsconfig.json` with strict mode and path aliases
- [ ] Create `.env.example` with key names and empty values
- [ ] Add `.gitignore` entries for `.env`, `android/`, `ios/`, `*.apk`
- [ ] Push initial commit to GitHub

**AI Prompt — copy and paste:**

```
I am building a React Native Expo app called CashWise.
Package name: com.tharindu899.cashwise
Language: TypeScript (strict mode)
Framework: Expo SDK 51

Task 1 — Write the complete app.json with:
- name "CashWise", slug "cashwise", version "1.0.0"
- package "com.tharindu899.cashwise"
- Android permissions: CAMERA, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE,
  USE_BIOMETRIC, USE_FINGERPRINT, VIBRATE
- extra.googleWebClientId reading from process.env.GOOGLE_WEB_CLIENT_ID
- Splash background color #0d0f14
- Android adaptive icon using ./assets/adaptive-icon.png

Task 2 — Write the full npm install command for these packages in one line:
@react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
react-native-screens react-native-safe-area-context
@react-native-async-storage/async-storage
@react-native-google-signin/google-signin
react-native-gifted-charts expo-linear-gradient
expo-local-authentication expo-file-system expo-sharing
expo-camera expo-notifications expo-constants

Task 3 — Write tsconfig.json with:
- strict: true
- target: ES2020
- moduleResolution: bundler
- Path alias: "@/*" pointing to "src/*"
- jsx: react-native

Task 4 — Write App.tsx that only wraps NavigationContainer inside
ThemeContext.Provider, AuthContext.Provider, DataContext.Provider.
No logic inside App.tsx — just the provider stack.
Import contexts from @/context/*.

Task 5 — Write .gitignore for Expo TypeScript including:
node_modules/, .expo/, android/, ios/, .env, *.apk, *.aab, dist/

All files use TypeScript. No emojis in code. No hardcoded colors.
Import shared types from src/types/index.ts.
```

---

### 🎨 Phase 2 — Theme and Constants

**Goal:** Build the color system, spacing constants, category list, and theme context with persistence.

**Files touched in this phase:**
```
🎨 src/constants/colors.ts
🎨 src/constants/theme.ts
📌 src/constants/categories.ts
🏗️  src/context/ThemeContext.tsx
```

**Checklist:**
- [ ] Create `colors.ts` with full dark and light token objects
- [ ] Create `theme.ts` with spacing, radius, fontSize, fontWeight constants
- [ ] Create `categories.ts` as a typed array of `Category` from `src/types/index.ts`
- [ ] Create `ThemeContext.tsx` with toggle function and AsyncStorage persistence
- [ ] Wrap `App.tsx` children in `ThemeContext.Provider`
- [ ] Test: Toggle `isDark` via a temporary button, confirm colors change on screen

**AI Prompt — copy and paste:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all interfaces from src/types/index.ts.

Task 1 — Write src/constants/colors.ts:
Export a Colors type and two objects: darkColors and lightColors.
Both implement Colors and contain these tokens:
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
Export const radius = { xs:6, sm:10, md:18, lg:44 }
Export const fontSize = { xs:10, sm:12, md:14, lg:16, xl:18, xxl:22, xxxl:36 }
Export const fontWeight = { regular:'400', medium:'500', semibold:'600', bold:'700' }

Task 3 — Write src/constants/categories.ts:
Export a const array of Category objects (use Category type from src/types/index.ts):
{ id:'food', name:'Food', iconName:'food-fork-drink', colorKey:'red' }
{ id:'transport', name:'Transport', iconName:'car', colorKey:'accent' }
{ id:'shopping', name:'Shopping', iconName:'shopping', colorKey:'amber' }
{ id:'health', name:'Health', iconName:'heart-pulse', colorKey:'green' }
{ id:'utilities', name:'Utilities', iconName:'lightning-bolt', colorKey:'purple' }
{ id:'entertainment', name:'Entertainment', iconName:'television-play', colorKey:'pink' }
{ id:'education', name:'Education', iconName:'school', colorKey:'teal' }
{ id:'other', name:'Other', iconName:'dots-horizontal', colorKey:'text2' }

Task 4 — Write src/context/ThemeContext.tsx:
- State: isDark boolean, default true
- On mount: load 'cashwise_theme' from AsyncStorage
- toggleTheme: flip isDark, save to AsyncStorage
- Context value: { isDark, colors: isDark ? darkColors : lightColors, toggleTheme }
- Export useTheme hook: returns context, throws if used outside provider
- Use React.createContext with a sensible default value

TypeScript strict mode. No emojis in code. No any types.
```

---

### 🧭 Phase 3 — Navigation

**Goal:** Build the bottom tab navigator and root navigator so all screens can be reached.

**Files touched in this phase:**
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

**Checklist:**
- [ ] Create all 6 screen files as placeholder components showing the screen name centered
- [ ] Create `BottomTabNavigator.tsx` with 5 tabs including a custom FAB center button
- [ ] Create `AppNavigator.tsx` with auth-based routing — Onboarding vs Tabs
- [ ] Style the tab bar to match: dark background, accent active color, no emoji labels
- [ ] The center (+) FAB calls a `openAddModal` function from a state in the navigator
- [ ] Test: All 4 real tabs switch correctly, FAB button is visible and pressable

**AI Prompt — copy and paste:**

```
I am building a React Native Expo TypeScript app called CashWise.
Use React Navigation v6. Import types from src/types/index.ts.

Task 1 — Write src/navigation/BottomTabNavigator.tsx:
5 tabs in this order: Home, Analytics, CENTER_FAB, Loans, Settings
CENTER_FAB is not a screen. Use tabBarButton prop to render a custom Pressable:
- 58x58 circle using LinearGradient from expo-linear-gradient (colors: accent to accent2)
- margin-top: -22 so it floats above the bar
- 3px border in colors.surface
- MaterialCommunityIcons 'plus' icon, size 28, color white
- Pressing calls setModalVisible(true) from a useState in this component

Tab bar style:
- backgroundColor: colors.surface from useTheme()
- borderTopColor: colors.border
- height: 70
- paddingBottom: 10
Active tint: colors.accent
Inactive tint: colors.text3
Label font size: 10, fontWeight '500'
No emoji in tab labels.

Icons (MaterialCommunityIcons from @expo/vector-icons):
- Home: 'home-variant' (active) / 'home-variant-outline' (inactive)
- Analytics: 'chart-pie' (active) / 'chart-pie' (inactive, lower opacity)
- Loans: 'clock-time-four' (active) / 'clock-time-four-outline' (inactive)
- Settings: 'cog' (active) / 'cog-outline' (inactive)

Render AddTransactionModal with visible={modalVisible} onClose={() => setModalVisible(false)}
(AddTransactionModal is a placeholder for now — just import and render it)

Task 2 — Write src/navigation/AppNavigator.tsx:
- Use useAuth() from AuthContext to get user
- If user is null: show a Stack navigator with only OnboardingScreen
- If user exists: show BottomTabNavigator
- Wrap in NavigationContainer with theme: DarkTheme from @react-navigation/native
  but override colors.background with colors.bg from useTheme()

Task 3 — Write placeholder TSX for each screen:
HomeScreen, AnalyticsScreen, LoansScreen, AccountsScreen, SettingsScreen, OnboardingScreen
Each renders a View filling the screen with a centered Text of the screen name.
Use useSafeAreaInsets for paddingTop. Use colors.bg for background, colors.text1 for text.

TypeScript strict. No any. No emojis. All colors from useTheme().
```

---

### 🗄️ Phase 4 — Data Context and Local Storage

**Goal:** Build the complete data layer. All app data lives in AsyncStorage and is managed through context with typed CRUD operations.

**Files touched in this phase:**
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

**Checklist:**
- [ ] Create `asyncStorage.ts` typed wrapper with generic `getJSON<T>` and `setJSON`
- [ ] Create `DataContext.tsx` with transactions, accounts, loans state and CRUD
- [ ] Seed default data on first launch (3 accounts, 4 transactions, 2 loans)
- [ ] Create `AuthContext.tsx` — user state placeholder (Google Sign-In wired in Phase 9)
- [ ] Create all 4 custom hooks that read from context
- [ ] Create `formatCurrency.ts` and `dateHelpers.ts`
- [ ] Test: Add a transaction via context, close the app, reopen — verify it persisted

**AI Prompt — copy and paste:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all interfaces from src/types/index.ts.

Task 1 — Write src/storage/asyncStorage.ts:
All keys are prefixed with 'cashwise_' automatically.
Export these typed async functions:
- getJSON<T>(key: string): Promise<T | null>
- setJSON<T>(key: string, value: T): Promise<void>
- removeKey(key: string): Promise<void>
- clearAll(): Promise<void>  — only removes keys with the cashwise_ prefix

Task 2 — Write src/context/DataContext.tsx:
State: transactions: Transaction[], accounts: Account[], loans: Loan[]
On mount: load from AsyncStorage. If empty, seed with default data below.
After every add/update/delete: save the updated array to AsyncStorage.

Functions to export via context:
addTransaction(tx: Omit<Transaction, 'id'>): void  — generates id with Date.now().toString()
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
State: user: User | null, loading: boolean
For now signIn sets a mock user { name:'Kasun Perera', email:'kasun@gmail.com' }
signOut sets user to null.
Export useAuth hook.
(Google Sign-In will replace the mock in Phase 9)

Task 4 — Write src/utils/formatCurrency.ts:
formatLKR(amount: number): string  → "Rs. 4,280.00"
formatShort(amount: number): string → "Rs. 82K" or "Rs. 1.2M"

Task 5 — Write src/utils/dateHelpers.ts — no external date libraries, only built-in Date:
groupByDate(transactions: Transaction[]): Array<{ dateLabel: string, items: Transaction[] }>
  Sorted newest first. Labels: "Today — May 11", "Yesterday — May 10", or "May 9"
formatRelativeTime(isoDate: string): string
  Returns "Just now" (<1min), "2 hours ago", "Yesterday", or "May 10, 2025"

Task 6 — Write src/hooks/useAnalytics.ts:
Uses useData() from DataContext.
monthlyTotal(month: number, year: number): MonthlyAnalytics
categoryBreakdown(month: number, year: number): CategoryBreakdown[]
last6MonthsBar(): BarChartEntry[]  — last 6 calendar months including current

TypeScript strict. No any types. Use Transaction, Account, Loan from src/types/index.ts.
No emojis in code.
```

---

### 🏠 Phase 5 — Home Screen

**Goal:** Build the complete Home screen and all its child components.

**Files touched in this phase:**
```
⚛️  src/screens/HomeScreen.tsx
⚛️  src/components/BalanceCard.tsx
⚛️  src/components/AccountPill.tsx
⚛️  src/components/QuickActionGrid.tsx
⚛️  src/components/TransactionCard.tsx
⚛️  src/components/UpdateBanner.tsx
⚛️  src/components/NotificationPanel.tsx
```

**Checklist:**
- [ ] Build `BalanceCard.tsx` with LinearGradient, total balance, income and expense stats
- [ ] Build `AccountPill.tsx` as a scrollable pressable item with active state
- [ ] Build `QuickActionGrid.tsx` as a 4-column grid with 8 quick action buttons
- [ ] Build `TransactionCard.tsx` with colored icon, name, meta, signed amount
- [ ] Build `UpdateBanner.tsx` — dismissible with useState
- [ ] Build `NotificationPanel.tsx` — animated slide using Animated.Value for translateX
- [ ] Assemble into `HomeScreen.tsx` with FlatList for transactions and grouped date headers
- [ ] Test: Scroll transactions, tap account pills to filter, open notification panel

**AI Prompt — copy and paste:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all types from src/types/index.ts.
Import useTheme from src/context/ThemeContext.tsx.
Import useData from src/context/DataContext.tsx.

Task 1 — Write src/components/BalanceCard.tsx
Props: { totalBalance: number; income: number; expenses: number }
Uses LinearGradient from expo-linear-gradient.
Dark gradient colors: ['#1a2340','#0f1a38','#1a1040']
Label "Total Balance" in 12px rgba(255,255,255,0.6)
Amount in 36px bold white, "Rs." prefix in 20px
Two stat boxes side by side inside the card:
  Income: green rounded icon (trending-up MaterialCommunityIcons) + "Income" label + value
  Expenses: red rounded icon (trending-down) + "Expenses" label + value
Stat box background: rgba(255,255,255,0.08), radius 12

Task 2 — Write src/components/AccountPill.tsx
Props: { account: Account; isActive: boolean; onPress: () => void }
Renders a pressable pill with a colored dot, account name, short balance.
Active: background colors.accent, all text white.
Inactive: background colors.surface2, text colors.text2 and colors.text3.

Task 3 — Write src/components/QuickActionGrid.tsx
Props: { onAction: (actionId: string) => void }
type QuickAction = { id: string; label: string; icon: string; colorKey: string }
8 actions: expense/red, income/green, transfer/accent, loan/amber,
bankpay/purple, budget/pink, scan/teal, more/text2
4-column grid. Each item: 52x52 icon box (16px radius) + 11px label below.
Icon box background is tinted from the color at 12% opacity.
No emojis. MaterialCommunityIcons only.

Task 4 — Write src/components/TransactionCard.tsx
Props: { transaction: Transaction }
Resolve category from categories constant by transaction.categoryId.
Resolve account name from useData() by transaction.accountId.
Left: colored icon box (42x42, 12px radius) with category icon.
Middle: transaction note or category name in 14px bold, account + category in 12px text3.
Right: amount in 15px bold. Income: green with + prefix. Expense: red with - prefix.
Transfer: accent color, no prefix.
Card background colors.surface2, border colors.border, 10px radius, 12px vertical padding.

Task 5 — Write src/components/UpdateBanner.tsx
Props: { version: string; onDismiss: () => void }
Gradient border card: border rgba(79,142,247,0.3), background rgba(79,142,247,0.1)
Left: sparkles icon (MaterialCommunityIcons) in colors.accent.
Middle: "v{version} Available" title + "Budget goals, new charts + fixes" subtitle.
Right: "Update" button in colors.accent background, white text, 20px radius.
Tap Update calls onDismiss (dismiss for now, update check added later).

Task 6 — Write src/components/NotificationPanel.tsx
Props: { visible: boolean; onClose: () => void }
Absolute overlay covering the screen, background colors.surface.
Slide in from the right using Animated.Value(screenWidth) animating to 0.
Header: back arrow icon + "Notifications" title + "Mark all read" in colors.accent.
Show 5 hardcoded notification items (update, budget alert, loan reminder, salary, sync).
Each item: colored dot, title in 14px bold, description in 12px text2, time in 11px text3,
unread indicator dot on the right (only first 3).

Task 7 — Write src/screens/HomeScreen.tsx:
Header row: left side greeting "Good morning," + user name from useAuth().
Right: bell icon button with red badge showing 3 + avatar circle with initials.
Tapping bell sets showNotifications true and renders NotificationPanel.
Sections in ScrollView: UpdateBanner (dismiss hides it), BalanceCard,
"Accounts" label + horizontal AccountPill list,
"Quick Actions" label + QuickActionGrid,
Grouped transactions from groupByDate() with date header rows.
Each date header: date label left + "See All" in colors.accent right (first group only).
All data from useData(), formatLKR from formatCurrency.ts.

TypeScript strict. No any. No emojis. All colors from useTheme(). All amounts via formatLKR.
```

---

### 📊 Phase 6 — Analytics Screen

**Goal:** Build the Analytics screen with real computed data feeding both charts.

**Files touched in this phase:**
```
⚛️  src/screens/AnalyticsScreen.tsx
⚛️  src/components/SummaryRow.tsx
⚛️  src/components/BarChart.tsx
⚛️  src/components/PieChart.tsx
```

**Checklist:**
- [ ] Build `SummaryRow.tsx` for the 3-stat row with income, expenses, savings
- [ ] Build `BarChart.tsx` using `react-native-gifted-charts` with grouped bars
- [ ] Build `PieChart.tsx` using `react-native-gifted-charts` donut with legend
- [ ] Build `AnalyticsScreen.tsx` with month picker and real data from `useAnalytics()`
- [ ] Test: Change the month — verify bar chart and pie chart re-render with different data

**AI Prompt — copy and paste:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all types from src/types/index.ts.
Import useTheme from ThemeContext. Import useAnalytics from hooks/useAnalytics.ts.

Task 1 — Write src/components/SummaryRow.tsx
Props: { income: number; expenses: number; savings: number } or
       { items: Array<{ label: string; value: number | string; color: string }> }
Use the second variant for reusability (used also on Loans and Accounts screens).
Renders a horizontal row of equally-spaced cards.
Each card: value text in 16px bold (colored), label in 10px text3 below.
Background colors.surface2, border colors.border, radius 12, padding 12x10.

Task 2 — Write src/components/BarChart.tsx
Props: { data: BarChartEntry[]; title: string }
Uses BarChart from react-native-gifted-charts.
Each entry renders two bars side by side: income (colors.green) and expense (colors.red).
barWidth: 14, spacing between groups: 30, barSpacing: 4.
chartHeight: 140. noOfSections: 4. hideRules: true. hideAxesAndRules: false.
X-axis labels from entry.month. Y-axis values in colors.text3.
Wrapped in a card: background colors.surface2, border colors.border, radius 18, padding 16.
Title in 14px bold colors.text1 at the top.
Color legend below chart: green dot + "Income", red dot + "Expenses".

Task 3 — Write src/components/PieChart.tsx
Props: { data: CategoryBreakdown[]; title: string }
Uses PieChart from react-native-gifted-charts.
Donut chart: radius 80, innerRadius 52.
Map each CategoryBreakdown to a pie slice using category color from categories constant.
Right side: vertical legend list.
Each legend item: 10x10 colored square (4px radius) + category name in text2 + percentage in text1 bold.
Center of donut: "Spending" in 11px text3, total percentage or icon.
Wrapped in a card same style as BarChart.

Task 4 — Write src/screens/AnalyticsScreen.tsx:
Header: "Analytics" title left.
Right: month label pill (e.g. "May 2025") in a surface2 box + calendar icon button.
State: selectedMonth (0-11) and selectedYear default to current date.
Left/right chevron buttons in the header row to change month.
Sections: SummaryRow (income, expenses, savings for selected month),
BarChart (last6MonthsBar data, title "6-Month Overview"),
PieChart (categoryBreakdown for selected month, title "Spending by Category").
All data from useAnalytics() hook.

TypeScript strict. No any. No emojis. All colors from useTheme(). All amounts via formatLKR.
```

---

### 💸 Phase 7 — Loans Screen

**Goal:** Build the Loans screen with full lending and borrowing management.

**Files touched in this phase:**
```
⚛️  src/screens/LoansScreen.tsx
⚛️  src/components/LoanCard.tsx
```

**Checklist:**
- [ ] Build `LoanCard.tsx` with avatar initials, progress bar, and type badge
- [ ] Build `LoansScreen.tsx` with summary row, You Lent section, You Owe section
- [ ] Add a bottom sheet modal for adding a new loan entry
- [ ] Test: Add a new loan, verify it appears in the correct section with correct colors

**AI Prompt — copy and paste:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all types from src/types/index.ts.
Import useTheme from ThemeContext. Import useLoans from hooks/useLoans.ts.

Task 1 — Write src/components/LoanCard.tsx
Props: { loan: Loan }
Layout from top to bottom:
Row 1: Avatar circle (38x38, gradient, initials text 14px bold white) 
        + name 14px bold + subtitle (type + due date) 11px text3
        + badge on right ("Lending" green tinted / "Borrowing" red tinted, 11px, 20px radius)
Row 2: Amount 22px bold (green if lend, red if borrow)
Row 3: Progress bar — thin 5px height, surface3 background, colored fill
  Fill width = (paidAmount / totalAmount) * 100%
  Fill color: green if lend, red if borrow
Row 4: "Paid: Rs. X" left + "Remaining: Rs. Y" right in 11px text3

Avatar gradient: lend type uses [colors.accent, colors.accent2], borrow uses [colors.red, colors.amber]
Card: background colors.surface2, border colors.border, radius 18, padding 16, margin-bottom 12.

Task 2 — Write src/screens/LoansScreen.tsx:
Header: "Loans" title left, plus icon button right (opens add loan modal).
Summary row: 3 items using SummaryRow component:
  { label:'Total Lent', value: sum of lend loan totalAmounts, color: colors.green }
  { label:'Total Owed', value: sum of borrow loan totalAmounts, color: colors.red }
  { label:'Active', value: count of active loans, color: colors.amber }
Section label "You Lent" + list of LoanCard where loan.type === 'lend'
Section label "You Owe" + list of LoanCard where loan.type === 'borrow'
If a section has no loans show a text "No loans here" in colors.text3.

Add Loan Modal (bottom sheet, same slide-up animation as AddTransactionModal):
Fields (use TextInput for each):
  Person name (required)
  Type selector: Lend / Borrow (same tab style as AddTransactionModal)
  Total amount
  Due date (text input, placeholder "YYYY-MM-DD")
  Interest rate (optional, numeric)
  Note (optional)
Save button calls addLoan from useData() then closes modal.

TypeScript strict. No any. No emojis. All colors from useTheme().
```

---

### 🏦 Phase 8 — Accounts Screen and Add Transaction Modal

**Goal:** Build the Accounts screen and complete the Add Transaction modal that opens from the FAB.

**Files touched in this phase:**
```
⚛️  src/screens/AccountsScreen.tsx
⚛️  src/components/AccountCard.tsx
⚛️  src/components/AddTransactionModal.tsx
⚛️  src/components/CategoryGrid.tsx
⚛️  src/components/ToggleSwitch.tsx
```

**Checklist:**
- [ ] Build `AccountCard.tsx` with icon box, name, account type, balance
- [ ] Build `AccountsScreen.tsx` with net worth summary, bank list, wallet list, add card
- [ ] Build `CategoryGrid.tsx` as a 4-column pressable category picker
- [ ] Build `AddTransactionModal.tsx` as a full bottom sheet with all fields
- [ ] Connect the FAB (+) button in `BottomTabNavigator.tsx` to open this modal
- [ ] Test: Add an expense from the FAB — verify it appears in Home and Analytics

**AI Prompt — copy and paste:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all types from src/types/index.ts.
Import useTheme from ThemeContext. Import useData from DataContext.

Task 1 — Write src/components/AccountCard.tsx
Props: { account: Account }
Layout: icon box 50x50 (16px radius, colored tinted background) left
        + name 15px bold + type subtitle 12px text3 middle
        + balance 18px bold right + "Available"/"On hand"/"Balance" label 11px text3
Account type labels: bank→"Bank Account", cash→"Cash Wallet", wallet→"Mobile Wallet"
Icon from MaterialCommunityIcons using account.icon field.
Card: background colors.surface2, border colors.border, radius 18, padding 16.

Task 2 — Write src/screens/AccountsScreen.tsx:
Header: "Accounts" title left, plus icon right (opens Add Account modal).
Summary row 2 items: Net Worth (sum of all account balances), Account Count.
Section "Bank Accounts": AccountCard list for type==='bank'
Section "Wallets": AccountCard list for type==='cash' || type==='wallet'
Last item in list: dashed-border card with plus icon + "Add New Account" text centered.
Tapping it opens same modal as the plus header button.

Add Account Modal: person name, type selector (bank/cash/wallet), initial balance, icon picker.
Save calls addAccount from useData().

Task 3 — Write src/components/CategoryGrid.tsx
Props: { selectedId: string; onSelect: (id: string) => void }
Import categories from constants/categories.ts.
4-column grid using FlatList or a simple map with flexWrap.
Each item: icon box 38x38 + category name 10px text2 below.
Active: border colors.accent 2px + rgba(79,142,247,0.08) background.
Icon box background is tinted colorKey color at 12% opacity.

Task 4 — Write src/components/ToggleSwitch.tsx
Props: { value: boolean; onToggle: () => void; disabled?: boolean }
42x24 pill. Off: colors.surface3. On: colors.accent.
18x18 white circle thumb animating with Animated.timing:
  Off: translateX to 2. On: translateX to 20. Duration 200ms.
Wrap in TouchableOpacity calling onToggle.

Task 5 — Write src/components/AddTransactionModal.tsx
Props: { visible: boolean; onClose: () => void }
Slide up animation: Animated.Value starts at screenHeight, animates to 0 when visible.
Content inside:
- Drag handle bar (40x4, colors.border2, centered)
- "Add Transaction" 18px bold centered
- Type tabs row: Expense (red) / Income (green) / Transfer (accent)
  Selected tab gets tinted background and border matching its color.
- Amount input: 28px bold DM Mono font if available else monospace,
  "Rs." prefix in 20px text3, background colors.surface2, 14px radius
- Two-column row: Category field (tag icon + label + selected category name)
  and Account field (bank icon + label + selected account name)
- Section label "Category"
- CategoryGrid with selectedId state and onSelect handler
- Note TextInput: optional, placeholder "Add a note..."
- "Save Transaction" full-width button, LinearGradient accent to accent2, 16px radius
On Save: call addTransaction from useData() with all fields, then onClose().

TypeScript strict. No any. No emojis. All colors from useTheme().
```

---

### 🔐 Phase 9 — Settings Screen and Google Sign-In

**Goal:** Build the full Settings screen and replace the mock auth with real Google Sign-In.

**Files touched in this phase:**
```
⚛️  src/screens/SettingsScreen.tsx
⚛️  src/screens/OnboardingScreen.tsx
🔌 src/services/googleAuth.ts
🏗️  src/context/AuthContext.tsx       (update — replace mock with real Sign-In)
```

**Checklist:**
- [ ] Create `googleAuth.ts` using `@react-native-google-signin/google-signin`
- [ ] Update `AuthContext.tsx` to use real `googleAuth.signIn()` and `signOut()`
- [ ] Build `OnboardingScreen.tsx` with Google Sign-In button, branding, loading state
- [ ] Build `SettingsScreen.tsx` with profile banner and all toggle/navigation rows
- [ ] Test with a dev build (`eas build --profile development`): sign in with a real Google account
- [ ] Verify name and email appear correctly in the settings profile banner

**AI Prompt — copy and paste:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import all types from src/types/index.ts.
Import useTheme from ThemeContext. Import useAuth from AuthContext.

Task 1 — Write src/services/googleAuth.ts using @react-native-google-signin/google-signin:
import Constants from 'expo-constants' to read webClientId from Constants.expoConfig?.extra?.googleWebClientId

configure(): void
  Calls GoogleSignin.configure({ webClientId, scopes: ['https://www.googleapis.com/auth/drive.file'] })
  Call this once on app start from App.tsx useEffect.

signIn(): Promise<User>
  Calls GoogleSignin.hasPlayServices() then GoogleSignin.signIn()
  Maps the result to User type: { name, email, photo: photoUrl }
  Returns the User.

signOut(): Promise<void>
  Calls GoogleSignin.signOut()

getCurrentUser(): User | null
  Calls GoogleSignin.getCurrentUser() synchronously
  Returns mapped User or null

getAccessToken(): Promise<string>
  Calls GoogleSignin.getTokens() and returns the accessToken string
  This token is used for Drive API calls and expires in 1 hour — always call fresh.

Task 2 — Write src/context/AuthContext.tsx (full replacement):
On mount: call configure() from googleAuth, then call getCurrentUser() to restore session.
signIn(): calls googleAuth.signIn(), sets user state.
signOut(): calls googleAuth.signOut(), sets user to null.
loading: true during mount session restore, false after.
Export useAuth hook.

Task 3 — Write src/screens/OnboardingScreen.tsx:
Full-screen dark background (colors.bg).
Centered layout:
  Icon placeholder or app initial letter "CW" in a large rounded square (accent gradient)
  "CashWise" in 32px bold colors.text1
  "Track money. Stay wise." in 16px colors.text2
  Spacer
  Google Sign-In button: white background, 14px bold dark text,
    Google 'G' icon from @expo/vector-icons AntDesign 'google'
    "Continue with Google" label, 14px radius, full width max 320
  ActivityIndicator shown instead of button while loading
  Error text in colors.red if sign-in throws

Task 4 — Write src/screens/SettingsScreen.tsx:
Profile banner: LinearGradient (accent to accent2) background, 20px padding.
  Avatar circle 60x60 with initials from user.name, border rgba(255,255,255,0.2)
  Name 17px bold white + email 12px rgba white + green dot + "Google Drive synced" 11px

Section "Account" — 3 rows using a reusable SettingsRow component:
  Google Account: google icon, email subtitle, chevron-right
  Google Drive Backup: cloud-upload icon, last sync time subtitle, chevron-right → calls driveBackup.exportToDrive
  Currency: currency-usd icon, "Sri Lankan Rupee (LKR)" subtitle, chevron-right

Section "Preferences" — 4 toggle rows using ToggleSwitch:
  Dark Theme: moon icon, connected to toggleTheme from useTheme()
  Notifications: bell icon, useState local for now
  Transaction Sounds: volume-high icon, useState local
  Biometric Lock: fingerprint icon, on toggle calls expo-local-authentication authenticate()

Section "More" — 3 rows:
  Export Data: download icon, "CSV, PDF, Excel" subtitle, chevron → calls exportData util
  Check for Updates: refresh icon, "v{version} — checking..." subtitle, chevron
  Sign Out: logout icon (colors.red background tint), chevron → calls signOut() from useAuth()

SettingsRow inner component (not exported):
Props: { icon: string; iconColor: string; iconBg: string; title: string;
         subtitle?: string; right: ReactNode; onPress?: () => void }
Renders a row with the icon box, text, and right element.
Groups of rows: top row gets borderRadius 12px top corners,
bottom row gets borderRadius 12px bottom corners, middle rows have no radius.
Background colors.surface2, border colors.border.

TypeScript strict. No any. No emojis. All colors from useTheme().
```

---

### ☁️ Phase 10 — Google Drive Backup

**Goal:** Implement backup and restore via the user's own Google Drive. No Firebase involved — raw Drive REST API only.

**Files touched in this phase:**
```
🔌 src/services/driveBackup.ts
🔧 src/utils/exportData.ts
```

**Checklist:**
- [ ] Create `driveBackup.ts` with upload (create or update) and download functions
- [ ] Create `exportData.ts` with CSV generation and file share
- [ ] Wire the Drive Backup row in SettingsScreen to trigger `exportToDrive`
- [ ] Show last sync timestamp from the Drive file's `modifiedTime`
- [ ] Test: Back up → clear AsyncStorage → restore → verify transactions reappear

**AI Prompt — copy and paste:**

```
I am building a React Native Expo TypeScript app called CashWise.
Import BackupPayload from src/types/index.ts.
No Firebase. No Drive npm SDK. Use raw fetch calls to Google Drive REST API v3 only.

Task 1 — Write src/services/driveBackup.ts:

type DriveResult = { success: boolean; fileId?: string; timestamp?: string; error?: string }

exportToDrive(accessToken: string, payload: BackupPayload): Promise<DriveResult>
  Step 1: Search for existing file:
    GET https://www.googleapis.com/drive/v3/files
    params: q="name='cashwise-backup.json' and spaces='appDataFolder' and trashed=false"
            fields="files(id,name,modifiedTime)"  spaces="appDataFolder"
    Header: Authorization: Bearer {accessToken}
  Step 2a: If file found (files.length > 0) — update it:
    PATCH https://www.googleapis.com/upload/drive/v3/files/{fileId}
    params: uploadType=multipart
    Body: multipart/related with metadata (name, mimeType) and JSON content
    Returns updated fileId and modifiedTime
  Step 2b: If not found — create it:
    POST https://www.googleapis.com/upload/drive/v3/files
    params: uploadType=multipart
    Body: multipart/related with metadata (name:'cashwise-backup.json',
          mimeType:'application/json', parents:['appDataFolder']) and JSON content
  Return { success:true, fileId, timestamp: ISO string }
  Catch all errors and return { success:false, error: message }

importFromDrive(accessToken: string): Promise<BackupPayload | null>
  Step 1: Search same as above to get fileId
  Step 2: If found: GET https://www.googleapis.com/drive/v3/files/{fileId}
    params: alt=media  Header: Authorization Bearer
    Parse response as JSON and return as BackupPayload
  Return null if not found.

getLastSyncTime(accessToken: string): Promise<string | null>
  Search for the file, return files[0].modifiedTime string or null.

Task 2 — Write src/utils/exportData.ts using expo-file-system and expo-sharing:

generateCSV(transactions: Transaction[], accounts: Account[]): string
  Header row: Date,Type,Amount,Category,Account,Note
  One row per transaction. Resolve category name from categories constant.
  Resolve account name from accounts array by id.
  Amount formatted as plain number without "Rs." prefix (for spreadsheet use).
  Enclose fields that contain commas in double quotes.
  Return the full CSV string with \n line endings.

shareCSV(csvString: string): Promise<void>
  Write to FileSystem.cacheDirectory + 'cashwise-export.csv' using writeAsStringAsync
  Check that Sharing.isAvailableAsync() is true
  Call Sharing.shareAsync with the file URI and mimeType 'text/csv'

TypeScript strict. No any. No emojis. Handle all network errors gracefully.
```

---

### 🎯 Phase 11 — GitHub Actions and APK Release

**Goal:** Set up CI/CD to automatically build and publish the APK to GitHub Releases on every version tag push.

**Files touched in this phase:**
```
⚙️  .github/workflows/build-apk.yml
⚙️  .github/workflows/preview.yml
📋 CHANGELOG.md
```

**Checklist:**
- [ ] Create `.github/workflows/build-apk.yml` exactly as shown in the GitHub Actions section above
- [ ] Create `.github/workflows/preview.yml` for PR Expo preview QR
- [ ] Create `CHANGELOG.md` with the `v1.0.0` entry
- [ ] Add all 3 GitHub secrets: `EXPO_TOKEN`, `GOOGLE_WEB_CLIENT_ID`, `GOOGLE_ANDROID_CLIENT_ID`
- [ ] Push all code to main: `git push origin main`
- [ ] Create and push first release tag: `git tag v1.0.0 && git push origin v1.0.0`
- [ ] Monitor progress at `https://github.com/tharindu899/cashwise/actions`
- [ ] Download the APK from the Releases page and install on your phone
- [ ] Full end-to-end test: sign in → add transaction → back up to Drive → sign out → sign in → restore

**AI Prompt — copy and paste:**

```
I am finalizing the CashWise Expo TypeScript app for release on GitHub.
Package: com.tharindu899.cashwise. Repo: tharindu899/cashwise.

Task 1 — Write .github/workflows/build-apk.yml exactly:
Trigger: push to tags matching 'v*'
Runner: ubuntu-latest
Steps:
1. actions/checkout@v4
2. actions/setup-node@v4 with node-version '20' and cache 'npm'
3. run: npm ci
4. run: npm install -g eas-cli
5. run: eas whoami  with env EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
6. run build command and capture artifact URL using jq:
   BUILD_JSON=$(eas build --platform android --profile production --non-interactive --json 2>/dev/null)
   BUILD_URL=$(echo "$BUILD_JSON" | jq -r '.[0].artifacts.buildUrl')
   echo "build_url=$BUILD_URL" >> $GITHUB_OUTPUT
   env: EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
7. run: curl -L "${{ steps.eas_build.outputs.build_url }}" -o "cashwise-${{ github.ref_name }}.apk"
8. softprops/action-gh-release@v1:
   tag_name: ${{ github.ref_name }}
   name: "CashWise ${{ github.ref_name }}"
   body: installation instructions (download APK, enable unknown sources, install, sign in with Google)
   files: cashwise-${{ github.ref_name }}.apk
   env: GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

Task 2 — Write .github/workflows/preview.yml:
Trigger: pull_request targeting main
Runner: ubuntu-latest
Steps: checkout, node setup, npm ci, eas-cli install, eas update command:
  eas update --branch "pr-${{ github.event.number }}" --message "Preview PR #${{ github.event.number }}" --non-interactive
env EXPO_TOKEN from secrets.

Task 3 — Write CHANGELOG.md using Keep a Changelog format:
## [Unreleased]
## [1.0.0] - today's date
### Added
- Home screen: balance card, multi-account filter, quick actions, transaction list
- Analytics screen: bar chart and donut pie chart with month selector
- Loans screen: lending and borrowing tracking with progress bars and due dates
- Accounts screen: bank accounts and mobile wallets
- Settings screen: Google account, Drive backup, dark/light theme, biometric lock, CSV export
- Add Transaction modal: expense, income, and transfer with category picker
- Google Sign-In authentication via Google Cloud OAuth
- Google Drive backup and restore — data stays in user's own Drive
- GitHub Releases APK distribution — no Google Play Store required
- Dark and light theme with smooth transition and persistence
- TypeScript strict mode throughout the entire codebase

No emojis in any code files. Keep a Changelog format strictly.
```

---

## 📦 Release Without Google Play Store

CashWise is released exclusively via GitHub Releases. No Google Play account is needed.

### How to publish a new version

```bash
# Termux or terminal
git add .
git commit -m "Release v1.0.1 — fix balance card total"
git push origin main

git tag v1.0.1
git push origin v1.0.1
```

APK appears at `https://github.com/tharindu899/cashwise/releases` within 20 minutes.

### In-app update check

The UpdateBanner checks the GitHub Releases API to detect new versions. No authentication required for public repositories.

```
GET https://api.github.com/repos/tharindu899/cashwise/releases/latest
```

Compare the `tag_name` field (e.g. `"v1.0.1"`) against `Constants.expoConfig?.version` (e.g. `"1.0.0"`). If the tag version is higher, show the UpdateBanner with the download URL from `assets[0].browser_download_url`.

### Installing on Android

Users who receive the APK link:

1. Download the APK in their browser
2. Open Android **Settings → Security → Install unknown apps**
3. Enable for their browser or file manager
4. Tap the downloaded APK and install
5. Open CashWise, tap **Continue with Google**

---

## 🔧 Troubleshooting

### Google Sign-In fails with "developer error 10"

The SHA-1 fingerprint in Google Cloud does not match the APK's signing certificate.

Fix: After your first EAS production build, run `eas credentials` to get the production keystore SHA-1. Add a second Android OAuth client in Google Cloud with that SHA-1. The debug SHA-1 only works with development builds.

### EAS build fails — "not authenticated"

The `EXPO_TOKEN` secret is missing, wrong, or expired.

Fix: Go to `https://expo.dev/accounts/[your-username]/settings/access-tokens`, create a new token, update the GitHub secret under **Settings → Secrets and variables → Actions**.

### Google Drive backup returns 401 Unauthorized

The access token expired. Google OAuth tokens expire after 1 hour.

Fix: Always call `getAccessToken()` from `googleAuth.ts` immediately before each Drive API call. This fetches a fresh token from the Google Sign-In library rather than using a cached one.

### App builds but Google Sign-In button does nothing or crashes

The `@react-native-google-signin/google-signin` package requires a custom dev build — it will not work in Expo Go.

Fix: Run `eas build --platform android --profile development`, install that APK, then test Google Sign-In.

### Termux git push asks for a password

Your remote is using HTTPS instead of SSH.

Fix:
```bash
git remote set-url origin git@github.com:tharindu899/cashwise.git
ssh -T git@github.com
```

### Data disappears after uninstalling the app

AsyncStorage is tied to the app installation. Uninstalling wipes local data.

Fix: The Google Drive backup feature prevents permanent data loss. Remind users to back up before uninstalling (Settings → Google Drive Backup → tap to back up now).

### TypeScript errors from `@react-native-google-signin`

Install the types package if not included:

```bash
npm install --save-dev @types/react-native-google-signin
```

If types are still missing, add a declaration file:

```ts
// src/types/google-signin.d.ts
declare module '@react-native-google-signin/google-signin';
```

---

*CashWise — Built for real personal finance tracking. No subscriptions. No ads. No Play Store. Your data stays on your device and your own Google Drive.*
