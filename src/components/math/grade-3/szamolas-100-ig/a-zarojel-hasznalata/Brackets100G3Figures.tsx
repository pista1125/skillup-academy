import React from 'react';

type FigProps = { className?: string };

const FONT = 'system-ui, Segoe UI, sans-serif';

const Nut: React.FC<{ x: number; y: number; r?: number }> = ({ x, y, r = 8 }) => (
  <g>
    <ellipse cx={x} cy={y} rx={r} ry={r * 0.85} fill="#b45309" stroke="#78350f" strokeWidth="1.2" />
    <path d={`M ${x} ${y - r * 0.8} L ${x} ${y + r * 0.8}`} stroke="#78350f" strokeWidth="1" />
  </g>
);

/** Dorka 7, Ádám 5 diót szedett, 4 barát között egyenlően: (7 + 5) : 4 = 3 */
export const NutsShareSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 520 230" className={className ?? 'w-full max-w-xl h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="518" height="228" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="70" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#be185d">Dorka: 7</text>
    <rect x="20" y="34" width="100" height="62" rx="10" fill="#fce7f3" stroke="#db2777" />
    {Array.from({ length: 7 }, (_, i) => (
      <Nut key={i} x={36 + (i % 4) * 22} y={52 + Math.floor(i / 4) * 26} />
    ))}
    <text x="70" y="124" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">Ádám: 5</text>
    <rect x="20" y="132" width="100" height="62" rx="10" fill="#dbeafe" stroke="#2563eb" />
    {Array.from({ length: 5 }, (_, i) => (
      <Nut key={i} x={36 + (i % 4) * 22} y={150 + Math.floor(i / 4) * 26} />
    ))}
    {/* zárójel-szerű összefogás */}
    <path d="M 132 40 Q 152 40 152 70 L 152 100 Q 152 114 168 114 Q 152 114 152 128 L 152 160 Q 152 190 132 190" fill="none" stroke="#7c3aed" strokeWidth="3" />
    <text x="190" y="108" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6d28d9">7 + 5</text>
    <text x="190" y="128" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6d28d9">= 12</text>
    <line x1="230" y1="114" x2="262" y2="114" stroke="#64748b" strokeWidth="2.5" />
    <polygon points="262,114 252,109 252,119" fill="#64748b" />
    {[0, 1, 2, 3].map((p) => (
      <g key={p}>
        <ellipse cx={300 + (p % 2) * 110} cy={70 + Math.floor(p / 2) * 90} rx="46" ry="30" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        {[0, 1, 2].map((j) => (
          <Nut key={j} x={282 + (p % 2) * 110 + j * 18} y={70 + Math.floor(p / 2) * 90} />
        ))}
      </g>
    ))}
    <text x="355" y="216" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">(7 + 5) : 4 = 12 : 4 = 3</text>
  </svg>
);

const Pear: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <circle cx={x} cy={y + 4} r="7" fill="#a3e635" stroke="#4d7c0f" />
    <circle cx={x} cy={y - 4} r="4.5" fill="#a3e635" stroke="#4d7c0f" />
    <line x1={x} y1={y - 9} x2={x + 2} y2={y - 13} stroke="#78350f" strokeWidth="1.5" />
  </g>
);
const Plum: React.FC<{ x: number; y: number }> = ({ x, y }) => <ellipse cx={x} cy={y + 2} rx="6" ry="7" fill="#7c3aed" stroke="#4c1d95" />;

/** 4 tányér, mindegyiken 3 körte és 2 szilva: 4 · (3 + 2) = 20 */
export const PlatesSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 520 190" className={className ?? 'w-full max-w-xl h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="518" height="188" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    {[0, 1, 2, 3].map((p) => {
      const cx = 72 + p * 125;
      return (
        <g key={p}>
          <ellipse cx={cx} cy="78" rx="54" ry="32" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx={cx} cy="78" rx="40" ry="22" fill="none" stroke="#cbd5e1" />
          {[0, 1, 2].map((j) => (
            <Pear key={j} x={cx - 26 + j * 15} y={74} />
          ))}
          {[0, 1].map((j) => (
            <Plum key={j} x={cx + 22 + j * 14} y={72} />
          ))}
        </g>
      );
    })}
    <text x="40" y="140" fontSize="14" fill="#334155">1 tányér:</text>
    <text x="150" y="140" fontSize="15" fontWeight="bold" fill="#0f172a">3 + 2 gyümölcs</text>
    <text x="40" y="168" fontSize="14" fill="#334155">4 tányér:</text>
    <text x="150" y="168" fontSize="15" fontWeight="bold" fill="#0f172a">4 · (3 + 2) = 4 · 5 = 20 gyümölcs</text>
  </svg>
);

/** Két gondolatmenet ugyanarra a feladatra. */
export const TwoWaysSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 520 200" className={className ?? 'w-full max-w-xl h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="518" height="198" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="16" y="16" width="236" height="168" rx="12" fill="#ecfccb" stroke="#65a30d" strokeWidth="2" />
    <text x="134" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#3f6212">Külön számolok</text>
    <text x="32" y="72" fontSize="14" fill="#1a2e05">körte: 4 · 3 = 12</text>
    <text x="32" y="98" fontSize="14" fill="#1a2e05">szilva: 4 · 2 = 8</text>
    <text x="32" y="132" fontSize="14" fontWeight="bold" fill="#1a2e05">4 · 3 + 4 · 2</text>
    <text x="32" y="158" fontSize="14" fontWeight="bold" fill="#1a2e05">= 12 + 8 = 20</text>
    <rect x="268" y="16" width="236" height="168" rx="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <text x="386" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#5b21b6">Tányéronként számolok</text>
    <text x="284" y="72" fontSize="14" fill="#2e1065">1 tányér: 3 + 2 = 5</text>
    <text x="284" y="98" fontSize="14" fill="#2e1065">4 tányér: 4 · 5</text>
    <text x="284" y="132" fontSize="14" fontWeight="bold" fill="#2e1065">4 · (3 + 2)</text>
    <text x="284" y="158" fontSize="14" fontWeight="bold" fill="#2e1065">= 4 · 5 = 20</text>
  </svg>
);

/** Ugyanazok a számok – zárójellel és nélküle. */
export const BracketCompareSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 520 200" className={className ?? 'w-full max-w-xl h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="518" height="198" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="16" y="16" width="236" height="168" rx="12" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
    <text x="134" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">Zárójel nélkül</text>
    <text x="134" y="80" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">5 + 3 · 4</text>
    <text x="134" y="114" textAnchor="middle" fontSize="15" fill="#7c2d12">előbb: 3 · 4 = 12</text>
    <text x="134" y="140" textAnchor="middle" fontSize="15" fill="#7c2d12">utána: 5 + 12</text>
    <text x="134" y="172" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#c2410c">= 17</text>
    <rect x="268" y="16" width="236" height="168" rx="12" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" />
    <text x="386" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#5b21b6">Zárójellel</text>
    <text x="386" y="80" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">(5 + 3) · 4</text>
    <text x="386" y="114" textAnchor="middle" fontSize="15" fill="#4c1d95">előbb: 5 + 3 = 8</text>
    <text x="386" y="140" textAnchor="middle" fontSize="15" fill="#4c1d95">utána: 8 · 4</text>
    <text x="386" y="172" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#6d28d9">= 32</text>
  </svg>
);

/** Csapda kivonásnál: 40 − (12 + 8) */
export const MinusBracketSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 480 200" className={className ?? 'w-full max-w-lg h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="478" height="198" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="240" y="30" textAnchor="middle" fontSize="13" fill="#334155">40 matrica volt. Bori 12-t, Ákos 8-at kapott belőle.</text>
    <rect x="20" y="46" width="208" height="134" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
    <text x="124" y="74" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">Jó</text>
    <text x="124" y="106" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#14532d">40 − (12 + 8)</text>
    <text x="124" y="134" textAnchor="middle" fontSize="16" fill="#14532d">= 40 − 20</text>
    <text x="124" y="162" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#14532d">= 20</text>
    <rect x="252" y="46" width="208" height="134" rx="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
    <text x="356" y="74" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#b91c1c">Rossz</text>
    <text x="356" y="106" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#7f1d1d">40 − 12 + 8</text>
    <text x="356" y="134" textAnchor="middle" fontSize="16" fill="#7f1d1d">= 28 + 8</text>
    <text x="356" y="162" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#7f1d1d">= 36</text>
  </svg>
);
