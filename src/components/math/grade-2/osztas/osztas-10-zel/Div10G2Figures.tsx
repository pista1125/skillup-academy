import React from 'react';
import { DIV10_FONT, DIV10_UNK, EggBoxG, EggG, PlateG, RodsCubesG, BoatG, CoinG } from './Div10G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** 60 tojás → 6 tartó (bennfoglalás). */
export const EggPackingSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 400 170" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="1" y="1" width="398" height="168" rx="14" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
    {Array.from({ length: 60 }, (_, i) => (
      <EggG key={i} cx={22 + (i % 10) * 12.5} cy={22 + Math.floor(i / 10) * 16} />
    ))}
    <text x="78" y="134" textAnchor="middle" fontSize="15" fontWeight="900" fill="#78350f">60 tojás</text>
    <line x1="158" y1="62" x2="198" y2="62" stroke="#d97706" strokeWidth="4" />
    <path d="M 198 52 L 212 62 L 198 72 Z" fill="#d97706" />
    {Array.from({ length: 6 }, (_, i) => (
      <EggBoxG key={i} x={226 + (i % 2) * 82} y={14 + Math.floor(i / 2) * 38} s={1.2} />
    ))}
    <text x="200" y="158" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
      Tízesével: 6 tartó lett. 60 : 10 = 6
    </text>
  </svg>
);

/** 30 dió szétosztva 10 tányérra: mindegyikre 3 jut. */
export const SharingTenSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 400 160" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="1" y="1" width="398" height="158" rx="14" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="2" />
    {Array.from({ length: 10 }, (_, i) => {
      const cx = 44 + (i % 5) * 78;
      const cy = 40 + Math.floor(i / 5) * 62;
      return (
        <g key={i}>
          <PlateG cx={cx} cy={cy} r={24} />
          {[0, 1, 2].map((j) => (
            <circle key={j} cx={cx - 9 + j * 9} cy={cy + (j === 1 ? -5 : 4)} r="5.5" fill="#a16207" stroke="#713f12" strokeWidth="1.2" />
          ))}
        </g>
      );
    })}
    <text x="200" y="150" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
      30 dió, 10 tányér: 30 : 10 = 3
    </text>
  </svg>
);

/** Tízszerese és tizede: oda-vissza nyilak. */
export const TenthArrowsSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 150" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="1" y="1" width="378" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <circle cx="80" cy="75" r="36" fill="#ccfbf1" stroke="#0d9488" strokeWidth="3" />
    <text x="80" y="87" textAnchor="middle" fontSize="34" fontWeight="900" fill="#134e4a">6</text>
    <circle cx="300" cy="75" r="36" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
    <text x="300" y="87" textAnchor="middle" fontSize="34" fontWeight="900" fill="#78350f">60</text>
    <path d="M 120 60 Q 190 20 260 60" fill="none" stroke="#059669" strokeWidth="4" />
    <path d="M 252 50 L 264 62 L 248 64 Z" fill="#059669" />
    <text x="190" y="30" textAnchor="middle" fontSize="15" fontWeight="900" fill="#047857">· 10 (tízszerese)</text>
    <path d="M 260 92 Q 190 132 120 92" fill="none" stroke="#e11d48" strokeWidth="4" />
    <path d="M 128 102 L 116 90 L 132 88 Z" fill="#e11d48" />
    <text x="190" y="138" textAnchor="middle" fontSize="15" fontWeight="900" fill="#be123c">: 10 (tizede)</text>
  </svg>
);

/** 47 kocka: 4 tízes csoport és 7 maradt. */
export const RemainderRodsSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 400 180" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="1" y="1" width="398" height="178" rx="14" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="2" />
    <RodsCubesG x={30} y={14} tens={4} ones={7} c={11} gap={24} />
    <rect x="22" y="8" width="92" height="124" rx="10" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeDasharray="6 4" />
    <rect x="120" y="54" width="38" height="78" rx="10" fill="none" stroke={DIV10_UNK} strokeWidth="2.5" strokeDasharray="6 4" />
    <text x="68" y="152" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0f766e">4 csoport</text>
    <text x="139" y="152" textAnchor="middle" fontSize="13" fontWeight="900" fill={DIV10_UNK}>maradt 7</text>
    <rect x="196" y="22" width="186" height="34" rx="9" fill="#fff" stroke="#0d9488" strokeWidth="2" />
    <text x="289" y="45" textAnchor="middle" fontSize="15" fontWeight="900" fill="#134e4a">Ennyi csoport: 4</text>
    <rect x="196" y="64" width="186" height="34" rx="9" fill="#fff" stroke={DIV10_UNK} strokeWidth="2" />
    <text x="289" y="87" textAnchor="middle" fontSize="15" fontWeight="900" fill="#991b1b">Ennyi maradt: 7</text>
    <text x="289" y="128" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">4 · 10 + 7 = 47</text>
    <text x="200" y="172" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      A tízesek száma a csoport, az egyesek száma a maradék.
    </text>
  </svg>
);

/** 34 gyerek, egy csónakba 10 fér: 4 csónak kell. */
export const BoatsRoundUpSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 400 150" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="1" y="1" width="398" height="148" rx="14" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
    <path d="M 10 92 Q 60 84 110 92 T 210 92 T 310 92 T 390 92" fill="none" stroke="#7dd3fc" strokeWidth="3" />
    {[10, 10, 10, 4].map((kids, b) => (
      <g key={b}>
        {Array.from({ length: kids }, (_, i) => (
          <circle
            key={i}
            cx={30 + b * 92 + (i % 5) * 12}
            cy={58 + Math.floor(i / 5) * 12}
            r="5"
            fill={b === 3 ? '#fb923c' : '#facc15'}
            stroke="#92400e"
            strokeWidth="1"
          />
        ))}
        <BoatG x={18 + b * 92} y={70} s={1.05} label={`${kids}`} />
      </g>
    ))}
    <text x="200" y="28" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0c4a6e">
      34 gyerek, egy csónakba 10 fér.
    </text>
    <text x="200" y="128" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
      3 csónak tele, 4 gyerek maradt → 4 csónak kell!
    </text>
  </svg>
);

/** 80 Ft → 8 darab 10 Ft-os. */
export const CoinsSplitSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 400 120" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV10_FONT}>
    <rect x="1" y="1" width="398" height="118" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <text x="48" y="56" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0f172a">80 Ft</text>
    <text x="96" y="56" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0f172a">=</text>
    {Array.from({ length: 8 }, (_, i) => (
      <CoinG key={i} cx={130 + i * 34} cy={48} r={15} value={10} />
    ))}
    <text x="200" y="100" textAnchor="middle" fontSize="15" fontWeight="900" fill="#334155">
      80 : 10 = 8, tehát 8 darab 10 Ft-os
    </text>
  </svg>
);
