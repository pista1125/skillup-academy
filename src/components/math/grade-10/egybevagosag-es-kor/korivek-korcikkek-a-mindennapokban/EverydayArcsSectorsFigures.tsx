import React from 'react';

interface SvgProps {
  size?: number;
  className?: string;
}

export const ClockHandsAngleSvg: React.FC<SvgProps> = ({ size = 260, className = '' }) => {
  return (
    <svg viewBox="0 0 260 260" width={size} height={size} className={`select-none ${className}`}>
      <circle cx="130" cy="130" r="115" fill="#f8fafc" stroke="#64748b" strokeWidth="4" />
      <circle cx="130" cy="130" r="110" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      
      {/* 12 Hour ticks */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 130 + 95 * Math.sin(angle);
        const y1 = 130 - 95 * Math.cos(angle);
        const x2 = 130 + 105 * Math.sin(angle);
        const y2 = 130 - 105 * Math.cos(angle);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth={i % 3 === 0 ? 3 : 1.5} />
        );
      })}
      
      {/* Numbers 12, 3, 6, 9 */}
      <text x="130" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">12</text>
      <text x="218" y="135" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">3</text>
      <text x="130" y="226" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">6</text>
      <text x="42" y="135" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">9</text>
      
      {/* Time: 3:15 -> Minute hand at 3 (90 deg), Hour hand at 3 + 15/60 hr = 3.25 hr = 97.5 deg */}
      {/* Minute hand: 90 deg -> pointing at 3 */}
      <line x1="130" y1="130" x2="205" y2="130" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      
      {/* Hour hand: 97.5 deg -> pointing slightly below 3 (sin(97.5) = 0.991, cos(97.5) = -0.130) */}
      <line x1="130" y1="130" x2="190" y2="138" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
      
      {/* Center cap */}
      <circle cx="130" cy="130" r="5" fill="#0f172a" />
      
      {/* Angle label */}
      <rect x="50" y="15" width="160" height="20" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="0.8" />
      <text x="130" y="29" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1d4ed8">
        3:15-kor a szög: 7,5° (nem 0°!)
      </text>
    </svg>
  );
};

export const WindshieldWiperCoverageSvg: React.FC<SvgProps> = ({ size = 320, className = '' }) => {
  return (
    <svg viewBox="0 0 340 200" width={size} height={size * 0.58} className={`select-none ${className}`}>
      <rect x="5" y="5" width="330" height="190" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      
      {/* Windshield trapezoid outline */}
      <polygon points="40,30 300,30 320,170 20,170" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
      
      {/* Wiper Pivot O at (170, 180) */}
      {/* Annulus sector from 140 deg to 40 deg. R = 130, r = 50 */}
      <path
        d="M 170 180 L 70 96 A 130 130 0 0 1 270 96 L 170 180 Z"
        fill="#e0f2fe"
        fillOpacity="0.5"
        stroke="#0284c7"
        strokeWidth="1.5"
      />
      {/* Swept blade area (between r=50 and R=130) */}
      <path
        d="M 70 96 A 130 130 0 0 1 270 96 L 208 148 A 50 50 0 0 0 132 148 Z"
        fill="#bae6fd"
        stroke="#0284c7"
        strokeWidth="2"
      />
      
      <circle cx="170" cy="180" r="4" fill="#0369a1" />
      <text x="170" y="195" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">Forgáspont</text>
      <text x="170" y="115" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">Törölt felület (körgyűrű-cikk)</text>
    </svg>
  );
};

export const ClockMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="42" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
    <circle cx="50" cy="14" r="2" fill="#334155" />
    <circle cx="86" cy="50" r="2" fill="#334155" />
    <circle cx="50" cy="86" r="2" fill="#334155" />
    <circle cx="14" cy="50" r="2" fill="#334155" />
    <line x1="50" y1="50" x2="50" y2="20" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="50" y1="50" x2="74" y2="50" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="50" r="3" fill="#0f172a" />
  </svg>
);

export const WiperMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <path d="M 50 85 L 20 40 A 45 45 0 0 1 80 40 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
    <path d="M 20 40 A 45 45 0 0 1 80 40 L 68 58 A 25 25 0 0 0 32 58 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.8" />
    <line x1="50" y1="85" x2="35" y2="35" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="85" r="3" fill="#0f172a" />
  </svg>
);

export const GearMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="38" fill="#f1f5f9" stroke="#64748b" strokeWidth="2" strokeDasharray="6 4" />
    <circle cx="50" cy="50" r="30" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
    <circle cx="50" cy="50" r="12" fill="#ffffff" stroke="#475569" strokeWidth="2" />
    <circle cx="50" cy="50" r="3" fill="#0f172a" />
  </svg>
);

export const PizzaSliceMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <path d="M 50 75 L 80 25 A 48 48 0 0 0 20 25 Z" fill="#fde047" stroke="#eab308" strokeWidth="2" />
    <path d="M 80 25 A 48 48 0 0 0 20 25" fill="none" stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
    <circle cx="45" cy="42" r="3" fill="#dc2626" />
    <circle cx="56" cy="48" r="2.5" fill="#dc2626" />
    <circle cx="40" cy="54" r="2.5" fill="#dc2626" />
    <circle cx="50" cy="75" r="2" fill="#a16207" />
  </svg>
);
