import { useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Draw a maths/physics symbol with the mouse/trackpad and get the Typst code.
//
// Fully offline, no trained model. Each glyph is rendered and reduced two ways:
// (1) a blurred 32×32 ink map (area overlap), and (2) its 1-pixel *skeleton*
// (Zhang–Suen thinning) as a normalized point cloud. A drawing is matched with a
// blend of cosine similarity on (1) and the $P greedy-cloud recognizer on (2) —
// the skeleton/point-cloud path is the same idea Detexify uses, matching the
// centerline of your strokes to the centerline of the glyph.
// ---------------------------------------------------------------------------

type Pt = { x: number; y: number };

const SYMBOLS: { name: string; ch: string }[] = [
  // Greek (lower)
  { name: 'alpha', ch: 'α' }, { name: 'beta', ch: 'β' }, { name: 'gamma', ch: 'γ' },
  { name: 'delta', ch: 'δ' }, { name: 'epsilon', ch: 'ε' }, { name: 'zeta', ch: 'ζ' },
  { name: 'eta', ch: 'η' }, { name: 'theta', ch: 'θ' }, { name: 'kappa', ch: 'κ' },
  { name: 'lambda', ch: 'λ' }, { name: 'mu', ch: 'μ' }, { name: 'nu', ch: 'ν' },
  { name: 'xi', ch: 'ξ' }, { name: 'pi', ch: 'π' }, { name: 'rho', ch: 'ρ' },
  { name: 'sigma', ch: 'σ' }, { name: 'tau', ch: 'τ' }, { name: 'phi', ch: 'φ' },
  { name: 'chi', ch: 'χ' }, { name: 'psi', ch: 'ψ' }, { name: 'omega', ch: 'ω' },
  // Greek (upper)
  { name: 'Gamma', ch: 'Γ' }, { name: 'Delta', ch: 'Δ' }, { name: 'Theta', ch: 'Θ' },
  { name: 'Lambda', ch: 'Λ' }, { name: 'Xi', ch: 'Ξ' }, { name: 'Pi', ch: 'Π' },
  { name: 'Sigma', ch: 'Σ' }, { name: 'Phi', ch: 'Φ' }, { name: 'Psi', ch: 'Ψ' },
  { name: 'Omega', ch: 'Ω' },
  // Operators / calculus
  { name: 'integral', ch: '∫' }, { name: 'integral.double', ch: '∬' },
  { name: 'integral.cont', ch: '∮' }, { name: 'sum', ch: '∑' }, { name: 'product', ch: '∏' },
  { name: 'partial', ch: '∂' }, { name: 'nabla', ch: '∇' }, { name: 'sqrt(x)', ch: '√' },
  { name: 'infinity', ch: '∞' }, { name: 'plus.minus', ch: '±' }, { name: 'minus.plus', ch: '∓' },
  { name: 'times', ch: '×' }, { name: 'div', ch: '÷' }, { name: 'dot', ch: '⋅' },
  { name: 'plus.circle', ch: '⊕' }, { name: 'times.circle', ch: '⊗' },
  // Relations
  { name: 'lt.eq', ch: '≤' }, { name: 'gt.eq', ch: '≥' }, { name: 'eq.not', ch: '≠' },
  { name: 'approx', ch: '≈' }, { name: 'equiv', ch: '≡' }, { name: 'prop', ch: '∝' },
  { name: 'tilde.op', ch: '∼' },
  // Arrows
  { name: 'arrow.r', ch: '→' }, { name: 'arrow.l', ch: '←' }, { name: 'arrow.t', ch: '↑' },
  { name: 'arrow.b', ch: '↓' }, { name: 'arrow.l.r', ch: '↔' }, { name: 'arrow.r.double', ch: '⇒' },
  { name: 'arrow.l.double', ch: '⇐' }, { name: 'arrow.r.bar', ch: '↦' },
  // Sets / logic
  { name: 'in', ch: '∈' }, { name: 'in.not', ch: '∉' }, { name: 'subset', ch: '⊂' },
  { name: 'subset.eq', ch: '⊆' }, { name: 'union', ch: '∪' }, { name: 'sect', ch: '∩' },
  { name: 'emptyset', ch: '∅' }, { name: 'forall', ch: '∀' }, { name: 'exists', ch: '∃' },
  { name: 'therefore', ch: '∴' }, { name: 'angle', ch: '∠' }, { name: 'degree', ch: '°' },
  // Blackboard
  { name: 'RR', ch: 'ℝ' }, { name: 'CC', ch: 'ℂ' }, { name: 'ZZ', ch: 'ℤ' },
  { name: 'NN', ch: 'ℕ' }, { name: 'QQ', ch: 'ℚ' },
  // Misc
  { name: 'dagger', ch: '†' }, { name: 'hbar', ch: 'ℏ' }, { name: 'star', ch: '⋆' },
];

const GRID = 32;

// One 3×3 Gaussian pass over a GRID×GRID map.
function blur(v: Float32Array): Float32Array {
  const out = new Float32Array(v.length);
  for (let y = 0; y < GRID; y++) for (let x = 0; x < GRID; x++) {
    let s = 0, w = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= GRID || ny >= GRID) continue;
      const k = (dx === 0 ? 2 : 1) * (dy === 0 ? 2 : 1);
      s += v[ny * GRID + nx] * k; w += k;
    }
    out[y * GRID + x] = s / w;
  }
  return out;
}

// Crop a canvas to its ink, centre it (aspect-preserved) in a GRID×GRID box,
// blur, and L2-normalize into a feature vector.
function toVector(src: HTMLCanvasElement): Float32Array {
  const sctx = src.getContext('2d', { willReadFrequently: true })!;
  const W = src.width, H = src.height;
  const d = sctx.getImageData(0, 0, W, H).data;
  let minX = W, minY = H, maxX = -1, maxY = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (d[(y * W + x) * 4 + 3] > 40) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
  }
  const g = document.createElement('canvas'); g.width = GRID; g.height = GRID;
  const gctx = g.getContext('2d', { willReadFrequently: true })!;
  if (maxX >= minX) {
    const bw = maxX - minX + 1, bh = maxY - minY + 1;
    const s = (GRID - 6) / Math.max(bw, bh);
    const dw = bw * s, dh = bh * s;
    gctx.imageSmoothingEnabled = true;
    gctx.drawImage(src, minX, minY, bw, bh, (GRID - dw) / 2, (GRID - dh) / 2, dw, dh);
  }
  const gd = gctx.getImageData(0, 0, GRID, GRID).data;
  let v: Float32Array = new Float32Array(GRID * GRID);
  for (let i = 0; i < GRID * GRID; i++) v[i] = gd[i * 4 + 3] / 255;
  v = blur(blur(v));
  let n = 0; for (const x of v) n += x * x; n = Math.sqrt(n) || 1;
  for (let i = 0; i < v.length; i++) v[i] /= n;
  return v;
}

const cosine = (a: Float32Array, b: Float32Array) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };

// --- Skeleton + $P point-cloud matching (detexify-style stroke matching) -----
// The drawn strokes and each glyph's *centerline* (skeleton) are reduced to
// normalized point clouds and compared with the $P greedy-cloud recognizer,
// which is start/direction-invariant — so it matches a hand-drawn ∫/α/→ to the
// glyph's skeleton far better than area-overlap alone.
const CLOUD_N = 32;
const pdist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);

function normalizeCloud(pts: Pt[]): Pt[] {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of pts) { minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); }
  const s = Math.max(maxX - minX, maxY - minY) || 1;
  let cx = 0, cy = 0;
  const out = pts.map(p => { const q = { x: (p.x - minX) / s, y: (p.y - minY) / s }; cx += q.x; cy += q.y; return q; });
  cx /= out.length || 1; cy /= out.length || 1;
  return out.map(p => ({ x: p.x - cx, y: p.y - cy }));
}

// Farthest-point sample to exactly n points for even coverage.
function samplePoints(pts: Pt[], n: number): Pt[] {
  if (pts.length === 0) return [];
  if (pts.length <= n) { const o = pts.slice(); while (o.length < n) o.push(pts[o.length % pts.length]); return o; }
  const chosen = [pts[0]]; const d = pts.map(p => pdist(p, pts[0]));
  while (chosen.length < n) {
    let idx = 0, best = -1;
    for (let i = 0; i < pts.length; i++) if (d[i] > best) { best = d[i]; idx = i; }
    chosen.push(pts[idx]);
    for (let i = 0; i < pts.length; i++) { const dd = pdist(pts[i], pts[idx]); if (dd < d[i]) d[i] = dd; }
  }
  return chosen;
}

function cloudDistance(pts: Pt[], tmpl: Pt[], start: number): number {
  const n = pts.length; const matched = new Array(n).fill(false); let sum = 0, i = start;
  do {
    let min = Infinity, index = -1;
    for (let j = 0; j < n; j++) if (!matched[j]) { const dd = pdist(pts[i], tmpl[j]); if (dd < min) { min = dd; index = j; } }
    if (index >= 0) matched[index] = true;
    sum += (1 - ((i - start + n) % n) / n) * min;
    i = (i + 1) % n;
  } while (i !== start);
  return sum;
}
function greedyMatch(pts: Pt[], tmpl: Pt[]): number {
  const n = pts.length; const step = Math.max(1, Math.floor(Math.sqrt(n))); let min = Infinity;
  for (let i = 0; i < n; i += step) min = Math.min(min, cloudDistance(pts, tmpl, i), cloudDistance(tmpl, pts, i));
  return min;
}

// Zhang–Suen thinning to a 1-pixel skeleton, in place.
function thin(bin: Uint8Array, W: number, H: number) {
  const idx = (x: number, y: number) => y * W + x;
  let changed = true;
  while (changed) {
    changed = false;
    for (let step = 0; step < 2; step++) {
      const remove: number[] = [];
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) {
        if (!bin[idx(x, y)]) continue;
        const p = [bin[idx(x, y - 1)], bin[idx(x + 1, y - 1)], bin[idx(x + 1, y)], bin[idx(x + 1, y + 1)], bin[idx(x, y + 1)], bin[idx(x - 1, y + 1)], bin[idx(x - 1, y)], bin[idx(x - 1, y - 1)]];
        const B = p[0] + p[1] + p[2] + p[3] + p[4] + p[5] + p[6] + p[7];
        if (B < 2 || B > 6) continue;
        let A = 0; for (let k = 0; k < 8; k++) if (p[k] === 0 && p[(k + 1) % 8] === 1) A++;
        if (A !== 1) continue;
        if (step === 0) { if (p[0] * p[2] * p[4] !== 0 || p[2] * p[4] * p[6] !== 0) continue; }
        else { if (p[0] * p[2] * p[6] !== 0 || p[0] * p[4] * p[6] !== 0) continue; }
        remove.push(idx(x, y));
      }
      if (remove.length) { changed = true; for (const i of remove) bin[i] = 0; }
    }
  }
}

// Render a glyph (or reuse a stroke canvas), fit its ink to an S×S box, threshold,
// thin to a skeleton, and return the skeleton pixel points.
function skeletonPoints(src: HTMLCanvasElement): Pt[] {
  const S = 46;
  const sctx = src.getContext('2d', { willReadFrequently: true })!;
  const W = src.width, H = src.height;
  const d = sctx.getImageData(0, 0, W, H).data;
  let minX = W, minY = H, maxX = -1, maxY = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (d[(y * W + x) * 4 + 3] > 40) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
  if (maxX < minX) return [];
  const g = document.createElement('canvas'); g.width = S; g.height = S;
  const gctx = g.getContext('2d', { willReadFrequently: true })!;
  const bw = maxX - minX + 1, bh = maxY - minY + 1;
  const sc = (S - 6) / Math.max(bw, bh), dw = bw * sc, dh = bh * sc;
  gctx.imageSmoothingEnabled = true;
  gctx.drawImage(src, minX, minY, bw, bh, (S - dw) / 2, (S - dh) / 2, dw, dh);
  const gd = gctx.getImageData(0, 0, S, S).data;
  const bin = new Uint8Array(S * S);
  for (let i = 0; i < S * S; i++) bin[i] = gd[i * 4 + 3] > 60 ? 1 : 0;
  thin(bin, S, S);
  const pts: Pt[] = [];
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) if (bin[y * S + x]) pts.push({ x, y });
  return pts;
}

type Template = { name: string; ch: string; vec: Float32Array; cloud: Pt[] };

function buildTemplates(): Template[] {
  const S = 128;
  const cv = document.createElement('canvas'); cv.width = S; cv.height = S;
  const ctx = cv.getContext('2d', { willReadFrequently: true })!;
  const out: Template[] = [];
  for (const sym of SYMBOLS) {
    ctx.clearRect(0, 0, S, S);
    ctx.fillStyle = '#000'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `96px "STIX Two Math", "Cambria Math", "STIXGeneral", "Apple Symbols", "Segoe UI Symbol", serif`;
    ctx.fillText(sym.ch, S / 2, S / 2);
    const d = ctx.getImageData(0, 0, S, S).data;
    let ink = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 40) ink++;
    if (ink < 20) continue; // glyph unsupported by available fonts
    const sk = skeletonPoints(cv);
    if (sk.length < 5) continue;
    out.push({ name: sym.name, ch: sym.ch, vec: toVector(cv), cloud: samplePoints(normalizeCloud(sk), CLOUD_N) });
  }
  return out;
}

// Rasterize the drawn strokes (thin lines) into their own tight canvas.
function gestureCanvas(strokes: Pt[][]): HTMLCanvasElement | null {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, count = 0;
  for (const s of strokes) for (const p of s) { count++; minX = Math.min(minX, p.x); minY = Math.min(minY, p.y); maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); }
  if (count < 3) return null;
  const pad = 14;
  const W = Math.max(8, Math.ceil(maxX - minX + pad * 2)), H = Math.max(8, Math.ceil(maxY - minY + pad * 2));
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d')!;
  ctx.strokeStyle = '#000'; ctx.fillStyle = '#000';
  ctx.lineWidth = Math.max(3, Math.min(W, H) * 0.05);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  for (const s of strokes) {
    if (s.length < 2) { ctx.beginPath(); ctx.arc(s[0].x - minX + pad, s[0].y - minY + pad, ctx.lineWidth / 2, 0, 7); ctx.fill(); continue; }
    ctx.beginPath(); ctx.moveTo(s[0].x - minX + pad, s[0].y - minY + pad);
    for (let i = 1; i < s.length; i++) ctx.lineTo(s[i].x - minX + pad, s[i].y - minY + pad);
    ctx.stroke();
  }
  return cv;
}

export default function SymbolDraw({ onClose, onInsert }: { onClose: () => void; onInsert: (name: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const templatesRef = useRef<Template[] | null>(null);
  const strokesRef = useRef<Pt[][]>([]);
  const drawingRef = useRef(false);
  const [results, setResults] = useState<{ name: string; ch: string; score: number }[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => { templatesRef.current = buildTemplates(); setReady(true); }, 0);
    return () => clearTimeout(t);
  }, []);

  const ctx = () => canvasRef.current?.getContext('2d') || null;

  const redraw = () => {
    const c = canvasRef.current, g = ctx();
    if (!c || !g) return;
    g.clearRect(0, 0, c.width, c.height);
    g.strokeStyle = '#a78bfa'; g.lineWidth = 3; g.lineJoin = 'round'; g.lineCap = 'round';
    for (const s of strokesRef.current) {
      if (s.length < 2) continue;
      g.beginPath(); g.moveTo(s[0].x, s[0].y);
      for (let i = 1; i < s.length; i++) g.lineTo(s[i].x, s[i].y);
      g.stroke();
    }
  };

  const pos = (e: React.PointerEvent): Pt => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const down = (e: React.PointerEvent) => {
    e.preventDefault();
    drawingRef.current = true;
    strokesRef.current.push([pos(e)]);
    try { canvasRef.current?.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  };
  const move = (e: React.PointerEvent) => {
    if (!drawingRef.current) return;
    strokesRef.current[strokesRef.current.length - 1].push(pos(e));
    redraw();
  };
  const up = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    recognize();
  };

  const recognize = () => {
    const templates = templatesRef.current;
    if (!templates) return;
    const gc = gestureCanvas(strokesRef.current);
    if (!gc) { setResults([]); return; }
    // Bitmap signal (area overlap) + skeleton $P signal (stroke shape).
    const v = toVector(gc);
    const raw = strokesRef.current.flat();
    const gcloud = raw.length >= CLOUD_N ? samplePoints(normalizeCloud(raw), CLOUD_N) : samplePoints(normalizeCloud(skeletonPoints(gc)), CLOUD_N);
    const scored = templates.map(t => {
      const simB = cosine(v, t.vec);                 // 0..1, higher better
      const simP = 1 / (1 + greedyMatch(gcloud, t.cloud)); // ~0..1, higher better
      return { name: t.name, ch: t.ch, score: 0.55 * simP + 0.45 * simB };
    });
    scored.sort((a, b) => b.score - a.score);
    setResults(scored.slice(0, 10));
  };

  const clear = () => { strokesRef.current = []; setResults([]); redraw(); };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '640px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Draw a Symbol → Typst <span style={{ fontSize: 11, fontWeight: 600, color: '#fbbf24', border: '1px solid #fbbf24', borderRadius: 4, padding: '1px 6px', marginLeft: 6, verticalAlign: 'middle' }}>experimental</span></h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-hint">Draw a maths/physics symbol below — best-guess matches appear on the right. Click one to insert its Typst code. It's a rough recognizer, so it shows several candidates; multi-stroke symbols are fine.</div>
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ flex: '0 0 auto' }}>
              <canvas
                ref={canvasRef}
                width={280}
                height={280}
                style={{ background: '#0f172a', border: '1px solid var(--border-color)', borderRadius: 8, touchAction: 'none', cursor: 'crosshair' }}
                onPointerDown={down}
                onPointerMove={move}
                onPointerUp={up}
                onPointerLeave={up}
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="btn-ghost" onClick={clear}>Clear</button>
                {!ready && <span className="form-hint" style={{ margin: 0 }}>Preparing recognizer…</span>}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span className="form-field" style={{ marginBottom: 6 }}><span>Best matches</span></span>
              {results.length === 0 ? (
                <div className="form-hint" style={{ marginTop: 4 }}>No guesses yet — draw something.</div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {results.map((r, i) => (
                    <button
                      key={r.name}
                      className={i === 0 ? 'btn-primary' : 'btn-ghost'}
                      onClick={() => onInsert(r.name)}
                      title={`Insert  ${r.name}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px' }}
                    >
                      <span style={{ fontSize: 22, lineHeight: 1 }}>{r.ch}</span>
                      <code style={{ fontSize: 12 }}>{r.name}</code>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
