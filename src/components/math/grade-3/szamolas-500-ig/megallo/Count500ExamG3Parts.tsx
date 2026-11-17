import React from 'react';
import { FONT, UNK, QFig, Coin, Flat, Rod, Note500, PriceTag } from '../osszeadas-es-kivonas/AddSub500G3Parts';

// ---------------------------------------------------------------------------
// Rajzelemek az 5. Megálló – tudáspróba leckéhez.
// Az érme, a lap, a rúd, a számegyenes és a csík a 3–4. leckéből jön.
// Színek: százas = piros, tízes = kék, egyes = sárga.
// ---------------------------------------------------------------------------

export { FONT, UNK, QFig };

/** Egyeskocka (sárga). */
export const Cube: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 7 }) => (
  <rect x={x} y={y} width={s} height={s} rx="1" fill="#facc15" stroke="#a16207" strokeWidth="0.9" />
);

/** Számkép: százas lapok, tízesrudak, egyeskockák (a tízesek akár 15-en is). */
export const BlocksFig: React.FC<{ sz: number; t: number; e: number }> = ({ sz, t, e }) => {
  const s = t > 9 ? 30 : 36;
  const rodStep = t > 9 ? 7 : 8.5;
  const fw = sz * (s + 4);
  const rw = t * rodStep;
  const total = fw + rw + (e ? 6 + Math.ceil(e / 5) * 9 : 0);
  const x0 = Math.max(6, (240 - total) / 2);
  const ex = x0 + fw + rw + 6;
  return (
    <QFig h={66}>
      {Array.from({ length: sz }).map((_, i) => (
        <Flat key={`f${i}`} x={x0 + i * (s + 4)} y={14} s={s} />
      ))}
      {Array.from({ length: t }).map((_, i) => (
        <Rod key={`r${i}`} x={x0 + fw + i * rodStep} y={14} w={rodStep - 2.5} h={s} />
      ))}
      {Array.from({ length: e }).map((_, i) => (
        <Cube key={`c${i}`} x={ex + Math.floor(i / 5) * 9} y={14 + (i % 5) * 8} s={7} />
      ))}
    </QFig>
  );
};

/** Helyiérték-táblázat (Sz, T, E). hl: kiemelt oszlop; hide: „?” az oszlopban. */
export const PlaceFig: React.FC<{ d: (number | string)[]; hl?: number; hide?: number }> = ({ d, hl, hide }) => {
  const heads = ['Sz', 'T', 'E'];
  const colors = ['#fee2e2', '#dbeafe', '#fef9c3'];
  return (
    <QFig h={84}>
      {heads.map((h, i) => (
        <g key={h}>
          <rect x={45 + i * 50} y={10} width="50" height="26" fill={colors[i]} stroke="#475569" strokeWidth="1.3" />
          <text x={70 + i * 50} y={28} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{h}</text>
          <rect x={45 + i * 50} y={36} width="50" height="36" fill={hl === i ? '#fde68a' : '#fff'} stroke="#475569" strokeWidth="1.3" />
          <text x={70 + i * 50} y={62} textAnchor="middle" fontSize="22" fontWeight="bold" fill={hide === i ? UNK : '#0f172a'}>{hide === i ? '?' : d[i]}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Számegyenes beosztással; a nyíl a `mark` helyére mutat, felirata „?” (vagy `markLabel`). */
export const NLFig: React.FC<{ lo: number; hi: number; step: number; labelStep: number; mark: number; markLabel?: string }> = ({
  lo,
  hi,
  step,
  labelStep,
  mark,
  markLabel = '?'
}) => {
  const x0 = 18;
  const x1 = 220;
  const y = 54;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += step) ticks.push(v);
  return (
    <QFig h={86}>
      <line x1={x0 - 6} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 16} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {ticks.map((v) => {
        const big = (v - lo) % labelStep === 0;
        return (
          <g key={v}>
            <line x1={X(v)} y1={big ? y - 8 : y - 5} x2={X(v)} y2={big ? y + 8 : y + 5} stroke="#334155" strokeWidth={big ? 1.8 : 1.1} />
            {big && <text x={X(v)} y={y + 22} textAnchor="middle" fontSize="11.5" fill="#334155">{v}</text>}
          </g>
        );
      })}
      <path d={`M ${X(mark)} ${y - 30} L ${X(mark)} ${y - 10}`} stroke={UNK} strokeWidth="2.4" />
      <path d={`M ${X(mark) - 5} ${y - 16} L ${X(mark)} ${y - 9} L ${X(mark) + 5} ${y - 16}`} fill="none" stroke={UNK} strokeWidth="2.4" />
      <circle cx={X(mark)} cy={y} r="3.8" fill={UNK} />
      <text x={X(mark)} y={y - 34} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>{markLabel}</text>
    </QFig>
  );
};

/** Kerekítés: a szám a két szomszéd között, „≈ ?”. */
export const RoundFig: React.FC<{ v: number; lo: number; hi: number }> = ({ v, lo, hi }) => {
  const x0 = 24;
  const x1 = 216;
  const y = 50;
  const X = (u: number) => x0 + ((x1 - x0) * (u - lo)) / (hi - lo);
  const step = (hi - lo) / 10;
  return (
    <QFig h={84}>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="#334155" strokeWidth="1.8" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={X(lo + i * step)} y1={i % 5 === 0 ? y - 8 : y - 4} x2={X(lo + i * step)} y2={i % 5 === 0 ? y + 8 : y + 4} stroke="#334155" strokeWidth={i % 5 === 0 ? 1.8 : 1} />
      ))}
      <text x={X(lo)} y={y + 22} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#6d28d9">{lo}</text>
      <text x={X(hi)} y={y + 22} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#6d28d9">{hi}</text>
      <circle cx={X(v)} cy={y} r="4.5" fill="#2563eb" />
      <text x={X(v)} y={y - 14} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">{v}</text>
      <text x="120" y="78" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>{v} ≈ ?</text>
    </QFig>
  );
};

/** Érmék 1 vagy 2 sorban. */
export const CoinsRow: React.FC<{ coins: number[] }> = ({ coins }) => {
  const two = coins.length > 6;
  const top = two ? Math.ceil(coins.length / 2) : coins.length;
  const r = 15;
  const step = 34;
  return (
    <QFig h={two ? 88 : 56}>
      {coins.map((c, i) => {
        const row = two && i >= top ? 1 : 0;
        const inRow = row ? coins.length - top : top;
        const k = row ? i - top : i;
        return <Coin key={i} cx={120 - ((inRow - 1) * step) / 2 + k * step} cy={28 + row * 34} v={c} r={c >= 100 ? r + 1 : r} />;
      })}
    </QFig>
  );
};

/** Műveletlánc: dobozok, köztük nyilak a művelettel. '?' = ismeretlen, '' = üres doboz. */
export const ChainFig: React.FC<{ values: (number | string)[]; ops: string[] }> = ({ values, ops }) => {
  const n = values.length;
  const bw = 34;
  const gap = (228 - n * bw) / Math.max(1, n - 1);
  return (
    <QFig h={70}>
      {values.map((v, i) => {
        const x = 6 + i * (bw + gap);
        const unk = v === '?';
        return (
          <g key={i}>
            <rect x={x} y={30} width={bw} height="26" rx="5" fill={unk ? '#fee2e2' : i === 0 ? '#e0e7ff' : '#f1f5f9'} stroke={unk ? UNK : '#475569'} strokeWidth="1.5" />
            <text x={x + bw / 2} y={48} textAnchor="middle" fontSize="13" fontWeight="bold" fill={unk ? UNK : '#0f172a'}>{v}</text>
            {i < n - 1 && (
              <g>
                <path d={`M ${x + bw + 2} 43 L ${x + bw + gap - 3} 43`} stroke="#64748b" strokeWidth="1.6" />
                <path d={`M ${x + bw + gap - 7} 39.5 L ${x + bw + gap - 2} 43 L ${x + bw + gap - 7} 46.5`} fill="none" stroke="#64748b" strokeWidth="1.6" />
                <text x={x + bw + gap / 2} y={24} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#7c3aed">{ops[i]}</text>
              </g>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

/** Számkártyák egy sorban. */
export const DigitCards: React.FC<{ digits: string[] }> = ({ digits }) => {
  const w = 40;
  const x0 = 120 - (digits.length * (w + 8) - 8) / 2;
  const fills = ['#fecaca', '#fde68a', '#bbf7d0', '#f5d0fe'];
  return (
    <QFig h={70}>
      {digits.map((d, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + 8)} y={12} width={w} height="46" rx="6" fill={d === '□' ? '#fff' : fills[i % 4]} stroke={d === '□' ? UNK : '#475569'} strokeWidth="1.8" strokeDasharray={d === '□' ? '4 3' : undefined} />
          <text x={x0 + i * (w + 8) + w / 2} y={44} textAnchor="middle" fontSize="24" fontWeight="bold" fill={d === '□' ? UNK : '#0f172a'}>{d === '□' ? '?' : d}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Árcédulák, opcionálisan az 500 Ft-os bankjeggyel. */
export const TagsFig: React.FC<{ prices: string[]; pay?: boolean; names?: string[] }> = ({ prices, pay, names }) => {
  const start = pay ? 96 : 120 - (prices.length * 72 - 8) / 2;
  return (
    <QFig h={names ? 84 : 66}>
      {pay && <Note500 x={10} y={16} w={70} h={36} />}
      {prices.map((p, i) => (
        <g key={i}>
          <PriceTag x={start + i * 72} y={18} w={64} text={p} />
          {names && <text x={start + i * 72 + 27} y={72} textAnchor="middle" fontSize="11" fill="#475569">{names[i]}</text>}
        </g>
      ))}
    </QFig>
  );
};

/** 3 × 3-as bűvös négyzet; '?' piros, '' üres. */
export const MagicFig: React.FC<{ cells: (number | string)[] }> = ({ cells }) => (
  <QFig h={130}>
    {cells.map((c, i) => {
      const x = 60 + (i % 3) * 40;
      const y = 8 + Math.floor(i / 3) * 38;
      const unk = c === '?';
      return (
        <g key={i}>
          <rect x={x} y={y} width="40" height="38" fill={unk ? '#fee2e2' : '#fef9c3'} stroke={unk ? UNK : '#a16207'} strokeWidth="1.5" />
          <text x={x + 20} y={y + 25} textAnchor="middle" fontSize="14" fontWeight="bold" fill={unk ? UNK : '#0f172a'}>{c}</text>
        </g>
      );
    })}
  </QFig>
);

/** Fasor: egy út, a két végén és közben egyenlő távolságonként fa. Csak az első köz látszik. */
export const TreesFig: React.FC<{ total: number; gap: number }> = ({ total, gap }) => {
  const x0 = 24;
  const x1 = 216;
  const X = (v: number) => x0 + ((x1 - x0) * v) / total;
  const tree = (x: number, key: string) => (
    <g key={key}>
      <rect x={x - 2} y={40} width="4" height="12" fill="#92400e" />
      <circle cx={x} cy={34} r="9" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
    </g>
  );
  return (
    <QFig h={92}>
      <line x1={x0} y1={54} x2={x1} y2={54} stroke="#a8a29e" strokeWidth="5" strokeLinecap="round" />
      {tree(X(0), 'a')}
      {tree(X(gap), 'b')}
      {tree(X(total), 'c')}
      <text x={(X(gap) + X(total)) / 2} y={40} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>… ? fa …</text>
      <path d={`M ${X(0)} 64 L ${X(0)} 70 L ${X(gap)} 70 L ${X(gap)} 64`} fill="none" stroke="#475569" strokeWidth="1.3" />
      <text x={(X(0) + X(gap)) / 2} y={84} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#334155">{gap} m</text>
      <text x={X(total)} y={84} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#334155">{total} m</text>
    </QFig>
  );
};

/** Két csík: a második „k-szor annyi” (k darab egyforma rész). */
export const TimesFig: React.FC<{ a: { name: string; v: string }; b: { name: string; parts: number }; note: string }> = ({ a, b, note }) => {
  const x0 = 80;
  const w = Math.min(34, 150 / b.parts);
  return (
    <QFig h={92}>
      <text x={x0 - 6} y="30" textAnchor="end" fontSize="11.5" fontWeight="bold" fill="#334155">{a.name}</text>
      <rect x={x0} y="16" width={w} height="20" fill="#fde68a" stroke="#92400e" />
      <text x={x0 + w / 2} y="31" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">{a.v}</text>
      <text x={x0 - 6} y="62" textAnchor="end" fontSize="11.5" fontWeight="bold" fill="#334155">{b.name}</text>
      {Array.from({ length: b.parts }).map((_, i) => (
        <rect key={i} x={x0 + i * w} y="48" width={w} height="20" fill="#e0f2fe" stroke="#0369a1" />
      ))}
      <text x="120" y="84" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0369a1">{note}</text>
    </QFig>
  );
};
