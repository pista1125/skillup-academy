import React from 'react';
import { FONT, WeightRow } from './MassG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

type W = number | '1kg' | '?';

/** Súlyok egy sorban (párosító, 150 × 80); eq: felirat a végén, pl. „= 1 kg”. */
export const WeightsCard: React.FC<{ ws: W[]; eq?: string }> = ({ ws, eq }) => {
  const n = ws.length;
  const w = Math.min(44, 142 / n - 4);
  const total = n * w + (n - 1) * 4;
  const x0 = (150 - total) / 2;
  const by = eq ? 52 : 62;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <WeightRow ws={ws} x={x0} by={by} w={w} fs={w * 0.5} />
      {eq && (
        <text x="75" y="75" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#0f172a">{eq}</text>
      )}
    </svg>
  );
};

/** Súlyok a csoportosítóhoz (80 × 80): 1–2 súly egy sorban, 3–4 súly két sorban; eq felirat alul. */
export const WeightsSmallCard: React.FC<{ ws: W[]; eq?: string }> = ({ ws, eq }) => {
  const rows = ws.length <= 2 ? [ws] : [ws.slice(0, 2), ws.slice(2)];
  const w = eq ? 28 : ws.length <= 2 ? 34 : 32;
  const bottom = eq ? 60 : 72;
  const rowH = w * 0.72 + w * 0.2 + 3;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {rows.map((r, i) => {
        const tot = r.length * w + (r.length - 1) * 4;
        return <WeightRow key={i} ws={r} x={(80 - tot) / 2} by={bottom - (rows.length - 1 - i) * rowH} w={w} fs={16} />;
      })}
      {eq && (
        <text x="40" y="77" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{eq}</text>
      )}
    </svg>
  );
};
