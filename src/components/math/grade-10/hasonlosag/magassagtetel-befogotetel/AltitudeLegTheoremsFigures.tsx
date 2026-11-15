import React from 'react';

// Figure 1: Magasságtétel és Befogótétel alapkészlet
export const AltitudeAndLegTheoremsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="250" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

    <text x="270" y="25" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Derékszögű háromszög metrikus tételei
    </text>

    {/* Triangle:
        C at (190, 60) with right angle
        A at (60, 200)
        B at (380, 200)
        Hypotenuse c = AB on y = 200 (x: 60 to 380, dx = 320)
        Altitude m from C to AB: vertical down to C1 at (190, 200)
        q = AC1 = 190 - 60 = 130
        p = C1B = 380 - 190 = 190
        m = 200 - 60 = 140
        Check: m^2 = 140^2 = 19600. p * q = 190 * 130 = 24700. Almost right triangle!
        Let's make it exact right triangle:
        Let q = 100, p = 225 => m = sqrt(100*225) = sqrt(22500) = 150.
        A = (60, 210), C1 = (160, 210), B = (385, 210)
        C = (160, 210 - 150) = (160, 60)
    */}
    <polygon points="60,210 385,210 160,60" fill="#f1f5f9" stroke="#1e293b" strokeWidth="2.5" />

    {/* Right angle marker at C (magyar jelölés: negyedkörív + pont) */}
    <path d="M 147.8,78.3 A 22,22 0 0,0 178.3,72.2" fill="none" stroke="#0f172a" strokeWidth="1.6" />
    <circle cx="164" cy="71" r="1.7" fill="#0f172a" />
    <text x="155" y="50" fontSize="11" fontWeight="bold" fill="#0f172a">C (90°)</text>

    {/* Altitude CC1 */}
    <line x1="160" y1="60" x2="160" y2="210" stroke="#dc2626" strokeWidth="2.5" />
    <circle cx="160" cy="210" r="3.5" fill="#dc2626" />
    <text x="160" y="224" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#dc2626">C₁</text>
    <text x="172" y="140" fontSize="10" fontWeight="bold" fill="#dc2626">m</text>

    {/* Right angle marker at C1 (magyar jelölés: negyedkörív + pont) */}
    <path d="M 160,196 A 14,14 0 0,1 174,210" fill="none" stroke="#dc2626" strokeWidth="1.5" />
    <circle cx="165.5" cy="204.5" r="1.6" fill="#dc2626" />

    {/* Segments q and p on hypotenuse */}
    <line x1="60" y1="235" x2="160" y2="235" stroke="#0284c7" strokeWidth="2" />
    <text x="110" y="248" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0284c7">q (b vetülete)</text>

    <line x1="160" y1="235" x2="385" y2="235" stroke="#16a34a" strokeWidth="2" />
    <text x="272" y="248" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#16a34a">p (a vetülete)</text>

    {/* Vertices */}
    <text x="45" y="215" fontSize="11" fontWeight="bold" fill="#1e293b">A</text>
    <text x="395" y="215" fontSize="11" fontWeight="bold" fill="#1e293b">B</text>

    {/* Legs a and b */}
    <text x="95" y="130" fontSize="10.5" fontWeight="bold" fill="#0284c7">b befogó</text>
    <text x="280" y="130" fontSize="10.5" fontWeight="bold" fill="#16a34a">a befogó</text>

    {/* Formula Cards on Right */}
    <g transform="translate(390, 45)">
      <rect x="0" y="0" width="140" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" />
      <text x="70" y="18" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#0f172a">
        Képletek:
      </text>

      <rect x="8" y="28" width="124" height="32" rx="4" fill="#fef2f2" stroke="#fca5a5" />
      <text x="14" y="42" fontSize="8" fill="#991b1b" fontWeight="bold">Magasságtétel:</text>
      <text x="14" y="54" fontSize="9.5" fill="#dc2626" fontWeight="bold">m = √(p · q)</text>

      <rect x="8" y="66" width="124" height="42" rx="4" fill="#f0fdf4" stroke="#86efac" />
      <text x="14" y="78" fontSize="8" fill="#166534" fontWeight="bold">Befogótétel:</text>
      <text x="14" y="90" fontSize="9" fill="#15803d" fontWeight="bold">a = √(p · c)</text>
      <text x="14" y="102" fontSize="9" fill="#0284c7" fontWeight="bold">b = √(q · c)</text>

      <text x="70" y="125" fontSize="8" textAnchor="middle" fill="#475569">Átfogó: c = p + q</text>
      <text x="70" y="138" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="bold">a² + b² = c² (Pitagorasz)</text>
    </g>
  </svg>
);

// Figure 2: A 3 hasonló derékszögű háromszög szétbontása (Hasonlósági bizonyítás)
export const ThreeSimilarTrianglesSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="220" rx="14" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />

    <text x="270" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#166534">
      A 3 hasonló derékszögű háromszög (ΔABC ~ ΔC₁BC ~ ΔAC₁C)
    </text>

    {/* 1. Large: ABC */}
    <g transform="translate(30, 45)">
      <polygon points="0,110 150,110 54,38" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <path d="M 45,50 A 15,15 0 0,0 66,47" fill="none" stroke="#0284c7" strokeWidth="1.5" />
      <circle cx="55.1" cy="45.9" r="1.6" fill="#0284c7" />
      <text x="75" y="135" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#0369a1">
        Nagy Δ (ABC)
      </text>
      <text x="18" y="70" fontSize="8" fill="#0284c7">b</text>
      <text x="108" y="70" fontSize="8" fill="#0284c7">a</text>
      <text x="75" y="105" fontSize="8" textAnchor="middle" fill="#0284c7">c</text>
    </g>

    {/* Sign: ~ */}
    <text x="205" y="115" fontSize="18" fontWeight="bold" fill="#15803d">~</text>

    {/* 2. Medium: C1BC (right piece) */}
    <g transform="translate(230, 60)">
      <polygon points="0,95 110,95 0,20" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <path d="M 0,81 A 14,14 0 0,1 14,95" fill="none" stroke="#16a34a" strokeWidth="1.5" />
      <circle cx="5.5" cy="89.5" r="1.6" fill="#16a34a" />
      <text x="55" y="120" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#15803d">
        Jobb oldali Δ (C₁BC)
      </text>
      <text x="-12" y="60" fontSize="8" fill="#dc2626" fontWeight="bold">m</text>
      <text x="55" y="90" fontSize="8" fill="#16a34a">p</text>
      <text x="65" y="50" fontSize="8" fill="#16a34a">a</text>
    </g>

    {/* Sign: ~ */}
    <text x="365" y="115" fontSize="18" fontWeight="bold" fill="#15803d">~</text>

    {/* 3. Small: AC1C (left piece) */}
    <g transform="translate(390, 75)">
      <polygon points="0,80 75,80 0,25" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
      <path d="M 0,66 A 14,14 0 0,1 14,80" fill="none" stroke="#d97706" strokeWidth="1.5" />
      <circle cx="5.5" cy="74.5" r="1.6" fill="#d97706" />
      <text x="37" y="105" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#b45309">
        Bal oldali Δ (AC₁C)
      </text>
      <text x="-12" y="55" fontSize="8" fill="#0284c7">q</text>
      <text x="37" y="75" fontSize="8" fill="#dc2626" fontWeight="bold">m</text>
      <text x="45" y="45" fontSize="8" fill="#0284c7">b</text>
    </g>

    {/* Footer summary */}
    <text x="270" y="200" fontSize="9.5" textAnchor="middle" fill="#334155">
      Mivel a két kis háromszög hasonló (m/p = q/m)  ⇒  <strong>m² = p · q</strong> (Magasságtétel).
    </text>
    <text x="270" y="214" fontSize="9.5" textAnchor="middle" fill="#334155">
      A kis és nagy háromszög hasonlóságából (a/c = p/a)  ⇒  <strong>a² = p · c</strong> (Befogótétel).
    </text>
  </svg>
);

// Figure 3: Pitagorasz-tétel levezetése a befogótételből
export const PythagorasFromLegsSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="210" rx="14" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />

    <text x="270" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">
      A Pitagorasz-tétel levezetése a befogótételből
    </text>

    {/* Two rectangles representing a^2 = pc and b^2 = qc */}
    <g transform="translate(50, 50)">
      {/* Box 1: a^2 = p * c */}
      <rect x="0" y="0" width="130" height="90" rx="6" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
      <text x="65" y="40" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#15803d">a² = p · c</text>
      <text x="65" y="60" fontSize="9" textAnchor="middle" fill="#166534">1. befogó négyzete</text>
    </g>

    <text x="205" y="100" fontSize="22" fontWeight="bold" fill="#1e3a8a">+</text>

    <g transform="translate(235, 50)">
      {/* Box 2: b^2 = q * c */}
      <rect x="0" y="0" width="110" height="90" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
      <text x="55" y="40" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#0369a1">b² = q · c</text>
      <text x="55" y="60" fontSize="9" textAnchor="middle" fill="#0284c7">2. befogó négyzete</text>
    </g>

    <text x="370" y="100" fontSize="22" fontWeight="bold" fill="#1e3a8a">=</text>

    <g transform="translate(400, 50)">
      {/* Box 3: c * (p + q) = c^2 */}
      <rect x="0" y="0" width="90" height="90" rx="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
      <text x="45" y="40" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#854d0e">c²</text>
      <text x="45" y="58" fontSize="8.5" textAnchor="middle" fill="#ca8a04">c · (p + q)</text>
      <text x="45" y="74" fontSize="8" textAnchor="middle" fill="#854d0e">= c · c</text>
    </g>

    {/* Bottom summary text */}
    <rect x="50" y="160" width="440" height="38" rx="8" fill="#ffffff" stroke="#93c5fd" />
    <text x="270" y="184" fontSize="10.5" textAnchor="middle" fontWeight="bold" fill="#1e40af">
      a² + b² = p · c + q · c = (p + q) · c = c · c = c²  (Kész a bizonyítás!)
    </text>
  </svg>
);

// Figure 4: Sziklamagasság mérése
export const CliffMeasurementSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="230" rx="14" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />

    <text x="270" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#581c87">
      Sziklamagasság kiszámítása magasságtétellel
    </text>

    {/* Cliff profile */}
    <path d="M 190,50 L 190,190" stroke="#dc2626" strokeWidth="3" strokeDasharray="5,4" />
    <circle cx="190" cy="50" r="4.5" fill="#dc2626" />
    <text x="180" y="45" fontSize="11" fontWeight="bold" fill="#dc2626">C (csúcs)</text>

    {/* Cliff rocky silhouette */}
    <path d="M 190,50 Q 220,110 200,190 L 170,190 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" opacity="0.6" />

    {/* Ground line AB */}
    <line x1="50" y1="190" x2="400" y2="190" stroke="#334155" strokeWidth="2.5" />
    <circle cx="90" cy="190" r="4" fill="#1e293b" />
    <text x="85" y="208" fontSize="11" fontWeight="bold" fill="#1e293b">A</text>

    <circle cx="190" cy="190" r="4" fill="#dc2626" />
    <text x="190" y="208" fontSize="11" fontWeight="bold" fill="#dc2626">C₁</text>

    <circle cx="360" cy="190" r="4" fill="#1e293b" />
    <text x="365" y="208" fontSize="11" fontWeight="bold" fill="#1e293b">B</text>

    {/* Sight lines AC and BC forming 90 degrees */}
    <line x1="90" y1="190" x2="190" y2="50" stroke="#0284c7" strokeWidth="2" />
    <line x1="360" y1="190" x2="190" y2="50" stroke="#16a34a" strokeWidth="2" />

    {/* Right angle at C and C1 (magyar jelölés: negyedkörív + pont) */}
    <path d="M 178.4,66.3 A 20,20 0 0,0 205.4,62.7" fill="none" stroke="#581c87" strokeWidth="1.6" />
    <circle cx="194" cy="60.5" r="1.7" fill="#581c87" />
    <path d="M 190,176 A 14,14 0 0,1 204,190" fill="none" stroke="#dc2626" strokeWidth="1.5" />
    <circle cx="195.5" cy="184.5" r="1.6" fill="#dc2626" />

    {/* Segments: AC1 = 15 m, C1B = 42 m */}
    <text x="140" y="180" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#0284c7">q = 15 m</text>
    <text x="275" y="180" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#16a34a">p = 42 m</text>
    <text x="175" y="125" fontSize="10.5" fontWeight="bold" fill="#dc2626">m = ?</text>

    {/* Card with step by step */}
    <g transform="translate(370, 45)">
      <rect x="0" y="0" width="155" height="150" rx="8" fill="#ffffff" stroke="#d8b4fe" />
      <text x="77" y="18" fontSize="9.5" textAnchor="middle" fontWeight="bold" fill="#6b21a8">
        Szikla Magassága:
      </text>
      <text x="10" y="38" fontSize="8.5" fill="#334155">• q = 15 m (AC₁)</text>
      <text x="10" y="54" fontSize="8.5" fill="#334155">• p = 42 m (C₁B)</text>
      <text x="10" y="72" fontSize="9" fill="#dc2626" fontWeight="bold">• m² = p · q</text>
      <text x="10" y="90" fontSize="8.5" fill="#334155">• m² = 42 · 15 = 630</text>
      <text x="10" y="112" fontSize="11" fill="#15803d" fontWeight="bold">• m = √630 ≈ 25,1 m!</text>
      <text x="10" y="132" fontSize="8" fill="#475569">Kielégítő földi becslés</text>
    </g>
  </svg>
);

// Figure 5: Számtani és mértani közép egyenlőtlensége geometriai úton
export const ArithmeticGeometricInequalitySvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="230" rx="14" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />

    <text x="270" y="24" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#92400e">
      Számtani és mértani közép geometriai bizonyítása
    </text>

    {/* Thales Semicircle:
        Center O at (240, 190), Radius R = 150.
        Hypotenuse AB: A = (90, 190), B = (390, 190)
    */}
    <path d="M 90,190 A 150,150 0 0,1 390,190" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
    <line x1="70" y1="190" x2="410" y2="190" stroke="#334155" strokeWidth="2" />

    {/* Center O */}
    <circle cx="240" cy="190" r="3.5" fill="#b45309" />
    <text x="240" y="206" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#b45309">O (középpont)</text>

    {/* Radius r = (p+q)/2 straight up */}
    <line x1="240" y1="190" x2="240" y2="40" stroke="#b45309" strokeWidth="2" strokeDasharray="3,3" />
    <circle cx="240" cy="40" r="4" fill="#b45309" />
    <text x="250" y="55" fontSize="9.5" fontWeight="bold" fill="#b45309">r = (p + q) / 2</text>

    {/* Point C1 on AB at x = 160 (p = 230, q = 70):
        m = sqrt(p * q). Height on circle: at x = 160, dx from center = 240 - 160 = 80.
        y_circle = 190 - sqrt(150^2 - 80^2) = 190 - sqrt(22500 - 6400) = 190 - sqrt(16100) = 190 - 126.88 = 63.
    */}
    <line x1="160" y1="190" x2="160" y2="63" stroke="#dc2626" strokeWidth="2.5" />
    <circle cx="160" cy="63" r="4" fill="#dc2626" />
    <text x="160" y="52" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#dc2626">C</text>
    <text x="145" y="125" fontSize="10" fontWeight="bold" fill="#dc2626">m = √(p·q)</text>

    {/* Triangle ABC */}
    <line x1="90" y1="190" x2="160" y2="63" stroke="#0284c7" strokeWidth="1.5" />
    <line x1="390" y1="190" x2="160" y2="63" stroke="#0284c7" strokeWidth="1.5" />

    {/* Magyar derékszögjel C-nél és a talppontnál */}
    <path d="M 151.3,78.8 A 18,18 0 0,0 175.8,71.7" fill="none" stroke="#0284c7" strokeWidth="1.5" />
    <circle cx="164" cy="72" r="1.6" fill="#0284c7" />
    <path d="M 160,176 A 14,14 0 0,1 174,190" fill="none" stroke="#dc2626" strokeWidth="1.5" />
    <circle cx="165.5" cy="184.5" r="1.6" fill="#dc2626" />

    {/* Segment labels */}
    <text x="125" y="204" fontSize="9.5" fontWeight="bold" fill="#0284c7">q</text>
    <text x="280" y="204" fontSize="9.5" fontWeight="bold" fill="#16a34a">p</text>

    {/* Card */}
    <g transform="translate(395, 45)">
      <rect x="0" y="0" width="135" height="145" rx="8" fill="#ffffff" stroke="#fcd34d" />
      <text x="67" y="18" fontSize="9" textAnchor="middle" fontWeight="bold" fill="#92400e">
        Tétel Geometriailag:
      </text>
      <text x="10" y="38" fontSize="8" fill="#334155">• Sugár: (p + q) / 2</text>
      <text x="10" y="54" fontSize="8" fill="#334155">  (számtani közép)</text>
      <text x="10" y="74" fontSize="8" fill="#334155">• Magasság: √(p · q)</text>
      <text x="10" y="90" fontSize="8" fill="#334155">  (mértani közép)</text>
      <text x="10" y="112" fontSize="9.5" fill="#dc2626" fontWeight="bold">m ≤ r</text>
      <text x="10" y="128" fontSize="8.5" fill="#15803d" fontWeight="bold">√(pq) ≤ (p + q)/2</text>
      <text x="10" y="140" fontSize="7.5" fill="#475569">Egyenlő, ha p = q!</text>
    </g>
  </svg>
);

