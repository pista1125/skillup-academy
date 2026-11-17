import React from 'react';
import { FONT, Weight, KitchenScale, MassBarChart, PANTRY, WeightRow } from './MassG3Parts';
import { Ico, BalanceIcon, BathScaleIcon, SpringScaleIcon, SackIcon, AppleIcon } from '../mit-mivel-merunk/WhatToMeasureG3Parts';

// ---------------------------------------------------------------------------
// 2. A tömeg mérése – ábrák (3. osztály)
// ---------------------------------------------------------------------------

/** Mérlegek: melyikkel mit mérünk? */
export const ScaleKindsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const box = (x: number, label: string, sub: string, art: React.ReactNode) => (
    <g>
      <rect x={x} y="8" width="84" height="150" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      {art}
      <text x={x + 42} y="128" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">{label}</text>
      <text x={x + 42} y="146" textAnchor="middle" fontSize="10" fill="#475569">{sub}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 360 166" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {box(
        4,
        'kétkarú mérleg',
        'összehasonlít',
        <Ico x={8} y={24} s={0.76}>
          <BalanceIcon />
        </Ico>
      )}
      {box(
        94,
        'konyhai mérleg',
        'liszt, alma',
        <KitchenScale x={104} y={22} value={30} s={0.46} />
      )}
      {box(
        184,
        'rugós mérleg',
        'zöldség, csomag',
        <Ico x={190} y={22} s={0.72}>
          <SpringScaleIcon />
        </Ico>
      )}
      {box(
        274,
        'személymérleg',
        'ember',
        <Ico x={280} y={26} s={0.72}>
          <BathScaleIcon />
        </Ico>
      )}
    </svg>
  );
};

/** A súlyok: 1 kg, 50, 20, 10, 5 és 1 dkg. */
export const WeightSetSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="118" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <Weight cx={46} by={90} w={70} label="1 kg" kg fs={20} />
    <Weight cx={122} by={90} w={58} label="50" unit="dkg" fs={22} />
    <Weight cx={186} by={90} w={50} label="20" unit="dkg" fs={19} />
    <Weight cx={242} by={90} w={44} label="10" unit="dkg" fs={17} />
    <Weight cx={292} by={90} w={38} label="5" unit="dkg" fs={16} />
    <Weight cx={334} by={90} w={32} label="1" unit="dkg" fs={14} />
    <text x="180" y="110" textAnchor="middle" fontSize="11" fill="#475569">A nagy súly 1 kg, a kisebbek dekagrammosak.</text>
  </svg>
);

/** 1 kg = 100 dkg a kétkarú mérlegen. */
export const KgEqualsDkgSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 320 256" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="254" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <Ico x={50} y={0} s={2.2}>
      <BalanceIcon sw={1.6} tilt={0} />
    </Ico>
    <Weight cx={76} by={125} w={46} label="1 kg" kg fs={13} />
    <WeightRow ws={[50, 20]} x={212} by={100} w={30} fs={12} />
    <WeightRow ws={[20, 10]} x={212} by={125} w={30} fs={12} />
    <text x="160" y="228" textAnchor="middle" fontSize="13" fill="#14532d">50 dkg + 20 dkg + 20 dkg + 10 dkg = 100 dkg</text>
    <text x="160" y="248" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#14532d">1 kg = 100 dkg</text>
  </svg>
);

/** 1 kg 35 dkg = 135 dkg */
export const KgDkgSplitSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="168" rx="14" fill="#fffbeb" stroke="#fde68a" />
    <Ico x={14} y={10} s={0.9}>
      <SackIcon label="1 kg" fs={18} />
    </Ico>
    <text x="114" y="64" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">+</text>
    <Ico x={128} y={28} s={0.7}>
      <SackIcon label="35 dkg" fs={17} color="#fca5a5" />
    </Ico>
    <text x="226" y="64" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">=</text>
    <Ico x={246} y={6} s={1}>
      <SackIcon label="? dkg" fs={17} color="#86efac" />
    </Ico>
    <text x="180" y="134" textAnchor="middle" fontSize="14" fill="#334155">1 kg 35 dkg = 100 dkg + 35 dkg</text>
    <text x="180" y="157" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">1 kg 35 dkg = 135 dkg</text>
  </svg>
);

/** Konyhai mérleg: 70 dkg alma. */
export const KitchenDialSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-xs h-auto mx-auto' }) => (
  <svg viewBox="0 0 220 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="218" height="198" rx="14" fill="#fff1f2" stroke="#fecdd3" />
    <KitchenScale
      x={40}
      y={22}
      value={70}
      load={
        <g>
          {[-30, -6, 18].map((dx) => (
            <Ico key={dx} x={dx - 12} y={-22} s={0.26}>
              <AppleIcon sw={9} />
            </Ico>
          ))}
        </g>
      }
    />
    <text x="110" y="192" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7f1d1d">A mutató a 70-nél áll: 70 dkg.</text>
  </svg>
);

/** Oszlopdiagram a kamráról. */
export const PantryChartSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#ffffff" stroke="#cbd5e1" />
    <MassBarChart data={PANTRY} />
  </svg>
);
