import React from 'react';

// ---------------------------------------------------------------------------
// Rajzelemek és segédfüggvények a VIII. Írásbeli kivonás 4. leckéjéhez
// (A különbség változásai). A Figures, a Theory, a Quiz és a CardFigures is ezeket használja.
// Színek: kisebbítendő = kék, kivonandó = narancs, különbség = zöld.
// Változás: nő = zöld, csökken = piros, nem változik = szürke, keresett = piros „?”.
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const INK = '#1e293b';
export const UP = '#16a34a';
export const DOWN = '#e11d48';
export const SAME = '#64748b';
/** Kisebbítendő (kék), kivonandó (narancs), különbség (zöld): kitöltés + keret. */
export const C_MIN = { fill: '#dbeafe', stroke: '#2563eb', bar: '#93c5fd' };
export const C_SUB = { fill: '#ffedd5', stroke: '#ea580c', bar: '#fdba74' };
export const C_DIF = { fill: '#dcfce7', stroke: '#16a34a', bar: '#86efac' };

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// ---------------------------------------------------------------------------
// Toldalékok
// ---------------------------------------------------------------------------
const INS_ONES = ['', 'gyel', 'vel', 'mal', 'gyel', 'tel', 'tal', 'tel', 'cal', 'cel'];
const INS_TENS = ['', 'zel', 'szal', 'cal', 'nel', 'nel', 'nal', 'nel', 'nal', 'nel'];
/** Eszközhatározó rag: 10-zel, 20-szal, 100-zal, 7-tel, 1-gyel, 1000-rel. */
export const ins = (n: number): string => {
  const m = Math.abs(n);
  let s = 'zal';
  if (m === 0) s = 'val';
  else if (m % 1000 === 0) s = 'rel';
  else if (m % 10 !== 0) s = INS_ONES[m % 10];
  else if (m % 100 !== 0) s = INS_TENS[(m / 10) % 10];
  return `${m}-${s}`;
};
/** Változás szövege: +10 → „10-zel nő”, −20 → „20-szal csökken”, 0 → „nem változik”. */
export const changeText = (d: number) => (d === 0 ? 'nem változik' : d > 0 ? `${ins(d)} nő` : `${ins(d)} csökken`);
/** Előjeles szám: +10, −10, 0. */
export const signed = (d: number) => (d > 0 ? `+${d}` : d < 0 ? `−${-d}` : '0');
export const changeColor = (d: number) => (d > 0 ? UP : d < 0 ? DOWN : SAME);
/** A különbség változása, ha a kisebbítendő dm-mel, a kivonandó ds-sel változik. */
export const diffChange = (dm: number, ds: number) => dm - ds;

// ---------------------------------------------------------------------------
// Alapelemek
// ---------------------------------------------------------------------------

/** Kérdésábra-keret: 240 széles, h magas. */
export const QFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 130, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Számdoboz; a „?” piros. */
export const NumBox: React.FC<{ cx: number; cy: number; v: number | string; w?: number; h?: number; fs?: number; fill?: string; stroke?: string }> = ({
  cx,
  cy,
  v,
  w = 52,
  h = 30,
  fs = 17,
  fill = '#fff',
  stroke = '#94a3b8'
}) => {
  const q = v === '?';
  return (
    <g>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h * 0.25} fill={q ? '#fee2e2' : fill} stroke={q ? UNK : stroke} strokeWidth={q ? 2 : 1.6} />
      <text x={cx} y={cy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={q ? UNK : INK} fontFamily={FONT}>{v}</text>
    </g>
  );
};

/** Lefelé mutató változás-nyíl, mellette a változás (+10, −10, 0, ?). */
export const ChangeArrow: React.FC<{ x: number; y1: number; y2: number; label: string; fs?: number }> = ({ x, y1, y2, label, fs = 13 }) => {
  const col = label === '?' ? UNK : label.startsWith('+') ? UP : label.startsWith('−') ? DOWN : SAME;
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2 - 4} stroke={col} strokeWidth="2.4" strokeLinecap="round" />
      <path d={`M ${x - 5} ${y2 - 9} L ${x} ${y2 - 2} L ${x + 5} ${y2 - 9}`} fill="none" stroke={col} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x={x + 6} y={(y1 + y2) / 2 + fs * 0.36} fontSize={fs} fontWeight="bold" fill={col} fontFamily={FONT}>{label}</text>
    </g>
  );
};

export type Cell = number | string;
export type Changes = [string | null, string | null, string | null] | null;
/**
 * Kivonás-sorok egymás alatt: kisebbítendő − kivonandó = különbség; a sorok között változás-nyilak.
 * changes[i] = [a kisebbítendő, a kivonandó, a különbség] változása az i. és i+1. sor között (null = nincs nyíl).
 * Méret: 240 × (16 + rows·30 + (rows−1)·28 + 12).
 */
export const DiffRowsG: React.FC<{ rows: [Cell, Cell, Cell][]; changes?: Changes[]; y?: number; fs?: number; names?: boolean }> = ({
  rows,
  changes = [],
  y = 16,
  fs = 17,
  names = false
}) => {
  const XS = [44, 124, 200];
  const y0 = y + (names ? 14 : 0);
  const rowY = (i: number) => y0 + 15 + i * 58;
  return (
    <g fontFamily={FONT}>
      {names && (
        <g fontSize="10.5" fontWeight="bold" textAnchor="middle">
          <text x={XS[0]} y={y + 6} fill={C_MIN.stroke}>kisebbítendő</text>
          <text x={XS[1]} y={y + 6} fill={C_SUB.stroke}>kivonandó</text>
          <text x={XS[2]} y={y + 6} fill={C_DIF.stroke}>különbség</text>
        </g>
      )}
      {rows.map((r, i) => (
        <g key={`r${i}`}>
          <NumBox cx={XS[0]} cy={rowY(i)} v={r[0]} w={56} fs={fs} fill={C_MIN.fill} stroke={C_MIN.stroke} />
          <text x="84" y={rowY(i) + 7} textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>−</text>
          <NumBox cx={XS[1]} cy={rowY(i)} v={r[1]} w={56} fs={fs} fill={C_SUB.fill} stroke={C_SUB.stroke} />
          <text x="162" y={rowY(i) + 7} textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>=</text>
          <NumBox cx={XS[2]} cy={rowY(i)} v={r[2]} w={60} fs={fs} fill={C_DIF.fill} stroke={C_DIF.stroke} />
        </g>
      ))}
      {changes.map((c, i) =>
        c ? (
          <g key={`c${i}`}>
            {c.map((lab, k) => (lab !== null ? <ChangeArrow key={k} x={XS[k] - 8} y1={rowY(i) + 17} y2={rowY(i + 1) - 14} label={lab} /> : null))}
          </g>
        ) : null
      )}
    </g>
  );
};
export const diffRowsHeight = (n: number, names = false) => 16 + n * 30 + (n - 1) * 28 + 12 + (names ? 14 : 0);

/** Kérdésábra: kivonás-sorok kerettel. */
export const DiffRowsFig: React.FC<{ rows: [Cell, Cell, Cell][]; changes?: Changes[]; names?: boolean }> = ({ rows, changes, names }) => (
  <QFig h={diffRowsHeight(rows.length, names)}>
    <DiffRowsG rows={rows} changes={changes} y={14} names={names} />
  </QFig>
);

/**
 * Két csík egymás alatt, balra igazítva, közös léptékkel: fent a kisebbítendő (kék), lent a kivonandó (narancs).
 * A kisebbítendő csíkján a kivonandón túli rész a különbség (zöld, zárójellel jelölve).
 */
export const DiffBarsG: React.FC<{
  m: number;
  s: number;
  x?: number;
  y?: number;
  W?: number;
  max?: number;
  h?: number;
  mText?: string;
  sText?: string;
  dText?: string;
  fs?: number;
}> = ({ m, s, x = 10, y: y0 = 10, W = 220, max = 1000, h = 26, mText, sText, dText, fs = 14 }) => {
  const k = W / max;
  const wm = m * k;
  const ws = s * k;
  const dt = dText ?? String(m - s);
  const mt = String(mText ?? m);
  const st = String(sText ?? s);
  const y = y0 + 20;
  const yb = y + h + 10;
  return (
    <g fontFamily={FONT}>
      {/* a kisebbítendő egésze: zárójel fölötte */}
      <path d={`M ${x + 1} ${y - 3} L ${x + 1} ${y - 9} L ${x + wm - 1} ${y - 9} L ${x + wm - 1} ${y - 3}`} fill="none" stroke={C_MIN.stroke} strokeWidth="1.8" />
      <rect x={x + wm / 2 - 4 - mt.length * fs * 0.3} y={y - 9 - fs} width={8 + mt.length * fs * 0.6} height={fs + 4} fill="#fff" />
      <text x={x + wm / 2} y={y - 11} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={mt === '?' ? UNK : C_MIN.stroke}>{mt}</text>
      <rect x={x} y={y} width={ws} height={h} fill={C_MIN.bar} stroke={C_MIN.stroke} strokeWidth="1.6" />
      <rect x={x + ws} y={y} width={Math.max(0, wm - ws)} height={h} fill={C_DIF.bar} stroke={C_DIF.stroke} strokeWidth="1.6" />
      {wm - ws > 4 && (
        <text x={x + (ws + wm) / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={dt === '?' ? UNK : '#14532d'}>{dt}</text>
      )}
      {/* kivonandó */}
      <rect x={x} y={yb} width={ws} height={h} fill={C_SUB.bar} stroke={C_SUB.stroke} strokeWidth="1.6" />
      <text x={x + ws / 2} y={yb + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={st === '?' ? UNK : INK}>{st}</text>
      {/* a különbség: a kivonandó csíkja mellett hiányzó rész */}
      {wm - ws > 4 && (
        <rect x={x + ws} y={yb} width={wm - ws} height={h} fill="none" stroke={C_DIF.stroke} strokeWidth="1.6" strokeDasharray="5 3" />
      )}
    </g>
  );
};
/** A DiffBarsG magassága. */
export const diffBarsHeight = (h = 26) => 20 + 2 * h + 10 + 4;

/** Forint érme (5, 10, 20, 50, 100, 200). crossed = piros áthúzás (elköltöttük). */
export const Coin: React.FC<{ cx: number; cy: number; v: number; r?: number; crossed?: boolean }> = ({ cx, cy, v, r, crossed }) => {
  const R = r ?? (v === 200 ? 21 : v === 100 ? 20 : v === 50 ? 19 : v === 20 ? 17 : v === 10 ? 16 : 14);
  const gold = '#facc15';
  const silver = '#cbd5e1';
  const ring = v === 200 ? gold : v === 100 ? silver : v === 20 || v === 5 ? gold : silver;
  const core = v === 200 ? silver : v === 100 ? gold : ring;
  const edge = ring === gold ? '#a16207' : '#475569';
  return (
    <g opacity={crossed ? 0.75 : 1}>
      <circle cx={cx} cy={cy} r={R} fill={ring} stroke={edge} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r={R * 0.7} fill={core} stroke={core === gold ? '#ca8a04' : '#64748b'} strokeWidth="0.9" />
      <text x={cx} y={cy + R * 0.28} textAnchor="middle" fontSize={v >= 100 ? R * 0.7 : R * 0.82} fontWeight="bold" fill="#1e293b" fontFamily={FONT}>{v}</text>
      {crossed && <line x1={cx - R - 2} y1={cy + R + 2} x2={cx + R + 2} y2={cy - R - 2} stroke={DOWN} strokeWidth="3" strokeLinecap="round" />}
    </g>
  );
};

/** Árcédula. */
export const PriceTag: React.FC<{ x: number; y: number; text: string; w?: number; fs?: number; fill?: string }> = ({ x, y, text, w = 64, fs = 13, fill = '#fff' }) => (
  <g>
    <path d={`M ${x} ${y} L ${x + w - 10} ${y} L ${x + w} ${y + fs * 0.95} L ${x + w - 10} ${y + fs * 1.9} L ${x} ${y + fs * 1.9} Z`} fill={fill} stroke="#475569" strokeWidth="1.3" />
    <circle cx={x + w - 11} cy={y + fs * 0.95} r={fs * 0.14} fill="#475569" />
    <text x={x + (w - 12) / 2} y={y + fs * 1.33} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={text.includes('?') ? UNK : '#0f172a'} fontFamily={FONT}>{text}</text>
  </g>
);

/** Állandó különbség táblázat: kisebbítendő, kivonandó, különbség sorok. „?” = keresett. */
export const DiffTableFig: React.FC<{ a: Cell[]; b: Cell[]; s: Cell[] }> = ({ a, b, s }) => {
  const n = a.length;
  const cw = Math.min(42, 150 / n);
  const x0 = 234 - n * cw;
  const rowsV = [a, b, s];
  const fills = [C_MIN.fill, C_SUB.fill, C_DIF.fill];
  const names = ['kisebbítendő', 'kivonandó', 'különbség'];
  return (
    <QFig h={112}>
      {rowsV.map((row, r) => (
        <g key={r}>
          <rect x={6} y={12 + r * 30} width={x0 - 6} height={28} fill={fills[r]} stroke="#94a3b8" />
          <text x={(6 + x0) / 2} y={30.5 + r * 30} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#334155">{names[r]}</text>
          {row.map((v, k) => (
            <g key={k}>
              <rect x={x0 + k * cw} y={12 + r * 30} width={cw} height={28} fill={v === '?' ? '#fee2e2' : '#fff'} stroke="#94a3b8" />
              <text x={x0 + k * cw + cw / 2} y={31 + r * 30} textAnchor="middle" fontSize={cw < 38 ? 12.5 : 14} fontWeight="bold" fill={v === '?' ? UNK : INK}>{v}</text>
            </g>
          ))}
        </g>
      ))}
    </QFig>
  );
};

/** Két kivonás egymás mellett, köztük „?” kör (relációs jel helye). */
export const CompareFig: React.FC<{ l: [number, number]; r: [number, number] }> = ({ l, r }) => (
  <QFig h={64}>
    <NumBox cx={26} cy={32} v={l[0]} w={42} h={28} fs={15} fill={C_MIN.fill} stroke={C_MIN.stroke} />
    <text x="54" y="38" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>−</text>
    <NumBox cx={82} cy={32} v={l[1]} w={42} h={28} fs={15} fill={C_SUB.fill} stroke={C_SUB.stroke} />
    <circle cx="120" cy="32" r="12" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="120" y="38" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
    <NumBox cx={158} cy={32} v={r[0]} w={42} h={28} fs={15} fill={C_MIN.fill} stroke={C_MIN.stroke} />
    <text x="186" y="38" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>−</text>
    <NumBox cx={214} cy={32} v={r[1]} w={42} h={28} fs={15} fill={C_SUB.fill} stroke={C_SUB.stroke} />
  </QFig>
);
