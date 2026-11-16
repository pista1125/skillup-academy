import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';
const INK = '#0f172a';
const BLUE = '#2563eb';
const GREEN = '#16a34a';
const RED = '#dc2626';
const AUX = '#64748b';

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Vízszintes ellipszis: elöl folytonos, hátul szaggatott. */
const HEllipse: React.FC<{ cx: number; cy: number; rx: number; ry: number; color?: string; w?: number }> = ({ cx, cy, rx, ry, color = AUX, w = 1.4 }) => (
  <g>
    <path d={`M ${r1(cx - rx)} ${cy} A ${r1(rx)} ${r1(ry)} 0 0 1 ${r1(cx + rx)} ${cy}`} fill="none" stroke={color} strokeWidth={w} strokeDasharray="5 4" />
    <path d={`M ${r1(cx - rx)} ${cy} A ${r1(rx)} ${r1(ry)} 0 0 0 ${r1(cx + rx)} ${cy}`} fill="none" stroke={color} strokeWidth={w} />
  </g>
);

const Frame: React.FC<{ w?: number; h?: number; title: string; className: string; children: React.ReactNode }> = ({
  w = 560,
  h = 320,
  title,
  className,
  children
}) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="5" y="5" width={w - 10} height={h - 10} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x={w / 2} y="28" fontSize="14" textAnchor="middle" fontWeight="bold" fill={INK}>
      {title}
    </text>
    {children}
  </svg>
);

// 1. ábra: a gömb felszíne és térfogata – a felszín 4 főkörnyi terület
export const SphereFormulaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const C = { x: 150, y: 175 };
  const R = 100;
  return (
    <Frame title="A gömb felszíne és térfogata" className={className}>
      <circle cx={C.x} cy={C.y} r={R} fill="rgba(37,99,235,0.08)" stroke={BLUE} strokeWidth="2.2" />
      <HEllipse cx={C.x} cy={C.y} rx={R} ry={R * 0.28} color="#7c3aed" />
      <line x1={C.x} y1={C.y} x2={C.x + R} y2={C.y} stroke={RED} strokeWidth="2" />
      <circle cx={C.x} cy={C.y} r="3" fill={INK} />
      <text x={C.x + R / 2} y={C.y - 8} fontSize="14" fontWeight="bold" fill={RED} textAnchor="middle">r</text>
      {/* 4 főkör */}
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={330 + (i % 2) * 58} cy={110 + Math.floor(i / 2) * 58} r="26" fill="rgba(124,58,237,0.15)" stroke="#7c3aed" strokeWidth="1.5" />
      ))}
      <text x={359} y={200} fontSize="11.5" fill="#6d28d9" textAnchor="middle" fontWeight="bold">4 főkör területe</text>
      <text x={430} y={110} fontSize="15" fontWeight="bold" fill={INK}>A = 4r²π</text>
      <text x={430} y={160} fontSize="15" fontWeight="bold" fill={INK}>V = 4r³π / 3</text>
      <text x={359} y={250} fontSize="11.5" fill={AUX} textAnchor="middle">A gömbfelület nem teríthető ki síkba,</text>
      <text x={359} y={266} fontSize="11.5" fill={AUX} textAnchor="middle">a képletek felsőbb matematikával igazolhatók.</text>
    </Frame>
  );
};

// 2. ábra: a 20 cm átmérőjű dinnye tömege
export const MelonMassSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const C = { x: 170, y: 175 };
  const R = 105;
  return (
    <Frame title="Mennyi a dinnye tömege?" className={className}>
      <circle cx={C.x} cy={C.y} r={R} fill="rgba(34,197,94,0.15)" stroke={GREEN} strokeWidth="3" />
      {[-60, -30, 0, 30, 60].map((dx) => (
        <path key={dx} d={`M ${C.x + dx * 0.4} ${C.y - R} Q ${C.x + dx * 1.6} ${C.y} ${C.x + dx * 0.4} ${C.y + R}`} fill="none" stroke="#15803d" strokeWidth="1.2" opacity="0.5" />
      ))}
      <line x1={C.x - R} y1={C.y} x2={C.x + R} y2={C.y} stroke={RED} strokeWidth="2" strokeDasharray="6 4" />
      <text x={C.x} y={C.y - 8} fontSize="13" fontWeight="bold" fill={RED} textAnchor="middle">d = 20 cm</text>
      <text x={330} y={100} fontSize="13" fill={INK} fontWeight="bold">r = 10 cm</text>
      <text x={330} y={130} fontSize="13" fill={INK}>V = 4 · 10³ · π / 3</text>
      <text x={330} y={154} fontSize="13" fill={INK}>V ≈ 4189 cm³ ≈ 4,2 dm³</text>
      <text x={330} y={190} fontSize="13" fill={INK}>sűrűség ≈ 1 kg/dm³ (víz)</text>
      <text x={330} y={222} fontSize="14" fill={GREEN} fontWeight="bold">tömeg ≈ 4,2 kg</text>
    </Frame>
  );
};

// 3. ábra: ólomgolyóból sörétek
export const LeadShotSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const dots: { x: number; y: number }[] = [];
  for (let i = 0; i < 9; i++) for (let j = 0; j < 7; j++) dots.push({ x: 330 + i * 18, y: 90 + j * 18 });
  return (
    <Frame title="Ólomgolyóból sörétek" className={className}>
      <circle cx={150} cy={165} r={95} fill="rgba(100,116,139,0.25)" stroke="#334155" strokeWidth="2.4" />
      <line x1={150} y1={165} x2={245} y2={165} stroke={RED} strokeWidth="2" />
      <text x={197} y={157} fontSize="13" fontWeight="bold" fill={RED} textAnchor="middle">20 mm</text>
      <circle cx={150} cy={165} r="3" fill={INK} />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="4.7" fill="rgba(100,116,139,0.35)" stroke="#334155" strokeWidth="1" />
      ))}
      <text x={402} y={230} fontSize="12" fill={INK} textAnchor="middle" fontWeight="bold">sörét sugara 1 mm</text>
      <text x={280} y={270} fontSize="13" fill={INK} textAnchor="middle">
        darabszám: V_golyó / V_sörét = 20³ = 8000
      </text>
      <text x={280} y={292} fontSize="13" fill={INK} textAnchor="middle">
        felszínek: 8000 · 4 · 1² · π / (4 · 20² · π) = 20
      </text>
    </Frame>
  );
};

// 4. ábra: a dinnye héja – ehető rész
export const MelonRindSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const C = { x: 170, y: 175 };
  const s = 8.5;
  return (
    <Frame title="Mennyi az ehető rész?" className={className}>
      <circle cx={C.x} cy={C.y} r={12 * s} fill="#4ade80" stroke={GREEN} strokeWidth="2.4" />
      <circle cx={C.x} cy={C.y} r={10 * s} fill="#fca5a5" stroke={RED} strokeWidth="1.6" />
      <line x1={C.x} y1={C.y} x2={C.x + 10 * s} y2={C.y} stroke={INK} strokeWidth="1.6" />
      <line x1={C.x} y1={C.y} x2={C.x - 12 * s * 0.707} y2={C.y - 12 * s * 0.707} stroke={INK} strokeWidth="1.6" />
      <text x={C.x + 5 * s} y={C.y - 6} fontSize="12" fontWeight="bold" fill={INK} textAnchor="middle">10</text>
      <text x={C.x - 50} y={C.y - 40} fontSize="12" fontWeight="bold" fill={INK}>12</text>
      <text x={C.x + 11 * s + 6} y={C.y + 40} fontSize="11" fill={GREEN} fontWeight="bold">héj 2 cm</text>
      <text x={330} y={100} fontSize="13" fill={INK} fontWeight="bold">24 cm átmérő</text>
      <text x={330} y={130} fontSize="13" fill={INK}>V_belső / V_teljes = (10/12)³</text>
      <text x={330} y={156} fontSize="13" fill={INK}>≈ 0,579 ⇒ 57,9 %</text>
      <text x={330} y={196} fontSize="13" fill={INK}>1 cm-es héjnál: (11/12)³</text>
      <text x={330} y={222} fontSize="13" fill={INK}>≈ 0,770 ⇒ 77,0 %</text>
    </Frame>
  );
};

// 5. ábra: Arkhimédész – a gömb és a köré írt henger
export const ArchimedesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const C = { x: 160, y: 170 };
  const R = 95;
  const ry = R * 0.26;
  return (
    <Frame title="Arkhimédész: gömb a köré írt hengerben" className={className}>
      {/* henger */}
      <line x1={C.x - R} y1={C.y - R} x2={C.x - R} y2={C.y + R} stroke={BLUE} strokeWidth="2" />
      <line x1={C.x + R} y1={C.y - R} x2={C.x + R} y2={C.y + R} stroke={BLUE} strokeWidth="2" />
      <ellipse cx={C.x} cy={C.y - R} rx={R} ry={ry} fill="rgba(37,99,235,0.08)" stroke={BLUE} strokeWidth="2" />
      <HEllipse cx={C.x} cy={C.y + R} rx={R} ry={ry} color={BLUE} w={2} />
      {/* gömb */}
      <circle cx={C.x} cy={C.y} r={R} fill="rgba(234,88,12,0.12)" stroke="#ea580c" strokeWidth="2.2" />
      <HEllipse cx={C.x} cy={C.y} rx={R} ry={ry} color="#fb923c" />
      <line x1={C.x} y1={C.y} x2={C.x + R} y2={C.y} stroke={RED} strokeWidth="1.8" />
      <circle cx={C.x} cy={C.y} r="3" fill={INK} />
      <text x={C.x + R / 2} y={C.y - 6} fontSize="13" fontWeight="bold" fill={RED} textAnchor="middle">r</text>
      <line x1={C.x + R + 18} y1={C.y - R} x2={C.x + R + 18} y2={C.y + R} stroke={INK} strokeWidth="1.2" />
      <text x={C.x + R + 26} y={C.y + 4} fontSize="13" fontWeight="bold" fill={INK}>2r</text>
      <text x={330} y={90} fontSize="12.5" fill={INK} fontWeight="bold">A henger palástja:</text>
      <text x={330} y={110} fontSize="12.5" fill={INK}>2rπ · 2r = 4r²π = A_gömb</text>
      <text x={330} y={150} fontSize="12.5" fill={INK} fontWeight="bold">A henger térfogata:</text>
      <text x={330} y={170} fontSize="12.5" fill={INK}>r²π · 2r = 2r³π</text>
      <text x={330} y={190} fontSize="12.5" fill={INK}>V_gömb = (2/3) · 2r³π = 4r³π / 3</text>
      <text x={330} y={240} fontSize="11.5" fill={AUX}>„A gömbről és hengerről”</text>
      <text x={330} y={256} fontSize="11.5" fill={AUX}>(Arkhimédész, Kr. e. 287–212)</text>
    </Frame>
  );
};

// 6. ábra: a félgömb végű forróvíz-kazán
export const BoilerSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 34;
  const r = 2 * s;
  const L = 3.5 * s;
  const cy = 170;
  const x0 = 280 - L / 2;
  const x1 = 280 + L / 2;
  return (
    <Frame title="Félgömb végű kazán" className={className}>
      <path
        d={`M ${x0} ${cy - r} L ${x1} ${cy - r} A ${r} ${r} 0 0 1 ${x1} ${cy + r} L ${x0} ${cy + r} A ${r} ${r} 0 0 1 ${x0} ${cy - r} Z`}
        fill="rgba(37,99,235,0.1)"
        stroke={BLUE}
        strokeWidth="2.2"
      />
      <path d={`M ${x0} ${cy - r} A ${r * 0.28} ${r} 0 0 0 ${x0} ${cy + r}`} fill="none" stroke={BLUE} strokeWidth="1.5" />
      <path d={`M ${x0} ${cy - r} A ${r * 0.28} ${r} 0 0 1 ${x0} ${cy + r}`} fill="none" stroke={BLUE} strokeWidth="1.2" strokeDasharray="5 4" />
      <path d={`M ${x1} ${cy - r} A ${r * 0.28} ${r} 0 0 0 ${x1} ${cy + r}`} fill="none" stroke={BLUE} strokeWidth="1.5" />
      <path d={`M ${x1} ${cy - r} A ${r * 0.28} ${r} 0 0 1 ${x1} ${cy + r}`} fill="none" stroke={BLUE} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1={x0} y1={cy + r + 22} x2={x1} y2={cy + r + 22} stroke={INK} strokeWidth="1.2" />
      <text x={280} y={cy + r + 38} fontSize="12.5" fontWeight="bold" fill={INK} textAnchor="middle">3,5 m</text>
      <line x1={x1 + r + 18} y1={cy - r} x2={x1 + r + 18} y2={cy + r} stroke={INK} strokeWidth="1.2" />
      <text x={x1 + r + 26} y={cy + 4} fontSize="12.5" fontWeight="bold" fill={INK}>4 m</text>
      <text x={280} y={62} fontSize="12" fill={AUX} textAnchor="middle">henger (r = 2 m, M = 3,5 m) + két félgömb (együtt egy r = 2 m-es gömb)</text>
      <text x={280} y={300} fontSize="12" fill={INK} textAnchor="middle" fontWeight="bold">A = 2rπM + 4r²π = 30π ≈ 94,2 m²; V = r²πM + 4r³π/3 ≈ 77,5 m³</text>
    </Frame>
  );
};
