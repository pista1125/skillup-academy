import React from 'react';
import { FONT, INK, RED, BLUE, fmt } from '../negativ-szamok-a-mindennapokban/NegEverydayG3Parts';

export { FONT, INK, RED, BLUE, fmt };
export { Thermo, ThermoSvg, fmtC } from '../negativ-szamok-a-mindennapokban/NegEverydayG3Parts';

// ---------------------------------------------------------------------------
// Számegyenes (vízszintes): jobbra nyíl, 1-esével vonalkák.
// ---------------------------------------------------------------------------
export interface NLArrow {
  v: number;
  /** a nyíl fölötti dobozban: szám, „?” vagy betű */
  text: string;
  color?: string;
}
export interface NLPoint {
  v: number;
  color?: string;
  /** betű a pont fölött (A, B, …) */
  letter?: string;
}
export interface NLProps {
  from: number;
  to: number;
  x0: number;
  x1: number;
  y: number;
  /** feliratok: 'all' = minden szám, szám = ilyen lépésenként, tömb = csak ezek */
  labels?: 'all' | number | number[];
  /** ezeknek a helyén „?” a felirat */
  unknown?: number[];
  arrows?: NLArrow[];
  points?: NLPoint[];
  /** ugrások ívekkel (pl. 0-tól –3-ig) */
  hops?: { from: number; to: number; color?: string }[];
  fs?: number;
  sw?: number;
  /** a 0 kék és vastagabb */
  zero?: boolean;
  /** a negatív rész kék, a 0-nál nagyobb rész piros sávval */
  sides?: boolean;
  /** vonalkahossz-szorzó (kártyán nagyobb) */
  tk?: number;
  /** a pontok sugara */
  pr?: number;
}

export const nlX = (p: Pick<NLProps, 'from' | 'to' | 'x0' | 'x1'>, v: number) => p.x0 + ((v - p.from) / (p.to - p.from)) * (p.x1 - p.x0);

export const isLabel = (labels: NLProps['labels'], v: number) =>
  labels === 'all' ? true : typeof labels === 'number' ? v % labels === 0 : Array.isArray(labels) ? labels.includes(v) : false;

export const NumberLine: React.FC<NLProps> = (p) => {
  const { from, to, x0, x1, y, labels = 'all', unknown = [], arrows = [], points = [], hops = [], fs = 13, sw = 2, zero = true, sides = false, tk = 1, pr } = p;
  const x = (v: number) => nlX(p, v);
  const step = (x1 - x0) / (to - from);
  const vals: number[] = [];
  for (let v = from; v <= to; v++) vals.push(v);
  return (
    <g fontFamily={FONT}>
      {sides && from < 0 && <rect x={x0 - step * 0.5} y={y - 5} width={x(0) - x0 + step * 0.5} height="10" rx="5" fill="#dbeafe" />}
      {sides && to > 0 && <rect x={x(0)} y={y - 5} width={x1 - x(0) + step * 0.5} height="10" rx="5" fill="#fee2e2" />}
      <line x1={x0 - step * 0.6} x2={x1 + step * 0.9} y1={y} y2={y} stroke={INK} strokeWidth={sw} />
      <path d={`M${x1 + step * 0.9 + 7} ${y} l-10 -5 l0 10 Z`} fill={INK} />
      {hops.map((h, i) => {
        const b = x(h.to);
        const dir = Math.sign(h.to - h.from);
        const n = Math.abs(h.to - h.from);
        return (
          <g key={`h${i}`}>
            {Array.from({ length: n }, (_, k) => {
              const s = x(h.from + dir * k);
              const e = x(h.from + dir * (k + 1));
              const r = Math.abs(e - s) / 2;
              return <path key={k} d={`M${s} ${y - 4} A ${r} ${r * 0.9} 0 0 ${dir > 0 ? 1 : 0} ${e} ${y - 4}`} fill="none" stroke={h.color ?? BLUE} strokeWidth="2" />;
            })}
            <path d={`M${b} ${y - 4} l${dir > 0 ? -6 : 6} -6 l${dir > 0 ? 1 : -1} 6 Z`} fill={h.color ?? BLUE} stroke={h.color ?? BLUE} strokeWidth="1.5" />
          </g>
        );
      })}
      {vals.map((v) => {
        const lab = isLabel(labels, v) || unknown.includes(v);
        const isZero = zero && v === 0;
        return (
          <g key={v}>
            <line x1={x(v)} x2={x(v)} y1={y - tk * (lab ? 7 : v % 5 === 0 ? 6 : 4.5)} y2={y + tk * (lab ? 7 : v % 5 === 0 ? 6 : 4.5)} stroke={isZero ? BLUE : INK} strokeWidth={isZero ? sw + 1 : sw * 0.8} />
            {lab && (
              <text x={x(v)} y={y + 2 + 7 * tk + fs} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={unknown.includes(v) ? RED : isZero ? BLUE : INK}>
                {unknown.includes(v) ? '?' : fmt(v)}
              </text>
            )}
          </g>
        );
      })}
      {points.map((pt, i) => (
        <g key={`p${i}`}>
          <circle cx={x(pt.v)} cy={y} r={pr ?? Math.max(4, fs * 0.33)} fill={pt.color ?? RED} stroke="#ffffff" strokeWidth="1.5" />
          {pt.letter && (
            <text x={x(pt.v)} y={y - 11} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={pt.color ?? RED}>
              {pt.letter}
            </text>
          )}
        </g>
      ))}
      {arrows.map((a, i) => {
        const ax = x(a.v);
        const bw = Math.max(fs * 2, a.text.length * fs * 0.62 + 12);
        const c = a.color ?? RED;
        return (
          <g key={`a${i}`}>
            <rect x={ax - bw / 2} y={y - 22 - fs * 1.7} width={bw} height={fs * 1.7} rx={fs * 0.5} fill="#ffffff" stroke={c} strokeWidth="2" />
            <text x={ax} y={y - 22 - fs * 0.5} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={c}>
              {a.text}
            </text>
            <line x1={ax} x2={ax} y1={y - 22} y2={y - 9} stroke={c} strokeWidth="2" />
            <path d={`M${ax} ${y - 3} l-4 -7 l8 0 Z`} fill={c} />
          </g>
        );
      })}
    </g>
  );
};

/** Önálló számegyenes-ábra (300 széles). */
export const NLSvg: React.FC<Omit<NLProps, 'x0' | 'x1' | 'y'> & { className?: string; top?: boolean; W?: number }> = ({ className = 'w-full max-w-[320px] h-auto mx-auto', top, W = 300, fs = 13, ...rest }) => {
  const hasTop = top ?? Boolean(rest.arrows?.length || rest.points?.some((p) => p.letter) || rest.hops?.length);
  const y = hasTop ? 20 + fs * 2.6 : 22;
  const H = y + fs + 20;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg">
      <NumberLine x0={18} x1={W - 30} y={y} fs={fs} {...rest} />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Álló számegyenes (mint a hőmérő skálája): fölfelé nyíl.
// ---------------------------------------------------------------------------
export const VNumberLine: React.FC<{
  from: number;
  to: number;
  x: number;
  y0: number;
  y1: number;
  labels?: 'all' | number | number[];
  arrow?: { v: number; text: string };
  fs?: number;
}> = ({ from, to, x, y0, y1, labels = 'all', arrow, fs = 12 }) => {
  const y = (v: number) => y0 - ((v - from) / (to - from)) * (y0 - y1);
  const step = (y0 - y1) / (to - from);
  const vals: number[] = [];
  for (let v = from; v <= to; v++) vals.push(v);
  return (
    <g fontFamily={FONT}>
      <line x1={x} x2={x} y1={y0 + step * 0.6} y2={y1 - step * 0.9} stroke={INK} strokeWidth="2" />
      <path d={`M${x} ${y1 - step * 0.9 - 7} l-5 10 l10 0 Z`} fill={INK} />
      {vals.map((v) => {
        const lab = isLabel(labels, v);
        return (
          <g key={v}>
            <line x1={x - (lab ? 7 : 5)} x2={x + (lab ? 7 : 5)} y1={y(v)} y2={y(v)} stroke={v === 0 ? BLUE : INK} strokeWidth={v === 0 ? 3 : 1.6} />
            {lab && (
              <text x={x - 11} y={y(v) + fs * 0.36} textAnchor="end" fontSize={fs} fontWeight="bold" fill={v === 0 ? BLUE : INK}>
                {fmt(v)}
              </text>
            )}
          </g>
        );
      })}
      {arrow && (
        <g>
          <line x1={x + 10} x2={x + 26} y1={y(arrow.v)} y2={y(arrow.v)} stroke={RED} strokeWidth="2" />
          <path d={`M${x + 4} ${y(arrow.v)} l7 -4 l0 8 Z`} fill={RED} />
          <rect x={x + 26} y={y(arrow.v) - fs * 0.85} width={Math.max(fs * 2, arrow.text.length * fs * 0.62 + 12)} height={fs * 1.7} rx={fs * 0.5} fill="#ffffff" stroke={RED} strokeWidth="2" />
          <text x={x + 26 + Math.max(fs * 2, arrow.text.length * fs * 0.62 + 12) / 2} y={y(arrow.v) + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={RED}>
            {arrow.text}
          </text>
        </g>
      )}
    </g>
  );
};
