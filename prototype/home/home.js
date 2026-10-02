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
  const SNAP = !reduce && !touch && q.get('snap') === '1';   // off: the models change in place now, there is nothing to settle into

  const stage = document.querySelector('[data-stage]');
  const inner = stage.querySelector('[data-stage-inner]');
  const cars = [...stage.querySelectorAll('[data-model]')];
  const N = cars.length;
  const META = window.CARS;
  const rec = {
    parts: [...stage.querySelectorAll('[data-rec]')],   // logotype top-right + description + actions: one swap, one clock
    logo: stage.querySelector('[data-record-logo]'),
    specs: stage.querySelector('[data-record-specs]'),
    line: stage.querySelector('[data-record-line]'),
    explore: stage.querySelector('[data-record-explore]'),
    count: stage.querySelector('[data-record-count]'),
  };
  let mode = 'user';
  let idle = 0;

  // ---------- rail ----------
  const railList = stage.querySelector('[data-rail-list]');
  const railBtns = cars.map((car, i) => {
    const li = document.createElement('li');
    li.className = 'row__item';
    const full = car.querySelector('.model__logo').alt;
    // the pick (name + card) and, beside it, the panel the current model opens: figures and MORE
    li.innerHTML = `<button class="row__pick" type="button" aria-label="${full}"><span class="row__name">${full}</span><span class="row__card" style="--ar:${META[car.dataset.model].h / META[car.dataset.model].w};--cy:${META[car.dataset.model].contactY}"><img src="${car.dataset.thumb}" alt=""></span></button>`
      + `<div class="row__panel"><div class="row__grid"><dl>${car.querySelector('.model__specs').innerHTML}</dl><a class="row__more" href="${car.dataset.explore}" target="_blank" rel="noopener" aria-label="More about the ${full} on pagani.com">More</a></div></div>`;
    const b = li.querySelector('.row__pick');
    b.addEventListener('click', (e) => { if (e.detail) b.blur(); window.gotoModel(i); });   // a mouse click leaves no focus ring
    railList.appendChild(li);
    return b;
  });
  const setCurrent = (r) => railBtns.forEach((b, k) => {
    const on = k === r;
    b.setAttribute('aria-current', String(on));
    b.parentElement.classList.toggle('is-current', on);
    b.parentElement.querySelector('.row__more').tabIndex = on ? 0 : -1;
  });

  // ---------- stage geometry: the car stands on the concept's floor line; the next one waits off-screen right ----------
  const G = { vw: 0, vh: 0, floor: 0, pin: 0, H: 0, T: 0, U: 0, cars: [] };
  function layout() {
    const mobile = mqMobile.matches;
    G.vw = document.documentElement.clientWidth;
    G.vh = window.innerHeight;
    G.floor = G.vh * (mobile ? 0.56 : 0.62);     // tyres a little under models back2's horizon (54.2%), so the line runs behind the cars
    G.H = num('hold', mobile ? 50 : 70);   // scroll per model, then a short stretch where the change happens
    G.T = num('trans', mobile ? 30 : 40);
    G.U = N * G.H + (N - 1) * G.T;
    G.pin = (G.U / 100) * G.vh;
    const cx = mobile ? G.vw / 2 : G.vw * 0.523;         // the car's resting centre (Figma: 1003 of 1920)
    G.cars = cars.map((car) => {
      const m = META[car.dataset.model];
      const share = +car.dataset.share;                  // one width for every car: the R Evo Roadster's from the Figma frame, less 30% (Alex, 1 Oct 2026)
      const w = (mobile ? 0.94 * 0.7 * G.vw : share * G.vw) * (+car.dataset.scale || 1);   // per-car optical correction (Alex)
      const h = (w * m.h) / m.w;
      car.style.setProperty('--w', `${w}px`);
      car.style.setProperty('--contact', `${m.contactY * 100}%`);
      car.style.top = `${G.floor + (+car.dataset.drop || 0) * G.vh - m.contactY * h}px`;
      const rest = cx - w / 2;                               // left edge when centred
      gsap.set(car, { x: rest });                           // every car stands on the same spot
      // the logotype, per car: the Figma line and height (13.43%, 9.07%) when there is room above the roof;
      // over the open-door cars it rises to just under the header and, if it must, gets smaller — never onto the car
      const top = G.floor + (+car.dataset.drop || 0) * G.vh - m.contactY * h;   // data-drop: this car sits a little lower
      const gap = mobile ? 16 : 28, ceil = mobile ? 72 : 96;
      const logoH = Math.max(Math.min(G.vh * (mobile ? 0.07 : 0.0907) * 0.9, top - gap - ceil), G.vh * 0.045);   // 10% smaller than the Figma size (Alex)
      const logoTop = Math.max(Math.min(mobile ? 64 + G.vh * 0.175 : G.vh * 0.265, top - gap - logoH), ceil);   // resting lower (Alex: twice), still clear of the roof
      const logoTopFinal = (logoTop + (+car.dataset.logoDrop || 0) * G.vh) * (+car.dataset.logoLower || 1);   // data-logo-lower: the resting point this much further down (Roadster: +20%)   // per-car nudge (Utopia Roadster: a touch lower, Alex)
      return { w, h, top, logoTop: logoTopFinal, logoH: logoH * (+car.dataset.logoScale || 1), rest, enter: G.vw + 40, exit: -w - 40 };
    });
    if (shown > -1) placeLogo(shown);
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
  const placeLogo = (i) => { const g = G.cars[i]; if (!g) return; rec.logo.style.top = `${g.logoTop}px`; rec.logo.style.height = `${g.logoH}px`; };
  function fill(i) {
    const car = cars[i];
    const logo = car.querySelector('.model__logo');
    rec.logo.src = logo.getAttribute('src');
    rec.logo.alt = logo.alt;
    placeLogo(i);
    shown = i;
  }
  // the logotype starts at the centre of the screen (behind the car) and rises to its place, 0 → 100% visible on the way (Alex)
  const behind = (i) => { const g = G.cars[Math.max(i, 0)]; return Math.max(G.vh * 0.5 - g.logoH / 2 - g.logoTop, 0); };
  function setRecord(i, instant) {
    if (i === want && !instant) return;
    want = i;
    // on a phone the row scrolls sideways: keep the current card in view
    if (sw) sw.kill();
    if (reduce || instant) { if (i > -1) fill(i); gsap.set(rec.parts, { autoAlpha: i > -1 ? 1 : 0, y: 0 }); return; }
    sw = gsap.timeline();
    // out: the logotype sinks back behind the car it belongs to, fading as it goes
    const prev = shown;
    sw.to(rec.parts, { autoAlpha: 0, y: -8, duration: 0.4, ease: 'power1.in', overwrite: true });   // out: a quiet fade where it stands
    if (i > -1) {
      // the "in" half is built after the swap, so it animates the nodes that now exist
      sw.add(() => {
        fill(want);
        sw.add(gsap.timeline()
          .set(rec.parts, { y: behind(want), autoAlpha: 0 })
          .to(rec.parts, { y: 0, duration: 1.4, ease: 'power2.out' }, 0)
          .to(rec.parts, { autoAlpha: 1, duration: 1.1, ease: 'power1.out' }, 0));   // the rise is seen: visibility leads the travel   // in: it rises out from behind the roof
      });
    }
  }

  const setX = cars.map((car) => gsap.quickSetter(car, 'x', 'px'));
  let p = 0;
  let railCur = -1;
  // ---------- the change: the cars never travel. They stand on one spot; the next one appears there as the last one fades ----------
  let carCur = -1;
  function swapCar(n) {
    cars.forEach((car, k) => {
      const on = k === n;
      car.setAttribute('aria-hidden', String(!on));
      if (on) gsap.fromTo(car, { autoAlpha: 0, y: 14, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.15, delay: carCur < 0 ? 0 : 0.18, ease: 'power2.out', overwrite: true });
      else if (k === carCur) gsap.to(car, { autoAlpha: 0, y: -6, scale: 1.01, duration: 0.6, ease: 'power1.inOut', overwrite: true });
      else gsap.set(car, { autoAlpha: 0 });
    });
    carCur = n;
  }
  function frame(progress) {
    p = progress;
    const c = cFromP(progress);
    const r = Math.min(Math.max(Math.round(c), 0), N - 1);
    if (r !== carCur) swapCar(r);
    if (r !== railCur) { railCur = r; setCurrent(r); if (mqMobile.matches) railList.parentElement.scrollTo({ left: railBtns[r].parentElement.offsetLeft - 24, behavior: 'smooth' }); }
    setRecord(r);
  }

  // ---------- reduced motion: the stage as a static block with tabs ----------
  if (reduce) {
    const f0 = document.querySelector('[data-hero-video]'); if (f0) { f0.removeAttribute('preload'); f0.pause(); }
    stage.classList.add('is-live');
    layout();
    let cur = 0;
    const show = (i) => {
      cur = i;
      cars.forEach((car, k) => { const on = k === i; car.setAttribute('aria-hidden', String(!on)); gsap.set(car, { x: G.cars[k].rest, autoAlpha: on ? 1 : 0 }); });
      setCurrent(i);
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
  const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.075, wheelMultiplier: 0.9 });   // DNA90: Lenis on the GSAP ticker
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  window.lenis = lenis;

  stage.classList.add('is-live');
  layout();
  gsap.set(rec.parts, { autoAlpha: 0 });

  const st = ScrollTrigger.create({
    trigger: stage, start: 'top top', end: () => `+=${G.pin}`, pin: inner, pinSpacing: true,
    invalidateOnRefresh: true,
    onUpdate: (self) => frame(self.progress),
    onRefresh: (self) => frame(self.progress),
  });
  // ---------- 6 · Service: the film opens from a window to the whole screen as the section rises; it plays only on screen ----------
  const svcFilm = document.querySelector('[data-svc-film]');
  const svcVid = svcFilm.querySelector('video');
  const win = mqMobile.matches ? { x: 8, y: 16 } : { x: 22, y: 18 };
  gsap.timeline({ scrollTrigger: { trigger: '#service', start: 'top bottom', end: 'top top', scrub: true } })
    .fromTo(svcFilm, { '--win-x': `${win.x}%`, '--win-y': `${win.y}%`, '--win-r': '6px', '--shade': 0.35 }, { '--win-x': '0%', '--win-y': '0%', '--win-r': '0px', '--shade': 1, ease: 'none' }, 0)
    .fromTo(svcVid, { scale: 1.3 }, { scale: 1, ease: 'none' }, 0);
  ScrollTrigger.create({ trigger: '#service', start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? svcVid.play().catch(() => {}) : svcVid.pause()) });
  // ---------- 6 · Service stays: it pins for one screen and darkens where it stands, while the next section rises over it ----------
  const svc = document.getElementById('service');
  const svcNext = svc.nextElementSibling;
  ScrollTrigger.create({ trigger: svc, start: 'top top', end: () => `+=${innerHeight}`, pin: true, pinSpacing: false, anticipatePin: 1 });
  gsap.fromTo(svc, { '--dim': 0 }, { '--dim': 0.88, ease: 'none', scrollTrigger: { trigger: svcNext, start: 'top bottom', end: 'top top', scrub: true } });

  window.__home = () => ({ p: +p.toFixed(4), car: +(cFromP(p) + 1).toFixed(3), record: want + 1, mode, y: Math.round(lenis.scroll) });

  // ---------- 1 · hero: the film loops (Alex, 1 Oct 2026); the type climbs in on intro ----------
  const hero = document.querySelector('.hero');
  const film = document.querySelector('[data-hero-video]');
  // no Pause control on the page (Alex); muted, looping, paused while the hero is off screen
  film.loop = true;
  ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? film.play().catch(() => {}) : film.pause()) });
  film.play().catch(() => {});
  gsap.timeline({ delay: 0.4 })
    // the header comes down into place; the type climbs in step by step — eyebrow, line, line, action, action
    .from('.hdr', { yPercent: -100, autoAlpha: 0, duration: 1.3, ease: 'power3.out' }, 0)
    .from(hero.querySelectorAll('[data-hero-rise]'), { y: 46, autoAlpha: 0, duration: 1.3, ease: 'power3.out', stagger: 0.16 }, 0.35);

  // ---------- 2 · stage arrival: the floor and the first car come up together as the room comes into view (the container, so the cars' own fades stay theirs) ----------
  gsap.fromTo(stage.querySelector('.models'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, ease: 'none', scrollTrigger: { trigger: stage, start: 'top 75%', end: 'top 10%', scrub: true } });
  // the room's light comes up as the stage arrives; the heading and the choice settle in after it
  gsap.fromTo(stage.querySelector('.stage__bg'), { autoAlpha: 0.2, scale: 1.06 }, { autoAlpha: 1, scale: 1, ease: 'none', scrollTrigger: { trigger: stage, start: 'top 80%', end: 'top top', scrub: true } });
  gsap.from(stage.querySelector('.row'), { autoAlpha: 0, y: 20, ease: 'none', scrollTrigger: { trigger: stage, start: 'top 40%', end: 'top top', scrub: true } });

  // ---------- 3 · Grandi Complicazioni: the film holds the screen behind; the two columns travel against each other ----------
  const gc = document.querySelector('.gc');
  gsap.fromTo(gc.querySelector('[data-gc-sky] video'), { scale: 1.08 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: gc, start: 'top bottom', end: 'bottom top', scrub: true } });   // it holds the screen; only a slow settle
  // the film runs only while the section is on screen
  // the film comes up out of our ground as the section rises: the veil lifts from solid to its resting 0.66 while the frame settles
  gsap.fromTo(gc, { '--veil': 1 }, { '--veil': 0.66, ease: 'none', scrollTrigger: { trigger: gc, start: 'top 85%', end: 'top 5%', scrub: true } });
  const gcFilm = gc.querySelector('[data-gc-film]');
  ScrollTrigger.create({ trigger: gc, start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? gcFilm.play().catch(() => {}) : gcFilm.pause()) });
  const colMove = mqMobile.matches ? [20, 60] : [50, 140];
  gsap.fromTo(gc.querySelector('[data-gc-col="a"]'), { y: colMove[0] }, { y: -colMove[0], ease: 'none', scrollTrigger: { trigger: gc, start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo(gc.querySelector('[data-gc-col="b"]'), { y: colMove[1] }, { y: -colMove[1], ease: 'none', scrollTrigger: { trigger: gc, start: 'top bottom', end: 'bottom top', scrub: true } });
  gc.querySelectorAll('[data-gc-item]').forEach((it) => {
    gsap.timeline({ scrollTrigger: { trigger: it, start: 'top 88%', toggleActions: 'play none none reverse' } })
      .fromTo(it, { clipPath: 'inset(18% 0% 0% 0%)', autoAlpha: 0, y: 80 }, { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, y: 0, duration: 1.4, ease: 'power3.out' }, 0)
      .fromTo(it.querySelector('.gc__photo'), { scale: 1.22 }, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0)
      .fromTo(it.querySelector('.gc__logo'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out' }, 0.45);
  });

  // ---------- 8 · finale: the car comes up out of the dark as the page reaches its end ----------
  const fin = document.querySelector('.finale');
  gsap.fromTo(fin.querySelector('[data-finale-car] img'), { filter: 'brightness(0) saturate(0.85)', scale: 1.1, yPercent: 6 }, { filter: 'brightness(0.5) saturate(0.85)', scale: 1, yPercent: 0, ease: 'none',   // a daylight photograph, held well down (Alex)
    scrollTrigger: { trigger: fin, start: 'top bottom', end: 'bottom bottom', scrub: true } });

  // ---------- scenes: the photograph settles as it arrives, drifts as it leaves ----------
  // Horacio's signature is written in: strokes in pen order (left to right), each outline traced by the nib, then the ink settles into it
  const sign = document.querySelector('[data-sign]');
  if (sign && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const strokes = [...sign.querySelectorAll('path')].sort((a, b) => a.getBBox().x - b.getBBox().x);
    const pen = gsap.timeline({ paused: true });
    let at = 0;
    strokes.forEach((p) => {
      const len = p.getTotalLength();
      const dur = gsap.utils.clamp(0.12, 0.9, len / 420);      // a long flourish takes longer than a dot
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0 });
      pen.to(p, { strokeDashoffset: 0, duration: dur, ease: 'power1.inOut' }, at)
         .to(p, { fillOpacity: 1, duration: 0.5, ease: 'power1.out' }, at + dur * 0.6);
      at += dur * 0.7;
    });
    ScrollTrigger.create({ trigger: sign, start: 'top 85%', once: true, onEnter: () => pen.play() });
  }

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
  gsap.utils.toArray('.sc:not(.hero), .gc').forEach((sec) => {
    const items = sec.querySelectorAll('[data-rise]');
    if (!items.length) return;
    gsap.from(items, { autoAlpha: 0, y: 42, duration: 1.3, ease: 'power3.out', stagger: 0.14,
      scrollTrigger: { trigger: sec, start: sec.id === 'service' ? 'top 15%' : 'top 55%', toggleActions: 'play none none reverse' } });   // service: the type waits for the film to open
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
      toggle.querySelector('[data-menu-label]').textContent = open ? 'Close' : 'Menu';
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
