/* === Accessibility Widget (WCAG 2.0 AA / ת"י 5568 enhancement layer) ===
 * The site's code layer is already built with ARIA + semantic controls
 * (see accessibility.css and the aria-* attributes throughout index.html).
 * This module adds the USER preference panel that the ♿ button opens:
 *   font size, high contrast, monochrome, link highlight, reduced motion, big cursor.
 * All preferences persist to localStorage under "accessibility" and are
 * re-applied on load (before first render) so the experience is consistent.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'accessibility';

  const DEFAULTS = {
    fontSize: 0,        // 0=normal, 1=1.15x, 2=1.3x, 3=1.5x
    highContrast: false,
    monochrome: false,
    linkHighlight: false,
    reduceMotion: false,
    bigCursor: false
  };

  /* ---- persistence ---- */
  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return { ...DEFAULTS, ...raw };
    } catch (e) {
      return { ...DEFAULTS };
    }
  }
  function save(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { /* storage unavailable */ }
  }

  /* ---- application ---- */
  function apply(state) {
    const root = document.documentElement;
    const body = document.body;
    if (!body) return;

    // Font size — set CSS variable; the whole UI reads --font-scale.
    const sizes = [1, 1.15, 1.3, 1.5];
    const scale = sizes[state.fontSize] || 1;
    root.style.setProperty('--font-scale', String(scale));
    // Apply to base font size so rem/em units throughout the UI rescale.
    root.style.fontSize = (16 * scale) + 'px';

    // High contrast — root class drives override CSS.
    root.classList.toggle('a11y-high-contrast', !!state.highContrast);
    // Monochrome
    root.classList.toggle('a11y-monochrome', !!state.monochrome);
    // Link highlight
    body.classList.toggle('a11y-link-highlight', !!state.linkHighlight);
    // Reduced motion
    root.classList.toggle('a11y-reduced-motion', !!state.reduceMotion);
    // Big cursor
    body.classList.toggle('a11y-big-cursor', !!state.bigCursor);

    // Reflect controls (guard: may run before DOM ready)
    const ctl = (id) => document.getElementById(id);
    const sizeBtns = document.querySelectorAll('.a11y-size-btn');
    sizeBtns.forEach((btn, i) => {
      const active = i === state.fontSize;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    const set = (id, val) => { const el = ctl(id); if (el) el.checked = !!val; };
    set('a11yHighContrast', state.highContrast);
    set('a11yMonochrome', state.monochrome);
    set('a11yLinkHighlight', state.linkHighlight);
    set('a11yReduceMotion', state.reduceMotion);
    set('a11yBigCursor', state.bigCursor);
  }

  /* ---- panel open/close ---- */
  const PANEL_ID = 'a11yPanel';

  function openPanel() {
    const panel = document.getElementById(PANEL_ID);
    const btn = document.getElementById('headerAccessibilityBtn');
    if (!panel) return;
    panel.classList.add('open');
    if (btn) {
      btn.setAttribute('aria-expanded', 'true');
    }
    // Move focus into the panel when opened via mouse? Keyboard users tab naturally.
    const first = panel.querySelector('button, input, [tabindex]');
    if (first && document.activeElement === btn) { first.focus(); }
  }
  function closePanel() {
    const panel = document.getElementById(PANEL_ID);
    const btn = document.getElementById('headerAccessibilityBtn');
    if (panel) panel.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function togglePanel() {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) return;
    if (panel.classList.contains('open')) closePanel();
    else openPanel();
  }

  function update(key, value) {
    const state = load();
    state[key] = value;
    save(state);
    apply(state);
  }

  /* ---- wiring ---- */
  function bindToggle(id, key) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', () => {
      update(key, el.checked);
    });
  }

  function init() {
    if (init._done) return;
    init._done = true;
    const state = load();

    // Create the panel markup if not already in the HTML.
    ensurePanel();

    // Size buttons
    document.querySelectorAll('.a11y-size-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        update('fontSize', i);
      });
    });

    bindToggle('a11yHighContrast', 'highContrast');
    bindToggle('a11yMonochrome', 'monochrome');
    bindToggle('a11yLinkHighlight', 'linkHighlight');
    bindToggle('a11yReduceMotion', 'reduceMotion');
    bindToggle('a11yBigCursor', 'bigCursor');

    // Button itself
    const btn = document.getElementById('headerAccessibilityBtn');
    if (btn) {
      btn.setAttribute('aria-haspopup', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // don't bubble into header-location modal opener
        e.preventDefault();
        togglePanel();
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePanel();
      });
    }

    // Close on outside click / Escape
    document.addEventListener('click', (e) => {
      const panel = document.getElementById(PANEL_ID);
      if (!panel || !panel.classList.contains('open')) return;
      if (!panel.contains(e.target) && e.target.id !== 'headerAccessibilityBtn') {
        closePanel();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel();
    });

    // Apply on load
    apply(state);
  }

  function ensurePanel() {
    if (document.getElementById(PANEL_ID)) return;
    if (!document.body) return; // will be re-called by init run later
    const panel = document.createElement('div');
    panel.id = PANEL_ID;
    panel.className = 'a11y-panel';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'הגדרות נגישות');

    const sections = `
      <h3>♿ הגדרות נגישות</h3>
      <div class="a11y-row">
        <span class="a11y-label" id="a11y-size-label">גודל טקסט</span>
        <div class="a11y-size-group" role="group" aria-labelledby="a11y-size-label">
          <button type="button" class="a11y-size-btn" aria-pressed="false" tabindex="0">א</button>
          <button type="button" class="a11y-size-btn" aria-pressed="false" tabindex="0">א+</button>
          <button type="button" class="a11y-size-btn" aria-pressed="false" tabindex="0">א++</button>
          <button type="button" class="a11y-size-btn" aria-pressed="false" tabindex="0">א+++</button>
        </div>
      </div>
      <div class="a11y-row">
        <label class="a11y-label" for="a11yHighContrast">ניגודיות גבוהה</label>
        <input type="checkbox" id="a11yHighContrast" class="a11y-check">
      </div>
      <div class="a11y-row">
        <label class="a11y-label" for="a11yMonochrome">מצב מונוכרום</label>
        <input type="checkbox" id="a11yMonochrome" class="a11y-check">
      </div>
      <div class="a11y-row">
        <label class="a11y-label" for="a11yLinkHighlight">הדגשת קישורים</label>
        <input type="checkbox" id="a11yLinkHighlight" class="a11y-check">
      </div>
      <div class="a11y-row">
        <label class="a11y-label" for="a11yReduceMotion">הפסקת אנימציות</label>
        <input type="checkbox" id="a11yReduceMotion" class="a11y-check">
      </div>
      <div class="a11y-row">
        <label class="a11y-label" for="a11yBigCursor">סמן גדול</label>
        <input type="checkbox" id="a11yBigCursor" class="a11y-check">
      </div>
    `;
    panel.innerHTML = sections;
    document.body.appendChild(panel);
  }

  // Public API (mirrors Settings style used elsewhere)
  window.Accessibility = {
    get: load,
    apply: apply,
    update: update,
    open: openPanel,
    close: closePanel,
    toggle: togglePanel,
    init: init
  };

  // Auto-start after DOM ready (or immediately if already loaded)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();