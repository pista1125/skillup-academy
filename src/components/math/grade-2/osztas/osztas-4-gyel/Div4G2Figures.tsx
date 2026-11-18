import React from 'react';
import { DIV4_FONT, DotRowsPart, PlatePart } from './Div4G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** 1. Bennfoglalás: 16 bárány, egy karámba 4 fér → 4 karám. */
export const GroupingPensSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
    <rect x="2" y="2" width="476" height="186" rx="16" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
    {[0, 1, 2, 3].map((p) => (
      <g key={p}>
        <rect x={24 + p * 112} y={26} width={96} height={96} rx="10" fill="#dcfce7" stroke="#a16207" strokeWidth="4" strokeDasharray="10 4" />
        {[0, 1, 2, 3].map((s) => (
          <g key={s} transform={`translate(${48 + p * 112 + (s % 2) * 46} ${52 + Math.floor(s / 2) * 44})`}>
            <ellipse cx="0" cy="0" rx="15" ry="11" fill="#ffffff" stroke="#475569" strokeWidth="2" />
            <circle cx="15" cy="-5" r="6" fill="#334155" />
            <line x1="-8" y1="9" x2="-8" y2="17" stroke="#334155" strokeWidth="2.5" />
            <line x1="8" y1="9" x2="8" y2="17" stroke="#334155" strokeWidth="2.5" />
          </g>
        ))}
        <text x={72 + p * 112} y={144} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#a16207">
          {p + 1}. karám
        </text>
      </g>
    ))}
    <text x="240" y="176" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#5b21b6">
      16 : 4 = 4 (4 karám kell)
    </text>
  </svg>
);

/** 2. Szétosztás: 20 süti 4 tányérra → 5 jut egyre. */
export const SharingPlatesSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <PlatePart cx={72 + i * 112} cy={66} count={5} w={96} />
        <text x={72 + i * 112} y={118} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#92400e">
          5
        </text>
      </g>
    ))}
    <text x="240" y="156" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#5b21b6">
      20 : 4 = 5 (egy tányérra 5 jut)
    </text>
  </svg>
);

/** 3. Négyszerese és negyede: 6 ⇄ 24. */
export const FourthArrowsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="2" />
    <defs>
      <marker id="div4-arr-g" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 Z" fill="#16a34a" />
      </marker>
      <marker id="div4-arr-r" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 Z" fill="#dc2626" />
      </marker>
    </defs>
    <rect x="70" y="60" width="70" height="50" rx="10" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
    <text x="105" y="95" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#4c1d95">
      6
    </text>
    <rect x="340" y="60" width="70" height="50" rx="10" fill="#ffffff" stroke="#7c3aed" strokeWidth="3" />
    <text x="375" y="95" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#4c1d95">
      24
    </text>
    <path d="M 145 62 Q 240 0 335 62" fill="none" stroke="#16a34a" strokeWidth="3" markerEnd="url(#div4-arr-g)" />
    <text x="240" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#16a34a">
      négyszerese: 6 · 4 = 24
    </text>
    <path d="M 335 108 Q 240 170 145 108" fill="none" stroke="#dc2626" strokeWidth="3" markerEnd="url(#div4-arr-r)" />
    <text x="240" y="128" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#dc2626">
      negyede: 24 : 4 = 6
    </text>
  </svg>
);

/** 4. Kétszer felezünk: 28 → 14 → 7. */
export const HalveTwiceSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
    <rect x="2" y="2" width="476" height="136" rx="16" fill="#ecfeff" stroke="#67e8f9" strokeWidth="2" />
    {[
      ['28', 40],
      ['14', 200],
      ['7', 360]
    ].map(([t, x]) => (
      <g key={t as string}>
        <rect x={x as number} y={52} width="80" height="52" rx="12" fill="#ffffff" stroke="#0891b2" strokeWidth="3" />
        <text x={(x as number) + 40} y={88} textAnchor="middle" fontSize="28" fontWeight="bold" fill="#155e75">
          {t}
        </text>
      </g>
    ))}
    {[120, 280].map((x) => (
      <g key={x}>
        <line x1={x + 6} y1={78} x2={x + 70} y2={78} stroke="#0e7490" strokeWidth="3" />
        <polygon points={`${x + 76},78 ${x + 66},72 ${x + 66},84`} fill="#0e7490" />
        <text x={x + 40} y={68} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0e7490">
          fele
        </text>
      </g>
    ))}
    <text x="240" y="30" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#5b21b6">
      28 : 4 = 7 (felezd kétszer!)
    </text>
    <text x="240" y="128" textAnchor="middle" fontSize="14" fill="#334155">
      28 : 2 = 14, 14 : 2 = 7
    </text>
  </svg>
);

/** 5. Maradékos osztás: 23 korong négyesével → 5 csoport, maradt 3. */
export const RemainderGroupsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <DotRowsPart x={135} y={36} n={23} perRow={8} gap={30} r={10} groups={5} />
    <text x="240" y="150" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#5b21b6">
      Ennyi csoport lett: 5. Ennyi maradt: 3.
    </text>
    <text x="240" y="182" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#c2410c">
      Ellenőrzés: 5 · 4 + 3 = 23
    </text>
  </svg>
);

/** 6. Hány kalitka kell 11 papagájnak? → 3 (az utolsó nincs tele). */
export const RoundUpCagesSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV4_FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
    {[4, 4, 3].map((cnt, c) => (
      <g key={c}>
        <path d={`M ${34 + c * 150} 110 L ${34 + c * 150} 50 Q ${94 + c * 150} 10 ${154 + c * 150} 50 L ${154 + c * 150} 110 Z`} fill="#ffffff" stroke="#475569" strokeWidth="3" />
        {[1, 2, 3, 4, 5].map((b) => (
          <line key={b} x1={34 + c * 150 + b * 20} y1={36} x2={34 + c * 150 + b * 20} y2={110} stroke="#cbd5e1" strokeWidth="1.5" />
        ))}
        {Array.from({ length: cnt }, (_, i) => (
          <g key={i}>
            <ellipse cx={52 + c * 150 + i * 28} cy={88} rx="10" ry="14" fill="#22c55e" stroke="#166534" strokeWidth="2" />
            <circle cx={52 + c * 150 + i * 28} cy={70} r="7" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
          </g>
        ))}
        <text x={94 + c * 150} y={134} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">
          {cnt === 4 ? 'tele' : 'nincs tele'}
        </text>
      </g>
    ))}
    <text x="240" y="160" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#5b21b6">
      11 papagájnak 3 kalitka kell
    </text>
  </svg>
);

