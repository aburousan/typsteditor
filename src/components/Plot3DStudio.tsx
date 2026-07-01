import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Translate a numpy-style expression (X, Y, np.*) into JS for the live preview.
function toJs(expr: string): string {
  return expr
    .replace(/np\./g, 'Math.')
    .replace(/\bX\b/g, 'x')
    .replace(/\bY\b/g, 'y');
}

export default function Plot3DStudio({ onClose, onGenerate }: { onClose: () => void, onGenerate: (code: string) => void }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rebuildRef = useRef<() => void>(() => {});
  const [expr, setExpr] = useState('np.sin(np.sqrt(X**2 + Y**2))');
  const [range, setRange] = useState('5');
  const [err, setErr] = useState('');

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const W = mount.clientWidth || 640, H = mount.clientHeight || 360;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0f172a');
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
    cameraRef.current = camera;
    camera.up.set(0, 0, 1);                 // z-up, matching matplotlib
    camera.position.set(9, -9, 7);

    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true }); }
    catch { setErr('WebGL is not available in this browser.'); return; }
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const dl = new THREE.DirectionalLight(0xffffff, 0.9); dl.position.set(6, -6, 12); scene.add(dl);
    scene.add(new THREE.AxesHelper(6));

    let mesh: THREE.Mesh | null = null;
    const build = () => {
      let f: (x: number, y: number) => number;
      try { f = new Function('x', 'y', 'return (' + toJs(expr) + ')') as any; if (!isFinite(f(0.3, 0.4))) throw 0; setErr(''); }
      catch { setErr('Invalid expression — use X, Y and np.* (e.g. np.sin(X)*np.cos(Y)).'); return; }
      if (mesh) { scene.remove(mesh); (mesh.geometry as THREE.BufferGeometry).dispose(); }
      const R = Math.abs(parseFloat(range)) || 5, N = 60;
      const geo = new THREE.PlaneGeometry(2 * R, 2 * R, N, N);
      const pos = geo.attributes.position;
      const zs: number[] = []; let zmin = Infinity, zmax = -Infinity;
      for (let i = 0; i < pos.count; i++) {
        let z = f(pos.getX(i), pos.getY(i)); if (!isFinite(z)) z = 0;
        zs.push(z); pos.setZ(i, z); zmin = Math.min(zmin, z); zmax = Math.max(zmax, z);
      }
      geo.computeVertexNormals();
      const colors = new Float32Array(pos.count * 3);
      for (let i = 0; i < pos.count; i++) {
        const t = (zs[i] - zmin) / ((zmax - zmin) || 1);
        const c = new THREE.Color().setHSL((1 - t) * 0.72, 0.75, 0.5);
        colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
      }
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.55 }));
      const wire = new THREE.LineSegments(new THREE.WireframeGeometry(geo), new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.12 }));
      mesh.add(wire);
      scene.add(mesh);
    };
    rebuildRef.current = build;
    build();

    let raf = 0;
    const loop = () => { controls.update(); renderer.render(scene, camera); raf = requestAnimationFrame(loop); };
    loop();
    const onResize = () => { const w = mount.clientWidth, h = mount.clientHeight; if (!w || !h) return; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h); };
    const ro = new ResizeObserver(onResize); ro.observe(mount);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); controls.dispose(); renderer.dispose(); try { mount.removeChild(renderer.domElement); } catch {} };
  }, []);

  useEffect(() => { rebuildRef.current(); }, [expr, range]);

  const insert = () => {
    const cam = cameraRef.current;
    if (!cam) return;
    const p = cam.position, r = Math.hypot(p.x, p.y, p.z) || 1;
    const elev = Math.round(Math.asin(p.z / r) * 180 / Math.PI);
    const azim = Math.round(Math.atan2(p.y, p.x) * 180 / Math.PI);
    const R = Math.abs(parseFloat(range)) || 5;
    const code =
`import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-${R}, ${R}, 80)
y = np.linspace(-${R}, ${R}, 80)
X, Y = np.meshgrid(x, y)
Z = ${expr}

fig = plt.figure(figsize=(6, 5))
ax = fig.add_subplot(111, projection="3d")
ax.plot_surface(X, Y, Z, cmap="viridis", edgecolor="none")
ax.view_init(elev=${elev}, azim=${azim})   # the view you picked
ax.set_xlabel("x"); ax.set_ylabel("y"); ax.set_zlabel("z")
plt.tight_layout()
plt.savefig("surface3d.png", dpi=150, bbox_inches="tight")
print("saved surface3d.png")`;
    onGenerate(code);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ width: '720px', height: '84vh' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>3D Plot Studio</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <label className="form-field" style={{ flex: 2 }}><span>z = f(x, y) &nbsp;(numpy — use X, Y and np.*)</span>
              <input value={expr} onChange={e => setExpr(e.target.value)} placeholder="np.sin(np.sqrt(X**2 + Y**2))" />
            </label>
            <label className="form-field" style={{ maxWidth: 110 }}><span>Range ±</span>
              <input value={range} onChange={e => setRange(e.target.value)} />
            </label>
          </div>
          {err && <div className="form-hint" style={{ color: '#fca5a5' }}>{err}</div>}
          <div ref={mountRef} style={{ flex: 1, minHeight: 320, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border-color)' }} />
          <div className="form-hint">Drag to rotate · scroll to zoom. “Use this view” generates a matplotlib surface at your chosen angle (run it in the next dialog to insert the figure — needs Python).</div>
        </div>
        <div className="modal-footer">
          <button className="btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={insert}>Use this view → Python plot</button>
        </div>
      </div>
    </div>
  );
}
