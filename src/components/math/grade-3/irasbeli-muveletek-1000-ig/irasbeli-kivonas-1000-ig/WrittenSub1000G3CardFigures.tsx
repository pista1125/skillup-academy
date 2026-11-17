import React from 'react';
import { FONT, ItemIcon, ItemKind } from './WrittenSub1000G3Parts';

// Kis, vastag vonalas kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

const FILL = ['#facc15', '#60a5fa', '#f87171', '#a78bfa']; // e, t, sz, E (jobbról)
const BODY = ['#fef9c3', '#dbeafe', '#fee2e2', '#ede9fe'];

/** Írásbeli kivonás nagy számjegyekkel (kisebbítendő, kivonandó, esetleg különbség). */
const SubPaint: React.FC<{ a: number | string; b: number | string; res?: number | string; W: number; H: number; cols: number }> = ({ a, b, res, W, H, cols }) => {
  const all = [a, b, ...(res !== undefined ? [res] : [])];
  const n = all.length;
  const rowH = (H - 8) / (n + (res !== undefined ? 0.15 : 0.1));
  const minusW = W * 0.2;
  const cw = Math.min(27, (W - minusW - 4) / cols);
  const fs = Math.min(27, rowH * 1.02, cw * 1.22);
  const gw = cols * cw;
  const x0 = minusW + (W - minusW - gw) / 2;
  const lineY = 5 + 2 * rowH + 2;
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
      <text x={x0 - fs * 0.45} y={5 + rowH + rowH * 0.8} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#dc2626">−</text>
      <line x1={Math.max(1, x0 - fs * 0.9)} y1={lineY} x2={x0 + gw + 3} y2={lineY} stroke="#0f172a" strokeWidth="3" />
    </svg>
  );
};

/** Párosító: kivonás oszlopban (az eredmény a másik kártyán, vagy r-rel együtt). */
export const MiniSub: React.FC<{ a: number | string; b: number | string; r?: number | string }> = ({ a, b, r }) => (
  <SubPaint a={a} b={b} res={r} W={150} H={80} cols={Number(a) >= 1000 ? 4 : 3} />
);

/** Csoportosító: kis kivonás oszlopban (eredménnyel vagy anélkül). */
export const SortSub: React.FC<{ a: number; b: number; r?: number }> = ({ a, b, r }) => (
  <SubPaint a={a} b={b} res={r} W={a >= 1000 ? 100 : 88} H={80} cols={a >= 1000 ? 4 : 3} />
);

/** Párosító: pénztárca és egy árcédulás tárgy – mennyi marad? */
export const MiniPay: React.FC<{ wallet: number; kind: ItemKind; price: number }> = ({ wallet, kind, price }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="3" y="18" width="70" height="44" rx="9" fill="#a16207" stroke="#713f12" strokeWidth="3" />
    <text x="38" y="48" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#fff">{wallet}</text>
    <text x="80" y="48" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#dc2626">−</text>
    <ItemIcon kind={kind} cx={118} cy={22} s={0.9} />
    <rect x="88" y="44" width="60" height="32" rx="7" fill="#fff" stroke="#475569" strokeWidth="3" />
    <text x="118" y="68" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{price}</text>
  </svg>
);
