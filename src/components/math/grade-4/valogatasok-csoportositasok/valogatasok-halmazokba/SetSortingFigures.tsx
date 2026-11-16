import React from 'react';

// ---------------------------------------------------------------------------
// Közös segédek a VI. fejezethez (halmazábrák, logikai lapok)
// ---------------------------------------------------------------------------

export type BlockColor = 'piros' | 'kék' | 'sárga' | 'zöld';
export type BlockShape = 'kör' | 'háromszög' | 'négyzet' | 'téglalap';

export const BLOCK_FILL: Record<BlockColor, string> = {
  piros: '#ef4444',
  kék: '#3b82f6',
  sárga: '#facc15',
  zöld: '#22c55e'
};

/** Egy logikai lap rajza (a lyukas lapon fehér pötty jelzi a lyukat, mint a tankönyvben). */
export const LogicBlock: React.FC<{
  x: number;
  y: number;
  shape: BlockShape;
  color: BlockColor;
  holed?: boolean;
  s?: number;
}> = ({ x, y, shape, color, holed, s = 22 }) => {
  const fill = BLOCK_FILL[color];
  const stroke = '#334155';
  let body: React.ReactNode;
  if (shape === 'kör') body = <circle cx={x} cy={y} r={s * 0.5} fill={fill} stroke={stroke} strokeWidth="1.2" />;
  else if (shape === 'háromszög')
    body = (
      <polygon
        points={`${x},${y - s * 0.55} ${x + s * 0.6},${y + s * 0.45} ${x - s * 0.6},${y + s * 0.45}`}
        fill={fill}
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    );
  else if (shape === 'négyzet')
    body = <rect x={x - s * 0.5} y={y - s * 0.5} width={s} height={s} fill={fill} stroke={stroke} strokeWidth="1.2" />;
  else body = <rect x={x - s * 0.7} y={y - s * 0.38} width={s * 1.4} height={s * 0.76} fill={fill} stroke={stroke} strokeWidth="1.2" />;
  return (
    <g>
      {body}
      {holed && <circle cx={x} cy={shape === 'háromszög' ? y + s * 0.1 : y} r={s * 0.12} fill="#ffffff" stroke={stroke} strokeWidth="0.8" />}
    </g>
  );
};

/** Elemek elrendezése egy terület közepe körül (soronként, szükség esetén két oszlopban). */
const layout = (n: number, cx: number, cy: number, cols: number, dx: number, dy: number): [number, number][] => {
  const rows = Math.ceil(n / cols);
  const out: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const inRow = Math.min(cols, n - r * cols);
    out.push([cx + (c - (inRow - 1) / 2) * dx, cy + (r - (rows - 1) / 2) * dy]);
  }
  return out;
};

export interface Venn2Props {
  frame: string;
  labelA: string;
  labelB: string;
  onlyA?: string[];
  both?: string[];
  onlyB?: string[];
  outside?: string[];
  colorA?: string;
  colorB?: string;
  fontSize?: number;
  className?: string;
  /** A még elhelyezendő elem (az ábra fölött, kérdőjellel). */
  pending?: string;
}

/** Két egymást metsző karika egy keretben (alaphalmaz). Geometria: A (130;135), B (230;135), r = 85. */
export const VENN2 = { ax: 130, bx: 230, cy: 135, r: 85, w: 360, h: 240 };

export const Venn2: React.FC<Venn2Props> = ({
  frame,
  labelA,
  labelB,
  onlyA = [],
  both = [],
  onlyB = [],
  outside = [],
  colorA = '#16a34a',
  colorB = '#dc2626',
  fontSize = 11,
  className = 'w-full h-auto',
  pending
}) => {
  const { ax, bx, cy, r } = VENN2;
  const put = (items: string[], cx: number, cyy: number, cols: number, dx: number) =>
    layout(items.length, cx, cyy, cols, dx, fontSize + 6).map(([x, y], i) => (
      <text
        key={items[i] + i}
        x={x}
        y={y}
        fontSize={fontSize}
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={items[i].includes('?') ? '#dc2626' : '#1e293b'}
      >
        {items[i]}
      </text>
    ));
  return (
    <svg viewBox={pending ? '0 -38 360 278' : '0 0 360 240'} className={className} fontFamily="system-ui, sans-serif">
      {pending && (
        <g>
          <rect x="110" y="-34" width="140" height="28" rx="14" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="180" y="-15" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#92400e">
            {pending} → ?
          </text>
        </g>
      )}
      <rect x="4" y="4" width="352" height="232" rx="12" fill="#f8fafc" stroke="#0f766e" strokeWidth="2" />
      <rect x="4" y="4" width={Math.max(70, frame.length * 7 + 16)} height="22" rx="8" fill="#0f766e" />
      <text x="12" y="19" fontSize="11" fontWeight="bold" fill="#ffffff">
        {frame}
      </text>
      <circle cx={ax} cy={cy} r={r} fill={colorA} fillOpacity="0.12" stroke={colorA} strokeWidth="2.2" />
      <circle cx={bx} cy={cy} r={r} fill={colorB} fillOpacity="0.12" stroke={colorB} strokeWidth="2.2" />
      <text x={ax - 20} y={cy - r - 6} fontSize="11.5" fontWeight="bold" textAnchor="middle" fill={colorA}>
        {labelA}
      </text>
      <text x={bx + 20} y={cy - r - 6} fontSize="11.5" fontWeight="bold" textAnchor="middle" fill={colorB}>
        {labelB}
      </text>
      {put(onlyA, 88, cy + 8, onlyA.length > 5 ? 2 : 1, 44)}
      {put(both, 180, cy + 8, 1, 40)}
      {put(onlyB, 272, cy + 8, onlyB.length > 5 ? 2 : 1, 44)}
      {outside.length > 0 && put(outside.slice(Math.ceil(outside.length / 2)), 30, 205, 1, 40)}
      {outside.length > 0 && put(outside.slice(0, Math.ceil(outside.length / 2)), 328, 205, 1, 40)}
    </svg>
  );
};

/** Három karika (Kék, Lyukas, Háromszög) – a tankönyv 134. oldali 8. feladata. */
export const VENN3 = {
  circles: [
    { cx: 150, cy: 100, label: 'Kék', color: '#2563eb' },
    { cx: 214, cy: 100, label: 'Lyukas', color: '#ca8a04' },
    { cx: 182, cy: 156, label: 'Háromszög', color: '#ea580c' }
  ],
  r: 64,
  numbers: { 1: [116, 88], 2: [182, 74], 3: [248, 88], 4: [146, 146], 5: [182, 118], 6: [218, 146], 7: [182, 196], 8: [40, 200] } as Record<
    number,
    [number, number]
  >
};

/** Melyik számozott részbe esik a pont? (1–8, a tankönyv számozása szerint) */
export const venn3RegionAt = (x: number, y: number): number => {
  const [k, l, h] = VENN3.circles.map((c) => Math.hypot(x - c.cx, y - c.cy) < VENN3.r);
  return logicRegion(k, l, h);
};

/** A tankönyvi számozás: 1 csak kék, 2 kék+lyukas, 3 csak lyukas, 4 kék+háromszög, 5 mindhárom, 6 lyukas+háromszög, 7 csak háromszög, 8 egyik sem. */
export const logicRegion = (blue: boolean, holed: boolean, triangle: boolean): number => {
  if (blue && holed && triangle) return 5;
  if (blue && holed) return 2;
  if (blue && triangle) return 4;
  if (holed && triangle) return 6;
  if (blue) return 1;
  if (holed) return 3;
  if (triangle) return 7;
  return 8;
};

export const Venn3Frame: React.FC<{ showNumbers?: boolean; highlight?: number | null; children?: React.ReactNode }> = ({
  showNumbers = true,
  highlight,
  children
}) => (
  <g fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="352" height="232" rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <rect x="276" y="200" width="74" height="30" rx="6" fill="#ffffff" stroke="#fdba74" />
    <text x="313" y="219" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#7c2d12">
      Logikai lapok
    </text>
    {VENN3.circles.map((c) => (
      <circle key={c.label} cx={c.cx} cy={c.cy} r={VENN3.r} fill={c.color} fillOpacity="0.13" stroke={c.color} strokeWidth="2" />
    ))}
    <text x="112" y="30" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">
      Kék
    </text>
    <text x="254" y="30" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#a16207">
      Lyukas
    </text>
    <text x="182" y="232" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#c2410c">
      Háromszög
    </text>
    {showNumbers &&
      Object.entries(VENN3.numbers).map(([n, [x, y]]) => (
        <g key={n}>
          {highlight === Number(n) && <circle cx={x} cy={y} r="11" fill="#fde68a" stroke="#d97706" strokeWidth="2" />}
          <text x={x} y={y} fontSize="13" fontWeight="bold" textAnchor="middle" dominantBaseline="middle" fill="#334155">
            {n}
          </text>
        </g>
      ))}
    {children}
  </g>
);

// ---------------------------------------------------------------------------
// Ábrák
// ---------------------------------------------------------------------------

/** TK 132/2.: vidraetetés és csónakázás – két egymást átfedő csoport. */
export const OTTER_ONLY = ['Dóri', 'Tamás', 'Lajos', 'Norbi', 'Gergő'];
export const OTTER_BOTH = ['Éva', 'Zsolti', 'Sári', 'Magdi', 'Gertrúd', 'Tibi', 'Sanyi', 'Anti'];
export const BOAT_ONLY = ['András', 'Zsuzsi', 'Józsi'];

export const OtterBoatSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const names = (list: string[], cx: number, cols: number) =>
    layout(list.length, cx, 112, cols, 52, 22).map(([x, y], i) => (
      <text key={list[i]} x={x} y={y} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1e293b">
        {list[i]}
      </text>
    ));
  return (
    <svg viewBox="0 0 360 200" className={className} fontFamily="system-ui, sans-serif">
      <rect x="8" y="28" width="250" height="150" rx="16" fill="#dcfce7" fillOpacity="0.8" stroke="#16a34a" strokeWidth="2.5" />
      <rect x="144" y="48" width="208" height="144" rx="16" fill="#e0f2fe" fillOpacity="0.55" stroke="#0284c7" strokeWidth="2.5" />
      <rect x="30" y="16" width="130" height="24" rx="6" fill="#4ade80" />
      <text x="95" y="32" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#14532d">
        Vidraetetést néztek 🦦
      </text>
      <rect x="262" y="36" width="92" height="24" rx="6" fill="#38bdf8" />
      <text x="308" y="52" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">
        Csónakáztak 🚣
      </text>
      {names(OTTER_ONLY, 82, 2)}
      {names(OTTER_BOTH, 201, 2)}
      {names(BOAT_ONLY, 305, 1)}
    </svg>
  );
};

/** MF II/48/1.: madár és háziállat. */
export const AnimalVennSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Venn2
    className={className}
    frame="ÁLLATOK"
    labelA="Madár"
    labelB="Háziállat"
    onlyA={['🦩 flamingó', '🕊️ gólya', '🦉 bagoly', '🐦 kék cinke']}
    both={['🦆 kacsa', '🐔 tyúk', '🪿 liba']}
    onlyB={['🐕 kutya', '🐐 kecske', '🐴 ló']}
    outside={['🦌 őz']}
    fontSize={10.5}
  />
);

/** MF II/48/2.: egymásba ágyazott halmazok – Növény ⊃ Gyümölcs ⊃ Szörp készülhet belőle. */
export const NestedSetsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 220" className={className} fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="352" height="212" rx="12" fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />
    <rect x="4" y="4" width="76" height="22" rx="8" fill="#15803d" />
    <text x="14" y="19" fontSize="11" fontWeight="bold" fill="#fff">
      Növény
    </text>
    <ellipse cx="200" cy="122" rx="146" ry="86" fill="#bbf7d0" fillOpacity="0.6" stroke="#16a34a" strokeWidth="2.2" />
    <text x="200" y="54" fontSize="11.5" fontWeight="bold" textAnchor="middle" fill="#166534">
      Gyümölcs
    </text>
    <ellipse cx="228" cy="140" rx="92" ry="48" fill="#fecaca" fillOpacity="0.7" stroke="#dc2626" strokeWidth="2.2" />
    <text x="228" y="110" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#991b1b">
      Szörp készülhet belőle
    </text>
    <text x="228" y="134" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">
      🍎 alma · 🫐 szilva
    </text>
    <text x="228" y="156" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">
      🍓 málna
    </text>
    <text x="110" y="100" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">
      🌰 dió
    </text>
    <text x="98" y="128" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">
      🥜 mogyoró
    </text>
    <text x="14" y="46" fontSize="11" fontWeight="bold" fill="#1e293b">
      🌿 petrezselyem
    </text>
    <text x="20" y="196" fontSize="11" fontWeight="bold" fill="#1e293b">
      🧅 hagyma
    </text>
    <text x="272" y="208" fontSize="11" fontWeight="bold" fill="#1e293b">
      🥔 burgonya
    </text>
  </svg>
);

/** TK 132/3. b): Számok – Páros számok – Négyjegyű számok. */
export const NumberSetsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Venn2
    className={className}
    frame="Számok"
    labelA="Páros számok"
    labelB="Négyjegyű számok"
    onlyA={['54', '600', '48']}
    both={['1246', '8002', '9998', '6606']}
    onlyB={['9579', '1005', '8889', '1001']}
    outside={['475', '33', '77', '423']}
    colorA="#16a34a"
    colorB="#2563eb"
  />
);

/** TK 134/8.: logikai lapok három karikában, számozott részekkel. */
export const LogicBlocksVennSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 240" className={className}>
    <Venn3Frame />
  </svg>
);

/** TK 134/8. a): a válogatandó logikai lapok A–H. */
export const LOGIC_BLOCKS_TK: { id: string; color: BlockColor; shape: BlockShape; holed: boolean; small?: boolean }[] = [
  { id: 'A', color: 'sárga', shape: 'háromszög', holed: true },
  { id: 'B', color: 'kék', shape: 'háromszög', holed: false, small: true },
  { id: 'C', color: 'zöld', shape: 'kör', holed: false, small: true },
  { id: 'D', color: 'kék', shape: 'négyzet', holed: false },
  { id: 'E', color: 'zöld', shape: 'négyzet', holed: true },
  { id: 'F', color: 'kék', shape: 'négyzet', holed: true, small: true },
  { id: 'G', color: 'kék', shape: 'háromszög', holed: true },
  { id: 'H', color: 'zöld', shape: 'háromszög', holed: false, small: true }
];

export const LogicBlocksRowSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg viewBox="0 0 360 90" className={className} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="356" height="86" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {LOGIC_BLOCKS_TK.map((b, i) => {
      const x = 26 + i * 44;
      return (
        <g key={b.id}>
          <LogicBlock x={x} y={44} shape={b.shape} color={b.color} holed={b.holed} s={b.small ? 18 : 28} />
          <text x={x} y={80} fontSize="11" fontWeight="bold" textAnchor="middle" fill="#334155">
            {b.id}
          </text>
        </g>
      );
    })}
  </svg>
);

/** MF II/50/8.: kakukktojás – melyik szám nem illik a csoportba? */
export const OddOneOutSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => {
  const sets = [
    { x: 6, color: '#dc2626', nums: ['4920', '3517', '8864', '2792', '9756', '1550', '6328'] },
    { x: 124, color: '#2563eb', nums: ['6799', '7915', '5863', '2451', '4267', '8128', '9999'] },
    { x: 242, color: '#16a34a', nums: ['3070', '5520', '9860', '8710', '4630', '6195', '7370'] }
  ];
  return (
    <svg viewBox="0 0 360 200" className={className} fontFamily="system-ui, sans-serif">
      {sets.map((s, k) => (
        <g key={k}>
          <rect x={s.x} y="6" width="112" height="188" rx="10" fill="#ffffff" stroke={s.color} strokeWidth="2.2" />
          <text x={s.x + 12} y="24" fontSize="11" fontWeight="bold" fill={s.color}>
            {String.fromCharCode(97 + k)})
          </text>
          {s.nums.map((n, i) => (
            <text
              key={n}
              x={s.x + (i % 2 ? 78 : 36)}
              y={46 + i * 20}
              fontSize="12.5"
              fontWeight="bold"
              textAnchor="middle"
              fill="#1e293b"
            >
              {n}
            </text>
          ))}
          <text x={s.x + 56} y="186" fontSize="10" textAnchor="middle" fill="#64748b">
            Kakukktojás?
          </text>
        </g>
      ))}
    </svg>
  );
};
