import React from 'react';

// Figure 1: A 4 hasonlósági alapeset
export const FourSimilarityCasesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-xl mx-auto' }) => (
  <svg viewBox="0 0 600 365" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="590" height="355" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

    <text x="300" y="27" fontSize="13" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      A háromszögek hasonlóságának 4 alapesete
    </text>

    {/* Central Card: Alapháromszög (Reference Triangle) */}
    <g transform="translate(215, 42)">
      <rect x="0" y="0" width="170" height="300" rx="12" fill="#ffffff" stroke="#c7d2fe" strokeWidth="1.5" />
      <path d="M 0 12 A 12 12 0 0 1 12 0 L 158 0 A 12 12 0 0 1 170 12 L 170 32 L 0 32 Z" fill="#e0e7ff" />
      <text x="85" y="19" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#312e81">
        Alapháromszög
      </text>
      <text x="85" y="44" fontSize="8.5" textAnchor="middle" fill="#4338ca" fontWeight="bold">
        Eredeti méretek és szögek
      </text>

      {/* Triangle Polygon: Apex (85, 62), Left (28, 142), Right (142, 142) */}
      <polygon points="85,62 28,142 142,142" fill="#eef2ff" stroke="#4338ca" strokeWidth="2" strokeLinejoin="round" />

      {/* Angle Alpha at Left (28, 142) */}
      <path d="M 28 142 L 47 142 A 19 19 0 0 0 39.0 126.7 Z" fill="rgba(239, 68, 68, 0.18)" />
      <path d="M 47 142 A 19 19 0 0 0 39.0 126.7" fill="none" stroke="#dc2626" strokeWidth="1.75" />
      <text x="52" y="130" fontSize="9.5" fontWeight="bold" fill="#b91c1c" textAnchor="middle" dominantBaseline="central">α</text>

      {/* Angle Beta at Right (142, 142) - Hungarian double arc */}
      <path d="M 142 142 L 121 142 A 21 21 0 0 1 129.8 125.1 Z" fill="rgba(37, 99, 235, 0.15)" />
      <path d="M 121 142 A 21 21 0 0 1 129.8 125.1" fill="none" stroke="#2563eb" strokeWidth="1.5" />
      <path d="M 125 142 A 17 17 0 0 1 132.1 128.3" fill="none" stroke="#2563eb" strokeWidth="1.5" />
      <text x="118" y="130" fontSize="9.5" fontWeight="bold" fill="#1d4ed8" textAnchor="middle" dominantBaseline="central">β</text>

      {/* Angle Gamma at Apex (85, 62) */}
      <path d="M 85 62 L 73.4 78.2 A 20 20 0 0 0 96.6 78.2 Z" fill="rgba(217, 119, 6, 0.2)" />
      <path d="M 73.4 78.2 A 20 20 0 0 0 96.6 78.2" fill="none" stroke="#d97706" strokeWidth="1.75" />
      <text x="85" y="89" fontSize="9.5" fontWeight="bold" fill="#b45309" textAnchor="middle" dominantBaseline="central">γ</text>

      {/* Side labels */}
      <text x="46" y="97" fontSize="9.5" fontWeight="bold" fill="#047857" textAnchor="middle">b</text>
      <text x="124" y="97" fontSize="9.5" fontWeight="bold" fill="#b91c1c" textAnchor="middle">a</text>
      <text x="85" y="156" fontSize="9.5" fontWeight="bold" fill="#4338ca" textAnchor="middle">c</text>

      {/* Explanation below */}
      <line x1="15" y1="172" x2="155" y2="172" stroke="#e0e7ff" strokeWidth="1.5" />
      <text x="85" y="190" fontSize="8.5" textAnchor="middle" fill="#334155" fontWeight="bold">
        Közös viszonyítási alap:
      </text>
      <text x="85" y="206" fontSize="8" textAnchor="middle" fill="#64748b">
        Az alábbi 4 eset mindegyike
      </text>
      <text x="85" y="219" fontSize="8" textAnchor="middle" fill="#64748b">
        ezen alapmintához méri
      </text>
      <text x="85" y="232" fontSize="8" textAnchor="middle" fill="#4338ca" fontWeight="bold">
        az arányokat és szögeket.
      </text>

      <rect x="15" y="247" width="140" height="38" rx="8" fill="#eef2ff" stroke="#c7d2fe" />
      <text x="85" y="262" fontSize="8.5" textAnchor="middle" fontWeight="bold" fill="#312e81">
        λ &gt; 0 hasonlósági arány
      </text>
      <text x="85" y="276" fontSize="8" textAnchor="middle" fill="#4f46e5">
        λ = a'/a = b'/b = c'/c
      </text>
    </g>

    {/* Case I: Top-Left - sz-sz (két szög egyenlő) */}
    <g transform="translate(25, 42)">
      <rect x="0" y="0" width="180" height="144" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
      <text x="90" y="20" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#166534">
        I. eset: sz-sz
      </text>
      <text x="90" y="33" fontSize="8.5" textAnchor="middle" fill="#15803d">
        Két-két szög egyenlő
      </text>

      {/* Triangle: Apex (90, 44), Left (32, 114), Right (148, 114) */}
      <polygon points="90,44 32,114 148,114" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.75" strokeLinejoin="round" />

      {/* Angle Alpha at Left (32, 114) - Beautiful crisp arc and sector */}
      <path d="M 32 114 L 52 114 A 20 20 0 0 0 44.5 98.4 Z" fill="rgba(220, 38, 38, 0.18)" />
      <path d="M 52 114 A 20 20 0 0 0 44.5 98.4" fill="none" stroke="#dc2626" strokeWidth="1.8" />
      <text x="59" y="102" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle" dominantBaseline="central">α</text>

      {/* Angle Beta at Right (148, 114) - Hungarian double arc */}
      <path d="M 148 114 L 126 114 A 22 22 0 0 1 134.2 96.9 Z" fill="rgba(37, 99, 235, 0.15)" />
      <path d="M 126 114 A 22 22 0 0 1 134.2 96.9" fill="none" stroke="#2563eb" strokeWidth="1.5" />
      <path d="M 131 114 A 17 17 0 0 1 137.3 100.8" fill="none" stroke="#2563eb" strokeWidth="1.5" />
      <text x="119" y="101" fontSize="10" fontWeight="bold" fill="#1d4ed8" textAnchor="middle" dominantBaseline="central">β</text>

      <text x="90" y="132" fontSize="8.5" textAnchor="middle" fill="#14532d" fontWeight="bold">
        α₁ = α₂ és β₁ = β₂
      </text>
    </g>

    {/* Case II: Top-Right - o-sz-o (két oldal aránya + közbezárt szög) */}
    <g transform="translate(395, 42)">
      <rect x="0" y="0" width="180" height="144" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
      <text x="90" y="20" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#1e40af">
        II. eset: o-sz-o
      </text>
      <text x="90" y="33" fontSize="8.5" textAnchor="middle" fill="#2563eb">
        Két oldal aránya + közbezárt szög
      </text>

      {/* Triangle: Apex (90, 44), Left (36, 114), Right (144, 114) */}
      <polygon points="90,44 36,114 144,114" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.75" strokeLinejoin="round" />

      {/* Angle Gamma at Apex (90, 44) - Precise circular arc and sector */}
      <path d="M 90 44 L 78 60 A 20 20 0 0 0 102 60 Z" fill="rgba(217, 119, 6, 0.2)" />
      <path d="M 78 60 A 20 20 0 0 0 102 60" fill="none" stroke="#d97706" strokeWidth="1.8" />
      <text x="90" y="73" fontSize="10" fontWeight="bold" fill="#b45309" textAnchor="middle" dominantBaseline="central">γ</text>

      {/* Side labels */}
      <text x="50" y="76" fontSize="9" fontWeight="bold" fill="#047857" textAnchor="middle">λb</text>
      <text x="130" y="76" fontSize="9" fontWeight="bold" fill="#b91c1c" textAnchor="middle">λa</text>

      <text x="90" y="132" fontSize="8.5" textAnchor="middle" fill="#1e3a8a" fontWeight="bold">
        a₁/a₂ = b₁/b₂ és γ₁ = γ₂
      </text>
    </g>

    {/* Case III: Bottom-Left - o-o-o (három oldal aránya egyenlő) */}
    <g transform="translate(25, 198)">
      <rect x="0" y="0" width="180" height="144" rx="12" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="1.5" />
      <text x="90" y="20" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#6b21a8">
        III. eset: o-o-o
      </text>
      <text x="90" y="33" fontSize="8.5" textAnchor="middle" fill="#7e22ce">
        Három oldal aránya egyenlő
      </text>

      {/* Triangle: Apex (90, 44), Left (32, 114), Right (148, 114) */}
      <polygon points="90,44 32,114 148,114" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="1.75" strokeLinejoin="round" />

      {/* Side labels */}
      <text x="48" y="76" fontSize="9" fontWeight="bold" fill="#047857" textAnchor="middle">λb</text>
      <text x="132" y="76" fontSize="9" fontWeight="bold" fill="#b91c1c" textAnchor="middle">λa</text>
      <text x="90" y="108" fontSize="9" fontWeight="bold" fill="#4338ca" textAnchor="middle">λc</text>

      <text x="90" y="132" fontSize="8.5" textAnchor="middle" fill="#581c87" fontWeight="bold">
        a₁/a₂ = b₁/b₂ = c₁/c₂ = λ
      </text>
    </g>

    {/* Case IV: Bottom-Right - o-o-sz (két oldal aránya + nagyobbikkal szemközti szög) */}
    <g transform="translate(395, 198)">
      <rect x="0" y="0" width="180" height="144" rx="12" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.5" />
      <text x="90" y="20" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#9a3412">
        IV. eset: o-o-sz
      </text>
      <text x="90" y="33" fontSize="8.5" textAnchor="middle" fill="#c2410c">
        Két oldal aránya + szög a nagyobbikkal szemben
      </text>

      {/* Triangle: Apex (82, 44), Left (30, 114), Right (150, 114) where a > b */}
      <polygon points="82,44 30,114 150,114" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.75" strokeLinejoin="round" />

      {/* Angle Alpha at Left (30, 114) - Precise arc and sector, NO text collision */}
      <path d="M 30 114 L 50 114 A 20 20 0 0 0 41.7 97.8 Z" fill="rgba(220, 38, 38, 0.18)" />
      <path d="M 50 114 A 20 20 0 0 0 41.7 97.8" fill="none" stroke="#dc2626" strokeWidth="1.8" />
      <text x="58" y="101" fontSize="10" fontWeight="bold" fill="#b91c1c" textAnchor="middle" dominantBaseline="central">α</text>

      {/* Side labels */}
      <text x="44" y="74" fontSize="9" fontWeight="bold" fill="#047857" textAnchor="middle">λb</text>
      <text x="126" y="71" fontSize="9" fontWeight="bold" fill="#b91c1c" textAnchor="middle">λa</text>
      <text x="126" y="82" fontSize="7.5" fontWeight="bold" fill="#991b1b" textAnchor="middle">(nagyobb)</text>

      <text x="90" y="132" fontSize="8.5" textAnchor="middle" fill="#7c2d12" fontWeight="bold">
        a₁/a₂ = b₁/b₂ és α₁ = α₂ (a &gt; b)
      </text>
    </g>
  </svg>
);

// Figure 2: A 3 matróz távolságmérése
export const ThreeSailorsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="240" rx="14" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />

    <text x="270" y="25" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#166534">
      A 3 matróz távolságmérése szögméréssel
    </text>

    {/* Coastline */}
    <line x1="40" y1="180" x2="500" y2="180" stroke="#ca8a04" strokeWidth="4" strokeDasharray="6,4" />
    <text x="490" y="196" fontSize="10" fill="#a16207" fontWeight="bold">Partvonal</text>

    {/* Points A and B on the shore */}
    <circle cx="120" cy="180" r="4" fill="#15803d" />
    <text x="115" y="200" fontSize="11" fontWeight="bold" fill="#15803d">A</text>
    <circle cx="340" cy="180" r="4" fill="#15803d" />
    <text x="335" y="200" fontSize="11" fontWeight="bold" fill="#15803d">B</text>

    {/* Baseline AB = 100 m */}
    <line x1="120" y1="210" x2="340" y2="210" stroke="#16a34a" strokeWidth="1.5" markerEnd="url(#arrow)" />
    <text x="230" y="224" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#15803d">
      AB = 100 m (kicsinyítésben 10 cm)
    </text>

    {/* Ship Position H */}
    <circle cx="210" cy="65" r="5" fill="#dc2626" />
    <text x="205" y="55" fontSize="11" fontWeight="bold" fill="#dc2626">Hajó (H)</text>

    {/* Sight lines */}
    <line x1="120" y1="180" x2="210" y2="65" stroke="#0284c7" strokeWidth="2" />
    <line x1="340" y1="180" x2="210" y2="65" stroke="#0284c7" strokeWidth="2" />

    {/* Perpendicular distance from H to AB */}
    <line x1="210" y1="65" x2="210" y2="180" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,4" />
    <path d="M 210 166 A 14 14 0 0 1 224 180" fill="none" stroke="#dc2626" strokeWidth="1.5" />
    <circle cx="215.5" cy="174.5" r="1.6" fill="#dc2626" />
    <text x="218" y="125" fontSize="10" fontWeight="bold" fill="#dc2626">d ≈ 90–95 m (9,2 cm)</text>

    {/* Angle Alpha at A */}
    <path d="M 120 180 L 145 180 A 25 25 0 0 0 135.4 160.3 Z" fill="rgba(234, 88, 12, 0.18)" />
    <path d="M 145 180 A 25 25 0 0 0 135.4 160.3" fill="none" stroke="#ea580c" strokeWidth="2" />
    <text x="156" y="166" fontSize="9.5" fontWeight="bold" fill="#c2410c">α = 74°</text>

    {/* Angle Beta at B - Hungarian double arc */}
    <path d="M 340 180 L 315 180 A 25 25 0 0 1 321.3 163.4 Z" fill="rgba(37, 99, 235, 0.15)" />
    <path d="M 315 180 A 25 25 0 0 1 321.3 163.4" fill="none" stroke="#2563eb" strokeWidth="1.8" />
    <path d="M 320 180 A 20 20 0 0 1 325.0 166.7" fill="none" stroke="#2563eb" strokeWidth="1.8" />
    <text x="282" y="166" fontSize="9.5" fontWeight="bold" fill="#1d4ed8">β = 52°</text>

    {/* Info Box */}
    <g transform="translate(370, 45)">
      <rect x="0" y="0" width="150" height="85" rx="8" fill="#ffffff" stroke="#86efac" />
      <text x="75" y="17" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#166534">
        Matrózok átlagértékei:
      </text>
      <text x="10" y="33" fontSize="8.5" fill="#334155">α = (72+73+77)/3 = 74°</text>
      <text x="10" y="47" fontSize="8.5" fill="#334155">β = (53+51+52)/3 = 52°</text>
      <text x="10" y="61" fontSize="8.5" fill="#166534" fontWeight="bold">Méretarány: 1 : 1000</text>
      <text x="10" y="75" fontSize="8.5" fill="#dc2626" fontWeight="bold">Eltérés: kb. 9,1 m</text>
    </g>
  </svg>
);

// Figure 3: Homokóra / Metsző szelő alakú hasonló háromszögek
export const HourglassTrianglesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="220" rx="14" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />

    <text x="270" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#581c87">
      Homokóra-alakzat (Csúcsszögek és Váltószögek: I. alapeset)
    </text>

    {/* Parallel lines AB and CD */}
    <line x1="70" y1="50" x2="470" y2="50" stroke="#9333ea" strokeWidth="2" strokeDasharray="3,3" />
    <line x1="70" y1="180" x2="470" y2="180" stroke="#9333ea" strokeWidth="2" strokeDasharray="3,3" />
    <text x="475" y="54" fontSize="9" fill="#9333ea" fontWeight="bold">p₁ || p₂</text>
    <text x="475" y="184" fontSize="9" fill="#9333ea" fontWeight="bold">p₂</text>

    {/* Upper segment AB */}
    <line x1="160" y1="50" x2="380" y2="50" stroke="#7e22ce" strokeWidth="3" />
    <circle cx="160" cy="50" r="4" fill="#7e22ce" />
    <text x="150" y="44" fontSize="11" fontWeight="bold" fill="#7e22ce">A</text>
    <circle cx="380" cy="50" r="4" fill="#7e22ce" />
    <text x="385" y="44" fontSize="11" fontWeight="bold" fill="#7e22ce">B</text>

    {/* Lower segment CD */}
    <line x1="220" y1="180" x2="320" y2="180" stroke="#2563eb" strokeWidth="3" />
    <circle cx="220" cy="180" r="4" fill="#2563eb" />
    <text x="210" y="196" fontSize="11" fontWeight="bold" fill="#2563eb">C</text>
    <circle cx="320" cy="180" r="4" fill="#2563eb" />
    <text x="325" y="196" fontSize="11" fontWeight="bold" fill="#2563eb">D</text>

    {/* Intersecting secants AD and BC */}
    <line x1="160" y1="50" x2="320" y2="180" stroke="#059669" strokeWidth="2" />
    <line x1="380" y1="50" x2="220" y2="180" stroke="#ea580c" strokeWidth="2" />

    {/* Intersection Point M */}
    <circle cx="256" cy="128" r="4" fill="#dc2626" />
    <text x="264" y="132" fontSize="11" fontWeight="bold" fill="#dc2626">M</text>

    {/* Equal angles markings - crisp geometric arcs */}
    {/* Angle Alpha at A(160, 50) */}
    <path d="M 180 50 A 20 20 0 0 1 175.5 62.6" fill="none" stroke="#dc2626" strokeWidth="1.75" />
    <text x="187" y="62" fontSize="9" fill="#b91c1c" fontWeight="bold">α</text>

    {/* Angle Alpha' at D(320, 180) */}
    <path d="M 300 180 A 20 20 0 0 1 304.5 167.4" fill="none" stroke="#dc2626" strokeWidth="1.75" />
    <text x="293" y="168" fontSize="9" fill="#b91c1c" fontWeight="bold">α'</text>

    {/* Angle Beta at B(380, 50) - double arc */}
    <path d="M 360 50 A 20 20 0 0 0 364.5 62.6" fill="none" stroke="#2563eb" strokeWidth="1.5" />
    <path d="M 364 50 A 16 16 0 0 0 367.6 60.1" fill="none" stroke="#2563eb" strokeWidth="1.5" />
    <text x="353" y="62" fontSize="9" fill="#1d4ed8" fontWeight="bold">β</text>

    {/* Angle Beta' at C(220, 180) - double arc */}
    <path d="M 240 180 A 20 20 0 0 0 235.5 167.4" fill="none" stroke="#2563eb" strokeWidth="1.5" />
    <path d="M 236 180 A 16 16 0 0 0 232.4 169.9" fill="none" stroke="#2563eb" strokeWidth="1.5" />
    <text x="247" y="168" fontSize="9" fill="#1d4ed8" fontWeight="bold">β'</text>

    {/* Info text */}
    <g transform="translate(45, 95)">
      <rect x="0" y="0" width="150" height="55" rx="6" fill="#ffffff" stroke="#d8b4fe" />
      <text x="75" y="17" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#6b21a8">
        ΔABM ~ ΔCDM
      </text>
      <text x="10" y="32" fontSize="8" fill="#475569">• Váltószögek: α = α', β = β'</text>
      <text x="10" y="45" fontSize="8" fill="#16a34a" fontWeight="bold">• I. alapeset (sz-sz)</text>
    </g>
  </svg>
);

// Figure 4: Téglalap negyedelőpontja és átlója
export const RectangleQuarterPointSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

    <text x="270" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      ABCD téglalap negyedelőponttal (AB = 8 cm, BC = 10 cm)
    </text>

    {/* Rectangle ABCD: x=80, y=50, width=240, height=140 */}
    <rect x="80" y="50" width="240" height="140" fill="#f1f5f9" stroke="#334155" strokeWidth="2.5" />
    <text x="65" y="195" fontSize="11" fontWeight="bold" fill="#0f172a">A</text>
    <text x="325" y="195" fontSize="11" fontWeight="bold" fill="#0f172a">B</text>
    <text x="325" y="45" fontSize="11" fontWeight="bold" fill="#0f172a">C</text>
    <text x="65" y="45" fontSize="11" fontWeight="bold" fill="#0f172a">D</text>

    {/* Side labels */}
    <text x="200" y="206" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#2563eb">AB = CD = 8 cm</text>
    <text x="50" y="125" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0f766e">BC = 10 cm</text>

    {/* Point P on CD: quarter point closest to C. CD=240px => CP = 60px (x = 320 - 60 = 260) */}
    <circle cx="260" cy="50" r="4" fill="#dc2626" />
    <text x="256" y="42" fontSize="10" fontWeight="bold" fill="#dc2626">P</text>
    <text x="285" y="42" fontSize="9" fill="#dc2626" fontWeight="bold">CP = 2 cm</text>
    <text x="170" y="42" fontSize="9" fill="#475569">PD = 6 cm</text>

    {/* Diagonal AC and line BP */}
    <line x1="80" y1="190" x2="320" y2="50" stroke="#0284c7" strokeWidth="2" />
    <line x1="320" y1="190" x2="260" y2="50" stroke="#d97706" strokeWidth="2" />

    {/* Intersection Point Q between AC and BP */}
    {/* AC line: y - 190 = -140/240 * (x - 80) => y = 190 - 7/12(x-80)
        BP line: x = 320 at y=190, x=260 at y=50. dy/dx = 140 / 60 = 7/3. y - 190 = 7/3 * (x - 320)
        At intersection: Q */}
    <circle cx="277" cy="90" r="4" fill="#7e22ce" />
    <text x="284" y="93" fontSize="10" fontWeight="bold" fill="#7e22ce">Q</text>

    {/* Explanation card on right */}
    <g transform="translate(345, 45)">
      <rect x="0" y="0" width="180" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="90" y="18" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Hasonlóság és Arányok:
      </text>
      <text x="10" y="36" fontSize="8.5" fill="#334155">• CP = 8 / 4 = <tspan fill="#dc2626" fontWeight="bold">2 cm</tspan></text>
      <text x="10" y="52" fontSize="8.5" fill="#334155">• PD = 8 - 2 = <tspan fill="#475569" fontWeight="bold">6 cm</tspan></text>
      <text x="10" y="68" fontSize="8.5" fill="#1e40af" fontWeight="bold">• ΔABQ ~ ΔCPQ (sz-sz)</text>
      <text x="10" y="84" fontSize="8.5" fill="#334155">• Arány: λ = AB / CP = 8 / 2 = 4</text>
      <text x="10" y="100" fontSize="8.5" fill="#334155">• BQ = 4 · QP</text>
      <text x="10" y="116" fontSize="8.5" fill="#334155">• QC = AC / (4 + 1) = AC / 5</text>
      <text x="10" y="132" fontSize="8.5" fill="#15803d" fontWeight="bold">• QC ≈ 3,33 cm</text>
    </g>
  </svg>
);

// Figure 5: Derékszögű trapéz hasonló derékszögű háromszögekből
export const TrapezoidRightTrianglesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="230" rx="14" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />

    <text x="270" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
      Derékszögű trapéz két hasonló derékszögű háromszögből
    </text>

    {/* Trapezoid vertices:
        A = (80, 190), B = (230, 190), C = (230, 70), D = (80, 70)
        Wait, in the textbook: Right trapezoid ABCD made by ABC and CAD:
        ΔABC is right-angled at B: AB = 9, BC = 12, AC = 15.
        ΔCAD is right-angled at C: AC = 15, AD is hypotenuse or CD is parallel?
        AB || CD.
    */}
    {/* Coordinates:
        A=(70, 190), B=(220, 190), C=(220, 70), D=(370, 70) or D=(70, 70)
        If ABCD is trapezoid with AB || CD:
        AB = 9, AC = 15 => BC = 12.
        Right triangle ABC with angle B = 90°.
        ΔCAD is right angled at A or C. If right trapezoid, angle at D or C is 90°.
    */}
    <polygon points="100,190 220,190 340,70 100,70" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2.5" />
    <line x1="100" y1="190" x2="340" y2="70" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,4" />

    {/* Magyar derékszögjelek A(100,190) és D(100,70) csúcsoknál */}
    <path d="M 100 176 A 14 14 0 0 1 114 190" fill="none" stroke="#1e3a8a" strokeWidth="1.5" />
    <circle cx="105.5" cy="184.5" r="1.6" fill="#1e3a8a" />
    <path d="M 114 70 A 14 14 0 0 1 100 84" fill="none" stroke="#1e3a8a" strokeWidth="1.5" />
    <circle cx="105.5" cy="75.5" r="1.6" fill="#1e3a8a" />

    {/* Points */}
    <circle cx="100" cy="190" r="4" fill="#1e3a8a" />
    <text x="85" y="200" fontSize="11" fontWeight="bold" fill="#1e3a8a">A</text>

    <circle cx="220" cy="190" r="4" fill="#1e3a8a" />
    <text x="225" y="200" fontSize="11" fontWeight="bold" fill="#1e3a8a">B</text>

    <circle cx="340" cy="70" r="4" fill="#1e3a8a" />
    <text x="345" y="65" fontSize="11" fontWeight="bold" fill="#1e3a8a">C</text>

    <circle cx="100" cy="70" r="4" fill="#1e3a8a" />
    <text x="85" y="65" fontSize="11" fontWeight="bold" fill="#1e3a8a">D</text>

    {/* Labels */}
    <text x="160" y="205" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">AB = 9 cm</text>
    <text x="220" y="130" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#dc2626">AC = 15 cm</text>
    <text x="220" y="60" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0f766e">CD = 25 cm</text>
    <text x="75" y="130" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">AD = 20 cm</text>

    {/* Formula Box */}
    <g transform="translate(370, 75)">
      <rect x="0" y="0" width="150" height="120" rx="8" fill="#ffffff" stroke="#93c5fd" />
      <text x="75" y="18" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#1e40af">
        Trapéz számítások:
      </text>
      <text x="10" y="36" fontSize="8.5" fill="#334155">• ΔABC ~ ΔCAD</text>
      <text x="10" y="52" fontSize="8.5" fill="#334155">• λ = AC / AB = 15 / 9 = 5/3</text>
      <text x="10" y="68" fontSize="8.5" fill="#334155">• AD = 12 · 5/3 = 20 cm</text>
      <text x="10" y="84" fontSize="8.5" fill="#334155">• CD = 15 · 5/3 = 25 cm</text>
      <text x="10" y="100" fontSize="8.5" fill="#166534" fontWeight="bold">• Kerület: K = 66 cm</text>
      <text x="10" y="114" fontSize="8.5" fill="#166534" fontWeight="bold">• Terület: T = 204 cm²</text>
    </g>
  </svg>
);

// Figure 6: Épületmodell és valódi felhőkarcoló kilengése
export const SkyscraperModelVibrationSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="220" rx="14" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />

    <text x="270" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#92400e">
      Épületmodell szélcsatorna-tesztje (M = 280 m, m = 1,4 m)
    </text>

    {/* Model (small) */}
    <g transform="translate(80, 80)">
      <rect x="25" y="30" width="20" height="70" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      <line x1="35" y1="100" x2="42" y2="30" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" />
      <text x="35" y="118" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#475569">Modell</text>
      <text x="35" y="22" fontSize="8.5" textAnchor="middle" fill="#dc2626" fontWeight="bold">Δx = 1 cm</text>
      <text x="5" y="65" fontSize="8.5" fill="#64748b">m = 1,4 m</text>
    </g>

    {/* Arrow indicating scaling */}
    <g transform="translate(170, 110)">
      <line x1="0" y1="0" x2="60" y2="0" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#arrow)" />
      <text x="30" y="-8" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#b45309">
        λ = 200×
      </text>
    </g>

    {/* Real Skyscraper (large) */}
    <g transform="translate(260, 40)">
      <rect x="30" y="10" width="50" height="150" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
      <line x1="55" y1="160" x2="80" y2="10" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,4" />
      <text x="55" y="176" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0369a1">Valódi Felhőkarcoló</text>
      <text x="95" y="20" fontSize="9.5" fill="#dc2626" fontWeight="bold">ΔX = ?</text>
      <text x="0" y="90" fontSize="9.5" fill="#0369a1" fontWeight="bold">M = 280 m</text>
    </g>

    {/* Calculation Card */}
    <g transform="translate(380, 50)">
      <rect x="0" y="0" width="140" height="140" rx="8" fill="#ffffff" stroke="#fcd34d" />
      <text x="70" y="18" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#92400e">
        Arányszámítás:
      </text>
      <text x="10" y="38" fontSize="8.5" fill="#334155">• M = 280 m</text>
      <text x="10" y="54" fontSize="8.5" fill="#334155">• m = 1,4 m</text>
      <text x="10" y="70" fontSize="8.5" fill="#b45309" fontWeight="bold">• λ = 280 / 1,4 = 200</text>
      <text x="10" y="86" fontSize="8.5" fill="#334155">• Modell kilengés: 1 cm</text>
      <text x="10" y="102" fontSize="8.5" fill="#dc2626" fontWeight="bold">• ΔX = 1 cm · 200</text>
      <text x="10" y="122" fontSize="10" fill="#15803d" fontWeight="bold">= 200 cm = 2 m!</text>
    </g>
  </svg>
);

