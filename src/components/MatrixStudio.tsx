import { useState } from 'react';

// Matrix Studio — a visual R×C grid editor. Click a cell to type its content and
// give it a fill colour, a hatch pattern, or turn it into a shape (square /
// circle / diamond). Click the gaps *between* cells to draw borders/boxes around
// groups (via the `pavemat` package). Two output modes:
//   • Display — a rendered `math.mat` (wrapped in `pavemat(...)` when it has
//     borders), for putting a matrix in the document.
//   • Code    — a `#let A = ((1, 2), (3, 4))` array plus optional helper
//     functions (transpose / add / scale / multiply), so you can *compute* on it.

type Hatch = 'none' | 'diag' | 'cross' | 'dots';
type Shape = 'none' | 'square' | 'circle' | 'diamond';
type Cell = { content: string; fill: string; hatch: Hatch; shape: Shape };

const COLORS: { key: string; css: string }[] = [
  { key: 'yellow', css: '#eab308' }, { key: 'blue', css: '#3b82f6' },
  { key: 'green', css: '#22c55e' }, { key: 'red', css: '#ef4444' },
  { key: 'orange', css: '#f97316' }, { key: 'purple', css: '#a855f7' },
  { key: 'teal', css: '#14b8a6' }, { key: 'gray', css: '#9ca3af' },
];
// Border stroke colours (passed to pavemat as `paint`).
const STROKE_COLORS: { key: string; css: string }[] = [
  { key: 'red', css: '#ef4444' }, { key: 'blue', css: '#3b82f6' },
  { key: 'green', css: '#22c55e' }, { key: 'orange', css: '#f97316' },
  { key: 'purple', css: '#a855f7' }, { key: 'black', css: '#111827' },
];
// Code-mode delimiter values (used inside math.mat(...)).
const DELIMS: Record<string, string> = { '( )': '"("', '[ ]': '"["', '{ }': '"{"', '| |': '"|"', '‖ ‖': '"||"', 'none': 'none' };

const blankCell = (): Cell => ({ content: '', fill: '', hatch: 'none', shape: 'none' });
const makeGrid = (r: number, c: number, prev?: Cell[][]): Cell[][] =>
  Array.from({ length: r }, (_, i) => Array.from({ length: c }, (_, j) => prev?.[i]?.[j] ?? blankCell()));

const hatchFn = (h: Hatch) => (h === 'cross' ? 'hatchx' : h === 'dots' ? 'hatchd' : 'hatch');

// One matrix cell as a *code-mode* expression (no leading #). We build the whole
// matrix via `math.mat((row), (row))` in code mode because a `;` row separator in
// math mode is silently swallowed when a cell ends in a `#…()` embed.
function cellExpr(cell: Cell): string {
  if (cell.shape !== 'none') {
    const f = cell.fill ? `${cell.fill}.lighten(45%)` : 'none';
    if (cell.shape === 'square') return `square(size: 11pt, fill: ${f})`;
    if (cell.shape === 'circle') return `circle(radius: 5.5pt, fill: ${f})`;
    return `rotate(45deg, reflow: true, square(size: 8pt, fill: ${f}))`; // diamond
  }
  const c = (cell.content || '').trim();
  const body = c ? `$${c}$` : '[]';
  if (cell.hatch !== 'none') return `cellbox(${body}, fill: ${hatchFn(cell.hatch)}(${cell.fill || 'blue'}))`;
  if (cell.fill) return `cellbox(${body}, fill: ${cell.fill}.lighten(55%))`;
  return body; // plain content
}

// A cell's value for the code-array output (raw Typst; empty → 0).
const codeCell = (cell: Cell) => {
  const c = (cell.content || '').trim();
  return c === '' ? '0' : c;
};

// Border keys. A horizontal segment sits on the *top* edge of cell (y, x); a
// vertical segment on the *left* edge of cell (y, x). Extra last row/column of
// segments give the bottom/right outer borders.
const hKey = (y: number, x: number) => `h:${y}:${x}`;   // y ∈ 0..rows, x ∈ 0..cols-1
const vKey = (x: number, y: number) => `v:${x}:${y}`;   // x ∈ 0..cols, y ∈ 0..rows-1
const keyInRange = (k: string, r: number, c: number) => {
  const [t, a, b] = k.split(':');
  const A = +a, B = +b;
  return t === 'h' ? (A <= r && B < c) : (A <= c && B < r);
};

export default function MatrixStudio({ onClose, onInsert }: { onClose: () => void; onInsert: (body: string) => void }) {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [delim, setDelim] = useState('( )');
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center');
  const [grid, setGrid] = useState<Cell[][]>(() => makeGrid(2, 2));
  const [sel, setSel] = useState<[number, number]>([0, 0]);
  const [center, setCenter] = useState(false);
  // Borders (pavemat) + their stroke style.
  const [borders, setBorders] = useState<Set<string>>(() => new Set());
  const [strokeColor, setStrokeColor] = useState('red');
  const [strokeDash, setStrokeDash] = useState<'solid' | 'dashed' | 'dotted'>('dashed');
  const [strokeThickness, setStrokeThickness] = useState('1pt');
  // Output mode.
  const [mode, setMode] = useState<'display' | 'code'>('display');
  const [varName, setVarName] = useState('A');
  const [helpers, setHelpers] = useState(true);

  const resize = (r: number, c: number) => {
    r = Math.max(1, Math.min(8, r)); c = Math.max(1, Math.min(8, c));
    setRows(r); setCols(c); setGrid(g => makeGrid(r, c, g));
    setSel(([sr, sc]) => [Math.min(sr, r - 1), Math.min(sc, c - 1)]);
    setBorders(b => new Set([...b].filter(k => keyInRange(k, r, c))));
  };
  const [sr, sc] = sel;
  const cur = grid[sr]?.[sc] ?? blankCell();
  const update = (patch: Partial<Cell>) =>
    setGrid(g => g.map((row, i) => row.map((cell, j) => (i === sr && j === sc ? { ...cell, ...patch } : cell))));
  const toggleBorder = (k: string) => setBorders(b => { const n = new Set(b); n.has(k) ? n.delete(k) : n.add(k); return n; });

  const strokeStr = () => {
    const parts = [`paint: ${strokeColor}`, `thickness: ${strokeThickness}`];
    if (strokeDash !== 'solid') parts.push(`dash: "${strokeDash}"`);
    return `(${parts.join(', ')})`;
  };

  const build = () => {
    // ---- Code mode: emit a plain Typst array to compute with. ----------------
    if (mode === 'code') {
      const arr = grid.map(row => '  (' + row.map(codeCell).join(', ') + ')').join(',\n');
      let out = `#let ${varName} = (\n${arr},\n)`;
      if (helpers)
        out += `\n// Ops: mat-transpose(${varName}), mat-add(${varName}, B), mat-scale(${varName}, 2), mat-mul(${varName}, B)`
             + `\n// Render an array as a matrix:  #mat-show(mat-mul(${varName}, ${varName}))`;
      return '\n' + out + '\n\n';
    }

    // ---- Display mode: a rendered matrix (via pavemat if it has borders). ----
    const opts: string[] = [`delim: ${DELIMS[delim]}`];
    if (align !== 'center') opts.push(`align: ${align}`);
    const rowsStr = (indent: string) => grid.map(row => indent + '(' + row.map(cellExpr).join(', ') + ')').join(',\n');

    if (borders.size === 0) {
      const mat = `math.equation(block: true, math.mat(\n  ${opts.join(', ')},\n${rowsStr('  ')},\n))`;
      const out = center ? `#align(center, ${mat})` : `#${mat}`;
      return '\n' + out + '\n\n';
    }

    // Borders → one pave entry per drawn segment. A left edge of cell (y,x) is a
    // "down" step from intersection (y,x); a top edge is a "right" step.
    const pave: string[] = [];
    for (const k of borders) {
      const [t, a, b] = k.split(':'); const A = +a, B = +b;
      if (t === 'v') pave.push(`(from: (${B}, ${A}), path: "S")`);   // left edge of (B, A)
      else           pave.push(`(from: (${A}, ${B}), path: "D")`);   // top edge of (A, B)
    }
    const matArg = `math.mat(\n    ${opts.join(', ')},\n${rowsStr('    ')},\n  )`;
    const paveStr = `(\n    ${pave.join(',\n    ')},\n  )`;
    const call = `pavemat(\n  ${matArg},\n  pave: ${paveStr},\n  stroke: ${strokeStr()},\n  block: true,\n)`;
    const out = center ? `#align(center, ${call})` : `#${call}`;
    return '\n' + out + '\n\n';
  };

  // A tiny preview of a cell's styling for the grid buttons.
  const cellStyle = (cell: Cell): React.CSSProperties => {
    const c = COLORS.find(x => x.key === cell.fill)?.css;
    if (cell.hatch !== 'none' && c) {
      const g = cell.hatch === 'diag' ? `repeating-linear-gradient(45deg, ${c} 0 1px, transparent 1px 5px)`
        : cell.hatch === 'cross' ? `repeating-linear-gradient(45deg, ${c} 0 1px, transparent 1px 5px), repeating-linear-gradient(-45deg, ${c} 0 1px, transparent 1px 5px)`
        : `radial-gradient(${c} 1px, transparent 1.4px)`;
      return { backgroundImage: g, backgroundSize: cell.hatch === 'dots' ? '5px 5px' : 'auto' };
    }
    if (cell.fill && c) return { background: c + '55' };
    return {};
  };

  // ---- Border-editable grid (cells + clickable edge gaps) -------------------
  const CELL = 46, EDGE = 10;
  const strokeCss = STROKE_COLORS.find(s => s.key === strokeColor)?.css || '#ef4444';
  const cols_tracks = `${EDGE}px ` + Array(cols).fill(`${CELL}px ${EDGE}px`).join(' ');
  const rows_tracks = `${EDGE}px ` + Array(rows).fill(`${CELL}px ${EDGE}px`).join(' ');
  const showBorders = mode === 'display';

  const edge = (k: string, horizontal: boolean, gr: number, gc: number) => {
    const active = borders.has(k);
    const lineStyle = active ? strokeDash : 'dotted';
    const color = active ? strokeCss : 'var(--border-color)';
    return (
      <div key={k} onClick={() => toggleBorder(k)}
        title={active ? 'Remove border' : 'Add border'}
        style={{
          gridRow: gr, gridColumn: gc, cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}>
        <div style={horizontal
          ? { width: '100%', height: 0, borderTop: `2px ${lineStyle} ${color}`, opacity: active ? 1 : 0.4 }
          : { height: '100%', width: 0, borderLeft: `2px ${lineStyle} ${color}`, opacity: active ? 1 : 0.4 }} />
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content matrix-studio" style={{ width: 660, maxWidth: '95vw' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Matrix Studio</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Output mode */}
          <div className="seg" style={{ alignSelf: 'flex-start' }}>
            <button className={mode === 'display' ? 'active' : ''} onClick={() => setMode('display')}>Display (matrix)</button>
            <button className={mode === 'code' ? 'active' : ''} onClick={() => setMode('code')}>Code (array)</button>
          </div>

          <div className="ms-controls">
            <label>Rows
              <div className="ms-stepper"><button onClick={() => resize(rows - 1, cols)}>−</button><span>{rows}</span><button onClick={() => resize(rows + 1, cols)}>+</button></div>
            </label>
            <label>Columns
              <div className="ms-stepper"><button onClick={() => resize(rows, cols - 1)}>−</button><span>{cols}</span><button onClick={() => resize(rows, cols + 1)}>+</button></div>
            </label>
            {mode === 'display' && <label>Brackets
              <select value={delim} onChange={e => setDelim(e.target.value)}>{Object.keys(DELIMS).map(d => <option key={d}>{d}</option>)}</select>
            </label>}
            {mode === 'display' && <label>Align
              <select value={align} onChange={e => setAlign(e.target.value as any)}><option>center</option><option>left</option><option>right</option></select>
            </label>}
          </div>

          {/* The grid: cells with clickable edge gaps between them. */}
          <div className="ms-grid-wrap">
            <div style={{ display: 'grid', gridTemplateColumns: cols_tracks, gridTemplateRows: rows_tracks, margin: '0 auto', width: 'max-content' }}>
              {grid.map((row, i) => row.map((cell, j) => (
                <button key={`c-${i}-${j}`} className={`ms-cell${i === sr && j === sc ? ' sel' : ''}`} style={{ gridRow: 2 * i + 2, gridColumn: 2 * j + 2, width: '100%', height: '100%', ...cellStyle(cell) }} onClick={() => setSel([i, j])} title={`Cell (${i + 1}, ${j + 1})`}>
                  {cell.shape === 'square' ? '■' : cell.shape === 'circle' ? '●' : cell.shape === 'diamond' ? '◆' : (cell.content || '·')}
                </button>
              )))}
              {showBorders && <>
                {/* horizontal edges: y ∈ 0..rows, x ∈ 0..cols-1 */}
                {Array.from({ length: rows + 1 }, (_, y) => Array.from({ length: cols }, (_, x) =>
                  edge(hKey(y, x), true, 2 * y + 1, 2 * x + 2)))}
                {/* vertical edges: x ∈ 0..cols, y ∈ 0..rows-1 */}
                {Array.from({ length: cols + 1 }, (_, x) => Array.from({ length: rows }, (_, y) =>
                  edge(vKey(x, y), false, 2 * y + 2, 2 * x + 1)))}
              </>}
            </div>
            <div className="ms-hint">
              {showBorders
                ? <>Click a cell to style it. Click the <b>gaps between cells</b> to draw borders/boxes.</>
                : <>Click a cell to type its value. Empty cells become <code>0</code>.</>}
            </div>
          </div>

          {/* Border stroke style (display mode only) */}
          {showBorders && (
            <div className="ms-editor">
              <div className="ms-editor-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Border style
                {borders.size > 0 && <button className="btn-ghost" style={{ marginLeft: 'auto', padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => setBorders(new Set())}>Clear borders</button>}
              </div>
              <div className="ms-field">Colour
                <div className="ms-swatches">
                  {STROKE_COLORS.map(c => (
                    <button key={c.key} className={`ms-swatch${strokeColor === c.key ? ' sel' : ''}`} style={{ background: c.css }} onClick={() => setStrokeColor(c.key)} title={c.key} />
                  ))}
                </div>
              </div>
              <div className="ms-row2">
                <label className="ms-field">Line
                  <select value={strokeDash} onChange={e => setStrokeDash(e.target.value as any)}>
                    <option value="solid">solid ──</option><option value="dashed">dashed - -</option><option value="dotted">dotted ⋯</option>
                  </select>
                </label>
                <label className="ms-field">Thickness
                  <select value={strokeThickness} onChange={e => setStrokeThickness(e.target.value)}>
                    <option value="0.5pt">0.5pt</option><option value="1pt">1pt</option><option value="1.5pt">1.5pt</option><option value="2pt">2pt</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {/* Cell editor (display mode) or code options (code mode) */}
          {mode === 'display' ? (
            <div className="ms-editor">
              <div className="ms-editor-title">Cell ({sr + 1}, {sc + 1})</div>
              <label className="ms-field">Content (Typst math)
                <input value={cur.content} placeholder="e.g. alpha, x_1, 0" onChange={e => update({ content: e.target.value })} disabled={cur.shape !== 'none'} />
              </label>
              <div className="ms-field">Fill colour
                <div className="ms-swatches">
                  <button className={`ms-swatch none${!cur.fill ? ' sel' : ''}`} onClick={() => update({ fill: '' })} title="No fill">∅</button>
                  {COLORS.map(c => (
                    <button key={c.key} className={`ms-swatch${cur.fill === c.key ? ' sel' : ''}`} style={{ background: c.css }} onClick={() => update({ fill: c.key })} title={c.key} />
                  ))}
                </div>
              </div>
              <div className="ms-row2">
                <label className="ms-field">Hatch
                  <select value={cur.hatch} onChange={e => update({ hatch: e.target.value as Hatch })} disabled={cur.shape !== 'none'}>
                    <option value="none">none</option><option value="diag">diagonal ╱</option><option value="cross">cross ╳</option><option value="dots">dots ⋯</option>
                  </select>
                </label>
                <label className="ms-field">Shape element
                  <select value={cur.shape} onChange={e => update({ shape: e.target.value as Shape })}>
                    <option value="none">none (text)</option><option value="square">square ■</option><option value="circle">circle ●</option><option value="diamond">diamond ◆</option>
                  </select>
                </label>
              </div>
              <div className="ms-hint" style={{ marginTop: 2 }}>Hatch uses the fill colour (defaults to blue). A shape replaces the cell's text.</div>
            </div>
          ) : (
            <div className="ms-editor">
              <div className="ms-editor-title">Cell ({sr + 1}, {sc + 1})</div>
              <label className="ms-field">Value (number or Typst expression)
                <input value={cur.content} placeholder="e.g. 1, 2/3, calc.pi" onChange={e => update({ content: e.target.value })} />
              </label>
              <div className="ms-row2">
                <label className="ms-field">Variable name
                  <input value={varName} onChange={e => setVarName(e.target.value.replace(/[^\w-]/g, '') || 'A')} />
                </label>
                <label className="ms-field" style={{ justifyContent: 'flex-end' }}>
                  <span className="form-check" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="checkbox" checked={helpers} onChange={e => setHelpers(e.target.checked)} />
                    Add op helpers (transpose, multiply…)
                  </span>
                </label>
              </div>
              <div className="ms-hint" style={{ marginTop: 2 }}>
                Emits <code>#let {varName} = ((…), (…))</code>. Helpers let you do <code>mat-mul({varName}, B)</code>, <code>mat-transpose({varName})</code>, then render with <code>#mat-show(…)</code>.
              </div>
            </div>
          )}

          {mode === 'display' && <label className="form-check"><input type="checkbox" checked={center} onChange={e => setCenter(e.target.checked)} /> Center on page</label>}

          <div className="ms-footer">
            <button className="btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={() => { onInsert(build()); onClose(); }}>{mode === 'code' ? 'Insert array' : 'Insert matrix'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
