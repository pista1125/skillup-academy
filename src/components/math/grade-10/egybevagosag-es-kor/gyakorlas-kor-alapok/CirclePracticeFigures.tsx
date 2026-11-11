import React from 'react';

interface SvgProps {
  size?: number;
  className?: string;
}

export const CombinedRunningTrackSvg: React.FC<SvgProps> = ({ size = 320, className = '' }) => {
  return (
    <svg viewBox="0 0 360 200" width={size} height={size * 0.55} className={`select-none ${className}`}>
      <rect x="5" y="5" width="350" height="190" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      
      {/* Outer track: width 140, height 120 (R = 60). Straight length = 100 */}
      <path d="M 130 40 L 230 40 A 60 60 0 0 1 230 160 L 130 160 A 60 60 0 0 1 130 40 Z" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      
      {/* Inner track: R = 40. Straight length = 100 */}
      <path d="M 130 60 L 230 60 A 40 40 0 0 1 230 140 L 130 140 A 40 40 0 0 1 130 60 Z" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      
      {/* Straight dimension */}
      <line x1="130" y1="25" x2="230" y2="25" stroke="#334155" strokeWidth="1.5" />
      <line x1="130" y1="20" x2="130" y2="30" stroke="#334155" strokeWidth="1.5" />
      <line x1="230" y1="20" x2="230" y2="30" stroke="#334155" strokeWidth="1.5" />
      <text x="180" y="20" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">Egyenes: L = 100 m</text>
      
      {/* Curve label */}
      <text x="295" y="105" fontSize="10" fontWeight="bold" fill="#ef4444">Félkörív R</text>
      <text x="65" y="105" fontSize="10" fontWeight="bold" fill="#16a34a">Félkörív r</text>
      
      <rect x="35" y="170" width="290" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
      <text x="180" y="184" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e293b">
        Stadion kerület: K = 2 · L + 2 · r · π (2 egyenes + 1 teljes kör)
      </text>
    </svg>
  );
};

export const SquareInscribedCircumscribedCircleSvg: React.FC<SvgProps> = ({ size = 280, className = '' }) => {
  return (
    <svg viewBox="0 0 280 240" width={size} height={size * 0.85} className={`select-none ${className}`}>
      <rect x="5" y="5" width="270" height="230" rx="12" fill="#faf5ff" stroke="#f3e8ff" strokeWidth="1.5" />
      
      {/* Center O at (140, 115) */}
      {/* Square a = 100 -> from (90, 65) to (190, 165) */}
      {/* Circumscribed circle: R = 50*sqrt(2) approx 70.7 */}
      <circle cx="140" cy="115" r="70.7" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" strokeDasharray="4 2" />
      
      {/* Square */}
      <rect x="90" y="65" width="100" height="100" fill="#ffffff" stroke="#475569" strokeWidth="2" />
      
      {/* Inscribed circle: r = 50 */}
      <circle cx="140" cy="115" r="50" fill="#ede9fe" stroke="#6366f1" strokeWidth="2" />
      
      <circle cx="140" cy="115" r="3.5" fill="#4c1d95" />
      
      {/* Inscribed radius r = a/2 */}
      <line x1="140" y1="115" x2="190" y2="115" stroke="#4f46e5" strokeWidth="2" />
      <text x="165" y="110" fontSize="10" fontWeight="bold" fill="#4338ca">r = a/2</text>
      
      {/* Circumscribed radius R = a*sqrt(2)/2 */}
      <line x1="140" y1="115" x2="190" y2="65" stroke="#9333ea" strokeWidth="2" />
      <text x="168" y="85" fontSize="10" fontWeight="bold" fill="#7e22ce">R = a√2/2</text>
      
      <rect x="25" y="195" width="230" height="30" rx="6" fill="#ffffff" stroke="#ddd6fe" strokeWidth="1" />
      <text x="140" y="210" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#581c87">
        Beírt: T_be = (a²π)/4 ≈ 0,785 a²
      </text>
      <text x="140" y="222" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#7e22ce">
        Körülírt: T_körül = (a²π)/2 ≈ 1,57 a²
      </text>
    </svg>
  );
};

export const TrackMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <path d="M 35 30 L 65 30 A 20 20 0 0 1 65 70 L 35 70 A 20 20 0 0 1 35 30 Z" fill="#fee2e2" stroke="#ef4444" strokeWidth="2.5" />
    <path d="M 35 40 L 65 40 A 10 10 0 0 1 65 60 L 35 60 A 10 10 0 0 1 35 40 Z" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.8" />
    <text x="50" y="53" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e293b">stadion</text>
  </svg>
);

export const SquareCirclesMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="42" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 2" />
    <rect x="20" y="20" width="60" height="60" fill="#ffffff" stroke="#475569" strokeWidth="1.8" />
    <circle cx="50" cy="50" r="30" fill="#ede9fe" stroke="#6366f1" strokeWidth="2" />
    <circle cx="50" cy="50" r="2.5" fill="#4c1d95" />
  </svg>
);

export const EquilateralIncircleMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <polygon points="50,15 86,77 14,77" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <circle cx="50" cy="56.3" r="20.7" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.8" />
    <circle cx="50" cy="56.3" r="2" fill="#1d4ed8" />
    <text x="50" y="59" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1d4ed8">r=m/3</text>
  </svg>
);

export const RingSectorMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <path d="M 50 65 L 85 30 A 45 45 0 0 0 15 30 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M 74 41 A 45 45 0 0 0 26 41 L 38 53 A 20 20 0 0 1 62 53 Z" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
    <circle cx="50" cy="65" r="2" fill="#15803d" />
    <text x="50" y="49" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#15803d">gyűrűcikk</text>
  </svg>
);
