import React from 'react';
import { PizzaG, BarG, FONT, DENOM_NAMES } from '../tortresz-tortek-ertelmezese/FractionIntro4Figures';

export { FONT };

// ---------------------------------------------------------------------------
// Segédfüggvények
// ---------------------------------------------------------------------------

/** „5 negyed” → „1 egész és 1 negyed”; „4 negyed” → „1 egész”; „3 ketted” → „1 és fél”. */
export const toWholes = (k: number, d: number): string => {
  const w = Math.floor(k / d);
  const r = k % d;
  const name = DENOM_NAMES[d];
  if (w === 0) return r === 0 ? '0' : `${r} ${name}`;
  if (r === 0) return `${w} egész`;
  if (d === 2) return `${w} és fél`;
  return `${w} egész és ${r} ${name}`;
};

/** Egynél kisebb, pontosan 1 egész, vagy egynél nagyobb? */
export const compareToOne = (k: number, d: number): 'kisebb' | 'egyenlő' | 'nagyobb' => (k < d ? 'kisebb' : k === d ? 'egyenlő' : 'nagyobb');

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode; label: string }> = ({ w, h, className, children, label }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className ?? 'w-full max-w-lg h-auto mx-auto'} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1.5" />
    {children}
  </svg>
);

// ---------------------------------------------------------------------------
// Számegyenes törtekkel
// ---------------------------------------------------------------------------
export interface FracLineProps {
  x: number;
  y: number;
  w: number;
  /** hány egészig tart (pl. 2) */
  wholes: number;
  /** hány egyenlő részre osztunk egy egészet */
  d: number;
  /** kiemelt pontok (lépésszámban, pl. 5 = 5 negyed) */
  marks?: number[];
  /** a „?”-lel jelölt pont lépésszáma */
  ask?: number;
  /** a lépések feliratozása tört szóval (csak kis d-nél) */
  labelSteps?: boolean;
  color?: string;
}

/** Számegyenes 0-tól `wholes`-ig, egy egészen belül `d` egyenlő részre osztva. */
export const FracLineG: React.FC<FracLineProps> = ({ x, y, w, wholes, d, marks = [], ask, labelSteps = false, color = '#7c3aed' }) => {
  const n = wholes * d;
  const step = w / n;
  return (
    <g fontFamily={FONT}>
      <line x1={x - 6} y1={y} x2={x + w + 14} y2={y} stroke="#334155" strokeWidth="2" />
      <polygon points={`${x + w + 20},${y} ${x + w + 10},${y - 5} ${x + w + 10},${y + 5}`} fill="#334155" />
      {Array.from({ length: n + 1 }, (_, i) => {
        const big = i % d === 0;
        const tx = x + i * step;
        return (
          <g key={i}>
            <line x1={tx} y1={y - (big ? 10 : 6)} x2={tx} y2={y + (big ? 10 : 6)} stroke="#334155" strokeWidth={big ? 2.2 : 1.4} />
            {big && (
              <text x={tx} y={y + 26} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
                {i / d}
              </text>
            )}
            {labelSteps && !big && i !== ask && (
              <text x={tx} y={y - 14} textAnchor="middle" fontSize="9" fill="#64748b">
                {i} {DENOM_NAMES[d]}
              </text>
            )}
          </g>
        );
      })}
      {marks.map((m) => (
        <circle key={`m${m}`} cx={x + m * step} cy={y} r={6} fill={color} stroke="#ffffff" strokeWidth="1.5" />
      ))}
      {ask !== undefined && (
        <g>
          <circle cx={x + ask * step} cy={y} r={7} fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
          <text x={x + ask * step} y={y - 16} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#dc2626">
            ?
          </text>
        </g>
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Ábrák
// ---------------------------------------------------------------------------

/** 2 ketted = 3 harmad = 4 negyed = 5 ötöd = 1 egész. */
export const WholeEqualsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows: [number, string][] = [
    [2, '2 ketted'],
    [3, '3 harmad'],
    [4, '4 negyed'],
    [5, '5 ötöd'],
    [10, '10 tized']
  ];
  const colors = ['#f97316', '#38bdf8', '#22c55e', '#a78bfa', '#f472b6'];
  return (
    <Frame w={440} h={230} className={className} label="Az 1 egész különböző nevei">
      {rows.map(([d, name], i) => (
        <g key={d}>
          <BarG x={20} y={18 + i * 40} w={250} h={28} parts={d} filled={d} color={colors[i]} />
          <text x={282} y={37 + i * 40} fontSize="14" fontWeight="bold" fill="#0f172a">
            {name} = 1 egész
          </text>
        </g>
      ))}
      <text x={220} y={220} textAnchor="middle" fontSize="12" fill="#475569">Ha minden egyenlő részt kiszínezünk, megkapjuk az egészet.</text>
    </Frame>
  );
};

/** TK 150, 14. feladat: a mérőszalag negyedei. */
export const TapeMeasureSvg: React.FC<{ className?: string }> = ({ className }) => {
  const x0 = 30;
  const W = 380;
  return (
    <Frame w={440} h={170} className={className} label="Mérőszalag 4 negyedre osztva">
      <rect x={x0} y={40} width={W} height={34} rx="4" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
      {Array.from({ length: 101 }, (_, i) => (
        <line key={i} x1={x0 + (i * W) / 100} y1={40} x2={x0 + (i * W) / 100} y2={40 + (i % 10 === 0 ? 14 : i % 5 === 0 ? 10 : 6)} stroke="#713f12" strokeWidth={i % 10 === 0 ? 1.4 : 0.8} />
      ))}
      {[0, 25, 50, 75, 100].map((c, i) => (
        <g key={c}>
          <line x1={x0 + (c * W) / 100} y1={30} x2={x0 + (c * W) / 100} y2={84} stroke="#7c3aed" strokeWidth="2.5" strokeDasharray={i === 0 || i === 4 ? undefined : '5 3'} />
          <text x={x0 + (c * W) / 100} y={100} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
            {c} cm
          </text>
        </g>
      ))}
      {['1 negyed', '2 negyed', '3 negyed', '4 negyed'].map((t, i) => (
        <text key={t} x={x0 + ((i * 25 + 12.5) * W) / 100} y={24} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6d28d9">
          {i + 1}.
        </text>
      ))}
      <text x={220} y={128} textAnchor="middle" fontSize="13" fill="#334155">a méter negyede 25 cm • 2 negyede 50 cm • 3 negyede 75 cm</text>
      <text x={220} y={150} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6d28d9">a méter 4 negyede = 100 cm = 1 m (az egész)</text>
    </Frame>
  );
};

/** MF II/71, 17. feladat: a 400 literes dézsa 6 tized része megtelt. */
export const TankSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={360} h={210} className={className} label="Dézsa 10 tized részre osztva">
    <path d="M 60 30 L 70 180 L 170 180 L 180 30 Z" fill="#ffffff" stroke="#78350f" strokeWidth="3" />
    <clipPath id="g4ImpTankClip">
      <path d="M 60 30 L 70 180 L 170 180 L 180 30 Z" />
    </clipPath>
    <rect x={55} y={180 - 150 * 0.6} width={130} height={150 * 0.6} fill="#38bdf8" opacity="0.8" clipPath="url(#g4ImpTankClip)" />
    {Array.from({ length: 11 }, (_, i) => (
      <line key={i} x1={182} y1={180 - i * 15} x2={194} y2={180 - i * 15} stroke="#334155" strokeWidth={i % 5 === 0 ? 2 : 1} />
    ))}
    <text x={200} y={184} fontSize="11" fill="#334155">0</text>
    <text x={200} y={34} fontSize="11" fill="#334155">400 l</text>
    <text x={270} y={110} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">víz: 6 tized</text>
    <text x={270} y={60} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">üres: 4 tized</text>
    <text x={270} y={150} textAnchor="middle" fontSize="12" fill="#6d28d9">6 tized + 4 tized</text>
    <text x={270} y={168} textAnchor="middle" fontSize="12" fill="#6d28d9">= 10 tized = 1 egész</text>
  </Frame>
);

/** MF II/71, 18. feladat: sportszelet – 50 dkg keksz, 25 dkg margarin, 25 dkg cukor. */
export const RecipeSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={440} h={150} className={className} label="Sportszelet összetevői">
    <rect x={20} y={40} width={200} height={44} fill="#d97706" stroke="#334155" />
    <rect x={220} y={40} width={100} height={44} fill="#fde68a" stroke="#334155" />
    <rect x={320} y={40} width={100} height={44} fill="#ffffff" stroke="#334155" />
    <line x1={120} y1={40} x2={120} y2={84} stroke="#334155" strokeDasharray="4 3" />
    <text x={120} y={67} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">keksz 50 dkg</text>
    <text x={270} y={67} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">margarin 25 dkg</text>
    <text x={370} y={67} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">cukor 25 dkg</text>
    <text x={120} y={30} textAnchor="middle" fontSize="12" fill="#475569">2 negyed = fele</text>
    <text x={270} y={30} textAnchor="middle" fontSize="12" fill="#475569">1 negyed</text>
    <text x={370} y={30} textAnchor="middle" fontSize="12" fill="#475569">1 negyed</text>
    <text x={220} y={110} textAnchor="middle" fontSize="13" fill="#334155">összesen 100 dkg = 4 egyforma 25 dkg-os rész</text>
    <text x={220} y={132} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6d28d9">2 negyed + 1 negyed + 1 negyed = 4 negyed = 1 egész</text>
  </Frame>
);

/** 5 negyed pizza = 1 egész és 1 negyed. */
export const MorePizzaSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={420} h={190} className={className} label="5 negyed pizza">
    <PizzaG cx={95} cy={88} r={62} parts={4} filled={4} color="#f97316" emptyColor="#fde68a" pizza />
    <text x={190} y={95} textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">+</text>
    <PizzaG cx={285} cy={88} r={62} parts={4} filled={1} color="#f97316" emptyColor="#fde68a" pizza />
    <text x={95} y={172} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">4 negyed = 1 egész</text>
    <text x={285} y={172} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">1 negyed</text>
    <text x={385} y={60} textAnchor="middle" fontSize="12" fill="#6d28d9">együtt:</text>
    <text x={385} y={80} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6d28d9">5 negyed</text>
  </Frame>
);

/** TK 151, 18. c): 1 és negyed óra = 75 perc. */
export const HourQuartersSvg: React.FC<{ className?: string }> = ({ className }) => {
  const x0 = 30;
  const W = 360; // 0–90 perc
  const px = (m: number) => x0 + (m * W) / 90;
  return (
    <Frame w={420} h={160} className={className} label="1 és negyed óra az időszalagon">
      <rect x={px(0)} y={48} width={px(75) - px(0)} height={26} fill="#c4b5fd" />
      <rect x={px(0)} y={48} width={px(90) - px(0)} height={26} fill="none" stroke="#334155" strokeWidth="1.5" />
      {[0, 15, 30, 45, 60, 75, 90].map((m) => (
        <g key={m}>
          <line x1={px(m)} y1={44} x2={px(m)} y2={78} stroke="#334155" strokeWidth={m % 60 === 0 ? 2.4 : 1.2} />
          <text x={px(m)} y={94} textAnchor="middle" fontSize="11" fill="#0f172a">
            {m} perc
          </text>
        </g>
      ))}
      <text x={(px(0) + px(60)) / 2} y={38} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">1 óra = 4 negyed óra</text>
      <text x={(px(60) + px(75)) / 2} y={38} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6d28d9">+ negyed</text>
      <text x={210} y={126} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">1 és negyed óra = 60 perc + 15 perc = 75 perc</text>
      <text x={210} y={146} textAnchor="middle" fontSize="12" fill="#475569">Ez 5 negyed óra: több, mint 1 óra.</text>
    </Frame>
  );
};

/** Számegyenes 0-tól 2-ig negyedekkel. */
export const FractionNumberLineSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={460} h={130} className={className} label="Számegyenes negyedekkel">
    <FracLineG x={30} y={62} w={380} wholes={2} d={4} marks={[3, 4, 5, 6]} labelSteps />
    <text x={230} y={118} textAnchor="middle" fontSize="12" fill="#475569">
      Az 1 előtt az egynél kisebb, utána az egynél nagyobb törtek vannak.
    </text>
  </Frame>
);
