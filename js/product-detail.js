/* =========================================================================
   GENOMA — Product Detail Page (producto.html?id=<producto>)
   ========================================================================= */
(function (G) {
  'use strict';
  var ui = G.ui;
  var root = document.querySelector('[data-pdp]');
  if (!ui || !root) return;
  var esc = ui.esc, icon = ui.icon;

  var params = new URLSearchParams(window.location.search);
  var id = params.get('id') || 'parka-impermeable';
  var state = { color: null, size: null, qty: 1 };
  var product = null;

  var LINE = { mujer: 'Mujer', hombre: 'Hombre' };
  var MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function fmtDate(iso) { var d = iso.split('-'); return +d[2] + ' ' + MONTHS[+d[1] - 1] + ' ' + d[0]; }

  /* ---------- Plantillas ---------- */
  function galleryHTML(p) {
    var order = [p.mainImage].concat(p.detailImages.filter(function (i) { return i !== p.mainImage; }));
    var slides = order.map(function (idx, n) {
      var main = n === 0;
      return '<figure class="gallery__item' + (main ? ' gallery__item--main' : '') + '" data-gallery-item="' + idx + '">' +
        '<button class="gallery__zoom-area" type="button" data-zoom aria-label="Ampliar foto ' + (n + 1) + '">' +
        ui.picture(p, idx, { sizes: main ? '(min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw' : '(min-width: 1280px) 30vw, (min-width: 1024px) 27vw, 100vw', eager: main, priority: main, position: '50% 18%' }) +
        '</button>' +
        (main ? '<span class="tag">' + esc(p.badge || 'Hecho en Colombia') + '</span><span class="gallery__chip">' + icon('zoom', 'icon--sm') + 'Ver en detalle</span>'
              : '<span class="gallery__label">Detalle ' + ('0' + n).slice(-2) + '</span>') +
        '</figure>';
    }).join('');
    return '<div class="gallery" data-gallery>' +
      '<div class="gallery__track" data-gallery-track tabindex="0" aria-label="Galería de ' + esc(p.name) + '" role="region">' + slides + '</div>' +
      '<div class="gallery__nav" aria-hidden="false">' +
        '<span class="gallery__counter" data-gallery-counter>1 / ' + order.length + '</span>' +
        '<span class="gallery__dots" data-gallery-dots>' + order.map(function (_, i) { return '<span' + (i === 0 ? ' class="is-active"' : '') + '></span>'; }).join('') + '</span>' +
        '<span class="gallery__arrows"><button type="button" data-gallery-prev aria-label="Foto anterior">' + icon('chevron-left', 'icon--sm') + '</button>' +
        '<button type="button" data-gallery-next aria-label="Foto siguiente">' + icon('chevron-right', 'icon--sm') + '</button></span>' +
      '</div></div>';
  }

  function featuresHTML(p) {
    return '<section class="pdp-features" aria-labelledby="pdp-features-title"><div>' +
      '<span class="eyebrow">Detalles de la prenda</span>' +
      '<h2 class="h-sm pdp-features__title" id="pdp-features-title">Características</h2>' +
      '<p class="body-sm muted">' + esc(G.STORE.sizeAdvice) + '</p></div>' +
      '<ul class="pdp-features__list" role="list">' + p.features.map(function (f) { return '<li>' + icon('check-circle', 'icon--sm') + esc(f) + '</li>'; }).join('') + '</ul></section>';
  }

  function ratingRow(p) {
    var r = p.rating;
    if (!r.count) return '<div class="pdp-rating pdp-rating--empty"><span class="body-sm muted">Esta prenda aún no tiene reseñas.</span></div>';
    return '<div class="pdp-rating"><a class="pdp-rating__score" href="#resenas" aria-label="' + ui.ratingLabel(r.average).replace('.', ',') + ' de 5. Ver ' + r.count + ' reseñas">' +
      '<span class="pdp-rating__num">' + ui.ratingLabel(r.average) + '</span>' + ui.stars(r.average, 16) +
      '<span class="pdp-rating__count">(' + r.count + ' reseñas)</span></a>' +
      '<a class="pdp-rating__link" href="#resenas">Leer reseñas</a></div>';
  }

  function buyHTML(p) {
    var colors = p.colors.length
      ? '<div class="pdp-option"><div class="pdp-option__head"><span class="label">Color:</span><span class="pdp-option__value" data-color-label></span></div>' +
        '<div class="swatches" role="radiogroup" aria-label="Color">' + p.colors.map(function (c) {
          var bg = c.accent ? 'linear-gradient(135deg, ' + c.hex + ' 0 58%, ' + c.accent + ' 58% 100%)' : c.hex;
          return '<button class="swatch" type="button" role="radio" aria-checked="false" data-color="' + esc(c.name) + '" aria-label="' + esc(c.name) + '" title="' + esc(c.name) + '"><span style="background:' + bg + '"></span></button>';
        }).join('') + '</div></div>'
      : '';
    var sizes = '<div class="pdp-option"><div class="pdp-option__head"><span class="label">Talla:</span>' +
      '<span class="pdp-option__value pdp-option__value--muted" data-size-label>Selecciona tu talla</span>' +
      (p.sizeChart ? '<button class="pdp-guide-btn" type="button" data-open-guide>' + icon('ruler', 'icon--sm') + 'Guía de tallas</button>' : '') + '</div>' +
      '<div class="sizes" role="radiogroup" aria-label="Talla" style="--cols:' + Math.min(p.sizes.length, 6) + '">' + p.sizes.map(function (s) {
        return '<button class="size" type="button" role="radio" aria-checked="false" data-size="' + s + '">' + s + '</button>';
      }).join('') + '</div>' +
      '<p class="pdp-stock" data-stock aria-live="polite"></p></div>';

    return '<aside class="pdp-buy" aria-label="Comprar ' + esc(p.name) + '">' +
      '<div class="pdp-buy__top"><span class="eyebrow">' + esc(p.collection) + ' · ' + LINE[p.line] + '</span><span class="pdp-buy__tag">Hecho en Colombia</span></div>' +
      '<h1 class="pdp-title">' + esc(p.name) + '</h1>' +
      '<div class="pdp-price"><span class="pdp-price__value">' + ui.money(p.price) + '</span>' +
      '<span class="pdp-price__note">' + icon('card', 'icon--sm') + 'Paga en línea, con Addi o contra entrega en Bogotá</span></div>' +
      ratingRow(p) +
      '<div class="pdp-desc is-clamped" id="pdp-desc" data-desc>' + p.description.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>' +
      '<button class="pdp-desc__more" type="button" data-desc-toggle aria-expanded="false" aria-controls="pdp-desc" hidden>Leer más</button>' +
      colors + sizes +
      '<div class="pdp-actions" data-buy-actions>' +
        '<div class="pdp-actions__row">' +
          '<div class="stepper stepper--lg" aria-label="Cantidad"><button type="button" data-qty="-1" aria-label="Disminuir cantidad">' + icon('minus', 'icon--sm') + '</button>' +
          '<output data-qty-value aria-live="polite">1</output><button type="button" data-qty="1" aria-label="Aumentar cantidad">' + icon('plus', 'icon--sm') + '</button></div>' +
          '<button class="btn btn--dark pdp-actions__buy" type="button" data-buy-now>Comprar ahora ' + icon('arrow-right', 'icon--sm btn__arrow') + '</button>' +
        '</div>' +
        '<button class="btn btn--outline btn--block pdp-actions__add" type="button" data-add-bag>' + icon('bag', 'icon--sm') + 'Agregar a la bolsa</button>' +
        '<div class="pdp-actions__extra"><a class="pdp-whatsapp" href="#" data-whatsapp="Hola GENOMA, quiero asesoría sobre ' + esc(p.name) + ' (Ref. ' + esc(p.ref) + ')">' + icon('chat', 'icon--sm') + 'Asesoría personalizada por WhatsApp</a>' +
        (function (on) { return '<button class="fav-btn fav-btn--text' + (on ? ' is-active' : '') + '" type="button" data-fav="' + p.id + '" aria-pressed="' + on + '">' + icon(on ? 'heart-fill' : 'heart') + '<span>Favorito</span></button></div>'; })(G.Favorites.has(p.id)) +
      '</div>' +
      '<ul class="pdp-trust" role="list">' +
        '<li>' + icon('moped', 'icon--lg') + '<div><strong>Pago contra entrega en Bogotá D.C.</strong><span>Paga al recibir tu prenda en la puerta de tu casa.</span></div></li>' +
        '<li>' + icon('truck', 'icon--lg') + '<div><strong>Envíos a toda Colombia</strong><span>Despacho 2 días hábiles después de tu compra; fuera de Bogotá, entrega de 4 a 6 días.</span></div></li>' +
        '<li>' + icon('swap', 'icon--lg') + '<div><strong>Cambios hasta 30 días</strong><span>Por talla o por otro producto, con etiquetas y sin señales de uso.</span></div></li>' +
      '</ul>' +
      '<div class="accordion">' +
        acc('caracteristicas', 'Características y materiales', '<ul>' + p.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul><p>' + esc(G.STORE.sizeAdvice) + '</p>') +
        acc('envios', 'Envíos y pago contra entrega', '<p><strong>Bogotá:</strong> pago contra entrega disponible.</p><p>' + esc(G.STORE.shipping) + '</p>') +
        acc('cambios', 'Cambios y devoluciones', '<p>' + esc(G.STORE.exchange) + '</p><p><a href="' + G.STORE.policies.exchanges + '" target="_blank" rel="noopener">Ver política completa</a></p>') +
      '</div>' +
    '</aside>';
  }

  function acc(key, title, body) {
    return '<div class="accordion__item" id="' + key + '"><h3><button type="button" class="accordion__btn" aria-expanded="false" aria-controls="acc-' + key + '">' +
      '<span>' + esc(title) + '</span>' + icon('chevron-down', 'icon--sm') + '</button></h3>' +
      '<div class="accordion__panel" id="acc-' + key + '" role="region" hidden><div class="accordion__inner">' + body + '</div></div></div>';
  }

  function matchHTML(p) {
    return '<section class="pdp-match" aria-labelledby="match-title"><div class="container">' +
      '<div class="pdp-section-head reveal"><div><span class="eyebrow">Curaduría editorial</span>' +
      '<h2 class="pdp-h2" id="match-title">Completa el Look / Match</h2></div>' +
      '<p class="body-sm muted">Piezas del archivo GENOMA para combinar en capas con ' + esc(p.name) + '.</p></div>' +
      '<div class="match-carousel" data-carousel>' +
        '<div class="match-carousel__track stagger" data-carousel-track data-match-track tabindex="0" role="region" aria-label="Prendas para completar el look"></div>' +
        '<div class="match-carousel__controls"><button type="button" class="round-btn" data-carousel-prev aria-label="Prenda anterior">' + icon('chevron-left', 'icon--sm') + '</button>' +
        '<div class="match-carousel__dots" data-carousel-dots></div>' +
        '<button type="button" class="round-btn" data-carousel-next aria-label="Prenda siguiente">' + icon('chevron-right', 'icon--sm') + '</button></div>' +
      '</div></div></section>';
  }

  function reviewsHTML(p) {
    var r = p.rating;
    var head = '<div class="pdp-reviews__head reveal"><div class="pdp-reviews__intro"><span class="eyebrow">Opiniones reales</span>' +
      '<h2 class="pdp-h2">Reseñas Verificadas</h2>' +
      '<p class="body-sm muted">Calificaciones de compradores en genomacol.com para ' + esc(p.name) + '.</p></div>';
    if (!r.count) {
      return '<section class="pdp-reviews" id="resenas"><div class="container">' + head +
        '<div class="pdp-reviews__score"><p class="body-md muted">Esta prenda todavía no tiene reseñas. Las reseñas de la tienda tienen un promedio de ' + G.STORE.rating.average.toFixed(2) + ' sobre 5.</p></div></div></div></section>';
    }
    var cards = p.reviews.map(function (rv, i) {
      return '<article class="pdp-review' + (i > 2 ? ' is-extra' : '') + '"' + (i > 2 ? ' hidden' : '') + '>' +
        '<div class="pdp-review__top">' + ui.stars(rv.rating, 16) + (rv.verified ? '<span class="pdp-review__badge">Comprador verificado</span>' : '') + '</div>' +
        (rv.title ? '<h3 class="pdp-review__title">“' + esc(rv.title) + '”</h3>' : '') +
        '<p class="pdp-review__body">' + esc(rv.body).replace(/\n+/g, '<br>') + '</p>' +
        '<div class="pdp-review__foot"><div><span class="pdp-review__author">' + esc(rv.author) + '</span><span class="pdp-review__date">' + fmtDate(rv.date) + '</span></div>' +
        (rv.verified ? icon('verified') : '') + '</div></article>';
    }).join('');
    return '<section class="pdp-reviews" id="resenas"><div class="container">' + head +
      '<div class="pdp-reviews__score">' +
        '<div class="big-rating"><span class="big-rating__num" aria-hidden="true">' + ui.ratingLabel(r.average) + '</span>' +
        '<div class="big-rating__meta">' + ui.stars(r.average, 20) + '<span>' + r.fiveStar + ' calificaciones de 5 estrellas</span></div></div>' +
        '<span class="pdp-reviews__divider" aria-hidden="true"></span>' +
        '<div class="pdp-reviews__total"><span class="label">' + r.count + ' reseñas en total</span><span class="body-sm muted">Promedio ' + r.average.toFixed(2).replace('.', ',') + ' de 5 · Fuente: Judge.me</span></div>' +
      '</div></div>' +
      '<div class="pdp-reviews__grid stagger">' + cards + '</div>' +
      (p.reviews.length > 3 ? '<div class="center pdp-reviews__more"><button class="btn btn--outline" type="button" data-more-reviews>Ver más reseñas</button></div>' : '') +
      '</div></section>';
  }

  function guideHTML(p) {
    if (!p.sizeChart) return '';
    var c = p.sizeChart;
    return '<div class="modal" id="guia-tallas" role="dialog" aria-modal="true" aria-labelledby="guide-title" hidden>' +
      '<div class="modal__card"><button class="icon-btn modal__close" type="button" data-close-guide aria-label="Cerrar guía de tallas">' + icon('close') + '</button>' +
      '<span class="eyebrow">Guía oficial de medidas</span><h2 class="h-md" id="guide-title">' + esc(p.name) + '</h2>' +
      '<p class="body-sm muted">Medidas en centímetros tomadas sobre la prenda (cuadro de tallas publicado por GENOMA). ' + esc(G.STORE.sizeAdvice) + '</p>' +
      '<div class="table-wrap"><table class="size-table"><thead><tr><th scope="col">Medida</th>' + c.sizes.map(function (s) { return '<th scope="col">' + s + '</th>'; }).join('') + '</tr></thead><tbody>' +
      c.rows.map(function (row) { return '<tr><th scope="row">' + esc(row[0]) + '</th>' + row.slice(1).map(function (v) { return '<td>' + v + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>' +
      '<div class="modal__help"><span>¿Dudas entre dos tallas?</span><a href="#" data-whatsapp="Hola GENOMA, tengo dudas con la talla de ' + esc(p.name) + '">Escríbenos por WhatsApp</a></div>' +
      '</div></div>';
  }

  function stickyHTML(p) {
    return '<div class="buy-bar" data-buy-bar aria-hidden="true"><div class="buy-bar__info"><span class="buy-bar__variant" data-bar-variant></span>' +
      '<span class="buy-bar__price">' + ui.money(p.price) + '</span></div>' +
      '<button class="buy-bar__bag" type="button" data-add-bag aria-label="Agregar a la bolsa" tabindex="-1">' + icon('bag') + '</button>' +
      '<button class="btn btn--dark buy-bar__cta" type="button" data-buy-now tabindex="-1">Comprar ahora ' + icon('arrow-right', 'icon--sm') + '</button></div>';
  }

  function lightboxHTML() {
    return '<div class="lightbox" data-lightbox role="dialog" aria-modal="true" aria-label="Foto ampliada" hidden>' +
      '<button class="icon-btn lightbox__close" type="button" data-close-lightbox aria-label="Cerrar">' + icon('close') + '</button>' +
      '<div class="lightbox__img" data-lightbox-img></div></div>';
  }

  /* ---------- Render ---------- */
  function render(p) {
    document.title = p.name + ' — GENOMA Colombia';
    setMeta('description', p.name + ' de GENOMA: ' + p.summary.toLowerCase() + '. ' + ui.money(p.price) + '. Contra entrega en Bogotá y envíos a toda Colombia.');
    setMeta('og:title', p.name + ' — GENOMA Colombia', true);
    setMeta('og:description', p.summary, true);

    root.innerHTML =
      '<section class="pdp-crumbs"><div class="pdp-crumbs__inner">' +
        '<nav aria-label="Ruta de navegación"><ol class="crumbs" role="list"><li><a href="index.html">Inicio</a></li>' +
        '<li><a href="index.html?linea=' + p.line + '#catalogo">' + LINE[p.line] + '</a></li>' +
        '<li><a href="index.html#colecciones">' + esc(p.collection) + '</a></li><li aria-current="page">' + esc(p.name) + '</li></ol></nav>' +
        '<div class="pdp-crumbs__meta"><span><i aria-hidden="true"></i>Chaquetas 100% colombianas</span><span class="pdp-crumbs__ref">Ref. ' + esc(p.ref) + '</span></div>' +
      '</div></section>' +
      '<section class="pdp-hero"><div class="pdp-grid">' +
        '<div class="pdp-grid__gallery">' + galleryHTML(p) + '</div>' +
        '<div class="pdp-grid__buy">' + buyHTML(p) + '</div>' +
        '<div class="pdp-grid__features">' + featuresHTML(p) + '</div>' +
      '</div></section>' +
      matchHTML(p) + reviewsHTML(p) + guideHTML(p) + stickyHTML(p) + lightboxHTML();

    var initial = ui.firstAvailable(p) || { color: p.colors[0] ? p.colors[0].name : null, size: null };
    state.color = p.colors.length ? (initial.color || p.colors[0].name) : null;
    state.size = null;
    bind(p);
    applyColor(false);
    ui.$$('[data-whatsapp]', root).forEach(ui.setWhatsapp);
    renderMatch(p);
    structuredData(p);
    G.anim.refresh(root);
  }

  function setMeta(name, content, og) {
    var el = document.querySelector(og ? 'meta[property="' + name + '"]' : 'meta[name="' + name + '"]');
    if (el) el.setAttribute('content', content);
  }

  function renderMatch(p) {
    G.ProductService.getByIds(p.match).then(function (list) {
      var track = root.querySelector('[data-match-track]');
      track.innerHTML = list.map(function (m) { return ui.matchCard(m); }).join('');
      G.match.initCarousel(root.querySelector('[data-carousel]'));
      G.anim.refresh(track.parentNode);
    });
  }

  function structuredData(p) {
    var data = {
      '@context': 'https://schema.org', '@type': 'Product', name: p.name, sku: p.ref, brand: { '@type': 'Brand', name: 'GENOMA' },
      description: p.description.join(' '),
      image: p.images.slice(0, 3).map(function (img) { return new URL('assets/images/products/' + p.id + '/' + img.key + '-' + img.fallback + '.jpg', window.location.href).href; }),
      offers: { '@type': 'Offer', priceCurrency: 'COP', price: p.price, availability: ui.firstAvailable(p) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' }
    };
    if (p.rating.count) data.aggregateRating = { '@type': 'AggregateRating', ratingValue: p.rating.average, reviewCount: p.rating.count };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  /* ---------- Estado de variantes ---------- */
  function applyColor(fromUser) {
    var p = product;
    if (p.colors.length) {
      ui.$$('.swatch', root).forEach(function (b) { var on = b.dataset.color === state.color; b.classList.toggle('is-active', on); b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; });
      root.querySelector('[data-color-label]').textContent = state.color;
      var c = p.colors.filter(function (x) { return x.name === state.color; })[0];
      if (c && c.image != null && fromUser) swapMainImage(c.image);
    }
    var st = ui.stockFor(p, state.color);
    ui.$$('.size', root).forEach(function (b) {
      var ok = !!st[b.dataset.size];
      b.classList.toggle('is-out', !ok);
      b.setAttribute('aria-disabled', String(!ok));
      b.setAttribute('aria-label', 'Talla ' + b.dataset.size + (ok ? '' : ' (agotada)'));
    });
    if (state.size && !st[state.size]) state.size = null;
    applySize();
  }

  function applySize() {
    var p = product, st = ui.stockFor(p, state.color);
    var anyFocusable = false;
    ui.$$('.size', root).forEach(function (b) {
      var on = b.dataset.size === state.size;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-checked', on);
      b.tabIndex = on ? 0 : -1;
      if (on) anyFocusable = true;
    });
    if (!anyFocusable) { var first = root.querySelector('.size'); if (first) first.tabIndex = 0; }
    var label = root.querySelector('[data-size-label]');
    label.textContent = state.size || 'Selecciona tu talla';
    label.classList.toggle('pdp-option__value--muted', !state.size);
    var stock = root.querySelector('[data-stock]');
    var available = p.sizes.filter(function (s) { return st[s]; });
    var colorTxt = state.color ? ' en ' + state.color : '';
    if (!available.length) { stock.className = 'pdp-stock is-out'; stock.textContent = 'Agotada' + colorTxt + '. Elige otro color o escríbenos por WhatsApp.'; }
    else if (state.size) { stock.className = 'pdp-stock is-ok'; stock.textContent = 'Disponible: talla ' + state.size + colorTxt + '.'; }
    else { stock.className = 'pdp-stock'; stock.textContent = 'Tallas disponibles' + colorTxt + ': ' + available.join(', ') + '.'; }
    var bar = root.querySelector('[data-bar-variant]');
    bar.textContent = [state.color, state.size ? 'Talla ' + state.size : 'Elige talla'].filter(Boolean).join(' / ');
  }

  function swapMainImage(idx) {
    var p = product;
    var main = root.querySelector('.gallery__item--main');
    var btn = main.querySelector('.gallery__zoom-area');
    var holder = document.createElement('div');
    holder.innerHTML = ui.picture(p, idx, { sizes: '(min-width: 1280px) 62vw, (min-width: 1024px) 56vw, 100vw', eager: true, position: '50% 18%' });
    var pic = holder.firstChild;
    pic.classList.add('swap-in');
    btn.replaceChild(pic, btn.querySelector('picture'));
    main.dataset.galleryItem = idx;
    var track = root.querySelector('[data-gallery-track]');
    if (track.scrollLeft > 0) track.scrollTo({ left: 0, behavior: 'smooth' });
  }

  /* ---------- Eventos ---------- */
  function bind(p) {
    var swatches = root.querySelector('.swatches');
    if (swatches) {
      swatches.addEventListener('click', function (e) {
        var b = e.target.closest('.swatch'); if (!b) return;
        state.color = b.dataset.color; applyColor(true);
      });
      radioKeys(swatches, '.swatch');
    }
    var sizes = root.querySelector('.sizes');
    sizes.addEventListener('click', function (e) {
      var b = e.target.closest('.size'); if (!b) return;
      if (b.classList.contains('is-out')) { ui.toast('La talla ' + b.dataset.size + ' está agotada' + (state.color ? ' en ' + state.color : '') + '.'); return; }
      state.size = b.dataset.size; applySize();
    });
    radioKeys(sizes, '.size');

    root.addEventListener('click', function (e) {
      var q = e.target.closest('[data-qty]');
      if (q) {
        state.qty = Math.max(1, Math.min(G.Cart.MAX_QTY, state.qty + (+q.dataset.qty)));
        root.querySelector('[data-qty-value]').textContent = state.qty;
        root.querySelectorAll('[data-qty]').forEach(function (b) { b.disabled = (+b.dataset.qty < 0 && state.qty <= 1) || (+b.dataset.qty > 0 && state.qty >= G.Cart.MAX_QTY); });
      }
      if (e.target.closest('[data-add-bag]')) purchase(false);
      if (e.target.closest('[data-buy-now]')) purchase(true);
      var dt = e.target.closest('[data-desc-toggle]');
      if (dt) {
        var open = dt.getAttribute('aria-expanded') !== 'true';
        root.querySelector('[data-desc]').classList.toggle('is-clamped', !open);
        dt.setAttribute('aria-expanded', open);
        dt.textContent = open ? 'Leer menos' : 'Leer más';
      }
      var acc = e.target.closest('.accordion__btn');
      if (acc) toggleAcc(acc);
      if (e.target.closest('[data-open-guide]')) openGuide();
      if (e.target.closest('[data-close-guide]') || e.target.matches('.modal')) closeGuide();
      var more = e.target.closest('[data-more-reviews]');
      if (more) {
        root.querySelectorAll('.pdp-review.is-extra').forEach(function (r) { r.hidden = false; });
        more.parentNode.remove();
      }
      var z = e.target.closest('[data-zoom]');
      if (z) openLightbox(+z.closest('[data-gallery-item]').dataset.galleryItem);
      if (e.target.closest('[data-close-lightbox]') || e.target.matches('.lightbox')) closeLightbox();
    });
    root.querySelector('[data-qty="-1"]').disabled = true;

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      closeGuide(); closeLightbox();
    });

    // Botón "volver": usa el historial si venimos del sitio.
    var back = document.querySelector('[data-back]');
    if (back && document.referrer.indexOf(window.location.host) > -1) back.addEventListener('click', function (e) { e.preventDefault(); history.back(); });

    initGallery();
    initBuyBar();
    var desc = root.querySelector('[data-desc]');
    if (desc.scrollHeight > desc.clientHeight + 4) root.querySelector('[data-desc-toggle]').hidden = false; else desc.classList.remove('is-clamped');
    if (window.location.hash === '#guia-tallas' && p.sizeChart) setTimeout(openGuide, 300);
    if (window.location.hash === '#envios') { var b = root.querySelector('[aria-controls="acc-envios"]'); if (b) { toggleAcc(b); setTimeout(function () { b.scrollIntoView({ block: 'center' }); }, 200); } }
  }

  // Navegación con flechas en grupos tipo radio (accesibilidad).
  function radioKeys(group, sel) {
    group.addEventListener('keydown', function (e) {
      if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].indexOf(e.key) < 0) return;
      e.preventDefault();
      var items = ui.$$(sel, group), i = items.indexOf(document.activeElement);
      var n = items[(i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length];
      n.focus(); n.click();
    });
  }

  function purchase(now) {
    if (!state.size) {
      var sizes = root.querySelector('.sizes');
      sizes.classList.remove('is-shake'); void sizes.offsetWidth; sizes.classList.add('is-shake');
      ui.toast('Selecciona una talla para continuar.');
      if (sizes.getBoundingClientRect().top < 80 || sizes.getBoundingClientRect().bottom > window.innerHeight) sizes.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (root.querySelector('.size:not(.is-out)') || root.querySelector('.size')).focus({ preventScroll: true });
      return;
    }
    ui.addToBag(product.id, state.color, state.size, state.qty, { openCart: now });
  }

  function toggleAcc(btn) {
    var open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', open);
    document.getElementById(btn.getAttribute('aria-controls')).hidden = !open;
  }

  var guideTrigger = null;
  function openGuide() {
    var m = document.getElementById('guia-tallas'); if (!m) return;
    guideTrigger = document.activeElement;
    m.hidden = false; document.body.classList.add('is-locked');
    requestAnimationFrame(function () { m.classList.add('is-open'); m.querySelector('[data-close-guide]').focus(); });
  }
  function closeGuide() {
    var m = document.getElementById('guia-tallas'); if (!m || m.hidden) return;
    m.classList.remove('is-open'); m.hidden = true; document.body.classList.remove('is-locked');
    if (guideTrigger) guideTrigger.focus({ preventScroll: true });
  }

  var lbTrigger = null;
  function openLightbox(idx) {
    var lb = root.querySelector('[data-lightbox]');
    lbTrigger = document.activeElement;
    var img = product.images[idx];
    var top = img.widths[img.widths.length - 1];
    root.querySelector('[data-lightbox-img]').innerHTML = '<picture><source type="image/avif" srcset="assets/images/products/' + product.id + '/' + img.key + '-' + top + '.avif">' +
      '<source type="image/webp" srcset="assets/images/products/' + product.id + '/' + img.key + '-' + top + '.webp">' +
      '<img src="assets/images/products/' + product.id + '/' + img.key + '-' + img.fallback + '.jpg" width="' + img.w + '" height="' + img.h + '" alt="' + esc(ui.altFor(product, idx)) + '"></picture>';
    lb.hidden = false; document.body.classList.add('is-locked');
    requestAnimationFrame(function () { lb.classList.add('is-open'); lb.querySelector('[data-close-lightbox]').focus(); });
  }
  function closeLightbox() {
    var lb = root.querySelector('[data-lightbox]'); if (!lb || lb.hidden) return;
    lb.classList.remove('is-open'); lb.hidden = true; document.body.classList.remove('is-locked');
    if (lbTrigger) lbTrigger.focus({ preventScroll: true });
  }

  /* Galería móvil: carrusel con scroll-snap; en desktop es una cuadrícula editorial. */
  function initGallery() {
    var track = root.querySelector('[data-gallery-track]');
    var items = ui.$$('.gallery__item', track);
    var counter = root.querySelector('[data-gallery-counter]');
    var dots = ui.$$('[data-gallery-dots] span', root);
    function idx() { return Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); }
    function update() {
      var i = idx();
      counter.textContent = (i + 1) + ' / ' + items.length;
      dots.forEach(function (d, k) { d.classList.toggle('is-active', k === i); });
    }
    function go(i) { track.scrollTo({ left: ((i + items.length) % items.length) * track.clientWidth, behavior: 'smooth' }); }
    var t;
    track.addEventListener('scroll', function () { cancelAnimationFrame(t); t = requestAnimationFrame(update); }, { passive: true });
    root.querySelector('[data-gallery-prev]').addEventListener('click', function () { go(idx() - 1); });
    root.querySelector('[data-gallery-next]').addEventListener('click', function () { go(idx() + 1); });
    track.addEventListener('keydown', function (e) {
      if (track.scrollWidth <= track.clientWidth + 2) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(idx() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx() - 1); }
    });
  }

  /* Barra de compra fija (mobile): aparece solo cuando los botones principales salen de la vista. */
  function initBuyBar() {
    var bar = root.querySelector('[data-buy-bar]');
    var actions = root.querySelector('[data-buy-actions]');
    var footer = document.querySelector('.site-footer');
    if (!('IntersectionObserver' in window)) return;
    var actionsVisible = true, footerVisible = false, passed = false;
    function apply() {
      var show = !actionsVisible && passed && !footerVisible;
      bar.classList.toggle('is-visible', show);
      bar.setAttribute('aria-hidden', String(!show));
      ui.$$('button', bar).forEach(function (b) { b.tabIndex = show ? 0 : -1; });
      document.body.classList.toggle('has-buy-bar', show);
    }
    new IntersectionObserver(function (en) {
      actionsVisible = en[0].isIntersecting;
      passed = en[0].boundingClientRect.top < 0;
      apply();
    }).observe(actions);
    if (footer) new IntersectionObserver(function (en) { footerVisible = en[0].isIntersecting; apply(); }).observe(footer);
  }

  /* ---------- Arranque ---------- */
  G.ProductService.getById(id).then(function (p) {
    if (!p) {
      root.innerHTML = '<section class="section pdp-missing"><div class="container stack-lg"><p class="eyebrow">Prenda no encontrada</p>' +
        '<h1 class="h-lg">Esta prenda no está disponible</h1><p class="body-md muted">Puede que el enlace haya cambiado. Explora la colección completa.</p>' +
        '<a class="btn btn--dark" href="index.html#catalogo">Ver colección</a></div></section>';
      document.title = 'Prenda no encontrada — GENOMA Colombia';
      return;
    }
    product = p;
    render(p);
  });
})(window.GENOMA = window.GENOMA || {});
