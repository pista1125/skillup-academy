import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szemléltető ábra: Az abszolútérték alapfüggvény f(x) = |x|
 */
export const BaseAbsValueSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 320 240"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="290" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" />

      {/* Rácsvonalak és tengelyek */}
      <line x1="25" y1="180" x2="295" y2="180" stroke="#475569" strokeWidth="1.8" />
      <line x1="160" y1="25" x2="160" y2="215" stroke="#475569" strokeWidth="1.8" />
      <text x="290" y="174" fill="#475569" fontSize="10" fontWeight="bold">x</text>
      <text x="166" y="36" fill="#475569" fontSize="10" fontWeight="bold">y</text>

      {/* V-alakú grafikon f(x) = |x| */}
      {/* Bal szár: y = -x -> (-4, 4) -> (60, 80) to (160, 180) */}
      <line x1="50" y1="70" x2="160" y2="180" stroke="#e11d48" strokeWidth="3.2" strokeLinecap="round" />
      {/* Jobb szár: y = x -> (160, 180) to (270, 70) */}
      <line x1="160" y1="180" x2="270" y2="70" stroke="#e11d48" strokeWidth="3.2" strokeLinecap="round" />

      {/* Csúcspont az origóban */}
      <circle cx="160" cy="180" r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
      <text x="160" y="200" fill="#9f1239" fontSize="10" fontWeight="black" textAnchor="middle">
        Csúcspont C(0; 0)
      </text>

      {/* Szimmetriatengely (y tengely) szaggatott kiemelése */}
      <line x1="160" y1="45" x2="160" y2="175" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="166" y="60" fill="#be123c" fontSize="9" fontWeight="bold">Szimmetriatengely</text>

      {/* Képlet kártya */}
      <rect x="25" y="25" width="95" height="38" fill="#fff1f2" rx="6" stroke="#fecdd3" />
      <text x="72" y="42" fill="#9f1239" fontSize="9" fontWeight="black" textAnchor="middle">ALAPFÜGGVÉNY</text>
      <text x="72" y="56" fill="#e11d48" fontSize="12" fontWeight="bold" textAnchor="middle">f(x) = |x|</text>

      {/* Szárak felirata */}
      <text x="75" y="115" fill="#e11d48" fontSize="10" fontWeight="bold">y = -x</text>
      <text x="225" y="115" fill="#e11d48" fontSize="10" fontWeight="bold">y = x</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Transzformált abszolútérték-függvény f(x) = a|x - u| + v
 */
export const TransformedAbsValueSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 320 240"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="290" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" />

      {/* Főtengelyek */}
      <line x1="25" y1="160" x2="295" y2="160" stroke="#475569" strokeWidth="1.8" />
      <line x1="100" y1="25" x2="100" y2="215" stroke="#475569" strokeWidth="1.8" />
      <text x="290" y="154" fill="#475569" fontSize="10" fontWeight="bold">x</text>
      <text x="106" y="36" fill="#475569" fontSize="10" fontWeight="bold">y</text>

      {/* Eltolás illusztráció: u jobbra, v le -> Csúcs: C(3; -1) -> (175, 185) */}
      {/* Vízszintes eltolás nyíl: (100, 160) -> (175, 160) */}
      <line x1="100" y1="160" x2="175" y2="160" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
      <text x="137" y="152" fill="#047857" fontSize="9" fontWeight="bold" textAnchor="middle">u jobbra (+u)</text>

      {/* Függőleges eltolás nyíl: (175, 160) -> (175, 185) */}
      <line x1="175" y1="160" x2="175" y2="185" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
      <text x="182" y="176" fill="#1d4ed8" fontSize="9" fontWeight="bold">v eltolás</text>

      {/* Transzformált V-alak: f(x) = |x - 3| - 1 csúcspont C(3; -1) -> (175, 185) */}
      <line x1="65" y1="75" x2="175" y2="185" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
      <line x1="175" y1="185" x2="285" y2="75" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />

      {/* Csúcspont */}
      <circle cx="175" cy="185" r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
      <text x="175" y="205" fill="#9f1239" fontSize="10" fontWeight="black" textAnchor="middle">
        Csúcs C(u; v)
      </text>

      {/* Zérushelyek: (2; 0) -> (150, 160) és (4; 0) -> (200, 160) */}
      <circle cx="150" cy="160" r="4" fill="#d97706" />
      <circle cx="200" cy="160" r="4" fill="#d97706" />
      <text x="175" y="140" fill="#b45309" fontSize="8" fontWeight="bold" textAnchor="middle">2 zérushely</text>

      {/* Képlet kártya */}
      <rect x="155" y="25" width="145" height="38" fill="#fff1f2" rx="6" stroke="#fecdd3" />
      <text x="227" y="42" fill="#9f1239" fontSize="9" fontWeight="black" textAnchor="middle">TRANSZFORMÁLT ALAK</text>
      <text x="227" y="56" fill="#e11d48" fontSize="12" fontWeight="bold" textAnchor="middle">f(x) = a·|x - u| + v</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Lefelé nyíló fordított alak (a < 0)
 */
export const NegativeAbsValueSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="300" height="200" fill="#f8fafc" rx="8" stroke="#cbd5e1" />

      {/* Tengelyek */}
      <line x1="25" y1="140" x2="295" y2="140" stroke="#475569" strokeWidth="1.8" />
      <line x1="160" y1="20" x2="160" y2="200" stroke="#475569" strokeWidth="1.8" />
      <text x="290" y="134" fill="#475569" fontSize="10" fontWeight="bold">x</text>
      <text x="166" y="32" fill="#475569" fontSize="10" fontWeight="bold">y</text>

      {/* Lefelé nyíló grafikon: f(x) = -|x| + 2 -> Csúcs: (160, 80) */}
      <line x1="60" y1="180" x2="160" y2="80" stroke="#be123c" strokeWidth="3" strokeLinecap="round" />
      <line x1="160" y1="80" x2="260" y2="180" stroke="#be123c" strokeWidth="3" strokeLinecap="round" />

      {/* Maximum pont */}
      <circle cx="160" cy="80" r="5" fill="#be123c" stroke="#ffffff" strokeWidth="1.5" />
      <text x="160" y="68" fill="#881337" fontSize="10" fontWeight="black" textAnchor="middle">
        MAXIMUM C(0; 2)
      </text>

      {/* Magyarázó kártya */}
      <rect x="25" y="25" width="115" height="40" fill="#fff1f2" rx="6" stroke="#fecdd3" />
      <text x="82" y="42" fill="#9f1239" fontSize="9" fontWeight="black" textAnchor="middle">HA a &lt; 0 (NEGATÍV)</text>
      <text x="82" y="56" fill="#be123c" fontSize="10" fontWeight="bold" textAnchor="middle">Lefelé nyíló Λ-alak</text>

      <text x="235" y="70" fill="#64748b" fontSize="9" textAnchor="middle">Értékkészlet: R_f = ]-∞; v]</text>
    </svg>
  );
};

