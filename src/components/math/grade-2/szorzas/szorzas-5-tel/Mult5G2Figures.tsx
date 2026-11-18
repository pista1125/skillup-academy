import React from 'react';
import { MULT5_FONT, HandG, CoinG, TokenG, PretzelG, BalloonG, LollipopG, JumpLineG } from './Mult5G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** 3 kéz = 5 + 5 + 5 = 3 · 5 = 15 */
export const HandsGroupsSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 360 160" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT5_FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={34 + i * 104} y="14" width="84" height="76" rx="12" fill="#fff" stroke="#fdba74" strokeWidth="2" />
        <HandG x={50 + i * 104} y={20} s={2} />
        <text x={76 + i * 104} y="110" textAnchor="middle" fontSize="18" fontWeight="900" fill="#c2410c">
          {(i + 1) * 5}
        </text>
      </g>
    ))}
    <text x="180" y="146" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">
      5 + 5 + 5 = 3 · 5 = 15
    </text>
  </svg>
);

/** Ötösével ugrálunk 0-tól 50-ig; a 0-ra és 5-re végződő számok színe. */
export const FiveJumpsNumberLineSvg: React.FC<FigProps> = ({ className }) => {
  const x0 = 24;
  const u = 7.6;
  const y = 70;
  return (
    <svg viewBox="0 0 440 130" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT5_FONT}>
      <rect x="1" y="1" width="438" height="128" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <JumpLineG x0={x0} y={y} width={50 * u} jumps={10} color="#f97316" labelEvery={0} />
      {Array.from({ length: 11 }, (_, i) => i * 5).map((v) => {
        const even = v % 10 === 0;
        return (
          <g key={v}>
            <circle cx={x0 + v * u} cy={y} r="4.5" fill={even ? '#2563eb' : '#f97316'} />
            <text x={x0 + v * u} y={y + 24} textAnchor="middle" fontSize="13" fontWeight="900" fill={even ? '#1d4ed8' : '#c2410c'}>
              {v}
            </text>
          </g>
        );
      })}
      <text x="24" y="22" fontSize="12" fontWeight="bold" fill="#1d4ed8">● 0-ra végződik</text>
      <text x="150" y="22" fontSize="12" fontWeight="bold" fill="#c2410c">● 5-re végződik</text>
      <text x="220" y="118" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        5, 10, 15, 20, 25, 30, 35, 40, 45, 50
      </text>
    </svg>
  );
};

/** Ötösével és tízesével: ahol mindkettő megáll. */
export const FiveTenLinesSvg: React.FC<FigProps> = ({ className }) => {
  const x0 = 24;
  const u = 7.6;
  const y = 78;
  return (
    <svg viewBox="0 0 440 160" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT5_FONT}>
      <rect x="1" y="1" width="438" height="158" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <JumpLineG x0={x0} y={y} width={50 * u} jumps={10} step={5} color="#f97316" labelEvery={0} />
      <JumpLineG x0={x0} y={y} width={50 * u} jumps={5} step={10} color="#2563eb" labelEvery={0} arcUp={false} />
      {Array.from({ length: 11 }, (_, i) => i * 5).map((v) => (
        <g key={v}>
          {v % 10 === 0 && <circle cx={x0 + v * u} cy={y} r="8" fill="none" stroke="#16a34a" strokeWidth="2.5" />}
          <text x={x0 + v * u} y={y - 30} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
            {v}
          </text>
        </g>
      ))}
      <text x="24" y="20" fontSize="12" fontWeight="bold" fill="#c2410c">fent: ötösével</text>
      <text x="24" y="146" fontSize="12" fontWeight="bold" fill="#1d4ed8">lent: tízesével</text>
      <text x="420" y="146" textAnchor="end" fontSize="12" fontWeight="bold" fill="#15803d">○ mindkettő megáll</text>
    </svg>
  );
};

/** 6 darab 5 Ft-os = 3 darab 10 Ft-os */
export const CoinsFiveTenSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 150" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT5_FONT}>
    <rect x="1" y="1" width="378" height="148" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    {Array.from({ length: 6 }, (_, i) => (
      <CoinG key={i} cx={40 + (i % 3) * 42} cy={38 + Math.floor(i / 3) * 42} r={17} value={5} />
    ))}
    <text x="190" y="66" textAnchor="middle" fontSize="34" fontWeight="900" fill="#0f172a">=</text>
    {Array.from({ length: 3 }, (_, i) => (
      <CoinG key={i} cx={240 + i * 48} cy={58} r={21} value={10} />
    ))}
    <text x="82" y="122" textAnchor="middle" fontSize="15" fontWeight="900" fill="#92400e">6 · 5 = 30</text>
    <text x="288" y="122" textAnchor="middle" fontSize="15" fontWeight="900" fill="#334155">3 · 10 = 30</text>
    <text x="190" y="142" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
      5 Ft-osból kétszer annyi kell, mint 10 Ft-osból.
    </text>
  </svg>
);

/** Vásári árak zsetonban. */
export const FairPricesSvg: React.FC<FigProps> = ({ className }) => (
  <svg viewBox="0 0 380 170" className={className ?? CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT5_FONT}>
    <rect x="1" y="1" width="378" height="168" rx="14" fill="#fdf4ff" stroke="#e9d5ff" strokeWidth="2" />
    {/* ponyva */}
    {Array.from({ length: 8 }, (_, i) => (
      <path key={i} d={`M ${30 + i * 40} 14 L ${70 + i * 40} 14 L ${70 + i * 40} 30 Q ${50 + i * 40} 42 ${30 + i * 40} 30 Z`} fill={i % 2 ? '#fff' : '#f43f5e'} stroke="#be123c" strokeWidth="1.2" />
    ))}
    <rect x="30" y="112" width="320" height="10" rx="3" fill="#a16207" />
    <PretzelG x={58} y={64} s={1.5} />
    <BalloonG x={168} y={50} s={1.7} />
    <LollipopG x={278} y={52} s={1.6} />
    <TokenG cx={110} cy={84} r={15} value={5} />
    <TokenG cx={222} cy={84} r={15} value={10} />
    <TokenG cx={332} cy={84} r={15} value={5} />
    <text x="190" y="146" textAnchor="middle" fontSize="15" fontWeight="900" fill="#4c1d95">
      perec 5, lufi 10, nyalóka 5 zseton
    </text>
    <text x="190" y="162" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6b21a8">
      4 perec: 4 · 5 = 20 zseton
    </text>
  </svg>
);
