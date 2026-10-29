import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Érintők szerkesztése külső P pontból:
 * k(O, r) kör, külső P pont.
 * OP szakasz felezőpontja F.
 * F középpontú, FO sugarú Thalész-kör metszi k-t E1 és E2 pontokban.
 * PE1 és PE2 az érintők. Magyar derékszög OE1 és PE1 között.
 */
export const TangentConstructionSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 250"
      width={size}
      height={(size * 250) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="240" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#eff6ff" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1e40af">
        Körhöz húzott érintők • Thalész-körös szerkesztés
      </text>

      <g transform="translate(10, 20)">
        {/* Eredeti kör: O(110, 120), r = 50 */}
        <circle cx="110" cy="120" r="50" fill="rgba(59, 130, 246, 0.08)" stroke="#2563eb" strokeWidth="2" />
        <circle cx="110" cy="120" r="3.5" fill="#2563eb" />
        <text x="96" y="125" fontSize="11" fontWeight="bold" fill="#1e40af">O</text>

        {/* Külső P pont: P(290, 120) -> d = 180 */}
        <circle cx="290" cy="120" r="4" fill="#0f172a" />
        <text x="300" y="125" fontSize="12" fontWeight="bold" fill="#0f172a">P</text>

        {/* OP szakasz */}
        <line x1="110" y1="120" x2="290" y2="120" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* OP felezőpontja: F(200, 120), R_thales = 90 */}
        <circle cx="200" cy="120" r="3" fill="#8b5cf6" />
        <text x="200" y="136" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#8b5cf6">F</text>

        {/* Thalész-kör F körül R = 90 */}
        <circle cx="200" cy="120" r="90" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Metszéspontok E1 és E2 (érintési pontok):
            O(110, 120), P(290, 120), d = 180, r = 50
            E_x: cos(alpha) = r / d = 50 / 180 = 5/18 ≈ 0.2778
            alpha = arccos(5/18) ≈ 73.87°
            E1_x = 110 + 50 * cos(73.87°) ≈ 110 + 13.89 ≈ 124
            E1_y = 120 - 50 * sin(73.87°) ≈ 120 - 48.03 ≈ 72
            E2_x = 124, E2_y = 120 + 48 = 168
        */}
        {/* Sugár OE1 és OE2 */}
        <line x1="110" y1="120" x2="124" y2="72" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="110" y1="120" x2="124" y2="168" stroke="#2563eb" strokeWidth="1.5" />

        {/* Érintők PE1 és PE2 */}
        <line x1="290" y1="120" x2="105" y2="67" stroke="#dc2626" strokeWidth="2" />
        <line x1="290" y1="120" x2="105" y2="173" stroke="#dc2626" strokeWidth="2" />

        {/* Érintési pontok feliratai */}
        <circle cx="124" cy="72" r="3.5" fill="#dc2626" />
        <text x="115" y="65" fontSize="10" fontWeight="bold" fill="#dc2626">E_1</text>

        <circle cx="124" cy="168" r="3.5" fill="#dc2626" />
        <text x="115" y="182" fontSize="10" fontWeight="bold" fill="#dc2626">E_2</text>

        {/* Magyar derékszög OE1 és PE1 között: negyedkörív ponttal */}
        <path d="M 120.6 83.5 A 12 12 0 0 0 135.5 75.3" fill="none" stroke="#2563eb" strokeWidth="1.2" />
        <circle cx="127.5" cy="78" r="1.2" fill="#2563eb" />

        {/* Kártya jegyzet */}
        <rect x="215" y="40" width="145" height="36" rx="6" fill="#ffffff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="287" y="54" fontSize="9.5" textAnchor="middle" fill="#1e40af" fontWeight="bold">OE_1 ⟂ PE_1 (Thalész)</text>
        <text x="287" y="67" fontSize="8.5" textAnchor="middle" fill="#dc2626">két érintő húzható</text>
      </g>
    </svg>
  );
};

/**
 * 2. Érintőszakaszok egyenlősége és Pitagorasz-tétel:
 * |PE1| = |PE2| = sqrt(d^2 - r^2)
 * OP szimmetriatengely.
 */
export const TangentLengthPythagorasSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Érintőszakaszok • Pitagorasz: |PE|² + r² = d²
      </text>

      <g transform="translate(10, 20)">
        {/* Derékszögű háromszög O-E1-P:
            O(90, 120), P(280, 120), E1(120, 60)
            d = OP = 190
            r = OE1 = 67
            e = PE1 = 178
        */}
        {/* Kitöltött deltoid (O E1 P E2) */}
        <polygon points="90,120 120,60 280,120 120,180" fill="rgba(16, 185, 129, 0.08)" stroke="#059669" strokeWidth="2" />

        {/* Körív részlet a körből */}
        <path d="M 120 60 A 67 67 0 0 1 120 180" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Szimmetriatengely OP */}
        <line x1="90" y1="120" x2="280" y2="120" stroke="#047857" strokeWidth="2" strokeDasharray="4 2" />

        {/* Magyar derékszög-jelölés E1-nél (OE1 és PE1 között) */}
        <path d="M 116.5 73 A 12 12 0 0 0 131.5 64.5" fill="none" stroke="#047857" strokeWidth="1.2" />
        <circle cx="123.5" cy="70" r="1.1" fill="#047857" />

        {/* Csúcsok feliratai */}
        <circle cx="90" cy="120" r="3.5" fill="#047857" />
        <text x="75" y="125" fontSize="11" fontWeight="bold" fill="#047857">O</text>

        <circle cx="280" cy="120" r="4" fill="#0f172a" />
        <text x="290" y="125" fontSize="12" fontWeight="bold" fill="#0f172a">P</text>

        <circle cx="120" cy="60" r="3.5" fill="#059669" />
        <text x="115" y="50" fontSize="11" fontWeight="bold" fill="#059669">E_1</text>

        <circle cx="120" cy="180" r="3.5" fill="#059669" />
        <text x="115" y="195" fontSize="11" fontWeight="bold" fill="#059669">E_2</text>

        {/* Oldalhossz feliratok */}
        <text x="95" y="85" fontSize="10" fontWeight="bold" fill="#047857">r</text>
        <text x="95" y="160" fontSize="10" fontWeight="bold" fill="#047857">r</text>
        <text x="200" y="80" fontSize="11" fontWeight="bold" fill="#059669">e (érintő)</text>
        <text x="200" y="170" fontSize="11" fontWeight="bold" fill="#059669">e (érintő)</text>
        <text x="190" y="115" fontSize="11" fontWeight="bold" fill="#047857">d = |OP|</text>

        {/* Kártya jegyzet */}
        <rect x="225" y="42" width="135" height="38" rx="6" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1" />
        <text x="292" y="56" fontSize="9.5" textAnchor="middle" fill="#065f46" fontWeight="bold">|PE_1| = |PE_2|</text>
        <text x="292" y="70" fontSize="8.5" textAnchor="middle" fill="#047857">e = √(d² - r²)</text>
      </g>
    </svg>
  );
};

/**
 * 3. Derékszögű háromszög szerkesztése átfogóból és magasságból:
 * c átmérőjű Thalész-kör és a c-vel párhuzamos, tőle m_c távolságra húzott egyenes metszése.
 */
export const RightTriangleConstructionSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 250"
      width={size}
      height={(size * 250) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="240" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#fef3c7" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#92400e">
        Szerkesztés: Adott c átfogó és m_c magasság
      </text>

      <g transform="translate(10, 20)">
        {/* Thalész-félkör: O(180, 150), R = 80 */}
        <path d="M 100 150 A 80 80 0 0 1 260 150" fill="rgba(245, 158, 11, 0.08)" stroke="#d97706" strokeWidth="2" />

        {/* c átfogó: A(100, 150) -> B(260, 150) */}
        <line x1="100" y1="150" x2="260" y2="150" stroke="#1e1b4b" strokeWidth="2.5" />

        {/* m_c magasságú párhuzamos egyenes: y = 150 - 55 = 95 */}
        <line x1="60" y1="95" x2="300" y2="95" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 3" />
        <text x="40" y="98" fontSize="10" fontWeight="bold" fill="#dc2626">m_c</text>

        {/* Metszéspont C a Thalész-körön:
            (x - 180)^2 + (95 - 150)^2 = 80^2
            (x - 180)^2 + (-55)^2 = 6400 -> 3025 -> (x - 180)^2 = 3375
            x - 180 = ±58.1 -> C1(122, 95), C2(238, 95)
        */}
        {/* Háromszög megrajzolása C1-gyel */}
        <polygon points="100,150 260,150 122,95" fill="none" stroke="#b45309" strokeWidth="2" />

        {/* C1 és C2 csúcsok */}
        <circle cx="122" cy="95" r="4" fill="#b45309" />
        <text x="115" y="85" fontSize="11" fontWeight="bold" fill="#b45309">C_1</text>

        <circle cx="238" cy="95" r="3.5" fill="#d97706" />
        <text x="245" y="85" fontSize="10" fontStyle="italic" fill="#d97706">C_2</text>

        {/* Magyar derékszög C1-nél */}
        <path d="M 116.5 107.5 A 14 14 0 0 0 133.5 103" fill="none" stroke="#b45309" strokeWidth="1.2" />
        <circle cx="123" cy="107" r="1.1" fill="#b45309" />

        {/* Magasságvonal berajzolása C1-ből lefelé */}
        <line x1="122" y1="95" x2="122" y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="127" y="125" fontSize="9" fontWeight="bold" fill="#dc2626">m_c</text>

        {/* Csúcsok feliratai */}
        <circle cx="100" cy="150" r="3.5" fill="#0f172a" />
        <text x="85" y="155" fontSize="12" fontWeight="bold" fill="#0f172a">A</text>

        <circle cx="260" cy="150" r="3.5" fill="#0f172a" />
        <text x="268" y="155" fontSize="12" fontWeight="bold" fill="#0f172a">B</text>

        <circle cx="180" cy="150" r="3" fill="#64748b" />
        <text x="180" y="165" fontSize="10" textAnchor="middle" fill="#64748b">O</text>

        {/* Kártya jegyzet */}
        <rect x="220" y="38" width="140" height="38" rx="6" fill="#ffffff" stroke="#fde68a" strokeWidth="1" />
        <text x="290" y="52" fontSize="9.5" textAnchor="middle" fill="#78350f" fontWeight="bold">Feltétel: m_c ≤ c / 2</text>
        <text x="290" y="66" fontSize="8.5" textAnchor="middle" fill="#b45309">2 megoldás létezik</text>
      </g>
    </svg>
  );
};

