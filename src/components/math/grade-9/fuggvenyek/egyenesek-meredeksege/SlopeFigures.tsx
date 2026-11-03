import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szemléltető ábra: Meredekségi lépcső / Irányháromszög (m = Δy / Δx)
 */
export const SlopeTriangleSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 320 240"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="290" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" />

      {/* Koordinátatengelyek */}
      <line x1="25" y1="190" x2="295" y2="190" stroke="#475569" strokeWidth="1.8" />
      <line x1="50" y1="25" x2="50" y2="215" stroke="#475569" strokeWidth="1.8" />
      <text x="290" y="184" fill="#475569" fontSize="10" fontWeight="bold">x</text>
      <text x="56" y="36" fill="#475569" fontSize="10" fontWeight="bold">y</text>

      {/* Egyenes */}
      <line x1="30" y1="195" x2="270" y2="35" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

      {/* Irányháromszög P1(1; 1) -> (90, 150) és P2(4; 3) -> (210, 70) */}
      {/* Vízszintes szakasz: Δx = x2 - x1 */}
      <line x1="90" y1="150" x2="210" y2="150" stroke="#059669" strokeWidth="2.5" strokeDasharray="4 3" />
      <text x="150" y="166" fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">Δx = x₂ - x₁</text>

      {/* Függőleges szakasz: Δy = y2 - y1 */}
      <line x1="210" y1="150" x2="210" y2="70" stroke="#d97706" strokeWidth="2.5" strokeDasharray="4 3" />
      <text x="220" y="115" fill="#b45309" fontSize="11" fontWeight="bold">Δy = y₂ - y₁</text>

      {/* Derékszög jele */}
      <rect x="198" y="138" width="12" height="12" fill="none" stroke="#64748b" strokeWidth="1.2" />

      {/* P1 pont */}
      <circle cx="90" cy="150" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <text x="75" y="140" fill="#b91c1c" fontSize="10" fontWeight="black">P₁(x₁; y₁)</text>

      {/* P2 pont */}
      <circle cx="210" cy="70" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <text x="195" y="60" fill="#b91c1c" fontSize="10" fontWeight="black">P₂(x₂; y₂)</text>

      {/* Képlet kártya */}
      <rect x="190" y="180" width="105" height="36" fill="#eff6ff" rx="5" stroke="#bfdbfe" />
      <text x="242" y="202" fill="#1e40af" fontSize="12" fontWeight="black" textAnchor="middle">m = Δy / Δx</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: A 4 meredekség-típus
 */
export const SlopeTypesSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="300" height="200" fill="#f8fafc" rx="8" stroke="#cbd5e1" />

      {/* 1. Emelkedő (m > 0) */}
      <rect x="20" y="20" width="65" height="85" fill="#ecfdf5" rx="6" stroke="#a7f3d0" />
      <text x="52" y="35" fill="#065f46" fontSize="9" fontWeight="black" textAnchor="middle">m &gt; 0</text>
      <line x1="28" y1="90" x2="76" y2="45" stroke="#059669" strokeWidth="2.5" />
      <text x="52" y="100" fill="#047857" fontSize="8" fontWeight="bold" textAnchor="middle">Emelkedő</text>

      {/* 2. Süllyedő (m < 0) */}
      <rect x="92" y="20" width="65" height="85" fill="#fef2f2" rx="6" stroke="#fecaca" />
      <text x="124" y="35" fill="#991b1b" fontSize="9" fontWeight="black" textAnchor="middle">m &lt; 0</text>
      <line x1="100" y1="45" x2="148" y2="90" stroke="#dc2626" strokeWidth="2.5" />
      <text x="124" y="100" fill="#b91c1c" fontSize="8" fontWeight="bold" textAnchor="middle">Süllyedő</text>

      {/* 3. Vízszintes (m = 0) */}
      <rect x="164" y="20" width="65" height="85" fill="#eff6ff" rx="6" stroke="#bfdbfe" />
      <text x="196" y="35" fill="#1e40af" fontSize="9" fontWeight="black" textAnchor="middle">m = 0</text>
      <line x1="172" y1="67" x2="220" y2="67" stroke="#2563eb" strokeWidth="2.5" />
      <text x="196" y="100" fill="#1d4ed8" fontSize="8" fontWeight="bold" textAnchor="middle">Vízszintes</text>

      {/* 4. Függőleges (nincs m) */}
      <rect x="236" y="20" width="65" height="85" fill="#fffbeb" rx="6" stroke="#fde68a" />
      <text x="268" y="35" fill="#92400e" fontSize="8" fontWeight="black" textAnchor="middle">NINCS m</text>
      <line x1="268" y1="45" x2="268" y2="90" stroke="#d97706" strokeWidth="2.5" />
      <text x="268" y="100" fill="#b45309" fontSize="8" fontWeight="bold" textAnchor="middle">Függőleges</text>

      {/* Alsó magyarázó sáv */}
      <rect x="20" y="120" width="280" height="75" fill="#ffffff" rx="6" stroke="#e2e8f0" />
      <text x="160" y="140" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">
        Egységnyi lépés szabály: ha x 1-gyel nő ➔ y m-mel változik
      </text>
      <text x="160" y="160" fill="#64748b" fontSize="9" textAnchor="middle">
        • m &gt; 0: hegyesszög az x-tengellyel | m &lt; 0: tompaszög
      </text>
      <text x="160" y="178" fill="#64748b" fontSize="9" textAnchor="middle">
        • Függőlegesnél Δx = 0 (nullával osztás), ezért nincs meredeksége!
      </text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Párhuzamos és Merőleges egyenesek
 */
export const ParallelPerpendicularSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bal: Párhuzamos */}
      <rect x="15" y="15" width="140" height="190" fill="#eff6ff" rx="8" stroke="#93c5fd" />
      <text x="85" y="36" fill="#1e40af" fontSize="10" fontWeight="black" textAnchor="middle">PÁRHUZAMOSAK</text>
      <text x="85" y="52" fill="#2563eb" fontSize="11" fontWeight="bold" textAnchor="middle">m₁ = m₂</text>
      <line x1="25" y1="120" x2="145" y2="120" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="85" y1="60" x2="85" y2="170" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="35" y1="150" x2="135" y2="90" stroke="#2563eb" strokeWidth="2.5" />
      <line x1="35" y1="120" x2="135" y2="60" stroke="#3b82f6" strokeWidth="2.5" />
      <text x="85" y="190" fill="#1e3a8a" fontSize="9" fontWeight="bold" textAnchor="middle">Azonos hajlásszög</text>

      {/* Jobb: Merőleges */}
      <rect x="165" y="15" width="140" height="190" fill="#fdf4ff" rx="8" stroke="#f0abfc" />
      <text x="235" y="36" fill="#86198f" fontSize="10" fontWeight="black" textAnchor="middle">MERŐLEGESEK</text>
      <text x="235" y="52" fill="#c026d3" fontSize="11" fontWeight="bold" textAnchor="middle">m₁ · m₂ = -1</text>
      <line x1="175" y1="120" x2="295" y2="120" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="235" y1="60" x2="235" y2="170" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="185" y1="155" x2="285" y2="85" stroke="#a21caf" strokeWidth="2.5" />
      <line x1="200" y1="75" x2="270" y2="165" stroke="#d946ef" strokeWidth="2.5" />
      {/* 90 fok derékszög szimbólum */}
      <rect x="231" y="116" width="8" height="8" fill="none" stroke="#701a75" strokeWidth="1.2" transform="rotate(35 235 120)" />
      <text x="235" y="190" fill="#701a75" fontSize="9" fontWeight="bold" textAnchor="middle">Negatív reciprok</text>
    </svg>
  );
};

