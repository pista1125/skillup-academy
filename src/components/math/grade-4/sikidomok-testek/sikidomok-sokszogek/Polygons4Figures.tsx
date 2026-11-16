import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

type P = [number, number];

/**
 * Derékszög jele a magyar szokás szerint: negyedkörív és pont (soha nem kis négyzet).
 * V: a szög csúcsa, A és B: egy-egy pont a két száron.
 */
export const Polygons4RightMark: React.FC<{ v: P; a: P; b: P; r?: number; color?: string }> = ({ v, a, b, r = 13, color = '#0f172a' }) => {
  const len = (p: P) => Math.hypot(p[0], p[1]) || 1;
  const d1: P = [a[0] - v[0], a[1] - v[1]];
  const d2: P = [b[0] - v[0], b[1] - v[1]];
  const u1: P = [d1[0] / len(d1), d1[1] / len(d1)];
  const u2: P = [d2[0] / len(d2), d2[1] / len(d2)];
  const s: P = [v[0] + r * u1[0], v[1] + r * u1[1]];
  const e: P = [v[0] + r * u2[0], v[1] + r * u2[1]];
  const cross = u1[0] * u2[1] - u1[1] * u2[0];
  const sweep = cross > 0 ? 1 : 0;
  const bis: P = [u1[0] + u2[0], u1[1] + u2[1]];
  const bl = len(bis);
  const dot: P = [v[0] + (0.55 * r * bis[0]) / bl, v[1] + (0.55 * r * bis[1]) / bl];
  return (
    <g>
      <path d={`M ${s[0]} ${s[1]} A ${r} ${r} 0 0 ${sweep} ${e[0]} ${e[1]}`} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={dot[0]} cy={dot[1]} r="1.8" fill={color} />
    </g>
  );
};

const pts = (p: P[]) => p.map((q) => q.join(',')).join(' ');

/** 1. ábra: Síkidomok ⊃ Sokszögek ⊃ Négyszögek (Tankönyv 112. o.) */
export const PlaneShapesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 250" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="242" rx="18" fill="#fff7ed" stroke="#fb923c" strokeWidth="2" />
    <text x="20" y="28" fontSize="15" fontWeight="bold" fill="#c2410c">Síkidomok</text>
    {/* görbe vonallal is határolt síkidomok */}
    <circle cx="60" cy="80" r="26" fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
    <path d="M 60 150 L 86 150 A 26 26 0 1 1 60 124 Z" fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
    <path d="M 40 182 A 26 26 0 1 0 84 197 L 62 192 Z" fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
    <rect x="120" y="40" width="384" height="196" rx="14" fill="#fff1f2" stroke="#f43f5e" strokeWidth="2" />
    <text x="134" y="62" fontSize="15" fontWeight="bold" fill="#be123c">Sokszögek</text>
    <polygon points="160,200 185,90 210,200" fill="#fda4af" stroke="#9f1239" strokeWidth="1.5" />
    <polygon points="240,90 280,90 296,112 280,134 240,134 224,112" fill="#fda4af" stroke="#9f1239" strokeWidth="1.5" />
    <polygon points="265,160 290,170 290,200 265,212 240,200 240,170" fill="#fda4af" stroke="#9f1239" strokeWidth="1.5" />
    <polygon points="470,60 492,78 484,104 456,104 448,78" fill="#fda4af" stroke="#9f1239" strokeWidth="1.5" />
    <polygon points="452,140 470,140 470,182 498,182 498,200 452,200" fill="#fda4af" stroke="#9f1239" strokeWidth="1.5" />
    <ellipse cx="370" cy="160" rx="66" ry="64" fill="#e7e5e4" stroke="#78716c" strokeWidth="2" />
    <text x="370" y="114" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#44403c">Négyszögek</text>
    <rect x="335" y="128" width="30" height="26" fill="#a8a29e" stroke="#44403c" />
    <polygon points="375,128 405,128 412,154 382,154" fill="#a8a29e" stroke="#44403c" />
    <polygon points="335,170 368,166 362,196 340,200" fill="#a8a29e" stroke="#44403c" />
    <polygon points="378,172 410,182 382,200 390,184" fill="#a8a29e" stroke="#44403c" />
    <text x="160" y="226" fontSize="11" fill="#9f1239">egyenes szakaszok határolják</text>
    <text x="20" y="240" fontSize="11" fill="#c2410c">görbe vonal is</text>
  </svg>
);

/** 2. ábra: hajtogatással kapott párhuzamos egyenesek és a létra (Tankönyv 113. o.) */
export const ParallelLinesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 236" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="228" rx="18" fill="#fefce8" stroke="#facc15" strokeWidth="2" />
    <text x="110" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">Kétszer félbehajtott lap</text>
    <rect x="40" y="40" width="140" height="160" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
    {[80, 120, 160].map((y) => (
      <line key={y} x1="40" y1={y} x2="180" y2={y} stroke="#dc2626" strokeWidth="2.5" />
    ))}
    <text x="190" y="124" fontSize="12" fill="#b91c1c">párhuzamos</text>
    <text x="190" y="140" fontSize="12" fill="#b91c1c">egyenesek</text>
    <text x="390" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">A létra fokai is párhuzamosak</text>
    <line x1="340" y1="200" x2="360" y2="40" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />
    <line x1="440" y1="200" x2="420" y2="40" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />
    {[70, 105, 140, 175].map((y) => {
      const t = (200 - y) / 160;
      return <line key={y} x1={340 + 20 * t} y1={y} x2={440 - 20 * t} y2={y} stroke="#b45309" strokeWidth="5" strokeLinecap="round" />;
    })}
    <text x="260" y="222" textAnchor="middle" fontSize="12" fill="#475569">A párhuzamos egyenesek sehol sem találkoznak.</text>
  </svg>
);

/** 3. ábra: derékszögnél kisebb, derékszög, derékszögnél nagyobb (Tankönyv 114. o.) */
export const AngleTypesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="192" rx="18" fill="#f0fdf4" stroke="#4ade80" strokeWidth="2" />
    {/* kisebb */}
    <line x1="40" y1="150" x2="150" y2="150" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
    <line x1="40" y1="150" x2="130" y2="85" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
    <path d="M 70 150 A 30 30 0 0 0 64.3 132.4" fill="none" stroke="#2563eb" strokeWidth="2" />
    <text x="95" y="182" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">derékszögnél kisebb</text>
    {/* derékszög */}
    <line x1="215" y1="150" x2="320" y2="150" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    <line x1="215" y1="150" x2="215" y2="45" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    <Polygons4RightMark v={[215, 150]} a={[320, 150]} b={[215, 45]} r={20} color="#15803d" />
    <text x="262" y="182" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">derékszög</text>
    {/* nagyobb */}
    <line x1="400" y1="150" x2="500" y2="150" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
    <line x1="400" y1="150" x2="345" y2="70" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
    <path d="M 428 150 A 28 28 0 0 0 384.1 126.9" fill="none" stroke="#dc2626" strokeWidth="2" />
    <text x="430" y="182" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7f1d1d">derékszögnél nagyobb</text>
  </svg>
);

/** 4. ábra: a téglalap és a négyzet – minden szögük derékszög (Tankönyv 115. o.) */
export const RectSquareSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const rect: P[] = [
    [40, 50],
    [223, 50],
    [223, 160],
    [40, 160]
  ];
  const sq: P[] = [
    [330, 50],
    [440, 50],
    [440, 160],
    [330, 160]
  ];
  const marks = (q: P[], c: string) =>
    q.map((v, i) => <Polygons4RightMark key={i} v={v} a={q[(i + 1) % 4]} b={q[(i + 3) % 4]} r={14} color={c} />);
  return (
    <svg viewBox="0 0 520 210" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="4" y="4" width="512" height="202" rx="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <polygon points={pts(rect)} fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.5" />
      {marks(rect, '#1e3a8a')}
      <text x="131" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e3a8a">téglalap</text>
      <text x="131" y="40" textAnchor="middle" fontSize="12" fill="#1e40af">5 egység</text>
      <text x="235" y="110" fontSize="12" fill="#1e40af">3</text>
      <polygon points={pts(sq)} fill="#fecaca" stroke="#b91c1c" strokeWidth="2.5" />
      {marks(sq, '#7f1d1d')}
      <text x="385" y="110" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7f1d1d">négyzet</text>
      <text x="385" y="40" textAnchor="middle" fontSize="12" fill="#991b1b">3 egység</text>
      <text x="452" y="110" fontSize="12" fill="#991b1b">3</text>
      <text x="260" y="192" textAnchor="middle" fontSize="12" fill="#334155">
        Mind a 4 szögük derékszög. A négyzetnek mind a 4 oldala egyenlő hosszú.
      </text>
    </svg>
  );
};

/** 5. ábra: a sokszög csúcsa, oldala, átlója; a téglalap átlói (Tankönyv 116. o.) */
export const PolygonPartsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 220" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="512" height="212" rx="18" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <polygon points="70,110 140,40 230,60 170,170" fill="#fef3c7" stroke="#334155" strokeWidth="2" />
    <line x1="70" y1="110" x2="170" y2="170" stroke="#16a34a" strokeWidth="4" />
    <line x1="140" y1="40" x2="170" y2="170" stroke="#dc2626" strokeWidth="3" />
    <circle cx="70" cy="110" r="6" fill="#f97316" />
    <text x="16" y="96" fontSize="13" fontWeight="bold" fill="#ea580c">csúcs</text>
    <text x="80" y="170" fontSize="13" fontWeight="bold" fill="#16a34a">oldal</text>
    <text x="180" y="120" fontSize="13" fontWeight="bold" fill="#dc2626">átló</text>
    <polygon points="320,70 480,70 480,170 320,170" fill="#ffffff" stroke="#334155" strokeWidth="2" />
    <line x1="320" y1="170" x2="480" y2="70" stroke="#dc2626" strokeWidth="2.5" />
    <line x1="320" y1="70" x2="480" y2="170" stroke="#dc2626" strokeWidth="2.5" />
    <text x="306" y="66" fontSize="13" fontWeight="bold" fill="#334155">D</text>
    <text x="486" y="66" fontSize="13" fontWeight="bold" fill="#334155">C</text>
    <text x="306" y="186" fontSize="13" fontWeight="bold" fill="#334155">A</text>
    <text x="486" y="186" fontSize="13" fontWeight="bold" fill="#334155">B</text>
    <text x="260" y="206" textAnchor="middle" fontSize="12" fill="#7f1d1d">Az átló két nem szomszédos csúcsot köt össze.</text>
  </svg>
);

/** 6. ábra: van beugró része – nincs beugró része (Tankönyv 112. o. d) feladat) */
export const DentShapesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 520 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="250" height="192" rx="16" fill="#fdf2f8" stroke="#f472b6" strokeWidth="2" />
    <rect x="266" y="4" width="250" height="192" rx="16" fill="#ecfeff" stroke="#22d3ee" strokeWidth="2" />
    <text x="129" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#be185d">Van beugró része</text>
    <text x="391" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0e7490">Nincs beugró része</text>
    <polygon points="30,60 60,60 60,130 110,130 110,160 30,160" fill="#f9a8d4" stroke="#9d174d" strokeWidth="2" />
    <polygon points="140,60 230,110 140,160 170,110" fill="#f9a8d4" stroke="#9d174d" strokeWidth="2" />
    <circle cx="170" cy="110" r="5" fill="#be185d" />
    <polygon points="290,150 330,60 370,150" fill="#a5f3fc" stroke="#155e75" strokeWidth="2" />
    <polygon points="400,70 440,60 480,80 490,130 440,160 400,140" fill="#a5f3fc" stroke="#155e75" strokeWidth="2" />
    <text x="129" y="186" textAnchor="middle" fontSize="11" fill="#9d174d">egy sarka „befelé” mutat</text>
    <text x="391" y="186" textAnchor="middle" fontSize="11" fill="#155e75">minden sarka kifelé mutat</text>
  </svg>
);
