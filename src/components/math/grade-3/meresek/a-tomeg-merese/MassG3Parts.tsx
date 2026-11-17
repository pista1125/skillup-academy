import React from 'react';
import { FONT, UNK, Weight } from '../mit-mivel-merunk/WhatToMeasureG3Parts';

export { FONT, UNK, Weight };

/**
 * Konyhai mérleg kerek számlapja. 0-tól max-ig, 240°-os íven.
 * step: kis beosztás, labelEvery: felirat ennyi dkg-onként.
 */
export const DialScale: React.FC<{
  cx: number;
  cy: number;
  r: number;
  value: number;
  max?: number;
  step?: number;
  labelEvery?: number;
  fs?: number;
}> = ({ cx, cy, r, value, max = 100, step = 10, labelEvery = 10, fs = 9 }) => {
  const ang = (v: number) => ((-150 + (v / max) * 300) * Math.PI) / 180;
  const pt = (v: number, rr: number) => [cx + rr * Math.sin(ang(v)), cy - rr * Math.cos(ang(v))];
  const ticks: React.ReactNode[] = [];
  for (let v = 0; v <= max; v += step) {
    const major = v % labelEvery === 0;
    const [x1, y1] = pt(v, r * 0.92);
    const [x2, y2] = pt(v, major ? r * 0.76 : r * 0.82);
    ticks.push(<line key={`t${v}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e293b" strokeWidth={major ? 1.8 : 1} />);
    if (major) {
      const [tx, ty] = pt(v, r * 0.56);
      ticks.push(
        <text key={`l${v}`} x={tx} y={ty + fs * 0.35} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#1e293b" fontFamily={FONT} stroke="#ffffff" strokeWidth="3" paintOrder="stroke">{v}</text>
      );
    }
  }
  const [px, py] = pt(value, r * 0.84);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#7f1d1d" strokeWidth="3" />
      <line x1={cx} y1={cy} x2={px} y2={py} stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
      {ticks}
      <circle cx={cx} cy={cy} r="3.5" fill="#dc2626" />
      <text x={cx} y={cy + r * 0.38} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#7f1d1d" fontFamily={FONT}>dkg</text>
    </g>
  );
};

/** Konyhai mérleg teljes rajza a számlappal (kb. 140 × 150). */
export const KitchenScale: React.FC<{ x: number; y: number; value: number; max?: number; step?: number; labelEvery?: number; s?: number; load?: React.ReactNode }> = ({
  x,
  y,
  value,
  max = 100,
  step = 10,
  labelEvery = 10,
  s = 1,
  load
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {load && <g transform="translate(70 22)">{load}</g>}
    <path d="M18 26 Q70 48 122 26 Z" fill="#e2e8f0" stroke="#334155" strokeWidth="2.5" />
    <rect x="63" y="34" width="14" height="12" fill="#94a3b8" />
    <path d="M8 148 L132 148 L120 46 L20 46 Z" fill="#f87171" stroke="#7f1d1d" strokeWidth="3" />
    <DialScale cx={70} cy={98} r={44} value={value} max={max} step={step} labelEvery={labelEvery} fs={8.5} />
  </g>
);

/** Vízszintes oszlopdiagram (dkg). */
export const MassBarChart: React.FC<{ data: { name: string; v: number; color: string }[]; max?: number; x?: number; y?: number; w?: number; showQ?: number }> = ({
  data,
  max = 160,
  x = 80,
  y = 14,
  w = 250,
  showQ
}) => {
  const rowH = 30;
  const unit = w / max;
  const H = data.length * rowH;
  return (
    <g fontFamily={FONT}>
      {Array.from({ length: max / 10 + 1 }, (_, i) => (
        <g key={i}>
          <line x1={x + i * 10 * unit} y1={y} x2={x + i * 10 * unit} y2={y + H} stroke={i % 5 === 0 ? '#94a3b8' : '#e2e8f0'} strokeWidth="1" />
          {i % 2 === 0 && (
            <text x={x + i * 10 * unit} y={y + H + 14} textAnchor="middle" fontSize="9" fill="#334155">{i * 10}</text>
          )}
        </g>
      ))}
      <line x1={x} y1={y} x2={x} y2={y + H} stroke="#334155" strokeWidth="1.5" />
      <line x1={x} y1={y + H} x2={x + w + 6} y2={y + H} stroke="#334155" strokeWidth="1.5" />
      <text x={x + w + 4} y={y + H - 4} fontSize="9" fontWeight="bold" fill="#334155">dkg</text>
      {data.map((d, i) => (
        <g key={d.name}>
          <text x={x - 6} y={y + i * rowH + 19} textAnchor="end" fontSize="11" fontWeight="bold" fill="#0f172a">{d.name}</text>
          <rect x={x} y={y + i * rowH + 7} width={d.v * unit} height="16" rx="2" fill={d.color} stroke="#1e293b" strokeWidth="1" />
          {showQ === i && (
            <text x={x + d.v * unit + 6} y={y + i * rowH + 20} fontSize="13" fontWeight="bold" fill={UNK}>?</text>
          )}
        </g>
      ))}
    </g>
  );
};

/** A kamra adatai (saját adatok). */
export const PANTRY = [
  { name: 'zab', v: 60, color: '#fbbf24' },
  { name: 'rizs', v: 100, color: '#e2e8f0' },
  { name: 'alma', v: 130, color: '#f87171' },
  { name: 'mazsola', v: 20, color: '#a78bfa' }
];

/** Súlyok sorban (bal szél x, alsó szél by). Elemei: szám (dkg), '1kg' vagy '?'. */
export const WeightRow: React.FC<{ ws: (number | '1kg' | '?')[]; x: number; by: number; w: number; gap?: number; fs?: number }> = ({ ws, x, by, w, gap = 4, fs }) => (
  <g>
    {ws.map((v, i) => (
      <Weight
        key={i}
        cx={x + w / 2 + i * (w + gap)}
        by={by}
        w={w}
        label={v === '1kg' ? '1 kg' : v === '?' ? '?' : String(v)}
        kg={v === '1kg'}
        unknown={v === '?'}
        unit={typeof v === 'number' ? 'dkg' : undefined}
        fs={fs ? (v === '1kg' ? fs * 0.75 : fs) : undefined}
      />
    ))}
  </g>
);
