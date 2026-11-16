import React from 'react';
import { KLine, KText, KPoly, KCyl, K_RED, K_BLUE, K_GREEN, K_PURPLE, K_EDGE, K_FILL } from './figKit';

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

// 1. ábra: a két májkrémkonzerv
export const TwoCansSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 14;
  return (
    <Frame title="Két hasonló konzervdoboz: minden méret kétszeres" className={className}>
      <KCyl cx={110} by={220} rx={2.5 * k} ry={10} h={3 * k} />
      <KLine a={[110, 220]} b={[110 + 2.5 * k, 220]} c={K_GREEN} w={2} />
      <KText p={[110 + 1.25 * k, 232]} t="2,5 cm" s={10.5} c={K_GREEN} />
      <KText p={[110 + 2.5 * k + 22, 220 - 1.5 * k]} t="3 cm" s={10.5} c={K_BLUE} />
      <text x="110" y="262" fontSize="11" textAnchor="middle" fill="#334155">A = 27,5π ≈ 86,4 cm²</text>
      <text x="110" y="278" fontSize="11" textAnchor="middle" fill="#334155">V = 18,75π cm³, 65 g</text>
      <KCyl cx={320} by={220} rx={5 * k} ry={20} h={6 * k} />
      <KLine a={[320, 220]} b={[320 + 5 * k, 220]} c={K_GREEN} w={2} />
      <KText p={[320 + 2.5 * k, 232]} t="5 cm" s={10.5} c={K_GREEN} />
      <KText p={[320 + 5 * k + 18, 220 - 3 * k]} t="6 cm" s={10.5} c={K_BLUE} />
      <text x="320" y="262" fontSize="11" textAnchor="middle" fill="#334155">A = 110π (4-szeres)</text>
      <text x="320" y="278" fontSize="11" textAnchor="middle" fill="#334155">V = 150π (8-szoros): 520 g</text>
    </Frame>
  );
};

// 2. ábra: a henger hálója
export const CylinderNetSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const r = 30;
  const W = 2 * Math.PI * r;
  const M = 100;
  const x0 = 100;
  const y0 = 108;
  return (
    <Frame title="A henger hálója: két körlap és egy 2rπ × M-es téglalap" className={className}>
      <KPoly p={[[x0, y0], [x0 + W, y0], [x0 + W, y0 + M], [x0, y0 + M]]} fill="#fef3c7" c={K_EDGE} w={1.8} />
      <circle cx={x0 + 40} cy={y0 - r} r={r} fill={K_FILL} stroke={K_EDGE} strokeWidth="1.8" />
      <circle cx={x0 + 40} cy={y0 + M + r} r={r} fill={K_FILL} stroke={K_EDGE} strokeWidth="1.8" />
      <KLine a={[x0 + 40, y0 - r]} b={[x0 + 40 + r, y0 - r]} c={K_GREEN} w={2} />
      <KText p={[x0 + 40 + r / 2, y0 - r - 9]} t="r" c={K_GREEN} />
      <KText p={[x0 + W / 2 + 30, y0 + M / 2]} t="T(palást) = 2rπ · M" s={12} c="#92400e" />
      <KLine a={[x0 + 4, y0 + M - 10]} b={[x0 + W - 4, y0 + M - 10]} c={K_RED} w={1.4} />
      <KText p={[x0 + W / 2 + 30, y0 + M - 22]} t="2rπ" s={12} c={K_RED} />
      <KLine a={[x0 + W + 14, y0]} b={[x0 + W + 14, y0 + M]} c={K_PURPLE} w={1.4} />
      <KText p={[x0 + W + 28, y0 + M / 2]} t="M" s={12} c={K_PURPLE} />
      <text x="240" y="288" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0f172a">
        A = 2r²π + 2rπM = 2rπ(r + M), V = r²π · M
      </text>
    </Frame>
  );
};

// 3. ábra: A4-es karton kivágása
export const CardboardCutSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 10; // px / cm
  const x0 = 70;
  const y0 = 50;
  const r = 4;
  return (
    <Frame title="A4-es karton (29,7 × 21 cm): palást és két körlap" className={className}>
      <rect x={x0} y={y0} width={29.7 * k} height={21 * k * 0.95} fill="#f1f5f9" stroke={K_EDGE} strokeWidth="1.8" />
      <rect x={x0} y={y0 + 2 * r * k * 0.95} width={2 * r * Math.PI * k} height={(21 - 2 * r) * k * 0.95} fill="#fef3c7" stroke="#b45309" strokeWidth="1.6" />
      <circle cx={x0 + r * k} cy={y0 + r * k * 0.95} r={r * k * 0.95} fill={K_FILL} stroke={K_EDGE} strokeWidth="1.6" />
      <circle cx={x0 + 3 * r * k} cy={y0 + r * k * 0.95} r={r * k * 0.95} fill={K_FILL} stroke={K_EDGE} strokeWidth="1.6" />
      <KText p={[x0 + 29.7 * k * 0.5, y0 - 9]} t="29,7" s={11} c={K_BLUE} />
      <KText p={[x0 + 29.7 * k + 14, y0 + 10 * k]} t="21" s={11} c={K_BLUE} />
      <KText p={[x0 + r * Math.PI * k, y0 + (2 * r + 6.5) * k * 0.95]} t="2rπ × (21 − 2r)" s={11.5} c="#92400e" />
      <KText p={[x0 + 2 * r * k, y0 + r * k * 0.95]} t="r" s={11} c={K_GREEN} />
      <text x="420" y="240" fontSize="10.5" textAnchor="end" fill="#334155">a rajzon r = 4 cm</text>
    </Frame>
  );
};

// 4. ábra: festőhenger
export const PaintRollerSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  return (
    <Frame title="Festőhenger: egy fordulat = a palást területe" className={className}>
      <rect x="40" y="50" width="180" height="230" fill="#f1f5f9" stroke="#94a3b8" />
      <rect x="40" y="68" width="180" height="113" fill="#38bdf8" fillOpacity="0.45" />
      <rect x="40" y="181" width="180" height="28" fill="#fde68a" stroke={K_EDGE} strokeWidth="1.6" />
      <ellipse cx="220" cy="195" rx="6" ry="14" fill="#fcd34d" stroke={K_EDGE} strokeWidth="1.6" />
      <KLine a={[130, 209]} b={[130, 262]} c={K_EDGE} w={3} />
      <KText p={[130, 62]} t="20 cm" s={11} c={K_BLUE} />
      <KText p={[130, 125]} t="2rπ ≈ 12,57 cm" s={10.5} c={K_RED} />
      <text x="290" y="90" fontSize="12" fill="#334155">r = 2 cm, szélesség 20 cm</text>
      <text x="290" y="110" fontSize="12" fill="#334155">1 fordulat: 2 · 2 · π · 20</text>
      <text x="290" y="128" fontSize="12.5" fontWeight="bold" fill="#0f172a">= 80π ≈ 251,3 cm² → 3 ml</text>
      <text x="290" y="160" fontSize="12" fill="#334155">40 m² = 400 000 cm²</text>
      <text x="290" y="178" fontSize="12" fill="#334155">≈ 1591,5 fordulat</text>
      <text x="290" y="200" fontSize="12.5" fontWeight="bold" fill={K_RED}>≈ 4,77 liter festék</text>
      <text x="290" y="232" fontSize="12" fill="#334155">16 cm-es vödörben:</text>
      <text x="290" y="250" fontSize="12.5" fontWeight="bold" fill="#0f172a">4775 : 64π ≈ 23,7 cm</text>
    </Frame>
  );
};

// 5. ábra: a koncertterem alaprajza
export const ConcertHallSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const k = 11;
  const x0 = 50;
  const y0 = 80;
  const L = 22 * k;
  const W = 12 * k;
  return (
    <Frame title="Koncertterem alaprajza: téglalap + félkör, 4,5 m magas" className={className}>
      <path d={`M ${x0} ${y0} L ${x0 + L} ${y0} A ${W / 2} ${W / 2} 0 0 1 ${x0 + L} ${y0 + W} L ${x0} ${y0 + W} Z`} fill="#e0e7ff" stroke={K_EDGE} strokeWidth="2" />
      <KLine a={[x0 + L, y0]} b={[x0 + L, y0 + W]} c="#94a3b8" w={1.2} dash />
      <KText p={[x0 + L / 2, y0 + W + 14]} t="22 m" s={11} c={K_BLUE} />
      <KText p={[x0 - 16, y0 + W / 2]} t="12 m" s={11} c={K_BLUE} />
      {[0.15, 0.4, 0.65, 0.88].map((t, i) => (
        <rect key={i} x={x0 + t * L - 11} y={y0 + W - 3} width="22" height="6" fill="#92400e" />
      ))}
      <text x="40" y="262" fontSize="11.5" fill="#334155">falak: (2 · 22 + 12 + 6π) · 4,5 ≈ 336,8 m²; mennyezet: 264 + 18π ≈ 320,5 m²</text>
      <text x="40" y="280" fontSize="12" fontWeight="bold" fill="#0f172a">4 ajtó (20 m²) nélkül: ≈ 637,4 m²</text>
    </Frame>
  );
};
