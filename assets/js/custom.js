// Optional custom JS for Doks.

// Mobile: ensure menu/sidebar toggles work on touch (some browsers swallow first tap)
document.addEventListener('DOMContentLoaded', function () {
  if (!window.matchMedia('(max-width: 991.98px)').matches) return;
  document.querySelectorAll('[data-bs-toggle="offcanvas"], .navbar-toggler').forEach(function (el) {
    el.setAttribute('role', 'button');
    el.style.cursor = 'pointer';
  });
});
