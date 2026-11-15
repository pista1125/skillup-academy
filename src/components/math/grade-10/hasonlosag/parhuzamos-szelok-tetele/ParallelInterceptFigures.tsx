import React from 'react';

// Figure 1: Párhuzamos szelők tétele (Szögszárak metszése)
export const ParallelInterceptTheoremSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="240" rx="14" fill="#f0fdfa" stroke="#ccfbf1" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f766e">
      Párhuzamos szelők tétele: Szárakon kimetszett szakaszok aránya
    </text>

    {/* Angle Apex O */}
    <circle cx="45" cy="180" r="4" fill="#0f766e" />
    <text x="35" y="195" fontSize="11" fontWeight="bold" fill="#0f766e">O</text>

    {/* Angle Rays e and f */}
    <line x1="45" y1="180" x2="500" y2="60" stroke="#0f766e" strokeWidth="2" />
    <text x="505" y="65" fontSize="10" fill="#0f766e" fontWeight="bold">e</text>

    <line x1="45" y1="180" x2="500" y2="210" stroke="#0f766e" strokeWidth="2" />
    <text x="505" y="215" fontSize="10" fill="#0f766e" fontWeight="bold">f</text>

    {/* Parallel lines p1, p2, p3 */}
    {/* Line 1 */}
    <line x1="160" y1="40" x2="195" y2="240" stroke="#0284c7" strokeWidth="2" />
    <text x="150" y="35" fontSize="10" fill="#0284c7" fontWeight="bold">p₁</text>

    {/* Line 2 */}
    <line x1="280" y1="40" x2="315" y2="240" stroke="#0284c7" strokeWidth="2" />
    <text x="270" y="35" fontSize="10" fill="#0284c7" fontWeight="bold">p₂</text>

    {/* Line 3 */}
    <line x1="400" y1="40" x2="435" y2="240" stroke="#0284c7" strokeWidth="2" />
    <text x="390" y="35" fontSize="10" fill="#0284c7" fontWeight="bold">p₃</text>

    {/* Intersection points on upper ray e */}
    <circle cx="177" cy="145" r="3.5" fill="#dc2626" />
    <text x="175" y="135" fontSize="10" fontWeight="bold" fill="#dc2626">A₁</text>

    <circle cx="297" cy="113" r="3.5" fill="#dc2626" />
    <text x="295" y="103" fontSize="10" fontWeight="bold" fill="#dc2626">A₂</text>

    <circle cx="417" cy="82" r="3.5" fill="#dc2626" />
    <text x="415" y="72" fontSize="10" fontWeight="bold" fill="#dc2626">A₃</text>

    {/* Intersection points on lower ray f */}
    <circle cx="186" cy="189" r="3.5" fill="#2563eb" />
    <text x="188" y="208" fontSize="10" fontWeight="bold" fill="#2563eb">B₁</text>

    <circle cx="306" cy="197" r="3.5" fill="#2563eb" />
    <text x="308" y="216" fontSize="10" fontWeight="bold" fill="#2563eb">B₂</text>

    <circle cx="426" cy="205" r="3.5" fill="#2563eb" />
    <text x="428" y="224" fontSize="10" fontWeight="bold" fill="#2563eb">B₃</text>

    {/* Formula Card */}
    <g transform="translate(45, 45)">
      <rect x="0" y="0" width="230" height="60" rx="6" fill="#ffffff" stroke="#99f6e4" />
      <text x="115" y="18" fontSize="9.5" textAnchor="middle" fill="#0f766e" fontWeight="bold">
        Párhuzamos szelők aránypárjai:
      </text>
      <text x="15" y="36" fontSize="9" fill="#134e4a">
        A₁A₂ / A₂A₃ = B₁B₂ / B₂B₃
      </text>
      <text x="15" y="50" fontSize="9" fill="#0284c7" fontWeight="bold">
        Csúcstól mérve: OA₁ / OA₂ = OB₁ / OB₂
      </text>
    </g>
  </svg>
);

// Figure 2: Párhuzamos szelőszakaszok tétele (Különbség a szárak és a szelők között!)
export const ParallelChordsTheoremSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Párhuzamos szelőszakaszok tétele vs. Szárszakaszok csapdája
    </text>

    {/* Apex O */}
    <circle cx="60" cy="130" r="4" fill="#0f172a" />
    <text x="45" y="135" fontSize="11" fontWeight="bold" fill="#0f172a">O</text>

    {/* Ray 1 (up) and Ray 2 (down) */}
    <line x1="60" y1="130" x2="350" y2="40" stroke="#475569" strokeWidth="2" />
    <line x1="60" y1="130" x2="350" y2="210" stroke="#475569" strokeWidth="2" />

    {/* Chord 1: A1 B1 at x = 160 */}
    <line x1="160" y1="99" x2="160" y2="157" stroke="#dc2626" strokeWidth="2.5" />
    <circle cx="160" cy="99" r="3" fill="#dc2626" />
    <circle cx="160" cy="157" r="3" fill="#dc2626" />
    <text x="150" y="95" fontSize="10" fontWeight="bold" fill="#dc2626">A₁</text>
    <text x="150" y="172" fontSize="10" fontWeight="bold" fill="#dc2626">B₁</text>
    <text x="168" y="132" fontSize="9" fill="#dc2626" fontWeight="bold">c₁</text>

    {/* Chord 2: A2 B2 at x = 280 */}
    <line x1="280" y1="62" x2="280" y2="191" stroke="#2563eb" strokeWidth="2.5" />
    <circle cx="280" cy="62" r="3" fill="#2563eb" />
    <circle cx="280" cy="191" r="3" fill="#2563eb" />
    <text x="285" y="60" fontSize="10" fontWeight="bold" fill="#2563eb">A₂</text>
    <text x="285" y="205" fontSize="10" fontWeight="bold" fill="#2563eb">B₂</text>
    <text x="288" y="132" fontSize="9" fill="#2563eb" fontWeight="bold">c₂</text>

    {/* Distances from apex labels */}
    <text x="105" y="105" fontSize="9" fill="#475569">OA₁</text>
    <text x="215" y="75" fontSize="9" fill="#475569">A₁A₂</text>

    {/* Rule card on right */}
    <g transform="translate(340, 45)">
      <rect x="0" y="0" width="180" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="90" y="22" fontSize="10" textAnchor="middle" fill="#0f172a" fontWeight="bold">
        Szelőszakasz Szabály
      </text>
      <line x1="10" y1="30" x2="170" y2="30" stroke="#f1f5f9" strokeWidth="1.5" />

      <text x="15" y="48" fontSize="9" fill="#15803d" fontWeight="bold">✓ HELYES ÖSSZEFÜGGÉS:</text>
      <text x="15" y="64" fontSize="9" fill="#166534">c₁ / c₂ = OA₁ / OA₂</text>
      <text x="15" y="78" fontSize="8.5" fill="#15803d">(Csak a csúcstól mért teljes szakaszokkal arányos!)</text>

      <line x1="10" y1="92" x2="170" y2="92" stroke="#fee2e2" strokeWidth="1" />

      <text x="15" y="108" fontSize="9" fill="#b91c1c" fontWeight="bold">✗ TÉVHIT / BUKTATÓ:</text>
      <text x="15" y="124" fontSize="9" fill="#dc2626">c₁ / c₂ ≠ A₁A₂ / B₁B₂</text>
      <text x="15" y="138" fontSize="8.5" fill="#991b1b">A párhuzamosok nem a trapéz szárdarabjaival arányosak!</text>
    </g>
  </svg>
);

// Figure 3: Segment Partition by Construction (3 : 4 : 2, Lakás felosztás)
export const SegmentPartitionSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 250" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="240" rx="14" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1c1917">
      Szakasz felosztása 3 : 4 : 2 arányban párhuzamos szelőkkel
    </text>

    {/* Given segment AB on bottom: 360 px total (x=80 to x=440) */}
    <line x1="80" y1="180" x2="440" y2="180" stroke="#1c1917" strokeWidth="3" />
    <circle cx="80" cy="180" r="4" fill="#1c1917" />
    <circle cx="440" cy="180" r="4" fill="#1c1917" />
    <text x="68" y="185" fontSize="12" fontWeight="bold" fill="#1c1917">A</text>
    <text x="448" y="185" fontSize="12" fontWeight="bold" fill="#1c1917">B</text>

    {/* Auxiliary ray from A at angle -35 deg */}
    <line x1="80" y1="180" x2="380" y2="55" stroke="#0284c7" strokeWidth="1.8" />

    {/* 9 equal steps on ray: dx = 33.3px, dy = -13.88px */}
    {/* 3 units -> Q at index 3 (x=180, y=138.3) */}
    {/* 7 units -> R at index 7 (x=313.3, y=82.8) */}
    {/* 9 units -> P at index 9 (x=380, y=55) */}

    {/* Connect P to B */}
    <line x1="380" y1="55" x2="440" y2="180" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 2" />
    <circle cx="380" cy="55" r="3.5" fill="#7c3aed" />
    <text x="375" y="45" fontSize="10" fontWeight="bold" fill="#7c3aed">P (9. egység)</text>

    {/* Parallel from R (index 7) to K2 (M) */}
    <line x1="313" y1="83" x2="360" y2="180" stroke="#0d9488" strokeWidth="2" strokeDasharray="3 2" />
    <circle cx="313" cy="83" r="3" fill="#0d9488" />
    <text x="300" y="75" fontSize="9" fontWeight="bold" fill="#0d9488">R (7.)</text>

    {/* Parallel from Q (index 3) to K1 (K) */}
    <line x1="180" y1="138" x2="200" y2="180" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />
    <circle cx="180" cy="138" r="3" fill="#ea580c" />
    <text x="170" y="132" fontSize="9" fontWeight="bold" fill="#ea580c">Q (3.)</text>

    {/* Resulting division points on AB: K at x=200, M at x=360 */}
    <circle cx="200" cy="180" r="4" fill="#ea580c" />
    <text x="195" y="200" fontSize="11" fontWeight="bold" fill="#ea580c">K</text>

    <circle cx="360" cy="180" r="4" fill="#0d9488" />
    <text x="355" y="200" fontSize="11" fontWeight="bold" fill="#0d9488">M</text>

    {/* Segment labels */}
    <text x="140" y="172" fontSize="10" textAnchor="middle" fill="#ea580c" fontWeight="bold">3 egység (18 m²)</text>
    <text x="280" y="172" fontSize="10" textAnchor="middle" fill="#0284c7" fontWeight="bold">4 egység (24 m²)</text>
    <text x="400" y="172" fontSize="10" textAnchor="middle" fill="#0d9488" fontWeight="bold">2 egység (12 m²)</text>

    {/* Summary footer */}
    <text x="270" y="228" fontSize="9.5" textAnchor="middle" fill="#44403c">
      Arány: AK : KM : MB = 3 : 4 : 2 | Összesen 9 egység felmérése a segédfélegyenesre.
    </text>
  </svg>
);

// Figure 4: Rectangle Divided into 4 Sub-rectangles by 2:5 in Both Axes
export const RectangleFourPartsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="220" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Téglalap kettős 2 : 5 arányú felosztása: 539 m² telek 4 része
    </text>

    {/* Rectangle divided into 4 parts: width 280px (2/7 -> 80px, 5/7 -> 200px), height 140px (2/7 -> 40px, 5/7 -> 100px) */}
    <g transform="translate(50, 48)">
      {/* Part 1: Top-Left (2/7 x 2/7 = 4/49 -> 44 m²) */}
      <rect x="0" y="0" width="80" height="40" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="40" y="25" fontSize="10" textAnchor="middle" fill="#991b1b" fontWeight="bold">44 m²</text>
      <text x="40" y="36" fontSize="8" textAnchor="middle" fill="#b91c1c">(4/49)</text>

      {/* Part 2: Top-Right (5/7 x 2/7 = 10/49 -> 110 m²) */}
      <rect x="80" y="0" width="180" height="40" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="170" y="25" fontSize="10" textAnchor="middle" fill="#92400e" fontWeight="bold">110 m²</text>
      <text x="170" y="36" fontSize="8" textAnchor="middle" fill="#b45309">(10/49)</text>

      {/* Part 3: Bottom-Left (2/7 x 5/7 = 10/49 -> 110 m²) */}
      <rect x="0" y="40" width="80" height="100" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="40" y="95" fontSize="10" textAnchor="middle" fill="#92400e" fontWeight="bold">110 m²</text>
      <text x="40" y="107" fontSize="8" textAnchor="middle" fill="#b45309">(10/49)</text>

      {/* Part 4: Bottom-Right (5/7 x 5/7 = 25/49 -> 275 m²) */}
      <rect x="80" y="40" width="180" height="100" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
      <text x="170" y="95" fontSize="11" textAnchor="middle" fill="#14532d" fontWeight="bold">275 m²</text>
      <text x="170" y="108" fontSize="8.5" textAnchor="middle" fill="#15803d">(25/49)</text>

      {/* Side ratios */}
      <text x="40" y="-8" fontSize="9" textAnchor="middle" fill="#dc2626" fontWeight="bold">2 egység</text>
      <text x="170" y="-8" fontSize="9" textAnchor="middle" fill="#16a34a" fontWeight="bold">5 egység</text>
      <text x="-12" y="25" fontSize="9" textAnchor="middle" fill="#dc2626" fontWeight="bold">2</text>
      <text x="-12" y="95" fontSize="9" textAnchor="middle" fill="#16a34a" fontWeight="bold">5</text>
    </g>

    {/* Calculation Card on right */}
    <g transform="translate(330, 48)">
      <rect x="0" y="0" width="180" height="140" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="90" y="20" fontSize="10" textAnchor="middle" fill="#0f172a" fontWeight="bold">
        Összesen: 539 m²
      </text>
      <line x1="10" y1="28" x2="170" y2="28" stroke="#f1f5f9" strokeWidth="1.5" />
      <text x="15" y="44" fontSize="8.5" fill="#334155">• Egység (1/49 rész):</text>
      <text x="25" y="58" fontSize="9" fill="#0284c7" fontWeight="bold">539 / 49 = 11 m²</text>
      <text x="15" y="74" fontSize="8.5" fill="#334155">• 1. rész: 4 · 11 = <strong>44 m²</strong></text>
      <text x="15" y="90" fontSize="8.5" fill="#334155">• 2. rész: 10 · 11 = <strong>110 m²</strong></text>
      <text x="15" y="106" fontSize="8.5" fill="#334155">• 3. rész: 10 · 11 = <strong>110 m²</strong></text>
      <text x="15" y="122" fontSize="8.5" fill="#334155">• 4. rész: 25 · 11 = <strong>275 m²</strong></text>
      <text x="90" y="136" fontSize="8" textAnchor="middle" fill="#15803d">44 + 110 + 110 + 275 = 539 m²</text>
    </g>
  </svg>
);

// Figure 5: Fourth Proportional Construction (a : b = c : x)
export const FourthProportionalSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="210" rx="14" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#581c87">
      Negyedik arányos szerkesztése: a : b = c : x
    </text>

    {/* Apex O */}
    <circle cx="80" cy="160" r="4" fill="#581c87" />
    <text x="65" y="165" fontSize="11" fontWeight="bold" fill="#581c87">O</text>

    {/* Ray 1 */}
    <line x1="80" y1="160" x2="440" y2="60" stroke="#7e22ce" strokeWidth="2" />
    {/* Ray 2 */}
    <line x1="80" y1="160" x2="440" y2="190" stroke="#7e22ce" strokeWidth="2" />

    {/* Points on Ray 1: a (from O to A) and b (from A to B) */}
    <circle cx="180" cy="132" r="3.5" fill="#2563eb" />
    <text x="175" y="122" fontSize="10" fontWeight="bold" fill="#2563eb">A</text>
    <text x="130" y="140" fontSize="9" fill="#2563eb" fontWeight="bold">a</text>

    <circle cx="320" cy="93" r="3.5" fill="#2563eb" />
    <text x="315" y="83" fontSize="10" fontWeight="bold" fill="#2563eb">B</text>
    <text x="250" y="105" fontSize="9" fill="#2563eb" fontWeight="bold">b</text>

    {/* Point C on Ray 2: c (from O to C) */}
    <circle cx="180" cy="168" r="3.5" fill="#dc2626" />
    <text x="180" y="185" fontSize="10" fontWeight="bold" fill="#dc2626">C</text>
    <text x="130" y="172" fontSize="9" fill="#dc2626" fontWeight="bold">c</text>

    {/* Connect A to C */}
    <line x1="180" y1="132" x2="180" y2="168" stroke="#0f172a" strokeWidth="1.5" />

    {/* Parallel through B to find X on Ray 2 */}
    <line x1="320" y1="93" x2="320" y2="180" stroke="#16a34a" strokeWidth="2" strokeDasharray="3 2" />
    <circle cx="320" cy="180" r="3.5" fill="#16a34a" />
    <text x="320" y="198" fontSize="11" fontWeight="bold" fill="#16a34a">X</text>
    <text x="250" y="182" fontSize="9" fill="#16a34a" fontWeight="bold">x = ?</text>

    {/* Formula card on right */}
    <g transform="translate(360, 48)">
      <rect x="0" y="0" width="150" height="85" rx="6" fill="#ffffff" stroke="#c084fc" />
      <text x="75" y="18" fontSize="9.5" textAnchor="middle" fill="#581c87" fontWeight="bold">
        Képlet:
      </text>
      <text x="15" y="38" fontSize="9" fill="#334155">a : b = c : x</text>
      <text x="15" y="56" fontSize="9" fill="#334155">a · x = b · c</text>
      <text x="15" y="74" fontSize="10" fill="#16a34a" fontWeight="bold">x = (b · c) / a</text>
    </g>
  </svg>
);

