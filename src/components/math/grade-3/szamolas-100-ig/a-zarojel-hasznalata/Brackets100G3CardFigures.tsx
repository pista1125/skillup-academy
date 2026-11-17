import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.
// Képi nyelv a tananyagból: tányérok kétféle gyümölccsel, kupacok szétosztása,
// pénztárca és árcédulák, narancs keret a zárójel körül. A végeredmény sosincs a képen.
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';

/** A műveletsor nagy számokkal; a zárójeles rész narancs keretben, "1." jellel. */
export const BracketFocusCard: React.FC<{ tokens: string[]; from: number; to: number }> = ({ tokens, from, to }) => {
  const width = (t: string) => (t === '(' || t === ')' ? 9 : /^[0-9]+$/.test(t) ? t.length * 13 + 3 : 20);
  const widths = tokens.map(width);
  const total = widths.reduce((a, b) => a + b, 0);
  let x = (150 - total) / 2;
  const xs = widths.map((w) => {
    const c = x + w / 2;
    x += w;
    return c;
  });
  const bx0 = xs[from] - widths[from] / 2 - 2;
  const bx1 = xs[to] + widths[to] / 2 + 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={bx0} y="22" width={bx1 - bx0} height="40" rx="9" fill="#ffedd5" stroke="#ea580c" strokeWidth="3" />
      <circle cx={(bx0 + bx1) / 2} cy="12" r="10" fill="#ea580c" />
      <text x={(bx0 + bx1) / 2} y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">
        1.
      </text>
      {tokens.map((t, i) => (
        <text key={i} x={xs[i]} y="51" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">
          {t}
        </text>
      ))}
    </svg>
  );
};

const Plate: React.FC<{ cx: number; cy: number; w: number; h: number; a: number; b?: number; fs: number }> = ({ cx, cy, w, h, a, b, fs }) => {
  const two = b !== undefined;
  const rr = Math.min(h * 0.42, two ? w * 0.2 : w * 0.3);
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} fill="#f1f5f9" stroke="#475569" strokeWidth="2.5" />
      <circle cx={two ? cx - w * 0.22 : cx} cy={cy} r={rr} fill="#fca5a5" stroke="#b91c1c" strokeWidth="2" />
      <text x={two ? cx - w * 0.22 : cx} y={cy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#7f1d1d">
        {a}
      </text>
      {two && (
        <>
          <circle cx={cx + w * 0.22} cy={cy} r={rr} fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
          <text x={cx + w * 0.22} y={cy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#14532d">
            {b}
          </text>
        </>
      )}
    </g>
  );
};

const Pile: React.FC<{ cx: number; cy: number; w: number; h: number; n: number; fs: number }> = ({ cx, cy, w, h, n, fs }) => (
  <g>
    <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={Math.min(h, w) / 2} fill="#fde68a" stroke="#a16207" strokeWidth="2.5" />
    <text x={cx} y={cy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#713f12">
      {n}
    </text>
  </g>
);

/**
 * Tányérok: mindegyiken `a` piros és `b` zöld gyümölcs (a számok a tányéron).
 * `pile`: külön sárga kupac (pileFirst: a tányérok előtt). small = csoportosító (80 × 80).
 */
export const PlatesCard: React.FC<{ plates: number; a: number; b?: number; pile?: number; pileFirst?: boolean; small?: boolean }> = ({
  plates,
  a,
  b,
  pile,
  pileFirst,
  small
}) => {
  if (small) {
    const cols = b !== undefined ? 1 : plates <= 2 ? plates : plates <= 4 ? 2 : 3;
    const rows = Math.ceil(plates / cols);
    const areaH = pile !== undefined ? 52 : 76;
    const pw = b !== undefined ? 66 : Math.min(38, (76 - (cols - 1) * 3) / cols);
    const ph = Math.min(b !== undefined ? 34 : 30, (areaH - (rows - 1) * 3) / rows);
    const gx = (80 - (cols * pw + (cols - 1) * 3)) / 2;
    const top = pile !== undefined && pileFirst ? 28 : pile !== undefined ? 2 : (80 - (rows * ph + (rows - 1) * 3)) / 2;
    const fs = cols === 3 ? 14 : 18;
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        {Array.from({ length: plates }, (_, i) => (
          <Plate key={i} cx={gx + (i % cols) * (pw + 3) + pw / 2} cy={top + Math.floor(i / cols) * (ph + 3) + ph / 2} w={pw} h={ph} a={a} b={b} fs={fs} />
        ))}
        {pile !== undefined && <Pile cx={40} cy={pileFirst ? 13 : 66} w={44} h={24} n={pile} fs={20} />}
      </svg>
    );
  }
  const perRow = plates > 3 ? Math.ceil(plates / 2) : plates;
  const rows = Math.ceil(plates / perRow);
  const pileW = pile !== undefined ? 40 : 0;
  const availW = 146 - pileW - (pileW ? 6 : 0);
  const pw = Math.min(b !== undefined ? 48 : 40, (availW - (perRow - 1) * 4) / perRow);
  const ph = rows > 1 ? 36 : 50;
  const groupW = perRow * pw + (perRow - 1) * 4;
  const totalW = groupW + (pileW ? pileW + 6 : 0);
  const x0 = (150 - totalW) / 2;
  const platesX = pile !== undefined && pileFirst ? x0 + pileW + 6 : x0;
  const pileCx = pileFirst ? x0 + pileW / 2 : x0 + groupW + 6 + pileW / 2;
  const y0 = (80 - (rows * ph + (rows - 1) * 4)) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: plates }, (_, i) => (
        <Plate
          key={i}
          cx={platesX + (i % perRow) * (pw + 4) + pw / 2}
          cy={y0 + Math.floor(i / perRow) * (ph + 4) + ph / 2}
          w={pw}
          h={ph}
          a={a}
          b={b}
          fs={b !== undefined ? 18 : 22}
        />
      ))}
      {pile !== undefined && <Pile cx={pileCx} cy={40} w={pileW} h={34} n={pile} fs={22} />}
    </svg>
  );
};

const Kid: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#fde68a" stroke="#92400e" strokeWidth="2.2" />
    <circle cx={x - r * 0.35} cy={y - r * 0.2} r={r * 0.13} fill="#1e293b" />
    <circle cx={x + r * 0.35} cy={y - r * 0.2} r={r * 0.13} fill="#1e293b" />
    <path d={`M ${x - r * 0.45} ${y + r * 0.25} Q ${x} ${y + r * 0.7} ${x + r * 0.45} ${y + r * 0.25}`} fill="none" stroke="#1e293b" strokeWidth="1.5" />
  </g>
);

/** Két kupac (piros és kék) a darabszámmal; alattuk a gyerekek, akik egyenlően osztoznak. */
export const ShareCard: React.FC<{ piles: [number, number]; kids: number; small?: boolean }> = ({ piles, kids, small }) => {
  const W = small ? 80 : 150;
  const pw = small ? 34 : 48;
  const ph = small ? 28 : 30;
  const px = small ? [4, 42] : [24, 78];
  const kr = small ? Math.min(kids <= 3 ? 10 : 8, 74 / kids / 2 - 1.5) : 10;
  const ky = small ? 66 : 62;
  const kStep = kr * 2 + 3;
  const kx0 = W / 2 - ((kids - 1) * kStep) / 2;
  const cols = [
    ['#fca5a5', '#b91c1c', '#7f1d1d'],
    ['#93c5fd', '#1d4ed8', '#1e3a8a']
  ];
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {piles.map((n, i) => (
        <g key={i}>
          <path
            d={`M ${px[i]} ${4 + ph} Q ${px[i] + 2} 4 ${px[i] + pw / 2} 4 Q ${px[i] + pw - 2} 4 ${px[i] + pw} ${4 + ph} Z`}
            fill={cols[i][0]}
            stroke={cols[i][1]}
            strokeWidth="2.5"
          />
          <text x={px[i] + pw / 2} y={4 + ph - 5} textAnchor="middle" fontSize={small ? 19 : 22} fontWeight="bold" fill={cols[i][2]}>
            {n}
          </text>
        </g>
      ))}
      {Array.from({ length: kids }, (_, i) => (
        <Kid key={i} x={kx0 + i * kStep} y={ky} r={kr} />
      ))}
    </svg>
  );
};

/** Pénztárca a pénzzel és két árcédula. */
export const PurseCard: React.FC<{ money: number; prices: [number, number]; small?: boolean }> = ({ money, prices, small }) => {
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <rect x="12" y="4" width="56" height="32" rx="7" fill="#86efac" stroke="#15803d" strokeWidth="3" />
        <text x="40" y="28" textAnchor="middle" fontSize="21" fontWeight="bold" fill="#14532d">
          {money}
        </text>
        {prices.map((p, i) => (
          <g key={i}>
            <rect x={4 + i * 38} y="44" width="34" height="30" rx="4" fill="#fff" stroke="#c2410c" strokeWidth="3" />
            <text x={21 + i * 38} y="66" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#9a3412">
              {p}
            </text>
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="4" y="18" width="58" height="44" rx="9" fill="#86efac" stroke="#15803d" strokeWidth="3" />
      <path d="M 4 30 L 62 30" stroke="#15803d" strokeWidth="2.5" />
      <text x="33" y="54" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#14532d">
        {money}
      </text>
      {prices.map((p, i) => (
        <g key={i}>
          <path d={`M ${70 + i * 40} 26 L ${78 + i * 40} 16 L ${106 + i * 40} 16 L ${106 + i * 40} 64 L ${78 + i * 40} 64 L ${70 + i * 40} 54 Z`} fill="#fff" stroke="#c2410c" strokeWidth="3" strokeLinejoin="round" />
          <text x={90 + i * 40} y="48" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#9a3412">
            {p}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Busz az utasok számával, két piros le-nyíllal: ennyien szálltak le (csoportosító, 80 × 80). */
export const BusDownCard: React.FC<{ onBoard: number; downs: [number, number] }> = ({ onBoard, downs }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="6" y="4" width="68" height="38" rx="7" fill="#facc15" stroke="#854d0e" strokeWidth="3" />
    <rect x="11" y="9" width="20" height="11" rx="2" fill="#e0f2fe" stroke="#854d0e" strokeWidth="1.8" />
    <text x="52" y="32" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#422006">
      {onBoard}
    </text>
    <circle cx="20" cy="44" r="5" fill="#334155" />
    <circle cx="60" cy="44" r="5" fill="#334155" />
    {downs.map((d, i) => {
      const x = 14 + i * 36;
      return (
        <g key={i}>
          <line x1={x} y1="52" x2={x} y2="72" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
          <polyline points={`${x - 6},66 ${x},74 ${x + 6},66`} fill="none" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x={x + 9} y="72" fontSize="19" fontWeight="bold" fill="#b91c1c">
            {d}
          </text>
        </g>
      );
    })}
  </svg>
);
