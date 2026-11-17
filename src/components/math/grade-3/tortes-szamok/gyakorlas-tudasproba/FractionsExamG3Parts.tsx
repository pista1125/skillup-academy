import React from 'react';
import { FONT, UNK, rnd, pick, shuffle, PART_OF, PART_NAME, art } from '../osszehasonlitas/FractionAmountsG3Parts';

// ---------------------------------------------------------------------------
// XIV. Ismerkedés a törtekkel – 4. Gyakorlás, tudáspróba
// Rajzelemek (kör, csík, rács, színes rúd) és a laborok generátorai.
// ---------------------------------------------------------------------------

export { FONT, UNK, rnd, pick, shuffle, PART_OF, PART_NAME };

export const RED = '#ef4444';
export const PAPER = '#fef3c7';

/** A részek nevei („1 negyed”, „3 negyed”) – a könyv szóhasználata. */
export const partName = (k: number, n: number) => `${k} ${PART_NAME[n]}`;

const polar = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

/** Körcikk a1 foktól a2 fokig (0 = fent, óramutató járása szerint). */
export const arcPath = (cx: number, cy: number, r: number, a1: number, a2: number) => {
  if (a2 - a1 >= 359.9) return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  const [x1, y1] = polar(cx, cy, r, a1);
  const [x2, y2] = polar(cx, cy, r, a2);
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2} ${y2} Z`;
};

/** Kör n egyenlő részre (vagy „bounds” fokhatárokkal), a „colored” indexű részek színesek. */
export const Pie: React.FC<{
  cx: number;
  cy: number;
  r: number;
  n?: number;
  k?: number;
  colored?: number[];
  bounds?: number[];
  color?: string;
  base?: string;
  sw?: number;
  onPart?: (i: number) => void;
}> = ({ cx, cy, r, n = 1, k = 0, colored, bounds, color = RED, base = '#ffffff', sw = 2.5, onPart }) => {
  const b = bounds ?? Array.from({ length: n + 1 }, (_, i) => (360 * i) / n);
  const parts = b.length - 1;
  const col = colored ?? Array.from({ length: k }, (_, i) => i);
  return (
    <g>
      {Array.from({ length: parts }, (_, i) => (
        <path
          key={i}
          d={arcPath(cx, cy, r, b[i], b[i + 1])}
          fill={col.includes(i) ? color : base}
          stroke="#334155"
          strokeWidth={sw}
          strokeLinejoin="round"
          onClick={onPart ? () => onPart(i) : undefined}
          style={onPart ? { cursor: 'pointer' } : undefined}
        />
      ))}
    </g>
  );
};

/** Csík n egyenlő részre; vízszintes vagy függőleges. */
export const Bar: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  n: number;
  k?: number;
  colored?: number[];
  vertical?: boolean;
  color?: string;
  base?: string;
  sw?: number;
  onPart?: (i: number) => void;
}> = ({ x, y, w, h, n, k = 0, colored, vertical, color = RED, base = '#ffffff', sw = 2.5, onPart }) => {
  const col = colored ?? Array.from({ length: k }, (_, i) => i);
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const px = vertical ? x : x + (i * w) / n;
        const py = vertical ? y + (i * h) / n : y;
        return (
          <rect
            key={i}
            x={px}
            y={py}
            width={vertical ? w : w / n}
            height={vertical ? h / n : h}
            fill={col.includes(i) ? color : base}
            stroke="#334155"
            strokeWidth={sw}
            onClick={onPart ? () => onPart(i) : undefined}
            style={onPart ? { cursor: 'pointer' } : undefined}
          />
        );
      })}
    </g>
  );
};

/** Téglalap rows × cols rácsra osztva, az első k cella színes. */
export const Grid: React.FC<{ x: number; y: number; w: number; h: number; rows: number; cols: number; k?: number; color?: string; sw?: number }> = ({
  x,
  y,
  w,
  h,
  rows,
  cols,
  k = 0,
  color = RED,
  sw = 2.5
}) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => (
      <rect
        key={i}
        x={x + ((i % cols) * w) / cols}
        y={y + (Math.floor(i / cols) * h) / rows}
        width={w / cols}
        height={h / rows}
        fill={i < k ? color : '#ffffff'}
        stroke="#334155"
        strokeWidth={sw}
      />
    ))}
  </g>
);

/** Színes rudak (a könyv színei): hossz kockában. */
export const ROD: Record<number, { color: string; name: string }> = {
  1: { color: '#ffffff', name: 'fehér' },
  2: { color: '#f9a8d4', name: 'rózsaszín' },
  3: { color: '#86efac', name: 'világoszöld' },
  4: { color: '#ef4444', name: 'piros' },
  5: { color: '#fde047', name: 'sárga' },
  6: { color: '#a855f7', name: 'lila' },
  8: { color: '#9f1239', name: 'bordó' },
  10: { color: '#fb923c', name: 'narancssárga' }
};

/** Egy színes rúd, halvány kockahatárokkal. */
export const Rod: React.FC<{ x: number; y: number; len: number; u: number; h?: number; label?: string; sw?: number; fs?: number }> = ({ x, y, len, u, h = 22, label, sw = 2, fs = 13 }) => (
  <g>
    <rect x={x} y={y} width={len * u} height={h} rx="3" fill={ROD[len]?.color ?? '#e2e8f0'} stroke="#1e293b" strokeWidth={sw} />
    {Array.from({ length: len - 1 }, (_, i) => (
      <line key={i} x1={x + (i + 1) * u} y1={y + 3} x2={x + (i + 1) * u} y2={y + h - 3} stroke="#1e293b" strokeWidth="0.8" opacity="0.35" />
    ))}
    {label && (
      <text x={x + len * u + 6} y={y + h / 2 + fs * 0.36} fontSize={fs} fontWeight="bold" fill="#0f172a">
        {label}
      </text>
    )}
  </g>
);

// ---------------------------------------------------------------------------
// Labor I: Színezd ki!
// ---------------------------------------------------------------------------

export interface ColorTask {
  n: number;
  k: number;
  shape: 'pie' | 'bar';
}

const DENOMS = [2, 3, 4, 5, 6, 8, 10];

/** „osztás 4-gyel” – a helyes rag. */
export const WITH: Record<number, string> = { 2: '2-vel', 3: '3-mal', 4: '4-gyel', 5: '5-tel', 6: '6-tal', 8: '8-cal', 10: '10-zel' };

export const makeColorTask = (prev?: ColorTask): ColorTask => {
  let t: ColorTask;
  do {
    const n = pick(DENOMS);
    t = { n, k: rnd(1, n - 1), shape: Math.random() < 0.5 ? 'pie' : 'bar' };
  } while (prev && prev.n === t.n && prev.k === t.k);
  return t;
};

export const colorHint = (t: ColorTask, got: number): string => {
  if (got === t.n - t.k) return `Fordítva színezted! ${t.k} részt kell kiszínezni, a többi marad fehér.`;
  if (got > t.k) return `Túl sok! Csak ${t.k} részt színezz ki. Kattints egy színes részre, és visszafehéredik.`;
  return `Még kevés! ${partName(t.k, t.n)} = ${t.n} egyenlő részből ${t.k} rész.`;
};

// ---------------------------------------------------------------------------
// Labor II: Vegyes feladatok
// ---------------------------------------------------------------------------

export type MixKind = 'nev' | 'mennyi' | 'mertek' | 'egesz' | 'nagyobb';

export interface MixTask {
  kind: MixKind;
  text: string;
  answer: string;
  options: string[];
  explain: string;
  n?: number;
  k?: number;
}

const uniq4 = (answer: string, cands: string[]): string[] => {
  const out = [answer];
  cands.forEach((c) => {
    if (out.length < 4 && !out.includes(c)) out.push(c);
  });
  let extra = 1;
  while (out.length < 4) {
    const c = `${parseInt(answer, 10) + extra * 2}${answer.replace(/^\d+/, '')}`;
    if (!out.includes(c)) out.push(c);
    extra++;
  }
  return shuffle(out);
};

const UNITS: { whole: string; small: string; total: number; ns: number[] }[] = [
  { whole: '1 kg', small: 'dkg', total: 100, ns: [2, 4, 5, 10] },
  { whole: '1 m', small: 'cm', total: 100, ns: [2, 4, 5, 10] },
  { whole: '1 óra', small: 'perc', total: 60, ns: [2, 3, 4, 6, 10] },
  { whole: '2 óra', small: 'perc', total: 120, ns: [2, 3, 4, 6, 8, 10] },
  { whole: '1 l', small: 'dl', total: 10, ns: [2, 5, 10] },
  { whole: '1 dl', small: 'cl', total: 10, ns: [2, 5, 10] }
];

export const makeMixTask = (kind: MixKind): MixTask => {
  if (kind === 'nev') {
    const n = pick(DENOMS);
    const k = rnd(1, n - 1);
    const answer = partName(k, n);
    const others = DENOMS.filter((d) => d !== n);
    return {
      kind,
      n,
      k,
      text: `${n} egyenlő részből ${k} színes. Hányad része színes?`,
      answer,
      options: uniq4(answer, [partName(n - k, n), partName(k, pick(others)), partName(n, n), partName(k + 1, n)].filter((s) => !s.startsWith('0'))),
      explain: `${n} egyenlő rész: egy rész neve 1 ${PART_NAME[n]}. ${k} ilyen rész: ${answer}.`
    };
  }
  if (kind === 'mennyi') {
    const n = pick(DENOMS);
    const max = Math.floor(1000 / n);
    let v = rnd(2, Math.min(25, max));
    if (Math.random() < 0.3 && v * 10 <= max) v *= 10;
    const total = v * n;
    const answer = String(v);
    return {
      kind,
      text: `Mennyi ${art(total)} ${total} ${PART_OF[n]}?`,
      answer,
      options: uniq4(answer, [String(total - n), String(n), String(v * 2), String(v + 10), String(total - v)].filter((s) => Number(s) > 0)),
      explain: `${PART_OF[n][0].toUpperCase() + PART_OF[n].slice(1)}: osztás ${WITH[n]}. ${total} : ${n} = ${v}.`
    };
  }
  if (kind === 'mertek') {
    const u = pick(UNITS);
    const n = pick(u.ns);
    const v = u.total / n;
    const answer = `${v} ${u.small}`;
    return {
      kind,
      text: `Hány ${u.small} ${u.whole.startsWith('1') ? 'az' : 'a'} ${u.whole} ${PART_OF[n]}?`,
      answer,
      options: uniq4(answer, [`${n} ${u.small}`, `${u.total - v} ${u.small}`, `${v * 2} ${u.small}`, `${v + 5} ${u.small}`]),
      explain: `Előbb válts át: ${u.whole} = ${u.total} ${u.small}. Aztán: ${u.total} : ${n} = ${v}.`
    };
  }
  if (kind === 'egesz') {
    const n = pick([2, 3, 4, 5, 10]);
    const p = rnd(2, n === 10 ? 9 : 12);
    const answer = `${p * n} cm`;
    return {
      kind,
      text: `Egy szakasz ${PART_OF[n]} ${p} cm. Milyen hosszú az egész szakasz?`,
      answer,
      options: uniq4(answer, [`${p + n} cm`, `${p * 2 === p * n ? p * 3 : p * 2} cm`, `${p} cm`, `${p * n + p} cm`]),
      explain: `Az egész ${n} ilyen részből áll: ${n} · ${p} = ${p * n} cm.`
    };
  }
  // nagyobb: két egységtört
  const [a, b] = shuffle(DENOMS).slice(0, 2);
  const big = Math.min(a, b);
  const answer = `1 ${PART_NAME[big]}`;
  return {
    kind,
    text: `Ugyanazt a tortát vágjuk fel. Melyik szelet a nagyobb: 1 ${PART_NAME[a]} vagy 1 ${PART_NAME[b]}?`,
    answer,
    options: shuffle([answer, `1 ${PART_NAME[Math.max(a, b)]}`, 'egyformák', 'nem lehet tudni']),
    explain: `Minél kevesebb részre vágod, annál nagyobb egy szelet. ${big} rész kevesebb, mint ${Math.max(a, b)}, ezért az 1 ${PART_NAME[big]} a nagyobb.`
  };
};

export const MIX_KINDS: { id: MixKind; label: string }[] = [
  { id: 'nev', label: 'A rész neve' },
  { id: 'mennyi', label: 'Mennyi a része?' },
  { id: 'mertek', label: 'Mértékek' },
  { id: 'egesz', label: 'Az egész' },
  { id: 'nagyobb', label: 'Melyik nagyobb?' }
];
