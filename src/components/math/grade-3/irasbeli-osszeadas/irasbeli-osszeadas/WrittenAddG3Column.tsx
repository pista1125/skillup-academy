import React from 'react';

// ---------------------------------------------------------------------------
// Írásbeli összeadás oszlopos elrendezésben (SVG) – újrahasznosítható komponens.
//
// A tankönyvhöz (OH-MAT03TA 77–80. o.) igazodva: a tagok helyi érték szerint
// egymás alá kerülnek, fölöttük színes fejléc (sz piros, t kék, e sárga),
// a „+” jel az utolsó tag sorában balra áll, alatta vonal és az összeg.
// A beváltott (maradék) számjegyet kicsi zöld számként a következő oszlop
// fölé írhatjuk (a tankönyv nem írja le, csak „hozzáadja” – nálunk a
// tanulás elején látható segítség, később elhagyható: carries nélkül).
//
// Jelölés a számjegy-szövegekben (addends, result, carries elemei):
//   '0'–'9' számjegy · '?' keresett jegy (piros dobozban) · '_' üres doboz (ide kell írni)
//   ' ' semmi (még nem írtuk le) · a szöveg jobbra igazodik az oszlopokhoz.
//
// Példák:
//   <WrittenAddG3Column addends={[146, 238]} result={384} carries={[null, 1]} />
//   <WrittenAddG3Column addends={['1?5', 194]} result="3?9" header={false} />
//   <WrittenAddG3Column addends={[202, 133, 153]} result="___" />
//   SVG-n belül: <WrittenAddG3ColumnG x={10} y={8} addends={[175, 285]} result=" 60" />
//                (méret: columnAddSize(props) → { w, h })
// ---------------------------------------------------------------------------

export const COL_FONT = 'system-ui, Segoe UI, sans-serif';

export type ColDigit = number | string | null | undefined;

export interface WrittenAddG3ColumnProps {
  /** A tagok fentről lefelé (2 vagy 3 tag). Szám vagy jegy-szöveg (lásd fent). */
  addends: (number | string)[];
  /** Az összeg a vonal alatt. Elhagyva: üres sor. Pl. 384, ' 84' (még csak 2 jegy), '3?4', '___'. */
  result?: number | string;
  /** Beváltott jegyek oszloponként JOBBRÓL számolva: carries[1] a tízesek fölé, carries[2] a százasok fölé. */
  carries?: ColDigit[];
  /** Oszlopok száma: 3 (sz t e, alapértelmezés) vagy 4 (E sz t e). */
  cols?: number;
  /** Színes fejléc (sz / t / e). Alapértelmezés: true. */
  header?: boolean;
  /** Halvány helyiérték-színek a cellákban. Alapértelmezés: true. */
  colored?: boolean;
  /** Kiemelt oszlop jobbról számolva (0 = egyesek, 1 = tízesek, 2 = százasok). */
  highlight?: number | null;
  /** Füzetszerű négyzetrács a háttérben (colored=false mellett szép). */
  grid?: boolean;
  /** Mindig legyen hely a beváltott jegyeknek (akkor is, ha még üres). */
  carryRow?: boolean;
  /** Ne legyen eredménysor (csak a tagok és a vonal) – pl. kis kártyaképekhez. */
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

/** Szöveg → jobbra igazított jegyek (cols hosszú tömb, balról jobbra). */
const toDigits = (v: number | string | undefined, cols: number): string[] => {
  if (v === undefined || v === null) return Array(cols).fill(' ');
  const s = String(v);
  const chars = s.split('');
  while (chars.length < cols) chars.unshift(' ');
  return chars.slice(chars.length - cols);
};

const layout = (p: WrittenAddG3ColumnProps) => {
  const cols = Math.max(1, Math.min(4, p.cols ?? 3));
  const c = p.cell ?? 30;
  const header = p.header ?? true;
  const hasCarry = !!p.carryRow || (p.carries ?? []).some((d) => d !== null && d !== undefined && String(d).trim() !== '');
  const plusW = c * 0.8;
  const headH = header ? c * 0.72 : 0;
  const carryH = hasCarry ? c * 0.62 : 0;
  const rows = p.addends.length;
  const w = plusW + cols * c + 6;
  const h = headH + carryH + rows * c + 5 + (p.noResult ? 0 : c + 4);
  return { cols, c, header, hasCarry, plusW, headH, carryH, rows, w, h };
};

/** A rajz mérete viewBox-egységben (beágyazáshoz). */
export const columnAddSize = (p: WrittenAddG3ColumnProps) => {
  const L = layout(p);
  return { w: L.w, h: L.h };
};

const Digit: React.FC<{ x: number; y: number; c: number; ch: string; color?: string }> = ({ x, y, c, ch, color = '#0f172a' }) => {
  if (ch === ' ' || ch === '') return null;
  if (ch === '?') {
    return (
      <g>
        <rect x={x + c * 0.12} y={y + c * 0.1} width={c * 0.76} height={c * 0.8} rx={c * 0.14} fill="#fee2e2" stroke={UNK} strokeWidth={c * 0.06} />
        <text x={x + c / 2} y={y + c * 0.75} textAnchor="middle" fontSize={c * 0.66} fontWeight="bold" fill={UNK} fontFamily={COL_FONT}>?</text>
      </g>
    );
  }
  if (ch === '_') {
    return <rect x={x + c * 0.12} y={y + c * 0.1} width={c * 0.76} height={c * 0.8} rx={c * 0.14} fill="#fff" stroke="#64748b" strokeWidth={c * 0.05} strokeDasharray={`${c * 0.12} ${c * 0.08}`} />;
  }
  return (
    <text x={x + c / 2} y={y + c * 0.77} textAnchor="middle" fontSize={c * 0.74} fontWeight="bold" fill={color} fontFamily={COL_FONT}>{ch}</text>
  );
};

/** Beágyazható változat: egy <g> a megadott (x, y) bal felső sarokkal. */
export const WrittenAddG3ColumnG: React.FC<WrittenAddG3ColumnProps & { x?: number; y?: number }> = (props) => {
  const { x = 0, y = 0, addends, result, carries = [], colored = true, highlight = null, grid = false } = props;
  const L = layout(props);
  const { cols, c, header, hasCarry, plusW, headH, carryH, rows } = L;
  const gx = x + plusW;
  const colX = (i: number) => gx + i * c; // i: balról 0..cols-1
  const fromRight = (i: number) => cols - 1 - i;
  const yHead = y;
  const yCarry = y + headH;
  const yRow = (r: number) => y + headH + carryH + r * c;
  const yLine = yRow(rows) + 2.5;
  const yRes = yLine + 2.5;
  const bodyTop = yCarry;
  const bodyBottom = props.noResult ? yLine + 2 : yRes + c;
  const resDigits = toDigits(result, cols);
  return (
    <g fontFamily={COL_FONT}>
      {grid && (
        <g>
          {Array.from({ length: Math.round((bodyBottom - y) / (c / 2)) + 1 }).map((_, k) => (
            <line key={`gh${k}`} x1={x} y1={y + (k * c) / 2} x2={x + L.w - 6} y2={y + (k * c) / 2} stroke="#bfdbfe" strokeWidth="0.6" />
          ))}
          {Array.from({ length: Math.round((L.w - 6) / (c / 2)) + 1 }).map((_, k) => (
            <line key={`gv${k}`} x1={x + (k * c) / 2} y1={y} x2={x + (k * c) / 2} y2={bodyBottom} stroke="#bfdbfe" strokeWidth="0.6" />
          ))}
        </g>
      )}
      {Array.from({ length: cols }).map((_, i) => {
        const pr = fromRight(i);
        const hl = highlight === pr;
        return (
          <g key={`col${i}`}>
            {colored && <rect x={colX(i)} y={bodyTop} width={c} height={bodyBottom - bodyTop} fill={BODY_FILL[pr]} />}
            {header && (
              <g>
                <rect x={colX(i)} y={yHead} width={c} height={headH} fill={HEAD_FILL[pr]} stroke="#fff" strokeWidth="1" />
                <text x={colX(i) + c / 2} y={yHead + headH * 0.74} textAnchor="middle" fontSize={c * 0.46} fontWeight="bold" fill={HEAD_TEXT[pr]}>{PLACE[pr]}</text>
              </g>
            )}
            {hl && <rect x={colX(i) + 1.5} y={bodyTop + 1.5} width={c - 3} height={bodyBottom - bodyTop - 3} rx={c * 0.3} fill="none" stroke="#7c3aed" strokeWidth={c * 0.08} />}
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
      {addends.map((a, r) => {
        const ds = toDigits(a, cols);
        return (
          <g key={`row${r}`}>
            {r === rows - 1 && (
              <text x={x + plusW * 0.5} y={yRow(r) + c * 0.74} textAnchor="middle" fontSize={c * 0.72} fontWeight="bold" fill="#0f172a">+</text>
            )}
            {ds.map((ch, i) => (
              <Digit key={i} x={colX(i)} y={yRow(r)} c={c} ch={ch} />
            ))}
          </g>
        );
      })}
      <line x1={x + 2} y1={yLine} x2={gx + cols * c + 2} y2={yLine} stroke="#0f172a" strokeWidth={Math.max(1.6, c * 0.07)} strokeLinecap="round" />
      {!props.noResult && resDigits.map((ch, i) => (
        <Digit key={`res${i}`} x={colX(i)} y={yRes} c={c} ch={ch} color="#1d4ed8" />
      ))}
    </g>
  );
};

/** Önálló SVG: a viewBox a tartalomhoz igazodik. */
export const WrittenAddG3Column: React.FC<WrittenAddG3ColumnProps> = (props) => {
  const { w, h } = columnAddSize(props);
  return (
    <svg viewBox={`-4 -4 ${w + 8} ${h + 8}`} className={props.className ?? 'w-full max-w-[180px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg">
      <WrittenAddG3ColumnG {...props} x={0} y={0} />
    </svg>
  );
};

/** Segéd: az írásbeli összeadás lépései (jobbról balra). Két vagy több tagra. */
export interface AddStep {
  /** oszlop jobbról (0 = egyesek) */
  col: number;
  /** az oszlop jegyei fentről lefelé */
  digits: number[];
  /** a hozott (beváltott) jegy ebbe az oszlopba */
  carryIn: number;
  /** az oszlop összege a hozott jeggyel */
  sum: number;
  /** leírt jegy */
  write: number;
  /** továbbvitt jegy */
  carryOut: number;
}

export const addSteps = (addends: number[], cols = 3): AddStep[] => {
  const steps: AddStep[] = [];
  let carry = 0;
  for (let col = 0; col < cols; col++) {
    const p = 10 ** col;
    const digits = addends.map((a) => Math.floor(a / p) % 10);
    const sum = digits.reduce((s, d) => s + d, 0) + carry;
    steps.push({ col, digits, carryIn: carry, sum, write: sum % 10, carryOut: Math.floor(sum / 10) });
    carry = Math.floor(sum / 10);
  }
  return steps;
};

const PLACE_NAME = ['egyes', 'tízes', 'százas'];
/** A lépés kimondva, a tankönyv sorrendjében (előbb a tagok, aztán a beváltott jegy). Pl. „6 meg 8 az 14. Leírom a 4-et, maradt 1.” */
export const spokenStep = (s: AddStep): string => {
  const own = s.digits.reduce((a, d) => a + d, 0);
  let t = s.digits.join(' meg ') + ' az ' + own + '.';
  if (s.carryIn > 0) t = s.digits.join(' meg ') + ' az ' + own + ', meg ' + s.carryIn + ' az ' + s.sum + '.';
  if (s.digits.length === 1 && s.carryIn > 0) t = s.digits[0] + ' meg ' + s.carryIn + ' az ' + s.sum + '.';
  t += ` Leírom ${s.write === 1 || s.write === 5 ? 'az' : 'a'} ${s.write}-${suffixA(s.write)}`;
  if (s.carryOut > 0) t += `, maradt ${s.carryOut}.`;
  else t += '.';
  return t;
};
/** „a 4-et”, „a 3-at”, „az 5-öt” – a tárgyrag. */
export const suffixA = (d: number): string => ['t', 'et', 't', 'at', 'et', 'öt', 'ot', 'et', 'at', 'et'][d] ?? 't';
export const placeName = (col: number) => PLACE_NAME[col] ?? '';
/** Többes szám: egyesek, tízesek, százasok. */
export const placePlural = (col: number) => ['egyesek', 'tízesek', 'százasok'][col] ?? '';
