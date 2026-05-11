/* ============================================================
   DEPLOY CENTER — script.js  (fixed)
   ============================================================ */

'use strict';

/* ── Config ── */
const CONFIG = {
  owner: 'tharindu899',
  repo:  'deploy-center',
  appsPath: 'apps',
  recentMax: 6,
  suggestionsMax: 7,
};

/* ── LocalStorage Keys ── */
const LS = {
  theme:     'dc_theme_v2',
  visits:    'dc_total_visits_v2',
  appVisits: 'dc_app_visits_v2',
  recent:    'dc_recent_v2',
  fav:       'dc_favorites_v2',
};

/* ── State ── */
const state = {
  apps:           [],
  filtered:       [],
  deferredPrompt: null,
  favOnly:        false,
  loadingStages:  ['Contacting GitHub API…', 'Scanning app folders…', 'Parsing metadata…', 'Generating thumbnails…', 'Ready!'],
};

/* ── DOM Helpers ── */
const q    = (s, root = document) => root.querySelector(s);
const qa   = (s, root = document) => [...root.querySelectorAll(s)];
const qAny = (...sels) => sels.map(sel => q(sel)).find(Boolean) || null;

/* ============================================================
   THEME
   ============================================================ */
function loadTheme() {
  const t = localStorage.getItem(LS.theme) || 'dark';
  document.documentElement.classList.toggle('light', t === 'light');
  updateThemeIcon(t === 'light');
}

function toggleTheme() {
  const light = document.documentElement.classList.toggle('light');
  localStorage.setItem(LS.theme, light ? 'light' : 'dark');
  updateThemeIcon(light);
}

/* FIX #1 — HTML uses #iconMoon / #iconSun with .hidden toggle, not a single #themeIcon */
function updateThemeIcon(isLight) {
  const moon = q('#iconMoon');
  const sun  = q('#iconSun');
  if (!moon || !sun) return;
  moon.classList.toggle('hidden', isLight);
  sun.classList.toggle('hidden', !isLight);
}

/* ============================================================
   LOCAL STORAGE HELPERS
   ============================================================ */
function getJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function setJSON(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

/* ============================================================
   DATA FETCHING
   ============================================================ */
async function fetchAppsJson() {
  try {
    const r = await fetch('apps.json?t=' + Date.now());
    if (!r.ok) throw new Error('Not found');
    return await r.json();
  } catch { return null; }
}

async function scanAppsFolder() {
  const url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${CONFIG.appsPath}`;
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('GitHub API failed');
    const entries = await r.json();
    return entries.filter(e => e.type === 'dir').map((e, i) => ({
      slug:        e.name,
      name:        e.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: `Auto-detected app: ${e.name}`,
      category:    'Utilities',
      version:     `1.0.${i}`,
      rating:      3.5 + Math.random(),
      path:        `apps/${e.name}/index.html`,
      tags:        ['auto', 'detected'],
    }));
  } catch { return []; }
}

/* ── Merge with localStorage data ── */
function mergeApps(meta) {
  const visits = getJSON(LS.appVisits, {});
  const favs   = getJSON(LS.fav, []);
  return meta.map(a => ({
    ...a,
    visits:   visits[a.slug] || 0,
    favorite: favs.includes(a.slug),
  }));
}

/* ============================================================
   VISIT TRACKING
   ============================================================ */
function recordVisit(slug) {
  const map = getJSON(LS.appVisits, {});
  map[slug] = (map[slug] || 0) + 1;
  setJSON(LS.appVisits, map);

  const total = Number(localStorage.getItem(LS.visits) || 0) + 1;
  localStorage.setItem(LS.visits, String(total));

  const recent = getJSON(LS.recent, []).filter(x => x !== slug);
  recent.unshift(slug);
  setJSON(LS.recent, recent.slice(0, CONFIG.recentMax));
}

/* ============================================================
   FAVORITES
   ============================================================ */
function toggleFavorite(slug) {
  const favs = getJSON(LS.fav, []);
  const idx  = favs.indexOf(slug);
  if (idx > -1) favs.splice(idx, 1); else favs.push(slug);
  setJSON(LS.fav, favs);
}

function isFavorite(slug) {
  return getJSON(LS.fav, []).includes(slug);
}

/* ============================================================
   STATS RENDERING
   FIX #3 — use .bento-cell/.bento-icon/.bento-val/.bento-label
            to match existing CSS (was .stat-card/.stat-icon/…)
   ============================================================ */
function renderStats() {
  const totalVisits = Number(localStorage.getItem(LS.visits) || 0);
  const favCount    = getJSON(LS.fav, []).length;
  const catCount    = getUniqueCategories(state.apps).length;
  const updated     = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

  const items = [
    { icon: '⬡', label: 'Total Apps',   value: state.apps.length },
    { icon: '◈', label: 'Categories',   value: catCount },
    { icon: '◉', label: 'Total Visits', value: totalVisits },
    { icon: '★', label: 'Favorites',    value: favCount },
    { icon: '↻', label: 'Updated',      value: updated },
  ];

  q('#stats').innerHTML = items.map(s => `
    <div class="bento-cell">
      <div class="bento-icon">${s.icon}</div>
      <div class="bento-val">${s.value}</div>
      <div class="bento-label">${s.label}</div>
    </div>
  `).join('');
}

/* ============================================================
   CATEGORIES
   ============================================================ */
function getUniqueCategories(apps) {
  return [...new Set(apps.map(a => a.category).filter(Boolean))].sort();
}

function fillCategories() {
  const select  = q('#categoryFilter');
  const current = select.value;
  select.innerHTML = '<option value="all">⬡ All Categories</option>' +
    getUniqueCategories(state.apps)
      .map(c => `<option value="${c}">${c}</option>`)
      .join('');
  if (current && current !== 'all') select.value = current;
}

/* FIX #2 — CSS defines .c-finance/.c-entertainment/… not .cat-finance/… */
function catClass(category) {
  const map = {
    Finance:       'c-finance',
    Entertainment: 'c-entertainment',
    Tools:         'c-tools',
    Utilities:     'c-utilities',
    Productivity:  'c-productivity',
  };
  return map[category] || 'c-default';
}

/* ============================================================
   STAR RATING
   ============================================================ */
function starRating(n) {
  const rounded = Math.round(n * 2) / 2;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rounded) html += '★';
    else if (i - 0.5 === rounded) html += '⯨';
    else html += '☆';
  }
  return `<span title="${(n || 0).toFixed(1)} / 5">${html} ${(n || 0).toFixed(1)}</span>`;
}

/* ============================================================
   THUMBNAIL HELPER
   ============================================================ */
function thumbFor(app) {
  if (app.thumbnail) return app.thumbnail;
  return `https://picsum.photos/seed/${encodeURIComponent(app.slug)}/600/340`;
}

/* ============================================================
   BUILD APP CARD
   ============================================================ */
function buildCard(app, small = false) {
  const cardTemplate = qAny('#cardTpl', '#cardTemplate');
  if (!cardTemplate) throw new Error('Card template not found');
  const tmpl   = cardTemplate.content.cloneNode(true);
  const card   = tmpl.querySelector('.app-card');
  const visits = (getJSON(LS.appVisits, {})[app.slug] || 0);
  const fav    = isFavorite(app.slug);

  /* ── Thumbnail ── */
  const img = tmpl.querySelector('.thumb-img, .thumb');
  img.src   = thumbFor(app);
  img.alt   = `${app.name} thumbnail`;
  img.onerror = () => { img.src = generateThumb(app); };

  /* ── Category chip — FIX #2 applied ── */
  const chip = tmpl.querySelector('.cat-pill, .card-category-chip');
  chip.textContent = app.category || 'App';
  chip.classList.add(catClass(app.category));

  /* ── Text ── */
  tmpl.querySelector('.card-name').textContent = app.description || 'No description.';

  /* FIX #4 — .rating-val is the rating span; version goes into .card-ver only */
  tmpl.querySelector('.card-name').textContent = app.name;
  tmpl.querySelector('.card-desc').textContent = app.description || 'No description.';

  const verNode = tmpl.querySelector('.card-ver');
  if (verNode) verNode.textContent = `v${app.version || '1.0.0'}`;

  const ratingValNode = tmpl.querySelector('.rating-val');
  if (ratingValNode) ratingValNode.textContent = (app.rating || 4).toFixed(1);

  tmpl.querySelector('.stars').innerHTML = starRating(app.rating || 4);

  const visitsNode = tmpl.querySelector('.visits, .visits-label');
  if (visitsNode) visitsNode.textContent = `${visits} visit${visits !== 1 ? 's' : ''}`;

  /* ── Favorite — FIX #5 use .saved (matches CSS), FIX #6 use --gold-light ── */
  const favBtn = tmpl.querySelector('.save-btn, .fav-btn');
  if (favBtn) {
    if (fav) {
      favBtn.classList.add('saved');
      const poly = favBtn.querySelector('polygon');
      if (poly) poly.style.fill = 'var(--gold-light)';
    }
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(app.slug);
      const nowFav = isFavorite(app.slug);
      favBtn.classList.toggle('saved', nowFav);
      const poly = favBtn.querySelector('polygon');
      if (poly) poly.style.fill = nowFav ? 'var(--gold-light)' : 'none';
      renderStats();
      renderFavSection();
    });
  }

  /* ── Launch button ── */
  const openBtn = tmpl.querySelector('.btn-launch, .btn-open');
  if (openBtn) openBtn.href = app.path;
  openBtn?.addEventListener('click', () => {
    recordVisit(app.slug);
    renderStats();
    renderRecentSection();
    if (visitsNode) {
      const newCount = visits + 1;
      visitsNode.textContent = `${newCount} visit${newCount !== 1 ? 's' : ''}`;
    }
  });

  /* ── Preview buttons ── */
  const previewBtns = tmpl.querySelectorAll('.btn-prev, .preview-btn-hover, .btn-preview, .btn-preview-hover');
  previewBtns.forEach(btn => btn.addEventListener('click', () => openPreview(app)));

  if (small) card.classList.add('card-small');

  return tmpl;
}

/* ── SVG Fallback Thumbnail ── */
function generateThumb(app) {
  const colors = {
    Finance:       '#0a2a1a,#00e5a0',
    Entertainment: '#1a0a12,#ff4f7b',
    Tools:         '#0a1a2a,#00f5ff',
    Utilities:     '#160a2a,#bf5af2',
    Productivity:  '#1a140a,#ffb830',
  };
  const [bg, accent] = (colors[app.category] || '#0a1428,#c9922a').split(',');
  const initial = (app.name || 'A')[0].toUpperCase();
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 340'>
    <rect width='600' height='340' fill='${bg}'/>
    <circle cx='300' cy='130' r='64' fill='${accent}22' stroke='${accent}44' stroke-width='1'/>
    <text x='300' y='148' text-anchor='middle' fill='${accent}' font-size='62' font-family='Georgia,serif' font-weight='700'>${initial}</text>
    <text x='300' y='218' text-anchor='middle' fill='#e8f4ff' font-size='20' font-family='monospace'>${app.name}</text>
    <text x='300' y='244' text-anchor='middle' fill='${accent}99' font-size='11' font-family='monospace' letter-spacing='2'>${(app.category || 'APP').toUpperCase()}</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

/* ============================================================
   RENDER SECTIONS
   ============================================================ */
function renderMainApps(apps) {
  const grid  = q('#appsGrid');
  const empty = q('#emptyState');
  const count = qAny('#allCount', '#appsCount');
  grid.innerHTML = '';
  if (apps.length === 0) {
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    apps.forEach(a => grid.appendChild(buildCard(a)));
  }
  if (count) count.textContent = `${apps.length} app${apps.length !== 1 ? 's' : ''}`;
}

function renderRecentSection() {
  const slugs  = getJSON(LS.recent, []);
  const recent = slugs.map(s => state.apps.find(a => a.slug === s)).filter(Boolean);
  const sec    = qAny('#recentSec', '#recentSection');
  const grid   = qAny('#recentRow', '#recentGrid');
  const count  = q('#recentCount');
  if (!sec) return;
  if (recent.length === 0) { sec.classList.add('hidden'); return; }
  sec.classList.remove('hidden');
  if (grid) { grid.innerHTML = ''; recent.forEach(a => grid.appendChild(buildCard(a, true))); }
  if (count) count.textContent = `${recent.length}`;
}

function renderFavSection() {
  const favs  = getJSON(LS.fav, []);
  const apps  = state.apps.filter(a => favs.includes(a.slug));
  const sec   = qAny('#savedSec', '#favSection');
  const grid  = qAny('#savedRow', '#favGrid');
  const count = qAny('#savedCount', '#favCount');
  if (!sec) return;
  if (apps.length === 0) { sec.classList.add('hidden'); return; }
  sec.classList.remove('hidden');
  if (grid) { grid.innerHTML = ''; apps.forEach(a => grid.appendChild(buildCard(a, true))); }
  if (count) count.textContent = `${apps.length}`;
}

/* ============================================================
   SEARCH & FILTER
   ============================================================ */
function applyFilters() {
  const term = q('#searchInput').value.toLowerCase().trim();
  const cat  = q('#categoryFilter').value;
  const favs = getJSON(LS.fav, []);

  state.filtered = state.apps.filter(a => {
    const haystack    = [a.name, a.description, a.category, ...(a.tags || [])].join(' ').toLowerCase();
    const matchSearch = !term || haystack.includes(term);
    const matchCat    = cat === 'all' || a.category === cat;
    const matchFav    = !state.favOnly || favs.includes(a.slug);
    return matchSearch && matchCat && matchFav;
  });

  renderMainApps(state.filtered);
  renderSuggestions(term);
}

/* FIX #7 — expose both names; HTML inline onclick uses window._filter() */
window.applyFilters = applyFilters;
window._filter      = applyFilters;

function renderSuggestions(term) {
  const list = q('#suggestions');
  if (!term) { list.innerHTML = ''; return; }
  const options = state.apps
    .map(a => a.name)
    .filter(n => n.toLowerCase().includes(term))
    .slice(0, CONFIG.suggestionsMax);
  list.innerHTML = options.map(o => `<li role="option">${o}</li>`).join('');
  qa('li', list).forEach(li => {
    li.addEventListener('click', () => {
      q('#searchInput').value = li.textContent;
      list.innerHTML = '';
      applyFilters();
    });
  });
}

/* ============================================================
   PREVIEW MODAL
   ============================================================ */
function openPreview(app) {
  const modal = q('#previewModal');
  q('#previewTitle').textContent = app.name;

  const badge = qAny('#modalBadge', '#previewCategory');
  if (badge) badge.textContent = app.category || 'App';

  const openLink = qAny('#modalLink', '#previewOpenLink');
  if (openLink) openLink.href = app.path;

  const frameLoading = qAny('#frameLoader', '#frameLoading');
  if (frameLoading) frameLoading.style.display = 'flex';

  const frame = q('#previewFrame');
  frame.src = '';
  frame.onload = () => { if (frameLoading) frameLoading.style.display = 'none'; };
  frame.src = app.path;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  q('#previewModal').classList.add('hidden');
  q('#previewFrame').src = '';
  document.body.style.overflow = '';
}

/* ============================================================
   LOADING ANIMATION
   ============================================================ */
async function animateLoading() {
  const label = qAny('#loaderMsg', '#loadingLabel');
  for (const stage of state.loadingStages) {
    if (label) label.textContent = stage;
    await new Promise(r => setTimeout(r, 350));
  }
}

/* ============================================================
   MAIN INIT
   ============================================================ */
async function init() {
  loadTheme();

  const loadingEl = q('#loadingState');
  if (loadingEl) loadingEl.classList.remove('hidden');

  const loadAnim = animateLoading();

  const [data] = await Promise.all([fetchAppsJson(), loadAnim]);
  let apps = data?.apps || [];
  if (!apps.length) apps = await scanAppsFolder();

  state.apps     = mergeApps(apps);
  state.filtered = state.apps;

  if (loadingEl) loadingEl.classList.add('hidden');

  fillCategories();
  renderStats();
  applyFilters();
  renderRecentSection();
  renderFavSection();
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */

/* Theme */
q('#themeToggle')?.addEventListener('click', toggleTheme);

/* Search */
q('#searchInput')?.addEventListener('input', applyFilters);
q('#searchInput')?.addEventListener('blur', () => {
  setTimeout(() => { if (q('#suggestions')) q('#suggestions').innerHTML = ''; }, 200);
});

/* Category filter */
q('#categoryFilter')?.addEventListener('change', applyFilters);

/* Favorites toggle */
qAny('#favToggle', '#favFilterBtn')?.addEventListener('click', () => {
  state.favOnly = !state.favOnly;
  qAny('#favToggle', '#favFilterBtn')?.setAttribute('aria-pressed', String(state.favOnly));
  applyFilters();
});

/* Modal close */
q('#closeModal')?.addEventListener('click', closePreview);
q('#previewModal')?.addEventListener('click', e => {
  if (e.target === q('#previewModal') ||
      e.target.classList.contains('modal-scrim') ||
      e.target.id === 'modalScrim') {
    closePreview();
  }
});

/* Install FAB */
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  state.deferredPrompt = e;
  q('#installBtn')?.classList.remove('hidden');
});
q('#installBtn')?.addEventListener('click', async () => {
  if (!state.deferredPrompt) return;
  state.deferredPrompt.prompt();
  await state.deferredPrompt.userChoice;
  state.deferredPrompt = null;
  q('#installBtn')?.classList.add('hidden');
});

/* Keyboard shortcuts */
window.addEventListener('keydown', e => {
  const tag     = document.activeElement?.tagName;
  const isInput = tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA';

  if (e.key === '/' && !isInput) {
    e.preventDefault();
    q('#searchInput')?.focus();
    q('#searchInput')?.select();
  }
  if (e.key.toLowerCase() === 't' && !isInput) toggleTheme();
  if (e.key.toLowerCase() === 'f' && !isInput) qAny('#favToggle', '#favFilterBtn')?.click();
  if (e.key === 'Escape') {
    closePreview();
    q('#searchInput')?.blur();
    if (q('#suggestions')) q('#suggestions').innerHTML = '';
  }
});

/* Navbar scroll shadow */
window.addEventListener('scroll', () => {
  const bar = qAny('#navbar', '#topbar');
  if (!bar) return;
  bar.style.boxShadow = window.scrollY > 10 ? '0 4px 30px rgba(0,0,0,0.45)' : '';
}, { passive: true });

/* Service Worker */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).catch(() => {});
  });
}

/* ── Go ── */
init();
