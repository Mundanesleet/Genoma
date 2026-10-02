/* =========================================================================
   GENOMA — Carrito y favoritos (DEMO con localStorage)
   No hay pagos ni pedidos reales. La interfaz (add/update/remove/getItems)
   está pensada para reemplazarse luego por un endpoint de carrito.
   ========================================================================= */
(function (G) {
  'use strict';

  var CART_KEY = 'genoma.cart.v1';
  var FAV_KEY = 'genoma.favorites.v1';
  var MAX_QTY = 10;

  function read(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* modo privado: la demo sigue en memoria */ }
  }
  function emit(name, detail) { document.dispatchEvent(new CustomEvent(name, { detail: detail })); }

  var items = read(CART_KEY, []);
  if (!Array.isArray(items)) items = [];

  function lineKey(id, color, size) { return [id, color || '', size || ''].join('|'); }
  function save() { write(CART_KEY, items); emit('cart:change', { count: Cart.count() }); }

  var Cart = {
    MAX_QTY: MAX_QTY,
    getItems: function () { return items.slice(); },
    count: function () { return items.reduce(function (n, it) { return n + it.qty; }, 0); },
    add: function (id, color, size, qty) {
      var key = lineKey(id, color, size);
      var found = items.filter(function (it) { return it.key === key; })[0];
      if (found) found.qty = Math.min(MAX_QTY, found.qty + (qty || 1));
      else items.push({ key: key, id: id, color: color || null, size: size || null, qty: Math.min(MAX_QTY, qty || 1) });
      save();
      return Promise.resolve(Cart.getItems());
    },
    update: function (key, qty) {
      items = items.map(function (it) { if (it.key === key) it.qty = Math.max(1, Math.min(MAX_QTY, qty)); return it; });
      save();
      return Promise.resolve(Cart.getItems());
    },
    remove: function (key) {
      items = items.filter(function (it) { return it.key !== key; });
      save();
      return Promise.resolve(Cart.getItems());
    },
    clear: function () { items = []; save(); }
  };

  var favs = read(FAV_KEY, []);
  if (!Array.isArray(favs)) favs = [];

  var Favorites = {
    all: function () { return favs.slice(); },
    has: function (id) { return favs.indexOf(id) > -1; },
    toggle: function (id) {
      var on = !Favorites.has(id);
      favs = on ? favs.concat(id) : favs.filter(function (x) { return x !== id; });
      write(FAV_KEY, favs);
      emit('favorites:change', { id: id, active: on, count: favs.length });
      return on;
    }
  };

  // Sincroniza entre pestañas abiertas.
  window.addEventListener('storage', function (e) {
    if (e.key === CART_KEY) { items = read(CART_KEY, []); emit('cart:change', { count: Cart.count() }); }
    if (e.key === FAV_KEY) { favs = read(FAV_KEY, []); emit('favorites:change', { count: favs.length }); }
  });

  G.Cart = Cart;
  G.Favorites = Favorites;
})(window.GENOMA = window.GENOMA || {});
