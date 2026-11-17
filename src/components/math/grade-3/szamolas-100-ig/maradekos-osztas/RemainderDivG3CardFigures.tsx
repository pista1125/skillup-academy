import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz
// Ugyanaz a képi nyelv, mint a tananyagban: piros korongok, kék zacskók.
// ---------------------------------------------------------------------------

const DOT = '#ef4444';
const DOT_LINE = '#991b1b';
const BAG = '#dbeafe';
const BAG_LINE = '#2563eb';

const Dot: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <circle cx={cx} cy={cy} r={r} fill={DOT} stroke={DOT_LINE} strokeWidth="1.5" />
);

/**
 * Párosító (150 × 80): groups db kék keret, mindegyikben size korong, jobbra a maradék
 * korongok keret nélkül. A gyerek megszámolja a kereteket és a maradékot.
 */
export const PacksRowCard: React.FC<{ groups: number; size: number; loose: number }> = ({ groups, size, loose }) => {
  const W = 150;
  const H = 80;
  const cols = size <= 3 ? 1 : 2;
  const rows = Math.ceil(size / cols);
  const pillU = cols + 0.6;
  const gapU = 0.45;
  const looseCols = Math.min(cols, loose) || 1;
  const looseRows = Math.ceil(loose / looseCols);
  const sepU = 1.1;
  const natU = groups * pillU + (groups - 1) * gapU + (loose > 0 ? sepU + looseCols : 0);
  const p = Math.min((W - 8) / natU, (H - 8) / (Math.max(rows, looseRows) + 0.6), 16);
  const r = p * 0.38;
  const pw = pillU * p;
  const ph = (rows + 0.6) * p;
  const ox = (W - natU * p) / 2;
  const oy = (H - ph) / 2;
  const lx = ox + (groups * pillU + (groups - 1) * gapU + sepU) * p;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: groups }, (_, g) => {
        const gx = ox + g * (pw + gapU * p);
        return (
          <g key={g}>
            <rect x={gx} y={oy} width={pw} height={ph} rx={Math.min(pw, ph) / 2.4} fill={BAG} stroke={BAG_LINE} strokeWidth="2.5" />
            {Array.from({ length: size }, (_, k) => (
              <Dot key={k} cx={gx + 0.3 * p + (k % cols) * p + p / 2} cy={oy + 0.3 * p + Math.floor(k / cols) * p + p / 2} r={r} />
            ))}
          </g>
        );
      })}
      {Array.from({ length: loose }, (_, k) => (
        <Dot key={`l${k}`} cx={lx + (k % looseCols) * p + p / 2} cy={oy + 0.3 * p + Math.floor(k / looseCols) * p + p / 2} r={r} />
      ))}
    </svg>
  );
};

/** Egy kék zacskó (bal felső sarok x, y; szélesség w). */
const Bag: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => {
  const h = w * 1.15;
  return (
    <g>
      <path
        d={`M ${x} ${y + h * 0.25} L ${x + w} ${y + h * 0.25} L ${x + w * 0.9} ${y + h} L ${x + w * 0.1} ${y + h} Z`}
        fill="#93c5fd"
        stroke={BAG_LINE}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d={`M ${x + w * 0.2} ${y + h * 0.25} Q ${x + w * 0.5} ${y - h * 0.05} ${x + w * 0.8} ${y + h * 0.25}`} fill="none" stroke={BAG_LINE} strokeWidth="2.5" />
    </g>
  );
};

/**
 * Tele zacskók + maradék korongok (a zacskóban lévő korongokat nem rajzoljuk).
 * Nagy (150 × 80): zacskók balra (soronként legfeljebb 4), korongok jobbra.
 * small (80 × 80): zacskók felül egy sorban, korongok alattuk (soronként legfeljebb 6).
 */
export const BagsCard: React.FC<{ bags: number; loose: number; small?: boolean }> = ({ bags, loose, small }) => {
  if (small) {
    const bw = Math.min(20, 72 / bags - 4);
    const bh = bw * 1.15;
    const bagsW = bags * bw + (bags - 1) * 4;
    const bx = (80 - bagsW) / 2;
    const lc = Math.min(6, loose);
    const lr = Math.ceil(loose / 6);
    const p = 11.5;
    const lx = (80 - lc * p) / 2;
    const top = (80 - bh - 6 - lr * p) / 2;
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: bags }, (_, i) => (
          <Bag key={i} x={bx + i * (bw + 4)} y={top} w={bw} />
        ))}
        {Array.from({ length: loose }, (_, k) => (
          <Dot key={k} cx={lx + (k % 6) * p + p / 2} cy={top + bh + 6 + Math.floor(k / 6) * p + p / 2} r={4.4} />
        ))}
      </svg>
    );
  }
  const perRow = 4;
  const bagRows = Math.ceil(bags / perRow);
  const bw = 22;
  const bh = bw * 1.15;
  const bp = 27;
  const rowP = bh + 6;
  const bagsW = Math.min(bags, perRow) * bp - (bp - bw);
  const lc = loose > 4 ? 2 : 1;
  const lr = Math.ceil(loose / lc);
  const p = 14;
  const looseW = loose > 0 ? lc * p : 0;
  const gap = loose > 0 ? 14 : 0;
  const totW = bagsW + gap + looseW;
  const ox = (150 - totW) / 2;
  const bagsH = bagRows * rowP - 6;
  const by = (80 - bagsH) / 2;
  const ly = (80 - lr * p) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: bags }, (_, i) => (
        <Bag key={i} x={ox + (i % perRow) * bp} y={by + Math.floor(i / perRow) * rowP} w={bw} />
      ))}
      {Array.from({ length: loose }, (_, k) => (
        <Dot key={k} cx={ox + bagsW + gap + (k % lc) * p + p / 2} cy={ly + Math.floor(k / lc) * p + p / 2} r={5.3} />
      ))}
    </svg>
  );
};

/**
 * Csoportosító (80 × 80): a korongok per-esével kék keretben (egy keret = egy csoport),
 * a maradék keret nélkül az utolsó helyen. per ≤ 3 esetén két oszlopban.
 */
export const RowsCard: React.FC<{ groups: number; per: number; loose: number }> = ({ groups, per, loose }) => {
  const nCols = per <= 3 ? 2 : 1;
  const slots = groups + (loose > 0 ? 1 : 0);
  const rows = Math.ceil(slots / nCols);
  const pillU = per + 0.5;
  const colGapU = 0.6;
  const rowU = 1.3;
  const wU = nCols * pillU + (nCols - 1) * colGapU;
  const hU = rows * rowU - 0.3;
  const p = Math.min(74 / wU, 74 / hU, 15);
  const r = p * 0.38;
  const ox = (80 - wU * p) / 2;
  const oy = (80 - hU * p) / 2;
  const items: React.ReactNode[] = [];
  for (let s = 0; s < slots; s++) {
    const c = s % nCols;
    const rr = Math.floor(s / nCols);
    const x = ox + c * (pillU + colGapU) * p;
    const y = oy + rr * rowU * p;
    const isLoose = s === groups;
    const n = isLoose ? loose : per;
    if (!isLoose) {
      items.push(<rect key={`p${s}`} x={x} y={y} width={pillU * p} height={p} rx={p / 2} fill={BAG} stroke={BAG_LINE} strokeWidth="2.2" />);
    }
    for (let k = 0; k < n; k++) items.push(<Dot key={`d${s}-${k}`} cx={x + 0.25 * p + k * p + p / 2} cy={y + p / 2} r={r} />);
  }
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      {items}
    </svg>
  );
};
