'use strict';

/* ==========================================================================
   1. CONFIGURACIÓN
   ========================================================================== */

const GITHUB_USER = 'hellodsgn-isa';
const MAX_REPOS = 0;

const REPOS = [
  {
    title: 'SpringEduManager',
    desc: 'Gestión de estudiantes con login por roles (ADMIN/USER), API REST y dashboard. Java 21, Spring Boot, Thymeleaf, JPA y H2.',
    tag: 'Java · Spring Boot',
    cover: 'https://raw.githubusercontent.com/hellodsgn-isa/spring-edu-manager/main/img/img2.png',
    repo: 'https://github.com/hellodsgn-isa/spring-edu-manager'
  },
  {
    title: 'Alke Wallet',
    desc: 'Billetera digital pensada para mujeres que empiezan a manejar sus ingresos: depósitos, envíos e historial. HTML, CSS, JavaScript, jQuery y Bootstrap.',
    tag: 'Front-end · Fintech',
    cover: 'https://raw.githubusercontent.com/hellodsgn-isa/proyecto-alke-wallet-front/main/Alke_wallet/assets/img/Alke-Front.png',
    repo: 'https://github.com/hellodsgn-isa/proyecto-alke-wallet-front'
  }
];

const BEHANCE = [
  {
    title: 'Web Consultoría',
    desc: 'Diseño web para una consultora.',
    tag: 'Diseño web · UX/UI',
    cover: 'assets/img/web-consultoria.jpg',
    id: '253926477',
    url: 'https://www.behance.net/gallery/253926477/Web-Consultoria'
  },
  {
    title: 'LOCAL — Rescate Patrimonial',
    desc: 'Proyecto de diseño en torno al rescate patrimonial.',
    tag: 'Diseño',
    cover: 'assets/img/local-patrimonial.jpg',
    id: '255081015',
    url: 'https://www.behance.net/gallery/255081015/LOCAL-Rescate-Patrimonial'
  },
  {
    title: 'MOVA — Honey Energy Shot',
    desc: 'Marca y visuales para un shot energético de miel.',
    tag: 'Branding',
    cover: 'assets/img/mova-honey.jpg',
    id: '254163761',
    url: 'https://www.behance.net/gallery/254163761/MOVA-Honey-Energy-Shot'
  },
  {
    title: 'Obra teatral Namazu',
    desc: 'Diseño gráfico para la obra teatral Namazu.',
    tag: 'Diseño gráfico',
    cover: 'assets/img/namazu.jpg',
    id: '229849277',
    url: 'https://www.behance.net/gallery/229849277/Obra-teatral-Namazu'
  }
];

const DEMOS = [];

/* ==========================================================================
   2. UTILIDADES
   ========================================================================== */

const grid = document.getElementById('grid');
const note = document.getElementById('note');

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

/* ==========================================================================
   3. PLANTILLAS DE TARJETAS
   ========================================================================== */

const webCard = p => `
  <a class="item d" data-k="c" href="${esc(p.demo)}" data-preview="${esc(p.demo)}" data-repo="${esc(p.repo)}" data-title="${esc(p.title)}" target="_blank" rel="noopener">
    <div class="cover" style="${p.cover ? `background-image:url('${esc(p.cover)}')` : 'background:linear-gradient(135deg,var(--code),#7FA2FF)'}"></div>
    <div class="body"><span class="kind" style="color:var(--code)">Web · demo en vivo</span>
      <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      <span class="meta">${esc(p.tag)}</span></div>
  </a>`;

const repoCard = p => `
  <a class="item c" data-k="c" href="${esc(p.repo)}" target="_blank" rel="noopener">
    <div class="cover" style="background-image:url('${esc(p.cover)}');background-color:var(--ink)"></div>
    <div class="body"><span class="kind">Código · GitHub</span>
      <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      <span class="meta">${esc(p.tag)}</span></div>
  </a>`;

/* designCard: SIN data-preview. Clic → Behance directo. */
const designCard = p => `
  <a class="item d" data-k="d" href="${esc(p.url)}" target="_blank" rel="noopener">
    <div class="cover" style="${p.cover ? `background-image:url('${esc(p.cover)}')` : ''}"></div>
    <div class="body"><span class="kind">Diseño · Behance</span>
      <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      <span class="meta">${esc(p.tag)}</span></div>
  </a>`;

const codeCard = r => `
  <a class="item c" data-k="c" href="${esc(r.html_url)}" target="_blank" rel="noopener">
    <div class="term"><b>~/${esc(GITHUB_USER)}</b> $ git clone<br>${esc(r.name)}</div>
    <div class="body"><span class="kind">Código · GitHub</span>
      <h3>${esc(r.name)}</h3><p>${esc(r.description || 'Sin descripción todavía.')}</p>
      <span class="meta">${r.language ? `<span>${esc(r.language)}</span>` : ''}<span>★ ${r.stargazers_count}</span><span>${new Date(r.pushed_at).getFullYear()}</span></span></div>
  </a>`;

/* ==========================================================================
   4. ESTADO Y RENDER
   ========================================================================== */

let designs = BEHANCE.map(designCard).join('');
let codes = '';
let webs = REPOS.map(repoCard).join('') + DEMOS.map(webCard).join('');

function interleave(){
  const d = designs.split('</a>').filter(Boolean).map(x => x + '</a>');
  const c = (webs + codes).split('</a>').filter(Boolean).map(x => x + '</a>');
  const out = [];
  for (let i = 0; i < Math.max(d.length, c.length); i++){
    if (d[i]) out.push(d[i]);
    if (c[i]) out.push(c[i]);
  }
  return out.join('');
}

function render(f){
  const parts = f === 'd' ? designs : f === 'c' ? webs + codes : interleave();
  grid.innerHTML = parts || '<p>No hay proyectos para mostrar.</p>';
}

/* ==========================================================================
   5. VISOR (solo para demos web con data-preview)
   ========================================================================== */

const viewer = document.getElementById('viewer');
const vFrame = document.getElementById('v-frame');

grid.addEventListener('click', e => {
  const a = e.target.closest('a[data-preview]');
  if (!a || e.metaKey || e.ctrlKey) return;
  e.preventDefault();

  document.getElementById('v-title').textContent = a.dataset.title;
  document.getElementById('v-open').href = a.href;

  const repo = document.getElementById('v-repo');
  repo.hidden = !a.dataset.repo;
  repo.href = a.dataset.repo || '#';

  vFrame.src = a.dataset.preview;
  viewer.showModal();
});

const closeViewer = () => { viewer.close(); vFrame.src = 'about:blank'; };

document.getElementById('v-close').addEventListener('click', closeViewer);
viewer.addEventListener('click', e => { if (e.target === viewer) closeViewer(); });
viewer.addEventListener('cancel', () => { vFrame.src = 'about:blank'; });

/* ==========================================================================
   6. FILTROS
   ========================================================================== */

document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach(x => x.setAttribute('aria-pressed', x === b));
  render(b.dataset.f);
}));

/* ==========================================================================
   7. GITHUB
   ========================================================================== */

async function loadRepos(){
  if (!MAX_REPOS) { render('all'); return; }

  if (GITHUB_USER.startsWith('TU_')) {
    note.textContent = 'Modo demo: cambia GITHUB_USER en el script.';
    render('all');
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=50`);
    if (!res.ok) throw new Error(res.status);

    const repos = (await res.json())
      .filter(r => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, MAX_REPOS);

    codes = repos.map(codeCard).join('');
  } catch (e) {
    note.textContent = 'No se pudieron cargar los repositorios de GitHub ahora mismo.';
  }

  render('all');
}

/* ==========================================================================
   8. INICIALIZACIÓN
   ========================================================================== */

render('all');
loadRepos();