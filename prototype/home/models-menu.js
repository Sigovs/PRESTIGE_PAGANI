/* Pagani of Miami — the side menu (as on pagani.com, Alex 20 Oct 2026).
   One drawer: site sections → Hypercars → family → model. Desktop "Hypercars" opens it at the Hypercars level;
   on a phone the header's Menu button opens it at the top. Models with a page here open it; the rest open pagani.com. */
(() => {
  const mm = document.querySelector('[data-mm]');
  if (!mm || !mm.showModal) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phone = matchMedia('(max-width: 767px)');
  const levels = [...mm.querySelectorAll('[data-mm-level]')];
  const back = mm.querySelector('[data-mm-back]');
  let opener = null, closing = 0, closedAt = 0, start = 'root', cur = 'root';
  const lv = (k) => mm.querySelector(`[data-mm-level="${k}"]`);
  const show = (key, dir) => {
    levels.forEach((l) => {
      const on = l.dataset.mmLevel === key;
      l.classList.toggle('is-left', !on && dir === 'fwd' && l.classList.contains('is-on'));
      l.classList.toggle('is-on', on);
      l.hidden = !on;
    });
    cur = key;
    back.hidden = key === start;
    const first = lv(key).querySelector('a, button');
    if (first) first.focus({ preventScroll: true });
  };
  const up = () => show(lv(cur).dataset.mmParent || start);
  const openAt = (level, from) => {
    if (Date.now() - closedAt < 900) return;   // a stray second click right after closing does not reopen it
    opener = from;
    clearTimeout(closing);
    if (window.lenis) window.lenis.stop();
    if (!mm.open) mm.showModal();
    requestAnimationFrame(() => requestAnimationFrame(() => mm.classList.add('is-open')));
    start = 'root';   // Back always leads up to the site sections, as on pagani.com
    show(level);
  };
  const close = () => {
    mm.classList.remove('is-open');
    closedAt = Date.now();
    if (window.lenis) window.lenis.start();
    closing = setTimeout(() => { mm.close(); if (opener && opener.isConnected && opener.offsetParent) opener.focus({ preventScroll: true }); }, reduce ? 0 : 700);
  };
  document.querySelectorAll('[data-mm-open]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    const menu = document.getElementById('menu'), tg = document.querySelector('[data-menu-toggle]');
    if (menu && !menu.hidden && tg) tg.click();
    openAt(b.dataset.mmOpen || 'root', b);
  }));
  // phone: the header's Menu button opens this drawer instead of the old full-screen list
  const toggle = document.querySelector('[data-menu-toggle]');
  if (toggle) toggle.addEventListener('click', (e) => {
    if (!phone.matches) return;
    const menu = document.getElementById('menu');
    if (menu && !menu.hidden) return;   // let the old menu close itself if it is somehow open
    e.preventDefault(); e.stopImmediatePropagation();
    openAt('root', toggle);
  }, true);
  mm.querySelectorAll('[data-mm-go]').forEach((b) => b.addEventListener('click', () => show(b.dataset.mmGo, 'fwd')));
  back.addEventListener('click', up);
  mm.querySelector('[data-mm-close]').addEventListener('click', close);
  mm.addEventListener('cancel', (e) => { e.preventDefault(); if (cur !== start) up(); else close(); });
  mm.addEventListener('click', (e) => { if (e.target === mm) { const r = mm.getBoundingClientRect(); if (e.clientX < r.left) close(); } });
  // on the home page, section links close the drawer and glide there
  mm.querySelectorAll('[data-mm-close-go]').forEach((l) => l.addEventListener('click', (e) => {
    e.preventDefault(); close();
    const t = document.querySelector(l.getAttribute('href'));
    if (!t) return;
    setTimeout(() => { if (window.lenis) window.lenis.scrollTo(t, { duration: 1.4 }); else t.scrollIntoView(); }, reduce ? 0 : 200);
  }));
})();
