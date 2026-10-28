import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Miért alakítunk szorzattá? Zérushely és Egyszerűsítés ábra
export const FactoringTreeSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 190"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="170" rx="16" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="2" />

      <text x="180" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6d28d9" fontFamily="system-ui, sans-serif">
        Mi a Szorzattá Alakítás? Összegből Szorzat!
      </text>

      {/* Bal oldal: Összeg alak (polinom) */}
      <g transform="translate(30, 55)">
        <rect width="125" height="50" rx="12" fill="#ffffff" stroke="#c4b5fd" strokeWidth="2" />
        <text x="62" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui, sans-serif">
          ÖSSZEG ALAK
        </text>
        <text x="62" y="40" textAnchor="middle" fontSize="14" fontWeight="black" fill="#4c1d95" fontFamily="monospace">
          x² - 9
        </text>
      </g>

      {/* Átalakítás nyíl */}
      <g transform="translate(180, 80)" textAnchor="middle">
        <path d="M -15 0 L 15 0" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#arrowPurple)" />
        <text x="0" y="-10" fontSize="10" fontWeight="bold" fill="#7c3aed" fontFamily="system-ui, sans-serif">
          szorzattá alakítás
        </text>
      </g>

      {/* Jobb oldal: Szorzat alak (tényezők) */}
      <g transform="translate(205, 55)">
        <rect width="125" height="50" rx="12" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
        <text x="62" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6d28d9" fontFamily="system-ui, sans-serif">
          SZORZAT ALAK
        </text>
        <text x="62" y="40" textAnchor="middle" fontSize="13" fontWeight="black" fill="#5b21b6" fontFamily="monospace">
          (x - 3) · (x + 3)
        </text>
      </g>

      {/* Előnyök lent */}
      <text x="180" y="145" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#5b21b6" fontFamily="system-ui, sans-serif">
        🎯 Egy szorzat = 0  ⇔  Bármelyik tényezője = 0  (x = 3 vagy x = -3)
      </text>
      <text x="180" y="162" textAnchor="middle" fontSize="10" fill="#6d28d9" fontFamily="system-ui, sans-serif">
        Törtek egyszerűsítésének és egyenletmegoldásnak a kulcsa!
      </text>
    </svg>
  );
};

// 2. Közös Tényező Kiemelése Ábra: 6x³ - 9x² = 3x²(2x - 3)
export const CommonFactorSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 180"
      width={size}
      height={size * 0.5}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="160" rx="16" fill="#fdf4ff" stroke="#f0abfc" strokeWidth="2" />

      <text x="180" y="32" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#86198f" fontFamily="system-ui, sans-serif">
        Közös Tényező Kiemelése (LNKO a zárójel elé)
      </text>

      {/* Kifejezés felbontva tényezőire */}
      <g transform="translate(180, 68)" textAnchor="middle" fontFamily="monospace" fontSize="15" fontWeight="bold">
        <text x="-90" y="0" fill="#a21caf">
          <tspan fill="#d946ef">3x²</tspan> · 2x
        </text>
        <text x="-15" y="0" fill="#701a75">-</text>
        <text x="60" y="0" fill="#a21caf">
          <tspan fill="#d946ef">3x²</tspan> · 3
        </text>
      </g>

      {/* Közös rész kiemelésének iránya */}
      <path d="M 65 78 C 65 105, 125 105, 125 78" fill="none" stroke="#d946ef" strokeWidth="2" strokeDasharray="3 3" />
      <text x="180" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c026d3" fontFamily="system-ui, sans-serif">
        Közös osztó: 3x²
      </text>

      {/* Eredmény kártya */}
      <g transform="translate(70, 120)">
        <rect width="220" height="38" rx="10" fill="#fae8ff" stroke="#d946ef" strokeWidth="2" />
        <text x="110" y="24" textAnchor="middle" fontSize="16" fontWeight="black" fill="#701a75" fontFamily="monospace">
          = <tspan fill="#c026d3">3x²</tspan> · ( 2x - 3 )
        </text>
      </g>
    </svg>
  );
};

// 3. Csoportosításos Módszer: ax + ay + bx + by
export const GroupingSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 180"
      width={size}
      height={size * 0.5}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="160" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />

      <text x="180" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155" fontFamily="system-ui, sans-serif">
        Csoportosításos Szorzattá Alakítás (4 tag esetén)
      </text>

      {/* 4 tag párokba szedve */}
      <g transform="translate(45, 52)">
        {/* 1. pár: ax + ay */}
        <rect width="125" height="36" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
        <text x="62" y="23" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#3730a3" fontFamily="monospace">
          a(x + y)
        </text>
      </g>

      <text x="180" y="75" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#64748b">+</text>

      <g transform="translate(190, 52)">
        {/* 2. pár: bx + by */}
        <rect width="125" height="36" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="62" y="23" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e" fontFamily="monospace">
          b(x + y)
        </text>
      </g>

      {/* Közös (x + y) zárójel kiemelése */}
      <g transform="translate(60, 110)">
        <rect width="240" height="42" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
        <text x="120" y="26" textAnchor="middle" fontSize="15" fontWeight="black" fill="#4c1d95" fontFamily="monospace">
          = ( x + y ) · ( a + b )
        </text>
      </g>
    </svg>
  );
};

// 4. Kétszeres Kiemelés és Azonosság Lánc: 2x² - 18 = 2(x² - 9) = 2(x-3)(x+3)
export const TwoStepFactoringSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 170"
      width={size}
      height={size * 0.47}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="150" rx="16" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />

      <text x="180" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d" fontFamily="system-ui, sans-serif">
        Aranyszabály: Előbb Kiemelünk, Utána Azonosság!
      </text>

      {/* Lépések vízszintesen */}
      <g transform="translate(25, 52)" fontFamily="monospace" fontSize="14" fontWeight="bold">
        {/* Kiindulás */}
        <rect x="0" y="0" width="80" height="40" rx="8" fill="#ffffff" stroke="#22c55e" strokeWidth="1.5" />
        <text x="40" y="25" textAnchor="middle" fill="#166534">2x² - 18</text>

        <text x="95" y="25" textAnchor="middle" fill="#15803d">→</text>

        {/* 1. lépés: 2 kiemelése */}
        <rect x="110" y="0" width="85" height="40" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="152" y="25" textAnchor="middle" fill="#14532d">2(x² - 9)</text>

        <text x="210" y="25" textAnchor="middle" fill="#15803d">→</text>

        {/* 2. lépés: azonosság */}
        <rect x="225" y="0" width="105" height="40" rx="8" fill="#22c55e" />
        <text x="277" y="25" textAnchor="middle" fill="#ffffff" fontSize="12">2(x-3)(x+3)</text>
      </g>

      <text x="180" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534" fontFamily="system-ui, sans-serif">
        „Mindig vizsgáld meg, hogy a zárójel belseje nem alakítható-e tovább!”
      </text>
    </svg>
  );
};
