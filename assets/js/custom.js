// Optional custom JS for Doks.

// Mobile: ensure menu toggles are focusable and have cursor (helps touch/accessibility)
document.addEventListener('DOMContentLoaded', function () {
  if (!window.matchMedia('(max-width: 991.98px)').matches) return;
  document.querySelectorAll('.navbar button[data-bs-toggle="offcanvas"]').forEach(function (btn) {
    btn.setAttribute('role', 'button');
    btn.style.cursor = 'pointer';
  });
});
