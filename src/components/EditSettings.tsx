import React, { useState } from 'react';

export default function EditSettings({ onClose, editorRef, monaco }: { onClose: () => void, editorRef: React.MutableRefObject<any>, monaco: any }) {
  const [fontSize, setFontSize] = useState('11pt');
  const [fontFamily, setFontFamily] = useState('New Computer Modern');
  const [margin, setMargin] = useState('auto');
  const [pageColor, setPageColor] = useState('#ffffff');
  const [alignment, setAlignment] = useState('left');
  const [headingNumbering, setHeadingNumbering] = useState('none');

  const handleApply = () => {
    if (!editorRef.current || !monaco) return;
    let code = `\n#set text(font: "${fontFamily}", size: ${fontSize})\n`;
    if (margin !== 'auto') code += `#set page(margin: ${margin})\n`;
    if (pageColor !== '#ffffff') code += `#set page(fill: rgb("${pageColor}"))\n`;
    if (alignment !== 'left') code += `#set align(${alignment})\n`;
    if (headingNumbering !== 'none') code += `#set heading(numbering: "${headingNumbering}")\n`;

    editorRef.current.executeEdits('settings', [{
      range: new monaco.Range(1, 1, 1, 1),
      text: code,
      forceMoveMarkers: true,
    }]);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: 440, maxWidth: '95vw' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Document Settings</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <label className="form-field">
              <span>Font family</span>
              <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
                <option value="New Computer Modern">New Computer Modern</option>
                <option value="Linux Libertine">Linux Libertine</option>
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </label>
            <label className="form-field" style={{ maxWidth: 130 }}>
              <span>Font size</span>
              <select value={fontSize} onChange={e => setFontSize(e.target.value)}>
                <option value="10pt">10pt</option>
                <option value="11pt">11pt</option>
                <option value="12pt">12pt</option>
                <option value="14pt">14pt</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label className="form-field">
              <span>Margin</span>
              <select value={margin} onChange={e => setMargin(e.target.value)}>
                <option value="auto">Auto (default)</option>
                <option value="1in">1 inch</option>
                <option value="2cm">2 cm</option>
                <option value="2.5cm">2.5 cm</option>
              </select>
            </label>
            <label className="form-field">
              <span>Text alignment</span>
              <select value={alignment} onChange={e => setAlignment(e.target.value)}>
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </label>
          </div>

          <label className="form-field">
            <span>Heading numbering</span>
            <select value={headingNumbering} onChange={e => setHeadingNumbering(e.target.value)}>
              <option value="none">None</option>
              <option value="1.1.">1.1. — numbers</option>
              <option value="1.a.">1.a. — numbers &amp; letters</option>
              <option value="I.1.">I.1. — Roman numerals</option>
            </select>
          </label>

          <label className="form-field">
            <span>Page colour</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="color" value={pageColor} onChange={e => setPageColor(e.target.value)}
                style={{ width: 48, height: 34, padding: 2, cursor: 'pointer' }} />
              <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13, color: 'var(--text-muted)' }}>{pageColor}</span>
            </div>
          </label>

          <div className="form-hint">Applied as <code>#set</code> rules at the top of the document. White page colour is left unset.</div>
        </div>

        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleApply}>Apply settings</button>
        </div>
      </div>
    </div>
  );
}
