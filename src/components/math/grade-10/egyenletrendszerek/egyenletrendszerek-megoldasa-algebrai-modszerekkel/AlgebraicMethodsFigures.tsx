import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Egyenlő együtthatók (kieséses / eliminációs) módszer
export const EliminationMethodSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím doboz */}
      <rect x="20" y="12" width="280" height="30" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="32" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
        Egyenlő együtthatók módszere (Összeadás)
      </text>

      {/* 1. egyenlet */}
      <rect x="35" y="52" width="160" height="32" rx="6" fill="rgba(56, 189, 248, 0.1)" stroke="#38bdf8" strokeWidth="1.2" />
      <text x="45" y="73" fill="#e2e8f0" fontSize="13" fontWeight="bold" fontFamily="monospace">
        5x <tspan fill="#34d399">+ 7y</tspan> = 19
      </text>

      {/* 2. egyenlet */}
      <rect x="35" y="92" width="160" height="32" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="#ef4444" strokeWidth="1.2" />
      <text x="45" y="113" fill="#e2e8f0" fontSize="13" fontWeight="bold" fontFamily="monospace">
        2x <tspan fill="#f87171">− 7y</tspan> = −12
      </text>

      {/* Összeadás jele és nyíl */}
      <circle cx="215" cy="88" r="14" fill="#a855f7" />
      <text x="215" y="94" fill="#ffffff" fontSize="18" fontWeight="bold" textAnchor="middle">+</text>
      <text x="245" y="92" fill="#c084fc" fontSize="11" fontWeight="bold">Összeadjuk</text>

      {/* Vonal */}
      <line x1="30" y1="132" x2="290" y2="132" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />

      {/* Eredmény egyenlet */}
      <rect x="35" y="140" width="250" height="34" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
      <text x="45" y="162" fill="#a7f3d0" fontSize="13" fontWeight="bold" fontFamily="monospace">
        7x + <tspan fill="#94a3b8">0</tspan> = 7  ⟹  <tspan fill="#fde047">x = 1</tspan>
      </text>

      {/* Visszahelyettesítés magyarázat */}
      <rect x="20" y="182" width="280" height="26" rx="5" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="199" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">
        +7y és −7y kiejti egymást!  ⟹  y = (19 − 5·1) / 7 = 2
      </text>
    </svg>
  );
};

// 2. Behelyettesítő módszer folyamata
export const SubstitutionMethodSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="12" width="280" height="30" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="32" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">
        Behelyettesítő módszer (Kifejezés ➔ Beírás)
      </text>

      {/* 1. Lépés: Kifejezés doboz */}
      <rect x="25" y="52" width="130" height="60" rx="6" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="1.2" />
      <text x="90" y="70" fill="#d8b4fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Kifejezés (I-ből):</text>
      <text x="90" y="95" fill="#f1f5f9" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
        y = 7 − x
      </text>

      {/* Átvezető nyíl */}
      <path d="M 160 82 L 185 82" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow-sub)" />
      <text x="172" y="75" fill="#fbbf24" fontSize="16" textAnchor="middle">➔</text>

      {/* 2. Lépés: Behelyettesítés a II-be */}
      <rect x="185" y="52" width="110" height="60" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.2" />
      <text x="240" y="70" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">2. Beírás II-be:</text>
      <text x="240" y="88" fill="#e2e8f0" fontSize="10" fontFamily="monospace" textAnchor="middle">2x + y = 10</text>
      <text x="240" y="103" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">2x + (7−x) = 10</text>

      {/* 3. Lépés: Egyismeretlenes egyenlet megoldása */}
      <rect x="25" y="122" width="270" height="52" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
      <text x="40" y="142" fill="#a7f3d0" fontSize="11" fontWeight="bold">
        3. Egyismeretlenes egyenlet megoldása:
      </text>
      <text x="40" y="162" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="monospace">
        x + 7 = 10  ⟹  <tspan fill="#34d399">x = 3</tspan>  ⟹  <tspan fill="#60a5fa">y = 7 − 3 = 4</tspan>
      </text>

      {/* Megjegyzés */}
      <rect x="20" y="182" width="280" height="26" rx="5" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="199" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Megoldás: <tspan fill="#34d399" fontWeight="bold">(3; 4)</tspan> rendezett valós számpár ✓
      </text>
    </svg>
  );
};

// 3. Különleges algebrai esetek (Azonosság vs Ellentmondás)
export const AlgebraicSpecialCasesSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="12" width="280" height="30" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="32" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
        Különleges algebrai esetek felismerése
      </text>

      {/* Bal oldal: Ellentmondás */}
      <rect x="25" y="52" width="130" height="115" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" />
      <text x="90" y="72" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">ELLENTMONDÁS</text>
      <text x="90" y="92" fill="#f1f5f9" fontSize="10" fontFamily="monospace" textAnchor="middle">3x + y = 5</text>
      <text x="90" y="108" fill="#f1f5f9" fontSize="10" fontFamily="monospace" textAnchor="middle">6x + 2y = 1</text>
      <line x1="40" y1="116" x2="140" y2="116" stroke="#f87171" strokeWidth="1" />
      <text x="90" y="132" fill="#ef4444" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">0 = 9  (!)</text>
      <text x="90" y="152" fill="#fecaca" fontSize="10" fontWeight="bold" textAnchor="middle">Nincs megoldás (∅)</text>

      {/* Jobb oldal: Azonosság */}
      <rect x="165" y="52" width="130" height="115" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
      <text x="230" y="72" fill="#86efac" fontSize="11" fontWeight="bold" textAnchor="middle">AZONOSSÁG</text>
      <text x="230" y="92" fill="#f1f5f9" fontSize="10" fontFamily="monospace" textAnchor="middle">2x − y = 1</text>
      <text x="230" y="108" fill="#f1f5f9" fontSize="10" fontFamily="monospace" textAnchor="middle">4x − 2y = 2</text>
      <line x1="180" y1="116" x2="280" y2="116" stroke="#4ade80" strokeWidth="1" />
      <text x="230" y="132" fill="#10b981" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">0 = 0  (✓)</text>
      <text x="230" y="152" fill="#bbf7d0" fontSize="10" fontWeight="bold" textAnchor="middle">Végtelen sok mo.</text>

      {/* Alsó összehasonlítás */}
      <rect x="20" y="175" width="280" height="32" rx="5" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="195" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        0 = k (k≠0) ⟹ Párhuzamosak | 0 = 0 ⟹ Egybeesnek
      </text>
    </svg>
  );
};

// 4. Új ismeretlen bevezetése törtes egyenletrendszernél
export const AuxiliaryVariableSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="12" width="280" height="30" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="32" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
        Új ismeretlen bevezetése (Törtes rendszer)
      </text>

      {/* Eredeti törtes egyenletrendszer */}
      <rect x="25" y="52" width="125" height="75" rx="6" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1.2" />
      <text x="87" y="70" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">Eredeti (x, y ≠ 0):</text>
      <text x="87" y="93" fill="#ffffff" fontSize="12" fontFamily="monospace" textAnchor="middle">1/x + 1/y = 5</text>
      <text x="87" y="113" fill="#ffffff" fontSize="12" fontFamily="monospace" textAnchor="middle">2/x − 1/y = 1</text>

      {/* Transzformációs kártya közepén */}
      <rect x="165" y="52" width="130" height="75" rx="6" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.2" />
      <text x="230" y="70" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">Helyettesítés:</text>
      <text x="230" y="93" fill="#fbbf24" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">a = 1/x</text>
      <text x="230" y="113" fill="#fbbf24" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">b = 1/y</text>

      {/* Lineáris rendszer */}
      <rect x="25" y="135" width="270" height="42" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
      <text x="160" y="152" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
        Lineáris: a + b = 5 és 2a − b = 1  ⟹  a = 2, b = 3
      </text>
      <text x="160" y="168" fill="#34d399" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
        Visszafejtés: x = 1/a = 1/2 és y = 1/b = 1/3 ✓
      </text>

      {/* Alsó megjegyzés */}
      <rect x="20" y="185" width="280" height="24" rx="4" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="201" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Elkerülhető a szorzatok (xy) miatti másodfokú bonyodalom!
      </text>
    </svg>
  );
};

// 5. Háromismeretlenes lineáris egyenletrendszer kiküszöbölése (Gauss-elv)
export const ThreeVariablesSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="12" width="280" height="30" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="32" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">
        Háromismeretlenes rendszer (Lépcsős elimináció)
      </text>

      {/* 3 egyenlet 3 ismeretlennel */}
      <rect x="25" y="52" width="115" height="70" rx="6" fill="rgba(192, 132, 252, 0.15)" stroke="#c084fc" strokeWidth="1.2" />
      <text x="82" y="72" fill="#e9d5ff" fontSize="11" fontWeight="bold" textAnchor="middle">3 ismeretlen:</text>
      <text x="82" y="90" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">x, y, z</text>
      <text x="82" y="108" fill="#cbd5e1" fontSize="9" textAnchor="middle">(3 egyenlet)</text>

      {/* Nyíl lefelé */}
      <text x="155" y="85" fill="#f59e0b" fontSize="16">➔</text>

      {/* 2 egyenlet 2 ismeretlennel */}
      <rect x="180" y="52" width="115" height="70" rx="6" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1.2" />
      <text x="237" y="72" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">2 ismeretlen:</text>
      <text x="237" y="90" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">x, y</text>
      <text x="237" y="108" fill="#cbd5e1" fontSize="9" textAnchor="middle">(z kiküszöbölve)</text>

      {/* Végső lépés lefelé */}
      <rect x="25" y="132" width="270" height="45" rx="6" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
      <text x="160" y="150" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
        1 ismeretlen: y = 0 ⟹ x = 1 ⟹ z = 2x + y − 3 = −1
      </text>
      <text x="160" y="168" fill="#34d399" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
        Megoldás: (1; 0; −1) rendezett számhármas
      </text>

      {/* Alsó tanács */}
      <rect x="20" y="185" width="280" height="24" rx="4" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="201" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Visszahelyettesítéses láncolat: z ➔ y ➔ x
      </text>
    </svg>
  );
};

