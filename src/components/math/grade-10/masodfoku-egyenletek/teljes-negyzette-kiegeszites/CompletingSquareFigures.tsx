import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Geometriai Négyzetkiegészítés SVG
 * Szemlélteti az x² területű nagy négyzetet, a két (p/2)*x területű oldalsó téglalapot,
 * valamint a hiányzó (p/2)² területű saroknégyzetet, amellyel kiegészül a teljes (x + p/2)² négyzetté.
 */
export const GeometricCompletingSquareSvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 340"
      width={size}
      height={(size * 340) / 380}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mainSquareGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="rectGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="cornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="csShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Külső teljes keret szaggatott vonallal */}
      <rect
        x="60"
        y="40"
        width="260"
        height="250"
        rx="10"
        stroke="#64748B"
        strokeWidth="2.5"
        strokeDasharray="8 5"
        fill="#F8FAFC"
      />

      {/* 1. Bal felső: x² négyzet */}
      <rect
        x="60"
        y="40"
        width="175"
        height="165"
        rx="8"
        fill="url(#mainSquareGrad)"
        filter="url(#csShadow)"
      />
      <text x="147" y="120" fill="#FFFFFF" fontSize="28" fontWeight="900" textAnchor="middle">
        x²
      </text>
      <text x="147" y="148" fill="#DBEAFE" fontSize="14" fontWeight="bold" textAnchor="middle">
        (x × x)
      </text>

      {/* 2. Jobb oldali sáv: (p/2) * x téglalap */}
      <rect
        x="245"
        y="40"
        width="75"
        height="165"
        rx="8"
        fill="url(#rectGrad)"
        filter="url(#csShadow)"
      />
      <text x="282" y="118" fill="#FFFFFF" fontSize="17" fontWeight="bold" textAnchor="middle">
        p/2 · x
      </text>
      <text x="282" y="140" fill="#FEF3C7" fontSize="12" textAnchor="middle">
        téglalap
      </text>

      {/* 3. Alsó sáv: x * (p/2) téglalap */}
      <rect
        x="60"
        y="215"
        width="175"
        height="75"
        rx="8"
        fill="url(#rectGrad)"
        filter="url(#csShadow)"
      />
      <text x="147" y="258" fill="#FFFFFF" fontSize="17" fontWeight="bold" textAnchor="middle">
        p/2 · x
      </text>
      <text x="147" y="276" fill="#FEF3C7" fontSize="12" textAnchor="middle">
        téglalap
      </text>

      {/* 4. Jobb alsó hiányzó sarok: (p/2)² négyzet (kiegészítés) */}
      <rect
        x="245"
        y="215"
        width="75"
        height="75"
        rx="8"
        fill="url(#cornerGrad)"
        filter="url(#csShadow)"
      />
      <text x="282" y="250" fill="#FFFFFF" fontSize="16" fontWeight="900" textAnchor="middle">
        (p/2)²
      </text>
      <text x="282" y="270" fill="#D1FAE5" fontSize="12" fontWeight="bold" textAnchor="middle">
        + sarok!
      </text>

      {/* Méretezési nyilak és feliratok */}
      {/* Felső méret: x és p/2 */}
      <path d="M 60 25 L 235 25" stroke="#2563EB" strokeWidth="2.5" />
      <text x="147" y="20" fill="#2563EB" fontSize="14" fontWeight="bold" textAnchor="middle">x</text>
      <path d="M 245 25 L 320 25" stroke="#D97706" strokeWidth="2.5" />
      <text x="282" y="20" fill="#D97706" fontSize="14" fontWeight="bold" textAnchor="middle">p/2</text>

      {/* Bal oldali méret: x és p/2 */}
      <path d="M 45 40 L 45 205" stroke="#2563EB" strokeWidth="2.5" />
      <text x="32" y="125" fill="#2563EB" fontSize="14" fontWeight="bold" textAnchor="middle">x</text>
      <path d="M 45 215 L 45 290" stroke="#D97706" strokeWidth="2.5" />
      <text x="30" y="255" fill="#D97706" fontSize="13" fontWeight="bold" textAnchor="middle">p/2</text>

      {/* Alsó összegző szöveg */}
      <text x="190" y="325" fill="#0F172A" fontSize="15" fontWeight="900" textAnchor="middle">
        Teljes négyzet: (x + p/2)² = x² + px + (p/2)²
      </text>
    </svg>
  );
};

/**
 * 2. Hiányos Másodfokú Egyenletek Típusai SVG
 * Két fő eset: c = 0 (kiemelés) és b = 0 (tiszta négyzetes egyenlet).
 */
export const IncompleteEquationTreeSvg: React.FC<FigureProps> = ({ size = 460, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 240"
      width={size}
      height={(size * 240) / 440}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#3730A3" />
        </linearGradient>
        <filter id="boxShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Fő fejléc doboz */}
      <rect x="80" y="10" width="280" height="48" rx="12" fill="url(#headerGrad)" filter="url(#boxShadow)" />
      <text x="220" y="40" fill="#FFFFFF" fontSize="15" fontWeight="900" textAnchor="middle">
        Hiányos egyenletek: ax² + bx + c = 0
      </text>

      {/* Elágazási vonalak */}
      <path d="M 160 58 L 160 85 L 115 85 L 115 98" stroke="#6366F1" strokeWidth="2.5" fill="none" />
      <path d="M 280 58 L 280 85 L 325 85 L 325 98" stroke="#6366F1" strokeWidth="2.5" fill="none" />

      {/* Bal ág: c = 0 */}
      <rect x="15" y="98" width="195" height="130" rx="12" fill="#EEF2FF" stroke="#818CF8" strokeWidth="2" filter="url(#boxShadow)" />
      <rect x="25" y="108" width="175" height="26" rx="6" fill="#4338CA" />
      <text x="112" y="125" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
        Ha c = 0 (Nincs konstans tag)
      </text>
      <text x="112" y="156" fill="#1E1B4B" fontSize="15" fontWeight="900" textAnchor="middle">
        ax² + bx = 0
      </text>
      <text x="112" y="180" fill="#4F46E5" fontSize="13" fontWeight="bold" textAnchor="middle">
        x · (ax + b) = 0
      </text>
      <text x="112" y="206" fill="#059669" fontSize="13" fontWeight="900" textAnchor="middle">
        x₁ = 0  vagy  x₂ = -b/a
      </text>

      {/* Jobb ág: b = 0 */}
      <rect x="230" y="98" width="195" height="130" rx="12" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" filter="url(#boxShadow)" />
      <rect x="240" y="108" width="175" height="26" rx="6" fill="#B45309" />
      <text x="327" y="125" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
        Ha b = 0 (Nincs elsőfokú tag)
      </text>
      <text x="327" y="156" fill="#78350F" fontSize="15" fontWeight="900" textAnchor="middle">
        ax² + c = 0
      </text>
      <text x="327" y="180" fill="#D97706" fontSize="13" fontWeight="bold" textAnchor="middle">
        x² = -c/a
      </text>
      <text x="327" y="206" fill="#2563EB" fontSize="13" fontWeight="900" textAnchor="middle">
        x₁,₂ = ±√(-c/a) &nbsp;(ha ≥ 0)
      </text>
    </svg>
  );
};

/**
 * 3. Teljes Négyzetté Kiegészítés 4 Lépése SVG
 * Lépésről lépésre folyamatábra az x² + px + q = 0 megoldásához.
 */
export const StepByStepSquareMethodSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 480 210"
      width={size}
      height={(size * 210) / 480}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="stepShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* 1. Lépés */}
      <rect x="10" y="15" width="102" height="175" rx="12" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2" filter="url(#stepShadow)" />
      <circle cx="61" cy="42" r="18" fill="#22C55E" />
      <text x="61" y="49" fill="#FFFFFF" fontSize="16" fontWeight="900" textAnchor="middle">1</text>
      <text x="61" y="80" fill="#15803D" fontSize="13" fontWeight="900" textAnchor="middle">Felezés</text>
      <text x="61" y="106" fill="#1E293B" fontSize="12" textAnchor="middle">p együttható</text>
      <text x="61" y="124" fill="#1E293B" fontSize="12" textAnchor="middle">felezése:</text>
      <rect x="21" y="138" width="80" height="28" rx="6" fill="#DCFCE7" />
      <text x="61" y="157" fill="#166534" fontSize="13" fontWeight="900" textAnchor="middle">d = p/2</text>

      {/* Nyíl 1 -> 2 */}
      <path d="M 115 100 L 126 100" stroke="#64748B" strokeWidth="2.5" />
      <polygon points="126,95 133,100 126,105" fill="#64748B" />

      {/* 2. Lépés */}
      <rect x="133" y="15" width="102" height="175" rx="12" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" filter="url(#stepShadow)" />
      <circle cx="184" cy="42" r="18" fill="#3B82F6" />
      <text x="184" y="49" fill="#FFFFFF" fontSize="16" fontWeight="900" textAnchor="middle">2</text>
      <text x="184" y="80" fill="#1D4ED8" fontSize="13" fontWeight="900" textAnchor="middle">Kiegészítés</text>
      <text x="184" y="106" fill="#1E293B" fontSize="11" textAnchor="middle">Négyzet képzése</text>
      <text x="184" y="124" fill="#1E293B" fontSize="11" textAnchor="middle">és kompenzálás:</text>
      <rect x="140" y="138" width="88" height="28" rx="6" fill="#DBEAFE" />
      <text x="184" y="157" fill="#1E40AF" fontSize="12" fontWeight="900" textAnchor="middle">(x+d)² - d²</text>

      {/* Nyíl 2 -> 3 */}
      <path d="M 238 100 L 249 100" stroke="#64748B" strokeWidth="2.5" />
      <polygon points="249,95 256,100 249,105" fill="#64748B" />

      {/* 3. Lépés */}
      <rect x="256" y="15" width="102" height="175" rx="12" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" filter="url(#stepShadow)" />
      <circle cx="307" cy="42" r="18" fill="#F59E0B" />
      <text x="307" y="49" fill="#FFFFFF" fontSize="16" fontWeight="900" textAnchor="middle">3</text>
      <text x="307" y="80" fill="#B45309" fontSize="13" fontWeight="900" textAnchor="middle">Átrendezés</text>
      <text x="307" y="106" fill="#1E293B" fontSize="11" textAnchor="middle">Konstans tag</text>
      <text x="307" y="124" fill="#1E293B" fontSize="11" textAnchor="middle">átvitele jobbra:</text>
      <rect x="261" y="138" width="92" height="28" rx="6" fill="#FEF3C7" />
      <text x="307" y="157" fill="#92400E" fontSize="12" fontWeight="900" textAnchor="middle">(x+d)² = d²-q</text>

      {/* Nyíl 3 -> 4 */}
      <path d="M 361 100 L 372 100" stroke="#64748B" strokeWidth="2.5" />
      <polygon points="372,95 379,100 372,105" fill="#64748B" />

      {/* 4. Lépés */}
      <rect x="379" y="15" width="95" height="175" rx="12" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2" filter="url(#stepShadow)" />
      <circle cx="426" cy="42" r="18" fill="#A855F7" />
      <text x="426" y="49" fill="#FFFFFF" fontSize="16" fontWeight="900" textAnchor="middle">4</text>
      <text x="426" y="80" fill="#7E22CE" fontSize="13" fontWeight="900" textAnchor="middle">Gyökvonás</text>
      <text x="426" y="106" fill="#1E293B" fontSize="11" textAnchor="middle">± előjellel</text>
      <text x="426" y="124" fill="#1E293B" fontSize="11" textAnchor="middle">gyökvonás:</text>
      <rect x="385" y="138" width="83" height="28" rx="6" fill="#F3E8FF" />
      <text x="426" y="157" fill="#6B21A8" fontSize="12" fontWeight="900" textAnchor="middle">x = -d ± √k</text>
    </svg>
  );
};

/**
 * 4. Megoldások Száma a Jobb Oldal Előjele Alapján SVG
 * (x + d)² = k egyenlet diszkussziója k > 0, k = 0 és k < 0 esetén.
 */
export const RootsExistenceComparisonSvg: React.FC<FigureProps> = ({ size = 460, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 180"
      width={size}
      height={(size * 180) / 440}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* 1. Kártya: k > 0 */}
      <rect x="10" y="12" width="130" height="155" rx="12" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2" filter="url(#cardShadow)" />
      <rect x="20" y="22" width="110" height="28" rx="6" fill="#22C55E" />
      <text x="75" y="41" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">k &gt; 0 (Pozitív)</text>
      <text x="75" y="80" fill="#166534" fontSize="24" fontWeight="900" textAnchor="middle">2 gyök</text>
      <text x="75" y="112" fill="#14532D" fontSize="13" fontWeight="900" textAnchor="middle">x + d = ±√k</text>
      <text x="75" y="136" fill="#4B5563" fontSize="11" textAnchor="middle">Két különböző</text>
      <text x="75" y="151" fill="#4B5563" fontSize="11" textAnchor="middle">valós megoldás</text>

      {/* 2. Kártya: k = 0 */}
      <rect x="155" y="12" width="130" height="155" rx="12" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" filter="url(#cardShadow)" />
      <rect x="165" y="22" width="110" height="28" rx="6" fill="#3B82F6" />
      <text x="220" y="41" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">k = 0 (Nulla)</text>
      <text x="220" y="80" fill="#1D4ED8" fontSize="24" fontWeight="900" textAnchor="middle">1 gyök</text>
      <text x="220" y="112" fill="#1E40AF" fontSize="13" fontWeight="900" textAnchor="middle">x + d = 0</text>
      <text x="220" y="136" fill="#4B5563" fontSize="11" textAnchor="middle">Egyetlen (kettős)</text>
      <text x="220" y="151" fill="#4B5563" fontSize="11" textAnchor="middle">valós megoldás</text>

      {/* 3. Kártya: k < 0 */}
      <rect x="300" y="12" width="130" height="155" rx="12" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" filter="url(#cardShadow)" />
      <rect x="310" y="22" width="110" height="28" rx="6" fill="#EF4444" />
      <text x="365" y="41" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">k &lt; 0 (Negatív)</text>
      <text x="365" y="80" fill="#B91C1C" fontSize="24" fontWeight="900" textAnchor="middle">0 gyök</text>
      <text x="365" y="112" fill="#991B1B" fontSize="13" fontWeight="900" textAnchor="middle">(x+d)² &lt; 0 !</text>
      <text x="365" y="136" fill="#4B5563" fontSize="11" textAnchor="middle">Nincs valós gyök</text>
      <text x="365" y="151" fill="#4B5563" fontSize="11" textAnchor="middle">(négyzet nem neg.)</text>
    </svg>
  );
};
