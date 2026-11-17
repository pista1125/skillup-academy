import React from 'react';
import { FONT, BlockNum, Coin, PriceTag, ItemIcon, ItemKind, Rod, Flat } from './ThreeDigitAddG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const RowLabel: React.FC<{ y: number; text: string; color?: string }> = ({ y, text, color = '#0f172a' }) => (
  <text x="64" y={y} textAnchor="end" fontSize="19" fontWeight="bold" fill={color}>{text}</text>
);

/** 236 + 200 = 436: kerek százast adunk hozzá – csak a százasok száma változik. */
export const AddHundredsSvg: Fig = ({ className }) => (
  <Frame w={360} h={196} className={className}>
    <RowLabel y={42} text="236" />
    <BlockNum x={78} y={18} sz={2} t={3} e={6} s={30} />
    <RowLabel y={88} text="+ 200" />
    <BlockNum x={78} y={64} sz={2} t={0} e={0} s={30} />
    <line x1="14" y1="104" x2="346" y2="104" stroke="#334155" strokeWidth="2" />
    <RowLabel y={140} text="436" color="#1d4ed8" />
    <BlockNum x={78} y={116} sz={4} t={3} e={6} s={30} />
    <rect x="74" y="112" width="140" height="38" rx="6" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="5 3" />
    <text x="180" y="180" textAnchor="middle" fontSize="13" fill="#334155">Csak a százasok nőttek: 2 százas + 2 százas = 4 százas.</text>
  </Frame>
);

/** 170 + 260: 13 tízes lesz, 10 tízest beváltunk 1 százasra → 430. */
export const RoundTensSvg: Fig = ({ className }) => (
  <Frame w={360} h={250} className={className}>
    <RowLabel y={40} text="170" />
    <BlockNum x={78} y={16} sz={1} t={7} e={0} s={30} />
    <RowLabel y={84} text="+ 260" />
    <BlockNum x={78} y={60} sz={2} t={6} e={0} s={30} />
    <line x1="14" y1="100" x2="346" y2="100" stroke="#334155" strokeWidth="2" />
    <text x="64" y="132" textAnchor="end" fontSize="13" fontWeight="bold" fill="#475569">együtt</text>
    <BlockNum x={78} y={110} sz={3} t={13} e={0} s={30} />
    <rect x="178" y="106" width="73" height="38" rx="6" fill="none" stroke="#16a34a" strokeWidth="2.5" />
    <text x="214" y="160" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#15803d">10 tízes = 1 százas</text>
    <path d="M 214 166 L 214 176" stroke="#15803d" strokeWidth="2.5" />
    <path d="M 209 172 L 214 179 L 219 172" fill="none" stroke="#15803d" strokeWidth="2.5" />
    <RowLabel y={208} text="430" color="#1d4ed8" />
    <Flat x={78} y={184} s={30} />
    <Flat x={112} y={184} s={30} />
    <Flat x={146} y={184} s={30} />
    <g>
      <rect x="178" y="182" width="34" height="34" rx="4" fill="#dcfce7" />
      <Flat x={180} y={184} s={30} />
    </g>
    <Rod x={216} y={184} w={4.5} h={30} />
    <Rod x={223} y={184} w={4.5} h={30} />
    <Rod x={230} y={184} w={4.5} h={30} />
    <text x="180" y="238" textAnchor="middle" fontSize="13" fill="#334155">17 tízes + 26 tízes = 43 tízes = 430</text>
  </Frame>
);

/** 132 + 245 helyi értékenként: százas a százashoz, tízes a tízeshez, egyes az egyeshez. */
export const PlaceValueAddSvg: Fig = ({ className }) => {
  const boxes = [
    { name: 'százasok', a: '100', b: '200', s: '300', fill: '#fee2e2', stroke: '#b91c1c' },
    { name: 'tízesek', a: '30', b: '40', s: '70', fill: '#dbeafe', stroke: '#1d4ed8' },
    { name: 'egyesek', a: '2', b: '5', s: '7', fill: '#fef9c3', stroke: '#a16207' }
  ];
  return (
    <Frame w={360} h={200} className={className}>
      <text x="180" y="34" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">132 + 245 = ?</text>
      {boxes.map((b, i) => {
        const x = 14 + i * 114;
        return (
          <g key={b.name}>
            <rect x={x} y="50" width="104" height="96" rx="10" fill={b.fill} stroke={b.stroke} strokeWidth="2" />
            <text x={x + 52} y="72" textAnchor="middle" fontSize="13" fontWeight="bold" fill={b.stroke}>{b.name}</text>
            <text x={x + 52} y="102" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{b.a} + {b.b}</text>
            <text x={x + 52} y="132" textAnchor="middle" fontSize="20" fontWeight="bold" fill={b.stroke}>= {b.s}</text>
          </g>
        );
      })}
      <text x="180" y="182" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1d4ed8">300 + 70 + 7 = 377</text>
    </Frame>
  );
};

const FAIR_ITEMS: { kind: ItemKind; name: string; price: number }[] = [
  { kind: 'mug', name: 'bögre', price: 230 },
  { kind: 'book', name: 'mesekönyv', price: 140 },
  { kind: 'ball', name: 'labda', price: 180 },
  { kind: 'kite', name: 'sárkány', price: 250 },
  { kind: 'jar', name: 'lekvár', price: 125 },
  { kind: 'plant', name: 'virág', price: 320 }
];

/** Iskolai vásár: hat tárgy árcédulával. */
export const FairStallSvg: Fig = ({ className }) => (
  <Frame w={360} h={200} className={className}>
    <path d="M 14 14 L 346 14 L 346 40 L 14 40 Z" fill="#f43f5e" />
    {Array.from({ length: 8 }).map((_, i) => (
      <path key={i} d={`M ${14 + i * 41.5} 40 Q ${34.75 + i * 41.5} 56 ${55.5 + i * 41.5} 40`} fill={i % 2 ? '#f43f5e' : '#fff'} stroke="#be123c" strokeWidth="1" />
    ))}
    <text x="180" y="33" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#fff">ISKOLAI VÁSÁR</text>
    {FAIR_ITEMS.map((it, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const cx = 66 + col * 114;
      const cy = 86 + row * 64;
      return (
        <g key={it.name}>
          <ItemIcon kind={it.kind} cx={cx - 22} cy={cy} />
          <PriceTag x={cx + 2} y={cy - 12} text={`${it.price} Ft`} w={62} fs={12} />
          <text x={cx - 22} y={cy + 30} textAnchor="middle" fontSize="11" fill="#475569">{it.name}</text>
        </g>
      );
    })}
  </Frame>
);

/** Két persely érmékkel: 270 Ft és 170 Ft. */
export const CoinPurseSvg: Fig = ({ className }) => (
  <Frame w={360} h={170} className={className}>
    <rect x="14" y="16" width="160" height="104" rx="14" fill="#fee2e2" stroke="#b91c1c" strokeWidth="2" />
    <text x="94" y="36" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">piros persely</text>
    <Coin cx={50} cy={74} v={200} />
    <Coin cx={96} cy={74} v={50} />
    <Coin cx={138} cy={74} v={20} />
    <rect x="186" y="16" width="160" height="104" rx="14" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" />
    <text x="266" y="36" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">kék persely</text>
    <Coin cx={218} cy={74} v={100} />
    <Coin cx={260} cy={74} v={50} />
    <Coin cx={298} cy={66} v={10} />
    <Coin cx={326} cy={86} v={10} />
    <text x="180" y="150" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">270 Ft + 170 Ft = ?</text>
  </Frame>
);
