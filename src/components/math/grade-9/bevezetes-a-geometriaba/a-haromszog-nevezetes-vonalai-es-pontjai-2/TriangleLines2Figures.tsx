import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Magasságvonalak és magasságpont (M):
 * Háromszög csúcsaiból a szemközti oldalegyenesekre bocsátott merőlegesek.
 * A talppontoknál magyar szabvány szerinti derékszög-jelölés (negyedkörív belső ponttal).
 * Metszéspontjuk a magasságpont (M).
 */
export const AltitudesAndOrthocenterSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Magasságvonalak • Magasságpont (M)
      </text>

      <g transform="translate(10, 20)">
        {/* Háromszög csúcsai:
            A(50, 170), B(310, 170), C(190, 40)
            Oldal AB vízszintes: y = 170
            Talppont C-ből AB-re: T_c(190, 170)
            C(190, 40) -> T_c(190, 170) magasság h_c
            M magasságpont rajta van x = 190 egyenesen.
            Oldal AC meredeksége: (40-170)/(190-50) = -130/140 = -13/14
            Merőleges meredeksége B(310, 170)-ből: 14/13 ≈ 1.077
            y - 170 = 14/13 (x - 310) -> x = 190 esetén:
            y = 170 + 14/13 * (-120) = 170 - 129.23 = 40.77 -> M ≈ (190, 130)
            AC egyenes: y - 170 = -13/14(x - 50) -> 13x + 14y - 3030 = 0
            B(310, 170)-ből merőleges talppontja T_b AC-n:
            T_b ≈ (125, 100)
            Oldal BC meredeksége: (40-170)/(190-310) = -130/-120 = 13/12
            Merőleges A(50, 170)-ből: meredekség -12/13
            y - 170 = -12/13(x - 50) -> x = 190 esetén y ≈ 170 - 129.23 = 40.77 (ugyanaz)
            Talppont T_a BC-n ≈ (255, 110)
        */}
        {/* Háromszög test */}
        <polygon points="50,170 310,170 190,40" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" />

        {/* Csúcsok feliratai */}
        <text x="35" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
        <text x="320" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
        <text x="185" y="32" fontSize="13" fontWeight="bold" fill="#0f172a">C</text>

        {/* Magasságvonal c (C-ből AB-re) */}
        <line x1="190" y1="40" x2="190" y2="170" stroke="#059669" strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="190" cy="170" r="3" fill="#059669" />
        <text x="195" y="185" fontSize="10" fill="#047857" fontWeight="bold">T_c</text>
        {/* Magyar derékszög T_c-nél (bal felső sarok) */}
        <path d="M 178 170 A 12 12 0 0 1 190 158" fill="none" stroke="#047857" strokeWidth="1.2" />
        <circle cx="183" cy="165" r="1.2" fill="#047857" />

        {/* Magasságvonal b (B-ből AC-re) */}
        <line x1="310" y1="170" x2="128" y2="98" stroke="#059669" strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="128" cy="98" r="3" fill="#059669" />
        <text x="110" y="95" fontSize="10" fill="#047857" fontWeight="bold">T_b</text>
        {/* Magyar derékszög T_b-nél */}
        <path d="M 136 104 A 10 10 0 0 1 133 90" fill="none" stroke="#047857" strokeWidth="1.2" />
        <circle cx="137" cy="95" r="1.2" fill="#047857" />

        {/* Magasságvonal a (A-ból BC-re) */}
        <line x1="50" y1="170" x2="252" y2="107" stroke="#059669" strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="252" cy="107" r="3" fill="#059669" />
        <text x="260" y="105" fontSize="10" fill="#047857" fontWeight="bold">T_a</text>
        {/* Magyar derékszög T_a-nál */}
        <path d="M 244 113 A 10 10 0 0 1 247 99" fill="none" stroke="#047857" strokeWidth="1.2" />
        <circle cx="243" cy="104" r="1.2" fill="#047857" />

        {/* M pont (magasságpont) */}
        <circle cx="190" cy="130" r="4.5" fill="#dc2626" />
        <text x="198" y="132" fontSize="13" fontWeight="bold" fill="#dc2626">M</text>

        {/* Magyarázó jegyzet */}
        <rect x="235" y="42" width="125" height="36" rx="5" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <text x="297" y="55" fontSize="9" textAnchor="middle" fill="#334155" fontWeight="bold">Hegyesszögű: M belül</text>
        <text x="297" y="68" fontSize="8.5" textAnchor="middle" fill="#64748b">Derékszögű: M = csúcs</text>
      </g>
    </svg>
  );
};

/**
 * 2. Súlyvonalak és súlypont (S):
 * Csúcsokat a szemközti oldalak felezőpontjaival összekötő szakaszok.
 * Metszéspontjuk a súlypont (S), amely 2:1 arányban osztja a szakaszokat a csúcs felől nézve.
 * A három súlyvonal 6 egyenlő területű háromszögre osztja a háromszöget.
 */
export const MediansAndCentroidSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Súlyvonalak • Súlypont (S) • 2 : 1 arány
      </text>

      <g transform="translate(10, 20)">
        {/* Csúcsok: A(50, 170), B(310, 170), C(180, 35)
            Oldalfelezők:
            F_c = ((50+310)/2, (170+170)/2) = (180, 170)
            F_a = ((310+180)/2, (170+35)/2) = (245, 102.5)
            F_b = ((50+180)/2, (170+35)/2) = (115, 102.5)
            Súlypont: S = ((50+310+180)/3, (170+170+35)/3) = (180, 125)
        */}
        {/* Háromszög és a 6 egyenlő területű rész halvány színezése */}
        <polygon points="50,170 310,170 180,35" fill="#f8fafc" stroke="#2563eb" strokeWidth="2.5" />

        {/* Súlyvonalak */}
        <line x1="180" y1="35" x2="180" y2="170" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 3" />
        <line x1="50" y1="170" x2="245" y2="102.5" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 3" />
        <line x1="310" y1="170" x2="115" y2="102.5" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 3" />

        {/* Csúcsok feliratai */}
        <text x="35" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
        <text x="320" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
        <text x="175" y="28" fontSize="13" fontWeight="bold" fill="#0f172a">C</text>

        {/* Felezőpontok */}
        <circle cx="180" cy="170" r="3" fill="#2563eb" />
        <text x="185" y="186" fontSize="10" fill="#1d4ed8" fontWeight="bold">F_c</text>

        <circle cx="245" cy="102.5" r="3" fill="#2563eb" />
        <text x="253" y="103" fontSize="10" fill="#1d4ed8" fontWeight="bold">F_a</text>

        <circle cx="115" cy="102.5" r="3" fill="#2563eb" />
        <text x="93" y="103" fontSize="10" fill="#1d4ed8" fontWeight="bold">F_b</text>

        {/* Egyenlő szakaszok felező jelei AB-n */}
        <line x1="112" y1="166" x2="112" y2="174" stroke="#64748b" strokeWidth="1.5" />
        <line x1="242" y1="166" x2="242" y2="174" stroke="#64748b" strokeWidth="1.5" />

        {/* S pont (súlypont) */}
        <circle cx="180" cy="125" r="4.5" fill="#d97706" />
        <text x="190" y="127" fontSize="13" fontWeight="bold" fill="#d97706">S</text>

        {/* 2 : 1 arány jelölése a C-F_c súlyvonalon */}
        {/* CS szakasz hossza 90, SF_c szakasz 45 */}
        <text x="160" y="80" fontSize="11" fontWeight="bold" fill="#b45309">2 rész</text>
        <text x="160" y="152" fontSize="11" fontWeight="bold" fill="#b45309">1 rész</text>

        {/* Badge: Tömegközéppont és 6 terület */}
        <rect x="245" y="40" width="115" height="38" rx="6" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1" />
        <text x="302" y="54" fontSize="9" textAnchor="middle" fill="#92400e" fontWeight="bold">Tömegközéppont</text>
        <text x="302" y="67" fontSize="8" textAnchor="middle" fill="#b45309">6 azonos területű rész (T/6)</text>
      </g>
    </svg>
  );
};

/**
 * 3. Középvonalak:
 * Két oldal felezőpontját összekötő szakasz.
 * Párhuzamos a 3. oldallal, fele olyan hosszú (k = a/2).
 * A 3 középvonal 4 darab egybevágó kis háromszögre bontja az eredetit (T_kis = T/4).
 */
export const MidlinesSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Középvonalak • 4 egybevágó háromszög • k = a / 2
      </text>

      <g transform="translate(10, 20)">
        {/* Háromszög: A(50, 170), B(310, 170), C(170, 45)
            Felezők:
            F_c(180, 170)
            F_a(240, 107.5)
            F_b(110, 107.5)
        */}
        <polygon points="50,170 310,170 170,45" fill="#fdf2f8" stroke="#db2777" strokeWidth="2" />

        {/* Belső középvonal háromszög (F_a F_b F_c) */}
        <polygon points="180,170 240,107.5 110,107.5" fill="#fce7f3" stroke="#be185d" strokeWidth="2" />

        {/* Csúcsok */}
        <text x="35" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>
        <text x="320" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
        <text x="165" y="35" fontSize="13" fontWeight="bold" fill="#0f172a">C</text>

        {/* Felezőpontok */}
        <circle cx="180" cy="170" r="3.5" fill="#9d174d" />
        <text x="180" y="186" fontSize="10" fill="#9d174d" fontWeight="bold" textAnchor="middle">F_c</text>

        <circle cx="240" cy="107.5" r="3.5" fill="#9d174d" />
        <text x="252" y="108" fontSize="10" fill="#9d174d" fontWeight="bold">F_a</text>

        <circle cx="110" cy="107.5" r="3.5" fill="#9d174d" />
        <text x="90" y="108" fontSize="10" fill="#9d174d" fontWeight="bold">F_b</text>

        {/* Párhuzamossági és felezési feliratok */}
        <text x="175" y="102" fontSize="10" fontWeight="bold" fill="#be185d" textAnchor="middle">
          k_c = c / 2 (|| AB)
        </text>

        {/* 4 azonos terület címkék */}
        <text x="110" y="145" fontSize="9" fill="#9d174d" fontWeight="bold">T/4</text>
        <text x="235" y="145" fontSize="9" fill="#9d174d" fontWeight="bold">T/4</text>
        <text x="175" y="140" fontSize="9" fill="#831843" fontWeight="bold" textAnchor="middle">T/4</text>
        <text x="170" y="75" fontSize="9" fill="#9d174d" fontWeight="bold" textAnchor="middle">T/4</text>

        {/* Magyarázó kártya */}
        <rect x="250" y="38" width="110" height="34" rx="5" fill="#ffffff" stroke="#f472b6" strokeWidth="1" />
        <text x="305" y="52" fontSize="9" textAnchor="middle" fill="#831843" fontWeight="bold">4 egybevágó</text>
        <text x="305" y="64" fontSize="8" textAnchor="middle" fill="#9d174d">háromszög jön létre</text>
      </g>
    </svg>
  );
};

/**
 * 4. Euler-egyenes:
 * Bármely nem szabályos háromszögben a körülírt kör középpontja (O),
 * a súlypont (S) és a magasságpont (M) egy egyenesre esik (Euler-egyenes).
 * Sorrendjük M - S - O, és |MS| = 2 * |SO|.
 */
export const EulerLineSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Az Euler-egyenes • O, S és M egybeesése
      </text>

      <g transform="translate(10, 20)">
        {/* Háromszög kontúr halványan */}
        <polygon points="50,175 310,175 220,50" fill="rgba(245, 158, 11, 0.04)" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Euler-egyenes áthúzása */}
        {/* M, S, O pontok:
            Tegyük fel az Euler-egyenes egy jól látható vonal:
            M = (130, 80)
            S = (180, 115)  -> dx = 50, dy = 35
            O = (205, 132.5) -> dx = 25, dy = 17.5 (feleakkora távolság! 2:1 arány!)
            Vonal kiterjesztése: (90, 52) to (245, 160)
        */}
        <line x1="80" y1="45" x2="255" y2="167" stroke="#b45309" strokeWidth="2.5" />

        {/* Pontok az egyenesen */}
        {/* M - Magasságpont */}
        <circle cx="130" cy="80" r="5" fill="#dc2626" />
        <text x="120" y="70" fontSize="12" fontWeight="bold" fill="#dc2626">M (magasságpont)</text>

        {/* S - Súlypont */}
        <circle cx="180" cy="115" r="5" fill="#d97706" />
        <text x="188" y="110" fontSize="12" fontWeight="bold" fill="#d97706">S (súlypont)</text>

        {/* O - Körülírt kör középpontja */}
        <circle cx="205" cy="132.5" r="5" fill="#5b21b6" />
        <text x="215" y="145" fontSize="12" fontWeight="bold" fill="#5b21b6">O (körülírt kör kp.)</text>

        {/* Távolság arányok felirata */}
        {/* MS felett: 2x */}
        <line x1="125" y1="92" x2="175" y2="127" stroke="#d97706" strokeWidth="1.2" strokeDasharray="2 2" />
        <text x="145" y="118" fontSize="11" fontWeight="bold" fill="#b45309">2 rész (|MS|)</text>

        {/* SO felett: 1x */}
        <line x1="185" y1="131" x2="210" y2="148" stroke="#5b21b6" strokeWidth="1.2" strokeDasharray="2 2" />
        <text x="225" y="125" fontSize="11" fontWeight="bold" fill="#5b21b6">1 rész (|SO|)</text>

        {/* Összefoglaló kártya alul */}
        <rect x="30" y="160" width="310" height="32" rx="6" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
        <text x="185" y="180" fontSize="10" textAnchor="middle" fill="#78350f" fontWeight="bold">
          |MS| = 2 · |SO| • Szabályos háromszögben M = S = O = I (egybeesnek)
        </text>
      </g>
    </svg>
  );
};

