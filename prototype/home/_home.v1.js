/* Pagani of Miami — home prototype motion.
   One stage (pinned, scroll-driven, soft rest). Every other scene floats in: photographs settle as the
   section arrives and drift as it leaves; type rises in order. Everything is bound to roles, and the page is
   complete with no script (content is only hidden by the script itself, at the moment it animates). */
(() => {
  const q = new URLSearchParams(location.search);
  const num = (k, d) => (q.has(k) && !isNaN(parseFloat(q.get(k))) ? parseFloat(q.get(k)) : d);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(hover: none), (pointer: coarse)').matches;
  const mqMobile = matchMedia('(max-width: 767px)');
  const SNAP = !reduce && !touch && q.get('snap') !== '0';

  const stage = document.querySelector('[data-stage]');
  const inner = stage.querySelector('[data-stage-inner]');
  const cars = [...stage.querySelectorAll('[data-model]')];
  const N = cars.length;
  const META = window.CARS;
  const rec = {
    root: stage.querySelector('[data-record]'),
    logo: stage.querySelector('[data-record-logo]'),
    specs: stage.querySelector('[data-record-specs]'),
    line: stage.querySelector('[data-record-line]'),
  };
  let mode = 'user';
  let idle = 0;

  // ---------- rail ----------
  const railList = stage.querySelector('[data-rail-list]');
  const railBtns = cars.map((car, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    const full = car.querySelector('.model__logo').alt;
    b.innerHTML = `<span class="full">${full}</span><span class="short">${full.replace('Huayra R Evo Roadster', 'R Evo').replace('Utopia Roadster', 'Roadster')}</span>`;
    b.setAttribute('aria-label', full);
    b.addEventListener('click', () => window.gotoModel(i));
    li.appendChild(b);
    railList.appendChild(li);
    return b;
  });

  // ---------- stage geometry: the car stands right of centre, the record holds the left column ----------
  const G = { vw: 0, vh: 0, floor: 0, pin: 0, H: 0, T: 0, U: 0, cars: [] };
  function layout() {
    const mobile = mqMobile.matches;
    G.vw = document.documentElement.clientWidth;
    G.vh = window.innerHeight;
    G.floor = G.vh * (mobile ? 0.66 : 0.68);
    G.H = num('hold', mobile ? 40 : 70);
    G.T = num('trans', mobile ? 60 : 80);
    G.U = N * G.H + (N - 1) * G.T;
    G.pin = (G.U / 100) * G.vh;
    const gutter = Math.max(24, Math.min(G.vw * 0.065, 128));
    const cx = mobile ? G.vw / 2 : G.vw * 0.6;           // the car's resting centre
    const scale = mobile ? 0.94 / 0.6 : (G.vw < 1200 ? 0.86 : 0.95);
    const base = Math.min(G.vw, 1920) * scale;
    let minLeft = Infinity;
    G.cars = cars.map((car) => {
      const m = META[car.dataset.model];
      let w = m.refWidth * base;
      const maxH = G.floor - (mobile ? G.vh * 0.36 : G.vh * 0.2);
      if ((w * m.h) / m.w > maxH) w = (maxH * m.w) / m.h;
      const h = (w * m.h) / m.w;
      car.style.setProperty('--w', `${w}px`);
      car.style.setProperty('--contact', `${m.contactY * 100}%`);
      car.style.top = `${G.floor - m.contactY * h}px`;
      const rest = cx - w / 2;                               // left edge when centred
      minLeft = Math.min(minLeft, rest);
      return { w, rest, enter: G.vw + 40, exit: -w - 40 };
    });
    // the record column ends a clear gap before the widest car begins
    stage.style.setProperty('--col-w', `${Math.max(220, Math.min(380, minLeft - gutter - 56))}px`);
    stage.style.setProperty('--floor-y', `${(G.floor / G.vh) * 100}%`);
    stage.style.setProperty('--car-cx', `${(cx / G.vw) * 100}%`);
  }

  const holdStart = (i) => (i * (G.H + G.T)) / G.U;
  const holdEnd = (i) => (i * (G.H + G.T) + G.H) / G.U;
  const holdCenter = (i) => (i * (G.H + G.T) + G.H / 2) / G.U;
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  function cFromP(p) {
    let x = Math.min(Math.max(p, 0), 1) * G.U;
    for (let i = 0; i < N; i++) {
      if (x <= G.H) return i;
      x -= G.H;
      if (i === N - 1) return N - 1;
      if (x <= G.T) return i + ease(x / G.T);
      x -= G.T;
    }
    return N - 1;
  }

  // ---------- record: shown only while a car stands; out → swap → in, never queued ----------
  let shown = -1;
  let want = -2;
  let sw = null;
  function fill(i) {
    const car = cars[i];
    const logo = car.querySelector('.model__logo');
    rec.logo.src = logo.getAttribute('src');
    rec.logo.alt = logo.alt;
    rec.specs.innerHTML = car.querySelector('.model__specs').innerHTML;
    rec.line.textContent = car.querySelector('.model__line').textContent;
    shown = i;
  }
  function setRecord(i, instant) {
    if (i === want && !instant) return;
    want = i;
    if (i > -1) railBtns.forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
    if (sw) sw.kill();
    if (reduce || instant) { if (i > -1) fill(i); gsap.set(rec.root.children, { autoAlpha: i > -1 ? 1 : 0, y: 0 }); return; }
    sw = gsap.timeline();
    sw.to(rec.root.children, { autoAlpha: 0, y: -10, duration: 0.22, ease: 'power2.in', stagger: 0.03, overwrite: true });
    if (i > -1) {
      // the "in" half is built after the swap, so it animates the nodes that now exist
      sw.add(() => {
        fill(want);
        sw.add(gsap.timeline()
          .fromTo(rec.root.children, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.07 })
          .fromTo(rec.specs.children, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.08 }, 0.12));
      });
    }
  }

  const setX = cars.map((car) => gsap.quickSetter(car, 'x', 'px'));
  let p = 0;
  function frame(progress) {
    p = progress;
    const c = cFromP(progress);
    cars.forEach((car, i) => {
      const g = G.cars[i];
      const s = i - c; // >0: still to come (waits off right), <0: gone (left)
      let x;
      if (s >= 0) x = g.rest + Math.min(s, 1) * (g.enter - g.rest);
      else x = g.rest + Math.max(s, -1) * (g.rest - g.exit);
      const off = s > 1 || s < -1;
      car.setAttribute('aria-hidden', String(off));
      if (!off) setX[i](x);
    });
    const r = Math.round(c);
    setRecord(Math.abs(c - r) < 0.015 ? r : -1);
  }

  // ---------- reduced motion: the stage as a static block with tabs ----------
  if (reduce) {
    const f0 = document.querySelector('[data-hero-video]'); if (f0) { f0.removeAttribute('preload'); f0.pause(); }
    stage.classList.add('is-live');
    layout();
    let cur = 0;
    const show = (i) => {
      cur = i;
      cars.forEach((car, k) => { car.setAttribute('aria-hidden', String(k !== i)); gsap.set(car, { x: G.cars[k].rest, autoAlpha: k === i ? 1 : 0 }); });
      setRecord(i, true);
    };
    window.gotoModel = show;
    show(0);
    addEventListener('resize', () => { layout(); show(cur); });
    wire(null);
    return;
  }

  // ---------- smooth scroll ----------
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ autoRaf: false, anchors: false, lerp: 0.085 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;

  stage.classList.add('is-live');
  layout();
  gsap.set(rec.root.children, { autoAlpha: 0 });

  const st = ScrollTrigger.create({
    trigger: stage, start: 'top top', end: () => `+=${G.pin}`, pin: inner, pinSpacing: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => frame(self.progress),
    onRefresh: (self) => frame(self.progress),
  });
  window.__home = () => ({ p: +p.toFixed(4), car: +(cFromP(p) + 1).toFixed(3), record: want + 1, mode, y: Math.round(lenis.scroll) });

  // ---------- 1 · hero: the film plays once and rests on its last frame; the type simply fades in ----------
  const hero = document.querySelector('.hero');
  const film = document.querySelector('[data-hero-video]');
  const toggle = document.querySelector('[data-hero-toggle]');
  const END = q.has('end') ? parseFloat(q.get('end')) : null; // optional earlier resting frame, e.g. ?end=38
  const setLabel = () => { const p = film.paused; toggle.textContent = p ? 'Play' : 'Pause'; toggle.setAttribute('aria-label', p ? 'Play the film' : 'Pause the film'); };
  film.play().catch(() => {});
  film.addEventListener('play', setLabel); film.addEventListener('pause', setLabel);
  film.addEventListener('ended', () => { toggle.hidden = true; });
  if (END) film.addEventListener('timeupdate', () => { if (film.currentTime >= END) { film.pause(); film.currentTime = END; toggle.hidden = true; } });
  toggle.addEventListener('click', () => (film.paused ? film.play() : film.pause()));
  gsap.timeline({ delay: 0.4 })
    .from('.hdr', { autoAlpha: 0, duration: 1.2, ease: 'power2.out' }, 0)
    .from(hero.querySelectorAll('[data-hero-rise]'), { autoAlpha: 0, duration: 1.4, ease: 'power2.out', stagger: 0.25 }, 0.3);

  // ---------- 2 · stage arrival: the first car slides in as the room comes into view ----------
  gsap.fromTo(cars[0], { xPercent: 30 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'top top', scrub: true } });
  gsap.fromTo(stage.querySelector('.stage__floor'), { autoAlpha: 0 }, { autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: stage, start: 'top 70%', end: 'top top', scrub: true } });
  gsap.from(stage.querySelector('.rail'), { autoAlpha: 0, y: 20, ease: 'none', scrollTrigger: { trigger: stage, start: 'top 40%', end: 'top top', scrub: true } });

  // ---------- scenes: the photograph settles as it arrives, drifts as it leaves ----------
  gsap.utils.toArray('[data-scene]').forEach((sec) => {
    const img = sec.querySelector('[data-scene-media] img');
    gsap.fromTo(img, { scale: 1.16, yPercent: -4, filter: 'brightness(0.35)' }, { scale: 1, yPercent: 0, filter: 'brightness(1)', ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top top', scrub: true } });
    gsap.to(img, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true } });
  });
  // splits: the picture is uncovered from its outer edge while the detail moves into place
  gsap.utils.toArray('[data-split-media]').forEach((m) => {
    const right = m.classList.contains('split__media--right');
    const img = m.querySelector('img');
    gsap.timeline({ scrollTrigger: { trigger: m.parentElement, start: 'top 85%', end: 'top 15%', scrub: true } })
      .fromTo(m, { clipPath: right ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
      .fromTo(img, { scale: 1.3, xPercent: right ? 8 : -8 }, { scale: 1, xPercent: 0, ease: 'none' }, 0);
    gsap.to(img, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: m.parentElement, start: 'top top', end: 'bottom top', scrub: true } });
  });
  // type: rises in order inside its own scene (bound to the role, not to a section)
  gsap.utils.toArray('.sc:not(.hero)').forEach((sec) => {
    const items = sec.querySelectorAll('[data-rise]');
    if (!items.length) return;
    gsap.from(items, { autoAlpha: 0, y: 42, duration: 1.3, ease: 'power3.out', stagger: 0.14,
      scrollTrigger: { trigger: sec, start: 'top 55%', toggleActions: 'play none none reverse' } });
  });

  // ---------- navigation ----------
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function glide(y, duration, kind) {
    clearTimeout(idle);
    mode = kind;
    lenis.scrollTo(y, { duration, easing: easeInOut, lock: false, force: true, onComplete: () => { mode = 'user'; } });
  }
  function gotoModel(i) {
    const y = st.start + holdCenter(i) * G.pin;
    glide(y, Math.min(Math.max(0.9 + (Math.abs(y - lenis.scroll) / G.vh) * 0.3, 0.9), 2.2), 'nav');
  }
  window.gotoModel = gotoModel;
  wire({ go: (sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const y = sel === '#lineup' ? st.start : el.getBoundingClientRect().top + lenis.scroll;
    glide(y, Math.min(Math.max(1 + (Math.abs(y - lenis.scroll) / G.vh) * 0.12, 1), 2.6), 'nav');
  } });
  const cancel = () => { mode = 'user'; clearTimeout(idle); };
  lenis.on('virtual-scroll', cancel);
  addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(e.key) && mode !== 'user') { lenis.scrollTo(lenis.scroll, { immediate: true, force: true }); cancel(); }
  });

  // ---------- soft rest: inside the stage only, after the user stops, never back into it ----------
  if (SNAP) lenis.on('scroll', () => { if (mode !== 'user') return; clearTimeout(idle); idle = setTimeout(rest, num('snapdelay', 220)); });
  function rest() {
    if (mode !== 'user') return;
    if (Math.abs(lenis.velocity) > 0.05) { idle = setTimeout(rest, 60); return; }
    const y = lenis.scroll;
    const rel = y - st.start;
    if (rel <= 0 || rel >= G.pin) return;
    const c = cFromP(rel / G.pin);
    if (c <= 0 || c >= N - 1 || Math.abs(c - Math.round(c)) < 1e-4) return;
    const i = Math.floor(c);
    const a = st.start + holdEnd(i) * G.pin;
    const b = st.start + holdStart(i + 1) * G.pin;
    const target = Math.abs(a - y) <= Math.abs(b - y) ? a : b;
    glide(target, num('snapdur', 0.7) * (0.5 + Math.abs(target - y) / ((G.T / 100) * G.vh)), 'snap');
  }

  let rz = 0;
  addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { layout(); ScrollTrigger.refresh(); }, 120); });
  frame(0);

  // ---------- menu + links ----------
  function wire(api) {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.getElementById('menu');
    const setMenu = (open) => {
      menu.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
      if (window.lenis) open ? window.lenis.stop() : window.lenis.start();
      if (open) menu.querySelector('a').focus();
    };
    toggle.addEventListener('click', () => setMenu(menu.hidden));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); toggle.focus(); } });
    document.querySelectorAll('[data-goto]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      if (!menu.hidden) setMenu(false);
      if (api) api.go(a.dataset.goto); else document.querySelector(a.dataset.goto)?.scrollIntoView();
    }));
  }
})();
