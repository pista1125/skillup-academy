import React from 'react';

// Figure 1: Gyulai Várfürdő Lovarda roof truss (Tankönyv 116. oldal)
export const RoofTrussGyulaSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="240" rx="14" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.5" />

    {/* Header */}
    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1c1917">
      Gyulai Várfürdő Lovarda – Tető tartóváz gerendázat (Tervrajzi méretarány: 1 : 100)
    </text>

    {/* Truss Structure Graphic */}
    <g transform="translate(40, 45)">
      {/* Symmetrical Wooden Trusses: Outer triangle frame */}
      {/* Baseline */}
      <line x1="20" y1="130" x2="440" y2="130" stroke="#78350f" strokeWidth="3" />
      {/* Main Rafters */}
      <line x1="20" y1="130" x2="230" y2="30" stroke="#78350f" strokeWidth="3" />
      <line x1="440" y1="130" x2="230" y2="30" stroke="#78350f" strokeWidth="3" />

      {/* Internal Web Bracing: Symmetrical triangles */}
      <line x1="125" y1="80" x2="160" y2="130" stroke="#b45309" strokeWidth="2" />
      <line x1="230" y1="30" x2="230" y2="130" stroke="#b45309" strokeWidth="2" />
      <line x1="335" y1="80" x2="300" y2="130" stroke="#b45309" strokeWidth="2" />
      <line x1="125" y1="80" x2="230" y2="130" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="335" y1="80" x2="230" y2="130" stroke="#b45309" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Dimension annotations (millimeter callouts from textbook) */}
      <text x="90" y="50" fontSize="9" fill="#1e3a8a" fontWeight="bold">13 036 mm (13,036 m)</text>
      <text x="310" y="50" fontSize="9" fill="#1e3a8a" fontWeight="bold">13 036 mm</text>
      <text x="230" y="148" fontSize="9" textAnchor="middle" fill="#0f766e" fontWeight="bold">7664 mm + 7664 mm</text>
      <text x="145" y="115" fontSize="8" fill="#b45309">6523</text>
      <text x="295" y="115" fontSize="8" fill="#b45309">6523</text>
      <text x="190" y="80" fontSize="8" fill="#0369a1">7113</text>
      <text x="245" y="80" fontSize="8" fill="#0369a1">7113</text>

      {/* Angle Callouts */}
      <text x="45" y="122" fontSize="9" fill="#b91c1c" fontWeight="bold">24°</text>
      <text x="405" y="122" fontSize="9" fill="#b91c1c" fontWeight="bold">24°</text>
      <text x="230" y="24" fontSize="9" textAnchor="middle" fill="#b91c1c" fontWeight="bold">133°</text>
    </g>

    {/* Note footer */}
    <rect x="25" y="195" width="490" height="36" rx="6" fill="#eff6ff" stroke="#bfdbfe" />
    <text x="270" y="210" fontSize="9.5" textAnchor="middle" fill="#1e40af" fontWeight="bold">
      Mérnöki kerekítések a tervrajzon: A méretek milliméterben értendők (pl. 13 036 mm = 13,036 m).
    </text>
    <text x="270" y="224" fontSize="9" textAnchor="middle" fill="#3b82f6">
      A feltüntetett szögek kerekítettek (24° + 24° + 133° = 181° a mérési és ábrázolási kerekítések miatt).
    </text>
  </svg>
);

// Figure 2: Gyulai Várfürdő Lovarda Swimming Pool Geometry (Tankönyv 117. o. 2. feladat)
export const PoolGeometrySvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="250" rx="14" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0369a1">
      Lovarda úszómedence: Egyenes fektetett trapéz alapú hasáb (20 m × 13 m, 1,2 m – 1,6 m mély)
    </text>

    {/* 3D Wireframe / Prism view */}
    <g transform="translate(50, 45)">
      {/* Water surface rectangle: 20 m length -> 260 px, 13 m width -> 100 px skewed */}
      <polygon points="40,30 300,30 380,80 120,80" fill="#bae6fd" opacity="0.6" stroke="#0284c7" strokeWidth="1.5" />
      <text x="170" y="25" fontSize="10" textAnchor="middle" fill="#0369a1" fontWeight="bold">Hossz = 20 m</text>
      <text x="360" y="52" fontSize="9" fill="#0369a1" fontWeight="bold">Szélesség = 13 m</text>

      {/* Shallow end vertical edge: 1.2 m (36 px) */}
      <line x1="40" y1="30" x2="40" y2="66" stroke="#0369a1" strokeWidth="1.5" />
      <text x="18" y="52" fontSize="9" fill="#0284c7" fontWeight="bold">1,2 m</text>

      {/* Shallow end front edge */}
      <line x1="120" y1="80" x2="120" y2="116" stroke="#0369a1" strokeWidth="1.5" />

      {/* Deep end vertical edge: 1.6 m (48 px) */}
      <line x1="300" y1="30" x2="300" y2="78" stroke="#0369a1" strokeWidth="1.5" />
      <line x1="380" y1="80" x2="380" y2="128" stroke="#0369a1" strokeWidth="2" />
      <text x="390" y="108" fontSize="9" fill="#0284c7" fontWeight="bold">1,6 m</text>

      {/* Bottom sloped edges */}
      <line x1="40" y1="66" x2="300" y2="78" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="120" y1="116" x2="380" y2="128" stroke="#0f172a" strokeWidth="2" />
      <line x1="40" y1="66" x2="120" y2="116" stroke="#0f172a" strokeWidth="1.5" />
      <line x1="300" y1="78" x2="380" y2="128" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Bottom plate label */}
      <text x="250" y="132" fontSize="9" textAnchor="middle" fill="#0f172a" fontWeight="bold">
        Ferde fenéklemez hossza: √(20² + 0,4²) ≈ 20,004 m
      </text>
    </g>

    {/* Mathematical Explanation card on right/bottom */}
    <g transform="translate(40, 185)">
      <rect x="0" y="0" width="460" height="52" rx="6" fill="#ffffff" stroke="#e2e8f0" />
      <text x="10" y="18" fontSize="9.5" fill="#0f172a" fontWeight="bold">
        • Miért egyenes hasáb a medence? (Bence vs. Jocó vita):
      </text>
      <text x="20" y="32" fontSize="9" fill="#334155">
        A medence két hosszanti oldalfala egymással párhuzamos derékszögű trapéz! Ez a két trapéz az alaplapja.
      </text>
      <text x="20" y="45" fontSize="9" fill="#15803d" fontWeight="bold">
        Víztérfogat: V = T_trapéz · 13 m = [(1,2 + 1,6)/2 · 20] · 13 = 1,4 · 20 · 13 = 364 m³ (364 000 liter)!
      </text>
    </g>
  </svg>
);

// Figure 3: Scale Bars and Map Ratio representation
export const ScaleBarMapSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 210" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="200" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Vonalas mérték és számszerű méretarányok összehasonlítása
    </text>

    {/* Scale Bar 1: Architectural (1 : 100) */}
    <g transform="translate(40, 48)">
      <text x="0" y="14" fontSize="10" fill="#0284c7" fontWeight="bold">Építészeti tervrajz: M = 1 : 100 (1 cm a rajzon = 1 m a valóságban)</text>
      {/* Segmented bar: 4 segments of 25px (each represents 2.5m on 100px total = 10m) */}
      <rect x="0" y="22" width="200" height="12" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
      <rect x="0" y="22" width="50" height="12" fill="#0284c7" />
      <rect x="100" y="22" width="50" height="12" fill="#0284c7" />
      {/* Ticks & Labels */}
      <text x="0" y="46" fontSize="8" textAnchor="middle" fill="#64748b">0</text>
      <text x="50" y="46" fontSize="8" textAnchor="middle" fill="#64748b">1 m</text>
      <text x="100" y="46" fontSize="8" textAnchor="middle" fill="#64748b">2 m</text>
      <text x="150" y="46" fontSize="8" textAnchor="middle" fill="#64748b">3 m</text>
      <text x="200" y="46" fontSize="8" textAnchor="middle" fill="#64748b">4 m</text>
    </g>

    {/* Scale Bar 2: Tourist map (1 : 50 000) */}
    <g transform="translate(290, 48)">
      <text x="0" y="14" fontSize="10" fill="#15803d" fontWeight="bold">Turistatérkép: M = 1 : 50 000 (1 cm a térképen = 500 m)</text>
      <rect x="0" y="22" width="200" height="12" fill="#ffffff" stroke="#15803d" strokeWidth="1.5" />
      <rect x="0" y="22" width="50" height="12" fill="#15803d" />
      <rect x="100" y="22" width="50" height="12" fill="#15803d" />
      <text x="0" y="46" fontSize="8" textAnchor="middle" fill="#64748b">0</text>
      <text x="50" y="46" fontSize="8" textAnchor="middle" fill="#64748b">0,5 km</text>
      <text x="100" y="46" fontSize="8" textAnchor="middle" fill="#64748b">1,0 km</text>
      <text x="150" y="46" fontSize="8" textAnchor="middle" fill="#64748b">1,5 km</text>
      <text x="200" y="46" fontSize="8" textAnchor="middle" fill="#64748b">2,0 km</text>
    </g>

    {/* Formula comparison box */}
    <g transform="translate(40, 125)">
      <rect x="0" y="0" width="450" height="60" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="15" y="20" fontSize="9.5" fill="#0f172a" fontWeight="bold">
        • Számszerű átváltások gyorsszabálya:
      </text>
      <text x="25" y="36" fontSize="9" fill="#334155">
        Valóságos távolság = Rajzbeli távolság × N  |  Valóságos felület = Rajzbeli felület × N²
      </text>
      <text x="25" y="50" fontSize="9" fill="#b91c1c" fontWeight="semibold">
        Pl. 1 : 50 000 térképen mért 4 cm² erdő: 4 cm² × 50 000² = 4 × 2 500 000 000 cm² = 1 000 000 m² = 100 ha!
      </text>
    </g>
  </svg>
);

// Figure 4: Engineering Dimensioning and Tolerances (Kótázás)
export const EngineeringDimensioningSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="210" rx="14" fill="#fdfbf7" stroke="#e2d9cc" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#292524">
      Gépészeti méretháló és kótázási szabályok (Méretek mm-ben)
    </text>

    {/* Mechanical Part drawing with dimension arrows */}
    <g transform="translate(70, 50)">
      {/* Stepped plate profile */}
      <polygon points="40,110 200,110 200,60 140,60 140,20 40,20" fill="#e7e5e4" stroke="#44403c" strokeWidth="2" />
      {/* Hole in part */}
      <circle cx="90" cy="65" r="15" fill="#fdfbf7" stroke="#44403c" strokeWidth="1.5" />
      <line x1="65" y1="65" x2="115" y2="65" stroke="#78716c" strokeWidth="0.8" strokeDasharray="3 2" />
      <line x1="90" y1="40" x2="90" y2="90" stroke="#78716c" strokeWidth="0.8" strokeDasharray="3 2" />

      {/* Dimension Line 1: Width 160 mm */}
      <line x1="40" y1="125" x2="200" y2="125" stroke="#b91c1c" strokeWidth="1" />
      <line x1="40" y1="112" x2="40" y2="132" stroke="#b91c1c" strokeWidth="1" />
      <line x1="200" y1="112" x2="200" y2="132" stroke="#b91c1c" strokeWidth="1" />
      <text x="120" y="137" fontSize="9" textAnchor="middle" fill="#b91c1c" fontWeight="bold">160</text>

      {/* Dimension Line 2: Height 90 mm */}
      <line x1="25" y1="20" x2="25" y2="110" stroke="#b91c1c" strokeWidth="1" />
      <line x1="20" y1="20" x2="38" y2="20" stroke="#b91c1c" strokeWidth="1" />
      <line x1="20" y1="110" x2="38" y2="110" stroke="#b91c1c" strokeWidth="1" />
      <text x="18" y="70" fontSize="9" textAnchor="middle" fill="#b91c1c" fontWeight="bold">90</text>

      {/* Dimension Line 3: Hole diameter Ø30 */}
      <line x1="90" y1="65" x2="130" y2="40" stroke="#b91c1c" strokeWidth="1" />
      <text x="135" y="38" fontSize="8.5" fill="#b91c1c" fontWeight="bold">Ø30</text>
    </g>

    {/* Rules card on right */}
    <g transform="translate(290, 45)">
      <rect x="0" y="0" width="220" height="145" rx="8" fill="#ffffff" stroke="#d6d3d1" />
      <text x="110" y="20" fontSize="10" textAnchor="middle" fill="#1c1917" fontWeight="bold">
        Kótázási alapszabályok
      </text>
      <line x1="15" y1="28" x2="205" y2="28" stroke="#f5f5f4" strokeWidth="1.5" />

      <text x="15" y="44" fontSize="8.5" fill="#44403c">• Alapegység: mindig <strong>mm</strong></text>
      <text x="15" y="58" fontSize="8" fill="#78716c">  (a rajzon nem írjuk ki a „mm” jelet!)</text>

      <text x="15" y="76" fontSize="8.5" fill="#44403c">• Méretvonal és méretsegédvonal</text>
      <text x="15" y="90" fontSize="8" fill="#78716c">  nyíllal határolva, kótaszám a vonal fölött</text>

      <text x="15" y="108" fontSize="8.5" fill="#44403c">• Valódi méret (kótabölcsesség):</text>
      <text x="15" y="122" fontSize="8" fill="#15803d" fontWeight="bold">  A tervrajzra írt szám mindig a valós méretet jelöli!</text>
    </g>
  </svg>
);

// Figure 5: Scale Reduction vs. Enlargement (1:100 vs. 5:1)
export const ScaleReductionEnlargementSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 210" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="200" rx="14" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#581c87">
      Kicsinyítés (1 : N) és Nagyítás (N : 1) műszaki alkalmazása
    </text>

    {/* Reduction Column: Building 1:100 */}
    <g transform="translate(40, 48)">
      <rect x="0" y="0" width="210" height="135" rx="8" fill="#ffffff" stroke="#c084fc" strokeWidth="1" />
      <text x="105" y="22" fontSize="10" textAnchor="middle" fill="#7e22ce" fontWeight="bold">
        Kicsinyítés: M = 1 : 100
      </text>
      <text x="105" y="38" fontSize="8.5" textAnchor="middle" fill="#64748b">Épületek, hidak, járművek</text>

      {/* House outline */}
      <polygon points="105,50 145,75 65,75" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1" />
      <rect x="75" y="75" width="60" height="40" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />

      <text x="105" y="125" fontSize="8.5" textAnchor="middle" fill="#7e22ce" fontWeight="bold">
        Rajz &lt; Valóság (hossz = valóság / 100)
      </text>
    </g>

    {/* Enlargement Column: Watch gear 5:1 */}
    <g transform="translate(290, 48)">
      <rect x="0" y="0" width="210" height="135" rx="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
      <text x="105" y="22" fontSize="10" textAnchor="middle" fill="#0369a1" fontWeight="bold">
        Nagyítás: M = 5 : 1
      </text>
      <text x="105" y="38" fontSize="8.5" textAnchor="middle" fill="#64748b">Óraalkatrészek, mikrocsipek</text>

      {/* Gear miniature enlarged */}
      <circle cx="105" cy="80" r="28" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
      <circle cx="105" cy="80" r="10" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />

      <text x="105" y="125" fontSize="8.5" textAnchor="middle" fill="#0369a1" fontWeight="bold">
        Rajz &gt; Valóság (rajz = valóság × 5)
      </text>
    </g>
  </svg>
);

