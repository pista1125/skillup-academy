import React from 'react';
import { FONT, Flat, Rod, Plate, HopLine, CoinGrid, NumBox } from './MulDiv500G3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** 14 doboz zsírkréta, mindegyikben 10: 14 · 10 = 140. */
export const MulDiv500BoxesSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    {Array.from({ length: 14 }).map((_, i) => (
      <NumBox key={i} x={40 + (i % 7) * 42} y={14 + Math.floor(i / 7) * 38} w={34} h={30} label="10" fs={13} />
    ))}
    <text x="180" y="104" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">14 doboz, mindegyikben 10 kréta</text>
    <text x="180" y="126" textAnchor="middle" fontSize="14" fill="#475569">14 · 10 = 14 tízes = 140</text>
  </svg>
);

/** 6 · 7 = 42, ezért 6 · 70 = 420. */
export const MulDiv500AnalogySvg: Fig = ({ className = DEF }) => {
  const box = (y: number, color: string, stroke: string, text: string, note: string) => (
    <g>
      <rect x="16" y={y} width="210" height="30" rx="8" fill={color} stroke={stroke} strokeWidth="1.6" />
      <text x="121" y={y + 21} textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">{text}</text>
      <text x="238" y={y + 20} fontSize="12.5" fill="#475569">{note}</text>
    </g>
  );
  const arrow = (y: number) => (
    <g>
      <path d={`M 121 ${y} L 121 ${y + 10}`} stroke="#64748b" strokeWidth="2" />
      <path d={`M 116 ${y + 6} L 121 ${y + 12} L 126 ${y + 6}`} fill="none" stroke="#64748b" strokeWidth="2" />
    </g>
  );
  return (
    <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {box(12, '#fef9c3', '#ca8a04', '6 · 7 = 42', 'szorzótábla')}
      {arrow(44)}
      {box(58, '#dbeafe', '#2563eb', '6 · 7 t = 42 t', 'tízesekkel')}
      {arrow(90)}
      {box(104, '#dcfce7', '#16a34a', '6 · 70 = 420', 'a nagy számok')}
    </svg>
  );
};

/** Százasok: 3 · 100 = 300 és 30 tízesrúd = 300. */
export const MulDiv500HundredsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#fef2f2" stroke="#fecaca" />
    {[0, 1, 2].map((i) => (
      <Flat key={i} x={18 + i * 50} y={18} s={44} />
    ))}
    <text x="88" y="86" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7f1d1d">3 · 100 = 300</text>
    <line x1="176" y1="16" x2="176" y2="96" stroke="#fecaca" strokeWidth="2" />
    {Array.from({ length: 30 }).map((_, i) => (
      <Rod key={i} x={190 + (i % 15) * 10.5} y={14 + Math.floor(i / 15) * 30} w={7} h={26} />
    ))}
    <text x="268" y="86" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e3a8a">30 · 10 = 300</text>
    <text x="180" y="116" textAnchor="middle" fontSize="13" fill="#475569">10 tízes = 1 százas, ezért 30 tízes = 3 százas.</text>
  </svg>
);

/** Részekre osztás: 280 : 4 = 70 – 28 tízesrúd 4 tányéron. */
export const MulDiv500SharingSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <text x="180" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">280 = 28 tízes, 4 egyforma részre</text>
    {[0, 1, 2, 3].map((p) => {
      const cx = 52 + p * 85;
      return (
        <g key={p}>
          <Plate cx={cx} cy={84} rx={38} ry={16} />
          {Array.from({ length: 7 }).map((_, k) => (
            <Rod key={k} x={cx - 27 + k * 8} y={42} w={6} h={40} />
          ))}
        </g>
      );
    })}
    <text x="180" y="126" textAnchor="middle" fontSize="14" fill="#475569">Egy tányérra 7 tízes jut: 280 : 4 = 70</text>
  </svg>
);

/** Bennfoglalás: 280 : 40 = 7 – ugrások 40-esével. */
export const MulDiv500HopsSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
    <svg x="0" y="4" width="360" height="100" viewBox="0 0 360 100">
      <HopLine total={280} size={40} W={360} H={100} bg={false} fs={13} className="" />
    </svg>
    <text x="180" y="120" textAnchor="middle" fontSize="14" fill="#475569">Hányszor van meg a 280-ban a 40? 7 ugrás: 280 : 40 = 7</text>
  </svg>
);

/** Műveletcsalád: 4 sor, soronként 6 db 10 forintos. */
export const MulDiv500CoinGridSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <CoinGrid rows={4} cols={6} v={10} cx={110} y0={26} r={13} gap={5} />
    <text x="270" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">4 · 60 = 240</text>
    <text x="270" y="62" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">6 · 40 = 240</text>
    <text x="270" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c2d12">240 : 4 = 60</text>
    <text x="270" y="112" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#7c2d12">240 : 60 = 4</text>
    <text x="180" y="148" textAnchor="middle" fontSize="12.5" fill="#475569">Egy sor: 6 · 10 = 60 Ft. Egy oszlop: 4 · 10 = 40 Ft.</text>
  </svg>
);
