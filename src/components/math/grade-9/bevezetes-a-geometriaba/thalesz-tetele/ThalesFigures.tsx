import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Thalész-tétel alapábrája:
 * Kör átmérője AB, C a körvonal tetszőleges (A-tól és B-től különböző) pontja.
 * Az ACB szög mindig pontosan 90°.
 * Magyar derékszög-jelölés a C csúcsban: negyedkörív ponttal.
 */
export const ThalesTheoremSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 250"
      width={size}
      height={(size * 250) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="240" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#e0e7ff" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#3730a3">
        Thalész tétele • Átmérőhöz tartozó szög = 90°
      </text>

      <g transform="translate(10, 20)">
        {/* Kör: O(180, 120), R = 85 */}
        <circle cx="180" cy="120" r="85" fill="rgba(99, 102, 241, 0.05)" stroke="#6366f1" strokeWidth="2" />

        {/* Átmérő AB vízszintesen: A(95, 120), B(265, 120) */}
        <line x1="95" y1="120" x2="265" y2="120" stroke="#1e1b4b" strokeWidth="2.5" />

        {/* C pont a körvonalon: pl. szög 60° fent -> x = 180 + 85*cos(-120°) = 180 - 42.5 = 137.5, y = 120 - 85*sin(60°) = 120 - 73.6 = 46.4
            Vagy válasszunk egy szép pontot: C(135, 48)
            AC szakasz: (95, 120) -> (135, 48), BC: (265, 120) -> (135, 48)
        */}
        {/* Háromszög kitöltése */}
        <polygon points="95,120 265,120 135,48" fill="rgba(79, 70, 229, 0.12)" stroke="#4338ca" strokeWidth="2" />

        {/* C csúcsnál a magyar derékszög-jelölés (negyedkörív belső ponttal) */}
        <path d="M 127.2 62 A 16 16 0 0 0 149 55.8" fill="none" stroke="#4338ca" strokeWidth="1.5" />
        <circle cx="137.5" cy="56.6" r="1.3" fill="#4338ca" />

        {/* O pont (középpont) */}
        <circle cx="180" cy="120" r="3.5" fill="#4338ca" />
        <text x="180" y="136" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#4338ca">O</text>

        {/* Csúcsok feliratai */}
        <circle cx="95" cy="120" r="4" fill="#0f172a" />
        <text x="80" y="125" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>

        <circle cx="265" cy="120" r="4" fill="#0f172a" />
        <text x="272" y="125" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>

        <circle cx="135" cy="48" r="4" fill="#4338ca" />
        <text x="135" y="38" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#4338ca">C (90°)</text>

        {/* Átmérő d felirat */}
        <text x="220" y="115" fontSize="10" fontStyle="italic" fill="#475569">d = 2R</text>

        {/* Kártya felirat */}
        <rect x="230" y="45" width="130" height="36" rx="6" fill="#ffffff" stroke="#c7d2fe" strokeWidth="1" />
        <text x="295" y="60" fontSize="9.5" textAnchor="middle" fill="#312e81" fontWeight="bold">γ = ACB∠ = 90°</text>
        <text x="295" y="73" fontSize="8.5" textAnchor="middle" fill="#4338ca">bármely C pontra!</text>
      </g>
    </svg>
  );
};

/**
 * 2. A Thalész-tétel bizonyításának ábrája:
 * OC sugár behúzása -> két egyenlő szárú háromszög: AOC (alapon fekvő szögek: α, α)
 * és BOC (alapon fekvő szögek: β, β).
 * Belső szögek összege: 2α + 2β = 180° => α + β = 90°.
 */
export const ThalesProofSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 250"
      width={size}
      height={(size * 250) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="240" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#ede9fe" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#5b21b6">
        A tétel bizonyítása • 2 egyenlő szárú háromszög
      </text>

      <g transform="translate(10, 20)">
        {/* Kör: O(180, 120), R = 85 */}
        <circle cx="180" cy="120" r="85" fill="rgba(139, 92, 246, 0.04)" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Átmérő AB */}
        <line x1="95" y1="120" x2="265" y2="120" stroke="#1e1b4b" strokeWidth="2.5" />

        {/* C pont (135, 48) */}
        {/* AOC háromszög színezése */}
        <polygon points="95,120 180,120 135,48" fill="rgba(16, 185, 129, 0.12)" stroke="#059669" strokeWidth="1.8" />
        {/* BOC háromszög színezése */}
        <polygon points="180,120 265,120 135,48" fill="rgba(59, 130, 246, 0.12)" stroke="#2563eb" strokeWidth="1.8" />

        {/* OC sugár (felezővonal) */}
        <line x1="180" y1="120" x2="135" y2="48" stroke="#7c3aed" strokeWidth="2.2" strokeDasharray="3 2" />

        {/* Sugár egyenlőségek jelölése: OA = R, OB = R, OC = R */}
        <text x="135" y="132" fontSize="9" fontWeight="bold" fill="#059669">R</text>
        <text x="225" y="132" fontSize="9" fontWeight="bold" fill="#2563eb">R</text>
        <text x="160" y="80" fontSize="9" fontWeight="bold" fill="#7c3aed">R</text>

        {/* Szögek:
            A csúcsnál: α
            C bal oldalán: α
            B csúcsnál: β
            C jobb oldalán: β
        */}
        <text x="115" y="115" fontSize="10" fontWeight="bold" fill="#047857">α</text>
        <text x="127" y="68" fontSize="10" fontWeight="bold" fill="#047857">α</text>

        <text x="245" y="115" fontSize="10" fontWeight="bold" fill="#1d4ed8">β</text>
        <text x="150" y="68" fontSize="10" fontWeight="bold" fill="#1d4ed8">β</text>

        {/* Csúcsok */}
        <text x="80" y="125" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
        <text x="272" y="125" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
        <text x="135" y="38" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#5b21b6">C</text>
        <circle cx="180" cy="120" r="3.5" fill="#5b21b6" />
        <text x="180" y="145" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#5b21b6">O</text>

        {/* Levezetés kártya */}
        <rect x="230" y="38" width="135" height="46" rx="6" fill="#ffffff" stroke="#ddd6fe" strokeWidth="1" />
        <text x="297" y="52" fontSize="9" textAnchor="middle" fill="#4c1d95" fontWeight="bold">2α + 2β = 180°</text>
        <text x="297" y="65" fontSize="9" textAnchor="middle" fill="#5b21b6" fontWeight="bold">2(α + β) = 180°</text>
        <text x="297" y="78" fontSize="9" textAnchor="middle" fill="#7c3aed" fontWeight="bold">γ = α + β = 90° !</text>
      </g>
    </svg>
  );
};

/**
 * 3. Thalész-kör mint mértani hely és látószögek:
 * Pont a körön kívül (P_kívül) -> hegyesszög (< 90°)
 * Pont a körön (C) -> derékszög (= 90°)
 * Pont a körön belül (P_belül) -> tompaszög (> 90°)
 */
export const ThalesLocusSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 250"
      width={size}
      height={(size * 250) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="240" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#ecfdf5" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#065f46">
        Mértani hely • Látószögek: Körön, Belül, Kívül
      </text>

      <g transform="translate(10, 20)">
        {/* Kör: O(180, 125), R = 75 */}
        <circle cx="180" cy="125" r="75" fill="none" stroke="#059669" strokeWidth="2" />

        {/* Átmérő AB: A(105, 125), B(255, 125) */}
        <line x1="105" y1="125" x2="255" y2="125" stroke="#1e1b4b" strokeWidth="2.5" />

        {/* 1. Pont a körön: C(140, 62) -> 90° */}
        <line x1="105" y1="125" x2="140" y2="62" stroke="#059669" strokeWidth="1.8" />
        <line x1="255" y1="125" x2="140" y2="62" stroke="#059669" strokeWidth="1.8" />
        <circle cx="140" cy="62" r="4" fill="#059669" />
        <text x="140" y="52" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#059669">C (= 90°)</text>
        {/* Magyar derékszög C-nél */}
        <path d="M 133.2 74.2 A 14 14 0 0 0 152.3 68.7" fill="none" stroke="#059669" strokeWidth="1.2" />
        <circle cx="142" cy="70" r="1.1" fill="#059669" />

        {/* 2. Pont a körön belül: P_b(195, 95) -> tompaszög (> 90°) */}
        <line x1="105" y1="125" x2="195" y2="95" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="255" y1="125" x2="195" y2="95" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="195" cy="95" r="3.5" fill="#dc2626" />
        <text x="202" y="92" fontSize="9.5" fontWeight="bold" fill="#dc2626">Belül (&gt; 90°)</text>

        {/* 3. Pont a körön kívül: P_k(155, 30) -> hegyesszög (< 90°) */}
        <line x1="105" y1="125" x2="155" y2="30" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="255" y1="125" x2="155" y2="30" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="155" cy="30" r="3.5" fill="#2563eb" />
        <text x="160" y="25" fontSize="9.5" fontWeight="bold" fill="#2563eb">Kívül (&lt; 90°)</text>

        {/* Csúcsok */}
        <circle cx="105" cy="125" r="3.5" fill="#0f172a" />
        <text x="90" y="130" fontSize="12" fontWeight="bold" fill="#0f172a">A</text>
        <circle cx="255" cy="125" r="3.5" fill="#0f172a" />
        <text x="262" y="130" fontSize="12" fontWeight="bold" fill="#0f172a">B</text>

        {/* Összefoglaló doboz alul */}
        <rect x="30" y="165" width="310" height="32" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <text x="185" y="185" fontSize="9.5" textAnchor="middle" fill="#334155" fontWeight="bold">
          Körön: 90°  |  Körön belül: &gt; 90° (tompa)  |  Körön kívül: &lt; 90° (hegyes)
        </text>
      </g>
    </svg>
  );
};
