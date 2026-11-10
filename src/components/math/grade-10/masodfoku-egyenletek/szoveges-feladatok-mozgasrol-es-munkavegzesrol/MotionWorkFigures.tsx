import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Mozgásos Menetidő és Sebességkülönbség SVG
 * Szemlélteti a két jármű haladását azonos s úton, eltérő v és v + Δv sebességgel,
 * valamint a Δt időkülönbséget: s/v - s/(v + Δv) = Δt.
 */
export const MotionTimelineSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 250"
      width={size}
      height={(size * 250) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fastGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="slowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <filter id="carShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Keret */}
      <rect x="8" y="8" width="504" height="234" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Távolság tengely sáv */}
      <line x1="60" y1="50" x2="460" y2="50" stroke="#94A3B8" strokeWidth="3" strokeDasharray="6 4" />
      <circle cx="60" cy="50" r="7" fill="#0F172A" />
      <circle cx="460" cy="50" r="7" fill="#0F172A" />
      <text x="60" y="35" fill="#0F172A" fontSize="12" fontWeight="900" textAnchor="middle">A Város (Start)</text>
      <text x="460" y="35" fill="#0F172A" fontSize="12" fontWeight="900" textAnchor="middle">B Város (Cél)</text>
      <rect x="210" y="32" width="100" height="24" rx="6" fill="#0F172A" />
      <text x="260" y="48" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">s = állandó út</text>

      {/* 1. Jármű: Lassabb (v sebesség, t₁ = s/v idő) */}
      <g filter="url(#carShadow)">
        <rect x="60" y="80" width="310" height="52" rx="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <rect x="70" y="90" width="85" height="32" rx="6" fill="url(#slowGrad)" />
        <text x="112" y="110" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">1. Lassabb (v)</text>
        <text x="235" y="110" fill="#92400E" fontSize="12" fontWeight="bold">
          Menetidő: t₁ = s / v &nbsp;(hosszabb idő)
        </text>
      </g>

      {/* 2. Jármű: Gyorsabb (v + Δv sebesség, t₂ = s/(v + Δv) idő) */}
      <g filter="url(#carShadow)">
        <rect x="60" y="145" width="400" height="52" rx="10" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x="70" y="155" width="105" height="32" rx="6" fill="url(#fastGrad)" />
        <text x="122" y="175" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">2. Gyorsabb (v + Δv)</text>
        <text x="255" y="175" fill="#1E40AF" fontSize="12" fontWeight="bold">
          Menetidő: t₂ = s / (v + Δv) &nbsp;(rövidebb idő)
        </text>
      </g>

      {/* Alsó képlet és időkülönbség sáv */}
      <rect x="60" y="208" width="400" height="28" rx="6" fill="#F0FDF4" stroke="#86EFAC" />
      <text x="260" y="226" fill="#166534" fontSize="11" fontWeight="900" textAnchor="middle">
        Alapösszefüggés: t₁ - t₂ = Δt  ⟹  s / v - s / (v + Δv) = Δt
      </text>
    </svg>
  );
};

/**
 * 2. Folyami Hajózás (Folyásirányban és szemben) SVG
 * Sebességek összeadódása és kivonódása:
 * Folyásirányban: v_hajó + v_folyó, Folyással szemben: v_hajó - v_folyó.
 */
export const RiverCurrentSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 230"
      width={size}
      height={(size * 230) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <filter id="riverShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Keret */}
      <rect x="8" y="8" width="504" height="214" rx="14" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.5" />

      {/* Folyó sáv háttér */}
      <rect x="30" y="30" width="460" height="42" rx="8" fill="url(#riverGrad)" />
      <text x="260" y="56" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
        Folyó sodrása ➔ ➔ ➔ &nbsp; v_folyó sebességgel jobbra
      </text>

      {/* 1. Eset: Folyásirányban (lefelé haladva) */}
      <g filter="url(#riverShadow)">
        <rect x="30" y="85" width="220" height="90" rx="10" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" />
        <rect x="40" y="95" width="200" height="24" rx="5" fill="#059669" />
        <text x="140" y="111" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          1. Folyásirányban (segít a víz)
        </text>
        <text x="140" y="140" fill="#065F46" fontSize="14" fontWeight="900" textAnchor="middle">
          v_eredő = v + v_f
        </text>
        <text x="140" y="162" fill="#047857" fontSize="11" textAnchor="middle">
          Idő: t_le = s / (v + v_f)
        </text>
      </g>

      {/* 2. Eset: Folyással szemben (felfelé haladva) */}
      <g filter="url(#riverShadow)">
        <rect x="270" y="85" width="220" height="90" rx="10" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1.5" />
        <rect x="280" y="95" width="200" height="24" rx="5" fill="#DC2626" />
        <text x="380" y="111" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          2. Folyással szemben (fékez)
        </text>
        <text x="380" y="140" fill="#991B1B" fontSize="14" fontWeight="900" textAnchor="middle">
          v_eredő = v - v_f
        </text>
        <text x="380" y="162" fill="#B91C1C" fontSize="11" textAnchor="middle">
          Idő: t_fel = s / (v - v_f)
        </text>
      </g>

      {/* Alsó oda-vissza összegző képlet */}
      <rect x="30" y="185" width="460" height="28" rx="6" fill="#FFFFFF" stroke="#CBD5E1" />
      <text x="260" y="203" fill="#1E293B" fontSize="10.5" fontWeight="bold" textAnchor="middle">
        Teljes oda-vissza út ideje: T = s / (v + v_f) + s / (v - v_f)  ⟹  Közös nevező: v² - v_f²
      </text>
    </svg>
  );
};

/**
 * 3. Együttes Munkavégzés és Csövek SVG
 * Medence töltése két csővel: 1/t₁ + 1/t₂ = 1/T_közös.
 */
export const WorkRatePipesSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 230"
      width={size}
      height={(size * 230) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <filter id="pipeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Keret */}
      <rect x="8" y="8" width="504" height="214" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Bal oldali medence grafika */}
      <rect x="35" y="40" width="130" height="135" rx="8" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
      {/* Víz kitöltés */}
      <rect x="37" y="90" width="126" height="83" rx="6" fill="url(#waterGrad)" opacity="0.8" />
      <line x1="37" y1="90" x2="163" y2="90" stroke="#0284C7" strokeWidth="2" strokeDasharray="4 2" />
      <text x="100" y="135" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
        Egész munka = 1
      </text>
      <text x="100" y="155" fill="#E0F2FE" fontSize="10" textAnchor="middle">
        (1 teli medence)
      </text>

      {/* Jobb oldali oszlopok: Teljesítmények összegzése */}
      <g filter="url(#pipeShadow)">
        <rect x="185" y="35" width="305" height="42" rx="8" fill="#EFF6FF" stroke="#93C5FD" />
        <text x="200" y="60" fill="#1D4ED8" fontSize="11" fontWeight="bold">„A” Cső / Munkás:</text>
        <text x="360" y="60" fill="#1E40AF" fontSize="11" fontWeight="900">
          Teljesítmény: P₁ = 1 / t₁
        </text>
      </g>

      <g filter="url(#pipeShadow)">
        <rect x="185" y="87" width="305" height="42" rx="8" fill="#FDF4FF" stroke="#F0ABFC" />
        <text x="200" y="112" fill="#A21CAF" fontSize="11" fontWeight="bold">„B” Cső / Munkás:</text>
        <text x="360" y="112" fill="#86198F" fontSize="11" fontWeight="900">
          Teljesítmény: P₂ = 1 / (t₁ + d)
        </text>
      </g>

      <g filter="url(#pipeShadow)">
        <rect x="185" y="139" width="305" height="42" rx="8" fill="#ECFDF5" stroke="#6EE7B7" />
        <text x="200" y="164" fill="#047857" fontSize="11" fontWeight="bold">Együttes Teljesítmény:</text>
        <text x="360" y="164" fill="#065F46" fontSize="11" fontWeight="900">
          P_össz = 1 / T_közös
        </text>
      </g>

      {/* Alsó összegezett egyenlet */}
      <rect x="35" y="188" width="455" height="28" rx="6" fill="#1E293B" />
      <text x="262" y="206" fill="#38BDF8" fontSize="11" fontWeight="bold" textAnchor="middle">
        Együttes munkavégzés törvénye: 1 / t₁ + 1 / (t₁ + d) = 1 / T_közös
      </text>
    </svg>
  );
};

/**
 * 4. Szöveges Feladatok Modellezési Protokollja SVG
 * 1. Ismeretlen kijelölése -> 2. Törtes egyenlet felírása -> 3. Másodfokú rendezés -> 4. Realitás szűrés (t > 0, v > 0).
 */
export const MotionWorkModelingProtocolSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 230"
      width={size}
      height={(size * 230) / 500}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="protoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Keret */}
      <rect x="8" y="8" width="484" height="214" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* 4 Lépéskártya */}
      {/* 1. Lépés */}
      <g filter="url(#protoShadow)">
        <rect x="20" y="25" width="105" height="180" rx="10" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" />
        <circle cx="72" cy="48" r="15" fill="#3B82F6" />
        <text x="72" y="54" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">1</text>
        <text x="72" y="80" fill="#1D4ED8" fontSize="11" fontWeight="bold" textAnchor="middle">Ismeretlen</text>
        <text x="72" y="105" fill="#334155" fontSize="9.5" textAnchor="middle">v sebesség vagy</text>
        <text x="72" y="120" fill="#334155" fontSize="9.5" textAnchor="middle">t idő rögzítése</text>
        <rect x="28" y="140" width="89" height="28" rx="5" fill="#DBEAFE" />
        <text x="72" y="158" fill="#1E40AF" fontSize="9" fontWeight="bold" textAnchor="middle">Kikötés: v, t &gt; 0</text>
      </g>

      {/* 2. Lépés */}
      <g filter="url(#protoShadow)">
        <rect x="135" y="25" width="105" height="180" rx="10" fill="#ECFDF5" stroke="#6EE7B7" strokeWidth="1.5" />
        <circle cx="187" cy="48" r="15" fill="#10B981" />
        <text x="187" y="54" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">2</text>
        <text x="187" y="80" fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">Időegyenlet</text>
        <text x="187" y="105" fill="#334155" fontSize="9.5" textAnchor="middle">t = s / v vagy</text>
        <text x="187" y="120" fill="#334155" fontSize="9.5" textAnchor="middle">P = 1 / t felírása</text>
        <rect x="143" y="140" width="89" height="28" rx="5" fill="#D1FAE5" />
        <text x="187" y="158" fill="#065F46" fontSize="9" fontWeight="bold" textAnchor="middle">Törtes alak</text>
      </g>

      {/* 3. Lépés */}
      <g filter="url(#protoShadow)">
        <rect x="250" y="25" width="115" height="180" rx="10" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" />
        <circle cx="307" cy="48" r="15" fill="#F59E0B" />
        <text x="307" y="54" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">3</text>
        <text x="307" y="80" fill="#B45309" fontSize="11" fontWeight="bold" textAnchor="middle">Beszorzás</text>
        <text x="307" y="105" fill="#334155" fontSize="9.5" textAnchor="middle">Közös nevezővel</text>
        <text x="307" y="120" fill="#334155" fontSize="9.5" textAnchor="middle">való beszorzás</text>
        <rect x="258" y="140" width="99" height="28" rx="5" fill="#FEF3C7" />
        <text x="307" y="158" fill="#92400E" fontSize="9" fontWeight="bold" textAnchor="middle">ax² + bx + c = 0</text>
      </g>

      {/* 4. Lépés */}
      <g filter="url(#protoShadow)">
        <rect x="375" y="25" width="105" height="180" rx="10" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.5" />
        <circle cx="427" cy="48" r="15" fill="#EF4444" />
        <text x="427" y="54" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">4</text>
        <text x="427" y="80" fill="#B91C1C" fontSize="11" fontWeight="bold" textAnchor="middle">Gyökszűrés</text>
        <text x="427" y="105" fill="#334155" fontSize="9.5" textAnchor="middle">Negatív gyök</text>
        <text x="427" y="120" fill="#334155" fontSize="9.5" textAnchor="middle">elvettetése!</text>
        <rect x="383" y="140" width="89" height="28" rx="5" fill="#FEE2E2" />
        <text x="427" y="158" fill="#991B1B" fontSize="9" fontWeight="bold" textAnchor="middle">v &gt; 0, t &gt; 0</text>
      </g>
    </svg>
  );
};

