import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Kétkarú mérlegelv szemléltetése: Egyenlet egyensúlya
export const EquationBalanceSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="2" />

      <text x="190" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#065f46" fontFamily="system-ui, sans-serif">
        A Mérlegelv: Bal oldal = Jobb oldal
      </text>

      {/* Állvány / Fulcrum */}
      <polygon points="190,120 175,160 205,160" fill="#059669" />
      <rect x="160" y="158" width="60" height="8" rx="3" fill="#047857" />
      <circle cx="190" cy="120" r="5" fill="#064e3b" />

      {/* Mérlegrúd (vízszintes) */}
      <line x1="60" y1="90" x2="320" y2="90" stroke="#047857" strokeWidth="6" strokeLinecap="round" />

      {/* Bal serpenyő zsinór és tálca */}
      <line x1="85" y1="90" x2="60" y2="130" stroke="#059669" strokeWidth="1.5" strokeDasharray="3,2" />
      <line x1="85" y1="90" x2="110" y2="130" stroke="#059669" strokeWidth="1.5" strokeDasharray="3,2" />
      <path d="M 50 130 Q 85 142 120 130 Z" fill="#34d399" stroke="#059669" strokeWidth="2" />

      {/* Jobb serpenyő zsinór és tálca */}
      <line x1="295" y1="90" x2="270" y2="130" stroke="#059669" strokeWidth="1.5" strokeDasharray="3,2" />
      <line x1="295" y1="90" x2="320" y2="130" stroke="#059669" strokeWidth="1.5" strokeDasharray="3,2" />
      <path d="M 260 130 Q 295 142 330 130 Z" fill="#34d399" stroke="#059669" strokeWidth="2" />

      {/* Bal oldali súlyok: 2x doboz + 3 kg */}
      <rect x="58" y="106" width="22" height="22" rx="4" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      <text x="69" y="122" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff" fontFamily="monospace">x</text>

      <rect x="83" y="106" width="22" height="22" rx="4" fill="#10b981" stroke="#047857" strokeWidth="1.5" />
      <text x="94" y="122" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff" fontFamily="monospace">x</text>

      <circle cx="94" cy="98" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
      <text x="94" y="102" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f" fontFamily="sans-serif">+3</text>

      {/* Jobb oldali súlyok: 11 kg */}
      <rect x="275" y="102" width="40" height="26" rx="6" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
      <text x="295" y="120" textAnchor="middle" fontSize="13" fontWeight="black" fill="#78350f" fontFamily="monospace">11</text>

      {/* Egyenlet felirat a mérleg felett */}
      <rect x="145" y="46" width="90" height="28" rx="8" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
      <text x="190" y="65" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#065f46" fontFamily="monospace">
        2x + 3 = 11
      </text>

      {/* Eredmény alul */}
      <text x="190" y="180" textAnchor="middle" fontSize="11" fontWeight="medium" fill="#047857" fontFamily="system-ui, sans-serif">
        Mindkét oldalból kivonunk 3-at, majd osztunk 2-vel: <tspan fontWeight="bold" fill="#064e3b">x = 4</tspan>
      </text>
    </svg>
  );
};

// 2. Egyenlet vs. Azonosság vs. Ellentmondás
export const EquationVsIdentitySvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2" />

      <text x="190" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#166534" fontFamily="system-ui, sans-serif">
        Egyenlőségek Három Típusa
      </text>

      {/* 1. Egyenlet kártya */}
      <g transform="translate(20, 48)">
        <rect width="105" height="130" rx="10" fill="#ffffff" stroke="#86efac" strokeWidth="1.5" />
        <rect width="105" height="24" rx="10" fill="#dcfce7" />
        <text x="52" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#166534" fontFamily="sans-serif">
          1. EGYENLET
        </text>
        <text x="52" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a" fontFamily="monospace">
          2x + 1 = 7
        </text>
        <path d="M 15 56 L 90 56" stroke="#e2e8f0" strokeWidth="1" />
        <text x="52" y="74" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="sans-serif">
          Bizonyos értékekre
        </text>
        <text x="52" y="90" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="sans-serif">
          igaz csak:
        </text>
        <rect x="25" y="100" width="55" height="20" rx="6" fill="#10b981" />
        <text x="52" y="114" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          x = 3
        </text>
      </g>

      {/* 2. Azonosság kártya */}
      <g transform="translate(137, 48)">
        <rect width="105" height="130" rx="10" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" />
        <rect width="105" height="24" rx="10" fill="#dbeafe" />
        <text x="52" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af" fontFamily="sans-serif">
          2. AZONOSSÁG
        </text>
        <text x="52" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a" fontFamily="monospace">
          2(x+1) = 2x+2
        </text>
        <path d="M 15 56 L 90 56" stroke="#e2e8f0" strokeWidth="1" />
        <text x="52" y="74" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="sans-serif">
          MINDEN valós
        </text>
        <text x="52" y="90" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="sans-serif">
          értékre igaz:
        </text>
        <rect x="20" y="100" width="65" height="20" rx="6" fill="#3b82f6" />
        <text x="52" y="114" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          M = ℝ
        </text>
      </g>

      {/* 3. Ellentmondás kártya */}
      <g transform="translate(254, 48)">
        <rect width="105" height="130" rx="10" fill="#ffffff" stroke="#fca5a5" strokeWidth="1.5" />
        <rect width="105" height="24" rx="10" fill="#fee2e2" />
        <text x="52" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b" fontFamily="sans-serif">
          3. ELLENTMONDÁS
        </text>
        <text x="52" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a" fontFamily="monospace">
          x + 3 = x + 8
        </text>
        <path d="M 15 56 L 90 56" stroke="#e2e8f0" strokeWidth="1" />
        <text x="52" y="74" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="sans-serif">
          Ebből 3 = 8 lenne!
        </text>
        <text x="52" y="90" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="sans-serif">
          Egyetlen értékre sem:
        </text>
        <rect x="25" y="100" width="55" height="20" rx="6" fill="#ef4444" />
        <text x="52" y="114" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          M = ∅
        </text>
      </g>
    </svg>
  );
};

// 3. A Gyök Ellenőrzése: Bal oldal vs. Jobb oldal
export const RootVerificationSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a" fontFamily="system-ui, sans-serif">
        A Gyök Ellenőrzése (x = 5 esetén)
      </text>

      {/* Egyenlet felül */}
      <rect x="110" y="38" width="160" height="24" rx="6" fill="#e2e8f0" />
      <text x="190" y="54" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b" fontFamily="monospace">
        3x - 4 = 2x + 1
      </text>

      {/* Bal oldal panel */}
      <g transform="translate(25, 70)">
        <rect width="150" height="75" rx="8" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
        <text x="75" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e40af" fontFamily="system-ui, sans-serif">
          Bal Oldal (B)
        </text>
        <text x="75" y="40" textAnchor="middle" fontSize="11" fill="#334155" fontFamily="monospace">
          B(5) = 3 · 5 - 4
        </text>
        <text x="75" y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#2563eb" fontFamily="monospace">
          B(5) = 11
        </text>
      </g>

      {/* Jobb oldal panel */}
      <g transform="translate(205, 70)">
        <rect width="150" height="75" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <text x="75" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534" fontFamily="system-ui, sans-serif">
          Jobb Oldal (J)
        </text>
        <text x="75" y="40" textAnchor="middle" fontSize="11" fill="#334155" fontFamily="monospace">
          J(5) = 2 · 5 + 1
        </text>
        <text x="75" y="60" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#16a34a" fontFamily="monospace">
          J(5) = 11
        </text>
      </g>

      {/* Összehasonlítás középen */}
      <circle cx="190" cy="107" r="14" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
      <text x="190" y="112" textAnchor="middle" fontSize="14" fontWeight="black" fill="#10b981" fontFamily="sans-serif">
        =
      </text>

      {/* Végső értékelés badge */}
      <rect x="80" y="156" width="220" height="24" rx="12" fill="#dcfce7" stroke="#86efac" strokeWidth="1.5" />
      <text x="190" y="172" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d" fontFamily="system-ui, sans-serif">
        ✓ B(5) = J(5) → x = 5 valódi gyök!
      </text>
    </svg>
  );
};

// 4. Grafikus egyenletmegoldás: Metszéspont leolvasása
export const GraphicalSolutionSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="2" />

      <text x="190" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b21a8" fontFamily="system-ui, sans-serif">
        Grafikus Megoldás: f(x) = g(x) Metszéspontja
      </text>

      {/* Koordináta-rendszer */}
      <g transform="translate(60, 35)">
        {/* Rács */}
        <defs>
          <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#f3e8ff" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="175" height="140" fill="url(#grid)" />

        {/* X és Y tengely */}
        <line x1="10" y1="110" x2="165" y2="110" stroke="#7e22ce" strokeWidth="1.5" />
        <polyline points="160,107 165,110 160,113" fill="none" stroke="#7e22ce" strokeWidth="1.5" />
        <text x="170" y="113" fontSize="10" fontWeight="bold" fill="#7e22ce" fontFamily="monospace">x</text>

        <line x1="35" y1="130" x2="35" y2="10" stroke="#7e22ce" strokeWidth="1.5" />
        <polyline points="32,15 35,10 38,15" fill="none" stroke="#7e22ce" strokeWidth="1.5" />
        <text x="32" y="8" fontSize="10" fontWeight="bold" fill="#7e22ce" fontFamily="monospace">y</text>

        {/* Tengely osztások: x = 1 (60), x = 2 (85), x = 3 (110) */}
        <text x="85" y="122" textAnchor="middle" fontSize="9" fill="#6b21a8" fontFamily="monospace">2</text>
        <line x1="85" y1="108" x2="85" y2="112" stroke="#7e22ce" strokeWidth="1" />

        {/* y = 3 magasság (60px) */}
        <text x="24" y="64" textAnchor="end" fontSize="9" fill="#6b21a8" fontFamily="monospace">3</text>
        <line x1="33" y1="60" x2="37" y2="60" stroke="#7e22ce" strokeWidth="1" />

        {/* Egyenes 1: f(x) = 2x - 1 (kék) (0, -1)->(35, 135) to (3, 5)->(110, 10) */}
        <line x1="45" y1="130" x2="120" y2="20" stroke="#2563eb" strokeWidth="2.5" />

        {/* Egyenes 2: g(x) = -x + 5 (narancs) (0, 5)->(35, 10) to (4, 1)->(135, 110) */}
        <line x1="35" y1="10" x2="145" y2="120" stroke="#ea580c" strokeWidth="2.5" />

        {/* Metszéspont vetítése */}
        <line x1="85" y1="60" x2="85" y2="110" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1="35" y1="60" x2="85" y2="60" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* Metszéspont pötty */}
        <circle cx="85" cy="60" r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
        <text x="96" y="55" fontSize="10" fontWeight="bold" fill="#581c87" fontFamily="sans-serif">M(2; 3)</text>
      </g>

      {/* Magyarázat jobb oldalon */}
      <g transform="translate(250, 48)">
        <rect width="115" height="120" rx="8" fill="#ffffff" stroke="#d8b4fe" strokeWidth="1" />
        <text x="57" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4a044e" fontFamily="sans-serif">
          Egyenlet:
        </text>
        <text x="57" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563eb" fontFamily="monospace">
          2x - 1 = -x + 5
        </text>

        <path d="M 10 42 L 105 42" stroke="#f3e8ff" strokeWidth="1" />

        <circle cx="18" cy="55" r="4" fill="#2563eb" />
        <text x="28" y="58" fontSize="9" fill="#1e293b" fontFamily="sans-serif">f(x) = 2x - 1</text>

        <circle cx="18" cy="73" r="4" fill="#ea580c" />
        <text x="28" y="76" fontSize="9" fill="#1e293b" fontFamily="sans-serif">g(x) = -x + 5</text>

        <rect x="10" y="86" width="95" height="24" rx="6" fill="#f3e8ff" />
        <text x="57" y="102" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#6b21a8" fontFamily="sans-serif">
          Megoldás: x = 2
        </text>
      </g>
    </svg>
  );
};

