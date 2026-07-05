import { memo, useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { TextLayer } from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href;

const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
const PRESETS = [50, 75, 90, 100, 110, 125, 150, 200, 300];

// memo: the app re-renders on every keystroke; the preview only cares about `url`
// (and onWordClick is a stable useCallback), so skip those renders entirely.
function PdfPreview({ url, onWordClick, onWordCount }: { url: string, onWordClick: (word: string, context?: string) => void, onWordCount?: (n: number) => void }) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const pagesRef = useRef<HTMLDivElement | null>(null);
  const renderTokenRef = useRef(0);
  const docCache = useRef<{ url: string | null; doc: any; naturalW: number }>({ url: null, doc: null, naturalW: 595 });
  const liveWRef = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // zoomFactor is relative to fit-width: 1 = fit, 1.2 = 120% of fit.
  const [zoomFactor, setZoomFactor] = useState(1);
  const [rasterTick, setRasterTick] = useState(0);
  const [dark, setDark] = useState(false);

  const displayScale = (w: number, z: number) => Math.max(0.15, Math.min(((w - 28) / docCache.current.naturalW) * z, 8));

  // Instantly resize the already-rendered pages via CSS width (layout stays
  // correct, the crisp bitmap just scales) — no re-rasterisation, so it's snappy.
  const applyWidths = (w: number, z: number) => {
    const pages = pagesRef.current;
    if (!pages || !docCache.current.naturalW) return;
    const displayW = docCache.current.naturalW * displayScale(w, z);
    for (const el of Array.from(pages.children) as HTMLElement[]) el.style.width = `${displayW}px`;
  };

  const scheduleRaster = () => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setRasterTick(t => t + 1), 160);
  };

  // Track pane width: apply instant CSS width, debounce the crisp re-render.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      if (Math.abs(w - liveWRef.current) < 1) return;
      liveWRef.current = w;
      applyWidths(w, zoomFactor);
      scheduleRaster();
    });
    ro.observe(el);
    liveWRef.current = el.clientWidth;
    setRasterTick(t => t + 1);
    return () => { clearTimeout(debounceRef.current); ro.disconnect(); };
  }, []);

  const setZoom = (z: number) => { setZoomFactor(z); applyWidths(liveWRef.current, z); scheduleRaster(); };

  // Rasterise (crisp) at the current width/zoom. Runs on load, resize-settle, zoom.
  useEffect(() => {
    const pagesEl = pagesRef.current;
    const scrollEl = scrollRef.current;
    const w = liveWRef.current;
    if (!url || !pagesEl || !scrollEl || !w) return;
    const token = ++renderTokenRef.current;
    const prevScroll = scrollEl.scrollTop;

    (async () => {
      let cache = docCache.current;
      if (cache.url !== url || !cache.doc) {
        let loaded;
        try { loaded = await pdfjsLib.getDocument(url).promise; } catch { return; }
        if (token !== renderTokenRef.current) { try { loaded.destroy(); } catch {} return; }
        const prevDoc = docCache.current.doc;
        const pg = await loaded.getPage(1);
        docCache.current = { url, doc: loaded, naturalW: pg.getViewport({ scale: 1 }).width };
        // Free the previously-loaded PDF (parsed data + its worker transport) —
        // the document recompiles on every edit, so without this each compile
        // orphans a whole pdf.js document and the memory climbs steadily.
        if (prevDoc && prevDoc !== loaded) { try { prevDoc.destroy(); } catch {} }
        cache = docCache.current;
      }
      const dScale = displayScale(w, zoomFactor);
      const renderScale = Math.min(dScale * DPR, 5); // crisp bitmap, capped

      const frag = document.createDocumentFragment();
      for (let i = 1; i <= cache.doc.numPages; i++) {
        const page = await cache.doc.getPage(i);
        if (token !== renderTokenRef.current) return;
        const rvp = page.getViewport({ scale: renderScale });

        const pageDiv = document.createElement('div');
        pageDiv.className = 'pdf-page';
        pageDiv.style.width = `${cache.naturalW * dScale}px`;   // display (CSS) width

        const canvas = document.createElement('canvas');
        canvas.width = rvp.width; canvas.height = rvp.height;    // high-res bitmap
        canvas.style.width = '100%'; canvas.style.height = 'auto';
        pageDiv.appendChild(canvas);

        const textDiv = document.createElement('div');
        textDiv.className = 'textLayer';
        textDiv.style.setProperty('--scale-factor', String(dScale));
        pageDiv.appendChild(textDiv);

        frag.appendChild(pageDiv);
        await page.render({ canvasContext: canvas.getContext('2d')!, viewport: rvp }).promise;
        if (token !== renderTokenRef.current) return;
        // Text layer at DISPLAY scale so its spans line up with the CSS-sized canvas.
        const tl = new TextLayer({ textContentSource: page.streamTextContent(), container: textDiv, viewport: page.getViewport({ scale: dScale }) });
        await tl.render();
      }
      if (token !== renderTokenRef.current) return;
      pagesEl.replaceChildren(frag);
      scrollEl.scrollTop = prevScroll;
    })();
  }, [url, rasterTick, zoomFactor]);

  // Word count from the RENDERED document (the PDF's text), not the Typst source —
  // so `#set`, `#import`, function names and markup syntax don't inflate it. Runs
  // once per compile (keyed on url), independent of zoom/resize re-rasterisation.
  useEffect(() => {
    if (!url || !onWordCount) return;
    let cancelled = false;
    (async () => {
      let doc: any = null, temp = false;
      try {
        if (docCache.current.url === url && docCache.current.doc) {
          doc = docCache.current.doc;                       // reuse the shared doc
        } else {
          doc = await pdfjsLib.getDocument(url).promise;    // our own copy…
          temp = true;                                      // …so we must destroy it
        }
        let text = '';
        for (let i = 1; i <= doc.numPages; i++) {
          if (cancelled) break;
          const tc = await doc.getPage(i).then((p: any) => p.getTextContent());
          for (const it of tc.items) {
            if ('str' in it) text += it.str;
            // pdf.js emits spacing as its own runs; add a break on end-of-line.
            if (it.hasEOL) text += '\n';
          }
          text += '\n';
        }
        if (!cancelled) onWordCount((text.match(/[^\s]+/g) || []).length);
      } catch { /* leave the last known count in place */ }
      finally { if (temp && doc) { try { await doc.destroy(); } catch {} } }
    })();
    return () => { cancelled = true; };
  }, [url, onWordCount]);

  // Destroy the last-held PDF document when the preview unmounts (workspace
  // switch, app close) so it doesn't linger with its worker transport.
  useEffect(() => () => {
    const d = docCache.current.doc;
    docCache.current = { url: null, doc: null, naturalW: docCache.current.naturalW };
    if (d) { try { d.destroy(); } catch {} }
  }, []);

  const handleDblClick = () => {
    const sel = window.getSelection();
    const word = (sel?.toString() ?? '').trim();
    if (!word) return;
    // Gather nearby words (the clicked text span plus its neighbours) so the
    // editor can disambiguate a word that appears several times in the source.
    let context = '';
    const node = sel?.anchorNode;
    const span = (node && (node.nodeType === 3 ? node.parentElement : (node as HTMLElement))) as HTMLElement | null;
    if (span && span.closest('.textLayer')) {
      const prev = span.previousElementSibling?.textContent || '';
      const next = span.nextElementSibling?.textContent || '';
      context = `${prev} ${span.textContent || ''} ${next}`.replace(/\s+/g, ' ').trim();
    }
    onWordClick(word, context);
  };

  const isFit = Math.abs(zoomFactor - 1) < 0.001;
  const curPct = Math.round(zoomFactor * 100);
  const selValue = isFit ? 'fit' : String(curPct);

  return (
    <div className={`pdf-wrap ${dark ? 'pdf-dark' : ''}`}>
      <div className="pdf-toolbar">
        <button className={`pdf-btn ${dark ? 'active' : ''}`} onClick={() => setDark(d => !d)} title="Toggle dark PDF" style={{ marginRight: 'auto' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
        <button className="pdf-btn" onClick={() => setZoom(Math.max(zoomFactor / 1.15, 0.25))} title="Zoom out">−</button>
        <select className="pdf-zoom-select" value={selValue} title="Zoom (100% = fit width)"
          onChange={e => setZoom(e.target.value === 'fit' ? 1 : Number(e.target.value) / 100)}>
          <option value="fit">Fit</option>
          {!PRESETS.includes(curPct) && !isFit && <option value={String(curPct)}>{curPct}%</option>}
          {PRESETS.map(p => <option key={p} value={String(p)}>{p}%</option>)}
        </select>
        <button className="pdf-btn" onClick={() => setZoom(Math.min(zoomFactor * 1.15, 8))} title="Zoom in">+</button>
        <button className={`pdf-btn pdf-btn-icon ${isFit ? 'active' : ''}`} onClick={() => setZoom(1)} title="Fit to page width">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9V5a1 1 0 0 1 1-1h4"></path><path d="M20 9V5a1 1 0 0 0-1-1h-4"></path><path d="M4 15v4a1 1 0 0 0 1 1h4"></path><path d="M20 15v4a1 1 0 0 1-1 1h-4"></path></svg>
        </button>
      </div>
      <div className="pdf-scroll" ref={scrollRef} onDoubleClick={handleDblClick} title="Double-click a word to jump to it in the editor">
        <div className="pdf-pages" ref={pagesRef} />
      </div>
    </div>
  );
}

export default memo(PdfPreview);
