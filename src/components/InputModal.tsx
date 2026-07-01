import { useState } from 'react';

export type Field = {
  key: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'textarea' | 'checkbox' | 'select';
  default?: string;
  options?: string[];        // datalist suggestions (text) or option list (select)
  hint?: string;
};

export type InputModalConfig = {
  title: string;
  fields: Field[];
  submitLabel?: string;
  onSubmit: (values: Record<string, string>) => void;
};

export default function InputModal({ title, fields, submitLabel = 'Insert', onSubmit, onClose }: InputModalConfig & { onClose: () => void }) {
  const [values, setValues] = useState<Record<string, string>>(
    () => Object.fromEntries(fields.map(f => [f.key, f.default ?? '']))
  );

  const submit = () => { onSubmit(values); onClose(); };
  const set = (k: string, v: string) => setValues(prev => ({ ...prev, [k]: v }));
  const listId = (k: string) => `dl-${k}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '460px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {fields.map(f => f.type === 'checkbox' ? (
            <label className="form-check" key={f.key} style={{ marginTop: 2 }}>
              <input type="checkbox" checked={values[f.key] === 'true'} onChange={e => set(f.key, e.target.checked ? 'true' : 'false')} />
              {f.label}
            </label>
          ) : f.type === 'select' ? (
            <label className="form-field" key={f.key}>
              <span>{f.label}</span>
              <select value={values[f.key]} onChange={e => set(f.key, e.target.value)}>
                {(f.options || []).map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              {f.hint && <span className="form-hint" style={{ fontWeight: 400 }}>{f.hint}</span>}
            </label>
          ) : (
            <label className="form-field" key={f.key}>
              <span>{f.label}</span>
              {f.type === 'textarea' ? (
                <textarea
                  autoFocus={f === fields[0]}
                  value={values[f.key]}
                  placeholder={f.placeholder}
                  onChange={e => set(f.key, e.target.value)}
                />
              ) : (
                <>
                  <input
                    autoFocus={f === fields[0]}
                    type={f.type === 'number' ? 'number' : 'text'}
                    value={values[f.key]}
                    placeholder={f.placeholder}
                    list={f.options ? listId(f.key) : undefined}
                    onChange={e => set(f.key, e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') submit(); }}
                  />
                  {f.options && (
                    <datalist id={listId(f.key)}>
                      {f.options.map(o => <option key={o} value={o} />)}
                    </datalist>
                  )}
                </>
              )}
              {f.hint && <span className="form-hint" style={{ fontWeight: 400 }}>{f.hint}</span>}
            </label>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={submit}>{submitLabel}</button>
        </div>
      </div>
    </div>
  );
}
