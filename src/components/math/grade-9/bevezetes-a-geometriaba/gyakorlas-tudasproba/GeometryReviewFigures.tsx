import React from 'react';

// Hungarian Right Angle marker helper: quarter-circle arc with center dot
export const HungarianRightAngle: React.FC<{
  vertex: [number, number];
  p1: [number, number];
  p2: [number, number];
  size?: number;
  strokeColor?: string;
  dotColor?: string;
}> = ({ vertex, p1, p2, size = 16, strokeColor = '#dc2626', dotColor = '#dc2626' }) => {
  const [vx, vy] = vertex;
  const [p1x, p1y] = p1;
  const [p2x, p2y] = p2;

  const d1 = Math.hypot(p1x - vx, p1y - vy) || 1;
  const d2 = Math.hypot(p2x - vx, p2y - vy) || 1;

  const u1x = (p1x - vx) / d1;
  const u1y = (p1y - vy) / d1;
  const u2x = (p2x - vx) / d2;
  const u2y = (p2y - vy) / d2;

  const a1x = vx + u1x * size;
  const a1y = vy + u1y * size;
  const a2x = vx + u2x * size;
  const a2y = vy + u2y * size;

  const cp = u1x * u2y - u1y * u2x;
  const sweep = cp > 0 ? 1 : 0;

  const dotDist = size * 0.55;
  const dotX = vx + (u1x + u2x) * dotDist * 0.7071;
  const dotY = vy + (u1y + u2y) * dotDist * 0.7071;

  return (
    <g>
      <path
        d={`M ${a1x} ${a1y} A ${size} ${size} 0 0 ${sweep} ${a2x} ${a2y}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <circle cx={dotX} cy={dotY} r={1.8} fill={dotColor} />
    </g>
  );
};

// 1. Átfogó Geometriai Áttekintő SVG: Háromszög O, I, M, S pontokkal, Euler-egyenessel és érintővel
export const ComprehensiveGeometryOverviewSVG: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size * 0.85}
      viewBox="0 0 320 270"
      className={`select-none ${className}`}
      aria-label="Átfogó geometria összefoglaló ábra: nevezetes vonalak és pontok"
    >
      <defs>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#dc2626" />
        </marker>
        <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" />
        </marker>
      </defs>

      {/* Háttér kártya */}
      <rect x="5" y="5" width="310" height="260" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Körülírt kör (halvány kék) */}
      <circle cx="160" cy="135" r="95" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />

      {/* Beírt kör (halvány smaragd) */}
      <circle cx="152" cy="148" r="42" fill="#ecfdf5" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />

      {/* Háromszög csúcsai: A(75, 195), B(245, 195), C(130, 48) */}
      <polygon points="75,195 245,195 130,48" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Magasságvonal talppontja és magasságvonal C-ből AB-re (130, 195) */}
      <line x1="130" y1="48" x2="130" y2="195" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="3 2" />
      {/* Magyar derékszög a magasság talppontjánál */}
      <HungarianRightAngle vertex={[130, 195]} p1={[130, 48]} p2={[245, 195]} size={12} strokeColor="#dc2626" dotColor="#dc2626" />

      {/* Súlyvonal C-ből AB felezőpontjába Fab(160, 195) */}
      <line x1="130" y1="48" x2="160" y2="195" stroke="#8b5cf6" strokeWidth="1.2" strokeDasharray="4 2" />

      {/* Euler-egyenes M (magasságpont), S (súlypont), O (körülírt kör kp) összekötése */}
      {/* M kb (130, 140), S kb (150, 146), O kb (160, 135) */}
      <line x1="105" y1="145" x2="190" y2="128" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5 3" />
      <text x="195" y="128" fill="#d97706" fontSize="9" fontWeight="bold">Euler-egyenes</text>

      {/* Pontok jelölése */}
      {/* C csúcs */}
      <circle cx="130" cy="48" r="3.5" fill="#1e293b" />
      <text x="126" y="38" fill="#1e293b" fontSize="12" fontWeight="bold">C</text>

      {/* A csúcs */}
      <circle cx="75" cy="195" r="3.5" fill="#1e293b" />
      <text x="58" y="202" fill="#1e293b" fontSize="12" fontWeight="bold">A</text>

      {/* B csúcs */}
      <circle cx="245" cy="195" r="3.5" fill="#1e293b" />
      <text x="252" y="202" fill="#1e293b" fontSize="12" fontWeight="bold">B</text>

      {/* S: Súlypont */}
      <circle cx="150" cy="146" r="3.5" fill="#8b5cf6" />
      <text x="145" y="160" fill="#7c3aed" fontSize="10" fontWeight="bold">S</text>

      {/* I: Beírt kör középpontja */}
      <circle cx="152" cy="148" r="3" fill="#059669" />
      <text x="160" y="156" fill="#059669" fontSize="10" fontWeight="bold">I</text>

      {/* O: Körülírt kör középpontja */}
      <circle cx="160" cy="135" r="3.5" fill="#2563eb" />
      <text x="166" y="133" fill="#2563eb" fontSize="10" fontWeight="bold">O</text>

      {/* M: Magasságpont */}
      <circle cx="130" cy="140" r="3.5" fill="#dc2626" />
      <text x="115" y="138" fill="#dc2626" fontSize="10" fontWeight="bold">M</text>

      {/* Jelmagyarázat doboz alul */}
      <g transform="translate(15, 222)">
        <rect x="0" y="0" width="290" height="36" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="15" cy="12" r="3" fill="#2563eb" />
        <text x="24" y="15" fill="#334155" fontSize="9">O: Körülírt kör</text>

        <circle cx="95" cy="12" r="3" fill="#059669" />
        <text x="104" y="15" fill="#334155" fontSize="9">I: Beírt kör</text>

        <circle cx="160" cy="12" r="3" fill="#8b5cf6" />
        <text x="169" y="15" fill="#334155" fontSize="9">S: Súlypont (2:1)</text>

        <circle cx="230" cy="12" r="3" fill="#dc2626" />
        <text x="239" y="15" fill="#334155" fontSize="9">M: Magasságpont</text>

        <text x="15" y="29" fill="#b45309" fontSize="8.5" fontWeight="bold">Euler-arány: MS : SO = 2 : 1 (egy egyenesen fekszenek)</text>
      </g>
    </svg>
  );
};

// 2. Pitagorasz és Különleges Derékszögű Háromszögek SVG
export const PythagorasAndSpecialTrianglesSVG: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 320 240"
      className={`select-none ${className}`}
      aria-label="Pitagorasz és nevezetes háromszögek (30-60-90 és 45-45-90)"
    >
      <rect x="5" y="5" width="310" height="230" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bal oldal: 30-60-90 háromszög */}
      <g transform="translate(15, 20)">
        <text x="65" y="15" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">
          30° - 60° - 90°
        </text>
        {/* Csúcsok: A(20, 160), B(110, 160), C(20, 35) */}
        <polygon points="20,160 110,160 20,35" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" />
        {/* Derékszög A-nál */}
        <HungarianRightAngle vertex={[20, 160]} p1={[110, 160]} p2={[20, 35]} size={14} strokeColor="#dc2626" dotColor="#dc2626" />

        {/* Szögek */}
        <text x="24" y="60" fill="#2563eb" fontSize="9" fontWeight="bold">30°</text>
        <text x="80" y="152" fill="#2563eb" fontSize="9" fontWeight="bold">60°</text>

        {/* Oldalak aránya */}
        <text x="5" y="105" fill="#0f172a" fontSize="10" fontWeight="bold">a√3</text>
        <text x="60" y="175" fill="#0f172a" fontSize="10" fontWeight="bold">a</text>
        <text x="75" y="95" fill="#dc2626" fontSize="11" fontWeight="bold">2a</text>
      </g>

      {/* Függőleges elválasztó vonal */}
      <line x1="160" y1="20" x2="160" y2="200" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

      {/* Jobb oldal: 45-45-90 háromszög (egyenlő szárú derékszögű) */}
      <g transform="translate(165, 20)">
        <text x="70" y="15" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">
          45° - 45° - 90° (Fél négyzet)
        </text>
        {/* Csúcsok: A(25, 160), B(120, 160), C(25, 65) */}
        <polygon points="25,160 120,160 25,65" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round" />
        {/* Derékszög A-nál */}
        <HungarianRightAngle vertex={[25, 160]} p1={[120, 160]} p2={[25, 65]} size={14} strokeColor="#dc2626" dotColor="#dc2626" />

        {/* Szögek */}
        <text x="30" y="90" fill="#dc2626" fontSize="9" fontWeight="bold">45°</text>
        <text x="90" y="152" fill="#dc2626" fontSize="9" fontWeight="bold">45°</text>

        {/* Oldalak aránya */}
        <text x="12" y="118" fill="#0f172a" fontSize="10" fontWeight="bold">a</text>
        <text x="68" y="175" fill="#0f172a" fontSize="10" fontWeight="bold">a</text>
        <text x="80" y="105" fill="#2563eb" fontSize="11" fontWeight="bold">a√2</text>
      </g>

      {/* Alsó megjegyzés */}
      <rect x="20" y="198" width="280" height="26" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="160" y="215" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">
        Pitagorasz: a² + b² = c²  •  Megfordítás: ha a² + b² = c² ⇔ derékszögű!
      </text>
    </svg>
  );
};

// 3. Thalész-tétel és Érintők Összefoglalása SVG
export const ThalesAndTangentsSummarySVG: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 320 240"
      className={`select-none ${className}`}
      aria-label="Thalész-tétel és külső pontból húzott érintők"
    >
      <rect x="5" y="5" width="310" height="230" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Kör O(120, 120), r=65 */}
      <circle cx="120" cy="120" r="65" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <circle cx="120" cy="120" r="3.5" fill="#1e293b" />
      <text x="116" y="136" fill="#1e293b" fontSize="10" fontWeight="bold">O</text>

      {/* Átmérő AB: A(55, 120), B(185, 120) */}
      <line x1="55" y1="120" x2="185" y2="120" stroke="#1e293b" strokeWidth="2" />
      <circle cx="55" cy="120" r="3" fill="#1e293b" />
      <text x="42" y="124" fill="#1e293b" fontSize="10" fontWeight="bold">A</text>
      <circle cx="185" cy="120" r="3" fill="#1e293b" />
      <text x="190" y="124" fill="#1e293b" fontSize="10" fontWeight="bold">B</text>

      {/* Pont a körön C (Thalész-tétel szemléltetésére: 120 - 45 = 75, 120 - 47 = 73) */}
      {/* Számoljunk: C(120 + 65*cos(125°), 120 - 65*sin(125°)) -> cos 125 = -0.573, sin 125 = 0.819 -> (83, 67) */}
      <polygon points="55,120 185,120 83,67" fill="none" stroke="#2563eb" strokeWidth="1.8" />
      <circle cx="83" cy="67" r="3.5" fill="#2563eb" />
      <text x="76" y="58" fill="#2563eb" fontSize="10" fontWeight="bold">C</text>
      {/* Magyar derékszög C-nél */}
      <HungarianRightAngle vertex={[83, 67]} p1={[55, 120]} p2={[185, 120]} size={12} strokeColor="#dc2626" dotColor="#dc2626" />
      <text x="96" y="86" fill="#dc2626" fontSize="9" fontWeight="bold">90°</text>

      {/* Külső pont P(280, 120) */}
      <circle cx="280" cy="120" r="3.5" fill="#dc2626" />
      <text x="286" y="124" fill="#dc2626" fontSize="11" fontWeight="bold">P</text>

      {/* Érintési pontok E1 és E2 */}
      {/* OP távolság = 160. r = 65. Érintő szög: cos alpha = 65/160 = 0.406 -> alpha = 66° */}
      {/* E1: 120 + 65*cos(66°) = 120 + 26.4 = 146, 120 - 65*sin(66°) = 120 - 59.4 = 61 */}
      {/* E2: (146, 179) */}
      <line x1="280" y1="120" x2="146" y2="61" stroke="#dc2626" strokeWidth="1.8" />
      <line x1="280" y1="120" x2="146" y2="179" stroke="#dc2626" strokeWidth="1.8" />

      {/* Érintési pontok jelölése */}
      <circle cx="146" cy="61" r="3" fill="#dc2626" />
      <text x="142" y="52" fill="#dc2626" fontSize="9" fontWeight="bold">E₁</text>
      <circle cx="146" cy="179" r="3" fill="#dc2626" />
      <text x="142" y="193" fill="#dc2626" fontSize="9" fontWeight="bold">E₂</text>

      {/* Sugár az érintési pontokba */}
      <line x1="120" y1="120" x2="146" y2="61" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="2 2" />
      <line x1="120" y1="120" x2="146" y2="179" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="2 2" />

      {/* Magyar derékszög az érintési pontnál */}
      <HungarianRightAngle vertex={[146, 61]} p1={[120, 120]} p2={[280, 120]} size={10} strokeColor="#16a34a" dotColor="#16a34a" />

      {/* Alsó magyarázat */}
      <rect x="15" y="200" width="290" height="28" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <text x="160" y="218" fill="#1e293b" fontSize="8.5" fontWeight="bold" textAnchor="middle">
        Thalész: átmérő látószöge = 90°  •  Érintő r-re merőleges (OE ⊥ PE, PE₁ = PE₂)
      </text>
    </svg>
  );
};

// 4. Területképletek Mester-Összefoglaló SVG
export const TriangleAreaMasterFormulasSVG: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 320 240"
      className={`select-none ${className}`}
      aria-label="Háromszögek kerülete és területe mesterképletek"
    >
      <rect x="5" y="5" width="310" height="230" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 4 kártya doboz a 4 alapvető területképletre */}
      {/* 1. Alap és magasság */}
      <g transform="translate(15, 15)">
        <rect x="0" y="0" width="138" height="92" rx="8" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" />
        <rect x="0" y="0" width="138" height="22" rx="8" fill="#eff6ff" />
        <text x="69" y="15" fill="#1e40af" fontSize="9.5" fontWeight="bold" textAnchor="middle">1. Alap és magasság</text>
        <text x="69" y="44" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">T = (a · m_a) / 2</text>
        <text x="69" y="62" fill="#64748b" fontSize="8.5" textAnchor="middle">m_a = (2T) / a</text>
        <text x="69" y="78" fill="#dc2626" fontSize="8" fontWeight="bold" textAnchor="middle">Derékszögű: T = (a · b) / 2</text>
      </g>

      {/* 2. Szabályos háromszög */}
      <g transform="translate(167, 15)">
        <rect x="0" y="0" width="138" height="92" rx="8" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1.5" />
        <rect x="0" y="0" width="138" height="22" rx="8" fill="#ecfdf5" />
        <text x="69" y="15" fill="#065f46" fontSize="9.5" fontWeight="bold" textAnchor="middle">2. Szabályos háromszög</text>
        <text x="69" y="44" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">T = (a² · √3) / 4</text>
        <text x="69" y="62" fill="#059669" fontSize="8.5" textAnchor="middle">m = (a · √3) / 2</text>
        <text x="69" y="78" fill="#64748b" fontSize="8" textAnchor="middle">r = m/3,  R = 2m/3</text>
      </g>

      {/* 3. Hérón-képlet (3 oldal) */}
      <g transform="translate(15, 118)">
        <rect x="0" y="0" width="138" height="98" rx="8" fill="#ffffff" stroke="#fed7aa" strokeWidth="1.5" />
        <rect x="0" y="0" width="138" height="22" rx="8" fill="#fff7ed" />
        <text x="69" y="15" fill="#9a3412" fontSize="9.5" fontWeight="bold" textAnchor="middle">3. Hérón-képlet</text>
        <text x="69" y="42" fill="#9a3412" fontSize="8.5" textAnchor="middle">s = (a + b + c) / 2</text>
        <text x="69" y="62" fill="#0f172a" fontSize="10.5" fontWeight="bold" textAnchor="middle">T = √[s(s-a)(s-b)(s-c)]</text>
        <text x="69" y="82" fill="#64748b" fontSize="8" textAnchor="middle">Három oldal elegendő!</text>
      </g>

      {/* 4. Sugaras képletek */}
      <g transform="translate(167, 118)">
        <rect x="0" y="0" width="138" height="98" rx="8" fill="#ffffff" stroke="#ddd6fe" strokeWidth="1.5" />
        <rect x="0" y="0" width="138" height="22" rx="8" fill="#f5f3ff" />
        <text x="69" y="15" fill="#5b21b6" fontSize="9.5" fontWeight="bold" textAnchor="middle">4. Sugarak és Terület</text>
        <text x="69" y="44" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">T = r · s  ⇒  r = T / s</text>
        <text x="69" y="64" fill="#0f172a" fontSize="10.5" fontWeight="bold" textAnchor="middle">T = abc / 4R</text>
        <text x="69" y="84" fill="#7c3aed" fontSize="8.5" fontWeight="bold" textAnchor="middle">R = (abc) / (4T)</text>
      </g>
    </svg>
  );
};

