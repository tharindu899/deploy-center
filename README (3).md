# CashWise — Personal Money Manager

> A clean, offline-first Android money manager built with Expo & React Native.
> Google Sign-In for identity, Google Drive for backup, GitHub Actions for APK delivery.
> No Firebase. No Google Play Store. No emojis inside the app.

---

## Table of Contents

- [App Identity](#app-identity)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Google Cloud Setup — Sign-In Only](#google-cloud-setup--sign-in-only)
- [GitHub Secrets](#github-secrets)
- [EAS Build Configuration](#eas-build-configuration)
- [GitHub Actions — APK Build & Release](#github-actions--apk-build--release)
- [Testing with Expo Go](#testing-with-expo-go)
- [Termux Workflow — Git Push from Phone](#termux-workflow--git-push-from-phone)
- [Phase-by-Phase TODO List with AI Prompts](#phase-by-phase-todo-list-with-ai-prompts)
- [Release Without Google Play Store](#release-without-google-play-store)
- [Troubleshooting](#troubleshooting)

---

## App Identity

| Field | Value |
|---|---|
| App Name | CashWise |
| Package Name | `com.tharindu899.cashwise` |
| Bundle Identifier (iOS) | `com.tharindu899.cashwise` |
| GitHub Repo | `https://github.com/tharindu899/cashwise` |
| Version | 1.0.0 |
| Platform | Android (APK release) |
| Min SDK | Android 6.0 (API 23) |
| Target SDK | Android 14 (API 34) |
| Framework | Expo SDK 51 / React Native 0.74 |
| Author | tharindu899 |

---

## Features

### Home Screen
- Total balance card with monthly income and expense summary
- Multi-account filter pills (All, BOC Bank, Cash, HNB, eZ Cash, etc.)
- Quick action grid — Expense, Income, Transfer, Loan, Bank Pay, Budget, Scan Bill
- Date-grouped transaction list with category icons
- Notification bell with unread badge count
- In-app update banner

### Analytics Screen
- Monthly summary row — income, expenses, savings
- Bar chart — 6-month spending trend per category
- Pie chart — category breakdown with legend
- Spending vs income overview

### Loans Screen
- Summary row — total lent, total owed, active loans
- You Lent section — lending cards with progress bar and due date
- You Owe section — borrowing cards with interest rate and repayment progress
- Lending badge and borrowing badge differentiation

### Accounts Screen
- Net worth and account count summary
- Bank accounts list — name, masked account number, available balance
- Wallets list — Cash wallet, eZ Cash mobile wallet
- Add new account card

### Settings Screen
- Google account display with profile photo
- Google Drive backup status and last sync time
- Currency selector (default: LKR Sri Lankan Rupee)
- Dark theme toggle
- Notification toggle
- Transaction sounds toggle
- Biometric lock toggle
- Export data — CSV, PDF, Excel
- Check for updates
- Sign out

### Add Transaction Modal (Bottom Sheet)
- Type selector — Expense, Income, Transfer
- Amount input with currency prefix (Rs.)
- Category picker — Food, Transport, Shopping, Health, Utilities, Entertainment, Education, Other
- Account selector
- Save button

### Notifications Panel
- Slide-in panel from home screen
- Budget alert, loan due reminder, salary received, sync status notifications
- Mark all read action

### Theme
- Dark mode (default) and Light mode
- Smooth transition between themes
- System-level font: DM Sans

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Framework | Expo SDK 51 (React Native 0.74) |
| Language | JavaScript (JSX) |
| Navigation | React Navigation v6 (Bottom Tabs + Stack) |
| Local Storage | AsyncStorage (`@react-native-async-storage/async-storage`) |
| Icons | `@expo/vector-icons` (MaterialCommunityIcons, Ionicons) |
| Charts | `react-native-gifted-charts` |
| Google Sign-In | `@react-native-google-signin/google-signin` (via Expo Dev Build) |
| Google Drive API | REST API via `fetch` with OAuth token from Google Sign-In |
| File Export | `expo-file-system` + `expo-sharing` |
| Biometric | `expo-local-authentication` |
| Notifications | `expo-notifications` |
| Camera (Scan Bill) | `expo-camera` |
| Build | EAS Build (Expo Application Services — free tier) |
| CI/CD | GitHub Actions |
| APK Distribution | GitHub Releases |
| Code Editor | Any (VS Code, code-server, etc.) |
| Git Push | Termux on Android |

---

## Project Structure

```
📁 cashwise/
│
├── 📁 .github/
│   └── 📁 workflows/
│       ├── 📄 build-apk.yml          ← GitHub Actions: EAS build + upload APK to Release
│       └── 📄 preview.yml            ← GitHub Actions: Expo Go preview QR on PR
│
├── 📁 assets/
│   ├── 🖼️  icon.png                  ← App icon 1024x1024 PNG (no transparency)
│   ├── 🖼️  splash.png                ← Splash screen 1284x2778 PNG
│   ├── 🖼️  adaptive-icon.png         ← Android adaptive icon 1024x1024 PNG
│   └── 🖼️  favicon.png               ← Web favicon 48x48
│
├── 📁 src/
│   │
│   ├── 📁 screens/
│   │   ├── 📄 HomeScreen.jsx          ← Dashboard: balance card, transactions, quick actions
│   │   ├── 📄 AnalyticsScreen.jsx     ← Charts: bar chart, pie chart, summary row
│   │   ├── 📄 LoansScreen.jsx         ← Loans: lend/borrow cards with progress bars
│   │   ├── 📄 AccountsScreen.jsx      ← Accounts: banks and wallets list
│   │   ├── 📄 SettingsScreen.jsx      ← Settings: Google auth, backup, preferences
│   │   └── 📄 OnboardingScreen.jsx    ← First-time Google Sign-In screen
│   │
│   ├── 📁 components/
│   │   ├── 📄 BalanceCard.jsx         ← Total balance card with income/expense stats
│   │   ├── 📄 TransactionCard.jsx     ← Single transaction row with icon, meta, amount
│   │   ├── 📄 AccountPill.jsx         ← Scrollable account filter pill
│   │   ├── 📄 QuickActionGrid.jsx     ← 4x2 icon grid of quick actions
│   │   ├── 📄 AddTransactionModal.jsx ← Bottom sheet: type, amount, category, account
│   │   ├── 📄 NotificationPanel.jsx   ← Slide-in notification list panel
│   │   ├── 📄 LoanCard.jsx            ← Loan card with avatar, progress, badges
│   │   ├── 📄 AccountCard.jsx         ← Account card for accounts screen
│   │   ├── 📄 SummaryRow.jsx          ← 3-column summary stat cards
│   │   ├── 📄 BarChart.jsx            ← Custom bar chart component
│   │   ├── 📄 PieChart.jsx            ← Pie chart with legend component
│   │   ├── 📄 CategoryGrid.jsx        ← Category picker grid in modal
│   │   ├── 📄 UpdateBanner.jsx        ← In-app update banner card
│   │   └── 📄 ToggleSwitch.jsx        ← Custom toggle switch for settings
│   │
│   ├── 📁 navigation/
│   │   ├── 📄 AppNavigator.jsx        ← Root navigator: Onboarding vs Main tabs
│   │   └── 📄 BottomTabNavigator.jsx  ← Bottom tab: Home, Analytics, +, Loans, Settings
│   │
│   ├── 📁 context/
│   │   ├── 📄 ThemeContext.jsx        ← Dark/light theme state and toggle
│   │   ├── 📄 AuthContext.jsx         ← Google user state, sign-in, sign-out
│   │   └── 📄 DataContext.jsx         ← Transactions, accounts, loans CRUD state
│   │
│   ├── 📁 hooks/
│   │   ├── 📄 useTransactions.js      ← Load, add, edit, delete transactions from storage
│   │   ├── 📄 useAccounts.js          ← Load, add, edit accounts from storage
│   │   ├── 📄 useLoans.js             ← Load, add, update loans from storage
│   │   └── 📄 useAnalytics.js         ← Compute monthly totals, category breakdown
│   │
│   ├── 📁 services/
│   │   ├── 📄 googleAuth.js           ← Google Sign-In configure, signIn, signOut, getTokens
│   │   └── 📄 driveBackup.js          ← Export JSON to Google Drive, import/restore backup
│   │
│   ├── 📁 storage/
│   │   └── 📄 asyncStorage.js         ← Wrapper: getItem, setItem, removeItem, clearAll
│   │
│   ├── 📁 utils/
│   │   ├── 📄 formatCurrency.js       ← Format numbers as Rs. 1,234.00 with locale
│   │   ├── 📄 dateHelpers.js          ← Format dates, group transactions by date
│   │   └── 📄 exportData.js           ← Generate CSV and share via expo-sharing
│   │
│   └── 📁 constants/
│       ├── 📄 categories.js           ← Category list: name, icon, color pairs
│       ├── 📄 colors.js               ← Dark and light theme color tokens
│       └── 📄 theme.js                ← Shared spacing, radius, font size constants
│
├── 📄 App.jsx                         ← Root component: wraps all context providers
├── 📄 app.json                        ← Expo config: name, slug, package, icon, permissions
├── 📄 eas.json                        ← EAS Build profiles: development, preview, production
├── 📄 babel.config.js                 ← Babel config with expo preset
├── 📄 package.json                    ← Dependencies and scripts
├── 📄 .gitignore                      ← Ignore node_modules, .expo, android/, ios/
├── 📄 .env.example                    ← Template for environment variables (no secrets)
└── 📄 README.md                       ← This file
```

---

## Prerequisites

You need the following tools available before starting.

### On your computer (or code editor)

| Tool | Purpose | Install |
|---|---|---|
| Node.js 18+ | Run JavaScript tooling | https://nodejs.org |
| npm or yarn | Package manager | Included with Node.js |
| Expo CLI | Expo tooling | `npm install -g expo-cli` |
| EAS CLI | Build and submit | `npm install -g eas-cli` |
| Git | Version control | https://git-scm.com |

### Accounts required

| Account | Purpose | Cost |
|---|---|---|
| GitHub account (tharindu899) | Repo hosting, Actions, Releases | Free |
| Expo account | EAS Build free tier (30 builds/month) | Free |
| Google Cloud Console | OAuth 2.0 client IDs for Google Sign-In | Free |

### On your Android phone (for testing)

- Expo Go app from Play Store (for preview testing during development)
- Termux app (for git push from phone — see Termux section)

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/tharindu899/cashwise.git
cd cashwise
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create your environment file

Copy the example and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` and set:

```
GOOGLE_WEB_CLIENT_ID=your_web_client_id_from_google_cloud.apps.googleusercontent.com
GOOGLE_ANDROID_CLIENT_ID=your_android_client_id.apps.googleusercontent.com
```

### 4. Start the development server

```bash
npx expo start
```

Scan the QR code with Expo Go on your phone to test.

---

## Google Cloud Setup — Sign-In Only

This app uses Google only for Sign-In (to get user profile) and Google Drive API (to backup data). No Firebase is used.

### Step 1 — Create a Google Cloud Project

1. Go to https://console.cloud.google.com
2. Click the project dropdown at the top
3. Click **New Project**
4. Name it `CashWise`
5. Click **Create**

### Step 2 — Enable Required APIs

1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for and enable each of these:
   - **Google Drive API** — for backup and restore
   - **People API** — for user profile (name, email, photo)

### Step 3 — Create OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** user type → **Create**
3. Fill in:
   - App name: `CashWise`
   - User support email: your Gmail
   - Developer contact email: your Gmail
4. Click **Save and Continue**
5. On Scopes page, click **Add or Remove Scopes** and add:
   - `https://www.googleapis.com/auth/drive.file`
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`
6. Click **Save and Continue** through the rest
7. On Summary page, click **Back to Dashboard**

### Step 4 — Create OAuth 2.0 Credentials

You need two credential sets: one for the Android app and one as a Web client (required by the Google Sign-In library even for Android).

#### Web Client ID (required by react-native-google-signin)

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `CashWise Web Client`
5. Leave Authorized redirect URIs empty for now
6. Click **Create**
7. Copy the **Client ID** — this is your `GOOGLE_WEB_CLIENT_ID`

#### Android Client ID

1. Click **Create Credentials** → **OAuth client ID** again
2. Application type: **Android**
3. Name: `CashWise Android`
4. Package name: `com.tharindu899.cashwise`
5. SHA-1 certificate fingerprint — get this by running:

```bash
# On your machine in the project folder after EAS builds the first time:
eas credentials
```

Or use the debug keystore SHA-1 for development testing:

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

6. Copy the SHA-1 and paste it in Google Cloud Console
7. Click **Create**
8. Copy the **Client ID** — this is your `GOOGLE_ANDROID_CLIENT_ID`

### Step 5 — Add Test Users (while app is in External/Testing mode)

1. Go to **OAuth consent screen** → **Test users**
2. Click **Add Users**
3. Add your Gmail address(es) that you will test sign-in with
4. Click **Save**

---

## GitHub Secrets

These secrets are stored in your GitHub repository and used by GitHub Actions during the APK build. They are never stored in code files.

### How to add secrets

1. Go to https://github.com/tharindu899/cashwise
2. Click **Settings** tab
3. In the left sidebar click **Secrets and variables** → **Actions**
4. Click **New repository secret** for each secret below

### Required secrets

| Secret Name | What it is | Where to get it |
|---|---|---|
| `EXPO_TOKEN` | Your Expo account access token | https://expo.dev/accounts/[you]/settings/access-tokens → Create token |
| `GOOGLE_WEB_CLIENT_ID` | OAuth Web client ID from Google Cloud | Step 4 of Google Cloud Setup above |
| `GOOGLE_ANDROID_CLIENT_ID` | OAuth Android client ID from Google Cloud | Step 4 of Google Cloud Setup above |

### How the secrets are used

- `EXPO_TOKEN` — authenticates EAS CLI inside GitHub Actions so it can trigger a build on Expo's servers without needing your username/password
- `GOOGLE_WEB_CLIENT_ID` — injected into the app at build time via `app.json` extra config so the Google Sign-In library can communicate with Google's OAuth endpoint
- `GOOGLE_ANDROID_CLIENT_ID` — same as above for the Android-specific credential

### Security rules

- Never put secret values in `app.json`, `eas.json`, or any `.js` file committed to the repo
- The `.env` file must be in `.gitignore` — it only exists on your local machine
- The `.env.example` file in the repo shows only the key names with empty values as a template

---

## EAS Build Configuration

Create `eas.json` in the root of the project:

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

> The `production` profile is set to `buildType: apk` instead of `aab` because you are releasing directly via GitHub, not through Google Play Store.

---

## GitHub Actions — APK Build & Release

### File: `.github/workflows/build-apk.yml`

This workflow triggers when you push a version tag like `v1.0.0`. It builds the APK using EAS Build (free tier) and uploads it as a GitHub Release asset so anyone can download and install it directly.

```yaml
name: Build APK and Create Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    name: Build Android APK
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install EAS CLI
        run: npm install -g eas-cli

      - name: Setup Expo credentials
        run: eas whoami
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}

      - name: Build APK with EAS
        id: eas_build
        run: |
          BUILD_OUTPUT=$(eas build \
            --platform android \
            --profile production \
            --non-interactive \
            --json 2>/dev/null)
          echo "build_url=$(echo $BUILD_OUTPUT | jq -r '.[0].artifacts.buildUrl')" >> $GITHUB_OUTPUT
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}

      - name: Wait for EAS build and download APK
        run: |
          BUILD_URL="${{ steps.eas_build.outputs.build_url }}"
          echo "Downloading APK from: $BUILD_URL"
          curl -L "$BUILD_URL" -o cashwise-${{ github.ref_name }}.apk
          echo "APK downloaded successfully"

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: ${{ github.ref_name }}
          name: CashWise ${{ github.ref_name }}
          body: |
            ## CashWise ${{ github.ref_name }}

            ### Installation
            1. Download the APK file below
            2. On your Android phone, go to Settings > Security > Allow unknown sources
            3. Open the downloaded APK and install
            4. Sign in with your Google account

            ### What is new in this release
            See CHANGELOG.md for details.
          files: cashwise-${{ github.ref_name }}.apk
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

> `GITHUB_TOKEN` is automatically provided by GitHub Actions — you do not need to add it as a secret.

### How to trigger a release

From Termux or your computer terminal:

```bash
# Commit all your work
git add .
git commit -m "Release v1.0.0"

# Create a version tag
git tag v1.0.0

# Push the commit and the tag
git push origin main
git push origin v1.0.0
```

GitHub Actions will start automatically and build + publish the APK within about 15-20 minutes.

---

## Testing with Expo Go

Expo Go lets you test the app on your phone without building an APK. This is for development only — Google Sign-In will not work in Expo Go (it requires a custom dev build). Use it to test UI, navigation, and local storage features.

### Start development server

```bash
npx expo start
```

### Scan QR code

Open Expo Go on your Android phone and scan the QR code shown in the terminal.

### For Google Sign-In testing

You need a development build (not Expo Go):

```bash
eas build --platform android --profile development
```

Install the resulting APK on your phone once. After that, run `npx expo start --dev-client` and your phone connects to it just like Expo Go, but with full native module support including Google Sign-In.

---

## Termux Workflow — Git Push from Phone

This is how you edit code on your phone using a code manager app and push via Termux.

### Setup Termux for Git

Open Termux and run these once:

```bash
# Update packages
pkg update && pkg upgrade

# Install git
pkg install git

# Install openssh for key-based auth
pkg install openssh

# Configure your git identity
git config --global user.email "your-email@gmail.com"
git config --global user.name "tharindu899"
```

### Set up SSH key for GitHub (do this once)

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@gmail.com"

# Show the public key
cat ~/.ssh/id_ed25519.pub
```

Copy the output and go to https://github.com/settings/ssh/new, paste it there, and save.

Test the connection:

```bash
ssh -T git@github.com
```

You should see: `Hi tharindu899! You've successfully authenticated`

### Daily workflow in Termux

```bash
# Navigate to the project (adjust path to where your code manager saves files)
cd /storage/emulated/0/cashwise

# Check what changed
git status

# Stage all changes
git add .

# Commit with a message
git commit -m "Update HomeScreen balance card layout"

# Push to GitHub
git push origin main
```

### To trigger a release (APK build)

```bash
git tag v1.0.1
git push origin main
git push origin v1.0.1
```

After pushing the tag, GitHub Actions builds the APK automatically in the cloud. You can check the build status at https://github.com/tharindu899/cashwise/actions

---

## Phase-by-Phase TODO List with AI Prompts

Each phase below is a self-contained unit. Complete one phase fully before starting the next. The AI prompt for each phase can be copied directly into Claude, ChatGPT, or Gemini free tier to generate the code.

---

### Phase 1 — Project Initialization

**Goal:** Create the Expo project, set up folder structure, install all packages.

**Files created in this phase:**
```
cashwise/
├── App.jsx
├── app.json
├── eas.json
├── babel.config.js
├── package.json
├── .gitignore
└── .env.example
```

**Steps:**
- [ ] Run `npx create-expo-app cashwise --template blank` in your project folder
- [ ] Replace the generated `App.jsx` with the root provider wrapper
- [ ] Install all required packages (see prompt below)
- [ ] Create the `src/` folder hierarchy as shown in Project Structure
- [ ] Create `eas.json` with the configuration shown in EAS Build Configuration section
- [ ] Update `app.json` with the correct name, slug, package name, and permissions
- [ ] Add `.env.example` with key names but no values
- [ ] Commit and push to GitHub

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise (package: com.tharindu899.cashwise). 
Help me set up the initial project files.

1. Write the complete app.json for Expo SDK 51 with:
   - name: "CashWise"
   - slug: "cashwise"
   - package: "com.tharindu899.cashwise"
   - version: "1.0.0"
   - Android permissions: CAMERA, READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE, USE_BIOMETRIC, USE_FINGERPRINT, VIBRATE
   - extra config for GOOGLE_WEB_CLIENT_ID from environment variable process.env.GOOGLE_WEB_CLIENT_ID
   - Splash screen with dark background #0d0f14
   - Android adaptive icon

2. Write the complete list of npm install commands for these packages:
   @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
   react-native-screens react-native-safe-area-context
   @react-native-async-storage/async-storage
   @react-native-google-signin/google-signin
   react-native-gifted-charts react-native-linear-gradient
   expo-local-authentication expo-file-system expo-sharing expo-camera
   expo-notifications expo-constants

3. Write App.jsx that wraps children in ThemeContext, AuthContext, and DataContext providers
   with a NavigationContainer. No logic inside App.jsx — just provider wrapping.

4. Write .gitignore for an Expo React Native project including:
   node_modules/, .expo/, android/, ios/, .env, *.apk, *.aab

Do not use emojis in any code file. Use file icons from @expo/vector-icons only for UI.
```

---

### Phase 2 — Theme and Constants Setup

**Goal:** Build the color system, constants, and theme context so every screen uses consistent styles.

**Files created in this phase:**
```
src/constants/colors.js
src/constants/theme.js
src/constants/categories.js
src/context/ThemeContext.jsx
```

**Steps:**
- [ ] Create `src/constants/colors.js` with dark and light color tokens matching the design
- [ ] Create `src/constants/theme.js` with spacing, font sizes, border radius values
- [ ] Create `src/constants/categories.js` with all 8 categories: name, icon name, icon library, color key
- [ ] Create `src/context/ThemeContext.jsx` with useState, toggle function, and AsyncStorage persistence
- [ ] Wrap App.jsx children in ThemeContext.Provider
- [ ] Test: Toggle theme state in ThemeContext and confirm colors update

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise. 
Help me set up the theme system.

1. Write src/constants/colors.js with two theme objects (dark and light) containing these tokens:
   bg, surface, surface2, surface3, border, border2, text1, text2, text3,
   accent (#4f8ef7), accent2 (#7b6cf7), green (#30d48a), red (#f05c6e),
   amber (#f5a623), purple (#a78bfa), teal (#2dd4bf), pink (#f472b6)
   
   Dark defaults: bg #0d0f14, surface #161a23, surface2 #1e2330, surface3 #252b3a
   Light alternatives: bg #f0f2f8, surface #ffffff, surface2 #f5f7fc, surface3 #eaedf5

2. Write src/constants/theme.js with:
   - spacing object: xs:4, sm:8, md:16, lg:24, xl:32
   - radius object: xs:6, sm:10, md:18, lg:44
   - fontSize object: xs:10, sm:12, md:14, lg:16, xl:18, xxl:22, xxxl:36
   - fontWeight object: regular:400, medium:500, semibold:600, bold:700

3. Write src/constants/categories.js as an array of objects with fields:
   id, name, iconName (from MaterialCommunityIcons), colorKey (matching colors.js key)
   Categories: Food (red), Transport (accent), Shopping (amber), Health (green),
   Utilities (purple), Entertainment (pink), Education (teal), Other (text2)

4. Write src/context/ThemeContext.jsx with:
   - useState for isDark (default true)
   - useEffect to load saved preference from AsyncStorage on mount
   - toggleTheme function that flips isDark and saves to AsyncStorage
   - Export usetheme hook for consuming components
   - The context value provides: isDark, colors (computed from isDark), toggleTheme

No emojis anywhere. Export constants as named exports.
```

---

### Phase 3 — Navigation Setup

**Goal:** Build the bottom tab navigator and root navigation so all screens are reachable.

**Files created in this phase:**
```
src/navigation/BottomTabNavigator.jsx
src/navigation/AppNavigator.jsx
src/screens/HomeScreen.jsx       (placeholder)
src/screens/AnalyticsScreen.jsx  (placeholder)
src/screens/LoansScreen.jsx      (placeholder)
src/screens/SettingsScreen.jsx   (placeholder)
src/screens/OnboardingScreen.jsx (placeholder)
```

**Steps:**
- [ ] Create all 5 screen files as placeholder components that render a centered screen title
- [ ] Create `BottomTabNavigator.jsx` with 5 tabs: Home, Analytics, (+) FAB, Loans, Settings
- [ ] The center (+) tab is not a real screen — tapping it opens the AddTransactionModal
- [ ] Create `AppNavigator.jsx` that checks AuthContext: show Onboarding if not signed in, show BottomTabNavigator if signed in
- [ ] Apply custom tab bar style with the active accent color and dark background
- [ ] Test: Switching tabs works, active tab icon and label highlight correctly

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise using React Navigation v6.
Help me set up navigation.

1. Write src/navigation/BottomTabNavigator.jsx with 5 tabs:
   - Home (icon: home-variant from MaterialCommunityIcons)
   - Analytics (icon: chart-pie)
   - Center FAB button (not a screen — pressing it calls openAddModal from a context or prop)
   - Loans (icon: clock-time-four)
   - Settings (icon: cog)
   
   The center tab must be a custom button rendered via tabBarButton prop.
   It is a 58px circle with a gradient from accent to accent2.
   It has no screen — it triggers a function when pressed.
   
   Tab bar style:
   - Background: colors.surface (from ThemeContext)
   - Border top: 1px colors.border
   - Active tint: colors.accent
   - Inactive tint: colors.text3
   - Label font size: 10
   - No emoji in labels

2. Write src/navigation/AppNavigator.jsx that:
   - Uses AuthContext to check if user is signed in
   - Shows OnboardingScreen in a Stack if not signed in
   - Shows BottomTabNavigator if signed in
   - Uses NavigationContainer with a dark theme

3. Write a placeholder for each screen:
   HomeScreen, AnalyticsScreen, LoansScreen, SettingsScreen, OnboardingScreen
   Each shows a centered Text with the screen name in colors.text1.
   Each uses useSafeAreaInsets for top padding.

All components must use StyleSheet.create. No inline styles except for dynamic color values from theme.
No emojis. Icons only from @expo/vector-icons MaterialCommunityIcons.
```

---

### Phase 4 — Data Context and Local Storage

**Goal:** Build the data layer. All transactions, accounts, and loans are stored in AsyncStorage and managed through context.

**Files created in this phase:**
```
src/storage/asyncStorage.js
src/context/DataContext.jsx
src/context/AuthContext.jsx
src/hooks/useTransactions.js
src/hooks/useAccounts.js
src/hooks/useLoans.js
src/hooks/useAnalytics.js
src/utils/formatCurrency.js
src/utils/dateHelpers.js
```

**Steps:**
- [ ] Create `asyncStorage.js` wrapper with getJSON, setJSON, removeKey, clearAll helpers
- [ ] Create `DataContext.jsx` with full CRUD for transactions, accounts, and loans
- [ ] Create `AuthContext.jsx` with user state (null until sign-in — Google Sign-In added in Phase 9)
- [ ] Create custom hooks that read from context for cleaner screen code
- [ ] Create `formatCurrency.js` that formats a number as `Rs. 1,234.00`
- [ ] Create `dateHelpers.js` that groups an array of transactions by date string
- [ ] Test: Add a transaction via context, confirm it persists after app reload

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise.
Help me build the data layer.

1. Write src/storage/asyncStorage.js with these exported async functions:
   - getJSON(key) — returns parsed object or null
   - setJSON(key, value) — stringifies and stores
   - removeKey(key) — removes a key
   - clearAll() — clears all app data (with a key prefix 'cashwise_')
   Use the key prefix 'cashwise_' on all keys to avoid conflicts.

2. Write src/context/DataContext.jsx that manages:
   Transactions: array of objects { id, type (expense/income/transfer), amount, 
   categoryId, accountId, toAccountId, note, date (ISO string) }
   Accounts: array of objects { id, name, type (bank/cash/wallet), balance, color, icon }
   Loans: array of objects { id, personName, personInitials, type (lend/borrow), 
   totalAmount, paidAmount, dueDate, note, interest, active }
   
   Each has: load (from AsyncStorage on mount), add, update, delete functions.
   After every mutation, save the updated array back to AsyncStorage.
   
   Default data (seeded on first load if storage is empty):
   - 3 accounts: BOC Bank (bank, 320000), Cash (cash, 85000), HNB Savings (bank, 80000)
   - 4 transactions: salary income 82000, grocery expense 4280, food expense 1250, utilities 2990
   - 2 loans: Ranil Mendis lent 25000 paid 10000, People's Bank borrowed 120000 paid 78000

3. Write src/utils/formatCurrency.js:
   - formatLKR(amount) — returns string like "Rs. 4,280.00"
   - formatShort(amount) — returns "Rs. 82K" or "Rs. 1.2M" for large numbers

4. Write src/utils/dateHelpers.js:
   - groupTransactionsByDate(transactions) — returns array of { dateLabel, transactions }
     sorted newest first. Date labels: "Today — May 11", "Yesterday — May 10", "May 9"
   - formatRelativeTime(isoDate) — returns "Just now", "2 hours ago", "Yesterday", or date string

5. Write src/hooks/useAnalytics.js that computes from DataContext:
   - monthlyTotal(month, year) — total income, expenses, savings for a month
   - categoryBreakdown(month, year) — array of { categoryId, total, percentage }
   - last6MonthsBar(type) — array of 6 { month, amount } objects for bar chart

No emojis. Use plain JS — no external date libraries.
```

---

### Phase 5 — Home Screen

**Goal:** Build the complete Home screen with all components: balance card, account pills, quick actions, transaction list.

**Files created in this phase:**
```
src/screens/HomeScreen.jsx
src/components/BalanceCard.jsx
src/components/AccountPill.jsx
src/components/QuickActionGrid.jsx
src/components/TransactionCard.jsx
src/components/UpdateBanner.jsx
src/components/NotificationPanel.jsx
```

**Steps:**
- [ ] Build `BalanceCard.jsx` with gradient background, total balance, income and expense stats
- [ ] Build `AccountPill.jsx` as a pressable horizontal scroll item
- [ ] Build `QuickActionGrid.jsx` as a 4-column grid with icon buttons
- [ ] Build `TransactionCard.jsx` with colored icon, name, category/account meta, colored amount
- [ ] Build `UpdateBanner.jsx` as the dismissible banner at the top
- [ ] Build `NotificationPanel.jsx` as an animated slide-in panel (Animated.Value translateX)
- [ ] Assemble all into `HomeScreen.jsx` using ScrollView
- [ ] Test: Scroll the transaction list, tap account pills to filter, open notifications panel

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise.
Build me the Home screen and its child components.

Design reference:
- Dark background: #0d0f14
- Balance card: dark gradient background (#1a2340 to #0f1a38 to #1a1040) with white text
- Balance amount: 36px bold, prefix "Rs." in 20px
- Income stat: green icon + label "Income" + value
- Expense stat: red icon + label "Expenses" + value
- Account pills: horizontal ScrollView, active pill has accent background (#4f8ef7)
- Quick actions: 4-column grid, each item has a 52x52 rounded icon box and 11px label below
- Transaction cards: surface2 background (#1e2330), 10px radius, icon left, info middle, amount right
  Income amounts in green, expense amounts in red
- Date group headers: 12px text3 color with "See All" link in accent on first group

Write these files:

1. src/components/BalanceCard.jsx
   Props: totalBalance, income, expenses, currency (default "Rs.")
   Uses LinearGradient from expo-linear-gradient.
   Icon from MaterialCommunityIcons: trending-up (green) and trending-down (red)

2. src/components/AccountPill.jsx
   Props: account { name, balance, color }, isActive, onPress
   Renders a pill with a colored dot, account name, and short balance.
   Active state fills background with colors.accent.

3. src/components/QuickActionGrid.jsx
   Props: onAction(actionId) callback
   8 fixed actions: expense, income, transfer, loan, bankpay, budget, scan, more
   Each has an icon and label. No emojis — use MaterialCommunityIcons only.

4. src/components/TransactionCard.jsx
   Props: transaction { type, amount, categoryId, accountId, note, date }
   Renders icon from categories constant, name/meta text, and colored amount.
   Amount shows + prefix for income, - prefix for expense, no prefix for transfer.

5. src/screens/HomeScreen.jsx
   Assembles all components in a ScrollView with FlatList for transactions.
   Header: greeting text left, bell icon (with badge) and avatar right.
   Sections: UpdateBanner, BalanceCard, Account pills, Quick actions, grouped transactions.
   The bell icon opens NotificationPanel by setting a state boolean.

All colors from ThemeContext via useTheme(). All amounts via formatLKR(). No emojis. No hardcoded colors.
```

---

### Phase 6 — Analytics Screen

**Goal:** Build the Analytics screen with bar chart, pie chart, and summary stats.

**Files created in this phase:**
```
src/screens/AnalyticsScreen.jsx
src/components/SummaryRow.jsx
src/components/BarChart.jsx
src/components/PieChart.jsx
```

**Steps:**
- [ ] Build `SummaryRow.jsx` for the 3-stat row at the top
- [ ] Build `BarChart.jsx` using `react-native-gifted-charts` BarChart component
- [ ] Build `PieChart.jsx` using `react-native-gifted-charts` PieChart with a custom legend
- [ ] Build `AnalyticsScreen.jsx` with month picker header, summary row, both charts
- [ ] Use `useAnalytics` hook to feed real computed data to the charts
- [ ] Test: Change the month and confirm charts update

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise.
Build me the Analytics screen.

1. Write src/components/SummaryRow.jsx
   Props: income, expenses, savings (all numbers)
   Renders a 3-column row of cards. Each card: bold value on top, small label below.
   Income in colors.green, expenses in colors.red, savings in colors.accent.
   Background colors.surface2, 12px radius.

2. Write src/components/BarChart.jsx using react-native-gifted-charts BarChart.
   Props: data (array of { label, income, expense })
   Render grouped bars: income bar (colors.green) and expense bar (colors.red) per month.
   Bar width 14, spacing 4, chart height 140.
   X-axis labels in colors.text3, no Y-axis line, no reference lines.
   Wrap in a surface2 card with "6-Month Overview" title.

3. Write src/components/PieChart.jsx using react-native-gifted-charts PieChart.
   Props: data (array of { categoryId, total, percentage })
   Render a donut chart (inner radius 50) on the left and a custom legend on the right.
   Legend items: colored square + category name + percentage.
   Use category color from categories constant.
   Wrap in a surface2 card with "Spending by Category" title.

4. Write src/screens/AnalyticsScreen.jsx:
   Header: "Analytics" title left, month label pill and calendar icon right.
   Month state defaults to current month. Left/right arrows change month.
   Sections: SummaryRow, BarChart, PieChart.
   Data comes from useAnalytics() hook.

No emojis. No hardcoded colors. All from ThemeContext.
```

---

### Phase 7 — Loans Screen

**Goal:** Build the Loans screen with lending and borrowing card sections.

**Files created in this phase:**
```
src/screens/LoansScreen.jsx
src/components/LoanCard.jsx
```

**Steps:**
- [ ] Build `LoanCard.jsx` with avatar, name, type badge, amount, progress bar, meta row
- [ ] Build `LoansScreen.jsx` with summary row (total lent, total owed, active count), You Lent section, You Owe section
- [ ] Add modal or bottom sheet for adding a new loan (reuse AddTransactionModal structure)
- [ ] Test: Add a loan, verify it shows in correct section with correct badge

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise.
Build me the Loans screen.

1. Write src/components/LoanCard.jsx
   Props: loan { personName, personInitials, type ('lend'/'borrow'), totalAmount, 
   paidAmount, dueDate, interest }
   
   Layout:
   - Top row: avatar circle (gradient) with initials, name + subtitle text, badge
   - Badge: "Lending" in green or "Borrowing" in red (background tinted)
   - Amount: 22px bold, green if lend, red if borrow
   - Progress bar: thin 5px bar, filled portion in green (lend) or red (borrow)
   - Bottom row: "Paid: Rs. X" on left, "Remaining: Rs. Y" on right
   - Card background: colors.surface2, radius 18, border colors.border
   
2. Write src/screens/LoansScreen.jsx
   Header: "Loans" title, plus icon button (top right to add new loan)
   Summary row: 3 stats — total lent (green), total owed (red), active count (amber)
   You Lent section: SectionLabel + list of LoanCard where type is 'lend'
   You Owe section: SectionLabel + list of LoanCard where type is 'borrow'
   Data from useLoans() hook.
   
   Add Loan bottom sheet (shown when plus is pressed):
   Fields: person name, type (lend/borrow), total amount, due date, note, interest rate
   Save button adds to DataContext.

No emojis. Icon for plus button from MaterialCommunityIcons 'plus'. No hardcoded colors.
```

---

### Phase 8 — Accounts Screen and Add Transaction Modal

**Goal:** Build the Accounts screen and the full Add Transaction modal (bottom sheet).

**Files created in this phase:**
```
src/screens/AccountsScreen.jsx
src/components/AccountCard.jsx
src/components/AddTransactionModal.jsx
src/components/CategoryGrid.jsx
src/components/ToggleSwitch.jsx
```

**Steps:**
- [ ] Build `AccountCard.jsx` with icon, name, type subtitle, balance value
- [ ] Build `AccountsScreen.jsx` with net worth summary, bank accounts section, wallets section, add new card
- [ ] Build `CategoryGrid.jsx` as a 4-column pressable grid for category selection
- [ ] Build `AddTransactionModal.jsx` as a bottom sheet with type tabs, amount input, category grid, save button
- [ ] Connect the (+) FAB in the tab bar to open this modal via context or a ref
- [ ] Test: Add expense transaction, verify it appears in Home Screen and Analytics

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise.
Build me the Accounts screen and the Add Transaction modal.

1. Write src/components/AccountCard.jsx
   Props: account { name, type, balance, icon, color }
   Layout: colored icon box (50x50, 16px radius) + name + type subtitle + balance on right.
   Background colors.surface2, border colors.border, radius 18.
   Account type labels: 'bank' shows "Bank Account", 'cash' shows "Cash Wallet", 
   'wallet' shows "Mobile Wallet"

2. Write src/screens/AccountsScreen.jsx
   Header: "Accounts" title + plus icon to add account
   Summary: 2-column row: Net Worth (sum of all balances), Account Count
   Section "Bank Accounts": AccountCard list filtered to type 'bank'
   Section "Wallets": AccountCard list filtered to type 'cash' or 'wallet'
   Last item: dashed-border "Add New Account" card

3. Write src/components/CategoryGrid.jsx
   Props: selectedCategoryId, onSelect(categoryId), transactionType
   4-column grid of pressable items.
   Each: colored icon box, category name label below.
   Active item has colors.accent border and tinted background.
   Source data from src/constants/categories.js

4. Write src/components/AddTransactionModal.jsx as a Modal with slide-up animation.
   Props: visible, onClose
   Content:
   - Drag handle bar at top
   - "Add Transaction" title
   - 3-tab type selector: Expense (red), Income (green), Transfer (accent)
   - Amount input: large 28px monospace number field with "Rs." prefix
   - Category selector label (shows selected category name)
   - CategoryGrid
   - Account selector (opens a picker or simple list)
   - Note text input (optional)
   - "Save Transaction" gradient button
   On save: calls DataContext addTransaction then onClose.

No emojis. Use Animated.timing for slide-up. All colors from ThemeContext.
```

---

### Phase 9 — Settings Screen and Google Sign-In

**Goal:** Build the Settings screen with all toggles and wire up real Google Sign-In using Google Cloud OAuth.

**Files created in this phase:**
```
src/screens/SettingsScreen.jsx
src/screens/OnboardingScreen.jsx
src/services/googleAuth.js
src/services/driveBackup.js
src/components/ToggleSwitch.jsx
src/context/AuthContext.jsx  (update with real Google Sign-In)
```

**Steps:**
- [ ] Install `@react-native-google-signin/google-signin` (already in package.json)
- [ ] Create `src/services/googleAuth.js` with configure, signIn, signOut, getAccessToken functions
- [ ] Update `AuthContext.jsx` to call googleAuth.signIn and store user data
- [ ] Build `OnboardingScreen.jsx` with Google Sign-In button (displays on first launch)
- [ ] Build `SettingsScreen.jsx` with profile banner, all toggle items, export and sign out
- [ ] Wire export to `exportData.js` which creates a CSV and shares via expo-sharing
- [ ] Test: Sign in with Google, confirm name/email shows in profile banner and settings

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise.
Build me the Settings screen and Google Sign-In integration.

1. Write src/services/googleAuth.js using @react-native-google-signin/google-signin:
   - configure() — call this once on app start with webClientId from expo-constants
   - signIn() — shows Google account picker, returns { user: { name, email, photo }, accessToken }
   - signOut() — calls GoogleSignin.signOut()
   - getCurrentUser() — returns current signed-in user or null
   - getAccessToken() — gets fresh OAuth access token for Drive API calls

2. Write src/context/AuthContext.jsx:
   - State: user (null or user object), loading boolean
   - On mount: call getCurrentUser() to restore session
   - signIn(): calls googleAuth.signIn(), stores user in state
   - signOut(): calls googleAuth.signOut(), clears user in state
   - Export useAuth hook

3. Write src/screens/OnboardingScreen.jsx:
   Dark background, centered CashWise logo text (large, accent color).
   Subtitle: "Track money. Stay wise."
   Google Sign-In button: white pill button with Google icon + "Continue with Google"
   On press: calls signIn() from AuthContext. Shows loading spinner while waiting.
   Error message if sign-in fails.

4. Write src/components/ToggleSwitch.jsx:
   Props: value (boolean), onToggle
   42x24 pill shape. Off: colors.surface3. On: colors.accent.
   18x18 white circle thumb, animates with Animated.timing from left:2 to left:20.

5. Write src/screens/SettingsScreen.jsx:
   Profile banner: gradient background, avatar circle with user initials, name, email,
   green dot + "Google Drive synced" status.
   
   Section "Account":
   - Google Account row (shows email, chevron right)
   - Google Drive Backup row (shows last sync time, chevron right — calls driveBackup.exportToDrive)
   - Currency row (shows "Sri Lankan Rupee (LKR)", chevron right)
   
   Section "Preferences":
   - Dark Theme (ToggleSwitch, calls toggleTheme from ThemeContext)
   - Notifications (ToggleSwitch)
   - Transaction Sounds (ToggleSwitch)
   - Biometric Lock (ToggleSwitch, uses expo-local-authentication)
   
   Section "More":
   - Export Data row (calls exportData util, shares a CSV file)
   - Check for Updates row (shows app version from expo-constants)
   - Sign Out row (red icon, calls signOut from AuthContext)

No emojis anywhere. Icons from MaterialCommunityIcons. Colors from ThemeContext.
```

---

### Phase 10 — Google Drive Backup

**Goal:** Implement the Google Drive backup and restore so user data is saved to their own Drive account.

**Files created in this phase:**
```
src/services/driveBackup.js
src/utils/exportData.js
```

**Steps:**
- [ ] Create `driveBackup.js` that uploads the full JSON data dump to a Drive file named `cashwise-backup.json`
- [ ] Create restore function that fetches the file from Drive and imports it into AsyncStorage
- [ ] Create `exportData.js` that generates a CSV string of transactions and shares it via expo-sharing
- [ ] Wire the Drive Backup row in Settings to trigger upload
- [ ] Show last sync timestamp in the Drive row after each successful upload
- [ ] Test: Back up, clear local data, restore from Drive, confirm transactions reappear

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise.
Build me the Google Drive backup and CSV export utilities.

1. Write src/services/driveBackup.js using the Google Drive REST API (no Firebase, no SDK — raw fetch only):
   
   exportToDrive(accessToken, data) function:
   - data is the full app JSON: { transactions, accounts, loans, exportedAt }
   - Search Drive for a file named "cashwise-backup.json" in appDataFolder scope
   - If found: update it (PATCH to /upload/drive/v3/files/{fileId})
   - If not found: create it (POST to /upload/drive/v3/files with multipart)
   - Use spaces: ['appDataFolder'] so the file is hidden in the app's private Drive folder
   - Returns { success: true, fileId, timestamp } on success
   
   importFromDrive(accessToken) function:
   - Search Drive for cashwise-backup.json in appDataFolder
   - Download the file content
   - Return parsed JSON object or null if not found
   
   getLastSyncTime(accessToken) function:
   - Returns the modifiedTime of cashwise-backup.json or null

2. Write src/utils/exportData.js:
   generateCSV(transactions, accounts) function:
   - Returns a CSV string with headers:
     Date, Type, Amount, Category, Account, Note
   - One row per transaction
   
   shareCSV(csvString) async function:
   - Uses expo-file-system to write to a temp file cashwise-export.csv
   - Uses expo-sharing to open the system share sheet
   - Returns after user dismisses the share sheet

No Firebase. No npm libraries for Drive — raw fetch only. No emojis.
```

---

### Phase 11 — GitHub Actions and APK Release

**Goal:** Set up the GitHub Actions workflow to auto-build and release the APK when a version tag is pushed.

**Files created in this phase:**
```
.github/workflows/build-apk.yml
.github/workflows/preview.yml
CHANGELOG.md
```

**Steps:**
- [ ] Create `.github/workflows/build-apk.yml` exactly as shown in the GitHub Actions section of this README
- [ ] Create `CHANGELOG.md` with the initial `v1.0.0` entry
- [ ] Add the `EXPO_TOKEN` secret to GitHub repository settings
- [ ] Add `GOOGLE_WEB_CLIENT_ID` and `GOOGLE_ANDROID_CLIENT_ID` to GitHub repository secrets
- [ ] Push all code to GitHub main branch first: `git push origin main`
- [ ] Create the first release tag: `git tag v1.0.0 && git push origin v1.0.0`
- [ ] Wait for the Actions workflow to complete
- [ ] Download the APK from the GitHub Releases page and install on your phone
- [ ] Test: Full sign-in to sign-out flow on the real APK

**Cloud AI Prompt — copy and paste this:**

```
I am building a React Native Expo app called CashWise.
Help me finalize the GitHub Actions release workflow.

1. Write .github/workflows/build-apk.yml:
   Trigger: push to tags matching 'v*'
   Steps:
   - Checkout repo
   - Setup Node 20 with npm cache
   - Run npm ci
   - Install eas-cli globally
   - Authenticate EAS using EXPO_TOKEN secret
   - Run: eas build --platform android --profile production --non-interactive --json
     Capture the build artifact download URL from the JSON output using jq
   - Download the APK using curl to a file named cashwise-{tag}.apk
   - Create a GitHub Release using softprops/action-gh-release@v1
     Attach the APK file, write installation instructions in the release body.
   Environment variable EXPO_TOKEN comes from secrets.EXPO_TOKEN
   GITHUB_TOKEN is automatic.

2. Write .github/workflows/preview.yml:
   Trigger: pull_request to main branch
   Steps:
   - Checkout repo
   - Setup Node 20
   - npm ci
   - Install eas-cli
   - Run: eas update --branch pr-{PR number} --message "Preview for PR #{PR number}"
     This creates an Expo Go update QR code for mobile preview without building a full APK.
   Needs EXPO_TOKEN secret.
   
3. Write CHANGELOG.md with initial entry:
   ## [1.0.0] - {today's date}
   ### Added
   - Home screen with balance card, accounts, quick actions, transaction list
   - Analytics screen with bar chart and pie chart
   - Loans screen with lend/borrow tracking
   - Accounts screen with bank accounts and wallets
   - Settings screen with Google account and Drive backup
   - Dark and light theme
   - Google Sign-In authentication
   - Google Drive backup and restore
   - CSV data export

No emojis. Standard Keep a Changelog format.
```

---

## Release Without Google Play Store

CashWise is released exclusively through GitHub Releases. Users download and install the APK directly.

### Creating a new release

```bash
# In Termux or terminal
git add .
git commit -m "Your commit message"
git push origin main

# Then tag for release
git tag v1.0.1
git push origin v1.0.1
```

The APK appears at: `https://github.com/tharindu899/cashwise/releases`

### Allowing APK installation on Android

Users who download the APK need to allow installation from unknown sources:

1. Go to Settings on their Android phone
2. Search for "Install unknown apps"
3. Find their browser or file manager
4. Enable "Allow from this source"
5. Open the downloaded APK to install

### Updating the app

When you release a new version, users can:
- Visit the GitHub Releases page and download the latest APK manually
- You can implement an in-app update check (the UpdateBanner component) that calls the GitHub API to compare the current version with the latest release tag and shows the banner when a new version is available

#### In-app update check API call

The GitHub API endpoint to get the latest release is:

```
GET https://api.github.com/repos/tharindu899/cashwise/releases/latest
```

Compare the `tag_name` field with `expo-constants` `expoConfig.version` to detect if an update is available. No authentication is required for public repositories.

---

## Troubleshooting

### Google Sign-In fails with "developer error"

This means the SHA-1 fingerprint in Google Cloud Console does not match the APK's signing key.

Solution: Go to Google Cloud Console → Credentials → your Android OAuth client → update the SHA-1 to match the production keystore fingerprint. Run `eas credentials` to get the correct SHA-1 after your first production build.

### EAS build fails with "not logged in"

The `EXPO_TOKEN` secret is missing or expired.

Solution: Go to https://expo.dev/accounts/[your-username]/settings/access-tokens, create a new token, and update the GitHub secret.

### Google Drive backup returns 401

The access token has expired (Google OAuth tokens expire in 1 hour).

Solution: Call `GoogleSignin.getTokens()` to get a fresh `accessToken` before every Drive API call. Implement a `getAccessToken()` helper in `googleAuth.js` that always fetches a fresh token.

### App builds but Google Sign-In button is missing

The `@react-native-google-signin/google-signin` library requires a custom dev build — it does not work in Expo Go.

Solution: Build with `eas build --platform android --profile development` and install that APK for testing Google Sign-In.

### AsyncStorage data lost after app update

AsyncStorage data persists across updates on the same installation. However, if the user uninstalls the app, all local data is lost.

Solution: The Google Drive backup feature handles this. Remind users to back up before uninstalling.

### Termux git push asks for password

You are using HTTPS instead of SSH.

Solution: Change the remote to use SSH:

```bash
git remote set-url origin git@github.com:tharindu899/cashwise.git
```

Then follow the SSH key setup steps in the Termux Workflow section.

---

## License

MIT License. See LICENSE file for details.

---

*CashWise — Built for real-world personal finance tracking. No subscriptions. No ads. Your data stays on your device and your own Google Drive.*
