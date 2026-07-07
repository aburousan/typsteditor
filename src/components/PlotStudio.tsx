import React, { useState } from 'react';

// One unified plot engine — replaces the four separate plot menu items with a
// single tool. Built-in modes generate cetz / cetz-plot code (2D functions, 2D
// data, 3D surface); the two heavy interactive tools (rotatable 3D studio,
// Python/matplotlib) are launched from here so everything lives under one roof.
type Mode = 'fn' | 'data' | 'surf' | 'interactive' | 'python';
type FnKind = 'explicit' | 'implicit' | 'parametric';
type DataKind = 'line' | 'scatter' | 'bar';

const MODES: { key: Mode; label: string }[] = [
  { key: 'fn', label: '2D Function' },
  { key: 'data', label: '2D Data' },
  { key: 'surf', label: '3D Surface' },
  { key: 'interactive', label: '3D Interactive' },
  { key: 'python', label: 'From Python' },
];

export default function PlotStudio({ onClose, onInsert, onOpenInteractive, onOpenPython }: {
  onClose: () => void;
  onInsert: (code: string) => void;
  onOpenInteractive: () => void;
  onOpenPython: () => void;
}) {
  const [mode, setMode] = useState<Mode>('fn');
  // 2D function
  const [fnKind, setFnKind] = useState<FnKind>('explicit');
  const [funcExpr, setFuncExpr] = useState('calc.sin(x)');
  const [implicitExpr, setImplicitExpr] = useState('x*x + y*y - 1');
  const [paramX, setParamX] = useState('calc.cos(t) * t');
  const [paramY, setParamY] = useState('calc.sin(t) * t');
  const [domain, setDomain] = useState('-5, 5');
  // 2D data
  const [dataKind, setDataKind] = useState<DataKind>('line');
  const [dataPoints, setDataPoints] = useState('0, 0\n1, 1\n2, 4\n3, 9\n4, 16');
  // 3D surface
  const [surfExpr, setSurfExpr] = useState('calc.sin(calc.sqrt(x*x + y*y))');
  const [surfRange, setSurfRange] = useState('4');
  // common
  const [xlabel, setXlabel] = useState('x');
  const [ylabel, setYlabel] = useState('y');
  const [asFigure, setAsFigure] = useState(true);
  const [caption, setCaption] = useState('Plot');
  const [label, setLabel] = useState('');

  const field = (lab: string, el: React.ReactNode) => (
    <label className="form-field"><span>{lab}</span>{el}</label>
  );

  const wrap = (imports: string, canvas: string) => {
    const tag = label.trim() ? ` <fig:${label.trim()}>` : '';
    const body = asFigure
      ? `${imports}#figure(\n  ${canvas},\n  caption: [${caption}],\n)${tag}`
      : `${imports}#align(center)[\n${canvas}\n]`;
    onInsert('\n' + body + '\n\n');
    onClose();
  };

  const insertFunction = () => {
    let body = '';
    if (fnKind === 'explicit') {
      body = `      plot.add(domain: (${domain}), x => ${funcExpr})\n`;
    } else if (fnKind === 'implicit') {
      const [a, b] = domain.split(',').map(s => s.trim());
      body = `      plot.add-contour(\n        x-domain: (${a}, ${b}), y-domain: (${a}, ${b}),\n        z: (0,), op: "<",\n        (x, y) => ${implicitExpr})\n`;
    } else {
      body = `      plot.add(domain: (${domain}), t => (${paramX}, ${paramY}))\n`;
    }
    const imports = `#import "@preview/cetz:0.3.4"\n#import "@preview/cetz-plot:0.1.1": plot\n`;
    const canvas = `cetz.canvas({\n  plot.plot(size: (8, 6),\n    x-label: [${xlabel}], y-label: [${ylabel}],\n    {\n${body}    })\n})`;
    wrap(imports, canvas);
  };

  const insertData = () => {
    const pts = dataPoints.split('\n').map(l => l.trim()).filter(Boolean).map(l => `(${l})`).join(', ');
    const data = `(${pts})`;
    let add: string;
    if (dataKind === 'scatter') add = `      plot.add(${data}, mark: "o", mark-size: .18, style: (stroke: none))\n`;
    else if (dataKind === 'bar') add = `      plot.add-bar(${data}, bar-width: .6)\n`;
    else add = `      plot.add(${data})\n`;
    const imports = `#import "@preview/cetz:0.3.4"\n#import "@preview/cetz-plot:0.1.1": plot\n`;
    const canvas = `cetz.canvas({\n  plot.plot(size: (8, 6),\n    x-label: [${xlabel}], y-label: [${ylabel}],\n    {\n${add}    })\n})`;
    wrap(imports, canvas);
  };

  const insertSurface = () => {
    const R = Math.abs(parseFloat(surfRange)) || 4;
    const s = (2 * R / 16).toFixed(3);
    const canvas = `canvas({
    import draw: *
    rotate(x: 70deg, z: 30deg)
    let f(x, y) = ${surfExpr}
    let n = 16
    let s = ${s}
    for i in range(n) {
      for j in range(n) {
        let x = (i - n/2)*s
        let y = (j - n/2)*s
        let x2 = (i + 1 - n/2)*s
        let y2 = (j + 1 - n/2)*s
        if i < n - 1 { line((x, y, f(x, y)), (x2, y, f(x2, y)), stroke: blue.darken(10%)) }
        if j < n - 1 { line((x, y, f(x, y)), (x, y2, f(x, y2)), stroke: blue.darken(10%)) }
      }
    }
  })`;
    wrap('#import "@preview/cetz:0.3.4": canvas, draw\n', canvas);
  };

  const canInsert = mode === 'fn' || mode === 'data' || mode === 'surf';
  const doInsert = () => { if (mode === 'fn') insertFunction(); else if (mode === 'data') insertData(); else if (mode === 'surf') insertSurface(); };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '560px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Plot Studio</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="seg" style={{ flexWrap: 'wrap' }}>
            {MODES.map(m => (
              <button key={m.key} className={mode === m.key ? 'active' : ''} onClick={() => setMode(m.key)}>{m.label}</button>
            ))}
          </div>

          {mode === 'fn' && (
            <>
              {field('Kind', (
                <div className="seg">
                  {(['explicit', 'implicit', 'parametric'] as FnKind[]).map(k => (
                    <button key={k} className={fnKind === k ? 'active' : ''} onClick={() => setFnKind(k)}>
                      {k === 'explicit' ? 'y = f(x)' : k === 'implicit' ? 'f(x,y) = 0' : 'Parametric'}
                    </button>
                  ))}
                </div>
              ))}
              {fnKind === 'explicit' && field('Function f(x)', <input type="text" value={funcExpr} onChange={e => setFuncExpr(e.target.value)} placeholder="calc.sin(x)" />)}
              {fnKind === 'implicit' && field('Expression f(x, y) — curve where f = 0', <input type="text" value={implicitExpr} onChange={e => setImplicitExpr(e.target.value)} placeholder="x*x + y*y - 1" />)}
              {fnKind === 'parametric' && (
                <div className="form-row">
                  {field('x(t)', <input type="text" value={paramX} onChange={e => setParamX(e.target.value)} />)}
                  {field('y(t)', <input type="text" value={paramY} onChange={e => setParamY(e.target.value)} />)}
                </div>
              )}
              {field(fnKind === 'parametric' ? 'Domain of t (min, max)' : 'Domain (min, max)', <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="-5, 5" />)}
              <div className="form-hint">Uses <code>cetz-plot</code>. Use <code>calc.</code> functions, e.g. <code>calc.exp(x)</code>, <code>calc.pow(x, 2)</code>.</div>
            </>
          )}

          {mode === 'data' && (
            <>
              {field('Chart type', (
                <div className="seg">
                  {(['line', 'scatter', 'bar'] as DataKind[]).map(k => (
                    <button key={k} className={dataKind === k ? 'active' : ''} onClick={() => setDataKind(k)}>{k.charAt(0).toUpperCase() + k.slice(1)}</button>
                  ))}
                </div>
              ))}
              {field('Data points — one "x, y" per line', (
                <textarea rows={6} value={dataPoints} onChange={e => setDataPoints(e.target.value)} style={{ fontFamily: 'monospace', resize: 'vertical' }} />
              ))}
            </>
          )}

          {mode === 'surf' && (
            <>
              {field('z = f(x, y)', <input type="text" value={surfExpr} onChange={e => setSurfExpr(e.target.value)} placeholder="calc.sin(calc.sqrt(x*x + y*y))" />)}
              {field('Range (± on x and y)', <input type="text" value={surfRange} onChange={e => setSurfRange(e.target.value)} placeholder="4" />)}
              <div className="form-hint">A wireframe surface via <code>cetz</code>. For a shaded, rotatable surface use <b>3D Interactive</b> or <b>From Python</b>.</div>
            </>
          )}

          {mode === 'interactive' && (
            <div style={{ padding: '10px 2px' }}>
              <div className="form-hint" style={{ marginBottom: 12 }}>Rotate a real 3D surface to the exact angle you want, then insert that view as an image. Best for presentation-quality figures.</div>
              <button className="btn-primary" onClick={() => { onClose(); onOpenInteractive(); }}>Open 3D Interactive Studio →</button>
            </div>
          )}

          {mode === 'python' && (
            <div style={{ padding: '10px 2px' }}>
              <div className="form-hint" style={{ marginBottom: 12 }}>Full control with Python / matplotlib — surfaces, heatmaps, anything. Runs your code and drops the figure into the document.</div>
              <button className="btn-primary" onClick={() => { onClose(); onOpenPython(); }}>Open Python plot runner →</button>
            </div>
          )}

          {(mode === 'fn' || mode === 'data') && (
            <div className="form-row">
              {field('X-axis label', <input type="text" value={xlabel} onChange={e => setXlabel(e.target.value)} />)}
              {field('Y-axis label', <input type="text" value={ylabel} onChange={e => setYlabel(e.target.value)} />)}
            </div>
          )}

          {canInsert && (
            <>
              <label className="form-check">
                <input type="checkbox" checked={asFigure} onChange={e => setAsFigure(e.target.checked)} />
                Wrap in a numbered figure (adds “Figure N” + caption)
              </label>
              {asFigure && (
                <div className="form-row">
                  {field('Caption', <input type="text" value={caption} onChange={e => setCaption(e.target.value)} />)}
                  {field('Label (optional)', <input type="text" value={label} onChange={e => setLabel(e.target.value)} placeholder="plot1 → @fig:plot1" />)}
                </div>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          {canInsert && <button className="btn-primary" onClick={doInsert}>Insert</button>}
        </div>
      </div>
    </div>
  );
}
