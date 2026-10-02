/* =========================================================================
   GENOMA — Animaciones: scroll reveal, stagger en grids y parallax sutil.
   Todo se desactiva con prefers-reduced-motion.
   ========================================================================= */
(function (G) {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = null;

  function setup() {
    if (!('IntersectionObserver' in window) || reduce) return null;
    return new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }

  /** Registra los elementos .reveal / .stagger dentro de root (también contenido renderizado después). */
  function refresh(root) {
    var scope = root || document;
    var els = Array.prototype.slice.call(scope.querySelectorAll('.reveal:not(.is-visible), .stagger:not(.is-visible), .img-reveal:not(.is-visible)'));
    if (scope !== document && scope.matches && scope.matches('.reveal, .stagger')) els.push(scope);
    els.forEach(function (el) {
      if (el.classList.contains('stagger')) {
        Array.prototype.forEach.call(el.children, function (c, i) { c.style.setProperty('--i', Math.min(i, 8)); });
      }
      if (!io) el.classList.add('is-visible'); else io.observe(el);
    });
  }

  /* Parallax: el hero se desplaza más lento que el scroll; las imágenes marcadas se mueven dentro de su marco. */
  function parallax() {
    if (reduce) return;
    var hero = document.querySelector('[data-parallax]');
    var imgs = Array.prototype.slice.call(document.querySelectorAll('[data-parallax-img]'));
    if (!hero && !imgs.length) return;
    var factor = hero ? parseFloat(hero.dataset.parallax) || 0.1 : 0;
    var vh = window.innerHeight, ticking = false;
    function frame() {
      ticking = false;
      var y = window.scrollY;
      if (hero && y < vh * 1.2) hero.style.transform = 'translate3d(0,' + (y * factor).toFixed(1) + 'px,0)';
      imgs.forEach(function (img) {
        var r = img.parentNode.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var progress = (r.top + r.height / 2 - vh / 2) / vh; // -1 … 1
        img.style.transform = 'translate3d(0,' + (-6 - progress * 6).toFixed(2) + '%,0)';
      });
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { vh = window.innerHeight; onScroll(); }, { passive: true });
    frame();
  }

  function init() {
    document.documentElement.classList.add('js');
    io = setup();
    refresh(document);
    parallax();
  }

  G.anim = { refresh: refresh, reduceMotion: reduce };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(window.GENOMA = window.GENOMA || {});
