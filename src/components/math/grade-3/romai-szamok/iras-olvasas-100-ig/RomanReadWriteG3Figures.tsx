import React from 'react';
import { SIGN_COLOR, TENS_ROMAN, ONES_ROMAN } from './RomanReadWriteG3Utils';

const SERIF = 'Georgia, "Times New Roman", serif';

const Colored: React.FC<{ s: string; x: number; y: number; size?: number; anchor?: 'start' | 'middle' | 'end' }> = ({ s, x, y, size = 24, anchor = 'middle' }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight="bold" fontFamily={SERIF}>
    {s.split('').map((ch, i) => (
      <tspan key={i} fill={SIGN_COLOR[ch] ?? '#334155'}>
        {ch}
      </tspan>
    ))}
  </text>
);

/** Tízesrudak és egyeskockák. */
const Blocks: React.FC<{ x: number; y: number; tens: number; ones: number }> = ({ x, y, tens, ones }) => (
  <g>
    {Array.from({ length: tens }, (_, i) => (
      <g key={`t${i}`}>
        <rect x={x + i * 12} y={y} width="9" height="60" rx="1.5" fill="#60a5fa" stroke="#1e40af" strokeWidth="1" />
        {Array.from({ length: 9 }, (_, k) => (
          <line key={k} x1={x + i * 12} y1={y + 6 * (k + 1)} x2={x + i * 12 + 9} y2={y + 6 * (k + 1)} stroke="#1e40af" strokeWidth="0.5" />
        ))}
      </g>
    ))}
    {Array.from({ length: ones }, (_, i) => (
      <rect key={`e${i}`} x={x + tens * 12 + 6 + (i % 2) * 11} y={y + 60 - 9 - Math.floor(i / 2) * 11} width="9" height="9" rx="1.5" fill="#fbbf24" stroke="#92400e" strokeWidth="1" />
    ))}
  </g>
);

/** A tízesrészek és az egyesrészek római alakja – ebből rakjuk össze a számokat. */
export const TensOnesTableSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 252" className={className ?? 'w-full max-w-[560px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="250" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <text x="14" y="22" fontSize="13" fontWeight="bold" fill="#1e40af">Tízesek</text>
    {Array.from({ length: 10 }, (_, i) => {
      const x = 14 + (i % 5) * 76;
      const y = 30 + Math.floor(i / 5) * 50;
      const s = TENS_ROMAN[i + 1];
      return (
        <g key={`t${i}`}>
          <rect x={x} y={y} width="72" height="44" rx="7" fill="#eff6ff" stroke="#93c5fd" />
          <text x={x + 14} y={y + 27} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">{(i + 1) * 10}</text>
          <Colored s={s} x={x + 46} y={y + 29} size={s.length >= 4 ? 12 : s.length === 3 ? 15 : 18} />
        </g>
      );
    })}
    <text x="14" y="146" fontSize="13" fontWeight="bold" fill="#92400e">Egyesek</text>
    {Array.from({ length: 9 }, (_, i) => {
      const x = 14 + (i % 5) * 76;
      const y = 154 + Math.floor(i / 5) * 50;
      const s = ONES_ROMAN[i + 1];
      return (
        <g key={`e${i}`}>
          <rect x={x} y={y} width="72" height="44" rx="7" fill="#fef3c7" stroke="#fcd34d" />
          <text x={x + 14} y={y + 27} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">{i + 1}</text>
          <Colored s={s} x={x + 46} y={y + 29} size={s.length >= 4 ? 12 : s.length === 3 ? 15 : 18} />
        </g>
      );
    })}
  </svg>
);

/** Írás: 94 = 90 + 4 = XC + IV = XCIV. */
export const WriteStepsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 170" className={className ?? 'w-full max-w-[560px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="168" rx="14" fill="#f0f9ff" stroke="#7dd3fc" />
    <Blocks x={16} y={30} tens={9} ones={4} />
    <text x="78" y="118" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">9 tízes és 4 egyes</text>
    <text x="300" y="34" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e3a8a">94</text>
    <text x="300" y="64" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#334155">
      <tspan fill="#1e40af">90</tspan> + <tspan fill="#b45309">4</tspan>
    </text>
    <rect x="234" y="76" width="56" height="34" rx="8" fill="#eff6ff" stroke="#93c5fd" />
    <Colored s="XC" x={262} y={101} size={22} />
    <text x="300" y="100" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#334155">+</text>
    <rect x="310" y="76" width="56" height="34" rx="8" fill="#fef3c7" stroke="#fcd34d" />
    <Colored s="IV" x={338} y={101} size={22} />
    <rect x="240" y="122" width="120" height="38" rx="10" fill="#fff" stroke="#a16207" strokeWidth="2" />
    <Colored s="XCIV" x={300} y={150} size={26} />
    <text x="190" y="152" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">összeírva:</text>
  </svg>
);

/** Olvasás: LXXVIII → LXX | VIII → 70 + 8 = 78. */
export const ReadStepsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 140" className={className ?? 'w-full max-w-[560px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="138" rx="14" fill="#f0fdf4" stroke="#86efac" />
    <rect x="40" y="16" width="148" height="50" rx="10" fill="#eff6ff" stroke="#93c5fd" />
    <Colored s="LXX" x={114} y={52} size={30} />
    <rect x="212" y="16" width="148" height="50" rx="10" fill="#fef3c7" stroke="#fcd34d" />
    <Colored s="VIII" x={286} y={52} size={30} />
    <line x1="200" y1="10" x2="200" y2="72" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 4" />
    <text x="114" y="90" textAnchor="middle" fontSize="13" fill="#1e40af">tízesrész</text>
    <text x="286" y="90" textAnchor="middle" fontSize="13" fill="#92400e">egyesrész</text>
    <text x="200" y="124" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#14532d">
      <tspan fill="#1e40af">70</tspan> + <tspan fill="#b45309">8</tspan> = 78
    </text>
  </svg>
);

/** Csapda: a hosszabb római szám nem mindig a nagyobb. */
export const LengthTrapSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 130" className={className ?? 'w-full max-w-[560px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="128" rx="14" fill="#fff1f2" stroke="#fda4af" />
    <rect x="18" y="20" width="200" height="54" rx="10" fill="#fff" stroke="#fecdd3" strokeWidth="2" />
    <Colored s="XXXVIII" x={118} y={58} size={28} />
    <text x="118" y="96" textAnchor="middle" fontSize="13" fill="#475569">7 jel</text>
    <text x="118" y="116" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#9f1239">38</text>
    <text x="252" y="58" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#334155">&lt;</text>
    <rect x="290" y="20" width="90" height="54" rx="10" fill="#fff" stroke="#fecdd3" strokeWidth="2" />
    <Colored s="L" x={335} y={58} size={28} />
    <text x="335" y="96" textAnchor="middle" fontSize="13" fill="#475569">1 jel</text>
    <text x="335" y="116" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#9f1239">50</text>
  </svg>
);

/** Számegyenes 0-tól 100-ig, a kerek tízesek római alakjával. */
export const RomanNumberLineSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 400 100" className={className ?? 'w-full max-w-[560px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="398" height="98" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <line x1="20" y1="46" x2="384" y2="46" stroke="#334155" strokeWidth="2" />
    {Array.from({ length: 101 }, (_, v) => {
      const x = 20 + v * 3.6;
      const big = v % 10 === 0;
      const mid = v % 5 === 0;
      return <line key={v} x1={x} y1={big ? 38 : mid ? 41 : 43} x2={x} y2={big ? 54 : mid ? 51 : 49} stroke="#334155" strokeWidth={big ? 1.6 : 0.6} />;
    })}
    {Array.from({ length: 11 }, (_, i) => {
      const x = 20 + i * 36;
      return (
        <g key={i}>
          <text x={x} y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">{i * 10}</text>
          {i > 0 && (
            <>
              {i % 2 === 0 && <line x1={x} y1="56" x2={x} y2="76" stroke="#cbd5e1" strokeWidth="1" />}
              <Colored s={TENS_ROMAN[i]} x={x} y={i % 2 === 1 ? 72 : 90} size={15} />
            </>
          )}
        </g>
      );
    })}
    <text x="20" y="72" textAnchor="middle" fontSize="10" fill="#94a3b8">nincs</text>
    <text x="20" y="84" textAnchor="middle" fontSize="10" fill="#94a3b8">jele</text>
  </svg>
);
