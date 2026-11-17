import React from 'react';
import { FONT, INK, PriceTag } from './OrderOps1000G3Parts';

type P = { className?: string };
const cls = (c?: string) => c ?? 'w-full max-w-xl h-auto mx-auto';

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string }> = ({ x1, y1, x2, y2, color = '#64748b' }) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 9;
  return (
    <g stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <path d={`M ${x2 - h * Math.cos(a - 0.5)} ${y2 - h * Math.sin(a - 0.5)} L ${x2} ${y2} L ${x2 - h * Math.cos(a + 0.5)} ${y2 - h * Math.sin(a + 0.5)}`} />
    </g>
  );
};

/** A sorrend lépcsője: 1. zárójel, 2. szorzás és osztás, 3. összeadás és kivonás. */
export const OrderOps1000RuleSvg: React.FC<P> = ({ className }) => {
  const steps = [
    { n: '1.', t: 'Zárójel', s: '( … )', c: '#fed7aa', b: '#ea580c' },
    { n: '2.', t: 'Szorzás, osztás', s: '·   :', c: '#e9d5ff', b: '#7c3aed' },
    { n: '3.', t: 'Összeadás, kivonás', s: '+   −', c: '#bae6fd', b: '#0284c7' }
  ];
  return (
    <svg viewBox="0 0 480 240" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width="476" height="236" rx="16" fill="#fffbeb" stroke="#fcd34d" strokeWidth="2" />
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={20 + i * 150} y={20 + i * 30} width="140" height={170 - i * 30} rx="12" fill={s.c} stroke={s.b} strokeWidth="2.5" />
          <circle cx={48 + i * 150} cy={44 + i * 30} r="17" fill="#fff" stroke={s.b} strokeWidth="2.5" />
          <text x={48 + i * 150} y={51 + i * 30} textAnchor="middle" fontSize="18" fontWeight="bold" fill={s.b}>{s.n}</text>
          <text x={90 + i * 150} y={92 + i * 30} textAnchor="middle" fontSize="30" fontWeight="bold" fill={INK}>{s.s}</text>
          <text x={90 + i * 150} y={124 + i * 30} textAnchor="middle" fontSize="14.5" fontWeight="bold" fill={INK}>{s.t}</text>
        </g>
      ))}
      <Arrow x1={70} y1={226} x2={410} y2={226} color="#b45309" />
      <text x="240" y="218" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">Egyforma lépcsőn: balról jobbra</text>
    </svg>
  );
};

/** Csak + és −: balról jobbra, mint egy vonat. 645 − 280 + 136. */
export const OrderOps1000ChainSvg: React.FC<P> = ({ className }) => {
  const boxes = [
    { x: 20, t: '645', c: '#bae6fd' },
    { x: 190, t: '365', c: '#fde68a' },
    { x: 360, t: '501', c: '#bbf7d0' }
  ];
  return (
    <svg viewBox="0 0 480 170" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width="476" height="166" rx="16" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
      <text x="240" y="30" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>645 − 280 + 136</text>
      <line x1="14" y1="122" x2="466" y2="122" stroke="#94a3b8" strokeWidth="3" />
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="64" width="100" height="52" rx="10" fill={b.c} stroke="#1e293b" strokeWidth="2.5" />
          <circle cx={b.x + 20} cy="122" r="8" fill="#334155" />
          <circle cx={b.x + 80} cy="122" r="8" fill="#334155" />
          <text x={b.x + 50} y="99" textAnchor="middle" fontSize="26" fontWeight="bold" fill={INK}>{b.t}</text>
        </g>
      ))}
      <Arrow x1={124} y1={90} x2={186} y2={90} color="#dc2626" />
      <text x="155" y="76" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#dc2626">− 280</text>
      <Arrow x1={294} y1={90} x2={356} y2={90} color="#16a34a" />
      <text x="325" y="76" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#16a34a">+ 136</text>
      <text x="70" y="154" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">eleje</text>
      <text x="240" y="154" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">1. lépés után</text>
      <text x="410" y="154" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">eredmény</text>
    </svg>
  );
};

/** A zárójel belsejét számoljuk ki először: (930 − 570) : 6. */
export const OrderOps1000BracketFirstSvg: React.FC<P> = ({ className }) => (
  <svg viewBox="0 0 480 200" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <rect x="112" y="22" width="166" height="40" rx="10" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.5" />
    <text x="195" y="52" textAnchor="middle" fontSize="28" fontWeight="bold" fill={INK}>
      <tspan fill="#c2410c">(</tspan>930 − 570<tspan fill="#c2410c">)</tspan>
    </text>
    <text x="288" y="52" fontSize="28" fontWeight="bold" fill={INK}>: 6</text>
    <Arrow x1={203} y1={66} x2={203} y2={96} color="#ea580c" />
    <text x="214" y="88" fontSize="14" fontWeight="bold" fill="#c2410c">1. a zárójel: 930 − 570 = 360</text>
    <rect x="166" y="102" width="62" height="38" rx="10" fill="#fff" stroke="#ea580c" strokeWidth="2" />
    <text x="197" y="130" textAnchor="middle" fontSize="28" fontWeight="bold" fill={INK}>360</text>
    <text x="236" y="130" fontSize="28" fontWeight="bold" fill={INK}>: 6</text>
    <Arrow x1={240} y1={144} x2={240} y2={166} color="#7c3aed" />
    <text x="252" y="162" fontSize="14" fontWeight="bold" fill="#6d28d9">2. az osztás</text>
    <text x="240" y="190" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#15803d">= 60</text>
  </svg>
);

/** Ugyanazok a számok, zárójellel és zárójel nélkül: 900 − (350 + 220) és 900 − 350 + 220. */
export const OrderOps1000BracketCompareSvg: React.FC<P> = ({ className }) => (
  <svg viewBox="0 0 480 200" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="196" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <rect x="14" y="14" width="220" height="152" rx="12" fill="#fff7ed" stroke="#fb923c" strokeWidth="2" />
    <rect x="246" y="14" width="220" height="152" rx="12" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="2" />
    <text x="124" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#c2410c">Zárójellel</text>
    <text x="356" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0369a1">Zárójel nélkül</text>
    <text x="124" y="76" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>900 − (350 + 220)</text>
    <text x="124" y="110" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#475569">= 900 − 570</text>
    <text x="124" y="150" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#c2410c">= 330</text>
    <text x="356" y="76" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>900 − 350 + 220</text>
    <text x="356" y="110" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#475569">= 550 + 220</text>
    <text x="356" y="150" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#0369a1">= 770</text>
    <text x="240" y="188" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569">Ugyanazok a számok – más eredmény!</text>
  </svg>
);

/** Vásárlás: 1000 Ft-ból füzet (385 Ft) és toll (240 Ft). */
export const OrderOps1000ShopSvg: React.FC<P> = ({ className }) => (
  <svg viewBox="0 0 480 210" className={cls(className)} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width="476" height="206" rx="16" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
    {/* pénztárca */}
    <rect x="24" y="60" width="130" height="86" rx="14" fill="#a16207" stroke="#713f12" strokeWidth="3" />
    <rect x="96" y="84" width="58" height="36" rx="8" fill="#ca8a04" stroke="#713f12" strokeWidth="2" />
    <circle cx="112" cy="102" r="5" fill="#fde68a" />
    <text x="89" y="44" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>1000 Ft</text>
    {/* füzet */}
    <rect x="200" y="50" width="70" height="92" rx="6" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="3" />
    <rect x="212" y="66" width="46" height="18" rx="3" fill="#fff" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <circle key={i} cx="206" cy={62 + i * 14} r="2.5" fill="#1e3a8a" />
    ))}
    <PriceTag x={192} y={150} text="385 Ft" w={86} fs={18} fill="#fef3c7" />
    {/* toll */}
    <g transform="rotate(-30 360 100)">
      <rect x="300" y="90" width="110" height="18" rx="4" fill="#f87171" stroke="#991b1b" strokeWidth="2.5" />
      <path d="M 410 90 L 432 99 L 410 108 Z" fill="#fde68a" stroke="#991b1b" strokeWidth="2" />
      <rect x="300" y="90" width="18" height="18" fill="#991b1b" />
    </g>
    <PriceTag x={330} y={150} text="240 Ft" w={86} fs={18} fill="#dbeafe" />
    <text x="400" y="36" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#166534">Mennyi marad?</text>
  </svg>
);
