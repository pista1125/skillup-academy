import React from 'react';
import { BarG, fw, fwOf, az } from '../tortek-osszehasonlitasa/FractionCompare4Figures';

/** A törtrész kiszámítása két lépésben: előbb osztunk (1 rész), aztán szorzunk (n rész). */
export const partOf = (amount: number, n: number, d: number): number => (amount / d) * n;

/** Kiírás a tankönyv szavaival és műveletével: „12-nek a 3 negyede: 12 : 4 · 3 = 9”. */
export const partOfSteps = (amount: number, n: number, d: number): string[] => {
  const one = amount / d;
  return n === 1 ? [`${amount} : ${d} = ${one}`] : [`${amount} : ${d} = ${one}`, `${one} · ${n} = ${one * n}`];
};

const Frame: React.FC<{ vb: string; className?: string; children: React.ReactNode }> = ({ vb, className, children }) => (
  <svg viewBox={vb} className={className ?? 'w-full h-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    {children}
  </svg>
);

/** Korongok csoportokban (soronként egy csoport), az első `colored` csoport színes. */
export const DiscGroupsG: React.FC<{ x: number; y: number; total: number; groups: number; colored: number; r?: number; gap?: number; color?: string }> = ({
  x,
  y,
  total,
  groups,
  colored,
  r = 9,
  gap = 24,
  color = '#10b981'
}) => {
  const per = total / groups;
  return (
    <g>
      {Array.from({ length: groups }, (_, g) => (
        <g key={g}>
          <rect x={x - r - 4} y={y + g * gap - r - 3} width={per * (2 * r + 6) + 2} height={2 * r + 6} rx={r + 3} fill={g < colored ? '#d1fae5' : '#f8fafc'} stroke={g < colored ? '#059669' : '#cbd5e1'} strokeWidth={1.5} />
          {Array.from({ length: per }, (_, i) => (
            <circle key={i} cx={x + i * (2 * r + 6)} cy={y + g * gap} r={r} fill={g < colored ? color : '#ffffff'} stroke="#334155" strokeWidth={1.3} />
          ))}
        </g>
      ))}
    </g>
  );
};

// ---------------------------------------------------------------------------
// 1. „12-nek a 3 negyede” korongokkal: 12 : 4 = 3, 3 · 3 = 9
// ---------------------------------------------------------------------------
export const TwoStepDiscsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 420 200" className={className}>
    <rect x="1" y="1" width="418" height="198" rx="14" fill="#ecfdf5" stroke="#a7f3d0" />
    <text x="210" y="24" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#065f46">
      12-nek a 3 negyede
    </text>
    <DiscGroupsG x={40} y={52} total={12} groups={4} colored={3} r={11} gap={34} />
    <text x={150} y={57} fontSize="12" fill="#065f46" fontWeight="bold">1 negyed</text>
    <text x={150} y={91} fontSize="12" fill="#065f46" fontWeight="bold">2 negyed</text>
    <text x={150} y={125} fontSize="12" fill="#065f46" fontWeight="bold">3 negyed</text>
    <text x={150} y={159} fontSize="12" fill="#64748b" fontWeight="bold">ez nem kell</text>
    <rect x={250} y={60} width={150} height={92} rx={12} fill="#ffffff" stroke="#10b981" strokeWidth={2} />
    <text x={325} y={84} fontSize="12" textAnchor="middle" fill="#334155">1. 4 egyenlő csoport:</text>
    <text x={325} y={102} fontSize="15" fontWeight="bold" textAnchor="middle" fill="#047857">12 : 4 = 3</text>
    <text x={325} y={124} fontSize="12" textAnchor="middle" fill="#334155">2. 3 csoport kell:</text>
    <text x={325} y={142} fontSize="15" fontWeight="bold" textAnchor="middle" fill="#047857">3 · 3 = 9</text>
    <text x={210} y={190} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#065f46">
      Röviden: 12 : 4 · 3 = 9
    </text>
  </Frame>
);

// ---------------------------------------------------------------------------
// 2. MF II/68, 8. feladat: 300 Ft törtrészei és a műveletkártyák
// ---------------------------------------------------------------------------
export const PRICE_CARDS: { n: number; d: number; item: string; op: string; price: number }[] = [
  { n: 1, d: 2, item: 'ceruza', op: '300 : 2', price: 150 },
  { n: 2, d: 3, item: 'radír', op: '300 : 3 · 2', price: 200 },
  { n: 5, d: 5, item: 'hegyező', op: '300 : 5 · 5', price: 300 },
  { n: 4, d: 5, item: 'toll', op: '300 : 5 · 4', price: 240 },
  { n: 5, d: 6, item: 'szövegkiemelő', op: '300 : 6 · 5', price: 250 }
];

export const PriceBarsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 460 250" className={className}>
    <rect x="1" y="1" width="458" height="248" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
    <text x="230" y="24" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#1e3a8a">
      Az egész csík 300 Ft. Mennyibe kerülnek az írószerek?
    </text>
    {PRICE_CARDS.map((c, i) => {
      const y = 40 + i * 42;
      return (
        <g key={c.item}>
          <text x={14} y={y + 17} fontSize="12" fontWeight="bold" fill="#334155">
            {c.item}: {c.n === 1 && c.d === 2 ? 'a fele' : `${az(c.n)} ${fwOf(c.n, c.d)}`}
          </text>
          <BarG x={170} y={y + 2} w={150} h={22} parts={c.d} filled={c.n} color="#3b82f6" />
          <rect x={330} y={y} width={120} height={26} rx={6} fill="#ffffff" stroke="#64748b" />
          <text x={390} y={y + 18} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1e40af">
            {c.op} = {c.price}
          </text>
        </g>
      );
    })}
  </Frame>
);

// ---------------------------------------------------------------------------
// 3. MF II/68, 7. feladat: Palkó 60 játékautója
// ---------------------------------------------------------------------------
export const CAR_GROUPS: { label: string; n: number; d: number; color: string; count: number }[] = [
  { label: 'kék', n: 1, d: 10, color: '#3b82f6', count: 6 },
  { label: 'sárga', n: 1, d: 6, color: '#facc15', count: 10 },
  { label: 'zöld', n: 1, d: 4, color: '#22c55e', count: 15 },
  { label: 'piros', n: 1, d: 3, color: '#ef4444', count: 20 }
];

export const CarCollectionSvg: React.FC<{ className?: string }> = ({ className }) => {
  const colors: string[] = [];
  CAR_GROUPS.forEach((g) => {
    for (let i = 0; i < g.count; i++) colors.push(g.color);
  });
  while (colors.length < 60) colors.push('#ffffff');
  return (
    <Frame vb="0 0 540 250" className={className}>
      <rect x="1" y="1" width="538" height="248" rx="14" fill="#fefce8" stroke="#fde68a" />
      <text x="270" y="22" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#854d0e">
        Palkó 60 játékautója
      </text>
      {colors.map((c, i) => {
        const x = 18 + (i % 10) * 26;
        const y = 34 + Math.floor(i / 10) * 34;
        return (
          <g key={i}>
            <rect x={x} y={y + 6} width={22} height={11} rx={3} fill={c} stroke="#334155" strokeWidth={1} />
            <path d={`M ${x + 5} ${y + 6} L ${x + 8} ${y} L ${x + 15} ${y} L ${x + 18} ${y + 6}`} fill={c} stroke="#334155" strokeWidth={1} />
            <circle cx={x + 6} cy={y + 18} r={3} fill="#334155" />
            <circle cx={x + 16} cy={y + 18} r={3} fill="#334155" />
          </g>
        );
      })}
      {[...CAR_GROUPS, { label: 'fehér', n: 0, d: 0, color: '#ffffff', count: 9 }].map((g, i) => (
        <g key={g.label}>
          <rect x={290} y={40 + i * 38} width={16} height={16} rx={3} fill={g.color} stroke="#334155" />
          <text x={312} y={53 + i * 38} fontSize="12" fontWeight="bold" fill="#334155">
            {g.d ? `${fwOf(g.n, g.d)} ${g.label}: 60 : ${g.d} = ${g.count}` : `fehér: 60 − 51 = 9`}
          </text>
        </g>
      ))}
    </Frame>
  );
};

// ---------------------------------------------------------------------------
// 4. TK 150/14 és MF II/70, 14.: a méter negyedei és tizedei
// ---------------------------------------------------------------------------
export const MeterTapeSvg: React.FC<{ className?: string }> = ({ className }) => {
  const x0 = 30;
  const w = 340;
  const X = (cm: number) => x0 + (w * cm) / 100;
  return (
    <Frame vb="0 0 500 200" className={className}>
      <rect x="1" y="1" width="498" height="198" rx="14" fill="#fff7ed" stroke="#fed7aa" />
      <text x="250" y="22" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#9a3412">
        1 m = 100 cm – a mérőszalag kétszer félbehajtva
      </text>
      <rect x={x0} y={40} width={w} height={34} fill="#fde047" stroke="#a16207" strokeWidth={2} rx={3} />
      {Array.from({ length: 101 }, (_, i) => (
        <line key={i} x1={X(i)} y1={40} x2={X(i)} y2={40 + (i % 10 === 0 ? 16 : i % 5 === 0 ? 11 : 6)} stroke="#713f12" strokeWidth={i % 10 === 0 ? 1.6 : 0.8} />
      ))}
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((c) => (
        <text key={c} x={X(c)} y={70} fontSize="10" textAnchor="middle" fill="#713f12">
          {c}
        </text>
      ))}
      {[25, 50, 75].map((c) => (
        <line key={c} x1={X(c)} y1={34} x2={X(c)} y2={82} stroke="#dc2626" strokeWidth={2} strokeDasharray="4 3" />
      ))}
      {[1, 2, 3, 4].map((n) => (
        <g key={n}>
          <BarG x={x0} y={86 + (n - 1) * 26} w={(w * n) / 4} h={18} parts={n} filled={n} color="#fb923c" />
          <text x={x0 + (w * n) / 4 + 8} y={100 + (n - 1) * 26} fontSize="12" fontWeight="bold" fill="#9a3412">
            {n === 4 ? '4 negyede = 100 cm' : `${fwOf(n, 4)} = ${25 * n} cm`}
          </text>
        </g>
      ))}
    </Frame>
  );
};

// ---------------------------------------------------------------------------
// 5. Az óra törtrészei: negyed óra, fél óra, háromnegyed óra
// ---------------------------------------------------------------------------
const sector = (cx: number, cy: number, r: number, from: number, to: number) => {
  const a0 = -Math.PI / 2 + (from / 60) * 2 * Math.PI;
  const a1 = -Math.PI / 2 + (to / 60) * 2 * Math.PI;
  const large = to - from > 30 ? 1 : 0;
  return `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(2)} ${(cy + r * Math.sin(a0)).toFixed(2)} A ${r} ${r} 0 ${large} 1 ${(cx + r * Math.cos(a1)).toFixed(2)} ${(cy + r * Math.sin(a1)).toFixed(2)} Z`;
};

/** Óralap, a 0-tól `minutes` percig színezve. */
export const ClockFaceG: React.FC<{ cx: number; cy: number; r: number; minutes: number; color?: string; showLabels?: boolean }> = ({ cx, cy, r, minutes, color = '#a78bfa', showLabels = true }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#312e81" strokeWidth={3} />
    {minutes > 0 && minutes < 60 && <path d={sector(cx, cy, r - 2, 0, minutes)} fill={color} opacity={0.75} />}
    {minutes >= 60 && <circle cx={cx} cy={cy} r={r - 2} fill={color} opacity={0.75} />}
    {Array.from({ length: 12 }, (_, i) => {
      const a = -Math.PI / 2 + (i / 12) * 2 * Math.PI;
      return <line key={i} x1={cx + (r - 2) * Math.cos(a)} y1={cy + (r - 2) * Math.sin(a)} x2={cx + (r - (i % 3 === 0 ? 10 : 6)) * Math.cos(a)} y2={cy + (r - (i % 3 === 0 ? 10 : 6)) * Math.sin(a)} stroke="#312e81" strokeWidth={i % 3 === 0 ? 2.5 : 1.2} />;
    })}
    {showLabels &&
      [12, 3, 6, 9].map((h, i) => {
        const a = -Math.PI / 2 + (i / 4) * 2 * Math.PI;
        return (
          <text key={h} x={cx + (r - 20) * Math.cos(a)} y={cy + (r - 20) * Math.sin(a) + 4} fontSize={r > 40 ? 12 : 9} fontWeight="bold" textAnchor="middle" fill="#312e81">
            {h}
          </text>
        );
      })}
    <circle cx={cx} cy={cy} r={3} fill="#312e81" />
  </g>
);

export const ClockPartsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 460 190" className={className}>
    <rect x="1" y="1" width="458" height="188" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
    <text x="230" y="22" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#4c1d95">
      1 óra = 60 perc
    </text>
    {[
      { m: 15, t: 'negyed óra', s: '60 : 4 = 15 perc' },
      { m: 30, t: 'fél óra', s: '60 : 2 = 30 perc' },
      { m: 45, t: '3 negyed óra', s: '60 : 4 · 3 = 45 perc' }
    ].map((c, i) => (
      <g key={c.m}>
        <ClockFaceG cx={80 + i * 150} cy={92} r={52} minutes={c.m} />
        <text x={80 + i * 150} y={162} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#5b21b6">
          {c.t}
        </text>
        <text x={80 + i * 150} y={180} fontSize="11" textAnchor="middle" fill="#334155">
          {c.s}
        </text>
      </g>
    ))}
  </Frame>
);

// ---------------------------------------------------------------------------
// 6. TK 151/18. e): 15 liter szörp – 1 harmad málna, a maradék fele eper, a többi szeder
// ---------------------------------------------------------------------------
export const SyrupSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame vb="0 0 460 200" className={className}>
    <rect x="1" y="1" width="458" height="198" rx="14" fill="#fdf2f8" stroke="#fbcfe8" />
    <text x="230" y="22" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#831843">
      15 liter szörp
    </text>
    <rect x={30} y={40} width={400} height={34} fill="#ffffff" stroke="#334155" strokeWidth={2} rx={3} />
    <rect x={30} y={40} width={133.3} height={34} fill="#f43f5e" stroke="#334155" strokeWidth={1.5} />
    <rect x={163.3} y={40} width={133.3} height={34} fill="#fb7185" stroke="#334155" strokeWidth={1.5} />
    <rect x={296.6} y={40} width={133.4} height={34} fill="#6d28d9" stroke="#334155" strokeWidth={1.5} />
    <text x={96} y={62} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#ffffff">málna</text>
    <text x={230} y={62} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#ffffff">eper</text>
    <text x={363} y={62} fontSize="13" fontWeight="bold" textAnchor="middle" fill="#ffffff">szeder</text>
    <path d="M 163 82 L 163 90 L 430 90 L 430 82" fill="none" stroke="#334155" strokeWidth={1.5} />
    <text x={296} y={104} fontSize="11" textAnchor="middle" fill="#334155">a maradék: 15 − 5 = 10 liter</text>
    <text x={30} y={128} fontSize="12" fill="#334155">1. málna: a 15 liter 1 harmada: 15 : 3 = <tspan fontWeight="bold">5 liter</tspan></text>
    <text x={30} y={148} fontSize="12" fill="#334155">2. eper: a maradék 10 liter fele: 10 : 2 = <tspan fontWeight="bold">5 liter</tspan></text>
    <text x={30} y={168} fontSize="12" fill="#334155">3. szeder: 10 − 5 = <tspan fontWeight="bold">5 liter = 5000 ml</tspan> (1 l = 1000 ml)</text>
  </Frame>
);

export { fw, fwOf };
