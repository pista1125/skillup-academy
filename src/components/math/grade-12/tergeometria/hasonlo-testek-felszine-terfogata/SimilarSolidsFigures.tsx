import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';
const INK = '#0f172a';
const AUX = '#64748b';
const RED = '#dc2626';

const r1 = (n: number) => Math.round(n * 10) / 10;

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

/**
 * Ferde (kavalier) vetületű téglatest. (x, y): az elülső lap bal alsó csúcsa; w szélesség, h magasság, d mélység.
 * A takart élek szaggatottak. n > 1 esetén n × n-es rács a látható lapokon (Rubik-kocka).
 */
export const ObliqueBox: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  d: number;
  n?: number;
  stroke?: string;
  fill?: string;
  dashedHidden?: boolean;
  dashAll?: boolean;
}> = ({ x, y, w, h, d, n = 1, stroke = '#334155', fill = 'rgba(59,130,246,0.12)', dashedHidden = true, dashAll = false }) => {
  const dx = d * 0.5;
  const dy = -d * 0.38;
  const P = (px: number, py: number) => `${r1(px)},${r1(py)}`;
  const grid: React.ReactNode[] = [];
  for (let i = 1; i < n; i++) {
    const t = i / n;
    // elülső lap
    grid.push(<line key={`fv${i}`} x1={x + w * t} y1={y} x2={x + w * t} y2={y - h} stroke={stroke} strokeWidth="0.8" />);
    grid.push(<line key={`fh${i}`} x1={x} y1={y - h * t} x2={x + w} y2={y - h * t} stroke={stroke} strokeWidth="0.8" />);
    // fedőlap
    grid.push(<line key={`tv${i}`} x1={x + w * t} y1={y - h} x2={x + w * t + dx} y2={y - h + dy} stroke={stroke} strokeWidth="0.8" />);
    grid.push(<line key={`th${i}`} x1={x + dx * t} y1={y - h + dy * t} x2={x + w + dx * t} y2={y - h + dy * t} stroke={stroke} strokeWidth="0.8" />);
    // jobb oldallap
    grid.push(<line key={`rv${i}`} x1={x + w + dx * t} y1={y + dy * t} x2={x + w + dx * t} y2={y - h + dy * t} stroke={stroke} strokeWidth="0.8" />);
    grid.push(<line key={`rh${i}`} x1={x + w} y1={y - h * t} x2={x + w + dx} y2={y - h * t + dy} stroke={stroke} strokeWidth="0.8" />);
  }
  return (
    <g>
      <polygon points={`${P(x, y)} ${P(x + w, y)} ${P(x + w, y - h)} ${P(x, y - h)}`} fill={fill} stroke="none" />
      <polygon points={`${P(x, y - h)} ${P(x + w, y - h)} ${P(x + w + dx, y - h + dy)} ${P(x + dx, y - h + dy)}`} fill={fill} stroke="none" />
      <polygon points={`${P(x + w, y)} ${P(x + w + dx, y + dy)} ${P(x + w + dx, y - h + dy)} ${P(x + w, y - h)}`} fill={fill} stroke="none" />
      {grid}
      {dashedHidden && (
        <g stroke={stroke} strokeWidth="1" strokeDasharray="4 3" opacity="0.7">
          <line x1={x + dx} y1={y + dy} x2={x} y2={y} />
          <line x1={x + dx} y1={y + dy} x2={x + w + dx} y2={y + dy} />
          <line x1={x + dx} y1={y + dy} x2={x + dx} y2={y - h + dy} />
        </g>
      )}
      <g stroke={stroke} strokeWidth={dashAll ? 1.4 : 1.8} fill="none" strokeLinejoin="round" strokeDasharray={dashAll ? '5 3' : undefined}>
        <polygon points={`${P(x, y)} ${P(x + w, y)} ${P(x + w, y - h)} ${P(x, y - h)}`} />
        <polyline points={`${P(x, y - h)} ${P(x + dx, y - h + dy)} ${P(x + w + dx, y - h + dy)} ${P(x + w, y - h)}`} />
        <polyline points={`${P(x + w, y)} ${P(x + w + dx, y + dy)} ${P(x + w + dx, y - h + dy)}`} />
      </g>
    </g>
  );
};

// 1. ábra: a Rubik-kockák (1×1×1, 2×2×2, 3×3×3, 4×4×4)
export const RubikCubesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 18;
  const data = [
    { n: 1, x: 40 },
    { n: 2, x: 95 },
    { n: 3, x: 180 },
    { n: 4, x: 300 }
  ];
  const colors = ['rgba(239,68,68,0.25)', 'rgba(34,197,94,0.22)', 'rgba(59,130,246,0.2)', 'rgba(234,179,8,0.25)'];
  return (
    <Frame title="Kis kockákból épített kockák" className={className}>
      {data.map((c, i) => (
        <g key={c.n}>
          <ObliqueBox x={c.x} y={230} w={c.n * u} h={c.n * u} d={c.n * u} n={c.n} fill={colors[i]} />
          <text x={c.x + (c.n * u) / 2} y={252} fontSize="12" fontWeight="bold" fill={INK} textAnchor="middle">
            {c.n} × {c.n} × {c.n}
          </text>
        </g>
      ))}
      <text x={470} y={110} fontSize="12" fill={INK} fontWeight="bold">k = 4 esetén:</text>
      <text x={470} y={132} fontSize="12" fill={INK}>felszín: 16×</text>
      <text x={470} y={152} fontSize="12" fill={INK}>térfogat: 64×</text>
      <text x={280} y={292} fontSize="12" fill={AUX} textAnchor="middle">
        A felszínek aránya k², a térfogatok aránya k³ (k: az élek aránya)
      </text>
    </Frame>
  );
};

// 2. ábra: k, k², k³ – szakasz, négyzet, kocka
export const RatioPowersSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  return (
    <Frame title="Hosszúság k-szoros ⇒ terület k², térfogat k³" className={className}>
      {/* szakasz */}
      <line x1={40} y1={120} x2={70} y2={120} stroke={INK} strokeWidth="3" />
      <line x1={40} y1={160} x2={100} y2={160} stroke={RED} strokeWidth="3" />
      <text x={110} y={124} fontSize="12" fill={INK}>1</text>
      <text x={110} y={164} fontSize="12" fill={RED} fontWeight="bold">k = 2</text>
      <text x={70} y={210} fontSize="12" fill={INK} textAnchor="middle" fontWeight="bold">hossz: k</text>
      {/* négyzet */}
      <rect x={170} y={95} width={30} height={30} fill="rgba(59,130,246,0.2)" stroke={INK} strokeWidth="1.5" />
      <rect x={215} y={95} width={60} height={60} fill="rgba(239,68,68,0.15)" stroke={RED} strokeWidth="1.5" />
      <line x1={245} y1={95} x2={245} y2={155} stroke={RED} strokeWidth="0.8" />
      <line x1={215} y1={125} x2={275} y2={125} stroke={RED} strokeWidth="0.8" />
      <text x={222} y={210} fontSize="12" fill={INK} textAnchor="middle" fontWeight="bold">terület: k² = 4</text>
      {/* kocka */}
      <ObliqueBox x={330} y={160} w={30} h={30} d={30} />
      <ObliqueBox x={390} y={190} w={60} h={60} d={60} n={2} stroke={RED} fill="rgba(239,68,68,0.12)" />
      <text x={420} y={250} fontSize="12" fill={INK} textAnchor="middle" fontWeight="bold">térfogat: k³ = 8</text>
      <text x={280} y={292} fontSize="12" fill={AUX} textAnchor="middle">
        K′/K = k, T′/T = k², A′/A = k², V′/V = k³
      </text>
    </Frame>
  );
};

/** Ferde vetületű henger. */
const Cyl: React.FC<{ cx: number; by: number; r: number; m: number; color: string; lr: string; lm: string }> = ({ cx, by, r, m, color, lr, lm }) => {
  const ry = r * 0.3;
  return (
    <g>
      <rect x={cx - r} y={by - m} width={2 * r} height={m} fill={`${color}22`} stroke="none" />
      <path d={`M ${cx - r} ${by} A ${r} ${ry} 0 0 1 ${cx + r} ${by}`} fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="4 3" />
      <path d={`M ${cx - r} ${by} A ${r} ${ry} 0 0 0 ${cx + r} ${by}`} fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx={cx} cy={by - m} rx={r} ry={ry} fill={`${color}33`} stroke={color} strokeWidth="2" />
      <line x1={cx - r} y1={by} x2={cx - r} y2={by - m} stroke={color} strokeWidth="2" />
      <line x1={cx + r} y1={by} x2={cx + r} y2={by - m} stroke={color} strokeWidth="2" />
      <line x1={cx} y1={by} x2={cx + r} y2={by} stroke={RED} strokeWidth="1.5" />
      <text x={cx + r / 2} y={by - 5} fontSize="12" fontWeight="bold" fill={RED} textAnchor="middle">{lr}</text>
      <text x={cx + r + 8} y={by - m / 2} fontSize="12" fontWeight="bold" fill={INK}>{lm}</text>
    </g>
  );
};

// 3. ábra: a henger k-szoros nagyítása
export const CylinderScaleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="A henger k-szoros nagyítása" className={className}>
    <Cyl cx={120} by={240} r={36} m={80} color="#2563eb" lr="r" lm="M" />
    <text x={200} y={170} fontSize="20" fill={AUX}>→</text>
    <Cyl cx={330} by={250} r={72} m={160} color="#7c3aed" lr="k · r" lm="k · M" />
    <text x={280} y={292} fontSize="12" fill={INK} textAnchor="middle">
      A′ = k² · (2r²π + 2rπM) = k² · A; V′ = (kr)²π · kM = k³ · V
    </text>
  </Frame>
);

// 4. ábra: kocka alakú üreg a betonkockában
export const ConcreteCubeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <Frame title="Üreg a betonkockában" className={className}>
    <ObliqueBox x={100} y={265} w={150} h={150} d={150} fill="rgba(148,163,184,0.25)" />
    <ObliqueBox x={156} y={204} w={75} h={75} d={75} stroke={RED} fill="rgba(239,68,68,0.1)" dashedHidden={false} dashAll />
    <text x={175} y={286} fontSize="12" fontWeight="bold" fill={INK} textAnchor="middle">126 cm</text>
    <text x={194} y={196} fontSize="12" fontWeight="bold" fill={RED} textAnchor="middle">63 cm</text>
    <text x={410} y={100} fontSize="12.5" fill={INK} fontWeight="bold">k = 63 / 126 = 1/2</text>
    <text x={410} y={124} fontSize="12.5" fill={INK}>V_üreg / V_kocka = 1/8</text>
    <text x={410} y={156} fontSize="12.5" fill={INK}>V_üreg / V_maradék</text>
    <text x={410} y={176} fontSize="12.5" fill={RED} fontWeight="bold">= 1 / (8 − 1) = 1/7</text>
  </Frame>
);

// 5. ábra: marcipángolyó a csokoládémázas bonbonban
export const BonbonSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const s = 5;
  return (
    <Frame title="Marcipángolyó csokoládémázban" className={className}>
      <circle cx={170} cy={170} r={15 * s} fill="#78350f" stroke="#451a03" strokeWidth="2" />
      <circle cx={170} cy={170} r={11 * s} fill="#fde68a" stroke="#b45309" strokeWidth="1.6" />
      <line x1={170 - 11 * s} y1={170} x2={170 + 11 * s} y2={170} stroke={INK} strokeWidth="1.4" />
      <text x={170} y={164} fontSize="12" fontWeight="bold" fill={INK} textAnchor="middle">22 mm</text>
      <line x1={170 - 15 * s} y1={260} x2={170 + 15 * s} y2={260} stroke={INK} strokeWidth="1.2" />
      <line x1={170 - 15 * s} y1={254} x2={170 - 15 * s} y2={266} stroke={INK} strokeWidth="1.2" />
      <line x1={170 + 15 * s} y1={254} x2={170 + 15 * s} y2={266} stroke={INK} strokeWidth="1.2" />
      <text x={170} y={280} fontSize="12" fontWeight="bold" fill={INK} textAnchor="middle">30 mm</text>
      <text x={320} y={100} fontSize="12.5" fill={INK} fontWeight="bold">A két gömb hasonló:</text>
      <text x={320} y={124} fontSize="12.5" fill={INK}>k = 30 / 22 ≈ 1,364</text>
      <text x={320} y={148} fontSize="12.5" fill={INK}>V_bonbon / V_marcipán = k³ ≈ 2,54</text>
      <text x={320} y={180} fontSize="12.5" fill={INK}>máz = V_bonbon − V_marcipán</text>
      <text x={320} y={204} fontSize="12.5" fill={INK}>340 db ⇒ ≈ 2,91 dm³ csokoládé</text>
    </Frame>
  );
};

// 6. ábra: a csokis minyon és háromszoros nagyítása
export const MinyonSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const u = 9;
  return (
    <Frame title="Minyon és „óriás minyon” (k = 3)" className={className}>
      <ObliqueBox x={50} y={220} w={4 * u} h={2.5 * u} d={3 * u} fill="rgba(236,72,153,0.2)" stroke="#9d174d" />
      <text x={68} y={240} fontSize="11" fontWeight="bold" fill={INK} textAnchor="middle">4 × 3 × 2,5 cm</text>
      <ObliqueBox x={200} y={260} w={12 * u} h={7.5 * u} d={9 * u} fill="rgba(236,72,153,0.15)" stroke="#9d174d" />
      <text x={254} y={282} fontSize="11" fontWeight="bold" fill={INK} textAnchor="middle">12 × 9 × 7,5 cm</text>
      <text x={300} y={70} fontSize="12.5" fill={INK} fontWeight="bold">A = 59 cm² → 9 · 59 = 531 cm²</text>
      <text x={300} y={94} fontSize="12.5" fill={INK} fontWeight="bold">V = 30 cm³ → 27 · 30 = 810 cm³</text>
      <text x={400} y={180} fontSize="12" fill={AUX}>élek: × 3</text>
      <text x={400} y={200} fontSize="12" fill={AUX}>felszín: × 9</text>
      <text x={400} y={220} fontSize="12" fill={AUX}>térfogat: × 27</text>
    </Frame>
  );
};
