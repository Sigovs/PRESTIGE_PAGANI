/* Pagani of Miami — home prototype motion.
   One stage: the models change by hand (arrows, cards, keys, swipe), not by scroll (Alex, 2 Oct 2026). Every other scene floats in: photographs settle as the
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
  let curModel = 0;
  const setCurrent = (r) => { curModel = r; railBtns.forEach((b, k) => {
    const on = k === r;
    b.setAttribute('aria-current', String(on));
    b.parentElement.classList.toggle('is-current', on);
    b.parentElement.querySelector('.row__more').tabIndex = on ? 0 : -1;
  }); };
  // arrows, keys and swipe all step through the same list, round and round
  const step = (d) => window.gotoModel((curModel + d + N) % N);
  stage.querySelector('[data-stage-prev]').addEventListener('click', (e) => { if (e.detail) e.currentTarget.blur(); step(-1); });
  stage.querySelector('[data-stage-next]').addEventListener('click', (e) => { if (e.detail) e.currentTarget.blur(); step(1); });
  addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const r = stage.getBoundingClientRect();
    if (r.top > innerHeight * 0.5 || r.bottom < innerHeight * 0.5 || e.target.closest('input, textarea, select')) return;
    e.preventDefault(); step(e.key === 'ArrowRight' ? 1 : -1);
  });
  let sx = null;
  inner.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  inner.addEventListener('touchend', (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50 && !e.target.closest('.row')) step(dx < 0 ? 1 : -1); });

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

  // no pin, no scroll-driven change: the first model stands; its logotype rises in when the stage arrives
  function show(i) {
    const r = ((i % N) + N) % N;
    if (r !== carCur) swapCar(r);
    if (r !== railCur) { railCur = r; setCurrent(r); if (mqMobile.matches) railList.parentElement.scrollTo({ left: railBtns[r].parentElement.offsetLeft - 24, behavior: 'smooth' }); }
    if (seen) setRecord(r);
  }
  let seen = false;
  ScrollTrigger.create({ trigger: stage, start: 'top 60%', once: true, onEnter: () => { seen = true; setRecord(curModel); } });
  // ---------- 6 · Service: the film opens from a window to the whole screen as the section rises; it plays only on screen ----------
  const svcFilm = document.querySelector('[data-svc-film]');
  const svcVid = svcFilm.querySelector('video');
  const win = mqMobile.matches ? { x: 8, y: 16 } : { x: 22, y: 18 };
  gsap.timeline({ scrollTrigger: { trigger: '#service', start: 'top bottom', end: 'top top', scrub: true } })
    .fromTo(svcFilm, { '--win-x': `${win.x}%`, '--win-y': `${win.y}%`, '--win-r': '6px', '--shade': 0.35 }, { '--win-x': '0%', '--win-y': '0%', '--win-r': '0px', '--shade': 1, ease: 'none' }, 0)
    .fromTo(svcVid, { scale: 1.3 }, { scale: 1, ease: 'none' }, 0);
  ScrollTrigger.create({ trigger: '#service', start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? svcVid.play().catch(() => {}) : svcVid.pause()) });
  // Service no longer holds or darkens: after About's hold it is the calm stretch before Miami (scroll review, 2 Oct 2026)

  window.__home = () => ({ car: curModel + 1, record: want + 1, mode, y: Math.round(lenis.scroll) });

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

  // ---------- 3 · Grandi Complicazioni: four full-screen scenes, held on desktop; the scroll drives each turn ----------
  // Each chapter is 1 unit: ~35% turn, ~65% calm. The turns are one scrubbed sequence; the words follow the chapter's state (classes), never the scrub.
  const gcx = document.querySelector('[data-gcx]');
  const gScenes = [...gcx.querySelectorAll('[data-gcs]')];
  const gNav = [...gcx.querySelectorAll('[data-gcs-go]')];
  const GN = gScenes.length, TURN = 0.42;
  const gVideo = (sc) => sc.querySelector('[data-gcs-video]');
  let gState = -2, gcxIn = false;
  const hdrEl = document.querySelector('.hdr');
  const hdrLight = (on) => hdrEl.classList.toggle('is-light', !!on);
  const gSet = (active, shown) => {   // active chapter; shown = its words are allowed (the turn is ~85% done)
    const key = active * 2 + (shown ? 1 : 0);
    if (key === gState) return; gState = key;
    gScenes.forEach((sc, k) => {
      sc.classList.toggle('is-on', shown && k === active);
      sc.classList.toggle('is-past', k < active);
      const v = gVideo(sc); if (v) (k === active ? v.play().catch(() => {}) : v.pause());
    });
    gNav.forEach((b, k) => b.setAttribute('aria-current', String(k === active)));
    gcx.classList.toggle('is-light', gScenes[active].classList.contains('gcs--light'));
    hdrLight(gcx.classList.contains('is-stage') && gScenes[active].classList.contains('gcs--light') && gcxIn);
  };
  const gmm = gsap.matchMedia();
  gmm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    gcx.classList.add('is-stage');
    gScenes.forEach((sc, k) => { sc.style.zIndex = k + 1; });
    const [s1, s2, s3, s4] = gScenes;
    const EASE = 'sine.inOut';   // one ease for every turn: no hard start, no hard stop
    // intro — runs while the section rises into view, so the car is there from the first moment:
    // a wide window (~70%) set around the car opens to the full frame; the photograph keeps its scale
    let introP = 0, pinST = null;
    let intro = null;
    intro = gsap.fromTo(s1, { clipPath: 'inset(9% 16% 9% 13%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: gcx, start: 'top 55%', end: 'top top', scrub: 0.25 },
      // the words follow the frame as drawn (the scrub's smoothed progress), never the raw scroll
      onUpdate: function () { introP = this.progress(); gcx.classList.toggle('is-titled', introP > 0.4); if (!pinST || pinST.progress === 0) gSet(0, introP > 0.88); } });
    // the held stage, measured in screens of scroll. Diagnosis (2 Oct 2026): the Codalunga's 1440 px slide ran over ~390 px of scroll with a sine curve —
    // ~3.7 px of panel per px of scroll, ~5.8 at mid-curve. Now: the scroll itself is the easing (ease 'none'), the slide gets a full screen of scroll,
    // the rises three quarters of one, and the scrub smooths start and stop.
    const V = 0.5, TH = 1.0, TV = 0.75, END = 0.4, SH = 0;   // view, horizontal turn, vertical turn, last view, the Codalunga's shrink (in screens)
    const turns = [[V, TH + SH], [V + TH + SH + V, TV], [V + TH + SH + V + TV + V, TV]];   // [start, length] of turns 1..3 (turn 1 = the slide in + the shrink)
    const LEN = turns[2][0] + TV + END;
    // the Codalunga arrives as the whole photograph across the screen, then shrinks to its place on the right, leaving the field for its words (Alex)
    const m2 = s2.querySelector('.gcs__media');
    const fill = () => { const r = m2.getBoundingClientRect(), sw = s2.clientWidth, sh = s2.clientHeight; return Math.max(sw / (r.width / (gsap.getProperty(m2, 'scale') || 1)), sh / (r.height / (gsap.getProperty(m2, 'scale') || 1))); };
    gsap.set(m2, { transformOrigin: '100% 100%' });
    const tl = gsap.timeline({ defaults: { ease: 'none' } });
    tl.fromTo(s2, { xPercent: 100 }, { xPercent: 0, duration: TH }, turns[0][0])
      .fromTo(s1, { xPercent: 0 }, { xPercent: -5, duration: TH }, turns[0][0])
      // the Codalunga grows from a smaller size as it arrives and while it is looked at (Alex)
      .fromTo(s2.querySelectorAll('.gcs__car, .gcs__shadow'), { scale: 0.74 }, { scale: 1, duration: TH + V * 0.9 }, turns[0][0] + TH * 0.35)
      .fromTo(s3, { yPercent: 100 }, { yPercent: 0, duration: TV }, turns[1][0])
      .fromTo(s4, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: TV }, turns[2][0])   // the Tricolore opens over the Epitome from the foot — the frame stays still, only the edge moves (Alex)
      .to({}, { duration: END }, turns[2][0] + TV);
    pinST = ScrollTrigger.create({ trigger: gcx, start: 'top top', end: () => `+=${innerHeight * LEN}`, pin: true, scrub: 0.35, animation: tl, invalidateOnRefresh: true,
      onToggle: (self) => { gcxIn = self.isActive; gState = -2; gChapter(); } });
    // the chapter's words follow the timeline's own time — where the panels actually are after the scrub — not the scroll position
    tl.eventCallback('onUpdate', () => gChapter());
    function gChapter() {
      const t = tl.time();
      let k = 0; turns.forEach(([a], i) => { if (t >= a) k = i + 1; });   // the chapter whose turn has begun
      if (k === 0) return gSet(0, introP > 0.88);
      const [a, d] = turns[k - 1];
      gSet(k, (t - a) / d >= (k === 1 ? 0.97 : 0.95));   // the old words leave as the turn begins; the new ones arrive near its end (the Codalunga's after its shrink)
    }
    gSet(0, false);
    const go = (k) => { const t = k === 0 ? V * 0.5 : turns[k - 1][0] + turns[k - 1][1] + 0.15; lenis.scrollTo(pinST.start + (t / LEN) * (pinST.end - pinST.start), { duration: 1.2 }); };
    const onNav = (e) => { const b = e.currentTarget; if (e.detail) b.blur(); go(+b.dataset.gcsGo); };
    gNav.forEach((b) => b.addEventListener('click', onNav));
    return () => { gsap.set(m2, { clearProps: 'transform,transformOrigin' }); gcx.classList.remove('is-stage', 'is-light'); gScenes.forEach((sc) => { sc.style.zIndex = ''; sc.classList.remove('is-on', 'is-past'); }); gcx.classList.remove('is-titled'); gNav.forEach((b) => b.removeEventListener('click', onNav)); gState = -2; };
  });
  // phone (and reduced motion): the scenes in the flow; each scene's words appear as it comes into view, its film plays while it is on screen
  gmm.add('(max-width: 767px), (prefers-reduced-motion: reduce)', () => {
    // the header turns light while the light Codalunga scene is under it
    const lightSc = gcx.querySelector('.gcs--light');
    const hl = lightSc && ScrollTrigger.create({ trigger: lightSc, start: () => `top ${hdrEl.offsetHeight}px`, end: () => `bottom ${hdrEl.offsetHeight}px`, onToggle: (self) => hdrLight(self.isActive) });
    const trs = gScenes.map((sc) => ScrollTrigger.create({ trigger: sc, start: 'top 70%', end: 'bottom 30%',
      onToggle: (self) => { const v = gVideo(sc); if (v) (self.isActive ? v.play().catch(() => {}) : v.pause()); } }));
    gsap.utils.toArray(gcx.querySelectorAll('.gcs__t')).forEach((el) => gsap.from(el, { autoAlpha: 0, y: 16, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } }));
    return () => { trs.forEach((t) => t.kill()); if (hl) hl.kill(); hdrLight(false); };
  });

  // ---------- 8 · finale: the car comes up out of the dark as the page reaches its end ----------
  const fin = document.querySelector('.finale');
  gsap.fromTo(fin.querySelector('[data-finale-car] img'), { filter: 'brightness(0) saturate(0.85)', scale: 1.1, yPercent: 6 }, { filter: 'brightness(0.5) saturate(0.85)', scale: 1, yPercent: 0, ease: 'none',   // a daylight photograph, held well down (Alex)
    scrollTrigger: { trigger: fin, start: 'top bottom', end: 'bottom bottom', scrub: true } });

  // Miami: the car drives through the frame — in from the left as the section arrives, on to the right as it leaves
  const miamiImg = document.querySelector('#miami [data-scene-media] img');
  if (miamiImg) {
    gsap.fromTo(miamiImg, { xPercent: -8, filter: 'brightness(0.45)' }, { xPercent: 0, filter: 'brightness(1)', ease: 'none', scrollTrigger: { trigger: '#miami', start: 'top bottom', end: 'top top', scrub: true } });
    gsap.fromTo(miamiImg, { xPercent: 0 }, { xPercent: 7, ease: 'none', immediateRender: false, scrollTrigger: { trigger: '#miami', start: 'top top', end: 'bottom top', scrub: true } });
  }

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

  // About holds the screen; under Horacio the pictures change one by one, each settling as it arrives; after the last the page moves on.
  // Before and after the hold the three planes travel at three speeds.
  const aboutSec = document.getElementById('about');
  const aboutWrap = aboutSec.querySelector('[data-about-bg]');
  const shots = gsap.utils.toArray(aboutWrap.querySelectorAll('[data-shot]'));
  const aboutMan = aboutSec.querySelector('[data-scene-media]');
  const k = mqMobile.matches ? 0.5 : 1;
  shots.forEach((s) => gsap.set(s, { yPercent: s.classList.contains('about__shot--wide') ? -50 : 0 }));
  const hold = gsap.timeline({ scrollTrigger: { trigger: aboutSec, start: 'top top', end: () => `+=${innerHeight * (shots.length - 1) * 0.8}`, pin: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true } });
  shots.forEach((s, i) => {
    if (i) hold.to(shots[i - 1], { autoAlpha: 0, duration: 0.28, ease: 'none' }, i - 0.3).fromTo(s, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.28, ease: 'none' }, i - 0.3);
  });
  // the chapter line changes with its picture: the old one lifts away, the new one rises in; the counter turns over
  const lines = gsap.utils.toArray(aboutSec.querySelectorAll('[data-ch]'));
  const chNum = aboutSec.querySelector('[data-ch-n]');
  lines.forEach((l, i) => {
    if (!i) return;
    const at = i - 0.3;
    hold.to(lines[i - 1], { autoAlpha: 0, y: -22, duration: 0.2, ease: 'power1.in' }, at)
      .fromTo(l, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power2.out' }, at + 0.12)
      .to(chNum, { yPercent: -60, autoAlpha: 0, duration: 0.12, ease: 'power1.in' }, at)
      .fromTo(chNum, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.14, ease: 'power2.out', immediateRender: false }, at + 0.12);
  });
  // the digit itself follows the playhead, so it is right in both directions
  hold.eventCallback('onUpdate', () => {
    const t = hold.time();
    const n = 1 + lines.filter((l, i) => i && t >= i - 0.3 + 0.12).length;
    const txt = String(n).padStart(2, '0');
    if (chNum.textContent !== txt) chNum.textContent = txt;
  });
  // while it holds, the man drifts left to right and the pictures slide the other way: depth sideways
  hold.to({}, { duration: 0.35 });   // a breath on the last chapter before the page moves on
  const holdST = hold.scrollTrigger;
  gsap.fromTo(aboutWrap, { yPercent: -14 * k }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: aboutSec, start: 'top bottom', end: 'top top', scrub: true } });
  gsap.fromTo(aboutMan, { y: 140 * k }, { y: 0, ease: 'none', scrollTrigger: { trigger: aboutSec, start: 'top bottom', end: 'top top', scrub: true } });
  gsap.fromTo(aboutWrap, { yPercent: 0 }, { yPercent: 14 * k, ease: 'none', immediateRender: false, scrollTrigger: { start: () => holdST.end, end: () => holdST.end + innerHeight, scrub: true, invalidateOnRefresh: true } });
  gsap.fromTo(aboutMan, { y: 0 }, { y: -140 * k, ease: 'none', immediateRender: false, scrollTrigger: { start: () => holdST.end, end: () => holdST.end + innerHeight, scrub: true, invalidateOnRefresh: true } });
  gsap.utils.toArray('[data-scene]:not(#miami)').forEach((sec) => {
    const img = sec.querySelector('[data-scene-media] img');
    gsap.fromTo(img, { scale: 1.16, yPercent: -4, filter: 'brightness(0.35)' }, { scale: 1, yPercent: 0, filter: 'brightness(1)', ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top top', scrub: true } });
    if (sec.id !== 'about') gsap.to(img, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true } });   // About's hold owns its leaving
  });
  // splits: the picture is uncovered from its outer edge while the detail moves into place
  gsap.utils.toArray('[data-split-media]').forEach((m) => {
    const right = m.classList.contains('split__media--right');
    const img = m.querySelector('img, video');
    gsap.timeline({ scrollTrigger: { trigger: m.parentElement, start: 'top 85%', end: 'top 15%', scrub: true } })
      .fromTo(m, { clipPath: right ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
      .fromTo(img, { scale: 1.3, xPercent: right ? 8 : -8 }, { scale: 1, xPercent: 0, ease: 'none' }, 0);
    gsap.to(img, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: m.parentElement, start: 'top top', end: 'bottom top', scrub: true } });
  });
  // the Atelier's engine loop plays only while the section is on screen
  const artFilm = document.querySelector('[data-art-film]');
  if (artFilm) ScrollTrigger.create({ trigger: '#art', start: 'top bottom', end: 'bottom top', onToggle: (self) => (self.isActive ? artFilm.play().catch(() => {}) : artFilm.pause()) });
  // type: rises in order inside its own scene (bound to the role, not to a section)
  gsap.utils.toArray('.sc:not(.hero)').forEach((sec) => {
    const items = sec.querySelectorAll('[data-rise]');
    if (!items.length) return;
    gsap.from(items, { autoAlpha: 0, y: 42, duration: 1.3, ease: 'power3.out', stagger: 0.14,
      scrollTrigger: { trigger: sec, start: sec.id === 'service' ? 'top 15%' : 'top 55%', toggleActions: 'play none none reverse' } });   // service: the type waits for the film to open
  });

  // pins are calculated top to bottom: About's hold was created after the pins below it, so order them by place on the page once
  ScrollTrigger.sort();
  ScrollTrigger.refresh();

  // ---------- header: transparent over the hero, its own dark ground after ----------
  const hdr = document.querySelector('.hdr');
  ScrollTrigger.create({ trigger: '.hero', start: 'bottom 12%', onEnter: () => hdr.classList.add('is-solid'), onLeaveBack: () => hdr.classList.remove('is-solid') });

  // ---------- enquiry: checked in place; the prototype says plainly that it is not connected ----------
  const enq = document.querySelector('[data-enq]');
  const enqSel = document.querySelector('[data-enq-select]');
  if (enqSel) enqSel.addEventListener('change', () => enqSel.classList.toggle('is-filled', !!enqSel.value));
  if (enq) enq.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = enq.querySelector('[data-enq-note]');
    const bad = [...enq.querySelectorAll('[required]')].filter((f) => !f.value.trim() || (f.type === 'email' && !f.checkValidity()));
    enq.querySelectorAll('[required]').forEach((f) => f.setAttribute('aria-invalid', bad.includes(f) ? 'true' : 'false'));
    if (bad.length) { note.textContent = 'Please add your name and a valid email.'; bad[0].focus(); return; }
    note.textContent = 'Thank you. This prototype form is not connected yet — please call (833) 290-6287.';
  });

  // ---------- navigation ----------
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  function glide(y, duration, kind) {
    clearTimeout(idle);
    mode = kind;
    lenis.scrollTo(y, { duration, easing: easeInOut, lock: false, force: true, onComplete: () => { mode = 'user'; } });
  }
  window.gotoModel = show;
  wire({ go: (sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const y = el.getBoundingClientRect().top + lenis.scroll;
    glide(y, Math.min(Math.max(1 + (Math.abs(y - lenis.scroll) / G.vh) * 0.12, 1), 2.6), 'nav');
  } });
  const cancel = () => { mode = 'user'; clearTimeout(idle); };
  lenis.on('virtual-scroll', cancel);
  addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'].includes(e.key) && mode !== 'user') { lenis.scrollTo(lenis.scroll, { immediate: true, force: true }); cancel(); }
  });

  let rz = 0;
  addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { layout(); ScrollTrigger.refresh(); }, 120); });
  show(0);

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
