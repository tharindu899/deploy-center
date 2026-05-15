# PocketLedger — Money Manager
### Android APK — Full Build Guide

> Personal finance management app built with Flutter.
> Tracks transactions, accounts, loans, budgets, and analytics.
> Designed for Sri Lankan Rupee (LKR) with Google Drive cloud backup.

---

## Table of Contents

```
[1]  About the App
[2]  Design System
[3]  Tech Stack
[4]  Full Project Structure
[5]  Screens & Features
[6]  Data Models
[7]  Prerequisites
[8]  Installation & Local Setup
[9]  Running in Development
[10] Building the APK
[11] Signing & Release Build
[12] Google Play Store Deployment
[13] Build Phases — Step-by-Step Todo
[14] Cloud AI Free Tier — Copy-Paste Prompt Guide
[15] Environment & Secrets
[16] Third-Party Services Setup
[17] Troubleshooting
[18] License
```

---

## [1] About the App

PocketLedger is a personal money management Android application. It allows users to track
income, expenses, and transfers across multiple accounts, manage loans they have given or
received, set monthly budgets per category, and visualise spending with monthly bar charts
and category pie charts.

All data is stored locally on-device using the Hive embedded database. Users can optionally
sign in with their Google account to enable automatic Google Drive backup and restore.

The app supports a dark theme and a light theme, biometric lock, push notifications for
budget alerts and loan due-date reminders, bill scanning via the camera, and data export to
CSV, PDF, and Excel.

Currency is Sri Lankan Rupee (Rs. / LKR) by default, configurable in Settings.

---

## [2] Design System

### Color Tokens

| Token       | Dark Mode   | Light Mode  | Usage                        |
|-------------|-------------|-------------|------------------------------|
| --bg        | #0d0f14     | #f0f2f8     | Page background              |
| --surface   | #161a23     | #ffffff     | Cards, bottom nav, modals    |
| --surface2  | #1e2330     | #f5f7fc     | List items, pills            |
| --surface3  | #252b3a     | #eaedf5     | Hover states, progress bars  |
| --border    | rgba(255,255,255,0.07) | rgba(0,0,0,0.06) | Subtle borders  |
| --border2   | rgba(255,255,255,0.12) | rgba(0,0,0,0.10) | Strong borders  |
| --text1     | #f0f2f8     | #0d0f14     | Primary text                 |
| --text2     | #8a90a8     | #5a607a     | Secondary text               |
| --text3     | #555c75     | #9aa0b8     | Hints, labels, placeholders  |
| --accent    | #4f8ef7     | #3b6ef0     | Primary action, active nav   |
| --accent2   | #7b6cf7     | #6c52e8     | Gradient end, FAB            |
| --green     | #30d48a     | #18b870     | Income, lending, success     |
| --red       | #f05c6e     | #e03349     | Expense, borrowing, alert    |
| --amber     | #f5a623     | #d48c0a     | Loan due, warning, transfer  |
| --purple    | #a78bfa     | #7c5ccf     | Utilities, HNB account       |
| --teal      | #2dd4bf     | #0fa89a     | Education, eZ Cash, sync     |
| --pink      | #f472b6     | #d44d95     | Entertainment, mobile wallet |

### Typography

- Primary font: DM Sans (weights: 300, 400, 500, 600, 700)
- Mono font: DM Mono (weights: 400, 500) — used for balance amounts
- Fonts are bundled locally in assets/fonts/

### Icon Library

Tabler Icons v3.10.0 (line-style icons)
- ti-home-2           Navigation — Home
- ti-chart-pie        Navigation — Analytics
- ti-clock-dollar     Navigation — Loans
- ti-settings-2       Navigation — Settings
- ti-plus             FAB — Add transaction
- ti-trending-up      Income indicator
- ti-trending-down    Expense indicator
- ti-building-bank    Bank account
- ti-wallet           Wallet / Cash
- ti-arrows-exchange  Transfer
- ti-target           Budget
- ti-qrcode           Scan Bill
- ti-bell             Notifications
- ti-brand-google     Google Sign-In
- ti-cloud-upload     Google Drive backup
- ti-fingerprint      Biometric lock
- ti-download         Export data
- ti-logout           Sign out

### Border Radius Scale

| Name       | Value | Used on                              |
|------------|-------|--------------------------------------|
| radius     | 18px  | Balance card, chart cards, modals    |
| radius-sm  | 10px  | Transaction cards, icon buttons      |
| radius-xs  | 6px   | Badges, small chips                  |

---

## [3] Tech Stack

| Layer            | Technology                     | Version   | Notes                                       |
|------------------|-------------------------------|-----------|---------------------------------------------|
| Framework        | Flutter                       | 3.22+     | Stable channel                              |
| Language         | Dart                          | 3.4+      | Null-safe                                   |
| State Management | Riverpod                      | 2.5+      | Provider + AsyncNotifier pattern            |
| Local Database   | Hive                          | 2.2+      | NoSQL embedded, fast, no native deps        |
| Navigation       | go_router                     | 14.x      | Declarative routing                         |
| Charts           | fl_chart                      | 0.68+     | Bar chart, Donut/Pie chart                  |
| Icons            | flutter_tabler_icons           | latest    | Tabler icon set for Flutter                 |
| Fonts            | google_fonts OR bundled TTF   | —         | DM Sans, DM Mono                            |
| Auth             | google_sign_in                | 6.x       | Google OAuth 2.0                            |
| Drive Backup     | googleapis + extension_google | 8.x       | Google Drive REST API                       |
| Notifications    | flutter_local_notifications   | 17.x      | Local push, budget alerts, loan reminders   |
| Biometrics       | local_auth                    | 2.x       | Fingerprint, face unlock                    |
| Export           | pdf (dart pdf)                | 3.x       | PDF export                                  |
| Export           | excel                         | 4.x       | Excel export                                |
| Export           | csv                           | 5.x       | CSV export                                  |
| File Save        | path_provider + share_plus    | —         | Save/share exported files                   |
| Camera/Scan      | mobile_scanner                | 5.x       | QR/barcode scan for bills                   |
| Env Secrets      | flutter_dotenv                | 5.x       | Load .env at runtime                        |
| Code Quality     | very_good_analysis            | —         | Lint rules                                  |

### APK Build

| Tool             | Purpose                                               |
|------------------|-------------------------------------------------------|
| Flutter CLI      | flutter build apk --release                          |
| Gradle 8.x       | Android build system                                  |
| Android SDK 34   | Target API level                                      |
| Java 17          | Required by Gradle 8                                  |
| keytool          | Generate release signing keystore                     |

---

## [4] Full Project Structure

```
pocketledger/
|
+-- android/                              <- Android native project
|   +-- app/
|   |   +-- build.gradle                 <- App-level Gradle config, signingConfigs
|   |   +-- google-services.json         <- [ADD YOURSELF] Firebase/Google config
|   |   +-- src/
|   |       +-- main/
|   |       |   +-- AndroidManifest.xml  <- Permissions: INTERNET, CAMERA, BIOMETRIC
|   |       |   +-- kotlin/
|   |       |   |   +-- com/
|   |       |   |       +-- pocketledger/
|   |       |   |           +-- MainActivity.kt
|   |       |   +-- res/
|   |       |       +-- drawable/
|   |       |       |   +-- launch_background.xml
|   |       |       +-- mipmap-hdpi/
|   |       |       |   +-- ic_launcher.png       <- 72x72
|   |       |       +-- mipmap-mdpi/
|   |       |       |   +-- ic_launcher.png       <- 48x48
|   |       |       +-- mipmap-xhdpi/
|   |       |       |   +-- ic_launcher.png       <- 96x96
|   |       |       +-- mipmap-xxhdpi/
|   |       |       |   +-- ic_launcher.png       <- 144x144
|   |       |       +-- mipmap-xxxhdpi/
|   |       |       |   +-- ic_launcher.png       <- 192x192
|   |       |       +-- values/
|   |       |           +-- styles.xml            <- Splash theme
|   |       +-- debug/
|   |       |   +-- AndroidManifest.xml
|   |       +-- profile/
|   |           +-- AndroidManifest.xml
|   +-- build.gradle                     <- Project-level Gradle, google-services plugin
|   +-- gradle.properties                <- JVM args, AndroidX flags
|   +-- gradle/
|       +-- wrapper/
|           +-- gradle-wrapper.properties
|
+-- assets/
|   +-- fonts/
|   |   +-- DMSans-Light.ttf
|   |   +-- DMSans-Regular.ttf
|   |   +-- DMSans-Medium.ttf
|   |   +-- DMSans-SemiBold.ttf
|   |   +-- DMSans-Bold.ttf
|   |   +-- DMMono-Regular.ttf
|   |   +-- DMMono-Medium.ttf
|   +-- icons/
|   |   +-- app_icon.png                 <- 1024x1024 source icon
|   |   +-- app_icon_foreground.png      <- Adaptive icon foreground
|   +-- images/
|       +-- google_logo.png              <- Google sign-in button logo
|
+-- lib/
|   +-- main.dart                        <- App entry point, Hive init, env load
|   +-- app.dart                         <- MaterialApp.router, theme, locale
|   |
|   +-- core/
|   |   +-- constants/
|   |   |   +-- app_colors.dart          <- All color tokens (dark + light)
|   |   |   +-- app_text_styles.dart     <- DM Sans styles (h1-h6, body, caption)
|   |   |   +-- app_dimensions.dart      <- radius, spacing, icon sizes
|   |   |   +-- app_strings.dart         <- All string literals (i18n-ready)
|   |   |   +-- app_categories.dart      <- Category list with icon + color
|   |   +-- theme/
|   |   |   +-- app_theme.dart           <- ThemeData dark + light
|   |   |   +-- color_scheme.dart        <- ColorScheme definitions
|   |   +-- router/
|   |   |   +-- app_router.dart          <- go_router route definitions
|   |   |   +-- route_names.dart         <- Named route constants
|   |   +-- utils/
|   |       +-- currency_formatter.dart  <- formatRs(double) -> "Rs. 4,280.00"
|   |       +-- date_formatter.dart      <- "Today", "Yesterday", "May 11"
|   |       +-- validators.dart          <- Amount, date, name validators
|   |       +-- extensions.dart          <- DateTime, String, double extensions
|   |
|   +-- data/
|   |   +-- models/
|   |   |   +-- transaction.dart         <- @HiveType: id, amount, type, category, account, date, note
|   |   |   +-- transaction.g.dart       <- Hive generated adapter
|   |   |   +-- account.dart             <- @HiveType: id, name, type, balance, color, icon
|   |   |   +-- account.g.dart
|   |   |   +-- loan.dart                <- @HiveType: id, person, type(lend/borrow), amount, paid, dueDate
|   |   |   +-- loan.g.dart
|   |   |   +-- budget.dart              <- @HiveType: id, category, limit, month
|   |   |   +-- budget.g.dart
|   |   |   +-- category.dart            <- @HiveType: id, name, icon, color (custom categories)
|   |   |   +-- category.g.dart
|   |   |   +-- notification_item.dart   <- @HiveType: id, title, body, type, isRead, timestamp
|   |   |   +-- notification_item.g.dart
|   |   +-- repositories/
|   |   |   +-- transaction_repository.dart  <- CRUD on transactions Hive box
|   |   |   +-- account_repository.dart      <- CRUD on accounts box
|   |   |   +-- loan_repository.dart         <- CRUD on loans box
|   |   |   +-- budget_repository.dart       <- CRUD on budgets box
|   |   |   +-- notification_repository.dart <- CRUD on notifications box
|   |   +-- local/
|   |       +-- hive_service.dart        <- Open boxes, register adapters
|   |       +-- hive_boxes.dart          <- Box name constants
|   |
|   +-- providers/
|   |   +-- transaction_provider.dart    <- AsyncNotifier, filter by account/month
|   |   +-- account_provider.dart        <- Accounts list + totals
|   |   +-- loan_provider.dart           <- Loans, lend/borrow split
|   |   +-- budget_provider.dart         <- Budget vs actual by category
|   |   +-- theme_provider.dart          <- Dark/Light toggle, persisted to SharedPrefs
|   |   +-- notification_provider.dart   <- Unread count, mark-all-read
|   |   +-- auth_provider.dart           <- Google Sign-In state
|   |   +-- drive_provider.dart          <- Backup/restore state
|   |
|   +-- screens/
|   |   +-- shell/
|   |   |   +-- shell_screen.dart        <- Scaffold with bottom nav + FAB
|   |   |
|   |   +-- home/
|   |   |   +-- home_screen.dart         <- Dashboard root
|   |   |   +-- widgets/
|   |   |       +-- balance_card.dart    <- Gradient card, total balance, income/expense row
|   |   |       +-- account_pills.dart   <- Horizontal scrolling account filter pills
|   |   |       +-- quick_actions_grid.dart  <- 4-column grid: Expense, Income, Transfer, Loan, Bank Pay, Budget, Scan Bill, More
|   |   |       +-- tx_date_group.dart   <- Date header row ("Today — May 11", See All)
|   |   |       +-- tx_list_item.dart    <- Single transaction row card
|   |   |       +-- update_banner.dart   <- Version update strip at top
|   |   |
|   |   +-- analytics/
|   |   |   +-- analytics_screen.dart   <- Analytics root
|   |   |   +-- widgets/
|   |   |       +-- summary_row.dart    <- Income / Expenses / Savings 3-column cards
|   |   |       +-- monthly_bar_chart.dart   <- fl_chart BarChart, 6 months, red/accent bars
|   |   |       +-- category_donut_chart.dart <- fl_chart PieChart donut + legend
|   |   |       +-- month_selector.dart      <- Month picker chip + calendar icon
|   |   |
|   |   +-- loans/
|   |   |   +-- loans_screen.dart        <- Loans root
|   |   |   +-- add_loan_screen.dart     <- Form: person, amount, type, due date, note
|   |   |   +-- loan_detail_screen.dart  <- Loan detail + repayment history
|   |   |   +-- widgets/
|   |   |       +-- loan_card.dart       <- Person avatar, badge (Lending/Borrowing), amount, progress bar
|   |   |       +-- loan_section_header.dart  <- "They Owe You" / "You Owe"
|   |   |
|   |   +-- accounts/
|   |   |   +-- accounts_screen.dart     <- Accounts root
|   |   |   +-- add_account_screen.dart  <- Form: name, type, opening balance, color
|   |   |   +-- account_detail_screen.dart  <- Account transactions
|   |   |   +-- widgets/
|   |   |       +-- account_card.dart    <- Icon, name, type, balance
|   |   |       +-- net_worth_card.dart  <- Net worth + account count
|   |   |
|   |   +-- settings/
|   |   |   +-- settings_screen.dart     <- Settings root
|   |   |   +-- widgets/
|   |   |       +-- profile_banner.dart  <- Avatar initials, name, email, Drive sync dot
|   |   |       +-- settings_section.dart     <- Section with label + grouped items
|   |   |       +-- settings_item.dart        <- Icon, title, subtitle, toggle or chevron
|   |   |       +-- settings_toggle_item.dart <- Settings item with switch
|   |   |
|   |   +-- notifications/
|   |   |   +-- notifications_screen.dart  <- Full-screen notification panel
|   |   |   +-- widgets/
|   |   |       +-- notification_item.dart <- Dot color, title, body, timestamp, unread mark
|   |   |
|   |   +-- add_transaction/
|   |   |   +-- add_transaction_sheet.dart   <- Bottom sheet modal
|   |   |   +-- widgets/
|   |   |       +-- type_tab_row.dart         <- Expense / Income / Transfer tabs
|   |   |       +-- amount_input.dart         <- "Rs." prefix + number field
|   |   |       +-- field_selector_row.dart   <- Category + Account selectors
|   |   |       +-- category_grid.dart        <- 4-col grid of category chips
|   |   |       +-- save_button.dart          <- Gradient save button
|   |   |
|   |   +-- budget/
|   |   |   +-- budget_screen.dart        <- Budget list by category
|   |   |   +-- add_budget_screen.dart    <- Set monthly limit per category
|   |   |   +-- widgets/
|   |   |       +-- budget_progress_card.dart <- Category, limit, spent, progress bar
|   |   |
|   |   +-- scan_bill/
|   |       +-- scan_bill_screen.dart     <- mobile_scanner camera view, parse amount
|   |
|   +-- widgets/
|   |   +-- shared/
|   |   |   +-- app_bottom_nav.dart       <- 5-tab nav with centre FAB cutout
|   |   |   +-- app_icon_button.dart      <- 36x36 surface2 rounded button
|   |   |   +-- app_toggle.dart           <- iOS-style toggle switch
|   |   |   +-- app_avatar.dart           <- Initials avatar with gradient
|   |   |   +-- app_badge.dart            <- Notification badge overlay
|   |   |   +-- section_label.dart        <- ALL CAPS 12px letter-spaced label
|   |   |   +-- gradient_button.dart      <- Full-width accent gradient button
|   |   |   +-- empty_state.dart          <- Icon + message for empty lists
|   |   +-- charts/
|   |       +-- bar_chart_widget.dart     <- Wraps fl_chart BarChart with PL styling
|   |       +-- donut_chart_widget.dart   <- Wraps fl_chart PieChart with legend
|   |
|   +-- services/
|       +-- google_auth_service.dart      <- GoogleSignIn instance, signIn, signOut
|       +-- google_drive_service.dart     <- Upload/download Hive backup file to Drive
|       +-- notification_service.dart     <- flutter_local_notifications setup, schedule
|       +-- biometric_service.dart        <- local_auth canCheck, authenticate
|       +-- export_service.dart           <- Build PDF/Excel/CSV from transactions
|       +-- bill_scan_service.dart        <- Parse scanned QR/barcode into amount
|
+-- test/
|   +-- unit/
|   |   +-- models/
|   |   |   +-- transaction_test.dart
|   |   |   +-- account_test.dart
|   |   |   +-- loan_test.dart
|   |   +-- providers/
|   |   |   +-- transaction_provider_test.dart
|   |   |   +-- account_provider_test.dart
|   |   +-- utils/
|   |       +-- currency_formatter_test.dart
|   |       +-- date_formatter_test.dart
|   +-- widget/
|       +-- balance_card_test.dart
|       +-- tx_list_item_test.dart
|       +-- loan_card_test.dart
|
+-- .env                                  <- GOOGLE_CLIENT_ID, etc. (never commit)
+-- .env.example                          <- Template with placeholder values
+-- .gitignore
+-- analysis_options.yaml                 <- Dart linting rules
+-- pubspec.yaml                          <- All dependencies + assets declaration
+-- pubspec.lock                          <- Locked versions
+-- keystore/
|   +-- pocketledger.jks                  <- [NEVER COMMIT] Release signing key
+-- key.properties                        <- [NEVER COMMIT] Keystore path + passwords
+-- README.md
```

---

## [5] Screens & Features

### Screen 1 — Home (Dashboard)

- Header: greeting ("Good morning, Kasun Perera"), notification bell with badge, avatar initials
- Update banner: new version strip with Update button
- Balance card: gradient dark-navy card, total balance (Rs. 485,320.00), income + expense summary chips
- Account pills: horizontal scrollable filter — All, BOC Bank, Cash, HNB Savings, eZ Cash, + Add
- Quick actions 4-column grid: Expense, Income, Transfer, Loan, Bank Pay, Budget, Scan Bill, More
- Transaction list grouped by date: date header with "See All" link, transaction cards

Transaction card fields: icon (category colour), name, category + account meta, amount (green=income, red=expense, accent=transfer)

### Screen 2 — Analytics

- Month selector chip (e.g., "May 2025") + calendar icon
- Summary row: Income (green), Expenses (red), Savings (accent) — 3 equal cards
- Monthly overview bar chart: 6-month bars, red for past months, accent for current
- Spending by category donut chart: Food (red), Shopping (amber), Transport (green), Utilities (purple) + legend with percentages

### Screen 3 — Loans

- Two sections: "They Owe You" (Lending — green) and "You Owe" (Borrowing — red)
- Loan card: person initials avatar with gradient, name, type/due-date, Lending/Borrowing badge
- Amount, repayment progress bar, Paid vs Remaining row

Sample data:
- Ranil Mendis — Lending — Rs. 25,000 — 40% repaid — Due Jun 30
- Saman Kumara — Lending — Rs. 20,000 — 0% repaid — Due Jul 15
- People's Bank — Borrowing — Rs. 120,000 — 65% repaid — Personal Loan 18% p.a.

### Screen 4 — Accounts (accessible via side/modal or quick action)

- Net Worth card + account count
- Bank Accounts section: BOC Bank (Current ••4821, Rs. 320,000), HNB Savings (••9034, Rs. 80,000)
- Wallets section: Cash Wallet (Rs. 85,000), eZ Cash mobile wallet (Rs. 320)
- Dashed "Add New Account" card at bottom

### Screen 5 — Settings

- Profile banner: gradient dark, avatar initials, name, email, Google Drive sync status dot
- Account section: Google Account, Google Drive Backup (last synced), Currency (LKR)
- Preferences section: Dark Theme (toggle on), Notifications (toggle on), Transaction Sounds (toggle on), Biometric Lock (toggle off)
- More section: Export Data (CSV, PDF, Excel), Check for Updates (badge "New", v2.3.1), Sign Out

### Notification Panel (slide-in overlay)

- Back arrow + "Notifications" heading + "Mark all read"
- Notification types with colour-coded dots:
  - Accent dot: New Update v2.4.0
  - Red dot: Budget Alert — Entertainment exceeded by Rs. 200
  - Amber dot: Loan Due Reminder — Ranil Mendis Rs. 5,000 in 7 days
  - Green dot: Salary Received Rs. 82,000 to BOC Bank
  - Teal dot: Google Drive Synced

### Add Transaction Modal (bottom sheet)

- Drag handle at top
- Type tabs: Expense (sel-exp, red), Income (sel-inc, green), Transfer (sel-xfer, accent)
- Amount input: "Rs." prefix + number field
- Field row: Category selector + Account selector
- Category grid (4 columns): Food, Transport, Shopping, Health, Utilities, Entertainment, Education, Other
- Save Transaction gradient button

---

## [6] Data Models

### Transaction

```dart
@HiveType(typeId: 0)
class Transaction {
  @HiveField(0) String id;
  @HiveField(1) double amount;
  @HiveField(2) String type;        // 'expense' | 'income' | 'transfer'
  @HiveField(3) String categoryId;
  @HiveField(4) String accountId;
  @HiveField(5) String? toAccountId; // for transfers
  @HiveField(6) DateTime date;
  @HiveField(7) String? note;
}
```

### Account

```dart
@HiveType(typeId: 1)
class Account {
  @HiveField(0) String id;
  @HiveField(1) String name;
  @HiveField(2) String type;        // 'bank' | 'cash' | 'mobile_wallet' | 'credit'
  @HiveField(3) double balance;
  @HiveField(4) int colorHex;
  @HiveField(5) String iconName;
  @HiveField(6) String? lastFourDigits;
}
```

### Loan

```dart
@HiveType(typeId: 2)
class Loan {
  @HiveField(0) String id;
  @HiveField(1) String personName;
  @HiveField(2) String loanType;    // 'lend' | 'borrow'
  @HiveField(3) double totalAmount;
  @HiveField(4) double paidAmount;
  @HiveField(5) DateTime? dueDate;
  @HiveField(6) String? note;       // "Emergency", "Personal Loan 18% p.a."
  @HiveField(7) DateTime createdAt;
}
```

### Budget

```dart
@HiveType(typeId: 3)
class Budget {
  @HiveField(0) String id;
  @HiveField(1) String categoryId;
  @HiveField(2) double monthlyLimit;
  @HiveField(3) int month;          // 1-12
  @HiveField(4) int year;
}
```

### Category

```dart
@HiveType(typeId: 4)
class Category {
  @HiveField(0) String id;
  @HiveField(1) String name;
  @HiveField(2) String iconName;
  @HiveField(3) int colorHex;
  @HiveField(4) bool isDefault;     // default categories cannot be deleted
}
```

Default categories: Food, Transport, Shopping, Health, Utilities, Entertainment, Education, Other

---

## [7] Prerequisites

Install the following on your development machine before starting.

### Flutter SDK

```
Version required: 3.22.x or higher (stable channel)
Download: https://docs.flutter.dev/get-started/install
```

Verify:
```
flutter --version
flutter doctor
```

All items in flutter doctor should show a green check except iOS tools (not needed for Android APK).

### Android Studio

```
Version: Hedgehog (2023.1.1) or newer
Download: https://developer.android.com/studio
```

During install, also install:
- Android SDK (API 34 / Android 14)
- Android SDK Build-Tools 34.0.0
- Android SDK Platform-Tools

Accept SDK licenses:
```
flutter doctor --android-licenses
```

### Java 17

Android Gradle Plugin 8.x requires Java 17.
```
Check: java -version
Install (macOS): brew install openjdk@17
Install (Ubuntu): sudo apt install openjdk-17-jdk
Install (Windows): Use SDKMAN or download from adoptium.net
```

Set JAVA_HOME to the Java 17 installation.

### Git

```
git --version
```

### Cloud AI accounts (free tier — for development assistance)

You need at least one of these free-tier accounts to use the AI prompt guide in Section [14]:
- Claude.ai — claude.ai (Free plan)
- Google Gemini — gemini.google.com (Free)
- ChatGPT — chat.openai.com (Free, GPT-4o mini)

---

## [8] Installation & Local Setup

### Step 1 — Create the Flutter project

```
flutter create pocketledger --org com.yourname --platforms android
cd pocketledger
```

### Step 2 — Replace pubspec.yaml

Replace the content of pubspec.yaml with:

```yaml
name: pocketledger
description: Personal money manager — PocketLedger
publish_to: none
version: 1.0.0+1

environment:
  sdk: '>=3.4.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

  # State management
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.5

  # Navigation
  go_router: ^14.2.1

  # Local database
  hive: ^2.2.3
  hive_flutter: ^1.1.0

  # Charts
  fl_chart: ^0.68.0

  # Icons
  flutter_tabler_icons: ^1.3.0

  # Fonts
  google_fonts: ^6.2.1

  # Auth + Drive
  google_sign_in: ^6.2.1
  googleapis: ^13.2.0
  extension_google_sign_in_as_googleapis_auth: ^2.0.12

  # Notifications
  flutter_local_notifications: ^17.2.2
  timezone: ^0.9.4

  # Biometrics
  local_auth: ^2.3.0

  # Export
  pdf: ^3.11.1
  excel: ^4.0.6
  csv: ^6.0.0

  # File system
  path_provider: ^2.1.4
  share_plus: ^10.0.2

  # Bill scan
  mobile_scanner: ^5.2.3

  # Environment
  flutter_dotenv: ^5.2.1

  # Utilities
  uuid: ^4.4.2
  intl: ^0.19.0
  shared_preferences: ^2.3.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  build_runner: ^2.4.12
  hive_generator: ^2.0.1
  riverpod_generator: ^2.4.3
  flutter_lints: ^4.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/fonts/
    - assets/icons/
    - assets/images/
    - .env
  fonts:
    - family: DMSans
      fonts:
        - asset: assets/fonts/DMSans-Light.ttf
          weight: 300
        - asset: assets/fonts/DMSans-Regular.ttf
          weight: 400
        - asset: assets/fonts/DMSans-Medium.ttf
          weight: 500
        - asset: assets/fonts/DMSans-SemiBold.ttf
          weight: 600
        - asset: assets/fonts/DMSans-Bold.ttf
          weight: 700
    - family: DMMono
      fonts:
        - asset: assets/fonts/DMMono-Regular.ttf
          weight: 400
        - asset: assets/fonts/DMMono-Medium.ttf
          weight: 500
```

### Step 3 — Get dependencies

```
flutter pub get
```

### Step 4 — Download DM Sans and DM Mono fonts

Download from Google Fonts:
- https://fonts.google.com/specimen/DM+Sans  (download the TTF files)
- https://fonts.google.com/specimen/DM+Mono  (download the TTF files)

Place the .ttf files in: assets/fonts/

Required files:
```
assets/fonts/DMSans-Light.ttf
assets/fonts/DMSans-Regular.ttf
assets/fonts/DMSans-Medium.ttf
assets/fonts/DMSans-SemiBold.ttf
assets/fonts/DMSans-Bold.ttf
assets/fonts/DMMono-Regular.ttf
assets/fonts/DMMono-Medium.ttf
```

### Step 5 — Create .env file

```
touch .env
```

Content:
```
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

Create .env.example:
```
GOOGLE_CLIENT_ID=REPLACE_WITH_YOUR_CLIENT_ID
```

### Step 6 — Add to .gitignore

```
# Secrets
.env
key.properties
keystore/
*.jks
google-services.json
```

### Step 7 — Generate Hive adapters

After creating all model files in lib/data/models/, run:

```
flutter pub run build_runner build --delete-conflicting-outputs
```

This generates the .g.dart adapter files.

### Step 8 — Android permissions in AndroidManifest.xml

File: android/app/src/main/AndroidManifest.xml

Add inside the <manifest> tag, before <application>:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.USE_BIOMETRIC"/>
<uses-permission android:name="android.permission.USE_FINGERPRINT"/>
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
<uses-permission android:name="android.permission.VIBRATE"/>
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
```

For biometrics, add inside <activity>:
```xml
<meta-data
  android:name="flutterEmbedding"
  android:value="2" />
```

### Step 9 — Configure Google Sign-In

1. Go to https://console.cloud.google.com
2. Create a new project: "PocketLedger"
3. Enable APIs: Google Drive API, Google Sign-In
4. Create OAuth 2.0 credentials — Android application
5. Enter your package name: com.yourname.pocketledger
6. Get SHA-1 fingerprint: keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
7. Download google-services.json
8. Place it at: android/app/google-services.json

Add to android/build.gradle (project level), under buildscript > dependencies:
```groovy
classpath 'com.google.gms:google-services:4.4.2'
```

Add to android/app/build.gradle (app level), at the bottom:
```groovy
apply plugin: 'com.google.gms.google-services'
```

---

## [9] Running in Development

### Connect a device

Option A — Physical Android phone:
1. Enable Developer Options on phone (tap Build Number 7 times)
2. Enable USB Debugging
3. Connect via USB
4. Accept the RSA key prompt on phone

Option B — Android Emulator:
1. Open Android Studio > Device Manager > Create Virtual Device
2. Choose Pixel 6 or newer, API 34
3. Start the emulator

Verify device is detected:
```
flutter devices
```

### Run the app

```
flutter run
```

For hot reload during development: press r in the terminal
For hot restart: press R
To quit: press q

### Run on specific device

```
flutter run -d emulator-5554
flutter run -d <device-id>
```

---

## [10] Building the APK

### Debug APK (for testing, no signing needed)

```
flutter build apk --debug
```

Output: build/app/outputs/flutter-apk/app-debug.apk

Install directly to connected device:
```
flutter install
```

Or manually copy to device and install (enable "Install from Unknown Sources" in phone settings).

### Release APK (unsigned — for internal testing only)

```
flutter build apk --release
```

Output: build/app/outputs/flutter-apk/app-release.apk

Note: This will not install on real devices unless signed (see Section [11]).

### Split APKs by ABI (smaller file sizes)

```
flutter build apk --split-per-abi --release
```

Output (3 smaller APKs):
```
build/app/outputs/flutter-apk/app-armeabi-v7a-release.apk    <- old 32-bit phones
build/app/outputs/flutter-apk/app-arm64-v8a-release.apk      <- most modern phones
build/app/outputs/flutter-apk/app-x86_64-release.apk         <- emulators
```

For most real phones, use: app-arm64-v8a-release.apk

### App Bundle (for Play Store)

```
flutter build appbundle --release
```

Output: build/app/outputs/bundle/release/app-release.aab

---

## [11] Signing & Release Build

The release APK must be signed with your keystore before it will install on real devices and before it can be uploaded to the Play Store.

### Step 1 — Create a keystore

Run this command once. Keep the generated .jks file permanently and securely.

```
keytool -genkey -v \
  -keystore keystore/pocketledger.jks \
  -alias pocketledger \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

You will be prompted for:
- Keystore password (remember this — loss = cannot update app on Play Store)
- Key password
- Your name, organisation, city, country

Create the keystore/ directory first: mkdir keystore

### Step 2 — Create key.properties

Create file at the root of the project (same level as pubspec.yaml):

File: key.properties
```
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=pocketledger
storeFile=../../keystore/pocketledger.jks
```

The path in storeFile is relative to android/app/build.gradle.

### Step 3 — Reference key.properties in build.gradle

File: android/app/build.gradle

Add before the android { block:
```groovy
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('../../key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Inside the android { block, add:
```groovy
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
        storePassword keystoreProperties['storePassword']
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### Step 4 — Build signed release APK

```
flutter build apk --release
```

The output APK is now signed and ready to install on any Android device.

---

## [12] Google Play Store Deployment

### Prerequisites

- Google Play Developer account: play.google.com/console
- One-time fee: USD 25

### App icon requirements

- 512x512 PNG, no alpha channel
- Place source at: assets/icons/app_icon.png
- Use flutter_launcher_icons package to auto-generate all sizes:

Add to pubspec.yaml dev_dependencies:
```yaml
flutter_launcher_icons: ^0.13.1
```

Add to pubspec.yaml root level:
```yaml
flutter_launcher_icons:
  android: true
  ios: false
  image_path: "assets/icons/app_icon.png"
  adaptive_icon_background: "#0d0f14"
  adaptive_icon_foreground: "assets/icons/app_icon_foreground.png"
```

Run:
```
flutter pub run flutter_launcher_icons
```

### Play Store listing requirements

| Asset            | Size / Format                          |
|------------------|----------------------------------------|
| App icon         | 512x512 PNG                            |
| Feature graphic  | 1024x500 PNG or JPG                    |
| Screenshots      | Min 2, max 8 per device type           |
| Phone screenshot | Between 320px and 3840px, ratio 9:16   |
| Short description| Max 80 characters                      |
| Full description | Max 4000 characters                    |

Suggested short description:
"Track expenses, accounts, loans and budgets — all offline, backed up to Drive."

### Upload steps

1. Go to play.google.com/console
2. Create app — Android — Free
3. Fill store listing (title, description, screenshots, icon, feature graphic)
4. Content rating — complete the questionnaire (Finance, no violence/gambling)
5. Target audience — 18+
6. App access — all users can access all features
7. Go to Production > Create new release
8. Upload the app-release.aab (app bundle, not APK)
9. Write release notes
10. Review and rollout

### Version management

Each new release must have a higher versionCode.

File: pubspec.yaml
```yaml
version: 1.0.0+1
# format: MAJOR.MINOR.PATCH+BUILD_NUMBER
# BUILD_NUMBER must strictly increase with every Play Store upload
```

Example progression:
```
version: 1.0.0+1   <- first release
version: 1.0.1+2   <- bug fix
version: 1.1.0+3   <- minor feature
version: 2.0.0+4   <- major release
```

---

## [13] Build Phases — Step-by-Step Todo

Each phase lists the exact files to create or modify. Use the Cloud AI prompts in Section [14] to generate the code for each file.

---

### PHASE 1 — Project Scaffolding

Goal: Working Flutter app skeleton with correct folder structure and dependencies.

```
[ ] flutter create pocketledger --org com.yourname --platforms android
[ ] Replace pubspec.yaml with the version from Section [8] Step 2
[ ] Run: flutter pub get
[ ] Download DM Sans + DM Mono fonts, place in assets/fonts/
[ ] Create file: .env
[ ] Create file: .env.example
[ ] Create file: .gitignore
[ ] Create directory structure as shown in Section [4]
```

Files to create in Phase 1:
```
pubspec.yaml                     (replace existing)
.env                             (add secrets)
.env.example                     (template)
.gitignore                       (add secrets to ignore list)
assets/fonts/DMSans-*.ttf        (download and place)
assets/fonts/DMMono-*.ttf        (download and place)
```

---

### PHASE 2 — Core Constants & Theme

Goal: Define all design tokens (colours, fonts, spacing) and both dark/light themes.

```
[ ] Create: lib/core/constants/app_colors.dart
[ ] Create: lib/core/constants/app_text_styles.dart
[ ] Create: lib/core/constants/app_dimensions.dart
[ ] Create: lib/core/constants/app_strings.dart
[ ] Create: lib/core/constants/app_categories.dart
[ ] Create: lib/core/theme/app_theme.dart
[ ] Create: lib/core/theme/color_scheme.dart
[ ] Create: lib/core/utils/currency_formatter.dart
[ ] Create: lib/core/utils/date_formatter.dart
[ ] Create: lib/core/utils/validators.dart
[ ] Create: lib/core/utils/extensions.dart
```

---

### PHASE 3 — Data Models & Local Database

Goal: Hive models for all data types, adapters generated, database initialised.

```
[ ] Create: lib/data/models/transaction.dart
[ ] Create: lib/data/models/account.dart
[ ] Create: lib/data/models/loan.dart
[ ] Create: lib/data/models/budget.dart
[ ] Create: lib/data/models/category.dart
[ ] Create: lib/data/models/notification_item.dart
[ ] Run: flutter pub run build_runner build --delete-conflicting-outputs
[ ]   (This generates all .g.dart files automatically)
[ ] Create: lib/data/local/hive_service.dart
[ ] Create: lib/data/local/hive_boxes.dart
[ ] Create: lib/data/repositories/transaction_repository.dart
[ ] Create: lib/data/repositories/account_repository.dart
[ ] Create: lib/data/repositories/loan_repository.dart
[ ] Create: lib/data/repositories/budget_repository.dart
[ ] Create: lib/data/repositories/notification_repository.dart
```

---

### PHASE 4 — State Management (Providers)

Goal: Riverpod providers for all data, theme state, and auth state.

```
[ ] Create: lib/providers/transaction_provider.dart
[ ] Create: lib/providers/account_provider.dart
[ ] Create: lib/providers/loan_provider.dart
[ ] Create: lib/providers/budget_provider.dart
[ ] Create: lib/providers/theme_provider.dart
[ ] Create: lib/providers/notification_provider.dart
[ ] Create: lib/providers/auth_provider.dart
[ ] Create: lib/providers/drive_provider.dart
```

---

### PHASE 5 — Navigation & Shell

Goal: go_router configuration, bottom nav, FAB, shell scaffold.

```
[ ] Create: lib/core/router/route_names.dart
[ ] Create: lib/core/router/app_router.dart
[ ] Create: lib/screens/shell/shell_screen.dart
[ ] Create: lib/widgets/shared/app_bottom_nav.dart
[ ] Update: lib/main.dart              (Hive init, env load, ProviderScope)
[ ] Update: lib/app.dart               (MaterialApp.router, theme provider)
```

---

### PHASE 6 — Shared Widgets

Goal: Reusable UI components used across all screens.

```
[ ] Create: lib/widgets/shared/app_icon_button.dart
[ ] Create: lib/widgets/shared/app_toggle.dart
[ ] Create: lib/widgets/shared/app_avatar.dart
[ ] Create: lib/widgets/shared/app_badge.dart
[ ] Create: lib/widgets/shared/section_label.dart
[ ] Create: lib/widgets/shared/gradient_button.dart
[ ] Create: lib/widgets/shared/empty_state.dart
[ ] Create: lib/widgets/charts/bar_chart_widget.dart
[ ] Create: lib/widgets/charts/donut_chart_widget.dart
```

---

### PHASE 7 — Screens (one screen at a time)

#### Phase 7a — Home Screen

```
[ ] Create: lib/screens/home/home_screen.dart
[ ] Create: lib/screens/home/widgets/balance_card.dart
[ ] Create: lib/screens/home/widgets/account_pills.dart
[ ] Create: lib/screens/home/widgets/quick_actions_grid.dart
[ ] Create: lib/screens/home/widgets/tx_date_group.dart
[ ] Create: lib/screens/home/widgets/tx_list_item.dart
[ ] Create: lib/screens/home/widgets/update_banner.dart
```

#### Phase 7b — Add Transaction Modal

```
[ ] Create: lib/screens/add_transaction/add_transaction_sheet.dart
[ ] Create: lib/screens/add_transaction/widgets/type_tab_row.dart
[ ] Create: lib/screens/add_transaction/widgets/amount_input.dart
[ ] Create: lib/screens/add_transaction/widgets/field_selector_row.dart
[ ] Create: lib/screens/add_transaction/widgets/category_grid.dart
[ ] Create: lib/screens/add_transaction/widgets/save_button.dart
```

#### Phase 7c — Analytics Screen

```
[ ] Create: lib/screens/analytics/analytics_screen.dart
[ ] Create: lib/screens/analytics/widgets/summary_row.dart
[ ] Create: lib/screens/analytics/widgets/monthly_bar_chart.dart
[ ] Create: lib/screens/analytics/widgets/category_donut_chart.dart
[ ] Create: lib/screens/analytics/widgets/month_selector.dart
```

#### Phase 7d — Loans Screen

```
[ ] Create: lib/screens/loans/loans_screen.dart
[ ] Create: lib/screens/loans/add_loan_screen.dart
[ ] Create: lib/screens/loans/loan_detail_screen.dart
[ ] Create: lib/screens/loans/widgets/loan_card.dart
[ ] Create: lib/screens/loans/widgets/loan_section_header.dart
```

#### Phase 7e — Accounts Screen

```
[ ] Create: lib/screens/accounts/accounts_screen.dart
[ ] Create: lib/screens/accounts/add_account_screen.dart
[ ] Create: lib/screens/accounts/account_detail_screen.dart
[ ] Create: lib/screens/accounts/widgets/account_card.dart
[ ] Create: lib/screens/accounts/widgets/net_worth_card.dart
```

#### Phase 7f — Notifications Screen

```
[ ] Create: lib/screens/notifications/notifications_screen.dart
[ ] Create: lib/screens/notifications/widgets/notification_item.dart
```

#### Phase 7g — Settings Screen

```
[ ] Create: lib/screens/settings/settings_screen.dart
[ ] Create: lib/screens/settings/widgets/profile_banner.dart
[ ] Create: lib/screens/settings/widgets/settings_section.dart
[ ] Create: lib/screens/settings/widgets/settings_item.dart
[ ] Create: lib/screens/settings/widgets/settings_toggle_item.dart
```

#### Phase 7h — Budget Screen

```
[ ] Create: lib/screens/budget/budget_screen.dart
[ ] Create: lib/screens/budget/add_budget_screen.dart
[ ] Create: lib/screens/budget/widgets/budget_progress_card.dart
```

#### Phase 7i — Scan Bill Screen

```
[ ] Create: lib/screens/scan_bill/scan_bill_screen.dart
[ ] Create: lib/services/bill_scan_service.dart
```

---

### PHASE 8 — Services & Integrations

Goal: Connect Google Sign-In, Drive backup, local notifications, biometrics, export.

```
[ ] Create: lib/services/google_auth_service.dart
[ ] Create: lib/services/google_drive_service.dart
[ ] Create: lib/services/notification_service.dart
[ ] Create: lib/services/biometric_service.dart
[ ] Create: lib/services/export_service.dart
[ ] Configure google-services.json in android/app/
[ ] Update: android/app/src/main/AndroidManifest.xml (permissions)
[ ] Update: android/build.gradle (google-services plugin)
[ ] Update: android/app/build.gradle (apply google-services)
```

---

### PHASE 9 — App Icon & Splash Screen

Goal: Replace default Flutter icon and splash with PocketLedger branding.

```
[ ] Design app_icon.png (1024x1024, dark navy #0d0f14, accent blue ledger icon)
[ ] Design app_icon_foreground.png (adaptive icon foreground layer)
[ ] Add flutter_launcher_icons to pubspec.yaml dev_dependencies
[ ] Add flutter_launcher_icons config section to pubspec.yaml
[ ] Run: flutter pub run flutter_launcher_icons
[ ] Add flutter_native_splash to pubspec.yaml for splash screen
[ ] Run: flutter pub run flutter_native_splash:create
```

---

### PHASE 10 — Signing & APK Build

Goal: Signed release APK ready to install and distribute.

```
[ ] Run: mkdir keystore
[ ] Run: keytool -genkey ... (see Section [11] Step 1)
[ ] Create: key.properties (see Section [11] Step 2)
[ ] Update: android/app/build.gradle (see Section [11] Step 3)
[ ] Add key.properties and keystore/ to .gitignore
[ ] Run: flutter build apk --release --split-per-abi
[ ] Test install app-arm64-v8a-release.apk on real device
```

---

### PHASE 11 — Testing

Goal: Unit tests for models, providers, and utilities; widget tests for key components.

```
[ ] Create: test/unit/models/transaction_test.dart
[ ] Create: test/unit/models/account_test.dart
[ ] Create: test/unit/models/loan_test.dart
[ ] Create: test/unit/providers/transaction_provider_test.dart
[ ] Create: test/unit/providers/account_provider_test.dart
[ ] Create: test/unit/utils/currency_formatter_test.dart
[ ] Create: test/unit/utils/date_formatter_test.dart
[ ] Create: test/widget/balance_card_test.dart
[ ] Create: test/widget/tx_list_item_test.dart
[ ] Create: test/widget/loan_card_test.dart
[ ] Run: flutter test
```

---

### PHASE 12 — Play Store Release

Goal: Publish to Google Play Store.

```
[ ] Build: flutter build appbundle --release
[ ] Create Play Console developer account (play.google.com/console, USD 25 fee)
[ ] Create app listing in Play Console
[ ] Upload screenshots (phone, tablet)
[ ] Upload app-release.aab
[ ] Complete content rating questionnaire
[ ] Submit for review (typically 1-3 days for first release)
```

---

## [14] Cloud AI Free Tier — Copy-Paste Prompt Guide

Use these prompts with Claude (claude.ai), Gemini (gemini.google.com), or ChatGPT
(chat.openai.com) — all on the free tier. Paste one prompt per conversation session.
Copy the generated code directly into the file path shown.

Important: Always start a new conversation for each file. Carry over context by pasting
the relevant model definitions at the top of the prompt when they are needed.

---

### Prompt 01 — app_colors.dart

Target file: lib/core/constants/app_colors.dart

```
I am building a Flutter money manager app called PocketLedger. Create the file
lib/core/constants/app_colors.dart with a class AppColors containing static const
Color fields for both dark mode and light mode.

Dark mode values:
bg: 0xFF0d0f14, surface: 0xFF161a23, surface2: 0xFF1e2330, surface3: 0xFF252b3a,
border: Color(0x12FFFFFF), border2: Color(0x1FFFFFFF),
text1: 0xFFf0f2f8, text2: 0xFF8a90a8, text3: 0xFF555c75,
accent: 0xFF4f8ef7, accent2: 0xFF7b6cf7,
green: 0xFF30d48a, red: 0xFFf05c6e, amber: 0xFFf5a623,
purple: 0xFFa78bfa, teal: 0xFF2dd4bf, pink: 0xFFf472b6

Light mode values:
bg: 0xFFf0f2f8, surface: 0xFFffffff, surface2: 0xFFf5f7fc, surface3: 0xFFeaedf5,
text1: 0xFF0d0f14, text2: 0xFF5a607a, text3: 0xFF9aa0b8,
accent: 0xFF3b6ef0, accent2: 0xFF6c52e8,
green: 0xFF18b870, red: 0xFFe03349, amber: 0xFFd48c0a,
purple: 0xFF7c5ccf, teal: 0xFF0fa89a, pink: 0xFFd44d95

Also add static LinearGradient balanceCardGradientDark and balanceCardGradientLight.
Dark gradient: #1a2340 -> #0f1a38 -> #1a1040 at 135deg.
Light gradient: #3b6ef0 -> #6c52e8 at 135deg.
Add accentGradient: accent -> accent2 at 135deg (used on FAB and save button).
Use Flutter's Color class and LinearGradient. No emojis. Dart null-safe syntax.
```

---

### Prompt 02 — app_text_styles.dart

Target file: lib/core/constants/app_text_styles.dart

```
Create the file lib/core/constants/app_text_styles.dart for a Flutter app using the
DM Sans font family (loaded as 'DMSans') and DM Mono ('DMMono').

Define a class AppTextStyles with the following static TextStyle constants:
- h1: DMSans Bold 28px
- h2: DMSans Bold 22px (used for screen titles)
- h3: DMSans SemiBold 17px
- h4: DMSans SemiBold 15px
- h5: DMSans Medium 14px
- body: DMSans Regular 14px
- bodySmall: DMSans Regular 13px
- caption: DMSans Regular 12px
- micro: DMSans Medium 11px
- nano: DMSans SemiBold 10px
- balanceAmount: DMMono Medium 36px, letterSpacing -0.5
- balanceCurrency: DMMono Regular 20px
- label: DMSans SemiBold 12px, letterSpacing 0.08em, uppercase (for section headers)
- mono: DMMono Regular 13px

Do not set colors in the text styles (colors will be applied in widgets). Dart null-safe.
```

---

### Prompt 03 — app_categories.dart

Target file: lib/core/constants/app_categories.dart

```
Create the file lib/core/constants/app_categories.dart for a Flutter app.
Import flutter_tabler_icons and app_colors.dart.

Define a class CategoryDef with: String id, String name, IconData icon, Color Function(bool isDark) colorFn.

Define a list defaultCategories of CategoryDef with these 8 items using Tabler icons:
1. id: 'food',          name: 'Food',         icon: TablerIcons.tools_kitchen_2,  color: AppColors.red
2. id: 'transport',     name: 'Transport',     icon: TablerIcons.car,              color: AppColors.accent
3. id: 'shopping',      name: 'Shopping',      icon: TablerIcons.shopping_bag,     color: AppColors.amber
4. id: 'health',        name: 'Health',        icon: TablerIcons.heartbeat,        color: AppColors.green
5. id: 'utilities',     name: 'Utilities',     icon: TablerIcons.bolt,             color: AppColors.purple
6. id: 'entertainment', name: 'Entertain',     icon: TablerIcons.device_tv,        color: AppColors.pink
7. id: 'education',     name: 'Education',     icon: TablerIcons.school,           color: AppColors.teal
8. id: 'other',         name: 'Other',         icon: TablerIcons.dots,             color: AppColors.text2

Each background color is the matching foreground color at 12% opacity (Color.fromRGBO).
Include a helper getCategoryById(String id) function. Dart null-safe.
```

---

### Prompt 04 — app_theme.dart

Target file: lib/core/theme/app_theme.dart

```
Create lib/core/theme/app_theme.dart for a Flutter app called PocketLedger.

Using the color values from this reference (copy from app_colors.dart):
- dark bg: 0xFF0d0f14, surface: 0xFF161a23, text1: 0xFFf0f2f8, text2: 0xFF8a90a8, accent: 0xFF4f8ef7
- light bg: 0xFFf0f2f8, surface: 0xFFffffff, text1: 0xFF0d0f14, text2: 0xFF5a607a, accent: 0xFF3b6ef0

Create a class AppTheme with two static ThemeData getters: dark and light.

Both themes should use:
- fontFamily: 'DMSans'
- useMaterial3: true
- No default elevation on AppBar, Cards, BottomNavigationBar
- BottomNavigationBar background transparent (we use custom nav)
- scaffoldBackgroundColor: bg colour
- cardColor: surface colour
- dividerTheme: no divider (transparent)
- inputDecorationTheme: filled, fillColor surface2, no border by default,
  focused border: accent colour, borderRadius 14px

Also create a ThemeNotifier using Riverpod StateNotifierProvider that:
- stores bool isDark in SharedPreferences with key 'isDark'
- defaults to true (dark mode)
- has a toggle() method

Dart null-safe. Import riverpod and shared_preferences.
```

---

### Prompt 05 — Data models (all 6 models)

Target files: lib/data/models/*.dart

```
Create 6 Hive model files for a Flutter money manager app. Each file needs the
@HiveType annotation and @HiveField on each field. Use hive and hive_flutter imports.
Each file gets a part directive for its generated .g.dart file.

FILE 1: lib/data/models/transaction.dart
typeId: 0
Fields: String id, double amount, String type (expense/income/transfer),
String categoryId, String accountId, String? toAccountId, DateTime date, String? note

FILE 2: lib/data/models/account.dart
typeId: 1
Fields: String id, String name, String type (bank/cash/mobile_wallet/credit),
double balance, int colorHex, String iconName, String? lastFourDigits

FILE 3: lib/data/models/loan.dart
typeId: 2
Fields: String id, String personName, String loanType (lend/borrow),
double totalAmount, double paidAmount, DateTime? dueDate, String? note, DateTime createdAt

FILE 4: lib/data/models/budget.dart
typeId: 3
Fields: String id, String categoryId, double monthlyLimit, int month, int year

FILE 5: lib/data/models/category.dart
typeId: 4
Fields: String id, String name, String iconName, int colorHex, bool isDefault

FILE 6: lib/data/models/notification_item.dart
typeId: 5
Fields: String id, String title, String body, String type, bool isRead, DateTime timestamp

Generate all 6 complete files. Each should be valid Dart null-safe code with all
required imports. After generating, I will run build_runner to generate the .g.dart files.
```

---

### Prompt 06 — hive_service.dart and repositories

Target files: lib/data/local/hive_service.dart, lib/data/repositories/*.dart

```
Create the Hive initialisation service and 5 repository files for a Flutter app.

FILE 1: lib/data/local/hive_service.dart
A class HiveService with a static Future<void> init() method that:
- Registers adapters for Transaction (typeId 0), Account (1), Loan (2), Budget (3), Category (4), NotificationItem (5)
- Opens 6 boxes: 'transactions', 'accounts', 'loans', 'budgets', 'categories', 'notifications'
- Seeds default accounts: BOC Bank (bank, balance 320000, colorHex 0xFF30d48a),
  Cash Wallet (cash, balance 85000, colorHex 0xFFf5a623),
  HNB Savings (bank, balance 80000, colorHex 0xFFa78bfa),
  eZ Cash (mobile_wallet, balance 320, colorHex 0xFFf472b6)
- Seeds default categories using the 8 defaults (food, transport, shopping, health, utilities, entertainment, education, other)
- Only seeds if the box is empty (first run check)

FILE 2: lib/data/repositories/transaction_repository.dart
CRUD methods: addTransaction, getAll, getByAccount(String accountId),
getByMonth(int month, int year), deleteTransaction(String id), updateTransaction.
Also: getTotalIncome(int month, int year), getTotalExpenses(int month, int year).

FILE 3: lib/data/repositories/account_repository.dart
CRUD: addAccount, getAll, getById, updateBalance(String id, double delta), deleteAccount.
Also: getTotalBalance() double.

FILE 4: lib/data/repositories/loan_repository.dart
CRUD: addLoan, getAll, getLendingLoans, getBorrowingLoans, recordRepayment(String id, double amount), deleteLoan.

FILE 5: lib/data/repositories/budget_repository.dart
CRUD: setBudget, getBudgetsForMonth(int month, int year), deleteBudget.

Use the uuid package to generate IDs. Dart null-safe. All repositories use Hive boxes directly (Hive.box<T>(boxName)).
```

---

### Prompt 07 — Providers

Target files: lib/providers/*.dart

```
Create Riverpod providers for a Flutter money manager app.
Use flutter_riverpod ^2.5 with AsyncNotifier pattern.

FILE 1: lib/providers/transaction_provider.dart
AsyncNotifier<List<Transaction>> that loads all transactions.
Methods: addTransaction(Transaction t), deleteTransaction(String id).
Also a filtered provider: selectedMonthTransactionsProvider(int month, int year).

FILE 2: lib/providers/account_provider.dart
AsyncNotifier<List<Account>> with addAccount, updateBalance, deleteAccount.
Provider: totalBalanceProvider -> double.

FILE 3: lib/providers/loan_provider.dart
AsyncNotifier<List<Loan>> with addLoan, recordRepayment, deleteLoan.
Providers: lendingLoansProvider, borrowingLoansProvider.

FILE 4: lib/providers/budget_provider.dart
AsyncNotifier<List<Budget>> with setBudget for a given month/year.
Provider: budgetVsActualProvider(int month, int year) returning a map of categoryId -> {limit: double, spent: double}.

FILE 5: lib/providers/notification_provider.dart
StateNotifier<List<NotificationItem>> with markAllRead(), markRead(String id).
Provider: unreadCountProvider -> int.

Each provider uses the matching repository class. Import the models and repositories.
Keep state management clean — no business logic in widgets. Dart null-safe.
```

---

### Prompt 08 — balance_card.dart

Target file: lib/screens/home/widgets/balance_card.dart

```
Create a Flutter widget file: lib/screens/home/widgets/balance_card.dart

The BalanceCard is a StatelessWidget that takes:
- double totalBalance
- double monthIncome
- double monthExpenses
- bool isDark

Visual spec (match exactly):
- Container with gradient: dark mode uses #1a2340 -> #0f1a38 -> #1a1040 at 135deg,
  light mode uses #3b6ef0 -> #6c52e8 at 135deg
- Border radius 18px
- Padding 22px vertical, 20px horizontal
- Two decorative circles using ::before/::after equivalent in Flutter (Stack + positioned containers):
  top-right: 140x140 circle, rgba(79,142,247,0.12)
  bottom-left: 100x100 circle, rgba(123,108,247,0.10)
- Label "Total Balance" in 12px white 60% opacity, uppercase, letterSpacing 0.08
- Amount: Rs. prefix 20px + balance amount 36px DM Mono Medium, letterSpacing -0.5, color white
- Bottom row: two equal chips side by side, background rgba(255,255,255,0.08), borderRadius 12px:
  Left chip: green trending-up icon (background rgba(48,212,138,0.2)), "Income" label, Rs. amount
  Right chip: red trending-down icon (background rgba(240,92,110,0.2)), "Expenses" label, Rs. amount

Use Tabler Icons for trending-up and trending-down. Format amounts as "Rs. 82,000" using intl NumberFormat.
No hardcoded strings — use parameters. Dart null-safe.
```

---

### Prompt 09 — add_transaction_sheet.dart

Target file: lib/screens/add_transaction/add_transaction_sheet.dart

```
Create a Flutter bottom sheet widget: lib/screens/add_transaction/add_transaction_sheet.dart

It is shown using showModalBottomSheet. It is a StatefulWidget.

Visual spec:
- Sheet background: surface colour (#161a23 dark), borderRadius top 24px
- Drag handle: 40x4 container, borderRadius 2, color border2, centred, margin bottom 16px
- Title "Add Transaction" centred, 18px Bold
- Type tabs row: 3 equal chips in a row with 8px gap:
  "Expense" (active by default — red border + red text), "Income" (green when active), "Transfer" (accent when active)
  Inactive: surface2 background, border2 border, text2 colour
- Amount input: Row with "Rs." prefix (20px, text3 colour) and TextFormField for number, 36px DM Mono Medium
- Field selector row: two equal tappable rows for Category and Account, each showing a Tabler icon, a small label, and the selected value
- Section label "Categories"
- Category grid: 4 columns, 8 items (Food, Transport, Shopping, Health, Utilities, Entertainment, Education, Other)
  Each item: column with icon (38x38 rounded), label below (10px)
  Active: accent border 2px + accent background 8% opacity
- Gradient save button full width: "Save Transaction", height 56px, borderRadius 16px, gradient accent -> accent2

State: selectedType (expense/income/transfer), selectedCategoryId, selectedAccountId, amountController.

On save: create a Transaction, call Riverpod transactionProvider.addTransaction, then Navigator.pop.
Dart null-safe. Use ConsumerStatefulWidget from flutter_riverpod.
```

---

### Prompt 10 — loan_card.dart

Target file: lib/screens/loans/widgets/loan_card.dart

```
Create a Flutter widget: lib/screens/loans/widgets/loan_card.dart

LoanCard is a StatelessWidget taking a Loan object and bool isDark.

Visual spec:
- Container: surface2 background, border border, borderRadius 18px, padding 16px, margin-bottom 12px
- Header row:
  Left: Row with 38x38 circular avatar (gradient based on personName first two letters as initials),
  person name (14px SemiBold), loan type/due date (11px text3)
  Right: Badge chip — "Lending" (green background 15% opacity, green text) or "Borrowing" (red background 15% opacity, red text)
- Amount: 22px Bold, colour green if lend, red if borrow, formatted "Rs. 25,000"
- Progress bar: surface3 background, 5px height, borderRadius 4px, inner bar green or red at % of paid/total
- Meta row: "Paid: Rs. X" on left, "Remaining: Rs. Y" on right, 11px text3

The avatar gradient should use a deterministic colour from the person name (pick from: accent/accent2, amber/red, green/teal, purple/pink).
Use intl NumberFormat for amounts. Dart null-safe.
```

---

### Prompt 11 — google_drive_service.dart

Target file: lib/services/google_drive_service.dart

```
Create lib/services/google_drive_service.dart for a Flutter app.

Use these packages: googleapis, extension_google_sign_in_as_googleapis_auth, google_sign_in, path_provider.

The class GoogleDriveService has:

Future<void> backupToGoogleDrive():
  1. Get the authenticated GoogleSignInAccount from GoogleSignIn.currentUser
  2. Obtain an authenticated HTTP client using authenticatedClient()
  3. Create a DriveApi client
  4. Find the Hive database directory with getApplicationDocumentsDirectory()
  5. Compress all files in that directory into a zip in memory (use archive package if needed, or just upload the main hive file)
  6. Upload the file to Drive with mime type 'application/octet-stream', named 'pocketledger_backup.hive'
  7. If a file with that name already exists in Drive, update it instead of creating a new one

Future<bool> restoreFromGoogleDrive():
  1. Get auth client
  2. Search for 'pocketledger_backup.hive' in user's Drive
  3. If found, download to local documents directory
  4. Return true if successful, false if not found

Both methods throw descriptive exceptions on failure.
Add dependency check notes as comments. Dart null-safe.
```

---

### Prompt 12 — export_service.dart

Target file: lib/services/export_service.dart

```
Create lib/services/export_service.dart for a Flutter money manager app.

Use packages: pdf (dart pdf), excel, csv, path_provider, share_plus.

The class ExportService has these methods:

Future<void> exportToCsv(List<Transaction> transactions, List<Account> accounts):
  Build a CSV with columns: Date, Description, Category, Account, Type, Amount
  Save to downloads or temp dir, then call Share.shareXFiles to share

Future<void> exportToExcel(List<Transaction> transactions):
  Create an Excel workbook with a "Transactions" sheet
  Columns: Date, Description, Category, Account, Type, Amount
  Bold header row, formatted amounts
  Save and share

Future<void> exportToPdf(List<Transaction> transactions, double totalBalance, double income, double expenses):
  Create a PDF with:
  - PocketLedger header
  - Summary section: Total Balance, Income, Expenses
  - Transaction table: Date, Description, Amount
  - Footer with export date
  Save and share

All amounts formatted as "Rs. X,XXX.XX". Dates as "DD MMM YYYY". Dart null-safe.
```

---

### Prompt 13 — Signing build.gradle config

Target file: android/app/build.gradle (modification)

```
Show me the full content of android/app/build.gradle for a Flutter app called
PocketLedger with package name com.yourname.pocketledger.

Requirements:
- compileSdkVersion 34
- minSdkVersion 21 (Android 5.0+)
- targetSdkVersion 34
- Java compatibility: JavaVersion.VERSION_17
- Apply the google-services plugin
- Add signingConfigs reading from a key.properties file at the project root level
  (storeFile, storePassword, keyAlias, keyPassword)
- Release buildType uses the signingConfig, minifyEnabled true, shrinkResources true,
  proguardFiles getDefaultProguardFile('proguard-android-optimize.txt')
- Add the flutter build config at the bottom

Show the complete file, not just the diff. Groovy syntax.
```

---

## [15] Environment & Secrets

### Files that must NEVER be committed to git

```
.env                    <- API keys, client IDs
key.properties          <- Keystore passwords
keystore/*.jks          <- Signing key (loss = cannot update app on Play Store)
android/app/google-services.json  <- Firebase/Google config
```

All of these should appear in your .gitignore:

```
# Secrets — never commit
.env
key.properties
keystore/
*.jks
*.keystore
android/app/google-services.json
```

### .env variables

```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

Loaded in main.dart:
```dart
await dotenv.load(fileName: ".env");
final clientId = dotenv.env['GOOGLE_CLIENT_ID']!;
```

---

## [16] Third-Party Services Setup

### Google Cloud Console

1. Create project at console.cloud.google.com
2. Enable: Google Sign-In API, Google Drive API
3. Create OAuth 2.0 credentials — type: Android
4. Enter package name + SHA-1 fingerprint (debug and release are different)
5. Download google-services.json -> android/app/

Debug SHA-1:
```
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Release SHA-1:
```
keytool -list -v -keystore keystore/pocketledger.jks -alias pocketledger
```

Both SHA-1s must be registered in Google Cloud Console for their respective build variants.

### flutter_local_notifications — Android 13+ notification permission

On Android 13 (API 33) and above, the POST_NOTIFICATIONS permission must be requested at
runtime. Handle this in your notification service initialisation:

```dart
// In notification_service.dart
if (Platform.isAndroid) {
  final androidPlugin = flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>();
  await androidPlugin?.requestNotificationsPermission();
}
```

### local_auth — Biometric setup

Add to android/app/src/main/AndroidManifest.xml:
```xml
<uses-permission android:name="android.permission.USE_BIOMETRIC"/>
```

The activity in AndroidManifest.xml must use FlutterFragmentActivity (not FlutterActivity):

File: android/app/src/main/kotlin/com/yourname/pocketledger/MainActivity.kt
```kotlin
import io.flutter.embedding.android.FlutterFragmentActivity
class MainActivity: FlutterFragmentActivity()
```

---

## [17] Troubleshooting

### flutter doctor shows missing Android SDK

Run Android Studio, go to SDK Manager, install Android SDK Platform 34 and Build-Tools 34.0.0.
Set ANDROID_HOME environment variable to the SDK path.

### Gradle build fails with "Java heap space"

Add to android/gradle.properties:
```
org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m
```

### google-services plugin error

Check that:
1. android/build.gradle has `classpath 'com.google.gms:google-services:4.4.2'` in buildscript dependencies
2. android/app/build.gradle has `apply plugin: 'com.google.gms.google-services'` at the bottom
3. google-services.json is in android/app/ (not android/)

### Build runner fails

Delete conflicting generated files and retry:
```
flutter pub run build_runner clean
flutter pub run build_runner build --delete-conflicting-outputs
```

### APK installs but crashes immediately

Run with verbose logging to see the crash:
```
flutter run --verbose
```

Or view device logs:
```
adb logcat | grep flutter
```

### Hive box not found error

All boxes must be opened before accessing them. Ensure HiveService.init() is awaited
before runApp() in main.dart:
```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  await HiveService.init();
  runApp(ProviderScope(child: App()));
}
```

### google_sign_in returns null on first call

The user must be prompted via signIn() before currentUser is available. Do not call
currentUser without first calling signIn() or signInSilently().

### Release APK not installing — "App not installed"

The device may have an older debug build installed. Uninstall it first, then install
the release APK. Debug and release builds have different signing certificates and
cannot coexist unless they share the same package name and signature.

### APK size too large

Use --split-per-abi flag and only distribute the arm64-v8a variant for modern phones.
Also enable minify and shrink in the release build type (see Section [11]).

---

## [18] License

```
MIT License

Copyright (c) 2025 PocketLedger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Quick Reference — Commands

```
flutter pub get                                      Install dependencies
flutter pub run build_runner build --delete-conflicting-outputs   Generate Hive adapters
flutter run                                          Run debug on connected device
flutter run --release                               Run release on device
flutter build apk --debug                           Build debug APK
flutter build apk --release --split-per-abi         Build signed split APKs
flutter build appbundle --release                   Build Play Store bundle
flutter test                                        Run all tests
flutter clean                                       Clean build cache
adb install build/app/outputs/flutter-apk/app-arm64-v8a-release.apk   Install to device
```

---

*PocketLedger — Money Manager | Flutter 3.22+ | Dart 3.4+ | Hive | Riverpod | go_router*
