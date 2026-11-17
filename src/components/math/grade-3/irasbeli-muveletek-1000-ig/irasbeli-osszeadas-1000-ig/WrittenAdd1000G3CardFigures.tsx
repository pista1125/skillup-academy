import React from 'react';
import { FONT, ItemIcon, ItemKind } from './WrittenAdd1000G3Parts';

// Kis, vastag vonalas kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

const FILL = ['#facc15', '#60a5fa', '#f87171', '#a78bfa']; // e, t, sz, E (jobbról)
const BODY = ['#fef9c3', '#dbeafe', '#fee2e2', '#ede9fe'];

/**
 * Írásbeli összeadás nagy számjegyekkel. rows = a tagok; res = az összeg (vagy '?', '???').
 * W × H a viewBox; cols = 3 vagy 4.
 */
const ColPaint: React.FC<{ rows: (number | string)[]; res?: number | string; W: number; H: number; cols?: number }> = ({ rows, res, W, H, cols = 3 }) => {
  const all = [...rows, ...(res !== undefined ? [res] : [])];
  const n = all.length;
  const rowH = (H - 8) / (n + (res !== undefined ? 0.15 : 0.1));
  const plusW = W * 0.2;
  const cw = Math.min(27, (W - plusW - 4) / cols);
  const fs = Math.min(27, rowH * 1.02, cw * 1.22);
  const gw = cols * cw;
  const x0 = plusW + (W - plusW - gw) / 2;
  const lineY = 5 + rows.length * rowH + 2;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: cols }).map((_, i) => {
        const pr = cols - 1 - i;
        return (
          <g key={i}>
            <rect x={x0 + i * cw} y="0" width={cw} height="5" fill={FILL[pr]} />
            <rect x={x0 + i * cw} y="5" width={cw} height={H - 5} fill={BODY[pr]} />
          </g>
        );
      })}
      {all.map((v, k) => {
        const s = String(v).padStart(cols, ' ').slice(-cols).split('');
        const isRes = res !== undefined && k === n - 1;
        const y = 5 + k * rowH + rowH * 0.82 + (isRes ? 4 : 0);
        return (
          <g key={k}>
            {s.map((ch, i) =>
              ch.trim() ? (
                <text key={i} x={x0 + i * cw + cw / 2} y={y} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={ch === '?' ? '#dc2626' : isRes ? '#1d4ed8' : '#0f172a'}>{ch}</text>
              ) : null
            )}
          </g>
        );
      })}
      <text x={x0 - fs * 0.42} y={5 + (rows.length - 1) * rowH + rowH * 0.8} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#16a34a">+</text>
      <line x1={Math.max(1, x0 - fs * 0.85)} y1={lineY} x2={x0 + gw + 3} y2={lineY} stroke="#0f172a" strokeWidth="3" />
    </svg>
  );
};

/** Párosító: tagok egymás alatt (az összeg a másik kártyán). */
export const MiniAdd: React.FC<{ xs: (number | string)[]; res?: number | string; cols?: number }> = ({ xs, res, cols }) => (
  <ColPaint rows={xs} res={res} W={150} H={80} cols={cols ?? 3} />
);

/** Csoportosító: kis írásbeli összeadás (eredménnyel vagy anélkül). */
export const SortAdd: React.FC<{ xs: (number | string)[]; res?: number | string; cols?: number }> = ({ xs, res, cols }) => (
  <ColPaint rows={xs} res={res} W={88} H={xs.length + (res !== undefined ? 1 : 0) > 3 ? 96 : 80} cols={cols ?? 3} />
);

/** Párosító: két-három tárgy árcédulával. */
export const MiniShop: React.FC<{ items: { kind: ItemKind; price: number }[] }> = ({ items }) => {
  const w = 150 / items.length;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {items.map((it, i) => (
        <g key={i}>
          <ItemIcon kind={it.kind} cx={i * w + w / 2} cy={24} s={0.95} />
          <rect x={i * w + 3} y={46} width={w - 6} height={30} rx="7" fill="#fff" stroke="#475569" strokeWidth="2.5" />
          <text x={i * w + w / 2} y={69} textAnchor="middle" fontSize={items.length > 2 ? 21 : 24} fontWeight="bold" fill="#0f172a">{it.price}</text>
        </g>
      ))}
    </svg>
  );
};
