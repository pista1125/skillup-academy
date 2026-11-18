import React from 'react';
import { WORD20_FONT } from './WordProblems20G2Parts';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.
// Minden kép a történetet mutatja, a választ soha! Vastag vonalak (≥ 3), nagy számok (≥ 22).
// ---------------------------------------------------------------------------

const cardW = (small?: boolean) => (small ? 80 : 150);

/** Két csoport (a és b) egymás mellett, alul közös kapocs „?”. */
export const StripJoinCard: React.FC<{ a: number; b: number; small?: boolean }> = ({ a, b, small }) => {
  const W = cardW(small);
  const r = small ? 17 : 22;
  const cx1 = small ? 21 : 46;
  const cx2 = small ? 59 : 104;
  const cy = small ? 26 : 30;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={WORD20_FONT}>
      <circle cx={cx1} cy={cy} r={r} fill="#fbcfe8" stroke="#be185d" strokeWidth="3" />
      <circle cx={cx2} cy={cy} r={r} fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="3" />
      <text x={cx1} y={cy + 8} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#831843">
        {a}
      </text>
      <text x={cx2} y={cy + 8} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#1e3a8a">
        {b}
      </text>
      <path
        d={`M ${cx1 - r + 2} ${cy + r + 4} Q ${cx1 - r + 2} ${cy + r + 13} ${W / 2} ${cy + r + 13} Q ${cx2 + r - 2} ${cy + r + 13} ${cx2 + r - 2} ${cy + r + 4}`}
        fill="none"
        stroke="#334155"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line x1={W / 2} y1={cy + r + 13} x2={W / 2} y2={cy + r + 18} stroke="#334155" strokeWidth="3" />
    </svg>
  );
};

/** Összesen `total` korong/lufi, ebből `gone` elszállt / kipukkadt (sárga csillagban). */
export const StripCrossCard: React.FC<{ total: number; gone: number; small?: boolean }> = ({ total, gone, small }) => {
  const W = cardW(small);
  const bx = small ? 23 : 48;
  const sx = small ? 57 : 108;
  const star = (cx: number, cy: number, R: number, r: number) =>
    Array.from({ length: 16 }, (_, k) => {
      const a = (k * Math.PI) / 8 - Math.PI / 2;
      const rr = k % 2 === 0 ? R : r;
      return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={WORD20_FONT}>
      <ellipse cx={bx} cy={small ? 27 : 31} rx={small ? 19 : 26} ry={small ? 22 : 27} fill="#fca5a5" stroke="#b91c1c" strokeWidth="3" />
      <path d={small ? `M ${bx} 49 Q ${bx - 4} 61 ${bx + 2} 75` : `M ${bx} 58 Q ${bx - 4} 68 ${bx + 2} 77`} fill="none" stroke="#475569" strokeWidth="3" />
      <text x={bx} y={small ? 35 : 39} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#7f1d1d">
        {total}
      </text>
      <polygon points={star(sx, small ? 55 : 40, small ? 23 : 27, small ? 16 : 17)} fill="#fde047" stroke="#a16207" strokeWidth="3" />
      <text x={sx} y={(small ? 55 : 40) + 8} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#713f12">
        {gone}
      </text>
    </svg>
  );
};

/** Két szalag összehasonlítása: felső kék `top`, alsó piros `?`, sárga/szaggatott különbség `diff`. */
export const CompareBarsCard: React.FC<{
  top: string;
  diff: number;
  kind: 'more' | 'less';
  bottom?: string;
  small?: boolean;
}> = ({ top, diff, kind, bottom = '?', small }) => {
  const W = cardW(small);
  const x0 = small ? 4 : 10;
  const base = small ? 46 : 92;
  const piece = small ? 26 : 38;
  const h = 30;
  const y1 = 6;
  const y2 = 44;
  const botLen = kind === 'more' ? base : small ? 44 : base - piece;
  const fullTop = kind === 'less' && small ? 72 : base;

  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={WORD20_FONT}>
      <rect x={x0} y={y1} width={fullTop} height={h} rx="5" fill="#7dd3fc" stroke="#0369a1" strokeWidth="3" />
      <text x={x0 + fullTop / 2} y={y1 + 23} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0c4a6e">
        {top}
      </text>
      <rect x={x0} y={y2} width={botLen} height={h} rx="5" fill="#fda4af" stroke="#be123c" strokeWidth="3" />
      <text x={x0 + botLen / 2} y={y2 + 23} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#881337">
        {bottom}
      </text>
      {kind === 'more' ? (
        <>
          <rect x={x0 + base} y={y2} width={piece} height={h} rx="5" fill="#fde047" stroke="#a16207" strokeWidth="3" />
          <text x={x0 + base + piece / 2} y={y2 + 23} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#713f12">
            {diff}
          </text>
        </>
      ) : (
        <>
          <rect
            x={x0 + botLen}
            y={y2}
            width={small ? 28 : piece}
            height={h}
            rx="5"
            fill="none"
            stroke="#a16207"
            strokeWidth="3"
            strokeDasharray="5 4"
          />
          <text x={x0 + botLen + (small ? 14 : piece / 2)} y={y2 + 23} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#a16207">
            {diff}
          </text>
        </>
      )}
    </svg>
  );
};

/** Egész szalag felül (`whole`), alul két rész: ismert `part` és hiányzó `?`. */
export const MissingPartStripCard: React.FC<{ whole: number; part: number; small?: boolean }> = ({ whole, part, small }) => {
  const W = cardW(small);
  const x0 = small ? 4 : 10;
  const fullW = W - 2 * x0;
  const leftW = Math.round(fullW * 0.56);
  const rightW = fullW - leftW;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={WORD20_FONT}>
      <rect x={x0} y="6" width={fullW} height="30" rx="5" fill="#fed7aa" stroke="#c2410c" strokeWidth="3" />
      <text x={x0 + fullW / 2} y="29" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#7c2d12">
        {whole}
      </text>
      <rect x={x0} y="44" width={leftW} height="30" rx="5" fill="#bbf7d0" stroke="#15803d" strokeWidth="3" />
      <text x={x0 + leftW / 2} y="67" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#14532d">
        {part}
      </text>
      <rect x={x0 + leftW} y="44" width={rightW} height="30" rx="5" fill="#fef3c7" stroke="#dc2626" strokeWidth="3" strokeDasharray="5 3" />
      <text x={x0 + leftW + rightW / 2} y="67" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#dc2626">
        ?
      </text>
    </svg>
  );
};

/** Busz az utasok számával (`onBoard`), zöld fel-nyíl és/vagy piros le-nyíl. */
export const TwoStepBusCard: React.FC<{ onBoard: string; up?: number; down?: number; small?: boolean }> = ({
  onBoard,
  up,
  down,
  small,
}) => {
  const W = cardW(small);
  const arrows: { n: number; dir: 'up' | 'down' }[] = [];
  if (up !== undefined) arrows.push({ n: up, dir: 'up' });
  if (down !== undefined) arrows.push({ n: down, dir: 'down' });
  const twoSmall = Boolean(small && arrows.length === 2);
  const bw = twoSmall ? 40 : small ? 48 : 66;
  const bx = small ? 2 : 8;
  const ax0 = bx + bw + (twoSmall ? 2 : small ? 4 : 8);
  const aw = twoSmall ? 16 : small ? 24 : 34;
  const agap = twoSmall ? 2 : 4;
  const headDx = twoSmall ? 5.5 : 8;

  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={WORD20_FONT}>
      <rect x={bx} y="14" width={bw} height="46" rx="8" fill="#facc15" stroke="#854d0e" strokeWidth="3" />
      <rect x={bx + 5} y="20" width={bw - 10} height="13" rx="3" fill="#e0f2fe" stroke="#854d0e" strokeWidth="2" />
      <text x={bx + bw / 2} y="56" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#422006">
        {onBoard}
      </text>
      <circle cx={bx + 11} cy="64" r="6.5" fill="#334155" />
      <circle cx={bx + bw - 11} cy="64" r="6.5" fill="#334155" />
      {arrows.map((a, i) => {
        const x = ax0 + i * (aw + agap) + aw / 2;
        const col = a.dir === 'up' ? '#16a34a' : '#dc2626';
        const tipY = a.dir === 'up' ? 8 : 74;
        const tailY = a.dir === 'up' ? 45 : 37;
        const head =
          a.dir === 'up'
            ? `${x - headDx},${tipY + 9} ${x},${tipY} ${x + headDx},${tipY + 9}`
            : `${x - headDx},${tipY - 9} ${x},${tipY} ${x + headDx},${tipY - 9}`;
        return (
          <g key={i}>
            <line x1={x} y1={tailY} x2={x} y2={a.dir === 'up' ? tipY + 5 : tipY - 5} stroke={col} strokeWidth="3.5" strokeLinecap="round" />
            <polyline points={head} fill="none" stroke={col} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x={x} y={a.dir === 'up' ? 69 : 28} textAnchor="middle" fontSize="22" fontWeight="bold" fill={col}>
              {a.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Egyenlő két részre osztás párosítással (osztásjel nélkül!): felső `total`, alul két egyenlő `?` és `?`. */
export const EqualPairShareCard: React.FC<{ total: number; small?: boolean }> = ({ total, small }) => {
  const W = cardW(small);
  const x0 = small ? 4 : 10;
  const fullW = W - 2 * x0;
  const halfW = (fullW - 4) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={WORD20_FONT}>
      <rect x={x0} y="6" width={fullW} height="30" rx="5" fill="#ddd6fe" stroke="#6d28d9" strokeWidth="3" />
      <text x={x0 + fullW / 2} y="29" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#4c1d95">
        {total}
      </text>
      <rect x={x0} y="44" width={halfW} height="30" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="3" strokeDasharray="5 3" />
      <text x={x0 + halfW / 2} y="67" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#dc2626">
        ?
      </text>
      <rect x={x0 + halfW + 4} y="44" width={halfW} height="30" rx="5" fill="#fef3c7" stroke="#d97706" strokeWidth="3" strokeDasharray="5 3" />
      <text x={x0 + halfW + 4 + halfW / 2} y="67" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#dc2626">
        ?
      </text>
    </svg>
  );
};

/** Zsetonos pénztárca és árcédulák (≤ 20). */
export const TokensPurseCard: React.FC<{ money: number; prices: [number, number]; small?: boolean }> = ({ money, prices, small }) => {
  const W = cardW(small);
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={WORD20_FONT}>
        <rect x="12" y="4" width="56" height="32" rx="7" fill="#86efac" stroke="#15803d" strokeWidth="3" />
        <text x="40" y="28" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#14532d">
          {money}
        </text>
        {prices.map((p, i) => (
          <g key={i}>
            <rect x={4 + i * 38} y="44" width="34" height="30" rx="4" fill="#ffffff" stroke="#c2410c" strokeWidth="3" />
            <text x={21 + i * 38} y="67" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#9a3412">
              {p}
            </text>
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={WORD20_FONT}>
      <rect x="6" y="16" width="54" height="48" rx="9" fill="#86efac" stroke="#15803d" strokeWidth="3" />
      <path d="M 6 29 L 60 29" stroke="#15803d" strokeWidth="3" />
      <text x="33" y="55" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#14532d">
        {money}
      </text>
      {prices.map((p, i) => (
        <g key={i}>
          <path
            d={`M ${68 + i * 40} 26 L ${77 + i * 40} 16 L ${104 + i * 40} 16 L ${104 + i * 40} 64 L ${77 + i * 40} 64 L ${68 + i * 40} 54 Z`}
            fill="#ffffff"
            stroke="#c2410c"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <text x={89 + i * 40} y="48" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#9a3412">
            {p}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Hiányzó adat kártya (`80×80`): egyik adat látszik (`known`), a másik helyén nagy szaggatott `?`. */
export const UnknownDataCard: React.FC<{ known: number }> = ({ known }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={WORD20_FONT}>
    <rect x="6" y="6" width="68" height="30" rx="5" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="3" />
    <text x="40" y="29" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#1e3a8a">
      {known}
    </text>
    <rect x="6" y="44" width="68" height="30" rx="5" fill="#ffffff" stroke="#dc2626" strokeWidth="3" strokeDasharray="6 4" />
    <text x="40" y="67" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">
      ?
    </text>
  </svg>
);
