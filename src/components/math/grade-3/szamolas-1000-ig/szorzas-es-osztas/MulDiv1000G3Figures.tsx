import React from 'react';
import { FONT, Coin, Rod, Plate, HopLine, FlatGroups } from './MulDiv1000G3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** 8 db 10 forintos = 80 Ft, 8 db 100 forintos = 800 Ft. */
export const MulDiv1000TenHundredSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    {Array.from({ length: 8 }).map((_, i) => (
      <Coin key={`a${i}`} cx={26 + i * 28} cy={34} v={10} r={12} />
    ))}
    <text x="305" y="40" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">8 · 10 = 80</text>
    {Array.from({ length: 8 }).map((_, i) => (
      <Coin key={`b${i}`} cx={26 + i * 28} cy={84} v={100} r={13} />
    ))}
    <text x="305" y="90" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#b91c1c">8 · 100 = 800</text>
    <text x="180" y="132" textAnchor="middle" fontSize="13.5" fill="#475569">10-zel szorzol: 1 nulla kerül a végére. 100-zal: 2 nulla.</text>
  </svg>
);

/** Szorzótábla-lépcső: 3 · 3 = 9 → 3 · 30 = 90 → 3 · 300 = 900. */
export const MulDiv1000StairSvg: Fig = ({ className = DEF }) => {
  const step = (x: number, y: number, fill: string, stroke: string, top: string, sub: string) => (
    <g>
      <rect x={x} y={y} width="104" height="40" rx="9" fill={fill} stroke={stroke} strokeWidth="1.8" />
      <text x={x + 52} y={y + 26} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{top}</text>
      <text x={x + 52} y={y + 56} textAnchor="middle" fontSize="12" fill="#475569">{sub}</text>
    </g>
  );
  const arrow = (x1: number, y1: number, x2: number, y2: number) => (
    <g>
      <path d={`M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - 18} ${x2} ${y2}`} fill="none" stroke="#64748b" strokeWidth="2" />
      <path d={`M ${x2 - 7} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 2}`} fill="none" stroke="#64748b" strokeWidth="2" />
    </g>
  );
  return (
    <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="168" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {step(10, 104, '#fef9c3', '#ca8a04', '3 · 3 = 9', 'szorzótábla')}
      {step(128, 62, '#dbeafe', '#2563eb', '3 · 30 = 90', '3 · 3 tízes')}
      {step(246, 20, '#fee2e2', '#dc2626', '3 · 300 = 900', '3 · 3 százas')}
      {arrow(70, 100, 140, 66)}
      {arrow(188, 58, 258, 24)}
    </svg>
  );
};

/** 4 · 200 = 800: 4 csoport, mindegyikben 2 százas lap. */
export const MulDiv1000FlatsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#fef2f2" stroke="#fecaca" />
    <FlatGroups groups={4} per={2} x0={10} width={340} y={20} s={30} />
    <text x="180" y="88" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7f1d1d">4 · 200 = 4 · 2 százas = 8 százas = 800</text>
    <text x="180" y="112" textAnchor="middle" fontSize="13" fill="#475569">Egy piros lap = 100. Számold a lapokat: 8 lap.</text>
  </svg>
);

/** Részekre osztás: 560 : 7 = 80 – 56 tízesrúd 7 tányéron. */
export const MulDiv1000SharingSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <text x="180" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">560 = 56 tízes, 7 egyforma részre</text>
    {Array.from({ length: 7 }).map((_, p) => {
      const cx = 30 + p * 50;
      return (
        <g key={p}>
          <Plate cx={cx} cy={86} rx={23} ry={11} />
          {Array.from({ length: 8 }).map((__, k) => (
            <Rod key={k} x={cx - 19 + k * 4.9} y={40} w={3.6} h={42} />
          ))}
        </g>
      );
    })}
    <text x="180" y="124" textAnchor="middle" fontSize="14" fill="#475569">Egy tányérra 8 tízes jut: 560 : 7 = 80</text>
  </svg>
);

/** Bennfoglalás: 1000 : 200 = 5 – ugrások 200-asával. */
export const MulDiv1000HopsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
    <svg x="0" y="4" width="360" height="100" viewBox="0 0 360 100">
      <HopLine total={1000} size={200} W={360} H={100} bg={false} fs={13} className="" />
    </svg>
    <text x="180" y="120" textAnchor="middle" fontSize="14" fill="#475569">200-asával 5 ugrás az 1000-ig: 1000 : 200 = 5</text>
  </svg>
);

/** Pénzváltás: 600 Ft = 6 db 100 Ft-os = 3 db 200 Ft-os. */
export const MulDiv1000ExchangeSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <text x="180" y="24" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">600 Ft-ot váltunk be</text>
    {Array.from({ length: 6 }).map((_, i) => (
      <Coin key={`h${i}`} cx={34 + i * 38} cy={56} v={100} r={16} />
    ))}
    <text x="300" y="62" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">600 : 100 = 6</text>
    {Array.from({ length: 3 }).map((_, i) => (
      <Coin key={`k${i}`} cx={34 + i * 44} cy={104} v={200} r={18} />
    ))}
    <text x="300" y="110" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">600 : 200 = 3</text>
    <text x="180" y="140" textAnchor="middle" fontSize="12.5" fill="#475569">A 200 Ft-os kétszer annyit ér, ezért kevesebb kell belőle: 3.</text>
  </svg>
);
