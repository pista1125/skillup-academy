import React from 'react';
import { QFig, FONT, INK, UNK, Coin, rnd, pick, shuffle, TxtBox } from '../muveleti-sorrend/OrderOps1000G3Parts';

// ---------------------------------------------------------------------------
// Rajzelemek és feladat-generátorok a XII. fejezet 4. leckéjéhez
// (Vegyes műveletek és szöveges feladatok): táblázat, útvonal-térkép,
// szakaszos (rész–egész) ábra, bűvös háromszög / téglalap, számkártyák, érmék.
// ---------------------------------------------------------------------------

export { QFig, FONT, INK, UNK, rnd, pick, shuffle };

const isUnk = (s: string | number) => String(s).includes('?') || String(s) === '□';

/** Adattáblázat: első sor fejléc, első oszlop sorcímke. „?” piros. */
export const TableFig: React.FC<{ head: string[]; rows: (string | number)[][]; caption?: string }> = ({ head, rows, caption }) => {
  const n = head.length;
  const firstW = 76;
  const w = (228 - firstW) / (n - 1);
  const rh = 28;
  const h = 14 + rh * (rows.length + 1) + (caption ? 18 : 0);
  const cx = (j: number) => (j === 0 ? 6 + firstW / 2 : 6 + firstW + (j - 1) * w + w / 2);
  return (
    <QFig h={h}>
      {head.map((t, j) => (
        <g key={`h${j}`}>
          <rect x={j === 0 ? 6 : 6 + firstW + (j - 1) * w} y="7" width={j === 0 ? firstW : w} height={rh} fill="#86efac" stroke="#16a34a" />
          <text x={cx(j)} y={7 + rh * 0.66} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#14532d">{t}</text>
        </g>
      ))}
      {rows.map((r, i) =>
        r.map((t, j) => (
          <g key={`${i}-${j}`}>
            <rect x={j === 0 ? 6 : 6 + firstW + (j - 1) * w} y={7 + rh * (i + 1)} width={j === 0 ? firstW : w} height={rh} fill={j === 0 ? '#bbf7d0' : '#f0fdf4'} stroke="#16a34a" />
            <text x={cx(j)} y={7 + rh * (i + 1) + rh * 0.68} textAnchor="middle" fontSize={j === 0 ? 11.5 : 15} fontWeight="bold" fill={isUnk(t) ? UNK : INK}>{t}</text>
          </g>
        ))
      )}
      {caption && <text x="120" y={h - 8} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/**
 * Útvonal egy egyenes utcán: helyek pöttyel, köztük a távolság.
 * ask: [i, j] – a két hely között kapcsos zárójel „?”-lel (keresett távolság).
 */
export const RouteFig: React.FC<{ places: string[]; dists: (number | string)[]; unit?: string; ask?: [number, number]; askText?: string; className?: string }> = ({ places, dists, unit = 'm', ask, askText = '?', className }) => {
  const n = places.length;
  const x0 = 22;
  const x1 = 218;
  const xs = places.map((_, i) => x0 + (i * (x1 - x0)) / (n - 1));
  const h = ask ? 112 : 92;
  const yRoad = ask ? 66 : 46;
  return (
    <svg viewBox={`0 0 240 ${h}`} className={className ?? 'w-full max-w-[280px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      <rect x={x0 - 8} y={yRoad - 6} width={x1 - x0 + 16} height="12" rx="6" fill="#cbd5e1" />
      <line x1={x0} y1={yRoad} x2={x1} y2={yRoad} stroke="#fff" strokeWidth="2" strokeDasharray="6 5" />
      {ask && (
        <g>
          <path d={`M ${xs[ask[0]]} ${yRoad - 14} Q ${xs[ask[0]]} ${yRoad - 26} ${(xs[ask[0]] + xs[ask[1]]) / 2 - 8} ${yRoad - 26} L ${(xs[ask[0]] + xs[ask[1]]) / 2} ${yRoad - 34} L ${(xs[ask[0]] + xs[ask[1]]) / 2 + 8} ${yRoad - 26} Q ${xs[ask[1]]} ${yRoad - 26} ${xs[ask[1]]} ${yRoad - 14}`} fill="none" stroke={UNK} strokeWidth="2" />
          <text x={(xs[ask[0]] + xs[ask[1]]) / 2} y={yRoad - 40} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>{askText}</text>
        </g>
      )}
      {dists.map((d, i) => (
        <text key={`d${i}`} x={(xs[i] + xs[i + 1]) / 2} y={yRoad - 11} textAnchor="middle" fontSize="13" fontWeight="bold" fill={isUnk(d) ? UNK : '#1d4ed8'}>{`${d} ${unit}`}</text>
      ))}
      {places.map((p, i) => (
        <g key={`p${i}`}>
          <circle cx={xs[i]} cy={yRoad} r="7" fill={['#f97316', '#3b82f6', '#22c55e', '#a855f7', '#ec4899'][i % 5]} stroke="#1e293b" strokeWidth="1.5" />
          <text x={xs[i]} y={yRoad + 24} textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>{p}</text>
        </g>
      ))}
    </svg>
  );
};

/** Rész–egész szakasz: fölötte az egész (zárójellel), alatta a részek. */
export const BarFig: React.FC<{ whole: string; parts: { v: number; text: string }[]; caption?: string }> = ({ whole, parts, caption }) => {
  const W = 212;
  const sum = parts.reduce((s, p) => s + p.v, 0);
  let x = 14;
  const cols = ['#bfdbfe', '#fed7aa', '#bbf7d0', '#e9d5ff'];
  const h = caption ? 112 : 96;
  return (
    <QFig h={h}>
      <path d={`M 14 38 Q 14 28 24 28 L 112 28 L 120 20 L 128 28 L 216 28 Q 226 28 226 38`} fill="none" stroke="#475569" strokeWidth="2" />
      <text x="120" y="16" textAnchor="middle" fontSize="14" fontWeight="bold" fill={isUnk(whole) ? UNK : INK}>{whole}</text>
      {parts.map((p, i) => {
        const w = (p.v / sum) * W;
        const g = (
          <g key={i}>
            <rect x={x} y="44" width={w} height="30" rx="4" fill={cols[i % 4]} stroke="#334155" strokeWidth="1.5" />
            <TxtBox x={x + w / 2} y={65} t={p.text} fs={14} fill={isUnk(p.text) ? UNK : INK} />
          </g>
        );
        x += w;
        return g;
      })}
      {caption && <text x="120" y={h - 10} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/** Két (vagy három) szalag egymás alatt összehasonlításhoz. A szegmensek hossza arányos. */
export const RowsFig: React.FC<{ rows: { name: string; segs: { v: number; text: string; dashed?: boolean }[] }[]; max: number; right?: string }> = ({ rows, max, right }) => {
  const x0 = 70;
  const W = right ? 132 : 160;
  const h = 18 + rows.length * 34;
  const cols = ['#bfdbfe', '#fde68a', '#bbf7d0'];
  return (
    <QFig h={h}>
      {rows.map((r, i) => {
        let x = x0;
        const y = 12 + i * 34;
        return (
          <g key={i}>
            <text x={x0 - 6} y={y + 19} textAnchor="end" fontSize="12" fontWeight="bold" fill={INK}>{r.name}</text>
            {r.segs.map((s, k) => {
              const w = (s.v / max) * W;
              const el = (
                <g key={k}>
                  <rect x={x} y={y} width={w} height="26" rx="4" fill={s.dashed ? '#fff' : cols[k % 3]} stroke="#334155" strokeWidth="1.5" strokeDasharray={s.dashed ? '4 3' : undefined} />
                  <text x={x + w / 2} y={y + 18} textAnchor="middle" fontSize="13" fontWeight="bold" fill={isUnk(s.text) ? UNK : INK}>{s.text}</text>
                </g>
              );
              x += w;
              return el;
            })}
          </g>
        );
      })}
      {right && (
        <g>
          <path d={`M 208 12 Q 216 12 216 22 L 216 ${h / 2 - 8} L 222 ${h / 2 - 2} L 216 ${h / 2 + 4} L 216 ${h - 16} Q 216 ${h - 6} 208 ${h - 6}`} fill="none" stroke={UNK} strokeWidth="2" />
          <text x="229" y={h / 2 + 3} textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>{right}</text>
        </g>
      )}
    </QFig>
  );
};

const NumCircle: React.FC<{ cx: number; cy: number; v: string; r?: number }> = ({ cx, cy, v, r = 17 }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={v === '' ? '#e2e8f0' : isUnk(v) ? '#fee2e2' : '#fff'} stroke={isUnk(v) ? UNK : '#334155'} strokeWidth="1.8" />
    <text x={cx} y={cy + 4.5} textAnchor="middle" fontSize={v.length > 2 ? 12.5 : 14} fontWeight="bold" fill={isUnk(v) ? UNK : INK}>{v}</text>
  </g>
);

/** Bűvös háromszög: v = [felső, bal oldal közepe, jobb oldal közepe, bal alsó, alsó közép, jobb alsó]. */
export const TriangleFig: React.FC<{ v: string[]; caption?: string }> = ({ v, caption }) => {
  const P = [
    [120, 26],
    [78, 82],
    [162, 82],
    [36, 138],
    [120, 138],
    [204, 138]
  ];
  return (
    <QFig h={caption ? 178 : 164}>
      <path d="M 120 26 L 36 138 L 204 138 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
      {P.map(([x, y], i) => (
        <NumCircle key={i} cx={x} cy={y} v={v[i]} />
      ))}
      {caption && <text x="120" y="170" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/** Bűvös téglalap: v = [bal felső, felső közép, jobb felső, bal közép, jobb közép, bal alsó, alsó közép, jobb alsó]. */
export const RectFig: React.FC<{ v: string[]; caption?: string }> = ({ v, caption }) => {
  const P = [
    [40, 28],
    [120, 28],
    [200, 28],
    [40, 78],
    [200, 78],
    [40, 128],
    [120, 128],
    [200, 128]
  ];
  return (
    <QFig h={caption ? 170 : 156}>
      <rect x="40" y="28" width="160" height="100" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2.5" />
      {P.map(([x, y], i) => (
        <NumCircle key={i} cx={x} cy={y} v={v[i]} r={18} />
      ))}
      {caption && <text x="120" y="162" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/** Számkártyák. */
export const CardsFig: React.FC<{ digits: string[] }> = ({ digits }) => {
  const n = digits.length;
  const x0 = 120 - (n * 46 - 8) / 2;
  const fills = ['#cffafe', '#fed7aa', '#fbcfe8', '#d9f99d', '#e9d5ff'];
  return (
    <QFig h={84}>
      {digits.map((d, i) => (
        <g key={i}>
          <rect x={x0 + i * 46} y="14" width="38" height="54" rx="7" fill={fills[i % 5]} stroke="#334155" strokeWidth="1.8" />
          <text x={x0 + i * 46 + 19} y="51" textAnchor="middle" fontSize="26" fontWeight="bold" fill={INK}>{d}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Érmék egy sorban (100 és 200 Ft-os érmék). */
export const CoinsFig: React.FC<{ coins: number[]; caption?: string }> = ({ coins, caption }) => {
  const step = Math.min(46, 220 / coins.length);
  const x0 = 120 - ((coins.length - 1) * step) / 2;
  return (
    <QFig h={caption ? 84 : 66}>
      {coins.map((c, i) => (
        <Coin key={i} cx={x0 + i * step} cy={33} v={c} />
      ))}
      {caption && <text x="120" y="74" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/** Számsorozat dobozokban, a lépések ívekkel. */
export const SeqFig: React.FC<{ items: string[]; step?: string }> = ({ items, step }) => {
  const n = items.length;
  const w = 46;
  const gap = (224 - n * w) / (n - 1);
  return (
    <QFig h={86}>
      {items.map((t, i) => {
        const x = 8 + i * (w + gap);
        return (
          <g key={i}>
            <rect x={x} y="42" width={w} height="30" rx="7" fill={isUnk(t) ? '#fee2e2' : '#e0f2fe'} stroke={isUnk(t) ? UNK : '#0369a1'} strokeWidth="1.8" />
            <text x={x + w / 2} y="63" textAnchor="middle" fontSize="15" fontWeight="bold" fill={isUnk(t) ? UNK : INK}>{t}</text>
            {i < n - 1 && step && (
              <g>
                <path d={`M ${x + w / 2 + 6} 40 Q ${x + w / 2 + (w + gap) / 2} 18 ${x + w + gap + w / 2 - 6} 40`} fill="none" stroke="#dc2626" strokeWidth="1.8" />
                <text x={x + w / 2 + (w + gap) / 2} y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#dc2626">{step}</text>
              </g>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

/** Pálya RAJT-tól CÉL-ig, rajta jelölők (név + megtett táv). */
export const TrackFig: React.FC<{ total: number; marks: { name: string; at: number; color: string }[]; unit?: string }> = ({ total, marks, unit = 'm' }) => {
  const x0 = 24;
  const x1 = 216;
  const X = (v: number) => x0 + (v / total) * (x1 - x0);
  return (
    <QFig h={106}>
      <line x1={x0} y1="60" x2={x1} y2="60" stroke="#475569" strokeWidth="3" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={X((i * total) / 10)} y1="54" x2={X((i * total) / 10)} y2="66" stroke="#475569" strokeWidth={i % 5 === 0 ? 2.2 : 1.2} />
      ))}
      <text x={x0} y="84" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>RAJT</text>
      <text x={x1} y="84" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>CÉL</text>
      <text x={x1} y="40" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{`${total} ${unit}`}</text>
      {marks.map((m, i) => (
        <g key={i}>
          <circle cx={X(m.at)} cy="60" r="6" fill={m.color} stroke="#1e293b" strokeWidth="1.5" />
          <text x={X(m.at)} y={i % 2 ? 82 : 24} textAnchor="middle" fontSize="12" fontWeight="bold" fill={m.color}>{m.name}</text>
          <text x={X(m.at)} y={i % 2 ? 96 : 40} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={INK}>{`${m.at} ${unit}`}</text>
        </g>
      ))}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Labor-generátorok
// ---------------------------------------------------------------------------
const PLACES = ['Iskola', 'Pékség', 'Park', 'Uszoda', 'Könyvtár', 'Posta', 'Játszótér'];

export interface RouteTask {
  places: string[];
  dists: number[];
  kind: 'sum2' | 'sum3' | 'diff';
  ask: [number, number];
  question: string;
  answer: number;
}

export const genRoute = (): RouteTask => {
  for (let t = 0; t < 300; t++) {
    const places = ['Otthon', ...shuffle(PLACES).slice(0, 3)];
    const dists = [rnd(105, 395), rnd(105, 395), rnd(105, 395)];
    if (dists[0] + dists[1] + dists[2] > 1000) continue;
    if (new Set(dists).size < 3) continue;
    const kind = pick(['sum2', 'sum2', 'sum3', 'diff'] as const);
    if (kind === 'sum2') {
      const i = rnd(0, 1);
      return { places, dists, kind, ask: [i, i + 2], question: `Milyen messze van egymástól: ${places[i]} és ${places[i + 2]}?`, answer: dists[i] + dists[i + 1] };
    }
    if (kind === 'sum3') return { places, dists, kind, ask: [0, 3], question: `Milyen messze van egymástól: Otthon és ${places[3]}?`, answer: dists[0] + dists[1] + dists[2] };
    const [a, b] = dists[0] > dists[2] ? [0, 2] : [2, 0];
    return {
      places,
      dists,
      kind,
      ask: [a, a + 1],
      question: `Mennyivel hosszabb ${art(places[a])} ${places[a]}–${places[a + 1]} út, mint ${art(places[b])} ${places[b]}–${places[b + 1]} út?`,
      answer: dists[a] - dists[b]
    };
  }
  return { places: ['Otthon', 'Pékség', 'Iskola', 'Park'], dists: [275, 348, 186], kind: 'sum2', ask: [0, 2], question: 'Milyen messze van otthonról az iskola?', answer: 623 };
};
const art = (s: string) => (/^[AÁEÉIÍOÓÖŐUÚÜŰ]/i.test(s) ? 'az' : 'a');

export interface MissingTask {
  kind: 'x+b' | 'a+x' | 'a-x' | 'x-b';
  a: number;
  b: number;
  c: number;
  answer: number;
  text: string;
  hint: string;
  check: { a: number; op: '+' | '−'; b: number; r: number };
}

export const genMissing = (): MissingTask => {
  const kind = pick(['x+b', 'a+x', 'a-x', 'x-b'] as const);
  const x = rnd(105, 600);
  const y = rnd(105, 990 - x);
  const s = x + y;
  if (kind === 'x+b') return { kind, a: x, b: y, c: s, answer: x, text: `□ + ${y} = ${s}`, hint: `Az egyik összeadandó hiányzik. Vond ki az összegből a másikat: ${s} − ${y}.`, check: { a: x, op: '+', b: y, r: s } };
  if (kind === 'a+x') return { kind, a: x, b: y, c: s, answer: y, text: `${x} + □ = ${s}`, hint: `Pótolj ${s}-ig! Számold így: ${s} − ${x}.`, check: { a: x, op: '+', b: y, r: s } };
  if (kind === 'a-x') return { kind, a: s, b: x, c: y, answer: x, text: `${s} − □ = ${y}`, hint: `A kivonandó hiányzik. Számold így: ${s} − ${y}.`, check: { a: s, op: '−', b: x, r: y } };
  return { kind, a: s, b: x, c: y, answer: s, text: `□ − ${x} = ${y}`, hint: `A kisebbítendő hiányzik. Add össze a különbséget és a kivonandót: ${y} + ${x}.`, check: { a: s, op: '−', b: x, r: y } };
};
