import React from 'react';
import { FONT, PriceTag, ItemIcon } from '../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';
import { ELine, ApproxPair, Wallet } from './SumEstimateG3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode }> = ({ w, h, className = DEF, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** 187 + 238: becslés százasra és tízesre kerekített tagokkal. */
export const EstimateTwoWaysSvg: Fig = ({ className }) => (
  <Frame w={360} h={208} className={className}>
    <PriceTag x={60} y={12} text="187 Ft" w={78} fs={15} />
    <text x="160" y="36" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#16a34a">+</text>
    <PriceTag x={186} y={12} text="238 Ft" w={78} fs={15} />
    <rect x="12" y="58" width="336" height="62" rx="10" fill="#fee2e2" stroke="#b91c1c" strokeWidth="1.6" />
    <text x="24" y="76" fontSize="12.5" fontWeight="bold" fill="#b91c1c">százasra kerekítve</text>
    <ApproxPair x={70} y={104} a="187" b="200" fs={16} />
    <ApproxPair x={160} y={104} a="238" b="200" fs={16} />
    <text x="304" y="104" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#b91c1c">B: 400</text>
    <rect x="12" y="128" width="336" height="62" rx="10" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.6" />
    <text x="24" y="146" fontSize="12.5" fontWeight="bold" fill="#1d4ed8">tízesre kerekítve</text>
    <ApproxPair x={70} y={174} a="187" b="190" fs={16} />
    <ApproxPair x={160} y={174} a="238" b="240" fs={16} />
    <text x="304" y="174" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">B: 430</text>
    <text x="236" y="104" textAnchor="middle" fontSize="11" fill="#64748b">200 + 200</text>
    <text x="236" y="174" textAnchor="middle" fontSize="11" fill="#64748b">190 + 240</text>
  </Frame>
);

/** A két becslés és a pontos összeg (425) a számegyenesen. */
export const EstimateLineSvg: Fig = ({ className = DEF }) => (
  <ELine
    lo={390}
    hi={440}
    tickEvery={5}
    bigEvery={10}
    labels={[390, 400, 410, 420, 430, 440]}
    marks={[
      { v: 400, label: 'B: 400', color: '#b91c1c' },
      { v: 425, label: '', sub: 'pontos: 425', color: '#15803d' },
      { v: 430, label: 'B: 430', color: '#1d4ed8' }
    ]}
    W={360}
    H={100}
    className={className}
  />
);

/** 135 + 165 = 300: itt a százasra kerekített becslés a pontosabb. */
export const NotAlwaysSvg: Fig = ({ className }) => (
  <Frame w={360} h={150} className={className}>
    <text x="180" y="28" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">135 + 165 = 300</text>
    <text x="96" y="56" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">százasra: 100 + 200</text>
    <text x="96" y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#b91c1c">B: 300</text>
    <text x="264" y="56" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">tízesre: 140 + 170</text>
    <text x="264" y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">B: 310</text>
    <g transform="translate(10 84)">
      <line x1="20" y1="30" x2="330" y2="30" stroke="#334155" strokeWidth="1.8" />
      {[290, 295, 300, 305, 310, 315].map((v) => {
        const x = 30 + (v - 290) * 11;
        const big = v % 10 === 0;
        return (
          <g key={v}>
            <line x1={x} y1={big ? 22 : 26} x2={x} y2={big ? 38 : 34} stroke="#334155" strokeWidth={big ? 1.6 : 0.9} />
            {big && <text x={x} y="54" textAnchor="middle" fontSize="11.5" fill="#475569">{v}</text>}
          </g>
        );
      })}
      <circle cx={30 + 10 * 11} cy="30" r="6" fill="#15803d" stroke="#fff" />
      <circle cx={30 + 10 * 11} cy="30" r="10" fill="none" stroke="#b91c1c" strokeWidth="2" />
      <circle cx={30 + 20 * 11} cy="30" r="5" fill="#1d4ed8" stroke="#fff" />
    </g>
  </Frame>
);

/** Elég az 500 Ft? Két árcédula és a pénztárca. */
export const BudgetSvg: Fig = ({ className }) => (
  <Frame w={360} h={130} className={className}>
    <ItemIcon kind="book" cx={46} cy={44} />
    <PriceTag x={22} y={72} text="236 Ft" w={68} fs={13} />
    <text x="112" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#16a34a">+</text>
    <ItemIcon kind="pencil" cx={160} cy={44} />
    <PriceTag x={134} y={72} text="178 Ft" w={68} fs={13} />
    <text x="228" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">?</text>
    <Wallet x={256} y={50} text="500 Ft" w={84} />
    <text x="180" y="120" textAnchor="middle" fontSize="13" fill="#334155">Becslés: 240 + 180 = 420. Ez kevesebb, mint 500. Elég!</text>
  </Frame>
);

/** A becslés leleplezi a hibát: 236 + 145 = 281? */
export const ErrorCheckSvg: Fig = ({ className }) => (
  <Frame w={360} h={150} className={className}>
    <rect x="18" y="16" width="150" height="118" rx="6" fill="#fff" stroke="#94a3b8" strokeWidth="1.5" />
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={i} x1="18" y1={36 + i * 18} x2="168" y2={36 + i * 18} stroke="#bfdbfe" strokeWidth="1" />
    ))}
    <text x="93" y="66" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">236 + 145</text>
    <text x="93" y="100" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">= 281</text>
    <path d="M 132 84 L 154 106 M 154 84 L 132 106" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
    <text x="262" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">Becslés tízesre:</text>
    <text x="262" y="70" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">240 + 150</text>
    <text x="262" y="96" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1d4ed8">B: 390</text>
    <text x="262" y="124" textAnchor="middle" fontSize="12" fill="#b91c1c">A 281 messze van!</text>
  </Frame>
);
