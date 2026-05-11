# ⬡ Deploy Center — Web Hub v3

**Modern GitHub Pages app-store dashboard**

🌐 Live: https://tharindu899.github.io/deploy-center/  
📦 Repo: `tharindu899/deploy-center`

---

## ✦ Design

**Neon Command Center** aesthetic — deep space background, electric cyan/violet neon glows, Orbitron display font, animated grid overlay, holographic app cards, scanline texture.

---

## ✦ Features

| Feature | Details |
|---|---|
| **GitHub API Auto-Scan** | Detects app folders at `/apps` via GitHub Contents API |
| **Search + Suggestions** | Real-time filtering with dropdown hints |
| **Category Filter** | Auto-populated from apps.json |
| **Favorites System** | Star apps, persisted in localStorage |
| **Visit Tracking** | Per-app + total visit counters in localStorage |
| **Recent Apps** | Shows last 6 opened apps |
| **Dark / Light Mode** | Smooth toggle, auto-restored on load |
| **Live Preview Modal** | Full iframe preview with loading spinner |
| **PWA Support** | manifest.json + service worker + install prompt |
| **Offline Support** | Cache-first SW for assets, network-first for HTML |
| **Keyboard Shortcuts** | `/` search, `T` theme, `F` favorites, `Esc` close |
| **Star Ratings** | Displayed per app |
| **Loading Skeletons** | Animated shimmer while data loads |
| **Particle Background** | Floating cyan/violet particles |
| **Responsive** | Mobile-first, grid adapts to any screen |

---

## ✦ File Structure

```
deploy-center/
├── index.html          ← Main dashboard UI
├── style.css           ← Neon Command Center styles
├── script.js           ← All logic: fetch, filter, preview, favorites
├── manifest.json       ← PWA manifest
├── sw.js               ← Offline service worker (v3)
├── apps.json           ← App metadata
├── apps/
│   ├── budget-manager/index.html
│   ├── movie-ui/index.html
│   ├── unlock-manager/index.html
│   └── another-app/index.html
└── assets/
    ├── logo.svg
    ├── banner.svg
    └── thumbnails/
        ├── budget-manager.svg
        ├── movie-ui.svg
        ├── unlock-manager.svg
        └── another-app.svg
```

---

## ✦ Deploy

1. Push all files to the `main` branch.
2. Enable GitHub Pages → Source: `Deploy from branch` → Branch: `main` → `/` (root).
3. Visit: https://tharindu899.github.io/deploy-center/

The `apps.json` loads first. If it fails, the GitHub Contents API is queried as fallback and app folders are auto-detected.

---

## ✦ Adding New Apps

1. Create `apps/your-app-name/index.html`
2. Add an entry to `apps.json`
3. Optionally add `assets/thumbnails/your-app-name.svg`
4. Push — it appears automatically.

---

## ✦ Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` | Focus search bar |
| `T` | Toggle dark/light theme |
| `F` | Toggle favorites-only filter |
| `Esc` | Close preview modal / blur search |

---

## ✦ Tech Stack

- HTML5 + CSS3 + Vanilla JavaScript
- Google Fonts: Orbitron + Outfit
- GitHub Pages compatible — no backend required
- No frameworks or build tools
