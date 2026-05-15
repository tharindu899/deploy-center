# PocketLedger — Money Manager

> A personal finance Android app for Sri Lankans. Track income, expenses, loans, budgets, and multi-account balances — all stored locally with optional Google Drive backup. Built with Flutter, deployed via GitHub, authenticated via Google Cloud OAuth.

---

## Table of Contents

- [Overview](#overview)
- [Screenshots Reference](#screenshots-reference)
- [Feature List](#feature-list)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Google Cloud OAuth Setup](#google-cloud-oauth-setup)
- [Building the APK](#building-the-apk)
- [GitHub Deployment & CI/CD](#github-deployment--cicd)
- [Environment Variables & Secrets](#environment-variables--secrets)
- [Database Schema](#database-schema)
- [Architecture Overview](#architecture-overview)
- [Phase-by-Phase TODO List](#phase-by-phase-todo-list)
- [Known Limitations](#known-limitations)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

PocketLedger is a fully offline-capable Android app built to give Sri Lankan users a clean, fast personal finance tracker. Every transaction, account, loan, and budget lives in a local SQLite database. Google Sign-In is used only for identity and Google Drive backup — no Firebase, no cloud database, no subscription.

The design mirrors a phone-first interface with a dark/light theme toggle, Tabler icon set, and LKR as the default currency.

---

## Screenshots Reference

The UI is defined in `PocketLedger_preview.html`. The five screens are:

| Screen | Icon (Tabler) | Description |
|---|---|---|
| Home | `ti-home-2` | Balance card, account pills, quick actions, recent transactions |
| Analytics | `ti-chart-pie` | Monthly bar chart, spending pie chart, summary row |
| Add (FAB) | `ti-plus` | Bottom sheet — Expense / Income / Transfer |
| Loans | `ti-clock-dollar` | Lend / borrow cards with progress and due dates |
| Settings | `ti-settings-2` | Google account, Drive backup, currency, theme, biometric, export |

Additional overlays:

| Overlay | Icon | Description |
|---|---|---|
| Notifications panel | `ti-bell` | Slide-in panel over the screen; unread dot badges |
| Accounts screen | `ti-building-bank` | Net worth, bank accounts, wallets |
| Add Transaction modal | `ti-plus` | Category grid, type tabs, amount input |

---

## Feature List

**Core Transactions**
- Add expense, income, or transfer transactions
- Assign to any account and category
- Group transactions by date on the home feed
- See all transactions with filter and search

**Accounts**
- Multiple accounts: bank, cash wallet, mobile wallet
- Per-account balance display
- Net worth calculation across all accounts
- Account-level transfer tracking

**Analytics**
- Monthly bar chart (Jan–Dec)
- Category spending pie chart
- Summary row: income / expenses / savings
- Period selector (month picker)

**Loans & Debts**
- Track money you lent or borrowed
- Per-person progress bar (paid / remaining)
- Due date reminders
- Loan type labels: Lending / Borrowing

**Budgets**
- Set monthly budget per category
- Visual progress bar per budget
- Over-budget alert notification

**Quick Actions**
- One-tap shortcuts: Expense, Income, Transfer, Loan, Bank Pay, Budget, Scan Bill, More

**Settings**
- Google Sign-In via Google Cloud OAuth
- Google Drive backup (manual and automatic)
- Currency selector (LKR default)
- Dark / Light theme toggle (persisted)
- Push notifications: bill reminders, budget alerts
- Transaction sounds
- Biometric lock (fingerprint / face)
- Export data: CSV, PDF, Excel
- Check for updates
- Sign out

**Design**
- Font: DM Sans (weights 300–700), DM Mono for amounts
- Icon set: Tabler Icons (`@tabler/icons-webfont` v3.10.0 or Flutter equivalent)
- Color system: dark-first, CSS variable-compatible design tokens
- No emojis anywhere in the UI — icons only
- Bottom navigation with floating action button (+)

---

## Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | Flutter 3.x (Dart) | Single codebase for Android APK; strong widget ecosystem |
| Local database | SQLite via `sqflite` | Fully offline, no cloud dependency |
| State management | `provider` | Simple, well-documented, sufficient for this scope |
| Google Sign-In | `google_sign_in` | OAuth via Google Cloud (no Firebase) |
| Google Drive | `googleapis` + `extension_google_sign_in_as_googleapis_auth` | Drive backup without Firebase Storage |
| Charts | `fl_chart` | Bar chart, pie/donut chart |
| Notifications | `flutter_local_notifications` | Budget alerts, loan reminders |
| Biometrics | `local_auth` | Fingerprint / face unlock |
| Export | `csv`, `pdf` (via `pdf` package), `excel` | CSV, PDF, and Excel export |
| Fonts | `google_fonts` | DM Sans, DM Mono |
| Icons | `flutter_tabler_icons` | Exact match to the HTML preview |
| CI/CD | GitHub Actions | Automated APK build on push |
| Distribution | GitHub Releases | APK attached to each release tag |
| Auth provider | Google Cloud Console | OAuth 2.0 only — no Firebase |

---

## Project Structure

```
pocket_ledger/
|
+-- .github/
|   +-- workflows/
|       +-- build.yml                   [ti-refresh] CI/CD: build APK + upload to Release
|
+-- android/
|   +-- app/
|   |   +-- build.gradle                [ti-settings] Android app-level build config
|   |   +-- google-services.json        [ti-brand-google] Google Cloud OAuth config (NOT Firebase)
|   |   +-- src/
|   |       +-- main/
|   |           +-- AndroidManifest.xml [ti-file-description] Permissions, intent filters
|   |           +-- res/
|   |               +-- drawable/
|   |               |   +-- launch_background.xml  [ti-photo] Splash screen background
|   |               +-- mipmap-*/
|   |                   +-- ic_launcher.png         [ti-app-window] App icon (all densities)
|   +-- build.gradle                    [ti-settings] Project-level Gradle config
|
+-- assets/
|   +-- fonts/
|   |   +-- DMSans-Light.ttf            [ti-typography] Font weight 300
|   |   +-- DMSans-Regular.ttf          [ti-typography] Font weight 400
|   |   +-- DMSans-Medium.ttf           [ti-typography] Font weight 500
|   |   +-- DMSans-SemiBold.ttf         [ti-typography] Font weight 600
|   |   +-- DMSans-Bold.ttf             [ti-typography] Font weight 700
|   |   +-- DMMono-Regular.ttf          [ti-typography] Monospace for amounts
|   |   +-- DMMono-Medium.ttf           [ti-typography] Monospace medium
|   +-- icons/
|       +-- app_icon.png                [ti-app-window] 1024x1024 master app icon
|       +-- app_icon_foreground.png     [ti-app-window] Adaptive icon foreground layer
|
+-- lib/
|   |
|   +-- main.dart                       [ti-player-play] App entry point; WidgetsFlutterBinding, runApp
|   +-- app.dart                        [ti-layout-2] MaterialApp setup, theme, router
|   |
|   +-- core/
|   |   |
|   |   +-- constants/
|   |   |   +-- app_colors.dart         [ti-palette] All color tokens matching the CSS variables
|   |   |   +-- app_text_styles.dart    [ti-text-size] DM Sans + DM Mono TextStyle definitions
|   |   |   +-- app_strings.dart        [ti-abc] All hardcoded strings (for future i18n)
|   |   |   +-- app_icons.dart          [ti-icons] Tabler icon name constants
|   |   |   +-- app_dimensions.dart     [ti-ruler] Radius, padding, spacing constants
|   |   |
|   |   +-- database/
|   |   |   +-- database_helper.dart    [ti-database] SQLite open/close, migration runner
|   |   |   +-- migrations/
|   |   |       +-- migration_v1.dart   [ti-git-commit] Initial schema: accounts, transactions, categories
|   |   |       +-- migration_v2.dart   [ti-git-commit] Add loans table, budget table
|   |   |
|   |   +-- services/
|   |   |   +-- auth_service.dart       [ti-brand-google] Google Sign-In; signIn, signOut, currentUser
|   |   |   +-- drive_service.dart      [ti-cloud-upload] Google Drive: upload, download backup JSON
|   |   |   +-- notification_service.dart [ti-bell] Local notification init, schedule, cancel
|   |   |   +-- export_service.dart     [ti-download] Generate CSV, PDF, Excel from transaction data
|   |   |   +-- biometric_service.dart  [ti-fingerprint] LocalAuth wrapper: canAuthenticate, authenticate
|   |   |
|   |   +-- utils/
|   |       +-- currency_formatter.dart [ti-currency-rupee] Format amounts as Rs. 1,00,000.00
|   |       +-- date_formatter.dart     [ti-calendar] Format dates as "May 11", "Yesterday", etc.
|   |       +-- validators.dart         [ti-check] Input validation helpers
|   |
|   +-- data/
|   |   |
|   |   +-- models/
|   |   |   +-- account.dart            [ti-building-bank] Account model (id, name, type, balance, color)
|   |   |   +-- transaction.dart        [ti-arrows-exchange] Transaction model (id, amount, type, category, account, date, note)
|   |   |   +-- category.dart           [ti-tag] Category model (id, name, icon, color, type)
|   |   |   +-- loan.dart               [ti-clock-dollar] Loan model (id, personName, amount, paid, type, dueDate)
|   |   |   +-- budget.dart             [ti-target] Budget model (id, categoryId, limit, spent, month)
|   |   |   +-- notification_item.dart  [ti-bell] Notification model for the panel list
|   |   |
|   |   +-- repositories/
|   |   |   +-- account_repository.dart      [ti-database] CRUD for accounts
|   |   |   +-- transaction_repository.dart  [ti-database] CRUD + filter/search for transactions
|   |   |   +-- category_repository.dart     [ti-database] Read/seed default categories
|   |   |   +-- loan_repository.dart         [ti-database] CRUD for loans
|   |   |   +-- budget_repository.dart       [ti-database] CRUD + monthly rollup for budgets
|   |   |
|   |   +-- providers/
|   |       +-- account_provider.dart        [ti-refresh] Account state; notifyListeners on CRUD
|   |       +-- transaction_provider.dart    [ti-refresh] Transaction state; filter by account/date
|   |       +-- loan_provider.dart           [ti-refresh] Loan state; totals for lend/borrow
|   |       +-- budget_provider.dart         [ti-refresh] Budget state; overspend detection
|   |       +-- theme_provider.dart          [ti-moon] Dark/light theme state; persisted via SharedPreferences
|   |       +-- auth_provider.dart           [ti-user] Google user state; sign-in status
|   |       +-- notification_provider.dart   [ti-bell] Notification list state; unread count
|   |
|   +-- presentation/
|   |   |
|   |   +-- theme/
|   |   |   +-- app_theme.dart          [ti-palette] ThemeData light + dark using color tokens
|   |   |
|   |   +-- screens/
|   |   |   |
|   |   |   +-- auth/
|   |   |   |   +-- login_screen.dart               [ti-brand-google] Google Sign-In screen
|   |   |   |   +-- splash_screen.dart              [ti-player-play] Splash; check auth state, route
|   |   |   |
|   |   |   +-- shell/
|   |   |   |   +-- main_shell.dart                 [ti-layout-2] Scaffold with bottom nav + FAB
|   |   |   |
|   |   |   +-- home/
|   |   |   |   +-- home_screen.dart                [ti-home-2] Dashboard screen root
|   |   |   |   +-- widgets/
|   |   |   |       +-- balance_card.dart           [ti-credit-card] Gradient card: total balance, income, expenses
|   |   |   |       +-- account_pills_row.dart      [ti-building-bank] Horizontal scrollable account filter pills
|   |   |   |       +-- quick_actions_grid.dart     [ti-layout-grid] 4x2 quick action grid
|   |   |   |       +-- transaction_list.dart       [ti-list] Date-grouped transaction cards
|   |   |   |       +-- transaction_card.dart       [ti-receipt] Single transaction row card
|   |   |   |       +-- update_banner.dart          [ti-sparkles] "New version available" dismissible banner
|   |   |   |
|   |   |   +-- analytics/
|   |   |   |   +-- analytics_screen.dart           [ti-chart-pie] Analytics root screen
|   |   |   |   +-- widgets/
|   |   |   |       +-- summary_row.dart            [ti-report] Income / Expenses / Savings mini-cards
|   |   |   |       +-- monthly_bar_chart.dart      [ti-chart-bar] fl_chart bar chart, Jan-Dec
|   |   |   |       +-- category_pie_chart.dart     [ti-chart-donut] fl_chart donut + legend
|   |   |   |       +-- budget_progress_list.dart   [ti-target] Per-category budget progress bars
|   |   |   |
|   |   |   +-- loans/
|   |   |   |   +-- loans_screen.dart               [ti-clock-dollar] Loans root screen
|   |   |   |   +-- add_loan_screen.dart            [ti-plus] Add/edit loan full screen or sheet
|   |   |   |   +-- widgets/
|   |   |   |       +-- loan_card.dart              [ti-users] Single loan card with progress
|   |   |   |       +-- loan_section_header.dart    [ti-section] "Owed to You" / "You Owe" label
|   |   |   |
|   |   |   +-- accounts/
|   |   |   |   +-- accounts_screen.dart            [ti-building-bank] Accounts list screen
|   |   |   |   +-- add_account_screen.dart         [ti-plus] Add/edit account screen
|   |   |   |   +-- widgets/
|   |   |   |       +-- account_card.dart           [ti-wallet] Single account row card
|   |   |   |       +-- net_worth_row.dart          [ti-report-money] Net worth + account count
|   |   |   |
|   |   |   +-- settings/
|   |   |   |   +-- settings_screen.dart            [ti-settings-2] Settings root screen
|   |   |   |   +-- widgets/
|   |   |   |       +-- profile_banner.dart         [ti-user-circle] Google account avatar + email + Drive sync
|   |   |   |       +-- settings_item.dart          [ti-list-details] Reusable settings row (icon, title, sub, trailing)
|   |   |   |       +-- settings_section.dart       [ti-section] Section header + grouped items with grouped border radius
|   |   |   |       +-- toggle_item.dart            [ti-toggle-left] Settings row with a toggle switch
|   |   |   |       +-- export_sheet.dart           [ti-download] Bottom sheet: choose CSV / PDF / Excel
|   |   |   |
|   |   |   +-- notifications/
|   |   |       +-- notification_panel.dart         [ti-bell] Slide-over notifications panel
|   |   |       +-- widgets/
|   |   |           +-- notif_item.dart             [ti-bell-ringing] Single notification row
|   |   |
|   |   +-- widgets/
|   |       +-- add_transaction_sheet.dart  [ti-plus] Bottom sheet: type tabs, amount, category grid, save
|   |       +-- category_grid.dart         [ti-layout-grid] Reusable 4-column category selector
|   |       +-- icon_button_box.dart       [ti-square] Square icon button (bell, calendar, etc.)
|   |       +-- app_fab.dart              [ti-plus] Gradient FAB button
|   |       +-- bottom_nav_bar.dart       [ti-layout-bottombar] Custom bottom nav with center FAB cutout
|   |       +-- loading_indicator.dart    [ti-loader] Centered circular progress
|   |       +-- empty_state.dart          [ti-mood-empty] Icon + message for empty lists
|   |
|   +-- router/
|       +-- app_router.dart              [ti-route] Named routes; auth guard; deep link handling
|
+-- test/
|   +-- unit/
|   |   +-- currency_formatter_test.dart
|   |   +-- transaction_repository_test.dart
|   +-- widget/
|       +-- balance_card_test.dart
|       +-- add_transaction_sheet_test.dart
|
+-- pubspec.yaml                         [ti-file-code] Flutter dependencies, asset declarations
+-- pubspec.lock                         [ti-lock] Locked dependency versions
+-- analysis_options.yaml               [ti-file-check] Dart linting rules
+-- .gitignore                          [ti-eye-off] Excludes build/, *.keystore, google-services.json
+-- .env.example                        [ti-file-description] Template for env vars (no secrets committed)
+-- README.md                           [ti-file-description] This file
+-- CHANGELOG.md                        [ti-git-commit] Version history
+-- keystore/
    +-- pocket_ledger.jks               [ti-lock] (LOCAL ONLY — never commit) Release signing keystore
    +-- key.properties                  [ti-lock] (LOCAL ONLY — never commit) Keystore credentials
```

---

## Prerequisites

Install these before starting:

| Tool | Version | Purpose |
|---|---|---|
| Flutter SDK | 3.22 or later | Build framework |
| Dart SDK | Bundled with Flutter | Language |
| Android Studio | Hedgehog (2023.1) or later | Android SDK, emulator |
| Java JDK | 17 (LTS) | Gradle build toolchain |
| Git | Latest | Version control |
| GitHub account | Free | Repository + CI/CD + Releases |
| Google account | Any Gmail | Google Cloud project owner |

**Flutter install check:**
```bash
flutter doctor
```
All items must pass (especially Android toolchain and licenses).

**Android SDK minimum requirements:**
- `compileSdkVersion` 34
- `minSdkVersion` 24  (Android 7.0 — covers 99%+ of active devices)
- `targetSdkVersion` 34

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/pocket_ledger.git
cd pocket_ledger
```

### 2. Install Flutter dependencies

```bash
flutter pub get
```

### 3. Add the `google-services.json` from Google Cloud

Place the file at `android/app/google-services.json`. This is the OAuth config file from Google Cloud Console. See the [Google Cloud OAuth Setup](#google-cloud-oauth-setup) section for how to generate this.

This file is listed in `.gitignore` and must never be committed.

### 4. Create a keystore for local signing (release builds only)

```bash
keytool -genkey -v \
  -keystore keystore/pocket_ledger.jks \
  -alias pocket_ledger \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

Create `keystore/key.properties`:
```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=pocket_ledger
storeFile=../keystore/pocket_ledger.jks
```

Both files are listed in `.gitignore` and must never be committed.

### 5. Run on a device or emulator

```bash
# List available devices
flutter devices

# Run in debug mode
flutter run

# Run on a specific device
flutter run -d emulator-5554
```

---

## Google Cloud OAuth Setup

PocketLedger uses Google Sign-In for identity and Google Drive API for backup. No Firebase is used. All setup is done in Google Cloud Console only.

### Step 1 — Create a Google Cloud Project

1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Click `Select a project` → `New Project`
3. Name it `PocketLedger`
4. Click `Create`

### Step 2 — Enable required APIs

In `APIs & Services` → `Library`, enable these two APIs:

- `Google Drive API`
- `People API` (for user profile information)

### Step 3 — Configure the OAuth consent screen

1. Go to `APIs & Services` → `OAuth consent screen`
2. Choose `External` → `Create`
3. Fill in:
   - App name: `PocketLedger`
   - User support email: your Gmail
   - Developer contact email: your Gmail
4. Under Scopes, add:
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
   - `https://www.googleapis.com/auth/drive.appdata`  ← for Drive backup
5. Save and continue through the remaining steps

### Step 4 — Create OAuth 2.0 credentials

**For the Android app:**
1. Go to `APIs & Services` → `Credentials` → `Create Credentials` → `OAuth client ID`
2. Application type: `Android`
3. Package name: `com.example.pocket_ledger`  (must match `android/app/build.gradle`)
4. SHA-1 certificate fingerprint — get this by running:

   ```bash
   # Debug key (for development)
   keytool -list -v \
     -keystore ~/.android/debug.keystore \
     -alias androiddebugkey \
     -storepass android \
     -keypass android
   ```

   For the release key:
   ```bash
   keytool -list -v \
     -keystore keystore/pocket_ledger.jks \
     -alias pocket_ledger
   ```
5. Paste the SHA-1 fingerprint → `Create`

**For the web (needed by google_sign_in internally):**
1. Create another credential: `Web application`
2. Name it `PocketLedger Web Client`
3. No redirect URIs needed for Android
4. Note the `Client ID` — you will need it in `pubspec.yaml` or Dart code

### Step 5 — Download google-services.json

1. Go to `APIs & Services` → `Credentials`
2. Click the download icon next to your Android OAuth credential
3. This gives you `google-services.json`
4. Place it at `android/app/google-services.json`

### Step 6 — Reference the Web Client ID in code

In `lib/core/services/auth_service.dart`:

```dart
final GoogleSignIn _googleSignIn = GoogleSignIn(
  scopes: [
    'email',
    'profile',
    'https://www.googleapis.com/auth/drive.appdata',
  ],
  // Replace with your actual Web Client ID from Google Cloud Console
  serverClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
);
```

---

## Building the APK

### Debug APK (no signing required)

```bash
flutter build apk --debug
```
Output: `build/app/outputs/flutter-apk/app-debug.apk`

### Release APK (signed, smaller, optimized)

Ensure `keystore/key.properties` is in place, then:

```bash
flutter build apk --release
```
Output: `build/app/outputs/flutter-apk/app-release.apk`

### Split APKs by ABI (smaller file sizes)

```bash
flutter build apk --split-per-abi --release
```
Output: separate APKs for `armeabi-v7a`, `arm64-v8a`, `x86_64`.

### App Bundle (for Play Store)

```bash
flutter build appbundle --release
```
Output: `build/app/outputs/bundle/release/app-release.aab`

---

## GitHub Deployment & CI/CD

The app is built and distributed using GitHub Actions and GitHub Releases. No external hosting is required.

### How it works

1. Push a tag to GitHub: `git tag v1.0.0 && git push origin v1.0.0`
2. GitHub Actions detects the tag, runs the workflow in `.github/workflows/build.yml`
3. The workflow builds `app-release.apk`
4. The APK is uploaded to a GitHub Release automatically
5. Users download the APK directly from the GitHub Releases page

### Setting up GitHub Secrets

Go to your repository → `Settings` → `Secrets and variables` → `Actions` → `New repository secret`:

| Secret Name | Value |
|---|---|
| `KEYSTORE_BASE64` | Base64-encoded content of `pocket_ledger.jks` — see below |
| `KEY_ALIAS` | `pocket_ledger` |
| `KEY_PASSWORD` | Your key password |
| `KEYSTORE_PASSWORD` | Your keystore password |
| `GOOGLE_SERVICES_JSON` | Full content of `google-services.json` as a string |

**Encode the keystore to Base64:**
```bash
# macOS / Linux
base64 -i keystore/pocket_ledger.jks | tr -d '\n'

# Windows PowerShell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("keystore\pocket_ledger.jks"))
```
Paste the output as the `KEYSTORE_BASE64` secret value.

### GitHub Actions Workflow

Create `.github/workflows/build.yml`:

```yaml
name: Build and Release APK

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Java 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Set up Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.22.0'
          channel: 'stable'

      - name: Write google-services.json
        run: echo '${{ secrets.GOOGLE_SERVICES_JSON }}' > android/app/google-services.json

      - name: Decode and write keystore
        run: |
          mkdir -p keystore
          echo '${{ secrets.KEYSTORE_BASE64 }}' | base64 --decode > keystore/pocket_ledger.jks

      - name: Write key.properties
        run: |
          cat > keystore/key.properties <<EOF
          storePassword=${{ secrets.KEYSTORE_PASSWORD }}
          keyPassword=${{ secrets.KEY_PASSWORD }}
          keyAlias=${{ secrets.KEY_ALIAS }}
          storeFile=../keystore/pocket_ledger.jks
          EOF

      - name: Install dependencies
        run: flutter pub get

      - name: Run tests
        run: flutter test

      - name: Build release APK
        run: flutter build apk --release

      - name: Upload APK to GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: build/app/outputs/flutter-apk/app-release.apk
          name: PocketLedger ${{ github.ref_name }}
          body: |
            Release ${{ github.ref_name }}
            Download app-release.apk and install on your Android device.
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Making a release

```bash
# Commit all changes
git add .
git commit -m "Release v1.0.0"

# Tag the release
git tag v1.0.0

# Push with tag
git push origin main --tags
```

GitHub Actions will automatically build and attach the APK to the release.

---

## Environment Variables & Secrets

| Variable | Where used | Storage |
|---|---|---|
| `KEYSTORE_BASE64` | GitHub Actions build | GitHub Secret |
| `KEYSTORE_PASSWORD` | GitHub Actions build | GitHub Secret |
| `KEY_PASSWORD` | GitHub Actions build | GitHub Secret |
| `KEY_ALIAS` | GitHub Actions build | GitHub Secret |
| `GOOGLE_SERVICES_JSON` | GitHub Actions + local dev | GitHub Secret / local file |
| Web Client ID | `auth_service.dart` | Hardcoded (public, not sensitive) |

Never commit any file containing a private key, password, or raw `google-services.json` to your repository.

---

## Database Schema

All data is stored in SQLite via `sqflite`. The database is created on first launch.

### Table: `accounts`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER PRIMARY KEY | Auto-increment |
| `name` | TEXT NOT NULL | e.g., "BOC Bank" |
| `type` | TEXT NOT NULL | `bank`, `cash`, `wallet` |
| `balance` | REAL NOT NULL DEFAULT 0 | Current balance |
| `color_hex` | TEXT | e.g., "#4f8ef7" |
| `icon_name` | TEXT | Tabler icon name |
| `created_at` | INTEGER | Unix timestamp |

### Table: `categories`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER PRIMARY KEY | Auto-increment |
| `name` | TEXT NOT NULL | e.g., "Food" |
| `icon_name` | TEXT | Tabler icon name |
| `color_hex` | TEXT | Category color |
| `type` | TEXT | `expense`, `income`, `both` |
| `is_custom` | INTEGER | 0 = default seed, 1 = user-created |

### Table: `transactions`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER PRIMARY KEY | Auto-increment |
| `amount` | REAL NOT NULL | Always positive |
| `type` | TEXT NOT NULL | `expense`, `income`, `transfer` |
| `category_id` | INTEGER | FK → categories.id |
| `account_id` | INTEGER NOT NULL | FK → accounts.id |
| `to_account_id` | INTEGER | FK → accounts.id (transfers only) |
| `note` | TEXT | Optional memo |
| `date` | INTEGER NOT NULL | Unix timestamp (milliseconds) |
| `created_at` | INTEGER | Unix timestamp |

### Table: `loans`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER PRIMARY KEY | Auto-increment |
| `person_name` | TEXT NOT NULL | Name of other party |
| `person_initials` | TEXT | e.g., "RM" for avatar |
| `amount` | REAL NOT NULL | Total loan amount |
| `paid` | REAL NOT NULL DEFAULT 0 | Amount repaid so far |
| `type` | TEXT NOT NULL | `lending` or `borrowing` |
| `purpose` | TEXT | e.g., "Emergency" |
| `due_date` | INTEGER | Unix timestamp |
| `interest_rate` | REAL | Annual % (optional) |
| `created_at` | INTEGER | Unix timestamp |

### Table: `budgets`
| Column | Type | Notes |
|---|---|---|
| `id` | INTEGER PRIMARY KEY | Auto-increment |
| `category_id` | INTEGER NOT NULL | FK → categories.id |
| `limit_amount` | REAL NOT NULL | Monthly budget cap |
| `month` | TEXT NOT NULL | Format: `2025-05` |
| `created_at` | INTEGER | Unix timestamp |

---

## Architecture Overview

```
Presentation Layer  (screens/ + widgets/)
        |
        | reads from + calls methods on
        v
   Provider Layer   (providers/)
        |
        | calls CRUD methods on
        v
  Repository Layer  (repositories/)
        |
        | reads/writes via
        v
   Database Layer   (database_helper.dart + SQLite)

   Services Layer   (auth_service, drive_service, etc.)
        |
        | called directly by Providers or Screens
        v
   External APIs    (Google Sign-In, Google Drive API)
```

Data flows in one direction. Screens do not talk to repositories or the database directly. All state is managed through providers. The database helper is a singleton.

---

## Phase-by-Phase TODO List

Each phase is self-contained. The "AI Prompt" block under each phase is ready to copy and paste directly into any free-tier AI (Claude.ai free, Gemini free, ChatGPT free) to get the code for that phase.

---

### Phase 1 — Project Scaffold & Dependencies

**Goal:** A runnable Flutter app with the correct package name, dependencies, folder structure, and app icon.

**Files to create:**
- `pubspec.yaml`
- `analysis_options.yaml`
- `lib/main.dart`
- `lib/app.dart`
- `android/app/build.gradle`
- `.gitignore`
- `assets/` folders

**Steps:**
1. Run `flutter create pocket_ledger --org com.example --platforms android`
2. Replace `pubspec.yaml` with the version below (copy AI prompt output)
3. Run `flutter pub get`
4. Update `android/app/build.gradle`: set `applicationId "com.example.pocket_ledger"`, `minSdkVersion 24`, `targetSdkVersion 34`, `compileSdkVersion 34`
5. Add keystore signing config to `android/app/build.gradle`
6. Create `assets/fonts/` and `assets/icons/` directories
7. Download DM Sans and DM Mono from Google Fonts, place TTF files in `assets/fonts/`
8. Verify with `flutter run`

---

> **COPY THIS PROMPT TO AI — Phase 1:**
>
> ```
> I am building a Flutter Android app called PocketLedger (package: com.example.pocket_ledger).
> Generate the complete pubspec.yaml file with these dependencies:
> - flutter_tabler_icons (latest)
> - google_fonts
> - sqflite
> - path
> - provider
> - google_sign_in
> - googleapis
> - extension_google_sign_in_as_googleapis_auth
> - fl_chart
> - flutter_local_notifications
> - local_auth
> - shared_preferences
> - intl
> - csv
> - pdf
> - excel
> - path_provider
> - permission_handler
> Also declare assets: assets/fonts/ and assets/icons/.
> Include font declarations for DM Sans (weights 300,400,500,600,700) and DM Mono (400,500).
> Flutter SDK constraint: >=3.0.0.
> ```

---

### Phase 2 — Design Tokens & Theme

**Goal:** Implement the exact color system, text styles, and theme from the HTML preview.

**Files to create:**
- `lib/core/constants/app_colors.dart`
- `lib/core/constants/app_text_styles.dart`
- `lib/core/constants/app_dimensions.dart`
- `lib/presentation/theme/app_theme.dart`
- `lib/data/providers/theme_provider.dart`

**Steps:**
1. Map CSS variables to Dart `Color` constants (dark and light sets)
2. Create `ThemeData` for dark and light mode
3. Implement `ThemeProvider` using `ChangeNotifier` + `SharedPreferences` for persistence
4. Wrap `MaterialApp` in `ChangeNotifierProvider<ThemeProvider>`
5. Test theme toggle from settings

---

> **COPY THIS PROMPT TO AI — Phase 2:**
>
> ```
> I am building a Flutter app. Create lib/core/constants/app_colors.dart with these color values:
> Dark mode: bg=#0d0f14, surface=#161a23, surface2=#1e2330, surface3=#252b3a,
> border=rgba(255,255,255,0.07), border2=rgba(255,255,255,0.12),
> text1=#f0f2f8, text2=#8a90a8, text3=#555c75,
> accent=#4f8ef7, accent2=#7b6cf7, green=#30d48a, red=#f05c6e,
> amber=#f5a623, purple=#a78bfa, teal=#2dd4bf, pink=#f472b6
> Light mode (same names with "Light" suffix): bg=#f0f2f8, surface=#ffffff,
> surface2=#f5f7fc, surface3=#eaedf5, text1=#0d0f14, text2=#5a607a,
> accent=#3b6ef0, green=#18b870, red=#e03349
> Then create lib/presentation/theme/app_theme.dart with ThemeData for dark and light using these colors.
> Font family: DM Sans. Also create lib/data/providers/theme_provider.dart using
> ChangeNotifier that saves isDark to SharedPreferences.
> ```

---

### Phase 3 — Database & Models

**Goal:** SQLite database with all five tables, model classes, and seed data for categories.

**Files to create:**
- `lib/core/database/database_helper.dart`
- `lib/core/database/migrations/migration_v1.dart`
- `lib/data/models/account.dart`
- `lib/data/models/transaction.dart`
- `lib/data/models/category.dart`
- `lib/data/models/loan.dart`
- `lib/data/models/budget.dart`

**Steps:**
1. Create `DatabaseHelper` as a singleton using `sqflite`
2. Create migration v1 with all five tables (see Database Schema section)
3. Seed the default categories on first run: Food, Transport, Shopping, Health, Utilities, Entertainment, Education, Other (expense); Salary, Freelance, Business, Investment, Other (income)
4. Create Dart model classes with `fromMap` and `toMap` methods
5. Test by printing all seeded categories on app start

---

> **COPY THIS PROMPT TO AI — Phase 3:**
>
> ```
> I am building a Flutter app with sqflite. Create lib/core/database/database_helper.dart as a
> singleton class. It should open a database called pocket_ledger.db at version 1.
> Create these tables in onCreate:
> accounts(id INTEGER PK, name TEXT, type TEXT, balance REAL DEFAULT 0, color_hex TEXT, icon_name TEXT, created_at INTEGER)
> categories(id INTEGER PK, name TEXT, icon_name TEXT, color_hex TEXT, type TEXT, is_custom INTEGER DEFAULT 0)
> transactions(id INTEGER PK, amount REAL, type TEXT, category_id INTEGER, account_id INTEGER, to_account_id INTEGER, note TEXT, date INTEGER, created_at INTEGER)
> loans(id INTEGER PK, person_name TEXT, person_initials TEXT, amount REAL, paid REAL DEFAULT 0, type TEXT, purpose TEXT, due_date INTEGER, interest_rate REAL, created_at INTEGER)
> budgets(id INTEGER PK, category_id INTEGER, limit_amount REAL, month TEXT, created_at INTEGER)
> In onOpen, seed the categories table if empty with these expense categories:
> Food(ti-tools-kitchen-2, #f05c6e), Transport(ti-car, #4f8ef7), Shopping(ti-shopping-bag, #f5a623),
> Health(ti-heartbeat, #30d48a), Utilities(ti-bolt, #a78bfa), Entertainment(ti-device-tv, #f472b6),
> Education(ti-school, #2dd4bf), Other(ti-dots, #8a90a8)
> Also create the Dart model classes: Account, Transaction, Category, Loan, Budget each with fromMap and toMap.
> ```

---

### Phase 4 — Repositories & Providers

**Goal:** Data access layer and state management wired to the database.

**Files to create:**
- `lib/data/repositories/account_repository.dart`
- `lib/data/repositories/transaction_repository.dart`
- `lib/data/repositories/category_repository.dart`
- `lib/data/repositories/loan_repository.dart`
- `lib/data/repositories/budget_repository.dart`
- `lib/data/providers/account_provider.dart`
- `lib/data/providers/transaction_provider.dart`
- `lib/data/providers/loan_provider.dart`
- `lib/data/providers/budget_provider.dart`

**Steps:**
1. Each repository wraps the `DatabaseHelper` and exposes `getAll`, `getById`, `insert`, `update`, `delete`
2. `TransactionRepository` also exposes `getByAccountId`, `getByDateRange`, `getSumByType`
3. Each provider holds the repository, calls `notifyListeners()` after mutations, and exposes derived values (e.g., `totalBalance`, `thisMonthIncome`)
4. Register all providers in `main.dart` using `MultiProvider`

---

> **COPY THIS PROMPT TO AI — Phase 4:**
>
> ```
> I am building a Flutter app. I have a DatabaseHelper singleton with these tables:
> accounts, transactions, categories, loans, budgets.
> Create lib/data/repositories/transaction_repository.dart with these methods:
> - Future<List<Transaction>> getAll()
> - Future<List<Transaction>> getByAccountId(int accountId)
> - Future<List<Transaction>> getByDateRange(DateTime start, DateTime end)
> - Future<Map<String,double>> getSumByType(String month) — returns {income: x, expense: y} for month like "2025-05"
> - Future<int> insert(Transaction tx) — also updates the account balance
> - Future<void> update(Transaction tx)
> - Future<void> delete(int id) — also reverses the account balance change
> Then create lib/data/providers/transaction_provider.dart using ChangeNotifier.
> It should hold List<Transaction> transactions, double thisMonthIncome, double thisMonthExpenses.
> loadTransactions() fetches from the repository. addTransaction(Transaction) inserts and refreshes state.
> ```

---

### Phase 5 — Authentication (Google Sign-In)

**Goal:** Google Sign-In screen, auth state persistence, sign-out, route guard.

**Files to create:**
- `lib/core/services/auth_service.dart`
- `lib/data/providers/auth_provider.dart`
- `lib/presentation/screens/auth/login_screen.dart`
- `lib/presentation/screens/auth/splash_screen.dart`
- `lib/router/app_router.dart`

**Steps:**
1. Add the Android OAuth client ID SHA-1 in Google Cloud Console (see Google Cloud OAuth Setup)
2. Place `google-services.json` in `android/app/`
3. Add `classpath 'com.google.gms:google-services:4.4.0'` to `android/build.gradle`
4. Add `apply plugin: 'com.google.gms.google-services'` to `android/app/build.gradle`
5. Implement `AuthService` wrapping `GoogleSignIn`
6. Implement `AuthProvider` with `isSignedIn`, `currentUser`, `signIn()`, `signOut()`
7. Build the login screen: centered Google button (`ti-brand-google` icon), app name, tagline
8. `SplashScreen` checks `isSignedIn`; routes to `LoginScreen` or `MainShell`

---

> **COPY THIS PROMPT TO AI — Phase 5:**
>
> ```
> I am building a Flutter Android app. Create lib/core/services/auth_service.dart using the
> google_sign_in package. The service should:
> - Use GoogleSignIn with scopes: email, profile, https://www.googleapis.com/auth/drive.appdata
> - Expose: Future<GoogleSignInAccount?> signIn(), Future<void> signOut(),
>   Future<bool> isSignedIn(), GoogleSignInAccount? get currentUser
> Then create lib/data/providers/auth_provider.dart using ChangeNotifier. It wraps AuthService
> and exposes: bool isSignedIn, GoogleSignInAccount? user, Future<void> signIn(), Future<void> signOut().
> Then create lib/presentation/screens/auth/login_screen.dart — a dark-themed screen with:
> - App name "PocketLedger" in large bold text
> - Tagline "Your money. Your control."
> - A large button with the Google icon (use flutter_tabler_icons: TablerIcons.brandGoogle)
>   and text "Continue with Google"
> - On press: calls authProvider.signIn() then navigates to /home
> No emojis anywhere. Use colors: bg #0d0f14, surface #161a23, accent #4f8ef7.
> ```

---

### Phase 6 — Navigation Shell & Bottom Nav

**Goal:** Main app scaffold with bottom navigation bar and floating action button.

**Files to create:**
- `lib/presentation/screens/shell/main_shell.dart`
- `lib/presentation/widgets/bottom_nav_bar.dart`
- `lib/presentation/widgets/app_fab.dart`

**Steps:**
1. Build a custom `BottomNavigationBar` with five items: Home, Analytics, (FAB placeholder), Loans, Settings
2. The center item is not a nav item — it is replaced by the floating `+` button elevated above the bar
3. The FAB uses a gradient (accent to accent2) and opens the Add Transaction sheet
4. `MainShell` uses `IndexedStack` to preserve each screen's scroll position
5. Active tab icon uses `accent` color; inactive uses `text3`

---

> **COPY THIS PROMPT TO AI — Phase 6:**
>
> ```
> I am building a Flutter app. Create lib/presentation/screens/shell/main_shell.dart.
> It should show 5 screens using IndexedStack: HomeScreen, AnalyticsScreen, a placeholder,
> LoansScreen, SettingsScreen. The center index is for the FAB — when tapped it opens
> AddTransactionSheet as a bottom sheet, it should not switch the IndexedStack.
> Create a custom bottom nav bar widget in lib/presentation/widgets/bottom_nav_bar.dart.
> It has 4 nav items (index 0,1,3,4): Home(ti-home-2), Analytics(ti-chart-pie),
> Loans(ti-clock-dollar), Settings(ti-settings-2). A gap in the center.
> Active color: #4f8ef7. Inactive: #555c75. Background: #161a23. Border top: rgba(255,255,255,0.07).
> Create the FAB in lib/presentation/widgets/app_fab.dart: circular, 58px,
> gradient from #4f8ef7 to #7b6cf7, ti-plus icon in white, margin-top -22px to float above the nav bar.
> No emojis. Use flutter_tabler_icons for all icons.
> ```

---

### Phase 7 — Home Screen

**Goal:** Full dashboard screen matching the HTML preview exactly.

**Files to create:**
- `lib/presentation/screens/home/home_screen.dart`
- `lib/presentation/screens/home/widgets/balance_card.dart`
- `lib/presentation/screens/home/widgets/account_pills_row.dart`
- `lib/presentation/screens/home/widgets/quick_actions_grid.dart`
- `lib/presentation/screens/home/widgets/transaction_list.dart`
- `lib/presentation/screens/home/widgets/transaction_card.dart`
- `lib/presentation/screens/home/widgets/update_banner.dart`

**Steps:**
1. Header: greeting text + user name (from `AuthProvider`), notification bell with badge, avatar initials
2. Balance card: gradient background, total balance in DM Mono, income + expense stat pills
3. Account pills: horizontal scroll, one pill per account, active state = accent background
4. Quick actions: 4x2 grid, icon + label, tap opens relevant flow
5. Transaction list: grouped by date ("Today — May 11", "Yesterday — May 10"), date group header with "See All"
6. Each transaction card: category icon, name, meta (category + account), amount (green for income, red for expense, accent for transfer)
7. Pull-to-refresh calls `TransactionProvider.loadTransactions()`

---

> **COPY THIS PROMPT TO AI — Phase 7:**
>
> ```
> I am building a Flutter app. Create lib/presentation/screens/home/widgets/balance_card.dart.
> It should be a Container with a gradient (135deg, #1a2340 → #0f1a38 → #1a1040 for dark mode,
> #3b6ef0 → #6c52e8 for light mode), border radius 18, padding 22x20.
> Show: label "Total Balance" in small caps, then the balance amount in 36px DM Mono bold white,
> then a row of two stat pills (income and expense).
> Each stat pill: semi-transparent white background (rgba 255,255,255,0.08), border radius 12,
> a small colored icon (green for income ti-trending-up, red for expense ti-trending-down),
> label and value in white.
> Pill decoration is two pseudo-circles using Stack/Positioned containers with partial opacity.
> Accept: double totalBalance, double income, double expense as constructor params.
> No emojis. All values formatted as "Rs. 1,23,456.00".
> ```

---

### Phase 8 — Add Transaction Sheet

**Goal:** Bottom sheet modal for adding expense, income, or transfer.

**Files to create:**
- `lib/presentation/widgets/add_transaction_sheet.dart`
- `lib/presentation/widgets/category_grid.dart`

**Steps:**
1. `showModalBottomSheet` with `isScrollControlled: true` for full-height support
2. Handle pill (drag indicator), title "Add Transaction"
3. Three-tab selector: Expense / Income / Transfer (styled as per HTML preview)
4. Amount input field: "Rs." prefix in `DM Mono`, large number input, no keyboard emoji
5. Field row: Category picker and Account picker (tappable, shows current selection)
6. Category grid: 4-column, same 8 categories from the HTML, each with icon + label
7. "Save Transaction" gradient button calls `TransactionProvider.addTransaction()`
8. On save: close sheet, show snackbar "Transaction saved", refresh home screen

---

> **COPY THIS PROMPT TO AI — Phase 8:**
>
> ```
> I am building a Flutter app. Create lib/presentation/widgets/add_transaction_sheet.dart.
> This is a bottom sheet shown with showModalBottomSheet.
> At the top: a drag handle (40x4 grey pill), title "Add Transaction" centered.
> Below: a 3-column row of type tabs [Expense, Income, Transfer]. Each is a container with border.
> Active Expense: red border+bg. Active Income: green. Active Transfer: accent blue.
> Below: an amount input row — "Rs." label in DM Mono + TextField for numbers only.
> Below: a row with two field pills (Category and Account), each showing current value.
> Below: "Categories" label + 4-column grid of category items (icon + label below).
> Each category item: rounded square icon in colored bg + name. Active = accent border.
> Categories: Food(ti-tools-kitchen-2,red), Transport(ti-car,blue), Shopping(ti-shopping-bag,amber),
> Health(ti-heartbeat,green), Utilities(ti-bolt,purple), Entertainment(ti-device-tv,pink),
> Education(ti-school,teal), Other(ti-dots,grey).
> At bottom: full-width gradient button "Save Transaction".
> Use dark theme colors. No emojis. Use flutter_tabler_icons.
> ```

---

### Phase 9 — Analytics Screen

**Goal:** Analytics screen with bar chart, pie chart, summary row, and budget list.

**Files to create:**
- `lib/presentation/screens/analytics/analytics_screen.dart`
- `lib/presentation/screens/analytics/widgets/summary_row.dart`
- `lib/presentation/screens/analytics/widgets/monthly_bar_chart.dart`
- `lib/presentation/screens/analytics/widgets/category_pie_chart.dart`
- `lib/presentation/screens/analytics/widgets/budget_progress_list.dart`

**Steps:**
1. Summary row: three mini-cards side by side: Income (green), Expenses (red), Savings (accent)
2. Bar chart: use `fl_chart` `BarChart`. X axis = month abbreviations. Bars for expense. Current month = accent, others = red with reduced opacity
3. Pie chart: use `fl_chart` `PieChart` as a donut. Center label = current month. Legend on the right with color dot, category name, percentage
4. Budget section: per-category progress bars (remaining / limit), over-budget shown in red
5. Month selector: `icon_btn` showing current month, tapping opens a month picker

---

> **COPY THIS PROMPT TO AI — Phase 9:**
>
> ```
> I am building a Flutter app using fl_chart. Create lib/presentation/screens/analytics/widgets/monthly_bar_chart.dart.
> It should show a BarChart from fl_chart with:
> - 12 bars for Jan through Dec
> - Each bar has a rounded top (borderRadius: BorderRadius.circular(6))
> - Current month bar uses color #4f8ef7, other months use #f05c6e with 70% opacity
> - Height of each bar is proportional to the expense amount for that month
> - X axis shows month abbreviations (Jan, Feb, etc.), current month label bold in accent color
> - No grid lines on left axis, no border
> - Chart height: 120px
> - Background: transparent (chart card bg is surface2 #1e2330)
> Accept: List<double> monthlyExpenses (12 values), int currentMonth (1-12).
> Also create lib/presentation/screens/analytics/widgets/category_pie_chart.dart using PieChart from fl_chart.
> It should be a donut chart (holeRadius: 0.6), center text = month name, with a legend column on the right
> showing color square, category name, and percentage.
> Accept: List<CategorySpend> data (name, amount, colorHex).
> ```

---

### Phase 10 — Loans Screen

**Goal:** Loans screen showing people you lent to and loans you owe.

**Files to create:**
- `lib/presentation/screens/loans/loans_screen.dart`
- `lib/presentation/screens/loans/add_loan_screen.dart`
- `lib/presentation/screens/loans/widgets/loan_card.dart`

**Steps:**
1. Two sections: "Owed to You" (Lending) and "You Owe" (Borrowing)
2. Each section is a list of `loan_card` widgets
3. Loan card: avatar with initials + gradient background, name, type, badge (Lending=green, Borrowing=red), total amount, progress bar, paid/remaining text
4. `AddLoanScreen`: name, initials (auto-generated), amount, type, purpose, due date, interest rate
5. Tap a loan card: open a bottom sheet to record a repayment or mark as complete
6. Loan reminder logic: if due date is within 7 days, schedule a local notification

---

> **COPY THIS PROMPT TO AI — Phase 10:**
>
> ```
> I am building a Flutter app. Create lib/presentation/screens/loans/widgets/loan_card.dart.
> It is a Card/Container with:
> - border radius 18, background surface2 (#1e2330), border rgba(255,255,255,0.07)
> - Header row: circular avatar (40px, gradient background, initials text white bold) + name+type column + badge pill
> - Badge: "Lending" = green bg (rgba 48,212,138,0.15) text green, "Borrowing" = red bg text red
> - Large amount text (22px bold) — green for lending, red for borrowing
> - Thin progress bar (5px height, border radius 4): background surface3, filled bar in green or red, width = paid/total
> - Bottom row: "Paid: Rs. X" and "Remaining: Rs. Y" in small grey text
> Accept: Loan model with personName, personInitials, avatarGradientStart, avatarGradientEnd,
> amount, paid, type (lending/borrowing), purpose, dueDate.
> No emojis.
> ```

---

### Phase 11 — Accounts Screen

**Goal:** Full accounts list with net worth and ability to add new accounts.

**Files to create:**
- `lib/presentation/screens/accounts/accounts_screen.dart`
- `lib/presentation/screens/accounts/add_account_screen.dart`
- `lib/presentation/screens/accounts/widgets/account_card.dart`

**Steps:**
1. Net worth row: two mini-cards (Net Worth total, number of accounts)
2. Sections: "Bank Accounts" and "Wallets"
3. Account card: icon box (colored bg), name + type/mask, balance + label
4. "Add New Account" card at the bottom with dashed border
5. Add account screen: name, type selector (bank/cash/wallet), initial balance, color picker, icon picker
6. Deleting an account: confirm dialog, only allow if balance is 0 and no linked transactions

---

> **COPY THIS PROMPT TO AI — Phase 11:**
>
> ```
> I am building a Flutter app. Create lib/presentation/screens/accounts/widgets/account_card.dart.
> It is a Container: border radius 18, background surface2 (#1e2330), border rgba(255,255,255,0.07), padding 16.
> Layout: Row with icon box + info column + balance column.
> Icon box: 50x50, border radius 16, colored background (e.g. rgba(48,212,138,0.12)), icon in matching solid color using flutter_tabler_icons.
> Info column (flex 1): name in 15px bold text1, account type+masked number in 12px text3.
> Balance column (right-aligned): balance amount in 18px bold text1, label "Available" or "On hand" in 11px text3.
> Accept: Account model with name, type, iconName, colorHex, balance, maskedNumber.
> Also create an "Add New Account" placeholder card with the same shape but dashed border,
> center-aligned ti-plus icon + "Add New Account" text in text3 color.
> No emojis.
> ```

---

### Phase 12 — Settings Screen

**Goal:** Full settings screen with all sections, toggles, and actions.

**Files to create:**
- `lib/presentation/screens/settings/settings_screen.dart`
- `lib/presentation/screens/settings/widgets/profile_banner.dart`
- `lib/presentation/screens/settings/widgets/settings_item.dart`
- `lib/presentation/screens/settings/widgets/settings_section.dart`
- `lib/presentation/screens/settings/widgets/export_sheet.dart`

**Steps:**
1. Profile banner: gradient background, circular avatar, name, email, "Google Drive synced" with green dot
2. Account section: Google Account row, Google Drive Backup row, Currency row
3. Preferences section: Dark Theme toggle, Notifications toggle, Transaction Sounds toggle, Biometric Lock toggle
4. More section: Export Data row, Check for Updates row, Sign Out row
5. Settings item widget: reusable row with icon box, title, optional subtitle, and trailing (arrow / toggle / badge)
6. Grouped sections: first item has top-left/right radius 12, last item has bottom-left/right radius 12

---

> **COPY THIS PROMPT TO AI — Phase 12:**
>
> ```
> I am building a Flutter app. Create lib/presentation/screens/settings/widgets/settings_section.dart.
> It takes a String label and List<Widget> items.
> It renders: a small all-caps label (12px, text3, letter spacing 0.08) above a grouped list.
> The list items are wrapped in a Column where:
> - First child gets borderRadius top-left 12, top-right 12
> - Last child gets borderRadius bottom-left 12, bottom-right 12
> - Only-child gets borderRadius 12 on all corners
> - Adjacent items share a 1px border between them (no top on second item, etc.)
> Each item background: surface2 #1e2330, hover: surface3 #252b3a.
> Then create lib/presentation/screens/settings/widgets/settings_item.dart.
> It takes: iconBg Color, iconColor Color, iconName String, title String, subtitle String?,
> trailing Widget? (defaults to ti-chevron-right in text3).
> Layout: Row — icon box (34x34, border radius 9) + column(title 14px, subtitle 12px text3) + trailing.
> No emojis.
> ```

---

### Phase 13 — Notifications Panel

**Goal:** Slide-in notification panel with unread badges and "Mark all read".

**Files to create:**
- `lib/presentation/screens/notifications/notification_panel.dart`
- `lib/presentation/screens/notifications/widgets/notif_item.dart`
- `lib/data/models/notification_item.dart`
- `lib/data/providers/notification_provider.dart`

**Steps:**
1. Notification panel overlays the entire screen (absolute position)
2. Slide-in animation from top or fade-in
3. Header: back arrow (`ti-arrow-left`), title "Notifications", "Mark all read" in accent color
4. Each item: colored dot (accent/red/amber/green/teal by type), title, description, timestamp, unread mark circle
5. Unread count badge on the bell icon in the home screen header
6. `NotificationProvider` holds a list and tracks unread count

---

> **COPY THIS PROMPT TO AI — Phase 13:**
>
> ```
> I am building a Flutter app. Create lib/presentation/screens/notifications/notification_panel.dart.
> It is a full-screen overlay (using an AnimatedPositioned or a simple slide transition) that
> appears over the main content when the bell icon is tapped.
> Structure: Column with:
> - Header (paddingTop 56): ti-arrow-left icon, "Notifications" title (flex 1), "Mark all read" text in accent
> - Divider
> - ListView of NotifItem widgets
> Each NotifItem (lib/presentation/screens/notifications/widgets/notif_item.dart) has:
> - A small colored dot on the left (color depends on notif type)
> - Title in 14px bold, description in 12px text2, timestamp in 11px text3
> - A small unread circle on the right (8px accent, hidden when read)
> - onTap marks it as read
> NotificationItem model: id, title, description, timestamp, isRead, colorHex.
> NotificationProvider: List<NotificationItem> items, int get unreadCount,
> markRead(int id), markAllRead().
> No emojis. Use flutter_tabler_icons.
> ```

---

### Phase 14 — Google Drive Backup

**Goal:** Backup all user data to a JSON file in Google Drive App Data folder, and restore it.

**Files to create:**
- `lib/core/services/drive_service.dart`

**Steps:**
1. Use `extension_google_sign_in_as_googleapis_auth` to get an authenticated `http.Client`
2. Use `googleapis` `DriveApi` with `appdata` scope
3. `backupToDrive()`: serialize all accounts, transactions, loans, budgets to JSON, write to a file named `pocket_ledger_backup.json` in the `appDataFolder` space
4. `restoreFromDrive()`: download the file, parse JSON, insert all records into the local SQLite database
5. Show last backup timestamp in settings
6. Auto-backup option: trigger backup after every 10 new transactions

---

> **COPY THIS PROMPT TO AI — Phase 14:**
>
> ```
> I am building a Flutter app. I use google_sign_in and the googleapis package.
> Create lib/core/services/drive_service.dart with:
> - Future<void> backupToGoogleDrive(Map<String,dynamic> data, GoogleSignInAccount user)
>   This should: use extension_google_sign_in_as_googleapis_auth to get an authenticated client,
>   create a DriveApi, check if a file named "pocket_ledger_backup.json" already exists in
>   the appDataFolder, if yes update it (files.update), if no create it (files.create).
>   The file content is jsonEncode(data). Media type: application/json.
> - Future<Map<String,dynamic>?> restoreFromGoogleDrive(GoogleSignInAccount user)
>   This downloads the backup file and returns the parsed JSON map.
> Handle errors gracefully and return null if no backup exists.
> The appDataFolder scope is: https://www.googleapis.com/auth/drive.appdata
> ```

---

### Phase 15 — Export, Biometrics & Notifications

**Goal:** Export transactions to CSV/PDF/Excel, biometric lock, and local push notifications.

**Files to create:**
- `lib/core/services/export_service.dart`
- `lib/core/services/biometric_service.dart`
- `lib/core/services/notification_service.dart`
- `lib/presentation/screens/settings/widgets/export_sheet.dart`

**Steps:**
1. `ExportService`: build CSV string from transactions using the `csv` package, generate PDF using the `pdf` package, generate Excel using the `excel` package. Save to `getExternalStorageDirectory()` or prompt user with `path_provider`
2. Export sheet: bottom sheet with three option tiles (CSV, PDF, Excel), each with icon and description
3. `BiometricService`: wrap `local_auth`, check for availability, prompt with reason string "Unlock PocketLedger"
4. On app resume: if biometric is enabled in settings, show lock screen before allowing access
5. `NotificationService`: init `flutter_local_notifications`, create notification channel "pocket_ledger_alerts"
6. Schedule a loan reminder when a loan's `due_date` is within 7 days

---

> **COPY THIS PROMPT TO AI — Phase 15:**
>
> ```
> I am building a Flutter Android app. Create lib/core/services/export_service.dart with:
> - Future<File> exportToCsv(List<Transaction> transactions, List<Account> accounts, List<Category> categories)
>   Build a CSV with columns: Date, Description, Category, Account, Type, Amount
>   Use the csv package. Save to getExternalStorageDirectory()/PocketLedger/exports/.
>   Return the saved File.
> - Future<File> exportToPdf(List<Transaction> transactions, ...) using the pdf package.
>   Include: app name header, date range, summary (income/expenses/savings), then a table of transactions.
>   Use PdfColors for colors matching the app accent (#4f8ef7).
> - Future<File> exportToExcel(List<Transaction> transactions, ...) using the excel package.
>   One sheet named "Transactions" with a header row and data rows.
> All exports request WRITE_EXTERNAL_STORAGE permission via permission_handler first.
> ```

---

### Phase 16 — CI/CD & GitHub Release

**Goal:** Automated APK build on every version tag push.

**Files to create:**
- `.github/workflows/build.yml`
- `CHANGELOG.md`

**Steps:**
1. Create `.github/workflows/build.yml` using the full YAML provided in the [GitHub Actions Workflow](#github-deployment--cicd) section above
2. Add all five GitHub Secrets listed in the [Environment Variables & Secrets](#environment-variables--secrets) section
3. Test the pipeline: `git tag v0.1.0 && git push origin main --tags`
4. Confirm the APK appears in the repository's Releases page
5. Download and install the APK on a real Android device to verify the release build works

---

> **COPY THIS PROMPT TO AI — Phase 16:**
>
> ```
> I am building a Flutter Android app hosted on GitHub. I want to build and release an APK automatically.
> Generate a complete .github/workflows/build.yml that:
> 1. Triggers on push to tags matching v*
> 2. Uses ubuntu-latest runner
> 3. Sets up Java 17 (temurin) and Flutter 3.22.0 stable
> 4. Writes the google-services.json from a GitHub Secret called GOOGLE_SERVICES_JSON to android/app/google-services.json
> 5. Decodes KEYSTORE_BASE64 secret and writes to keystore/pocket_ledger.jks
> 6. Writes keystore/key.properties using secrets: KEYSTORE_PASSWORD, KEY_PASSWORD, KEY_ALIAS
> 7. Runs flutter pub get
> 8. Runs flutter test
> 9. Runs flutter build apk --release
> 10. Uploads build/app/outputs/flutter-apk/app-release.apk to a GitHub Release using
>     softprops/action-gh-release@v2 with GITHUB_TOKEN
> The release name should be "PocketLedger {tag}" and include a note to download and sideload the APK.
> ```

---

## Known Limitations

- The app targets Android only. iOS is not supported in this build.
- Google Drive backup is stored in the App Data folder, which is only accessible by this app. It cannot be viewed in Google Drive UI by the user.
- Scan Bill (QR/receipt scan) is shown in Quick Actions but is not implemented in Phase 1 — it is a placeholder that can be wired up using `mobile_scanner` in a future phase.
- Currency is fixed to LKR by default. The currency selector in Settings saves the preference but does not convert historical data.
- The app uses `minSdkVersion 24` (Android 7.0). Devices running Android 6 or earlier are not supported.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/loan-reminders`
3. Make your changes with meaningful commit messages
4. Run `flutter test` and ensure all tests pass
5. Open a pull request against `main`

Do not commit any file containing a private key, password, or `google-services.json`.

---

## License

MIT License. See `LICENSE` for details.

---

*Built for Sri Lankan users. Amounts in LKR. Design system based on PocketLedger_preview.html.*
