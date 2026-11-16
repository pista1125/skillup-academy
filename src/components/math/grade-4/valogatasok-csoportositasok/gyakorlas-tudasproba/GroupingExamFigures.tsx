import React from 'react';
import { Venn2, LogicBlock, LOGIC_BLOCKS_TK } from '../valogatasok-halmazokba/SetSortingFigures';

/** A fejezet négy leckéje egy képen. */
export const ChapterMapSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 200" className={className} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="356" height="196" rx="14" fill="#ecfdf5" />
    {/* 1. halmazábra */}
    <g>
      <rect x="10" y="10" width="166" height="86" rx="10" fill="#fff" stroke="#6366f1" strokeWidth="2" />
      <circle cx="70" cy="56" r="28" fill="#6366f1" fillOpacity="0.15" stroke="#6366f1" strokeWidth="1.8" />
      <circle cx="104" cy="56" r="28" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="1.8" />
      <text x="93" y="26" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#4338ca">
        1. Halmazokba
      </text>
      <circle cx="87" cy="60" r="4" fill="#0f172a" />
      <circle cx="150" cy="84" r="4" fill="#0f172a" />
    </g>
    {/* 2. táblázat */}
    <g>
      <rect x="184" y="10" width="166" height="86" rx="10" fill="#fff" stroke="#9333ea" strokeWidth="2" />
      <text x="267" y="26" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#7e22ce">
        2. Táblázatba
      </text>
      {[0, 1].map((r) =>
        [0, 1].map((c) => <rect key={`${r}${c}`} x={232 + c * 40} y={34 + r * 26} width="40" height="26" fill={r === 0 && c === 1 ? '#f3e8ff' : '#fff'} stroke="#9333ea" />)
      )}
      <circle cx="292" cy="47" r="4" fill="#0f172a" />
    </g>
    {/* 3. elágazásos rajz */}
    <g>
      <rect x="10" y="104" width="166" height="86" rx="10" fill="#fff" stroke="#d97706" strokeWidth="2" />
      <text x="93" y="120" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#b45309">
        3. Hányféle lehetőség?
      </text>
      <g stroke="#d97706" strokeWidth="1.8">
        <line x1="40" y1="156" x2="80" y2="134" />
        <line x1="40" y1="156" x2="80" y2="178" />
        <line x1="80" y1="134" x2="120" y2="128" />
        <line x1="80" y1="134" x2="120" y2="142" />
        <line x1="80" y1="178" x2="120" y2="170" />
        <line x1="80" y1="178" x2="120" y2="184" />
      </g>
      <text x="150" y="162" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#92400e">
        2 · 2
      </text>
    </g>
    {/* 4. igaz vagy hamis */}
    <g>
      <rect x="184" y="104" width="166" height="86" rx="10" fill="#fff" stroke="#e11d48" strokeWidth="2" />
      <text x="267" y="120" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#be123c">
        4. Igaz vagy hamis?
      </text>
      <circle cx="240" cy="154" r="18" fill="#10b981" />
      <text x="240" y="160" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#fff">
        I
      </text>
      <circle cx="294" cy="154" r="18" fill="#f43f5e" />
      <text x="294" y="160" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#fff">
        H
      </text>
    </g>
  </svg>
);

/** Páros és 3 többszöröse – az 1–12 számok. */
export const EvenTripleVennSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Venn2
    className={className}
    frame="Számok 1-től 12-ig"
    labelA="Páros"
    labelB="3 többszöröse"
    onlyA={['2', '4', '8', '10']}
    both={['6', '12']}
    onlyB={['3', '9']}
    outside={['1', '5', '7', '11']}
    colorA="#0891b2"
    colorB="#d97706"
    fontSize={13}
  />
);

/** A tankönyv A–H logikai lapjai táblázatban (Lyukas / Nem lyukas × Kék / Nem kék). */
export const BlocksTableSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const cells: [boolean, boolean, number, number][] = [
    [true, true, 96, 34],
    [true, false, 226, 34],
    [false, true, 96, 94],
    [false, false, 226, 94]
  ];
  return (
    <svg viewBox="0 0 360 160" className={className} fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="356" height="156" rx="10" fill="#fff7ed" />
      {['Kék', 'Nem kék'].map((t, i) => (
        <g key={t}>
          <rect x={96 + i * 130} y="8" width="130" height="26" fill="#ea580c" />
          <text x={161 + i * 130} y="25" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#fff">
            {t}
          </text>
        </g>
      ))}
      {['Lyukas', 'Nem lyukas'].map((t, i) => (
        <g key={t}>
          <rect x="4" y={34 + i * 60} width="92" height="60" fill="#ea580c" />
          <text x="50" y={68 + i * 60} fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#fff">
            {t}
          </text>
        </g>
      ))}
      {cells.map(([h, k, x, y]) => {
        const list = LOGIC_BLOCKS_TK.filter((b) => b.holed === h && (b.color === 'kék') === k);
        return (
          <g key={`${x}${y}`}>
            <rect x={x} y={y} width="130" height="60" fill="#fff" stroke="#ea580c" strokeWidth="1.5" />
            {list.map((b, i) => (
              <g key={b.id}>
                <LogicBlock x={x + 34 + i * 60} y={y + 26} shape={b.shape} color={b.color} holed={b.holed} s={b.small ? 16 : 24} />
                <text x={x + 34 + i * 60} y={y + 54} fontSize="10" fontWeight="bold" textAnchor="middle" fill="#334155">
                  {b.id}
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/** 2 póló · 3 nadrág = 6 öltözet – rácsban. */
export const OutfitGridSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const shirts = ['#ef4444', '#3b82f6'];
  const pants = ['#1e3a8a', '#78350f', '#64748b'];
  return (
    <svg viewBox="0 0 320 170" className={className} fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="316" height="166" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
      {pants.map((p, j) => (
        <g key={p}>
          <rect x={104 + j * 70} y="12" width="20" height="30" fill={p} />
          <rect x={126 + j * 70} y="12" width="20" height="30" fill={p} />
        </g>
      ))}
      {shirts.map((s, i) => (
        <g key={s}>
          <path d={`M 30 ${66 + i * 50} l 14 -8 h 16 l 14 8 l -6 10 l -6 -3 v 24 h -32 v -24 l -6 3 z`} fill={s} />
          {pants.map((p, j) => (
            <g key={p}>
              <rect x={100 + j * 70} y={58 + i * 50} width="50" height="40" rx="8" fill="#fff" stroke="#94a3b8" />
              <rect x={113 + j * 70} y={62 + i * 50} width="24" height="14" fill={s} />
              <rect x={113 + j * 70} y={77 + i * 50} width="11" height="17" fill={p} />
              <rect x={126 + j * 70} y={77 + i * 50} width="11" height="17" fill={p} />
            </g>
          ))}
        </g>
      ))}
      <text x="160" y="164" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">
        2 póló · 3 nadrág = 6 öltözet
      </text>
    </svg>
  );
};
