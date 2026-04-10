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

// GDQL syntax highlighter — keywords, strings, numbers, operators
(function () {
  var KEYWORDS = [
    'SHOWS','SONGS','PERFORMANCES','SETLIST','SHOW','SONG','PERFORMANCE',
    'FROM','WHERE','AND','OR','NOT','IN','AS','BY','ON','TO','OF','IS','LIKE',
    'WITH','LYRICS','WRITTEN','LENGTH','PLAYED','GUEST','TOUR','VENUE','CITY','STATE',
    'SET1','SET2','SET3','ENCORE','OPENED','CLOSED','OPENER','CLOSER',
    'ORDER','LIMIT','COUNT','FIRST','LAST','RANDOM','BEFORE','AFTER','BETWEEN',
    'INTO','THEN','TEASE','FOR','AT','DESC','ASC','TABLE','JSON','CSV','MARKDOWN'
  ];
  // Sort longest-first so SHOWS doesn't shadow SHOW
  KEYWORDS.sort(function (a, b) { return b.length - a.length; });
  var KW_RE = new RegExp('\\b(' + KEYWORDS.join('|') + ')\\b', 'g');

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function highlight(code) {
    // Tokenize: protect strings and comments first by replacing with placeholders
    var placeholders = [];
    function stash(html) {
      placeholders.push(html);
      return '\x00' + (placeholders.length - 1) + '\x00';
    }

    // Strings (double quoted)
    code = code.replace(/"([^"\\]|\\.)*"/g, function (m) {
      return stash('<span class="gd-str">' + escapeHtml(m) + '</span>');
    });
    // Line comments -- ...
    code = code.replace(/--[^\n]*/g, function (m) {
      return stash('<span class="gd-cmt">' + escapeHtml(m) + '</span>');
    });

    // Now escape the rest
    code = escapeHtml(code);

    // Numbers (years, integers, time spans like 20min)
    code = code.replace(/\b\d+(?:min|s|h)?\b/g, '<span class="gd-num">$&</span>');

    // Keywords
    code = code.replace(KW_RE, '<span class="gd-kw">$1</span>');

    // Operators: >> ~> > >= <= != (no standalone = to avoid matching inside HTML attrs)
    code = code.replace(/(&gt;&gt;|~&gt;|&gt;=|&lt;=|!=|&gt;|&lt;)/g, '<span class="gd-op">$1</span>');

    // Restore placeholders
    code = code.replace(/\x00(\d+)\x00/g, function (_, i) { return placeholders[+i]; });
    return code;
  }

  function applyHighlight() {
    var blocks = document.querySelectorAll('code.language-gdql');
    blocks.forEach(function (el) {
      if (el.dataset.gdqlHl === '1') return;
      el.dataset.gdqlHl = '1';
      el.innerHTML = highlight(el.textContent);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyHighlight);
  } else {
    applyHighlight();
  }
})();

// Run-all-examples pill: collects every gdql code block on the page and links
// to the sandbox preloaded with the joined script.
(function () {
  function b64url(s) {
    return btoa(unescape(encodeURIComponent(s)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function init() {
    var blocks = document.querySelectorAll('code.language-gdql');
    if (blocks.length < 2) return;
    var content = document.querySelector('.docs-content, main article, main');
    if (!content) return;
    // Avoid duplicates
    if (content.querySelector('.gdql-runall-bar')) return;

    var scripts = [];
    blocks.forEach(function (el) {
      var t = el.textContent.trim();
      if (t) scripts.push(t.endsWith(';') ? t : t + ';');
    });
    if (!scripts.length) return;

    var joined = scripts.join('\n');
    var url = 'https://sandbox.gdql.dev?q=' + b64url(joined) + '&run=1';

    var bar = document.createElement('div');
    bar.className = 'gdql-runall-bar';
    bar.innerHTML =
      '<a class="gdql-runall" href="' + url + '" target="_blank" rel="noopener noreferrer">' +
      '\u26A1 Run all examples on this page \u2192</a>' +
      '<span class="gdql-runall-count">' + scripts.length + ' queries</span>';

    // Insert just after the first <h1> if present, else at top
    var h1 = content.querySelector('h1');
    if (h1 && h1.parentNode) {
      h1.parentNode.insertBefore(bar, h1.nextSibling);
    } else {
      content.insertBefore(bar, content.firstChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
