import React from 'react';
import { P2, KLine, KText, KPoly, KRight, KCyl, kMid, K_RED, K_BLUE, K_GREEN, K_PURPLE, K_EDGE, K_AMBER } from './figKit';

type FigProps = { className?: string };
const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ title: string; children: React.ReactNode; className: string; h?: number }> = ({ title, children, className, h = 300 }) => (
  <svg viewBox={`0 0 480 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width="472" height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x="240" y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

// 1. ábra: a forgáshenger részei
export const CylinderPartsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cx = 170;
  const by = 245;
  const rx = 80;
  const ry = 24;
  const h = 170;
  const ty = by - h;
  return (
    <Frame title="Az egyenes körhenger (forgáshenger) részei" className={className}>
      <KCyl cx={cx} by={by} rx={rx} ry={ry} h={h} axis />
      <KPoly p={[[cx - rx, ty], [cx + rx, ty], [cx + rx, by], [cx - rx, by]]} fill="#fde68a" op={0.35} c={K_AMBER} w={1.4} dash />
      <KLine a={[cx - rx * 0.55, ty + ry * 0.83]} b={[cx - rx * 0.55, by + ry * 0.83]} c={K_RED} w={2.4} />
      <KLine a={[cx, ty]} b={[cx + rx, ty]} c={K_GREEN} w={2} />
      <KText p={[cx + rx / 2, ty - 9]} t="r" c={K_GREEN} />
      <KText p={[cx + rx + 14, (ty + by) / 2]} t="m" c={K_BLUE} />
      <text x="290" y="64" fontSize="12" fontWeight="bold" fill={K_PURPLE}>tengely: a két körlap</text>
      <text x="290" y="80" fontSize="12" fontWeight="bold" fill={K_PURPLE}>középpontjait összeköti</text>
      <text x="290" y="108" fontSize="12" fontWeight="bold" fill="#4338ca">fedőlap és alaplap:</text>
      <text x="290" y="124" fontSize="11.5" fill="#334155">egybevágó, párhuzamos körlapok</text>
      <text x="290" y="152" fontSize="12" fontWeight="bold" fill={K_RED}>alkotó: a palást merőleges</text>
      <text x="290" y="168" fontSize="12" fontWeight="bold" fill={K_RED}>szakasza, hossza = m</text>
      <text x="290" y="196" fontSize="12" fontWeight="bold" fill="#b45309">tengelymetszet: 2r × m-es</text>
      <text x="290" y="212" fontSize="12" fontWeight="bold" fill="#b45309">téglalap</text>
    </Frame>
  );
};

// 2. ábra: téglalap forgatása az egyik oldala körül
export const RectangleRotationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const ax = 120;
  const by = 240;
  const h = 150;
  const r = 70;
  return (
    <Frame title="Téglalap megforgatása az egyik oldalegyenese körül" className={className}>
      <KLine a={[ax, by + 22]} b={[ax, by - h - 22]} c={K_PURPLE} w={1.4} dash />
      <KPoly p={[[ax, by - h], [ax + r, by - h], [ax + r, by], [ax, by]]} fill="#c7d2fe" c={K_EDGE} w={2} />
      <KRight v={[ax, by]} p1={[ax + r, by]} p2={[ax, by - h]} r={11} />
      <KText p={[ax + r / 2, by + 14]} t="r" c={K_GREEN} />
      <KText p={[ax + r + 12, by - h / 2]} t="m" c={K_BLUE} />
      <path d={`M ${ax + r + 14} ${by - h - 4} A 70 16 0 0 1 ${ax - 30} ${by - h - 6}`} fill="none" stroke={K_AMBER} strokeWidth="2" />
      <polygon points={`${ax - 30},${by - h - 6} ${ax - 20},${by - h - 14} ${ax - 18},${by - h - 1}`} fill={K_AMBER} />
      <text x={ax} y={by + 40} fontSize="11.5" textAnchor="middle" fill="#334155">forgástengely</text>
      <text x="230" y="150" fontSize="22" fontWeight="bold" fill="#94a3b8">⟹</text>
      <KCyl cx={360} by={by} rx={r} ry={20} h={h} axis />
      <KLine a={[360, by]} b={[360 + r, by]} c={K_GREEN} w={2} />
      <KText p={[360 + r / 2, by + 14]} t="r" c={K_GREEN} />
      <KText p={[360 + r + 12, by - h / 2]} t="m" c={K_BLUE} />
    </Frame>
  );
};

// 3. ábra: az A4-es lap kétféle összeragasztása
export const PaperRollSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  return (
    <Frame title="Az A4-es lapból (21 × 29,5 cm) kétféle henger" className={className}>
      <KPoly p={[[40, 60], [103, 60], [103, 148], [40, 148]]} fill="#fef3c7" c={K_EDGE} w={1.8} />
      <KLine a={[40, 60]} b={[40, 148]} c={K_RED} w={3} />
      <KLine a={[103, 60]} b={[103, 148]} c={K_RED} w={3} />
      <KText p={[71, 52]} t="21" s={10.5} c={K_BLUE} />
      <KText p={[118, 104]} t="29,5" s={10.5} c={K_BLUE} />
      <text x="72" y="170" fontSize="10.5" textAnchor="middle" fill="#334155">a hosszabb oldalakat</text>
      <text x="72" y="184" fontSize="10.5" textAnchor="middle" fill="#334155">ragasztjuk össze</text>
      <KCyl cx={190} by={250} rx={24} ry={8} h={140} />
      <text x="190" y="276" fontSize="11" textAnchor="middle" fill="#334155">2rπ = 21, m = 29,5</text>
      <KPoly p={[[270, 80], [358, 80], [358, 143], [270, 143]]} fill="#fef3c7" c={K_EDGE} w={1.8} />
      <KLine a={[270, 80]} b={[270, 143]} c={K_RED} w={3} />
      <KLine a={[358, 80]} b={[358, 143]} c={K_RED} w={3} />
      <KText p={[314, 72]} t="29,5" s={10.5} c={K_BLUE} />
      <KText p={[370, 112]} t="21" s={10.5} c={K_BLUE} />
      <text x="314" y="166" fontSize="10.5" textAnchor="middle" fill="#334155">a rövidebb oldalakat</text>
      <text x="314" y="180" fontSize="10.5" textAnchor="middle" fill="#334155">ragasztjuk össze</text>
      <KCyl cx={420} by={250} rx={34} ry={11} h={95} />
      <text x="410" y="276" fontSize="11" textAnchor="middle" fill="#334155">2rπ = 29,5, m = 21</text>
    </Frame>
  );
};

// 4. ábra: a fakanál a fazékban – tengelymetszet átlója
export const SpoonInPotSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 6;
  const cx = 130;
  const by = 260;
  const r = 8 * k;
  const h = 32 * k;
  const A: P2 = [cx - r, by];
  const C: P2 = [cx + r, by - h];
  const B: P2 = [cx + r, by];
  return (
    <Frame title="A leghosszabb fakanál: a tengelymetszet átlója" className={className}>
      <KCyl cx={cx} by={by} rx={r} ry={14} h={h} />
      <KPoly p={[[cx - r, by - h], [cx + r, by - h], [cx + r, by], [cx - r, by]]} fill="#fde68a" op={0.35} c={K_AMBER} w={1.3} dash />
      <KLine a={A} b={C} c={K_RED} w={3} />
      <KRight v={B} p1={A} p2={C} r={10} />
      <KText p={[cx, by + 26]} t="2r = 16 cm" s={11} c={K_GREEN} />
      <KText p={[cx + r + 28, by - h / 2]} t="32 cm" s={11} c={K_BLUE} />
      <text x="260" y="110" fontSize="12" fill="#334155">A kanál a tengelymetszet</text>
      <text x="260" y="126" fontSize="12" fill="#334155">téglalapjának átlója mentén fér el:</text>
      <text x="260" y="160" fontSize="13" fontWeight="bold" fill={K_RED}>d = √(16² + 32²)</text>
      <text x="260" y="180" fontSize="13" fontWeight="bold" fill={K_RED}>= √1280 ≈ 35,78 cm</text>
    </Frame>
  );
};

// 5. ábra: a lámpaernyő fémkerete felülnézetben
export const LampShadeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const c: P2 = [140, 160];
  const k = 7;
  const R = 15 * k;
  const r = 3 * k;
  const spokes = [90, 210, 330].map((d) => (d * Math.PI) / 180);
  return (
    <Frame title="A lámpaernyő kerete felülnézetben" className={className}>
      <circle cx={c[0]} cy={c[1]} r={R} fill="#fef9c3" stroke={K_EDGE} strokeWidth="2.2" />
      <circle cx={c[0]} cy={c[1]} r={r} fill="#fde68a" stroke={K_RED} strokeWidth="2" />
      {spokes.map((t, i) => {
        const a: P2 = [c[0] + r * Math.cos(t), c[1] - r * Math.sin(t)];
        const b: P2 = [c[0] + R * Math.cos(t), c[1] - R * Math.sin(t)];
        return (
          <g key={i}>
            <KLine a={a} b={b} c={K_BLUE} w={2.4} />
            <KText p={[kMid(a, b)[0] + (i === 0 ? 18 : 0), kMid(a, b)[1] + (i === 0 ? 0 : 12)]} t="12" s={10.5} c={K_BLUE} />
          </g>
        );
      })}
      <text x="290" y="80" fontSize="12" fill="#334155">palást: 2Rπ · 20 = 1885 cm²</text>
      <text x="290" y="100" fontSize="12" fill="#334155">⇒ 2Rπ ≈ 94,25 cm</text>
      <text x="290" y="124" fontSize="12.5" fontWeight="bold" fill="#0f172a">R ≈ 15 cm</text>
      <text x="290" y="158" fontSize="12" fill="#334155">belső kör sugara:</text>
      <text x="290" y="178" fontSize="12.5" fontWeight="bold" fill={K_RED}>r = 15 − 12 = 3 cm</text>
      <text x="290" y="204" fontSize="12.5" fontWeight="bold" fill={K_RED}>átmérő: 6 cm</text>
    </Frame>
  );
};
