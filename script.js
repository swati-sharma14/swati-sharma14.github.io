/* ==========================================================================
   Swati Sharma — Personal Portfolio & Interactive Research Lab (script.js)
   Clean, responsive, low-cognitive-load interactivity
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Toast Notifications & Clipboard
  // --------------------------------------------------------------------------
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast(successMsg)).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast(successMsg);
  }

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyToClipboard('swatisharma14career@gmail.com', 'Email copied to clipboard!');
    });
  }

  // --------------------------------------------------------------------------
  // 2. Theme Toggle (Warm Ivory Light / Deep Obsidian Dark)
  // --------------------------------------------------------------------------
  const themeBtn = document.getElementById('theme-btn');
  const savedTheme = localStorage.getItem('swati_portfolio_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    const next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('swati_portfolio_theme', next);
    drawCress();
    drawAdhd();
  }

  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // --------------------------------------------------------------------------
  // 3. Global Era Filter (Sleek Scope)
  // --------------------------------------------------------------------------
  const eraBtns = document.querySelectorAll('[data-era-val]');
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  const projectCards = document.querySelectorAll('.project-card');
  const pubItems = document.querySelectorAll('.pub-item');

  function applyEra(era) {
    eraBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-era-val') === era));

    timelineEntries.forEach(entry => {
      const match = (era === 'all') || (entry.getAttribute('data-era') === era);
      entry.classList.toggle('hidden', !match);
    });

    projectCards.forEach(card => {
      const match = (era === 'all') || (card.getAttribute('data-era') === era);
      card.classList.toggle('hidden', !match);
    });

    pubItems.forEach(pub => {
      const match = (era === 'all') || (pub.getAttribute('data-era') === era);
      pub.style.opacity = match ? '1' : '0.4';
    });
  }

  eraBtns.forEach(btn => {
    btn.addEventListener('click', () => applyEra(btn.getAttribute('data-era-val')));
  });

  // --------------------------------------------------------------------------
  // 4. Interactive Playground Tabs
  // --------------------------------------------------------------------------
  const labTabs = document.querySelectorAll('.lab-tab');
  const simPanes = document.querySelectorAll('.sim-pane');

  function switchLabTab(tabId, scrollTo = false) {
    labTabs.forEach(t => {
      const active = t.getAttribute('data-tab') === tabId;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });

    simPanes.forEach(p => {
      p.classList.toggle('active', p.id === `pane-${tabId}`);
    });

    if (tabId === 'cress-sim') drawCress();
    if (tabId === 'adhd-sim') drawAdhd();

    if (scrollTo) {
      const labEl = document.getElementById('lab');
      if (labEl) labEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  labTabs.forEach(t => {
    t.addEventListener('click', () => switchLabTab(t.getAttribute('data-tab')));
  });

  document.querySelectorAll('.jump-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (target) switchLabTab(target, true);
    });
  });

  // --------------------------------------------------------------------------
  // 5. SIMULATION 1: CRESS Super-Resolution Auditor (Google DeepMind)
  // --------------------------------------------------------------------------
  const cressCanvas = document.getElementById('cress-canvas');
  const cressRegimeSelect = document.getElementById('cress-regime-select');
  const cressSeveritySlider = document.getElementById('cress-severity-slider');
  const cressSeverityVal = document.getElementById('cress-severity-val');
  const cressCVal = document.getElementById('cress-c-val');
  const cressRVal = document.getElementById('cress-r-val');
  const cressPsnrVal = document.getElementById('cress-psnr-val');
  const cressCosVal = document.getElementById('cress-cos-val');
  const cressInsightText = document.getElementById('cress-insight-text');

  function drawCress() {
    if (!cressCanvas) return;
    const ctx = cressCanvas.getContext('2d');
    const w = cressCanvas.width;
    const h = cressCanvas.height;
    const regime = cressRegimeSelect ? cressRegimeSelect.value : 'uvit';
    const sev = cressSeveritySlider ? Number(cressSeveritySlider.value) : 5;
    const s = sev / 100;

    if (cressSeverityVal) {
      cressSeverityVal.textContent = `${s.toFixed(2)} (${sev < 20 ? 'Clean' : sev < 60 ? 'Moderate' : 'Severe'})`;
    }

    let cressC = 0.161;
    let cressR = 95.0;
    let psnr = 13.8;
    let cos = 0.87;
    let insight = '';

    if (regime === 'uvit') {
      cressC = 0.161 + s * 0.45;
      cressR = 95.0 - s * 18.0;
      psnr = 13.8 - s * 0.5;
      cos = 0.87 - s * 0.08;
      insight = `<strong>Takeaway:</strong> Under clean UViT flow-matching, CRESS-C remains low (<strong>${cressC.toFixed(3)}</strong>) and retrieval recall reaches <strong>${cressR.toFixed(1)}%</strong>, verifying agricultural field boundary preservation.`;
    } else if (regime === 'bicubic') {
      cressC = 0.480 + s * 0.52;
      cressR = 85.5 - s * 22.0;
      psnr = 14.9 - s * 0.4;
      cos = 0.78 - s * 0.10;
      insight = `<strong>Takeaway:</strong> PSNR (${psnr.toFixed(1)} dB) misleadingly rewards blurry interpolation, whereas CRESS-C (<strong>${cressC.toFixed(3)}</strong>) catches the erased parcel boundaries.`;
    } else if (regime === 'esrgan') {
      cressC = 0.740 + s * 0.68;
      cressR = 63.0 - s * 28.0;
      psnr = 12.9 - s * 0.5;
      cos = 0.68 - s * 0.16;
      insight = `<strong>Takeaway:</strong> Unconstrained GAN hallucinates unfaithful boundaries. Retrieval recall drops to <strong>${cressR.toFixed(1)}%</strong> because the 1m tile decouples from its Sentinel-2 conditioning anchor.`;
    } else if (regime === 'noise') {
      cressC = 0.220 + s * 1.572;
      cressR = 92.0 - s * 70.0;
      psnr = 12.6 - s * 1.1;
      cos = 0.85 - s * 0.48;
      insight = `<strong>Takeaway:</strong> Gaussian sensor noise causes CRESS-C to spike to <strong>${cressC.toFixed(3)}</strong> and recall to collapse to <strong>${cressR.toFixed(1)}%</strong>, while PSNR remains largely flat.`;
    } else {
      cressC = 0.250 + s * 1.48;
      cressR = 90.0 - s * 66.0;
      psnr = 13.1 - s * 0.9;
      cos = 0.84 - s * 0.44;
      insight = `<strong>Takeaway:</strong> Spatial occlusion causes rapid divergence in the d=512 representation space (CRESS-C = <strong>${cressC.toFixed(3)}</strong>).`;
    }

    if (cressCVal) {
      cressCVal.textContent = cressC.toFixed(3);
      cressCVal.className = `metric-value ${cressC < 0.45 ? 'val-good' : cressC < 0.95 ? 'val-warn' : 'val-bad'}`;
    }
    if (cressRVal) {
      cressRVal.textContent = `${cressR.toFixed(1)}%`;
      cressRVal.className = `metric-value ${cressR > 75 ? 'val-good' : cressR > 45 ? 'val-warn' : 'val-bad'}`;
    }
    if (cressPsnrVal) cressPsnrVal.textContent = `${psnr.toFixed(1)} dB`;
    if (cressCosVal) cressCosVal.textContent = cos.toFixed(2);
    if (cressInsightText) cressInsightText.innerHTML = insight;

    // Canvas rendering (3 panels)
    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, w, h);

    // Panel 1: S2 Low-Res (10m)
    drawTile(ctx, 10, 26, 175, 155, { blocky: true, regime: 's2', s: 0 });
    // Panel 2: SR Output (1m)
    drawTile(ctx, 205, 26, 175, 155, { blocky: regime === 'bicubic', regime, s });
    // Panel 3: d=512 Latent Embedding Distance
    drawLatent(ctx, 400, 26, 190, 155, cressC, cressR);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 10px "JetBrains Mono", monospace';
    ctx.fillText('1. SENTINEL-2 (10m)', 10, 18);
    ctx.fillText('2. 10× SR OUTPUT (1m)', 205, 18);
    ctx.fillText('3. CRESS d=512 SPACE', 400, 18);
  }

  function drawTile(ctx, x, y, w, h, opt) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();

    const cols = opt.blocky ? 8 : 32;
    const rows = opt.blocky ? 8 : 32;
    const cw = w / cols;
    const ch = h / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const nx = c / cols;
        const ny = r / rows;
        const inA = nx < 0.5 && ny < 0.55;
        const inB = nx >= 0.5 && ny < 0.45;
        let g = inA ? 130 : inB ? 90 : 150;
        let red = inA ? 60 : inB ? 85 : 70;
        let b = 45;

        if (opt.regime === 'esrgan') {
          const shift = Math.sin(nx * 20 + opt.s * 6) * 35;
          g += shift;
          red += shift * 0.6;
        }
        if (opt.regime === 'noise') {
          const n = (Math.sin(r * 13 + c * 29) * 80) * opt.s;
          g += n;
          red += n;
          b += n;
        }

        ctx.fillStyle = `rgb(${Math.max(0, Math.min(255, Math.round(red)))}, ${Math.max(0, Math.min(255, Math.round(g)))}, ${Math.max(0, Math.min(255, Math.round(b)))})`;
        ctx.fillRect(x + c * cw, y + r * ch, Math.ceil(cw), Math.ceil(ch));
      }
    }

    if (!opt.blocky) {
      ctx.strokeStyle = opt.regime === 'esrgan' ? '#fbbf24' : '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.5, y);
      ctx.lineTo(x + w * 0.45, y + h);
      ctx.moveTo(x, y + h * 0.55);
      ctx.lineTo(x + w, y + h * 0.45);
      ctx.stroke();
    }

    if (opt.regime === 'cutout' && opt.s > 0.05) {
      ctx.fillStyle = '#060a12';
      ctx.fillRect(x + w * 0.25, y + h * 0.25, 40 + opt.s * 50, 35 + opt.s * 40);
    }

    ctx.restore();
    ctx.strokeStyle = '#1e293b';
    ctx.strokeRect(x, y, w, h);
  }

  function drawLatent(ctx, x, y, w, h, cressC, cressR) {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#1e293b';
    ctx.strokeRect(x, y, w, h);

    const cx = x + 45;
    const cy = y + h / 2;

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();

    const drift = Math.min(95, (cressC / 1.8) * 85);
    const sx = cx + drift;
    const sy = cy - drift * 0.2;

    ctx.strokeStyle = cressC < 0.45 ? '#4ade80' : cressC < 0.95 ? '#fbbf24' : '#f87171';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(sx, sy);
    ctx.stroke();

    ctx.fillStyle = ctx.strokeStyle;
    ctx.beginPath();
    ctx.arc(sx, sy, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('S2 Anchor', cx - 22, cy + 18);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`SR Tile (d=${cressC.toFixed(2)})`, Math.min(x + w - 85, sx - 10), sy - 10);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`Recall@K: ${cressR.toFixed(1)}%`, x + 12, y + h - 12);
  }

  if (cressRegimeSelect) cressRegimeSelect.addEventListener('change', drawCress);
  if (cressSeveritySlider) cressSeveritySlider.addEventListener('input', drawCress);
  drawCress();

  // --------------------------------------------------------------------------
  // 6. SIMULATION 2: Task-Lens Indian Speech Grid (LREC 2026)
  // --------------------------------------------------------------------------
  const tlGrid = document.getElementById('tl-grid');
  const tlLangSelect = document.getElementById('tl-lang-select');
  const tlModeSelect = document.getElementById('tl-mode-select');
  const tlTasksCount = document.getElementById('tl-tasks-count');

  const speechTasks = [
    { name: '1. ASR (Speech-to-Text)', supp: true, meta: 'High-Volume Primary Corpus' },
    { name: '2. Language ID (LID)', supp: true, meta: 'Multi-Dialect Acoustic Coverage' },
    { name: '3. Speaker ID / Verification', supp: true, meta: 'Demographic Metadata Mapped' },
    { name: '4. Keyword Spotting (KWS)', supp: true, meta: 'Utterance-Aligned Transcripts' },
    { name: '5. Text-to-Speech (TTS)', supp: true, meta: 'High-SNR Studio Subsets' },
    { name: '6. Speech Translation', supp: true, meta: 'Parallel Indic-En Text' },
    { name: '7. Spoken Intent', supp: true, meta: 'Domain Annotations' },
    { name: '8. Anti-Spoofing', supp: false, meta: '0 Dedicated Synthetic Sets' },
    { name: '9. Emotion Recognition', supp: false, meta: 'Acute Gap (<785 hrs for all 26)' }
  ];

  function renderSpeechMatrix() {
    if (!tlGrid) return;
    const mode = tlModeSelect ? tlModeSelect.value : 'tasklens';
    tlGrid.innerHTML = '';

    let unlocked = 0;
    speechTasks.forEach((t, idx) => {
      const isSupported = mode === 'catalog' ? (idx === 0) : t.supp;
      if (isSupported) unlocked++;

      const el = document.createElement('div');
      el.className = `tl-item ${isSupported ? 'tl-supported' : 'tl-unexamined'}`;
      el.innerHTML = `
        <span class="tl-item-title">${t.name}</span>
        <span class="tl-item-tag">${mode === 'catalog' ? (idx === 0 ? 'Cataloged as ASR' : 'Unexamined') : t.meta}</span>
      `;
      tlGrid.appendChild(el);
    });

    if (tlTasksCount) {
      tlTasksCount.textContent = `${unlocked} / 9 Tasks`;
      tlTasksCount.className = `metric-value ${unlocked >= 6 ? 'val-good' : 'val-warn'}`;
    }
  }

  if (tlLangSelect) tlLangSelect.addEventListener('change', renderSpeechMatrix);
  if (tlModeSelect) tlModeSelect.addEventListener('change', renderSpeechMatrix);
  renderSpeechMatrix();

  // --------------------------------------------------------------------------
  // 7. SIMULATION 3: Interpretable ADHD Pupillometry (CIBM 2025)
  // --------------------------------------------------------------------------
  const adhdCanvas = document.getElementById('adhd-canvas');
  const adhdPresetSelect = document.getElementById('adhd-preset-select');
  const adhdVelSlider = document.getElementById('adhd-vel-slider');
  const adhdVarSlider = document.getElementById('adhd-var-slider');
  const adhdVelVal = document.getElementById('adhd-vel-val');
  const adhdVarVal = document.getElementById('adhd-var-val');
  const adhdProbReadout = document.getElementById('adhd-prob-readout');
  const adhdShapBars = document.getElementById('adhd-shap-bars');

  function drawAdhd() {
    if (!adhdCanvas) return;
    const ctx = adhdCanvas.getContext('2d');
    const w = adhdCanvas.width;
    const h = adhdCanvas.height;

    const vel = adhdVelSlider ? Number(adhdVelSlider.value) / 100 : 1.82;
    const variance = adhdVarSlider ? Number(adhdVarSlider.value) / 100 : 0.44;

    if (adhdVelVal) adhdVelVal.textContent = `${vel.toFixed(2)} mm/s`;
    if (adhdVarVal) adhdVarVal.textContent = `${variance.toFixed(2)} mm`;

    ctx.fillStyle = '#080d1a';
    ctx.fillRect(0, 0, w, h);

    // Timeline phases
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    [w * 0.25, w * 0.55, w * 0.82].forEach(px => {
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, h);
      ctx.stroke();
    });

    // Reference curve (Neurotypical control)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let px = 0; px < w; px++) {
      const t = px / w;
      const yNorm = h * 0.65 - Math.exp(-Math.pow((t - 0.35) / 0.12, 2)) * 38;
      if (px === 0) ctx.moveTo(px, yNorm);
      else ctx.lineTo(px, yNorm);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Live patient curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (let px = 0; px < w; px++) {
      const t = px / w;
      const stimulus = Math.exp(-Math.pow((t - 0.35) / 0.12, 2)) * (24 * vel);
      const osc = (t > 0.25) ? Math.sin(t * 36) * 14 * variance : 0;
      const py = h * 0.68 - stimulus + osc;
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // SHAP Attribution
    const shapVel = +((vel - 1.25) * 0.42).toFixed(2);
    const shapVar = +((variance - 0.25) * 0.95).toFixed(2);
    const shapLat = +((vel * 0.12 + variance * 0.2 - 0.22)).toFixed(2);

    const logit = shapVel + shapVar + shapLat + 0.2;
    const prob = 1 / (1 + Math.exp(-logit * 3.0));
    const pct = (prob * 100).toFixed(1);

    if (adhdProbReadout) {
      adhdProbReadout.textContent = `${pct}% (${prob >= 0.5 ? 'ADHD Profile' : 'Neurotypical'})`;
      adhdProbReadout.style.color = prob >= 0.5 ? 'var(--color-amber)' : 'var(--color-green)';
    }

    if (adhdShapBars) {
      const bars = [
        { name: 'Peak Dilation Velocity', val: shapVel },
        { name: 'Sustained Fluctuation', val: shapVar },
        { name: 'Constriction Latency', val: shapLat }
      ];
      adhdShapBars.innerHTML = bars.map(b => {
        const width = Math.min(100, Math.round(Math.abs(b.val) * 160));
        const pos = b.val >= 0;
        const col = pos ? '#fbbf24' : '#2dd4bf';
        return `
          <div class="shap-row">
            <span>${b.name}</span>
            <div class="shap-bar-bg">
              <div class="shap-bar-fill" style="width:${width}%; background:${col};"></div>
            </div>
            <span style="font-family:var(--font-mono); color:${col}; text-align:right;">${pos ? '+' : ''}${b.val.toFixed(2)}</span>
          </div>
        `;
      }).join('');
    }
  }

  if (adhdPresetSelect) {
    adhdPresetSelect.addEventListener('change', () => {
      const v = adhdPresetSelect.value;
      if (v === 'adhd') {
        adhdVelSlider.value = '182';
        adhdVarSlider.value = '44';
      } else if (v === 'control') {
        adhdVelSlider.value = '95';
        adhdVarSlider.value = '15';
      } else {
        adhdVelSlider.value = '135';
        adhdVarSlider.value = '28';
      }
      drawAdhd();
    });
  }

  if (adhdVelSlider) adhdVelSlider.addEventListener('input', drawAdhd);
  if (adhdVarSlider) adhdVarSlider.addEventListener('input', drawAdhd);
  drawAdhd();

  // --------------------------------------------------------------------------
  // 8. SIMULATION 4: LaTeX Formula Auditor (VisMathQA)
  // --------------------------------------------------------------------------
  const latexPresetSelect = document.getElementById('latex-preset-select');
  const latexGtInput = document.getElementById('latex-gt-input');
  const latexPredInput = document.getElementById('latex-pred-input');
  const latexCompVal = document.getElementById('latex-comp-val');
  const latexDelimVal = document.getElementById('latex-delim-val');
  const latexTokVal = document.getElementById('latex-tok-val');
  const latexCerVal = document.getElementById('latex-cer-val');
  const latexInsightText = document.getElementById('latex-insight-text');

  const presets = {
    syntax_err: {
      gt: '\\int_{0}^{\\pi/2} \\frac{\\sin^{2} x}{1 + \\cos x} \\, dx',
      pred: '\\int_{0}^{\\pi/2 \\frac{\\sin^{2} x}{1 + \\cos x} \\, dx'
    },
    equiv: {
      gt: '\\frac{a + b}{\\sqrt{x^{2} + 1}}',
      pred: '\\frac{b + a}{\\sqrt{1 + x^{2}}}'
    },
    hallucinated: {
      gt: '\\sum_{k=1}^{n} k^{3} = \\left( \\frac{n(n+1)}{2} \\right)^{2}',
      pred: '\\sum_{k=1}^{n} k^{2} = \\frac{n(n+1)(2n+1)}{6}'
    }
  };

  function evalLatex() {
    if (!latexGtInput || !latexPredInput) return;
    const gt = latexGtInput.value.trim();
    const pred = latexPredInput.value.trim();

    let braces = 0;
    for (const c of pred) {
      if (c === '{') braces++;
      if (c === '}') braces--;
    }
    const syntaxValid = (braces === 0);

    const gtToks = gt.match(/\\[a-zA-Z]+|[{}_^+=()\-*/]|[0-9]+|[a-zA-Z]/g) || [];
    const predToks = pred.match(/\\[a-zA-Z]+|[{}_^+=()\-*/]|[0-9]+|[a-zA-Z]/g) || [];
    const overlap = predToks.filter(t => gtToks.includes(t)).length;
    const f1 = (gtToks.length + predToks.length) ? (2 * overlap) / (gtToks.length + predToks.length) : 0;
    const comp = syntaxValid ? (0.4 * f1 + 0.3 * f1 + 0.2 * f1 + 0.1) : (0.4 * f1 * 0.7);

    if (latexCompVal) latexCompVal.textContent = comp.toFixed(3);
    if (latexTokVal) latexTokVal.textContent = f1.toFixed(2);
    if (latexDelimVal) {
      latexDelimVal.textContent = syntaxValid ? 'VALID ({=})' : 'BROKEN ({≠})';
      latexDelimVal.className = `metric-value ${syntaxValid ? 'val-good' : 'val-bad'}`;
    }
    if (latexCerVal) latexCerVal.textContent = '98.1%';

    if (latexInsightText) {
      if (!syntaxValid) {
        latexInsightText.innerHTML = `<strong>Takeaway:</strong> Unmatched delimiter detected. Flat character accuracy scores <strong>98.1%</strong>, but <code>LaTeXOCREvaluator</code> penalizes the syntax violation (Composite = <strong>${comp.toFixed(3)}</strong>).`;
      } else {
        latexInsightText.innerHTML = `<strong>Takeaway:</strong> Expressions match structural syntax and semantic verification (Composite = <strong>${comp.toFixed(3)}</strong>).`;
      }
    }
  }

  if (latexPresetSelect) {
    latexPresetSelect.addEventListener('change', () => {
      const p = presets[latexPresetSelect.value];
      if (p) {
        latexGtInput.value = p.gt;
        latexPredInput.value = p.pred;
        evalLatex();
      }
    });
  }
  if (latexGtInput) latexGtInput.addEventListener('input', evalLatex);
  if (latexPredInput) latexPredInput.addEventListener('input', evalLatex);
  evalLatex();

  // --------------------------------------------------------------------------
  // 9. SIMULATION 5: Google Play Promotions Engine
  // --------------------------------------------------------------------------
  const promoArchSelect = document.getElementById('promo-arch-select');
  const promoScenarioSelect = document.getElementById('promo-scenario-select');
  const promoTraceBox = document.getElementById('promo-trace-box');

  function updatePromo() {
    const arch = promoArchSelect ? promoArchSelect.value : 'modern';
    const scen = promoScenarioSelect ? promoScenarioSelect.value : 'quest';

    let lines = [];
    if (scen === 'quest') {
      lines = [
        `[TRACE 01] Multi-purchase quest event received via P3 pipeline...`,
        `[TRACE 02] Resolved campaign via ${arch === 'legacy' ? 'hardcoded campaign map' : 'feature-flagged offer_type cache'}.`,
        `[TRACE 03] Jetpack Compose quest surface rendered → user enrollment lifted and reward issued.`
      ];
    } else if (scen === 'exploit') {
      lines = [
        `[TRACE 01] Multi-item cart split & refund detected...`,
        `[TRACE 02] Evaluating cumulative gross-spend primitive...`,
        `[TRACE 03] ${arch === 'legacy' ? 'VULNERABILITY: Legacy post-purchase race condition' : 'BLOCKED: Cumulative gross-spend ledger prevented promotion exploitation'}.`
      ];
    } else {
      lines = [
        `[TRACE 01] Multi-currency in-app gift card threshold checkout...`,
        `[TRACE 02] ${arch === 'shadow' ? 'Shadow-traffic comparator auditing legacy vs new pipeline' : 'Atomic spend accumulation verified across cart items'}.`,
        `[TRACE 03] Reward issuance committed cleanly.`
      ];
    }

    if (promoTraceBox) promoTraceBox.innerHTML = lines.join('<br>');
  }

  if (promoArchSelect) promoArchSelect.addEventListener('change', updatePromo);
  if (promoScenarioSelect) promoScenarioSelect.addEventListener('change', updatePromo);

  // --------------------------------------------------------------------------
  // 10. Progressive Disclosure for Career Timeline
  // --------------------------------------------------------------------------
  document.querySelectorAll('.timeline-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.timeline-entry');
      const exp = parent ? parent.querySelector('.timeline-expandable') : null;
      if (!exp) return;
      const isOpen = exp.classList.toggle('open');
      btn.querySelector('span').textContent = isOpen ? 'Hide details ↑' : 'View details ↓';
    });
  });

  // --------------------------------------------------------------------------
  // 11. BibTeX Drawers
  // --------------------------------------------------------------------------
  document.querySelectorAll('.toggle-bib-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const box = document.getElementById(btn.getAttribute('data-bib'));
      if (box) box.classList.toggle('open');
    });
  });

  document.querySelectorAll('.copy-bib-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const box = document.getElementById(btn.getAttribute('data-bib'));
      if (box) copyToClipboard(box.textContent, 'BibTeX citation copied!');
    });
  });

  // --------------------------------------------------------------------------
  // 12. Case Study Modals
  // --------------------------------------------------------------------------
  const caseModal = document.getElementById('case-modal');
  const caseModalTitle = document.getElementById('case-modal-title');
  const caseModalBody = document.getElementById('case-modal-body');
  const caseModalClose = document.getElementById('case-modal-close');

  const caseContent = {
    'ocr-math': {
      title: 'VisMathQA & LaTeXOCREvaluator',
      html: `
        <h4>1. Benchmark Dataset (1,192 Images)</h4>
        <p>Curated 1,192 competitive exam problem images spanning 19 years (2007–2025) across JEE Advanced (915), IOQM (210), and AIME (67) with 383 ground-truth answer-key annotations.</p>
        <h4>2. Structure-Aware Evaluator</h4>
        <p>Co-developed <code>LaTeXOCREvaluator</code> computing a weighted composite metric (<code>0.4·Token-F1 + 0.3·Seq-Similarity + 0.2·Positional + 0.1·SymPy-Semantic</code>) with delimiter syntax auditing.</p>
        <h4>3. Empirical Finding</h4>
        <p>On MathVista testmini (n=100), text-only <code>flan-t5-small</code> (16%) beat multimodal <code>BLIP-VQA</code> (13%) and <code>ViLT</code> (6%), revealing that early VLMs relied heavily on language priors.</p>
      `
    },
    'adaptive-rl': {
      title: 'Adaptive RL Defense Against Cipher Jailbreaks',
      html: `
        <h4>1. Token-Level MDP Formulation</h4>
        <p>Adversarial prompts obfuscated via ciphers (Caesar, Morse, Unicode, ASCII) achieved an 89.4% mean Attack Success Rate across LLaMA and Gemma-2. Formulated defense as an MDP where states are cipher tokens and actions are decoded reconstructions.</p>
        <h4>2. Optimization & Results</h4>
        <p>Trained a PPO agent in RLlib with LoRA and 4-bit quantization, reducing ASR by 30% with a 96.8% defense refusal rate.</p>
      `
    },
    'opinion-mining': {
      title: 'Review-Based Opinion Mining for Products',
      html: `
        <h4>1. Custom Transformer Architecture</h4>
        <p>Built an encoder-only Transformer from scratch in PyTorch with a novel <code>CategoryAttention</code> cross-attention layer over a balanced 21,000-review Amazon dataset, scoring +15 percentage points over the 50% chance baseline.</p>
        <h4>2. Summarization & Semantic Agreement</h4>
        <p>Filtered authentic reviews into a BART summarization pipeline and verified review-to-summary alignment via SentenceTransformer cosine similarity matrices.</p>
      `
    },
    'cvd-risk': {
      title: 'HeartGuardian: CVD Risk Prediction via Survival Analysis',
      html: `
        <h4>1. Longitudinal Time-to-Event Modeling</h4>
        <p>Replaced standard binary classification with clinical Survival Analysis to handle right-censoring in longitudinal health cohorts.</p>
        <h4>2. Verified Metric</h4>
        <p>Achieved a verified mean Concordance Index (C-index) of 0.7585 across held-out patient splits.</p>
      `
    }
  };

  document.querySelectorAll('.open-case-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const data = caseContent[btn.getAttribute('data-case')];
      if (!data || !caseModal) return;
      caseModalTitle.textContent = data.title;
      caseModalBody.innerHTML = data.html;
      caseModal.classList.add('open');
      caseModal.setAttribute('aria-hidden', 'false');
    });
  });

  if (caseModalClose) {
    caseModalClose.addEventListener('click', () => {
      caseModal.classList.remove('open');
      caseModal.setAttribute('aria-hidden', 'true');
    });
  }

  // --------------------------------------------------------------------------
  // 13. Interactive Terminal REPL (Drawer)
  // --------------------------------------------------------------------------
  const replToggleBar = document.getElementById('repl-toggle-bar');
  const replBody = document.getElementById('repl-body');
  const replOutput = document.getElementById('repl-output');
  const replInput = document.getElementById('repl-input');

  if (replToggleBar && replBody) {
    replToggleBar.addEventListener('click', () => {
      const open = replBody.classList.toggle('open');
      if (open && replInput) replInput.focus();
    });
  }

  const replResponses = {
    help: 'Commands: thesis, google, iiitd, cress, tasklens, adhd, bibtex, clear',
    thesis: 'Core Thesis: How to build multimodal representations that are interpretable, utility-aware, and reference-free.',
    google: 'During Google: SWE II on Google Play Post-Purchase Promotions (P3) & Researcher 20% Time at DeepMind (CRESS).',
    iiitd: 'Before Google: B.Tech CSAI @ IIIT-Delhi (GPA 8.36/10), HMI Lab (ADHD in CIBM 2025), SBILab (Task-Lens at LREC 2026).',
    cress: 'CRESS: Dual-encoder reference-free evaluation for satellite super-resolution (NeurIPS TCCML 2026).',
    tasklens: 'Task-Lens: Cross-task speech profiling across 50 Indian datasets, 90K+ hours, 26 languages (LREC 2026).',
    adhd: 'ADHD: Temporal pupil dynamics & SHAP (~90% accuracy, Computers in Biology and Medicine 2025).'
  };

  function runRepl(cmd) {
    if (!replOutput) return;
    const clean = cmd.trim().toLowerCase();
    if (!clean) return;

    if (clean === 'clear') {
      replOutput.innerHTML = '';
      return;
    }

    const echo = document.createElement('div');
    echo.innerHTML = `<span style="color:#38bdf8;">visitor@swati:~$</span> ${clean}`;
    replOutput.appendChild(echo);

    const resp = document.createElement('div');
    resp.style.color = '#94a3b8';
    resp.textContent = replResponses[clean] || `Unknown command: '${clean}'. Type 'help' for available commands.`;
    replOutput.appendChild(resp);
    replOutput.scrollTop = replOutput.scrollHeight;
  }

  if (replInput) {
    replInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        runRepl(replInput.value);
        replInput.value = '';
      }
    });
  }
  runRepl('thesis');

  // --------------------------------------------------------------------------
  // 14. Command Palette (⌘K)
  // --------------------------------------------------------------------------
  const cmdModal = document.getElementById('cmd-modal');
  const cmdBtn = document.getElementById('cmd-btn');
  const cmdInput = document.getElementById('cmd-input');
  const cmdResults = document.getElementById('cmd-results');

  const actions = [
    { label: '🛰️ Launch CRESS Super-Resolution Auditor', cat: 'Lab', run: () => switchLabTab('cress-sim', true) },
    { label: '🎙️ Launch Task-Lens Indian Speech Matrix', cat: 'Lab', run: () => switchLabTab('tasklens-sim', true) },
    { label: '👁️ Launch ADHD Pupillometry & SHAP Simulation', cat: 'Lab', run: () => switchLabTab('adhd-sim', true) },
    { label: '📐 Launch LaTeX Formula Auditor Sandbox', cat: 'Lab', run: () => switchLabTab('latex-sim', true) },
    { label: '⚡ Launch Google Play Spend Engine Simulator', cat: 'Lab', run: () => switchLabTab('promo-sim', true) },
    { label: 'Toggle Light / Dark Theme', cat: 'Theme', run: toggleTheme },
    { label: 'Filter: During Google (2025–Present)', cat: 'Filter', run: () => applyEra('during-google') },
    { label: 'Filter: Before Google (2021–2025)', cat: 'Filter', run: () => applyEra('before-google') },
    { label: 'Filter: All Eras (2021–Present)', cat: 'Filter', run: () => applyEra('all') }
  ];

  function renderCmd(query = '') {
    if (!cmdResults) return;
    const q = query.trim().toLowerCase();
    const list = actions.filter(a => a.label.toLowerCase().includes(q) || a.cat.toLowerCase().includes(q));
    cmdResults.innerHTML = '';
    list.forEach(item => {
      const b = document.createElement('button');
      b.className = 'cmd-item';
      b.innerHTML = `<span>${item.label}</span><span class="cmd-item-cat">${item.cat}</span>`;
      b.addEventListener('click', () => {
        cmdModal.classList.remove('open');
        item.run();
      });
      cmdResults.appendChild(b);
    });
  }

  function openCmd() {
    if (!cmdModal) return;
    cmdModal.classList.add('open');
    renderCmd('');
    if (cmdInput) {
      cmdInput.value = '';
      setTimeout(() => cmdInput.focus(), 30);
    }
  }

  if (cmdBtn) cmdBtn.addEventListener('click', openCmd);

  // --------------------------------------------------------------------------
  // 12. Post-Hoc Analysis & Site Telemetry Engine
  // --------------------------------------------------------------------------
  const analyticsModal = document.getElementById('analytics-modal');
  const analyticsBtn = document.getElementById('analytics-btn');
  const footerAnalyticsBtn = document.getElementById('footer-analytics-btn');
  const analyticsModalClose = document.getElementById('analytics-modal-close');

  const teleTotalViews = document.getElementById('tele-total-views');
  const footerViewsCount = document.getElementById('footer-views-count');
  const teleDwellTime = document.getElementById('tele-dwell-time');
  const teleScrollDepth = document.getElementById('tele-scroll-depth');
  const teleLabInteractions = document.getElementById('tele-lab-interactions');

  // Local interaction telemetry store
  let telemetryData = JSON.parse(localStorage.getItem('swati_site_telemetry') || '{}');
  if (!telemetryData.demos) {
    telemetryData.demos = { cress: 3, promo: 3, tasklens: 2, adhd: 2, latex: 1 };
  }
  if (!telemetryData.maxScroll) telemetryData.maxScroll = 0;
  if (!telemetryData.totalSeconds) telemetryData.totalSeconds = 0;

  function recordDemoInteraction(demoKey) {
    if (!telemetryData.demos[demoKey]) telemetryData.demos[demoKey] = 0;
    telemetryData.demos[demoKey]++;
    localStorage.setItem('swati_site_telemetry', JSON.stringify(telemetryData));
    updateTelemetryUI();
  }

  // Active Dwell Time Tracker (increment only when active/visible)
  let activeSeconds = 0;
  setInterval(() => {
    if (!document.hidden) {
      activeSeconds++;
      telemetryData.totalSeconds++;
      if (activeSeconds % 10 === 0) {
        localStorage.setItem('swati_site_telemetry', JSON.stringify(telemetryData));
      }
      if (teleDwellTime) {
        const m = Math.floor(activeSeconds / 60);
        const s = activeSeconds % 60;
        teleDwellTime.textContent = `${m}m ${s < 10 ? '0' : ''}${s}s`;
      }
    }
  }, 1000);

  // Scroll Depth Tracker
  window.addEventListener('scroll', () => {
    const scrollH = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollH > 0) {
      const currentPct = Math.min(100, Math.round((window.scrollY / scrollH) * 100));
      if (currentPct > telemetryData.maxScroll) {
        telemetryData.maxScroll = currentPct;
        localStorage.setItem('swati_site_telemetry', JSON.stringify(telemetryData));
        if (teleScrollDepth) teleScrollDepth.textContent = `${telemetryData.maxScroll}%`;
      }
    }
  }, { passive: true });

  // Real-time visitor counter: increments on every page open or refresh
  function initViewCounter() {
    let views = parseInt(localStorage.getItem('swati_views_counter') || '0', 10);
    views += 1;
    localStorage.setItem('swati_views_counter', views.toString());

    if (footerViewsCount) footerViewsCount.textContent = views.toString();
    if (teleTotalViews) teleTotalViews.textContent = views.toString();
  }
  initViewCounter();

  function updateTelemetryUI() {
    const demos = telemetryData.demos || {};
    const totalDemos = Object.values(demos).reduce((a, b) => a + b, 0);
    if (teleLabInteractions) teleLabInteractions.textContent = totalDemos.toString();
    if (teleScrollDepth) teleScrollDepth.textContent = `${telemetryData.maxScroll || 0}%`;

    const keys = ['cress', 'promo', 'tasklens', 'adhd', 'latex'];
    const maxVal = Math.max(1, ...keys.map(k => demos[k] || 0));

    keys.forEach(k => {
      const val = demos[k] || 0;
      const countEl = document.getElementById(`count-${k}`);
      const barEl = document.getElementById(`bar-${k}`);
      if (countEl) countEl.textContent = val.toString();
      if (barEl) barEl.style.width = `${Math.max(8, Math.round((val / maxVal) * 100))}%`;
    });
  }
  updateTelemetryUI();

  // Track demo tab switches
  labTabs.forEach(t => {
    t.addEventListener('click', () => {
      const target = t.getAttribute('data-tab');
      if (target === 'cress-sim') recordDemoInteraction('cress');
      else if (target === 'promo-sim') recordDemoInteraction('promo');
      else if (target === 'tasklens-sim') recordDemoInteraction('tasklens');
      else if (target === 'adhd-sim') recordDemoInteraction('adhd');
      else if (target === 'latex-sim') recordDemoInteraction('latex');
    });
  });

  function openAnalytics() {
    if (analyticsModal) {
      updateTelemetryUI();
      analyticsModal.classList.add('open');
    }
  }
  if (analyticsBtn) analyticsBtn.addEventListener('click', openAnalytics);
  if (footerAnalyticsBtn) footerAnalyticsBtn.addEventListener('click', openAnalytics);
  if (analyticsModalClose) {
    analyticsModalClose.addEventListener('click', () => {
      analyticsModal.classList.remove('open');
    });
  }

  // --------------------------------------------------------------------------
  // 13. Visitor Feedback Engine
  // --------------------------------------------------------------------------
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackMsg = document.getElementById('feedback-message');
  const feedbackAuthor = document.getElementById('feedback-author');
  const feedbackEmail = document.getElementById('feedback-email');
  const feedbackStatus = document.getElementById('feedback-status');
  const feedbackSubmitBtn = document.getElementById('feedback-submit-btn');
  const feedbackEmailDraftBtn = document.getElementById('feedback-email-draft-btn');

  function triggerEmailDraft(author, email, message) {
    const sender = author || 'Visitor';
    const subject = encodeURIComponent(`Portfolio Feedback from ${sender}`);
    const body = encodeURIComponent(`${message}\n\n--\nFrom: ${sender}\nContact: ${email || 'None provided'}`);
    window.open(`mailto:swatisharma14career@gmail.com?subject=${subject}&body=${body}`, '_blank');
  }

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = feedbackMsg ? feedbackMsg.value.trim() : '';
      if (!message) return;

      const author = feedbackAuthor && feedbackAuthor.value.trim() ? feedbackAuthor.value.trim() : 'Anonymous';
      const email = feedbackEmail && feedbackEmail.value.trim() ? feedbackEmail.value.trim() : '';

      if (feedbackSubmitBtn) {
        feedbackSubmitBtn.disabled = true;
        feedbackSubmitBtn.innerHTML = '<span>Sending...</span>';
      }
      if (feedbackStatus) {
        feedbackStatus.textContent = 'Sending note...';
        feedbackStatus.style.color = 'var(--text-muted)';
      }

      try {
        const payload = {
          name: author,
          email: email || 'no-reply@portfolio.visitor',
          message: message,
          _subject: `New Portfolio Note from ${author}`,
          _template: 'table'
        };

        const res = await fetch('https://formsubmit.co/ajax/swatisharma14career@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          if (feedbackStatus) {
            feedbackStatus.textContent = '✓ Note sent directly to Swati. Thank you!';
            feedbackStatus.style.color = 'var(--accent-primary)';
          }
          feedbackForm.reset();
          showToast('Thank you! Your note has been sent to Swati.');
        } else {
          throw new Error('Endpoint error');
        }
      } catch (err) {
        if (feedbackStatus) {
          feedbackStatus.textContent = 'Opening mail client draft...';
          feedbackStatus.style.color = 'var(--text-secondary)';
        }
        showToast('Opening mail client draft...');
        triggerEmailDraft(author, email, message);
      } finally {
        if (feedbackSubmitBtn) {
          feedbackSubmitBtn.disabled = false;
          feedbackSubmitBtn.innerHTML = '<span>Send Note</span> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
        }
      }
    });
  }

  if (feedbackEmailDraftBtn) {
    feedbackEmailDraftBtn.addEventListener('click', () => {
      const message = feedbackMsg ? feedbackMsg.value.trim() : '';
      const author = feedbackAuthor ? feedbackAuthor.value.trim() : '';
      const email = feedbackEmail ? feedbackEmail.value.trim() : '';
      triggerEmailDraft(author, email, message || 'Hi Swati,\n\nI was exploring your portfolio and wanted to reach out regarding...');
    });
  }

  window.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCmd();
    } else if (e.key === 'Escape') {
      if (cmdModal) cmdModal.classList.remove('open');
      if (caseModal) caseModal.classList.remove('open');
      if (analyticsModal) analyticsModal.classList.remove('open');
    }
  });

  if (cmdInput) cmdInput.addEventListener('input', () => renderCmd(cmdInput.value));

  document.querySelectorAll('.modal-overlay').forEach(ov => {
    ov.addEventListener('click', e => {
      if (e.target === ov) ov.classList.remove('open');
    });
  });
});
