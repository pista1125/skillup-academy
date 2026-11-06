import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Logika fejezeti szintézis: gondolattérkép / műveleti fa
 */
export const LogicSummaryTreeSvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 540 240"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.3}px` : '290px' }}
      >
        <rect x="15" y="15" width="510" height="210" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Central Root: Matematikai Logika */}
        <rect x="185" y="25" width="170" height="38" rx="10" fill="#1e293b" />
        <text x="270" y="49" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
          I. MATEMATIKAI LOGIKA
        </text>

        {/* Branch Lines */}
        <path d="M 270 63 L 270 85 L 85 85 L 85 105" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 270 63 L 270 85 L 205 85 L 205 105" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 270 63 L 270 85 L 335 85 L 335 105" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 270 63 L 270 85 L 455 85 L 455 105" stroke="#94a3b8" strokeWidth="2" fill="none" />

        {/* Box 1: Állítások és Tagadás */}
        <rect x="25" y="105" width="120" height="105" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="85" y="125" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">1. Állítás & Tagadás</text>
        <line x1="35" y1="133" x2="135" y2="133" stroke="#bfdbfe" strokeWidth="1" />
        <text x="85" y="150" textAnchor="middle" fill="#1e40af" fontSize="10">Igaz (1) / Hamis (0)</text>
        <text x="85" y="167" textAnchor="middle" fill="#1e40af" fontSize="10">Kizárt harmadik</text>
        <text x="85" y="184" textAnchor="middle" fill="#1e40af" fontSize="10">Minden ↔ Van olyan</text>

        {/* Box 2: Műveletek */}
        <rect x="155" y="105" width="105" height="105" rx="10" fill="#fdf4ff" stroke="#d946ef" strokeWidth="1.5" />
        <text x="207" y="125" textAnchor="middle" fill="#a21caf" fontSize="11" fontWeight="bold">2. VAGY és ÉS</text>
        <line x1="165" y1="133" x2="250" y2="133" stroke="#f5d0fe" strokeWidth="1" />
        <text x="207" y="150" textAnchor="middle" fill="#86198f" fontSize="10">Diszjunkció (∨)</text>
        <text x="207" y="167" textAnchor="middle" fill="#86198f" fontSize="10">Konjunkció (∧)</text>
        <text x="207" y="184" textAnchor="middle" fill="#86198f" fontSize="10">A „de” kötőszó = ∧</text>

        {/* Box 3: Táblázatok & De Morgan */}
        <rect x="270" y="105" width="130" height="105" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
        <text x="335" y="125" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">3. Táblázat & De Morgan</text>
        <line x1="280" y1="133" x2="390" y2="133" stroke="#a7f3d0" strokeWidth="1" />
        <text x="335" y="150" textAnchor="middle" fill="#065f46" fontSize="10">2ⁿ soros táblázat</text>
        <text x="335" y="167" textAnchor="middle" fill="#065f46" fontSize="10">¬(A ∧ B) = ¬A ∨ ¬B</text>
        <text x="335" y="184" textAnchor="middle" fill="#065f46" fontSize="10">Tautológia / Kontradikció</text>

        {/* Box 4: Implikáció & Megfordítás */}
        <rect x="410" y="105" width="105" height="105" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="462" y="125" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">4. Következtetés</text>
        <line x1="420" y1="133" x2="505" y2="133" stroke="#fde68a" strokeWidth="1" />
        <text x="462" y="150" textAnchor="middle" fill="#92400e" fontSize="10">Implikáció (A ⇒ B)</text>
        <text x="462" y="167" textAnchor="middle" fill="#92400e" fontSize="10">Megfordítás (B ⇒ A)</text>
        <text x="462" y="184" textAnchor="middle" fill="#92400e" fontSize="10">Ekvivalencia (A ⟺ B)</text>
      </svg>
    </div>
  );
};

/**
 * 2. Püthagorasz és Thalész idővonal (Kompetenciamérés 2011, Tankönyv 31. oldal)
 * Thalész: Kr. e. 624 - 548
 * Püthagorasz: Kr. e. 560 - 480
 * Átfedés: Kr. e. 560 és 548 között (12 évig éltek egyszerre!)
 */
export const PythagorasThalesTimelineSvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 540 240"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.3}px` : '290px' }}
      >
        <rect x="15" y="15" width="510" height="210" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="270" y="42" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">
          Találkozhatott-e Püthagorasz és Thalész? (Időtengely Kr. e.)
        </text>

        {/* Timeline Axis */}
        <line x1="50" y1="130" x2="490" y2="130" stroke="#64748b" strokeWidth="2.5" />
        <polygon points="495,130 485,125 485,135" fill="#64748b" />
        <text x="490" y="150" textAnchor="end" fill="#64748b" fontSize="10">Idő múlása (Kr. e.)</text>

        {/* Year Ticks: 640, 600, 560, 520, 480 */}
        {/* Scale: x = 50 + (640 - year) * 2.75 */}
        {/* 640 -> 50, 624 -> 94, 560 -> 270, 548 -> 303, 480 -> 490 */}
        <line x1="94" y1="125" x2="94" y2="135" stroke="#334155" strokeWidth="1.5" />
        <text x="94" y="150" textAnchor="middle" fill="#334155" fontSize="10">Kr. e. 624</text>

        <line x1="270" y1="125" x2="270" y2="135" stroke="#334155" strokeWidth="1.5" />
        <text x="270" y="150" textAnchor="middle" fill="#334155" fontSize="10">Kr. e. 560</text>

        <line x1="303" y1="125" x2="303" y2="135" stroke="#334155" strokeWidth="1.5" />
        <text x="303" y="165" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">Kr. e. 548</text>

        <line x1="490" y1="125" x2="490" y2="135" stroke="#334155" strokeWidth="1.5" />
        <text x="490" y="150" textAnchor="middle" fill="#334155" fontSize="10">Kr. e. 480</text>

        {/* Thalész Bar: 624 to 548 (x: 94 to 303, width = 209) */}
        <rect x="94" y="65" width="209" height="26" rx="6" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
        <text x="198" y="82" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
          Thalész (Kr. e. 624 – 548)
        </text>

        {/* Püthagorasz Bar: 560 to 480 (x: 270 to 490, width = 220) */}
        <rect x="270" y="98" width="220" height="26" rx="6" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
        <text x="380" y="115" textAnchor="middle" fill="#9a3412" fontSize="11" fontWeight="bold">
          Püthagorasz (Kr. e. 560 – 480)
        </text>

        {/* Overlap Box: x: 270 to 303, width = 33 */}
        <rect x="270" y="60" width="33" height="68" fill="#22c55e" opacity="0.3" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Callout */}
        <rect x="180" y="185" width="280" height="28" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="320" y="203" textAnchor="middle" fill="#14532d" fontSize="11" fontWeight="bold">
          ✓ Igen! 12 év közös időszak (Püthagorasz 12 éves volt)!
        </text>
      </svg>
    </div>
  );
};

/**
 * 3. Zedország három városa és a háromszög-egyenlőtlenség (Kompetenciamérés 2018, Tankönyv 31. o.)
 * Argad - Bugar távolság: 4000 km
 * Ciraz - Argad: 1300 km, Ciraz - Bugar: 3700 km
 * 1300 + 3700 = 5000 km > 4000 km -> Ciraz NINCS az egyenes úton!
 */
export const ZedCitiesTriangleSvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 540 240"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.3}px` : '290px' }}
      >
        <rect x="15" y="15" width="510" height="210" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="270" y="38" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">
          Zedország Városai: Ciraz az egyenes szakaszon van-e?
        </text>

        {/* City Argad (A) at (80, 160) */}
        <circle cx="80" cy="160" r="8" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
        <text x="80" y="185" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">Argad</text>

        {/* City Bugar (B) at (460, 160) */}
        <circle cx="460" cy="160" r="8" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
        <text x="460" y="185" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">Bugar</text>

        {/* Direct road AB */}
        <line x1="80" y1="160" x2="460" y2="160" stroke="#2563eb" strokeWidth="3" />
        <rect x="225" y="148" width="90" height="22" rx="6" fill="#dbeafe" />
        <text x="270" y="163" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
          4000 km (egyenes)
        </text>

        {/* City Ciraz (C) at (180, 70) */}
        <circle cx="180" cy="70" r="8" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
        <text x="180" y="58" textAnchor="middle" fill="#b91c1c" fontSize="12" fontWeight="black">Ciraz</text>

        {/* Roads AC and CB */}
        <line x1="80" y1="160" x2="180" y2="70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
        <text x="110" y="110" fill="#b45309" fontSize="11" fontWeight="bold">1300 km</text>

        <line x1="180" y1="70" x2="460" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
        <text x="310" y="105" fill="#b45309" fontSize="11" fontWeight="bold">3700 km</text>

        {/* Right Info Box */}
        <rect x="120" y="200" width="300" height="22" rx="6" fill="#fee2e2" />
        <text x="270" y="215" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="black">
          1300 km + 3700 km = 5000 km &gt; 4000 km ➔ Háromszöget alkotnak!
        </text>
      </svg>
    </div>
  );
};

/**
 * 4. Négyzetbe rajzolt háromszögek osztályozása (Tankönyv 32. oldal 16. feladat)
 * ABCD négyzet, E az AB felezőpontja, F a CD felezőpontja.
 * P: derékszögű, Q: egyenlő szárú.
 */
export const SquareTrianglesSvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 540 240"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.3}px` : '290px' }}
      >
        <rect x="15" y="15" width="510" height="210" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Square ABCD */}
        <rect x="50" y="45" width="150" height="150" fill="#ffffff" stroke="#334155" strokeWidth="2" />

        {/* Midpoints line EF */}
        <line x1="125" y1="45" x2="125" y2="195" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 2" />

        {/* Vertices */}
        <circle cx="50" cy="195" r="4" fill="#1e293b" />
        <text x="38" y="205" fill="#1e293b" fontSize="12" fontWeight="bold">A</text>

        <circle cx="200" cy="195" r="4" fill="#1e293b" />
        <text x="210" y="205" fill="#1e293b" fontSize="12" fontWeight="bold">B</text>

        <circle cx="200" cy="45" r="4" fill="#1e293b" />
        <text x="210" y="40" fill="#1e293b" fontSize="12" fontWeight="bold">C</text>

        <circle cx="50" cy="45" r="4" fill="#1e293b" />
        <text x="38" y="40" fill="#1e293b" fontSize="12" fontWeight="bold">D</text>

        {/* Midpoints E and F */}
        <circle cx="125" cy="195" r="4" fill="#2563eb" />
        <text x="125" y="215" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold">E</text>

        <circle cx="125" cy="45" r="4" fill="#2563eb" />
        <text x="125" y="35" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold">F</text>

        {/* Highlighted triangle ABC (diagonal AC) */}
        <polygon points="50,195 200,195 200,45" fill="#dbeafe" opacity="0.6" stroke="#2563eb" strokeWidth="2" />
        <text x="150" y="150" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">ABCΔ</text>

        {/* Right Info Classification */}
        <rect x="235" y="35" width="280" height="170" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="250" y="58" fill="#1e293b" fontSize="12" fontWeight="bold">
          Logikai Állítások a Háromszögekre:
        </text>
        <line x1="245" y1="67" x2="505" y2="67" stroke="#e2e8f0" strokeWidth="1" />

        <text x="250" y="85" fill="#16a34a" fontSize="11" fontWeight="bold">
          P ∧ Q (Derékszögű ÉS Egyenlő szárú):
        </text>
        <text x="250" y="100" fill="#15803d" fontSize="10">
          • ABCΔ (a négyzet fele: 45°-45°-90°)
        </text>
        <text x="250" y="115" fill="#15803d" fontSize="10">
          • EFDΔ (felező téglalap átlói)
        </text>

        <text x="250" y="137" fill="#2563eb" fontSize="11" fontWeight="bold">
          P ∧ ¬Q (Derékszögű, de NEM egyenlő szárú):
        </text>
        <text x="250" y="152" fill="#1d4ed8" fontSize="10">
          • ABFΔ, ECDΔ (1:2 befogójú derékszögű háromszögek)
        </text>

        <text x="250" y="174" fill="#d97706" fontSize="11" fontWeight="bold">
          ¬P ∧ Q (Egyenlő szárú, de NEM derékszögű):
        </text>
        <text x="250" y="189" fill="#b45309" fontSize="10">
          • CFEΔ, FACΔ
        </text>
      </svg>
    </div>
  );
};

