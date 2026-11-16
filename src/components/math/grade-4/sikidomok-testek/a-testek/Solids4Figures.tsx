import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** A ferde (kavalier) vetület mélységi iránya: jobbra fel */
export const DEPTH = { dx: 0.5, dy: -0.38 };

const shade = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) * k));
  const g = Math.min(255, Math.round(((n >> 8) & 255) * k));
  const b = Math.min(255, Math.round((n & 255) * k));
  return `rgb(${r},${g},${b})`;
};

/** Egy kis kocka ferde vetületben: (x, y) az elülső lap bal alsó sarka */
export const Solids4UnitCube: React.FC<{ x: number; y: number; u: number; color?: string }> = ({ x, y, u, color = '#ef4444' }) => {
  const dx = DEPTH.dx * u;
  const dy = DEPTH.dy * u;
  return (
    <g stroke="#7f1d1d" strokeWidth="1" strokeLinejoin="round">
      <polygon points={`${x},${y} ${x + u},${y} ${x + u},${y - u} ${x},${y - u}`} fill={color} />
      <polygon points={`${x},${y - u} ${x + u},${y - u} ${x + u + dx},${y - u + dy} ${x + dx},${y - u + dy}`} fill={shade(color, 1.25)} />
      <polygon points={`${x + u},${y} ${x + u + dx},${y + dy} ${x + u + dx},${y - u + dy} ${x + u},${y - u}`} fill={shade(color, 0.75)} />
    </g>
  );
};

/**
 * Kis kockákból álló építmény az alaprajz alapján.
 * heights[r][c]: hány kocka áll az adott mezőn; r = 0 a hátsó sor (az alaprajz felső sora).
 * (x0, y0): az elülső sor bal alsó sarka.
 */
export const Solids4Building: React.FC<{ heights: number[][]; u: number; x0: number; y0: number; color?: string }> = ({
  heights,
  u,
  x0,
  y0,
  color = '#ef4444'
}) => {
  const rows = heights.length;
  const cubes: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const depth = rows - 1 - r;
    for (let c = 0; c < heights[r].length; c++) {
      for (let k = 0; k < heights[r][c]; k++) {
        cubes.push(
          <Solids4UnitCube
            key={`${r}-${c}-${k}`}
            x={x0 + c * u + depth * DEPTH.dx * u}
            y={y0 - k * u + depth * DEPTH.dy * u}
            u={u}
            color={color}
          />
        );
      }
    }
  }
  return <g>{cubes}</g>;
};

/**
 * Téglatest drótvázas rajza ferde vetületben, a takart élek szaggatottak.
 * (x, y): az elülső lap bal alsó csúcsa; a, b, c: hosszúság, magasság, mélység pixelben.
 */
export const Solids4Box: React.FC<{ x: number; y: number; a: number; b: number; c: number; fill?: string; stroke?: string; sw?: number }> = ({
  x,
  y,
  a,
  b,
  c,
  fill = '#bae6fd',
  stroke = '#0f172a',
  sw = 2
}) => {
  const dx = c * DEPTH.dx * 2;
  const dy = c * DEPTH.dy * 2;
  const P = {
    A: [x, y],
    B: [x + a, y],
    C: [x + a, y - b],
    D: [x, y - b],
    E: [x + dx, y + dy],
    F: [x + a + dx, y + dy],
    G: [x + a + dx, y - b + dy],
    H: [x + dx, y - b + dy]
  } as Record<string, number[]>;
  const L = (p: string, q: string, dash = false) => (
    <line x1={P[p][0]} y1={P[p][1]} x2={P[q][0]} y2={P[q][1]} stroke={stroke} strokeWidth={sw} strokeDasharray={dash ? '5 4' : undefined} strokeLinecap="round" />
  );
  const poly = (k: string) => k.split('').map((s) => P[s].join(',')).join(' ');
  return (
    <g>
      <polygon points={poly('ABCD')} fill={fill} />
      <polygon points={poly('DCGH')} fill={shade(fill.startsWith('#') ? fill : '#bae6fd', 1.08)} />
      <polygon points={poly('BFGC')} fill={shade(fill.startsWith('#') ? fill : '#bae6fd', 0.85)} />
      {L('A', 'E', true)}
      {L('E', 'F', true)}
      {L('E', 'H', true)}
      {L('A', 'B')}
      {L('B', 'C')}
      {L('C', 'D')}
      {L('D', 'A')}
      {L('B', 'F')}
      {L('F', 'G')}
      {L('G', 'C')}
      {L('G', 'H')}
      {L('H', 'D')}
    </g>
  );
};

/** Négyzet alapú gúla, henger, kúp, gömb, félgömb – egyszerű rajzok */
export const Solids4Pyramid: React.FC<{ cx: number; by: number; w: number; h: number; fill?: string }> = ({ cx, by, w, h, fill = '#93c5fd' }) => {
  const d = w * 0.5;
  const A = [cx - w / 2, by];
  const B = [cx + w / 2 - d * 0.3, by];
  const C = [cx + w / 2 + d * 0.3, by - d * 0.45];
  const D = [cx - w / 2 + d * 0.6, by - d * 0.45];
  const T = [cx + d * 0.1, by - h];
  const s = (p: number[]) => p.join(',');
  return (
    <g strokeLinejoin="round">
      <polygon points={`${s(A)} ${s(B)} ${s(T)}`} fill={fill} stroke="#1e3a8a" strokeWidth="1.8" />
      <polygon points={`${s(B)} ${s(C)} ${s(T)}`} fill={shade(fill, 0.82)} stroke="#1e3a8a" strokeWidth="1.8" />
      <line x1={A[0]} y1={A[1]} x2={D[0]} y2={D[1]} stroke="#1e3a8a" strokeWidth="1.4" strokeDasharray="4 3" />
      <line x1={D[0]} y1={D[1]} x2={C[0]} y2={C[1]} stroke="#1e3a8a" strokeWidth="1.4" strokeDasharray="4 3" />
      <line x1={D[0]} y1={D[1]} x2={T[0]} y2={T[1]} stroke="#1e3a8a" strokeWidth="1.4" strokeDasharray="4 3" />
    </g>
  );
};

export const Solids4Cylinder: React.FC<{ cx: number; by: number; r: number; h: number; fill?: string }> = ({ cx, by, r, h, fill = '#38bdf8' }) => (
  <g>
    <path d={`M ${cx - r} ${by - h} L ${cx - r} ${by} A ${r} ${r * 0.3} 0 0 0 ${cx + r} ${by} L ${cx + r} ${by - h} Z`} fill={fill} stroke="#0c4a6e" strokeWidth="1.8" />
    <path d={`M ${cx - r} ${by} A ${r} ${r * 0.3} 0 0 1 ${cx + r} ${by}`} fill="none" stroke="#0c4a6e" strokeWidth="1.3" strokeDasharray="4 3" />
    <ellipse cx={cx} cy={by - h} rx={r} ry={r * 0.3} fill={shade(fill, 1.2)} stroke="#0c4a6e" strokeWidth="1.8" />
  </g>
);

export const Solids4Cone: React.FC<{ cx: number; by: number; r: number; h: number; fill?: string }> = ({ cx, by, r, h, fill = '#a5b4fc' }) => (
  <g>
    <path d={`M ${cx - r} ${by} L ${cx} ${by - h} L ${cx + r} ${by} A ${r} ${r * 0.3} 0 0 1 ${cx - r} ${by} Z`} fill={fill} stroke="#312e81" strokeWidth="1.8" strokeLinejoin="round" />
    <path d={`M ${cx - r} ${by} A ${r} ${r * 0.3} 0 0 1 ${cx + r} ${by}`} fill="none" stroke="#312e81" strokeWidth="1.3" strokeDasharray="4 3" />
  </g>
);

export const Solids4Sphere: React.FC<{ cx: number; cy: number; r: number; fill?: string }> = ({ cx, cy, r, fill = '#7dd3fc' }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={fill} stroke="#075985" strokeWidth="1.8" />
    <path d={`M ${cx - r} ${cy} A ${r} ${r * 0.3} 0 0 0 ${cx + r} ${cy}`} fill="none" stroke="#075985" strokeWidth="1.2" />
    <path d={`M ${cx - r} ${cy} A ${r} ${r * 0.3} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#075985" strokeWidth="1" strokeDasharray="4 3" />
    <circle cx={cx - r * 0.35} cy={cy - r * 0.4} r={r * 0.18} fill="#ffffff" opacity="0.7" />
  </g>
);

export const Solids4Hemisphere: React.FC<{ cx: number; by: number; r: number; fill?: string }> = ({ cx, by, r, fill = '#e0f2fe' }) => (
  <g>
    <path d={`M ${cx - r} ${by} A ${r} ${r} 0 0 1 ${cx + r} ${by} A ${r} ${r * 0.3} 0 0 1 ${cx - r} ${by} Z`} fill={fill} stroke="#0c4a6e" strokeWidth="1.8" />
    <path d={`M ${cx - r} ${by} A ${r} ${r * 0.3} 0 0 1 ${cx + r} ${by}`} fill="none" stroke="#0c4a6e" strokeWidth="1.3" strokeDasharray="4 3" />
  </g>
);

/** 1. ábra: a testek családja (Tankönyv 118. o. 1. feladat) */
export const SolidsFamilySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 240" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="232" rx="18" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
    <Solids4Box x={30} y={95} a={60} b={60} c={30} />
    <text x="75" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">kocka</text>
    <Solids4Box x={140} y={95} a={100} b={50} c={30} fill="#fecaca" />
    <text x="200" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">téglatest</text>
    <Solids4Pyramid cx={315} by={95} w={80} h={75} />
    <text x="320" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">gúla</text>
    <Solids4Sphere cx={440} cy={60} r={38} />
    <text x="440" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">gömb</text>
    <Solids4Cylinder cx={90} by={200} r={32} h={60} />
    <text x="90" y="228" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">henger</text>
    <Solids4Cone cx={250} by={200} r={36} h={70} />
    <text x="250" y="228" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">kúp</text>
    <Solids4Hemisphere cx={410} by={195} r={50} />
    <text x="410" y="228" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">félgömb</text>
  </svg>
);

/** 2. ábra: síklapok határolják – görbe felület határolja (Tankönyv 118. o. 2. feladat) */
export const FlatCurvedSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="10" y="10" width="300" height="200" rx="18" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" />
    <rect x="210" y="10" width="300" height="200" rx="18" fill="#fef9c3" stroke="#facc15" strokeWidth="2" opacity="0.85" />
    <text x="100" y="34" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#075985">Síklapok határolják</text>
    <text x="420" y="34" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">Görbe felület határolja</text>
    <text x="260" y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">mindkettő</text>
    <Solids4Box x={30} y={120} a={70} b={45} c={25} fill="#fca5a5" />
    <Solids4Pyramid cx={90} by={190} w={70} h={55} />
    <Solids4Box x={145} y={190} a={45} b={45} c={22} fill="#fde68a" />
    <Solids4Cylinder cx={260} by={110} r={24} h={45} />
    <Solids4Cone cx={260} by={190} r={26} h={50} />
    <Solids4Sphere cx={400} cy={95} r={36} />
    <Solids4Hemisphere cx={440} by={185} r={40} />
    <text x="400" y="150" textAnchor="middle" fontSize="11" fill="#854d0e">gömb</text>
    <text x="440" y="205" textAnchor="middle" fontSize="11" fill="#854d0e">félgömb</text>
    <text x="260" y="128" textAnchor="middle" fontSize="11" fill="#166534">henger</text>
    <text x="260" y="205" textAnchor="middle" fontSize="11" fill="#166534">kúp</text>
  </svg>
);

/** 3. ábra: a téglatest lapja, éle, csúcsa (Tankönyv 120. o. 9. feladat) */
export const CuboidPartsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="222" rx="18" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <Solids4Box x={110} y={180} a={200} b={100} c={60} fill="#fee2e2" />
    <polygon points="110,180 310,180 310,80 110,80" fill="#dc2626" opacity="0.75" />
    <line x1="170" y1="34.4" x2="370" y2="34.4" stroke="#2563eb" strokeWidth="5" strokeLinecap="round" />
    <circle cx="370" cy="34.4" r="7" fill="#16a34a" />
    <text x="210" y="138" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ffffff">lap</text>
    <text x="270" y="26" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1d4ed8">él</text>
    <text x="385" y="30" fontSize="15" fontWeight="bold" fill="#15803d">csúcs</text>
    <text x="400" y="110" fontSize="12" fill="#334155">6 lap</text>
    <text x="400" y="130" fontSize="12" fill="#334155">12 él</text>
    <text x="400" y="150" fontSize="12" fill="#334155">8 csúcs</text>
    <text x="260" y="214" textAnchor="middle" fontSize="12" fill="#475569">A szaggatott élek hátul vannak, nem látjuk őket.</text>
  </svg>
);

/** 4. ábra: a téglatest és a kocka hálója (Tankönyv 120. o. 8. feladat) */
export const CuboidNetSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // téglatest háló: a = 50 (hossz), b = 30 (magasság), c = 25 (mélység)
  const x0 = 20;
  const y0 = 60;
  const a = 60;
  const b = 34;
  const c = 28;
  const purple = '#c4b5fd';
  const teal = '#99f6e4';
  const orange = '#fdba74';
  const u = 26;
  const kx = 330;
  const ky = 40;
  const cross: [number, number][] = [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2]
  ];
  return (
    <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="192" rx="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="140" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">A téglatest hálója</text>
      <g stroke="#334155" strokeWidth="1.5">
        <rect x={x0 + c} y={y0 - c} width={a} height={c} fill={purple} />
        <rect x={x0} y={y0} width={c} height={b} fill={teal} />
        <rect x={x0 + c} y={y0} width={a} height={b} fill={orange} />
        <rect x={x0 + c + a} y={y0} width={c} height={b} fill={teal} />
        <rect x={x0 + 2 * c + a} y={y0} width={a} height={b} fill={orange} />
        <rect x={x0 + c} y={y0 + b} width={a} height={c} fill={purple} />
      </g>
      <text x="140" y="150" textAnchor="middle" fontSize="11" fill="#475569">6 téglalap, kettő-kettő egyforma</text>
      <text x="420" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">A kocka hálója</text>
      <g stroke="#334155" strokeWidth="1.5">
        {cross.map(([cx, cy], i) => (
          <rect key={i} x={kx + cx * u} y={ky + cy * u} width={u} height={u} fill="#ddd6fe" />
        ))}
      </g>
      <text x="420" y="150" textAnchor="middle" fontSize="11" fill="#475569">6 egyforma négyzet</text>
      <text x="260" y="182" textAnchor="middle" fontSize="12" fill="#334155">A hálót összehajtva megkapjuk a testet.</text>
    </svg>
  );
};

/** 5. ábra: lépcsők kis kockákból – 1, 3, 6, 10 kocka (Tankönyv 119. o. 6. feladat) */
export const CubeStairsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 18;
  const stairs = [1, 2, 3, 4];
  let x = 20;
  return (
    <svg viewBox="0 0 520 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="162" rx="18" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
      {stairs.map((n) => {
        const heights = [Array.from({ length: n }, (_, i) => i + 1)];
        const left = x;
        x += n * u + 50;
        const total = (n * (n + 1)) / 2;
        return (
          <g key={n}>
            <Solids4Building heights={heights} u={u} x0={left} y0={125} color="#f1f5f9" />
            <text x={left + (n * u) / 2 + 4} y="152" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534">
              {total} kocka
            </text>
          </g>
        );
      })}
      <text x="430" y="70" fontSize="12" fill="#14532d">+2, +3, +4 …</text>
    </svg>
  );
};

/** 6. ábra: elölnézet, oldalnézet, felülnézet (Tankönyv 122. o. 13–14. feladat) */
export const ViewsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const heights = [
    [1, 1, 0],
    [2, 1, 1]
  ];
  const s = 20;
  const sq = (x: number, y: number, c = '#fca5a5') => <rect x={x} y={y} width={s} height={s} fill={c} stroke="#7f1d1d" strokeWidth="1.3" />;
  return (
    <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="192" rx="18" fill="#fff1f2" stroke="#fda4af" strokeWidth="2" />
      <Solids4Building heights={heights} u={30} x0={30} y0={150} />
      <text x="85" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">az építmény</text>
      {/* elölnézet: oszloponként a legmagasabb */}
      <g>
        {sq(200, 110)}
        {sq(200, 130)}
        {sq(220, 130)}
        {sq(240, 130)}
        <text x="230" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">elölnézet</text>
      </g>
      {/* oldalnézet (jobbról): soronként a legmagasabb; elöl van balra */}
      <g>
        {sq(310, 130)}
        {sq(330, 130)}
        {sq(310, 110)}
        <text x="330" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">oldalnézet</text>
      </g>
      {/* felülnézet: alaprajz */}
      <g>
        {sq(410, 110, '#fecaca')}
        {sq(430, 110, '#fecaca')}
        {sq(410, 130, '#fca5a5')}
        {sq(430, 130, '#fecaca')}
        {sq(450, 130, '#fecaca')}
        <text x="420" y="124" textAnchor="middle" fontSize="11" fontWeight="bold">1</text>
        <text x="440" y="124" textAnchor="middle" fontSize="11" fontWeight="bold">1</text>
        <text x="420" y="144" textAnchor="middle" fontSize="11" fontWeight="bold">2</text>
        <text x="440" y="144" textAnchor="middle" fontSize="11" fontWeight="bold">1</text>
        <text x="460" y="144" textAnchor="middle" fontSize="11" fontWeight="bold">1</text>
        <text x="440" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">felülnézet = alaprajz</text>
      </g>
      <text x="350" y="40" textAnchor="middle" fontSize="12" fill="#334155">Az alaprajzon a szám megmutatja,</text>
      <text x="350" y="56" textAnchor="middle" fontSize="12" fill="#334155">hány kocka áll egymáson.</text>
    </svg>
  );
};
