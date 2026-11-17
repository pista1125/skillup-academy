import React from 'react';
import { FONT, UNK } from './NumberLine200G3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

const arrowHead = (x: number, y: number, dir: 1 | -1, color: string) => (
  <path d={`M ${x - dir * 7} ${y - 4} L ${x} ${y} L ${x - dir * 7} ${y + 4}`} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" />
);

/**
 * Párosító-kártya (150 × 80): számegyenes-darab `n` lépéssel.
 * `labels`: [vonás sorszáma, felirat]; `q`: a „?” vonása (fölötte nyíl).
 */
export const LineCard: React.FC<{ n?: number; labels?: [number, string][]; q?: number }> = ({ n = 2, labels = [[0, '120'], [2, '130']], q = 1 }) => {
  const x0 = 26;
  const x1 = 124;
  const y = 40;
  const X = (i: number) => x0 + ((x1 - x0) * i) / n;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={6} y1={y} x2={144} y2={y} stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n + 1 }, (_, i) => (
        <line key={i} x1={X(i)} y1={y - 7} x2={X(i)} y2={y + 7} stroke="#334155" strokeWidth="3" />
      ))}
      {labels.map(([i, t]) => (
        <text key={i} x={X(i)} y={y + 30} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1e293b">{t}</text>
      ))}
      <circle cx={X(q)} cy={y} r="5.5" fill={UNK} />
      <text x={X(q)} y={y - 14} textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Párosító-kártya (150 × 80): szöcskeugrás `d` lépés jobbra vagy balra a `from` számról (kis ívekkel). */
export const HopCard: React.FC<{ from?: number; d?: number }> = ({ from = 136, d = 5 }) => {
  const steps = Math.abs(d);
  const dir: 1 | -1 = d > 0 ? 1 : -1;
  const span = 112;
  const w = span / steps;
  const startX = dir > 0 ? 20 : 130;
  const y = 50;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={6} y1={y} x2={144} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: steps + 1 }, (_, i) => (
        <line key={i} x1={startX + dir * i * w} y1={y - 5} x2={startX + dir * i * w} y2={y + 5} stroke="#334155" strokeWidth="2.5" />
      ))}
      {Array.from({ length: steps }, (_, i) => {
        const a = startX + dir * i * w;
        const b = a + dir * w;
        return <path key={i} d={`M ${a} ${y - 3} Q ${(a + b) / 2} ${y - 18} ${b} ${y - 3}`} fill="none" stroke="#16a34a" strokeWidth="2.5" />;
      })}
      {arrowHead(startX + dir * steps * w, y - 3, dir, '#16a34a')}
      <circle cx={startX} cy={y} r="5" fill="#2563eb" />
      <text x={startX} y={y + 26} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1d4ed8">{from}</text>
      <text x={startX + dir * steps * w} y={y + 26} textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Csoportosító-kártya (80 × 80): 0–200 számegyenes, egy pont a szám helyén. */
export const DotLineCard: React.FC<{ v?: number }> = ({ v = 125 }) => {
  const x0 = 10;
  const x1 = 66;
  const y = 42;
  const X = (u: number) => x0 + ((x1 - x0) * u) / 200;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={3} y1={y} x2={77} y2={y} stroke="#334155" strokeWidth="3" />
      {[0, 50, 100, 150, 200].map((u) => (
        <line key={u} x1={X(u)} y1={y - (u % 100 === 0 ? 8 : 5)} x2={X(u)} y2={y + (u % 100 === 0 ? 8 : 5)} stroke="#334155" strokeWidth={u % 100 === 0 ? 3 : 2} />
      ))}
      <text x={X(0)} y={y + 24} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">0</text>
      <text x={X(100)} y={y - 14} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">100</text>
      <text x={X(200)} y={y + 24} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">200</text>
      <circle cx={X(v)} cy={y} r="6" fill={UNK} stroke="#7f1d1d" strokeWidth="1.5" />
    </svg>
  );
};

/** Csoportosító-kártya (80 × 80): két felírt szám 5 lépés távolságra – mennyit ér egy osztás? */
export const ScaleCard: React.FC<{ a?: number; b?: number }> = ({ a = 100, b = 125 }) => {
  const x0 = 14;
  const x1 = 66;
  const y = 28;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={3} y1={y} x2={77} y2={y} stroke="#334155" strokeWidth="3" />
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={x0 + ((x1 - x0) * i) / 5} y1={y - 7} x2={x0 + ((x1 - x0) * i) / 5} y2={y + 7} stroke="#334155" strokeWidth="2.5" />
      ))}
      <text x={x0} y={y + 26} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1d4ed8">{a}</text>
      <text x={x1} y={y + 26} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1d4ed8">{b}</text>
      <text x="40" y="74" textAnchor="middle" fontSize="11" fill="#475569">5 lépés</text>
    </svg>
  );
};

/** Csoportosító-kártya (80 × 80): szöcske a `from` számról `d` lépést ugrik (kis ívek). */
export const HopSmallCard: React.FC<{ from?: number; d?: number }> = ({ from = 146, d = 3 }) => {
  const steps = Math.abs(d);
  const dir: 1 | -1 = d > 0 ? 1 : -1;
  const w = 44 / steps;
  const startX = dir > 0 ? 18 : 62;
  const y = 44;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={3} y1={y} x2={77} y2={y} stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: steps }, (_, i) => {
        const a = startX + dir * i * w;
        const b = a + dir * w;
        return <path key={i} d={`M ${a} ${y - 2} Q ${(a + b) / 2} ${y - 16} ${b} ${y - 2}`} fill="none" stroke="#16a34a" strokeWidth="2.5" />;
      })}
      {arrowHead(startX + dir * steps * w, y - 2, dir, '#16a34a')}
      <circle cx={startX} cy={y} r="4.5" fill="#2563eb" />
      <text x={startX} y={y + 24} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1d4ed8">{from}</text>
      <text x="40" y="16" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">{steps} {dir > 0 ? 'jobbra' : 'balra'}</text>
    </svg>
  );
};
