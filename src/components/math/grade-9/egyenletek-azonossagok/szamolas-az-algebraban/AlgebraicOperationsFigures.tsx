import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Disztributivitás Területmodell Ábra: a(b + c) = ab + ac
export const DistributiveLawSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 190"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="170" rx="16" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="2" />

      {/* Cím */}
      <text x="180" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f766e" fontFamily="system-ui, sans-serif">
        Disztributivitás Területmodell: a · (b + c) = ab + ac
      </text>

      {/* Téglalap bal rész (ab) */}
      <g transform="translate(60, 50)">
        <rect width="110" height="85" rx="8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
        <text x="55" y="48" textAnchor="middle" fontSize="18" fontWeight="black" fill="#0f766e" fontFamily="monospace">
          a · b
        </text>
        {/* Bal oldali magasság: a */}
        <text x="-15" y="48" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f766e" fontFamily="monospace">
          a
        </text>
        {/* Felső szélesség: b */}
        <text x="55" y="-8" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f766e" fontFamily="monospace">
          b
        </text>
      </g>

      {/* Téglalap jobb rész (ac) */}
      <g transform="translate(170, 50)">
        <rect width="130" height="85" rx="8" fill="#99f6e4" stroke="#0d9488" strokeWidth="2" />
        <text x="65" y="48" textAnchor="middle" fontSize="18" fontWeight="black" fill="#115e59" fontFamily="monospace">
          a · c
        </text>
        {/* Felső szélesség: c */}
        <text x="65" y="-8" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#115e59" fontFamily="monospace">
          c
        </text>
      </g>

      {/* Alsó képlet */}
      <text x="180" y="162" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#134e4a" fontFamily="monospace">
        Teljes terület = a · (b + c) = ab + ac
      </text>
    </svg>
  );
};

// 2. Két Binom Szorzatának Területmodellje: (a + b)(c + d)
export const DoubleBracketSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 210"
      width={size}
      height={size * 0.58}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="190" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />

      <text x="180" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155" fontFamily="system-ui, sans-serif">
        (a + b)(c + d) = ac + ad + bc + bd
      </text>

      {/* 2x2 téglalap rács */}
      <g transform="translate(100, 45)">
        {/* Bal felső: ac */}
        <rect x="0" y="0" width="80" height="55" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="40" y="32" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af" fontFamily="monospace">ac</text>

        {/* Jobb felső: ad */}
        <rect x="80" y="0" width="90" height="55" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="125" y="32" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6d28d9" fontFamily="monospace">ad</text>

        {/* Bal alsó: bc */}
        <rect x="0" y="55" width="80" height="50" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="40" y="85" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b45309" fontFamily="monospace">bc</text>

        {/* Jobb alsó: bd */}
        <rect x="80" y="55" width="90" height="50" fill="#dcfce7" stroke="#10b981" strokeWidth="1.5" />
        <text x="125" y="85" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#047857" fontFamily="monospace">bd</text>

        {/* Jelölések felül: c és d */}
        <text x="40" y="-8" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb" fontFamily="monospace">c</text>
        <text x="125" y="-8" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c3aed" fontFamily="monospace">d</text>

        {/* Jelölések balra: a és b */}
        <text x="-12" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e40af" fontFamily="monospace">a</text>
        <text x="-12" y="85" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309" fontFamily="monospace">b</text>
      </g>

      <text x="180" y="180" textAnchor="middle" fontSize="11" fill="#64748b" fontFamily="system-ui, sans-serif">
        „Minden tagot minden taggal megszorzunk és összeadunk”
      </text>
    </svg>
  );
};

// 3. Mínusz Előjel a Zárójel előtt: -(a - b + c) = -a + b - c
export const MinusBracketSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 170"
      width={size}
      height={size * 0.47}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="150" rx="16" fill="#fef2f2" stroke="#fecaca" strokeWidth="2" />

      {/* Figyelem / Veszély felirat */}
      <text x="180" y="32" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b" letterSpacing="0.5" fontFamily="system-ui, sans-serif">
        ⚠️ ELŐJELCSAPDA: MÍNUSZ JEL A ZÁRÓJEL ELŐTT
      </text>

      {/* Kifejezés zárójellel */}
      <g transform="translate(40, 50)">
        <rect width="130" height="45" rx="10" fill="#ffffff" stroke="#f87171" strokeWidth="2" />
        <text x="65" y="28" textAnchor="middle" fontSize="16" fontWeight="black" fill="#b91c1c" fontFamily="monospace">
          - ( 2x - 5 )
        </text>
      </g>

      {/* Nyíl fordító ikonnal */}
      <g transform="translate(180, 72)">
        <path d="M -10 0 L 20 0" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowRed)" />
        <text x="5" y="-10" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c" fontFamily="system-ui, sans-serif">
          minden előjel fordul!
        </text>
      </g>

      {/* Kifejezés felbontva */}
      <g transform="translate(220, 50)">
        <rect width="115" height="45" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="57" y="28" textAnchor="middle" fontSize="16" fontWeight="black" fill="#065f46" fontFamily="monospace">
          - 2x + 5
        </text>
      </g>

      {/* Magyarázat alul */}
      <text x="180" y="135" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7f1d1d" fontFamily="system-ui, sans-serif">
        +2x ellentettje: -2x &nbsp;|&nbsp; -5 ellentettje: +5 !
      </text>
    </svg>
  );
};

// 4. Egynemű Tagok Összevonása Színes Kiemeléssel
export const LikeTermsCombineSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 180"
      width={size}
      height={size * 0.5}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="160" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

      <text x="180" y="32" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b" fontFamily="system-ui, sans-serif">
        Egynemű Tagok Összevonása Színekkel
      </text>

      {/* Eredeti kifejezés */}
      <g transform="translate(180, 68)" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="monospace">
        {/* x² tagok (kék) */}
        <text x="-120" y="0" fill="#2563eb">5x²</text>
        {/* x tagok (lila) */}
        <text x="-70" y="0" fill="#7c3aed">- 3x</text>
        {/* x² tagok (kék) */}
        <text x="-15" y="0" fill="#2563eb">+ 2x²</text>
        {/* x tagok (lila) */}
        <text x="45" y="0" fill="#7c3aed">+ 7x</text>
        {/* konstans (borostyán) */}
        <text x="100" y="0" fill="#d97706">- 4</text>
      </g>

      {/* Összekötő vonalak/jelzések */}
      <path d="M 55 75 C 55 95, 160 95, 160 75" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M 105 75 C 105 105, 230 105, 230 75" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3 3" />

      {/* Leegyszerűsített eredmény */}
      <g transform="translate(60, 115)">
        <rect width="240" height="40" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="120" y="26" textAnchor="middle" fontSize="17" fontWeight="black" fontFamily="monospace">
          <tspan fill="#1d4ed8">7x²</tspan>
          <tspan fill="#6d28d9"> + 4x</tspan>
          <tspan fill="#b45309"> - 4</tspan>
        </text>
      </g>
    </svg>
  );
};

