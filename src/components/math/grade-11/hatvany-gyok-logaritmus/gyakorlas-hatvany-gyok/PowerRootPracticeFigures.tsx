import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// 1. ábra: a fejezet eddigi útja – egész kitevőtől a racionális kitevőig
export const ChapterMapSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const boxes = [
    { x: 20, title: '1. Egész kitevő', l1: 'a⁰ = 1, a⁻ⁿ = 1/aⁿ', l2: 'azonosságok', color: '#7c3aed' },
    { x: 155, title: '2. n-edik gyök', l1: 'páros n: a ≥ 0', l2: 'páratlan n: minden a', color: '#0f766e' },
    { x: 290, title: '3. 1/n kitevő', l1: 'a^(1/n) = ⁿ√a', l2: 'a ≥ 0', color: '#db2777' },
    { x: 425, title: '4. p/q kitevő', l1: 'a^(p/q) = (q-adik gyök a)^p', l2: 'a > 0, negatív is', color: '#c2410c' }
  ];
  return (
    <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="30" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Hatvány és gyök – amit eddig tanultunk
      </text>
      {boxes.map((b, i) => (
        <g key={b.title}>
          <rect x={b.x} y="50" width="118" height="110" rx="12" fill="#ffffff" stroke={b.color} strokeWidth="2" />
          <rect x={b.x} y="50" width="118" height="28" rx="12" fill={b.color} />
          <text x={b.x + 59} y="69" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#ffffff">{b.title}</text>
          <text x={b.x + 59} y="108" fontSize="10" textAnchor="middle" fill="#334155">{b.l1}</text>
          <text x={b.x + 59} y="132" fontSize="10" textAnchor="middle" fill="#64748b">{b.l2}</text>
          {i < 3 && <polygon points={`${b.x + 122},100 ${b.x + 133},105 ${b.x + 122},110`} fill="#475569" />}
        </g>
      ))}
      <rect x="60" y="176" width="440" height="36" rx="10" fill="#ede9fe" stroke="#7c3aed" />
      <text x="280" y="199" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#4c1d95">
        Permanenciaelv: az azonosságok pozitív alapra minden racionális kitevőre érvényesek
      </text>
    </svg>
  );
};

// 2. ábra: számegyenes a 2. feladat számaival
export const PracticeNumberLineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x = (v: number) => 60 + (v + 3) * 90;
  const pts = [
    { v: -2.5, label: '∛(−125/8)', up: true, dx: 0, anchor: 'middle' as const },
    { v: -1, label: '−3⁰', up: false, dx: 0, anchor: 'middle' as const },
    { v: 0, label: 'π⁰ − 2⁴ · 4⁻²', up: true, dx: -20, anchor: 'end' as const },
    { v: 0.16, label: '16 · 10⁻²', up: false, dx: 20, anchor: 'start' as const },
    { v: 0.1875, label: '∛27 · 2⁻⁴', up: true, dx: 30, anchor: 'start' as const }
  ];
  return (
    <svg viewBox="0 0 560 210" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="200" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Hová kerülnek a számok a számegyenesen?
      </text>
      <line x1="40" y1="110" x2="525" y2="110" stroke="#334155" strokeWidth="2" />
      <polygon points="525,104 537,110 525,116" fill="#334155" />
      {[-3, -2, -1, 0, 1, 2].map((t) => (
        <g key={t}>
          <line x1={x(t)} y1="102" x2={x(t)} y2="118" stroke="#334155" strokeWidth="2" />
          <text x={x(t)} y="136" fontSize="12" textAnchor="middle" fill="#334155">{t === 0 ? '0' : t < 0 ? `−${-t}` : t}</text>
        </g>
      ))}
      {pts.map((p) => (
        <g key={p.label}>
          <circle cx={x(p.v)} cy="110" r="5" fill="#db2777" stroke="#831843" />
          <line x1={x(p.v)} y1={p.up ? 104 : 116} x2={x(p.v) + p.dx} y2={p.up ? 76 : 150} stroke="#db2777" strokeWidth="1" />
          <text
            x={x(p.v) + p.dx}
            y={p.up ? 70 : 164}
            fontSize="11"
            textAnchor={p.anchor}
            fontWeight="bold"
            fill="#9d174d"
          >
            {p.label}
          </text>
        </g>
      ))}
      <text x="280" y="192" fontSize="11" textAnchor="middle" fill="#64748b">−5/2; −1; 0; 0,16; 3/16 = 0,1875</text>
    </svg>
  );
};

// 3. ábra: 2 hatványai – egész és tört kitevővel
export const PowersOfTwoSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { l: '1/8', r: '2⁻³' },
    { l: '1/√2', r: '2^(−1/2)' },
    { l: '1', r: '2⁰' },
    { l: '⁵√16', r: '2^(4/5)' },
    { l: '4', r: '2²' },
    { l: '8', r: '2³' },
    { l: '16', r: '2⁴' },
    { l: '32', r: '2⁵' }
  ];
  return (
    <svg viewBox="0 0 560 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="240" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Írjuk át mindent 2 hatványaként – utána csak a kitevőkkel számolunk
      </text>
      {rows.map((r, i) => {
        const cx = 50 + (i % 4) * 130;
        const cy = 60 + Math.floor(i / 4) * 80;
        return (
          <g key={r.l}>
            <rect x={cx} y={cy} width="115" height="60" rx="10" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.5" />
            <text x={cx + 57} y={cy + 25} fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f172a">{r.l}</text>
            <text x={cx + 57} y={cy + 48} fontSize="14" textAnchor="middle" fontWeight="bold" fill="#7c3aed">= {r.r}</text>
          </g>
        );
      })}
      <text x="280" y="232" fontSize="12" textAnchor="middle" fill="#475569">
        Például ⁵√16 · 2⁻³ = 2^(4/5) · 2⁻³ = 2^(4/5 − 3) = 2^(−11/5)
      </text>
    </svg>
  );
};

// 4. ábra: ha 5ᵏ = 3 – a kitevőt szétbontjuk
export const ExponentSubstitutionSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 560 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="550" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <rect x="200" y="20" width="160" height="40" rx="12" fill="#7c3aed" />
    <text x="280" y="47" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#ffffff">5ᵏ = 3</text>
    <rect x="20" y="85" width="250" height="120" rx="12" fill="#ffffff" stroke="#0f766e" strokeWidth="1.8" />
    <text x="145" y="110" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#0f766e">5^(3k − 2)</text>
    <text x="145" y="137" fontSize="13" textAnchor="middle" fill="#334155">= 5^(3k) : 5²</text>
    <text x="145" y="162" fontSize="13" textAnchor="middle" fill="#334155">= (5ᵏ)³ : 25</text>
    <text x="145" y="189" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f766e">= 27/25</text>
    <rect x="290" y="85" width="250" height="120" rx="12" fill="#ffffff" stroke="#db2777" strokeWidth="1.8" />
    <text x="415" y="110" fontSize="15" textAnchor="middle" fontWeight="bold" fill="#db2777">5^(k + 1)</text>
    <text x="415" y="137" fontSize="13" textAnchor="middle" fill="#334155">= 5ᵏ · 5¹</text>
    <text x="415" y="162" fontSize="13" textAnchor="middle" fill="#334155">= 3 · 5</text>
    <text x="415" y="189" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#db2777">= 15   (nem 3 + 1!)</text>
    <line x1="230" y1="60" x2="145" y2="85" stroke="#0f766e" strokeWidth="1.5" />
    <line x1="330" y1="60" x2="415" y2="85" stroke="#db2777" strokeWidth="1.5" />
  </svg>
);

// 5. ábra: 3⁻² vagy 16^(−3/4)? – összehasonlítás a számegyenes 0 és 0,2 közötti szakaszán
export const CompareZoomSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x = (v: number) => 50 + v * 2300;
  return (
    <svg viewBox="0 0 560 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="550" height="190" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="280" y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        3⁻² = 1/9 és 16^(−3/4) = 1/2³ = 1/8
      </text>
      <line x1="40" y1="110" x2="525" y2="110" stroke="#334155" strokeWidth="2" />
      {[0, 0.05, 0.1, 0.15, 0.2].map((t) => (
        <g key={t}>
          <line x1={x(t)} y1="103" x2={x(t)} y2="117" stroke="#334155" strokeWidth="1.5" />
          <text x={x(t)} y="135" fontSize="11" textAnchor="middle" fill="#334155">{String(t).replace('.', ',')}</text>
        </g>
      ))}
      <circle cx={x(1 / 9)} cy="110" r="6" fill="#0f766e" />
      <text x={x(1 / 9) - 6} y="80" fontSize="13" textAnchor="end" fontWeight="bold" fill="#0f766e">1/9 ≈ 0,111</text>
      <circle cx={x(1 / 8)} cy="110" r="6" fill="#db2777" />
      <text x={x(1 / 8) + 6} y="80" fontSize="13" textAnchor="start" fontWeight="bold" fill="#db2777">1/8 = 0,125</text>
      <text x="280" y="172" fontSize="12" textAnchor="middle" fill="#475569">Azonos számlálójú törtek közül az a nagyobb, amelyiknek kisebb a nevezője: 1/8 &gt; 1/9.</text>
    </svg>
  );
};
