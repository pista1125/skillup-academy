import React from 'react';

// Figure 1: Shadow measurement using parallel sun rays (Péter és a fa, Tankönyv 119. oldal)
export const ShadowMeasurementSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="240" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Közvetett magasságmérés árnyékkal (Párhuzamos napsugarak elve)
    </text>

    {/* Sun and parallel rays */}
    <circle cx="80" cy="50" r="16" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
    <line x1="80" y1="50" x2="480" y2="210" stroke="#facc15" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8" />
    <line x1="80" y1="50" x2="220" y2="120" stroke="#facc15" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8" />

    {/* Ground line */}
    <line x1="30" y1="210" x2="510" y2="210" stroke="#475569" strokeWidth="2" />

    {/* Tree AB: Height M = 7.6 m at x = 120 */}
    {/* Trunk */}
    <rect x="114" y="90" width="12" height="120" fill="#78350f" />
    {/* Right angle marker at base of tree (126, 210) */}
    <path d="M 126 196 A 14 14 0 0 1 140 210" fill="none" stroke="#475569" strokeWidth="1.4" />
    <circle cx="131.5" cy="204.5" r="1.6" fill="#475569" />
    {/* Right angle marker at Peter (330, 210) */}
    <path d="M 330 198 A 12 12 0 0 1 342 210" fill="none" stroke="#ea580c" strokeWidth="1.3" />
    <circle cx="334.8" cy="205.2" r="1.4" fill="#ea580c" />
    {/* Foliage */}
    <circle cx="120" cy="80" r="32" fill="#22c55e" stroke="#16a34a" strokeWidth="1.5" />
    <circle cx="105" cy="70" r="22" fill="#4ade80" />
    <circle cx="135" cy="70" r="22" fill="#15803d" />

    {/* Tree height dimension */}
    <line x1="90" y1="50" x2="90" y2="210" stroke="#0284c7" strokeWidth="1.5" />
    <line x1="85" y1="50" x2="95" y2="50" stroke="#0284c7" strokeWidth="1.5" />
    <line x1="85" y1="210" x2="95" y2="210" stroke="#0284c7" strokeWidth="1.5" />
    <text x="75" y="135" fontSize="10" textAnchor="middle" fill="#0284c7" fontWeight="bold">M = 7,6 m</text>

    {/* Peter at x = 330 (4.5 m from tree) */}
    {/* Stick figure: height 1.6 m -> 36 px */}
    <circle cx="330" cy="174" r="5" fill="#ea580c" />
    <line x1="330" y1="179" x2="330" y2="198" stroke="#ea580c" strokeWidth="2" />
    <line x1="330" y1="186" x2="322" y2="192" stroke="#ea580c" strokeWidth="1.5" />
    <line x1="330" y1="186" x2="338" y2="192" stroke="#ea580c" strokeWidth="1.5" />
    <line x1="330" y1="198" x2="324" y2="210" stroke="#ea580c" strokeWidth="1.5" />
    <line x1="330" y1="198" x2="336" y2="210" stroke="#ea580c" strokeWidth="1.5" />

    <text x="330" y="165" fontSize="9" textAnchor="middle" fill="#ea580c" fontWeight="bold">Péter (1,6 m)</text>

    {/* Shadow of Tree: from x = 120 to x = 450 (Total 5.7 m) */}
    <rect x="120" y="211" width="330" height="4" fill="#334155" opacity="0.6" />
    <circle cx="450" cy="210" r="3" fill="#dc2626" />
    <text x="450" y="224" fontSize="9" textAnchor="middle" fill="#dc2626" fontWeight="bold">Árnyék vége</text>

    {/* Dimension lines on ground */}
    {/* Tree to Peter: 4.5 m */}
    <line x1="120" y1="230" x2="330" y2="230" stroke="#475569" strokeWidth="1" />
    <text x="225" y="242" fontSize="9" textAnchor="middle" fill="#475569" fontWeight="bold">4,5 m</text>

    {/* Peter to Shadow End: 1.2 m */}
    <line x1="330" y1="230" x2="450" y2="230" stroke="#475569" strokeWidth="1" />
    <text x="390" y="242" fontSize="9" textAnchor="middle" fill="#475569" fontWeight="bold">1,2 m</text>

    {/* Calculation Card Top Right */}
    <g transform="translate(360, 40)">
      <rect x="0" y="0" width="160" height="90" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="80" y="18" fontSize="10" textAnchor="middle" fill="#0f172a" fontWeight="bold">Hasonlósági arány</text>
      <line x1="10" y1="25" x2="150" y2="25" stroke="#f1f5f9" strokeWidth="1.5" />
      <text x="15" y="42" fontSize="9" fill="#334155">Teljes árnyék: 5,7 m</text>
      <text x="15" y="58" fontSize="9" fill="#334155">Péter árnyéka: 1,2 m</text>
      <text x="15" y="76" fontSize="9.5" fill="#15803d" fontWeight="bold">M = 1,6 · (5,7 / 1,2)</text>
      <text x="15" y="88" fontSize="9.5" fill="#15803d" fontWeight="bold">M = 1,6 · 4,75 = 7,6 m</text>
    </g>
  </svg>
);

// Figure 2: Ground Mirror Height Measurement (Tükörmódszer)
export const MirrorHeightSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="220" rx="14" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1c1917">
      Közvetett magasságmérés talajra helyezett síktükörrel (Fényvisszaverődés: α = α)
    </text>

    {/* Ground */}
    <line x1="30" y1="185" x2="510" y2="185" stroke="#44403c" strokeWidth="2" />

    {/* Tower on left at x = 70 */}
    <rect x="60" y="50" width="20" height="135" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
    <path d="M 80 171 A 14 14 0 0 1 94 185" fill="none" stroke="#475569" strokeWidth="1.4" />
    <circle cx="85.5" cy="179.5" r="1.6" fill="#475569" />
    <polygon points="60,50 80,50 70,30" fill="#dc2626" />
    <text x="70" y="24" fontSize="9" textAnchor="middle" fill="#dc2626" fontWeight="bold">Toronycsúcs</text>
    <text x="40" y="115" fontSize="10" fill="#0284c7" fontWeight="bold">M = ?</text>

    {/* Mirror on ground at x = 270 */}
    <rect x="250" y="184" width="40" height="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
    <text x="270" y="202" fontSize="9" textAnchor="middle" fill="#0284c7" fontWeight="bold">Tükör (T)</text>

    {/* Observer standing on right at x = 450 */}
    {/* Stick figure: Eye height m_szem = 1.7 m */}
    <circle cx="450" cy="110" r="5" fill="#ea580c" />
    <line x1="450" y1="115" x2="450" y2="155" stroke="#ea580c" strokeWidth="2" />
    <line x1="450" y1="155" x2="442" y2="185" stroke="#ea580c" strokeWidth="1.5" />
    <line x1="450" y1="155" x2="458" y2="185" stroke="#ea580c" strokeWidth="1.5" />
    <text x="475" y="135" fontSize="9" fill="#ea580c" fontWeight="bold">m_szem = 1,7 m</text>

    {/* Light rays reflecting in mirror */}
    <line x1="70" y1="30" x2="270" y2="185" stroke="#eab308" strokeWidth="2" strokeDasharray="3 2" />
    <line x1="270" y1="185" x2="450" y2="110" stroke="#eab308" strokeWidth="2" strokeDasharray="3 2" />

    {/* Angles at mirror */}
    <path d="M 245 185 A 25 25 0 0 1 258 175" fill="none" stroke="#dc2626" strokeWidth="1.5" />
    <text x="245" y="174" fontSize="9" fill="#dc2626" fontWeight="bold">α</text>

    <path d="M 295 185 A 25 25 0 0 0 282 175" fill="none" stroke="#dc2626" strokeWidth="1.5" />
    <text x="290" y="174" fontSize="9" fill="#dc2626" fontWeight="bold">α</text>

    {/* Ground distances */}
    <line x1="70" y1="210" x2="270" y2="210" stroke="#78716c" strokeWidth="1" />
    <text x="170" y="222" fontSize="9" textAnchor="middle" fill="#44403c" fontWeight="bold">D = 20 m (Tükör – Torony)</text>

    <line x1="270" y1="210" x2="450" y2="210" stroke="#78716c" strokeWidth="1" />
    <text x="360" y="222" fontSize="9" textAnchor="middle" fill="#44403c" fontWeight="bold">d = 2 m (Megfigyelő – Tükör)</text>

    {/* Formula badge */}
    <rect x="330" y="45" width="180" height="45" rx="6" fill="#f0fdf4" stroke="#86efac" />
    <text x="420" y="62" fontSize="9.5" textAnchor="middle" fill="#166534" fontWeight="bold">
      M / m_szem = D / d
    </text>
    <text x="420" y="78" fontSize="9" textAnchor="middle" fill="#15803d">
      M = 1,7 · (20 / 2) = 17 méter!
    </text>
  </svg>
);

// Figure 3: Thales's Method for Measuring Ship Distance (Tankönyv 120. oldal)
export const ThalesShipDistanceSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="240" rx="14" fill="#f0fdfa" stroke="#ccfbf1" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f766e">
      Thálész tengerparti hajótávolság-mérési módszere (ΔABH ~ ΔCBD)
    </text>

    {/* Coastline divider */}
    <line x1="30" y1="120" x2="510" y2="120" stroke="#0d9488" strokeWidth="2.5" />
    <text x="460" y="112" fontSize="9" fill="#0f766e" fontWeight="bold">Partvonal</text>
    <text x="460" y="135" fontSize="9" fill="#b45309" fontWeight="bold">Szárazföld</text>

    {/* Sea top, Land bottom */}
    {/* Enemy Ship H at (120, 40) */}
    <g transform="translate(110, 35)">
      <polygon points="0,15 25,15 20,25 5,25" fill="#78350f" />
      <polygon points="12,0 12,15 22,10" fill="#ffffff" stroke="#78350f" strokeWidth="1" />
    </g>
    <text x="120" y="30" fontSize="10" textAnchor="middle" fill="#0369a1" fontWeight="bold">Hajó (H)</text>

    {/* Shore point A at (120, 120) */}
    <circle cx="120" cy="120" r="4" fill="#0f766e" />
    <text x="110" y="135" fontSize="10" fontWeight="bold" fill="#0f766e">A</text>

    {/* Distance t: from A to H */}
    <line x1="120" y1="55" x2="120" y2="120" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
    {/* Magyar derékszögjel A-nál (120, 120) */}
    <path d="M 120 106 A 14 14 0 0 1 134 120" fill="none" stroke="#0f766e" strokeWidth="1.5" />
    <circle cx="125.5" cy="114.5" r="1.6" fill="#0f766e" />
    <text x="105" y="88" fontSize="10" textAnchor="middle" fill="#0284c7" fontWeight="bold">t = ?</text>

    {/* Point B along shore at (260, 120) */}
    <circle cx="260" cy="120" r="4" fill="#ea580c" />
    <text x="260" y="135" fontSize="10" fontWeight="bold" fill="#ea580c">B (Segéd)</text>

    {/* Distance b = AB */}
    <text x="190" y="112" fontSize="9" textAnchor="middle" fill="#0f766e" fontWeight="bold">b = AB</text>

    {/* Point C further along shore at (330, 120) */}
    <circle cx="330" cy="120" r="4" fill="#0f766e" />
    <text x="330" y="135" fontSize="10" fontWeight="bold" fill="#0f766e">C</text>
    <text x="295" y="112" fontSize="9" textAnchor="middle" fill="#0f766e" fontWeight="bold">c = BC</text>

    {/* Inland perpendicular walk to D at (330, 195) */}
    <line x1="330" y1="120" x2="330" y2="195" stroke="#7c3aed" strokeWidth="2" />
    {/* Magyar derékszögjel C-nél (330, 120) */}
    <path d="M 330 134 A 14 14 0 0 1 316 120" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
    <circle cx="324.5" cy="125.5" r="1.6" fill="#7c3aed" />
    <circle cx="330" cy="195" r="4" fill="#7c3aed" />
    <text x="345" y="198" fontSize="10" fontWeight="bold" fill="#7c3aed">D</text>
    <text x="348" y="160" fontSize="9" fill="#7c3aed" fontWeight="bold">d = CD</text>

    {/* Sightline from D through B to Ship H */}
    <line x1="330" y1="195" x2="120" y2="40" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2" />

    {/* Mathematical Formula card */}
    <g transform="translate(40, 155)">
      <rect x="0" y="0" width="230" height="65" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="115" y="18" fontSize="9.5" textAnchor="middle" fill="#0f172a" fontWeight="bold">
        Hasonlóság: ΔABH ~ ΔCBD
      </text>
      <text x="15" y="36" fontSize="9" fill="#334155">Arány: (t + a) / b = d / c</text>
      <text x="15" y="52" fontSize="9.5" fill="#0f766e" fontWeight="bold">
        Hajótávolság: t = (d · b / c) - a
      </text>
    </g>
  </svg>
);

// Figure 4: Margin Counterexample on A4 Sheet (Tankönyv 118. oldal 2. feladat - Érettségi)
export const MarginSimilarityCounterSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="220" rx="14" fill="#fffbeb" stroke="#fef3c7" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#92400e">
      Klasszikus érettségi buktató: A margó levonása NEM megőrzi az oldalarányt!
    </text>

    {/* Outer A4 page: 21 cm x 29.7 cm -> 140px x 198px */}
    <g transform="translate(60, 45)">
      <rect x="0" y="0" width="126" height="150" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
      <text x="63" y="-6" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="bold">A4: 21 cm</text>
      <text x="-18" y="78" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="bold">29,7 cm</text>

      {/* 2.5 cm Margin Band */}
      <rect x="15" y="13" width="96" height="124" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="63" y="70" fontSize="9" textAnchor="middle" fill="#991b1b" fontWeight="bold">Szövegtükör</text>
      <text x="63" y="85" fontSize="8" textAnchor="middle" fill="#b91c1c">16 cm × 24,7 cm</text>
    </g>

    {/* Calculation & Logic Cards on right */}
    <g transform="translate(240, 45)">
      <rect x="0" y="0" width="270" height="150" rx="8" fill="#ffffff" stroke="#fcd34d" strokeWidth="1" />
      <text x="135" y="20" fontSize="10.5" textAnchor="middle" fill="#92400e" fontWeight="bold">
        Zsófi állítása: Hasonló-e a két téglalap?
      </text>

      <line x1="15" y1="28" x2="255" y2="28" stroke="#fef3c7" strokeWidth="1.5" />

      <text x="15" y="46" fontSize="9" fill="#1e293b">• Eredeti A4 arány:</text>
      <text x="130" y="46" fontSize="9" fill="#0284c7" fontWeight="bold">29,7 / 21 = 1,414 (√2)</text>

      <text x="15" y="66" fontSize="9" fill="#1e293b">• Margó utáni arány:</text>
      <text x="130" y="66" fontSize="9" fill="#dc2626" fontWeight="bold">24,7 / 16 = 1,544</text>

      <rect x="15" y="78" width="240" height="34" rx="4" fill="#fee2e2" />
      <text x="135" y="94" fontSize="9.5" textAnchor="middle" fill="#991b1b" fontWeight="bold">
        1,414 ≠ 1,544  ⇒  NEM HASONLÓK!
      </text>
      <text x="135" y="106" fontSize="8.5" textAnchor="middle" fill="#b91c1c">
        Egyenlő szegélylevonás torzítja az oldalarányt!
      </text>

      <text x="15" y="128" fontSize="8.5" fill="#475569" fontWeight="semibold">
        Megfordítás: „Szögeik egyenlők ⇒ hasonlók”
      </text>
      <text x="15" y="140" fontSize="8.5" fill="#b91c1c" fontWeight="bold">
        HAMIS! (Minden téglalap szöge 90°, mégsem hasonlók)
      </text>
    </g>
  </svg>
);

// Figure 5: Biometric Scaling (Ki a legerősebb? Hangya vs. Ember, Tankönyv 121. oldal)
export const BiometricScalingSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="220" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Biometrikus skálázódás: Izomerő (~ λ²) vs. Testtömeg (~ λ³)
    </text>

    {/* Ant column */}
    <g transform="translate(50, 48)">
      <rect x="0" y="0" width="190" height="145" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="95" y="20" fontSize="10.5" textAnchor="middle" fill="#0f172a" fontWeight="bold">
        Hangya (h ≈ 1,5 cm)
      </text>
      <text x="15" y="42" fontSize="9" fill="#334155">• Magasság: 1/120 emberi méret</text>
      <text x="15" y="58" fontSize="9" fill="#334155">• Tömeg: 1/120³ ≈ 1/1 728 000</text>
      <text x="15" y="74" fontSize="9" fill="#334155">• Izomkeresztmetszet: 1/120²</text>
      <rect x="10" y="88" width="170" height="45" rx="5" fill="#fef2f2" stroke="#fecaca" />
      <text x="95" y="104" fontSize="9.5" textAnchor="middle" fill="#991b1b" fontWeight="bold">
        Relatív teherbírás: ~ 1 / λ
      </text>
      <text x="95" y="122" fontSize="9" textAnchor="middle" fill="#b91c1c">
        Saját tömegének 40–50-szerese!
      </text>
    </g>

    {/* Human shrunk column */}
    <g transform="translate(290, 48)">
      <rect x="0" y="0" width="200" height="145" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="100" y="20" fontSize="10.5" textAnchor="middle" fill="#1e40af" fontWeight="bold">
        Ember hangyaméretre kicsinyítve
      </text>
      <text x="15" y="42" fontSize="9" fill="#334155">• Kicsinyítési arány: λ = 1/120</text>
      <text x="15" y="58" fontSize="9" fill="#334155">• Tömeg: a 1 728 000-ed részére esik</text>
      <text x="15" y="74" fontSize="9" fill="#334155">• Erő: a 14 400-ad részére esik</text>
      <rect x="10" y="88" width="180" height="45" rx="5" fill="#eff6ff" stroke="#bfdbfe" />
      <text x="100" y="104" fontSize="9.5" textAnchor="middle" fill="#1e40af" fontWeight="bold">
        Relatív erő 120-szorosára nő!
      </text>
      <text x="100" y="122" fontSize="9" textAnchor="middle" fill="#2563eb">
        Elbírná saját tömegének 120-szorosát!
      </text>
    </g>
  </svg>
);

