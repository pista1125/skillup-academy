import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Paralelogramma átdarabolása téglalappá (T = a * m)
export const ParallelogramDissectionSvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 200"
      width={size}
      height={size * 0.45}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="430" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bal ábra: Eredeti paralelogramma a levágandó háromszöggel */}
      <g transform="translate(25, 25)">
        <text x="80" y="16" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">1. Eredeti Paralelogramma</text>

        {/* Levágandó háromszög balra (pirosas/rózsaszínes) */}
        <polygon points="10,120 45,120 45,45" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Maradék trapéz */}
        <polygon points="45,120 145,120 180,45 45,45" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />

        {/* Magasságvonal (45, 120) -> (45, 45) */}
        <line x1="45" y1="120" x2="45" y2="45" stroke="#dc2626" strokeWidth="1.8" />
        <text x="52" y="85" fontSize="10.5" fontWeight="bold" fill="#b91c1c">m_a</text>

        {/* a oldal lent */}
        <line x1="10" y1="130" x2="145" y2="130" stroke="#15803d" strokeWidth="2" />
        <text x="77" y="145" fontSize="11" fontWeight="bold" fill="#15803d" textAnchor="middle">a alap</text>
      </g>

      {/* Átrakás nyíl */}
      <path d="M 195 85 L 225 85" stroke="#64748b" strokeWidth="2.5" />
      <polygon points="225,81 233,85 225,89" fill="#64748b" />

      {/* Jobb ábra: Téglalappá kiegészítve */}
      <g transform="translate(245, 25)">
        <text x="80" y="16" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">2. Átdarabolt Téglalap</text>

        {/* Maradék rész */}
        <polygon points="10,120 110,120 145,45 10,45" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />

        {/* Jobb oldalra áttett derékszögű háromszög */}
        <polygon points="110,120 145,120 145,45" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" />

        {/* Téglalap körvonala */}
        <rect x="10" y="45" width="135" height="75" fill="none" stroke="#0f766e" strokeWidth="2" strokeDasharray="4 3" />

        {/* Magasság / oldal */}
        <text x="152" y="85" fontSize="10.5" fontWeight="bold" fill="#b91c1c">m_a</text>
        <text x="77" y="145" fontSize="11" fontWeight="bold" fill="#15803d" textAnchor="middle">a hosszúság</text>
      </g>

      {/* Alsó képlet */}
      <rect x="35" y="155" width="370" height="26" rx="6" fill="#f0fdf4" stroke="#86efac" />
      <text x="220" y="172" fontSize="11" fontWeight="bold" fill="#166534" textAnchor="middle">
        T = a · m_a = b · m_b (A terület nem változik az átdarabolással!)
      </text>
    </svg>
  );
};

// 2. Trapéz területe megkettőzéssel: T = ((a + c)/2) * m
export const TrapezoidDissectionSvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 200"
      width={size}
      height={size * 0.45}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="430" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      <g transform="translate(30, 25)">
        <text x="190" y="16" fontSize="11.5" fontWeight="bold" fill="#1e293b" textAnchor="middle">
          Két Egybevágó Trapéz Összeillesztése Paralelogrammává
        </text>

        {/* 1. Trapéz (Kék) */}
        <polygon points="20,120 180,120 140,50 60,50" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />

        {/* 2. Trapéz fejjel lefelé elforgatva 180°-kal (Zöld) */}
        <polygon points="180,120 340,120 300,50 140,50" fill="#dcfce7" stroke="#059669" strokeWidth="2" strokeDasharray="4 2" />

        {/* a és c alapok jelölése */}
        <text x="100" y="136" fontSize="11" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">a (alsó alap)</text>
        <text x="100" y="42" fontSize="11" fontWeight="bold" fill="#1d4ed8" textAnchor="middle">c (felső alap)</text>

        <text x="260" y="136" fontSize="11" fontWeight="bold" fill="#059669" textAnchor="middle">c</text>
        <text x="220" y="42" fontSize="11" fontWeight="bold" fill="#059669" textAnchor="middle">a</text>

        {/* Magasság */}
        <line x1="60" y1="50" x2="60" y2="120" stroke="#dc2626" strokeWidth="1.8" strokeDasharray="3 2" />
        <text x="48" y="88" fontSize="10.5" fontWeight="bold" fill="#dc2626">m</text>

        {/* Teljes alsó alap összeg: a + c */}
        <line x1="20" y1="145" x2="340" y2="145" stroke="#475569" strokeWidth="1.5" />
        <text x="180" y="158" fontSize="10.5" fontWeight="bold" fill="#334155" textAnchor="middle">
          Nagy paralelogramma alapja: (a + c)
        </text>
      </g>

      {/* Alsó képlet */}
      <rect x="35" y="165" width="370" height="24" rx="5" fill="#eff6ff" stroke="#bfdbfe" />
      <text x="220" y="181" fontSize="10.5" fontWeight="bold" fill="#1e40af" textAnchor="middle">
        2 · T_trapéz = (a + c) · m  ⟹  T = ((a + c) / 2) · m = k · m
      </text>
    </svg>
  );
};

// 3. Rombusz és Deltoid Területe: T = (e * f) / 2
export const RhombusKiteAreaSvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 200"
      width={size}
      height={size * 0.45}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="430" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bal oldal: Rombusz köré írt e x f téglalap */}
      <g transform="translate(30, 20)">
        <text x="75" y="16" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Rombusz (e ⊥ f)</text>

        {/* Befoglaló téglalap */}
        <rect x="15" y="30" width="120" height="90" fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="3 3" />

        {/* Rombusz */}
        <polygon points="75,30 135,75 75,120 15,75" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />

        {/* Átlók */}
        <line x1="75" y1="30" x2="75" y2="120" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="15" y1="75" x2="135" y2="75" stroke="#2563eb" strokeWidth="1.5" />

        <text x="82" y="60" fontSize="10" fontWeight="bold" fill="#dc2626">f</text>
        <text x="45" y="70" fontSize="10" fontWeight="bold" fill="#2563eb">e</text>

        <text x="75" y="136" fontSize="10" fontWeight="bold" fill="#7e22ce" textAnchor="middle">T = (e · f) / 2</text>
      </g>

      {/* Elválasztó vonal */}
      <line x1="205" y1="20" x2="205" y2="155" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Jobb oldal: Deltoid köré írt e x f téglalap */}
      <g transform="translate(235, 20)">
        <text x="85" y="16" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Deltoid (e ⊥ f)</text>

        {/* Befoglaló téglalap */}
        <rect x="15" y="25" width="140" height="100" fill="#f8fafc" stroke="#cbd5e1" strokeDasharray="3 3" />

        {/* Deltoid */}
        <polygon points="85,25 155,65 85,125 15,65" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />

        {/* Átlók */}
        <line x1="85" y1="25" x2="85" y2="125" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="15" y1="65" x2="155" y2="65" stroke="#2563eb" strokeWidth="1.5" />

        <text x="92" y="55" fontSize="10" fontWeight="bold" fill="#dc2626">f</text>
        <text x="45" y="60" fontSize="10" fontWeight="bold" fill="#2563eb">e</text>

        <text x="85" y="136" fontSize="10" fontWeight="bold" fill="#b45309" textAnchor="middle">T = (e · f) / 2</text>
      </g>

      {/* Alsó magyarázat */}
      <rect x="25" y="160" width="390" height="24" rx="5" fill="#fdf4ff" stroke="#f0abfc" />
      <text x="220" y="176" fontSize="10" fontWeight="bold" fill="#86198f" textAnchor="middle">
        Minden olyan négyszög területe (e · f)/2, amelynek átlói merőlegesek egymásra!
      </text>
    </svg>
  );
};

