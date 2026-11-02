/* Pagani of Miami — model page (Alex's brief, 1 Nov 2026). Every word and picture stands in the HTML without this file; the head adds .m only when motion is allowed. */
(() => {
  const root = document.documentElement, $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const moving = root.classList.contains('m') && window.gsap && window.ScrollTrigger;
  if (!moving) root.classList.remove('m');

  if (moving) {
    gsap.registerPlugin(ScrollTrigger);
    if (window.Lenis) {
      const lenis = window.lenis = new Lenis({ autoRaf: false });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    const wide = () => innerWidth >= 1024;

    /* hero: the name rises from its line, the car settles; leaving, the picture falls behind */
    gsap.from('.mh__n span', { yPercent: 105, duration: 1.3, ease: 'power4.out', delay: .15, clearProps: 'transform' });
    gsap.from('.mh__l', { y: 16, autoAlpha: 0, duration: 1.1, ease: 'power3.out', delay: .6, clearProps: 'opacity,visibility,transform' });
    gsap.from('.mh__a', { y: 16, autoAlpha: 0, duration: 1.1, ease: 'power3.out', delay: .8, clearProps: 'opacity,visibility,transform' });
    gsap.fromTo('.mh__m img', { scale: 1.05 }, { scale: 1, duration: 2.4, ease: 'power3.out' });
    gsap.to('.mh__m', { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.mh', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.mh__t', { yPercent: -30, ease: 'none', scrollTrigger: { trigger: '.mh', start: 'top top', end: 'bottom top', scrub: true } });

    /* words slide in softly; pictures open from the side they stand on, and drift inside their frames */
    $$('[data-rise]').forEach((el) => {
      if (el.closest('.finale')) return;
      gsap.from(el, { x: 48, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 94%', end: 'top 72%', scrub: true } });
    });
    $$('[data-open]').forEach((f) => {
      const img = $('img', f), r = f.getBoundingClientRect();
      const fromRight = r.left + r.width / 2 > innerWidth / 2;
      gsap.fromTo(f, { clipPath: fromRight ? 'inset(0% 0% 0% 22%)' : 'inset(0% 22% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: f, start: 'top 96%', end: 'top 46%', scrub: true } });
      gsap.fromTo(img, { scale: 1.12, yPercent: -3 }, { scale: 1.12, yPercent: 3, ease: 'none', scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* the profile: held on the screen, the picture settling slowly while the words float up through the middle, stay, and leave */
    gsap.fromTo('.ex__m img', { scale: 1.07 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.ex__w', start: 'top bottom', end: 'bottom bottom', scrub: true } });
    gsap.timeline({ scrollTrigger: { trigger: '.ex__w', start: 'top 40%', end: 'bottom 60%', scrub: true } })
      .fromTo('.ex__c', { yPercent: 130, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, ease: 'power2.out', duration: .35 })
      .to('.ex__c', { yPercent: 0, duration: .3 })
      .to('.ex__c', { yPercent: -130, autoAlpha: 0, ease: 'power2.in', duration: .35 });

    /* the details pass one another at different speeds */
    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': () => {
        $$('[data-drift]').forEach((el) => { const y = +el.dataset.drift; gsap.fromTo(el, { y }, { y: -y, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }); });
      },
    });

    /* the screen in the middle: the picture settles as it arrives, the words come up to its centre */
    gsap.fromTo('.mf__m', { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.mf', start: 'top bottom', end: 'top top', scrub: true } });
    gsap.from('.mf__t', { y: 48, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.mf', start: 'top 45%', end: 'top top', scrub: true } });

    /* the figures and the list come up in turn */
    gsap.from('.en__f > div', { x: 48, autoAlpha: 0, stagger: .3, ease: 'none', scrollTrigger: { trigger: '.en__f', start: 'top 92%', end: 'bottom 70%', scrub: true } });
    /* the figures climb with the scroll, like a needle, fast and then settling on the real value; the box keeps its final width in em, so the unit stands still at every size, and the HTML holds the true number without this */
    $$('.en__f dd').forEach((dd) => {
      const node = dd.firstChild, text = node.textContent.trim(), end = +text.replace(/,/g, ''), step = end >= 1000 ? 10 : 1;
      const v = document.createElement('b'); v.className = 'en__v'; v.textContent = text; v.setAttribute('aria-hidden', 'true');
      const said = document.createElement('i'); said.className = 'sr'; said.textContent = text;
      node.replaceWith(said, v);
      const fit = () => { const was = v.textContent; v.style.minWidth = ''; v.textContent = text; v.style.minWidth = `${v.getBoundingClientRect().width / parseFloat(getComputedStyle(v).fontSize)}em`; v.textContent = was; };
      fit(); document.fonts.ready.then(fit);   // the real face sets the real width
      v.textContent = '0';
      const n = { now: 0 };
      gsap.to(n, { now: end, ease: 'power2.out', onUpdate: () => { v.textContent = (n.now >= end ? end : Math.round(n.now / step) * step).toLocaleString('en-US'); }, scrollTrigger: { trigger: '.en__f', start: 'top 88%', end: 'top 42%', scrub: true } });
    });
    gsap.from('.en__d > div', { y: 18, autoAlpha: 0, stagger: .05, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.en__d', start: 'top 84%' } });

    /* the room before the footer: the car comes up out of the dark, as on the home */
    gsap.fromTo('.finale [data-finale-car] img', { filter: 'brightness(0) saturate(0.85)', scale: 1.1, yPercent: 6 }, { filter: 'brightness(0.5) saturate(0.85)', scale: 1, yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.finale', start: 'top bottom', end: 'top top', scrub: true } });

    ScrollTrigger.create({ trigger: '.mh', start: 'bottom 12%', onEnter: () => $('.hdr').classList.add('is-solid'), onLeaveBack: () => $('.hdr').classList.remove('is-solid') });
    addEventListener('load', () => ScrollTrigger.refresh());
  } else {
    const hdr = $('.hdr'), hero = $('.mh');
    const solid = () => hdr.classList.toggle('is-solid', hero.getBoundingClientRect().bottom < innerHeight * .12);
    addEventListener('scroll', solid, { passive: true }); solid();
  }

  /* header: the phone's menu, and Contact going to the form on this page */
  const toggle = $('[data-menu-toggle]'), menu = $('#menu');
  const setMenu = (open) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    $('[data-menu-label]', toggle).textContent = open ? 'Close' : 'Menu';
    if (window.lenis) { if (open) window.lenis.stop(); else window.lenis.start(); }
    if (open) $('a', menu).focus();
  };
  toggle.addEventListener('click', () => setMenu(menu.hidden));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });
  $$('[data-go]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    if (!menu.hidden) setMenu(false);
    const t = $(a.getAttribute('href'));
    if (window.lenis) window.lenis.scrollTo(t, { duration: 1.4, offset: t.closest('.finale') || t.id === 'film' ? 0 : -128 }); else t.scrollIntoView();
  }));

  /* what stays on screen: the chapters mark the one in the middle of the screen, and leave only over the form; the way to the form leaves over every screen that is a scene of its own */
  const nav = $('.mn'), card = $('.mc');
  if (nav && 'IntersectionObserver' in window) {
    const links = $$('a', nav);
    const chapters = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.setAttribute('aria-current', String(a.getAttribute('href') === `#${e.target.id}`)));
    }), { rootMargin: '-50% 0px -50% 0px' });
    links.forEach((a) => chapters.observe($(a.getAttribute('href'))));
    const watch = (el, sel, margin, over) => {
      const on = new Set();
      const io = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) on.add(e.target); else on.delete(e.target); });
        const covered = over && on.has($(over));   // Engine rides over the film: there the film no longer counts
        el.classList.toggle('is-off', !covered && on.size > 0);
      }, { rootMargin: margin });
      $$(over ? `${sel}, ${over}` : sel).forEach((s) => io.observe(s));
    };
    watch(nav, '.finale', '-30% 0px -30% 0px');
    watch(card, '.mh, .ex__w, .mf, .finale', '-50% 0px -50% 0px', '.en');
  }

  /* the carousel: swipe or drag, arrows, keys; the frame nearest the middle is the current one */
  const car = $('[data-carousel]'), track = $('[data-track]');
  if (car && track) {
    const slides = $$('.mg__s', track), now = $('[data-now]', car);
    let at = 0, steering = 0;   // while the arrows steer, their target stays the current frame, so quick presses add up
    const mid = (s) => s.offsetLeft + s.offsetWidth / 2;
    const show = () => {
      now.textContent = at + 1;
      slides.forEach((s, i) => s.classList.toggle('is-on', i === at));
    };
    const mark = () => {
      if (steering) return;
      const c = track.scrollLeft + track.clientWidth / 2;
      let best = 0, d = Infinity;
      slides.forEach((s, i) => { const k = Math.abs(mid(s) - c); if (k < d) { d = k; best = i; } });
      at = best; show();
    };
    const go = (i) => {
      at = (i + slides.length) % slides.length; show();
      clearTimeout(steering); steering = setTimeout(() => { steering = 0; mark(); }, 900);
      track.scrollTo({ left: mid(slides[at]) - track.clientWidth / 2, behavior: moving ? 'smooth' : 'auto' });
    };
    let tick = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(tick); tick = requestAnimationFrame(mark); }, { passive: true });
    $('[data-prev]', car).addEventListener('click', () => go(at - 1));
    $('[data-next]', car).addEventListener('click', () => go(at + 1));
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(at - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(at + 1); }
    });
    /* with a mouse: drag, and on letting go the strip carries on by its speed to the nearest frame */
    let down = false, sx = 0, sl = 0, lastX = 0, lastT = 0, speed = 0;
    track.addEventListener('dragstart', (e) => e.preventDefault());
    track.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true; sx = lastX = e.clientX; sl = track.scrollLeft; lastT = e.timeStamp; speed = 0;
      track.classList.add('is-drag'); track.setPointerCapture(e.pointerId); e.preventDefault(); track.focus({ preventScroll: true });
    });
    track.addEventListener('pointermove', (e) => {
      if (!down) return;
      track.scrollLeft = sl - (e.clientX - sx);
      const dt = e.timeStamp - lastT;
      if (dt > 0) { speed = (lastX - e.clientX) / dt; lastX = e.clientX; lastT = e.timeStamp; }
    });
    const release = (e) => {
      if (!down) return;
      down = false; if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId);
      const fresh = e.timeStamp - lastT < 120 ? speed : 0;   // a hand that stopped before letting go has no speed left
      const aim = track.scrollLeft + track.clientWidth / 2 + fresh * 260;
      let best = 0, d = Infinity;
      slides.forEach((s, i) => { const k = Math.abs(mid(s) - aim); if (k < d) { d = k; best = i; } });
      track.classList.remove('is-drag');
      at = best; show();
      clearTimeout(steering); steering = setTimeout(() => { steering = 0; mark(); }, 900);
      track.scrollTo({ left: mid(slides[best]) - track.clientWidth / 2, behavior: moving ? 'smooth' : 'auto' });
    };
    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);
    mark();
  }

  /* the showroom's form: the same check and wording as the home page */
  $$('[data-enq]').forEach((enq) => {
    const sel = $('[data-enq-select]', enq);
    if (sel) sel.addEventListener('change', () => sel.classList.toggle('is-filled', !!sel.value));
    enq.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = $('[data-enq-note]', enq), req = $$('[required]', enq);
      const bad = req.filter((f) => !f.value.trim() || (f.type === 'email' && !f.checkValidity()));
      req.forEach((f) => f.setAttribute('aria-invalid', bad.includes(f) ? 'true' : 'false'));
      if (bad.length) { note.textContent = 'Please add your name and a valid email.'; bad[0].focus(); return; }
      note.textContent = 'Thank you. This prototype form is not connected yet — please call (833) 290-6287.';
    });
  });
})();
