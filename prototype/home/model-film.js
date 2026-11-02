/* Pagani of Miami — the model's own film: silent, without controls, only the seconds that show this car, running round without a pause from the moment the page opens. The photograph stands until the film moves. Without scripts, or with reduced motion, the photograph stands. Play video opens the whole film with sound. */
(() => {
  /* on Vimeo: its background mode is silent, without controls or titles, and starts over by itself */
  const vm = document.querySelector('[data-vimeo]');
  if (vm && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    let frame = null, player = null;
    const start = () => {
      frame = document.createElement('iframe');
      frame.src = `https://player.vimeo.com/video/${vm.dataset.vimeo}?background=1&muted=1&loop=1`;
      frame.allow = 'autoplay; fullscreen'; frame.tabIndex = -1; frame.title = 'The film';
      vm.append(frame);
      const s = document.createElement('script'); s.src = 'https://player.vimeo.com/api/player.js';
      s.onload = () => { player = new window.Vimeo.Player(frame); player.on('timeupdate', () => vm.classList.add('is-on')); };   // the picture stands until the film is really moving
      document.head.append(s);
    };
    start();   // at once, not waiting for the photographs above: the film is already moving when the visitor arrives
  }

  /* our own loop file, a lighter one on a phone or a thin connection */
  const mp = document.querySelector('[data-mp4]');
  if (mp && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const v = document.createElement('video');
    const net = navigator.connection, thin = net && (net.saveData || /2g|3g/.test(net.effectiveType));
    v.src = `${mp.dataset.mp4}${thin || matchMedia('(max-width: 767px)').matches ? '-m' : ''}.mp4`; v.preload = 'auto'; v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.setAttribute('aria-hidden', 'true');
    v.addEventListener('playing', () => mp.classList.add('is-on'), { once: true });
    mp.append(v); v.play().catch(() => {});
  }

  /* the whole film, with sound; without scripts the link goes to where it lives */
  document.querySelectorAll('[data-film], [data-film-vimeo]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const d = document.createElement('dialog');
    d.className = 'mfd';
    d.setAttribute('aria-label', 'The film');
    d.innerHTML = `<button type="button" class="cta cta--quiet mfd__x">Close</button><div class="mfd__f"><iframe src="${a.dataset.filmVimeo ? `https://player.vimeo.com/video/${a.dataset.filmVimeo}?autoplay=1&dnt=1` : `https://www.youtube-nocookie.com/embed/${a.dataset.film}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}" title="The film" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    document.body.append(d);
    if (window.lenis) window.lenis.stop();
    d.addEventListener('close', () => { d.remove(); if (window.lenis) window.lenis.start(); a.focus(); });
    d.querySelector('.mfd__x').addEventListener('click', () => d.close());
    d.addEventListener('click', (ev) => { if (ev.target === d) d.close(); });
    d.showModal();
  }));
})();
