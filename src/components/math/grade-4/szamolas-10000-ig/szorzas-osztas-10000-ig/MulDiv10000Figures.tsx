import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const COLS = [
  { k: 'E', head: '#16a34a', fill: '#dcfce7' },
  { k: 'sz', head: '#dc2626', fill: '#fee2e2' },
  { k: 't', head: '#0284c7', fill: '#e0f2fe' },
  { k: 'e', head: '#eab308', fill: '#fef9c3' }
];

/**
 * Helyiérték-tábla két sorral (felül a kiinduló szám, alul az eredmény) és egy nyíllal,
 * amely mutatja, hogy a számjegy hány helyet lép (balra = szorzás, jobbra = osztás).
 * Az üres jegy '' – a "?" pirossal jelenik meg.
 */
export const PlaceShiftTable: React.FC<{ x: number; y: number; top: string[]; bottom: string[]; label: string; from: number; to: number; cw?: number }> = ({
  x,
  y,
  top,
  bottom,
  label,
  from,
  to,
  cw = 26
}) => (
  <g>
    {COLS.map((c, i) => (
      <g key={c.k}>
        <rect x={x + i * cw} y={y} width={cw} height="18" fill={c.head} stroke="#1e293b" strokeWidth="0.8" />
        <text x={x + i * cw + cw / 2} y={y + 13} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#fff">{c.k}</text>
        {[0, 1].map((r) => {
          const v = (r === 0 ? top : bottom)[i];
          return (
            <g key={r}>
              <rect x={x + i * cw} y={y + 18 + r * 22} width={cw} height="22" fill={c.fill} stroke="#1e293b" strokeWidth="0.8" />
              <text x={x + i * cw + cw / 2} y={y + 34 + r * 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill={v === '?' || (r === 1 && v === '0') ? '#dc2626' : '#0f172a'}>
                {v}
              </text>
            </g>
          );
        })}
      </g>
    ))}
    <path
      d={`M ${x + from * cw + cw / 2} ${y + 36} L ${x + to * cw + cw / 2} ${y + 46}`}
      stroke="#7c3aed"
      strokeWidth="1.6"
    />
    <circle cx={x + to * cw + cw / 2} cy={y + 46} r="2.2" fill="#7c3aed" />
    <path d={`M ${x + 4 * cw + 2} ${y + 26} q 10 10 0 22`} fill="none" stroke="#334155" strokeWidth="1.3" />
    <text x={x + 4 * cw + 12} y={y + 42} fontSize="11" fontWeight="bold" fill="#334155">{label}</text>
  </g>
);

// 1. ábra: Szorzás 10-zel, 100-zal, 1000-rel (tankönyv 48. o., 2. feladat)
export const MultiplyShiftSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 480 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="476" height="116" rx="14" fill="#f0fdf4" stroke="#86efac" />
    <PlaceShiftTable x={14} y={14} top={['', '', '', '9']} bottom={['', '', '9', '0']} label="· 10" from={3} to={2} />
    <PlaceShiftTable x={164} y={14} top={['', '', '', '9']} bottom={['', '9', '0', '0']} label="· 100" from={3} to={1} />
    <PlaceShiftTable x={314} y={14} top={['', '', '', '9']} bottom={['9', '0', '0', '0']} label="· 1000" from={3} to={0} />
    <g fontSize="12" fontWeight="bold" fill="#14532d">
      <text x="66" y="100" textAnchor="middle">9 · 10 = 90</text>
      <text x="216" y="100" textAnchor="middle">9 · 100 = 900</text>
      <text x="370" y="100" textAnchor="middle">9 · 1000 = 9000</text>
    </g>
    <text x="240" y="114" textAnchor="middle" fontSize="10" fill="#166534">A számjegy balra lép, a helyére 0 kerül.</text>
  </svg>
);

// 2. ábra: Osztás 10-zel, 100-zal, 1000-rel (tankönyv 48. o., 4. feladat)
export const DivideShiftSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 480 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="476" height="116" rx="14" fill="#eff6ff" stroke="#93c5fd" />
    <PlaceShiftTable x={14} y={14} top={['', '3', '8', '0']} bottom={['', '', '3', '8']} label=": 10" from={2} to={3} />
    <PlaceShiftTable x={164} y={14} top={['1', '5', '0', '0']} bottom={['', '', '1', '5']} label=": 100" from={1} to={3} />
    <PlaceShiftTable x={314} y={14} top={['9', '0', '0', '0']} bottom={['', '', '', '9']} label=": 1000" from={0} to={3} />
    <g fontSize="12" fontWeight="bold" fill="#1e3a8a">
      <text x="66" y="100" textAnchor="middle">380 : 10 = 38</text>
      <text x="216" y="100" textAnchor="middle">1500 : 100 = 15</text>
      <text x="370" y="100" textAnchor="middle">9000 : 1000 = 9</text>
    </g>
    <text x="240" y="114" textAnchor="middle" fontSize="10" fill="#1e40af">A végéről elhagyjuk a nullákat: a számjegyek jobbra lépnek.</text>
  </svg>
);

/** Persely egy érmével. */
export const PiggyBank: React.FC<{ x: number; y: number; color: string; coin: string; scale?: number }> = ({ x, y, color, coin, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="0" cy="0" rx="40" ry="28" fill={color} stroke="#1e293b" strokeWidth="1.5" />
    <circle cx="-38" cy="-4" r="9" fill={color} stroke="#1e293b" strokeWidth="1.5" />
    <circle cx="-41" cy="-5" r="1.5" fill="#1e293b" />
    <circle cx="-35" cy="-5" r="1.5" fill="#1e293b" />
    <circle cx="-22" cy="-10" r="2.5" fill="#1e293b" />
    <path d="M -14 -26 L -8 -38 L -2 -26 Z" fill={color} stroke="#1e293b" strokeWidth="1.2" />
    <rect x="-24" y="24" width="10" height="12" rx="3" fill={color} stroke="#1e293b" />
    <rect x="14" y="24" width="10" height="12" rx="3" fill={color} stroke="#1e293b" />
    <rect x="-6" y="-29" width="16" height="4" rx="2" fill="#1e293b" />
    <circle cx="12" cy="2" r="17" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
    <text x="12" y="6.5" textAnchor="middle" fontSize={coin.length > 3 ? 9 : 11} fontWeight="bold" fill="#1e293b">{coin}</text>
  </g>
);

// 3. ábra: Teó, Tóni és Tódi perselye (tankönyv 48. o., 1. feladat)
export const PiggyBanksSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 460 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="456" height="126" rx="14" fill="#fdf4ff" stroke="#f0abfc" />
    {[
      { name: 'Teó', c: '#60a5fa', coin: '10', x: 85 },
      { name: 'Tóni', c: '#f472b6', coin: '100', x: 235 },
      { name: 'Tódi', c: '#4ade80', coin: '1000', x: 385 }
    ].map((p) => (
      <g key={p.name}>
        <text x={p.x} y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{p.name}</text>
        <PiggyBank x={p.x + 5} y={68} color={p.c} coin={p.coin} />
      </g>
    ))}
    <text x="230" y="122" textAnchor="middle" fontSize="10.5" fill="#701a75">5 érme: 5 · 10 = 50 • 5 · 100 = 500 • 5 · 1000 = 5000</text>
  </svg>
);

/** Érmék rácsban (rows × cols, egy érme értéke value). */
export const CoinGrid: React.FC<{ x: number; y: number; rows: number; cols: number; value: number; r?: number; gap?: number }> = ({
  x,
  y,
  rows,
  cols,
  value,
  r = 11,
  gap = 25
}) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => {
      const cx = x + (i % cols) * gap;
      const cy = y + Math.floor(i / cols) * gap;
      return (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="#e2e8f0" stroke="#475569" strokeWidth="1.2" />
          <text x={cx} y={cy + 3.3} textAnchor="middle" fontSize={value >= 1000 ? r * 0.62 : r * 0.78} fontWeight="bold" fill="#1e293b">{value}</text>
        </g>
      );
    })}
  </g>
);

// 4. ábra: 4 sor, soronként 8 százas érme (tankönyv 49. o., 6. feladat)
export const CoinArraySvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 460 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="456" height="146" rx="14" fill="#fff7ed" stroke="#fdba74" />
    <g fontSize="12" fontWeight="bold" fill="#7c2d12">
      <text x="16" y="62">4 · 800 = 3200</text>
      <text x="16" y="84">8 · 400 = 3200</text>
    </g>
    <CoinGrid x={142} y={30} rows={4} cols={8} value={100} />
    <g fontSize="12" fontWeight="bold" fill="#7c2d12">
      <text x="350" y="40">3200 : 8 = 400</text>
      <text x="350" y="62">3200 : 4 = 800</text>
      <text x="350" y="84">3200 : 800 = 4</text>
      <text x="350" y="106">3200 : 400 = 8</text>
    </g>
    <text x="230" y="140" textAnchor="middle" fontSize="10.5" fill="#9a3412">Egy képről 2 szorzás és 4 osztás olvasható le.</text>
  </svg>
);

/** Szorzatpiramis: rows[0] az alsó sor. null = "?" */
export const ProductPyramid: React.FC<{ rows: (number | string | null)[][]; cx?: number; y?: number; w?: number }> = ({ rows, cx = 120, y = 10, w = 50 }) => {
  const h = 26;
  const total = rows.length;
  return (
    <g>
      {rows.map((row, r) =>
        row.map((v, i) => {
          const x = cx - (row.length * w) / 2 + i * w;
          const yy = y + (total - 1 - r) * h;
          const unknown = v === null || v === '?';
          return (
            <g key={`${r}-${i}`}>
              <rect x={x} y={yy} width={w} height={h} fill={unknown ? '#fee2e2' : '#ede9fe'} stroke="#6d28d9" strokeWidth="1.2" />
              <text x={x + w / 2} y={yy + 17.5} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={unknown ? '#dc2626' : '#4c1d95'}>
                {unknown ? '?' : v}
              </text>
            </g>
          );
        })
      )}
    </g>
  );
};

// 5. ábra: Szorzatpiramis (tankönyv 50. o., 12. a) feladat, kitöltve)
export const ProductPyramidSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 240 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="236" height="136" rx="12" fill="#faf5ff" stroke="#d8b4fe" />
    <ProductPyramid rows={[[10, 2, 5, 1], [20, 10, 5], [200, 50], ['10 000']]} />
    <text x="120" y="131" textAnchor="middle" fontSize="10" fill="#4c1d95">Fent mindig az alatta lévő két szám szorzata áll.</text>
  </svg>
);

// 6. ábra: Gombák a kosarakban (tankönyv 49. o., 7. feladat)
export const MushroomBasketsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const mushroom = (x: number, y: number, k: string) => (
    <g key={k}>
      <rect x={x - 3} y={y} width="6" height="9" rx="2" fill="#fef3c7" stroke="#92400e" strokeWidth="0.8" />
      <path d={`M ${x - 9} ${y + 1} Q ${x} ${y - 12} ${x + 9} ${y + 1} Z`} fill="#92400e" />
    </g>
  );
  const basket = (x: number, n: number, k: string) => (
    <g key={k}>
      <path d={`M ${x - 21} 96 L ${x + 21} 96 L ${x + 16} 122 L ${x - 16} 122 Z`} fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
      <path d={`M ${x - 18} 96 Q ${x} 70 ${x + 18} 96`} fill="none" stroke="#78350f" strokeWidth="2" />
      {Array.from({ length: n }, (_, i) => mushroom(x - ((n - 1) * 9) / 2 + i * 9, 86 + (i % 2) * 3, `${k}-${i}`))}
    </g>
  );
  return (
    <svg viewBox="0 0 460 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="2" y="2" width="456" height="136" rx="14" fill="#f7fee7" stroke="#bef264" />
      <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#365314">Tóni: 150 dkg = 15 gomba, 5 kosár</text>
      <text x="350" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#365314">Tódi: 15 gomba, 3 kosár</text>
      {[0, 1, 2, 3, 4].map((i) => basket(32 + i * 44, 3, `t${i}`))}
      {[0, 1, 2].map((i) => basket(290 + i * 60, 5, `d${i}`))}
      <text x="120" y="48" textAnchor="middle" fontSize="11" fill="#3f6212">15 : 5 = 3 gomba kosaranként</text>
      <text x="350" y="48" textAnchor="middle" fontSize="11" fill="#3f6212">15 : 3 = 5 gomba kosaranként</text>
      <line x1="236" y1="30" x2="236" y2="128" stroke="#a3e635" strokeDasharray="4 3" />
    </svg>
  );
};
