import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Halmazok egymásba ágyazása: M ⊆ É.T. ⊆ A Venn-diagram
export const DomainInclusionSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fff1f2" stroke="#fecdd3" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9f1239" fontFamily="system-ui, sans-serif">
        Halmazok Kapcsolata: M ⊆ É.T. ⊆ A
      </text>

      {/* 1. Külső halmaz: Alaphalmaz (A) */}
      <g transform="translate(40, 45)">
        <rect width="300" height="135" rx="16" fill="#ffffff" stroke="#f43f5e" strokeWidth="2" />
        <rect width="300" height="24" rx="16" fill="#ffe4e6" />
        <text x="150" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9f1239" fontFamily="sans-serif">
          ALAPHALMAZ (A = ℝ, ℤ, ℕ...)
        </text>

        {/* 2. Középső halmaz: Értelmezési Tartomány (É.T.) */}
        <g transform="translate(25, 32)">
          <rect width="250" height="92" rx="12" fill="#fff1f2" stroke="#fb7185" strokeWidth="1.5" />
          <text x="125" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be123c" fontFamily="sans-serif">
            ÉRTELMEZÉSI TARTOMÁNY (É.T.)
          </text>
          <text x="215" y="18" fontSize="8" fill="#e11d48" fontStyle="italic">(Kikötések)</text>

          {/* 3. Belső halmaz: Megoldáshalmaz (M) */}
          <g transform="translate(45, 28)">
            <rect width="160" height="52" rx="10" fill="#f43f5e" />
            <text x="80" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif">
              MEGOLDÁSHALMAZ (M)
            </text>
            <text x="80" y="40" textAnchor="middle" fontSize="11" fontWeight="black" fill="#fff1f2" fontFamily="monospace">
              M = &#123; valódi gyökök &#125;
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};

// 2. Törtes Kikötés: Nevező ≠ 0
export const FractionRestrictionSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#831843" fontFamily="system-ui, sans-serif">
        Törtes Kifejezések: Nullával Nem Osztunk!
      </text>

      {/* Kifejezés doboz */}
      <g transform="translate(30, 48)">
        <rect width="140" height="120" rx="10" fill="#ffffff" stroke="#f472b6" strokeWidth="1.5" />
        <text x="70" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9d174d" fontFamily="sans-serif">
          Törtes Egyenlet:
        </text>

        {/* Tört vizuálisan */}
        <text x="70" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155" fontFamily="monospace">
          2x + 1
        </text>
        <line x1="25" y1="65" x2="115" y2="65" stroke="#db2777" strokeWidth="2" />
        <text x="70" y="85" textAnchor="middle" fontSize="15" fontWeight="black" fill="#be185d" fontFamily="monospace">
          x - 3
        </text>
        <text x="70" y="105" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily="monospace">
          = 5
        </text>
      </g>

      {/* Nyíl és Kikötés Lépések */}
      <g transform="translate(190, 50)">
        <rect width="160" height="116" rx="10" fill="#ffffff" stroke="#f472b6" strokeWidth="1.5" />
        <text x="80" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be185d" fontFamily="sans-serif">
          Kötelező Kikötés:
        </text>

        <rect x="15" y="32" width="130" height="28" rx="6" fill="#fce7f3" />
        <text x="80" y="50" textAnchor="middle" fontSize="12" fontWeight="black" fill="#9d174d" fontFamily="monospace">
          Nevező ≠ 0
        </text>

        <text x="80" y="76" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be185d" fontFamily="monospace">
          x - 3 ≠ 0 → x ≠ 3
        </text>

        <rect x="15" y="86" width="130" height="22" rx="4" fill="#f43f5e" />
        <text x="80" y="101" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          É.T. = ℝ \ &#123;3&#125;
        </text>
      </g>
    </svg>
  );
};

// 3. Négyzetgyökös Kikötés: Gyökjel alatt ≥ 0
export const SquareRootRestrictionSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fff1f2" stroke="#fecdd3" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9f1239" fontFamily="system-ui, sans-serif">
        Négyzetgyökös Kifejezések: Nemnegatív Érték!
      </text>

      {/* Bal doboz: Gyökös egyenlet */}
      <g transform="translate(30, 50)">
        <rect width="140" height="115" rx="10" fill="#ffffff" stroke="#fda4af" strokeWidth="1.5" />
        <text x="70" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#881337" fontFamily="sans-serif">
          Gyökös Egyenlet:
        </text>

        {/* Gyökjel */}
        <g transform="translate(25, 45)">
          <path d="M 5 25 L 12 25 L 18 35 L 28 5 L 85 5" fill="none" stroke="#e11d48" strokeWidth="2.5" />
          <text x="56" y="25" textAnchor="middle" fontSize="15" fontWeight="black" fill="#be123c" fontFamily="monospace">
            x - 4
          </text>
        </g>
        <text x="70" y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily="monospace">
          = 3
        </text>
      </g>

      {/* Jobb doboz: Kikötés és intervallum */}
      <g transform="translate(190, 50)">
        <rect width="160" height="115" rx="10" fill="#ffffff" stroke="#fda4af" strokeWidth="1.5" />
        <text x="80" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9f1239" fontFamily="sans-serif">
          Kikötés Valós Számokon:
        </text>

        <rect x="15" y="32" width="130" height="26" rx="6" fill="#ffe4e6" />
        <text x="80" y="49" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c" fontFamily="monospace">
          Gyök alatti ≥ 0
        </text>

        <text x="80" y="74" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#881337" fontFamily="monospace">
          x - 4 ≥ 0 → x ≥ 4
        </text>

        <rect x="15" y="84" width="130" height="22" rx="4" fill="#e11d48" />
        <text x="80" y="99" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          É.T. = [4; +∞[
        </text>
      </g>
    </svg>
  );
};

// 4. Hamis Gyök és Érvénytelen Megoldás
export const FalseRootSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fff5f5" stroke="#fed7d7" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c53030" fontFamily="system-ui, sans-serif">
        Hamis Gyök: A Kikötés Kizárja a Megoldást!
      </text>

      {/* Egyenlet felül */}
      <g transform="translate(50, 44)">
        <rect width="280" height="30" rx="6" fill="#ffffff" stroke="#feb2b2" strokeWidth="1.5" />
        <text x="140" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9b2c2c" fontFamily="monospace">
          (x² - 9) / (x - 3) = 6
        </text>
      </g>

      {/* Két oszlop: Számolás vs. Kikötés */}
      <g transform="translate(30, 84)">
        <rect width="150" height="92" rx="8" fill="#ffffff" stroke="#cbd5e1" />
        <text x="75" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569" fontFamily="sans-serif">
          Algebrai Átalakítás:
        </text>
        <text x="75" y="38" textAnchor="middle" fontSize="11" fill="#334155" fontFamily="monospace">
          (x - 3)(x + 3)/(x - 3) = 6
        </text>
        <text x="75" y="56" textAnchor="middle" fontSize="11" fill="#334155" fontFamily="monospace">
          x + 3 = 6
        </text>
        <rect x="25" y="64" width="100" height="20" rx="4" fill="#3b82f6" />
        <text x="75" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          Jelölt: x = 3
        </text>
      </g>

      <g transform="translate(200, 84)">
        <rect width="150" height="92" rx="8" fill="#fff5f5" stroke="#fca5a5" />
        <text x="75" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b" fontFamily="sans-serif">
          Kikötés és Ellenőrzés:
        </text>
        <text x="75" y="38" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
          Nevező ≠ 0 → x ≠ 3!
        </text>
        <text x="75" y="56" textAnchor="middle" fontSize="9" fill="#7f1d1d" fontFamily="sans-serif">
          x = 3 HAMIS GYÖK!
        </text>
        <rect x="25" y="64" width="100" height="20" rx="4" fill="#dc2626" />
        <text x="75" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          M = ∅ (Üres!)
        </text>
      </g>
    </svg>
  );
};
