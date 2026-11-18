// „Színesrúd-készlet” – a mese és a játék képei (a tankönyv színei: 1 fehér … 10 narancssárga).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';

/** Egy egység (a fehér kocka oldala) rajzban. */
export const U = 20;

export interface RodInfo {
  len: number;
  fill: string;
  stroke: string;
  /** alanyeset: „a sárga rúd” */
  name: string;
}

export const RODS: RodInfo[] = [
  { len: 1, fill: '#ffffff', stroke: '#475569', name: 'fehér' },
  { len: 2, fill: '#f9a8d4', stroke: '#9d174d', name: 'rózsaszín' },
  { len: 3, fill: '#93c5fd', stroke: '#1e40af', name: 'világoskék' },
  { len: 4, fill: '#ef4444', stroke: '#7f1d1d', name: 'piros' },
  { len: 5, fill: '#facc15', stroke: '#a16207', name: 'sárga' },
  { len: 6, fill: '#a78bfa', stroke: '#4c1d95', name: 'lila' },
  { len: 7, fill: '#1f2937', stroke: '#000000', name: 'fekete' },
  { len: 8, fill: '#92400e', stroke: '#451a03', name: 'barna' },
  { len: 9, fill: '#1d4ed8', stroke: '#172554', name: 'kék' },
  { len: 10, fill: '#f97316', stroke: '#7c2d12', name: 'narancssárga' },
];

export const rodName = (len: number) => RODS[len - 1].name;

/** Egy rúd egy SVG-n belül (bal felső sarok: x, y). */
export const drawRod = (len: number, x: number, y: number, opts: { u?: number; vertical?: boolean; key?: React.Key } = {}) => {
  const { u = U, vertical = false, key } = opts;
  const r = RODS[len - 1];
  const w = vertical ? u : len * u;
  const h = vertical ? len * u : u;
  return (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={r.fill} stroke={r.stroke} strokeWidth="2.5" />
      {len > 1 && <rect x={x + 3} y={y + 3} width={vertical ? 4 : w - 6} height={vertical ? h - 6 : 4} rx="2" fill="#fff" opacity="0.35" />}
    </g>
  );
};

/** Szaggatott, üres hely egy rúdnak („?” közepén). */
export const drawSlot = (len: number, x: number, y: number, opts: { u?: number; vertical?: boolean; key?: React.Key; mark?: boolean } = {}) => {
  const { u = U, vertical = false, key, mark = true } = opts;
  const w = vertical ? u : len * u;
  const h = vertical ? len * u : u;
  return (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx="3" fill="#f8fafc" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="6 4" />
      {mark && (
        <text x={x + w / 2} y={y + h / 2 + 6} textAnchor="middle" fontSize="17" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
          ?
        </text>
      )}
    </g>
  );
};

/** Egyetlen rúd képe válaszgombra. `maxLen`: a kérdés leghosszabb rúdja – így a válaszok hossza összevethető. */
export const RodPic: React.FC<{ len: number; maxLen?: number; className?: string }> = ({ len, maxLen = 10, className = 'w-full h-auto' }) => (
  <svg viewBox={`0 0 ${maxLen * U + 8} ${U + 8}`} className={className}>
    {drawRod(len, 4, 4)}
  </svg>
);

/** Rúd-válaszopció (kép + felolvasott szín). */
export const rodOpt = (len: number, maxLen = 10) => ({ figure: <RodPic len={len} maxLen={maxLen} />, say: `${rodName(len)} rúd` });

/** Több rúd egymás alatt, balra igazítva (összehasonlításhoz). */
export const RodsCompare: React.FC<{ lens: number[]; className?: string }> = ({ lens, className = 'w-full max-w-[460px] h-auto mx-auto' }) => {
  const max = Math.max(...lens);
  const w = max * U + 24;
  const h = lens.length * (U + 14) + 10;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      <rect x="0" y="0" width={w} height={h} rx="12" fill="#fff7ed" />
      <path d={`M10 4 V${h - 4}`} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
      {lens.map((l, i) => drawRod(l, 10, 10 + i * (U + 14), { key: i }))}
    </svg>
  );
};

/** Lépcső: a leghosszabb alul, jobbra igazítva (mint a könyvben). `missing`: ennek a rúdnak csak a helye látszik. */
export const StairScene: React.FC<{ missing?: number; upTo?: number; potyi?: boolean; className?: string }> = ({ missing, upTo = 10, potyi = false, className = 'w-full max-w-[480px] h-auto mx-auto' }) => {
  const right = 440;
  const top = 50;
  return (
    <svg viewBox="0 0 480 270" className={className}>
      <rect x="0" y="0" width="480" height="270" rx="18" fill="#e0f2fe" />
      <path d="M0 252 H480 V270 H0 Z" fill="#86efac" />
      {Array.from({ length: upTo }, (_, i) => {
        const len = i + 1;
        const y = top + (10 - upTo) * U + i * U;
        const x = right - len * U;
        return len === missing ? drawSlot(len, x, y, { key: len }) : drawRod(len, x, y, { key: len });
      })}
      {potyi && <Potyi mood="cheer" dots={7} x={right - 46} y={top + (10 - upTo) * U - 48} size={50} />}
    </svg>
  );
};

/** Álló rudak sora (sorozat), a végén „?” hely. */
export const PatternScene: React.FC<{ seq: number[]; className?: string }> = ({ seq, className = 'w-full max-w-[460px] h-auto mx-auto' }) => {
  const maxLen = Math.max(...seq);
  const gap = 14;
  const w = (seq.length + 1) * (U + gap) + 20;
  const base = maxLen * U + 16;
  return (
    <svg viewBox={`0 0 ${w} ${base + 12}`} className={className}>
      <rect x="0" y="0" width={w} height={base + 12} rx="12" fill="#fefce8" />
      <path d={`M6 ${base + 1} H${w - 6}`} stroke="#a16207" strokeWidth="3" />
      {seq.map((l, i) => drawRod(l, 14 + i * (U + gap), base - l * U, { vertical: true, key: i }))}
      <rect x={14 + seq.length * (U + gap) - 4} y={base - maxLen * U - 4} width={U + 8} height={maxLen * U + 4} rx="6" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="6 4" />
      <text x={14 + seq.length * (U + gap) + U / 2} y={base - (maxLen * U) / 2 + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
        ?
      </text>
    </svg>
  );
};

/** Vízszintes sorozat (fekvő rudak egymás után), a végén „?” hely. */
export const PatternLyingScene: React.FC<{ seq: number[]; className?: string }> = ({ seq, className = 'w-full max-w-[460px] h-auto mx-auto' }) => {
  const gap = 8;
  let x = 10;
  const parts = seq.map((l, i) => {
    const g = drawRod(l, x, 18, { key: i });
    x += l * U + gap;
    return g;
  });
  const w = x + 3 * U + 10;
  return (
    <svg viewBox={`0 0 ${w} 56`} className={className}>
      <rect x="0" y="0" width={w} height="56" rx="12" fill="#fefce8" />
      {parts}
      <rect x={x} y="12" width={3 * U} height={U + 12} rx="6" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2.5" strokeDasharray="6 4" />
      <text x={x + 1.5 * U} y="35" textAnchor="middle" fontSize="20" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
        ?
      </text>
    </svg>
  );
};

/** Egy üres hely (körvonal) – ugyanakkora léptékben, mint a RodPic (egymás alá téve összevethető). */
export const SlotScene: React.FC<{ len: number; className?: string }> = ({ len, className = 'w-full h-auto' }) => (
  <svg viewBox={`0 0 ${10 * U + 8} ${U + 8}`} className={className}>
    {drawSlot(len, 4, 4, { mark: true })}
  </svg>
);

/** Válaszkép: fent a szaggatott hely, alatta egy rúd – látszik, hogy pont odafér-e. */
export const FitPic: React.FC<{ slot: number; len: number; className?: string }> = ({ slot, len, className = 'w-full h-auto' }) => {
  const m = Math.max(slot, len);
  return (
    <svg viewBox={`0 0 ${m * U + 8} ${2 * U + 14}`} className={className}>
      {drawSlot(slot, 4, 4, { mark: false })}
      {drawRod(len, 4, U + 10)}
    </svg>
  );
};

export const fitOpt = (slot: number, len: number) => ({ figure: <FitPic slot={slot} len={len} />, say: `${rodName(len)} rúd` });

/** Ház a rudakból: tető, falak, és egy hiányzó rúd. (A „melyik rúd illik az ábrára?” feladathoz.) */
export const BuildScene: React.FC<{ variant: 'tower' | 'bench' | 'gate'; className?: string }> = ({ variant, className = 'w-full max-w-[420px] h-auto mx-auto' }) => {
  const parts: React.ReactNode[] = [];
  if (variant === 'tower') {
    // torony: alul narancssárga, rá sárga, rá piros, legfelül ? (világoskék helye)
    parts.push(drawRod(10, 40, 160, { key: 'a' }));
    parts.push(drawRod(5, 90, 140, { key: 'b' }));
    parts.push(drawRod(4, 100, 120, { key: 'c' }));
    parts.push(drawSlot(3, 110, 100, { key: 'd' }));
  } else if (variant === 'bench') {
    // pad: két álló világoskék láb, rajtuk a ? helye (lila hosszú)
    parts.push(drawRod(3, 70, 120, { vertical: true, key: 'a' }));
    parts.push(drawRod(3, 150, 120, { vertical: true, key: 'b' }));
    parts.push(drawSlot(6, 60, 100, { key: 'c' }));
  } else {
    // kapu: két álló sárga oszlop, tetején ? (piros)
    parts.push(drawRod(5, 80, 80, { vertical: true, key: 'a' }));
    parts.push(drawRod(5, 140, 80, { vertical: true, key: 'b' }));
    parts.push(drawSlot(4, 80, 60, { key: 'c' }));
  }
  return (
    <svg viewBox="0 0 260 200" className={className}>
      <rect x="0" y="0" width="260" height="200" rx="16" fill="#ecfccb" />
      <path d="M0 180 H260" stroke="#65a30d" strokeWidth="4" />
      {parts}
    </svg>
  );
};

/** Fehér kockák vonata (n kocka) – a „ugyanolyan hosszú” feladatokhoz. */
export const CubeTrain: React.FC<{ n: number; maxLen?: number; className?: string }> = ({ n, maxLen = 10, className = 'w-full h-auto' }) => (
  <svg viewBox={`0 0 ${maxLen * U + 8} ${U + 8}`} className={className}>
    {Array.from({ length: n }, (_, i) => drawRod(1, 4 + i * U, 4, { key: i }))}
  </svg>
);

/** Két rúd egymás után (vonat) – pl. két rózsaszín. */
export const RodTrain: React.FC<{ lens: number[]; maxLen?: number; className?: string }> = ({ lens, maxLen = 10, className = 'w-full h-auto' }) => {
  let x = 4;
  return (
    <svg viewBox={`0 0 ${maxLen * U + 8} ${U + 8}`} className={className}>
      {lens.map((l, i) => {
        const g = drawRod(l, x, 4, { key: i });
        x += l * U;
        return g;
      })}
    </svg>
  );
};

/** Nyitó kép: Pötyi és a nyitott rúdosdoboz. */
export const BoxScene: React.FC = () => (
  <svg viewBox="0 0 480 250">
    <rect x="0" y="0" width="480" height="250" rx="18" fill="#e0f2fe" />
    <path d="M0 200 Q120 180 240 196 T480 192 V250 H0 Z" fill="#86efac" />
    {ICONS.virag({ x: 420, y: 196, s: 0.9 })}
    {ICONS.virag({ x: 455, y: 210, s: 0.7, color: '#a855f7' })}
    <rect x="200" y="120" width="230" height="80" rx="8" fill="#d6a76c" stroke="#7c2d12" strokeWidth="4" />
    <path d="M200 120 L230 90 H460 L430 120 Z" fill="#e7c08f" stroke="#7c2d12" strokeWidth="4" strokeLinejoin="round" />
    {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((l, i) => drawRod(l, 212 + (i % 2) * 6, 128 + i * 5.5, { u: 20, key: l }))}
    <Potyi mood="wow" dots={7} x={20} y={60} size={160} />
  </svg>
);

/** Szétszórt rudak (mind a tíz). */
export const AllRodsScene: React.FC = () => {
  const spots: [number, number, number, boolean][] = [
    [1, 40, 30, false],
    [2, 100, 30, false],
    [3, 190, 30, false],
    [4, 290, 30, false],
    [5, 30, 80, false],
    [6, 160, 80, false],
    [7, 30, 130, false],
    [8, 200, 130, false],
    [9, 30, 180, false],
    [10, 230, 180, false],
  ];
  return (
    <svg viewBox="0 0 480 230">
      <rect x="0" y="0" width="480" height="230" rx="18" fill="#fff7ed" />
      {spots.map(([l, x, y]) => drawRod(l, x, y, { key: l }))}
    </svg>
  );
};

/** Két sor egymás alatt, balról igazítva: fent egy rúd vagy vonat, lent egy másik – a hosszuk összevethető. */
export const PairPic: React.FC<{ top: number[]; bottom: number[]; className?: string }> = ({ top, bottom, className = 'w-full h-auto' }) => {
  const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
  const m = Math.max(sum(top), sum(bottom));
  const row = (lens: number[], y: number, k: string) => {
    let x = 4;
    return lens.map((l, i) => {
      const g = drawRod(l, x, y, { key: `${k}${i}` });
      x += l * U;
      return g;
    });
  };
  return (
    <svg viewBox={`0 0 ${m * U + 8} ${2 * U + 14}`} className={className}>
      {row(top, 4, 't')}
      {row(bottom, U + 10, 'b')}
    </svg>
  );
};

/** Színfolt (a párosítóhoz). */
export const ColorDot: React.FC<{ len: number; className?: string }> = ({ len, className = 'w-14 h-14' }) => {
  const r = RODS[len - 1];
  return (
    <svg viewBox="0 0 60 60" className={className}>
      <path d="M30 6 C46 4 56 18 54 32 C52 48 40 56 26 54 C12 52 4 40 7 26 C9 14 18 7 30 6 Z" fill={r.fill} stroke={r.stroke} strokeWidth="3" />
    </svg>
  );
};

/** Kis lépcső a megadott sorrendben (fentről lefelé), jobbra igazítva. */
export const MiniStair: React.FC<{ order: number[]; className?: string }> = ({ order, className = 'w-full h-auto' }) => {
  const m = Math.max(...order);
  return (
    <svg viewBox={`0 0 ${m * U + 8} ${order.length * U + 8}`} className={className}>
      {order.map((l, i) => drawRod(l, 4 + (m - l) * U, 4 + i * U, { key: i }))}
    </svg>
  );
};
