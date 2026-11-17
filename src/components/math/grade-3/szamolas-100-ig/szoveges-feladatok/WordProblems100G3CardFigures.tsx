import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.
// Minden kép a történetet mutatja, a választ soha.
// ---------------------------------------------------------------------------

const FONT = 'system-ui, Segoe UI, sans-serif';
const w = (small?: boolean) => (small ? 80 : 150);

/** Pöttyök sorokban (pl. 3 sorban 5-5 szék). `grey` darab az utolsók közül szürke (elhervadt). */
export const DotRowsCard: React.FC<{ rows: number; cols: number; grey?: number; small?: boolean; color?: string }> = ({
  rows,
  cols,
  grey = 0,
  small,
  color = '#f43f5e'
}) => {
  const W = w(small);
  const step = Math.min((W - 12) / cols, 68 / rows, 15);
  const r = step * 0.36;
  const x0 = (W - step * cols) / 2 + step / 2;
  const y0 = (80 - step * rows) / 2 + step / 2;
  const total = rows * cols;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: total }, (_, i) => {
        const isGrey = i >= total - grey;
        return (
          <circle
            key={i}
            cx={x0 + (i % cols) * step}
            cy={y0 + Math.floor(i / cols) * step}
            r={r}
            fill={isGrey ? '#cbd5e1' : color}
            stroke={isGrey ? '#64748b' : '#7f1d1d'}
            strokeWidth="1.6"
          />
        );
      })}
    </svg>
  );
};

/** n egyforma doboz, mindegyiken ugyanaz a szám; mellette `extra` darab külön pálcika (kréta). */
export const BoxesCard: React.FC<{ n: number; each: number; extra?: number; small?: boolean }> = ({ n, each, extra = 0, small }) => {
  const W = w(small);
  const gap = 4;
  const perRow = small ? 2 : n;
  const rowsN = Math.ceil(n / perRow);
  const bh = small ? 30 : 34;
  const perStickRow = extra > 5 ? Math.ceil(extra / 2) : extra;
  const extraW = extra ? perStickRow * 7 + 6 : 0;
  const bw = small ? 34 : Math.min(28, (W - 8 - extraW - (perRow - 1) * gap) / perRow);
  const totalW = perRow * bw + (perRow - 1) * gap + extraW;
  const x0 = (W - totalW) / 2;
  const y0 = (80 - (rowsN * bh + (rowsN - 1) * gap)) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + (i % perRow) * (bw + gap);
        const y = y0 + Math.floor(i / perRow) * (bh + gap);
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx="4" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
            <text x={x + bw / 2} y={y + bh / 2 + 8} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#78350f">
              {each}
            </text>
          </g>
        );
      })}
      {Array.from({ length: extra }, (_, i) => {
        const twoRows = extra > 5;
        const sh = twoRows ? (bh - 4) / 2 : bh - 8;
        const row = Math.floor(i / perStickRow);
        return (
          <rect
            key={`k${i}`}
            x={x0 + perRow * (bw + gap) + 4 + (i % perStickRow) * 7}
            y={twoRows ? y0 + row * (sh + 4) : y0 + 4}
            width="4.5"
            height={sh}
            rx="1.5"
            fill="#38bdf8"
            stroke="#0369a1"
            strokeWidth="1.4"
          />
        );
      })}
    </svg>
  );
};

/**
 * Szakaszos modell: felső (kék) szalag a megadott értékkel, alsó (piros) szalag "?".
 * kind = 'more': az alsó hosszabb `diff`-fel (sárga darab); 'less': rövidebb (szaggatott hiány).
 * A szalagok neve (`topName`, `bottomName`) opcionális rövid betű.
 */
export const BarsCard: React.FC<{
  top: string;
  diff: number;
  kind: 'more' | 'less';
  bottom?: string;
  small?: boolean;
}> = ({ top, diff, kind, bottom = '?', small }) => {
  const W = w(small);
  const x0 = small ? 4 : 10;
  const base = small ? 50 : 92;
  const piece = small ? 24 : 38;
  const h = small ? 28 : 30;
  const y1 = small ? 6 : 6;
  const y2 = small ? 46 : 44;
  const fs = small ? 20 : 22;
  const botLen = kind === 'more' ? base : base - piece;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={x0} y={y1} width={base} height={h} rx="5" fill="#7dd3fc" stroke="#0369a1" strokeWidth="3" />
      <text x={x0 + base / 2} y={y1 + h / 2 + 7.5} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0c4a6e">
        {top}
      </text>
      <rect x={x0} y={y2} width={botLen} height={h} rx="5" fill="#fda4af" stroke="#be123c" strokeWidth="3" />
      <text x={x0 + botLen / 2} y={y2 + h / 2 + 7.5} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#881337">
        {bottom}
      </text>
      {kind === 'more' ? (
        <>
          <rect x={x0 + base} y={y2} width={piece} height={h} rx="5" fill="#fde047" stroke="#a16207" strokeWidth="3" />
          <text x={x0 + base + piece / 2} y={y2 + h / 2 + 7.5} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#713f12">
            {diff}
          </text>
        </>
      ) : (
        <>
          <rect x={x0 + botLen} y={y2} width={piece} height={h} rx="5" fill="none" stroke="#a16207" strokeWidth="2.5" strokeDasharray="5 4" />
          <text x={x0 + botLen + piece / 2} y={y2 + h / 2 + 7.5} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#a16207">
            {diff}
          </text>
        </>
      )}
    </svg>
  );
};

/** Két egyforma kék szalag egymás mögött ugyanazzal a számmal (kétszerese), alatta piros "?" szalag. */
export const DoubleBarsCard: React.FC<{ value: number }> = ({ value }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {[0, 1].map((i) => (
      <g key={i}>
        <rect x={12 + i * 63} y="6" width="63" height="30" rx="5" fill="#7dd3fc" stroke="#0369a1" strokeWidth="3" />
        <text x={12 + i * 63 + 31.5} y="29" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0c4a6e">
          {value}
        </text>
      </g>
    ))}
    <rect x="12" y="44" width="126" height="30" rx="5" fill="#fda4af" stroke="#be123c" strokeWidth="3" />
    <text x="75" y="67" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#881337">
      ?
    </text>
  </svg>
);

/** Két csoport (rózsaszín és kék kupac) a darabszámmal, alattuk közös kapocs "?". */
export const JoinCard: React.FC<{ a: number; b: number; small?: boolean }> = ({ a, b, small }) => {
  const W = w(small);
  const r = small ? 17 : 22;
  const cx1 = small ? 20 : 45;
  const cx2 = small ? 60 : 105;
  const cy = small ? 26 : 30;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <circle cx={cx1} cy={cy} r={r} fill="#fbcfe8" stroke="#be185d" strokeWidth="3" />
      <circle cx={cx2} cy={cy} r={r} fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="3" />
      <text x={cx1} y={cy + 8} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#831843">
        {a}
      </text>
      <text x={cx2} y={cy + 8} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#1e3a8a">
        {b}
      </text>
      <path
        d={`M ${cx1 - r + 2} ${cy + r + 4} Q ${cx1 - r + 2} ${cy + r + 12} ${W / 2} ${cy + r + 12} Q ${cx2 + r - 2} ${cy + r + 12} ${cx2 + r - 2} ${cy + r + 4}`}
        fill="none"
        stroke="#334155"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line x1={W / 2} y1={cy + r + 12} x2={W / 2} y2={cy + r + 17} stroke="#334155" strokeWidth="3" />
    </svg>
  );
};

/** Nagy lufi a lufik számával, mellette kipukkadt csillag a kipukkadtak számával. */
export const BalloonCard: React.FC<{ total: number; gone: number; small?: boolean }> = ({ total, gone, small }) => {
  const W = w(small);
  const bx = small ? 22 : 50;
  const sx = small ? 56 : 108;
  const star = (cx: number, cy: number, R: number, r: number) =>
    Array.from({ length: 16 }, (_, k) => {
      const a = (k * Math.PI) / 8 - Math.PI / 2;
      const rr = k % 2 === 0 ? R : r;
      return `${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <ellipse cx={bx} cy={small ? 28 : 32} rx={small ? 19 : 26} ry={small ? 23 : 28} fill="#fca5a5" stroke="#b91c1c" strokeWidth="3" />
      <path d={small ? `M ${bx} 51 Q ${bx - 4} 62 ${bx + 2} 76` : `M ${bx} 58 Q ${bx - 4} 68 ${bx + 2} 77`} fill="none" stroke="#475569" strokeWidth="2.5" />
      <text x={bx} y={small ? 36 : 40} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#7f1d1d">
        {total}
      </text>
      <polygon points={star(sx, small ? 56 : 40, small ? 23 : 27, small ? 16 : 17)} fill="#fde047" stroke="#a16207" strokeWidth="2.5" />
      <text x={sx} y={(small ? 56 : 40) + 7} textAnchor="middle" fontSize={small ? 19 : 22} fontWeight="bold" fill="#713f12">
        {gone}
      </text>
    </svg>
  );
};

/** Busz az utasok számával ("?" ha ismeretlen); zöld fel-nyíl (felszállt) és piros le-nyíl (leszállt). */
export const BusCard: React.FC<{ onBoard: string; up?: number; down?: number; small?: boolean }> = ({ onBoard, up, down, small }) => {
  const W = w(small);
  const bw = small ? 50 : 68;
  const bx = small ? 2 : 8;
  const arrows: { n: number; dir: 'up' | 'down' }[] = [];
  if (up !== undefined) arrows.push({ n: up, dir: 'up' });
  if (down !== undefined) arrows.push({ n: down, dir: 'down' });
  const ax0 = bx + bw + (small ? 4 : 8);
  const aw = small ? 24 : 34;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={bx} y="14" width={bw} height="46" rx="8" fill="#facc15" stroke="#854d0e" strokeWidth="3" />
      <rect x={bx + 6} y="20" width={bw - 12} height="14" rx="3" fill="#e0f2fe" stroke="#854d0e" strokeWidth="2" />
      <text x={bx + bw / 2} y="56" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#422006">
        {onBoard}
      </text>
      <circle cx={bx + 14} cy="63" r="7" fill="#334155" />
      <circle cx={bx + bw - 14} cy="63" r="7" fill="#334155" />
      {arrows.map((a, i) => {
        const x = ax0 + i * (aw + 4) + aw / 2;
        const col = a.dir === 'up' ? '#16a34a' : '#dc2626';
        const tipY = a.dir === 'up' ? 8 : 74;
        const tailY = a.dir === 'up' ? 46 : 36;
        const head = a.dir === 'up' ? `${x - 9},${tipY + 11} ${x},${tipY} ${x + 9},${tipY + 11}` : `${x - 9},${tipY - 11} ${x},${tipY} ${x + 9},${tipY - 11}`;
        return (
          <g key={i}>
            <line x1={x} y1={tailY} x2={x} y2={a.dir === 'up' ? tipY + 6 : tipY - 6} stroke={col} strokeWidth="4" strokeLinecap="round" />
            <polyline points={head} fill="none" stroke={col} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <text x={x} y={a.dir === 'up' ? 68 : 28} textAnchor="middle" fontSize="22" fontWeight="bold" fill={col}>
              {a.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Halom (kupac) a darabszámmal és `people` darab mosolygó gyerekfej, akik között elosztják. */
export const ShareCard: React.FC<{ total: number; people: number; small?: boolean }> = ({ total, people, small }) => {
  const W = w(small);
  const pile = small ? { x: 40, y: 26 } : { x: 34, y: 40 };
  const fr = small ? 8.5 : 10;
  const faces = Array.from({ length: people }, (_, i) =>
    small
      ? { x: 40 + (i - (people - 1) / 2) * (fr * 2 + 3), y: 68 }
      : { x: 92 + (i % 2) * 28, y: 22 + Math.floor(i / 2) * 32 - (people <= 2 ? -16 : 0) }
  );
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <path
        d={`M ${pile.x - 28} ${pile.y + 16} Q ${pile.x - 26} ${pile.y - 18} ${pile.x} ${pile.y - 20} Q ${pile.x + 26} ${pile.y - 18} ${pile.x + 28} ${pile.y + 16} Z`}
        fill="#c4b5fd"
        stroke="#5b21b6"
        strokeWidth="3"
      />
      <text x={pile.x} y={pile.y + 8} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#3b0764">
        {total}
      </text>
      {faces.map((f, i) => (
        <g key={i}>
          <circle cx={f.x} cy={f.y} r={fr} fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
          <circle cx={f.x - fr * 0.35} cy={f.y - fr * 0.2} r={fr * 0.13} fill="#1e293b" />
          <circle cx={f.x + fr * 0.35} cy={f.y - fr * 0.2} r={fr * 0.13} fill="#1e293b" />
          <path d={`M ${f.x - fr * 0.45} ${f.y + fr * 0.25} Q ${f.x} ${f.y + fr * 0.7} ${f.x + fr * 0.45} ${f.y + fr * 0.25}`} fill="none" stroke="#1e293b" strokeWidth="1.6" />
        </g>
      ))}
    </svg>
  );
};

/** Pénztárca a pénzzel és árcédulák (Ft). */
export const PurseCard: React.FC<{ money: number; prices: number[]; small?: boolean }> = ({ money, prices, small }) => {
  const W = w(small);
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
        <rect x="14" y="4" width="52" height="32" rx="7" fill="#86efac" stroke="#15803d" strokeWidth="3" />
        <text x="40" y="28" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#14532d">
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
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="6" y="18" width="56" height="44" rx="9" fill="#86efac" stroke="#15803d" strokeWidth="3" />
      <path d="M 6 30 L 62 30" stroke="#15803d" strokeWidth="2.5" />
      <text x="34" y="54" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#14532d">
        {money}
      </text>
      {prices.map((p, i) => (
        <g key={i}>
          <path d={`M ${72 + i * 39} 26 L ${80 + i * 39} 16 L ${108 + i * 39} 16 L ${108 + i * 39} 64 L ${80 + i * 39} 64 L ${72 + i * 39} 54 Z`} fill="#fff" stroke="#c2410c" strokeWidth="3" strokeLinejoin="round" />
          <text x={92 + i * 39} y="48" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#9a3412">
            {p}
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Dobozok "8"-cal, majd "?" darab doboz (hiányzó adat). */
export const UnknownBoxesCard: React.FC<{ each: number }> = ({ each }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {[0, 1].map((i) => (
      <g key={i}>
        <rect x={4 + i * 37} y="6" width="34" height="32" rx="4" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
        <text x={21 + i * 37} y="30" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#78350f">
          {each}
        </text>
      </g>
    ))}
    <rect x="4" y="44" width="71" height="32" rx="4" fill="none" stroke="#92400e" strokeWidth="3" strokeDasharray="6 4" />
    <text x="40" y="68" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#92400e">
      ?
    </text>
  </svg>
);
