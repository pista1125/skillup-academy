import React from 'react';

export interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. A Hatványozás Fogalma és az Exponenciális Növekedés
 * Összehasonlítás: Ismételt összeadás (szorzás) vs Ismételt szorzás (hatványozás)
 * Alap (a), Kitevő (n), Hatványérték
 */
export const PowersConceptSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 260"
        style={size ? { width: size, height: (size * 260) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="baseBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="expBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Bal oldali rész: A Hatvány Felépítése */}
        <g transform="translate(35, 30)">
          <rect x="0" y="0" width="200" height="200" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="100" y="30" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="13">
            A Hatvány Részei
          </text>
          <line x1="20" y1="42" x2="180" y2="42" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Nagy hatvány: a^n */}
          {/* Alap: a */}
          <text x="75" y="130" fill="#1d4ed8" fontWeight="black" fontSize="56" fontFamily="serif">
            a
          </text>
          {/* Kitevő: n */}
          <text x="112" y="90" fill="#d97706" fontWeight="black" fontSize="34" fontFamily="serif">
            n
          </text>

          {/* Címkék mutatókkal */}
          {/* Kitevő mutató */}
          <path d="M 140 85 L 170 85" stroke="#d97706" strokeWidth="1.5" />
          <text x="175" y="88" fill="#d97706" fontWeight="bold" fontSize="11" textAnchor="start">
            Kitevő (exponens)
          </text>

          {/* Alap mutató */}
          <path d="M 40 120 L 60 120" stroke="#1d4ed8" strokeWidth="1.5" />
          <text x="35" y="124" fill="#1d4ed8" fontWeight="bold" fontSize="11" textAnchor="end">
            Alap (bázis)
          </text>

          {/* Jelentés alul */}
          <rect x="15" y="155" width="170" height="32" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
          <text x="100" y="175" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="11">
            aⁿ = a · a · ... · a (n db)
          </text>
        </g>

        {/* Jobb oldali rész: Szorzás vs Hatványozás összehasonlítása */}
        <g transform="translate(260, 30)">
          <rect x="0" y="0" width="230" height="200" rx="16" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          <text x="115" y="30" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="13">
            Szorzás vs. Hatványozás
          </text>
          <line x1="20" y1="42" x2="210" y2="42" stroke="#f1f5f9" strokeWidth="1.5" />

          {/* 1. Ismételt összeadás = Szorzás */}
          <g transform="translate(15, 55)">
            <rect x="0" y="0" width="200" height="58" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
            <text x="10" y="20" fill="#166534" fontWeight="bold" fontSize="10">
              Ismételt ÖSSZEADÁS ⟹ Szorzás:
            </text>
            <text x="10" y="42" fill="#15803d" fontWeight="black" fontSize="13">
              3 + 3 + 3 + 3 = 4 · 3 = 12
            </text>
          </g>

          {/* 2. Ismételt szorzás = Hatványozás */}
          <g transform="translate(15, 125)">
            <rect x="0" y="0" width="200" height="62" rx="10" fill="#fefce8" stroke="#fde047" strokeWidth="1" />
            <text x="10" y="20" fill="#854d0e" fontWeight="bold" fontSize="10">
              Ismételt SZORZÁS ⟹ Hatványozás:
            </text>
            <text x="10" y="42" fill="#a16207" fontWeight="black" fontSize="14">
              3 · 3 · 3 · 3 = 3⁴ = 81
            </text>
            <text x="10" y="56" fill="#ca8a04" fontWeight="bold" fontSize="9">
              (6,75-ször nagyobb növekedés!)
            </text>
          </g>
        </g>

        {/* Lábléc */}
        <rect x="35" y="238" width="455" height="20" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
        <text x="262" y="252" textAnchor="middle" fill="#475569" fontWeight="bold" fontSize="10">
          A hatványozás a természetben és informatikában megjelenő robbanásszerű exponenciális növekedés nyelve.
        </text>
      </svg>
    </div>
  );
};

/**
 * 2. A Nulladik és a Negatív Egész Kitevő Értelmezése
 * Lépcsős / Létra diagram: Miért a⁰ = 1, és miért a⁻ⁿ = 1 / aⁿ?
 * Fentről lefelé mindig osztunk az alappal (pl. 2-vel)!
 */
export const NegativeZeroExponentSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 270"
        style={size ? { width: size, height: (size * 270) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <marker id="ladderDown" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
          </marker>
        </defs>

        {/* Felső címke */}
        <rect x="90" y="10" width="340" height="26" rx="6" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />
        <text x="260" y="27" textAnchor="middle" fill="#0369a1" fontWeight="900" fontSize="12">
          A 2 Hatványainak Létrája (Fentről lefelé mindig : 2)
        </text>

        {/* Létrafokok (7 fok: 2^3 -> 2^2 -> 2^1 -> 2^0 -> 2^-1 -> 2^-2 -> 2^-3) */}
        {/* Pozitív kitevők */}
        <g transform="translate(100, 48)">
          <rect x="0" y="0" width="170" height="25" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          <text x="35" y="17" fill="#1e3a8a" fontWeight="black" fontSize="13">2³</text>
          <text x="85" y="17" fill="#1e40af" fontSize="11">=</text>
          <text x="135" y="17" fill="#1e3a8a" fontWeight="black" fontSize="13">8</text>
        </g>
        {/* Nyíl :2 */}
        <path d="M 285 60 L 325 60" stroke="#0284c7" strokeWidth="1.5" markerEnd="url(#ladderDown)" />
        <text x="305" y="54" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">: 2</text>

        <g transform="translate(100, 78)">
          <rect x="0" y="0" width="170" height="25" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          <text x="35" y="17" fill="#1e3a8a" fontWeight="black" fontSize="13">2²</text>
          <text x="85" y="17" fill="#1e40af" fontSize="11">=</text>
          <text x="135" y="17" fill="#1e3a8a" fontWeight="black" fontSize="13">4</text>
        </g>
        <path d="M 285 90 L 325 90" stroke="#0284c7" strokeWidth="1.5" markerEnd="url(#ladderDown)" />
        <text x="305" y="84" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">: 2</text>

        <g transform="translate(100, 108)">
          <rect x="0" y="0" width="170" height="25" rx="6" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
          <text x="35" y="17" fill="#1e3a8a" fontWeight="black" fontSize="13">2¹</text>
          <text x="85" y="17" fill="#1e40af" fontSize="11">=</text>
          <text x="135" y="17" fill="#1e3a8a" fontWeight="black" fontSize="13">2</text>
        </g>
        <path d="M 285 120 L 325 120" stroke="#0284c7" strokeWidth="1.5" markerEnd="url(#ladderDown)" />
        <text x="305" y="114" textAnchor="middle" fill="#0284c7" fontSize="10" fontWeight="bold">: 2</text>

        {/* KULCSPONT: 2^0 = 1 (Kiemelve sárga háttérrel) */}
        <g transform="translate(90, 138)">
          <rect x="0" y="0" width="190" height="30" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="40" y="20" fill="#b45309" fontWeight="black" fontSize="15">2⁰</text>
          <text x="95" y="20" fill="#b45309" fontSize="13">=</text>
          <text x="150" y="20" fill="#b45309" fontWeight="black" fontSize="16">1</text>
        </g>
        <path d="M 295 153 L 335 153" stroke="#b45309" strokeWidth="2" markerEnd="url(#ladderDown)" />
        <text x="315" y="147" textAnchor="middle" fill="#b45309" fontSize="10" fontWeight="black">: 2</text>
        <text x="345" y="157" fill="#b45309" fontWeight="black" fontSize="11">👈 2 / 2 = 1 !</text>

        {/* Negatív kitevők (rózsaszín/lila háttérrel: reciprokok!) */}
        <g transform="translate(100, 174)">
          <rect x="0" y="0" width="170" height="25" rx="6" fill="#fce7f3" stroke="#f472b6" strokeWidth="1" />
          <text x="35" y="17" fill="#9d174d" fontWeight="black" fontSize="13">2⁻¹</text>
          <text x="85" y="17" fill="#9d174d" fontSize="11">=</text>
          <text x="135" y="17" fill="#9d174d" fontWeight="black" fontSize="12">1/2 = 0,5</text>
        </g>
        <path d="M 285 186 L 325 186" stroke="#db2777" strokeWidth="1.5" markerEnd="url(#ladderDown)" />
        <text x="305" y="180" textAnchor="middle" fill="#db2777" fontSize="10" fontWeight="bold">: 2</text>

        <g transform="translate(100, 204)">
          <rect x="0" y="0" width="170" height="25" rx="6" fill="#fce7f3" stroke="#f472b6" strokeWidth="1" />
          <text x="35" y="17" fill="#9d174d" fontWeight="black" fontSize="13">2⁻²</text>
          <text x="85" y="17" fill="#9d174d" fontSize="11">=</text>
          <text x="135" y="17" fill="#9d174d" fontWeight="black" fontSize="12">1/4 = 0,25</text>
        </g>
        <path d="M 285 216 L 325 216" stroke="#db2777" strokeWidth="1.5" markerEnd="url(#ladderDown)" />
        <text x="305" y="210" textAnchor="middle" fill="#db2777" fontSize="10" fontWeight="bold">: 2</text>

        <g transform="translate(100, 234)">
          <rect x="0" y="0" width="170" height="25" rx="6" fill="#fce7f3" stroke="#f472b6" strokeWidth="1" />
          <text x="35" y="17" fill="#9d174d" fontWeight="black" fontSize="13">2⁻³</text>
          <text x="85" y="17" fill="#9d174d" fontSize="11">=</text>
          <text x="135" y="17" fill="#9d174d" fontWeight="black" fontSize="12">1/8 = 0,125</text>
        </g>

        {/* Jobb oldali aranyszabály doboz */}
        <g transform="translate(345, 175)">
          <rect x="0" y="0" width="145" height="75" rx="8" fill="#ffffff" stroke="#f472b6" strokeWidth="1.5" />
          <text x="72" y="20" textAnchor="middle" fill="#9d174d" fontWeight="black" fontSize="11">
            Reciprok Szabály
          </text>
          <line x1="10" y1="28" x2="135" y2="28" stroke="#fbcfe8" strokeWidth="1" />
          <text x="72" y="46" textAnchor="middle" fill="#be185d" fontWeight="black" fontSize="13">
            a⁻ⁿ = 1 / aⁿ
          </text>
          <text x="72" y="64" textAnchor="middle" fill="#9d174d" fontSize="9">
            (a/b)⁻ⁿ = (b/a)ⁿ
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. A Hatványozás 5 Alapazonossága
 * Grafikus összefoglaló kártya példákkal
 */
export const PowerIdentitiesSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 250"
        style={size ? { width: size, height: (size * 250) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        {/* Felső Fejléc */}
        <rect x="30" y="12" width="460" height="28" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <text x="260" y="31" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="13">
          A Hatványozás 5 Alapazonossága (a, b &gt; 0, k, m ∈ ℤ)
        </text>

        {/* 1. Azonosság: Szorzás -> Kitevők összeadódnak */}
        <g transform="translate(30, 48)">
          <rect x="0" y="0" width="225" height="56" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
          <text x="12" y="20" fill="#166534" fontWeight="black" fontSize="11">1. Azonos alapúak szorzása:</text>
          <text x="12" y="42" fill="#15803d" fontWeight="black" fontSize="14">aᵏ · aᵐ = aᵏ⁺ᵐ</text>
          <text x="145" y="42" fill="#16a34a" fontSize="10">pl. 2³ · 2⁴ = 2⁷</text>
        </g>

        {/* 2. Azonosság: Osztás -> Kitevők kivonódnak */}
        <g transform="translate(265, 48)">
          <rect x="0" y="0" width="225" height="56" rx="10" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
          <text x="12" y="20" fill="#1e40af" fontWeight="black" fontSize="11">2. Azonos alapúak osztása:</text>
          <text x="12" y="42" fill="#1d4ed8" fontWeight="black" fontSize="14">aᵏ / aᵐ = aᵏ⁻ᵐ</text>
          <text x="145" y="42" fill="#2563eb" fontSize="10">pl. 5⁶ / 5² = 5⁴</text>
        </g>

        {/* 3. Azonosság: Hatvány hatványozása -> Kitevők szorzódnak */}
        <g transform="translate(30, 112)">
          <rect x="0" y="0" width="225" height="56" rx="10" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5" />
          <text x="12" y="20" fill="#92400e" fontWeight="black" fontSize="11">3. Hatvány hatványozása:</text>
          <text x="12" y="42" fill="#b45309" fontWeight="black" fontSize="14">(aᵏ)ᵐ = aᵏ · ᵐ</text>
          <text x="140" y="42" fill="#d97706" fontSize="10">pl. (3²)⁴ = 3⁸</text>
        </g>

        {/* 4. Azonosság: Szorzat hatványozása */}
        <g transform="translate(265, 112)">
          <rect x="0" y="0" width="225" height="56" rx="10" fill="#fdf4ff" stroke="#f0abfc" strokeWidth="1.5" />
          <text x="12" y="20" fill="#86198f" fontWeight="black" fontSize="11">4. Szorzat hatványozása:</text>
          <text x="12" y="42" fill="#a21caf" fontWeight="black" fontSize="14">(a · b)ᵏ = aᵏ · bᵏ</text>
          <text x="140" y="42" fill="#c026d3" fontSize="10">pl. (2·x)³ = 8x³</text>
        </g>

        {/* 5. Azonosság: Hányados hatványozása */}
        <g transform="translate(30, 176)">
          <rect x="0" y="0" width="460" height="60" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="15" y="20" fill="#334155" fontWeight="black" fontSize="11">5. Hányados (tört) hatványozása:</text>
          <text x="15" y="45" fill="#0f172a" fontWeight="black" fontSize="15">(a / b)ᵏ = aᵏ / bᵏ</text>
          <text x="180" y="45" fill="#475569" fontSize="11">és negatív kitevőre: (a / b)⁻ᵏ = (b / a)ᵏ</text>
          <text x="375" y="45" fill="#2563eb" fontWeight="bold" fontSize="11">pl. (2/3)⁻² = (3/2)² = 9/4</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Negatív Alap és Kitevő Paritása (A Zárójel Fontossága!)
 * - (-2)⁴ = +16 (páros kitevő)
 * - (-2)³ = -8 (páratlan kitevő)
 * - Csapda: -2⁴ = -16 (a mínuszjel NINCS a kitevő alatt!)
 */
export const BaseSignParitySvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 500 230"
        style={size ? { width: size, height: (size * 230) / 500 } : { width: '100%', maxWidth: 500, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        {/* Bal oldali doboz: Zárójellel */}
        <g transform="translate(30, 20)">
          <rect x="0" y="0" width="205" height="190" rx="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
          <text x="102" y="26" textAnchor="middle" fill="#15803d" fontWeight="black" fontSize="13">
            VAN Zárójel: (-a)ⁿ
          </text>
          <line x1="15" y1="38" x2="190" y2="38" stroke="#bbf7d0" strokeWidth="1.5" />

          {/* Páros kitevő */}
          <rect x="15" y="50" width="175" height="52" rx="8" fill="#ffffff" stroke="#86efac" strokeWidth="1" />
          <text x="25" y="70" fill="#15803d" fontWeight="black" fontSize="14">(-2)⁴ = +16</text>
          <text x="25" y="90" fill="#16a34a" fontSize="10">Páros kitevő ⟹ POZITÍV (+)</text>

          {/* Páratlan kitevő */}
          <rect x="15" y="115" width="175" height="52" rx="8" fill="#ffffff" stroke="#fca5a5" strokeWidth="1" />
          <text x="25" y="135" fill="#b91c1c" fontWeight="black" fontSize="14">(-2)³ = -8</text>
          <text x="25" y="155" fill="#dc2626" fontSize="10">Páratlan kitevő ⟹ NEGATÍV (-)</text>
        </g>

        {/* Jobb oldali doboz: ZÁRÓJEL NÉLKÜL (CSAPDA!) */}
        <g transform="translate(265, 20)">
          <rect x="0" y="0" width="205" height="190" rx="14" fill="#fff1f2" stroke="#fda4af" strokeWidth="2" />
          <text x="102" y="26" textAnchor="middle" fill="#be123c" fontWeight="black" fontSize="13">
            NINCS Zárójel: -aⁿ (CSAPDA!)
          </text>
          <line x1="15" y1="38" x2="190" y2="38" stroke="#fecdd3" strokeWidth="1.5" />

          {/* Nincs zárójel, páros kitevő */}
          <rect x="15" y="50" width="175" height="52" rx="8" fill="#ffffff" stroke="#fda4af" strokeWidth="1" />
          <text x="25" y="70" fill="#9f1239" fontWeight="black" fontSize="14">-2⁴ = -16 !</text>
          <text x="25" y="90" fill="#be123c" fontSize="10">-(2⁴) = -16 (MINDIG negatív!)</text>

          {/* Magyarázat */}
          <rect x="15" y="115" width="175" height="60" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <text x="25" y="135" fill="#475569" fontWeight="bold" fontSize="11">Miért?</text>
          <text x="25" y="152" fill="#64748b" fontSize="10">A 4-es kitevő csak a 2-re</text>
          <text x="25" y="166" fill="#64748b" fontSize="10">vonatkozik, a mínuszjelre nem!</text>
        </g>
      </svg>
    </div>
  );
};
