import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Diszjunkció (VAGY művelet, A ∨ B):
 * Szemléltetés Venn-diagramon. Mindkét kör és a metszetük is ki van színezve (Unió).
 * „Legalább az egyik igaz”.
 */
export const DisjunctionVennSvg: React.FC<FigureProps> = ({ size = 220, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 460 220"
        className="w-full max-w-lg h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.2}px` : '260px' }}
      >
        <defs>
          <linearGradient id="orGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Universe */}
        <rect x="15" y="15" width="430" height="190" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="35" y="38" fill="#475569" fontSize="12" fontWeight="bold">U (Alaphalmaz)</text>

        {/* Shaded Union Area (A ∪ B) */}
        {/* Circle A */}
        <circle cx="185" cy="115" r="65" fill="url(#orGrad)" />
        {/* Circle B */}
        <circle cx="275" cy="115" r="65" fill="url(#orGrad)" />

        {/* Borders */}
        <circle cx="185" cy="115" r="65" fill="none" stroke="#4f46e5" strokeWidth="2.5" />
        <circle cx="275" cy="115" r="65" fill="none" stroke="#9333ea" strokeWidth="2.5" />

        {/* Labels */}
        <text x="145" y="80" textAnchor="middle" fill="#3730a3" fontSize="16" fontWeight="900">A</text>
        <text x="315" y="80" textAnchor="middle" fill="#6b21a8" fontSize="16" fontWeight="900">B</text>

        {/* Center label */}
        <rect x="190" y="103" width="80" height="24" rx="6" fill="#ffffff" fillOpacity="0.9" stroke="#6366f1" strokeWidth="1" />
        <text x="230" y="119" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="bold">Mindkettő</text>

        {/* Bottom Banner */}
        <rect x="40" y="172" width="380" height="24" rx="6" fill="#ede9fe" />
        <text x="230" y="188" textAnchor="middle" fill="#4338ca" fontSize="11" fontWeight="bold">
          A ∨ B (Diszjunkció): IGAZ, ha legalább az egyik IGAZ (vagy mindkettő!)
        </text>
      </svg>
    </div>
  );
};

/**
 * 2. Konjunkció (ÉS művelet, A ∧ B):
 * Szemléltetés Venn-diagramon. Kizárólag a két halmaz metszete van színezve.
 * „Akkor és csak akkor igaz, ha mindkettő igaz”.
 */
export const ConjunctionVennSvg: React.FC<FigureProps> = ({ size = 220, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 460 220"
        className="w-full max-w-lg h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.2}px` : '260px' }}
      >
        <defs>
          <clipPath id="circleAClip">
            <circle cx="185" cy="115" r="65" />
          </clipPath>
        </defs>

        {/* Universe */}
        <rect x="15" y="15" width="430" height="190" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="35" y="38" fill="#475569" fontSize="12" fontWeight="bold">U (Alaphalmaz)</text>

        {/* Background empty circles */}
        <circle cx="185" cy="115" r="65" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="275" cy="115" r="65" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 3" />

        {/* Shaded Intersection Area (A ∩ B) */}
        <g clipPath="url(#circleAClip)">
          <circle cx="275" cy="115" r="65" fill="#10b981" fillOpacity="0.5" />
        </g>

        {/* Circle outlines */}
        <circle cx="185" cy="115" r="65" fill="none" stroke="#059669" strokeWidth="2" />
        <circle cx="275" cy="115" r="65" fill="none" stroke="#059669" strokeWidth="2" />

        {/* Labels */}
        <text x="145" y="80" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">A</text>
        <text x="315" y="80" textAnchor="middle" fill="#065f46" fontSize="16" fontWeight="900">B</text>

        {/* Center label */}
        <rect x="180" y="103" width="100" height="24" rx="6" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
        <text x="230" y="119" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">A ∧ B (Metszet)</text>

        {/* Bottom Banner */}
        <rect x="40" y="172" width="380" height="24" rx="6" fill="#dcfce7" />
        <text x="230" y="188" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">
          A ∧ B (Konjunkció): CSAK akkor IGAZ, ha A és B is mindkettő IGAZ!
        </text>
      </svg>
    </div>
  );
};

/**
 * 3. Olimpiai Aranyérmek Elemzése (Kulcsár Győző / Egerszegi Krisztina):
 * Szemlélteti a tankönyvi bevezető példát:
 * München (1972): Arany = IGAZ
 * Montreal (1976): Arany = HAMIS
 * Miklós (VAGY): IGAZ ∨ HAMIS = IGAZ
 * Gyula (ÉS): IGAZ ∧ HAMIS = HAMIS
 */
export const OlympicLogicSvg: React.FC<FigureProps> = ({ size = 220, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 520 220"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.2}px` : '260px' }}
      >
        {/* Left Olympic card: München 1972 */}
        <g transform="translate(25, 20)">
          <rect x="0" y="0" width="150" height="90" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
          <text x="75" y="24" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">1972 München</text>
          <text x="75" y="44" textAnchor="middle" fill="#15803d" fontSize="10">Párbajtőr csapat</text>
          <rect x="25" y="55" width="100" height="22" rx="5" fill="#16a34a" />
          <text x="75" y="70" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">ARANY: IGAZ (1)</text>
        </g>

        {/* Right Olympic card: Montreal 1976 */}
        <g transform="translate(345, 20)">
          <rect x="0" y="0" width="150" height="90" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
          <text x="75" y="24" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">1976 Montreal</text>
          <text x="75" y="44" textAnchor="middle" fill="#b91c1c" fontSize="10">Nem nyert aranyat</text>
          <rect x="25" y="55" width="100" height="22" rx="5" fill="#dc2626" />
          <text x="75" y="70" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">ARANY: HAMIS (0)</text>
        </g>

        {/* Center Comparison Connector */}
        <path d="M 175 65 L 345 65" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 4" />

        {/* Bottom Verdict 1: Miklós (VAGY) */}
        <g transform="translate(25, 125)">
          <rect x="0" y="0" width="225" height="75" rx="10" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
          <text x="112" y="22" textAnchor="middle" fill="#1e40af" fontSize="11.5" fontWeight="bold">Miklós emléke (VAGY):</text>
          <text x="112" y="40" textAnchor="middle" fill="#334155" fontSize="10.5">„Münchenben VAGY Montrealban”</text>
          <rect x="40" y="48" width="145" height="20" rx="4" fill="#2563eb" />
          <text x="112" y="62" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">I ∨ H = IGAZ ✓</text>
        </g>

        {/* Bottom Verdict 2: Gyula (ÉS) */}
        <g transform="translate(270, 125)">
          <rect x="0" y="0" width="225" height="75" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
          <text x="112" y="22" textAnchor="middle" fill="#991b1b" fontSize="11.5" fontWeight="bold">Gyula emléke (ÉS):</text>
          <text x="112" y="40" textAnchor="middle" fill="#334155" fontSize="10.5">„Münchenben ÉS Montrealban is”</text>
          <rect x="40" y="48" width="145" height="20" rx="4" fill="#dc2626" />
          <text x="112" y="62" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">I ∧ H = HAMIS ✗</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Tankönyvi Oszthatósági Halmazok:
 * Számok: {12, 15, 21, 32, 35, 36}
 * A: osztható 2-vel
 * B: osztható 3-mal
 * C: osztható 5-tel
 */
export const DivisibilityVennSvg: React.FC<FigureProps> = ({ size = 220, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 480 230"
        className="w-full max-w-lg h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.2}px` : '270px' }}
      >
        {/* Frame */}
        <rect x="15" y="15" width="450" height="200" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="35" y="36" fill="#475569" fontSize="11" fontWeight="bold">Számhalmaz: {'{12, 15, 21, 32, 35, 36}'}</text>

        {/* Set A: osztható 2-vel */}
        <circle cx="170" cy="115" r="60" fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="2" />
        <text x="135" y="70" fill="#1d4ed8" fontSize="12" fontWeight="bold">A: 2-vel oszt.</text>

        {/* Set B: osztható 3-mal */}
        <circle cx="270" cy="115" r="60" fill="#8b5cf6" fillOpacity="0.15" stroke="#7c3aed" strokeWidth="2" />
        <text x="305" y="70" fill="#6d28d9" fontSize="12" fontWeight="bold">B: 3-mal oszt.</text>

        {/* Set C: osztható 5-tel */}
        <circle cx="220" cy="160" r="45" fill="#10b981" fillOpacity="0.15" stroke="#059669" strokeWidth="2" />
        <text x="220" y="200" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">C: 5-tel oszt.</text>

        {/* Placed Numbers */}
        {/* Only A: 32 */}
        <text x="135" y="115" textAnchor="middle" fill="#1e3a8a" fontSize="13" fontWeight="bold">32</text>
        {/* A ∩ B: 12, 36 (2-vel és 3-mal is, de 5-tel nem) */}
        <text x="220" y="100" textAnchor="middle" fill="#4c1d95" fontSize="12" fontWeight="black">12; 36</text>
        {/* Only B: 21 */}
        <text x="305" y="115" textAnchor="middle" fill="#581c87" fontSize="13" fontWeight="bold">21</text>
        {/* B ∩ C: 15 (3-mal és 5-tel) */}
        <text x="248" y="145" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="black">15</text>
        {/* Only C: 35 (5-tel) */}
        <text x="195" y="170" textAnchor="middle" fill="#064e3b" fontSize="12" fontWeight="bold">35</text>

        {/* Explanation */}
        <rect x="35" y="180" width="130" height="26" rx="5" fill="#ede9fe" />
        <text x="100" y="197" textAnchor="middle" fill="#4338ca" fontSize="10" fontWeight="bold">A ∧ B: {`{12; 36}`}</text>

        <rect x="315" y="180" width="130" height="26" rx="5" fill="#fef3c7" />
        <text x="380" y="197" textAnchor="middle" fill="#b45309" fontSize="10" fontWeight="bold">B ∧ C: {`{15}`}</text>
      </svg>
    </div>
  );
};
