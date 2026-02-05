// Optional custom JS for Doks.

// Mobile: open offcanvas without relying on window.bootstrap (theme loads Bootstrap as ES module, not on window)
(function () {
  var BACKDROP_CLASS = 'offcanvas-backdrop';
  var bodyOpenClass = 'modal-open';

  function closeOpenOffcanvas() {
    var openEl = document.querySelector('.offcanvas.show');
    if (!openEl) return;
    openEl.classList.remove('show');
    openEl.removeAttribute('aria-modal');
    openEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove(bodyOpenClass);
    var existing = document.querySelector('.' + BACKDROP_CLASS);
    if (existing) existing.remove();
  }

  function openOffcanvas(offcanvasEl) {
    if (!offcanvasEl || offcanvasEl.classList.contains('show')) return;
    offcanvasEl.classList.add('show');
    offcanvasEl.setAttribute('aria-modal', 'true');
    offcanvasEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add(bodyOpenClass);
    var backdrop = document.createElement('div');
    backdrop.className = BACKDROP_CLASS + ' fade show';
    backdrop.setAttribute('data-bs-dismiss', 'offcanvas');
    backdrop.setAttribute('aria-hidden', 'true');
    backdrop.setAttribute('tabindex', '-1');
    document.body.appendChild(backdrop);
    var focusable = offcanvasEl.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();

    backdrop.addEventListener('click', closeOpenOffcanvas);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeOpenOffcanvas();
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest || !document.querySelector('.offcanvas.show')) return;
    if (e.target.closest('[data-bs-dismiss="offcanvas"]')) closeOpenOffcanvas();
  });

  function initMobileOffcanvas() {
    if (!window.matchMedia('(max-width: 991.98px)').matches) return;
    var toggles = document.querySelectorAll('.navbar button[data-bs-toggle="offcanvas"]');
    if (!toggles.length) return;
    if (toggles[0].hasAttribute('data-mobile-offcanvas-bound')) return;

    toggles.forEach(function (btn) {
      btn.setAttribute('role', 'button');
      btn.setAttribute('data-mobile-offcanvas-bound', '1');
      btn.style.cursor = 'pointer';
      var targetId = btn.getAttribute('data-bs-target');
      if (!targetId) return;
      var target = document.querySelector(targetId);
      if (!target) return;

      function open(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        openOffcanvas(target);
      }

      btn.addEventListener('touchend', function (e) {
        e.preventDefault();
        open(e);
      }, { passive: false });

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        open(e);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileOffcanvas);
  } else {
    initMobileOffcanvas();
  }
  window.addEventListener('load', initMobileOffcanvas);
})();
