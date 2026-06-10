// src/scripts/tracker.js
const ENDPOINT = 'https://jiylkkzhrnqcjfhnoqkv.supabase.co/functions/v1/track';



// ── fingerprint ───────────────────────────────────────────
function getFingerprint() {
  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency ?? '',
    navigator.platform ?? '',
  ].join('|');

  let hash = 5381;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) + hash) ^ raw.charCodeAt(i);
  }
  return (hash >>> 0).toString(36);
}

// ── local token ───────────────────────────────────────────
function getToken() {
  let t = localStorage.getItem('_jd_tok');
  if (!t) {
    t = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('_jd_tok', t);
  }
  return t;
}

// ── payload ───────────────────────────────────────────────
function buildPayload() {
  return {
    token:       getToken(),
    fingerprint: getFingerprint(),
    referrer:    document.referrer || null,
    page:        location.pathname,
    screen:      screen.width + 'x' + screen.height,
    language:    navigator.language,
    ua:          navigator.userAgent,
    ts:          Date.now(),
  };
}

// ── action queue ──────────────────────────────────────────
const actionQueue = [];

function logAction(type, data) {
  actionQueue.push({
    token: getToken(),
    type:  type,
    data:  data || {},
    ts:    Date.now(),
    page:  location.pathname,
  });
}

// ── scroll tracking ───────────────────────────────────────
function initScrollTracking() {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const seen = new Set();
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting && !seen.has(e.target.id)) {
        seen.add(e.target.id);
        logAction('section_view', { section: e.target.id });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(function(s) { observer.observe(s); });
}

// ── flush ─────────────────────────────────────────────────
// ── flush ─────────────────────────────────────────────────
function flush() {
  const payload = {
    visit:   buildPayload(),
    actions: actionQueue.splice(0),
  };
  
  // use fetch with credentials omit instead of sendBeacon
  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'omit',   // ← this kills the CORS problem
    keepalive: true,        // ← this makes it survive page close, like sendBeacon
  }).catch(() => {});       // silent fail — tracking should never break the site
}
// ── boot ──────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', initScrollTracking);

window.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'hidden') flush();
});

window.addEventListener('beforeunload', flush);

window._jdTrack = { logAction: logAction };