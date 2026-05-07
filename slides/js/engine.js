(() => {
  const slides = document.querySelectorAll('.slide');
  const total = slides.length;
  const counter = document.getElementById('counter');
  const STORAGE_KEY = 'spotify-heuristics-slide';
  let current = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
  if (isNaN(current) || current >= total || current < 0) current = 0;

  const tocToggle = document.getElementById('toc-toggle');
  const tocPanel  = document.getElementById('toc-panel');
  const tocItems  = document.querySelectorAll('.toc-item[data-goto]');

  function updateTocActive(activeIdx) {
    tocItems.forEach(item => {
      const idx = parseInt(item.dataset.goto, 10);
      item.classList.toggle('active', idx === activeIdx);
    });
  }

  let currentStep = 0;
  function slideStepTotal(slide) {
    const n = parseInt(slide.dataset.steps, 10);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }
  function applyStep(slide, step) {
    const t = slideStepTotal(slide);
    slide.querySelectorAll('.step').forEach(el => {
      const n = parseInt(el.dataset.step, 10);
      el.classList.remove('active', 'dim');
      if (step > 0) el.classList.add(n === step ? 'active' : 'dim');
    });
    const ind = slide.querySelector('.step-indicator');
    if (ind) {
      ind.innerHTML = step > 0
        ? `<kbd>.</kbd> próximo · <kbd>,</kbd> voltar · <span style="opacity:.55">${step}/${t}</span>`
        : `<kbd>.</kbd> destacar · <kbd>,</kbd> voltar`;
    }
  }
  function nextStep() {
    const slide = slides[current];
    const t = slideStepTotal(slide);
    if (!t) return false;
    if (currentStep < t) { currentStep++; applyStep(slide, currentStep); return true; }
    return false;
  }
  function prevStep() {
    const slide = slides[current];
    const t = slideStepTotal(slide);
    if (!t) return false;
    if (currentStep > 0) { currentStep--; applyStep(slide, currentStep); return true; }
    return false;
  }

  function show(idx) {
    slides.forEach((s, i) => {
      s.classList.remove('active', 'exit-left', 'exit-right');
      if (i < idx) s.classList.add('exit-left');
      else if (i > idx) s.classList.add('exit-right');
    });
    slides[idx].classList.add('active');
    counter.textContent = `${idx + 1} / ${total}`;
    localStorage.setItem(STORAGE_KEY, idx);
    updateTocActive(idx);
    currentStep = 0;
    if (slideStepTotal(slides[idx])) applyStep(slides[idx], 0);
    // Animate bar fills on entry
    const bars = slides[idx].querySelectorAll('.bar-fill[data-w]');
    bars.forEach(b => {
      b.style.width = '0%';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        b.style.width = b.dataset.w;
      }));
    });
  }

  function next() {
    if (current < total - 1) { current++; show(current); }
  }
  function prev() {
    if (current > 0) { current--; show(current); }
  }

  document.getElementById('nav-next').addEventListener('click', next);
  document.getElementById('nav-prev').addEventListener('click', prev);

  document.addEventListener('keydown', (e) => {
    if (tocPanel && tocPanel.classList.contains('open')) {
      if (e.key === 'Escape') {
        tocToggle.classList.remove('open');
        tocPanel.classList.remove('open');
      }
      return;
    }
    if (e.key === '.') { e.preventDefault(); nextStep(); return; }
    if (e.key === ',') { e.preventDefault(); prevStep(); return; }
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp')  { e.preventDefault(); prev(); }
    if (e.key === 'Home') { current = 0; show(current); }
    if (e.key === 'End')  { current = total - 1; show(current); }
  });

  function resize() {
    const scaler = document.getElementById('scaler');
    const sw = 960, sh = 540;
    const ww = window.innerWidth, wh = window.innerHeight;
    const scale = Math.min(ww / sw, wh / sh, 2) * 0.92;
    scaler.style.transform = `scale(${scale})`;
  }
  window.addEventListener('resize', resize);
  resize();
  show(current);

  // TOC
  if (tocToggle && tocPanel) {
    tocToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      tocToggle.classList.toggle('open');
      tocPanel.classList.toggle('open');
    });
    tocItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = parseInt(item.dataset.goto, 10);
        if (idx >= 0 && idx < total) {
          current = idx;
          show(current);
        }
        tocToggle.classList.remove('open');
        tocPanel.classList.remove('open');
      });
    });
    document.addEventListener('click', (e) => {
      if (tocPanel.classList.contains('open') && !tocPanel.contains(e.target) && e.target !== tocToggle) {
        tocToggle.classList.remove('open');
        tocPanel.classList.remove('open');
      }
    });
  }

  // Theme toggle
  const THEME_KEY = 'spotify-heuristics-theme';
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light') document.documentElement.setAttribute('data-theme', 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      if (cur === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem(THEME_KEY, 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem(THEME_KEY, 'light');
      }
    });
  }
})();
