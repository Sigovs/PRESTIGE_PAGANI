/* Pagani lineup stage: prototype.
   One stage, one floor, one car at a time. Scroll drives the cars (scrub); the record (logo, name, figures)
   switches by threshold, out then in, and only ever shows one car. Soft rest only inside the stage, only after
   the user has stopped, cancelled by any new input, never on touch or under reduced motion. */
(() => {
  const q = new URLSearchParams(location.search);
  const num = (k, d) => (q.has(k) && !isNaN(parseFloat(q.get(k))) ? parseFloat(q.get(k)) : d);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(hover: none), (pointer: coarse)').matches;
  const mqMobile = matchMedia('(max-width: 767px)');

  const stage = document.querySelector('[data-stage]');
  const inner = stage.querySelector('[data-stage-inner]');
  const list = stage.querySelector('[data-models]');
  if (q.get('cars') === '4') stage.querySelectorAll('[data-optional]').forEach((el) => { el.hidden = false; });
  else stage.querySelectorAll('[data-optional]').forEach((el) => el.remove());
  const cars = [...list.querySelectorAll('[data-model]')];
  const N = cars.length;
  const META = window.CARS;
  const DIR = q.get('dir') === 'reverse' ? -1 : 1; // 1: cars face left, so the next one waits on the right and the stage drives forward
  stage.dataset.spec = q.get('spec') === 'axis' ? 'axis' : 'line';

  const SNAP = !reduce && !touch && q.get('snap') !== '0';
  const SNAP_DELAY = num('snapdelay', 220); // ms after the last scroll frame
  const SNAP_DUR = num('snapdur', 0.6);     // s, scaled by distance

  let mode = 'user'; // user | snap | nav
  let idle = 0;
  const hud = document.querySelector('[data-hud]');
  if (q.get('debug') === '1') hud.hidden = false;

  // ---------- record (one live set of nodes) ----------
  const rec = {
    root: stage.querySelector('[data-record]'),
    logo: stage.querySelector('[data-record-logo]'),
    body: stage.querySelector('[data-record-body]'),
    name: stage.querySelector('[data-record-name]'),
    specs: stage.querySelector('[data-record-specs]'),
    line: stage.querySelector('[data-record-line]'),
  };
  const axis = document.createElement('div');
  axis.className = 'axis';
  axis.setAttribute('aria-hidden', 'true');
  axis.innerHTML = '<i></i><i></i>';
  inner.appendChild(axis);
  const ctaExplore = stage.querySelector('[data-cta-explore]');
  const ctaEnquire = stage.querySelector('[data-cta-enquire]');
  const railList = stage.querySelector('[data-rail-list]');
  const railProgress = stage.querySelector('[data-rail-progress]');

  // prototype: model pages and the enquiry form do not exist yet
  [ctaExplore, ctaEnquire].forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));

  const railBtns = cars.map((car, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b>${car.querySelector('.model__name').textContent}`;
    b.addEventListener('click', () => gotoModel(i));
    li.appendChild(b);
    railList.appendChild(li);
    return b;
  });

  // ---------- geometry ----------
  const G = { vw: 0, vh: 0, floorPx: 0, pin: 0, H: 0, T: 0, U: 0, cars: [] };
  function layout() {
    const mobile = mqMobile.matches;
    G.vw = document.documentElement.clientWidth;
    G.vh = window.innerHeight;
    G.floorPx = G.vh * (mobile ? 0.5 : 0.62);
    G.H = num('hold', mobile ? 30 : 60);  // vh of calm exposure per car
    G.T = num('trans', mobile ? 55 : 80); // vh per transition
    G.U = N * G.H + (N - 1) * G.T;
    G.pin = (G.U / 100) * G.vh;
    const maxRef = Math.max(...cars.map((c) => META[c.dataset.model].refWidth));
    const base = Math.min(G.vw, 1920) * (mobile ? Math.min(1.5, 0.94 / maxRef) : 1);
    const peek = G.vw * (mobile ? 0.09 : 0.12);
    G.cars = cars.map((car) => {
      const m = META[car.dataset.model];
      let w = m.refWidth * base;
      const maxH = G.floorPx - (mobile ? 200 : 210); // keep the logo zone clear
      if ((w * m.h) / m.w > maxH) w = (maxH * m.w) / m.h;
      const h = (w * m.h) / m.w;
      car.style.setProperty('--w', `${w}px`);
      car.style.setProperty('--contact', `${m.contactY * 100}%`);
      car.style.top = `${G.floorPx - m.contactY * h}px`;
      const wheels = (car.dataset.wheels || '0.2,0.8').split(',').map(Number);
      return { w, h, offset: G.vw / 2 + w / 2 - peek, wheels };
    });
    stage.style.setProperty('--floor-px', `${G.floorPx}px`);
    stage.style.setProperty('--floor-y', `${(G.floorPx / G.vh) * 100}%`);
  }

  // scroll offsets inside the pin, as fractions of U
  const holdStart = (i) => (i * (G.H + G.T)) / G.U;
  const holdEnd = (i) => (i * (G.H + G.T) + G.H) / G.U;
  const holdCenter = (i) => (i * (G.H + G.T) + G.H / 2) / G.U;
  const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2); // the car rolls in and settles

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

  // ---------- frame ----------
  const setX = cars.map((car) => gsap.quickSetter(car, 'x', 'px'));
  let lastC = -1;
  let hudC = 0;
  if (!hud.hidden) gsap.ticker.add(() => { hud.textContent = `progress ${p.toFixed(3)}   car ${(hudC + 1).toFixed(2)}   record ${active + 1}\nmode ${mode}   soft rest ${SNAP ? 'on' : 'off'}`; });
  let active = 0;
  let p = 0;
  function frame(progress) {
    p = progress;
    const c = cFromP(progress);
    if (c !== lastC) {
      cars.forEach((car, i) => {
        const s = (i - c) * DIR;
        const off = Math.abs(s) > 1.6;
        car.setAttribute('aria-hidden', off ? 'true' : 'false');
        if (!off) setX[i](s * G.cars[i].offset);
      });
      lastC = c;
    }
    // threshold with hysteresis, so sitting on the midpoint never flickers
    const near = Math.round(c);
    if (near !== active && Math.abs(c - active) > 0.56) setActive(near);
    railProgress.style.transform = `scaleX(${progress})`;
    hudC = c;
  }

  // ---------- record switch: out, swap, in; never queued ----------
  let shown = -1;
  let sw = null;
  function fillRecord(i) {
    const car = cars[i];
    const logo = car.querySelector('.model__logo');
    rec.logo.src = logo.getAttribute('src');
    rec.logo.alt = car.querySelector('.model__name').textContent;
    rec.name.textContent = car.querySelector('.model__name').textContent;
    rec.specs.innerHTML = car.querySelector('.model__specs').innerHTML;
    rec.line.textContent = car.querySelector('.model__line').textContent;
    ctaExplore.href = `#${car.id}`;
    ctaExplore.textContent = `Explore the ${car.querySelector('.model__name').textContent}`;
    ctaEnquire.href = `#enquire-${car.dataset.model}`;
    placeAxis(i);
    shown = i;
  }
  function placeAxis(i) {
    if (stage.dataset.spec !== 'axis') return;
    const g = G.cars[i];
    const left = G.vw / 2 - g.w / 2;
    const xf = left + g.wheels[0] * g.w;
    const xr = left + g.wheels[1] * g.w;
    axis.style.setProperty('--ax-l', `${xf - g.w * 0.06}px`);
    axis.style.setProperty('--ax-w', `${xr - xf + g.w * 0.12}px`);
    const ticks = axis.querySelectorAll('i');
    ticks[0].style.left = `${xf}px`;
    ticks[1].style.left = `${xr}px`;
    rec.specs.querySelectorAll(':scope > div').forEach((d, k, all) => {
      d.style.left = `${xf + ((k + 1) / (all.length + 1)) * (xr - xf)}px`;
    });
  }
  function setActive(i, instant) {
    active = i;
    railBtns.forEach((b, k) => b.setAttribute('aria-current', k === i ? 'true' : 'false'));
    const els = [rec.logo, rec.body, axis];
    if (reduce || instant || shown === -1) {
      if (sw) sw.kill();
      gsap.set(els, { autoAlpha: 1, y: 0 });
      fillRecord(i);
      return;
    }
    if (sw) sw.kill(); // no queue: whatever was running stops where it is
    sw = gsap.timeline()
      .to(els, { autoAlpha: 0, y: -6, duration: 0.16, ease: 'power2.in', overwrite: true })
      .add(() => fillRecord(active)) // always the latest target, never a stale one
      .fromTo(els, { y: 8 }, { autoAlpha: 1, y: 0, duration: 0.26, ease: 'power3.out', stagger: 0.04 });
  }

  // ---------- hero: crop decided from the subject, copy placed where the car is not ----------
  const heroSec = document.querySelector('.hero');
  const heroPic = heroSec.querySelector('[data-hero-img]');
  function composeHero() {
    const mobile = mqMobile.matches;
    const [x0, y0, x1, y1] = (mobile ? heroPic.dataset.subjectM : heroPic.dataset.subject).split(',').map(Number);
    const [iw, ih] = (mobile ? heroPic.dataset.sizeM : heroPic.dataset.size).split(',').map(Number);
    const vw = heroSec.clientWidth, vh = heroSec.clientHeight;
    const k = Math.max(vw / iw, vh / ih);
    const dw = iw * k, dh = ih * k;
    const hdr = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hdr-h')) || 80;
    // horizontal: the whole car is visible, centred where the crop allows
    const cx = ((x0 + x1) / 2) * dw;
    let left = Math.min(Math.max(cx - vw / 2, 0), dw - vw);
    if (x0 * dw < left) left = x0 * dw - 16;           // never cut the nose
    if (x1 * dw > left + vw) left = x1 * dw - vw + 16;  // never cut the tail
    left = Math.min(Math.max(left, 0), dw - vw);
    // vertical: the car stands low (its wheels at ~88% of the screen), leaving the upper field for the copy
    const want = y1 * dh - vh * (mobile ? 0.86 : 0.88);
    const top = Math.min(Math.max(want, 0), dh - vh);
    heroSec.style.setProperty('--hero-pos', `${-left}px ${-top}px`);
    const carTop = y0 * dh - top;
    heroSec.style.setProperty('--car-top', `${(carTop / vh) * 100}%`);
    // the copy's bottom sits a clear gap above the roof; shrink the title if the field is too short
    const gap = Math.max(24, vh * 0.04);
    heroSec.style.setProperty('--copy-bottom', `${vh - carTop + gap}px`);
    const copy = heroSec.querySelector('.hero__copy');
    let kh = 1;
    heroSec.style.setProperty('--h1-k', kh);
    while (kh > 0.55 && copy.getBoundingClientRect().top < hdr + 16) { kh -= 0.05; heroSec.style.setProperty('--h1-k', kh.toFixed(2)); }
    window.__hero = { car: { x: x0 * dw - left, y: carTop, w: (x1 - x0) * dw, h: (y1 - y0) * dh }, copy: copy.getBoundingClientRect().toJSON(), k: kh };
  }
  composeHero();
  addEventListener('resize', composeHero);
  heroPic.addEventListener('load', composeHero);

  // ---------- reduced motion: a static stage with tabs ----------
  if (reduce) {
    stage.classList.add('is-live', 'is-static');
    layout();
    cars.forEach((car) => { car.style.transform = 'none'; });
    const show = (i) => {
      cars.forEach((car, k) => { car.classList.toggle('is-active', k === i); car.setAttribute('aria-hidden', k === i ? 'false' : 'true'); });
      setActive(i, true);
    };
    var gotoModel = (i) => { show(i); stage.scrollIntoView(); };
    show(0);
    addEventListener('resize', () => { layout(); placeAxis(active); });
    wireLinks(null);
    return;
  }

  // ---------- smooth scroll + pin ----------
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ autoRaf: false, anchors: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;
  window.__stage = () => ({ p: +p.toFixed(4), car: +(hudC + 1).toFixed(3), record: active + 1, mode, y: Math.round(lenis.scroll) });

  stage.classList.add('is-live');
  layout();

  const st = ScrollTrigger.create({
    trigger: stage,
    start: 'top top',
    end: () => `+=${G.pin}`,
    pin: inner,
    pinSpacing: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => frame(self.progress),
    onRefresh: (self) => { lastC = -1; frame(self.progress); },
  });

  // hero: text leaves first, light dims, the stage rises over it like a curtain
  const heroCopy = document.querySelector('[data-hero-copy]');
  const heroShade = document.querySelector('[data-hero-shade]');
  const heroImg = document.querySelector('[data-hero-img]');
  const ZOOM = q.get('zoom') === '1';
  ScrollTrigger.create({
    trigger: stage,
    start: 'top bottom',
    end: 'top top',
    onUpdate: (self) => {
      const t = self.progress;
      const out = Math.min(t / 0.3, 1);
      gsap.set(heroCopy, { autoAlpha: 1 - out, y: -16 * out });
      gsap.set(heroShade, { opacity: 0.55 * t });
      if (ZOOM) gsap.set(heroImg, { scale: 1 + 0.06 * t });
    },
  });

  // ---------- arrivals: everything that enters the page floats in ----------
  // hero: the scene comes up from black, then the copy rises line by line
  gsap.from(heroImg, { autoAlpha: 0, scale: 1.04, duration: 1.8, ease: 'power2.out' });
  gsap.from(heroCopy.children, { autoAlpha: 0, y: 28, duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.5 });
  gsap.from('.hdr', { autoAlpha: 0, y: -12, duration: 0.9, ease: 'power3.out', delay: 0.3 });

  // the stage's own type arrives with the curtain, not before it
  const stageUi = [stage.querySelector('.stage__head'), rec.root, stage.querySelector('[data-rail]')];
  gsap.fromTo(stageUi, { autoAlpha: 0, y: 40 }, {
    autoAlpha: 1, y: 0, ease: 'none', stagger: 0.08,
    scrollTrigger: { trigger: stage, start: 'top 55%', end: 'top top', scrub: true },
  });
  // the first car rolls in under the curtain, from where the next one would wait
  const firstIn = gsap.fromTo(cars[0], { xPercent: 18 * DIR }, {
    xPercent: 0, ease: 'none', scrollTrigger: { trigger: stage, start: 'top bottom', end: 'top top', scrub: true },
  });

  // text: rise and settle, bound to the role, not to a section
  gsap.utils.toArray('[data-reveal]:not([data-reveal="plate"])').forEach((el) => {
    gsap.from(el, { autoAlpha: 0, y: 32, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } });
  });
  // photographs: opened by a mask from below while the picture settles, then the columns drift at two speeds
  gsap.utils.toArray('[data-reveal="plate"]').forEach((el, k) => {
    const img = el.querySelector('img');
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' } })
      .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)', y: 60 }, { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.4, ease: 'power4.out', delay: k * 0.12 })
      .fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, '<');
    const depth = +el.dataset.depth || 0;
    gsap.fromTo(img, { yPercent: depth ? 6 : 3 }, { yPercent: depth ? -6 : -3, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // ---------- navigation: rail, menu, skip ----------
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function glide(y, duration, kind) {
    clearTimeout(idle);
    mode = kind;
    lenis.scrollTo(y, { duration, easing: easeInOut, lock: false, force: true, onComplete: () => { mode = 'user'; } });
  }
  function gotoModel(i) {
    const y = st.start + holdCenter(i) * G.pin;
    const d = Math.abs(y - lenis.scroll) / G.vh;
    glide(y, Math.min(Math.max(0.8 + d * 0.3, 0.8), 2.2), 'nav');
  }
  function gotoTarget(sel) {
    if (sel === '#lineup') return glide(st.start, 1.2, 'nav');
    const el = document.querySelector(sel);
    if (!el) return;
    const y = el.getBoundingClientRect().top + lenis.scroll;
    const d = Math.abs(y - lenis.scroll) / G.vh;
    glide(y, Math.min(Math.max(0.9 + d * 0.15, 0.9), 2.4), 'nav');
  }
  wireLinks({ gotoTarget });

  // any new input cancels a snap or a glide at once
  const cancel = () => { if (mode !== 'user') { mode = 'user'; } clearTimeout(idle); };
  lenis.on('virtual-scroll', cancel);
  addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(e.key) && mode !== 'user') {
      lenis.scrollTo(lenis.scroll, { immediate: true, force: true });
      cancel();
    }
  });

  // ---------- soft rest ----------
  if (SNAP) {
    lenis.on('scroll', () => {
      if (mode !== 'user') return;
      clearTimeout(idle);
      idle = setTimeout(trySnap, SNAP_DELAY);
    });
  }
  function trySnap() {
    if (mode !== 'user') return;
    if (Math.abs(lenis.velocity) > 0.05) { idle = setTimeout(trySnap, 60); return; }
    const y = lenis.scroll;
    const rel = y - st.start;
    if (rel <= 0 || rel >= G.pin) return;          // outside the stage: never pull anyone back in
    const c = cFromP(rel / G.pin);
    if (c <= 0 || c >= N - 1) return;               // first and last exposures release freely
    if (Math.abs(c - Math.round(c)) < 1e-4) return; // already resting on a car
    const i = Math.floor(c);
    const a = st.start + holdEnd(i) * G.pin;        // the nearer of the two resting positions
    const b = st.start + holdStart(i + 1) * G.pin;
    const target = Math.abs(a - y) <= Math.abs(b - y) ? a : b;
    const span = (G.T / 100) * G.vh;
    glide(target, SNAP_DUR * (0.5 + Math.abs(target - y) / span), 'snap');
  }

  // ---------- resize ----------
  let rz = 0;
  addEventListener('resize', () => {
    clearTimeout(rz);
    rz = setTimeout(() => { layout(); ScrollTrigger.refresh(); placeAxis(active); }, 120);
  });

  frame(0);
  setActive(0, true);

  // ---------- menu + links (shared with the reduced path) ----------
  function wireLinks(api) {
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
    document.querySelectorAll('[data-goto-model]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      const i = cars.findIndex((c) => c.dataset.model === a.dataset.gotoModel);
      if (!menu.hidden) setMenu(false);
      if (i > -1) gotoModel(i);
    }));
    document.querySelectorAll('[data-goto]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      if (!menu.hidden) setMenu(false);
      if (api) api.gotoTarget(a.dataset.goto);
      else document.querySelector(a.dataset.goto)?.scrollIntoView();
    }));
  }
})();
