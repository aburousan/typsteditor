import React from 'react';

// Isolates a single heavy tool (Plot Studio, 3D studio, whiteboard, code runner…)
// so a render/runtime error inside it shows a dismissible message instead of
// white-screening the whole editor. Closing resets the boundary and the tool.
export default class Boundary extends React.Component<
  { name?: string; onClose?: () => void; children: React.ReactNode },
  { error: unknown }
> {
  state = { error: null as unknown };
  static getDerivedStateFromError(error: unknown) { return { error }; }
  componentDidCatch(error: unknown) { console.error(`[${this.props.name || 'tool'}] crashed:`, error); }
  close = () => { this.setState({ error: null }); this.props.onClose?.(); };

  render() {
    if (this.state.error != null) {
      const msg = (this.state.error as any)?.message || String(this.state.error);
      return (
        <div className="modal-overlay" onClick={this.close}>
          <div className="modal-content" style={{ width: 440 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{this.props.name || 'This tool'} hit an error</h2>
              <button className="close-btn" onClick={this.close}>×</button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-muted)', marginTop: 0 }}>
                Your document and the editor are safe — nothing was lost. Close this and keep working.
              </p>
              <pre style={{ maxHeight: 160, overflow: 'auto', fontSize: 12, background: 'rgba(0,0,0,0.25)', padding: 10, borderRadius: 6, whiteSpace: 'pre-wrap' }}>{msg}</pre>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={this.close}>Close</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
