import React from 'react';

// ============ Rectangle ============
export function Rectangle({ widthM, heightM, label = '', fill = '#dbeafe', unit = 'm' }) {
  const s = 24;
  const w = Number.isFinite(widthM) && widthM > 0 ? widthM : 4;
  const h = Number.isFinite(heightM) && heightM > 0 ? heightM : 3;
  const W = w * s + 80, H = h * s + 80;
  widthM = w;
  heightM = h;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: Math.min(400, W) }} role="img">
      <rect x={40} y={40} width={widthM*s} height={heightM*s} fill={fill} stroke="#334155" strokeWidth="2"/>
      <text x={40 + widthM*s/2} y={30} fontSize="12" textAnchor="middle" fill="#0f172a" fontWeight="600">{widthM} {unit}</text>
      <text x={22} y={40 + heightM*s/2} fontSize="12" textAnchor="middle" fill="#0f172a" fontWeight="600" transform={`rotate(-90, 22, ${40 + heightM*s/2})`}>{heightM} {unit}</text>
      {label && <text x={40 + widthM*s/2} y={40 + heightM*s + 22} fontSize="12" textAnchor="middle" fill="#475569">{label}</text>}
    </svg>
  );
}

// ============ Triangle ============
export function TriangleShape({ base, side, unit = 'cm' }) {
  const b = Number.isFinite(base) && base > 0 ? base : 8;
  const sd = Number.isFinite(side) && side > b / 2 ? side : Math.max(5, b * 0.7);
  base = b; side = sd;
  const k = 24;
  const pad = 30;
  const h = Math.sqrt(side * side - (base / 2) ** 2);
  const W = base * k + pad * 2;
  const H = h * k + pad * 2 + 20;
  const x1 = pad, y1 = H - pad - 10;
  const x2 = pad + base * k, y2 = H - pad - 10;
  const x3 = pad + (base * k) / 2, y3 = H - pad - 10 - h * k;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 360 }} role="img">
      <polygon points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill="#dbeafe" stroke="#1e40af" strokeWidth="2"/>
      <text x={(x1+x2)/2} y={y1+22} fontSize="12" fontWeight="600" textAnchor="middle" fill="#0f172a">{base} {unit}</text>
      <text x={(x1+x3)/2 - 14} y={(y1+y3)/2} fontSize="12" fontWeight="600" textAnchor="end" fill="#0f172a">{side} {unit}</text>
      <text x={(x2+x3)/2 + 14} y={(y2+y3)/2} fontSize="12" fontWeight="600" textAnchor="start" fill="#0f172a">{side} {unit}</text>
    </svg>
  );
}

// ============ L-polygon ============
export function PolygonL({ outer, cut, unit = 'm' }) {
  if (!outer || !cut || !Number.isFinite(outer.w) || !Number.isFinite(outer.h) || !Number.isFinite(cut.w) || !Number.isFinite(cut.h)) {
    return <div style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>[PolygonL — hiányzó méret]</div>;
  }
  const s = 18, pad = 30;
  const W = outer.w * s + pad * 2 + 40;
  const H = outer.h * s + pad * 2 + 40;
  const ox = pad + 20, oy = pad + 20;
  const pts = [
    [ox, oy],
    [ox + outer.w * s, oy],
    [ox + outer.w * s, oy + (outer.h - cut.h) * s],
    [ox + (outer.w - cut.w) * s, oy + (outer.h - cut.h) * s],
    [ox + (outer.w - cut.w) * s, oy + outer.h * s],
    [ox, oy + outer.h * s],
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 420 }} role="img">
      <polygon points={pts.map(p=>p.join(',')).join(' ')} fill="#dcfce7" stroke="#166534" strokeWidth="2"/>
      <text x={ox + outer.w*s/2} y={oy - 10} fontSize="11" fontWeight="600" textAnchor="middle" fill="#0f172a">{outer.w} {unit}</text>
      <text x={ox - 10} y={oy + outer.h*s/2} fontSize="11" fontWeight="600" textAnchor="end" fill="#0f172a">{outer.h} {unit}</text>
      <text x={ox + outer.w*s + 4} y={oy + (outer.h - cut.h)*s/2} fontSize="11" fill="#0f172a">{outer.h - cut.h} {unit}</text>
      <text x={ox + (outer.w - cut.w/2)*s} y={oy + outer.h*s + 16} fontSize="11" fill="#0f172a" textAnchor="middle">{cut.w} {unit}</text>
    </svg>
  );
}

// ============ Grid (shaded cells for area) ============
export function Grid({ w, h, shadedCells = [] }) {
  if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(h) || h <= 0) {
    return <div style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>[Grid — hiányzó méret]</div>;
  }
  const s = 26, pad = 20;
  const W = w * s + pad * 2, H = h * s + pad * 2;
  const set = new Set(shadedCells.map((c) => c.join(',')));
  const cells = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const shaded = set.has(`${x},${y}`);
      cells.push(
        <rect key={`${x},${y}`} x={pad + x*s} y={pad + y*s} width={s} height={s}
              fill={shaded ? '#16a34a' : 'white'} stroke="#cbd5e1"/>
      );
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 420 }} role="img">
      {cells}
    </svg>
  );
}

// ============ Symmetry half ============
export function SymmetryHalf({ axis = 'vertical', halfPoints = [] }) {
  const s = 32, pad = 20;
  const maxX = Math.max(...halfPoints.map((p) => p.x), 6);
  const maxY = Math.max(...halfPoints.map((p) => p.y), 6);
  const W = (maxX * 2 + 2) * s + pad * 2;
  const H = (maxY + 2) * s + pad * 2;
  const axisX = pad + (maxX + 1) * s;

  const dotAt = (x, y) => <circle cx={pad + x*s} cy={pad + y*s} r="4" fill="#64748b"/>;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 480 }} role="img">
      {Array.from({ length: maxX * 2 + 2 }).map((_, x) => (
        Array.from({ length: maxY + 2 }).map((_, y) => (
          <g key={`${x},${y}`}>{dotAt(x, y)}</g>
        ))
      ))}
      <line x1={axisX} x2={axisX} y1={pad} y2={H-pad} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 4"/>
      <polyline points={halfPoints.map((p) => `${pad + p.x*s},${pad + p.y*s}`).join(' ')}
        fill="none" stroke="#2563eb" strokeWidth="2.4"/>
      {halfPoints.map((p, i) => (
        <circle key={i} cx={pad + p.x*s} cy={pad + p.y*s} r="5" fill="#2563eb"/>
      ))}
      <text x={axisX+6} y={pad+12} fontSize="11" fill="#ef4444" fontWeight="600">tengely</text>
    </svg>
  );
}

// ============ Mirror choice ============
export function MirrorChoice({ letter = 'F', axis = 'vertical' }) {
  const opts = [
    { key: 'A', tx: 'translate(30 30)', label: 'A (eredeti)' },
    { key: 'B', tx: 'translate(100 30) scale(1 -1) translate(0 -60)', label: 'B' },
    { key: 'C', tx: 'translate(170 30) scale(-1 1) translate(-60 0)', label: 'C' },
    { key: 'D', tx: 'translate(240 30) rotate(180 30 30)', label: 'D' },
  ];
  return (
    <svg viewBox="0 0 310 110" width="100%" style={{ maxWidth: 440 }} role="img">
      {opts.map((o, i) => (
        <g key={i}>
          <rect x={i*70+22} y={24} width="64" height="64" fill="white" stroke="#cbd5e1"/>
          <g transform={o.tx}>
            <text x="30" y="44" fontSize="44" textAnchor="middle" fontWeight="700" fill="#1e40af">{letter}</text>
          </g>
          <text x={i*70+54} y={104} fontSize="12" textAnchor="middle" fill="#334155">{o.label}</text>
        </g>
      ))}
    </svg>
  );
}

// ============ Cube nets ============
export function CubeNets() {
  const s = 18;
  const net = (shape) => {
    const cells = {
      cross: [[1,0],[0,1],[1,1],[2,1],[1,2],[1,3]],
      T:     [[0,0],[1,0],[2,0],[3,0],[1,1],[1,2]],
      row6:  [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0]],
      O:     null, // single rectangle
    };
    if (shape === 'O') {
      return (
        <g>
          <rect x={0} y={0} width={3*s} height={2*s} fill="#fef3c7" stroke="#854d0e" strokeWidth="1.8"/>
        </g>
      );
    }
    return cells[shape].map(([x,y], i) => (
      <rect key={i} x={x*s} y={y*s} width={s} height={s} fill="#fef3c7" stroke="#854d0e" strokeWidth="1.5"/>
    ));
  };
  const layouts = [
    { key: 'A', label: 'A', shape: 'cross', tx: 'translate(16, 10)' },
    { key: 'B', label: 'B', shape: 'T',     tx: 'translate(110, 10)' },
    { key: 'C', label: 'C (téglalap)', shape: 'O', tx: 'translate(208, 30)' },
    { key: 'D', label: 'D (6 soros)',  shape: 'row6', tx: 'translate(10, 130)' },
  ];
  return (
    <svg viewBox="0 0 300 180" width="100%" style={{ maxWidth: 480 }} role="img">
      {layouts.map((l, i) => (
        <g key={i}>
          <g transform={l.tx}>{net(l.shape)}</g>
        </g>
      ))}
      {layouts.map((l, i) => {
        const pos = [
          { x: 34,  y: 110 },
          { x: 130, y: 110 },
          { x: 232, y: 110 },
          { x: 70,  y: 170 },
        ][i];
        return <text key={i} x={pos.x} y={pos.y} fontSize="11" textAnchor="middle" fill="#334155">{l.label}</text>;
      })}
    </svg>
  );
}

// ============ Big cube (3x3x3 visualization) ============
export function BigCube({ n = 3 }) {
  const s = 32;
  const ox = 40, oy = 40;
  return (
    <svg viewBox="0 0 220 200" width="220" height="200" role="img">
      {/* Front face */}
      {Array.from({ length: n * n }).map((_, i) => {
        const x = i % n, y = Math.floor(i / n);
        return <rect key={'f'+i} x={ox + x*s} y={oy + (n-1-y)*s} width={s} height={s} fill="#fee2e2" stroke="#991b1b" strokeWidth="1.5"/>;
      })}
      {/* Top face (parallelogram projection) */}
      {Array.from({ length: n * n }).map((_, i) => {
        const x = i % n, y = Math.floor(i / n);
        const off = 20;
        const pts = [
          [ox + x*s + off, oy + (n-1)*s - y*s + oy - oy - off + 0],
        ];
        // Simpler: just show an isometric-ish offset
        const px = ox + x*s + off * (1 - y/(n-1)) * 0 + off;
        const py = oy - off;
        const p1 = [ox + x*s + off, oy - off];
        const p2 = [ox + (x+1)*s + off, oy - off];
        const p3 = [ox + (x+1)*s, oy];
        const p4 = [ox + x*s, oy];
        return <polygon key={'t'+i} points={`${p1} ${p2} ${p3} ${p4}`} fill="#fef3c7" stroke="#854d0e" strokeWidth="1.5"/>;
      })}
      {/* Side face */}
      {Array.from({ length: n * n }).map((_, i) => {
        const x = i % n, y = Math.floor(i / n);
        const off = 20;
        const p1 = [ox + n*s, oy + (n-1-y)*s];
        const p2 = [ox + n*s + off, oy + (n-1-y)*s - off];
        const p3 = [ox + n*s + off, oy + (n-1-y)*s - off + s];
        const p4 = [ox + n*s, oy + (n-1-y)*s + s];
        // Only show the right column column-wise
        if (x !== 0) return null;
        return <polygon key={'s'+y} points={`${p1} ${p2} ${p3} ${p4}`} fill="#dbeafe" stroke="#1e40af" strokeWidth="1.5"/>;
      })}
      <text x="110" y="190" fontSize="12" textAnchor="middle" fill="#475569">3 × 3 × 3-as kocka</text>
    </svg>
  );
}

// ============ Box 3D (with a smaller cube unit) ============
export function Box3D({ box, cubeEdge = 1, unit = 'cm' }) {
  if (!box || !Number.isFinite(box.l) || !Number.isFinite(box.w) || !Number.isFinite(box.h)) {
    return <div style={{ padding: 8, color: '#94a3b8', fontSize: 12 }}>[Box3D — hiányzó méret]</div>;
  }
  const s = 12;
  const pad = 30;
  const W = box.l * s + 80, H = box.h * s + 50;
  const ox = pad, oy = pad + 10;
  const off = Math.min(30, box.w * s * 0.7);
  return (
    <svg viewBox={`0 0 ${W + off} ${H + off}`} width="100%" style={{ maxWidth: 420 }} role="img">
      {/* Front face */}
      <rect x={ox} y={oy} width={box.l*s} height={box.h*s} fill="#dbeafe" stroke="#1e40af" strokeWidth="1.8"/>
      {/* Top */}
      <polygon points={`${ox},${oy} ${ox+off},${oy-off} ${ox+box.l*s+off},${oy-off} ${ox+box.l*s},${oy}`}
               fill="#e0f2fe" stroke="#1e40af" strokeWidth="1.8"/>
      {/* Side */}
      <polygon points={`${ox+box.l*s},${oy} ${ox+box.l*s+off},${oy-off} ${ox+box.l*s+off},${oy-off+box.h*s} ${ox+box.l*s},${oy+box.h*s}`}
               fill="#bfdbfe" stroke="#1e40af" strokeWidth="1.8"/>
      <text x={ox + box.l*s/2} y={oy + box.h*s + 18} fontSize="11" fontWeight="600" textAnchor="middle" fill="#0f172a">{box.l} {unit}</text>
      <text x={ox - 8} y={oy + box.h*s/2} fontSize="11" fontWeight="600" textAnchor="end" fill="#0f172a">{box.h} {unit}</text>
      <text x={ox + box.l*s + off + 4} y={oy - off/2 - 2} fontSize="11" fontWeight="600" fill="#0f172a">{box.w} {unit}</text>
      <text x={12} y={H + off - 4} fontSize="11" fill="#64748b">1 kis kocka éle: {cubeEdge} {unit}</text>
    </svg>
  );
}

// ============ Treasure map ============
export function TreasureMap({ gridW = 10, gridH = 8, start, islands = [] }) {
  if (!Number.isFinite(gridW) || gridW <= 0) gridW = 10;
  if (!Number.isFinite(gridH) || gridH <= 0) gridH = 8;
  const s = 36, pad = 20;
  const W = gridW * s + pad * 2, H = gridH * s + pad * 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxWidth: 560 }} role="img">
      <rect x={pad} y={pad} width={gridW*s} height={gridH*s} fill="#dbeafe"/>
      {Array.from({ length: gridW+1 }).map((_, i) => (
        <line key={'vx'+i} x1={pad+i*s} x2={pad+i*s} y1={pad} y2={pad+gridH*s} stroke="#60a5fa" strokeWidth="0.5"/>
      ))}
      {Array.from({ length: gridH+1 }).map((_, i) => (
        <line key={'vy'+i} x1={pad} x2={pad+gridW*s} y1={pad+i*s} y2={pad+i*s} stroke="#60a5fa" strokeWidth="0.5"/>
      ))}
      {/* Islands */}
      {islands.map((is, i) => {
        const cx = pad + is.x*s, cy = pad + (gridH - is.y)*s;
        return (
          <g key={i}>
            <ellipse cx={cx} cy={cy} rx={s*0.55} ry={s*0.38} fill="#fde68a" stroke="#854d0e" strokeWidth="1.5"/>
            <text x={cx} y={cy+5} fontSize="16" fontWeight="700" textAnchor="middle" fill="#0f172a">{is.label}</text>
          </g>
        );
      })}
      {/* Start */}
      {start && (
        <g>
          <circle cx={pad + start.x*s} cy={pad + (gridH - start.y)*s} r="9" fill="#ef4444" stroke="white" strokeWidth="2"/>
          <text x={pad + start.x*s} y={pad + (gridH - start.y)*s + 4} fontSize="12" fontWeight="700" textAnchor="middle" fill="white">{start.label}</text>
        </g>
      )}
      {/* Compass */}
      <g transform={`translate(${W - 54}, 28)`}>
        <circle cx="0" cy="0" r="16" fill="white" stroke="#334155"/>
        <text x="0" y="-6" fontSize="10" fontWeight="700" textAnchor="middle" fill="#ef4444">É</text>
        <text x="0" y="14" fontSize="9" textAnchor="middle" fill="#334155">D</text>
        <text x="-11" y="3" fontSize="9" textAnchor="middle" fill="#334155">Ny</text>
        <text x="11" y="3" fontSize="9" textAnchor="middle" fill="#334155">K</text>
      </g>
    </svg>
  );
}
