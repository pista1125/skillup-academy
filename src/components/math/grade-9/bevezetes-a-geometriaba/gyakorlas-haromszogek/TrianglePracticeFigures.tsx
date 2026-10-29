import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Szögek és összefüggések:
 * Belső szögek összege 180°, külső szög egyenlő a nem mellette fekvő két belső szög összegével:
 * alpha' = beta + gamma
 */
export const TriangleAnglesAndSidesSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Belső és külső szögek • Háromszög-egyenlőtlenség
      </text>

      <g transform="translate(10, 20)">
        {/* Háromszög: A(50, 170), B(270, 170), C(180, 50) */}
        {/* AB egyenes meghosszabbítása B-n túl a külső szöghöz: B(270, 170) -> (330, 170) */}
        <line x1="270" y1="170" x2="340" y2="170" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Háromszög test */}
        <polygon points="50,170 270,170 180,50" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2.5" />

        {/* Csúcsok feliratai */}
        <text x="35" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
        <text x="268" y="190" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
        <text x="175" y="42" fontSize="13" fontWeight="bold" fill="#0f172a">C</text>

        {/* alpha szögív A-nál */}
        <path d="M 80 170 A 30 30 0 0 0 72 150" fill="none" stroke="#d97706" strokeWidth="1.5" />
        <text x="85" y="160" fontSize="11" fontWeight="bold" fill="#b45309">α</text>

        {/* beta szögív B-nél */}
        <path d="M 240 170 A 30 30 0 0 1 252 146" fill="none" stroke="#d97706" strokeWidth="1.5" />
        <text x="238" y="162" fontSize="11" fontWeight="bold" fill="#b45309">β</text>

        {/* gamma szögív C-nél */}
        <path d="M 161.6 67 A 25 25 0 0 0 195 70" fill="none" stroke="#d97706" strokeWidth="1.5" />
        <text x="177" y="85" fontSize="11" fontWeight="bold" fill="#b45309">γ</text>

        {/* beta' külső szög B-nél: a BC szártól (255, 150) a meghosszabbított alapig (295, 170) */}
        <path d="M 255 150 A 25 25 0 0 1 295 170" fill="none" stroke="#dc2626" strokeWidth="2" />
        <text x="302" y="158" fontSize="12" fontWeight="bold" fill="#dc2626">β'</text>

        {/* Szabály kártya alul */}
        <rect x="25" y="165" width="220" height="32" rx="6" fill="#ffffff" stroke="#fcd34d" strokeWidth="1" />
        <text x="135" y="184" fontSize="10" textAnchor="middle" fill="#78350f" fontWeight="bold">
          α + β + γ = 180°  |  β' = α + γ
        </text>
      </g>
    </svg>
  );
};

/**
 * 2. Egyenlő szárú háromszög magassága és Pitagorasz-tétel:
 * Az alaphoz tartozó magasság felezi az alapot és a szárakkal két derékszögű háromszöget alkot.
 * Magyar derékszög-jelölés a talppontban.
 */
export const PythagorasHeightSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Egyenlő szárú háromszög • Magasság és Pitagorasz
      </text>

      <g transform="translate(10, 20)">
        {/* Háromszög: A(70, 170), B(290, 170), C(180, 45) -> a = 220, felező F(180, 170) */}
        {/* Bal oldali derékszögű háromszög enyhe kiemelése */}
        <polygon points="70,170 180,170 180,45" fill="rgba(16, 185, 129, 0.12)" stroke="none" />

        {/* Háromszög test */}
        <polygon points="70,170 290,170 180,45" fill="none" stroke="#059669" strokeWidth="2.5" />

        {/* Alaphoz tartozó m_a magasság */}
        <line x1="180" y1="45" x2="180" y2="170" stroke="#047857" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="180" cy="170" r="3" fill="#047857" />

        {/* Magyar derékszög jelölés F(180, 170)-nél (bal felső) */}
        <path d="M 168 170 A 12 12 0 0 1 180 158" fill="none" stroke="#047857" strokeWidth="1.2" />
        <circle cx="173" cy="165" r="1.2" fill="#047857" />

        {/* Csúcsok feliratai */}
        <text x="55" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
        <text x="298" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
        <text x="175" y="35" fontSize="13" fontWeight="bold" fill="#0f172a">C</text>

        {/* Szakaszjelölések */}
        {/* Szárak (b és b) */}
        <text x="110" y="105" fontSize="11" fontWeight="bold" fill="#047857">b (szár)</text>
        <text x="240" y="105" fontSize="11" fontWeight="bold" fill="#047857">b (szár)</text>

        {/* Magasság felirat */}
        <text x="186" y="110" fontSize="11" fontWeight="bold" fill="#047857">m_a</text>

        {/* Alap felezett részei */}
        <text x="115" y="186" fontSize="11" fontWeight="bold" fill="#334155">a / 2</text>
        <text x="225" y="186" fontSize="11" fontWeight="bold" fill="#334155">a / 2</text>

        {/* Felezési jelek */}
        <line x1="125" y1="166" x2="125" y2="174" stroke="#64748b" strokeWidth="1.5" />
        <line x1="235" y1="166" x2="235" y2="174" stroke="#64748b" strokeWidth="1.5" />

        {/* Képlet kártya */}
        <rect x="235" y="45" width="125" height="36" rx="6" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1" />
        <text x="297" y="60" fontSize="10" textAnchor="middle" fill="#065f46" fontWeight="bold">m_a² + (a/2)² = b²</text>
        <text x="297" y="73" fontSize="8.5" textAnchor="middle" fill="#047857">Pitagorasz-tétel</text>
      </g>
    </svg>
  );
};

/**
 * 3. Súlyvonal és arányok számításos ábrája:
 * Súlypont 2:1 aránya (|AS| = 2/3 s, |SF| = 1/3 s) és 6 azonos területű rész.
 */
export const MediansCalculationSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">
        Súlyvonal számítások • 2 : 1 arány és területek
      </text>

      <g transform="translate(10, 20)">
        {/* Háromszög: A(50, 170), B(310, 170), C(190, 40) */}
        <polygon points="50,170 310,170 190,40" fill="#f0f9ff" stroke="#2563eb" strokeWidth="2.2" />

        {/* Súlyvonalak:
            F_c(180, 170), F_a(250, 105), F_b(120, 105)
            S(183.3, 126.7)
        */}
        <line x1="50" y1="170" x2="250" y2="105" stroke="#3b82f6" strokeWidth="1.8" strokeDasharray="3 3" />
        <line x1="310" y1="170" x2="120" y2="105" stroke="#3b82f6" strokeWidth="1.8" strokeDasharray="3 3" />
        <line x1="190" y1="40" x2="180" y2="170" stroke="#3b82f6" strokeWidth="2" />

        {/* Csúcsok feliratai */}
        <text x="35" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
        <text x="320" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
        <text x="185" y="32" fontSize="13" fontWeight="bold" fill="#0f172a">C</text>

        {/* Súlypont S */}
        <circle cx="183" cy="127" r="4.5" fill="#ea580c" />
        <text x="193" y="130" fontSize="12" fontWeight="bold" fill="#ea580c">S</text>

        {/* 2 : 1 arány címkék a C-F_c vonalon */}
        <text x="150" y="85" fontSize="11" fontWeight="bold" fill="#c2410c">2 rész</text>
        <text x="145" y="155" fontSize="11" fontWeight="bold" fill="#c2410c">1 rész</text>

        {/* Pötty F_c-nél */}
        <circle cx="180" cy="170" r="3" fill="#2563eb" />
        <text x="180" y="186" fontSize="10" fill="#2563eb" fontWeight="bold" textAnchor="middle">F_c</text>

        {/* Számítási segédkártya */}
        <rect x="235" y="42" width="125" height="36" rx="6" fill="#ffffff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="297" y="56" fontSize="9.5" textAnchor="middle" fill="#1e40af" fontWeight="bold">s = 15 cm esetén</text>
        <text x="297" y="69" fontSize="8.5" textAnchor="middle" fill="#3b82f6">|CS| = 10, |SF_c| = 5</text>
      </g>
    </svg>
  );
};

/**
 * 4. Körülírt és beírt kör szimmetriája és összefoglalása:
 * R és r sugarak összevetése, derékszögű háromszög speciális képletei.
 */
export const CircumIncircleSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 250"
      width={size}
      height={(size * 250) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="240" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#fdf4ff" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#86198f">
        Körülírt kör (R) és Beírt kör (r) összefoglalás
      </text>

      <g transform="translate(10, 20)">
        {/* Derékszögű háromszög: C(70, 165), A(70, 50), B(270, 165)
            befogó a = 200 (CB), b = 115 (CA)
            átfogó c = sqrt(200^2 + 115^2) = sqrt(40000 + 13225) = sqrt(53225) ≈ 230.7
            Felezőpont O az átfogón: ((70+270)/2, (50+165)/2) = (170, 107.5)
            R = c / 2 ≈ 115.35
            r = (a + b - c) / 2 = (200 + 115 - 230.7) / 2 = 84.3 / 2 ≈ 42.15
            Beírt kör kp: I = (70 + r, 165 - r) = (112, 123)
        */}
        {/* Háromszög test */}
        <polygon points="70,165 270,165 70,50" fill="#faf5ff" stroke="#9333ea" strokeWidth="2.5" />

        {/* Magyar derékszög a C(70, 165) csúcsban: negyedkörív ponttal */}
        <path d="M 70 147 A 18 18 0 0 1 88 165" fill="none" stroke="#9333ea" strokeWidth="1.2" />
        <circle cx="78" cy="157" r="1.2" fill="#9333ea" />

        {/* Beírt kör: I(112, 123), r = 42 */}
        <circle cx="112" cy="123" r="42" fill="rgba(236, 72, 153, 0.08)" stroke="#ec4899" strokeWidth="1.8" />
        <circle cx="112" cy="123" r="3" fill="#ec4899" />
        <text x="117" y="121" fontSize="10" fontWeight="bold" fill="#ec4899">I (beírt)</text>

        {/* O pont az átfogó felezőjében */}
        <circle cx="170" cy="107.5" r="4" fill="#7e22ce" />
        <text x="178" y="105" fontSize="11" fontWeight="bold" fill="#7e22ce">O (R = c/2)</text>

        {/* Csúcsok feliratai */}
        <text x="50" y="175" fontSize="13" fontWeight="bold" fill="#0f172a">C</text>
        <text x="50" y="48" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
        <text x="280" y="175" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>

        {/* Képletek kártya */}
        <rect x="180" y="40" width="180" height="42" rx="6" fill="#ffffff" stroke="#e9d5ff" strokeWidth="1" />
        <text x="270" y="55" fontSize="9.5" textAnchor="middle" fill="#6b21a8" fontWeight="bold">
          R = c / 2  (Thalész)
        </text>
        <text x="270" y="70" fontSize="9" textAnchor="middle" fill="#be185d" fontWeight="bold">
          r = (a + b - c) / 2
        </text>
      </g>
    </svg>
  );
};

