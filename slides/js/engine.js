(() => {
  const slides = document.querySelectorAll('.slide');
  const total = slides.length;
  const counter = document.getElementById('counter');
  const STORAGE_KEY = 'spotify-heuristics-slide';
  let current = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
  if (isNaN(current) || current >= total || current < 0) current = 0;

  // ─── Auto-render corner-num based on slide order ───
  slides.forEach((slide, i) => {
    const cn = slide.querySelector('.corner-num');
    if (cn) cn.textContent = String(i + 1).padStart(2, '0');
  });

  // ─── Inject story-bar segments (Instagram/Wrapped style) ───
  slides.forEach((slide) => {
    if (slide.querySelector('.story-bar')) return;
    const bar = document.createElement('div');
    bar.className = 'story-bar';
    for (let i = 0; i < total; i++) {
      const seg = document.createElement('div');
      seg.className = 'story-seg';
      bar.appendChild(seg);
    }
    slide.insertBefore(bar, slide.firstChild);
  });

  function updateStoryBars(idx) {
    slides.forEach((slide) => {
      const segs = slide.querySelectorAll('.story-seg');
      segs.forEach((s, i) => {
        s.classList.remove('done', 'curr');
        if (i < idx) s.classList.add('done');
        else if (i === idx) s.classList.add('curr');
      });
    });
  }

  // ─── Animated counters (data-count-to) ───
  function animateCounter(el) {
    const target = parseFloat(el.dataset.countTo);
    if (!Number.isFinite(target)) return;
    const dur = parseInt(el.dataset.countDur, 10) || 900;
    const decimals = (el.dataset.countTo.split('.')[1] || '').length;
    const start = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      el.textContent = decimals
        ? value.toFixed(decimals).replace('.', ',')
        : Math.round(value).toString();
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = decimals
        ? target.toFixed(decimals).replace('.', ',')
        : String(target);
    }
    requestAnimationFrame(frame);
  }
  function runCounters(slide) {
    slide.querySelectorAll('[data-count-to]').forEach(animateCounter);
  }

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
    // If a step element is inside a scrollable container, keep it in view.
    const activeStep = slide.querySelector('.step.active');
    if (activeStep) {
      const scroller = activeStep.closest('.pl-tracks');
      if (scroller) {
        const tr = activeStep.getBoundingClientRect();
        const sr = scroller.getBoundingClientRect();
        if (tr.top < sr.top || tr.bottom > sr.bottom) {
          activeStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
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
    updateStoryBars(idx);
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
    // Animate counters
    runCounters(slides[idx]);
    // Reset Now Playing state when navigating back to it
    if (slides[idx].classList.contains('nowplay')) resetNowPlaying(slides[idx]);
    // Reset Playlist slide state when navigating back to it
    if (slides[idx].classList.contains('playlist-slide')) resetPlaylistSlide(slides[idx]);
  }

  // ─── Now Playing cinematic play sequence ───
  const NP_FROM_SEC    = 8;    // initial track time (0:08)
  const NP_TO_SEC      = 210;  // track length (3:30) — typical pop song
  const NP_TOTAL_MS    = 3500; // total cinematic, then auto-advance
  const NP_CURSOR_DELAY  = 250; // delay before cursor starts moving
  const NP_CURSOR_TRAVEL = 1000; // cursor travel time

  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2,'0')}`;
  }
  function npStartPercent() {
    return (NP_FROM_SEC / NP_TO_SEC) * 100;
  }

  // Position in slide-internal coords (0..960, 0..540) accounting for the scaler
  function slideCoords(slide, target) {
    const sr = slide.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    const scaleX = sr.width / 960;
    const scaleY = sr.height / 540;
    return {
      x: (tr.left + tr.width / 2 - sr.left) / scaleX,
      y: (tr.top + tr.height / 2 - sr.top) / scaleY,
    };
  }

  function ensureCursor(slide) {
    let cur = slide.querySelector('.np-cursor');
    if (cur) return cur;
    cur = document.createElement('div');
    cur.className = 'np-cursor';
    cur.innerHTML = `<svg viewBox="0 0 28 28" width="24" height="24"><path d="M2 2 L2 21 L7 17 L10 25 L13 24 L10 16 L17 16 Z" fill="#fff" stroke="#0a0a0a" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
    slide.appendChild(cur);
    return cur;
  }

  function resetNowPlaying(slide) {
    slide.classList.remove('playing');
    const heart = slide.querySelector('.np-heart');
    if (heart) heart.classList.remove('liked');
    const cur = slide.querySelector('.np-cursor');
    if (cur) {
      cur.style.transition = 'none';
      cur.style.opacity = '0';
      cur.classList.remove('clicking');
    }
    const times = slide.querySelectorAll('.np-progress-time span');
    if (times.length >= 2) {
      times[0].textContent = fmtTime(NP_FROM_SEC);
      times[1].textContent = '-' + fmtTime(NP_TO_SEC - NP_FROM_SEC);
    }
    // Slider back to start position
    const fill  = slide.querySelector('.np-progress-fill');
    const thumb = slide.querySelector('.np-progress-thumb');
    const startPct = npStartPercent();
    if (fill)  { fill.style.transition = 'none'; fill.style.width = startPct + '%'; }
    if (thumb) { thumb.style.transition = 'none'; thumb.style.left = startPct + '%'; }
  }

  function startNowPlayingShow(slide) {
    if (slide.classList.contains('playing')) return;

    // 1. Slide-level .playing → swaps icon to ⏸, slider turns green via CSS
    slide.classList.add('playing');

    // 2. Real-time playback: time advances 1s per 1s, slider follows.
    //    Track is 3:30, so during a 3.5s cinematic the slider barely moves —
    //    that's intentional, it should feel like the song is just starting.
    const times = slide.querySelectorAll('.np-progress-time span');
    const fill  = slide.querySelector('.np-progress-fill');
    const thumb = slide.querySelector('.np-progress-thumb');
    const startTs = performance.now();
    (function tick(now) {
      const elapsedSec = ((now || performance.now()) - startTs) / 1000;
      const cur = Math.min(NP_TO_SEC, NP_FROM_SEC + elapsedSec);
      const pct = (cur / NP_TO_SEC) * 100;
      if (times.length >= 2) {
        times[0].textContent = fmtTime(cur);
        times[1].textContent = '-' + fmtTime(NP_TO_SEC - cur);
      }
      if (fill)  fill.style.width = pct + '%';
      if (thumb) thumb.style.left = pct + '%';
      if (elapsedSec * 1000 < NP_TOTAL_MS && cur < NP_TO_SEC) requestAnimationFrame(tick);
    })();

    // 3. Cursor appears at play button, moves to heart, clicks
    const playBtn = slide.querySelector('.np-play');
    const heart   = slide.querySelector('.np-heart');
    if (playBtn && heart) {
      const cur = ensureCursor(slide);
      const startPos = slideCoords(slide, playBtn);
      const endPos   = slideCoords(slide, heart);

      // Reset cursor at play button
      cur.style.transition = 'none';
      cur.style.left = startPos.x + 'px';
      cur.style.top  = startPos.y + 'px';
      cur.style.opacity = '0';

      requestAnimationFrame(() => {
        cur.style.transition = 'opacity .25s ease';
        cur.style.opacity = '1';

        setTimeout(() => {
          cur.style.transition = `left ${NP_CURSOR_TRAVEL}ms cubic-bezier(.5,0,.15,1), top ${NP_CURSOR_TRAVEL}ms cubic-bezier(.5,0,.15,1)`;
          cur.style.left = endPos.x + 'px';
          cur.style.top  = endPos.y + 'px';

          // On arrival: click ripple + heart fills
          setTimeout(() => {
            cur.classList.add('clicking');
            heart.classList.add('liked');
            setTimeout(() => cur.classList.remove('clicking'), 600);

            // Cursor fades out a bit later
            setTimeout(() => {
              cur.style.transition = 'opacity .4s ease';
              cur.style.opacity = '0';
            }, 700);
          }, NP_CURSOR_TRAVEL);
        }, NP_CURSOR_DELAY);
      });
    }

    // 4. Auto-advance after the full sequence
    setTimeout(() => next(), NP_TOTAL_MS);
  }

  // Wire up the play button on the Now Playing slide
  document.querySelectorAll('.nowplay .np-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const slide = btn.closest('.nowplay');
      if (slide) startNowPlayingShow(slide);
    });
  });

  // ─── Playlist slide — step through tracks via . / , (engine handles step state) ───
  function resetPlaylistSlide(slide) {
    const scroller = slide.querySelector('.pl-tracks');
    if (scroller) scroller.scrollTop = 0;
  }

  // Clicking the big play button advances one step (same as pressing .)
  document.querySelectorAll('.playlist-slide .pl-play-big').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextStep();
    });
  });

  // ─── Problem Carousel — image gallery with prev/next + dots ───
  document.querySelectorAll('.problem-carousel').forEach(carousel => {
    const slides   = carousel.querySelectorAll('.pc-slide');
    const dots     = carousel.querySelectorAll('.pc-dot');
    const track    = carousel.querySelector('.pc-track');
    const caption  = carousel.querySelector('.pc-caption');
    const prevBtn  = carousel.querySelector('.pc-arrow.prev');
    const nextBtn  = carousel.querySelector('.pc-arrow.next');
    const total    = slides.length;

    carousel.dataset.count = String(total);
    carousel.dataset.currentIndex = '0';

    // Set initial caption from first slide (so single-slide carousels also show it)
    if (caption && slides[0]) {
      caption.textContent = slides[0].dataset.caption || '';
    }

    if (total > 1) {
      function update() {
        const index = parseInt(carousel.dataset.currentIndex, 10) || 0;
        if (track) track.style.transform = `translateX(${-index * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
        if (caption) caption.textContent = slides[index].dataset.caption || '';
        if (prevBtn) prevBtn.classList.toggle('disabled', index === 0);
        if (nextBtn) nextBtn.classList.toggle('disabled', index === total - 1);
      }
      function go(i) {
        const target = Math.max(0, Math.min(total - 1, i));
        carousel.dataset.currentIndex = String(target);
        update();
      }
      if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); go((parseInt(carousel.dataset.currentIndex,10)||0) - 1); });
      if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); go((parseInt(carousel.dataset.currentIndex,10)||0) + 1); });
      dots.forEach((d, i) => d.addEventListener('click', (e) => { e.stopPropagation(); go(i); }));
      update();
    }

    // Click on the phone frame opens the image dialog
    const frame = carousel.querySelector('.pc-frame');
    if (frame) {
      frame.addEventListener('click', (e) => {
        // ignore if clicked an internal arrow
        if (e.target.closest('.pc-arrow')) return;
        const startIdx = parseInt(carousel.dataset.currentIndex, 10) || 0;
        openImageDialog(slides, startIdx);
      });
    }
  });

  // ─── Image Dialog (modal with large carousel) ───
  let imageDialog = null;
  let dialogIndex = 0;
  let dialogSlides = [];
  let dialogOpen = false;

  function ensureImageDialog() {
    if (imageDialog) return imageDialog;
    imageDialog = document.createElement('div');
    imageDialog.className = 'image-dialog';
    imageDialog.innerHTML = `
      <button class="id-close" aria-label="Fechar">×</button>
      <button class="id-arrow prev" aria-label="Anterior">‹</button>
      <button class="id-arrow next" aria-label="Próxima">›</button>
      <div class="id-content">
        <div class="id-counter"></div>
        <div class="id-frame"><div class="id-track"></div></div>
        <div class="id-heuristics">
          <div class="id-h-title">Heurísticas violadas</div>
          <div class="id-h-table"></div>
        </div>
        <div class="id-caption"></div>
        <div class="id-dots"></div>
      </div>
    `;
    document.body.appendChild(imageDialog);

    imageDialog.querySelector('.id-close').addEventListener('click', closeImageDialog);
    imageDialog.addEventListener('click', (e) => {
      if (e.target === imageDialog) closeImageDialog();
    });
    imageDialog.querySelector('.id-arrow.prev').addEventListener('click', (e) => {
      e.stopPropagation(); goImageDialog(dialogIndex - 1);
    });
    imageDialog.querySelector('.id-arrow.next').addEventListener('click', (e) => {
      e.stopPropagation(); goImageDialog(dialogIndex + 1);
    });
    return imageDialog;
  }

  function openImageDialog(slides, startIndex) {
    ensureImageDialog();
    dialogSlides = Array.from(slides);
    dialogIndex = Math.max(0, Math.min(dialogSlides.length - 1, startIndex || 0));

    const track = imageDialog.querySelector('.id-track');
    track.innerHTML = '';
    dialogSlides.forEach(slide => {
      const div = document.createElement('div');
      div.className = 'id-slide';
      const img = slide.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt || '';
        div.appendChild(newImg);
      }
      track.appendChild(div);
    });

    // Build dots
    const dotsContainer = imageDialog.querySelector('.id-dots');
    dotsContainer.innerHTML = '';
    if (dialogSlides.length > 1) {
      dialogSlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'id-dot';
        dot.addEventListener('click', () => goImageDialog(i));
        dotsContainer.appendChild(dot);
      });
      dotsContainer.style.display = 'flex';
      imageDialog.querySelector('.id-arrow.prev').style.display = 'flex';
      imageDialog.querySelector('.id-arrow.next').style.display = 'flex';
      imageDialog.querySelector('.id-counter').style.display = 'block';
    } else {
      dotsContainer.style.display = 'none';
      imageDialog.querySelector('.id-arrow.prev').style.display = 'none';
      imageDialog.querySelector('.id-arrow.next').style.display = 'none';
      imageDialog.querySelector('.id-counter').style.display = 'none';
    }

    goImageDialog(dialogIndex);
    imageDialog.classList.add('open');
    dialogOpen = true;
  }

  function goImageDialog(idx) {
    if (idx < 0 || idx >= dialogSlides.length) return;
    dialogIndex = idx;
    const track = imageDialog.querySelector('.id-track');
    track.style.transform = `translateX(${-idx * 100}%)`;

    const dots = imageDialog.querySelectorAll('.id-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));

    const caption = imageDialog.querySelector('.id-caption');
    caption.textContent = dialogSlides[idx].dataset.caption || '';

    const heuristicsBox = imageDialog.querySelector('.id-heuristics');
    const heuristicsTable = imageDialog.querySelector('.id-h-table');
    const rawH = dialogSlides[idx].dataset.heuristics || '';
    if (rawH) {
      heuristicsTable.innerHTML = rawH.split(';').map(item => {
        const [code, name] = item.split(':');
        return `<div class="id-h-row"><span class="id-h-code">${code.trim()}</span><span class="id-h-name">${(name || '').trim()}</span></div>`;
      }).join('');
      heuristicsBox.style.display = 'flex';
    } else {
      heuristicsTable.innerHTML = '';
      heuristicsBox.style.display = 'none';
    }

    const counter = imageDialog.querySelector('.id-counter');
    counter.textContent = `${idx + 1} / ${dialogSlides.length}`;

    imageDialog.querySelector('.id-arrow.prev').classList.toggle('disabled', idx === 0);
    imageDialog.querySelector('.id-arrow.next').classList.toggle('disabled', idx === dialogSlides.length - 1);
  }

  function closeImageDialog() {
    if (imageDialog) imageDialog.classList.remove('open');
    dialogOpen = false;
  }

  // ─── Discoverability thumbnails — each opens its own image dialog ───
  document.querySelectorAll('.disc-thumb').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      openImageDialog([thumb], 0);
    });
  });

  // Keyboard handling for image dialog (overrides slide nav while open)
  document.addEventListener('keydown', (e) => {
    if (!dialogOpen) return;
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeImageDialog(); return; }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); e.stopPropagation(); goImageDialog(dialogIndex - 1); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); goImageDialog(dialogIndex + 1); return; }
  }, true); /* capture phase to beat the slide-nav handler */

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
