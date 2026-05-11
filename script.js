const CONFIG = { owner: 'tharindu899', repo: 'deploy-center', appsPath: 'apps' };
const LS = { theme:'dc_theme', visits:'dc_total_visits', appVisits:'dc_app_visits', recent:'dc_recent', fav:'dc_favorites' };
const state = { apps:[], filtered:[], deferredPrompt:null };
const q = (s)=>document.querySelector(s);

function loadTheme(){ const t=localStorage.getItem(LS.theme)||'dark'; document.documentElement.classList.toggle('light',t==='light'); }
function toggleTheme(){ const light=document.documentElement.classList.toggle('light'); localStorage.setItem(LS.theme,light?'light':'dark'); }
function getJSON(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d} }
function setJSON(k,v){localStorage.setItem(k,JSON.stringify(v));}

function starRating(n){ return '★'.repeat(Math.round(n)) + '☆'.repeat(5-Math.round(n)); }
function thumbFor(app){ return app.thumbnail || `https://picsum.photos/seed/${encodeURIComponent(app.slug)}/600/340`; }

async function fetchAppsJson(){
  try { const r = await fetch('apps.json'); if(!r.ok) throw new Error(); return await r.json(); } catch { return null; }
}
async function scanAppsFolder(){
  const url=`https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${CONFIG.appsPath}`;
  const r=await fetch(url); if(!r.ok) return [];
  const entries=await r.json();
  return entries.filter(e=>e.type==='dir').map((e,i)=>({slug:e.name,name:e.name.replace(/-/g,' '),description:'Auto detected app folder',category:'Utilities',version:'1.0.'+i,rating:4,path:`apps/${e.name}/index.html`,tags:['auto','detected']}));
}

function mergeApps(meta){
  return meta.map((a)=>({ ...a, visits:getJSON(LS.appVisits,{})[a.slug]||0, favorite:getJSON(LS.fav,[]).includes(a.slug) }));
}
function categories(apps){ return [...new Set(apps.map(a=>a.category).filter(Boolean))].sort(); }

function renderStats(){
  const totalVisits = Number(localStorage.getItem(LS.visits)||0);
  const favCount = getJSON(LS.fav,[]).length;
  const c = categories(state.apps).length;
  q('#stats').innerHTML = [
    ['Total Apps', state.apps.length], ['Categories', c], ['Total Visits', totalVisits], ['Favorites', favCount], ['Last Updated', new Date().toLocaleDateString()]
  ].map(([k,v])=>`<div class="stat glass"><h4>${k}</h4><p>${v}</p></div>`).join('');
}

function updateVisits(slug){
  const map=getJSON(LS.appVisits,{}); map[slug]=(map[slug]||0)+1; setJSON(LS.appVisits,map);
  localStorage.setItem(LS.visits, String(Number(localStorage.getItem(LS.visits)||0)+1));
  const r=getJSON(LS.recent,[]).filter(x=>x!==slug); r.unshift(slug); setJSON(LS.recent,r.slice(0,6));
}
function toggleFavorite(slug){
  const f=getJSON(LS.fav,[]); const idx=f.indexOf(slug); if(idx>-1)f.splice(idx,1); else f.push(slug); setJSON(LS.fav,f);
}

function card(app){
  const t=q('#cardTemplate').content.cloneNode(true);
  t.querySelector('.thumb').src=thumbFor(app);
  t.querySelector('.thumb').alt=`${app.name} thumbnail`;
  t.querySelector('h3').textContent=app.name;
  t.querySelector('.desc').textContent=app.description;
  t.querySelector('.category').textContent=app.category;
  t.querySelector('.version').textContent=`v${app.version||'1.0.0'}`;
  t.querySelector('.stars').textContent=`${starRating(app.rating||4)} (${app.rating||4})`;
  t.querySelector('.visits').textContent=`Visits: ${getJSON(LS.appVisits,{})[app.slug]||0}`;
  const open=t.querySelector('.open-btn'); open.href=app.path; open.onclick=()=>{updateVisits(app.slug)};
  t.querySelector('.preview-btn').onclick=()=>openPreview(app);
  const fav=t.querySelector('.fav-btn'); fav.textContent=getJSON(LS.fav,[]).includes(app.slug)?'★':'☆'; fav.onclick=()=>{toggleFavorite(app.slug); init();};
  return t;
}

function renderApps(apps){ const g=q('#appsGrid'); g.innerHTML=''; apps.forEach(a=>g.appendChild(card(a))); }
function renderRecent(){ const slugs=getJSON(LS.recent,[]); const recent=slugs.map(s=>state.apps.find(a=>a.slug===s)).filter(Boolean); const g=q('#recentGrid'); g.innerHTML=''; recent.forEach(a=>g.appendChild(card(a))); q('#recentSection').classList.toggle('hidden', recent.length===0); }

function applyFilters(){
  const s=q('#searchInput').value.toLowerCase().trim(); const c=q('#categoryFilter').value;
  state.filtered=state.apps.filter(a=>{
    const hay=[a.name,a.description,a.category,(a.tags||[]).join(' ')].join(' ').toLowerCase();
    return (!s||hay.includes(s)) && (c==='all'||a.category===c);
  });
  renderApps(state.filtered); renderSuggestions(s);
}
function renderSuggestions(s){ const list=q('#suggestions'); if(!s){list.innerHTML='';return;} const options=state.apps.map(a=>a.name).filter(n=>n.toLowerCase().includes(s)).slice(0,6); list.innerHTML=options.map(o=>`<li>${o}</li>`).join(''); [...list.children].forEach(li=>li.onclick=()=>{q('#searchInput').value=li.textContent;applyFilters();list.innerHTML='';}); }
function fillCategories(){ q('#categoryFilter').innerHTML='<option value="all">All Categories</option>'+categories(state.apps).map(c=>`<option value="${c}">${c}</option>`).join(''); }

function openPreview(app){ q('#previewTitle').textContent=`Preview: ${app.name}`; q('#previewFrame').src=app.path; q('#previewModal').classList.remove('hidden'); }
function closePreview(){ q('#previewModal').classList.add('hidden'); q('#previewFrame').src=''; }

async function init(){
  loadTheme();
  const data=await fetchAppsJson();
  let apps=(data?.apps||[]);
  if(!apps.length) apps=await scanAppsFolder();
  state.apps=mergeApps(apps);
  fillCategories(); renderStats(); applyFilters(); renderRecent();
}

q('#themeToggle').onclick=toggleTheme; q('#searchInput').oninput=applyFilters; q('#categoryFilter').onchange=applyFilters;
q('#closeModal').onclick=closePreview; q('#previewModal').onclick=(e)=>{if(e.target.id==='previewModal')closePreview();};
window.addEventListener('keydown',(e)=>{ if(e.key==='/'){e.preventDefault();q('#searchInput').focus();} if(e.key.toLowerCase()==='t')toggleTheme(); if(e.key==='Escape')closePreview(); });
window.addEventListener('beforeinstallprompt',(e)=>{ e.preventDefault(); state.deferredPrompt=e; q('#installBtn').classList.remove('hidden'); });
q('#installBtn').onclick=async()=>{ if(!state.deferredPrompt) return; state.deferredPrompt.prompt(); await state.deferredPrompt.userChoice; state.deferredPrompt=null; q('#installBtn').classList.add('hidden'); };
if('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js'); }
init();
