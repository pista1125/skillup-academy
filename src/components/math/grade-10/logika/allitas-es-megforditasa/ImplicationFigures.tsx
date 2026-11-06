import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Implikáció és Ellenpélda Venn-diagramja:
 * A ⊂ B: "Ha egy szám osztható 6-tal (A), akkor osztható 3-mal is (B)"
 * A megfordítása ("Ha osztható 3-mal, akkor 6-tal is") HAMIS, mert a 9 a B-ben van, de nincs A-ban!
 */
export const ImplicationVennSvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 540 240"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.3}px` : '290px' }}
      >
        {/* Background Canvas */}
        <rect x="15" y="15" width="510" height="210" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Outer Set: B (3-mal osztható számok) */}
        <rect x="40" y="35" width="310" height="170" rx="20" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />
        <text x="55" y="60" fill="#0369a1" fontSize="13" fontWeight="bold">
          B: 3-mal osztható számok (Következmény)
        </text>

        {/* Inner Set: A (6-tal osztható számok) - A részhalmaza B-nek! */}
        <rect x="70" y="80" width="160" height="105" rx="14" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2.5" />
        <text x="85" y="105" fill="#15803d" fontSize="12" fontWeight="bold">
          A: 6-tal osztható
        </text>
        <text x="100" y="130" fill="#166534" fontSize="12" fontWeight="600">
          6, 12, 18, 24...
        </text>
        <text x="85" y="160" fill="#15803d" fontSize="11" fontStyle="italic">
          Ha A igaz → B is igaz!
        </text>

        {/* Counterexample region in B \ A */}
        <circle cx="280" cy="125" r="28" fill="#fecdd3" stroke="#e11d48" strokeWidth="2" />
        <text x="280" y="122" textAnchor="middle" fill="#9f1239" fontSize="13" fontWeight="black">
          9, 15, 21
        </text>
        <text x="280" y="139" textAnchor="middle" fill="#be123c" fontSize="10" fontWeight="bold">
          ELLENPÉLDA
        </text>

        {/* Right Info Box */}
        <rect x="365" y="35" width="150" height="170" rx="12" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="440" y="60" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">
          Logikai Elemzés
        </text>
        <line x1="380" y1="70" x2="500" y2="70" stroke="#e2e8f0" strokeWidth="1.5" />

        <text x="375" y="90" fill="#16a34a" fontSize="11" fontWeight="bold">Eredeti (A ⇒ B):</text>
        <text x="375" y="105" fill="#15803d" fontSize="11">„6-tal oszt. → 3-mal is”</text>
        <text x="375" y="122" fill="#16a34a" fontSize="11" fontWeight="black">✓ IGAZ (A ⊆ B)</text>

        <line x1="380" y1="132" x2="500" y2="132" stroke="#e2e8f0" strokeWidth="1" />

        <text x="375" y="150" fill="#dc2626" fontSize="11" fontWeight="bold">Megfordítás (B ⇒ A):</text>
        <text x="375" y="165" fill="#b91c1c" fontSize="11">„3-mal oszt. → 6-tal is”</text>
        <text x="375" y="182" fill="#dc2626" fontSize="11" fontWeight="black">✗ HAMIS (pl. 9)</text>
      </svg>
    </div>
  );
};

/**
 * 2. Szükséges és Elégséges Feltétel Diagram:
 * A ⇒ B: A elégséges feltétele B-nek, B szükséges feltétele A-nak.
 */
export const SufficientNecessarySvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 540 240"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.3}px` : '290px' }}
      >
        <rect x="15" y="15" width="510" height="210" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Box A */}
        <rect x="40" y="70" width="160" height="100" rx="12" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="120" y="100" textAnchor="middle" fill="#1e40af" fontSize="14" fontWeight="bold">A Állítás</text>
        <text x="120" y="122" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="600">„A négyszög négyzet”</text>
        <rect x="55" y="135" width="130" height="24" rx="6" fill="#bfdbfe" />
        <text x="120" y="151" textAnchor="middle" fill="#1e3a8a" fontSize="10" fontWeight="bold">ELÉGSÉGES FELTÉTEL</text>

        {/* Center Connecting Arrows */}
        <defs>
          <marker id="arrow-green" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#16a34a" />
          </marker>
          <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#0284c7" />
          </marker>
        </defs>

        {/* Forward Arrow A => B */}
        <path d="M 210 100 L 320 100" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrow-green)" />
        <text x="265" y="90" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">A ⇒ B (Következik)</text>

        {/* Backward Arrow: Szükséges */}
        <path d="M 320 140 L 210 140" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrow-blue)" />
        <text x="265" y="156" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="bold">B szükséges feltétel</text>

        {/* Box B */}
        <rect x="340" y="70" width="160" height="100" rx="12" fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" />
        <text x="420" y="100" textAnchor="middle" fill="#065f46" fontSize="14" fontWeight="bold">B Állítás</text>
        <text x="420" y="122" textAnchor="middle" fill="#059669" fontSize="12" fontWeight="600">„A négyszög téglalap”</text>
        <rect x="355" y="135" width="130" height="24" rx="6" fill="#a7f3d0" />
        <text x="420" y="151" textAnchor="middle" fill="#064e3b" fontSize="10" fontWeight="bold">SZÜKSÉGES FELTÉTEL</text>

        {/* Top/Bottom Explanations */}
        <text x="270" y="45" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="600">
          Ha egy négyszög négyzet, az már BŐVEN ELÉG ahhoz, hogy téglalap legyen.
        </text>
        <text x="270" y="200" textAnchor="middle" fill="#64748b" fontSize="11" fontStyle="italic">
          De téglalapnak lenni még NEM ELÉG a négyzethez, csak ELENGEDHETETLENÜL SZÜKSÉGES!
        </text>
      </svg>
    </div>
  );
};

/**
 * 3. Implikáció és Megfordításának Igazságtáblázata:
 * Összeveti az A ⇒ B és B ⇒ A oszlopait, rávilágítva, hogy a (I, H) és (H, I) sorokban különböznek!
 */
export const TruthTableImplicationSvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 540 240"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.3}px` : '290px' }}
      >
        <rect x="15" y="15" width="510" height="210" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Header */}
        <rect x="25" y="25" width="490" height="34" rx="8" fill="#1e293b" />
        <text x="65" y="47" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">A</text>
        <text x="125" y="47" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">B</text>
        <text x="220" y="47" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="black">A ⇒ B (Eredeti)</text>
        <text x="330" y="47" textAnchor="middle" fill="#fb923c" fontSize="13" fontWeight="black">B ⇒ A (Megfordítás)</text>
        <text x="440" y="47" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontWeight="bold">Egyeznek?</text>

        {/* Separator lines */}
        <line x1="95" y1="25" x2="95" y2="215" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="155" y1="25" x2="155" y2="215" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="275" y1="25" x2="275" y2="215" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="385" y1="25" x2="385" y2="215" stroke="#cbd5e1" strokeWidth="1" />

        {/* Row 1: I, I */}
        <line x1="25" y1="98" x2="515" y2="98" stroke="#e2e8f0" strokeWidth="1" />
        <text x="65" y="85" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">I</text>
        <text x="125" y="85" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">I</text>
        <text x="220" y="85" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="black">I (1)</text>
        <text x="330" y="85" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="black">I (1)</text>
        <text x="440" y="85" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="bold">✓ Igen</text>

        {/* Row 2: I, H */}
        <rect x="26" y="99" width="488" height="37" fill="#fee2e2" opacity="0.6" />
        <line x1="25" y1="137" x2="515" y2="137" stroke="#e2e8f0" strokeWidth="1" />
        <text x="65" y="123" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">I</text>
        <text x="125" y="123" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">H</text>
        <text x="220" y="123" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="black">H (0) ⚠️</text>
        <text x="330" y="123" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="black">I (1)</text>
        <text x="440" y="123" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">✗ NEM</text>

        {/* Row 3: H, I */}
        <rect x="26" y="138" width="488" height="37" fill="#ffedd5" opacity="0.6" />
        <line x1="25" y1="176" x2="515" y2="176" stroke="#e2e8f0" strokeWidth="1" />
        <text x="65" y="161" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">H</text>
        <text x="125" y="161" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">I</text>
        <text x="220" y="161" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="black">I (1)</text>
        <text x="330" y="161" textAnchor="middle" fill="#dc2626" fontSize="14" fontWeight="black">H (0) ⚠️</text>
        <text x="440" y="161" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">✗ NEM</text>

        {/* Row 4: H, H */}
        <text x="65" y="201" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">H</text>
        <text x="125" y="201" textAnchor="middle" fill="#1e293b" fontSize="13" fontWeight="bold">H</text>
        <text x="220" y="201" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="black">I (1)</text>
        <text x="330" y="201" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="black">I (1)</text>
        <text x="440" y="201" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="bold">✓ Igen</text>
      </svg>
    </div>
  );
};

/**
 * 4. Ekvivalencia és Kölcsönös Implikáció (A ⇔ B):
 * Paralelogramma és Szemközti Szögek egyenlősége oda-vissza teljesül!
 */
export const EquivalenceParallelogramSvg: React.FC<FigureProps> = ({ size = 240, className = '' }) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <svg
        viewBox="0 0 540 240"
        className="w-full max-w-xl h-auto drop-shadow-sm select-none"
        style={{ maxHeight: size ? `${size * 1.3}px` : '290px' }}
      >
        <rect x="15" y="15" width="510" height="210" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* Left Box: A */}
        <rect x="35" y="55" width="170" height="130" rx="12" fill="#faf5ff" stroke="#a855f7" strokeWidth="2" />
        <text x="120" y="85" textAnchor="middle" fill="#6b21a8" fontSize="13" fontWeight="bold">
          A Állítás
        </text>
        <text x="120" y="110" textAnchor="middle" fill="#7e22ce" fontSize="12" fontWeight="600">
          Egy négyszög
        </text>
        <text x="120" y="130" textAnchor="middle" fill="#581c87" fontSize="14" fontWeight="black">
          PARALELOGRAMMA
        </text>
        {/* Parallelogram mini shape */}
        <polygon points="80,165 150,165 135,145 65,145" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />

        {/* Center: Double Arrow (Equivalence) */}
        <defs>
          <marker id="double-left" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto">
            <path d="M 8 0 L 0 4 L 8 8 z" fill="#7c3aed" />
          </marker>
          <marker id="double-right" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#7c3aed" />
          </marker>
        </defs>
        <line
          x1="225"
          y1="110"
          x2="315"
          y2="110"
          stroke="#7c3aed"
          strokeWidth="4"
          markerStart="url(#double-left)"
          markerEnd="url(#double-right)"
        />
        <rect x="235" y="125" width="70" height="22" rx="6" fill="#ede9fe" />
        <text x="270" y="140" textAnchor="middle" fill="#6d28d9" fontSize="11" fontWeight="black">
          A ⟺ B
        </text>
        <text x="270" y="165" textAnchor="middle" fill="#475569" fontSize="10" fontStyle="italic">
          „Akkor és csak akkor”
        </text>

        {/* Right Box: B */}
        <rect x="335" y="55" width="170" height="130" rx="12" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
        <text x="420" y="85" textAnchor="middle" fill="#15803d" fontSize="13" fontWeight="bold">
          B Állítás
        </text>
        <text x="420" y="110" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="600">
          Egy négyszög
        </text>
        <text x="420" y="130" textAnchor="middle" fill="#14532d" fontSize="13" fontWeight="black">
          szemközti szögei egyenlők
        </text>
        {/* Equal angles indicator */}
        <text x="420" y="160" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          α = γ  és  β = δ
        </text>

        {/* Bottom Banner */}
        <text x="270" y="210" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="600">
          Kétirányú következtetés: A ⇒ B ÉS B ⇒ A egyszerre teljesül!
        </text>
      </svg>
    </div>
  );
};

