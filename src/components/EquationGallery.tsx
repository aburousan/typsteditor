import { useMemo, useState } from 'react';

// A gallery of ready-to-fill equation templates (like the equation pickers in
// Word / MathType). Pick a structure and it drops into the document as a Typst
// equation with tab-through placeholders (${1:…}) so you just fill the blanks.

export type EqTemplate = { name: string, snippet: string, physica?: boolean };

// `snippet` is Typst *math* with Monaco snippet tabstops; the editor wraps it in
// `$ … $`. Placeholder text is what the reader sees before they type.
const CATEGORIES: { name: string, items: EqTemplate[] }[] = [
  {
    name: 'Fractions & roots',
    items: [
      { name: 'Fraction', snippet: '(${1:a})/(${2:b})' },
      { name: 'Nested fraction', snippet: '(${1:a})/((${2:b})/(${3:c}))' },
      { name: 'Square root', snippet: 'sqrt(${1:x})' },
      { name: 'nth root', snippet: 'root(${1:n}, ${2:x})' },
      { name: 'Binomial coefficient', snippet: 'binom(${1:n}, ${2:k})' },
    ],
  },
  {
    name: 'Scripts',
    items: [
      { name: 'Superscript (power)', snippet: '${1:x}^(${2:n})' },
      { name: 'Subscript (index)', snippet: '${1:x}_(${2:i})' },
      { name: 'Sub- and superscript', snippet: '${1:x}_(${2:i})^(${3:n})' },
      { name: 'Overset label', snippet: 'accent(${1:x}, hat)' },
      { name: 'Under/over brace', snippet: 'underbrace(${1:x + y}, ${2:s})' },
    ],
  },
  {
    name: 'Sums & integrals',
    items: [
      { name: 'Summation', snippet: 'sum_(${1:i=1})^(${2:n}) ${3:a_i}' },
      { name: 'Product', snippet: 'product_(${1:i=1})^(${2:n}) ${3:a_i}' },
      { name: 'Definite integral', snippet: 'integral_(${1:a})^(${2:b}) ${3:f(x)} dif ${4:x}' },
      { name: 'Double integral', snippet: 'integral.double_(${1:D}) ${2:f} dif ${3:A}' },
      { name: 'Contour integral', snippet: 'integral.cont_(${1:partial D}) ${2:F} dif ${3:l}' },
      { name: 'Union / intersection', snippet: 'union.big_(${1:i=1})^(${2:n}) ${3:A_i}' },
    ],
  },
  {
    name: 'Calculus',
    items: [
      { name: 'Derivative', snippet: 'dv(${1:y}, ${2:x})', physica: true },
      { name: 'Partial derivative', snippet: 'pdv(${1:f}, ${2:x})', physica: true },
      { name: 'Second derivative', snippet: 'dv(${1:y}, ${2:x}, 2)', physica: true },
      { name: 'Limit', snippet: 'lim_(${1:x -> 0}) ${2:f(x)}' },
      { name: 'Gradient / divergence', snippet: 'grad ${1:phi}, quad div ${2:va(F)}', physica: true },
      { name: 'Nabla operator', snippet: 'nabla^2 ${1:phi}' },
    ],
  },
  {
    name: 'Matrices & vectors',
    items: [
      { name: 'Column vector', snippet: 'vec(${1:a}, ${2:b}, ${3:c})' },
      { name: '2×2 matrix', snippet: 'mat(${1:a}, ${2:b}; ${3:c}, ${4:d})' },
      { name: '3×3 matrix', snippet: 'mat(${1:a}, ${2:b}, ${3:c}; ${4:d}, ${5:e}, ${6:f}; ${7:g}, ${8:h}, ${9:i})' },
      { name: 'Determinant', snippet: 'mat(delim: "|", ${1:a}, ${2:b}; ${3:c}, ${4:d})' },
      { name: 'Vector arrow', snippet: 'arrow(${1:v})' },
      { name: 'Unit vector', snippet: 'hat(${1:n})' },
    ],
  },
  {
    name: 'Cases & alignment',
    items: [
      { name: 'Piecewise (cases)', snippet: 'f(x) = cases(${1:a} &"if " ${2:x > 0}, ${3:b} &"otherwise")' },
      { name: 'System of equations', snippet: 'cases(${1:a x + b y = e}, ${2:c x + d y = f})' },
      { name: 'Two aligned lines', snippet: '${1:a} &= ${2:b} \\\\\n  &= ${3:c}' },
      { name: 'Labelled equality', snippet: '${1:x} =^(${2:"def"}) ${3:y}' },
    ],
  },
  {
    name: 'Relations & sets',
    items: [
      { name: 'Approximately equal', snippet: '${1:x} approx ${2:y}' },
      { name: 'Proportional to', snippet: '${1:F} prop ${2:a}' },
      { name: 'Element of set', snippet: '${1:x} in ${2:RR}' },
      { name: 'For all / exists', snippet: 'forall ${1:x} in ${2:X}, exists ${3:y}' },
      { name: 'Maps to (function)', snippet: '${1:f}: ${2:X} -> ${3:Y}' },
      { name: 'Tends to / arrow', snippet: '${1:x_n} -> ${2:L}' },
    ],
  },
  {
    name: 'Physics',
    items: [
      { name: 'Bra–ket', snippet: 'braket(${1:psi}, ${2:phi})', physica: true },
      { name: 'Expectation value', snippet: 'expval(${1:hat(A)})', physica: true },
      { name: 'Commutator', snippet: '[${1:hat(x)}, ${2:hat(p)}] = ${3:i hbar}', physica: true },
      { name: 'Absolute value / norm', snippet: 'abs(${1:x}), quad norm(${2:v})', physica: true },
      { name: 'Schrödinger equation', snippet: 'i hbar pdv(${1:psi}, t) = hat(H) ${1:psi}', physica: true },
      { name: 'Einstein field eqs.', snippet: 'R_(mu nu) - 1/2 R g_(mu nu) + Lambda g_(mu nu) = (8 pi G)/c^4 T_(mu nu)' },
    ],
  },
];

const ALL = CATEGORIES.flatMap(c => c.items.map(it => ({ ...it, cat: c.name })));
// Readable, tabstop-free version of a snippet for the card preview.
const plain = (s: string) => s.replace(/\$\{\d+:([^}]*)\}/g, '$1').replace(/\$\{\d+\}/g, '□').replace(/\\\\/g, ' ⏎ ');

export default function EquationGallery({ onClose, onInsert }: {
  onClose: () => void,
  onInsert: (t: EqTemplate, display: boolean) => void,
}) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<string>('All');
  const [display, setDisplay] = useState(true);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = cat === 'All' ? ALL : ALL.filter(i => i.cat === cat);
    if (q) list = list.filter(i => i.name.toLowerCase().includes(q) || plain(i.snippet).toLowerCase().includes(q));
    return list;
  }, [query, cat]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content eq-gallery" style={{ width: '860px', maxWidth: '95vw', height: '78vh' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Equation templates</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="eq-gallery-toolbar">
          <input autoFocus className="eq-gallery-search" placeholder="Search equations… (integral, matrix, cases)" value={query} onChange={e => setQuery(e.target.value)} />
          <label className="eq-gallery-display" title="Insert as a centred display equation, or inline">
            <input type="checkbox" checked={display} onChange={e => setDisplay(e.target.checked)} /> Display
          </label>
        </div>

        <div className="eq-gallery-body">
          <div className="eq-gallery-cats">
            {['All', ...CATEGORIES.map(c => c.name)].map(c => (
              <button key={c} className={cat === c ? 'active' : ''} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="eq-gallery-grid">
            {items.length === 0 && <div className="eq-gallery-empty">No templates match “{query}”.</div>}
            {items.map((it, i) => (
              <button key={i} className="eq-card" onClick={() => onInsert(it, display)} title="Insert this template">
                <span className="eq-card-name">{it.name}{it.physica && <span className="eq-card-tag">physica</span>}</span>
                <code className="eq-card-code">{plain(it.snippet)}</code>
              </button>
            ))}
          </div>
        </div>

        <div className="eq-gallery-foot">
          Pick one to insert it at the cursor with fillable blanks — press <b>Tab</b> to jump between them. Templates tagged
          <span className="eq-card-tag">physica</span> add the <code>physica</code> import automatically.
        </div>
      </div>
    </div>
  );
}
