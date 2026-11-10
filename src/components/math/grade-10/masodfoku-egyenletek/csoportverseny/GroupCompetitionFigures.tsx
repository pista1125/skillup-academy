import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Csoportverseny 4 Fordulós Bajnokság Menetrendje SVG
 */
export const TournamentBracketSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
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
        <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <filter id="tourShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
      </defs>

      <rect x="8" y="8" width="504" height="214" rx="14" fill="#FDF2F8" stroke="#FBCFE8" strokeWidth="1.5" />

      {/* 4 Forduló Lépései */}
      {/* 1. Forduló */}
      <g filter="url(#tourShadow)">
        <rect x="25" y="35" width="105" height="155" rx="10" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
        <circle cx="77" cy="55" r="14" fill="#EC4899" />
        <text x="77" y="60" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">1</text>
        <text x="77" y="86" fill="#9D174D" fontSize="11" fontWeight="bold" textAnchor="middle">Villámkvíz</text>
        <text x="77" y="108" fill="#475569" fontSize="9" textAnchor="middle">Diszkrimináns</text>
        <text x="77" y="122" fill="#475569" fontSize="9" textAnchor="middle">és gyökök száma</text>
        <rect x="33" y="140" width="89" height="24" rx="5" fill="#FCE7F3" />
        <text x="77" y="156" fill="#BE185D" fontSize="9" fontWeight="bold" textAnchor="middle">10 pont</text>
      </g>

      {/* Nyíl 1 -> 2 */}
      <path d="M 134 112 L 148 112" stroke="#DB2777" strokeWidth="2.5" />

      {/* 2. Forduló */}
      <g filter="url(#tourShadow)">
        <rect x="150" y="35" width="105" height="155" rx="10" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
        <circle cx="202" cy="55" r="14" fill="#DB2777" />
        <text x="202" y="60" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">2</text>
        <text x="202" y="86" fill="#9D174D" fontSize="11" fontWeight="bold" textAnchor="middle">Hibavadászat</text>
        <text x="202" y="108" fill="#475569" fontSize="9" textAnchor="middle">Előjelhibák és</text>
        <text x="202" y="122" fill="#475569" fontSize="9" textAnchor="middle">hamis gyökök</text>
        <rect x="158" y="140" width="89" height="24" rx="5" fill="#FCE7F3" />
        <text x="202" y="156" fill="#BE185D" fontSize="9" fontWeight="bold" textAnchor="middle">20 pont</text>
      </g>

      {/* Nyíl 2 -> 3 */}
      <path d="M 259 112 L 273 112" stroke="#DB2777" strokeWidth="2.5" />

      {/* 3. Forduló */}
      <g filter="url(#tourShadow)">
        <rect x="275" y="35" width="105" height="155" rx="10" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
        <circle cx="327" cy="55" r="14" fill="#BE185D" />
        <text x="327" y="60" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">3</text>
        <text x="327" y="86" fill="#9D174D" fontSize="11" fontWeight="bold" textAnchor="middle">Stratégia</text>
        <text x="327" y="108" fill="#475569" fontSize="9" textAnchor="middle">Bikvadratikus &amp;</text>
        <text x="327" y="122" fill="#475569" fontSize="9" textAnchor="middle">törtes feladvány</text>
        <rect x="283" y="140" width="89" height="24" rx="5" fill="#FCE7F3" />
        <text x="327" y="156" fill="#BE185D" fontSize="9" fontWeight="bold" textAnchor="middle">30 pont</text>
      </g>

      {/* Nyíl 3 -> 4 */}
      <path d="M 384 112 L 398 112" stroke="#DB2777" strokeWidth="2.5" />

      {/* 4. Forduló: Döntő Kupa */}
      <g filter="url(#tourShadow)">
        <rect x="400" y="35" width="100" height="155" rx="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
        <circle cx="450" cy="55" r="15" fill="url(#cupGrad)" />
        <text x="450" y="61" fill="#FFFFFF" fontSize="14" fontWeight="black" textAnchor="middle">🏆</text>
        <text x="450" y="86" fill="#92400E" fontSize="11" fontWeight="900" textAnchor="middle">DÖNTŐ</text>
        <text x="450" y="108" fill="#78350F" fontSize="9" textAnchor="middle">Szöveges váltó</text>
        <text x="450" y="122" fill="#78350F" fontSize="9" textAnchor="middle">és időfutam</text>
        <rect x="408" y="140" width="84" height="24" rx="5" fill="#FDE68A" />
        <text x="450" y="156" fill="#92400E" fontSize="9" fontWeight="black" textAnchor="middle">50 pont!</text>
      </g>
    </svg>
  );
};

/**
 * 2. Detektív Hibakeresés (Típushibák felderítése) SVG
 */
export const DetectiveErrorHuntSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
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
        <filter id="huntShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      <rect x="8" y="8" width="484" height="214" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* 3 Hibakártya */}
      {/* 1. Hiba: Negatív négyzetre emelés */}
      <g filter="url(#huntShadow)">
        <rect x="25" y="30" width="135" height="165" rx="10" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1.5" />
        <rect x="35" y="40" width="115" height="22" rx="5" fill="#EF4444" />
        <text x="92" y="55" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">1. Zárójelhiba</text>
        <text x="92" y="82" fill="#991B1B" fontSize="11" fontWeight="bold" textAnchor="middle">b = -5 esetén:</text>
        <text x="92" y="105" fill="#DC2626" fontSize="12" fontWeight="900" textAnchor="middle">b² = -25 ❌ HIBÁS!</text>
        <rect x="35" y="120" width="115" height="58" rx="6" fill="#FFFFFF" stroke="#FECACA" />
        <text x="92" y="138" fill="#15803D" fontSize="10.5" fontWeight="bold" textAnchor="middle">(-5)² = +25 ✅</text>
        <text x="92" y="154" fill="#475569" fontSize="8.5" textAnchor="middle">Valós szám négyzete</text>
        <text x="92" y="167" fill="#475569" fontSize="8.5" textAnchor="middle">mindig nemnegatív!</text>
      </g>

      {/* 2. Hiba: Osztás 2-vel 2a helyett */}
      <g filter="url(#huntShadow)">
        <rect x="175" y="30" width="145" height="165" rx="10" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" />
        <rect x="185" y="40" width="125" height="22" rx="5" fill="#F59E0B" />
        <text x="247" y="55" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">2. Nevezőhiba</text>
        <text x="247" y="82" fill="#92400E" fontSize="11" fontWeight="bold" textAnchor="middle">3x² + 5x - 2 = 0:</text>
        <text x="247" y="105" fill="#D97706" fontSize="11" fontWeight="900" textAnchor="middle">Osztás 2-vel ❌</text>
        <rect x="185" y="120" width="125" height="58" rx="6" fill="#FFFFFF" stroke="#FDE68A" />
        <text x="247" y="138" fill="#15803D" fontSize="10.5" fontWeight="bold" textAnchor="middle">Nevező: 2a = 6 ✅</text>
        <text x="247" y="154" fill="#475569" fontSize="8.5" textAnchor="middle">Ha a ≠ 1, kötelező</text>
        <text x="247" y="167" fill="#475569" fontSize="8.5" textAnchor="middle">2 · a-val leosztani!</text>
      </g>

      {/* 3. Hiba: Gyökvonás -b-ből */}
      <g filter="url(#huntShadow)">
        <rect x="335" y="30" width="140" height="165" rx="10" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
        <rect x="345" y="40" width="120" height="22" rx="5" fill="#10B981" />
        <text x="405" y="55" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">3. Előjelhiba (-b)</text>
        <text x="405" y="82" fill="#166534" fontSize="11" fontWeight="bold" textAnchor="middle">b = -7 esetén:</text>
        <text x="405" y="105" fill="#059669" fontSize="11" fontWeight="900" textAnchor="middle">-b = -7 ❌ HIBÁS!</text>
        <rect x="345" y="120" width="120" height="58" rx="6" fill="#FFFFFF" stroke="#BBF7D0" />
        <text x="405" y="138" fill="#15803D" fontSize="10.5" fontWeight="bold" textAnchor="middle">-(-7) = +7 ✅</text>
        <text x="405" y="154" fill="#475569" fontSize="8.5" textAnchor="middle">Az ellentett előjel</text>
        <text x="405" y="167" fill="#475569" fontSize="8.5" textAnchor="middle">megfordítja az előjelet!</text>
      </g>
    </svg>
  );
};

/**
 * 3. Villám Diszkrimináns Műszerfal SVG
 */
export const SpeedDiscriminantGaugeSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 210"
      width={size}
      height={(size * 210) / 500}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="gaugeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      <rect x="8" y="8" width="484" height="194" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* 3 Műszeroszlop */}
      {/* Zöld: D > 0 */}
      <g filter="url(#gaugeShadow)">
        <rect x="25" y="25" width="135" height="155" rx="10" fill="#ECFDF5" stroke="#34D399" strokeWidth="2" />
        <circle cx="92" cy="52" r="16" fill="#10B981" />
        <text x="92" y="58" fill="#FFFFFF" fontSize="14" fontWeight="black" textAnchor="middle">2</text>
        <text x="92" y="85" fill="#065F46" fontSize="12" fontWeight="900" textAnchor="middle">D &gt; 0</text>
        <text x="92" y="105" fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">2 Valós Gyök</text>
        <rect x="35" y="120" width="115" height="42" rx="6" fill="#FFFFFF" />
        <text x="92" y="136" fill="#334155" fontSize="9" textAnchor="middle">pl. x² - 5x + 6 = 0</text>
        <text x="92" y="152" fill="#059669" fontSize="9" fontWeight="bold" textAnchor="middle">D = 25 - 24 = 1 &gt; 0</text>
      </g>

      {/* Kék: D = 0 */}
      <g filter="url(#gaugeShadow)">
        <rect x="180" y="25" width="135" height="155" rx="10" fill="#EFF6FF" stroke="#60A5FA" strokeWidth="2" />
        <circle cx="247" cy="52" r="16" fill="#3B82F6" />
        <text x="247" y="58" fill="#FFFFFF" fontSize="14" fontWeight="black" textAnchor="middle">1</text>
        <text x="247" y="85" fill="#1E40AF" fontSize="12" fontWeight="900" textAnchor="middle">D = 0</text>
        <text x="247" y="105" fill="#1D4ED8" fontSize="11" fontWeight="bold" textAnchor="middle">1 Kettős Gyök</text>
        <rect x="190" y="120" width="115" height="42" rx="6" fill="#FFFFFF" />
        <text x="247" y="136" fill="#334155" fontSize="9" textAnchor="middle">pl. x² - 6x + 9 = 0</text>
        <text x="247" y="152" fill="#2563EB" fontSize="9" fontWeight="bold" textAnchor="middle">(x - 3)² = 0 (x = 3)</text>
      </g>

      {/* Piros: D < 0 */}
      <g filter="url(#gaugeShadow)">
        <rect x="335" y="25" width="135" height="155" rx="10" fill="#FEF2F2" stroke="#F87171" strokeWidth="2" />
        <circle cx="402" cy="52" r="16" fill="#EF4444" />
        <text x="402" y="58" fill="#FFFFFF" fontSize="14" fontWeight="black" textAnchor="middle">0</text>
        <text x="402" y="85" fill="#991B1B" fontSize="12" fontWeight="900" textAnchor="middle">D &lt; 0</text>
        <text x="402" y="105" fill="#DC2626" fontSize="11" fontWeight="bold" textAnchor="middle">0 Valós Gyök (∅)</text>
        <rect x="345" y="120" width="115" height="42" rx="6" fill="#FFFFFF" />
        <text x="402" y="136" fill="#334155" fontSize="9" textAnchor="middle">pl. x² + 2x + 5 = 0</text>
        <text x="402" y="152" fill="#DC2626" fontSize="9" fontWeight="bold" textAnchor="middle">D = 4 - 20 = -16 &lt; 0</text>
      </g>
    </svg>
  );
};

/**
 * 4. Csapatváltó Stratégia és Szerepek SVG
 */
export const TeamRelayStrategySvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 210"
      width={size}
      height={(size * 210) / 500}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="relayShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      <rect x="8" y="8" width="484" height="194" rx="14" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="1.5" />

      {/* 4 Csapattag szerep */}
      {/* 1. Tag */}
      <g filter="url(#relayShadow)">
        <rect x="20" y="25" width="105" height="160" rx="10" fill="#FFFFFF" stroke="#C084FC" strokeWidth="1.5" />
        <circle cx="72" cy="48" r="14" fill="#A855F7" />
        <text x="72" y="53" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">1</text>
        <text x="72" y="78" fill="#6B21A8" fontSize="10.5" fontWeight="bold" textAnchor="middle">Elemző</text>
        <text x="72" y="98" fill="#334155" fontSize="8.5" textAnchor="middle">Együtthatók</text>
        <text x="72" y="112" fill="#334155" fontSize="8.5" textAnchor="middle">a, b, c leolvasása</text>
        <rect x="28" y="125" width="89" height="45" rx="5" fill="#F3E8FF" />
        <text x="72" y="142" fill="#7E22CE" fontSize="8.5" fontWeight="bold" textAnchor="middle">0-ra rendezés</text>
        <text x="72" y="158" fill="#6B21A8" fontSize="8" textAnchor="middle">Kikötések tétele</text>
      </g>

      {/* 2. Tag */}
      <g filter="url(#relayShadow)">
        <rect x="135" y="25" width="105" height="160" rx="10" fill="#FFFFFF" stroke="#C084FC" strokeWidth="1.5" />
        <circle cx="187" cy="48" r="14" fill="#9333EA" />
        <text x="187" y="53" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">2</text>
        <text x="187" y="78" fill="#6B21A8" fontSize="10.5" fontWeight="bold" textAnchor="middle">Számoló</text>
        <text x="187" y="98" fill="#334155" fontSize="8.5" textAnchor="middle">Diszkrimináns</text>
        <text x="187" y="112" fill="#334155" fontSize="8.5" textAnchor="middle">D = b² - 4ac</text>
        <rect x="143" y="125" width="89" height="45" rx="5" fill="#F3E8FF" />
        <text x="187" y="142" fill="#7E22CE" fontSize="8.5" fontWeight="bold" textAnchor="middle">Gyökök száma</text>
        <text x="187" y="158" fill="#6B21A8" fontSize="8" textAnchor="middle">√D kiszámítása</text>
      </g>

      {/* 3. Tag */}
      <g filter="url(#relayShadow)">
        <rect x="250" y="25" width="115" height="160" rx="10" fill="#FFFFFF" stroke="#C084FC" strokeWidth="1.5" />
        <circle cx="307" cy="48" r="14" fill="#7E22CE" />
        <text x="307" y="53" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">3</text>
        <text x="307" y="78" fill="#6B21A8" fontSize="10.5" fontWeight="bold" textAnchor="middle">Megoldó</text>
        <text x="307" y="98" fill="#334155" fontSize="8.5" textAnchor="middle">Megoldóképlet</text>
        <text x="307" y="112" fill="#334155" fontSize="8.5" textAnchor="middle">vagy kiegészítés</text>
        <rect x="258" y="125" width="99" height="45" rx="5" fill="#F3E8FF" />
        <text x="307" y="142" fill="#7E22CE" fontSize="8.5" fontWeight="bold" textAnchor="middle">x₁ és x₂ gyökök</text>
        <text x="307" y="158" fill="#6B21A8" fontSize="8" textAnchor="middle">pontos értéke</text>
      </g>

      {/* 4. Tag */}
      <g filter="url(#relayShadow)">
        <rect x="375" y="25" width="105" height="160" rx="10" fill="#FFFFFF" stroke="#C084FC" strokeWidth="1.5" />
        <circle cx="427" cy="48" r="14" fill="#6B21A8" />
        <text x="427" y="53" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">4</text>
        <text x="427" y="78" fill="#6B21A8" fontSize="10.5" fontWeight="bold" textAnchor="middle">Ellenőr</text>
        <text x="427" y="98" fill="#334155" fontSize="8.5" textAnchor="middle">Gyökszűrés és</text>
        <text x="427" y="112" fill="#334155" fontSize="8.5" textAnchor="middle">Viète-kontroll</text>
        <rect x="383" y="125" width="89" height="45" rx="5" fill="#F3E8FF" />
        <text x="427" y="142" fill="#15803D" fontSize="8.5" fontWeight="bold" textAnchor="middle">Szöveges válasz</text>
        <text x="427" y="158" fill="#166534" fontSize="8" textAnchor="middle">Csapatpont! 🎯</text>
      </g>
    </svg>
  );
};

