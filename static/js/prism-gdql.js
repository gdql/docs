/**
 * Prism.js language definition for GDQL (Grateful Dead Query Language)
 */
(function (Prism) {
  Prism.languages.gdql = {
    comment: {
      pattern: /--.*/,
      greedy: true
    },
    string: {
      pattern: /"(?:[^"\\]|\\.)*"/,
      greedy: true
    },
    keyword: {
      pattern: /\b(?:SHOWS|SONGS|PERFORMANCES|SETLIST|FROM|WHERE|WITH|ORDER|BY|LIMIT|AS|OF|FOR|AND|OR|NOT|PLAYED|GUEST|LENGTH|LYRICS|WRITTEN|OPENED|CLOSED|INTO|THEN|TEASE|SET1|SET2|SET3|ENCORE)\b/i,
      greedy: true
    },
    'operator': {
      pattern: />>|~>|>=|<=|!=|>|<|=/
    },
    number: {
      pattern: /\b\d+(?:min)?\b/
    },
    'class-name': {
      pattern: /\b(?:JSON|CSV|TABLE|SETLIST|CALENDAR|PRIMAL|EUROPE72|BRENT_ERA|VINCE_ERA|WALLOFOUND|HIATUS)\b/i
    }
  };
}(Prism));
