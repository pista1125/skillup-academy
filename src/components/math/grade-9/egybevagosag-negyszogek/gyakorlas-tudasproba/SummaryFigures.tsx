import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Az 5 Egybevágósági Transzformáció Összegzése
export const TransformationsOverviewSvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 220"
      width={size}
      height={size * 0.5}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="430" height="210" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Tengelyes tükrözés */}
      <g transform="translate(15, 20)">
        <rect x="0" y="0" width="75" height="140" rx="6" fill="#fdf2f8" stroke="#fbcfe8" />
        <text x="37" y="16" fontSize="9.5" fontWeight="bold" fill="#9d174d" textAnchor="middle">Tengelyes</text>
        <line x1="37" y1="28" x2="37" y2="105" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Bal és jobb háromszög */}
        <polygon points="12,70 30,50 30,90" fill="#f472b6" />
        <polygon points="62,70 44,50 44,90" fill="#ec4899" />
        <text x="37" y="122" fontSize="8.5" fontWeight="bold" fill="#be185d" textAnchor="middle">Irányváltó</text>
        <text x="37" y="133" fontSize="8" fill="#475569" textAnchor="middle">Fix: tengely</text>
      </g>

      {/* 2. Középpontos tükrözés */}
      <g transform="translate(98, 20)">
        <rect x="0" y="0" width="75" height="140" rx="6" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="37" y="16" fontSize="9.5" fontWeight="bold" fill="#1e40af" textAnchor="middle">Középpontos</text>
        <circle cx="37" cy="70" r="3" fill="#dc2626" />
        <text x="37" y="63" fontSize="8" fontWeight="bold" fill="#dc2626" textAnchor="middle">O</text>
        <polygon points="15,40 30,30 25,55" fill="#60a5fa" />
        <polygon points="59,100 44,110 49,85" fill="#2563eb" />
        <text x="37" y="122" fontSize="8.5" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">Iránytartó</text>
        <text x="37" y="133" fontSize="8" fill="#475569" textAnchor="middle">Fix: O pont</text>
      </g>

      {/* 3. Forgatás */}
      <g transform="translate(181, 20)">
        <rect x="0" y="0" width="75" height="140" rx="6" fill="#faf5ff" stroke="#e9d5ff" />
        <text x="37" y="16" fontSize="9.5" fontWeight="bold" fill="#6b21a8" textAnchor="middle">Forgatás</text>
        <circle cx="37" cy="75" r="3" fill="#9333ea" />
        <path d="M 20 45 A 25 25 0 0 1 55 55" fill="none" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="2 2" />
        <polygon points="12,55 25,40 28,60" fill="#c084fc" />
        <polygon points="45,40 60,45 52,65" fill="#7e22ce" />
        <text x="37" y="122" fontSize="8.5" fontWeight="bold" fill="#7e22ce" textAnchor="middle">Iránytartó</text>
        <text x="37" y="133" fontSize="8" fill="#475569" textAnchor="middle">Fix: O centrum</text>
      </g>

      {/* 4. Eltolás */}
      <g transform="translate(264, 20)">
        <rect x="0" y="0" width="75" height="140" rx="6" fill="#f0fdf4" stroke="#bbf7d0" />
        <text x="37" y="16" fontSize="9.5" fontWeight="bold" fill="#166534" textAnchor="middle">Eltolás</text>
        <polygon points="12,50 28,40 28,65" fill="#4ade80" />
        <polygon points="47,75 63,65 63,90" fill="#15803d" />
        <line x1="28" y1="52" x2="47" y2="77" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#g-arr)" />
        <text x="37" y="122" fontSize="8.5" fontWeight="bold" fill="#15803d" textAnchor="middle">Iránytartó</text>
        <text x="37" y="133" fontSize="8" fill="#475569" textAnchor="middle">Nincs fixpont</text>
      </g>

      {/* 5. Csúsztatva tükrözés */}
      <g transform="translate(347, 20)">
        <rect x="0" y="0" width="78" height="140" rx="6" fill="#fffbeb" stroke="#fde68a" />
        <text x="39" y="16" fontSize="9.5" fontWeight="bold" fill="#92400e" textAnchor="middle">Csúsztatva T.</text>
        <line x1="5" y1="68" x2="73" y2="68" stroke="#d97706" strokeWidth="1.2" strokeDasharray="3 2" />
        <polygon points="12,55 25,45 25,65" fill="#fcd34d" />
        <polygon points="50,82 63,92 63,72" fill="#d97706" />
        <text x="39" y="122" fontSize="8.5" fontWeight="bold" fill="#b45309" textAnchor="middle">Irányváltó</text>
        <text x="39" y="133" fontSize="8" fill="#475569" textAnchor="middle">Fix: a tengely</text>
      </g>

      {/* Alsó megjegyzés */}
      <rect x="25" y="172" width="390" height="32" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="220" y="192" fontSize="10.5" fontWeight="bold" fill="#334155" textAnchor="middle">
        Iránytartó (egyenes): Forgatás, Középpontos, Eltolás • Irányváltó: Tengelyes, Csúsztatva
      </text>
    </svg>
  );
};

// 2. Sokszögek Átlói és Szögösszegei
export const PolygonDiagonalsAnglesSvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 200"
      width={size}
      height={size * 0.45}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="430" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bal oldal: Ötszög az összes átlójával */}
      <g transform="translate(25, 20)">
        <text x="80" y="18" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Szabályos Ötszög (n = 5)</text>

        {/* 5 csúcs: r=45 körön O(80, 80) */}
        {/* Csúcsok: A(80, 35), B(123, 66), C(106, 117), D(54, 117), E(37, 66) */}
        <polygon points="80,35 123,66 106,117 54,117 37,66" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />

        {/* Átlók (ötágú csillag - 5 átló) */}
        <line x1="80" y1="35" x2="106" y2="117" stroke="#dc2626" strokeWidth="1.2" />
        <line x1="80" y1="35" x2="54" y2="117" stroke="#dc2626" strokeWidth="1.2" />
        <line x1="123" y1="66" x2="54" y2="117" stroke="#dc2626" strokeWidth="1.2" />
        <line x1="123" y1="66" x2="37" y2="66" stroke="#dc2626" strokeWidth="1.2" />
        <line x1="106" y1="117" x2="37" y2="66" stroke="#dc2626" strokeWidth="1.2" />

        {/* Csúcsok */}
        {[[80, 35], [123, 66], [106, 117], [54, 117], [37, 66]].map(([x, y], idx) => (
          <circle key={idx} cx={x} cy={y} r="3" fill="#1e40af" />
        ))}

        <text x="80" y="142" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">
          Átlók száma: 5 · (5 − 3) / 2 = 5 db
        </text>
      </g>

      {/* Elválasztó vonal */}
      <line x1="205" y1="20" x2="205" y2="155" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Jobb oldal: Belső szögek összege képlet és felbontás */}
      <g transform="translate(225, 20)">
        <text x="100" y="18" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">
          Sokszögek Alapképletei
        </text>

        <rect x="5" y="32" width="190" height="42" rx="6" fill="#f0fdf4" stroke="#86efac" />
        <text x="15" y="50" fontSize="10" fontBold="true" fill="#15803d">Belső szögek összege:</text>
        <text x="15" y="66" fontSize="11.5" fontWeight="bold" fill="#166534">S_n = (n − 2) · 180°</text>

        <rect x="5" y="82" width="190" height="42" rx="6" fill="#fdf4ff" stroke="#f0abfc" />
        <text x="15" y="100" fontSize="10" fontBold="true" fill="#86198f">Összes átló száma:</text>
        <text x="15" y="116" fontSize="11.5" fontWeight="bold" fill="#a21caf">d_n = n · (n − 3) / 2</text>

        <text x="100" y="142" fontSize="10" fontWeight="bold" fill="#475569" textAnchor="middle">
          Egy csúcsból (n − 3) átló húzható!
        </text>
      </g>

      {/* Alsó sáv */}
      <rect x="25" y="160" width="390" height="24" rx="5" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="220" y="176" fontSize="10" fontWeight="bold" fill="#334155" textAnchor="middle">
        Külső szögek összege BÁRMELY konvex sokszögnél pontosan 360°!
      </text>
    </svg>
  );
};

