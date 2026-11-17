import React from 'react';
import { WrittenMulG3ColumnG } from './WrittenMulG3Column';
import { WrittenAddG3ColumnG } from '../../irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Column';

const FONT = 'system-ui, Segoe UI, sans-serif';
const INK = '#0f172a';
const C_SZ = '#ef4444';
const C_T = '#3b82f6';
const C_E = '#facc15';

type Fig = React.FC<{ className?: string }>;
const cls = (c?: string, def = 'w-full max-w-[420px] h-auto mx-auto') => c ?? def;

/** A szorzás részeinek neve: 321 · 3 = 963 (szorzandó, szorzó, szorzat, tényezők). */
export const WrittenMulNamesSvg: Fig = ({ className }) => (
  <svg viewBox="0 0 380 190" className={cls(className, 'w-full max-w-[400px] h-auto mx-auto')} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="378" height="188" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <WrittenMulG3ColumnG x={120} y={16} a={321} m={3} result={963} cell={40} />
    <text x="110" y="75" textAnchor="end" fontSize="17" fontWeight="bold" fill="#7c3aed">szorzandó →</text>
    <text x="296" y="75" fontSize="17" fontWeight="bold" fill="#c2410c">← szorzó</text>
    <text x="110" y="118" textAnchor="end" fontSize="17" fontWeight="bold" fill="#1d4ed8">szorzat →</text>
    <rect x="70" y="148" width="240" height="30" rx="10" fill="#ede9fe" stroke="#a78bfa" />
    <text x="190" y="169" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#4c1d95">tényezők: a 321 és a 3</text>
  </svg>
);

const Disc: React.FC<{ cx: number; cy: number; fill: string; ring?: boolean }> = ({ cx, cy, fill, ring }) => (
  <g>
    {ring && <circle cx={cx} cy={cy} r="11" fill="none" stroke="#16a34a" strokeWidth="2.5" />}
    <circle cx={cx} cy={cy} r="7" fill={fill} stroke="#334155" strokeWidth="1" />
  </g>
);

/** 126 · 3 korongokkal: 3 százas, 6 tízes, 18 egyes → 10 egyest beváltunk 1 tízesre → 378. */
export const WrittenMulDiscsSvg: Fig = ({ className }) => {
  const colX = [20, 140, 260];
  const heads = [
    { l: 'sz', f: '#f87171', c: '#7f1d1d' },
    { l: 't', f: '#60a5fa', c: '#0c2d6b' },
    { l: 'e', f: '#facc15', c: '#713f12' }
  ];
  const grid = (x0: number, y0: number, n: number, fill: string, per = 5, step = 18) =>
    Array.from({ length: n }).map((_, i) => <Disc key={`${x0}-${i}`} cx={x0 + (i % per) * step} cy={y0 + Math.floor(i / per) * step} fill={fill} />);
  return (
    <svg viewBox="0 0 400 300" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="398" height="298" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {heads.map((h, i) => (
        <g key={h.l}>
          <rect x={colX[i]} y="10" width="120" height="24" fill={h.f} stroke="#fff" strokeWidth="2" />
          <text x={colX[i] + 60} y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill={h.c}>{h.l}</text>
        </g>
      ))}
      <rect x="20" y="34" width="360" height="40" fill="#fff" stroke="#334155" strokeWidth="1.5" />
      <line x1="140" y1="34" x2="140" y2="74" stroke="#334155" strokeWidth="1.5" />
      <line x1="260" y1="34" x2="260" y2="74" stroke="#334155" strokeWidth="1.5" />
      {grid(36, 54, 1, C_SZ)}
      {grid(156, 54, 2, C_T)}
      {grid(276, 54, 6, C_E, 6, 17)}
      {colX.map((x) => (
        <g key={`ar${x}`}>
          <line x1={x + 40} y1="78" x2={x + 40} y2="102" stroke="#ea580c" strokeWidth="2.5" />
          <polygon points={`${x + 40},108 ${x + 35},100 ${x + 45},100`} fill="#ea580c" />
          <text x={x + 50} y="97" fontSize="15" fontWeight="bold" fill="#c2410c">· 3</text>
        </g>
      ))}
      <rect x="20" y="110" width="360" height="110" fill="#fff" stroke="#334155" strokeWidth="1.5" />
      <line x1="140" y1="110" x2="140" y2="220" stroke="#334155" strokeWidth="1.5" />
      <line x1="260" y1="110" x2="260" y2="220" stroke="#334155" strokeWidth="1.5" />
      {grid(36, 128, 3, C_SZ)}
      {grid(156, 128, 6, C_T)}
      <Disc cx={236} cy={200} fill={C_T} ring />
      {grid(278, 128, 18, C_E)}
      <rect x="267" y="117" width="94" height="40" rx="12" fill="none" stroke="#16a34a" strokeWidth="2.5" />
      <path d="M 267 145 Q 250 190 249 198" fill="none" stroke="#16a34a" strokeWidth="2.5" />
      <polygon points="249,206 244,196 254,197" fill="#16a34a" />
      <text x="200" y="248" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">10 egyes = 1 tízes</text>
      <text x="200" y="280" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>3 sz + 7 t + 8 e = 378</text>
    </svg>
  );
};

/** 178 · 4 három lépésben: egyesek, tízesek, százasok. */
export const WrittenMulStepsSvg: Fig = ({ className }) => {
  const panels = [
    { x: 14, title: '1. egyesek', res: '  2', car: [null, 3], hl: 0, l1: '4 · 8 = 32', l2: 'leírom: 2, maradt 3' },
    { x: 174, title: '2. tízesek', res: ' 12', car: [null, 3, 3], hl: 1, l1: '4 · 7 + 3 = 31', l2: 'leírom: 1, maradt 3' },
    { x: 334, title: '3. százasok', res: '712', car: [null, 3, 3], hl: 2, l1: '4 · 1 + 3 = 7', l2: 'leírom: 7' }
  ];
  return (
    <svg viewBox="0 0 480 220" className={cls(className, 'w-full max-w-[480px] h-auto mx-auto')} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="478" height="218" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {panels.map((p) => (
        <g key={p.title}>
          <text x={p.x + 64} y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#7c3aed">{p.title}</text>
          <WrittenMulG3ColumnG x={p.x} y={40} a={178} m={4} result={p.res} carries={p.car} carryRow highlight={p.hl} />
          <text x={p.x + 64} y="172" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{p.l1}</text>
          <text x={p.x + 64} y="196" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">{p.l2}</text>
        </g>
      ))}
    </svg>
  );
};

/** 162 · 4: becslés → számolás → ellenőrzés összeadással. */
export const WrittenMulCheckSvg: Fig = ({ className }) => (
  <svg viewBox="0 0 460 220" className={cls(className, 'w-full max-w-[460px] h-auto mx-auto')} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="458" height="218" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <text x="72" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#b45309">1. Becslés</text>
    <text x="224" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">2. Számolás</text>
    <text x="384" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#15803d">3. Ellenőrzés</text>
    <rect x="12" y="44" width="122" height="130" rx="12" fill="#fef3c7" stroke="#f59e0b" />
    <text x="73" y="78" textAnchor="middle" fontSize="17" fontWeight="bold" fill={INK}>162 ≈ 160</text>
    <text x="73" y="108" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>160 · 4 = 640</text>
    <text x="73" y="140" textAnchor="middle" fontSize="13" fill="#92400e">kicsit több</text>
    <text x="73" y="158" textAnchor="middle" fontSize="13" fill="#92400e">lesz</text>
    <WrittenMulG3ColumnG x={154} y={44} a={162} m={4} result={648} carries={[null, null, 2]} cell={34} />
    <WrittenAddG3ColumnG x={334} y={44} addends={[162, 162, 162, 162]} result={648} carries={[null, null, 2]} header={false} cell={24} />
    <text x="230" y="206" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">648 közel van a 640-hez, és az összeg is 648. Jó!</text>
  </svg>
);

/** Nulla a szorzandó közepén: 204 · 4 = 816 – a maradékot a nullánál is hozzáadjuk. */
export const WrittenMulZeroSvg: Fig = ({ className }) => (
  <svg viewBox="0 0 390 170" className={cls(className, 'w-full max-w-[400px] h-auto mx-auto')} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="388" height="168" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <WrittenMulG3ColumnG x={18} y={20} a={204} m={4} result={816} carries={[null, 1]} cell={36} highlight={1} />
    <text x="192" y="46" fontSize="14" fontWeight="bold" fill={INK}>4-szer 4 az 16.</text>
    <text x="192" y="66" fontSize="14" fill={INK}>Leírom a 6-ot, maradt 1.</text>
    <rect x="184" y="80" width="196" height="50" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
    <text x="192" y="100" fontSize="13" fontWeight="bold" fill="#5b21b6">4-szer 0 az 0, meg 1 az 1.</text>
    <text x="192" y="120" fontSize="13" fontWeight="bold" fill="#5b21b6">Leírom az 1-et.</text>
    <text x="192" y="152" fontSize="14" fontWeight="bold" fill={INK}>4-szer 2 az 8. Leírom a 8-at.</text>
  </svg>
);
