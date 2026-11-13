import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Két mérőlombik összeöntése (Keverési törvény szemléltetése)
export const MixingBeakersSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="beakerGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="beakerGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="beakerGrad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Lombik 1: m1, w1 */}
      <path d="M 30 50 L 30 130 Q 30 140 40 140 L 70 140 Q 80 140 80 130 L 80 50 Z" stroke="#64748b" strokeWidth="2" fill="#ffffff" />
      <path d="M 32 85 L 32 130 Q 32 138 40 138 L 70 138 Q 78 138 78 130 L 78 85 Z" fill="url(#beakerGrad1)" />
      <text x="55" y="42" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">1. Oldat</text>
      <text x="55" y="105" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">m₁ = 200 g</text>
      <text x="55" y="120" fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">10%</text>

      {/* Plusz jel */}
      <circle cx="100" cy="95" r="10" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="100" y="100" fill="#475569" fontSize="14" fontWeight="bold" textAnchor="middle">+</text>

      {/* Lombik 2: m2, w2 */}
      <path d="M 120 50 L 120 130 Q 120 140 130 140 L 160 140 Q 170 140 170 130 L 170 50 Z" stroke="#64748b" strokeWidth="2" fill="#ffffff" />
      <path d="M 122 75 L 122 130 Q 122 138 130 138 L 160 138 Q 168 138 168 130 L 168 75 Z" fill="url(#beakerGrad2)" />
      <text x="145" y="42" fill="#047857" fontSize="9" fontWeight="bold" textAnchor="middle">2. Oldat</text>
      <text x="145" y="100" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">m₂ = 300 g</text>
      <text x="145" y="115" fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">30%</text>

      {/* Nyíl -> */}
      <path d="M 185 95 L 205 95" stroke="#0d9488" strokeWidth="2.5" />
      <polygon points="210,95 203,91 203,99" fill="#0d9488" />

      {/* Keverék Lombik 3: m_össz, w_új */}
      <path d="M 225 35 L 225 135 Q 225 148 238 148 L 282 148 Q 295 148 295 135 L 295 35 Z" stroke="#0f766e" strokeWidth="2.5" fill="#ffffff" />
      <path d="M 227 60 L 227 135 Q 227 146 238 146 L 282 146 Q 293 146 293 135 L 293 60 Z" fill="url(#beakerGrad3)" />
      <text x="260" y="28" fill="#0f766e" fontSize="9.5" fontWeight="black" textAnchor="middle">KEVERÉK</text>
      <text x="260" y="85" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">m = 500 g</text>
      <text x="260" y="105" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">22%</text>

      {/* Alsó egyenlet sáv */}
      <rect x="20" y="152" width="280" height="22" rx="5" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="160" y="167" fill="#15803d" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        Anyagmérleg: 200 · 0,10 + 300 · 0,30 = 500 · w ⟹ 20 + 90 = 110 = 500 · 0,22 ✓
      </text>
    </svg>
  );
};

// 2. Két cső közös munkája (Áramlási / feltöltési modell)
export const ParallelFlowTubesSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      {/* 1. Cső (felül balra) */}
      <rect x="25" y="15" width="90" height="18" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
      <text x="70" y="28" fill="#0369a1" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        1. Csap: t₁ = 3 h
      </text>
      <path d="M 115 24 L 145 24 L 145 55" stroke="#0284c7" strokeWidth="3" fill="none" strokeDasharray="3 2" />

      {/* 2. Cső (felül jobbra) */}
      <rect x="205" y="15" width="90" height="18" rx="4" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
      <text x="250" y="28" fill="#047857" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        2. Csap: t₂ = 6 h
      </text>
      <path d="M 205 24 L 175 24 L 175 55" stroke="#059669" strokeWidth="3" fill="none" strokeDasharray="3 2" />

      {/* Vízcseppek a beömlőknél */}
      <circle cx="145" cy="62" r="3" fill="#0284c7" />
      <circle cx="175" cy="62" r="3" fill="#059669" />

      {/* Közös medence / tartály */}
      <rect x="70" y="70" width="180" height="70" rx="8" fill="#ffffff" stroke="#334155" strokeWidth="2" />
      {/* Vízszint a tartályban */}
      <path d="M 72 105 Q 115 102 160 105 Q 205 108 248 105 L 248 138 Q 248 138 240 138 L 80 138 Q 72 138 72 138 Z" fill="#06b6d4" fillOpacity="0.4" />
      <line x1="72" y1="105" x2="248" y2="105" stroke="#0891b2" strokeWidth="1.5" />

      <text x="160" y="90" fill="#0f172a" fontSize="10" fontWeight="black" textAnchor="middle">
        KÖZÖS FELTÖLTÉS: T = ?
      </text>
      <text x="160" y="125" fill="#0e7490" fontSize="9" fontWeight="bold" textAnchor="middle">
        1/3 + 1/6 = 1/T ⟹ 3/6 = 1/2 = 1/T ⟹ T = 2 óra
      </text>

      {/* Összegző magyarázat */}
      <rect x="30" y="148" width="260" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="160" y="164" fill="#475569" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        Harmonikus modell: 1 óra alatt a medence 1/3 + 1/6 = 1/2 része telik meg!
      </text>
    </svg>
  );
};

// 3. Kétszeres hígítási modell (Másodfokúvá alakuló kísérleti egyenlet)
export const DilutionStepsSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 160"
      width={size}
      height={(size * 160) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="160" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {/* 1. Lépés kártya */}
      <rect x="15" y="15" width="85" height="100" rx="6" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
      <text x="57" y="32" fill="#0369a1" fontSize="8.5" fontWeight="bold" textAnchor="middle">0. Kiindulás</text>
      <rect x="25" y="45" width="65" height="40" rx="4" fill="#38bdf8" fillOpacity="0.8" />
      <text x="57" y="68" fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">c₀ = 100%</text>
      <text x="57" y="103" fill="#64748b" fontSize="7.5" textAnchor="middle">V = 10 liter</text>

      {/* Nyíl 1: -x liter oldat, +x liter víz */}
      <path d="M 104 65 L 118 65" stroke="#0d9488" strokeWidth="2" />
      <polygon points="122,65 116,62 116,68" fill="#0d9488" />
      <text x="112" y="55" fill="#0d9488" fontSize="7" fontWeight="bold" textAnchor="middle">1. Hígítás</text>

      {/* 2. Lépés kártya */}
      <rect x="124" y="15" width="85" height="100" rx="6" fill="#ffffff" stroke="#0d9488" strokeWidth="1.5" />
      <text x="166" y="32" fill="#0f766e" fontSize="8.5" fontWeight="bold" textAnchor="middle">1. Lépés után</text>
      <rect x="134" y="55" width="65" height="30" rx="4" fill="#2dd4bf" fillOpacity="0.7" />
      <text x="166" y="74" fill="#0f766e" fontSize="8" fontWeight="bold" textAnchor="middle">c₁ = c₀(1 - x/V)</text>
      <text x="166" y="103" fill="#64748b" fontSize="7.5" textAnchor="middle">Lineáris csökkenés</text>

      {/* Nyíl 2: újabb hígítás */}
      <path d="M 213 65 L 227 65" stroke="#0d9488" strokeWidth="2" />
      <polygon points="231,65 225,62 225,68" fill="#0d9488" />
      <text x="221" y="55" fill="#0d9488" fontSize="7" fontWeight="bold" textAnchor="middle">2. Hígítás</text>

      {/* 3. Lépés kártya: Másodfokú */}
      <rect x="233" y="15" width="75" height="100" rx="6" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
      <text x="270" y="32" fill="#b45309" fontSize="8.5" fontWeight="bold" textAnchor="middle">2. Lépés után</text>
      <rect x="241" y="65" width="59" height="20" rx="4" fill="#fcd34d" fillOpacity="0.8" />
      <text x="270" y="79" fill="#78350f" fontSize="7.5" fontWeight="black" textAnchor="middle">c₂ = 64%</text>
      <text x="270" y="103" fill="#b45309" fontSize="7" fontWeight="bold" textAnchor="middle">(1 - x/V)²</text>

      {/* Alsó képlet doboz */}
      <rect x="15" y="124" width="293" height="26" rx="5" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1" />
      <text x="160" y="141" fill="#92400e" fontSize="8" fontWeight="bold" textAnchor="middle">
        Másodfokú egyenlet: (1 - x/10)² = 0,64 ⟹ 1 - x/10 = 0,8 ⟹ x = 2 liter!
      </text>
    </svg>
  );
};

// 4. Műszaki formulák rendezése (Párhuzamos ellenállás híd)
export const TechnicalFormulaBridgeSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 150"
      width={size}
      height={(size * 150) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="10" y="10" width="300" height="130" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="160" y="28" fill="#1e293b" fontSize="9.5" fontWeight="black" textAnchor="middle">
        PÁRHUZAMOS ELEKTROMOS ELLENÁLLÁSOK ÉS LENCSETÖRVÉNY
      </text>

      {/* Bal oldali áramkör ábra */}
      <path d="M 25 75 L 50 75" stroke="#3b82f6" strokeWidth="2" />
      <path d="M 50 75 L 50 50 L 70 50" stroke="#3b82f6" strokeWidth="2" />
      <path d="M 50 75 L 50 100 L 70 100" stroke="#3b82f6" strokeWidth="2" />

      {/* R1 doboz */}
      <rect x="70" y="42" width="45" height="16" rx="3" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="92" y="54" fill="#1d4ed8" fontSize="8" fontWeight="bold" textAnchor="middle">R₁</text>

      {/* R2 doboz */}
      <rect x="70" y="92" width="45" height="16" rx="3" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="92" y="104" fill="#1d4ed8" fontSize="8" fontWeight="bold" textAnchor="middle">R₂</text>

      <path d="M 115 50 L 135 50 L 135 75" stroke="#3b82f6" strokeWidth="2" />
      <path d="M 115 100 L 135 100 L 135 75" stroke="#3b82f6" strokeWidth="2" />
      <path d="M 135 75 L 150 75" stroke="#3b82f6" strokeWidth="2" />

      {/* Jobb oldali algebrai rendezési formula */}
      <rect x="160" y="40" width="140" height="85" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="230" y="55" fill="#166534" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        Eredeti törtes alak:
      </text>
      <text x="230" y="70" fill="#15803d" fontSize="9" fontWeight="black" textAnchor="middle">
        1/R_e = 1/R₁ + 1/R₂
      </text>
      <line x1="170" y1="78" x2="290" y2="78" stroke="#bbf7d0" strokeWidth="1" />
      <text x="230" y="93" fill="#166534" fontSize="8" textAnchor="middle">
        Közös nevező és reciprok:
      </text>
      <text x="230" y="112" fill="#15803d" fontSize="10.5" fontWeight="black" textAnchor="middle">
        R_e = (R₁ · R₂) / (R₁ + R₂)
      </text>
    </svg>
  );
};

// 5. Keverési és mérési táblázat modell
export const LabBalanceBeakerSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 140"
      width={size}
      height={(size * 140) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="10" y="10" width="300" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="160" y="27" fill="#0f172a" fontSize="9.5" fontWeight="black" textAnchor="middle">
        A KEVERÉSI TÁBLÁZAT 3 OSZLOPOS ARANYSZABÁLYA
      </text>

      {/* Táblázat fejlécek */}
      <rect x="25" y="38" width="90" height="22" rx="4" fill="#e2e8f0" />
      <text x="70" y="52" fill="#334155" fontSize="8.5" fontWeight="bold" textAnchor="middle">Össztömeg (m)</text>

      <rect x="120" y="38" width="75" height="22" rx="4" fill="#e2e8f0" />
      <text x="157" y="52" fill="#334155" fontSize="8.5" fontWeight="bold" textAnchor="middle">Töménység (w)</text>

      <rect x="200" y="38" width="95" height="22" rx="4" fill="#0d9488" />
      <text x="247" y="52" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">Oldott anyag (m·w)</text>

      {/* Sor 1 */}
      <text x="70" y="78" fill="#475569" fontSize="8" textAnchor="middle">m₁</text>
      <text x="157" y="78" fill="#475569" fontSize="8" textAnchor="middle">w₁</text>
      <text x="247" y="78" fill="#0f766e" fontSize="8.5" fontWeight="bold" textAnchor="middle">m₁ · w₁</text>

      {/* Sor 2 */}
      <text x="70" y="96" fill="#475569" fontSize="8" textAnchor="middle">m₂</text>
      <text x="157" y="96" fill="#475569" fontSize="8" textAnchor="middle">w₂</text>
      <text x="247" y="96" fill="#0f766e" fontSize="8.5" fontWeight="bold" textAnchor="middle">m₂ · w₂</text>

      {/* Összeg sor */}
      <line x1="25" y1="104" x2="295" y2="104" stroke="#0d9488" strokeWidth="1.5" />
      <text x="70" y="119" fill="#0f172a" fontSize="8.5" fontWeight="black" textAnchor="middle">m₁ + m₂</text>
      <text x="157" y="119" fill="#0f172a" fontSize="8.5" fontWeight="black" textAnchor="middle">w_új</text>
      <text x="247" y="119" fill="#0f766e" fontSize="9" fontWeight="black" textAnchor="middle">(m₁ + m₂) · w_új</text>
    </svg>
  );
};

