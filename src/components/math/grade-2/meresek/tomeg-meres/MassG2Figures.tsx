import React from 'react';
import { MASS_FONT, BalancePart, SeesawPart } from './MassG2Parts';

// ---------------------------------------------------------------------------
// 2. A tömeg mérése – tananyag-ábrák (max. 480 px széles)
// ---------------------------------------------------------------------------

const CLS = 'w-full max-w-[480px] h-auto mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MASS_FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** A kétkarú mérleg három állása. */
export const BalanceStatesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={480} h={170} className={className}>
    <BalancePart cx={80} y={50} half={52} tilt={-12} left={[{ kind: 'melon' }]} right={[{ kind: 'apple' }]} panW={56} />
    <BalancePart cx={240} y={50} half={52} tilt={0} left={[{ kind: 'box' }]} right={[{ kind: 'box' }]} panW={56} />
    <BalancePart cx={400} y={50} half={52} tilt={12} left={[{ kind: 'pencil' }]} right={[{ kind: 'book' }]} panW={56} />
    <text x="80" y="140" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b91c1c">
      A bal nehezebb
    </text>
    <text x="80" y="158" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">
      (a bal lent van)
    </text>
    <text x="240" y="140" textAnchor="middle" fontSize="13" fontWeight="900" fill="#15803d">
      Egyensúly
    </text>
    <text x="240" y="158" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">
      (egyforma nehezek)
    </text>
    <text x="400" y="140" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b91c1c">
      A jobb nehezebb
    </text>
    <text x="400" y="158" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#64748b">
      (a jobb lent van)
    </text>
  </Frame>
);

/** Mérleghinta: a nehezebb gyerek oldala száll le. */
export const SeesawSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={480} h={170} className={className}>
    <rect x="2" y="140" width="476" height="28" fill="#bbf7d0" />
    <SeesawPart
      cx={240}
      y={110}
      half={170}
      tilt={7}
      leftKids={[{ name: 'Rozi', kg: 23, color: '#db2777' }]}
      rightKids={[{ name: 'Marci', kg: 28, color: '#2563eb' }]}
    />
    <text x="240" y="30" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a">
      28 kg &gt; 23 kg, ezért Marci oldala száll le.
    </text>
  </Frame>
);

/** 1 kg-os súly, 1 kg liszt, 1 kg alma: mind egyensúlyban. */
export const KgExamplesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={480} h={160} className={className}>
    <BalancePart cx={120} y={46} half={70} tilt={0} left={[{ kind: 'w', kg: 1 }]} right={[{ kind: 'bag', label: 'liszt', color: '#fef3c7' }]} panW={62} />
    <BalancePart
      cx={360}
      y={46}
      half={70}
      tilt={0}
      left={[{ kind: 'w', kg: 1 }]}
      right={[{ kind: 'apple' }, { kind: 'apple' }, { kind: 'apple' }, { kind: 'apple' }, { kind: 'apple' }]}
      panW={80}
    />
    <text x="120" y="140" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0f172a">
      1 kg = egy csomag liszt
    </text>
    <text x="360" y="140" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0f172a">
      1 kg ≈ 5 nagy alma
    </text>
  </Frame>
);

/** Mérlegfajták. */
export const ScaleTypesSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={480} h={160} className={className}>
    {/* kétkarú */}
    <BalancePart cx={64} y={44} half={40} tilt={0} panW={36} />
    <text x="64" y="138" textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">
      kétkarú mérleg
    </text>
    {/* konyhai mutatós */}
    <rect x="148" y="60" width="64" height="50" rx="10" fill="#0ea5e9" stroke="#075985" strokeWidth="2" />
    <circle cx="180" cy="85" r="17" fill="#fff" stroke="#075985" strokeWidth="2" />
    <line x1="180" y1="85" x2="190" y2="74" stroke="#dc2626" strokeWidth="2.5" />
    <path d="M 146 58 Q 180 42 214 58 Z" fill="#cbd5e1" stroke="#334155" strokeWidth="1.6" />
    <text x="180" y="138" textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">
      konyhai mérleg
    </text>
    {/* személymérleg */}
    <rect x="252" y="80" width="76" height="30" rx="8" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
    <rect x="276" y="86" width="28" height="12" rx="2" fill="#1e293b" />
    <text x="290" y="96" textAnchor="middle" fontSize="9" fontWeight="900" fill="#4ade80">
      kg
    </text>
    <text x="290" y="138" textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">
      személymérleg
    </text>
    {/* digitális / bolti */}
    <rect x="364" y="88" width="88" height="22" rx="4" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
    <rect x="370" y="80" width="76" height="8" rx="2" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
    <rect x="396" y="94" width="34" height="11" rx="2" fill="#1e293b" />
    <text x="408" y="138" textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">
      bolti mérleg
    </text>
  </Frame>
);

/** 1 kg toll = 1 kg vas. */
export const FeatherIronSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={360} h={150} className={className}>
    <BalancePart
      cx={180}
      y={50}
      half={100}
      tilt={0}
      left={[{ kind: 'bag', label: 'toll', color: '#e0f2fe' }]}
      right={[{ kind: 'bag', label: 'vas', color: '#cbd5e1' }]}
      panW={84}
    />
    <text x="180" y="22" textAnchor="middle" fontSize="14" fontWeight="900" fill="#15803d">
      1 kg toll és 1 kg vas: egyensúly!
    </text>
  </Frame>
);
