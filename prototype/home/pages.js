/* Service and Contact (12 Nov 2026): the held screen's film. Everything else is model-page.js. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const phone = matchMedia('(max-width: 767px) and (orientation: portrait)').matches;

  /* the film plays while it is on screen and the poster leaves once it is moving, as on the model pages; a phone gets its
     own upright cut where there is one; with reduced motion the poster stands still */
  document.querySelectorAll('video.pv').forEach((v) => {
    if (RM) return;
    v.src = (phone && v.dataset.m) || v.dataset.d;
    v.addEventListener('playing', () => v.parentElement.classList.add('is-on'), { once: true });
    const io = new IntersectionObserver((es) => es.forEach((x) => (x.isIntersecting ? v.play().catch(() => {}) : v.pause())), { rootMargin: '25% 0px' });
    io.observe(v.parentElement);
  });

  /* the map wakes on a click, and sleeps again on a click anywhere else on the page or when it leaves the screen, so the page
     always scrolls (the pointer's leaving cannot be used: entering Google's frame already counts as leaving the page) */
  document.querySelectorAll('[data-map]').forEach((m) => {
    const on = m.querySelector('[data-map-on]'), sleep = () => m.classList.remove('is-live');
    on.addEventListener('click', () => m.classList.add('is-live'));
    document.addEventListener('pointerdown', (e) => { if (!m.contains(e.target)) sleep(); });
    new IntersectionObserver((es) => es.forEach((x) => { if (!x.isIntersecting) sleep(); })).observe(m);
  });
})();
