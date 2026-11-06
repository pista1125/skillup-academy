import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. A tagadás kritériuma: Miért nem tagadása egymásnak a "Minden autó piros" és a "Nincs piros autó"?
 * Szemléltetés: 3 autó az utcában (2 piros, 1 kék).
 * A = Hamis (mert van kék), B = Hamis (mert van piros) -> Egyszerre hamisak, NEM tagadás!
 */
export const NegationTruthCriterionSvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 540 260"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.3}px` : '300px' }}
      >
        <defs>
          <linearGradient id="streetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <filter id="shadowCar" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Street background */}
        <rect x="20" y="20" width="500" height="100" rx="16" fill="url(#streetGrad)" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="30" y1="70" x2="510" y2="70" stroke="#94a3b8" strokeWidth="2" strokeDasharray="10 8" />

        {/* Car 1: Red */}
        <g transform="translate(60, 36)" filter="url(#shadowCar)">
          <rect x="0" y="22" width="90" height="26" rx="6" fill="#ef4444" />
          <path d="M15 22 L30 6 L65 6 L78 22 Z" fill="#dc2626" />
          <rect x="33" y="9" width="16" height="11" rx="2" fill="#bae6fd" />
          <rect x="53" y="9" width="18" height="11" rx="2" fill="#bae6fd" />
          <circle cx="22" cy="48" r="9" fill="#1e293b" />
          <circle cx="22" cy="48" r="4" fill="#94a3b8" />
          <circle cx="70" cy="48" r="9" fill="#1e293b" />
          <circle cx="70" cy="48" r="4" fill="#94a3b8" />
          <text x="45" y="38" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Piros</text>
        </g>

        {/* Car 2: Red */}
        <g transform="translate(225, 36)" filter="url(#shadowCar)">
          <rect x="0" y="22" width="90" height="26" rx="6" fill="#ef4444" />
          <path d="M15 22 L30 6 L65 6 L78 22 Z" fill="#dc2626" />
          <rect x="33" y="9" width="16" height="11" rx="2" fill="#bae6fd" />
          <rect x="53" y="9" width="18" height="11" rx="2" fill="#bae6fd" />
          <circle cx="22" cy="48" r="9" fill="#1e293b" />
          <circle cx="22" cy="48" r="4" fill="#94a3b8" />
          <circle cx="70" cy="48" r="9" fill="#1e293b" />
          <circle cx="70" cy="48" r="4" fill="#94a3b8" />
          <text x="45" y="38" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Piros</text>
        </g>

        {/* Car 3: Blue (Ellenpélda!) */}
        <g transform="translate(390, 36)" filter="url(#shadowCar)">
          <rect x="0" y="22" width="90" height="26" rx="6" fill="#2563eb" />
          <path d="M15 22 L30 6 L65 6 L78 22 Z" fill="#1d4ed8" />
          <rect x="33" y="9" width="16" height="11" rx="2" fill="#bae6fd" />
          <rect x="53" y="9" width="18" height="11" rx="2" fill="#bae6fd" />
          <circle cx="22" cy="48" r="9" fill="#1e293b" />
          <circle cx="22" cy="48" r="4" fill="#94a3b8" />
          <circle cx="70" cy="48" r="9" fill="#1e293b" />
          <circle cx="70" cy="48" r="4" fill="#94a3b8" />
          <text x="45" y="38" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Kék!</text>
        </g>

        {/* Explanation boxes */}
        {/* Box A */}
        <g transform="translate(20, 135)">
          <rect x="0" y="0" width="155" height="105" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
          <text x="77" y="22" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">A: „Minden autó piros”</text>
          <text x="77" y="46" textAnchor="middle" fill="#dc2626" fontSize="15" fontWeight="900">HAMIS</text>
          <text x="77" y="68" textAnchor="middle" fill="#7f1d1d" fontSize="10.5">mert van egy kék autó</text>
          <text x="77" y="85" textAnchor="middle" fill="#64748b" fontSize="10">(egy ellenpélda elég)</text>
        </g>

        {/* Box B (Trap) */}
        <g transform="translate(192, 135)">
          <rect x="0" y="0" width="155" height="105" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" />
          <text x="77" y="22" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">B: „Nincs piros autó”</text>
          <text x="77" y="46" textAnchor="middle" fill="#dc2626" fontSize="15" fontWeight="900">HAMIS</text>
          <text x="77" y="68" textAnchor="middle" fill="#7f1d1d" fontSize="10.5">mert van 2 piros autó</text>
          <rect x="12" y="80" width="131" height="18" rx="4" fill="#fee2e2" />
          <text x="77" y="93" textAnchor="middle" fill="#b91c1c" fontSize="9.5" fontWeight="bold">NEM A TAGADÁSA!</text>
        </g>

        {/* Box True Negation */}
        <g transform="translate(365, 135)">
          <rect x="0" y="0" width="155" height="105" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
          <text x="77" y="22" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">¬A: „Van olyan, ami nem...”</text>
          <text x="77" y="46" textAnchor="middle" fill="#16a34a" fontSize="15" fontWeight="900">IGAZ</text>
          <text x="77" y="68" textAnchor="middle" fill="#14532d" fontSize="10.5">a kék autó igazolja!</text>
          <rect x="12" y="80" width="131" height="18" rx="4" fill="#dcfce7" />
          <text x="77" y="93" textAnchor="middle" fill="#15803d" fontSize="9.5" fontWeight="bold">HELYES TAGADÁS</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Kvantorok és a tagadás dualitása:
 * ∀ (minden) <---> ∃ (van olyan / létezik)
 * ¬(∀x P(x)) = ∃x ¬P(x)
 * ¬(∃x P(x)) = ∀x ¬P(x)
 */
export const QuantifierDualitySvg: React.FC<FigureProps> = ({ size = 220, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 520 220"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.2}px` : '260px' }}
      >
        <defs>
          <marker id="arrowIndigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#4f46e5" />
          </marker>
          <marker id="arrowEmerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#059669" />
          </marker>
        </defs>

        {/* Left Card: Universal Quantifier */}
        <g transform="translate(20, 20)">
          <rect x="0" y="0" width="210" height="180" rx="14" fill="#f8fafc" stroke="#6366f1" strokeWidth="2" />
          <rect x="0" y="0" width="210" height="38" rx="14" fill="#4f46e5" />
          <rect x="0" y="24" width="210" height="14" fill="#4f46e5" />
          <text x="105" y="25" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">∀ (Általános kvantor)</text>
          
          <text x="105" y="66" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">„MINDEN / BÁRMELY”</text>
          <text x="105" y="88" textAnchor="middle" fill="#475569" fontSize="11">„Minden diák szereti a matekot”</text>
          
          <line x1="20" y1="104" x2="190" y2="104" stroke="#e2e8f0" strokeWidth="1" />
          
          <text x="105" y="124" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">Bukásához elég 1 ellenpélda!</text>
          <rect x="20" y="136" width="170" height="30" rx="6" fill="#ede9fe" />
          <text x="105" y="156" textAnchor="middle" fill="#4338ca" fontSize="11.5" fontWeight="bold">Tagadása: ∃x (¬P(x))</text>
        </g>

        {/* Center Arrows */}
        <g transform="translate(240, 65)">
          <path d="M 5 20 Q 20 5 35 20" fill="none" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#arrowIndigo)" />
          <text x="20" y="4" textAnchor="middle" fill="#4f46e5" fontSize="10" fontWeight="bold">tagadás</text>
        </g>
        <g transform="translate(240, 135)">
          <path d="M 35 10 Q 20 25 5 10" fill="none" stroke="#059669" strokeWidth="2.5" markerEnd="url(#arrowEmerald)" />
          <text x="20" y="34" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">tagadás</text>
        </g>

        {/* Right Card: Existential Quantifier */}
        <g transform="translate(290, 20)">
          <rect x="0" y="0" width="210" height="180" rx="14" fill="#f8fafc" stroke="#10b981" strokeWidth="2" />
          <rect x="0" y="0" width="210" height="38" rx="14" fill="#059669" />
          <rect x="0" y="24" width="210" height="14" fill="#059669" />
          <text x="105" y="25" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">∃ (Létezési kvantor)</text>
          
          <text x="105" y="66" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">„VAN OLYAN / LÉTEZIK”</text>
          <text x="105" y="88" textAnchor="middle" fill="#475569" fontSize="11">„Van olyan diák, aki nem szereti”</text>
          
          <line x1="20" y1="104" x2="190" y2="104" stroke="#e2e8f0" strokeWidth="1" />
          
          <text x="105" y="124" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">Igazolásához elég 1 példa!</text>
          <rect x="20" y="136" width="170" height="30" rx="6" fill="#d1fae5" />
          <text x="105" y="156" textAnchor="middle" fill="#065f46" fontSize="11.5" fontWeight="bold">Tagadása: ∀x (¬P(x))</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. Határértékek és egyenlőtlenségek tagadása a számegyenesen:
 * x >= 5 (zárt, zöld) <---> x < 5 (nyílt, lila)
 * Az 5-ös pont a komplementerbe vándorol!
 */
export const InequalityNegationSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 520 200"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.2}px` : '240px' }}
      >
        <defs>
          <marker id="axisArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* TOP LINE: x >= 5 */}
        <g transform="translate(30, 20)">
          <text x="0" y="15" fill="#166534" fontSize="13" fontWeight="bold">Állítás: x ≥ 5 („legalább 5”)</text>
          
          {/* Axis */}
          <line x1="20" y1="45" x2="440" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#axisArrow)" />
          {/* Ticks: 2, 3, 4, 5, 6, 7 */}
          {[2, 3, 4, 5, 6, 7].map((num) => {
            const x = 50 + (num - 2) * 60;
            return (
              <g key={`top-${num}`} transform={`translate(${x}, 45)`}>
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#64748b" strokeWidth="1.5" />
                <text x="0" y="20" textAnchor="middle" fill="#64748b" fontSize="11">{num}</text>
              </g>
            );
          })}
          
          {/* Ray x >= 5 */}
          <line x1="230" y1="45" x2="430" y2="45" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
          {/* Filled Circle at 5 */}
          <circle cx="230" cy="45" r="7" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
          <rect x="270" y="24" width="130" height="18" rx="4" fill="#dcfce7" />
          <text x="335" y="37" textAnchor="middle" fill="#15803d" fontSize="10" fontWeight="bold">x ≥ 5 (5 is benne van!)</text>
        </g>

        {/* BOTTOM LINE: x < 5 */}
        <g transform="translate(30, 115)">
          <text x="0" y="15" fill="#6b21a8" fontSize="13" fontWeight="bold">Tagadása (¬A): x &lt; 5 („kevesebb mint 5”)</text>
          
          {/* Axis */}
          <line x1="20" y1="45" x2="440" y2="45" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#axisArrow)" />
          {/* Ticks: 2, 3, 4, 5, 6, 7 */}
          {[2, 3, 4, 5, 6, 7].map((num) => {
            const x = 50 + (num - 2) * 60;
            return (
              <g key={`bot-${num}`} transform={`translate(${x}, 45)`}>
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#64748b" strokeWidth="1.5" />
                <text x="0" y="20" textAnchor="middle" fill="#64748b" fontSize="11">{num}</text>
              </g>
            );
          })}
          
          {/* Ray x < 5 */}
          <line x1="30" y1="45" x2="230" y2="45" stroke="#9333ea" strokeWidth="5" strokeLinecap="round" />
          {/* Open Circle at 5 */}
          <circle cx="230" cy="45" r="7" fill="#ffffff" stroke="#7e22ce" strokeWidth="2.5" />
          <rect x="80" y="24" width="130" height="18" rx="4" fill="#f3e8ff" />
          <text x="145" y="37" textAnchor="middle" fill="#7e22ce" fontSize="10" fontWeight="bold">x &lt; 5 (5 már nincs benne!)</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Tankönyvi Venn-diagram (5 barát: Foci és Kosárlabda):
 * Tomi (csak foci)
 * Jocó, Dani (foci és kosár)
 * Gábor, Elek (csak kosár)
 * Szemlélteti a tankönyvi példákat: "Mindenki szeret kosarazni" cáfolatát!
 */
export const VennFriendGroupSvg: React.FC<FigureProps> = ({ size = 220, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 480 220"
        className="w-full max-w-lg h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.2}px` : '260px' }}
      >
        {/* Background universe */}
        <rect x="15" y="15" width="450" height="190" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="35" y="38" fill="#475569" fontSize="12" fontWeight="bold">U: Az 5 fős baráti társaság</text>

        {/* Set 1: Foci (Circle Left) */}
        <circle cx="180" cy="115" r="75" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2.5" />
        {/* Set 2: Kosár (Circle Right) */}
        <circle cx="300" cy="115" r="75" fill="#f59e0b" fillOpacity="0.2" stroke="#d97706" strokeWidth="2.5" />

        {/* Labels for circles */}
        <text x="135" y="60" textAnchor="middle" fill="#1d4ed8" fontSize="13" fontWeight="bold">Focizik</text>
        <text x="345" y="60" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="bold">Kosarazik</text>

        {/* Members */}
        {/* Only Foci: Tomi */}
        <g transform="translate(135, 115)">
          <rect x="-30" y="-12" width="60" height="24" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill="#1e40af" fontSize="11.5" fontWeight="bold">Tomi</text>
        </g>

        {/* Both: Jocó, Dani */}
        <g transform="translate(240, 95)">
          <rect x="-26" y="-11" width="52" height="22" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Jocó</text>
        </g>
        <g transform="translate(240, 135)">
          <rect x="-26" y="-11" width="52" height="22" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Dani</text>
        </g>

        {/* Only Kosár: Gábor, Elek */}
        <g transform="translate(345, 95)">
          <rect x="-28" y="-11" width="56" height="22" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Gábor</text>
        </g>
        <g transform="translate(345, 135)">
          <rect x="-28" y="-11" width="56" height="22" rx="5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
          <text x="0" y="4" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">Elek</text>
        </g>

        {/* Bottom takeaway */}
        <rect x="25" y="178" width="430" height="20" rx="4" fill="#f1f5f9" />
        <text x="240" y="192" textAnchor="middle" fill="#334155" fontSize="10.5">
          „Mindenki kosarazik” → <tspan fill="#dc2626" fontWeight="bold">HAMIS</tspan> (Tomi nem kosarazik!). Tagadása: „Van, aki nem kosarazik” → <tspan fill="#16a34a" fontWeight="bold">IGAZ</tspan>.
        </text>
      </svg>
    </div>
  );
};

