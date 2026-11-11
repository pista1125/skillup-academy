import React from 'react';

interface SvgProps {
  size?: number;
  className?: string;
}

export const ArcAndSectorGeometrySvg: React.FC<SvgProps> = ({ size = 320, className = '' }) => {
  return (
    <svg viewBox="0 0 340 240" width={size} height={size * 0.7} className={`select-none ${className}`}>
      <rect x="5" y="5" width="330" height="230" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
      
      {/* Circle background */}
      <circle cx="160" cy="125" r="85" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 3" />
      
      {/* Sector (60 deg: from 0 deg to -60 deg) */}
      {/* Center at (160, 125). r = 85. P1 = (245, 125), P2 = (160 + 85*cos(60) = 202.5, 125 - 85*sin(60) = 51.4) */}
      <path d="M 160 125 L 245 125 A 85 85 0 0 0 202.5 51.4 Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5" />
      
      {/* Highlight Arc */}
      <path d="M 245 125 A 85 85 0 0 0 202.5 51.4" fill="none" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      <text x="240" y="80" fontSize="12" fontWeight="bold" fill="#dc2626">ív (i)</text>
      
      {/* Central Angle Arc */}
      <path d="M 195 125 A 35 35 0 0 0 177.5 94.7" fill="none" stroke="#1d4ed8" strokeWidth="2" />
      <text x="188" y="112" fontSize="12" fontWeight="bold" fill="#1d4ed8">α</text>
      
      {/* Radii */}
      <circle cx="160" cy="125" r="4" fill="#1e40af" />
      <text x="145" y="132" fontSize="12" fontWeight="bold" fill="#1e40af">O</text>
      <text x="200" y="140" fontSize="11" fontWeight="bold" fill="#1e40af">r</text>
      <text x="170" y="75" fontSize="11" fontWeight="bold" fill="#1e40af">r</text>
      
      {/* Labels */}
      <rect x="20" y="15" width="145" height="42" rx="6" fill="#ffffff" stroke="#93c5fd" strokeWidth="1" />
      <text x="92" y="32" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1e40af">i = (2rπ · α) / 360°</text>
      <text x="92" y="48" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#2563eb">T_cikk = (r²π · α) / 360°</text>
      
      <rect x="25" y="185" width="290" height="24" rx="4" fill="#dbeafe" />
      <text x="170" y="201" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#1e3a8a">
        Kapcsolat: T_cikk = (i · r) / 2 (mint a háromszög alap · m / 2!)
      </text>
    </svg>
  );
};

export const CircularSegmentDissectionSvg: React.FC<SvgProps> = ({ size = 300, className = '' }) => {
  return (
    <svg viewBox="0 0 320 220" width={size} height={size * 0.68} className={`select-none ${className}`}>
      <rect x="5" y="5" width="310" height="210" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      
      {/* Circle center (120, 110), r = 75 */}
      <circle cx="120" cy="110" r="75" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
      
      {/* Sector */}
      <path d="M 120 110 L 195 110 A 75 75 0 0 0 120 35 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
      
      {/* Chord between (195, 110) and (120, 35) */}
      <polygon points="120,110 195,110 120,35" fill="#ffffff" stroke="#0369a1" strokeWidth="2" />
      
      {/* Circular Segment (shaded in amber) */}
      <path d="M 195 110 A 75 75 0 0 0 120 35 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
      
      {/* Center O with right angle arc + dot */}
      <path d="M 135 110 A 15 15 0 0 0 120 95" fill="none" stroke="#0284c7" strokeWidth="1.5" />
      <circle cx="127" cy="103" r="2" fill="#0284c7" />
      
      <circle cx="120" cy="110" r="3.5" fill="#0369a1" />
      <text x="105" y="118" fontSize="11" fontWeight="bold" fill="#0369a1">O (90°)</text>
      
      <text x="175" y="65" fontSize="10.5" fontWeight="bold" fill="#c2410c">Körszelet</text>
      
      <g transform="translate(185, 80)">
        <rect width="120" height="75" rx="6" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
        <text x="60" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9a3412">T_szelet =</text>
        <text x="60" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">T_körcikk</text>
        <text x="60" y="52" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412">-</text>
        <text x="60" y="66" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#047857">T_háromszög</text>
      </g>
    </svg>
  );
};

export const CentralAngleMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="40" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
    <path d="M 50 50 L 88 35 A 40 40 0 0 0 50 10 Z" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.8" />
    <path d="M 88 35 A 40 40 0 0 0 50 10" fill="none" stroke="#ef4444" strokeWidth="3" />
    <circle cx="50" cy="50" r="3" fill="#1e40af" />
    <text x="46" y="58" fontSize="9" fontWeight="bold" fill="#1e40af">O</text>
    <text x="58" y="38" fontSize="10" fontWeight="bold" fill="#2563eb">α</text>
  </svg>
);

export const SectorMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <path d="M 50 65 L 85 30 A 45 45 0 0 0 15 30 Z" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
    <circle cx="50" cy="65" r="3" fill="#1e40af" />
    <text x="50" y="48" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">T_cikk</text>
    <text x="68" y="58" fontSize="9" fontWeight="bold" fill="#1d4ed8">r</text>
  </svg>
);

export const SegmentMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <path d="M 50 70 L 85 35 A 45 45 0 0 0 15 35 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
    <polygon points="50,70 85,35 15,35" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
    <path d="M 85 35 A 45 45 0 0 0 15 35 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
    <circle cx="50" cy="70" r="2.5" fill="#64748b" />
    <text x="50" y="30" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#c2410c">szelet</text>
  </svg>
);

export const InscribedAngleMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="40" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.8" />
    <path d="M 22 78 A 40 40 0 0 0 78 78" fill="none" stroke="#ef4444" strokeWidth="2.5" />
    <line x1="50" y1="50" x2="22" y2="78" stroke="#0284c7" strokeWidth="1.5" />
    <line x1="50" y1="50" x2="78" y2="78" stroke="#0284c7" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="2.5" fill="#0284c7" />
    <text x="50" y="62" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7">2β</text>
    <line x1="50" y1="10" x2="22" y2="78" stroke="#7c3aed" strokeWidth="1.5" />
    <line x1="50" y1="10" x2="78" y2="78" stroke="#7c3aed" strokeWidth="1.5" />
    <circle cx="50" cy="10" r="2.5" fill="#7c3aed" />
    <text x="50" y="24" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7c3aed">β</text>
  </svg>
);

export const ThalesMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="40" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="10" y1="50" x2="90" y2="50" stroke="#0f172a" strokeWidth="2" />
    <polygon points="10,50 90,50 30,15" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <path d="M 24 23 A 10 10 0 0 0 38 23" fill="none" stroke="#ef4444" strokeWidth="1.2" />
    <circle cx="31" cy="23" r="1.5" fill="#ef4444" />
    <circle cx="50" cy="50" r="2.5" fill="#0f172a" />
    <text x="50" y="62" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#0f172a">d (átmérő)</text>
  </svg>
);
