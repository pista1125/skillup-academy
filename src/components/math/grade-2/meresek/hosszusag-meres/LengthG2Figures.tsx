import React from 'react';
import { LEN_FONT, RulerPart, StripePart, PencilPart, CubeRowPart } from './LengthG2Parts';

// ---------------------------------------------------------------------------
// 1. A hosszúság mérése – tananyag-ábrák (max. 480 px széles)
// ---------------------------------------------------------------------------

const CLS = 'w-full max-w-[480px] h-auto mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={LEN_FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string }> = ({ x1, y1, x2, y2, color = '#dc2626' }) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 7;
  const p = (x: number, y: number, ang: number) => `${x + h * Math.cos(ang)},${y + h * Math.sin(ang)}`;
  return (
    <g stroke={color} fill={color} strokeWidth="2.4" strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <polygon points={`${x2},${y2} ${p(x2, y2, a + Math.PI - 0.45)} ${p(x2, y2, a + Math.PI + 0.45)}`} stroke="none" />
      <polygon points={`${x1},${y1} ${p(x1, y1, a - 0.45)} ${p(x1, y1, a + 0.45)}`} stroke="none" />
    </g>
  );
};

const SKIN = '#fcd9b6';
const SKIN_S = '#b45309';

/** Kitárt tenyér (arasz). */
export const HandSpanPart: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="0" cy="0" rx="17" ry="20" fill={SKIN} stroke={SKIN_S} strokeWidth="2" />
    {[-12, -4, 4, 12].map((dx, i) => (
      <rect key={i} x={dx - 4} y={-46 + Math.abs(dx) * 0.6} width="8" height="30" rx="4" fill={SKIN} stroke={SKIN_S} strokeWidth="2" />
    ))}
    <rect x="-44" y="-14" width="30" height="9" rx="4.5" transform="rotate(-25 -14 -10)" fill={SKIN} stroke={SKIN_S} strokeWidth="2" />
  </g>
);

/** Talp oldalról (láb). */
export const FootPart: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -30 0 Q -34 -14 -22 -18 L -10 -40 Q -2 -46 4 -36 L 6 -20 Q 26 -16 32 -6 Q 34 0 28 2 L -26 2 Z" fill={SKIN} stroke={SKIN_S} strokeWidth="2" />
  </g>
);

/** Felfelé tartott hüvelykujj. */
export const ThumbPart: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-18" y="-10" width="34" height="30" rx="9" fill={SKIN} stroke={SKIN_S} strokeWidth="2" />
    <rect x="-16" y="-40" width="12" height="34" rx="6" fill={SKIN} stroke={SKIN_S} strokeWidth="2" />
  </g>
);

/** Pálcikaember kitárt karral (öl). */
export const ArmsPersonPart: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} stroke="#1e293b" strokeWidth="3" strokeLinecap="round">
    <circle cx="0" cy="-34" r="9" fill={SKIN} />
    <line x1="0" y1="-25" x2="0" y2="6" />
    <line x1="-40" y1="-16" x2="40" y2="-16" />
    <line x1="0" y1="6" x2="-10" y2="28" />
    <line x1="0" y1="6" x2="10" y2="28" />
  </g>
);

/** Régi mértékegységek: arasz, láb, hüvelyk, lépés, öl. */
export const OldUnitsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const cols = [48, 140, 232, 324, 420];
  const names = ['arasz', 'láb', 'hüvelyk', 'lépés', 'öl'];
  return (
    <Frame w={470} h={150} className={className}>
      {cols.map((cx, i) => (
        <g key={i}>
          <rect x={cx - 42} y="12" width="84" height="100" rx="10" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.5" />
          <text x={cx} y="134" textAnchor="middle" fontSize="16" fontWeight="900" fill="#9a3412">
            {names[i]}
          </text>
        </g>
      ))}
      <HandSpanPart x={52} y={78} s={0.9} />
      <Arrow x1={14} y1={98} x2={70} y2={40} />
      <FootPart x={140} y={80} s={1.1} />
      <Arrow x1={104} y1={98} x2={176} y2={98} />
      <ThumbPart x={234} y={78} s={1} />
      <Arrow x1={210} y1={34} x2={210} y2={62} />
      <g transform="translate(300 64) scale(0.45)">
        <FootPart x={0} y={0} />
      </g>
      <g transform="translate(350 64) scale(0.45)">
        <FootPart x={0} y={0} />
      </g>
      <Arrow x1={290} y1={86} x2={358} y2={86} />
      <ArmsPersonPart x={420} y={72} s={0.95} />
      <Arrow x1={382} y1={44} x2={458} y2={44} />
    </Frame>
  );
};

/** Ugyanaz a ceruza kis kockákkal és rózsaszín rudakkal mérve. */
export const UnitRodsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const U = 26;
  const X = 70;
  return (
    <Frame w={420} h={176} className={className}>
      <PencilPart x1={X} x2={X + 8 * U} y={30} />
      <CubeRowPart x={X} y={52} n={8} unit={U} />
      <text x={X + 8 * U + 14} y={71} fontSize="15" fontWeight="900" fill="#334155">
        8 kis kocka
      </text>
      {Array.from({ length: 4 }, (_, i) => (
        <rect key={i} x={X + i * 2 * U} y={92} width={2 * U} height={U} fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.4" />
      ))}
      <text x={X + 8 * U + 14} y={111} fontSize="15" fontWeight="900" fill="#9d174d">
        4 rózsaszín rúd
      </text>
      <text x="210" y="154" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
        Nagyobb egységből kevesebb kell!
      </text>
      <text x="14" y="36" fontSize="13" fontWeight="bold" fill="#475569">
        ceruza
      </text>
    </Frame>
  );
};

/** 1 cm, 1 dm = 10 cm, 1 m = 10 dm = 100 cm. */
export const CmDmMSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={470} h={210} className={className}>
    {/* 1 cm */}
    <rect x="24" y="22" width="18" height="18" fill="#fff" stroke="#475569" strokeWidth="2" />
    <text x="54" y="37" fontSize="16" fontWeight="900" fill="#334155">
      1 cm
    </text>
    <text x="118" y="37" fontSize="13" fontWeight="bold" fill="#64748b">
      egy kis kocka
    </text>
    {/* 1 dm */}
    <CubeRowPart x={24} y={66} n={10} unit={18} />
    <rect x="24" y="66" width="180" height="18" fill="none" stroke="#ea580c" strokeWidth="2.5" />
    <text x="216" y="81" fontSize="16" fontWeight="900" fill="#c2410c">
      1 dm = 10 cm
    </text>
    {/* 1 m */}
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={24 + i * 42} y={118} width="42" height="20" fill={i % 2 === 0 ? '#fb923c' : '#fdba74'} stroke="#9a3412" strokeWidth="1.4" />
    ))}
    {Array.from({ length: 10 }, (_, i) => (
      <text key={`t${i}`} x={45 + i * 42} y={133} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7c2d12">
        1 dm
      </text>
    ))}
    <text x="235" y="166" textAnchor="middle" fontSize="17" fontWeight="900" fill="#1e3a8a">
      1 m = 10 dm = 100 cm
    </text>
    <text x="235" y="192" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#64748b">
      m = méter, dm = deciméter, cm = centiméter
    </text>
  </Frame>
);

/** Mérőeszközök: vonalzó, mérőszalag, colstok, szabó-mérőszalag. */
export const LengthToolsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={470} h={160} className={className}>
    {/* vonalzó */}
    <rect x="20" y="40" width="96" height="22" rx="3" fill="#fde68a" stroke="#b45309" strokeWidth="1.6" />
    {Array.from({ length: 11 }, (_, i) => (
      <line key={i} x1={26 + i * 8.4} y1={40} x2={26 + i * 8.4} y2={i % 5 === 0 ? 50 : 46} stroke="#78350f" strokeWidth="1.2" />
    ))}
    <text x="68" y="128" textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155">
      vonalzó
    </text>
    {/* mérőszalag tokban */}
    <rect x="140" y="28" width="46" height="46" rx="12" fill="#22c55e" stroke="#166534" strokeWidth="2" />
    <circle cx="163" cy="51" r="10" fill="#facc15" stroke="#a16207" strokeWidth="2" />
    <rect x="186" y="62" width="44" height="10" fill="#fde047" stroke="#a16207" strokeWidth="1.4" />
    <rect x="228" y="58" width="5" height="17" fill="#475569" />
    <text x="186" y="128" textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155">
      mérőszalag
    </text>
    {/* colstok */}
    <polyline points="262,90 282,30 302,90 322,30 342,90" fill="none" stroke="#eab308" strokeWidth="9" strokeLinejoin="round" />
    <polyline points="262,90 282,30 302,90 322,30 342,90" fill="none" stroke="#a16207" strokeWidth="1.2" />
    <text x="302" y="128" textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155">
      colstok
    </text>
    {/* szabó-mérőszalag */}
    <circle cx="410" cy="56" r="26" fill="none" stroke="#f59e0b" strokeWidth="10" />
    <circle cx="410" cy="56" r="14" fill="none" stroke="#f59e0b" strokeWidth="8" />
    <text x="410" y="128" textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155">
      szalag
    </text>
    <text x="235" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b">
      Rövid dolgot vonalzóval, hosszút mérőszalaggal vagy colstokkal mérünk.
    </text>
  </Frame>
);

/** Jó és rossz mérés vonalzóval. */
export const RulerZeroSvg: React.FC<{ className?: string }> = ({ className }) => {
  const U = 22;
  return (
    <Frame w={470} h={210} className={className}>
      <text x="16" y="26" fontSize="14" fontWeight="900" fill="#15803d">
        Jó: a 0-tól mérünk
      </text>
      <StripePart x1={40} x2={40 + 6 * U} y={46} color="#22c55e" />
      <RulerPart x={40} y={60} unit={U} from={0} to={12} h={30} fontSize={12} />
      <text x={330} y={50} fontSize="18" fontWeight="900" fill="#15803d">
        6 cm ✓
      </text>
      <text x="16" y="124" fontSize="14" fontWeight="900" fill="#b91c1c">
        Vigyázz: itt a 2-nél kezdődik!
      </text>
      <StripePart x1={40 + 2 * U} x2={40 + 8 * U} y={144} color="#ef4444" />
      <RulerPart x={40} y={158} unit={U} from={0} to={12} h={30} fontSize={12} />
      <text x="320" y="148" fontSize="15" fontWeight="900" fill="#b91c1c">
        8 − 2 = 6 cm
      </text>
    </Frame>
  );
};
