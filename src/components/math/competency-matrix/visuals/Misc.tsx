import React from 'react';

// ============ Table ============
export function TableViz({ caption, headers = [], rows = [] }) {
  return (
    <table className="viz-table">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

// ============ Frequency table ============
export function FrequencyTable({ caption, headers, rows, categories = [], counts = [] }) {
  // Supports two formats:
  //  A) { caption, headers, rows: [[label, count], ...] }
  //  B) { caption, categories: [...], counts: [...] }
  const cats = rows ? rows.map((r) => r[0]) : categories;
  const rawCnts = rows ? rows.map((r) => r[1]) : counts;
  const cnts = rawCnts.map((v) => {
    if (typeof v === 'number') return v;
    const n = Number(v);
    return Number.isFinite(n) ? n : v; // keep original (e.g. '?') if not numeric
  });
  const hdr = headers || ['Kategória', 'Gyakoriság'];
  const total = cnts.reduce((a, b) => a + (typeof b === 'number' ? b : 0), 0);
  return (
    <table className="viz-table">
      {caption && <caption>{caption}</caption>}
      <thead><tr>{hdr.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
      <tbody>
        {cats.map((c, i) => (
          <tr key={i}><td>{c}</td><td>{cnts[i]}</td></tr>
        ))}
        <tr style={{ background: '#f1f5f9', fontWeight: 600 }}>
          <td>Összesen</td><td>{total}</td>
        </tr>
      </tbody>
    </table>
  );
}

// ============ Sequence ============
export function Sequence({ elements = [] }) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
      {elements.map((e, i) => (
        <div key={i} style={{
          width: 56, height: 56,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 700,
          border: e === '?' ? '2.5px dashed #ef4444' : '2px solid #1e40af',
          borderRadius: 10,
          background: e === '?' ? '#fef2f2' : '#dbeafe',
          color: e === '?' ? '#ef4444' : '#1e40af',
        }}>
          {e}
        </div>
      ))}
    </div>
  );
}

// ============ Pictogram ============
export function Pictogram({ items = [] }) {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
      {items.map((it, i) => (
        <div key={i} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          padding: '12px 20px',
          background: it.color || '#f1f5f9',
          borderRadius: 12, minWidth: 120,
        }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a' }}>
            {it.count}
          </div>
          <div style={{ fontSize: 13, color: '#475569' }}>
            {it.label} {it.unit && <span>({it.unit})</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============ Price tag ============
// Supports two shapes:
//   A) { original, discountPercent, currency }   — single product with % discount
//   B) { items: [{label, price}], currency }     — a list of price-label lines
export function PriceTag({ original, discountPercent, currency = 'Ft', items }) {
  if (Array.isArray(items)) {
    return (
      <div style={{
        padding: 16, background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
        borderRadius: 14, maxWidth: 320, minWidth: 240,
      }}>
        <div style={{ fontSize: 11, color: '#78350f', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>
          Akció
        </div>
        {items.map((it, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '6px 0', borderBottom: i < items.length - 1 ? '1px dashed #b45309' : 'none',
            color: '#7c2d12', fontSize: 14,
          }}>
            <span>{it.label}</span>
            <strong>{it.price}</strong>
          </div>
        ))}
      </div>
    );
  }
  if (original == null || discountPercent == null) {
    return <div style={{ padding: 12, color: '#b45309' }}>[PriceTag — hiányzó adat]</div>;
  }
  const after = original * (1 - discountPercent / 100);
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 4, padding: 20, background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
      borderRadius: 14, maxWidth: 280,
    }}>
      <div style={{ fontSize: 11, color: '#78350f', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AKCIÓ</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: '#7f1d1d' }}>-{discountPercent}%</div>
      <div style={{ fontSize: 14, color: '#92400e', textDecoration: 'line-through' }}>
        {Number(original).toLocaleString('hu-HU')} {currency}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#14532d' }}>
        {Math.round(after).toLocaleString('hu-HU')} {currency}
      </div>
    </div>
  );
}

// ============ Pool ============
export function Pool({ volumeM3, flowLmin }) {
  return (
    <div style={{ textAlign: 'center', padding: 12 }}>
      <svg viewBox="0 0 260 140" width="260" height="140">
        <rect x="20" y="40" width="220" height="80" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" rx="4"/>
        <rect x="20" y="40" width="220" height="50" fill="#60a5fa" opacity="0.4"/>
        <text x="130" y="74" fontSize="14" textAnchor="middle" fontWeight="700" fill="#1e3a8a">{volumeM3} m³</text>
        <rect x="6" y="20" width="8" height="24" fill="#64748b"/>
        <circle cx="10" cy="32" r="6" fill="#94a3b8"/>
        <path d="M 14 34 Q 30 30 40 44 Q 44 50 40 54 Q 30 54 14 40 Z" fill="#3b82f6"/>
        <text x="60" y="28" fontSize="11" fill="#334155">{flowLmin} L/perc</text>
      </svg>
    </div>
  );
}

// ============ Recipe ============
export function Recipe({ servingsOriginal, servingsTarget, ingredients = [], highlight }) {
  return (
    <div style={{
      padding: 16, background: '#fff7ed', borderRadius: 10, border: '1px solid #fdba74',
      maxWidth: 420, width: '100%',
    }}>
      <div style={{ fontSize: 13, color: '#9a3412', marginBottom: 8, fontWeight: 600 }}>
        Recept — {servingsOriginal} főre {servingsTarget ? `→ ${servingsTarget} fő` : ''}
      </div>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {ingredients.map((ing, i) => (
          <li key={i} style={{
            padding: '4px 0',
            fontWeight: ing.name === highlight ? 700 : 500,
            color: ing.name === highlight ? '#9a3412' : '#1f2937',
          }}>
            {ing.name}: <strong>{ing.amount} {ing.unit}</strong>
            {ing.name === highlight && ' ⭐'}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============ Formula display ============
export function Formula({ formula, variables = [], example }) {
  return (
    <div style={{
      padding: 16, background: '#f0f9ff', borderRadius: 10,
      border: '1px solid #7dd3fc', width: '100%', maxWidth: 420,
    }}>
      <div style={{
        fontSize: 20, fontFamily: 'ui-monospace, monospace',
        textAlign: 'center', padding: '8px 0', color: '#0c4a6e', fontWeight: 600,
      }}>{formula}</div>
      {variables.length > 0 && (
        <div style={{ marginTop: 10, fontSize: 13, color: '#334155' }}>
          {variables.map((v, i) => (
            <div key={i}><strong>{v.name}</strong>: {v.desc}</div>
          ))}
        </div>
      )}
      {example && (
        <div style={{ marginTop: 10, fontSize: 13, color: '#0c4a6e' }}>
          <strong>Példa:</strong> {Object.entries(example).map(([k,v]) => `${k} = ${v}`).join(', ')}
        </div>
      )}
    </div>
  );
}

// ============ Comparison ============
export function Comparison({ items = [] }) {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
      {items.map((it, i) => (
        <div key={i} style={{
          padding: 16, minWidth: 180,
          background: 'white', border: '2px solid #cbd5e1', borderRadius: 10,
        }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>{it.label}</div>
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: '#475569', marginBottom: 6 }}>
            {it.formula}
          </div>
          {it.result && (
            <div style={{ fontSize: 18, fontWeight: 700, color: '#2563eb' }}>{it.result}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============ Tile rows ============
export function TileRows({ rows }) {
  const s = 22;
  const list = Array.isArray(rows) ? rows : [];
  if (list.length === 0) {
    return <div style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>[TileRows — nincs adat]</div>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {list.map((r, i) => {
        const count = Number.isFinite(r?.count) ? Math.max(0, Math.min(100, r.count)) : 0;
        return (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 12, color: '#64748b', minWidth: 58 }}>{r?.label ?? `${i+1}. sor`}</div>
          <div style={{ display: 'flex', gap: 2 }}>
            {Array.from({ length: count }).map((_, k) => (
              <div key={k} style={{
                width: s, height: s, background: '#fbbf24', border: '1px solid #b45309',
              }}/>
            ))}
          </div>
          <div style={{ fontSize: 12, color: '#334155', marginLeft: 8 }}>({count} db)</div>
        </div>
        );
      })}
    </div>
  );
}

// ============ Tree diagram ============
// Supports TWO input shapes:
//   A) levels: [ ['A','B'], ['1','2','3'] ]             // plain arrays
//   B) levels: [ { label: 'Póló', branches: [...] }, ... ]
// The object form draws a level-label on the left.
export function TreeDiagram({ root = '', levels = [] }) {
  const colors = ['#2563eb', '#16a34a', '#f59e0b', '#ec4899'];

  // Normalize levels → { label?, branches: string[] }
  const L = levels.map((lvl) => {
    if (Array.isArray(lvl)) return { label: null, branches: lvl };
    return { label: lvl.label || null, branches: lvl.branches || [] };
  });

  const counts = L.map((l) => l.branches.length);
  const leaves = counts.reduce((a, b) => a * b, 1) || 1;
  const W = Math.max(360, leaves * 72);
  const levelLabelsShown = L.some((l) => l.label);
  const padL = levelLabelsShown ? 110 : 20;
  const H = 80 + L.length * 80;

  const rootNode = { label: root, x: padL + (W - padL) / 2, y: 32, level: -1, children: [] };
  const allNodes = [rootNode];

  function build(parents, level) {
    if (level >= L.length) return;
    const opts = L[level].branches;
    const newParents = [];
    parents.forEach((p, pi) => {
      const total = parents.length * opts.length;
      opts.forEach((opt, oi) => {
        const idx = pi * opts.length + oi;
        const x = padL + ((idx + 0.5) / total) * (W - padL);
        const y = 32 + (level + 1) * 80;
        const node = { label: opt, x, y, level, parent: p, children: [] };
        allNodes.push(node);
        p.children.push(node);
        newParents.push(node);
      });
    });
    build(newParents, level + 1);
  }
  build([rootNode], 0);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 640 }} role="img">
      {L.map((lvl, i) => lvl.label && (
        <text key={'ll'+i} x={padL - 12} y={32 + (i + 1) * 80 + 4}
              fontSize="12" fontWeight="700" textAnchor="end" fill="#64748b">
          {lvl.label}
        </text>
      ))}
      {allNodes.slice(1).map((n, i) => (
        <line key={'l'+i} x1={n.parent.x} y1={n.parent.y+12} x2={n.x} y2={n.y-12} stroke="#94a3b8" strokeWidth="1.5"/>
      ))}
      {allNodes.map((n, i) => (
        <g key={'n'+i}>
          <rect x={n.x-34} y={n.y-14} width="68" height="26" rx="6"
                fill={i === 0 ? '#1e293b' : (colors[(n.level >= 0 ? n.level : 0) % colors.length])}
                stroke="white" strokeWidth="1.5"/>
          <text x={n.x} y={n.y+5} fontSize="11" fontWeight="600" textAnchor="middle" fill="white">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

// ============ Venn diagram ============
// Supports: { sets: [{label, color}], regions: {onlyA, onlyB, both, neither}, universe }
//      or:  { sets: [{label, cx, cy, r, color}], labels: {onlyA, onlyB, both, none} }
export function Venn({ sets = [], regions, labels, universe }) {
  // Default coordinates (side-by-side)
  const defaultGeom = [
    { cx: 140, cy: 115, r: 70 },
    { cx: 220, cy: 115, r: 70 },
  ];
  const s = sets.map((set, i) => ({
    ...defaultGeom[i] || defaultGeom[0],
    ...set,
    color: set.color || ['#3b82f6', '#ef4444', '#16a34a'][i] || '#6b7280',
  }));
  if (s.length < 2) {
    // auto-fill second circle so we don't crash
    while (s.length < 2) s.push({ ...defaultGeom[s.length], label: '', color: '#cbd5e1' });
  }
  const r = regions || labels || {};
  const show = {
    onlyA: r.onlyA ?? r.only1,
    onlyB: r.onlyB ?? r.only2,
    both: r.both ?? r.intersect,
    none: r.none ?? r.neither,
  };
  const universeLabel = universe != null ? `Összes: ${universe}` : null;
  return (
    <svg viewBox="0 0 380 260" width="100%" style={{ maxWidth: 460 }} role="img">
      {universeLabel && (
        <g>
          <rect x="14" y="14" width="352" height="224" rx="10" fill="none" stroke="#94a3b8" strokeDasharray="4 4"/>
          <text x="24" y="30" fontSize="11" fill="#64748b">{universeLabel}</text>
        </g>
      )}
      {s.map((set, i) => (
        <circle key={i} cx={set.cx} cy={set.cy} r={set.r}
                fill={set.color} fillOpacity="0.28" stroke={set.color} strokeWidth="2.5"/>
      ))}
      {s.map((set, i) => (
        <text key={'l'+i} x={set.cx + (i === 0 ? -set.r*0.7 : set.r*0.7)} y={set.cy - set.r - 6}
              fontSize="14" fontWeight="700" textAnchor="middle" fill={set.color}>
          {set.label}
        </text>
      ))}
      {show.onlyA !== undefined && (
        <text x={s[0].cx - 32} y={s[0].cy + 6} fontSize="18" fontWeight="700" textAnchor="middle" fill="#0f172a">{show.onlyA}</text>
      )}
      {show.onlyB !== undefined && (
        <text x={s[1].cx + 32} y={s[1].cy + 6} fontSize="18" fontWeight="700" textAnchor="middle" fill="#0f172a">{show.onlyB}</text>
      )}
      {show.both !== undefined && (
        <text x={(s[0].cx + s[1].cx) / 2} y={s[0].cy + 6} fontSize="18" fontWeight="700" textAnchor="middle" fill="#0f172a">{show.both}</text>
      )}
      {show.none !== undefined && (
        <g>
          <rect x="306" y="208" width="56" height="36" rx="4" fill="white" stroke="#94a3b8" strokeDasharray="4 3"/>
          <text x="334" y="232" fontSize="16" fontWeight="700" textAnchor="middle" fill="#0f172a">{show.none}</text>
        </g>
      )}
    </svg>
  );
}
