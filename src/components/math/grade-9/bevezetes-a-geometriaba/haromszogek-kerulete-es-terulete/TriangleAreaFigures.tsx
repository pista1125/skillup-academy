import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Alap és magasság területszámítás:
 * T = (a * m_a) / 2
 * A háromszög téglalappá egészítése (a * m_a) halványan látható.
 * Magyar derékszög-jelölés a talppontban.
 */
export const BaseAndHeightAreaSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Alap és magasság • T = (a · m_a) / 2
      </text>

      <g transform="translate(10, 20)">
        {/* Téglalappá kiegészítés (halvány) */}
        <rect x="50" y="50" width="240" height="120" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

        {/* Háromszög: A(50, 170), B(290, 170), C(130, 50) */}
        <polygon points="50,170 290,170 130,50" fill="rgba(16, 185, 129, 0.12)" stroke="#059669" strokeWidth="2.5" />

        {/* Magasság m_a C-ből az alapra: (130, 50) -> (130, 170) */}
        <line x1="130" y1="50" x2="130" y2="170" stroke="#047857" strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="130" cy="170" r="3" fill="#047857" />

        {/* Magyar derékszög a talppontnál: negyedkörív ponttal */}
        <path d="M 118 170 A 12 12 0 0 1 130 158" fill="none" stroke="#047857" strokeWidth="1.2" />
        <circle cx="123" cy="165" r="1.2" fill="#047857" />

        {/* Feliratok */}
        <text x="136" y="115" fontSize="12" fontWeight="bold" fill="#047857">m_a</text>
        <text x="170" y="186" fontSize="13" fontWeight="bold" fill="#0f172a">a (alap)</text>

        {/* Csúcsok */}
        <text x="35" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
        <text x="298" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">C_alap</text>
        <text x="125" y="42" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>

        {/* Magyarázó kártya */}
        <rect x="235" y="45" width="125" height="36" rx="6" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1" />
        <text x="297" y="60" fontSize="10.5" textAnchor="middle" fill="#065f46" fontWeight="bold">T = (a · m_a) / 2</text>
        <text x="297" y="73" fontSize="8.5" textAnchor="middle" fill="#047857">fél téglalap területe</text>
      </g>
    </svg>
  );
};

/**
 * 2. Derékszögű háromszög területe:
 * T = (a * b) / 2
 * A két befogó merőleges egymásra, így egymás magasságai.
 */
export const RightTriangleAreaSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Derékszögű háromszög • T = (a · b) / 2
      </text>

      <g transform="translate(10, 20)">
        {/* Téglalap kiegészítés */}
        <rect x="70" y="50" width="200" height="120" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

        {/* Derékszögű háromszög: C(70, 170), B(270, 170), A(70, 50) */}
        <polygon points="70,170 270,170 70,50" fill="rgba(245, 158, 11, 0.12)" stroke="#d97706" strokeWidth="2.5" />

        {/* Magyar derékszög a C(70, 170) csúcsban */}
        <path d="M 70 152 A 18 18 0 0 1 88 170" fill="none" stroke="#d97706" strokeWidth="1.3" />
        <circle cx="78" cy="162" r="1.2" fill="#d97706" />

        {/* Oldalhosszak */}
        <text x="170" y="186" fontSize="13" fontWeight="bold" fill="#0f172a">a (befogó)</text>
        <text x="45" y="115" fontSize="13" fontWeight="bold" fill="#0f172a">b</text>
        <text x="180" y="100" fontSize="12" fontWeight="bold" fill="#b45309">c (átfogó)</text>

        {/* Csúcsok */}
        <text x="50" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">C</text>
        <text x="278" y="180" fontSize="13" fontWeight="bold" fill="#0f172a">B</text>
        <text x="50" y="45" fontSize="13" fontWeight="bold" fill="#0f172a">A</text>

        {/* Kártya jegyzet */}
        <rect x="220" y="45" width="140" height="38" rx="6" fill="#ffffff" stroke="#fde68a" strokeWidth="1" />
        <text x="290" y="60" fontSize="10.5" textAnchor="middle" fill="#78350f" fontWeight="bold">T = (a · b) / 2</text>
        <text x="290" y="73" fontSize="8.5" textAnchor="middle" fill="#b45309">befogók szorzatának fele</text>
      </g>
    </svg>
  );
};

/**
 * 3. Szabályos háromszög területe:
 * m = (a * sqrt(3)) / 2
 * T = (a^2 * sqrt(3)) / 4
 */
export const EquilateralTriangleAreaSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Szabályos háromszög • T = (a² · √3) / 4
      </text>

      <g transform="translate(10, 20)">
        {/* Szabályos háromszög: A(90, 170), B(270, 170), C(180, 170 - 180*sqrt(3)/2) ≈ C(180, 14.1)
            Skálázzuk le kissé: A(100, 170), B(260, 170), a = 160 -> m = 160 * 0.866 = 138.56 -> C(180, 31.44)
        */}
        <polygon points="100,170 260,170 180,31.4" fill="rgba(217, 70, 239, 0.1)" stroke="#c026d3" strokeWidth="2.5" />

        {/* Magasságvonal */}
        <line x1="180" y1="31.4" x2="180" y2="170" stroke="#a21caf" strokeWidth="1.8" strokeDasharray="3 2" />
        <circle cx="180" cy="170" r="3" fill="#a21caf" />

        {/* Magyar derékszög a talppontban */}
        <path d="M 168 170 A 12 12 0 0 1 180 158" fill="none" stroke="#a21caf" strokeWidth="1.2" />
        <circle cx="173" cy="165" r="1.1" fill="#a21caf" />

        {/* 60°-os szögívek */}
        <text x="120" y="160" fontSize="10" fontWeight="bold" fill="#86198f">60°</text>
        <text x="235" y="160" fontSize="10" fontWeight="bold" fill="#86198f">60°</text>

        {/* Oldalhossz feliratok */}
        <text x="180" y="186" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#0f172a">a</text>
        <text x="130" y="95" fontSize="13" fontWeight="bold" fill="#0f172a">a</text>
        <text x="225" y="95" fontSize="13" fontWeight="bold" fill="#0f172a">a</text>
        <text x="185" y="105" fontSize="11" fontWeight="bold" fill="#a21caf">m = a√3/2</text>

        {/* Kártya felirat */}
        <rect x="230" y="40" width="135" height="42" rx="6" fill="#ffffff" stroke="#f5d0fe" strokeWidth="1" />
        <text x="297" y="56" fontSize="10" textAnchor="middle" fill="#701a75" fontWeight="bold">T = (a² · √3) / 4</text>
        <text x="297" y="70" fontSize="8.5" textAnchor="middle" fill="#a21caf">egyedül "a" határozza meg</text>
      </g>
    </svg>
  );
};

/**
 * 4. Hérón-képlet és beírt/körülírt kör sugara:
 * s = (a+b+c)/2
 * T = sqrt(s(s-a)(s-b)(s-c))
 * T = r * s  =>  r = T / s
 * T = abc / 4R  =>  R = abc / 4T
 */
export const HeronAndCirclesAreaSVG: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
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
        Hérón-képlet • Beírt (r) és Körülírt (R) Kör
      </text>

      <g transform="translate(10, 20)">
        {/* Háromszög: A(50, 160), B(280, 160), C(190, 45) */}
        <polygon points="50,160 280,160 190,45" fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" strokeWidth="2.2" />

        {/* Beírt kör (I): kb. I(175, 122), r = 38 */}
        <circle cx="175" cy="122" r="38" fill="rgba(236, 72, 153, 0.1)" stroke="#db2777" strokeWidth="1.8" />
        <circle cx="175" cy="122" r="3" fill="#db2777" />
        <text x="160" y="125" fontSize="10" fontWeight="bold" fill="#db2777">I (r)</text>
        <line x1="175" y1="122" x2="175" y2="160" stroke="#db2777" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="178" y="145" fontSize="9.5" fontWeight="bold" fill="#db2777">r</text>

        {/* Oldalhossz feliratok */}
        <text x="165" y="176" fontSize="12" fontWeight="bold" fill="#0f172a">c</text>
        <text x="110" y="95" fontSize="12" fontWeight="bold" fill="#0f172a">b</text>
        <text x="245" y="95" fontSize="12" fontWeight="bold" fill="#0f172a">a</text>

        {/* Hérón és sugarak kártya */}
        <rect x="215" y="40" width="145" height="52" rx="6" fill="#ffffff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="287" y="54" fontSize="9" textAnchor="middle" fill="#1e3a8a" fontWeight="bold">
          T = √[s(s-a)(s-b)(s-c)]
        </text>
        <text x="287" y="68" fontSize="8.5" textAnchor="middle" fill="#db2777" fontWeight="bold">
          T = r · s  ⇒  r = T / s
        </text>
        <text x="287" y="82" fontSize="8.5" textAnchor="middle" fill="#2563eb" fontWeight="bold">
          T = abc / 4R  ⇒  R = abc / 4T
        </text>
      </g>
    </svg>
  );
};

