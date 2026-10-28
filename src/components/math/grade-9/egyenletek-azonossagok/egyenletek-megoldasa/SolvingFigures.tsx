import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Az Egyenletmegoldás 6 Lépéses Algoritmusa
export const SolvingAlgorithmSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#115e59" fontFamily="system-ui, sans-serif">
        Elsőfokú Egyenlet Megoldásának 6 Lépése
      </text>

      {/* 6 lépés 2 sorban */}
      {[
        { num: '1', title: 'Kikötések', sub: 'É.T. vizsgálata', x: 25, y: 46 },
        { num: '2', title: 'Zárójelek', sub: 'Bontás, előjelek', x: 145, y: 46 },
        { num: '3', title: 'Törtek', sub: 'LKKT-vel szorzás', x: 265, y: 46 },
        { num: '4', title: 'Összevonás', sub: 'Egynemű tagok', x: 25, y: 116 },
        { num: '5', title: 'Mérlegelv', sub: 'x balra, szám jobbra', x: 145, y: 116 },
        { num: '6', title: 'Osztás & Ell.', sub: 'x együtthatójával', x: 265, y: 116 }
      ].map((item, idx) => (
        <g key={idx} transform={`translate(${item.x}, ${item.y})`}>
          <rect width="95" height="58" rx="8" fill="#ffffff" stroke="#2dd4bf" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="11" fill="#0d9488" />
          <text x="20" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
            {item.num}
          </text>
          <text x="56" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#134e4a" fontFamily="sans-serif">
            {item.title}
          </text>
          <text x="47" y="44" textAnchor="middle" fontSize="8" fill="#64748b" fontFamily="sans-serif">
            {item.sub}
          </text>
        </g>
      ))}

      {/* Összekötő nyíl a két sor között */}
      <path d="M 312 104 L 312 112" stroke="#0d9488" strokeWidth="2" />
    </svg>
  );
};

// 2. Zárójelbontás és Előjelszabályok
export const BracketExpansionSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#f0fdfa" stroke="#ccfbf1" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#115e59" fontFamily="system-ui, sans-serif">
        Zárójelbontás: Vigyázz a Negatív Előjellel!
      </text>

      {/* Pozitív szorzó */}
      <g transform="translate(30, 48)">
        <rect width="150" height="125" rx="10" fill="#ffffff" stroke="#5eead4" strokeWidth="1.5" />
        <rect width="150" height="24" rx="10" fill="#ccfbf1" />
        <text x="75" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#134e4a" fontFamily="sans-serif">
          1. Pozitív Szorzó (+3)
        </text>

        <text x="75" y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f766e" fontFamily="monospace">
          3 · (2x - 5)
        </text>
        <path d="M 35 54 Q 75 70 115 54" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="2,2" />

        <text x="75" y="82" textAnchor="middle" fontSize="11" fill="#475569" fontFamily="sans-serif">
          Minden tagot szorzunk:
        </text>
        <rect x="25" y="94" width="100" height="22" rx="4" fill="#0d9488" />
        <text x="75" y="109" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          6x - 15
        </text>
      </g>

      {/* Negatív szorzó / Mínuszjel */}
      <g transform="translate(200, 48)">
        <rect width="150" height="125" rx="10" fill="#ffffff" stroke="#fca5a5" strokeWidth="1.5" />
        <rect width="150" height="24" rx="10" fill="#fee2e2" />
        <text x="75" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b" fontFamily="sans-serif">
          2. Zárójel előtti mínusz
        </text>

        <text x="75" y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c" fontFamily="monospace">
          -(4x - 7)
        </text>
        <text x="75" y="70" textAnchor="middle" fontSize="9" fill="#dc2626" fontStyle="italic">
          Megfordul minden előjel!
        </text>

        <rect x="25" y="94" width="100" height="22" rx="4" fill="#ef4444" />
        <text x="75" y="109" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          -4x + 7
        </text>
      </g>
    </svg>
  );
};

// 3. Törtes Egyenlet és Közös Nevező
export const CommonDenominatorSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#ecfeff" stroke="#a5f3fc" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#155e75" fontFamily="system-ui, sans-serif">
        Törtes Egyenlet: Szorzás a Közös Nevezővel
      </text>

      {/* Egyenlet felül */}
      <g transform="translate(40, 48)">
        <rect width="300" height="42" rx="8" fill="#ffffff" stroke="#67e8f9" strokeWidth="1.5" />
        <text x="50" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0891b2" fontFamily="monospace">
          (x + 1) / 3
        </text>
        <text x="105" y="26" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">-</text>
        <text x="160" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0891b2" fontFamily="monospace">
          (x - 2) / 2
        </text>
        <text x="215" y="26" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">=</text>
        <text x="245" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0891b2" fontFamily="monospace">
          1
        </text>
        <text x="280" y="26" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#e11d48" fontFamily="monospace">
          / ·6
        </text>
      </g>

      {/* Szorzás utáni alak magyarázattal */}
      <g transform="translate(40, 104)">
        <rect width="300" height="74" rx="8" fill="#ffffff" stroke="#06b6d4" strokeWidth="2" />
        <text x="150" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0e7490" fontFamily="sans-serif">
          A törtvonal zárójelet helyettesít! Beszorzás után:
        </text>
        <text x="150" y="44" textAnchor="middle" fontSize="13" fontWeight="black" fill="#0891b2" fontFamily="monospace">
          2 · (x + 1) - 3 · (x - 2) = 6
        </text>
        <text x="150" y="62" textAnchor="middle" fontSize="10" fill="#047857" fontWeight="bold" fontFamily="monospace">
          2x + 2 - 3x + 6 = 6 → -x + 8 = 6 → x = 2
        </text>
      </g>
    </svg>
  );
};

// 4. Ekvivalens Átalakítási Lánc (Mérlegelv)
export const EquivalenceChainSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="2" />

      <text x="190" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#115e59" fontFamily="system-ui, sans-serif">
        Ekvivalens Átalakítások Láncolata (Mégoldáshalmaz Megőrzése)
      </text>

      {/* 4 soros levezetés mérlegelvi nyilakkal */}
      {[
        { eq: '5x - 7 = 2x + 8', op: '/ - 2x', y: 42 },
        { eq: '3x - 7 = 8', op: '/ + 7', y: 78 },
        { eq: '3x = 15', op: '/ : 3', y: 114 },
        { eq: 'x = 5', op: 'M = {5}', y: 150 }
      ].map((row, idx) => (
        <g key={idx} transform={`translate(35, ${row.y})`}>
          <rect width="200" height="28" rx="6" fill="#ffffff" stroke="#2dd4bf" strokeWidth="1.5" />
          <text x="100" y="19" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f766e" fontFamily="monospace">
            {row.eq}
          </text>

          {/* Műveleti jel jobb oldalon */}
          <rect x="215" y="0" width="85" height="28" rx="6" fill={idx === 3 ? '#10b981' : '#ccfbf1'} />
          <text x="257" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill={idx === 3 ? '#ffffff' : '#0f766e'} fontFamily="monospace">
            {row.op}
          </text>
        </g>
      ))}
    </svg>
  );
};

