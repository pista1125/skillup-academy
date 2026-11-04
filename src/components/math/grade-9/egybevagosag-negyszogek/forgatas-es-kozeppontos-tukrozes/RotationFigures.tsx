import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Középpontos tükrözés: O középpont, ABC háromszög és A'B'C' tükörképe
export const CentralSymmetrySvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 240"
      width={size}
      height={size * 0.63}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <defs>
        <marker id="csArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
        </marker>
      </defs>

      <rect x="5" y="5" width="370" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Vetítő egyenesek O-n keresztül (szaggatott) */}
      <line x1="80" y1="60" x2="300" y2="180" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="140" y1="40" x2="240" y2="200" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="70" y1="110" x2="310" y2="130" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* O középpont: (190, 120) */}
      <circle cx="190" cy="120" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <text x="190" y="142" fontSize="13" fontWeight="bold" fill="#b91c1c" textAnchor="middle">O (fixpont)</text>

      {/* Eredeti háromszög ABC: A(80, 60), B(140, 40), C(70, 110) */}
      <polygon points="80,60 140,40 70,110" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx="80" cy="60" r="4" fill="#1d4ed8" />
      <circle cx="140" cy="40" r="4" fill="#1d4ed8" />
      <circle cx="70" cy="110" r="4" fill="#1d4ed8" />
      <text x="70" y="55" fontSize="12" fontWeight="bold" fill="#1e40af">A</text>
      <text x="145" y="35" fontSize="12" fontWeight="bold" fill="#1e40af">B</text>
      <text x="52" y="118" fontSize="12" fontWeight="bold" fill="#1e40af">C</text>
      <text x="100" y="85" fontSize="11" fontWeight="bold" fill="#2563eb">ABC</text>

      {/* Kép háromszög A'B'C': A'(300, 180), B'(240, 200), C'(310, 130) */}
      <polygon points="300,180 240,200 310,130" fill="#10b981" fillOpacity="0.2" stroke="#059669" strokeWidth="2.5" />
      <circle cx="300" cy="180" r="4" fill="#047857" />
      <circle cx="240" cy="200" r="4" fill="#047857" />
      <circle cx="310" cy="130" r="4" fill="#047857" />
      <text x="310" y="195" fontSize="12" fontWeight="bold" fill="#065f46">A'</text>
      <text x="230" y="218" fontSize="12" fontWeight="bold" fill="#065f46">B'</text>
      <text x="322" y="132" fontSize="12" fontWeight="bold" fill="#065f46">C'</text>
      <text x="275" y="165" fontSize="11" fontWeight="bold" fill="#059669">A'B'C'</text>

      {/* Egyenlő távolság jelölése az AO és OA' szakaszon */}
      <line x1="133" y1="87" x2="137" y2="93" stroke="#ef4444" strokeWidth="2" />
      <line x1="243" y1="147" x2="247" y2="153" stroke="#ef4444" strokeWidth="2" />

      {/* Magyarázó felirat */}
      <text x="190" y="25" fontSize="11.5" fontWeight="600" fill="#475569" textAnchor="middle">
        |AO| = |OA'| • 180°-os elforgatás • Párhuzamos oldalak: AB || A'B'
      </text>
    </svg>
  );
};

// 2. Pont körüli elforgatás adott szöggel: O középpont, P -> P', alpha szög, ív
export const RotationAngleSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 240"
      width={size}
      height={size * 0.63}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <defs>
        <marker id="rotArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
        </marker>
      </defs>

      <rect x="5" y="5" width="370" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* O középpont: (130, 160) */}
      {/* Sugár: R = 150 */}
      {/* P szög: 15° (vagyis 130 + 150*cos(15°), 160 - 150*sin(15°)) = (130 + 144.9, 160 - 38.8) = (275, 121) */}
      {/* P' szög: 15° + 65° = 80° -> (130 + 150*cos(80°), 160 - 150*sin(80°)) = (130 + 26, 160 - 147.7) = (156, 12) */}
      {/* Vetítő szakaszok OP és OP' */}
      <line x1="130" y1="160" x2="275" y2="121" stroke="#3b82f6" strokeWidth="2.5" />
      <line x1="130" y1="160" x2="160" y2="25" stroke="#10b981" strokeWidth="2.5" />

      {/* Körív OP és OP' között (körvonal egy része szaggatva) */}
      <path
        d="M 275 121 A 150 150 0 0 0 160 25"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />

      {/* Irányított forgatási ív nyíllal O körül kis sugárral (r = 55) */}
      {/* Szög 15° -> 80°: cos(15°)=0.966, sin(15°)=0.259 -> (130+53, 160-14) = (183, 146) */}
      {/* cos(80°)=0.174, sin(80°)=0.985 -> (130+9.5, 160-54) = (140, 106) */}
      <path
        d="M 183 146 A 55 55 0 0 0 144 108"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2.5"
        markerEnd="url(#rotArrow)"
      />
      <text x="175" y="125" fontSize="13" fontWeight="bold" fill="#7c3aed">α</text>

      {/* Pontok és feliratok */}
      <circle cx="130" cy="160" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <text x="115" y="180" fontSize="13" fontWeight="bold" fill="#b91c1c">O</text>

      <circle cx="275" cy="121" r="5" fill="#2563eb" />
      <text x="287" y="126" fontSize="13" fontWeight="bold" fill="#1e40af">P</text>

      <circle cx="160" cy="25" r="5" fill="#059669" />
      <text x="168" y="24" fontSize="13" fontWeight="bold" fill="#065f46">P'</text>

      {/* Távolság-egyenlőség jelzése r-rel */}
      <text x="210" y="152" fontSize="11" fontWeight="bold" fill="#3b82f6">r</text>
      <text x="135" y="85" fontSize="11" fontWeight="bold" fill="#10b981">r</text>

      {/* Szövegmagyarázat */}
      <rect x="20" y="15" width="105" height="48" rx="8" fill="#ffffff" stroke="#e2e8f0" />
      <text x="28" y="32" fontSize="10.5" fontWeight="bold" fill="#1e293b">|OP| = |OP'| = r</text>
      <text x="28" y="50" fontSize="10" fill="#64748b">∠POP' = α (pozitív)</text>
    </svg>
  );
};

// 3. Forgásszimmetrikus alakzatok: Szabályos 3-szög (120°), Négyzet (90°), Szabályos 6-szög (60°), Paralelogramma (180°)
export const RotationalSymmetryShapesSvg: React.FC<FigureProps> = ({ size = 360, className = '' }) => {
  return (
    <svg
      viewBox="0 0 460 210"
      width={size}
      height={size * 0.46}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="450" height="200" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Szabályos háromszög (120°) */}
      <g transform="translate(15, 20)">
        <polygon points="50,15 15,75 85,75" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
        <circle cx="50" cy="55" r="3.5" fill="#ef4444" />
        {/* Forgás nyíl */}
        <path d="M 50 35 A 20 20 0 0 1 67 60" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="50" y="105" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Szabályos 3-szög</text>
        <text x="50" y="122" fontSize="10" fontWeight="600" fill="#2563eb" textAnchor="middle">α = 120° (3-adrendű)</text>
      </g>

      {/* 2. Négyzet (90°) */}
      <g transform="translate(130, 20)">
        <rect x="20" y="20" width="60" height="60" rx="4" fill="#10b981" fillOpacity="0.2" stroke="#059669" strokeWidth="2" />
        <circle cx="50" cy="50" r="3.5" fill="#ef4444" />
        <path d="M 50 32 A 18 18 0 0 1 68 50" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="50" y="105" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Négyzet</text>
        <text x="50" y="122" fontSize="10" fontWeight="600" fill="#059669" textAnchor="middle">α = 90° (4-edrendű)</text>
      </g>

      {/* 3. Paralelogramma (180°) */}
      <g transform="translate(245, 20)">
        <polygon points="35,25 90,25 65,75 10,75" fill="#8b5cf6" fillOpacity="0.2" stroke="#7c3aed" strokeWidth="2" />
        <circle cx="50" cy="50" r="3.5" fill="#ef4444" />
        <path d="M 50 32 A 18 18 0 0 1 50 68" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="50" y="105" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Paralelogramma</text>
        <text x="50" y="122" fontSize="10" fontWeight="600" fill="#7c3aed" textAnchor="middle">α = 180° (középpontos)</text>
      </g>

      {/* 4. Szabályos hatszög (60°) */}
      <g transform="translate(360, 20)">
        {/* r = 32, cx = 50, cy = 50 */}
        <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="#f59e0b" fillOpacity="0.2" stroke="#d97706" strokeWidth="2" />
        <circle cx="50" cy="50" r="3.5" fill="#ef4444" />
        <path d="M 50 34 A 16 16 0 0 1 64 42" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="50" y="105" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Szabályos hatszög</text>
        <text x="50" y="122" fontSize="10" fontWeight="600" fill="#d97706" textAnchor="middle">α = 60° (6-odrendű)</text>
      </g>

      {/* Alsó megjegyzés */}
      <rect x="25" y="155" width="410" height="32" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="230" y="175" fontSize="11" fontWeight="600" fill="#475569" textAnchor="middle">
        Egy alakzat rendje: n = 360° / α_min, amivel önmagába forgatható
      </text>
    </svg>
  );
};

// 4. Koordináta-geometriai forgatások: Origó körüli 180° és +90°
export const CoordinateRotationSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 250"
      width={size}
      height={size * 0.69}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="350" height="240" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Rács és tengelyek */}
      {/* Origó: (180, 130) skála: 1 egység = 22px */}
      <g stroke="#e2e8f0" strokeWidth="1">
        <line x1="48" y1="20" x2="48" y2="230" />
        <line x1="92" y1="20" x2="92" y2="230" />
        <line x1="136" y1="20" x2="136" y2="230" />
        <line x1="224" y1="20" x2="224" y2="230" />
        <line x1="268" y1="20" x2="268" y2="230" />
        <line x1="312" y1="20" x2="312" y2="230" />

        <line x1="20" y1="42" x2="340" y2="42" />
        <line x1="20" y1="86" x2="340" y2="86" />
        <line x1="20" y1="174" x2="340" y2="174" />
        <line x1="20" y1="218" x2="340" y2="218" />
      </g>

      {/* x és y tengely */}
      <line x1="20" y1="130" x2="340" y2="130" stroke="#64748b" strokeWidth="2" />
      <line x1="180" y1="230" x2="180" y2="20" stroke="#64748b" strokeWidth="2" />
      <text x="335" y="145" fontSize="12" fontWeight="bold" fill="#475569">x</text>
      <text x="188" y="30" fontSize="12" fontWeight="bold" fill="#475569">y</text>

      {/* Origó pont */}
      <circle cx="180" cy="130" r="3.5" fill="#1e293b" />
      <text x="168" y="145" fontSize="11" fontWeight="bold" fill="#64748b">O</text>

      {/* P(3; 2) -> (180 + 3*22, 130 - 2*22) = (246, 86) */}
      <circle cx="246" cy="86" r="5" fill="#3b82f6" />
      <text x="253" y="82" fontSize="12" fontWeight="bold" fill="#1d4ed8">P(3; 2)</text>

      {/* P_180(-3; -2) -> (180 - 66, 130 + 44) = (114, 174) */}
      <circle cx="114" cy="174" r="5" fill="#ef4444" />
      <text x="45" y="190" fontSize="11" fontWeight="bold" fill="#dc2626">P'(−3; −2) [180°]</text>
      <line x1="246" y1="86" x2="114" y2="174" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* P_90(-2; 3) -> (180 - 44, 130 - 66) = (136, 64) */}
      <circle cx="136" cy="64" r="5" fill="#10b981" />
      <text x="75" y="58" fontSize="11" fontWeight="bold" fill="#059669">P''(−2; 3) [+90°]</text>
      <line x1="180" y1="130" x2="136" y2="64" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="180" y1="130" x2="246" y2="86" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
};

