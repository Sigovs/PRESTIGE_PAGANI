/* Pagani of Miami — temporary model pages: Lenis + the enquiry that slides up from the foot (Alex, 20 Oct 2026) */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && window.Lenis) new Lenis({ autoRaf: true, anchors: true });
  const sheet = document.querySelector('[data-sheet]');
  if (!sheet || !sheet.showModal) return;
  const enq = sheet.querySelector('[data-enq]');
  let opener = null, closing = 0;
  const open = (e) => {
    e.preventDefault();
    opener = e.currentTarget;
    clearTimeout(closing);
    if (!sheet.open) sheet.showModal();
    requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add('is-open')));
    setTimeout(() => enq.querySelector('input').focus({ preventScroll: true }), reduce ? 0 : 420);
  };
  const close = () => {
    sheet.classList.remove('is-open');
    closing = setTimeout(() => { sheet.close(); if (opener) opener.focus(); }, reduce ? 0 : 700);
  };
  document.querySelectorAll('[data-sheet-open]').forEach((a) => a.addEventListener('click', open));
  sheet.querySelector('[data-sheet-close]').addEventListener('click', close);
  sheet.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  sheet.addEventListener('click', (e) => {
    if (e.target !== sheet) return;
    const r = sheet.getBoundingClientRect();
    if (e.clientY < r.top || e.clientX < r.left || e.clientX > r.right) close();
  });
  const sel = enq.querySelector('[data-enq-select]');
  if (sel) sel.addEventListener('change', () => sel.classList.toggle('is-filled', !!sel.value));
  enq.addEventListener('submit', (e) => {   // the same check and wording as the home page's enquiry
    e.preventDefault();
    const note = enq.querySelector('[data-enq-note]');
    const bad = [...enq.querySelectorAll('[required]')].filter((f) => !f.value.trim() || (f.type === 'email' && !f.checkValidity()));
    enq.querySelectorAll('[required]').forEach((f) => f.setAttribute('aria-invalid', bad.includes(f) ? 'true' : 'false'));
    if (bad.length) { note.textContent = 'Please add your name and a valid email.'; bad[0].focus(); return; }
    note.textContent = 'Thank you. This prototype form is not connected yet — please call (833) 290-6287.';
  });
})();
