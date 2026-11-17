import React from 'react';
import { szor, targy } from '../szorzas-egyjegyu-szammal/MulOneDigitG3Parts';

// ---------------------------------------------------------------------------
// Írásbeli szorzás egyjegyű szorzóval, oszlopos elrendezésben (SVG) –
// újrahasznosítható komponens (a XIII/6. tudáspróba is használhatja).
//
// A tankönyvhöz (OH-MAT03TA 125–128. o.) igazodva:
//   • a szorzandó jegyei helyi érték szerint (sz piros, t kék, e sárga fejléc),
//   • a szorzó „· 3” alakban a szorzandó sorától JOBBRA áll,
//   • a szorzandó alatt vonal, alatta a szorzat.
// A „maradt” (beváltott) számot a könyv nem írja le, csak „hozzáadja”.
// Nálunk a tanulás elején kicsi zöld számként a következő oszlop fölé
// írhatjuk (carries) – később elhagyható.
//
// Jelölés a számjegy-szövegekben (a, result, carries elemei):
//   '0'–'9' számjegy · '?' keresett jegy (piros dobozban) · '_' üres doboz
//   ' ' semmi (még nem írtuk le) · a szöveg jobbra igazodik az oszlopokhoz.
//
// Példák:
//   <WrittenMulG3Column a={178} m={4} result={712} carries={[null, 3, 3]} />
//   <WrittenMulG3Column a="1?6" m={4} result={624} header={false} />
//   <WrittenMulG3Column a={143} m="?" result={572} />
//   SVG-n belül: <WrittenMulG3ColumnG x={10} y={8} a={126} m={3} result=" 78" />
//                (méret: columnMulSize(props) → { w, h })
// ---------------------------------------------------------------------------

export const MUL_COL_FONT = 'system-ui, Segoe UI, sans-serif';

export type MulColDigit = number | string | null | undefined;

export interface WrittenMulG3ColumnProps {
  /** A szorzandó (szám vagy jegy-szöveg, pl. '1?6'). */
  a: number | string;
  /** A szorzó (egyjegyű szám, '?' vagy '_'). */
  m: number | string;
  /** A szorzat a vonal alatt. Pl. 712, ' 12' (még csak 2 jegy), '7?2', '???'. */
  result?: number | string;
  /** „Maradt” jegyek oszloponként JOBBRÓL: carries[1] a tízesek fölé, carries[2] a százasok fölé. */
  carries?: MulColDigit[];
  /** Oszlopok száma: 3 (sz t e, alapértelmezés) vagy 4 (E sz t e). */
  cols?: number;
  /** Színes fejléc (sz / t / e). Alapértelmezés: true. */
  header?: boolean;
  /** Halvány helyiérték-színek a cellákban. Alapértelmezés: true. */
  colored?: boolean;
  /** Kiemelt oszlop jobbról számolva (0 = egyesek, 1 = tízesek, 2 = százasok). */
  highlight?: number | null;
  /** Mindig legyen hely a „maradt” jegyeknek (akkor is, ha még üres). */
  carryRow?: boolean;
  /** Ne legyen eredménysor (csak a szorzandó, a szorzó és a vonal). */
  noResult?: boolean;
  /** Cellaméret viewBox-egységben (alap: 30). */
  cell?: number;
  /** Csak a <svg> változatnál: osztály. */
  className?: string;
}

const PLACE = ['e', 't', 'sz', 'E'];
const HEAD_FILL = ['#facc15', '#60a5fa', '#f87171', '#a78bfa'];
const HEAD_TEXT = ['#713f12', '#0c2d6b', '#7f1d1d', '#3b0764'];
const BODY_FILL = ['#fef9c3', '#dbeafe', '#fee2e2', '#ede9fe'];
const UNK = '#dc2626';
const CARRY = '#15803d';
const MUL_COLOR = '#c2410c';

const toDigits = (v: number | string | undefined, cols: number): string[] => {
  if (v === undefined || v === null) return Array(cols).fill(' ');
  const chars = String(v).split('');
  while (chars.length < cols) chars.unshift(' ');
  return chars.slice(chars.length - cols);
};

const layout = (p: WrittenMulG3ColumnProps) => {
  const cols = Math.max(1, Math.min(4, p.cols ?? 3));
  const c = p.cell ?? 30;
  const header = p.header ?? true;
  const hasCarry = !!p.carryRow || (p.carries ?? []).some((d) => d !== null && d !== undefined && String(d).trim() !== '');
  const headH = header ? c * 0.72 : 0;
  const carryH = hasCarry ? c * 0.62 : 0;
  const mulW = c * (0.75 + 0.5 * String(p.m).length);
  const w = cols * c + mulW + 2;
  const h = headH + carryH + c + 5 + (p.noResult ? 0 : c + 2);
  return { cols, c, header, hasCarry, headH, carryH, mulW, w, h };
};

/** A rajz mérete viewBox-egységben (beágyazáshoz). */
export const columnMulSize = (p: WrittenMulG3ColumnProps) => {
  const L = layout(p);
  return { w: L.w, h: L.h };
};

const Cell: React.FC<{ x: number; y: number; c: number; ch: string; color?: string }> = ({ x, y, c, ch, color = '#0f172a' }) => {
  if (ch === ' ' || ch === '') return null;
  if (ch === '?') {
    return (
      <g>
        <rect x={x + c * 0.12} y={y + c * 0.1} width={c * 0.76} height={c * 0.8} rx={c * 0.14} fill="#fee2e2" stroke={UNK} strokeWidth={c * 0.06} />
        <text x={x + c / 2} y={y + c * 0.75} textAnchor="middle" fontSize={c * 0.66} fontWeight="bold" fill={UNK} fontFamily={MUL_COL_FONT}>?</text>
      </g>
    );
  }
  if (ch === '_') {
    return <rect x={x + c * 0.12} y={y + c * 0.1} width={c * 0.76} height={c * 0.8} rx={c * 0.14} fill="#fff" stroke="#64748b" strokeWidth={c * 0.05} strokeDasharray={`${c * 0.12} ${c * 0.08}`} />;
  }
  return (
    <text x={x + c / 2} y={y + c * 0.77} textAnchor="middle" fontSize={c * 0.74} fontWeight="bold" fill={color} fontFamily={MUL_COL_FONT}>{ch}</text>
  );
};

/** Beágyazható változat: egy <g> a megadott (x, y) bal felső sarokkal. */
export const WrittenMulG3ColumnG: React.FC<WrittenMulG3ColumnProps & { x?: number; y?: number }> = (props) => {
  const { x = 0, y = 0, a, m, result, carries = [], colored = true, highlight = null } = props;
  const L = layout(props);
  const { cols, c, header, hasCarry, headH, carryH } = L;
  const colX = (i: number) => x + i * c;
  const fromRight = (i: number) => cols - 1 - i;
  const yCarry = y + headH;
  const yRow = y + headH + carryH;
  const yLine = yRow + c + 2.5;
  const yRes = yLine + 2.5;
  const bodyBottom = props.noResult ? yLine + 2 : yRes + c;
  const aDigits = toDigits(a, cols);
  const resDigits = toDigits(result, cols);
  const mStr = String(m);
  const mx = x + cols * c + c * 0.12;
  return (
    <g fontFamily={MUL_COL_FONT}>
      {Array.from({ length: cols }).map((_, i) => {
        const pr = fromRight(i);
        return (
          <g key={`col${i}`}>
            {colored && <rect x={colX(i)} y={yCarry} width={c} height={bodyBottom - yCarry} fill={BODY_FILL[pr]} />}
            {header && (
              <g>
                <rect x={colX(i)} y={y} width={c} height={headH} fill={HEAD_FILL[pr]} stroke="#fff" strokeWidth="1" />
                <text x={colX(i) + c / 2} y={y + headH * 0.74} textAnchor="middle" fontSize={c * 0.46} fontWeight="bold" fill={HEAD_TEXT[pr]}>{PLACE[pr]}</text>
              </g>
            )}
            {highlight === pr && (
              <rect x={colX(i) + 1.5} y={yCarry + 1.5} width={c - 3} height={bodyBottom - yCarry - 3} rx={c * 0.3} fill="none" stroke="#7c3aed" strokeWidth={c * 0.08} />
            )}
          </g>
        );
      })}
      {hasCarry &&
        Array.from({ length: cols }).map((_, i) => {
          const d = carries[fromRight(i)];
          if (d === null || d === undefined || String(d).trim() === '') return null;
          const ch = String(d);
          const cx = colX(i) + c / 2;
          const cy = yCarry + carryH / 2;
          if (ch === '?' || ch === '_') {
            return (
              <g key={`car${i}`}>
                <rect x={cx - carryH * 0.42} y={cy - carryH * 0.42} width={carryH * 0.84} height={carryH * 0.84} rx="3" fill={ch === '?' ? '#fee2e2' : '#fff'} stroke={ch === '?' ? UNK : '#64748b'} strokeWidth="1.3" strokeDasharray={ch === '_' ? '3 2' : undefined} />
                {ch === '?' && <text x={cx} y={cy + carryH * 0.27} textAnchor="middle" fontSize={carryH * 0.72} fontWeight="bold" fill={UNK}>?</text>}
              </g>
            );
          }
          return (
            <g key={`car${i}`}>
              <circle cx={cx} cy={cy} r={carryH * 0.42} fill="#dcfce7" stroke={CARRY} strokeWidth="1.3" />
              <text x={cx} y={cy + carryH * 0.27} textAnchor="middle" fontSize={carryH * 0.72} fontWeight="bold" fill={CARRY}>{ch}</text>
            </g>
          );
        })}
      {aDigits.map((ch, i) => (
        <Cell key={`a${i}`} x={colX(i)} y={yRow} c={c} ch={ch} />
      ))}
      {/* a szorzó a sor mellett jobbra: „· 3” */}
      <text x={mx} y={yRow + c * 0.74} fontSize={c * 0.72} fontWeight="bold" fill={MUL_COLOR}>·</text>
      {mStr === '?' || mStr === '_' ? (
        <Cell x={mx + c * 0.3} y={yRow} c={c} ch={mStr} />
      ) : (
        <text x={mx + c * 0.36} y={yRow + c * 0.77} fontSize={c * 0.74} fontWeight="bold" fill={MUL_COLOR}>{mStr}</text>
      )}
      <line x1={x} y1={yLine} x2={x + cols * c + 2} y2={yLine} stroke="#0f172a" strokeWidth={Math.max(1.6, c * 0.07)} strokeLinecap="round" />
      {!props.noResult && resDigits.map((ch, i) => <Cell key={`r${i}`} x={colX(i)} y={yRes} c={c} ch={ch} color="#1d4ed8" />)}
    </g>
  );
};

/** Önálló SVG: a viewBox a tartalomhoz igazodik. */
export const WrittenMulG3Column: React.FC<WrittenMulG3ColumnProps> = (props) => {
  const { w, h } = columnMulSize(props);
  return (
    <svg viewBox={`-4 -4 ${w + 8} ${h + 8}`} className={props.className ?? 'w-full max-w-[180px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg">
      <WrittenMulG3ColumnG {...props} x={0} y={0} />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Az algoritmus lépései és kimondása
// ---------------------------------------------------------------------------
export interface MulStep {
  /** oszlop jobbról (0 = egyesek) */
  col: number;
  /** a szorzandó jegye ebben az oszlopban */
  digit: number;
  /** a szorzó */
  m: number;
  /** szorzó · jegy */
  prod: number;
  /** az előző oszlopból „maradt” szám */
  carryIn: number;
  /** prod + carryIn */
  total: number;
  /** leírt szám (az utolsó oszlopnál a teljes total) */
  write: number;
  /** „maradt” szám a következő oszlopnak */
  carryOut: number;
}

/** Az írásbeli szorzás lépései jobbról balra (a szorzandó minden jegyére). */
export const mulSteps = (a: number, m: number): MulStep[] => {
  const ds = String(a).split('').reverse().map(Number);
  const steps: MulStep[] = [];
  let carry = 0;
  ds.forEach((digit, col) => {
    const prod = digit * m;
    const total = prod + carry;
    const last = col === ds.length - 1;
    const write = last ? total : total % 10;
    const carryOut = last ? 0 : Math.floor(total / 10);
    steps.push({ col, digit, m, prod, carryIn: carry, total, write, carryOut });
    carry = carryOut;
  });
  return steps;
};

/** Kimondva, hagyományos magyar módon: „4-szer 7 az 28, meg 3 az 31. Leírom az 1-et, maradt 3.” */
export const spokenMulStep = (s: MulStep): string => {
  let t = `${szor(s.m)} ${s.digit} az ${s.prod}`;
  if (s.carryIn > 0) t += `, meg ${s.carryIn} az ${s.total}`;
  t += `. Leírom ${targy(s.write)}`;
  t += s.carryOut > 0 ? `, maradt ${s.carryOut}.` : '.';
  return t;
};

/** A „maradt” jegyek tömbje a komponens carries propjához (az első n lépés után). */
export const carriesAfter = (steps: MulStep[], n: number): MulColDigit[] => {
  const out: MulColDigit[] = [null, null, null, null];
  for (let i = 0; i < Math.min(n, steps.length); i++) if (steps[i].carryOut) out[i + 1] = steps[i].carryOut;
  return out;
};

export const placePluralMul = (col: number) => ['egyesek', 'tízesek', 'százasok'][col] ?? '';
/** „az egyeseknél”, „a tízeseknél”, „a százasoknál” */
export const placeAtMul = (col: number) => ['az egyeseknél', 'a tízeseknél', 'a százasoknál'][col] ?? '';
