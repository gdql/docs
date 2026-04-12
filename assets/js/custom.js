// Optional custom JS for Doks.
// Bootstrap's Offcanvas is loaded by the theme — no custom handler needed.

// GDQL syntax highlighter — keywords, strings, numbers, operators
(function () {
  var KEYWORDS = [
    'SHOWS','SONGS','PERFORMANCES','SETLIST','SHOW','SONG','PERFORMANCE',
    'FROM','WHERE','AND','OR','NOT','IN','AS','BY','ON','TO','OF','IS','LIKE',
    'WITH','LYRICS','WRITTEN','LENGTH','PLAYED','GUEST','TOUR','VENUE','CITY','STATE',
    'SET1','SET2','SET3','ENCORE','OPENED','CLOSED','OPENER','CLOSER',
    'ORDER','LIMIT','COUNT','FIRST','LAST','RANDOM','BEFORE','AFTER','BETWEEN',
    'INTO','THEN','TEASE','FOR','AT','DESC','ASC','TABLE','JSON','CSV','TSV','MARKDOWN',
    'TIMES_PLAYED'
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
      // Use \x01PH_n\x01 — non-word chars prevent number/keyword regexes from matching inside
      return '\x01PH_' + (placeholders.length - 1) + '\x01';
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

    // Operators: !>> !> ->> -> >> ~> > >= <= != (no standalone = to avoid matching inside HTML attrs)
    code = code.replace(/(!\&gt;\&gt;|!\&gt;|-\&gt;|\&gt;\&gt;|~\&gt;|\&gt;=|\&lt;=|!=|\&gt;|\&lt;)/g, '<span class="gd-op">$1</span>');

    // Restore placeholders
    code = code.replace(/\x01PH_(\d+)\x01/g, function (_, i) { return placeholders[+i]; });
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
    // Skip blocks that aren't runnable queries: synopsis placeholders,
    // pseudo-code fragments, or anything that doesn't start with a keyword.
    var validStarts = /^(SHOWS|SONGS|PERFORMANCES|SETLIST|COUNT|FIRST|LAST|RANDOM)\b/i;
    blocks.forEach(function (el) {
      var t = el.textContent.trim();
      if (!t) return;
      // Skip synopsis/placeholder blocks
      if (/[\[\]]/.test(t)) return;
      // Skip pseudo-code (condition1, sort_spec, date_range, etc.)
      if (/\b(condition|sort_spec|date_range|date_or|length_condition|date_spec|venue_or)\b/i.test(t)) return;
      // Every line must start with a valid keyword or be a comment/blank
      var lines = t.split('\n').map(function (l) { return l.trim(); }).filter(function (l) { return l && !l.startsWith('--'); });
      var allValid = lines.every(function (l) { return validStarts.test(l); });
      if (!allValid) return;
      scripts.push(t.endsWith(';') ? t : t + ';');
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
