import React from 'react';

const FONT = 'system-ui, sans-serif';

/** A műveletek sorrendjének három lépése (tankönyv 21. o.). */
export const OrderRulesSvg: React.FC<{ className?: string }> = ({ className }) => {
  const steps = [
    { n: '1.', t: 'Zárójel ( )', s: 'ami zárójelben van, azzal kezdünk', c: '#8b5cf6', bg: '#ede9fe' },
    { n: '2.', t: 'Szorzás · és osztás :', s: 'balról jobbra haladva', c: '#0ea5e9', bg: '#e0f2fe' },
    { n: '3.', t: 'Összeadás + és kivonás −', s: 'balról jobbra haladva', c: '#f97316', bg: '#ffedd5' }
  ];
  return (
    <svg viewBox="0 0 340 210" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="208" rx="12" fill="#ffffff" stroke="#cbd5e1" />
      {steps.map((st, i) => (
        <g key={st.n}>
          <rect x="20" y={14 + i * 66} width="300" height="50" rx="12" fill={st.bg} stroke={st.c} strokeWidth="2" />
          <circle cx="46" cy={39 + i * 66} r="16" fill={st.c} />
          <text x="46" y={45 + i * 66} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#ffffff">{st.n}</text>
          <text x="72" y={35 + i * 66} fontSize="14" fontWeight="bold" fill="#0f172a">{st.t}</text>
          <text x="72" y={53 + i * 66} fontSize="11" fill="#334155">{st.s}</text>
          {i < 2 && <polygon points={`170,${66 + i * 66} 162,${60 + i * 66} 178,${60 + i * 66}`} fill="#64748b" />}
        </g>
      ))}
    </svg>
  );
};

/** Lépésenkénti számolás körbe írt sorszámokkal (munkafüzet 16. o., 1. feladat). */
export const StepCirclesSvg: React.FC<{ className?: string }> = ({ className }) => {
  const tokens = ['180', '+', '8', '·', '42', '−', '9', '·', '11'];
  const order: Record<number, string> = { 1: '③', 3: '①', 5: '④', 7: '②' };
  const x0 = 30;
  const w = 32;
  return (
    <svg viewBox="0 0 340 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="198" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      {tokens.map((t, i) => (
        <g key={i}>
          {order[i] && (
            <text x={x0 + i * w} y="32" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#7c3aed">{order[i]}</text>
          )}
          <text x={x0 + i * w} y="62" textAnchor="middle" fontSize="18" fontWeight="bold" fill={i % 2 ? '#dc2626' : '#0f172a'}>{t}</text>
        </g>
      ))}
      <line x1={x0 + 2 * w - 12} y1="70" x2={x0 + 4 * w + 14} y2="70" stroke="#0ea5e9" strokeWidth="3" />
      <line x1={x0 + 6 * w - 10} y1="70" x2={x0 + 8 * w + 12} y2="70" stroke="#0ea5e9" strokeWidth="3" />
      <text x="170" y="100" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">= 180 + 336 − 99</text>
      <text x="170" y="130" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">= 516 − 99</text>
      <text x="170" y="160" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#16a34a">= 417</text>
      <text x="170" y="188" textAnchor="middle" fontSize="11" fill="#475569">Először a két szorzás, aztán balról jobbra az összeadás és a kivonás.</text>
    </svg>
  );
};

/** Horgászbotok hossza műveletsorokkal (tankönyv 21. o., 2. feladat). */
export const FishingRodsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rods = [
    { y: 40, t: '124 · 8 cm − 129 · 6 cm', line: '46 dm · 3 + 47 dm · 5', c: '#16a34a' },
    { y: 90, t: '97 · 9 cm − 663 cm', line: '764 dm − 127 · 4 dm', c: '#2563eb' },
    { y: 140, t: '739 cm − 67 cm · 8', line: '6 · 124 dm − 525 dm', c: '#dc2626' }
  ];
  return (
    <svg viewBox="0 0 400 190" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <linearGradient id="oo-water" x1="0" x2="1">
          <stop offset="0" stopColor="#bbf7d0" />
          <stop offset="0.45" stopColor="#bfdbfe" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="398" height="188" rx="12" fill="url(#oo-water)" stroke="#93c5fd" />
      {rods.map((r) => (
        <g key={r.y}>
          <circle cx="24" cy={r.y + 14} r="9" fill="#fde68a" stroke="#92400e" />
          <line x1="30" y1={r.y + 18} x2="190" y2={r.y - 12} stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <text x="110" y={r.y - 6} textAnchor="middle" fontSize="11" fontWeight="bold" fill={r.c} transform={`rotate(-10 110 ${r.y - 6})`}>
            {r.t}
          </text>
          <path d={`M 190 ${r.y - 12} Q 290 ${r.y - 10} 370 ${r.y + 22}`} fill="none" stroke="#334155" strokeWidth="1" />
          <circle cx="370" cy={r.y + 22} r="4" fill={r.c} />
          <text x="290" y={r.y + 12} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">{r.line}</text>
        </g>
      ))}
    </svg>
  );
};

/** Zárójellel és zárójel nélkül (munkafüzet 17. o., 5. feladat). */
export const ParenthesesCompareSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="338" height="168" rx="12" fill="#fff7ed" stroke="#fdba74" />
    <rect x="16" y="16" width="148" height="138" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
    <rect x="176" y="16" width="148" height="138" rx="12" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
    <text x="90" y="38" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">Zárójel nélkül</text>
    <text x="250" y="38" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">Zárójellel</text>
    <text x="90" y="68" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">3 · 139 + 117</text>
    <text x="90" y="96" textAnchor="middle" fontSize="13" fill="#334155">= 417 + 117</text>
    <text x="90" y="128" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#b91c1c">= 534</text>
    <text x="250" y="68" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">3 · (139 + 117)</text>
    <text x="250" y="96" textAnchor="middle" fontSize="13" fill="#334155">= 3 · 256</text>
    <text x="250" y="128" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1d4ed8">= 768</text>
  </svg>
);

/** Malomtábla a munkafüzet számaival (munkafüzet 17. o., 5. feladat). */
export const MILL_POINTS: { v: number; x: number; y: number }[] = (() => {
  const sq = [
    { o: 20, s: 260 },
    { o: 60, s: 180 },
    { o: 100, s: 100 }
  ];
  // sorrend a munkafüzet rajza szerint
  const layout: [number, number, number][] = [
    // [négyzet, oszlop 0..2, sor 0..2]
    [0, 0, 0], [0, 1, 0], [0, 2, 0],
    [1, 0, 0], [1, 1, 0], [1, 2, 0],
    [2, 0, 0], [2, 1, 0], [2, 2, 0],
    [0, 0, 1], [1, 0, 1], [2, 0, 1], [2, 2, 1], [1, 2, 1], [0, 2, 1],
    [2, 0, 2], [2, 1, 2], [2, 2, 2],
    [1, 0, 2], [1, 1, 2], [1, 2, 2],
    [0, 0, 2], [0, 1, 2], [0, 2, 2]
  ];
  const values = [531, 201, 996, 124, 534, 195, 313, 640, 768, 449, 678, 215, 976, 144, 504, 423, 567, 702, 455, 946, 558, 135, 668, 176];
  return layout.map(([q, c, r], i) => ({ v: values[i], x: sq[q].o + (sq[q].s / 2) * c, y: sq[q].o + (sq[q].s / 2) * r }));
})();

export const MillBoardLines: React.FC = () => (
  <g stroke="#78350f" strokeWidth="3" fill="none">
    <rect x="20" y="20" width="260" height="260" />
    <rect x="60" y="60" width="180" height="180" />
    <rect x="100" y="100" width="100" height="100" />
    <line x1="150" y1="20" x2="150" y2="100" />
    <line x1="150" y1="200" x2="150" y2="280" />
    <line x1="20" y1="150" x2="100" y2="150" />
    <line x1="200" y1="150" x2="280" y2="150" />
  </g>
);

export const MillBoardSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 300 300" className={className ?? 'w-full h-auto max-w-[320px] mx-auto'} fontFamily={FONT}>
    <rect x="1" y="1" width="298" height="298" rx="14" fill="#fef3c7" stroke="#f59e0b" />
    <MillBoardLines />
    {MILL_POINTS.map((p) => (
      <g key={p.v}>
        <circle cx={p.x} cy={p.y} r="15" fill="#ffffff" stroke="#78350f" strokeWidth="1.5" />
        <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">{p.v}</text>
      </g>
    ))}
  </svg>
);
