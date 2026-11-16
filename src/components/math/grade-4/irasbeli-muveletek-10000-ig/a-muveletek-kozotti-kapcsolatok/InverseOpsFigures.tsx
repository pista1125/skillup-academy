import React from 'react';

const FONT = 'system-ui, sans-serif';
const UNK = '#dc2626';

/** Az összetartozó (egymást „visszacsináló”) műveletek. */
export const InversePairsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const pairs = [
    { a: '+', b: '−', ta: 'összeadás', tb: 'kivonás', c: '#f59e0b', bg: '#fef3c7', y: 18 },
    { a: '·', b: ':', ta: 'szorzás', tb: 'osztás', c: '#10b981', bg: '#d1fae5', y: 118 }
  ];
  return (
    <svg viewBox="0 0 340 220" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <marker id="inv-arr-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#334155" />
        </marker>
      </defs>
      <rect x="1" y="1" width="338" height="218" rx="14" fill="#ffffff" stroke="#cbd5e1" />
      {pairs.map((p) => (
        <g key={p.a}>
          <rect x="14" y={p.y} width="312" height="86" rx="14" fill={p.bg} stroke={p.c} strokeWidth="2" />
          <circle cx="66" cy={p.y + 40} r="26" fill={p.c} />
          <text x="66" y={p.y + 50} textAnchor="middle" fontSize="30" fontWeight="bold" fill="#ffffff">{p.a}</text>
          <text x="66" y={p.y + 80} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{p.ta}</text>
          <circle cx="274" cy={p.y + 40} r="26" fill={p.c} />
          <text x="274" y={p.y + 50} textAnchor="middle" fontSize="30" fontWeight="bold" fill="#ffffff">{p.b}</text>
          <text x="274" y={p.y + 80} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{p.tb}</text>
          <path d={`M 98 ${p.y + 30} Q 170 ${p.y + 6} 242 ${p.y + 30}`} fill="none" stroke="#334155" strokeWidth="2" markerEnd="url(#inv-arr-a)" />
          <path d={`M 242 ${p.y + 52} Q 170 ${p.y + 76} 98 ${p.y + 52}`} fill="none" stroke="#334155" strokeWidth="2" markerEnd="url(#inv-arr-a)" />
          <text x="170" y={p.y + 46} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">visszacsinálja</text>
        </g>
      ))}
    </svg>
  );
};

/** Két egymás utáni nyíl összevonása (tankönyv 105. o., 1. feladat). */
export const CombineArrowsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows = [
    { s: '1258', o1: '+ 2425', m: 'A', o2: '+ 3575', e: 'B', q: '+ 6000', c: '#facc15' },
    { s: '8248', o1: ': 4', m: 'J', o2: ': 2', e: 'K', q: ': 8', c: '#fb923c' }
  ];
  return (
    <svg viewBox="0 0 340 230" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <marker id="inv-arr-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#dc2626" />
        </marker>
        <marker id="inv-arr-c" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#2563eb" />
        </marker>
      </defs>
      <rect x="1" y="1" width="338" height="228" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {rows.map((r, i) => {
        const y = 40 + i * 108;
        return (
          <g key={r.s}>
            <text x="44" y={y + 5} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{r.s}</text>
            <line x1="72" y1={y} x2="132" y2={y} stroke="#dc2626" strokeWidth="2" markerEnd="url(#inv-arr-b)" />
            <text x="102" y={y - 8} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7f1d1d">{r.o1}</text>
            <rect x="136" y={y - 14} width="60" height="28" rx="14" fill={r.c} />
            <text x="166" y={y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{r.m}</text>
            <line x1="198" y1={y} x2="258" y2={y} stroke="#dc2626" strokeWidth="2" markerEnd="url(#inv-arr-b)" />
            <text x="228" y={y - 8} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7f1d1d">{r.o2}</text>
            <rect x="262" y={y - 14} width="60" height="28" rx="14" fill={r.c} />
            <text x="292" y={y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{r.e}</text>
            <path d={`M 44 ${y + 12} L 44 ${y + 40} L 292 ${y + 40} L 292 ${y + 18}`} fill="none" stroke="#2563eb" strokeWidth="2" markerEnd="url(#inv-arr-c)" />
            <rect x="140" y={y + 30} width="60" height="22" rx="6" fill="#ffffff" stroke="#2563eb" />
            <text x="170" y={y + 46} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">{r.q}</text>
          </g>
        );
      })}
      <text x="170" y="222" textAnchor="middle" fontSize="11" fill="#334155">Két lépés helyett egy lépés – az eredmény ugyanaz.</text>
    </svg>
  );
};

/** „Melyik számra gondoltam?” – visszafelé számolás (105. o., 2. feladat A). */
export const ThinkNumberSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 340 170" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
    <defs>
      <marker id="inv-arr-d" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 z" fill="#dc2626" />
      </marker>
    </defs>
    <rect x="1" y="1" width="338" height="168" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <rect x="12" y="56" width="70" height="30" rx="15" fill="#fbbf24" />
    <text x="47" y="76" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">1445</text>
    <polygon points="170,46 192,62 184,88 156,88 148,62" fill="#f97316" />
    <text x="170" y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#ffffff">?</text>
    <rect x="258" y="56" width="70" height="30" rx="15" fill="#fbbf24" />
    <text x="293" y="76" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">4135</text>
    <line x1="146" y1="71" x2="86" y2="71" stroke="#dc2626" strokeWidth="2" markerEnd="url(#inv-arr-d)" />
    <text x="116" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7f1d1d">− 1345</text>
    <line x1="194" y1="71" x2="254" y2="71" stroke="#dc2626" strokeWidth="2" markerEnd="url(#inv-arr-d)" />
    <text x="224" y="62" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7f1d1d">+ 1345</text>
    <path d="M 47 88 L 47 116 L 293 116 L 293 92" fill="none" stroke="#dc2626" strokeWidth="2" markerEnd="url(#inv-arr-d)" />
    <text x="170" y="110" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>?</text>
    <text x="170" y="146" textAnchor="middle" fontSize="12" fill="#7c2d12">Visszafelé: 4135 − 1345 = ?  és  1445 + 1345 = ?</text>
    <text x="170" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">Melyik számra gondoltam?</text>
  </svg>
);

/** A munkafüzet folyamatábrája (19. o., 1. feladat). */
export const FlowchartSvg: React.FC<{ className?: string; active?: number }> = ({ className, active = -1 }) => {
  const hl = (i: number) => (i === active ? '#fde047' : '#fef9c3');
  return (
    <svg viewBox="0 0 300 330" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <defs>
        <marker id="inv-arr-e" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#334155" />
        </marker>
      </defs>
      <rect x="1" y="1" width="298" height="328" rx="14" fill="#ffffff" stroke="#cbd5e1" />
      <ellipse cx="130" cy="28" rx="44" ry="16" fill={active === 0 ? '#f87171' : '#dc2626'} />
      <text x="130" y="33" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">START</text>
      <line x1="130" y1="44" x2="130" y2="66" stroke="#334155" strokeWidth="2" markerEnd="url(#inv-arr-e)" />
      <rect x="50" y="70" width="160" height="40" fill={hl(1)} stroke="#334155" strokeWidth="1.5" />
      <text x="130" y="95" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">Adj a számhoz 1348-at!</text>
      <line x1="130" y1="110" x2="130" y2="132" stroke="#334155" strokeWidth="2" markerEnd="url(#inv-arr-e)" />
      <polygon points="130,136 210,180 130,224 50,180" fill={hl(2)} stroke="#334155" strokeWidth="1.5" />
      <text x="130" y="174" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">Kisebb az összeg</text>
      <text x="130" y="190" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">5000-nél?</text>
      <path d="M 210 180 L 262 180 L 262 90 L 214 90" fill="none" stroke="#334155" strokeWidth="2" markerEnd="url(#inv-arr-e)" />
      <text x="236" y="172" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">igen</text>
      <line x1="130" y1="224" x2="130" y2="248" stroke="#334155" strokeWidth="2" markerEnd="url(#inv-arr-e)" />
      <text x="150" y="242" fontSize="12" fontWeight="bold" fill="#b91c1c">nem</text>
      <rect x="66" y="252" width="128" height="30" fill={hl(3)} stroke="#334155" strokeWidth="1.5" />
      <text x="130" y="272" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">Oszd el 2-vel!</text>
      <line x1="130" y1="282" x2="130" y2="298" stroke="#334155" strokeWidth="2" markerEnd="url(#inv-arr-e)" />
      <ellipse cx="130" cy="312" rx="36" ry="14" fill={active === 4 ? '#f87171' : '#dc2626'} />
      <text x="130" y="317" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">CÉL</text>
    </svg>
  );
};

/** Az összeg fele = a felek összege (105. o., 4. feladat). */
export const HalfOfSumSvg: React.FC<{ className?: string }> = ({ className }) => {
  const w1 = 4646 / 32;
  const w2 = 3788 / 32;
  return (
    <svg viewBox="0 0 340 200" className={className ?? 'w-full h-auto'} fontFamily={FONT}>
      <rect x="1" y="1" width="338" height="198" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <text x="170" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">(4646 + 3788) : 2 = 4646 : 2 + 3788 : 2</text>
      {/* teljes szalag */}
      <rect x="20" y="40" width={w1} height="30" fill="#60a5fa" stroke="#1e3a8a" />
      <rect x={20 + w1} y="40" width={w2} height="30" fill="#f472b6" stroke="#831843" />
      <text x={20 + w1 / 2} y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">4646</text>
      <text x={20 + w1 + w2 / 2} y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">3788</text>
      {/* két fél */}
      {[0, 1].map((k) => (
        <g key={k} transform={`translate(${20 + k * ((w1 + w2) / 2 + 12)} 100)`}>
          <rect x="0" y="0" width={w1 / 2} height="30" fill="#93c5fd" stroke="#1e3a8a" />
          <rect x={w1 / 2} y="0" width={w2 / 2} height="30" fill="#f9a8d4" stroke="#831843" />
          <text x={w1 / 4} y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">2323</text>
          <text x={w1 / 2 + w2 / 4} y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#831843">1894</text>
        </g>
      ))}
      <line x1={20 + (w1 + w2) / 2} y1="36" x2={20 + (w1 + w2) / 2} y2="76" stroke="#0f172a" strokeWidth="2" strokeDasharray="4 3" />
      <text x="170" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">
        Egy fél: 2323 + 1894 = <tspan fill={UNK}>?</tspan>
      </text>
      <text x="170" y="182" textAnchor="middle" fontSize="11" fill="#166534">Az összeg fele ugyanannyi, mint a felek összege.</text>
    </svg>
  );
};
