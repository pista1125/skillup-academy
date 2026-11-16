import React from 'react';
import { PizzaG, BarG, FONT } from '../tortresz-tortek-ertelmezese/FractionIntro4Figures';

export { FONT };

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode; label: string }> = ({ w, h, className, children, label }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className ?? 'w-full max-w-lg h-auto mx-auto'} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.5" />
    {children}
  </svg>
);

// ---------------------------------------------------------------------------
// Újrahasznosítható elemek
// ---------------------------------------------------------------------------
export type Country = 'Ausztria' | 'Németország' | 'Görögország' | 'Monaco' | 'Magyarország' | 'Lengyelország' | 'Franciaország';

/** Országzászló (a tankönyv 151. oldali zászlói). */
export const CountryFlagG: React.FC<{ x: number; y: number; w: number; h: number; country: Country }> = ({ x, y, w, h, country }) => {
  const stripes = (cols: string[], vertical = false) =>
    cols.map((c, i) =>
      vertical ? (
        <rect key={i} x={x + (i * w) / cols.length} y={y} width={w / cols.length} height={h} fill={c} />
      ) : (
        <rect key={i} x={x} y={y + (i * h) / cols.length} width={w} height={h / cols.length} fill={c} />
      )
    );
  let body: React.ReactNode = null;
  if (country === 'Ausztria') body = stripes(['#dc2626', '#ffffff', '#dc2626']);
  if (country === 'Németország') body = stripes(['#111827', '#dc2626', '#facc15']);
  if (country === 'Magyarország') body = stripes(['#dc2626', '#ffffff', '#15803d']);
  if (country === 'Monaco') body = stripes(['#dc2626', '#ffffff']);
  if (country === 'Lengyelország') body = stripes(['#ffffff', '#dc2626']);
  if (country === 'Franciaország') body = stripes(['#1d4ed8', '#ffffff', '#dc2626'], true);
  if (country === 'Görögország') {
    const s = h / 9;
    body = (
      <g>
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={x} y={y + i * s} width={w} height={s} fill={i % 2 === 0 ? '#1d4ed8' : '#ffffff'} />
        ))}
        <rect x={x} y={y} width={5 * s} height={5 * s} fill="#1d4ed8" />
        <rect x={x + 2 * s} y={y} width={s} height={5 * s} fill="#ffffff" />
        <rect x={x} y={y + 2 * s} width={5 * s} height={s} fill="#ffffff" />
      </g>
    );
  }
  return (
    <g>
      {body}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="#334155" strokeWidth="1.5" />
    </g>
  );
};

/** Egy pohár (piros vagy sárga szörppel). */
export const CupG: React.FC<{ x: number; y: number; color: string; s?: number }> = ({ x, y, color, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <polygon points="0,0 22,0 19,30 3,30" fill={color} stroke="#7c2d12" strokeWidth="1.2" />
    <ellipse cx="11" cy="0" rx="11" ry="3" fill="#ffffff" stroke="#7c2d12" strokeWidth="1" />
    <circle cx="8" cy="12" r="2" fill="#ffffff" opacity="0.6" />
    <circle cx="14" cy="20" r="1.6" fill="#ffffff" opacity="0.6" />
  </g>
);

/** Egy kisautó felülnézet helyett oldalról, egyszerűsítve. */
export const CarG: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M 2 14 L 8 4 L 26 4 L 33 14 L 38 15 L 38 22 L 0 22 L 0 15 Z" fill={color} stroke="#1f2937" strokeWidth="1.2" />
    <rect x="10" y="6" width="7" height="7" fill="#e0f2fe" />
    <rect x="19" y="6" width="7" height="7" fill="#e0f2fe" />
    <circle cx="9" cy="22" r="4" fill="#1f2937" />
    <circle cx="30" cy="22" r="4" fill="#1f2937" />
  </g>
);

/** Gyöngysor: a színek listája szerint ('r' piros, 'y' sárga). */
export const BeadsG: React.FC<{ x: number; y: number; beads: string; r?: number; gap?: number }> = ({ x, y, beads, r = 12, gap = 32 }) => {
  const n = beads.length;
  return (
    <g>
      <path d={`M ${x - 14} ${y + 4} Q ${x + ((n - 1) * gap) / 2} ${y - 10} ${x + (n - 1) * gap + 14} ${y + 4}`} fill="none" stroke="#334155" strokeWidth="1.6" />
      {beads.split('').map((b, i) => (
        <circle key={i} cx={x + i * gap} cy={y} r={r} fill={b === 'r' ? '#ef4444' : '#fbbf24'} stroke={b === 'r' ? '#991b1b' : '#b45309'} strokeWidth="1.5" />
      ))}
    </g>
  );
};

/** Céltábla: kék külső sáv, két sárga sáv, piros közép. */
export const TargetG: React.FC<{ cx: number; cy: number; r?: number; hits?: [number, number][] }> = ({ cx, cy, r = 60, hits = [] }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
    <circle cx={cx} cy={cy} r={r * 0.72} fill="#fde047" stroke="#a16207" strokeWidth="1" />
    <circle cx={cx} cy={cy} r={r * 0.48} fill="#facc15" stroke="#a16207" strokeWidth="1" />
    <circle cx={cx} cy={cy} r={r * 0.24} fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
    {hits.map(([hx, hy], i) => (
      <g key={i}>
        <line x1={cx + hx - 4} y1={cy + hy - 4} x2={cx + hx + 4} y2={cy + hy + 4} stroke="#0f172a" strokeWidth="2.4" />
        <line x1={cx + hx - 4} y1={cy + hy + 4} x2={cx + hx + 4} y2={cy + hy - 4} stroke="#0f172a" strokeWidth="2.4" />
      </g>
    ))}
  </g>
);

/** A 10 lövés (MF II/67, 5. feladat mintájára): 3 kék, 4 sárga, 1 piros, 2 mellé. */
export const ARCHERY_HITS: [number, number][] = [
  [-50, -10],
  [30, 42],
  [48, -24],
  [-30, 14],
  [18, -14],
  [-8, 32],
  [34, 6],
  [4, -6],
  [-82, -52],
  [80, 58]
];

/** Rács (sorok × oszlopok); a `blue` függvény mondja meg, melyik cella kék. */
export const GridG: React.FC<{ x: number; y: number; rows: number; cols: number; cell?: number; blue: (r: number, c: number) => boolean; c1?: string; c2?: string }> = ({
  x,
  y,
  rows,
  cols,
  cell = 26,
  blue,
  c1 = '#38bdf8',
  c2 = '#facc15'
}) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => {
      const r = Math.floor(i / cols);
      const c = i % cols;
      return <rect key={i} x={x + c * cell} y={y + r * cell} width={cell} height={cell} fill={blue(r, c) ? c1 : c2} stroke="#334155" strokeWidth="1.3" />;
    })}
  </g>
);

// ---------------------------------------------------------------------------
// Ábrák
// ---------------------------------------------------------------------------

/** 3 negyed pizzán és szalagon. */
export const ThreeQuartersSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={440} h={200} className={className} label="3 negyed pizzán és szalagon">
    <PizzaG cx={100} cy={92} r={64} parts={4} filled={3} color="#f97316" emptyColor="#fde68a" pizza />
    <text x={100} y={182} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">3 negyed pizza</text>
    <BarG x={230} y={60} w={180} h={50} parts={4} filled={3} color="#38bdf8" />
    <text x={320} y={52} textAnchor="middle" fontSize="12" fill="#475569">4 egyenlő rész, ebből 3 színes</text>
    <text x={320} y={136} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0369a1">3 negyed színes</text>
    <text x={320} y={156} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569">1 negyed fehér</text>
  </Frame>
);

/** TK 149, 7. feladat: mindegyik ábra 1 egészet ér – kék és sárga részek. */
export const GridColorsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={460} h={200} className={className} label="Kék és sárga rácsok">
    <GridG x={20} y={30} rows={3} cols={4} blue={(_r, c) => c === 0} />
    <text x={72} y={128} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">kék: 1 negyed</text>
    <text x={72} y={146} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a16207">sárga: 3 negyed</text>
    <GridG x={170} y={30} rows={3} cols={4} blue={(r) => r === 0} />
    <text x={222} y={128} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">kék: 1 harmad</text>
    <text x={222} y={146} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a16207">sárga: 2 harmad</text>
    <GridG x={320} y={30} rows={3} cols={4} blue={(_r, c) => c < 2} />
    <text x={372} y={128} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369a1">kék: fele</text>
    <text x={372} y={146} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a16207">sárga: fele</text>
    <text x={230} y={182} textAnchor="middle" fontSize="12" fill="#475569">Keresd meg az egyenlő részeket: oszlopok vagy sorok!</text>
  </Frame>
);

/** TK 149, 8. feladat: 12 pohár, 4 piros és 8 sárga. */
export const CupsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={460} h={170} className={className} label="12 pohár">
    {Array.from({ length: 12 }, (_, i) => {
      const g = Math.floor(i / 4);
      return <CupG key={i} x={28 + i * 32 + g * 14} y={40} color={i < 4 ? '#ef4444' : '#fbbf24'} />;
    })}
    {[0, 1, 2].map((g) => (
      <rect key={g} x={22 + g * (4 * 32 + 14)} y={30} width={4 * 32 - 4} height={52} rx="8" fill="none" stroke="#64748b" strokeDasharray="4 3" />
    ))}
    <text x={230} y={112} textAnchor="middle" fontSize="13" fill="#475569">12 pohár = 3 egyforma csoport, 4-4 pohár</text>
    <text x={230} y={136} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b91c1c">piros: 1 harmad</text>
    <text x={230} y={156} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#a16207">sárga: 2 harmad</text>
  </Frame>
);

/** TK 151, 16. feladat: öt zászló. */
export const CountryFlagsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const list: Country[] = ['Ausztria', 'Németország', 'Görögország', 'Monaco', 'Magyarország'];
  return (
    <Frame w={480} h={120} className={className} label="Öt ország zászlója">
      {list.map((c, i) => (
        <g key={c}>
          <CountryFlagG x={16 + i * 92} y={22} w={80} h={52} country={c} />
          <text x={56 + i * 92} y={96} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
            {c}
          </text>
        </g>
      ))}
    </Frame>
  );
};

/** MF II/67, 6. feladat: gyöngysorok. */
export const BeadsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={460} h={170} className={className} label="Gyöngysorok">
    <BeadsG x={40} y={50} beads="ryr" />
    <text x={72} y={90} textAnchor="middle" fontSize="12" fill="#b91c1c" fontWeight="bold">piros: 2 harmad</text>
    <text x={72} y={108} textAnchor="middle" fontSize="12" fill="#a16207" fontWeight="bold">sárga: 1 harmad</text>
    <BeadsG x={190} y={50} beads="yyy" />
    <text x={222} y={90} textAnchor="middle" fontSize="12" fill="#a16207" fontWeight="bold">sárga: 3 harmad</text>
    <text x={222} y={108} textAnchor="middle" fontSize="12" fill="#475569">= az egész</text>
    <BeadsG x={335} y={50} beads="rryr" gap={28} />
    <text x={377} y={90} textAnchor="middle" fontSize="12" fill="#b91c1c" fontWeight="bold">piros: 3 negyed</text>
    <text x={377} y={108} textAnchor="middle" fontSize="12" fill="#a16207" fontWeight="bold">sárga: 1 negyed</text>
    <text x={230} y={150} textAnchor="middle" fontSize="12" fill="#475569">Számold meg az összes gyöngyöt: ennyi egyenlő rész van!</text>
  </Frame>
);

/** MF II/67, 5. feladat: Janka céltáblája 10 lövéssel. */
export const ArcherySvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={420} h={200} className={className} label="Céltábla 10 lövéssel">
    <rect x={20} y={10} width={190} height={180} fill="#ffffff" stroke="#cbd5e1" />
    <TargetG cx={115} cy={100} r={66} hits={ARCHERY_HITS} />
    <text x={230} y={40} fontSize="13" fontWeight="bold" fill="#0f172a">10 lövés:</text>
    <text x={230} y={64} fontSize="13" fill="#1d4ed8">kék sáv: 3 → 3 tized</text>
    <text x={230} y={86} fontSize="13" fill="#a16207">sárga sávok: 4 → 4 tized</text>
    <text x={230} y={108} fontSize="13" fill="#b91c1c">piros közép: 1 → 1 tized</text>
    <text x={230} y={130} fontSize="13" fill="#475569">mellé: 2 → 2 tized</text>
    <text x={230} y={160} fontSize="13" fontWeight="bold" fill="#15803d">találat: 8 tized</text>
  </Frame>
);

/** TK 149, 9. feladat: a kisegér és a sajt. */
export const CheeseSvg: React.FC<{ className?: string }> = ({ className }) => {
  const W = 320;
  const rows = [
    { label: '1. nap után', left: 2 },
    { label: '2. nap után', left: 4 },
    { label: '3. nap után', left: 8 }
  ];
  return (
    <Frame w={460} h={190} className={className} label="A sajt felezése">
      {rows.map((r, i) => (
        <g key={r.label}>
          <text x={18} y={44 + i * 52} fontSize="12" fontWeight="bold" fill="#334155">
            {r.label}
          </text>
          <BarG x={112} y={26 + i * 52} w={W} h={28} parts={r.left} filled={[0]} color="#facc15" emptyColor="#e2e8f0" stroke="#a16207" />
        </g>
      ))}
      <text x={272} y={180} textAnchor="middle" fontSize="12" fill="#475569">sárga = ami megmaradt: fele, aztán 1 negyede, végül 1 nyolcada</text>
    </Frame>
  );
};

/** TK 152, 19. feladat: parkoló 12 autóval (3 kék, 3 piros, 6 zöld). */
export const PARKING: string[] = ['#16a34a', '#dc2626', '#2563eb', '#2563eb', '#16a34a', '#38bdf8', '#16a34a', '#16a34a', '#84cc16', '#dc2626', '#dc2626', '#15803d'];
export const ParkingSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={440} h={150} className={className} label="Parkoló 12 autóval">
    <rect x={12} y={12} width={416} height={126} rx="10" fill="#94a3b8" />
    {PARKING.map((c, i) => (
      <g key={i}>
        <line x1={20 + (i % 6) * 68} y1={i < 6 ? 20 : 80} x2={20 + (i % 6) * 68} y2={i < 6 ? 70 : 130} stroke="#ffffff" strokeWidth="2" />
        <CarG x={34 + (i % 6) * 68} y={i < 6 ? 34 : 94} color={c} />
      </g>
    ))}
  </Frame>
);
