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
    if (margin !== 'auto') {
      code += `#set page(margin: ${margin})\n`;
    }
    if (pageColor !== '#ffffff') {
      code += `#set page(fill: rgb("${pageColor}"))\n`;
    }
    if (alignment !== 'left') {
      code += `#set align(${alignment})\n`;
    }
    if (headingNumbering !== 'none') {
      code += `#set heading(numbering: "${headingNumbering}")\n`;
    }
    
    editorRef.current.executeEdits('settings', [{
      range: new monaco.Range(1, 1, 1, 1),
      text: code,
      forceMoveMarkers: true
    }]);
    
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '400px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Document Settings</h2>
          <button className="tab-close" style={{ fontSize: '24px', cursor: 'pointer' }} onClick={onClose}>×</button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            Font Family:
            <select value={fontFamily} onChange={e => setFontFamily(e.target.value)} style={{ padding: '5px', background: 'var(--bg-color)', color: 'white' }}>
              <option value="New Computer Modern">New Computer Modern</option>
              <option value="Linux Libertine">Linux Libertine</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            Font Size:
            <select value={fontSize} onChange={e => setFontSize(e.target.value)} style={{ padding: '5px', background: 'var(--bg-color)', color: 'white' }}>
              <option value="10pt">10pt</option>
              <option value="11pt">11pt</option>
              <option value="12pt">12pt</option>
              <option value="14pt">14pt</option>
            </select>
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            Margin:
            <select value={margin} onChange={e => setMargin(e.target.value)} style={{ padding: '5px', background: 'var(--bg-color)', color: 'white' }}>
              <option value="auto">Auto (Default)</option>
              <option value="1in">1 inch</option>
              <option value="2cm">2 cm</option>
              <option value="2.5cm">2.5 cm</option>
            </select>
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            Page Color:
            <input type="color" value={pageColor} onChange={e => setPageColor(e.target.value)} style={{ width: '100%', height: '30px' }} />
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            Text Alignment:
            <select value={alignment} onChange={e => setAlignment(e.target.value)} style={{ padding: '5px', background: 'var(--bg-color)', color: 'white' }}>
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="justify">Justify</option>
            </select>
          </label>
          
          <label style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            Heading Numbering (Titles & Subtitles):
            <select value={headingNumbering} onChange={e => setHeadingNumbering(e.target.value)} style={{ padding: '5px', background: 'var(--bg-color)', color: 'white' }}>
              <option value="none">None</option>
              <option value="1.1.">1.1. (Numbers)</option>
              <option value="1.a.">1.a. (Numbers & Letters)</option>
              <option value="I.1.">I.1. (Roman Numerals)</option>
            </select>
          </label>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button style={{ background: 'var(--accent-color)', color: 'white', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} onClick={handleApply}>Apply Settings</button>
        </div>
      </div>
    </div>
  );
}
