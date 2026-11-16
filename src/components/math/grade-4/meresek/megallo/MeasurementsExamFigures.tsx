import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/** 1. ábra: a fejezet mértékegységei egy helyen */
export const ChapterUnitsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rows = [
    { name: 'hosszúság', c: '#ca8a04', units: ['km', 'm', 'dm', 'cm', 'mm'], f: ['· 1000', '· 10', '· 10', '· 10'] },
    { name: 'tömeg', c: '#16a34a', units: ['kg', 'dkg', 'g'], f: ['· 100', '· 10'] },
    { name: 'űrtartalom', c: '#ea580c', units: ['l', 'dl', 'cl', 'ml'], f: ['· 10', '· 10', '· 10'] },
    { name: 'idő', c: '#4f46e5', units: ['nap', 'óra', 'perc', 'mp'], f: ['· 24', '· 60', '· 60'] }
  ];
  return (
    <svg viewBox="0 0 520 250" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="246" rx="16" fill="#fffbeb" stroke="#fcd34d" />
      <text x="260" y="26" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">Amit már tudsz: a mértékegységek lépcsői</text>
      {rows.map((r, i) => {
        const y = 44 + i * 50;
        return (
          <g key={r.name}>
            <rect x="12" y={y} width="92" height="38" rx="10" fill={r.c} />
            <text x="58" y={y + 24} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">{r.name}</text>
            {r.units.map((u, k) => {
              const x = 120 + k * 80;
              return (
                <g key={u}>
                  <rect x={x} y={y + 2} width="46" height="34" rx="8" fill="#ffffff" stroke={r.c} strokeWidth="2.5" />
                  <text x={x + 23} y={y + 25} textAnchor="middle" fontSize="14" fontWeight="bold" fill={r.c}>{u}</text>
                  {k < r.f.length && (
                    <g>
                      <line x1={x + 48} y1={y + 19} x2={x + 76} y2={y + 19} stroke="#94a3b8" strokeWidth="2" />
                      <polygon points={`${x + 78},${y + 19} ${x + 71},${y + 15} ${x + 71},${y + 23}`} fill="#94a3b8" />
                      <text x={x + 62} y={y + 13} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">{r.f[k]}</text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

export const MOTORWAYS = [
  { n: 'Magyarország', v: 1563, c: '#16a34a' },
  { n: 'Törökország', v: 2127, c: '#dc2626' },
  { n: 'Horvátország', v: 1295, c: '#2563eb' },
  { n: 'Ausztria', v: 1719, c: '#f59e0b' },
  { n: 'Dánia', v: 1186, c: '#9333ea' }
];

/** 2. ábra: autópályák hossza 2013-ban (Megálló 3. feladat) */
export const MotorwayChartSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const x0 = 120;
  const sc = 0.16;
  return (
    <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="516" height="226" rx="16" fill="#ffffff" stroke="#cbd5e1" />
      {[0, 500, 1000, 1500, 2000, 2500].map((v) => (
        <g key={v}>
          <line x1={x0 + v * sc} y1="20" x2={x0 + v * sc} y2="190" stroke="#e2e8f0" />
          <text x={x0 + v * sc} y="206" textAnchor="middle" fontSize="10" fill="#475569">{v}</text>
        </g>
      ))}
      {MOTORWAYS.map((d, i) => (
        <g key={d.n}>
          <text x={x0 - 8} y={42 + i * 32} textAnchor="end" fontSize="12" fill="#334155">{d.n}</text>
          <rect x={x0} y={28 + i * 32} width={d.v * sc} height="20" rx="4" fill={d.c} />
          <text x={x0 + d.v * sc + 6} y={43 + i * 32} fontSize="11" fontWeight="bold" fill="#0f172a">{d.v} km</text>
        </g>
      ))}
      <line x1={x0} y1="190" x2={x0 + 2500 * sc} y2="190" stroke="#334155" />
      <text x="260" y="222" textAnchor="middle" fontSize="11" fill="#475569">Autópályák hossza néhány európai országban (2013, km)</text>
    </svg>
  );
};

export const ANIMALS = [
  { e: '🐱', n: 'macska', v: '20–30 cl' },
  { e: '🐦', n: 'galamb', v: '8 cl' },
  { e: '🐶', n: 'kutya', v: '8 dl' },
  { e: '🦢', n: 'liba', v: '8–10 dl' },
  { e: '🐍', n: 'kígyó', v: '5–10 cl' }
];

/** 3. ábra: állatok napi vízigénye (Megálló 5. feladat) */
export const AnimalWaterSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="166" rx="16" fill="#f0f9ff" stroke="#7dd3fc" />
    {ANIMALS.map((a, i) => {
      const cx = 56 + i * 102;
      return (
        <g key={a.n}>
          <circle cx={cx} cy="62" r="38" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
          <text x={cx} y="76" textAnchor="middle" fontSize="38">{a.e}</text>
          <text x={cx} y="122" textAnchor="middle" fontSize="12" fill="#334155">{a.n}</text>
          <text x={cx} y="142" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">{a.v}</text>
        </g>
      );
    })}
    <text x="260" y="162" textAnchor="middle" fontSize="10" fill="#475569">Mennyi vizet iszik naponta? Váltsd át milliliterre!</text>
  </svg>
);

export const BALLOON = [
  { n: 'burkolat', v: 113 },
  { n: 'égő', v: 22 },
  { n: '3 tartály', v: 184 },
  { n: 'kosár', v: 63 },
  { n: '4 utas', v: 320 },
  { n: 'levegő', v: 3000 }
];

/** 4. ábra: a hőlégballon részeinek tömege (Megálló 7. feladat) */
export const BalloonMassSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="216" rx="16" fill="#fff1f2" stroke="#fda4af" />
    <ellipse cx="110" cy="80" rx="62" ry="68" fill="#f43f5e" />
    <path d="M 70 32 Q 110 80 70 128 M 150 32 Q 110 80 150 128" fill="none" stroke="#fde68a" strokeWidth="6" />
    <line x1="80" y1="140" x2="96" y2="172" stroke="#78350f" strokeWidth="2" />
    <line x1="140" y1="140" x2="124" y2="172" stroke="#78350f" strokeWidth="2" />
    <rect x="92" y="172" width="36" height="28" rx="4" fill="#a16207" />
    {BALLOON.map((b, i) => (
      <g key={b.n}>
        <rect x="220" y={18 + i * 30} width="280" height="28" rx="6" fill={i % 2 ? '#ffe4e6' : '#ffffff'} />
        <text x="232" y={37 + i * 30} fontSize="13" fill="#0f172a">{b.n}</text>
        <text x="488" y={37 + i * 30} textAnchor="end" fontSize="13" fontWeight="bold" fill="#0f172a">{b.v} kg</text>
      </g>
    ))}
    <text x="360" y="207" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9f1239">Mennyi a hőlégballon össztömege?</text>
  </svg>
);

export type BoardField = { q: string; color: 'blue' | 'red' | 'yellow' | 'green' | 'orange'; ans: number; unit: string };

export const BOARD_TASKS: Record<BoardField['color'], { fill: string; text: string; unit: string }> = {
  blue: { fill: '#0ea5e9', text: 'Váltsd át literre!', unit: 'l' },
  red: { fill: '#dc2626', text: 'Hány méter?', unit: 'm' },
  yellow: { fill: '#facc15', text: 'Fejezd ki milliméterben!', unit: 'mm' },
  green: { fill: '#22c55e', text: 'Fejezd ki kilogrammban!', unit: 'kg' },
  orange: { fill: '#f97316', text: 'Mondd milliliterben kifejezve!', unit: 'ml' }
};

export const BOARD: BoardField[] = [
  { q: '2500 cl', color: 'blue', ans: 25, unit: 'l' },
  { q: '200 dkg', color: 'green', ans: 2, unit: 'kg' },
  { q: '4 m', color: 'yellow', ans: 4000, unit: 'mm' },
  { q: '600 cl', color: 'orange', ans: 6000, unit: 'ml' },
  { q: '7000 mm', color: 'red', ans: 7, unit: 'm' },
  { q: '3000 ml', color: 'blue', ans: 3, unit: 'l' },
  { q: '328 cl', color: 'orange', ans: 3280, unit: 'ml' },
  { q: '3500 dkg', color: 'green', ans: 35, unit: 'kg' },
  { q: '320 cm', color: 'yellow', ans: 3200, unit: 'mm' },
  { q: '4000 mm', color: 'red', ans: 4, unit: 'm' },
  { q: '9500 dl', color: 'blue', ans: 950, unit: 'l' },
  { q: '30 dl', color: 'orange', ans: 3000, unit: 'ml' },
  { q: '28 dm', color: 'yellow', ans: 2800, unit: 'mm' },
  { q: '80 dm', color: 'red', ans: 8, unit: 'm' },
  { q: '9 l', color: 'orange', ans: 9000, unit: 'ml' },
  { q: '41 cm', color: 'yellow', ans: 410, unit: 'mm' },
  { q: '8000 dl', color: 'blue', ans: 800, unit: 'l' },
  { q: '800 dkg', color: 'green', ans: 8, unit: 'kg' },
  { q: '6000 dm', color: 'red', ans: 600, unit: 'm' },
  { q: '400 cl', color: 'blue', ans: 4, unit: 'l' },
  { q: '97 dm', color: 'yellow', ans: 9700, unit: 'mm' }
];

/** Társasjáték-mezők elhelyezése (kígyózó pálya) */
export const boardPos = (i: number) => {
  const perRow = 7;
  const row = Math.floor(i / perRow);
  const k = i % perRow;
  const col = row % 2 === 0 ? k : perRow - 1 - k;
  return { x: 50 + col * 70, y: 50 + row * 62 };
};

/** 5. ábra: a mértékegység-társasjáték pályája (Megálló 8. feladat) */
export const UnitBoardGameSvg: React.FC<FigProps & { active?: number }> = ({ className = DEFAULT_CLASS, active }) => (
  <svg viewBox="0 0 520 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="516" height="226" rx="16" fill="#f8fafc" stroke="#cbd5e1" />
    {BOARD.slice(0, -1).map((_, i) => {
      const a = boardPos(i);
      const b = boardPos(i + 1);
      return <line key={`l${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#1e3a8a" strokeWidth="3" />;
    })}
    {BOARD.map((f, i) => {
      const p = boardPos(i);
      return (
        <g key={f.q}>
          <circle cx={p.x} cy={p.y} r={active === i ? 28 : 25} fill={BOARD_TASKS[f.color].fill} stroke={active === i ? '#0f172a' : '#ffffff'} strokeWidth={active === i ? 4 : 2} />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill={f.color === 'yellow' ? '#713f12' : '#ffffff'}>{f.q}</text>
        </g>
      );
    })}
    <text x="20" y="20" fontSize="11" fontWeight="bold" fill="#1e3a8a">Rajt →</text>
    <text x="500" y="222" textAnchor="end" fontSize="11" fontWeight="bold" fill="#1e3a8a">→ Cél</text>
  </svg>
);
