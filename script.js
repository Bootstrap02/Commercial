
/* =====================================================================
   SCRIPT — presentation engine, stage component, navigation, sound
   Three states: NORMAL (free browsing) → PRESENTING (automatic) → STOP → NORMAL
   ===================================================================== */

(() => {
  "use strict";

  const CFG = PRESENTATION_CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const body = document.body;
  const scenes = $$(".scene");
  const TICK = 100; // ms

  /* ------------------------------------------------------------------
     Stage component: tabs + panels + highlighted items driven by one index
     ------------------------------------------------------------------ */
  const stages = $$("[data-stage]").map(stage => {
    const linkedTabs = $$(`[data-stage-tabs="${stage.id}"]`);
    const parts = [...$$("[data-s]", stage), ...linkedTabs.flatMap(t => $$("[data-s]", t))];
    const n = Math.max(...parts.map(p => +p.dataset.s)) + 1;
    const tabs = parts.filter(p => p.matches("button"));
    let current = -1;
    const api = {
      el: stage, n,
      set(i, force) {
        if (i === current && !force) return;
        current = i;
        parts.forEach(p => {
          const s = +p.dataset.s;
          p.classList.toggle("is-on", s === i);
          p.classList.toggle("is-past", s < i);
          if (p.matches("button")) p.setAttribute("aria-selected", s === i);
        });
        stage.dataset.current = i;
        document.dispatchEvent(new CustomEvent("stagechange", { detail: { stage, index: i } }));
      }
    };
    tabs.forEach(t => t.addEventListener("click", () => { if (state.mode === "normal") api.set(+t.dataset.s, true); }));
    api.set(0, true);
    return api;
  });
  const stagesIn = (scene) => stages.filter(s => scene.contains(s.el));

  /* ------------------------------------------------------------------
     Scene entrance (reveal + counters + intro title)
     ------------------------------------------------------------------ */
  const intro = $("#introName");
  intro.innerHTML = [...intro.textContent].map((ch, i) =>
    `<span class="ch" style="--i:${i}" aria-hidden="true">${ch === " " ? "&nbsp;" : ch}</span>`).join("");

  function runCounters(scene) {
    $$(".count", scene).forEach(c => {
      const to = +c.dataset.to, suffix = c.dataset.suffix || "", sep = c.dataset.sep;
      const fmt = (v) => (sep ? Math.round(v).toLocaleString("en-US") : Math.round(v)) + suffix;
      const t0 = performance.now(), dur = 1400;
      const step = (t) => { const p = Math.min(1, (t - t0) / dur); c.textContent = fmt(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  function enterScene(scene, { replay = false } = {}) {
    if (replay) { scene.classList.remove("on"); void scene.offsetWidth; }
    stagesIn(scene).forEach(s => s.set(0, true));
    requestAnimationFrame(() => scene.classList.add("on"));
    runCounters(scene);
  }

  /* Normal mode: reveal scenes as they scroll into view */
  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting && state.mode === "normal" && !e.target.classList.contains("on")) enterScene(e.target); });
  }, { threshold: 0.22 });
  scenes.forEach(s => revealIO.observe(s));

  /* ------------------------------------------------------------------
     Sound (optional, tiny Web Audio chimes, muted by default)
     ------------------------------------------------------------------ */
  const sound = {
    on: !!CFG.sound.enabledByDefault, ctx: null,
    ensure() { if (!this.ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (AC) this.ctx = new AC(); } if (this.ctx && this.ctx.state === "suspended") this.ctx.resume(); },
    tone(freq, start, dur, vol) {
      const c = this.ctx; if (!c) return;
      const o = c.createOscillator(), g = c.createGain();
      o.type = "sine"; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, c.currentTime + start);
      g.gain.exponentialRampToValueAtTime(vol, c.currentTime + start + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
      o.connect(g).connect(c.destination); o.start(c.currentTime + start); o.stop(c.currentTime + start + dur + 0.05);
    },
    chime() { if (!this.on) return; this.ensure(); const v = CFG.sound.volume; this.tone(880, 0, 0.7, v); this.tone(1318.5, 0.12, 0.9, v * 0.7); },
    start() { if (!this.on) return; this.ensure(); const v = CFG.sound.volume; [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone(f, i * 0.11, 0.9, v)); },
    toggle() { this.on = !this.on; if (this.on) { this.ensure(); this.chime(); } syncSoundUI(); }
  };
  function syncSoundUI() {
    $("#icoMuted").hidden = sound.on; $("#icoSound").hidden = !sound.on;
    $("#btnMute").setAttribute("aria-label", sound.on ? "Sound is on. Turn off" : "Sound is off. Turn on");
  }

  /* ------------------------------------------------------------------
     Presentation engine (one timer, central state)
     ------------------------------------------------------------------ */
  const state = { mode: "normal", playing: false, idx: 0, elapsed: 0, timer: null };
  const dur = (i) => CFG.durations[scenes[i].id] ?? 30;
  const total = () => scenes.reduce((s, _, i) => s + dur(i), 0);

  function setPlayIcon() {
    const playing = state.playing;
    $("#icoPause").hidden = !playing; $("#icoPlay").hidden = playing;
    $("#btnToggle").setAttribute("aria-label", playing ? "Pause" : "Resume");
  }

  function showChapter(scene) {
    const card = $("#chapterCard");
    $("#chapterText").textContent = scene.dataset.chapter || "";
    card.classList.remove("show"); void card.offsetWidth;
    if (scene.id !== "intro") card.classList.add("show");
  }

  function goTo(i) {
    scenes.forEach(s => s.classList.remove("active"));
    state.idx = i; state.elapsed = 0;
    const sc = scenes[i];
    sc.classList.add("active");
    sc.scrollTop = 0;
    enterScene(sc, { replay: true });
    showChapter(sc);
    $("#ctlLabel").textContent = sc.dataset.chapter || sc.id;
    body.classList.toggle("cta-on", !CFG.hideCtaOn.includes(sc.id));
    updateCta(sc.id);
    if (i > 0) sound.chime();
    updateProgress();
  }

  /* Contact card: message follows the scene (texts live in CTA_MESSAGES in config.js) */
  function updateCta(id) {
    const m = (typeof CTA_MESSAGES !== "undefined" && (CTA_MESSAGES[id] || CTA_MESSAGES.default)) || null;
    const card = $("#ctaCard"); if (!m || !card) return;
    if (card.dataset.msg === id) return;
    card.dataset.msg = id; card.classList.add("swap");
    setTimeout(() => { $("#ctaHead").textContent = m.head; $("#ctaSub").textContent = m.sub; card.classList.remove("swap"); }, 320);
  }

  function updateProgress() {
    let before = 0; for (let i = 0; i < state.idx; i++) before += dur(i);
    $("#presBar").style.width = ((before + state.elapsed) / total() * 100).toFixed(2) + "%";
  }

  function tick() {
    if (!state.playing) return;
    state.elapsed += TICK / 1000;
    const d = dur(state.idx), sc = scenes[state.idx];
    stagesIn(sc).forEach(s => s.set(Math.min(s.n - 1, Math.floor(state.elapsed / d * s.n)))); // evenly share the time
    updateProgress();
    if (state.elapsed >= d) next();
  }

  function start() {
    if (state.mode === "presenting") return;
    state.mode = "presenting"; state.playing = true;
    body.classList.replace("mode-normal", "mode-presenting");
    body.classList.remove("paused", "nav-open");
    body.classList.add("show-controls");
    sound.start();
    if (CFG.fullscreenOnPlay) enterFullscreen();
    goTo(0);
    setPlayIcon();
    clearInterval(state.timer); state.timer = setInterval(tick, TICK);
    pokeControls();
  }

  function pause() { if (state.mode !== "presenting" || !state.playing) return; state.playing = false; body.classList.add("paused", "show-controls"); setPlayIcon(); }
  function resume() { if (state.mode !== "presenting" || state.playing) return; state.playing = true; body.classList.remove("paused"); setPlayIcon(); pokeControls(); }
  function toggle() { state.playing ? pause() : resume(); }

  function next() {
    if (state.mode !== "presenting") return;
    if (state.idx < scenes.length - 1) goTo(state.idx + 1);
    else if (CFG.loop) goTo(0);
    else stop();
  }
  function prev() {
    if (state.mode !== "presenting") return;
    if (state.elapsed > 3) goTo(state.idx); else goTo(Math.max(0, state.idx - 1));
  }
  function restart() { if (state.mode !== "presenting") return; goTo(0); if (!state.playing) resume(); }

  function stop() {
    if (state.mode !== "presenting") return;
    clearInterval(state.timer); state.timer = null; clearTimeout(hideTimer);
    state.mode = "normal"; state.playing = false; state.idx = 0; state.elapsed = 0;
    body.classList.replace("mode-presenting", "mode-normal");
    body.classList.remove("paused", "show-controls", "cta-on");
    scenes.forEach(s => { s.classList.remove("active", "on"); s.scrollTop = 0; });
    stages.forEach(s => s.set(0, true));
    $("#presBar").style.width = "0%";
    $("#chapterCard").classList.remove("show");
    $("#ctaCard").dataset.msg = "";
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    window.scrollTo({ top: 0, behavior: "instant" });
    enterScene($("#intro"), { replay: true });
    setPlayIcon();
  }

  /* ------------------------------------------------------------------
     Fullscreen + controls visibility
     ------------------------------------------------------------------ */
  let lastFsChange = 0, hideTimer = null;
  function enterFullscreen() { const d = document.documentElement; if (d.requestFullscreen && !document.fullscreenElement) d.requestFullscreen().catch(() => {}); }
  function toggleFullscreen() { document.fullscreenElement ? document.exitFullscreen().catch(() => {}) : enterFullscreen(); }
  document.addEventListener("fullscreenchange", () => { lastFsChange = Date.now(); });

  function pokeControls() {
    if (state.mode !== "presenting") return;
    body.classList.add("show-controls");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { if (state.playing) body.classList.remove("show-controls"); }, CFG.controlsHideAfterMs);
  }
  ["mousemove", "pointerdown", "touchstart"].forEach(ev => document.addEventListener(ev, pokeControls, { passive: true }));

  /* ------------------------------------------------------------------
     Wiring: buttons + keyboard
     ------------------------------------------------------------------ */
  const actions = { play: start, toggle, next, prev, stop, restart, mute: () => sound.toggle(), fullscreen: toggleFullscreen };
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    actions[b.dataset.act]?.();
  });

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    const typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;
    if (typing) return;
    const k = e.key;
    if (k === "f" || k === "F") { e.preventDefault(); toggleFullscreen(); return; }
    if (k === "m" || k === "M") { sound.toggle(); return; }
    if (state.mode !== "presenting") return;
    if (k === " " || k === "Spacebar") { e.preventDefault(); toggle(); }
    else if (k === "ArrowRight") { e.preventDefault(); next(); }
    else if (k === "ArrowLeft") { e.preventDefault(); prev(); }
    else if (k === "s" || k === "S") { stop(); }
    else if (k === "Escape") { if (!document.fullscreenElement && Date.now() - lastFsChange > 400) stop(); }
  });

  /* ------------------------------------------------------------------
     Navigation (normal mode): active link, mobile menu, header style
     ------------------------------------------------------------------ */
  const navLinks = $$("#mainNav a");
  const activeIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting || state.mode !== "normal") return;
      navLinks.forEach(a => a.classList.toggle("active", a.dataset.nav.split(",").includes(e.target.id)));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  scenes.forEach(s => activeIO.observe(s));

  const header = $("#siteHeader"), burger = $("#burger");
  burger.addEventListener("click", () => { const o = header.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
  navLinks.forEach(a => a.addEventListener("click", () => { header.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));
  window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 12), { passive: true });

  /* ------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------ */
  syncSoundUI(); setPlayIcon();
  enterScene($("#intro"));
  if (CFG.autoplay) start();
})();
