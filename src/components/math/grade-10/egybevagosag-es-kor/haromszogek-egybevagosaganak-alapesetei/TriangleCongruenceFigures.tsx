import React from 'react';

interface FigureProps {
  size?: number | string;
  className?: string;
}

export const FourCongruenceCasesSvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 240"
      width={size}
      className={`max-w-full h-auto select-none ${className}`}
    >
      {/* Background container */}
      <rect x="5" y="5" width="490" height="230" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Case 1: SSS (o-o-o) */}
      <g transform="translate(15, 20)">
        <rect x="0" y="0" width="105" height="195" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="52" y="24" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">1. o-o-o (SSS)</text>
        <polygon points="20,135 85,135 55,60" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <line x1="33" y1="96" x2="41" y2="100" stroke="#059669" strokeWidth="2" />
        <line x1="68" y1="96" x2="74" y2="100" stroke="#059669" strokeWidth="2" />
        <line x1="70" y1="100" x2="76" y2="104" stroke="#059669" strokeWidth="2" />
        <line x1="50" y1="131" x2="50" y2="139" stroke="#059669" strokeWidth="2" />
        <line x1="53" y1="131" x2="53" y2="139" stroke="#059669" strokeWidth="2" />
        <line x1="56" y1="131" x2="56" y2="139" stroke="#059669" strokeWidth="2" />
        <text x="52" y="165" fill="#475569" fontSize="10" textAnchor="middle">3 megfelelő oldal</text>
        <text x="52" y="180" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="middle">páronként egyenlő</text>
      </g>

      {/* Case 2: SAS (o-sz-o) */}
      <g transform="translate(135, 20)">
        <rect x="0" y="0" width="105" height="195" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="52" y="24" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">2. o-sz-o (SAS)</text>
        <polygon points="20,135 85,135 35,60" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
        {/* angle arc at (20, 135) */}
        <path d="M 36 135 A 16 16 0 0 0 24 118" fill="none" stroke="#ea580c" strokeWidth="2" />
        <line x1="25" y1="96" x2="31" y2="99" stroke="#2563eb" strokeWidth="2" />
        <line x1="50" y1="131" x2="50" y2="139" stroke="#2563eb" strokeWidth="2" />
        <line x1="53" y1="131" x2="53" y2="139" stroke="#2563eb" strokeWidth="2" />
        <text x="52" y="165" fill="#475569" fontSize="10" textAnchor="middle">2 oldal és a</text>
        <text x="52" y="180" fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle">közbezárt szög</text>
      </g>

      {/* Case 3: ASA (sz-o-sz) */}
      <g transform="translate(255, 20)">
        <rect x="0" y="0" width="105" height="195" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="52" y="24" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">3. sz-o-sz (ASA)</text>
        <polygon points="20,135 85,135 60,65" fill="#fdf4ff" stroke="#9333ea" strokeWidth="2" />
        {/* angle arcs at bottom left and bottom right */}
        <path d="M 35 135 A 15 15 0 0 0 27 122" fill="none" stroke="#ea580c" strokeWidth="2" />
        <path d="M 70 135 A 15 15 0 0 1 78 121" fill="none" stroke="#ea580c" strokeWidth="2" />
        <line x1="50" y1="131" x2="50" y2="139" stroke="#9333ea" strokeWidth="2" />
        <text x="52" y="165" fill="#475569" fontSize="10" textAnchor="middle">1 oldal és a</text>
        <text x="52" y="180" fill="#9333ea" fontSize="10" fontWeight="bold" textAnchor="middle">rajta fekvő 2 szög</text>
      </g>

      {/* Case 4: SSA (o-o-sz) */}
      <g transform="translate(375, 20)">
        <rect x="0" y="0" width="110" height="195" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="55" y="24" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">4. o-o-sz (SSA)</text>
        <polygon points="20,135 90,135 30,55" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
        {/* angle arc at (20, 135) */}
        <path d="M 36 135 A 16 16 0 0 0 22 121" fill="none" stroke="#059669" strokeWidth="2" />
        {/* marks on two sides */}
        <line x1="23" y1="94" x2="29" y2="96" stroke="#ea580c" strokeWidth="2" />
        <line x1="58" y1="94" x2="64" y2="97" stroke="#ea580c" strokeWidth="2" />
        <line x1="60" y1="97" x2="66" y2="100" stroke="#ea580c" strokeWidth="2" />
        <text x="55" y="165" fill="#475569" fontSize="10" textAnchor="middle">2 oldal és a</text>
        <text x="55" y="180" fill="#ea580c" fontSize="10" fontWeight="bold" textAnchor="middle">NAGYOBBAL szemközti</text>
      </g>
    </svg>
  );
};

export const AmbiguousSsaCounterexampleSvg: React.FC<FigureProps> = ({ size = 360, className = '' }) => {
  return (
    <svg
      viewBox="0 0 460 210"
      width={size}
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="5" y="5" width="450" height="200" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
      
      {/* Title */}
      <text x="230" y="28" fill="#b45309" fontSize="13" fontWeight="bold" textAnchor="middle">
        Az SSA csapda: Ha a szög a KISEBB oldallal szemközti!
      </text>

      {/* Base line extending */}
      <line x1="50" y1="150" x2="410" y2="150" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
      
      {/* Vertex A at (70, 150), Vertex C at (200, 60) */}
      <line x1="70" y1="150" x2="200" y2="60" stroke="#1e293b" strokeWidth="2.5" />
      <text x="122" y="98" fill="#1e293b" fontSize="12" fontWeight="bold">b (ismert)</text>

      {/* Known angle alpha at A */}
      <path d="M 100 150 A 30 30 0 0 0 91 135" fill="none" stroke="#ea580c" strokeWidth="2" />
      <text x="106" y="142" fill="#ea580c" fontSize="12" fontWeight="bold">α</text>

      {/* Circle arc from C */}
      <path
        d="M 115 155 A 110 110 0 0 1 285 155"
        fill="none"
        stroke="#dc2626"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />

      {/* Triangle 1: AB1C (obtuse) */}
      <polygon points="70,150 137,150 200,60" fill="#fee2e2" fillOpacity="0.5" stroke="#dc2626" strokeWidth="2" />
      {/* Triangle 2: AB2C (acute) */}
      <polygon points="70,150 263,150 200,60" fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 2" />

      {/* Points */}
      <circle cx="70" cy="150" r="3.5" fill="#1e293b" />
      <text x="60" y="168" fill="#1e293b" fontSize="12" fontWeight="bold">A</text>

      <circle cx="200" cy="60" r="3.5" fill="#1e293b" />
      <text x="200" y="50" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>

      <circle cx="137" cy="150" r="3.5" fill="#dc2626" />
      <text x="135" y="168" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">B₁ (tompaszögű)</text>

      <circle cx="263" cy="150" r="3.5" fill="#2563eb" />
      <text x="270" y="168" fill="#2563eb" fontSize="12" fontWeight="bold">B₂ (hegyesszögű)</text>

      {/* Explanatory text */}
      <text x="230" y="194" fill="#78350f" fontSize="11" textAnchor="middle">
        Két különböző háromszög (AB₁C és AB₂C) is létezik ugyanazokkal az adatokkal!
      </text>
    </svg>
  );
};

export const RightAngleWithDotSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 160 120"
      width={size}
      className={`inline-block select-none ${className}`}
    >
      <rect x="2" y="2" width="156" height="116" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      {/* Right angle arms */}
      <line x1="30" y1="90" x2="130" y2="90" stroke="#059669" strokeWidth="2.5" />
      <line x1="30" y1="90" x2="30" y2="20" stroke="#059669" strokeWidth="2.5" />
      
      {/* Hungarian Right Angle Notation: Quarter-circle arc with center dot! */}
      <path d="M 30 65 A 25 25 0 0 1 55 90" fill="none" stroke="#059669" strokeWidth="2" />
      <circle cx="41" cy="79" r="2.5" fill="#059669" />
      
      {/* Label */}
      <text x="85" y="55" fill="#065f46" fontSize="12" fontWeight="bold">∢ + pont</text>
      <text x="85" y="72" fill="#047857" fontSize="10">Magyar szabvány</text>
    </svg>
  );
};

export const SssMiniSvg: React.FC<FigureProps> = ({ size = 80, className = '' }) => (
  <svg viewBox="0 0 100 70" width={size} className={`select-none ${className}`}>
    <polygon points="15,60 85,60 50,15" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
    <line x1="28" y1="36" x2="36" y2="40" stroke="#059669" strokeWidth="2" />
    <line x1="64" y1="36" x2="72" y2="40" stroke="#059669" strokeWidth="2" />
    <line x1="66" y1="40" x2="74" y2="44" stroke="#059669" strokeWidth="2" />
    <line x1="47" y1="56" x2="47" y2="64" stroke="#059669" strokeWidth="2" />
    <line x1="50" y1="56" x2="50" y2="64" stroke="#059669" strokeWidth="2" />
    <line x1="53" y1="56" x2="53" y2="64" stroke="#059669" strokeWidth="2" />
  </svg>
);

export const SasMiniSvg: React.FC<FigureProps> = ({ size = 80, className = '' }) => (
  <svg viewBox="0 0 100 70" width={size} className={`select-none ${className}`}>
    <polygon points="15,60 85,60 30,15" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
    <path d="M 28 60 A 13 13 0 0 0 20 49" fill="none" stroke="#ea580c" strokeWidth="2" />
    <line x1="20" y1="36" x2="26" y2="39" stroke="#2563eb" strokeWidth="2" />
    <line x1="48" y1="56" x2="48" y2="64" stroke="#2563eb" strokeWidth="2" />
    <line x1="52" y1="56" x2="52" y2="64" stroke="#2563eb" strokeWidth="2" />
  </svg>
);

export const AsaMiniSvg: React.FC<FigureProps> = ({ size = 80, className = '' }) => (
  <svg viewBox="0 0 100 70" width={size} className={`select-none ${className}`}>
    <polygon points="15,60 85,60 60,18" fill="#fdf4ff" stroke="#9333ea" strokeWidth="2" />
    <path d="M 27 60 A 12 12 0 0 0 21 50" fill="none" stroke="#ea580c" strokeWidth="2" />
    <path d="M 73 60 A 12 12 0 0 1 80 50" fill="none" stroke="#ea580c" strokeWidth="2" />
    <line x1="50" y1="56" x2="50" y2="64" stroke="#9333ea" strokeWidth="2" />
  </svg>
);

export const SsaMiniSvg: React.FC<FigureProps> = ({ size = 80, className = '' }) => (
  <svg viewBox="0 0 100 70" width={size} className={`select-none ${className}`}>
    <polygon points="15,60 90,60 25,15" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
    <path d="M 27 60 A 12 12 0 0 0 19 49" fill="none" stroke="#059669" strokeWidth="2" />
    <line x1="18" y1="36" x2="24" y2="38" stroke="#ea580c" strokeWidth="2" />
    <line x1="55" y1="36" x2="61" y2="39" stroke="#ea580c" strokeWidth="2" />
    <line x1="57" y1="39" x2="63" y2="42" stroke="#ea580c" strokeWidth="2" />
  </svg>
);

export const RightTriangleMiniSvg: React.FC<FigureProps> = ({ size = 80, className = '' }) => (
  <svg viewBox="0 0 100 70" width={size} className={`select-none ${className}`}>
    <polygon points="20,60 85,60 20,15" fill="#f0fdf4" stroke="#059669" strokeWidth="2" />
    <path d="M 20 48 A 12 12 0 0 1 32 60" fill="none" stroke="#059669" strokeWidth="1.5" />
    <circle cx="25" cy="55" r="1.5" fill="#059669" />
    <text x="10" y="40" fill="#059669" fontSize="10" fontWeight="bold">b</text>
    <text x="50" y="68" fill="#059669" fontSize="10" fontWeight="bold">a</text>
  </svg>
);

