/* =========================================================================
   GENOMA — Home: colecciones emblemáticas, catálogo y reseñas de la tienda.
   ========================================================================= */
(function (G) {
  'use strict';
  var ui = G.ui;
  if (!ui || !document.querySelector('[data-catalog-grid]')) return;

  /* ---------- Colecciones emblemáticas ---------- */
  var SPOTLIGHT = {
    todas: ['parka-impermeable', 'blazer-en-pano', 'bomber-classic-hombre'],
    impermeables: ['parka-impermeable', 'chaqueta-impermeable', 'impermeable-doble-faz'],
    biker: ['biker-tipo-cuero', 'chaqueta-biker', 'biker-tipo-cuero-hombre'],
    blazers: ['blazer-en-pano', 'blazer-ocre', 'chaqueta-en-pano-hombre'],
    bomber: ['bomber-classic-hombre', 'bomber-classic-mujer', 'bomber-classic-rib']
  };
  var spot = document.querySelector('[data-spotlight]');

  function spotlightHTML(list) {
    var main = list[0], side = list.slice(1);
    return '<article class="spot-main">' +
      '<div class="spot-main__media">' + ui.picture(main, main.mainImage, { sizes: '(min-width: 1024px) 52vw, 92vw' }) +
        '<span class="tag">Prenda insignia</span>' + (main.badge ? '<span class="tag tag--chip">' + ui.esc(main.badge) + '</span>' : '') + '</div>' +
      '<div class="spot-main__info"><div>' +
        '<span class="eyebrow">' + ui.esc(main.collection) + '</span>' +
        '<h3 class="spot-main__name"><a href="' + ui.productUrl(main.id) + '">' + ui.esc(main.name) + '</a></h3>' +
        '<p class="body-sm muted">' + ui.esc(main.summary) + '</p></div>' +
        '<div class="spot-main__buy"><span class="price price--lg">' + ui.money(main.price) + '</span>' +
        '<a class="btn btn--dark btn--sm" href="' + ui.productUrl(main.id) + '">Ver prenda</a></div></div>' +
    '</article>' +
    '<div class="spot-side-wrap">' + side.map(function (p) {
      return '<article class="spot-side">' +
        '<div class="spot-side__media">' + ui.picture(p, p.mainImage, { sizes: '(min-width: 1024px) 18vw, (min-width: 640px) 40vw, 92vw' }) +
          (p.badge ? '<span class="tag tag--light">' + ui.esc(p.badge) + '</span>' : '') + '</div>' +
        '<div class="spot-side__body"><div>' +
          '<span class="eyebrow">' + ui.esc(p.collection) + '</span>' +
          '<h3 class="spot-side__name"><a href="' + ui.productUrl(p.id) + '">' + ui.esc(p.name) + '</a></h3>' +
          '<p class="body-sm muted spot-side__desc">' + ui.esc(p.summary) + '</p></div>' +
          '<div><p class="numeric price spot-side__price">' + ui.money(p.price) + '</p>' +
          '<span class="btn-soft">Ver detalles</span></div></div>' +
      '</article>';
    }).join('') + '</div>';
  }

  function showCollection(key, animate) {
    G.ProductService.getByIds(SPOTLIGHT[key] || SPOTLIGHT.todas).then(function (list) {
      var paint = function () { spot.innerHTML = spotlightHTML(list); spot.classList.remove('is-switching'); };
      if (!animate || G.anim.reduceMotion) return paint();
      spot.classList.add('is-switching');
      setTimeout(paint, 320);
    });
  }

  var tabs = document.querySelector('[data-collection-tabs]');
  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('[data-collection]');
    if (!b || b.classList.contains('is-active')) return;
    tabs.querySelectorAll('[data-collection]').forEach(function (t) { var on = t === b; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', on); });
    showCollection(b.dataset.collection, true);
  });
  tabs.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var all = Array.prototype.slice.call(tabs.querySelectorAll('[data-collection]'));
    var i = all.indexOf(document.activeElement); if (i < 0) return;
    var next = all[(i + (e.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length];
    next.focus(); next.click();
  });
  showCollection('todas', false);

  /* ---------- Catálogo ---------- */
  var grid = document.querySelector('[data-catalog-grid]');
  var countEl = document.querySelector('[data-catalog-count]');
  var lineFilter = document.querySelector('[data-line-filter]');
  var currentLine = null;

  function renderCatalog(line) {
    if (line === currentLine) return;
    currentLine = line;
    lineFilter.querySelectorAll('[data-line]').forEach(function (b) { var on = b.dataset.line === line; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on); });
    G.ProductService.getByLine(line).then(function (list) {
      grid.classList.remove('is-visible');
      grid.classList.add('stagger');
      grid.innerHTML = list.map(function (p) { return ui.productCard(p); }).join('');
      countEl.textContent = list.length + (list.length === 1 ? ' artículo' : ' artículos');
      G.anim.refresh(grid.parentNode);
    });
  }
  lineFilter.addEventListener('click', function (e) {
    var b = e.target.closest('[data-line]');
    if (b) { renderCatalog(b.dataset.line); syncUrl(b.dataset.line); }
  });

  function syncUrl(line) {
    var url = new URL(window.location.href);
    if (line === 'todas') url.searchParams.delete('linea'); else url.searchParams.set('linea', line);
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }

  // Enlaces "Mujer" / "Hombre" del header, hero, portales y footer: filtran sin recargar.
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-line-link]');
    if (!a) return;
    e.preventDefault();
    renderCatalog(a.dataset.lineLink);
    syncUrl(a.dataset.lineLink);
    document.getElementById('catalogo').scrollIntoView({ behavior: G.anim.reduceMotion ? 'auto' : 'smooth' });
  });

  var initial = new URLSearchParams(window.location.search).get('linea');
  renderCatalog(initial === 'mujer' || initial === 'hombre' ? initial : 'todas');

  /* ---------- Reseñas de la tienda (Judge.me, genomacol.com) ---------- */
  var score = document.querySelector('[data-store-score]');
  var rating = G.STORE.rating;
  score.innerHTML = ui.stars(rating.average, 20) +
    '<span class="score-pill__value">' + rating.average.toFixed(2) + '</span>' +
    '<span class="score-pill__count">(' + rating.count.toLocaleString('es-CO').replace(/,/g, '.') + ' reseñas verificadas)</span>';

  var reviewsEl = document.querySelector('[data-store-reviews]');
  G.ProductService.getAll().then(function (all) {
    var byId = {}; all.forEach(function (p) { byId[p.id] = p; });
    reviewsEl.innerHTML = G.STORE_REVIEWS.map(function (r) {
      var product = r.product && byId[r.product]
        ? '<a href="' + ui.productUrl(r.product) + '">' + ui.esc(byId[r.product].name) + '</a>'
        : ui.esc(r.productLabel || 'Reseña de la tienda');
      return '<article class="review-card"><div>' + ui.stars(r.rating, 16) +
        (r.title ? '<h3 class="review-card__title">' + ui.esc(r.title) + '</h3>' : '') +
        '<p class="review-card__body">“' + ui.esc(r.body) + '”</p></div>' +
        '<div class="review-card__foot"><span class="review-card__author">' + ui.esc(r.author) + ui.icon('check-circle') + '</span>' +
        '<span class="review-card__product">' + product + '</span></div></article>';
    }).join('');
    G.anim.refresh(reviewsEl.parentNode);
  });
})(window.GENOMA = window.GENOMA || {});
