import React from 'react';
import type { QuizQuestion } from '../QuizTemplate';
import { WrittenAddG3Column, addSteps, spokenStep } from '../../irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Column';
import { WrittenSubG3Column, subSteps, spokenSubStep, carryMarks } from '../../irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Column';
import { QFig, INK, UNK, rnd, pick, shuffle } from '../muveleti-sorrend/OrderOps1000G3Parts';

// ---------------------------------------------------------------------------
// XII. fejezet, 5. Megálló – tudáspróba: közös elemek.
// Írásbeli összeadás és kivonás (pótlásos-maradékos módszer) kérdés-építői,
// tipikus hibákból képzett rossz válaszok, oszlopos kérdésábrák, piramis,
// labor-generátorok (vegyes írásbeli feladat, „Jó vagy hibás?”).
// ---------------------------------------------------------------------------

export { rnd, pick, shuffle };

type Q = Omit<QuizQuestion, 'correctAnswer'>;
export const q = (x: Q): QuizQuestion => ({ ...x, correctAnswer: 0 } as QuizQuestion);

const PLACE = ['Egyesek', 'Tízesek', 'Százasok'];

/** Írásbeli összeadás kimondva (a VII. fejezet közös komponensének lépéseivel). */
export const addExplain = (nums: number[]) =>
  addSteps(nums, 3)
    .filter((s, i) => i < 2 || s.sum > 0)
    .map((s) => `${PLACE[s.col]}: ${spokenStep(s)}`)
    .join(' ');

/** Írásbeli kivonás kimondva, pótlásos-maradékos módszerrel. */
export const subExplain = (a: number, b: number) =>
  subSteps(a, b, 3)
    .filter((s, i) => i < 2 || s.from > 0 || s.digit > 0)
    .map((s) => `${PLACE[s.col]}: ${spokenSubStep(s)}`)
    .join(' ') + (a >= 1000 ? ' Az ezresnél: 0 meg 1 az 1, 1-hez 0 – nem írunk le semmit.' : '');

/** Maradék nélkül összeadva (elfelejtett maradék). */
export const addNoCarry = (nums: number[]) => {
  let r = 0;
  for (let c = 0; c < 3; c++) r += (nums.reduce((s, n) => s + (Math.floor(n / 10 ** c) % 10), 0) % 10) * 10 ** c;
  return r;
};
/** Kivonásnál elfelejtett maradék: minden oszlopban pótol, de a maradékot nem viszi tovább. */
export const subNoCarry = (a: number, b: number) => {
  let r = 0;
  for (let c = 0; c < 3; c++) {
    const x = Math.floor(a / 10 ** c) % 10;
    const y = Math.floor(b / 10 ** c) % 10;
    r += ((x - y + 10) % 10) * 10 ** c;
  }
  return r;
};
/** Mindig a nagyobb jegyből vonja ki a kisebbet. */
export const subSwap = (a: number, b: number) => {
  let r = 0;
  for (let c = 0; c < 3; c++) {
    const x = Math.floor(a / 10 ** c) % 10;
    const y = Math.floor(b / 10 ** c) % 10;
    r += Math.abs(x - y) * 10 ** c;
  }
  return r;
};

/** Három különböző, értelmes rossz válasz (0–1000), a jelöltek sorrendjében. */
export const distract = (ans: number, cands: number[]) => {
  const out: number[] = [];
  const all = [...cands, ans + 10, ans - 10, ans + 100, ans - 100, ans + 1, ans - 1, ans + 20];
  for (const c of all) if (c !== ans && c >= 0 && c <= 1000 && !out.includes(c) && out.length < 3) out.push(c);
  return out;
};

/** Oszlopos ábra a kérdéshez. */
export const AddFig: React.FC<{ nums: (number | string)[]; result?: string | number; carries?: boolean; className?: string }> = ({ nums, result = '???', carries, className = 'w-full max-w-[150px] h-auto mx-auto' }) => {
  const num = nums.every((n) => typeof n === 'number');
  const st = num && carries ? addSteps(nums as number[], 3) : [];
  return (
    <WrittenAddG3Column
      addends={nums}
      result={result}
      carries={st.length ? [null, st[0].carryOut || null, st[1].carryOut || null] : []}
      className={className}
    />
  );
};
export const SubFig: React.FC<{ a: number | string; b: number | string; result?: string | number; carries?: boolean; className?: string }> = ({ a, b, result = '???', carries, className = 'w-full max-w-[150px] h-auto mx-auto' }) => {
  const cols = String(a).length > 3 ? 4 : 3;
  return (
    <WrittenSubG3Column
      minuend={a}
      subtrahend={b}
      result={result}
      cols={cols}
      carries={carries && typeof a === 'number' && typeof b === 'number' ? carryMarks(subSteps(a, b, cols), cols) : []}
      className={className}
    />
  );
};

/** Írásbeli összeadás kérdés: válasz, tipikus hibák, kimondott lépések. */
export const qAdd = (id: string, level: 1 | 2 | 3, nums: number[], o: { story?: string; unit?: string; fig?: boolean; badge?: string } = {}): QuizQuestion => {
  const ans = nums.reduce((s, n) => s + n, 0);
  const u = o.unit ? ` ${o.unit}` : '';
  const opts = [ans, ...distract(ans, [addNoCarry(nums), ans - 100, ans + 10])].map((v) => `${v}${u}`);
  return q({
    id,
    level,
    questionTypeBadge: o.badge ?? (nums.length > 2 ? 'Három tag' : 'Írásbeli összeadás'),
    figure: o.fig === false ? undefined : <AddFig nums={nums} />,
    question: o.story ?? `Számold ki írásban! ${nums.join(' + ')} = ?`,
    options: opts,
    explanation: `${nums.join(' + ')} = ${ans}. ${addExplain(nums)}`
  });
};

/** Írásbeli kivonás kérdés (pótlásos-maradékos magyarázat). */
export const qSub = (id: string, level: 1 | 2 | 3, a: number, b: number, o: { story?: string; unit?: string; fig?: boolean; badge?: string } = {}): QuizQuestion => {
  const ans = a - b;
  const u = o.unit ? ` ${o.unit}` : '';
  const opts = [ans, ...distract(ans, [subNoCarry(a, b), subSwap(a, b), ans + 100])].map((v) => `${v}${u}`);
  return q({
    id,
    level,
    questionTypeBadge: o.badge ?? 'Írásbeli kivonás',
    figure: o.fig === false ? undefined : <SubFig a={a} b={b} />,
    question: o.story ?? `Számold ki írásban! ${a} − ${b} = ?`,
    options: opts,
    explanation: `${a} − ${b} = ${ans}. ${subExplain(a, b)}`
  });
};

/** Összegpiramis: rows alulról felfelé (pl. [[185, 247, 318], ['', ''], ['?']]). */
export const PyramidFig: React.FC<{ rows: string[][] }> = ({ rows }) => {
  const w = 62;
  const h = 32;
  const H = 18 + rows.length * h;
  return (
    <QFig h={H}>
      {rows.map((r, i) => {
        const y = H - 10 - (i + 1) * h;
        const x0 = 120 - (r.length * w) / 2;
        return r.map((t, j) => (
          <g key={`${i}-${j}`}>
            <rect x={x0 + j * w} y={y} width={w} height={h} fill={t === '?' ? '#fee2e2' : t === '' ? '#f1f5f9' : ['#e0f2fe', '#fef3c7', '#dcfce7'][i % 3]} stroke={t === '?' ? UNK : '#334155'} strokeWidth="1.6" />
            <text x={x0 + j * w + w / 2} y={y + 22} textAnchor="middle" fontSize="15" fontWeight="bold" fill={t === '?' ? UNK : INK}>{t}</text>
          </g>
        ));
      })}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Labor-generátorok
// ---------------------------------------------------------------------------
export type WKind = 'add' | 'add3' | 'sub' | 'sub0';
export interface WTask {
  kind: WKind;
  nums: number[];
  op: '+' | '−';
  answer: number;
}
export const genWritten = (kind?: WKind): WTask => {
  const k = kind ?? pick<WKind>(['add', 'add3', 'sub', 'sub0']);
  if (k === 'add') {
    const a = rnd(125, 689);
    const b = rnd(105, 999 - a);
    return { kind: k, nums: [a, b], op: '+', answer: a + b };
  }
  if (k === 'add3') {
    const a = rnd(105, 400);
    const b = rnd(105, 350);
    const c = rnd(15, Math.max(16, 999 - a - b));
    return { kind: k, nums: [a, b, c], op: '+', answer: a + b + c };
  }
  if (k === 'sub') {
    const a = rnd(312, 990);
    const b = rnd(105, a - 50);
    return { kind: k, nums: [a, b], op: '−', answer: a - b };
  }
  const a = pick([400, 500, 600, 700, 800, 900, 1000, 605, 803, 702, 904]);
  const b = rnd(108, a - 60);
  return { kind: k, nums: [a, b], op: '−', answer: a - b };
};

export interface CheckTask {
  nums: [number, number];
  op: '+' | '−';
  shown: number;
  correct: number;
  /** 'ok' | hibatípus */
  err: 'ok' | 'carry' | 'swap';
}
export const genCheck = (): CheckTask => {
  for (let t = 0; t < 200; t++) {
    const op = pick<'+' | '−'>(['+', '−']);
    if (op === '+') {
      const a = rnd(135, 650);
      const b = rnd(108, 999 - a);
      const c = a + b;
      const wrong = addNoCarry([a, b]);
      if (wrong === c) continue;
      const err = pick<'ok' | 'carry'>(['ok', 'carry', 'carry']);
      return { nums: [a, b], op, shown: err === 'ok' ? c : wrong, correct: c, err };
    }
    const a = rnd(402, 990);
    const b = rnd(108, a - 60);
    const c = a - b;
    const err = pick<'ok' | 'carry' | 'swap'>(['ok', 'carry', 'swap']);
    const shown = err === 'ok' ? c : err === 'carry' ? subNoCarry(a, b) : subSwap(a, b);
    if (err !== 'ok' && shown === c) continue;
    return { nums: [a, b], op, shown, correct: c, err };
  }
  return { nums: [563, 278], op: '+', shown: 731, correct: 841, err: 'carry' };
};
