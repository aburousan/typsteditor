import { typstCompletions } from './typstCompletions';

let themesDefined = false;
let providersRegistered = false;

// Documentation index (built in setupTypstLanguage from the completion data).
let DOCS: Map<string, { doc: string; detail: string; insert: string; url?: string }> | null = null;
const DOCS_SECTION: Record<string, string> = {
  Layout: 'layout', Model: 'model', Text: 'text', Math: 'math', Visualize: 'visualize',
  Foundations: 'foundations', Introspection: 'introspection', 'Data Loading': 'data-loading',
  Symbols: 'symbols', PDF: 'pdf',
};

// Docs for the language keywords / rules, which aren't in the completion data.
const KEYWORD_DOCS: { key: string; detail: string; insert: string; doc: string; url: string }[] = [
  { key: 'set', detail: 'Keyword', insert: 'set text(size: 12pt)', doc: 'Set rule — changes the default properties of an element for the rest of the current scope. e.g. #set text(fill: blue).', url: 'https://typst.app/docs/reference/styling/#set-rules' },
  { key: 'show', detail: 'Keyword', insert: 'show heading: set text(navy)', doc: 'Show rule — redefines how elements are displayed, either wholesale or with a transformation function.', url: 'https://typst.app/docs/reference/styling/#show-rules' },
  { key: 'let', detail: 'Keyword', insert: 'let name = value', doc: 'Binds a variable, or defines a function with #let f(x) = ....', url: 'https://typst.app/docs/reference/scripting/#bindings' },
  { key: 'import', detail: 'Keyword', insert: 'import "@preview/pkg:1.0.0": *', doc: 'Imports definitions from another file or a package.', url: 'https://typst.app/docs/reference/scripting/#modules' },
  { key: 'include', detail: 'Keyword', insert: 'include "chapter.typ"', doc: 'Includes the evaluated content of another Typst file at this position.', url: 'https://typst.app/docs/reference/scripting/#modules' },
  { key: 'context', detail: 'Keyword', insert: 'context counter(page).get()', doc: 'Enters a context in which location-dependent values (counters, state, measurements) can be read.', url: 'https://typst.app/docs/reference/context/' },
  { key: 'if', detail: 'Keyword', insert: 'if condition [ .. ] else [ .. ]', doc: 'Conditionally includes content or evaluates code depending on a boolean condition.', url: 'https://typst.app/docs/reference/scripting/#conditionals' },
  { key: 'else', detail: 'Keyword', insert: 'else [ .. ]', doc: 'The alternative branch of an if statement.', url: 'https://typst.app/docs/reference/scripting/#conditionals' },
  { key: 'for', detail: 'Keyword', insert: 'for item in collection [ .. ]', doc: 'Loops over the items of a collection (array, dictionary, string, …).', url: 'https://typst.app/docs/reference/scripting/#loops' },
  { key: 'while', detail: 'Keyword', insert: 'while condition [ .. ]', doc: 'Repeats content or code while a condition stays true.', url: 'https://typst.app/docs/reference/scripting/#loops' },
  { key: 'break', detail: 'Keyword', insert: 'break', doc: 'Exits the current loop early.', url: 'https://typst.app/docs/reference/scripting/#loops' },
  { key: 'continue', detail: 'Keyword', insert: 'continue', doc: 'Skips to the next iteration of the current loop.', url: 'https://typst.app/docs/reference/scripting/#loops' },
  { key: 'return', detail: 'Keyword', insert: 'return value', doc: 'Returns a value from a function.', url: 'https://typst.app/docs/reference/scripting/#functions' },
];

export type TypstDoc = { key: string; doc: string; detail: string; usage: string; url: string };

// Look up docs for an identifier (plain "block" or dotted "math.equation"),
// returning its description, category, a clean usage line, and the docs URL.
export function lookupTypstDoc(word: string, full: string): TypstDoc | null {
  if (!DOCS) return null;
  let key = [full, word, `math.${word}`].find(k => DOCS!.has(k));
  if (!key) for (const k of DOCS.keys()) if (k.endsWith('.' + word)) { key = k; break; }
  if (!key) return null;
  const entry = DOCS.get(key)!;
  const base = key.split('.')[0];
  const section = DOCS_SECTION[entry.detail];
  const url = entry.url
    ? entry.url
    : section
      ? `https://typst.app/docs/reference/${section}/${base}/`
      : `https://typst.app/docs/search/?q=${encodeURIComponent(key)}`;
  const usage = entry.insert.replace(/\$\{\d+:?([^}]*)\}/g, '$1').replace(/\$\d+/g, '');
  return { key, doc: entry.doc, detail: entry.detail, usage, url };
}

// Boilerplate for the common element/layout/model functions: completing one
// drops in its key arguments as tab-stops (${1}, ${2}, …) so you're not left
// staring at empty parentheses. Only the functions people actually type by hand
// are listed — everything else keeps its default insert text.
const SNIPPETS: Record<string, string> = {
  // Layout containers
  block: 'block(${1:body})',
  box: 'box(${1:body})',
  figure: 'figure(\n  ${1:body},\n  caption: [${2:caption}],\n)',
  table: 'table(\n  columns: ${1:2},\n  ${2:[a], [b]},\n)',
  grid: 'grid(\n  columns: ${1:2},\n  ${2:[a], [b]},\n)',
  stack: 'stack(\n  dir: ${1:ttb},\n  ${2:[a], [b]},\n)',
  columns: 'columns(${1:2})[${2:body}]',
  pad: 'pad(${1:1em})[${2:body}]',
  align: 'align(${1:center})[${2:body}]',
  place: 'place(${1:top + left})[${2:body}]',
  move: 'move(dx: ${1:0pt}, dy: ${2:0pt})[${3:body}]',
  rotate: 'rotate(${1:45deg})[${2:body}]',
  scale: 'scale(${1:80%})[${2:body}]',
  rect: 'rect(width: ${1:2cm}, height: ${2:1cm})[${3:body}]',
  square: 'square(size: ${1:2cm})[${2:body}]',
  circle: 'circle(radius: ${1:1cm})[${2:body}]',
  ellipse: 'ellipse(width: ${1:3cm}, height: ${2:2cm})[${3:body}]',
  line: 'line(start: (${1:0pt}, ${2:0pt}), end: (${3:2cm}, ${4:0pt}))',
  polygon: 'polygon((${1:0pt}, ${2:0pt}), (${3:2cm}, ${4:0pt}), (${5:1cm}, ${6:2cm}))',
  // Media & text
  image: 'image("${1:path.png}", width: ${2:80%})',
  text: 'text(${1:size: 12pt})[${2:body}]',
  raw: 'raw("${1:code}", lang: "${2:python}")',
  underline: 'underline[${1:text}]',
  overline: 'overline[${1:text}]',
  strike: 'strike[${1:text}]',
  highlight: 'highlight[${1:text}]',
  strong: 'strong[${1:text}]',
  emph: 'emph[${1:text}]',
  super: 'super[${1:text}]',
  sub: 'sub[${1:text}]',
  // Model / structure
  heading: 'heading(level: ${1:1})[${2:title}]',
  link: 'link("${1:https://}")[${2:text}]',
  ref: 'ref(<${1:label}>)',
  cite: 'cite(<${1:key}>)',
  footnote: 'footnote[${1:note}]',
  quote: 'quote(attribution: [${1:author}])[${2:text}]',
  list: 'list(\n  [${1:first}],\n  [${2:second}],\n)',
  enum: 'enum(\n  [${1:first}],\n  [${2:second}],\n)',
  terms: 'terms(\n  ([${1:term}], [${2:description}]),\n)',
  bibliography: 'bibliography("${1:refs.bib}")',
  // Spacing / breaks
  v: 'v(${1:1em})',
  h: 'h(${1:1em})',
  page: 'page(paper: "${1:a4}")[${2:body}]',
  par: 'par(justify: ${1:true})[${2:body}]',
};

export function setupTypstLanguage(monacoInstance: any) {
  const languageId = 'typst';

  // Avoid re-registering on every mount.
  const already = monacoInstance.languages.getLanguages().some((l: any) => l.id === languageId);
  if (!already) monacoInstance.languages.register({ id: languageId });

  monacoInstance.languages.setLanguageConfiguration(languageId, {
    comments: { lineComment: '//', blockComment: ['/*', '*/'] },
    brackets: [['{', '}'], ['[', ']'], ['(', ')']],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: '$', close: '$' },
      { open: '*', close: '*' },
      { open: '_', close: '_' }
    ],
    surroundingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '"', close: '"' },
      { open: '$', close: '$' },
      { open: '*', close: '*' },
      { open: '_', close: '_' }
    ]
  });

  monacoInstance.languages.setMonarchTokensProvider(languageId, {
    defaultToken: '',
    tokenPostfix: '.typ',

    keywords: [
      'let', 'set', 'show', 'import', 'include', 'if', 'else', 'for',
      'while', 'return', 'as', 'in', 'not', 'and', 'or', 'none', 'auto', 'true', 'false'
    ],

    tokenizer: {
      root: [
        // comments
        [/\/\/.*$/, 'comment'],
        [/\/\*/, 'comment', '@comment'],

        // headings (= , ==, ...)
        [/^\s*=+\s.*$/, 'heading'],

        // list / enum markers at line start
        [/^\s*[-+]\s/, 'markup.list'],

        // package imports: @preview/name:version
        [/@[a-zA-Z][\w-]*\/[\w-]+(:[\d.]+)?/, 'package'],

        // labels <name> and references @name
        [/<[a-zA-Z_][\w-]*>/, 'label'],

        // code mode keywords / functions starting with #
        [/#\s*([a-zA-Z_][\w-]*)/, {
          cases: { '$1@keywords': 'keyword', '@default': 'function' }
        }],

        // bare keywords inside code blocks
        [/\b([a-zA-Z_][\w-]*)\b(?=\s*[:(])/, {
          cases: { '$1@keywords': 'keyword', '@default': 'function.call' }
        }],

        // math mode
        [/\$/, { token: 'math.delim', next: '@math' }],

        // strong *...* and emph _..._
        [/\*[^*\n]+\*/, 'strong'],
        [/(^|\s)_[^_\n]+_/, 'emph'],

        // raw / code spans
        [/`[^`\n]+`/, 'raw'],

        // numbers + units
        [/\b\d+(\.\d+)?(pt|mm|cm|in|em|fr|deg|%)?\b/, 'number'],

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/"/, { token: 'string.quote', next: '@string' }],

        [/[{}()\[\]]/, '@brackets']
      ],
      comment: [
        [/[^/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[/*]/, 'comment']
      ],
      math: [
        [/\$/, { token: 'math.delim', next: '@pop' }],
        [/[a-zA-Z]+/, 'math.var'],
        [/[\^_/+\-*=()|<>]/, 'math.op'],
        [/[^$]/, 'math']
      ],
      string: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape'],
        [/"/, { token: 'string.quote', next: '@pop' }]
      ]
    }
  });

  if (!themesDefined) {
    monacoInstance.editor.defineTheme('typst-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'heading', foreground: '60a5fa', fontStyle: 'bold' },
        { token: 'keyword', foreground: 'c084fc', fontStyle: 'bold' },
        { token: 'function', foreground: '38bdf8' },
        { token: 'function.call', foreground: '7dd3fc' },
        { token: 'package', foreground: 'f59e0b' },
        { token: 'label', foreground: 'fbbf24' },
        { token: 'string', foreground: '86efac' },
        { token: 'string.quote', foreground: '86efac' },
        { token: 'string.escape', foreground: 'fca5a5' },
        { token: 'number', foreground: 'fda4af' },
        { token: 'strong', foreground: 'f8fafc', fontStyle: 'bold' },
        { token: 'emph', foreground: 'cbd5e1', fontStyle: 'italic' },
        { token: 'raw', foreground: 'a5b4fc' },
        { token: 'markup.list', foreground: 'c084fc' },
        { token: 'math.delim', foreground: 'f472b6', fontStyle: 'bold' },
        { token: 'math.var', foreground: '5eead4' },
        { token: 'math.op', foreground: 'f472b6' },
        { token: 'math', foreground: '99f6e4' }
      ],
      colors: {
        'editor.background': '#0f172a',
        'editor.foreground': '#e2e8f0',
        'editorLineNumber.foreground': '#475569',
        'editorLineNumber.activeForeground': '#94a3b8',
        'editor.lineHighlightBackground': '#1e293b66',
        'editor.selectionBackground': '#8b5cf64d',
        'editorCursor.foreground': '#a78bfa',
        'editorIndentGuide.background1': '#1e293b',
        'editorBracketMatch.border': '#8b5cf6'
      }
    });

    monacoInstance.editor.defineTheme('typst-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '94a3b8', fontStyle: 'italic' },
        { token: 'heading', foreground: '2563eb', fontStyle: 'bold' },
        { token: 'keyword', foreground: '9333ea', fontStyle: 'bold' },
        { token: 'function', foreground: '0284c7' },
        { token: 'function.call', foreground: '0369a1' },
        { token: 'package', foreground: 'b45309' },
        { token: 'label', foreground: 'b45309' },
        { token: 'string', foreground: '15803d' },
        { token: 'string.quote', foreground: '15803d' },
        { token: 'number', foreground: 'be123c' },
        { token: 'strong', foreground: '0f172a', fontStyle: 'bold' },
        { token: 'emph', foreground: '334155', fontStyle: 'italic' },
        { token: 'raw', foreground: '4f46e5' },
        { token: 'markup.list', foreground: '9333ea' },
        { token: 'math.delim', foreground: 'db2777', fontStyle: 'bold' },
        { token: 'math.var', foreground: '0d9488' },
        { token: 'math.op', foreground: 'db2777' },
        { token: 'math', foreground: '0f766e' }
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#0f172a',
        'editorCursor.foreground': '#8b5cf6',
        'editor.selectionBackground': '#8b5cf633'
      }
    });

    themesDefined = true;
  }

  if (providersRegistered) return;
  providersRegistered = true;

  const SNIPPET_RULE = monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet;
  monacoInstance.languages.registerCompletionItemProvider(languageId, {
    provideCompletionItems: () => {
      // Hide Typst's experimental HTML-export elements (html.h1, html.div, …):
      // they're irrelevant when writing PDFs and just clutter suggestions (e.g.
      // "#h3" was offering an HTML element).
      const suggestions = typstCompletions(monacoInstance)
        .filter((s: any) => s.detail !== 'HTML')
        .map((s: any) => {
          // Give common functions argument boilerplate so completing them lands
          // you on the first parameter instead of empty "()".
          const snip = SNIPPETS[s.label];
          return snip ? { ...s, insertText: snip, insertTextRules: SNIPPET_RULE } : s;
        });
      return { suggestions };
    }
  });

  // Control-flow / code-mode snippets (if / else / for / while / let / show / …)
  // with ready-made boilerplate, so writing conditional and loop logic is a tab
  // away instead of remembered.
  const KW = monacoInstance.languages.CompletionItemKind.Snippet;
  // In markup (writing a document with #if/#for/…), the body is a *content*
  // block [ … ] — a code block { … } would treat plain words as variables and
  // error. So these use [ … ]; use { … } yourself for pure computation.
  const CONTROL: { label: string; insertText: string; documentation: string }[] = [
    { label: 'if', insertText: 'if ${1:condition} [\n\t${2:body}\n]', documentation: 'Conditional content.' },
    { label: 'if else', insertText: 'if ${1:condition} [\n\t${2}\n] else [\n\t${3}\n]', documentation: 'If / else content.' },
    { label: 'if elseif', insertText: 'if ${1:cond1} [\n\t${2}\n] else if ${3:cond2} [\n\t${4}\n] else [\n\t${5}\n]', documentation: 'If / else-if / else chain.' },
    { label: 'else', insertText: 'else [\n\t${1:body}\n]', documentation: 'Else content.' },
    { label: 'for', insertText: 'for ${1:item} in ${2:collection} [\n\t${3:body}\n]', documentation: 'For loop over a collection.' },
    { label: 'for range', insertText: 'for ${1:i} in range(${2:n}) [\n\t${3:body}\n]', documentation: 'For loop over a range.' },
    { label: 'while', insertText: 'while ${1:condition} [\n\t${2:body}\n]', documentation: 'While loop.' },
    { label: 'let', insertText: 'let ${1:name} = ${2:value}', documentation: 'Bind a variable.' },
    { label: 'let function', insertText: 'let ${1:name}(${2:args}) = [\n\t${3:body}\n]', documentation: 'Define a function returning content.' },
    { label: 'set', insertText: 'set ${1:element}(${2:args})', documentation: 'Set rule.' },
    { label: 'set if', insertText: 'set ${1:element}(${2:args}) if ${3:condition}', documentation: 'Conditional set rule.' },
    { label: 'show', insertText: 'show ${1:selector}: ${2:it} => ${3:transform}', documentation: 'Show rule.' },
    { label: 'context', insertText: 'context ${1:expression}', documentation: 'Access context-dependent values.' },
    { label: 'import', insertText: 'import "${1:@preview/package:1.0.0}": ${2:*}', documentation: 'Import a module/package.' },
  ];
  monacoInstance.languages.registerCompletionItemProvider(languageId, {
    provideCompletionItems: () => ({
      suggestions: CONTROL.map(c => ({ ...c, kind: KW, insertTextRules: SNIPPET_RULE, detail: 'Control flow' })),
    }),
  });

  // Documentation lookup: index the completion data so the editor can show a
  // function/element's description, category, usage and docs link on right-click
  // (see lookupTypstDoc / the "Show Typst Documentation" action in App.tsx).
  DOCS = new Map();
  for (const c of typstCompletions(monacoInstance)) {
    const label = String(c.label || '');
    if (!label || DOCS.has(label)) continue;
    const doc = typeof c.documentation === 'string' ? c.documentation : ((c.documentation as any)?.value || '');
    DOCS.set(label, { doc, detail: c.detail || '', insert: String(c.insertText || label) });
  }
  for (const k of KEYWORD_DOCS) DOCS.set(k.key, { doc: k.doc, detail: k.detail, insert: k.insert, url: k.url });

  // Math-mode completions: Greek letters, operators and physics notation.
  // Only offered between $...$ so prose isn't polluted with sigma/alpha noise.
  // Symbol names target Typst 0.14+ — the old spellings (sect, diff, angle.l,
  // planck.reduce, *.circle) were removed in Typst 0.15.
  const GREEK: [string, string][] = [
    ['alpha', 'α'], ['beta', 'β'], ['gamma', 'γ'], ['delta', 'δ'], ['epsilon', 'ε'], ['epsilon.alt', 'ϵ'],
    ['zeta', 'ζ'], ['eta', 'η'], ['theta', 'θ'], ['theta.alt', 'ϑ'], ['iota', 'ι'], ['kappa', 'κ'],
    ['lambda', 'λ'], ['mu', 'μ'], ['nu', 'ν'], ['xi', 'ξ'], ['pi', 'π'], ['rho', 'ρ'],
    ['sigma', 'σ'], ['tau', 'τ'], ['upsilon', 'υ'], ['phi', 'φ'], ['phi.alt', 'ϕ'], ['chi', 'χ'],
    ['psi', 'ψ'], ['omega', 'ω'],
    ['Gamma', 'Γ'], ['Delta', 'Δ'], ['Theta', 'Θ'], ['Lambda', 'Λ'], ['Xi', 'Ξ'], ['Pi', 'Π'],
    ['Sigma', 'Σ'], ['Upsilon', 'Υ'], ['Phi', 'Φ'], ['Psi', 'Ψ'], ['Omega', 'Ω'],
  ];
  const MATH_SYMS: [string, string][] = [
    ['nabla', '∇'], ['partial', '∂'],
    ['infinity', '∞'], ['dot', '⋅ (or accent dot(x))'], ['times', '×'], ['plus.minus', '±'], ['minus.plus', '∓'],
    ['prop', '∝'], ['approx', '≈'], ['equiv', '≡'], ['tilde.op', '∼'], ['lt.eq', '≤'], ['gt.eq', '≥'],
    ['lt.double', '≪'], ['gt.double', '≫'], ['arrow.r', '→'], ['arrow.l', '←'], ['arrow.r.double', '⇒'],
    ['arrow.l.r', '↔'], ['arrow.r.bar', '↦ (maps to)'], ['sum', '∑'], ['product', '∏'],
    ['integral', '∫'], ['integral.cont', '∮'], ['integral.double', '∬'], ['integral.triple', '∭'],
    ['union', '∪'], ['inter', '∩'], ['in', '∈'], ['in.not', '∉'], ['subset', '⊂'], ['subset.eq', '⊆'],
    ['forall', '∀'], ['exists', '∃'], ['nothing', '∅'], ['chevron.l', '⟨'], ['chevron.r', '⟩'],
    ['dagger', '†'], ['star', '⋆'], ['ast', '∗'], ['plus.o', '⊕'], ['times.o', '⊗'],
    ['dot.o', '⊙ (solar mass ☉ substitute)'], ['bar.v', '|'], ['parallel', '∥'], ['bot', '⊥'],
    ['ell', 'ℓ'], ['Re', 'ℜ (real part)'], ['Im', 'ℑ (imaginary part)'], ['oo', '∞ (shorthand)'],
    ['square', '□ (d\'Alembertian)'], ['dots.h', '⋯'], ['dots.v', '⋮'], ['dots.down', '⋱'],
    ['prime', '′'], ['prime.double', '″'], ['degree', '°'], ['convolve', '∗ (convolution)'],
    ['emptyset', '∅ (alias of nothing)'], ['hbar', 'ℏ (physica — imported by the default template)'],
  ];
  const MATH_FNS: { label: string, insertText: string, documentation: string, detail: string }[] = [
    // Built-in math
    { label: 'hat', insertText: 'hat(${1:x})', documentation: 'x̂ — hat accent (operators).', detail: 'Math' },
    { label: 'tilde-accent', insertText: 'tilde(${1:x})', documentation: 'x̃ — tilde accent.', detail: 'Math' },
    { label: 'dot-accent', insertText: 'dot(${1:x})', documentation: 'ẋ — time derivative dot.', detail: 'Math' },
    { label: 'dot.double-accent', insertText: 'dot.double(${1:x})', documentation: 'ẍ — second time derivative.', detail: 'Math' },
    { label: 'macron', insertText: 'macron(${1:psi})', documentation: 'x̄ — bar accent (e.g. Dirac adjoint ψ̄).', detail: 'Math' },
    { label: 'arrow-accent', insertText: 'arrow(${1:x})', documentation: 'x⃗ — vector arrow accent.', detail: 'Math' },
    { label: 'overline', insertText: 'overline(${1:x})', documentation: 'Overline across a whole expression.', detail: 'Math' },
    { label: 'sqrt', insertText: 'sqrt(${1:x})', documentation: '√x — square root.', detail: 'Math' },
    { label: 'root', insertText: 'root(${1:n}, ${2:x})', documentation: 'n-th root.', detail: 'Math' },
    { label: 'frac', insertText: '(${1:a})/(${2:b})', documentation: 'Fraction — just write (a)/(b).', detail: 'Math' },
    { label: 'binom', insertText: 'binom(${1:n}, ${2:k})', documentation: 'Binomial coefficient.', detail: 'Math' },
    { label: 'abs', insertText: 'abs(${1:x})', documentation: '|x| — absolute value.', detail: 'Math' },
    { label: 'norm', insertText: 'norm(${1:x})', documentation: '‖x‖ — norm.', detail: 'Math' },
    { label: 'cases', insertText: 'cases(\n  ${1:1 quad &"if" x > 0},\n  ${2:0 quad &"otherwise"},\n)', documentation: 'Piecewise definition.', detail: 'Math' },
    { label: 'mat', insertText: 'mat(\n  ${1:1, 0};\n  ${2:0, 1};\n)', documentation: 'Matrix.', detail: 'Math' },
    { label: 'vec', insertText: 'vec(${1:x}, ${2:y})', documentation: 'Column vector.', detail: 'Math' },
    { label: 'lim', insertText: 'lim_(${1:x -> 0})', documentation: 'Limit with subscript.', detail: 'Math' },
    { label: 'cancel', insertText: 'cancel(${1:x})', documentation: 'Strike through a term (also used as Feynman slash).', detail: 'Math' },
    // physica (main.typ imports it by default; Insert → Physics adds it if missing)
    { label: 'dv', insertText: 'dv(${1:f}, ${2:x})', documentation: 'df/dx — total derivative (physica).', detail: 'physica' },
    { label: 'pdv', insertText: 'pdv(${1:f}, ${2:x})', documentation: '∂f/∂x — partial derivative (physica).', detail: 'physica' },
    { label: 'dd', insertText: 'dd(${1:x})', documentation: 'Differential dx (upright d) (physica).', detail: 'physica' },
    { label: 'va', insertText: 'va(${1:a})', documentation: 'Vector with arrow (physica).', detail: 'physica' },
    { label: 'vb', insertText: 'vb(${1:a})', documentation: 'Bold vector (physica).', detail: 'physica' },
    { label: 'vu', insertText: 'vu(${1:a})', documentation: 'Unit vector with hat (physica).', detail: 'physica' },
    { label: 'grad', insertText: 'grad ${1:phi}', documentation: '∇ gradient (physica).', detail: 'physica' },
    { label: 'div-op', insertText: 'div va(${1:E})', documentation: '∇· divergence (physica).', detail: 'physica' },
    { label: 'curl', insertText: 'curl va(${1:B})', documentation: '∇× curl (physica).', detail: 'physica' },
    { label: 'laplacian', insertText: 'laplacian ${1:phi}', documentation: '∇² Laplacian (physica).', detail: 'physica' },
    { label: 'tensor', insertText: 'tensor(${1:T}, +${2:mu}, -${3:nu})', documentation: 'Tensor with staggered indices T^μ_ν (physica).', detail: 'physica' },
    { label: 'bra', insertText: 'bra(${1:psi})', documentation: '⟨ψ| (physica).', detail: 'physica' },
    { label: 'ket', insertText: 'ket(${1:psi})', documentation: '|ψ⟩ (physica).', detail: 'physica' },
    { label: 'braket', insertText: 'braket(${1:psi}, ${2:phi})', documentation: '⟨ψ|φ⟩ inner product (physica).', detail: 'physica' },
    { label: 'ketbra', insertText: 'ketbra(${1:psi}, ${2:phi})', documentation: '|ψ⟩⟨φ| outer product (physica).', detail: 'physica' },
    { label: 'expval', insertText: 'expval(${1:hat(A)})', documentation: '⟨A⟩ expectation value (physica).', detail: 'physica' },
    { label: 'mel', insertText: 'mel(${1:n}, ${2:hat(A)}, ${3:m})', documentation: '⟨n|A|m⟩ matrix element (physica).', detail: 'physica' },
    { label: 'commutator', insertText: '[${1:hat(x)}, ${2:hat(p)}]', documentation: '[A, B] commutator (plain brackets).', detail: 'Math' },
    { label: 'anticommutator', insertText: '{${1:A}, ${2:B}}', documentation: '{A, B} anticommutator (plain braces).', detail: 'Math' },
    { label: 'order', insertText: 'order(${1:x^2})', documentation: '𝒪(x²) big-O (physica).', detail: 'physica' },
    { label: 'evaluated', insertText: 'evaluated(${1:f(x)})_(${2:0})^(${3:1})', documentation: 'Expression evaluated at bounds (physica).', detail: 'physica' },
    { label: 'isotope', insertText: 'isotope(${1:"U"}, a: ${2:235}, z: ${3:92})', documentation: 'Isotope notation (physica).', detail: 'physica' },
  ];
  // Inside $...$? Count unescaped dollars before the cursor.
  const inMathMode = (model: any, position: any) => {
    const before = model.getValueInRange({ startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column });
    return ((before.match(/(?<!\\)\$/g) || []).length % 2) === 1;
  };
  monacoInstance.languages.registerCompletionItemProvider(languageId, {
    provideCompletionItems: (model: any, position: any) => {
      if (!inMathMode(model, position)) return { suggestions: [] };
      const K = monacoInstance.languages.CompletionItemKind;
      const greek = GREEK.map(([name, glyph]) => ({
        label: `${name} ${glyph}`, filterText: name, insertText: name, kind: K.Constant,
        detail: glyph, documentation: `Greek letter ${glyph}`, sortText: '1' + name,
      }));
      const syms = MATH_SYMS.map(([name, doc]) => ({
        label: `${name} ${doc.split(' ')[0]}`, filterText: name, insertText: name, kind: K.Constant,
        detail: doc.split(' ')[0], documentation: doc, sortText: '2' + name,
      }));
      const fns = MATH_FNS.map(f => ({
        ...f, kind: K.Function, insertTextRules: SNIPPET_RULE, sortText: '0' + f.label,
      }));
      return { suggestions: [...fns, ...greek, ...syms] };
    },
  });
  for (const [name, glyph] of [...GREEK, ...MATH_SYMS])
    if (!DOCS.has(name)) DOCS.set(name, { doc: `Math symbol ${glyph}`, detail: 'Math symbol', insert: name });
  for (const f of MATH_FNS)
    if (!DOCS.has(f.label)) DOCS.set(f.label, { doc: f.documentation, detail: f.detail, insert: f.insertText });

  // Cross-reference autocomplete: when typing `@`, suggest labels (`<...>`)
  // that already exist in the document.
  monacoInstance.languages.registerCompletionItemProvider(languageId, {
    triggerCharacters: ['@'],
    provideCompletionItems: (model: any, position: any) => {
      const before = model.getLineContent(position.lineNumber).slice(0, position.column - 1);
      const at = before.lastIndexOf('@');
      if (at === -1) return { suggestions: [] };
      // Bail out if there is whitespace between the @ and the cursor (not a ref).
      const typed = before.slice(at + 1);
      if (/\s/.test(typed)) return { suggestions: [] };

      const text = model.getValue();
      const labels = Array.from(text.matchAll(/<([a-zA-Z_][\w:.\-]*)>/g)).map((m: any) => m[1]);
      const uniq = Array.from(new Set(labels)) as string[];

      const range = {
        startLineNumber: position.lineNumber,
        startColumn: at + 2,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      };

      return {
        suggestions: uniq
          .filter(l => l.startsWith(typed))
          .map(l => ({
            label: '@' + l,
            kind: monacoInstance.languages.CompletionItemKind.Reference,
            insertText: l,
            range,
            detail: 'cross-reference',
            documentation: `Reference to <${l}>`
          }))
      };
    }
  });
}
