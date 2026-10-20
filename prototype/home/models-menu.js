/* Pagani of Miami — the "Hypercars" drawer (all models by family). Open with any [data-mm-open] (optionally ="family"). */
(() => {
  const mm = document.querySelector('[data-mm]');
  if (!mm || !mm.showModal) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const levels = [...mm.querySelectorAll('[data-mm-level]')];
  const back = mm.querySelector('[data-mm-back]');
  let opener = null, closing = 0;
  const show = (key, dir) => {
    levels.forEach((l) => {
      const on = l.dataset.mmLevel === key;
      l.classList.toggle('is-left', !on && dir === 'fwd' && l.classList.contains('is-on'));
      l.classList.toggle('is-on', on);
      l.hidden = !on;
    });
    back.hidden = key === 'root';
    const first = mm.querySelector(`[data-mm-level="${key}"] a, [data-mm-level="${key}"] button`);
    if (first) first.focus({ preventScroll: true });
  };
  const open = (e) => {
    e.preventDefault();
    opener = e.currentTarget;
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const menu = document.getElementById('menu');
    if (menu && !menu.hidden && menuToggle) menuToggle.click();   // leave the phone menu for the drawer
    clearTimeout(closing);
    if (window.lenis) window.lenis.stop();
    if (!mm.open) mm.showModal();
    requestAnimationFrame(() => requestAnimationFrame(() => mm.classList.add('is-open')));
    show(opener.dataset.mmOpen || 'root');
  };
  const close = () => {
    mm.classList.remove('is-open');
    if (window.lenis) window.lenis.start();
    closing = setTimeout(() => { mm.close(); if (opener && opener.isConnected && opener.offsetParent) opener.focus(); }, reduce ? 0 : 700);
  };
  document.querySelectorAll('[data-mm-open]').forEach((b) => b.addEventListener('click', open));
  mm.querySelectorAll('[data-mm-go]').forEach((b) => b.addEventListener('click', () => show(b.dataset.mmGo, 'fwd')));
  back.addEventListener('click', () => show('root'));
  mm.querySelector('[data-mm-close]').addEventListener('click', close);
  mm.addEventListener('cancel', (e) => { e.preventDefault(); if (!back.hidden) show('root'); else close(); });
  mm.addEventListener('click', (e) => { if (e.target === mm) { const r = mm.getBoundingClientRect(); if (e.clientX < r.left) close(); } });
})();
