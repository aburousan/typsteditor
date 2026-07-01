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
      <div className="modal-content" style={{ width: '400px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Insert Figure</h2>
          <button className="tab-close" style={{ fontSize: '24px', cursor: 'pointer' }} onClick={onClose}>×</button>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          {['figure', 'subfigure'].map(t => (
            <button key={t} onClick={() => setTab(t as any)} style={{ background: tab === t ? 'var(--accent-color)' : 'var(--panel-bg)', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', border: 'none', color: '#fff' }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label>Caption: <input type="text" value={caption} onChange={e => setCaption(e.target.value)} style={{ width: '100%', padding: '5px', background: 'var(--bg-color)', color: 'white' }} /></label>
          
          {tab === 'subfigure' && (
            <>
              <label>Columns: <input type="number" min="1" max="5" value={subCols} onChange={e => setSubCols(Number(e.target.value))} style={{ width: '100%', padding: '5px', background: 'var(--bg-color)', color: 'white' }} /></label>
              <label>Rows: <input type="number" min="1" max="5" value={subRows} onChange={e => setSubRows(Number(e.target.value))} style={{ width: '100%', padding: '5px', background: 'var(--bg-color)', color: 'white' }} /></label>
            </>
          )}
        </div>

        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', cursor: 'pointer' }}>
            <input type="checkbox" checked={alignCenter} onChange={e => setAlignCenter(e.target.checked)} />
            Align Figure to Center
          </label>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button style={{ background: 'var(--accent-color)', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} onClick={handleInsert}>Insert Code</button>
        </div>
      </div>
    </div>
  );
}
