import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Csapatverseny staféta állomások
export const TeamChallengeRelaySvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#fdf2f8" />

      {/* Címke */}
      <text x="160" y="20" fill="#9d174d" fontSize="10" fontWeight="black" textAnchor="middle">
        KOOPERATÍV VERSENYSTAFÉTA (4 ÁLLOMÁS)
      </text>

      {/* 1. Állomás */}
      <rect x="15" y="35" width="65" height="110" rx="6" fill="#ffffff" stroke="#f472b6" strokeWidth="1.5" />
      <circle cx="47" cy="52" r="10" fill="#ec4899" />
      <text x="47" y="56" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">1</text>
      <text x="47" y="74" fill="#831843" fontSize="8" fontWeight="bold" textAnchor="middle">KIKÖTÉS</text>
      <text x="47" y="90" fill="#64748b" fontSize="7" textAnchor="middle">Ért. tartomány</text>
      <text x="47" y="103" fill="#64748b" fontSize="7" textAnchor="middle">Nevező ≠ 0</text>
      <text x="47" y="116" fill="#0284c7" fontSize="7" fontFamily="monospace" textAnchor="middle">√f(x) ≥ 0</text>
      <rect x="22" y="128" width="51" height="12" rx="3" fill="#fce7f3" />
      <text x="47" y="137" fill="#be185d" fontSize="6.5" fontWeight="bold" textAnchor="middle">+5 pont</text>

      {/* Nyíl 1 -> 2 */}
      <path d="M 83 90 L 92 90" stroke="#db2777" strokeWidth="2" strokeLinecap="round" markerEnd="url(#pink-arrow)" />

      {/* 2. Állomás */}
      <rect x="95" y="35" width="65" height="110" rx="6" fill="#ffffff" stroke="#f472b6" strokeWidth="1.5" />
      <circle cx="127" cy="52" r="10" fill="#ec4899" />
      <text x="127" y="56" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">2</text>
      <text x="127" y="74" fill="#831843" fontSize="8" fontWeight="bold" textAnchor="middle">GYÖKSEJTÉS</text>
      <text x="127" y="90" fill="#64748b" fontSize="7" textAnchor="middle">Viète-formulák</text>
      <text x="127" y="103" fill="#64748b" fontSize="7" textAnchor="middle">x₁·x₂ = q</text>
      <text x="127" y="116" fill="#d97706" fontSize="7" fontFamily="monospace" textAnchor="middle">x₁+x₂ = -p</text>
      <rect x="102" y="128" width="51" height="12" rx="3" fill="#fce7f3" />
      <text x="127" y="137" fill="#be185d" fontSize="6.5" fontWeight="bold" textAnchor="middle">+10 pont</text>

      {/* Nyíl 2 -> 3 */}
      <path d="M 163 90 L 172 90" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />

      {/* 3. Állomás */}
      <rect x="175" y="35" width="65" height="110" rx="6" fill="#ffffff" stroke="#f472b6" strokeWidth="1.5" />
      <circle cx="207" cy="52" r="10" fill="#ec4899" />
      <text x="207" y="56" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">3</text>
      <text x="207" y="74" fill="#831843" fontSize="8" fontWeight="bold" textAnchor="middle">ELŐJELVIZSG.</text>
      <text x="207" y="90" fill="#64748b" fontSize="7" textAnchor="middle">Parabola rajz</text>
      <text x="207" y="103" fill="#64748b" fontSize="7" textAnchor="middle">vagy táblázat</text>
      <text x="207" y="116" fill="#16a34a" fontSize="7" fontFamily="monospace" textAnchor="middle">a &gt; 0 vs a &lt; 0</text>
      <rect x="182" y="128" width="51" height="12" rx="3" fill="#fce7f3" />
      <text x="207" y="137" fill="#be185d" fontSize="6.5" fontWeight="bold" textAnchor="middle">+10 pont</text>

      {/* Nyíl 3 -> 4 */}
      <path d="M 243 90 L 252 90" stroke="#db2777" strokeWidth="2" strokeLinecap="round" />

      {/* 4. Állomás */}
      <rect x="255" y="35" width="55" height="110" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
      <circle cx="282" cy="52" r="10" fill="#10b981" />
      <text x="282" y="56" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">✓</text>
      <text x="282" y="74" fill="#065f46" fontSize="8" fontWeight="bold" textAnchor="middle">SZŰRŐ</text>
      <text x="282" y="90" fill="#64748b" fontSize="7" textAnchor="middle">Hamis gyök</text>
      <text x="282" y="103" fill="#dc2626" fontSize="7" textAnchor="middle">kizárása!</text>
      <text x="282" y="116" fill="#16a34a" fontSize="7" fontFamily="monospace" textAnchor="middle">M={'{...}'}</text>
      <rect x="258" y="128" width="49" height="12" rx="3" fill="#d1fae5" />
      <text x="282" y="137" fill="#065f46" fontSize="6.5" fontWeight="bold" textAnchor="middle">+15 pont</text>

      {/* Alsó jelige */}
      <text x="160" y="165" fill="#475569" fontSize="7.5" textAnchor="middle">
        Egyetlen csapattag sem maradhat le: az utolsó állomás zárja le a pontozást!
      </text>
    </svg>
  );
};

// 2. Hibakeresés levezetésben (Detektív feladvány)
export const ErrorHuntStepAnalysisSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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

      {/* Fejléc */}
      <rect x="15" y="12" width="290" height="24" rx="4" fill="#be185d" />
      <text x="160" y="27" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
        DETEKTÍV FELADVÁNY: HOL A HIBA A LEVEZETÉSBEN?
      </text>

      {/* Lépések listája */}
      {/* 1. Lépés */}
      <rect x="15" y="44" width="290" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="22" y="49" width="38" height="14" rx="3" fill="#f1f5f9" />
      <text x="41" y="59" fill="#475569" fontSize="7.5" fontWeight="bold" textAnchor="middle">1. Lépés</text>
      <text x="70" y="60" fill="#1e293b" fontSize="8" fontFamily="monospace">√(2x + 3) = x  (Kikötés: 2x+3 ≥ 0 és x ≥ 0)</text>
      <text x="290" y="60" fill="#16a34a" fontSize="9" fontWeight="bold" textAnchor="middle">✓</text>

      {/* 2. Lépés */}
      <rect x="15" y="73" width="290" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="22" y="78" width="38" height="14" rx="3" fill="#f1f5f9" />
      <text x="41" y="88" fill="#475569" fontSize="7.5" fontWeight="bold" textAnchor="middle">2. Lépés</text>
      <text x="70" y="89" fill="#1e293b" fontSize="8" fontFamily="monospace">2x + 3 = x²  ⇒  x² - 2x - 3 = 0</text>
      <text x="290" y="89" fill="#16a34a" fontSize="9" fontWeight="bold" textAnchor="middle">✓</text>

      {/* 3. Lépés - HIBA! */}
      <rect x="15" y="102" width="290" height="28" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <rect x="22" y="108" width="38" height="14" rx="3" fill="#fee2e2" />
      <text x="41" y="118" fill="#991b1b" fontSize="7.5" fontWeight="bold" textAnchor="middle">3. Lépés</text>
      <text x="70" y="117" fill="#b91c1c" fontSize="8" fontFamily="monospace" fontWeight="bold">Megoldás: x₁ = 3  és  x₂ = -1  ⇒  M = {'{-1; 3}'}</text>
      <text x="290" y="119" fill="#dc2626" fontSize="11" fontWeight="black" textAnchor="middle">✗</text>

      {/* Hiba indoklása */}
      <rect x="15" y="136" width="290" height="34" rx="4" fill="#fce7f3" stroke="#f472b6" strokeWidth="1" />
      <text x="25" y="149" fill="#9d174d" fontSize="7.5" fontWeight="bold">
        LELEPLEZÉS (+15 pont a csapatnak):
      </text>
      <text x="25" y="161" fill="#831843" fontSize="7">
        Az x = -1 nem megoldás, mert x ≥ 0 feltétel sérül, és √(2(-1)+3) = 1 ≠ -1 (hamis gyök)! M = {'{3}'}.
      </text>
    </svg>
  );
};

// 3. Gyorsasági Viète Párbaj
export const SpeedVieteDuelSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#0f172a" />

      {/* Cím */}
      <text x="160" y="22" fill="#f472b6" fontSize="10" fontWeight="black" textAnchor="middle">
        GYORSASÁGI VIÈTE-PÁRBAJ (STOPPER ALATT)
      </text>

      {/* Kérdés kártya középen */}
      <rect x="35" y="34" width="250" height="42" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
      <text x="160" y="52" fill="#94a3b8" fontSize="8" textAnchor="middle">Melyek a gyökök? (3 másodperc!)</text>
      <text x="160" y="68" fill="#fbcfe8" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        x² - 11x + 24 = 0
      </text>

      {/* Bal oldal: A Csapat gondolatmenete */}
      <rect x="20" y="86" width="130" height="78" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="85" y="100" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">A CSAPAT ELEMZÉSE</text>
      <text x="30" y="115" fill="#cbd5e1" fontSize="7">1. Szorzat: q = 24 &gt; 0</text>
      <text x="30" y="127" fill="#cbd5e1" fontSize="7">2. Összeg: -p = 11 &gt; 0</text>
      <text x="30" y="139" fill="#a5f3fc" fontSize="7" fontFamily="monospace">Párok: 1·24, 2·12, 3·8, 4·6</text>
      <text x="30" y="152" fill="#4ade80" fontSize="7.5" fontWeight="bold">3 + 8 = 11  ⇒  x = 3; 8!</text>

      {/* Jobb oldal: B Csapat villám gombnyomás */}
      <rect x="170" y="86" width="130" height="78" rx="6" fill="#831843" stroke="#f472b6" strokeWidth="1.5" />
      <text x="235" y="100" fill="#fbcfe8" fontSize="8" fontWeight="bold" textAnchor="middle">B CSAPAT CSENGETETT!</text>
      <circle cx="235" cy="122" r="16" fill="#ec4899" />
      <text x="235" y="126" fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">⚡ 1.4 mp</text>
      <text x="235" y="152" fill="#fdf2f8" fontSize="7.5" fontWeight="bold" textAnchor="middle">VÁLASZ: {'{3; 8}'} (+10 PONT)</text>
    </svg>
  );
};

// 4. Előjeltáblázat sprint
export const SignChartSprintSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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
      <text x="160" y="20" fill="#831843" fontSize="10" fontWeight="black" textAnchor="middle">
        ELŐJELTÁBLÁZAT SPRINT: (x - 2)(x + 5) ≤ 0
      </text>

      {/* Táblázat keret */}
      <rect x="20" y="32" width="280" height="105" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Fejlécsor */}
      <line x1="20" y1="58" x2="300" y2="58" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="20" y1="84" x2="300" y2="84" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="20" y1="110" x2="300" y2="110" stroke="#cbd5e1" strokeWidth="1" />

      {/* Oszlopelválasztók */}
      <line x1="90" y1="32" x2="90" y2="137" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="140" y1="32" x2="140" y2="137" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="180" y1="32" x2="180" y2="137" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="235" y1="32" x2="235" y2="137" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="265" y1="32" x2="265" y2="137" stroke="#cbd5e1" strokeWidth="1" />

      {/* Fejléc szövegek */}
      <text x="55" y="48" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">Kifejezés</text>
      <text x="115" y="48" fill="#0f172a" fontSize="7.5" fontFamily="monospace" textAnchor="middle">x &lt; -5</text>
      <text x="160" y="48" fill="#ec4899" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">-5</text>
      <text x="207" y="48" fill="#0f172a" fontSize="7.5" fontFamily="monospace" textAnchor="middle">-5 &lt; x &lt; 2</text>
      <text x="250" y="48" fill="#ec4899" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">2</text>
      <text x="282" y="48" fill="#0f172a" fontSize="7.5" fontFamily="monospace" textAnchor="middle">x &gt; 2</text>

      {/* 1. Sor: (x + 5) */}
      <text x="55" y="74" fill="#334155" fontSize="8" fontFamily="monospace" textAnchor="middle">x + 5</text>
      <text x="115" y="74" fill="#dc2626" fontSize="10" fontWeight="bold" textAnchor="middle">-</text>
      <text x="160" y="74" fill="#0284c7" fontSize="9" fontWeight="bold" textAnchor="middle">0</text>
      <text x="207" y="74" fill="#16a34a" fontSize="10" fontWeight="bold" textAnchor="middle">+</text>
      <text x="250" y="74" fill="#16a34a" fontSize="10" fontWeight="bold" textAnchor="middle">+</text>
      <text x="282" y="74" fill="#16a34a" fontSize="10" fontWeight="bold" textAnchor="middle">+</text>

      {/* 2. Sor: (x - 2) */}
      <text x="55" y="100" fill="#334155" fontSize="8" fontFamily="monospace" textAnchor="middle">x - 2</text>
      <text x="115" y="100" fill="#dc2626" fontSize="10" fontWeight="bold" textAnchor="middle">-</text>
      <text x="160" y="100" fill="#dc2626" fontSize="10" fontWeight="bold" textAnchor="middle">-</text>
      <text x="207" y="100" fill="#dc2626" fontSize="10" fontWeight="bold" textAnchor="middle">-</text>
      <text x="250" y="100" fill="#0284c7" fontSize="9" fontWeight="bold" textAnchor="middle">0</text>
      <text x="282" y="100" fill="#16a34a" fontSize="10" fontWeight="bold" textAnchor="middle">+</text>

      {/* 3. Sor: Szorzat */}
      <text x="55" y="126" fill="#be185d" fontSize="8" fontWeight="bold" textAnchor="middle">Szorzat</text>
      <text x="115" y="126" fill="#16a34a" fontSize="9" fontWeight="bold" textAnchor="middle">+</text>
      <rect x="145" y="113" width="115" height="20" rx="3" fill="#fdf2f8" stroke="#ec4899" strokeWidth="1" />
      <text x="160" y="126" fill="#be185d" fontSize="9" fontWeight="bold" textAnchor="middle">0</text>
      <text x="207" y="126" fill="#db2777" fontSize="10" fontWeight="black" textAnchor="middle">- (Megoldás!)</text>
      <text x="250" y="126" fill="#be185d" fontSize="9" fontWeight="bold" textAnchor="middle">0</text>
      <text x="282" y="126" fill="#16a34a" fontSize="9" fontWeight="bold" textAnchor="middle">+</text>

      {/* Eredmény */}
      <rect x="20" y="146" width="280" height="26" rx="4" fill="#fce7f3" />
      <text x="160" y="162" fill="#831843" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        Gyorsasági válasz: Zárt intervallum a határokkal ⇒ x ∈ [-5; 2]
      </text>
    </svg>
  );
};

// 5. Csapatverseny eredménytábla & szabályok
export const ScoreboardTournamentSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#fdf2f8" />

      {/* Cím */}
      <text x="160" y="20" fill="#9d174d" fontSize="10" fontWeight="black" textAnchor="middle">
        BAJNOKSÁG ÉS STRATÉGIAI PONTOZÓTÁBLA
      </text>

      {/* Csapatok sávjai */}
      {/* 1. Csapat */}
      <rect x="20" y="32" width="280" height="34" rx="5" fill="#ffffff" stroke="#f472b6" strokeWidth="1.2" />
      <circle cx="38" cy="49" r="10" fill="#ec4899" />
      <text x="38" y="53" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">1.</text>
      <text x="56" y="45" fill="#1e293b" fontSize="8" fontWeight="bold">ALFA CSAPAT (Gyorsasági Bajnokok)</text>
      <text x="56" y="58" fill="#64748b" fontSize="7">10 helyes Viète gyöksejtés | Időbónusz: +15 pont</text>
      <rect x="245" y="38" width="50" height="22" rx="4" fill="#fce7f3" />
      <text x="270" y="52" fill="#be185d" fontSize="9" fontWeight="black" textAnchor="middle">125 pont</text>

      {/* 2. Csapat */}
      <rect x="20" y="72" width="280" height="34" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="38" cy="89" r="10" fill="#64748b" />
      <text x="38" y="93" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">2.</text>
      <text x="56" y="85" fill="#1e293b" fontSize="8" fontWeight="bold">BÉTA CSAPAT (Precíz Detektívek)</text>
      <text x="56" y="98" fill="#64748b" fontSize="7">Minden hamis gyököt kiszűrtek | 0 levonás</text>
      <rect x="245" y="78" width="50" height="22" rx="4" fill="#f1f5f9" />
      <text x="270" y="92" fill="#334155" fontSize="9" fontWeight="black" textAnchor="middle">115 pont</text>

      {/* 3. Csapat */}
      <rect x="20" y="112" width="280" height="34" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="38" cy="129" r="10" fill="#94a3b8" />
      <text x="38" y="133" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">3.</text>
      <text x="56" y="125" fill="#1e293b" fontSize="8" fontWeight="bold">GAMMA CSAPAT (Előjelek Mesterei)</text>
      <text x="56" y="138" fill="#64748b" fontSize="7">Tökéletes előjeltáblázatok | 1 elnézett kikötés (-5p)</text>
      <rect x="245" y="118" width="50" height="22" rx="4" fill="#f1f5f9" />
      <text x="270" y="132" fill="#475569" fontSize="9" fontWeight="black" textAnchor="middle">95 pont</text>

      {/* Aranyszabály alul */}
      <text x="160" y="165" fill="#9d174d" fontSize="7.5" fontWeight="bold" textAnchor="middle">
        Aranyszabály: A gyorsaság fontos, de a pontosság dönt: a hamis gyök bent hagyása -10 pont!
      </text>
    </svg>
  );
};

