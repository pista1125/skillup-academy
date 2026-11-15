import React from 'react';

// Figure 1: Similarity as composition of central dilation and isometry
export const SimilarityCompositionSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 280" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="sim-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#4f46e5" />
      </marker>
      <marker id="sim-arrow-teal" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#0d9488" />
      </marker>
    </defs>

    {/* Background card */}
    <rect x="5" y="5" width="530" height="270" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

    {/* Stage 1: Original Triangle ABC */}
    <polygon points="40,210 110,210 80,140" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
    <text x="32" y="225" fontSize="11" fontWeight="bold" fill="#312e81">A</text>
    <text x="114" y="225" fontSize="11" fontWeight="bold" fill="#312e81">B</text>
    <text x="76" y="132" fontSize="11" fontWeight="bold" fill="#312e81">C</text>
    <text x="75" y="235" fontSize="10" textAnchor="middle" fill="#6366f1" fontWeight="semibold">Eredeti: T, K</text>

    {/* Dilation center O and projection rays */}
    <circle cx="20" cy="245" r="3.5" fill="#ef4444" />
    <text x="12" y="260" fontSize="11" fontWeight="bold" fill="#b91c1c">O</text>
    <line x1="20" y1="245" x2="270" y2="70" stroke="#f87171" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    <line x1="20" y1="245" x2="330" y2="210" stroke="#f87171" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

    {/* Transformation Arrow 1 */}
    <path d="M 125 175 Q 160 145 185 155" fill="none" stroke="#4f46e5" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#sim-arrow)" />
    <text x="160" y="138" fontSize="10" textAnchor="middle" fill="#4338ca" fontWeight="bold">1. Középpontos nagyítás (λ = 2)</text>

    {/* Stage 2: Dilated Triangle A1 B1 C1 */}
    <polygon points="190,210 330,210 270,70" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="180" y="225" fontSize="11" fontWeight="bold" fill="#92400e">A₁</text>
    <text x="336" y="225" fontSize="11" fontWeight="bold" fill="#92400e">B₁</text>
    <text x="265" y="62" fontSize="11" fontWeight="bold" fill="#92400e">C₁</text>
    <text x="260" y="235" fontSize="10" textAnchor="middle" fill="#b45309" fontWeight="semibold">Köztes kép: 4·T, 2·K</text>

    {/* Transformation Arrow 2 */}
    <path d="M 345 155 Q 375 140 405 155" fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#sim-arrow-teal)" />
    <text x="380" y="138" fontSize="10" textAnchor="middle" fill="#0f766e" fontWeight="bold">2. Egybevágóság (tükrözés/forgatás)</text>

    {/* Stage 3: Similar Final Triangle A2 B2 C2 */}
    <polygon points="495,120 435,245 390,135" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
    <text x="502" y="122" fontSize="11" fontWeight="bold" fill="#115e59">A₂</text>
    <text x="430" y="260" fontSize="11" fontWeight="bold" fill="#115e59">B₂</text>
    <text x="380" y="135" fontSize="11" fontWeight="bold" fill="#115e59">C₂</text>
    <text x="445" y="272" fontSize="10" textAnchor="middle" fill="#0d9488" fontWeight="semibold">Hasonló: ΔABC ~ ΔA₂B₂C₂</text>

    {/* Legend footer */}
    <rect x="25" y="250" width="490" height="20" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
    <text x="270" y="264" fontSize="10" textAnchor="middle" fill="#334155" fontWeight="semibold">
      Hasonlóság = Középpontos hasonlóság ∘ Egybevágóság | Szögtartó & Aránytartó (λ = 2, Területarány = λ² = 4)
    </text>
  </svg>
);

// Figure 2: Rectangle Partitioning into a similar sub-rectangle (Tankönyv 115. o. HF 2)
export const RectanglePartitionSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 220" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="210" rx="14" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="1.5" />

    {/* Title */}
    <text x="270" y="28" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#1c1917">
      Téglalap arányos felosztása hasonló résztéglalapra (3 cm × 12 cm, arány 4 : 1)
    </text>

    {/* Main rectangle ABCD: 12 cm width -> 384 px, 3 cm height -> 96 px */}
    <rect x="50" y="55" width="384" height="96" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
    <text x="40" y="50" fontSize="11" fontWeight="bold" fill="#1e293b">D</text>
    <text x="40" y="162" fontSize="11" fontWeight="bold" fill="#1e293b">A</text>
    <text x="440" y="162" fontSize="11" fontWeight="bold" fill="#1e293b">B</text>
    <text x="440" y="50" fontSize="11" fontWeight="bold" fill="#1e293b">C</text>

    {/* Similar sub-rectangle: 3 cm width (height) by 0.75 cm length -> 24 px width */}
    <rect x="50" y="55" width="24" height="96" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />
    <line x1="74" y1="55" x2="74" y2="151" stroke="#ea580c" strokeWidth="2" />

    {/* Dimension labels */}
    <text x="62" y="172" fontSize="10" textAnchor="middle" fill="#c2410c" fontWeight="bold">0,75 cm</text>
    <text x="254" y="172" fontSize="10" textAnchor="middle" fill="#475569" fontWeight="semibold">11,25 cm</text>
    <text x="242" y="192" fontSize="11" textAnchor="middle" fill="#0f172a" fontWeight="bold">Teljes hossz = 12 cm</text>
    <text x="32" y="105" fontSize="11" textAnchor="middle" fill="#0f172a" fontWeight="bold">3 cm</text>

    {/* Callout box on right */}
    <rect x="445" y="45" width="85" height="115" rx="8" fill="#fff7ed" stroke="#fdba74" strokeWidth="1" />
    <text x="487" y="65" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#9a3412">Hasonlóság</text>
    <text x="487" y="82" fontSize="9" textAnchor="middle" fill="#c2410c">Oldalarány:</text>
    <text x="487" y="98" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#9a3412">12 : 3 = 4 : 1</text>
    <text x="487" y="118" fontSize="9" textAnchor="middle" fill="#c2410c">Kisebb rész:</text>
    <text x="487" y="132" fontSize="10" textAnchor="middle" fontWeight="bold" fill="#9a3412">3 : 0,75 = 4 : 1</text>
    <text x="487" y="148" fontSize="9" textAnchor="middle" fill="#15803d" fontWeight="bold">λ = 1/4</text>
  </svg>
);

// Figure 3: Scale factor relationships for Perimeter and Area (1, 2, 3, 4 layers)
export const PerimeterAreaScaleSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="230" rx="14" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#166534">
      Hasonló síkidomok: Kerületek aránya = λ | Területek aránya = λ²
    </text>

    {/* Nested squares demonstrating 1x1, 2x2, 3x3 */}
    <g transform="translate(40, 50)">
      {/* 3x3 base */}
      <rect x="0" y="0" width="135" height="135" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
      {/* 2x2 base */}
      <rect x="0" y="0" width="90" height="90" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
      {/* 1x1 base */}
      <rect x="0" y="0" width="45" height="45" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />

      {/* Grid lines in 3x3 */}
      <line x1="45" y1="0" x2="45" y2="135" stroke="#15803d" strokeWidth="0.8" strokeDasharray="2 2" />
      <line x1="90" y1="0" x2="90" y2="135" stroke="#15803d" strokeWidth="0.8" strokeDasharray="2 2" />
      <line x1="0" y1="45" x2="135" y2="45" stroke="#15803d" strokeWidth="0.8" strokeDasharray="2 2" />
      <line x1="0" y1="90" x2="135" y2="90" stroke="#15803d" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* Side dimension */}
      <text x="22" y="-6" fontSize="10" textAnchor="middle" fill="#166534" fontWeight="bold">1a</text>
      <text x="67" y="-6" fontSize="10" textAnchor="middle" fill="#166534" fontWeight="bold">2a</text>
      <text x="112" y="-6" fontSize="10" textAnchor="middle" fill="#166534" fontWeight="bold">3a</text>
    </g>

    {/* Table / Summary Cards on right */}
    <g transform="translate(210, 48)">
      {/* Header */}
      <rect x="0" y="0" width="310" height="28" rx="6" fill="#15803d" />
      <text x="45" y="18" fontSize="10" textAnchor="middle" fill="#ffffff" fontWeight="bold">Alakzat</text>
      <text x="120" y="18" fontSize="10" textAnchor="middle" fill="#ffffff" fontWeight="bold">Oldal (λ)</text>
      <text x="200" y="18" fontSize="10" textAnchor="middle" fill="#ffffff" fontWeight="bold">Kerület (K'/K = λ)</text>
      <text x="275" y="18" fontSize="10" textAnchor="middle" fill="#ffffff" fontWeight="bold">Terület (T'/T = λ²)</text>

      {/* Row 1 */}
      <rect x="0" y="34" width="310" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" />
      <text x="45" y="52" fontSize="10" textAnchor="middle" fill="#0f172a" fontWeight="bold">Kicsi (1×1)</text>
      <text x="120" y="52" fontSize="10" textAnchor="middle" fill="#0f172a">1 · a</text>
      <text x="200" y="52" fontSize="10" textAnchor="middle" fill="#15803d" fontWeight="bold">1 · K (4a)</text>
      <text x="275" y="52" fontSize="10" textAnchor="middle" fill="#15803d" fontWeight="bold">1 · T (1 db egység)</text>

      {/* Row 2 */}
      <rect x="0" y="68" width="310" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" />
      <text x="45" y="86" fontSize="10" textAnchor="middle" fill="#0f172a" fontWeight="bold">Közepes (2×2)</text>
      <text x="120" y="86" fontSize="10" textAnchor="middle" fill="#0f172a">2 · a (λ=2)</text>
      <text x="200" y="86" fontSize="10" textAnchor="middle" fill="#2563eb" fontWeight="bold">2 · K (8a)</text>
      <text x="275" y="86" fontSize="10" textAnchor="middle" fill="#2563eb" fontWeight="bold">4 · T (4 db egység)</text>

      {/* Row 3 */}
      <rect x="0" y="102" width="310" height="28" rx="4" fill="#ffffff" stroke="#e2e8f0" />
      <text x="45" y="120" fontSize="10" textAnchor="middle" fill="#0f172a" fontWeight="bold">Nagy (3×3)</text>
      <text x="120" y="120" fontSize="10" textAnchor="middle" fill="#0f172a">3 · a (λ=3)</text>
      <text x="200" y="120" fontSize="10" textAnchor="middle" fill="#7c3aed" fontWeight="bold">3 · K (12a)</text>
      <text x="275" y="120" fontSize="10" textAnchor="middle" fill="#7c3aed" fontWeight="bold">9 · T (9 db egység)</text>

      {/* Highlight rule */}
      <rect x="0" y="136" width="310" height="24" rx="4" fill="#dcfce7" stroke="#86efac" />
      <text x="155" y="152" fontSize="10" textAnchor="middle" fill="#14532d" fontWeight="bold">
        Ha a méretarány λ, akkor K' = λ · K és T' = λ² · T !
      </text>
    </g>

    <text x="107" y="205" fontSize="10" textAnchor="middle" fill="#15803d" fontWeight="semibold">
      3×3 négyzet = 9 db 1×1 kisnégyzet (λ = 3 → T = 3² = 9)
    </text>
  </svg>
);

// Figure 4: Pyramid Slicing in 4 Equal Height Layers (Tankönyv 115. o. HF 3)
export const PyramidLayersSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 260" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="250" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Gúla 4 egyenlő magasságú szintre osztása: Alaplapok T ~ λ² és Térfogatok V ~ λ³
    </text>

    {/* Apex O */}
    <circle cx="160" cy="50" r="3" fill="#b91c1c" />
    <text x="160" y="42" fontSize="11" textAnchor="middle" fontWeight="bold" fill="#b91c1c">O (Csúcs)</text>

    {/* Layer 1 (Apex to 1/4 h) */}
    <polygon points="160,50 142,90 178,90" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
    <line x1="120" y1="90" x2="200" y2="90" stroke="#dc2626" strokeWidth="1" strokeDasharray="3 2" />

    {/* Layer 2 (Apex to 2/4 h) */}
    <polygon points="160,50 124,130 196,130" fill="none" stroke="#ea580c" strokeWidth="1.5" />
    <line x1="95" y1="130" x2="225" y2="130" stroke="#ea580c" strokeWidth="1" strokeDasharray="3 2" />

    {/* Layer 3 (Apex to 3/4 h) */}
    <polygon points="160,50 106,170 214,170" fill="none" stroke="#0284c7" strokeWidth="1.5" />
    <line x1="75" y1="170" x2="245" y2="170" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 2" />

    {/* Full Pyramid Base (Apex to h) */}
    <polygon points="160,50 88,210 232,210" fill="none" stroke="#16a34a" strokeWidth="2" />
    <line x1="60" y1="210" x2="260" y2="210" stroke="#16a34a" strokeWidth="1.5" />

    {/* Height marks */}
    <line x1="45" y1="50" x2="45" y2="210" stroke="#64748b" strokeWidth="1.5" />
    <line x1="40" y1="50" x2="50" y2="50" stroke="#64748b" strokeWidth="1.5" />
    <line x1="40" y1="90" x2="50" y2="90" stroke="#64748b" strokeWidth="1.5" />
    <line x1="40" y1="130" x2="50" y2="130" stroke="#64748b" strokeWidth="1.5" />
    <line x1="40" y1="170" x2="50" y2="170" stroke="#64748b" strokeWidth="1.5" />
    <line x1="40" y1="210" x2="50" y2="210" stroke="#64748b" strokeWidth="1.5" />

    <text x="32" y="73" fontSize="9" textAnchor="middle" fill="#64748b">m</text>
    <text x="32" y="113" fontSize="9" textAnchor="middle" fill="#64748b">m</text>
    <text x="32" y="153" fontSize="9" textAnchor="middle" fill="#64748b">m</text>
    <text x="32" y="193" fontSize="9" textAnchor="middle" fill="#64748b">m</text>

    {/* Layer Comparison Table */}
    <g transform="translate(265, 45)">
      <rect x="0" y="0" width="260" height="24" rx="4" fill="#0284c7" />
      <text x="40" y="16" fontSize="9" textAnchor="middle" fill="#ffffff" fontWeight="bold">Szint</text>
      <text x="95" y="16" fontSize="9" textAnchor="middle" fill="#ffffff" fontWeight="bold">Hasonlóság λ</text>
      <text x="165" y="16" fontSize="9" textAnchor="middle" fill="#ffffff" fontWeight="bold">Alaplap/Palást (λ²)</text>
      <text x="225" y="16" fontSize="9" textAnchor="middle" fill="#ffffff" fontWeight="bold">Térfogat (λ³)</text>

      <rect x="0" y="28" width="260" height="24" rx="3" fill="#ffffff" stroke="#e2e8f0" />
      <text x="40" y="44" fontSize="9" textAnchor="middle" fill="#b91c1c" fontWeight="bold">1. gúla</text>
      <text x="95" y="44" fontSize="9" textAnchor="middle" fill="#0f172a">1/4 (1-szeres)</text>
      <text x="165" y="44" fontSize="9" textAnchor="middle" fill="#b91c1c" fontWeight="bold">1² = 1 (T₁)</text>
      <text x="225" y="44" fontSize="9" textAnchor="middle" fill="#b91c1c" fontWeight="bold">1³ = 1 (V₁)</text>

      <rect x="0" y="56" width="260" height="24" rx="3" fill="#ffffff" stroke="#e2e8f0" />
      <text x="40" y="72" fontSize="9" textAnchor="middle" fill="#c2410c" fontWeight="bold">2. gúla</text>
      <text x="95" y="72" fontSize="9" textAnchor="middle" fill="#0f172a">2/4 (2-szeres)</text>
      <text x="165" y="72" fontSize="9" textAnchor="middle" fill="#c2410c" fontWeight="bold">2² = 4 (4·T₁)</text>
      <text x="225" y="72" fontSize="9" textAnchor="middle" fill="#c2410c" fontWeight="bold">2³ = 8 (8·V₁)</text>

      <rect x="0" y="84" width="260" height="24" rx="3" fill="#ffffff" stroke="#e2e8f0" />
      <text x="40" y="100" fontSize="9" textAnchor="middle" fill="#0284c7" fontWeight="bold">3. gúla</text>
      <text x="95" y="100" fontSize="9" textAnchor="middle" fill="#0f172a">3/4 (3-szoros)</text>
      <text x="165" y="100" fontSize="9" textAnchor="middle" fill="#0284c7" fontWeight="bold">3² = 9 (9·T₁)</text>
      <text x="225" y="100" fontSize="9" textAnchor="middle" fill="#0284c7" fontWeight="bold">3³ = 27 (27·V₁)</text>

      <rect x="0" y="112" width="260" height="24" rx="3" fill="#ffffff" stroke="#e2e8f0" />
      <text x="40" y="128" fontSize="9" textAnchor="middle" fill="#15803d" fontWeight="bold">4. gúla (teljes)</text>
      <text x="95" y="128" fontSize="9" textAnchor="middle" fill="#0f172a">4/4 (4-szeres)</text>
      <text x="165" y="128" fontSize="9" textAnchor="middle" fill="#15803d" fontWeight="bold">4² = 16 (16·T₁)</text>
      <text x="225" y="128" fontSize="9" textAnchor="middle" fill="#15803d" fontWeight="bold">4³ = 64 (64·V₁)</text>

      <rect x="0" y="142" width="260" height="42" rx="4" fill="#eff6ff" stroke="#bfdbfe" />
      <text x="130" y="158" fontSize="9" textAnchor="middle" fill="#1e3a8a" fontWeight="bold">
        Csonkagúla szeletek térfogata:
      </text>
      <text x="130" y="174" fontSize="9" textAnchor="middle" fill="#1d4ed8">
        V₁ : (8-1)V₁ : (27-8)V₁ : (64-27)V₁ = 1 : 7 : 19 : 37
      </text>
    </g>

    <text x="160" y="235" fontSize="10" textAnchor="middle" fill="#334155" fontWeight="semibold">
      A gúlák alaplapjai és oldallapjai 1 : 4 : 9 : 16 arányban állnak egymással.
    </text>
  </svg>
);

// Figure 5: Scale Blueprint and Ratio calculation (Tankönyv 114. o. 3. feladat: Alaprajz)
export const ScaleMapBlueprintSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-auto max-w-lg mx-auto' }) => (
  <svg viewBox="0 0 540 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="5" width="530" height="230" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

    <text x="270" y="26" fontSize="12" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      Tervrajz és méretarány: M = 1 : 100 (Rajzbeli 1 cm = Valóságban 100 cm = 1 m)
    </text>

    {/* Floor Plan Miniature Box */}
    <g transform="translate(40, 45)">
      {/* Outer house walls: 30 ft x 24 ft approx */}
      <rect x="0" y="0" width="180" height="144" fill="#ffffff" stroke="#0f172a" strokeWidth="3" />

      {/* Living Room */}
      <rect x="0" y="0" width="108" height="84" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
      <text x="54" y="46" fontSize="10" textAnchor="middle" fill="#0369a1" fontWeight="bold">Nappali (Living)</text>
      <text x="54" y="60" fontSize="9" textAnchor="middle" fill="#0284c7">18 ft × 14 ft</text>

      {/* Kitchen & Dining */}
      <rect x="108" y="0" width="72" height="84" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
      <text x="144" y="40" fontSize="9" textAnchor="middle" fill="#b45309" fontWeight="bold">Konyha</text>
      <text x="144" y="54" fontSize="8" textAnchor="middle" fill="#b45309">12 ft × 14 ft</text>

      {/* Foyer & Hall */}
      <rect x="0" y="84" width="90" height="60" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <text x="45" y="115" fontSize="9" textAnchor="middle" fill="#475569" fontWeight="bold">Előtér (Foyer)</text>

      {/* Entrance Door */}
      <line x1="30" y1="144" x2="60" y2="144" stroke="#dc2626" strokeWidth="4" />
      <text x="45" y="158" fontSize="8" textAnchor="middle" fill="#dc2626" fontWeight="bold">Ajtó (3 ft = 0,9 m)</text>

      {/* Garage / Room */}
      <rect x="90" y="84" width="90" height="60" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
      <text x="135" y="115" fontSize="9" textAnchor="middle" fill="#7e22ce" fontWeight="bold">Szoba / Tároló</text>
    </g>

    {/* Metric conversions Card */}
    <g transform="translate(250, 45)">
      <rect x="0" y="0" width="250" height="160" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="125" y="24" fontSize="11" textAnchor="middle" fill="#0f172a" fontWeight="bold">
        Átváltási Szabályok és Méretarány
      </text>

      <line x1="15" y1="34" x2="235" y2="34" stroke="#f1f5f9" strokeWidth="1.5" />

      <text x="20" y="52" fontSize="9" fill="#334155" fontWeight="semibold">• Hosszúság méretaránya (M = 1 : N):</text>
      <text x="32" y="66" fontSize="9" fill="#0284c7" fontWeight="bold">hossz_rajz = hossz_valóság / N</text>

      <text x="20" y="86" fontSize="9" fill="#334155" fontWeight="semibold">• Terület méretaránya (M² = 1 : N²):</text>
      <text x="32" y="100" fontSize="9" fill="#15803d" fontWeight="bold">terület_rajz = terület_valóság / N²</text>

      <text x="20" y="120" fontSize="9" fill="#334155" fontWeight="semibold">• Angolszász mértékegység (Láb / foot):</text>
      <text x="32" y="134" fontSize="9" fill="#c2410c" fontWeight="bold">1 ft ≈ 0,3048 m (gyakorlatban: 0,3 m)</text>
      <text x="32" y="148" fontSize="9" fill="#64748b">Ajtó: 3 ft = 0,9 m = 90 cm (1:100 rajzon: 9 mm)</text>
    </g>

    <text x="270" y="222" fontSize="10" textAnchor="middle" fill="#475569" fontWeight="semibold">
      A méretarány a hosszúságok kicsinyítésének/nagyításának aránya: a területek N²-szeresen skálázódnak!
    </text>
  </svg>
);

