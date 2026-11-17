import React from 'react';
import { FONT, UNK } from '../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';

// Rajzelemek és segédek a 2. Az összeg becslése leckéhez.

export const roundTen = (n: number) => Math.floor((n + 5) / 10) * 10;
export const roundHundred = (n: number) => Math.floor((n + 50) / 100) * 100;

export interface EMark {
  v: number;
  /** a pont fölé írt felirat (alapból a szám) */
  label?: string;
  /** a pont alá írt kis felirat */
  sub?: string;
  color?: string;
}

/** Számegyenes lo..hi, kis osztás tickEvery, nagy osztás bigEvery, számok a labels-ben, pontok a marks-ban. */
export const ELine: React.FC<{
  lo: number;
  hi: number;
  tickEvery: number;
  bigEvery: number;
  labels: number[];
  marks?: EMark[];
  W?: number;
  H?: number;
  className?: string;
  bg?: boolean;
}> = ({ lo, hi, tickEvery, bigEvery, labels, marks = [], W = 340, H = 96, className = 'w-full h-auto', bg = true }) => {
  const x0 = 24;
  const x1 = W - 28;
  const y = 46;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += tickEvery) ticks.push(v);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {bg && <rect x="1" y="1" width={W - 2} height={H - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />}
      <line x1={x0 - 10} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 17} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {ticks.map((v) => {
        const big = v % bigEvery === 0;
        return <line key={v} x1={X(v)} y1={y - (big ? 8 : 4.5)} x2={X(v)} y2={y + (big ? 8 : 4.5)} stroke="#334155" strokeWidth={big ? 1.6 : 0.9} />;
      })}
      {labels.map((v) => (
        <text key={`l${v}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize="11.5" fill="#475569">{v}</text>
      ))}
      {marks.map((m, i) => {
        const c = m.label === '?' ? UNK : m.color ?? '#2563eb';
        return (
          <g key={`m${i}`}>
            <circle cx={X(m.v)} cy={y} r="5" fill={c} stroke="#fff" strokeWidth="1" />
            <line x1={X(m.v)} y1={y - 8} x2={X(m.v)} y2={y - 14} stroke={c} strokeWidth="1.6" />
            <text x={X(m.v)} y={y - 18} textAnchor="middle" fontSize={m.label === '?' ? 16 : 12.5} fontWeight="bold" fill={c}>{m.label ?? m.v}</text>
            {m.sub && <text x={X(m.v)} y={y + 36} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={c}>{m.sub}</text>}
          </g>
        );
      })}
    </svg>
  );
};

/** Becslési „kártya”: a ≈ b. */
export const ApproxPair: React.FC<{ x: number; y: number; a: string; b: string; fs?: number; color?: string }> = ({ x, y, a, b, fs = 20, color = '#0f172a' }) => (
  <g fontFamily={FONT}>
    <text x={x - fs * 0.5} y={y} textAnchor="end" fontSize={fs} fontWeight="bold" fill={color}>{a}</text>
    <text x={x} y={y + 1} textAnchor="middle" fontSize={fs * 1.05} fontWeight="bold" fill="#d97706">≈</text>
    <text x={x + fs * 0.5} y={y} textAnchor="start" fontSize={fs} fontWeight="bold" fill={b === '?' ? UNK : color}>{b}</text>
  </g>
);

/** Pénztárca egy bankjeggyel / összeggel. */
export const Wallet: React.FC<{ x: number; y: number; text: string; w?: number }> = ({ x, y, text, w = 76 }) => (
  <g fontFamily={FONT}>
    <rect x={x} y={y} width={w} height="44" rx="8" fill="#a16207" stroke="#713f12" strokeWidth="2" />
    <rect x={x + w - 22} y={y + 14} width="22" height="16" rx="4" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />
    <rect x={x + 4} y={y - 10} width={w - 14} height="22" rx="3" fill="#fbcfe8" stroke="#9d174d" strokeWidth="1.5" />
    <text x={x + 4 + (w - 14) / 2} y={y + 6} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#831843">{text}</text>
  </g>
);
