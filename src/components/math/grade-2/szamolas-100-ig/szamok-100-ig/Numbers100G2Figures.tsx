import React from 'react';
import {
  N100_FONT,
  N100_COLORS,
  RodsPart,
  NumberLinePart,
  HundredChartPart,
  CoinPart,
  PlaceTablePart
} from './Numbers100G2Parts';

// ---------------------------------------------------------------------------
// 1. Számok 100-ig – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEFAULT_CLASS = 'w-full max-w-[480px] h-auto mx-auto';

/** Tízesével számolunk: 10 rúd = 100. */
export const TensToHundredSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 205" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="203" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill={N100_COLORS.ink}>
      Egy rúdban 10 kocka van
    </text>
    {Array.from({ length: 10 }, (_, i) => (
      <g key={i}>
        <RodsPart x={28 + i * 29} y={34} tens={1} ones={0} u={12} />
        <text x={34 + i * 29} y={172} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">
          {(i + 1) * 10}
        </text>
      </g>
    ))}
    <text x="170" y="195" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1e3a8a">
      10 tízes = 100
    </text>
  </svg>
);

/** 47 = 4 tízes + 7 egyes, helyiérték-táblázattal. */
export const PlaceValueSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="198" rx="14" fill="#fefce8" stroke="#fde68a" />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill={N100_COLORS.ink}>
      Rudak és kockák
    </text>
    <RodsPart x={30} y={36} tens={4} ones={7} u={12} />
    <text x="62" y="172" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">4 rúd</text>
    <text x="118" y="172" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">7 kocka</text>
    <PlaceTablePart x={190} y={60} tens="4" ones="7" w={52} />
    <text x="170" y="192" textAnchor="middle" fontSize="15" fontWeight="900" fill={N100_COLORS.ink}>
      4 tízes + 7 egyes = 40 + 7 = 47
    </text>
  </svg>
);

/** Egyes és tízes szomszédok a számegyenesen (47). */
export const NeighboursSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 175" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="173" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <NumberLinePart
      x={26}
      y={84}
      width={280}
      from={40}
      to={50}
      extraLabels={[46, 47, 48]}
      fontSize={12}
      marks={[
        { value: 40, color: '#ea580c' },
        { value: 50, color: '#ea580c' },
        { value: 46, color: '#16a34a' },
        { value: 48, color: '#16a34a' },
        { value: 47, color: '#dc2626', arrow: true, label: '47' }
      ]}
    />
    <text x="170" y="136" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#15803d">
      Egyes szomszédok: 46 &lt; 47 &lt; 48
    </text>
    <text x="170" y="160" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c2410c">
      Tízes szomszédok: 40 &lt; 47 &lt; 50
    </text>
  </svg>
);

/** A százas tábla, lépések a 45 körül. */
export const HundredChartSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 372" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="370" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="170" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill={N100_COLORS.ink}>
      A százas tábla
    </text>
    <HundredChartPart
      x={20}
      y={32}
      cell={30}
      highlight={{ 45: '#fde047', 44: '#86efac', 46: '#86efac', 35: '#fdba74', 55: '#fdba74' }}
    />
    <rect x="22" y="342" width="14" height="14" fill="#86efac" stroke="#94a3b8" />
    <text x="40" y="354" fontSize="12" fontWeight="bold" fill="#15803d">jobbra +1, balra −1</text>
    <rect x="182" y="342" width="14" height="14" fill="#fdba74" stroke="#94a3b8" />
    <text x="200" y="354" fontSize="12" fontWeight="bold" fill="#c2410c">le +10, fel −10</text>
  </svg>
);

/** 68 < 86: először a tízeseket hasonlítjuk össze. */
export const CompareSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 185" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="183" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <RodsPart x={22} y={22} tens={6} ones={8} u={9} />
    <RodsPart x={192} y={22} tens={8} ones={6} u={9} />
    <text x="72" y="138" textAnchor="middle" fontSize="24" fontWeight="900" fill={N100_COLORS.ink}>68</text>
    <text x="155" y="90" textAnchor="middle" fontSize="40" fontWeight="900" fill="#7c3aed">&lt;</text>
    <text x="255" y="138" textAnchor="middle" fontSize="24" fontWeight="900" fill={N100_COLORS.ink}>86</text>
    <text x="170" y="170" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#5b21b6">
      Előbb a tízeseket nézd: 6 tízes &lt; 8 tízes
    </text>
  </svg>
);

/** 70 Ft kétféleképpen. */
export const CoinsSvg: React.FC<{ className?: string }> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 340 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="1" y="1" width="338" height="148" rx="14" fill="#fffbeb" stroke="#fde68a" />
    {Array.from({ length: 7 }, (_, i) => (
      <CoinPart key={i} cx={32 + i * 36} cy={42} value={10} r={15} />
    ))}
    <text x="300" y="48" textAnchor="middle" fontSize="16" fontWeight="900" fill={N100_COLORS.ink}>70 Ft</text>
    <CoinPart cx={60} cy={102} value={50} r={17} />
    <CoinPart cx={104} cy={102} value={20} r={16} />
    <text x="190" y="108" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#92400e">50 + 20 = 70</text>
    <text x="300" y="108" textAnchor="middle" fontSize="16" fontWeight="900" fill={N100_COLORS.ink}>70 Ft</text>
    <text x="170" y="140" textAnchor="middle" fontSize="12" fill={N100_COLORS.muted}>Ugyanannyi pénz, kevesebb érme!</text>
  </svg>
);
