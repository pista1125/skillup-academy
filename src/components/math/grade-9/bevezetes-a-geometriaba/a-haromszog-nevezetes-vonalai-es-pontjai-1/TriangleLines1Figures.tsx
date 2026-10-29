import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Körülírt kör és oldalfelező merőlegesek:
 * Oldalfelező merőlegesek metszéspontja O, körülírt kör sugara R.
 * Magyar derékszög-jelölés a felezőpontoknál: negyedkörív ponttal.
 */
export const CircumcircleSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
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
        Oldalfelező merőlegesek • Körülírt kör középpontja (O)
      </text>

      <g transform="translate(10, 20)">
        {/* Körülírt kör: O(180, 130), R = 85 */}
        <circle cx="180" cy="130" r="85" fill="rgba(139, 92, 246, 0.05)" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="5 3" />

        {/* Háromszög csúcsai a körön:
            A: (180 - 85*cos(25°), 130 + 85*sin(25°)) ≈ (103, 166) -> kerekítsük: A(105, 175)
            B: (180 + 85*cos(15°), 130 + 85*sin(15°)) ≈ (262, 152) -> B(260, 155)
            C: (180 - 85*cos(80°), 130 - 85*sin(80°)) ≈ (165, 46) -> C(170, 48)
        */}
        <polygon points="105,175 260,155 170,48" fill="rgba(124, 58, 237, 0.1)" stroke="#6d28d9" strokeWidth="2.5" />

        {/* Csúcsok címkéi */}
        <text x="92" y="188" fontSize="12" fontWeight="bold" fill="#6d28d9">A</text>
        <text x="270" y="162" fontSize="12" fontWeight="bold" fill="#6d28d9">B</text>
        <text x="170" y="38" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#6d28d9">C</text>

        {/* Felezőpontok és oldalfelező merőlegesek */}
        {/* AB felezőpont: F_c = ((105+260)/2, (175+155)/2) = (182.5, 165) */}
        <circle cx="182.5" cy="165" r="2.5" fill="#059669" />
        <line x1="182.5" y1="165" x2="180" y2="130" stroke="#059669" strokeWidth="1.5" />
        {/* Magyar derékszög jelölés F_c-nél */}
        <path d="M 180 153 A 10 10 0 0 1 192 163" fill="none" stroke="#059669" strokeWidth="1.2" />
        <circle cx="185" cy="158" r="1" fill="#059669" />

        {/* BC felezőpont: F_a = ((260+170)/2, (155+48)/2) = (215, 101.5) */}
        <circle cx="215" cy="101.5" r="2.5" fill="#059669" />
        <line x1="215" y1="101.5" x2="180" y2="130" stroke="#059669" strokeWidth="1.5" />

        {/* CA felezőpont: F_b = ((170+105)/2, (48+175)/2) = (137.5, 111.5) */}
        <circle cx="137.5" cy="111.5" r="2.5" fill="#059669" />
        <line x1="137.5" y1="111.5" x2="180" y2="130" stroke="#059669" strokeWidth="1.5" />

        {/* O pont (körülírt kör középpontja) */}
        <circle cx="180" cy="130" r="4" fill="#5b21b6" />
        <text x="190" y="132" fontSize="12" fontWeight="bold" fill="#5b21b6">O</text>

        {/* R sugár O-tól A-ig */}
        <line x1="180" y1="130" x2="105" y2="175" stroke="#be123c" strokeWidth="1.8" strokeDasharray="3 2" />
        <text x="135" y="160" fontSize="11" fontWeight="bold" fill="#be123c">R</text>

        {/* R sugár O-tól C-ig */}
        <line x1="180" y1="130" x2="170" y2="48" stroke="#be123c" strokeWidth="1.8" strokeDasharray="3 2" />
        <text x="180" y="90" fontSize="11" fontWeight="bold" fill="#be123c">R</text>
      </g>
    </svg>
  );
};

/**
 * 2. Beírt kör és belső szögfelezők:
 * Belső szögfelezők metszéspontja I (vagy K), beírt kör sugara r.
 * Érintési pontoknál magyar derékszög-jelölés.
 */
export const IncircleSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 250"
      width={size}
      height={(size * 250) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="240" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#fce7f3" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#9d174d">
        Belső szögfelezők • Beírt kör középpontja (I)
      </text>

      <g transform="translate(15, 20)">
        {/* Háromszög: A(50, 190), B(280, 190), C(160, 50) */}
        <polygon points="50,190 280,190 160,50" fill="rgba(244, 63, 94, 0.08)" stroke="#e11d48" strokeWidth="2.5" />

        {/* Csúcsok */}
        <text x="35" y="198" fontSize="12" fontWeight="bold" fill="#be123c">A</text>
        <text x="290" y="198" fontSize="12" fontWeight="bold" fill="#be123c">B</text>
        <text x="160" y="42" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#be123c">C</text>

        {/* Beírt kör középpontja I(162, 142), sugara r = 48 */}
        <circle cx="162" cy="142" r="48" fill="rgba(5, 150, 105, 0.12)" stroke="#059669" strokeWidth="2" />
        <circle cx="162" cy="142" r="3.5" fill="#047857" />
        <text x="150" y="140" fontSize="12" fontWeight="bold" fill="#047857">I</text>

        {/* Szögfelező vonalak a csúcsokból I-n át */}
        <line x1="50" y1="190" x2="162" y2="142" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="280" y1="190" x2="162" y2="142" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="160" y1="50" x2="162" y2="142" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 2" />

        {/* Sugár az AB oldalra: merőleges talppont E_c(162, 190) */}
        <line x1="162" y1="142" x2="162" y2="190" stroke="#047857" strokeWidth="1.8" />
        <circle cx="162" cy="190" r="2.5" fill="#047857" />
        <text x="168" y="170" fontSize="11" fontWeight="bold" fill="#047857">r</text>

        {/* Magyar derékszög jelölés E_c-nél: negyedkörív ponttal */}
        <path d="M 162 176 A 14 14 0 0 1 176 190" fill="none" stroke="#047857" strokeWidth="1.2" />
        <circle cx="168" cy="184" r="1.2" fill="#047857" />

        {/* Sugár a BC oldalra */}
        <line x1="162" y1="142" x2="204" y2="101" stroke="#047857" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="186" y="118" fontSize="10" fontWeight="bold" fill="#047857">r</text>

        {/* Sugár az AC oldalra */}
        <line x1="162" y1="142" x2="119" y2="102" stroke="#047857" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="135" y="118" fontSize="10" fontWeight="bold" fill="#047857">r</text>
      </g>
    </svg>
  );
};

/**
 * 3. Derékszögű háromszög körei (különleges eset):
 * Körülírt kör középpontja az átfogó felezőpontja: R = c / 2.
 * Beírt kör sugara: r = (a + b - c) / 2.
 */
export const RightTriangleCirclesSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 210"
      width={size}
      height={(size * 210) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="200" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#e0f2fe" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0369a1">
        Derékszögű háromszög körei • R = c / 2  és  r = (a + b - c) / 2
      </text>

      <g transform="translate(40, 25)">
        {/* Derékszögű háromszög: C(40, 160), B(240, 160), A(40, 40)
            Befogók: a = 200, b = 120, átfogó c = sqrt(200^2 + 120^2)
            Vegyünk 3-4-5 arányt: a = 160, b = 120, c = 200
            C(40, 160), B(200, 160), A(40, 40).
            c felezőpontja O = ((40+200)/2, (40+160)/2) = (120, 100). R = 100.
        */}
        {/* Thalész-félkörív az átfogó fölé */}
        <path d="M 40 40 A 100 100 0 0 1 200 160" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 3" />

        {/* Háromszög */}
        <polygon points="40,160 200,160 40,40" fill="rgba(2, 132, 199, 0.08)" stroke="#0284c7" strokeWidth="2.5" />

        {/* Magyar derékszög a C(40, 160) csúcsban: negyedkörív ponttal */}
        <path d="M 40 144 A 16 16 0 0 1 56 160" fill="none" stroke="#0284c7" strokeWidth="1.5" />
        <circle cx="46" cy="154" r="1.5" fill="#0284c7" />

        {/* O pont (átfogó felezőpontja) */}
        <circle cx="120" cy="100" r="4" fill="#0369a1" />
        <text x="128" y="96" fontSize="11" fontWeight="bold" fill="#0369a1">O (R = c/2)</text>

        {/* Beírt kör: r = (120 + 160 - 200) / 2 = 80 / 2 = 40.
            Középpont I: (40 + 40, 160 - 40) = (80, 120), sugara 40.
        */}
        <circle cx="80" cy="120" r="40" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.8" />
        <circle cx="80" cy="120" r="3" fill="#047857" />
        <text x="75" y="115" fontSize="11" fontWeight="bold" fill="#047857">I (r)</text>

        <text x="25" y="105" fontSize="11" fontWeight="bold" fill="#1e293b">b</text>
        <text x="120" y="176" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">a</text>
        <text x="135" y="65" fontSize="11" fontWeight="bold" fill="#0284c7">c</text>
      </g>

      <g transform="translate(265, 65)">
        <rect x="0" y="0" width="105" height="110" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="52" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#1e293b">Képletek</text>
        <line x1="8" y1="24" x2="97" y2="24" stroke="#f1f5f9" strokeWidth="1" />
        <text x="10" y="45" fontSize="9" fontWeight="bold" fill="#0284c7">R = c / 2</text>
        <text x="10" y="62" fontSize="8" fill="#64748b">(Thalész-tétel)</text>
        <text x="10" y="85" fontSize="9" fontWeight="bold" fill="#047857">r = (a+b-c)/2</text>
        <text x="10" y="100" fontSize="8" fill="#64748b">(érintőszakaszok)</text>
      </g>
    </svg>
  );
};

