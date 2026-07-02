import { typstCompletions } from './typstCompletions';

let themesDefined = false;
let providersRegistered = false;

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
