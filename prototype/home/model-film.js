/* Pagani of Miami — the model's own film stays on YouTube: silent, no controls, only the seconds that show this car, starting over while it is near the screen. YouTube draws its own title and icons when playback starts or restarts, so the photograph covers those moments. Without scripts, or with reduced motion, the photograph stands. Play video opens it whole with sound. */
(() => {
  let api;
  const loadApi = () => api || (api = new Promise((done) => {
    window.onYouTubeIframeAPIReady = () => done(window.YT);
    const s = document.createElement('script'); s.src = 'https://www.youtube.com/iframe_api'; document.head.append(s);
  }));

  /* the loop */
  const el = document.querySelector('[data-yt]');
  if (el && !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const CLEAR = 3200;   // how long YouTube's own title stays up after playback starts
    const noCaptions = (p) => { try { p.unloadModule('captions'); p.unloadModule('cc'); } catch (e) { /* older player */ } };
    const from = +el.dataset.from, to = +el.dataset.to;
    let player = null, near = false, lift = 0;
    const cover = () => { clearTimeout(lift); lift = 0; el.classList.remove('is-on'); };
    const uncover = () => { clearTimeout(lift); lift = setTimeout(() => el.classList.add('is-on'), CLEAR); };
    const start = async () => {
      const YT = await loadApi();
      const slot = document.createElement('div'); el.append(slot);
      player = new YT.Player(slot, {
        host: 'https://www.youtube-nocookie.com', videoId: el.dataset.yt,
        playerVars: { autoplay: 1, mute: 1, controls: 0, playsinline: 1, rel: 0, modestbranding: 1, disablekb: 1, fs: 0, iv_load_policy: 3, cc_load_policy: 0, start: from },
        events: {
          onReady: (e) => { e.target.getIframe().tabIndex = -1; e.target.mute(); noCaptions(e.target); if (near) e.target.playVideo(); },
          onStateChange: (e) => {
            if (e.data !== YT.PlayerState.PLAYING) return;
            noCaptions(e.target);
            if (!el.classList.contains('is-on') && !lift) uncover();
          },
        },
      });
      // a second before the end the photograph comes back, and behind it the film starts over
      setInterval(() => {
        if (!near || !player.getCurrentTime) return;
        const t = player.getCurrentTime();
        if (t >= to - 1) cover();
        if (t >= to || t < from - 1) { player.seekTo(from, true); uncover(); }
      }, 300);
    };
    new IntersectionObserver((es) => es.forEach((e) => {
      near = e.isIntersecting;
      if (near && !player) start();
      else if (player && player.playVideo) {
        if (near) player.playVideo();
        else { player.pauseVideo(); cover(); }
      }
    }), { rootMargin: '200px 0px' }).observe(el);
  }

  /* the whole film, with sound; without scripts the link goes to YouTube */
  document.querySelectorAll('[data-film]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const d = document.createElement('dialog');
    d.className = 'mfd';
    d.setAttribute('aria-label', 'The film');
    d.innerHTML = `<button type="button" class="cta cta--quiet mfd__x">Close</button><div class="mfd__f"><iframe src="https://www.youtube-nocookie.com/embed/${a.dataset.film}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="The film" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    document.body.append(d);
    if (window.lenis) window.lenis.stop();
    d.addEventListener('close', () => { d.remove(); if (window.lenis) window.lenis.start(); a.focus(); });
    d.querySelector('.mfd__x').addEventListener('click', () => d.close());
    d.addEventListener('click', (ev) => { if (ev.target === d) d.close(); });
    d.showModal();
  }));
})();
