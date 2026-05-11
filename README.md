# Deploy Center Web Hub

Modern GitHub Pages app-store style dashboard for:
- Live site: https://tharindu899.github.io/deploy-center/
- Repo: `tharindu899/deploy-center`

## Included files
- `index.html` — main dashboard UI
- `style.css` — glassmorphism + responsive styles
- `script.js` — dynamic app loading, filtering, preview, favorites, stats, keyboard shortcuts
- `manifest.json` — PWA manifest
- `sw.js` — offline cache service worker
- `apps.json` — primary app metadata source
- `apps/*/index.html` — app entry pages

## Features
- GitHub API auto scan fallback (`/contents/apps`) if `apps.json` fails
- Search + category filters + suggestions
- Dark/light mode (persisted)
- Fullscreen iframe preview modal
- Install button for PWA
- Favorites + recent apps + visit tracking in localStorage
- App stats cards and rating display
- Responsive mobile-first layout with smooth animations

## Deploy
1. Push all files to `main`.
2. Enable GitHub Pages from root branch.
3. Open: https://tharindu899.github.io/deploy-center/


## Assets note
- Uses SVG assets only (no binary PNG/JPG files), compatible with environments that do not support binary files.
