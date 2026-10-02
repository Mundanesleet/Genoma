/* =========================================================================
   GENOMA — UI compartida: helpers de render, header, menú, búsqueda,
   mini-cart, favoritos y toasts.
   ========================================================================= */
(function (G) {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function money(n) { return '$' + Math.round(n).toLocaleString('es-CO').replace(/,/g, '.') + ' COP'; }
  function icon(name, cls) { return '<svg class="icon ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
  function productUrl(id) { return 'producto.html?id=' + encodeURIComponent(id); }

  function imgPath(p, img, w, ext) { return 'assets/images/products/' + p.id + '/' + img.key + '-' + w + '.' + ext; }

  /**
   * <picture> responsivo (AVIF → WebP → JPEG). Nunca pide un ancho mayor al original.
   * opts: { sizes, alt, eager, priority, className, imgClass, position }
   */
  function picture(p, index, opts) {
    opts = opts || {};
    var img = p.images[index] || p.images[0];
    var set = function (ext) { return img.widths.map(function (w) { return imgPath(p, img, w, ext) + ' ' + w + 'w'; }).join(', '); };
    var sizes = opts.sizes || '100vw';
    var attrs = 'src="' + imgPath(p, img, img.fallback, 'jpg') + '" width="' + img.w + '" height="' + img.h + '" alt="' + esc(opts.alt == null ? altFor(p, index) : opts.alt) + '"' +
      (opts.eager ? '' : ' loading="lazy"') + ' decoding="async"' + (opts.priority ? ' fetchpriority="high"' : '') +
      (opts.imgClass ? ' class="' + opts.imgClass + '"' : '') + (opts.position ? ' style="object-position:' + opts.position + '"' : '');
    return '<picture' + (opts.className ? ' class="' + opts.className + '"' : '') + '>' +
      '<source type="image/avif" srcset="' + set('avif') + '" sizes="' + sizes + '">' +
      '<source type="image/webp" srcset="' + set('webp') + '" sizes="' + sizes + '">' +
      '<img ' + attrs + '></picture>';
  }

  function altFor(p, index) {
    var color = null;
    p.colors.forEach(function (c) { if (c.image === index) color = c.name; });
    var who = p.line === 'hombre' ? 'Hombre' : 'Mujer';
    if (color) return who + ' con ' + p.name + ' de GENOMA en color ' + color.toLowerCase();
    return index === p.mainImage ? who + ' con ' + p.name + ' de GENOMA' : 'Detalle de ' + p.name + ' de GENOMA';
  }

  function stars(value, size) {
    var pct = Math.max(0, Math.min(100, (value / 5) * 100));
    var row = new Array(6).join(icon('star'));
    return '<span class="stars" style="--star:' + (size || 16) + 'px" role="img" aria-label="' + String(value).replace('.', ',') + ' de 5 estrellas">' +
      '<span class="stars__row stars__base">' + row + '</span>' +
      '<span class="stars__row stars__fill" style="width:' + pct.toFixed(1) + '%">' + row + '</span></span>';
  }

  function ratingLabel(avg) { return (Math.round(avg * 10) / 10).toFixed(1); }

  function stockFor(p, colorName) { return p.stock[colorName || (p.colors[0] ? p.colors[0].name : '_')] || p.stock._ || {}; }
  function firstAvailable(p) {
    var colors = p.colors.length ? p.colors.map(function (c) { return c.name; }) : ['_'];
    for (var i = 0; i < colors.length; i++) {
      var st = p.stock[colors[i]] || {};
      for (var j = 0; j < p.sizes.length; j++) if (st[p.sizes[j]]) return { color: colors[i] === '_' ? null : colors[i], size: p.sizes[j] };
    }
    return null;
  }

  /* ---------- Tarjeta de producto (catálogo) ---------- */
  function productCard(p, opts) {
    opts = opts || {};
    var color = p.colors[0] ? p.colors[0].name : null;
    var st = stockFor(p, color);
    var sizes = p.sizes.map(function (s) {
      var ok = !!st[s];
      return '<button class="size-mini" type="button" data-quick-add="' + p.id + '" data-size="' + s + '"' + (color ? ' data-color="' + esc(color) + '"' : '') +
        (ok ? ' aria-label="Agregar talla ' + s + ' a la bolsa"' : ' disabled aria-label="Talla ' + s + ' agotada"') + '>' + s + '</button>';
    }).join('');
    var fav = G.Favorites.has(p.id);
    return '<article class="p-card" data-id="' + p.id + '">' +
      '<div class="p-card__media" data-alt-image="' + (p.detailImages[0] != null ? p.detailImages[0] : '') + '">' +
        picture(p, p.mainImage, { sizes: opts.sizes || '(min-width: 1280px) 300px, (min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw', eager: opts.eager }) +
        (p.badge ? '<span class="tag tag--light">' + esc(p.badge) + '</span>' : '') +
        '<div class="p-card__quick"><span class="p-card__quick-label">Tallas disponibles' + (color ? ' · ' + esc(color) : '') + '</span><div class="p-card__sizes">' + sizes + '</div></div>' +
      '</div>' +
      '<div class="p-card__body"><div>' +
        '<span class="p-card__cat">' + esc(p.collection) + '</span>' +
        '<h3 class="p-card__name"><a href="' + productUrl(p.id) + '">' + esc(p.name) + '</a></h3>' +
        '<p class="p-card__desc">' + esc(p.summary) + '</p></div>' +
        '<div class="p-card__foot"><span class="numeric price">' + money(p.price) + '</span>' +
        '<button class="fav-btn' + (fav ? ' is-active' : '') + '" type="button" data-fav="' + p.id + '" aria-pressed="' + fav + '" aria-label="' + (fav ? 'Quitar de' : 'Agregar a') + ' favoritos: ' + esc(p.name) + '">' + icon(fav ? 'heart-fill' : 'heart') + '</button></div>' +
      '</div></article>';
  }

  /* Tarjeta de "Completa el look" (PDP) */
  function matchCard(p, opts) {
    opts = opts || {};
    return '<article class="m-card" data-id="' + p.id + '">' +
      '<div class="m-card__media">' + picture(p, p.mainImage, { sizes: opts.sizes || '(min-width: 1024px) 23vw, (min-width: 768px) 45vw, 72vw', position: '50% 15%' }) +
      (p.badge ? '<span class="tag tag--light">' + esc(p.badge) + '</span>' : '') + '</div>' +
      '<div class="m-card__body"><div><span class="p-card__cat">' + esc(p.collection) + '</span>' +
      '<h3 class="m-card__name"><a href="' + productUrl(p.id) + '">' + esc(p.name) + '</a></h3></div>' +
      '<div class="m-card__foot"><span class="numeric price">' + money(p.price) + '</span><span class="m-card__link">Ver prenda</span></div></div></article>';
  }

  /* ---------- Toast ---------- */
  var toastEl, toastTimer;
  function toast(message, action) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = icon('check-circle') + '<span>' + esc(message) + '</span>' +
      (action ? '<button type="button" class="toast__action">' + esc(action.label) + '</button>' : '<span class="toast__brand">GENOMA</span>');
    if (action) $('.toast__action', toastEl).addEventListener('click', function () { hideToast(); action.onClick(); });
    requestAnimationFrame(function () { toastEl.classList.add('is-visible'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 3800);
  }
  function hideToast() { if (toastEl) toastEl.classList.remove('is-visible'); }

  /* ---------- Paneles (drawer / overlay) con manejo de foco ---------- */
  var overlay, openPanel = null, lastFocus = null;
  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.addEventListener('click', closePanel);
    document.body.appendChild(overlay);
    return overlay;
  }
  function openPanelEl(panel, trigger) {
    if (openPanel && openPanel !== panel) closePanel(true);
    lastFocus = trigger || document.activeElement;
    ensureOverlay().classList.add('is-open');
    panel.classList.add('is-open');
    panel.removeAttribute('aria-hidden');
    document.body.classList.add('is-locked');
    openPanel = panel;
    $$('[aria-controls="' + panel.id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    setTimeout(function () { var f = panel.querySelector('[data-autofocus]') || panel.querySelector('button, a, input'); if (f) f.focus({ preventScroll: true }); }, 60);
  }
  function closePanel(silent) {
    if (!openPanel) return;
    openPanel.classList.remove('is-open');
    openPanel.setAttribute('aria-hidden', 'true');
    $$('[aria-controls="' + openPanel.id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    openPanel = null;
    if (overlay) overlay.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    if (silent !== true && lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePanel();
    if (e.key === 'Tab' && openPanel) {
      var f = $$('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])', openPanel).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  function drawer(id, side, title, extraClass) {
    var el = document.createElement('aside');
    el.className = 'drawer drawer--' + side + (extraClass ? ' ' + extraClass : '');
    el.id = id;
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('aria-label', title);
    el.innerHTML = '<div class="drawer__head"><h2 class="drawer__title">' + esc(title) + '</h2>' +
      '<button class="icon-btn" type="button" data-close aria-label="Cerrar">' + icon('close') + '</button></div><div class="drawer__body"></div>';
    $('[data-close]', el).addEventListener('click', function () { closePanel(); });
    document.body.appendChild(el);
    return el;
  }

  /* ---------- Menú móvil ---------- */
  function buildMenu() {
    var el = drawer('mobile-menu', 'left', 'Menú');
    var links = $$('.main-nav a').map(function (a) {
      return '<a href="' + a.getAttribute('href') + '"' + (a.dataset.lineLink ? ' data-line-link="' + a.dataset.lineLink + '"' : '') + '>' + esc(a.textContent) + icon('arrow-right') + '</a>';
    }).join('');
    $('.drawer__body', el).innerHTML = '<nav class="mobile-nav" aria-label="Menú móvil">' + links + '</nav>' +
      '<div class="mobile-nav__meta"><a href="' + G.STORE.instagram + '" target="_blank" rel="noopener">' + icon('instagram') + ' ' + G.STORE.instagramHandle + '</a>' +
      '<a href="#" data-whatsapp="Hola GENOMA, quiero asesoría.">' + icon('chat') + ' Asesoría por WhatsApp</a>' +
      '<span>' + icon('moped', 'icon--sm') + ' Contra entrega en Bogotá · Envíos a toda Colombia</span></div>';
    el.addEventListener('click', function (e) { if (e.target.closest('a')) closePanel(true); });
    $$('[data-menu-open]').forEach(function (b) { b.addEventListener('click', function () { openPanelEl(el, b); }); });
  }

  /* ---------- Búsqueda ---------- */
  function buildSearch() {
    var el = document.createElement('div');
    el.className = 'search-panel';
    el.id = 'search-panel';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Buscar productos');
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<form class="search-panel__bar" role="search">' + icon('search', 'icon--lg') +
      '<label class="sr-only" for="search-input">Buscar</label><input id="search-input" type="search" placeholder="Buscar parkas, biker, blazer…" autocomplete="off" data-autofocus>' +
      '<button class="icon-btn" type="button" data-close aria-label="Cerrar búsqueda">' + icon('close') + '</button></form>' +
      '<div class="search-panel__results" aria-live="polite"></div>';
    document.body.appendChild(el);
    var input = $('input', el), out = $('.search-panel__results', el);
    var suggestions = ['Parka', 'Biker', 'Blazer', 'Bomber', 'Impermeable', 'Hombre', 'Match'];
    function idle() {
      out.innerHTML = '<p class="search-panel__hint">Sugerencias</p><div class="search-panel__suggest">' +
        suggestions.map(function (s) { return '<button type="button" class="chip" data-suggest="' + s + '">' + s + '</button>'; }).join('') + '</div>';
    }
    function run() {
      var q = input.value;
      if (!q.trim()) return idle();
      G.ProductService.search(q).then(function (list) {
        out.innerHTML = list.length
          ? '<p class="search-panel__hint">' + list.length + (list.length === 1 ? ' resultado' : ' resultados') + ' para “' + esc(q) + '”</p><div class="search-results">' +
            list.map(function (p) {
              return '<a class="search-hit" href="' + productUrl(p.id) + '"><span class="search-hit__img">' + picture(p, p.mainImage, { sizes: '200px' }) + '</span>' +
                '<span class="p-card__cat">' + esc(p.collection) + '</span><span class="search-hit__name">' + esc(p.name) + '</span><span class="numeric price">' + money(p.price) + '</span></a>';
            }).join('') + '</div>'
          : '<p class="search-panel__hint">No encontramos prendas para “' + esc(q) + '”. Prueba con otra palabra.</p>';
      });
    }
    var t;
    input.addEventListener('input', function () { clearTimeout(t); t = setTimeout(run, 120); });
    $('form', el).addEventListener('submit', function (e) { e.preventDefault(); run(); });
    out.addEventListener('click', function (e) { var s = e.target.closest('[data-suggest]'); if (s) { input.value = s.dataset.suggest; run(); input.focus(); } });
    $('[data-close]', el).addEventListener('click', function () { closePanel(); });
    idle();
    $$('[data-search-open]').forEach(function (b) { b.setAttribute('aria-controls', 'search-panel'); b.addEventListener('click', function () { openPanelEl(el, b); }); });
  }

  /* ---------- Mini-cart ---------- */
  var cartEl;
  function buildCart() {
    cartEl = drawer('cart-drawer', 'right', 'Tu bolsa');
    var foot = document.createElement('div');
    foot.className = 'drawer__foot';
    cartEl.appendChild(foot);
    cartEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cart-action]');
      if (!b) return;
      var key = b.dataset.key, item = G.Cart.getItems().filter(function (i) { return i.key === key; })[0];
      if (b.dataset.cartAction === 'remove') G.Cart.remove(key);
      if (item && b.dataset.cartAction === 'inc') G.Cart.update(key, item.qty + 1);
      if (item && b.dataset.cartAction === 'dec') G.Cart.update(key, item.qty - 1);
      if (b.dataset.cartAction === 'checkout') toast('Demo: el pago real se habilitará con la tienda en línea.');
    });
    $$('[data-cart-open]').forEach(function (b) { b.setAttribute('aria-controls', 'cart-drawer'); b.addEventListener('click', function () { openCart(b); }); });
    document.addEventListener('cart:change', function () { renderCart(); updateCounts(); });
    renderCart();
  }
  function openCart(trigger) { renderCart(); openPanelEl(cartEl, trigger); }

  function renderCart() {
    if (!cartEl) return;
    var items = G.Cart.getItems();
    var body = $('.drawer__body', cartEl), foot = $('.drawer__foot', cartEl);
    if (!items.length) {
      body.innerHTML = '<div class="cart-empty">' + icon('bag', 'icon--lg') + '<p>Tu bolsa está vacía.</p><a class="btn btn--dark btn--sm" href="index.html#catalogo">Ver colección</a></div>';
      foot.innerHTML = '';
      return;
    }
    G.ProductService.getByIds(items.map(function (i) { return i.id; })).then(function (products) {
      var map = {}; products.forEach(function (p) { map[p.id] = p; });
      var total = 0;
      body.innerHTML = items.map(function (it) {
        var p = map[it.id]; if (!p) return '';
        total += p.price * it.qty;
        var color = p.colors.filter(function (c) { return c.name === it.color; })[0];
        var idx = color && color.image != null ? color.image : p.mainImage;
        return '<div class="cart-line"><a class="cart-line__img" href="' + productUrl(p.id) + '">' + picture(p, idx, { sizes: '76px', alt: p.name }) + '</a><div>' +
          '<a class="cart-line__name" href="' + productUrl(p.id) + '">' + esc(p.name) + '</a>' +
          '<p class="cart-line__meta">' + [it.color, it.size ? 'Talla ' + it.size : null].filter(Boolean).map(esc).join(' · ') + '</p>' +
          '<p class="numeric price">' + money(p.price) + '</p>' +
          '<div class="cart-line__row"><div class="stepper"><button type="button" data-cart-action="dec" data-key="' + esc(it.key) + '" aria-label="Disminuir cantidad"' + (it.qty <= 1 ? ' disabled' : '') + '>' + icon('minus', 'icon--sm') + '</button>' +
          '<output aria-live="polite">' + it.qty + '</output><button type="button" data-cart-action="inc" data-key="' + esc(it.key) + '" aria-label="Aumentar cantidad"' + (it.qty >= G.Cart.MAX_QTY ? ' disabled' : '') + '>' + icon('plus', 'icon--sm') + '</button></div>' +
          '<button class="cart-line__remove" type="button" data-cart-action="remove" data-key="' + esc(it.key) + '">Eliminar</button></div></div></div>';
      }).join('');
      foot.innerHTML = '<div class="cart-total"><span class="label">Subtotal</span><strong>' + money(total) + '</strong></div>' +
        '<button class="btn btn--dark btn--block" type="button" data-cart-action="checkout">Finalizar compra</button>' +
        '<p class="demo-hint">Demo: el carrito se guarda solo en este navegador. No se procesan pagos ni pedidos.</p>';
    });
  }

  /* ---------- Favoritos ---------- */
  var favEl;
  function buildFavorites() {
    favEl = drawer('favorites-drawer', 'right', 'Favoritos');
    $$('[data-favorites-open]').forEach(function (b) { b.setAttribute('aria-controls', 'favorites-drawer'); b.addEventListener('click', function () { renderFavorites(); openPanelEl(favEl, b); }); });
    document.addEventListener('favorites:change', function (e) { updateCounts(); syncFavButtons(e.detail && e.detail.id); if (favEl.classList.contains('is-open')) renderFavorites(); });
  }
  function renderFavorites() {
    var ids = G.Favorites.all(), body = $('.drawer__body', favEl);
    if (!ids.length) { body.innerHTML = '<div class="cart-empty">' + icon('heart', 'icon--lg') + '<p>Aún no tienes prendas favoritas.</p></div>'; return; }
    G.ProductService.getByIds(ids).then(function (list) {
      body.innerHTML = list.map(function (p) {
        return '<div class="cart-line"><a class="cart-line__img" href="' + productUrl(p.id) + '">' + picture(p, p.mainImage, { sizes: '76px', alt: p.name }) + '</a><div>' +
          '<a class="cart-line__name" href="' + productUrl(p.id) + '">' + esc(p.name) + '</a><p class="cart-line__meta">' + esc(p.collection) + '</p><p class="numeric price">' + money(p.price) + '</p>' +
          '<div class="cart-line__row"><a class="cart-line__remove" href="' + productUrl(p.id) + '">Ver prenda</a><button class="cart-line__remove" type="button" data-fav="' + p.id + '">Quitar</button></div></div></div>';
      }).join('');
    });
  }
  function syncFavButtons(id) {
    $$('[data-fav]' + (id ? '[data-fav="' + id + '"]' : '')).forEach(function (b) {
      if (b.classList.contains('cart-line__remove')) return;
      var on = G.Favorites.has(b.dataset.fav);
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on);
      var use = b.querySelector('use'); if (use) use.setAttribute('href', on ? '#i-heart-fill' : '#i-heart');
    });
  }

  function updateCounts() {
    var n = G.Cart.count(), f = G.Favorites.all().length;
    $$('[data-cart-count]').forEach(function (el) { el.textContent = n; });
    $$('[data-cart-badge]').forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
    $$('[data-fav-count]').forEach(function (el) { el.textContent = f; el.hidden = f === 0; });
  }

  /* ---------- Acciones globales delegadas ---------- */
  function bindGlobal() {
    document.addEventListener('click', function (e) {
      var fav = e.target.closest('[data-fav]');
      if (fav) {
        e.preventDefault();
        var on = G.Favorites.toggle(fav.dataset.fav);
        G.ProductService.getById(fav.dataset.fav).then(function (p) { if (p) toast(on ? p.name + ' agregada a favoritos' : p.name + ' quitada de favoritos'); });
        return;
      }
      var qa = e.target.closest('[data-quick-add]');
      if (qa) {
        e.preventDefault();
        addToBag(qa.dataset.quickAdd, qa.dataset.color || null, qa.dataset.size, 1);
      }
    });
    // Imagen alternativa al pasar el cursor (solo dispositivos con hover; se carga bajo demanda).
    if (window.matchMedia('(hover: hover)').matches) {
      document.addEventListener('mouseover', function (e) {
        var media = e.target.closest && e.target.closest('.p-card__media[data-alt-image]');
        if (!media || media.dataset.altLoaded || media.dataset.altImage === '') return;
        media.dataset.altLoaded = '1';
        var id = media.closest('.p-card').dataset.id;
        G.ProductService.getById(id).then(function (p) {
          var wrap = document.createElement('div');
          wrap.innerHTML = picture(p, +media.dataset.altImage, { sizes: '(min-width: 1280px) 300px, 24vw', imgClass: 'p-card__alt', eager: true });
          media.insertBefore(wrap.firstChild, media.children[1]);
        });
      });
    }
    $$('[data-whatsapp]').forEach(setWhatsapp);
    var nl = $('[data-newsletter]');
    if (nl) nl.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('input', nl);
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
      input.classList.toggle('is-invalid', !ok);
      input.setAttribute('aria-invalid', String(!ok));
      if (!ok) { toast('Escribe un correo electrónico válido.'); input.focus(); return; }
      nl.reset();
      toast('¡Gracias! Te avisaremos de los nuevos lanzamientos (demo).');
    });
  }
  function setWhatsapp(a) {
    a.href = 'https://wa.me/' + G.STORE.whatsapp + '?text=' + encodeURIComponent(a.dataset.whatsapp || 'Hola GENOMA');
    a.target = '_blank';
    a.rel = 'noopener';
  }

  function addToBag(id, color, size, qty, opts) {
    return G.ProductService.getById(id).then(function (p) {
      if (!p) return;
      var st = stockFor(p, color);
      if (size && !st[size]) { toast('Esa talla está agotada en ' + (color || 'este producto') + '.'); return; }
      return G.Cart.add(id, color, size, qty).then(function () {
        var detail = [color, size ? 'Talla ' + size : null].filter(Boolean).join(' · ');
        if (opts && opts.openCart) { openCart(); return; }
        toast(p.name + (detail ? ' (' + detail + ')' : '') + ' agregada a la bolsa', { label: 'Ver bolsa', onClick: function () { openCart(); } });
        $$('[data-cart-open]').forEach(function (b) { b.classList.remove('is-bump'); void b.offsetWidth; b.classList.add('is-bump'); });
      });
    });
  }

  /* ---------- Header: overlay → sólido al pasar el hero ---------- */
  function bindHeader() {
    var header = $('[data-header]');
    if (!header) return;
    var hero = $('.hero');
    var overlayMode = header.classList.contains('is-overlay') && hero;
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY;
      if (overlayMode) header.classList.toggle('is-overlay', y < hero.offsetHeight - header.offsetHeight - 10);
      header.classList.toggle('is-compact', y > 140);
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();

    // Enlace activo según la sección visible (solo home).
    if (overlayMode && 'IntersectionObserver' in window) {
      var map = {};
      $$('.main-nav a').forEach(function (a) { var h = a.getAttribute('href').split('#')[1]; if (h && !a.dataset.lineLink) map[h] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (map[en.target.id]) map[en.target.id].classList.toggle('is-current', en.isIntersecting); });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
    }
  }

  function init() {
    if (!G.ProductService) return;
    buildMenu();
    buildSearch();
    buildCart();
    buildFavorites();
    bindGlobal();
    bindHeader();
    updateCounts();
    document.dispatchEvent(new CustomEvent('genoma:ready'));
  }

  G.ui = {
    $: $, $$: $$, esc: esc, money: money, icon: icon, picture: picture, stars: stars, ratingLabel: ratingLabel,
    productUrl: productUrl, productCard: productCard, matchCard: matchCard, toast: toast,
    addToBag: addToBag, openCart: openCart, stockFor: stockFor, firstAvailable: firstAvailable, setWhatsapp: setWhatsapp, altFor: altFor
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(window.GENOMA = window.GENOMA || {});
