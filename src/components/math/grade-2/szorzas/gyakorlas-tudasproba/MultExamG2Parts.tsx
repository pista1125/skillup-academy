import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// 10. Gyakorlás, tudáspróba (IV. Szorzás) – közös rajzelemek, kérdésábrák,
// feladatgenerátorok és a két labor. A DivExamG2 lecke is innen importál.
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const INK = '#0f172a';
export const SUB = '#475569';

export const PALETTE = ['#ec4899', '#3b82f6', '#f97316', '#10b981', '#8b5cf6', '#eab308', '#14b8a6', '#ef4444', '#6366f1', '#84cc16'];

/** „-szorosa” alakok (2–10). */
export const SZOROSA: Record<number, string> = {
  2: 'kétszerese',
  3: 'háromszorosa',
  4: 'négyszerese',
  5: 'ötszöröse',
  6: 'hatszorosa',
  7: 'hétszerese',
  8: 'nyolcszorosa',
  9: 'kilencszerese',
  10: 'tízszerese',
};

/** Névelő a szám elé: „az 5”, „az 50”, de „a 24”. */
export const az = (n: number): string => (n === 1 || n === 5 || (n >= 50 && n <= 59) ? 'az' : 'a');

/** Nagy kezdőbetűs névelő. */
export const Az = (n: number): string => (az(n) === 'az' ? 'Az' : 'A');

/** „-es” képző a szám után: 2-es, 3-as, 5-ös, 6-os, 10-es. */
export const es = (n: number): string => {
  const m: Record<number, string> = { 1: '-es', 2: '-es', 3: '-as', 4: '-es', 5: '-ös', 6: '-os', 7: '-es', 8: '-as', 9: '-es', 10: '-es' };
  return m[n] ?? '-es';
};

const isUnk = (t: string | number) => t === '?' || t === '□';

// ---------------------------------------------------------------------------
// Kérdésábra-keret
// ---------------------------------------------------------------------------
export const QFig: React.FC<{ h?: number; children: React.ReactNode }> = ({ h = 100, children }) => (
  <svg
    viewBox={`0 0 260 ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={FONT}
  >
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Caption: React.FC<{ y: number; text: string; color?: string }> = ({ y, text, color = '#334155' }) => (
  <text x="130" y={y} textAnchor="middle" fontSize="13" fontWeight="bold" fill={color}>
    {text}
  </text>
);

// ---------------------------------------------------------------------------
// Csoportok: zsákok / karikák, bennük pöttyök. sizes = csoportonkénti darab.
// split: a csoport első `split` pöttye más színű (pl. 4 piros + 3 kék).
// ---------------------------------------------------------------------------
export const QGroups: React.FC<{
  sizes: number[];
  split?: number;
  caption?: string;
  color?: string;
  color2?: string;
}> = ({ sizes, split = 0, caption, color = '#ec4899', color2 = '#3b82f6' }) => {
  const n = sizes.length;
  const perRow = Math.min(n, 5);
  const rows = Math.ceil(n / perRow);
  const maxEach = Math.max(...sizes, 1);
  const dotRows = maxEach <= 3 ? 1 : 2;
  const dotCols = Math.ceil(maxEach / dotRows);
  const gap = 7;
  const bagW = Math.min(46, (238 - (perRow - 1) * gap) / perRow);
  const s = Math.min(11, (bagW - 8) / dotCols);
  const r = s * 0.38;
  const bagH = dotRows * s + 12;
  const H = 14 + rows * (bagH + gap) - gap + (caption ? 28 : 12);
  return (
    <QFig h={H}>
      {sizes.map((size, gi) => {
        const row = Math.floor(gi / perRow);
        const col = gi % perRow;
        const inRow = Math.min(perRow, n - row * perRow);
        const rowW = inRow * (bagW + gap) - gap;
        const bx = (260 - rowW) / 2 + col * (bagW + gap);
        const by = 12 + row * (bagH + gap);
        const ox = bx + (bagW - dotCols * s) / 2;
        return (
          <g key={gi}>
            <rect x={bx} y={by} width={bagW} height={bagH} rx="10" fill="#fff7ed" stroke="#9a3412" strokeWidth="2" />
            {Array.from({ length: size }, (_, i) => (
              <circle
                key={i}
                cx={ox + s * ((i % dotCols) + 0.5)}
                cy={by + 6 + s * (Math.floor(i / dotCols) + 0.5)}
                r={r}
                fill={i < split ? color2 : color}
              />
            ))}
          </g>
        );
      })}
      {caption && <Caption y={H - 12} text={caption} />}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Szétszórt pöttyök (még nincsenek csoportosítva)
// ---------------------------------------------------------------------------
export const QDots: React.FC<{ n: number; perRow?: number; caption?: string; color?: string }> = ({
  n,
  perRow = 10,
  caption,
  color = '#8b5cf6',
}) => {
  const s = Math.min(20, 230 / perRow);
  const r = s * 0.34;
  const rows = Math.ceil(n / perRow);
  const x0 = (260 - perRow * s) / 2;
  const H = 14 + rows * s + (caption ? 28 : 10);
  return (
    <QFig h={H}>
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          cx={x0 + s * ((i % perRow) + 0.5) + (Math.floor(i / perRow) % 2) * 1.5}
          cy={12 + s * (Math.floor(i / perRow) + 0.5)}
          r={r}
          fill={color}
          opacity={0.9}
        />
      ))}
      {caption && <Caption y={H - 12} text={caption} />}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Rácspontok (szorzó-tömb). splitRow: az első splitRow sor kék, a többi narancs.
// crossCol: az adott oszlop pöttyei áthúzva (pl. 3 · 10 − 3).
// ---------------------------------------------------------------------------
export const QArray: React.FC<{
  rows: number;
  cols: number;
  splitRow?: number;
  crossCol?: number;
  caption?: string;
}> = ({ rows, cols, splitRow, crossCol, caption }) => {
  const step = Math.min(22, 220 / cols, 132 / rows);
  const r = step * 0.36;
  const x0 = (260 - cols * step) / 2;
  const y0 = 12;
  const H = y0 + rows * step + (caption ? 30 : 12);
  return (
    <QFig h={H}>
      {Array.from({ length: rows }, (_, ri) =>
        Array.from({ length: cols }, (_, ci) => {
          const cx = x0 + step * (ci + 0.5);
          const cy = y0 + step * (ri + 0.5);
          if (crossCol !== undefined && ci === crossCol) {
            return (
              <g key={`${ri}-${ci}`}>
                <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={UNK} strokeWidth="1.5" strokeDasharray="2 2" />
                <path d={`M ${cx - r} ${cy - r} L ${cx + r} ${cy + r} M ${cx + r} ${cy - r} L ${cx - r} ${cy + r}`} stroke={UNK} strokeWidth="1.6" />
              </g>
            );
          }
          const fill = splitRow === undefined ? '#ec4899' : ri < splitRow ? '#3b82f6' : '#f97316';
          return <circle key={`${ri}-${ci}`} cx={cx} cy={cy} r={r} fill={fill} />;
        })
      )}
      {caption && <Caption y={H - 12} text={caption} />}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Ugrások a számegyenesen 0-tól. askJumps: az ugrások számát kérdezzük.
// ---------------------------------------------------------------------------
export const QJumps: React.FC<{
  step: number;
  jumps: number;
  endLabel?: string;
  askJumps?: boolean;
  caption?: string;
}> = ({ step, jumps, endLabel, askJumps = false, caption }) => {
  const H = 104;
  const end = step * jumps;
  const x0 = 16;
  const len = 228;
  const unit = len / end;
  const y = 70;
  const tickGap = step * unit;
  const showMid = tickGap >= 22;
  const cap = caption ?? (askJumps ? `Ugrások: mindig ${step}. Hány ugrás?` : `${jumps} ugrás, mindig ${step}`);
  const endText = endLabel ?? (askJumps ? String(end) : '?');
  return (
    <QFig h={H}>
      <text x="130" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b21a8">
        {cap}
      </text>
      <line x1={x0 - 4} y1={y} x2={x0 + len + 6} y2={y} stroke="#334155" strokeWidth="2" />
      {Array.from({ length: jumps }, (_, i) => {
        const a = x0 + i * tickGap;
        const b = a + tickGap;
        return (
          <path
            key={i}
            d={`M ${a} ${y} Q ${(a + b) / 2} ${y - Math.min(34, tickGap * 0.8 + 8)} ${b} ${y}`}
            fill="none"
            stroke="#a855f7"
            strokeWidth="2"
          />
        );
      })}
      {Array.from({ length: jumps + 1 }, (_, i) => {
        const x = x0 + i * tickGap;
        const last = i === jumps;
        const label = i === 0 ? '0' : last ? endText : showMid ? String(i * step) : '';
        return (
          <g key={i}>
            <line x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#334155" strokeWidth="2" />
            {label && (
              <text
                x={x}
                y={y + 20}
                textAnchor="middle"
                fontSize={last ? 14 : 10}
                fontWeight="900"
                fill={last && isUnk(endText) ? UNK : INK}
              >
                {label}
              </text>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Számsor dobozokban
// ---------------------------------------------------------------------------
export const QSeq: React.FC<{ items: (string | number)[] }> = ({ items }) => {
  const w = 40;
  const gap = 8;
  const x0 = (260 - (items.length * (w + gap) - gap)) / 2;
  return (
    <QFig h={64}>
      {items.map((t, i) => (
        <g key={i}>
          <rect
            x={x0 + i * (w + gap)}
            y={14}
            width={w}
            height={36}
            rx="8"
            fill={isUnk(t) ? '#fee2e2' : '#fdf2f8'}
            stroke={isUnk(t) ? UNK : '#be185d'}
            strokeWidth="2"
          />
          <text x={x0 + i * (w + gap) + w / 2} y={39} textAnchor="middle" fontSize="17" fontWeight="900" fill={isUnk(t) ? UNK : '#831843'}>
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Műveletlánc: dobozok, köztük nyilak a művelettel. '' = üres doboz.
// ---------------------------------------------------------------------------
export const QChain: React.FC<{ items: (string | number)[]; ops: string[] }> = ({ items, ops }) => {
  const n = items.length;
  const w = 44;
  const gap = Math.min(64, (236 - n * w) / Math.max(1, n - 1));
  const total = n * w + (n - 1) * gap;
  const x0 = (260 - total) / 2;
  return (
    <QFig h={84}>
      {items.map((t, i) => {
        const x = x0 + i * (w + gap);
        const u = isUnk(t);
        return (
          <g key={i}>
            <rect x={x} y={38} width={w} height={34} rx="8" fill={u ? '#fee2e2' : '#fff'} stroke={u ? UNK : '#be185d'} strokeWidth="2.2" />
            <text x={x + w / 2} y={62} textAnchor="middle" fontSize="17" fontWeight="900" fill={u ? UNK : INK}>
              {t}
            </text>
          </g>
        );
      })}
      {ops.map((op, i) => {
        const a = x0 + i * (w + gap) + w - 4;
        const b = x0 + (i + 1) * (w + gap) + 4;
        return (
          <g key={i}>
            <path d={`M ${a} 36 Q ${(a + b) / 2} 12 ${b} 36`} fill="none" stroke="#16a34a" strokeWidth="2.4" />
            <path d={`M ${b} 36 l -8 -3 l 3 -6 z`} fill="#16a34a" />
            <text x={(a + b) / 2} y={20} textAnchor="middle" fontSize="13" fontWeight="900" fill="#166534">
              {op}
            </text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Két doboz egy nyíllal (pl. „· 4” vagy „fele”). */
export const QArrowMap: React.FC<{ from: string | number; to: string | number; op: string }> = ({ from, to, op }) => (
  <QChain items={[from, to]} ops={[op]} />
);

// ---------------------------------------------------------------------------
// Összehasonlítás: bal oldal ○ jobb oldal
// ---------------------------------------------------------------------------
export const QCompare: React.FC<{ left: string; right: string }> = ({ left, right }) => {
  const bw = (t: string) => Math.max(56, t.length * 10 + 18);
  const lw = bw(left);
  const rw = bw(right);
  const total = lw + rw + 56;
  const x0 = (260 - total) / 2;
  return (
    <QFig h={64}>
      <rect x={x0} y={14} width={lw} height={36} rx="8" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2" />
      <text x={x0 + lw / 2} y={38} textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>
        {left}
      </text>
      <circle cx={x0 + lw + 28} cy={32} r={16} fill="#fee2e2" stroke={UNK} strokeWidth="2" />
      <text x={x0 + lw + 28} y={38} textAnchor="middle" fontSize="17" fontWeight="900" fill={UNK}>
        ?
      </text>
      <rect x={x0 + lw + 56} y={14} width={rw} height={36} rx="8" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2" />
      <text x={x0 + lw + 56 + rw / 2} y={38} textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>
        {right}
      </text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kétsoros táblázat (pl. tricikli – kerék)
// ---------------------------------------------------------------------------
export const QTable: React.FC<{
  topLabel: string;
  bottomLabel: string;
  top: (string | number)[];
  bottom: (string | number)[];
}> = ({ topLabel, bottomLabel, top, bottom }) => {
  const lw = 74;
  const cw = Math.min(34, (240 - lw) / top.length);
  const x0 = (260 - (lw + cw * top.length)) / 2;
  const rowH = 28;
  const cell = (t: string | number, x: number, y: number, key: string, bg: string) => (
    <g key={key}>
      <rect x={x} y={y} width={cw} height={rowH} fill={isUnk(t) ? '#fee2e2' : bg} stroke="#94a3b8" />
      <text x={x + cw / 2} y={y + 19} textAnchor="middle" fontSize="14" fontWeight="900" fill={isUnk(t) ? UNK : INK}>
        {t}
      </text>
    </g>
  );
  return (
    <QFig h={84}>
      <rect x={x0} y={14} width={lw} height={rowH} fill="#fce7f3" stroke="#94a3b8" />
      <text x={x0 + lw / 2} y={32} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#831843">
        {topLabel}
      </text>
      <rect x={x0} y={14 + rowH} width={lw} height={rowH} fill="#e0f2fe" stroke="#94a3b8" />
      <text x={x0 + lw / 2} y={32 + rowH} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#075985">
        {bottomLabel}
      </text>
      {top.map((t, i) => cell(t, x0 + lw + i * cw, 14, `t${i}`, '#fff'))}
      {bottom.map((t, i) => cell(t, x0 + lw + i * cw, 14 + rowH, `b${i}`, '#fff'))}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Forint érmék (valódi címletek: 5, 10, 20, 50, 100 Ft)
// ---------------------------------------------------------------------------
const COIN_STYLE: Record<number, { r: number; fill: string; stroke: string }> = {
  5: { r: 13, fill: '#fcd34d', stroke: '#a16207' },
  10: { r: 14, fill: '#e2e8f0', stroke: '#475569' },
  20: { r: 15, fill: '#fde68a', stroke: '#a16207' },
  50: { r: 16, fill: '#e2e8f0', stroke: '#334155' },
  100: { r: 17, fill: '#fef3c7', stroke: '#64748b' },
};

export const CoinG: React.FC<{ cx: number; cy: number; value: number; scale?: number }> = ({ cx, cy, value, scale = 1 }) => {
  const st = COIN_STYLE[value] ?? COIN_STYLE[10];
  const r = st.r * scale;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={st.fill} stroke={st.stroke} strokeWidth={2 * scale} />
      {value === 100 && <circle cx={cx} cy={cy} r={r * 0.68} fill="#e2e8f0" stroke="#94a3b8" strokeWidth={scale} />}
      <text x={cx} y={cy + 2 * scale} textAnchor="middle" fontSize={11 * scale} fontWeight="900" fill={INK}>
        {value}
      </text>
      <text x={cx} y={cy + 10 * scale} textAnchor="middle" fontSize={6.5 * scale} fontWeight="bold" fill={SUB}>
        Ft
      </text>
    </g>
  );
};

export const QCoins: React.FC<{ values: number[]; caption?: string }> = ({ values, caption }) => {
  const perRow = Math.min(values.length, 7);
  const rows = Math.ceil(values.length / perRow);
  const step = 34;
  const H = 12 + rows * step + (caption ? 28 : 8);
  return (
    <QFig h={H}>
      {values.map((v, i) => {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        const inRow = Math.min(perRow, values.length - row * perRow);
        const x0 = 130 - ((inRow - 1) * step) / 2;
        return <CoinG key={i} cx={x0 + col * step} cy={12 + step / 2 + row * step} value={v} />;
      })}
      {caption && <Caption y={H - 12} text={caption} />}
    </QFig>
  );
};

/** Árcédulák: n darab ugyanazzal az árral. */
export const QTags: React.FC<{ n: number; text: string; caption?: string }> = ({ n, text, caption }) => {
  const w = 40;
  const gap = 6;
  const perRow = Math.min(n, 5);
  const rows = Math.ceil(n / perRow);
  const H = 12 + rows * 38 + (caption ? 28 : 6);
  return (
    <QFig h={H}>
      {Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        const inRow = Math.min(perRow, n - row * perRow);
        const x = (260 - (inRow * (w + gap) - gap)) / 2 + col * (w + gap);
        const y = 12 + row * 38;
        return (
          <g key={i}>
            <path d={`M ${x + 8} ${y} H ${x + w} V ${y + 30} H ${x + 8} L ${x} ${y + 15} Z`} fill="#fef9c3" stroke="#a16207" strokeWidth="2" />
            <circle cx={x + 8} cy={y + 15} r="2.5" fill="#a16207" />
            <text x={x + 24} y={y + 20} textAnchor="middle" fontSize="11" fontWeight="900" fill={INK}>
              {text}
            </text>
          </g>
        );
      })}
      {caption && <Caption y={H - 12} text={caption} />}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Szalagmodell: sorok, soronként egységnyi szakaszok
// ---------------------------------------------------------------------------
export const QStrips: React.FC<{
  rows: { label: string; segs: { w: number; text: string }[] }[];
}> = ({ rows }) => {
  const maxU = Math.max(...rows.map((r) => r.segs.reduce((s, g) => s + g.w, 0)));
  const lw = 58;
  const unit = (236 - lw) / maxU;
  const H = 16 + rows.length * 40;
  const colors = ['#f9a8d4', '#93c5fd', '#fdba74'];
  return (
    <QFig h={H}>
      {rows.map((row, ri) => {
        let x = 12 + lw;
        const y = 12 + ri * 40;
        return (
          <g key={ri}>
            <text x={12} y={y + 22} fontSize="13" fontWeight="bold" fill="#334155">
              {row.label}
            </text>
            {row.segs.map((g, gi) => {
              const gx = x;
              x += g.w * unit;
              const u = isUnk(g.text);
              return (
                <g key={gi}>
                  <rect x={gx} y={y + 4} width={g.w * unit} height={28} rx="5" fill={colors[ri % 3]} stroke="#334155" strokeWidth="1.8" />
                  <text x={gx + (g.w * unit) / 2} y={y + 24} textAnchor="middle" fontSize="14" fontWeight="900" fill={u ? UNK : INK}>
                    {g.text}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Mini szorzótábla (10 × 10). A kiemelt sor × oszlop metszéspontjában a cell.
// hideRow / hideCol: a sor- vagy oszlopfejléc helyén „?”.
// ---------------------------------------------------------------------------
export const QGrid10: React.FC<{ row: number; col: number; cell?: string; hideRow?: boolean; hideCol?: boolean }> = ({
  row,
  col,
  cell = '?',
  hideRow = false,
  hideCol = false,
}) => {
  const c = 16;
  const x0 = (260 - 11 * c) / 2;
  const y0 = 8;
  const H = y0 + 11 * c + 10;
  return (
    <QFig h={H}>
      <rect x={x0} y={y0} width={c} height={c} fill="#e2e8f0" />
      <text x={x0 + c / 2} y={y0 + 12} textAnchor="middle" fontSize="10" fontWeight="900" fill={INK}>
        ·
      </text>
      {Array.from({ length: 10 }, (_, i) => {
        const v = i + 1;
        const colHead = v === col && hideCol ? '?' : String(v);
        const rowHead = v === row && hideRow ? '?' : String(v);
        return (
          <g key={i}>
            <rect x={x0 + (i + 1) * c} y={y0} width={c} height={c} fill={v === col ? '#fbcfe8' : '#f1f5f9'} stroke="#cbd5e1" />
            <text x={x0 + (i + 1.5) * c} y={y0 + 12} textAnchor="middle" fontSize="9" fontWeight="900" fill={colHead === '?' ? UNK : INK}>
              {colHead}
            </text>
            <rect x={x0} y={y0 + (i + 1) * c} width={c} height={c} fill={v === row ? '#bfdbfe' : '#f1f5f9'} stroke="#cbd5e1" />
            <text x={x0 + c / 2} y={y0 + (i + 1) * c + 12} textAnchor="middle" fontSize="9" fontWeight="900" fill={rowHead === '?' ? UNK : INK}>
              {rowHead}
            </text>
          </g>
        );
      })}
      {Array.from({ length: 10 }, (_, ri) =>
        Array.from({ length: 10 }, (_, ci) => {
          const r = ri + 1;
          const k = ci + 1;
          const hot = r === row && k === col;
          const band = r === row || k === col;
          return (
            <rect
              key={`${ri}-${ci}`}
              x={x0 + (ci + 1) * c}
              y={y0 + (ri + 1) * c}
              width={c}
              height={c}
              fill={hot ? '#fee2e2' : band ? '#fdf4ff' : '#fff'}
              stroke={hot ? UNK : '#e2e8f0'}
              strokeWidth={hot ? 2 : 1}
            />
          );
        })
      )}
      <text
        x={x0 + (col + 0.5) * c}
        y={y0 + row * c + 12}
        textAnchor="middle"
        fontSize={cell.length > 1 ? 8.5 : 11}
        fontWeight="900"
        fill={cell === '?' ? UNK : INK}
      >
        {cell}
      </text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Labor-segédek
// ---------------------------------------------------------------------------
export interface LabTask {
  text: string;
  answer: number;
  hint: string;
  mistakes: { value: number; msg: string }[];
}

const rint = (lo: number, hi: number, rnd: () => number) => lo + Math.floor(rnd() * (hi - lo + 1));

const cleanMistakes = (answer: number, list: { value: number; msg: string }[]) => {
  const seen = new Set<number>();
  return list.filter((m) => {
    if (m.value === answer || m.value < 0 || !Number.isInteger(m.value) || seen.has(m.value)) return false;
    seen.add(m.value);
    return true;
  });
};

// ---------------------------------------------------------------------------
// Labor I: vegyes szorzótábla-gyakorló
// ---------------------------------------------------------------------------
export type MultKind = 'szorzat' | 'hianyzo' | 'szoros' | 'kapcsolat';

export const MULT_KINDS: { id: MultKind; label: string }[] = [
  { id: 'szorzat', label: 'Szorzat' },
  { id: 'hianyzo', label: 'Hiányzó szám □' },
  { id: 'szoros', label: '-szorosa' },
  { id: 'kapcsolat', label: 'Tábla segít' },
];

const LINKS: { s: number; b: number; k: number }[] = [
  { s: 2, b: 4, k: 2 },
  { s: 4, b: 8, k: 2 },
  { s: 3, b: 6, k: 2 },
  { s: 5, b: 10, k: 2 },
  { s: 3, b: 9, k: 3 },
];

/** table = 0: vegyes (2–10). */
export function makeMultTask(kind: MultKind, table: number, rnd: () => number = Math.random): LabTask {
  const b = table >= 2 && table <= 10 ? table : rint(2, 10, rnd);
  if (kind === 'szorzat') {
    const a = rint(1, 10, rnd);
    const p = a * b;
    return {
      text: `${a} · ${b} = ?`,
      answer: p,
      hint: `${a} · ${b} = ${a} darab ${b} összege. Keresd meg ${az(b)} ${b}${es(b)} táblában!`,
      mistakes: cleanMistakes(p, [
        { value: a + b, msg: `Ez az összeadás: ${a} + ${b}. Szorzásnál ${a} darab ${b} összege kell!` },
        { value: (a + 1) * b, msg: `Egy lépéssel túlszaladtál: ez ${a + 1} · ${b}.` },
        { value: (a - 1) * b, msg: `Egy lépés hiányzik: ez csak ${a - 1} · ${b}.` },
      ]),
    };
  }
  if (kind === 'hianyzo') {
    const a = rint(1, 10, rnd);
    const p = a * b;
    return {
      text: `□ · ${b} = ${p}`,
      answer: a,
      hint: `Ugorj 0-tól ${b}${es(b)} lépésekkel ${p}-ig. Hány ugrás kell?`,
      mistakes: cleanMistakes(a, [
        { value: b, msg: `${Az(b)} ${b} már ott van. Azt keresd, hányszor kell venni!` },
        { value: p - b, msg: `Nem kell kivonni! Azt keresd: hányszor ${b} lesz ${p}?` },
        { value: a + 1, msg: `Ellenőrizd: ${a + 1} · ${b} = ${(a + 1) * b}, ez több, mint ${p}.` },
      ]),
    };
  }
  if (kind === 'szoros') {
    const a = rint(1, 10, rnd);
    const p = a * b;
    return {
      text: `Mennyi ${az(a)} ${a} ${SZOROSA[b]}?`,
      answer: p,
      hint: `${Az(a)} ${a} ${SZOROSA[b]}: ${b} · ${a}.`,
      mistakes: cleanMistakes(p, [
        { value: a + b, msg: `Nem összeadás! ${Az(a)} ${a} ${SZOROSA[b]} = ${b} · ${a}.` },
        { value: (b - 1) * a, msg: `Ez csak ${b - 1} · ${a}. ${Az(a)} ${a} ${SZOROSA[b]}: ${b} · ${a}.` },
      ]),
    };
  }
  // kapcsolat
  const pool = table >= 2 ? LINKS.filter((l) => l.b === table || l.s === table) : LINKS;
  const link = (pool.length ? pool : LINKS)[rint(0, (pool.length ? pool : LINKS).length - 1, rnd)];
  const a = rint(1, 10, rnd);
  const small = a * link.s;
  const p = a * link.b;
  const doubleWord = link.k === 2 ? 'Duplázd meg' : 'Vedd háromszor';
  const sumText = link.k === 2 ? `${small} + ${small}` : `${small} + ${small} + ${small}`;
  return {
    text: `${a} · ${link.s} = ${small}. Mennyi ${a} · ${link.b}?`,
    answer: p,
    hint: `${doubleWord}: ${sumText}.`,
    mistakes: cleanMistakes(p, [
      { value: small + (link.b - link.s), msg: `Nem így! ${doubleWord}: ${sumText}.` },
      { value: small + a, msg: `Nem így! ${doubleWord}: ${sumText}.` },
    ]),
  };
}

// ---------------------------------------------------------------------------
// Labor II: Szorzótábla-detektív
// ---------------------------------------------------------------------------
export function cellsFor(target: number): [number, number][] {
  const out: [number, number][] = [];
  for (let r = 1; r <= 10; r++) for (let c = 1; c <= 10; c++) if (r * c === target) out.push([r, c]);
  return out;
}

export const DETECTIVE_TARGETS: number[] = (() => {
  const list: number[] = [];
  for (let t = 4; t <= 100; t++) {
    const n = cellsFor(t).length;
    if (n >= 2 && n <= 4) list.push(t);
  }
  return list;
})();

export function makeDetectiveTarget(prev = 0, rnd: () => number = Math.random): number {
  let t = prev;
  while (t === prev) t = DETECTIVE_TARGETS[rint(0, DETECTIVE_TARGETS.length - 1, rnd)];
  return t;
}

// ---------------------------------------------------------------------------
// Közös labor-UI elemek
// ---------------------------------------------------------------------------
export const LabBox: React.FC<{ color: 'rose' | 'sky' | 'violet' | 'amber'; children: React.ReactNode }> = ({ color, children }) => {
  const border = {
    rose: 'border-rose-200 dark:border-rose-800',
    sky: 'border-sky-200 dark:border-sky-800',
    violet: 'border-violet-200 dark:border-violet-800',
    amber: 'border-amber-200 dark:border-amber-800',
  }[color];
  return <div className={`bg-white dark:bg-slate-900 border-2 ${border} rounded-2xl p-4 sm:p-6 shadow-sm space-y-4`}>{children}</div>;
};

export const LabButton: React.FC<{ onClick: () => void; kind?: 'check' | 'new' | 'pick' | 'picked'; children: React.ReactNode }> = ({
  onClick,
  kind = 'check',
  children,
}) => {
  const cls = {
    check: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    new: 'bg-slate-700 hover:bg-slate-800 text-white',
    pick: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300',
    picked: 'bg-rose-500 text-white',
  }[kind];
  return (
    <button type="button" onClick={onClick} className={`px-4 py-2.5 rounded-xl font-black text-sm min-h-[48px] cursor-pointer ${cls}`}>
      {children}
    </button>
  );
};

export const Feedback: React.FC<{ fb: { ok: boolean; msg: string } | null }> = ({ fb }) =>
  fb ? (
    <div className={`rounded-xl p-3 text-center text-sm sm:text-base font-bold ${fb.ok ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'}`}>
      {fb.msg}
    </div>
  ) : null;

export const NumInput: React.FC<{ value: string; onChange: (v: string) => void; onEnter?: () => void; label: string; width?: string }> = ({
  value,
  onChange,
  onEnter,
  label,
  width = 'w-24',
}) => (
  <input
    value={value}
    inputMode="numeric"
    aria-label={label}
    placeholder="?"
    onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && onEnter) onEnter();
    }}
    className={`${width} text-center text-2xl font-black rounded-xl border-2 border-slate-300 bg-white text-slate-900 px-2 py-2 min-h-[52px]`}
  />
);

/** Általános „írd be a számot” labor egy feladatgenerátorral. */
export function useTaskTrainer(make: () => LabTask) {
  const [task, setTask] = useState<LabTask>(make);
  const [guess, setGuess] = useState('');
  const [fb, setFb] = useState<{ ok: boolean; msg: string } | null>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const [counted, setCounted] = useState(false);

  const next = (t?: LabTask) => {
    setTask(t ?? make());
    setGuess('');
    setFb(null);
    setCounted(false);
  };
  const check = () => {
    if (guess.trim() === '') return;
    const v = Number(guess);
    const ok = v === task.answer;
    let msg = ok ? `Ügyes! A jó válasz: ${task.answer}.` : `Még nem jó. Tipp: ${task.hint}`;
    if (!ok) {
      const hit = task.mistakes.find((m) => m.value === v);
      if (hit) msg = hit.msg;
    }
    setFb({ ok, msg });
    if (!counted) {
      setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }));
      setCounted(true);
    }
  };
  return { task, guess, setGuess: (v: string) => { setGuess(v); setFb(null); }, fb, score, next, check };
}

// ---------------------------------------------------------------------------
// Labor I komponens
// ---------------------------------------------------------------------------
export const MultMixLab: React.FC = () => {
  const [kind, setKind] = useState<MultKind>('szorzat');
  const [table, setTable] = useState(0);
  const tr = useTaskTrainer(() => makeMultTask('szorzat', 0));

  const pick = (k: MultKind, t: number) => {
    setKind(k);
    setTable(t);
    tr.next(makeMultTask(k, t));
  };

  return (
    <LabBox color="rose">
      <div>
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Melyik tábla?</div>
        <div className="flex flex-wrap gap-2">
          {[0, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((t) => (
            <LabButton key={t} kind={t === table ? 'picked' : 'pick'} onClick={() => pick(kind, t)}>
              {t === 0 ? 'Vegyes' : `${t}${es(t)}`}
            </LabButton>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Milyen feladat?</div>
        <div className="flex flex-wrap gap-2">
          {MULT_KINDS.map((k) => (
            <LabButton key={k.id} kind={k.id === kind ? 'picked' : 'pick'} onClick={() => pick(k.id, table)}>
              {k.label}
            </LabButton>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 p-4 text-center space-y-3">
        <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{tr.task.text}</div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <NumInput value={tr.guess} onChange={tr.setGuess} onEnter={tr.check} label="A te válaszod" />
          <LabButton onClick={tr.check}>Ellenőrzés</LabButton>
          <LabButton kind="new" onClick={() => tr.next(makeMultTask(kind, table))}>
            Új feladat
          </LabButton>
        </div>
        <Feedback fb={tr.fb} />
        <div className="text-sm font-bold text-slate-600 dark:text-slate-300">
          Pontjaid: {tr.score.ok} jó válasz / {tr.score.all} feladat
        </div>
      </div>
    </LabBox>
  );
};

// ---------------------------------------------------------------------------
// Labor II komponens: Szorzótábla-detektív (10 × 10 rács)
// ---------------------------------------------------------------------------
export const DetectiveLab: React.FC = () => {
  const [target, setTarget] = useState(() => makeDetectiveTarget());
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState(false);
  const [fb, setFb] = useState<{ ok: boolean; msg: string } | null>(null);
  const [found, setFound] = useState(0);

  const solution = cellsFor(target);
  const solKeys = new Set(solution.map(([r, c]) => `${r}-${c}`));

  const toggle = (key: string) => {
    setChecked(false);
    setFb(null);
    setPicked((prev) => {
      const nx = new Set(prev);
      if (nx.has(key)) nx.delete(key);
      else nx.add(key);
      return nx;
    });
  };

  const check = () => {
    const wrong = [...picked].filter((k) => !solKeys.has(k));
    const good = [...picked].filter((k) => solKeys.has(k));
    setChecked(true);
    if (wrong.length === 0 && good.length === solution.length) {
      setFb({ ok: true, msg: `Megvan mind a ${solution.length} hely! ${solution.map(([r, c]) => `${r} · ${c}`).join(', ')} = ${target}.` });
      setFound((f) => f + 1);
    } else if (wrong.length > 0) {
      const [r, c] = wrong[0].split('-').map(Number);
      setFb({ ok: false, msg: `A pirossal jelölt hely nem jó: ${r} · ${c} = ${r * c}, nem ${target}.` });
    } else {
      setFb({ ok: false, msg: `Jó nyomon vagy! Még ${solution.length - good.length} hely hiányzik. Gondolj a felcserélésre!` });
    }
  };

  const next = () => {
    setTarget((t) => makeDetectiveTarget(t));
    setPicked(new Set());
    setChecked(false);
    setFb(null);
  };

  return (
    <LabBox color="sky">
      <div className="bg-sky-50 dark:bg-sky-950/40 rounded-xl p-3 text-center text-base sm:text-lg font-bold text-sky-950 dark:text-sky-100">
        Keresd meg az összes mezőt, ahol a szorzat <span className="text-2xl font-black text-rose-600">{target}</span>!
        <div className="text-xs sm:text-sm font-semibold mt-1">A sor száma · az oszlop száma. Koppints a mezőkre!</div>
      </div>
      <div className="overflow-x-auto">
        <div className="grid gap-[3px] mx-auto w-max" style={{ gridTemplateColumns: 'repeat(11, minmax(28px, 36px))' }}>
          <div className="h-8 sm:h-9 flex items-center justify-center text-sm font-black text-slate-500">·</div>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={`h${i}`} className="h-8 sm:h-9 flex items-center justify-center rounded bg-pink-100 text-pink-900 text-sm font-black">
              {i + 1}
            </div>
          ))}
          {Array.from({ length: 10 }, (_, ri) => (
            <React.Fragment key={`r${ri}`}>
              <div className="h-8 sm:h-9 flex items-center justify-center rounded bg-sky-100 text-sky-900 text-sm font-black">{ri + 1}</div>
              {Array.from({ length: 10 }, (_, ci) => {
                const key = `${ri + 1}-${ci + 1}`;
                const isPicked = picked.has(key);
                const isSol = solKeys.has(key);
                let cls = 'bg-white border-slate-200 hover:bg-amber-50';
                let label = '';
                if (isPicked && !checked) cls = 'bg-amber-300 border-amber-500';
                if (checked && isPicked && isSol) {
                  cls = 'bg-emerald-400 border-emerald-600 text-white';
                  label = String(target);
                }
                if (checked && isPicked && !isSol) {
                  cls = 'bg-rose-400 border-rose-600 text-white';
                  label = String((ri + 1) * (ci + 1));
                }
                return (
                  <button
                    key={key}
                    type="button"
                    aria-label={`${ri + 1} · ${ci + 1}`}
                    onClick={() => toggle(key)}
                    className={`h-8 sm:h-9 rounded border-2 text-[10px] sm:text-xs font-black cursor-pointer ${cls}`}
                  >
                    {label}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <LabButton onClick={check}>Ellenőrzés</LabButton>
        <LabButton kind="new" onClick={next}>
          Új szám
        </LabButton>
      </div>
      <Feedback fb={fb} />
      <div className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Megfejtett számok: {found}</div>
    </LabBox>
  );
};
