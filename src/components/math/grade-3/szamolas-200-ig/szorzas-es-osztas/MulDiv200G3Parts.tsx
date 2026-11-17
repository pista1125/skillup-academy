import React from 'react';

// ---------------------------------------------------------------------------
// Rajzoló elemek az 5. Szorzás és osztás (200-ig) leckéhez.
// A Figures, a Quiz és a Theory is ezeket használja (a Megálló is átveszi).
// Színek a fejezetben: százas = piros, tízes = kék, egyes = sárga.
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const INK = '#1e293b';
export const ROD = '#3b82f6';
export const ROD_DARK = '#1e3a8a';
export const HUND = '#ef4444';
export const ONE = '#facc15';

/** Kérdésábra-keret: 240 széles, h magas. */
export const QFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 130, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Egy tízesrúd: 10 kis kocka egymás fölött. */
export const Rod: React.FC<{ x: number; y: number; w?: number; h?: number; color?: string }> = ({ x, y, w = 7, h = 50, color = ROD }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="1.2" fill={color} stroke={ROD_DARK} strokeWidth="0.9" />
    {Array.from({ length: 9 }).map((_, k) => (
      <line key={k} x1={x} y1={y + ((k + 1) * h) / 10} x2={x + w} y2={y + ((k + 1) * h) / 10} stroke={ROD_DARK} strokeWidth="0.45" />
    ))}
  </g>
);

/** Százas lap: 10 × 10 kis négyzet. */
export const Flat: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 50 }) => (
  <g>
    <rect x={x} y={y} width={s} height={s} rx="1.5" fill={HUND} stroke="#7f1d1d" strokeWidth="1" />
    {Array.from({ length: 9 }).map((_, k) => (
      <g key={k}>
        <line x1={x + ((k + 1) * s) / 10} y1={y} x2={x + ((k + 1) * s) / 10} y2={y + s} stroke="#7f1d1d" strokeWidth="0.4" />
        <line x1={x} y1={y + ((k + 1) * s) / 10} x2={x + s} y2={y + ((k + 1) * s) / 10} stroke="#7f1d1d" strokeWidth="0.4" />
      </g>
    ))}
  </g>
);

/** Egyeskocka. */
export const Cube: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 6 }) => (
  <rect x={x} y={y} width={s} height={s} rx="1" fill={ONE} stroke="#a16207" strokeWidth="0.8" />
);

/** Hány csoport fér egy sorba a RodGroups rajzon. */
export const rodPerLine = (groups: number, per: number, width = 220) => {
  const gw = per * 7 + (per - 1) * 3 + 12;
  return Math.max(1, Math.min(groups, Math.floor((width + 8) / (gw + 8))));
};

/** Tízesrúd-csoportok: `groups` csoport, mindegyikben `per` rúd, keretben. Sorok magassága: rodH + 16. */
export const RodGroups: React.FC<{
  groups: number;
  per: number;
  y?: number;
  rodH?: number;
  boxed?: boolean;
  x0?: number;
  width?: number;
  labels?: string[];
}> = ({ groups, per, y = 14, rodH = 50, boxed = true, x0 = 10, width = 220, labels }) => {
  const rodW = 7;
  const rodGap = 3;
  const inner = per * rodW + (per - 1) * rodGap;
  const gw = inner + 12;
  const perLine = rodPerLine(groups, per, width);
  return (
    <g>
      {Array.from({ length: groups }).map((_, g) => {
        const line = Math.floor(g / perLine);
        const inLine = Math.min(perLine, groups - line * perLine);
        const lineW = inLine * gw + (inLine - 1) * 8;
        const gx = x0 + (width - lineW) / 2 + (g % perLine) * (gw + 8);
        const gy = y + line * (rodH + 16);
        return (
          <g key={g}>
            {boxed && <rect x={gx} y={gy - 5} width={gw} height={rodH + 10} rx="7" fill="#eff6ff" stroke="#60a5fa" strokeWidth="1.4" />}
            {Array.from({ length: per }).map((__, k) => (
              <Rod key={k} x={gx + 6 + k * (rodW + rodGap)} y={gy} w={rodW} h={rodH} />
            ))}
            {labels && labels[g] && (
              <text x={gx + gw / 2} y={gy + rodH + 20} textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
                {labels[g]}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

/** Forint érme. A 20, 100 és 200 Ft-os sárgás/kétszínű, a többi ezüst. */
export const Coin: React.FC<{ cx: number; cy: number; v: number; r?: number }> = ({ cx, cy, v, r }) => {
  const rr = r ?? (v >= 200 ? 19 : v >= 100 ? 18 : v >= 50 ? 17 : v >= 20 ? 15 : v >= 10 ? 14 : 12);
  const gold = v === 5 || v === 20;
  const bi = v === 100 || v === 200;
  return (
    <g>
      <circle cx={cx} cy={cy} r={rr} fill={gold ? '#fcd34d' : bi ? '#fde68a' : '#e2e8f0'} stroke={gold || bi ? '#b45309' : '#64748b'} strokeWidth="1.5" />
      {bi && <circle cx={cx} cy={cy} r={rr - 5} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.8" />}
      <text x={cx} y={cy + 1.5} textAnchor="middle" fontSize={rr >= 17 ? 11 : 10} fontWeight="bold" fill={INK}>
        {v}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="6.5" fill="#334155">
        Ft
      </text>
    </g>
  );
};

/** Érmék sorokban, középre igazítva. */
export const CoinRows: React.FC<{ v: number; n: number; perRow?: number; y?: number; r?: number }> = ({ v, n, perRow = 7, y = 28, r }) => {
  const rr = r ?? (v >= 50 ? 16 : 14);
  const step = 2 * rr + 5;
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const row = Math.floor(i / perRow);
        const inRow = Math.min(perRow, n - row * perRow);
        const x0 = 120 - ((inRow - 1) * step) / 2;
        return <Coin key={i} cx={x0 + (i % perRow) * step} cy={y + row * (2 * rr + 6)} v={v} r={rr} />;
      })}
    </g>
  );
};

/** Számegyenes egyenlő ugrásokkal 0-tól. A `hideCount` esetén az ugrások fölé nem írunk számot. */
export const Jumps: React.FC<{
  to: number;
  size: number;
  y?: number;
  x?: number;
  w?: number;
  labelEvery?: number;
  showJumps?: number;
  endLabel?: string;
  jumpLabel?: string;
}> = ({ to, size, y = 80, x = 18, w = 204, labelEvery, showJumps, endLabel, jumpLabel }) => {
  const sx = (v: number) => x + (v / to) * w;
  const ticks: number[] = [];
  for (let v = 0; v <= to; v += 10) ticks.push(v);
  const every = labelEvery ?? (to > 100 ? 40 : 20);
  const nJ = showJumps ?? Math.floor(to / size);
  return (
    <g>
      <line x1={x - 6} y1={y} x2={x + w + 12} y2={y} stroke={INK} strokeWidth="1.6" />
      <path d={`M ${x + w + 12} ${y} l -7 -4 v 8 Z`} fill={INK} />
      {ticks.map((v) => {
        const big = v % every === 0;
        return (
          <g key={v}>
            <line x1={sx(v)} y1={y - (big ? 6 : 3.5)} x2={sx(v)} y2={y + (big ? 6 : 3.5)} stroke={INK} strokeWidth={big ? 1.4 : 0.9} />
            {big && (v !== to || !endLabel) && (
              <text x={sx(v)} y={y + 18} textAnchor="middle" fontSize="10" fill="#334155">
                {v}
              </text>
            )}
          </g>
        );
      })}
      {endLabel && (
        <text x={sx(to)} y={y + 18} textAnchor="middle" fontSize="11" fontWeight="bold" fill={endLabel.includes('?') ? UNK : INK}>
          {endLabel}
        </text>
      )}
      {Array.from({ length: nJ }).map((_, i) => {
        const a = sx(i * size);
        const b = sx((i + 1) * size);
        const hgt = Math.min(34, (b - a) * 0.75);
        return (
          <g key={i}>
            <path d={`M ${a} ${y - 3} Q ${(a + b) / 2} ${y - 3 - 2 * hgt} ${b} ${y - 3}`} fill="none" stroke="#f97316" strokeWidth="1.8" />
            <path d={`M ${b} ${y - 3} l -5 -5 M ${b} ${y - 3} l -6.5 1`} stroke="#f97316" strokeWidth="1.8" fill="none" />
            {i === 0 && jumpLabel && (
              <text x={(a + b) / 2} y={y - 8 - hgt} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">
                {jumpLabel}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

/** Tányérok (vagy dobozok), bennük "?" vagy tízesrudak. */
export const Plates: React.FC<{ n: number; rods?: number; y?: number; r?: number; label?: string }> = ({ n, rods, y = 70, r = 22, label }) => {
  const step = Math.min(2 * r + 8, 224 / n);
  const rr = Math.min(r, step / 2 - 2);
  const x0 = 120 - ((n - 1) * step) / 2;
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const cx = x0 + i * step;
        return (
          <g key={i}>
            <ellipse cx={cx} cy={y} rx={rr} ry={rr * 0.8} fill="#fff" stroke="#94a3b8" strokeWidth="1.6" />
            {rods === undefined ? (
              <text x={cx} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>
                ?
              </text>
            ) : (
              Array.from({ length: rods }).map((_, k) => (
                <rect key={k} x={cx - (rods * 5 - 1) / 2 + k * 5} y={y - rr * 0.55} width="3.5" height={rr * 1.1} rx="0.8" fill={ROD} stroke={ROD_DARK} strokeWidth="0.5" />
              ))
            )}
          </g>
        );
      })}
      {label && (
        <text x="120" y={y + rr + 16} textAnchor="middle" fontSize="11" fill="#334155">
          {label}
        </text>
      )}
    </g>
  );
};

/** Nagy, középre írt művelet (□ és ? piros). */
export const BigEq: React.FC<{ text: string; y?: number; fs?: number }> = ({ text, y = 50, fs = 24 }) => {
  const parts = text.split(/([□?△○])/);
  return (
    <text x="120" y={y} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK}>
      {parts.map((p, i) =>
        ['□', '?', '△', '○'].includes(p) ? (
          <tspan key={i} fill={UNK}>
            {p}
          </tspan>
        ) : (
          <tspan key={i}>{p}</tspan>
        )
      )}
    </text>
  );
};

/** Egyszerű árcédula. */
export const Tag: React.FC<{ x: number; y: number; text: string; w?: number; color?: string }> = ({ x, y, text, w = 54, color = '#fef3c7' }) => (
  <g>
    <path d={`M ${x} ${y} h ${w} v 20 h ${-w} l -8 -10 Z`} fill={color} stroke="#b45309" strokeWidth="1.3" />
    <circle cx={x - 2} cy={y + 10} r="2" fill="#b45309" />
    <text x={x + w / 2} y={y + 14.5} textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
      {text}
    </text>
  </g>
);

/** Doboz (pl. ceruzásdoboz), rajta a darabszám. */
export const Box: React.FC<{ x: number; y: number; label: string; w?: number; h?: number; color?: string }> = ({ x, y, label, w = 34, h = 26, color = '#a7f3d0' }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="4" fill={color} stroke="#047857" strokeWidth="1.3" />
    <rect x={x} y={y} width={w} height={7} rx="3" fill="#6ee7b7" stroke="#047857" strokeWidth="1" />
    <text x={x + w / 2} y={y + h - 5} textAnchor="middle" fontSize="11" fontWeight="bold" fill={label.includes('?') ? UNK : '#064e3b'}>
      {label}
    </text>
  </g>
);

// ---------------------------------------------------------------------------
// Magyar nyelvtani segédek számokhoz (0–200).
// ---------------------------------------------------------------------------
const BACK_ONES = [false, false, false, true, false, false, true, false, true, false];
const BACK_TENS = [true, false, true, true, false, false, true, false, true, false];
const isBack = (n: number) => (n % 10 !== 0 ? BACK_ONES[n % 10] : n % 100 !== 0 ? BACK_TENS[(n % 100) / 10] : true);
/** névelő: „az 50”, „a 120” */
export const art = (n: number) => (n === 1 || n === 5 || (n >= 50 && n <= 59) ? 'az' : 'a');
export const Art = (n: number) => (art(n) === 'az' ? 'Az' : 'A');
/** -ban/-ben: „160-ban”, „140-ben” */
export const ban = (n: number) => `${n}-${isBack(n) ? 'ban' : 'ben'}`;
/** -as/-es: „30-as”, „40-es” */
export const asSfx = (n: number) => `${n}-${isBack(n) ? 'as' : n % 10 === 5 ? 'ös' : 'es'}`;
const ACC_ONES = ['', 'et', 't', 'at', 'et', 'öt', 'ot', 'et', 'at', 'et'];
const ACC_TENS = ['', 'et', 'at', 'at', 'et', 'et', 'at', 'et', 'at', 'et'];
/** tárgyeset: „40-et”, „30-at”, „5-öt” */
export const at = (n: number) => `${n}-${n % 10 !== 0 ? ACC_ONES[n % 10] : n % 100 !== 0 ? ACC_TENS[(n % 100) / 10] : 'at'}`;
