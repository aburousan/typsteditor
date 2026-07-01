import { useState } from 'react';

type Sym = { char: string; code: string };

const CATEGORIES: Record<string, Sym[]> = {
  Greek: [
    { char: 'α', code: 'alpha' }, { char: 'β', code: 'beta' }, { char: 'γ', code: 'gamma' }, { char: 'δ', code: 'delta' },
    { char: 'ε', code: 'epsilon' }, { char: 'ζ', code: 'zeta' }, { char: 'η', code: 'eta' }, { char: 'θ', code: 'theta' },
    { char: 'κ', code: 'kappa' }, { char: 'λ', code: 'lambda' }, { char: 'μ', code: 'mu' }, { char: 'ν', code: 'nu' },
    { char: 'ξ', code: 'xi' }, { char: 'π', code: 'pi' }, { char: 'ρ', code: 'rho' }, { char: 'σ', code: 'sigma' },
    { char: 'τ', code: 'tau' }, { char: 'φ', code: 'phi' }, { char: 'χ', code: 'chi' }, { char: 'ψ', code: 'psi' }, { char: 'ω', code: 'omega' },
    { char: 'Γ', code: 'Gamma' }, { char: 'Δ', code: 'Delta' }, { char: 'Θ', code: 'Theta' }, { char: 'Λ', code: 'Lambda' },
    { char: 'Π', code: 'Pi' }, { char: 'Σ', code: 'Sigma' }, { char: 'Φ', code: 'Phi' }, { char: 'Ψ', code: 'Psi' }, { char: 'Ω', code: 'Omega' },
  ],
  Operators: [
    { char: '±', code: 'plus.minus' }, { char: '∓', code: 'minus.plus' }, { char: '×', code: 'times' }, { char: '÷', code: 'div' },
    { char: '⋅', code: 'dot.c' }, { char: '∗', code: 'ast' }, { char: '∘', code: 'compose' }, { char: '≈', code: 'approx' },
    { char: '≠', code: 'eq.not' }, { char: '≤', code: 'lt.eq' }, { char: '≥', code: 'gt.eq' }, { char: '≪', code: 'lt.double' },
    { char: '≫', code: 'gt.double' }, { char: '∝', code: 'prop' }, { char: '≡', code: 'equiv' }, { char: '∼', code: 'tilde.op' },
  ],
  Calculus: [
    { char: '∂', code: 'partial' }, { char: '∫', code: 'integral' }, { char: '∬', code: 'integral.double' }, { char: '∭', code: 'integral.triple' },
    { char: '∮', code: 'integral.cont' }, { char: '∑', code: 'sum' }, { char: '∏', code: 'product' }, { char: '∇', code: 'nabla' },
    { char: 'lim', code: 'lim' }, { char: '√', code: 'sqrt()' }, { char: '∞', code: 'infinity' },
  ],
  Physics: [
    { char: 'd/dx', code: 'dv(f, x)' }, { char: '∂/∂x', code: 'pdv(f, x)' }, { char: '∂²/∂x²', code: 'pdv(f, x, 2)' },
    { char: '∇f', code: 'grad phi' }, { char: '∇·', code: 'div va(F)' }, { char: '∇×', code: 'curl va(F)' },
    { char: '⟨ψ|', code: 'bra(psi)' }, { char: '|ψ⟩', code: 'ket(psi)' }, { char: '⟨a|b⟩', code: 'innerproduct(a, b)' },
    { char: '⟨H⟩', code: 'expval(H)' }, { char: '|x|', code: 'abs(x)' }, { char: '‖v‖', code: 'norm(v)' },
    { char: 'Re', code: 'Re(z)' }, { char: 'Im', code: 'Im(z)' },
  ],
  Decorations: [
    { char: 'x̂', code: 'hat(x)' }, { char: 'x̄', code: 'bar(x)' }, { char: 'v⃗', code: 'va(v)' }, { char: 'ẋ', code: 'dot(x)' },
    { char: 'ẍ', code: 'dot.double(x)' }, { char: 'x̃', code: 'tilde(x)' }, { char: 'x⃗', code: 'arrow(x)' }, { char: 'vec', code: 'vec(a, b)' },
    { char: 'mat', code: 'mat(1, 0; 0, 1)' },
  ],
  'Sets & Logic': [
    { char: '∈', code: 'in' }, { char: '∉', code: 'in.not' }, { char: '⊂', code: 'subset' }, { char: '⊆', code: 'subset.eq' },
    { char: '∪', code: 'union' }, { char: '∩', code: 'sect' }, { char: '∀', code: 'forall' }, { char: '∃', code: 'exists' },
    { char: '∅', code: 'emptyset' }, { char: '⇒', code: 'arrow.r.double' }, { char: '⇔', code: 'arrow.l.r.double' },
    { char: '→', code: 'arrow.r' }, { char: '∧', code: 'and' }, { char: '∨', code: 'or' }, { char: '¬', code: 'not' },
  ],
};

const CATS = Object.keys(CATEGORIES);

export default function SymbolPicker({ onClose, onInsert }: { onClose: () => void, onInsert: (code: string) => void }) {
  const [cat, setCat] = useState(CATS[0]);
  const [search, setSearch] = useState('');

  const all = search
    ? Object.values(CATEGORIES).flat().filter(s => s.code.toLowerCase().includes(search.toLowerCase()))
    : CATEGORIES[cat];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '480px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Math &amp; Physics Symbols</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <input type="text" placeholder="Search all symbols…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 11px', background: 'var(--bg-color)', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '6px' }} />

          {!search && (
            <div className="seg" style={{ flexWrap: 'wrap' }}>
              {CATS.map(c => (
                <button key={c} className={cat === c ? 'active' : ''} onClick={() => setCat(c)} style={{ flex: 'none', padding: '6px 10px' }}>{c}</button>
              ))}
            </div>
          )}

          <div className="symbols-grid">
            {all.map((s, i) => (
              <button key={i} className="symbol-btn" onClick={() => onInsert(s.code)} title={`Insert ${s.code}`}>
                <span className="sym-char">{s.char}</span>
                <span className="sym-code">{s.code}</span>
              </button>
            ))}
          </div>
          <div className="form-hint">Inserts the Typst code at the cursor — use inside <code>$ … $</code>. Physics commands need the <code>physica</code> package (already imported).</div>
        </div>
      </div>
    </div>
  );
}
