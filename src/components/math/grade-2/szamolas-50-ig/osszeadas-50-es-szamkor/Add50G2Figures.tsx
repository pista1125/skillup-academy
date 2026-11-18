import React from 'react';
import { ADD50_FONT, FillBlocksPart, JumpsPart, PyramidPart } from './Add50G2Parts';
import { BlocksPart } from '../szamok-50-ig/Numbers50G2Parts';

// ---------------------------------------------------------------------------
// 2. Összeadás 50-es számkör – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEF = 'w-full max-w-[480px] h-auto mx-auto';

/** Kerek tízes + egyesek: 30 + 6 = 36. */
export const RoundTenPlusOnesSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 340 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD50_FONT}>
    <rect x="1" y="1" width="338" height="148" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <FillBlocksPart x={40} y={16} tens={3} ones={0} added={6} unit={9} gap={7} />
    <text x="62" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6b21a8">30</text>
    <text x="112" y="128" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">+ 6</text>
    <text x="250" y="60" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e293b">30 + 6 = 36</text>
    <text x="250" y="90" textAnchor="middle" fontSize="13" fill="#475569">A 0 helyére kerül a 6.</text>
    <text x="250" y="112" textAnchor="middle" fontSize="13" fill="#475569">6 + 30 = 36 is igaz.</text>
  </svg>
);

/** Analógia: 4 + 3 = 7, 24 + 3 = 27, 34 + 3 = 37. */
export const AnalogyTensSvg: React.FC<{ className?: string }> = ({ className = DEF }) => {
  const rows = [
    { t: 0, txt: '4 + 3 = 7' },
    { t: 2, txt: '24 + 3 = 27' },
    { t: 3, txt: '34 + 3 = 37' }
  ];
  return (
    <svg viewBox="0 0 360 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD50_FONT}>
      <rect x="1" y="1" width="358" height="178" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <text x="180" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">
        A tízesek maradnak, csak az egyeseket adjuk össze!
      </text>
      {rows.map((r, i) => {
        const y = 38 + i * 46;
        return (
          <g key={i}>
            <text x="20" y={y + 26} fontSize="17" fontWeight="900" fill="#0f172a">{r.txt}</text>
            {Array.from({ length: r.t }, (_, k) => (
              <rect key={k} x={170 + k * 14} y={y + 4} width="9" height="32" rx="1.5" fill="#d8b4fe" stroke="#6b21a8" strokeWidth="1.5" />
            ))}
            {Array.from({ length: 4 }, (_, k) => (
              <rect key={`g${k}`} x={220 + k * 13} y={y + 18} width="10" height="10" rx="1.5" fill="#86efac" stroke="#15803d" strokeWidth="1.5" />
            ))}
            {Array.from({ length: 3 }, (_, k) => (
              <rect key={`b${k}`} x={278 + k * 13} y={y + 18} width="10" height="10" rx="1.5" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/** Pótlás kerek tízesig: 26 + 4 = 30. */
export const FillToTenSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 340 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD50_FONT}>
    <rect x="1" y="1" width="338" height="148" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
    <FillBlocksPart x={30} y={16} tens={2} ones={6} added={4} unit={9} gap={7} />
    <rect x="67" y="42" width="30" height="68" rx="6" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 3" />
    <text x="81" y="128" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">10 kocka = 1 rúd</text>
    <text x="235" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e293b">26 + 4 = 30</text>
    <text x="235" y="88" textAnchor="middle" fontSize="13" fill="#475569">6 + 4 = 10, így lesz</text>
    <text x="235" y="108" textAnchor="middle" fontSize="13" fill="#475569">egy új teli tízes.</text>
  </svg>
);

/** Tízesátlépés bontással a számegyenesen: 26 + 7 = 26 + 4 + 3 = 33. */
export const BridgeJumpSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD50_FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="180" y="22" textAnchor="middle" fontSize="15" fontWeight="900" fill="#9a3412">26 + 7 = 26 + 4 + 3 = 33</text>
    <JumpsPart
      x={24}
      y={92}
      width={300}
      from={24}
      to={36}
      labelEvery={2}
      fontSize={11}
      hops={[
        { from: 26, to: 30, label: '+4', color: '#16a34a' },
        { from: 30, to: 33, label: '+3', color: '#2563eb' }
      ]}
    />
    <text x="180" y="140" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      Előbb a kerek tízesig (30), aztán tovább!
    </text>
  </svg>
);

/** Kétjegyű szám hozzáadása: 16 + 19 = 16 + 10 + 9 = 35. */
export const TwoDigitJumpSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 360 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD50_FONT}>
    <rect x="1" y="1" width="358" height="158" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
    <text x="180" y="22" textAnchor="middle" fontSize="15" fontWeight="900" fill="#5b21b6">16 + 19 = 16 + 10 + 9 = 35</text>
    <JumpsPart
      x={24}
      y={100}
      width={300}
      from={15}
      to={40}
      labelEvery={5}
      fontSize={11}
      hops={[
        { from: 16, to: 26, label: '+10', color: '#7c3aed' },
        { from: 26, to: 30, label: '+4', color: '#16a34a' },
        { from: 30, to: 35, label: '+5', color: '#2563eb' }
      ]}
    />
    <text x="180" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      1. a tízest: 16 + 10 = 26 • 2. az egyeseket: 26 + 9 = 26 + 4 + 5 = 35
    </text>
  </svg>
);

/** Rudak összetolása: 23 + 14 = 37, és számpiramis. */
export const BlocksSumPyramidSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 360 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD50_FONT}>
    <rect x="1" y="1" width="358" height="148" rx="14" fill="#fefce8" stroke="#fde68a" />
    <BlocksPart x={16} y={14} tens={2} ones={3} unit={8} gap={5} />
    <text x="80" y="62" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e293b">+</text>
    <BlocksPart x={92} y={14} tens={1} ones={4} unit={8} gap={5} />
    <text x="78" y="122" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1e293b">23 + 14 = 37</text>
    <text x="78" y="140" textAnchor="middle" fontSize="11" fill="#475569">20 + 10 = 30, 3 + 4 = 7</text>
    <PyramidPart cx={262} y={30} left="23" right="14" top="37" bw={62} bh={36} fontSize={20} />
    <text x="262" y="130" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">Lent két szám, fent az összegük.</text>
  </svg>
);
