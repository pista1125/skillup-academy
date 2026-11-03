import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szemléltető ábra: Oszlopdiagram (kategóriák, skála, értékek)
 */
export const BarChartSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="barGrad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="barGrad4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      {/* Rácsvonalak és háttér */}
      <rect x="40" y="20" width="260" height="150" fill="#f8fafc" rx="4" />
      <line x1="40" y1="50" x2="300" y2="50" stroke="#e2e8f0" strokeDasharray="3 3" />
      <line x1="40" y1="90" x2="300" y2="90" stroke="#e2e8f0" strokeDasharray="3 3" />
      <line x1="40" y1="130" x2="300" y2="130" stroke="#e2e8f0" strokeDasharray="3 3" />

      {/* Y tengely skála értékek */}
      <text x="32" y="54" fill="#64748b" fontSize="10" textAnchor="end">30</text>
      <text x="32" y="94" fill="#64748b" fontSize="10" textAnchor="end">20</text>
      <text x="32" y="134" fill="#64748b" fontSize="10" textAnchor="end">10</text>
      <text x="32" y="174" fill="#64748b" fontSize="10" textAnchor="end">0</text>

      {/* Tengelyek */}
      <line x1="40" y1="20" x2="40" y2="170" stroke="#475569" strokeWidth="2" />
      <line x1="40" y1="170" x2="300" y2="170" stroke="#475569" strokeWidth="2" />

      {/* Oszlopok */}
      {/* 9.A: 25 fő -> y = 70 */}
      <rect x="58" y="70" width="42" height="100" fill="url(#barGrad1)" rx="4" />
      <text x="79" y="62" fill="#1e3a8a" fontSize="11" fontWeight="bold" textAnchor="middle">25</text>
      <text x="79" y="188" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">9.A</text>

      {/* 9.B: 32 fő -> y = 42 */}
      <rect x="120" y="42" width="42" height="128" fill="url(#barGrad2)" rx="4" />
      <text x="141" y="34" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">32</text>
      <text x="141" y="188" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">9.B</text>

      {/* 9.C: 18 fő -> y = 98 */}
      <rect x="182" y="98" width="42" height="72" fill="url(#barGrad3)" rx="4" />
      <text x="203" y="90" fill="#92400e" fontSize="11" fontWeight="bold" textAnchor="middle">18</text>
      <text x="203" y="188" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">9.C</text>

      {/* 9.D: 28 fő -> y = 58 */}
      <rect x="244" y="58" width="42" height="112" fill="url(#barGrad4)" rx="4" />
      <text x="265" y="50" fill="#5b21b6" fontSize="11" fontWeight="bold" textAnchor="middle">28</text>
      <text x="265" y="188" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">9.D</text>

      {/* Felirat */}
      <text x="170" y="210" fill="#64748b" fontSize="10" textAnchor="middle">Gyakoriságok osztályonként (fő)</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Kördiagram középponti szögekkel
 */
export const PieChartSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 300 240"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(120, 120)">
        {/* 50% = 180 fok (jobb félkör) -> Kék */}
        <path d="M 0 0 L 0 -85 A 85 85 0 0 1 0 85 Z" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
        
        {/* 25% = 90 fok (bal alsó negyed) -> Zöld */}
        <path d="M 0 0 L 0 85 A 85 85 0 0 1 -85 0 Z" fill="#10b981" stroke="#ffffff" strokeWidth="2" />

        {/* 25% = 90 fok (bal felső negyed) -> Borostyán */}
        <path d="M 0 0 L -85 0 A 85 85 0 0 1 0 -85 Z" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />

        {/* Címkék a cikkeken belül */}
        <text x="42" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">50% (180°)</text>
        <text x="-42" y="42" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">25% (90°)</text>
        <text x="-42" y="-35" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">25% (90°)</text>
      </g>

      {/* Jelmagyarázat */}
      <rect x="220" y="50" width="12" height="12" fill="#3b82f6" rx="2" />
      <text x="238" y="61" fill="#334155" fontSize="11" fontWeight="bold">Angol</text>

      <rect x="220" y="80" width="12" height="12" fill="#10b981" rx="2" />
      <text x="238" y="91" fill="#334155" fontSize="11" fontWeight="bold">Német</text>

      <rect x="220" y="110" width="12" height="12" fill="#f59e0b" rx="2" />
      <text x="238" y="121" fill="#334155" fontSize="11" fontWeight="bold">Francia</text>

      <text x="120" y="225" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">
        360° = 100% ➔ α = (p / 100) · 360°
      </text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Vonaldiagram (időbeli trend)
 */
export const LineChartSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="40" y="20" width="260" height="150" fill="#f8fafc" rx="4" />
      
      {/* Vízszintes segédvonalak */}
      <line x1="40" y1="50" x2="300" y2="50" stroke="#e2e8f0" strokeDasharray="3 3" />
      <line x1="40" y1="90" x2="300" y2="90" stroke="#e2e8f0" strokeDasharray="3 3" />
      <line x1="40" y1="130" x2="300" y2="130" stroke="#e2e8f0" strokeDasharray="3 3" />

      {/* Tengelyek */}
      <line x1="40" y1="20" x2="40" y2="170" stroke="#475569" strokeWidth="2" />
      <line x1="40" y1="170" x2="300" y2="170" stroke="#475569" strokeWidth="2" />

      {/* Y skála */}
      <text x="32" y="54" fill="#64748b" fontSize="10" textAnchor="end">25°C</text>
      <text x="32" y="94" fill="#64748b" fontSize="10" textAnchor="end">20°C</text>
      <text x="32" y="134" fill="#64748b" fontSize="10" textAnchor="end">15°C</text>
      <text x="32" y="174" fill="#64748b" fontSize="10" textAnchor="end">10°C</text>

      {/* Adatvonal (Hétfőtől Péntekig: 14°C, 18°C, 24°C, 21°C, 26°C) */}
      <polyline
        fill="none"
        stroke="#0284c7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="70,138 120,106 170,58 220,82 270,42"
      />

      {/* Adatpontok */}
      <circle cx="70" cy="138" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
      <circle cx="120" cy="106" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
      <circle cx="170" cy="58" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
      <circle cx="220" cy="82" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
      <circle cx="270" cy="42" r="5" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />

      {/* X tengely napok */}
      <text x="70" y="188" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">H</text>
      <text x="120" y="188" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">K</text>
      <text x="170" y="188" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">Sze</text>
      <text x="220" y="188" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">Cs</text>
      <text x="270" y="188" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">P</text>

      <text x="170" y="210" fill="#64748b" fontSize="10" textAnchor="middle">Hőmérséklet változása a héten</text>
    </svg>
  );
};

