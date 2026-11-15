import React from 'react';

// Figure 1: Középvonal tétele és bizonyítása hasonlósággal
export const MidlineTheoremSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="240" rx="14" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />

    <text x="270" y="25" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#166534">
      A háromszög középvonalának tétele
    </text>

    {/* Triangle ABC: A=(70, 200), B=(350, 200), C=(220, 50) */}
    <polygon points="70,200 350,200 220,50" fill="#dcfce7" stroke="#15803d" strokeWidth="2.5" />

    {/* Midpoint D on AC: (70+220)/2 = 145, (200+50)/2 = 125 */}
    <circle cx="145" cy="125" r="4.5" fill="#dc2626" />
    <text x="125" y="128" fontSize="11" fontWeight="bold" fill="#dc2626">D (b/2)</text>

    {/* Midpoint E on BC: (350+220)/2 = 285, (200+50)/2 = 125 */}
    <circle cx="285" cy="125" r="4.5" fill="#dc2626" />
    <text x="295" y="128" fontSize="11" fontWeight="bold" fill="#dc2626">E (a/2)</text>

    {/* Midline DE */}
    <line x1="145" y1="125" x2="285" y2="125" stroke="#dc2626" strokeWidth="2.5" />
    <text x="215" y="118" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#dc2626">k_c = c / 2</text>

    {/* Vertices */}
    <circle cx="70" cy="200" r="4" fill="#15803d" />
    <text x="55" y="210" fontSize="11" fontWeight="bold" fill="#15803d">A</text>
    <circle cx="350" cy="200" r="4" fill="#15803d" />
    <text x="360" y="210" fontSize="11" fontWeight="bold" fill="#15803d">B</text>
    <circle cx="220" cy="50" r="4" fill="#15803d" />
    <text x="220" y="42" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#15803d">C</text>

    {/* Base AB label */}
    <text x="210" y="218" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#15803d">c oldal (alap)</text>

    {/* Parallel lines marker */}
    <text x="215" y="140" fontSize="9" textAnchor="middle" fill="#047857" fontWeight="bold">DE || AB</text>

    {/* Explanation Card */}
    <g transform="translate(370, 50)">
      <rect x="0" y="0" width="150" height="135" rx="8" fill="#ffffff" stroke="#86efac" />
      <text x="75" y="18" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#166534">
        Hasonlósági bizonyítás:
      </text>
      <text x="10" y="36" fontSize="8.5" fill="#334155">• ΔEDC ~ ΔABC (II. eset: o-sz-o)</text>
      <text x="10" y="52" fontSize="8.5" fill="#334155">• γ szög közös</text>
      <text x="10" y="68" fontSize="8.5" fill="#334155">• CD/CA = CE/CB = 1/2</text>
      <text x="10" y="86" fontSize="8.5" fill="#15803d" fontWeight="bold">• DE / AB = 1/2</text>
      <text x="10" y="104" fontSize="8.5" fill="#dc2626" fontWeight="bold">• k_c = c / 2</text>
      <text x="10" y="122" fontSize="8.5" fill="#047857" fontWeight="bold">• k_c || c (egyállású szögek)</text>
    </g>
  </svg>
);

// Figure 2: A 3 középvonal 4 egybevágó háromszögre osztja a háromszöget
export const FourMidlineTrianglesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="240" rx="14" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />

    <text x="270" y="25" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
      A 3 középvonal 4 egybevágó háromszögre oszt (K/2, T/4)
    </text>

    {/* A=(70, 200), B=(330, 200), C=(200, 50) */}
    {/* Midpoints:
        F_c = (200, 200) on AB
        F_b = (135, 125) on AC
        F_a = (265, 125) on BC
    */}
    {/* 4 Triangles */}
    {/* Top: C, F_b, F_a */}
    <polygon points="200,50 135,125 265,125" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    <text x="200" y="105" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">T / 4</text>

    {/* Bottom Left: A, F_c, F_b */}
    <polygon points="70,200 200,200 135,125" fill="#e0e7ff" stroke="#2563eb" strokeWidth="2" />
    <text x="135" y="175" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">T / 4</text>

    {/* Bottom Right: B, F_a, F_c */}
    <polygon points="330,200 265,125 200,200" fill="#e0e7ff" stroke="#2563eb" strokeWidth="2" />
    <text x="265" y="175" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#1d4ed8">T / 4</text>

    {/* Center inverted: F_c, F_b, F_a */}
    <polygon points="200,200 135,125 265,125" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
    <text x="200" y="150" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#854d0e">Középvonal-Δ</text>
    <text x="200" y="165" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#ca8a04">T / 4</text>

    {/* Vertices */}
    <text x="55" y="210" fontSize="11" fontWeight="bold" fill="#1e3a8a">A</text>
    <text x="340" y="210" fontSize="11" fontWeight="bold" fill="#1e3a8a">B</text>
    <text x="200" y="42" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">C</text>

    {/* Midpoints */}
    <circle cx="200" cy="200" r="3.5" fill="#dc2626" />
    <circle cx="135" cy="125" r="3.5" fill="#dc2626" />
    <circle cx="265" cy="125" r="3.5" fill="#dc2626" />

    {/* Info Card */}
    <g transform="translate(365, 50)">
      <rect x="0" y="0" width="155" height="140" rx="8" fill="#ffffff" stroke="#93c5fd" />
      <text x="77" y="18" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#1e40af">
        Középvonal-háromszög:
      </text>
      <text x="10" y="38" fontSize="8.5" fill="#334155">• Oldalai: a/2, b/2, c/2</text>
      <text x="10" y="56" fontSize="8.5" fill="#334155">• Hasonlósági arány: λ = 1/2</text>
      <text x="10" y="74" fontSize="8.5" fill="#1d4ed8" fontWeight="bold">• Kerület: K_közép = K / 2</text>
      <text x="10" y="94" fontSize="8.5" fill="#ca8a04" fontWeight="bold">• Terület: T_közép = T / 4</text>
      <text x="10" y="114" fontSize="8" fill="#475569">(mivel λ² = (1/2)² = 1/4)</text>
      <text x="10" y="130" fontSize="8.5" fill="#15803d" fontWeight="bold">• 4 egybevágó háromszög!</text>
    </g>
  </svg>
);

// Figure 3: Súlyvonalak metszéspontja és 2:1 arányú osztása
export const MediansCentroidRatioSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="240" rx="14" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />

    <text x="270" y="25" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#581c87">
      A súlypont (S) 2 : 1 arányban osztja a súlyvonalakat
    </text>

    {/* Triangle: A=(70, 200), B=(350, 200), C=(220, 50) */}
    <polygon points="70,200 350,200 220,50" fill="#f5f3ff" stroke="#7e22ce" strokeWidth="2.5" />

    {/* Midpoints:
        F_a on BC: (285, 125)
        F_b on AC: (145, 125)
        F_c on AB: (210, 200)
    */}
    {/* Centroid S: (70+350+220)/3 = 213.3, (200+200+50)/3 = 150 */}
    {/* Medians:
        A to F_a: (70, 200) to (285, 125)
        B to F_b: (350, 200) to (145, 125)
        C to F_c: (220, 50) to (210, 200)
    */}
    <line x1="70" y1="200" x2="285" y2="125" stroke="#dc2626" strokeWidth="2" />
    <line x1="350" y1="200" x2="145" y2="125" stroke="#2563eb" strokeWidth="2" />
    <line x1="220" y1="50" x2="210" y2="200" stroke="#059669" strokeWidth="2" />

    {/* Centroid S */}
    <circle cx="213" cy="150" r="5" fill="#d97706" />
    <text x="225" y="153" fontSize="12" fontWeight="bold" fill="#d97706">S</text>

    {/* Labels on medians: 2x, x and 2y, y */}
    <text x="135" y="188" fontSize="9" fill="#dc2626" fontWeight="bold">2x</text>
    <text x="255" y="135" fontSize="9" fill="#dc2626" fontWeight="bold">x</text>

    <text x="290" y="188" fontSize="9" fill="#2563eb" fontWeight="bold">2y</text>
    <text x="170" y="135" fontSize="9" fill="#2563eb" fontWeight="bold">y</text>

    <text x="222" y="100" fontSize="9" fill="#059669" fontWeight="bold">2z</text>
    <text x="220" y="180" fontSize="9" fill="#059669" fontWeight="bold">z</text>

    {/* Vertices */}
    <text x="55" y="210" fontSize="11" fontWeight="bold" fill="#581c87">A</text>
    <text x="360" y="210" fontSize="11" fontWeight="bold" fill="#581c87">B</text>
    <text x="220" y="42" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#581c87">C</text>

    {/* Explanation Card */}
    <g transform="translate(370, 50)">
      <rect x="0" y="0" width="150" height="145" rx="8" fill="#ffffff" stroke="#d8b4fe" />
      <text x="75" y="18" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#6b21a8">
        Súlypont tétele:
      </text>
      <text x="10" y="36" fontSize="8.5" fill="#334155">• 3 súlyvonal 1 pontban metsz</text>
      <text x="10" y="52" fontSize="8.5" fill="#d97706" fontWeight="bold">• Osztásarány: 2 : 1</text>
      <text x="10" y="68" fontSize="8.5" fill="#334155">• Hosszabb rész csúcshoz ér!</text>
      <text x="10" y="86" fontSize="8.5" fill="#dc2626" fontWeight="bold">• AS = (2/3) · s_a</text>
      <text x="10" y="102" fontSize="8.5" fill="#dc2626">• SF_a = (1/3) · s_a</text>
      <text x="10" y="120" fontSize="8" fill="#059669" fontWeight="bold">• ΔABS ~ ΔDES (λ = 2)</text>
      <text x="10" y="136" fontSize="8" fill="#475569">bizonyítja a 2:1 arányt!</text>
    </g>
  </svg>
);

// Figure 4: Területfelosztási törvények (6 egyenlő területű háromszög és 3 harmad)
export const SixEqualAreaTrianglesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="230" rx="14" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />

    <text x="270" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#92400e">
      A súlyvonalak területfelosztása: 6 egyenlő rész (T / 6)
    </text>

    {/* Triangle: A=(70, 190), B=(330, 190), C=(200, 50) */}
    {/* Midpoints: F_c=(200,190), F_b=(135,120), F_a=(265,120) */}
    {/* Centroid: S=(200, 143.3) */}
    <polygon points="70,190 330,190 200,50" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />

    {/* 6 triangles shaded with subtle pastel tones */}
    <polygon points="70,190 200,190 200,143" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
    <polygon points="200,190 330,190 200,143" fill="#ffedd5" stroke="#ea580c" strokeWidth="1" />
    <polygon points="330,190 265,120 200,143" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1" />
    <polygon points="265,120 200,50 200,143" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
    <polygon points="200,50 135,120 200,143" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
    <polygon points="135,120 70,190 200,143" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />

    {/* Medians */}
    <line x1="70" y1="190" x2="265" y2="120" stroke="#b45309" strokeWidth="1.5" />
    <line x1="330" y1="190" x2="135" y2="120" stroke="#b45309" strokeWidth="1.5" />
    <line x1="200" y1="50" x2="200" y2="190" stroke="#b45309" strokeWidth="1.5" />

    {/* T/6 labels in each of the 6 areas */}
    <text x="160" y="175" fontSize="8.5" fontWeight="bold" fill="#dc2626">T/6</text>
    <text x="240" y="175" fontSize="8.5" fontWeight="bold" fill="#ea580c">T/6</text>
    <text x="260" y="145" fontSize="8.5" fontWeight="bold" fill="#ca8a04">T/6</text>
    <text x="220" y="105" fontSize="8.5" fontWeight="bold" fill="#16a34a">T/6</text>
    <text x="180" y="105" fontSize="8.5" fontWeight="bold" fill="#4f46e5">T/6</text>
    <text x="140" y="145" fontSize="8.5" fontWeight="bold" fill="#9333ea">T/6</text>

    {/* Centroid S */}
    <circle cx="200" cy="143" r="4" fill="#b45309" />
    <text x="207" y="146" fontSize="10" fontWeight="bold" fill="#b45309">S</text>

    {/* Card */}
    <g transform="translate(355, 45)">
      <rect x="0" y="0" width="165" height="145" rx="8" fill="#ffffff" stroke="#fcd34d" />
      <text x="82" y="18" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#92400e">
        Területfelosztási szabályok:
      </text>
      <text x="10" y="38" fontSize="8.5" fill="#334155">• Egy súlyvonal 2 félre oszt (T/2)</text>
      <text x="10" y="56" fontSize="8.5" fill="#b45309" fontWeight="bold">• 3 súlyvonal 6 egyenlő részre</text>
      <text x="10" y="74" fontSize="8.5" fill="#334155">  osztja a háromszöget (T/6)</text>
      <text x="10" y="94" fontSize="8.5" fill="#15803d" fontWeight="bold">• Ha S-t a csúcsokkal kötjük</text>
      <text x="10" y="110" fontSize="8.5" fill="#15803d">  össze, 3 harmad keletkezik:</text>
      <text x="10" y="128" fontSize="9" fill="#047857" fontWeight="bold">  T_ABS = T_BCS = T_CAS = T/3!</text>
    </g>
  </svg>
);

// Figure 5: Derékszögű háromszög átfogójához tartozó súlyvonala (s_c = c/2 = R)
export const RightTriangleMedianSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="230" rx="14" fill="#f0fdfa" stroke="#ccfbf1" strokeWidth="1.5" />

    <text x="270" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f766e">
      Derékszögű háromszög átfogó-súlyvonala: s_c = c / 2 = R (Thálész-kör)
    </text>

    {/* Right-angled triangle C=(90, 60), A=(90, 190), B=(330, 190) -> wait, right-angle at C */}
    {/* Thales circle centered at hypotenuse midpoint F_c:
        A=(70, 190), B=(310, 190) -> hypotenuse AB = 240, midpoint F_c = (190, 190), Radius R = 120.
        Point C on circle: (190 + 120*cos(120°), 190 - 120*sin(120°)) = (190 - 60, 190 - 103.9) = (130, 86)
    */}
    {/* Thales semicircle */}
    <path d="M 70,190 A 120,120 0 0,1 310,190" fill="none" stroke="#99f6e4" strokeWidth="2" strokeDasharray="4,4" />

    {/* Triangle ABC */}
    <polygon points="70,190 310,190 130,86" fill="#ccfbf1" stroke="#0f766e" strokeWidth="2.5" />

    {/* Right angle marker at C (magyar jelölés: negyedkörív + pont) */}
    <path d="M 122,99.9 A 16,16 0 0,0 143.9,94" fill="none" stroke="#0f766e" strokeWidth="1.6" />
    <circle cx="132.3" cy="94.5" r="1.7" fill="#0f766e" />
    <circle cx="130" cy="86" r="3" fill="#0f766e" />
    <text x="125" y="75" fontSize="11" fontWeight="bold" fill="#0f766e">C (90°)</text>

    {/* Hypotenuse midpoint F_c */}
    <circle cx="190" cy="190" r="4.5" fill="#dc2626" />
    <text x="190" y="208" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#dc2626">F_c (R középpont)</text>

    {/* Median s_c = CF_c */}
    <line x1="130" y1="86" x2="190" y2="190" stroke="#dc2626" strokeWidth="2.5" />
    <text x="175" y="130" fontSize="10" fontWeight="bold" fill="#dc2626">s_c = R = c / 2</text>

    {/* Segments AF_c and F_cB */}
    <text x="130" y="185" fontSize="9" fill="#0f766e" fontWeight="bold">c/2 = R</text>
    <text x="250" y="185" fontSize="9" fill="#0f766e" fontWeight="bold">c/2 = R</text>

    {/* Vertices */}
    <text x="55" y="200" fontSize="11" fontWeight="bold" fill="#0f766e">A</text>
    <text x="320" y="200" fontSize="11" fontWeight="bold" fill="#0f766e">B</text>

    {/* Card */}
    <g transform="translate(345, 45)">
      <rect x="0" y="0" width="180" height="150" rx="8" fill="#ffffff" stroke="#99f6e4" />
      <text x="90" y="18" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#0f766e">
        Aranyszabály Derékszögnél:
      </text>
      <text x="10" y="38" fontSize="8.5" fill="#334155">• Thálész-tétel miatt az átfogó</text>
      <text x="10" y="52" fontSize="8.5" fill="#334155">  a köré írt kör átmérője: 2R = c</text>
      <text x="10" y="70" fontSize="8.5" fill="#dc2626" fontWeight="bold">• s_c = AF_c = BF_c = R = c / 2</text>
      <text x="10" y="88" fontSize="8.5" fill="#334155">• Példa (14 cm és 33,6 cm befogók):</text>
      <text x="10" y="104" fontSize="8.5" fill="#334155">  c = √(14² + 33,6²) = 36,4 cm</text>
      <text x="10" y="122" fontSize="8.5" fill="#15803d" fontWeight="bold">• s_c = 36,4 / 2 = 18,2 cm!</text>
      <text x="10" y="138" fontSize="8.5" fill="#0f766e" fontWeight="bold">• S távolsága C-től: (2/3)·18,2 ≈ 12,1 cm</text>
    </g>
  </svg>
);

