import { useState } from 'react';

export default function FigureBuilder({ onClose, onInsert }: { onClose: () => void, onInsert: (code: string) => void }) {
  const [tab, setTab] = useState<'figure' | 'subfigure'>('figure');
  const [caption, setCaption] = useState('My Figure');
  const [subCols, setSubCols] = useState(2);
  const [subRows, setSubRows] = useState(1);
  const [alignCenter, setAlignCenter] = useState(true);

  const handleInsert = () => {
    let code = '';
    if (alignCenter) code += '#align(center)[\n';

    if (tab === 'figure') {
      code += `#figure(\n  image("path/to/image.png", width: 80%),\n  caption: [${caption}]\n)\n`;
    } else {
      const numItems = subCols * subRows;
      let gridCode = `#figure(\n  grid(\n    columns: ${subCols},\n    gutter: 10pt,\n`;
      for (let i = 0; i < numItems; i++) {
        gridCode += `    figure(image("path/to/img${i+1}.png"), caption: [Subfigure ${i+1}]),\n`;
      }
      gridCode += `  ),\n  caption: [${caption}]\n)\n`;
      code += gridCode;
    }

    if (alignCenter) code += ']\n';
    onInsert(code);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: 440, maxWidth: '95vw' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Insert Figure</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="seg">
            {(['figure', 'subfigure'] as const).map(t => (
              <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>
                {t === 'figure' ? 'Single figure' : 'Subfigure grid'}
              </button>
            ))}
          </div>

          <label className="form-field">
            <span>Caption</span>
            <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Figure caption" />
          </label>

          {tab === 'subfigure' && (
            <div className="form-row">
              <label className="form-field">
                <span>Columns</span>
                <input type="number" min={1} max={5} value={subCols} onChange={e => setSubCols(Number(e.target.value))} />
              </label>
              <label className="form-field">
                <span>Rows</span>
                <input type="number" min={1} max={5} value={subRows} onChange={e => setSubRows(Number(e.target.value))} />
              </label>
            </div>
          )}

          <label className="form-check">
            <input type="checkbox" checked={alignCenter} onChange={e => setAlignCenter(e.target.checked)} />
            Centre the figure on the page
          </label>

          <div className="form-hint">
            Inserts a <code>#figure(...)</code> with an <code>image(...)</code> placeholder — point it at a file in
            your project and add a <code>&lt;label&gt;</code> to cross-reference it.
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleInsert}>Insert figure</button>
        </div>
      </div>
    </div>
  );
}
