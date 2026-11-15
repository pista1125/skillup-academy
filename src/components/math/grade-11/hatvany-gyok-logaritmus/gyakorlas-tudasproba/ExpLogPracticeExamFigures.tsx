import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const curvePath = (f: (t: number) => number, t0: number, t1: number, sx: (t: number) => number, sy: (y: number) => number, n = 80) => {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    pts.push(`${i === 0 ? 'M' : 'L'}${sx(t).toFixed(1)},${sy(f(t)).toFixed(1)}`);
  }
  return pts.join(' ');
};

// 1. ábra: a fejezet fogalomtérképe
export const ChapterMapSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const boxes = [
    { x: 20, y: 50, w: 160, t1: 'Hatvány', t2: 'aⁿ, a⁰ = 1, a⁻ⁿ = 1/aⁿ', c: '#7c3aed', f: '#ede9fe' },
    { x: 200, y: 50, w: 160, t1: 'n-edik gyök', t2: 'ⁿ√a, páros n: a ≥ 0', c: '#0f766e', f: '#ccfbf1' },
    { x: 380, y: 50, w: 160, t1: 'Törtkitevő', t2: 'a^(p/q) = (q-adik gyök a)ᵖ', c: '#db2777', f: '#fce7f3' },
    { x: 20, y: 150, w: 160, t1: 'Exp. függvény', t2: 'x ↦ aˣ, (0; 1) ponton át', c: '#2563eb', f: '#dbeafe' },
    { x: 200, y: 150, w: 160, t1: 'Exp. folyamat', t2: 'N₀ · kᵗ, kamat, felezés', c: '#d97706', f: '#fef3c7' },
    { x: 380, y: 150, w: 160, t1: 'Logaritmus', t2: 'aˣ = b ⇔ x = logₐ b', c: '#4c1d95', f: '#f5f3ff' }
  ];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="32" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        III. fejezet: Hatvány, gyök, logaritmus – a fogalmak egymásra épülése
      </text>
      {[
        [180, 80, 200, 80],
        [360, 80, 380, 80],
        [460, 110, 100, 150],
        [180, 180, 200, 180],
        [360, 180, 380, 180]
      ].map(([x1, y1, x2, y2], i) => (
        <g key={i}>
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="2" />
          <circle cx={x2} cy={y2} r="3" fill="#94a3b8" />
        </g>
      ))}
      {boxes.map((b) => (
        <g key={b.t1}>
          <rect x={b.x} y={b.y} width={b.w} height="60" rx="12" fill={b.f} stroke={b.c} strokeWidth="1.8" />
          <text x={b.x + b.w / 2} y={b.y + 25} fontSize="14" textAnchor="middle" fontWeight="bold" fill={b.c}>{b.t1}</text>
          <text x={b.x + b.w / 2} y={b.y + 45} fontSize="11" textAnchor="middle" fill="#334155">{b.t2}</text>
        </g>
      ))}
      <text x="280" y="232" fontSize="11" textAnchor="middle" fill="#475569">
        A logaritmus az exponenciális egyenlet megoldása: lg b / lg a.
      </text>
    </svg>
  );
};

// 2. ábra: a város lakossága (1. feladat)
export const TownGrowthSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const q = Math.pow(132000 / 130300, 1 / 4);
  const sx = (t: number) => 70 + t * 33;
  const sy = (n: number) => 210 - (n - 129000) / 50;
  const pts = [
    { t: 0, n: 130300, lab: '1997: 130 300' },
    { t: 4, n: 132000, lab: '2001: 132 000' },
    { t: 13, n: 130300 * Math.pow(q, 13), lab: '2010: ?' }
  ];
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        L(t) = 130 300 · qᵗ, ahol q⁴ = 132 000 / 130 300
      </text>
      <line x1="70" y1="210" x2="520" y2="210" stroke="#475569" strokeWidth="1.5" />
      <line x1="70" y1="215" x2="70" y2="45" stroke="#475569" strokeWidth="1.5" />
      {[0, 4, 8, 13].map((t) => (
        <g key={t}>
          <line x1={sx(t)} y1="210" x2={sx(t)} y2="215" stroke="#475569" />
          <text x={sx(t)} y="228" fontSize="11" textAnchor="middle" fill="#334155">{t}</text>
        </g>
      ))}
      <text x="520" y="244" fontSize="11" textAnchor="end" fill="#334155">t (év, 1997 óta)</text>
      <path d={curvePath((t) => 130300 * Math.pow(q, t), 0, 13.5, sx, sy)} fill="none" stroke="#7c3aed" strokeWidth="3" />
      {pts.map((p, i) => (
        <g key={p.lab}>
          <circle cx={sx(p.t)} cy={sy(p.n)} r="5" fill={i === 2 ? '#db2777' : '#7c3aed'} />
          <text x={sx(p.t) + (i === 2 ? -10 : 8)} y={sy(p.n) - 10} fontSize="12" fontWeight="bold" textAnchor={i === 2 ? 'end' : 'start'} fill={i === 2 ? '#9d174d' : '#4c1d95'}>
            {p.lab}
          </text>
        </g>
      ))}
    </svg>
  );
};

// 3. ábra: ólom- és bizmutizotóp bomlása (2. feladat)
export const IsotopeRaceSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const sx = (t: number) => 60 + t * 1.8;
  const sy = (r: number) => 215 - r * 160;
  return (
    <svg viewBox="0 0 560 260" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="250" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="290" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Felezési idő: ólom 27 perc, bizmut 19,7 perc
      </text>
      <line x1="60" y1="215" x2="530" y2="215" stroke="#475569" strokeWidth="1.5" />
      <line x1="60" y1="220" x2="60" y2="45" stroke="#475569" strokeWidth="1.5" />
      {[0, 60, 120, 180, 240].map((t) => (
        <g key={t}>
          <line x1={sx(t)} y1="215" x2={sx(t)} y2="220" stroke="#475569" />
          <text x={sx(t)} y="233" fontSize="11" textAnchor="middle" fill="#334155">{t}</text>
        </g>
      ))}
      <text x="530" y="248" fontSize="11" textAnchor="end" fill="#334155">t (perc)</text>
      <text x="54" y={sy(1) + 4} fontSize="11" textAnchor="end" fill="#334155">N₀</text>
      <path d={curvePath((t) => Math.pow(0.5, t / 27), 0, 255, sx, sy)} fill="none" stroke="#475569" strokeWidth="3" />
      <path d={curvePath((t) => Math.pow(0.5, t / 19.7), 0, 255, sx, sy)} fill="none" stroke="#db2777" strokeWidth="3" />
      <rect x="330" y="60" width="190" height="60" rx="10" fill="#ffffff" stroke="#cbd5e1" />
      <line x1="342" y1="80" x2="372" y2="80" stroke="#475569" strokeWidth="3" />
      <text x="380" y="84" fontSize="12" fill="#334155">ólom: N₀ · (1/2)^(t/27)</text>
      <line x1="342" y1="104" x2="372" y2="104" stroke="#db2777" strokeWidth="3" />
      <text x="380" y="108" fontSize="12" fill="#9d174d">bizmut: N₀ · (1/2)^(t/19,7)</text>
      <text x="290" y="160" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">Mikor lesz ólomból tízszer annyi?</text>
    </svg>
  );
};

// 4. ábra: a kólibaktérium hengere és osztódása (3. feladat)
export const EcoliCylinderSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Kólibaktérium: forgáshenger, m = 2 μm, d = 0,5 μm
    </text>
    <ellipse cx="70" cy="110" rx="18" ry="38" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
    <line x1="70" y1="72" x2="230" y2="72" stroke="#0f766e" strokeWidth="2" />
    <line x1="70" y1="148" x2="230" y2="148" stroke="#0f766e" strokeWidth="2" />
    <path d="M230 72 A18 38 0 0 1 230 148" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2" />
    <path d="M230 72 A18 38 0 0 0 230 148" fill="none" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="4 3" />
    <line x1="70" y1="168" x2="230" y2="168" stroke="#475569" />
    <text x="150" y="186" fontSize="12" textAnchor="middle" fill="#334155">m = 2 · 10⁻⁶ m</text>
    <line x1="30" y1="72" x2="30" y2="148" stroke="#475569" />
    <text x="24" y="114" fontSize="11" textAnchor="end" fill="#334155">d</text>
    <text x="150" y="214" fontSize="11" textAnchor="middle" fill="#475569">V = r²π · m, A = 2r²π + 2rπ · m</text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <text x={330 + i * 55} y="70" fontSize="11" textAnchor="middle" fill="#334155">{i * 15} perc</text>
        {Array.from({ length: Math.pow(2, i) }).map((_, j) => (
          <rect key={j} x={318 + i * 55} y={80 + j * 13} width="24" height="9" rx="4.5" fill="#99f6e4" stroke="#0f766e" />
        ))}
      </g>
    ))}
    <text x="412" y="200" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#115e59">B(t) = 3 000 000 · 2^(t/15)</text>
    <text x="412" y="220" fontSize="11" textAnchor="middle" fill="#475569">15 percenként megduplázódik</text>
  </svg>
);

// 5. ábra: Hajni és Csilla befektetése (Tudáspróba I. 6.)
export const InvestmentCompareSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const h = 50000 * Math.pow(1.08, 3);
  const c = 50000 * Math.pow(1.007, 34);
  const sy = (v: number) => 210 - (v - 40000) / 160;
  const bars = [
    { x: 120, v: 50000, lab: 'kezdőtőke', sub: '50 000 Ft', col: '#94a3b8' },
    { x: 260, v: h, lab: 'Hajni: 8%/év, 3 év', sub: '≈ 62 986 Ft', col: '#7c3aed' },
    { x: 400, v: c, lab: 'Csilla: 0,7%/hó, 34 hó', sub: '≈ 63 383 Ft', col: '#db2777' }
  ];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Kinek a befektetése éri meg jobban?
      </text>
      <line x1="60" y1="210" x2="520" y2="210" stroke="#475569" strokeWidth="1.5" />
      {bars.map((b) => (
        <g key={b.lab}>
          <rect x={b.x - 40} y={sy(b.v)} width="80" height={210 - sy(b.v)} rx="6" fill={b.col} opacity="0.85" />
          <text x={b.x} y={sy(b.v) - 8} fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">{b.sub}</text>
          <text x={b.x} y="228" fontSize="11" textAnchor="middle" fill="#334155">{b.lab}</text>
        </g>
      ))}
      <text x="280" y="244" fontSize="10" textAnchor="middle" fill="#64748b">(a függőleges tengely 40 000 Ft-nál kezdődik)</text>
    </svg>
  );
};
