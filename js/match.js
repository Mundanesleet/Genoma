/* =========================================================================
   GENOMA — Match
   1) Asesor "Encuentra tu Match" (home): recomienda una prenda real del
      catálogo según línea, ocasión y silueta.
   2) Carrusel "Completa el Look" (PDP): scroll-snap nativo + controles.
   ========================================================================= */
(function (G) {
  'use strict';
  var ui = G.ui;
  if (!ui) return;

  /* ---------- 1. Asesor ---------- */
  function initAdvisor() {
    var root = document.querySelector('[data-advisor]');
    if (!root) return;
    var out = root.querySelector('[data-advisor-result]');
    var state = { line: 'mujer', occasion: 'lluvia', fit: 'slim' };
    var OCCASION = { lluvia: 'Urbano & Lluvia', oficina: 'Oficina Chic', noche: 'Noche Biker', finde: 'Fin de Semana' };

    function pick(list) {
      var best = null, bestScore = -1;
      list.forEach(function (p) {
        var s = (p.tags.occasion.indexOf(state.occasion) > -1 ? 2 : 0) + (p.tags.fit.indexOf(state.fit) > -1 ? 1 : 0);
        if (s > bestScore) { best = p; bestScore = s; }
      });
      return best;
    }

    function render() {
      G.ProductService.getByLine(state.line).then(function (list) {
        var p = pick(list);
        if (!p) return;
        out.innerHTML = '<div class="advisor__result-head"><span class="label">Match recomendado</span><span class="advisor__pill">' + ui.esc(OCCASION[state.occasion]) + '</span></div>' +
          '<a class="advisor__media" href="' + ui.productUrl(p.id) + '" tabindex="-1" aria-hidden="true">' + ui.picture(p, p.mainImage, { sizes: '(min-width: 1024px) 22vw, 90vw', alt: '' }) +
          '<span class="advisor__media-tag">' + ui.esc(p.collection) + '</span></a>' +
          '<div><h3 class="advisor__name">' + ui.esc(p.name) + '</h3><p class="body-sm muted">' + ui.esc(p.summary) + '.</p>' +
          '<div class="advisor__buy"><span class="numeric price">' + ui.money(p.price) + '</span>' +
          '<a class="btn btn--dark btn--sm" href="' + ui.productUrl(p.id) + '">Ver match</a></div></div>';
      });
    }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('[data-step]');
      if (!b) return;
      root.querySelectorAll('[data-step="' + b.dataset.step + '"]').forEach(function (o) { var on = o === b; o.classList.toggle('is-active', on); o.setAttribute('aria-pressed', on); });
      state[b.dataset.step] = b.dataset.value;
      render();
    });
    render();
  }

  /* ---------- 2. Carrusel ---------- */
  function initCarousel(root) {
    var track = root.querySelector('[data-carousel-track]');
    var prev = root.querySelector('[data-carousel-prev]');
    var next = root.querySelector('[data-carousel-next]');
    var dots = root.querySelector('[data-carousel-dots]');
    if (!track) return;
    var slides = Array.prototype.slice.call(track.children);

    if (dots) {
      dots.innerHTML = slides.map(function (_, i) { return '<button type="button" aria-label="Ir a la prenda ' + (i + 1) + ' de ' + slides.length + '"></button>'; }).join('');
      dots.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        go(Array.prototype.indexOf.call(dots.children, b));
      });
    }
    function step() { return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth; }
    function index() { return Math.round(track.scrollLeft / Math.max(1, step())); }
    function go(i) { track.scrollTo({ left: Math.max(0, Math.min(slides.length - 1, i)) * step(), behavior: G.anim && G.anim.reduceMotion ? 'auto' : 'smooth' }); }
    function update() {
      var i = index(), max = track.scrollWidth - track.clientWidth - 2;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= max;
      if (dots) Array.prototype.forEach.call(dots.children, function (d, k) { d.classList.toggle('is-active', k === i); d.setAttribute('aria-current', k === i ? 'true' : 'false'); });
    }
    if (prev) prev.addEventListener('click', function () { go(index() - 1); });
    if (next) next.addEventListener('click', function () { go(index() + 1); });
    var t;
    track.addEventListener('scroll', function () { cancelAnimationFrame(t); t = requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index() - 1); }
    });
    update();
  }

  G.match = { initCarousel: initCarousel };
  initAdvisor();
})(window.GENOMA = window.GENOMA || {});
