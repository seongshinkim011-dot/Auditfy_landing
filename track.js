// 유입 추적 + 측정 도구 — 메인과 /free 여덟 페이지가 함께 읽는 단 하나의 파일.
//
// ① 어디서 들어왔는지(UTM·referrer)를 세션에 저장해 신청 폼에 같이 실어 보낸다.
//    → 구글 시트「신청」의 '유입 경로' 칸에 쌓여, 신청 한 건마다 출처를 알 수 있다.
// ② 측정 도구(지금은 Vercel Web Analytics)를 여기서 한 번만 주입한다.
//    도구를 바꾸거나 뺄 때 고칠 곳은 이 파일 하나뿐이다.
//
// 개인정보는 다루지 않는다 — UTM 값과 referrer 도메인만 본다.

(function () {
  'use strict';

  // ── ② 측정 도구 주입 ────────────────────────────────────────────────
  // GA4 로 바꾸거나 함께 쓰려면 아래 블록만 교체/추가한다.
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  var vs = document.createElement('script');
  vs.defer = true;
  vs.src = '/_vercel/insights/script.js';
  document.head.appendChild(vs);

  // Google Analytics 4 — /config.js 의 gaId 에 값이 있을 때만 켜진다.
  // Vercel Hobby 는 커스텀 이벤트를 보여주지 않으므로, 이벤트 7종은 GA4 를 켜야 실제로 조회된다.
  var gaId = (window.LANDING_CONFIG || {}).gaId || '';
  if (gaId) {
    var gs = document.createElement('script');
    gs.async = true;
    gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    document.head.appendChild(gs);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  }

  // ── ① 유입 경로 수집 ────────────────────────────────────────────────
  var KEY = 'af_attrib';

  function read() {
    try { var v = sessionStorage.getItem(KEY); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function save(o) {
    try { sessionStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {}
  }

  function capture() {
    var q;
    try { q = new URLSearchParams(location.search); } catch (e) { q = { get: function () { return null; } }; }
    var hasUtm = q.get('utm_source') || q.get('utm_medium') || q.get('utm_campaign');

    // 한 세션 안에서는 첫 유입을 유지한다. 새 UTM 을 달고 다시 들어오면 그쪽을 우선한다.
    var prev = read();
    if (prev && !hasUtm) return prev;

    var refHost = '';
    try {
      if (document.referrer) refHost = new URL(document.referrer).hostname.replace(/^www\./, '');
    } catch (e) {}
    // 사이트 안에서의 이동은 유입이 아니다
    if (refHost && refHost === location.hostname.replace(/^www\./, '')) refHost = '';

    var a = {
      s: q.get('utm_source') || '',
      m: q.get('utm_medium') || '',
      c: q.get('utm_campaign') || '',
      r: refHost,
      l: location.pathname,
      d: new Date().toISOString().slice(0, 10)
    };
    save(a);
    return a;
  }

  // 시트에서 사람이 바로 읽을 수 있는 한 줄로 요약한다
  function label(a) {
    if (!a) return '';
    var parts = [a.s || a.r || 'direct'];
    if (a.m) parts.push(a.m);
    if (a.c) parts.push(a.c);
    var out = parts.join(' / ');
    if (a.l && a.l !== '/') out += ' → ' + a.l;
    return out.slice(0, 120);
  }

  var attrib = capture();

  window.AF = {
    attrib: function () { return attrib; },
    label: function () { return label(attrib); }
  };

  // /free 일곱 페이지는 숨은 칸을 자동으로 채운다 (FormData 가 그대로 실어 보낸다)
  function fill() {
    var el = document.getElementById('af_attrib');
    if (el) el.value = label(attrib);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill);
  else fill();
})();
