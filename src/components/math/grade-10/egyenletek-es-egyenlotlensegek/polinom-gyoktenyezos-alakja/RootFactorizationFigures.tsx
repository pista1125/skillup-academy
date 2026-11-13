import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Gyöktényezős alak képlete kiemelt 'a' főegyütthatóval
export const RootFactorFormulaSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#f8fafc" />

      {/* Címke */}
      <text x="160" y="20" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        A GYÖKTÉNYEZŐS ALAK ALAPKÉPLETE
      </text>

      {/* Kiemelt képlet doboz */}
      <rect x="25" y="35" width="270" height="60" rx="8" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="160" y="72" fill="#581c87" fontSize="18" fontWeight="black" textAnchor="middle">
        ax² + bx + c = <tspan fill="#d97706">a</tspan>(x - <tspan fill="#2563eb">x₁</tspan>)(x - <tspan fill="#16a34a">x₂</tspan>)
      </text>

      {/* Magyarázó nyilak és kártyák */}
      <rect x="20" y="108" width="85" height="58" rx="6" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1" />
      <text x="62" y="124" fill="#92400e" fontSize="9" fontWeight="black" textAnchor="middle">a = FŐEGYÜTTHATÓ</text>
      <text x="62" y="138" fill="#78350f" fontSize="7.5" textAnchor="middle">Kötelezően kiemelendő,</text>
      <text x="62" y="150" fill="#78350f" fontSize="7.5" textAnchor="middle">ha a ≠ 1!</text>

      <rect x="117" y="108" width="85" height="58" rx="6" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
      <text x="160" y="124" fill="#1e40af" fontSize="9" fontWeight="black" textAnchor="middle">x₁ = 1. GYÖK</text>
      <text x="160" y="138" fill="#1e3a8a" fontSize="7.5" textAnchor="middle">ax² + bx + c = 0</text>
      <text x="160" y="150" fill="#1e3a8a" fontSize="7.5" textAnchor="middle">első megoldása</text>

      <rect x="214" y="108" width="85" height="58" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="256" y="124" fill="#166534" fontSize="9" fontWeight="black" textAnchor="middle">x₂ = 2. GYÖK</text>
      <text x="256" y="138" fill="#14532d" fontSize="7.5" textAnchor="middle">ax² + bx + c = 0</text>
      <text x="256" y="150" fill="#14532d" fontSize="7.5" textAnchor="middle">második megoldása</text>
    </svg>
  );
};

// 2. Az elfelejtett 'a' főegyüttható csapdája
export const MissingLeadingCoeffTrapSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#f8fafc" />

      {/* Címke */}
      <text x="160" y="20" fill="#991b1b" fontSize="10" fontWeight="black" textAnchor="middle">
        ⚠ A LEGGYAKORIBB ÉRETTSÉGI CSAPDA: AZ 'a' ELHAGYÁSA
      </text>

      {/* Bal: HIBÁS alak */}
      <rect x="15" y="34" width="140" height="134" rx="6" fill="#fef2f2" stroke="#f87171" strokeWidth="1.2" />
      <text x="85" y="52" fill="#b91c1c" fontSize="9" fontWeight="black" textAnchor="middle">❌ HIBÁS SZORZAT</text>
      <text x="85" y="72" fill="#1e293b" fontSize="9" fontFamily="monospace" textAnchor="middle">2x² - 8x + 6</text>
      <text x="85" y="90" fill="#475569" fontSize="8" textAnchor="middle">Gyökök: x₁ = 1, x₂ = 3</text>
      <rect x="25" y="100" width="120" height="26" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
      <text x="85" y="117" fill="#dc2626" fontSize="9.5" fontWeight="black" textAnchor="middle">(x - 1)(x - 3)</text>
      <text x="85" y="142" fill="#991b1b" fontSize="7.5" fontWeight="bold" textAnchor="middle">HIBA: Kibontva csak</text>
      <text x="85" y="154" fill="#991b1b" fontSize="7.5" fontWeight="bold" textAnchor="middle">x² - 4x + 3 lenne!</text>

      {/* Jobb: HELYES alak */}
      <rect x="165" y="34" width="140" height="134" rx="6" fill="#f0fdf4" stroke="#4ade80" strokeWidth="1.2" />
      <text x="235" y="52" fill="#15803d" fontSize="9" fontWeight="black" textAnchor="middle">✓ HELYES GYÖKTÉNYEZŐS</text>
      <text x="235" y="72" fill="#1e293b" fontSize="9" fontFamily="monospace" textAnchor="middle">2x² - 8x + 6</text>
      <text x="235" y="90" fill="#475569" fontSize="8" textAnchor="middle">Kiemeljük az a = 2-t:</text>
      <rect x="175" y="100" width="120" height="26" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="235" y="117" fill="#15803d" fontSize="9.5" fontWeight="black" textAnchor="middle">2 · (x - 1)(x - 3)</text>
      <text x="235" y="142" fill="#166534" fontSize="7.5" fontWeight="bold" textAnchor="middle">TÖKÉLETES: Kibontva</text>
      <text x="235" y="154" fill="#166534" fontSize="7.5" fontWeight="bold" textAnchor="middle">2(x² - 4x + 3) = 2x²-8x+6!</text>
    </svg>
  );
};

// 3. Tört egyszerűsítése és kikötés megőrzése
export const FractionSimplificationSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#f8fafc" />

      {/* Címke */}
      <text x="160" y="20" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        ALGEBRAI TÖRT EGYSZERŰSÍTÉSE GYÖKTÉNYEZŐKKEL
      </text>

      {/* Eredeti tört */}
      <rect x="25" y="35" width="270" height="85" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />

      {/* Számláló és nevező levezetése */}
      <text x="50" y="62" fill="#1e293b" fontSize="10" fontFamily="monospace">x² - 5x + 6</text>
      <line x1="45" y1="70" x2="125" y2="70" stroke="#1e293b" strokeWidth="1.2" />
      <text x="70" y="86" fill="#1e293b" fontSize="10" fontFamily="monospace">x - 3</text>

      <text x="140" y="74" fill="#6366f1" fontSize="14" fontWeight="bold">=</text>

      {/* Gyöktényezős tört áthúzással */}
      <text x="160" y="62" fill="#2563eb" fontSize="10" fontFamily="monospace">
        (x - 2)<tspan fill="#ef4444">(x - 3)</tspan>
      </text>
      {/* Piros áthúzó vonal fent */}
      <line x1="205" y1="56" x2="250" y2="60" stroke="#ef4444" strokeWidth="1.8" />

      <line x1="160" y1="70" x2="255" y2="70" stroke="#1e293b" strokeWidth="1.2" />

      <text x="195" y="86" fill="#ef4444" fontSize="10" fontFamily="monospace">(x - 3)</text>
      {/* Piros áthúzó vonal lent */}
      <line x1="195" y1="80" x2="240" y2="84" stroke="#ef4444" strokeWidth="1.8" />

      <text x="268" y="74" fill="#16a34a" fontSize="14" fontWeight="bold">=</text>
      <text x="282" y="74" fill="#15803d" fontSize="12" fontWeight="black">x - 2</text>

      {/* Kikötési felhívás lent */}
      <rect x="25" y="130" width="270" height="38" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="160" y="146" fill="#b45309" fontSize="8.5" fontWeight="black" textAnchor="middle">
        KIKÖTÉS: x - 3 ≠ 0 ⟹ x ≠ 3 !
      </text>
      <text x="160" y="159" fill="#78350f" fontSize="7.5" textAnchor="middle">
        Az egyszerűsítés után kapott (x - 2) kifejezésben is tilos x = 3-at behelyettesíteni!
      </text>
    </svg>
  );
};

// 4. A diszkrimináns 3 esete a felbonthatóság szempontjából
export const DiscriminantCasesFactorSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#f8fafc" />

      {/* Címke */}
      <text x="160" y="20" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        A DISZKRIMINÁNS ÉS A SZORZATTÁ ALAKÍTHATÓSÁG
      </text>

      {/* 1. D > 0 */}
      <rect x="15" y="34" width="90" height="132" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" />
      <text x="60" y="52" fill="#166534" fontSize="9.5" fontWeight="black" textAnchor="middle">D &gt; 0</text>
      <text x="60" y="68" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">2 különböző gyök</text>
      <line x1="25" y1="76" x2="95" y2="76" stroke="#bbf7d0" strokeWidth="1" />
      <text x="60" y="96" fill="#1e293b" fontSize="8" fontWeight="black" textAnchor="middle">SZORZATALAK:</text>
      <text x="60" y="114" fill="#16a34a" fontSize="8" fontFamily="monospace" textAnchor="middle">a(x - x₁)(x - x₂)</text>
      <text x="60" y="142" fill="#475569" fontSize="7" textAnchor="middle">Két különböző</text>
      <text x="60" y="152" fill="#475569" fontSize="7" textAnchor="middle">valós tényező</text>

      {/* 2. D = 0 */}
      <rect x="115" y="34" width="90" height="132" rx="6" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.2" />
      <text x="160" y="52" fill="#1e40af" fontSize="9.5" fontWeight="black" textAnchor="middle">D = 0</text>
      <text x="160" y="68" fill="#2563eb" fontSize="8" fontWeight="bold" textAnchor="middle">1 kettős gyök</text>
      <line x1="125" y1="76" x2="195" y2="76" stroke="#bfdbfe" strokeWidth="1" />
      <text x="160" y="96" fill="#1e293b" fontSize="8" fontWeight="black" textAnchor="middle">TELJES NÉGYZET:</text>
      <text x="160" y="114" fill="#2563eb" fontSize="8.5" fontFamily="monospace" textAnchor="middle">a(x - x₀)²</text>
      <text x="160" y="142" fill="#475569" fontSize="7" textAnchor="middle">Azonos tényezők</text>
      <text x="160" y="152" fill="#475569" fontSize="7" textAnchor="middle">négyzete</text>

      {/* 3. D < 0 */}
      <rect x="215" y="34" width="90" height="132" rx="6" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.2" />
      <text x="260" y="52" fill="#991b1b" fontSize="9.5" fontWeight="black" textAnchor="middle">D &lt; 0</text>
      <text x="260" y="68" fill="#dc2626" fontSize="8" fontWeight="bold" textAnchor="middle">Nincs valós gyök</text>
      <line x1="225" y1="76" x2="295" y2="76" stroke="#fecaca" strokeWidth="1" />
      <text x="260" y="96" fill="#991b1b" fontSize="8" fontWeight="black" textAnchor="middle">NEM BONTHATÓ</text>
      <text x="260" y="114" fill="#b91c1c" fontSize="8" fontStyle="italic" textAnchor="middle">valós tényezőkre</text>
      <text x="260" y="142" fill="#475569" fontSize="7" textAnchor="middle">Prímpolinom a</text>
      <text x="260" y="152" fill="#475569" fontSize="7" textAnchor="middle">valós számokon</text>
    </svg>
  );
};

// 5. Egyenlet alkotása adott gyökökből
export const ConstructEquationFromRootsSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#f8fafc" />

      {/* Címke */}
      <text x="160" y="20" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        EGYENLET FELÍRÁSA ADOTT GYÖKÖKBŐL
      </text>

      {/* Folyamat lépései */}
      {/* 1. Lépés: Adott gyökök */}
      <rect x="20" y="36" width="75" height="52" rx="6" fill="#ede9fe" stroke="#a78bfa" strokeWidth="1" />
      <text x="57" y="52" fill="#5b21b6" fontSize="8" fontWeight="black" textAnchor="middle">ADOTT GYÖKÖK</text>
      <text x="57" y="70" fill="#6d28d9" fontSize="10" fontWeight="black" textAnchor="middle">x₁ és x₂</text>

      <path d="M 100 62 L 115 62" stroke="#6b7280" strokeWidth="1.5" markerEnd="url(#arrow)" />

      {/* 2. Lépés: Gyöktényezős alak */}
      <rect x="120" y="36" width="85" height="52" rx="6" fill="#fdf4ff" stroke="#f0abfc" strokeWidth="1" />
      <text x="162" y="52" fill="#86198f" fontSize="8" fontWeight="black" textAnchor="middle">SZORZATALAK</text>
      <text x="162" y="70" fill="#a21caf" fontSize="8" fontFamily="monospace" textAnchor="middle">(x - x₁)(x - x₂) = 0</text>

      <path d="M 210 62 L 225 62" stroke="#6b7280" strokeWidth="1.5" />

      {/* 3. Lépés: Normál alak kibontva */}
      <rect x="230" y="36" width="75" height="52" rx="6" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1" />
      <text x="267" y="52" fill="#065f46" fontSize="8" fontWeight="black" textAnchor="middle">NORMÁL ALAK</text>
      <text x="267" y="70" fill="#047857" fontSize="8" fontFamily="monospace" textAnchor="middle">x² - px + q = 0</text>

      {/* Gyakorlati példa doboz */}
      <rect x="20" y="102" width="285" height="66" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
      <text x="35" y="120" fill="#1e293b" fontSize="8.5" fontWeight="black">
        PÉLDA: Készíts másodfokú egyenletet x₁ = -2 és x₂ = 5 gyökökkel!
      </text>
      <text x="35" y="136" fill="#4f46e5" fontSize="8.5" fontFamily="monospace">
        (x - (-2))(x - 5) = (x + 2)(x - 5) = 0
      </text>
      <text x="35" y="154" fill="#16a34a" fontSize="9" fontWeight="black" fontFamily="monospace">
        Kibontva: x² - 3x - 10 = 0
      </text>
    </svg>
  );
};

