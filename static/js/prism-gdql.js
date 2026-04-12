/**
 * Prism.js language definition for GDQL (Grateful Dead Query Language)
 *
 * Usage:
 *   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism-tomorrow.min.css">
 *   <script src="https://cdn.jsdelivr.net/npm/prismjs@1/prism.min.js"></script>
 *   <script src="https://gdql.dev/js/prism-gdql.js"></script>
 *
 * Then use ```gdql code blocks in markdown, or class="language-gdql" on <pre><code>.
 */
(function (Prism) {
  Prism.languages.gdql = {
    comment: {
      pattern: /--.*/,
      greedy: true
    },
    string: {
      pattern: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/,
      greedy: true
    },
    keyword: {
      pattern: /\b(?:SHOWS?|SONGS|PERFORMANCES|SETLIST|COUNT|FIRST|LAST|RANDOM|FROM|WHERE|WITH|AT|TOUR|BEFORE|AFTER|ORDER|BY|LIMIT|AS|OF|FOR|AND|OR|NOT|PLAYED|GUEST|LENGTH|LYRICS|WRITTEN|OPENED|CLOSED|OPENER|CLOSER|INTO|THEN|TEASE|SET1|SET2|SET3|ENCORE)\b/i,
      greedy: true
    },
    'operator': {
      pattern: />>|~>|>=|<=|!=|>|<|=/
    },
    number: {
      pattern: /\b\d+(?:\/\d+\/\d+)?(?:min|sec|minutes?|seconds?)?\b/
    },
    'class-name': {
      pattern: /\b(?:JSON|CSV|TSV|TABLE|SETLIST|CALENDAR|PRIMAL|EUROPE72|BRENT_ERA|VINCE_ERA|WALLOFSOUND|HIATUS)\b/i
    },
    punctuation: {
      pattern: /[(),;]/
    }
  };
}(Prism));
