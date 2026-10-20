/* Pagani of Miami — 7 · Grand Opening (Alex, 20 Oct 2026). Replaces the old Miami section (commented out in index_v2.html).
   The background film: a muted loop, its file chosen for the screen, loaded as the section nears, playing only while on screen;
   reduced motion keeps the poster. WATCH THE FILM: the full film with sound and controls in a dark lightbox; the page does not scroll
   while it is open (Lenis stopped + overflow hidden), Esc or ✕ close it. The type's reveal is the page's own [data-rise]. */
(() => {
  const sec = document.querySelector('[data-go]');
  if (!sec) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phone = matchMedia('(max-width: 767px)');
  const bg = sec.querySelector('[data-go-bg]');
  if (phone.matches && bg.dataset.posterM) bg.poster = bg.dataset.posterM;
  let armed = false, inView = false, filmOpen = false;
  const arm = () => { if (armed || reduce) return; armed = true; bg.src = phone.matches ? bg.dataset.srcM : bg.dataset.srcD; };
  const sync = () => {
    if (reduce) return;
    if (inView && !filmOpen && !document.hidden) { arm(); bg.play().catch(() => {}); } else if (!bg.paused) bg.pause();
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((e) => { if (e[0].isIntersecting) arm(); }, { rootMargin: '120% 0px' }).observe(sec);
    new IntersectionObserver((e) => { inView = e[0].isIntersecting; sync(); }, { threshold: 0.01 }).observe(sec);
  } else { inView = true; sync(); }
  document.addEventListener('visibilitychange', sync);

  const dlg = document.querySelector('[data-go-dialog]');
  const film = dlg && dlg.querySelector('video');
  const btn = sec.querySelector('[data-go-play]');
  if (!dlg || !film || !btn || !dlg.showModal) return;
  const root = document.documentElement;
  const shut = () => {
    film.pause();
    dlg.classList.remove('is-open');
    setTimeout(() => { if (dlg.open) dlg.close(); }, reduce ? 0 : 450);
    root.classList.remove('is-film');
    if (window.lenis) window.lenis.start();
    filmOpen = false; sync();
    btn.focus({ preventScroll: true });
  };
  btn.addEventListener('click', () => {
    if (!film.getAttribute('src')) film.src = film.dataset.src;
    filmOpen = true; sync();
    if (window.lenis) window.lenis.stop();
    root.classList.add('is-film');
    dlg.showModal();
    requestAnimationFrame(() => dlg.classList.add('is-open'));
    try { film.currentTime = 0; } catch (e) {}
    film.muted = false;
    film.play().catch(() => {});
  });
  dlg.querySelector('[data-go-close]').addEventListener('click', shut);
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); shut(); });   // Esc
  dlg.addEventListener('click', (e) => { if (e.target === dlg) shut(); });
})();
