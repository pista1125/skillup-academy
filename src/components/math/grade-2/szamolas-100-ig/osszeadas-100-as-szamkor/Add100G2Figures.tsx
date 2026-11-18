import React from 'react';
import { N100_FONT, N100_COLORS, RodsPart, NumberLinePart } from '../szamok-100-ig/Numbers100G2Parts';
import { RodsAddPart } from './Add100G2Parts';

// ---------------------------------------------------------------------------
// 2. Összeadás 100-as számkör – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEFAULT_CLASS = 'w-full max-w-[480px] h-auto mx-auto';

/** 60 + 7 = 67: kerek tízes és egyesek. */
export const RoundTensPlusOnesSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 175" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="173" rx="14" fill="#ecfdf5" stroke="#a7f3d0" />
    <RodsAddPart x={100} y={16} a={60} b={7} u={11} />
    <text x="170" y="148" textAnchor="middle" fontSize="17" fontWeight="900" fill={N100_COLORS.ink}>
      60 + 7 = 67
    </text>
    <text x="170" y="166" textAnchor="middle" fontSize="12" fill={N100_COLORS.muted}>
      6 tízes és 7 egyes – az egyesek a 0 helyére kerülnek
    </text>
  </svg>
);

/** 63 + 5 = 68: csak az egyesek változnak (3 + 5 = 8). */
export const NoCrossSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 185" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="183" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0c4a6e">
      Kistesó: 3 + 5 = 8
    </text>
    <RodsAddPart x={95} y={32} a={63} b={5} u={11} />
    <text x="170" y="160" textAnchor="middle" fontSize="17" fontWeight="900" fill={N100_COLORS.ink}>
      63 + 5 = 68
    </text>
    <text x="170" y="178" textAnchor="middle" fontSize="12" fill={N100_COLORS.muted}>
      A 6 tízes marad, csak az egyeseket adjuk össze.
    </text>
  </svg>
);

/** 67 + 5 = 67 + 3 + 2 = 72: pótlás a kerek tízesig. */
export const BridgeLineSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="148" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
      Először ugorj a kerek tízesig!
    </text>
    <NumberLinePart
      x={20}
      y={96}
      width={290}
      from={60}
      to={80}
      extraLabels={[67, 72]}
      fontSize={12}
      hops={[
        { from: 67, to: 70, color: '#16a34a', label: '+3', h: 18 },
        { from: 70, to: 72, color: '#2563eb', label: '+2', h: 14 }
      ]}
      marks={[{ value: 67, color: '#7c3aed' }, { value: 70, color: '#16a34a' }, { value: 72, color: '#dc2626' }]}
    />
    <text x="170" y="138" textAnchor="middle" fontSize="16" fontWeight="900" fill={N100_COLORS.ink}>
      67 + 5 = 67 + 3 + 2 = 72
    </text>
  </svg>
);

/** 45 + 23 = 45 + 20 + 3 = 68: előbb a tízesek. */
export const TensThenOnesSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="148" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">
      23 = 2 tízes + 3 egyes
    </text>
    <NumberLinePart
      x={20}
      y={96}
      width={290}
      from={40}
      to={70}
      extraLabels={[45, 55, 65, 68]}
      fontSize={11}
      hops={[
        { from: 45, to: 55, color: '#16a34a', label: '+10', h: 18 },
        { from: 55, to: 65, color: '#16a34a', label: '+10', h: 18 },
        { from: 65, to: 68, color: '#2563eb', label: '+3', h: 10 }
      ]}
      marks={[{ value: 45, color: '#7c3aed' }, { value: 68, color: '#dc2626' }]}
    />
    <text x="170" y="138" textAnchor="middle" fontSize="16" fontWeight="900" fill={N100_COLORS.ink}>
      45 + 23 = 45 + 20 + 3 = 68
    </text>
  </svg>
);

/** 47 + 28: 47 + 20 = 67, 67 + 3 + 5 = 75. */
export const TwoDigitCrossSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 155" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="153" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#581c87">
      47 + 28 = ?
    </text>
    <NumberLinePart
      x={20}
      y={98}
      width={290}
      from={40}
      to={80}
      extraLabels={[47, 67, 75]}
      fontSize={11}
      hops={[
        { from: 47, to: 67, color: '#16a34a', label: '+20', h: 24 },
        { from: 67, to: 70, color: '#ea580c', label: '+3', h: 12 },
        { from: 70, to: 75, color: '#2563eb', label: '+5', h: 12 }
      ]}
      marks={[{ value: 47, color: '#7c3aed' }, { value: 70, color: '#ea580c' }, { value: 75, color: '#dc2626' }]}
    />
    <text x="170" y="140" textAnchor="middle" fontSize="15" fontWeight="900" fill={N100_COLORS.ink}>
      47 + 20 = 67, 67 + 8 = 67 + 3 + 5 = 75
    </text>
  </svg>
);

/** 38 + 25 rudakkal: 13 kockából 1 rúd + 3 kocka. */
export const RodsExchangeSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 250" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="248" rx="14" fill="#fefce8" stroke="#fde68a" />
    <text x="170" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill={N100_COLORS.ink}>
      38 + 25: 5 rúd és 13 kocka
    </text>
    <RodsAddPart x={114} y={28} a={38} b={25} u={8} />
    <text x="170" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
      10 kocka = 1 rúd, cseréljük be!
    </text>
    <RodsPart x={128} y={138} tens={6} ones={3} u={8} />
    <text x="170" y="240" textAnchor="middle" fontSize="16" fontWeight="900" fill={N100_COLORS.ink}>
      6 rúd és 3 kocka: 38 + 25 = 63
    </text>
  </svg>
);
