import React from 'react';

// ---------------------------------------------------------------------------
// Írásbeli kivonás oszlopos elrendezésben (SVG) – újrahasznosítható komponens
// (a VIII. fejezet leckéi és a XII. fejezet is ezt használja).
//
// Elrendezés a tankönyvhöz (OH-MAT03TA 89–93. o.) igazodva: a kisebbítendő és a
// kivonandó helyi érték szerint egymás alá kerül, fölöttük színes fejléc (sz piros,
// t kék, e sárga), a „−” jel a kivonandó sorában balra áll, alatta vonal és a különbség.
//
// MÓDSZER (a tanító döntése, eltér a tankönyv felváltásos módszerétől):
// a hagyományos PÓTLÁSOS-MARADÉKOS írásbeli kivonás. Az egyesektől kezdve minden
// oszlopban a kivonandó jegyétől (+ az előző maradék) pótolunk a kisebbítendő jegyéig.
// Ha a kisebbítendő jegye kisebb, a jegy + 10-ig pótolunk, és „maradt 1” – ezt a
// következő oszlop kivonandó jegyéhez adjuk. Például 532 − 167:
//   „7-hez 5, az 12. Leírom az 5-öt, maradt 1.”
//   „6 meg 1 az 7. 7-hez 6, az 13. Leírom a 6-ot, maradt 1.”
//   „1 meg 1 az 2. 2-höz 3, az 5. Leírom a 3-at.”  → 365
// A maradék kis zöld számként a következő kivonandó-jegy mellé (balra fent) írható:
// ez a `carries` tömb (carryMarks() adja meg a lépések alapján).
//
// Jelölés a jegy-szövegekben (minuend, subtrahend, result, carries, exchanges elemei):
//   '0'–'9' számjegy · '?' keresett jegy (piros dobozban) · '_' üres doboz
//   ' ' semmi (még nem írtuk le) · a szöveg jobbra igazodik az oszlopokhoz.
//
// Példák:
//   <WrittenSubG3Column minuend={532} subtrahend={167} result={365} />
//   <WrittenSubG3Column minuend={532} subtrahend={167} result=" 65" carries={[null, 1, 1]} />
//   <WrittenSubG3Column minuend="3?7" subtrahend={125} result={212} header={false} />
//   Ellenőrzés összeadással: <WrittenSubG3Column op="+" minuend={236} subtrahend={147} result={383} />
//   SVG-n belül: <WrittenSubG3ColumnG x={10} y={8} minuend={405} subtrahend={248} result="???" />
//                (méret: columnSubSize(props) → { w, h })
// ---------------------------------------------------------------------------

export const COL_FONT = 'system-ui, Segoe UI, sans-serif';

export type ColDigit = number | string | null | undefined;

export interface WrittenSubG3ColumnProps {
  /** Kisebbítendő (felső sor). Szám vagy jegy-szöveg. op="+" esetén az első tag. */
  minuend: number | string;
  /** Kivonandó (alsó sor, „−” jellel). op="+" esetén a második tag. */
  subtrahend: number | string;
  /** Különbség a vonal alatt. Elhagyva: üres sor. Pl. 236, ' 36', '2?6', '___'. */
  result?: number | string;
  /**
   * Maradékok oszloponként JOBBRÓL számolva: carries[i] az i. oszlop kivonandó-jegye
   * mellé írt kis szám (az előző oszlop maradéka, általában 1). null = nincs.
   * Pl. 532 − 167: [null, 1, 1]. '?' = keresett maradék.
   */
  carries?: ColDigit[];
  /**
   * Kis számok a kisebbítendő jegyei FÖLÖTT, jobbról számolva (az eredeti jegy áthúzva).
   * Régi (felváltásos) jelölés – a VIII. fejezet már nem használja, csak kompatibilitás miatt maradt.
   */
  exchanges?: ColDigit[];
  /** Műveleti jel: '−' (alapértelmezés) vagy '+' (ellenőrzés összeadással). */
  op?: '−' | '+';
  /** Oszlopok száma: 3 (sz t e, alapértelmezés) vagy 4 (E sz t e). */
  cols?: number;
  /** Színes fejléc (sz / t / e). Alapértelmezés: true. */
  header?: boolean;
  /** Halvány helyiérték-színek a cellákban. Alapértelmezés: true. */
  colored?: boolean;
  /** Kiemelt oszlop jobbról számolva (0 = egyesek, 1 = tízesek, 2 = százasok). */
  highlight?: number | null;
  /** Füzetszerű négyzetrács a háttérben. */
  grid?: boolean;
  /** Mindig legyen hely az `exchanges` sorának (akkor is, ha még üres). */
  exchangeRow?: boolean;
  /** Ne legyen eredménysor (csak a két szám és a vonal). */
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
const EXCH = '#15803d';

const toDigits = (v: number | string | undefined, cols: number): string[] => {
  if (v === undefined || v === null) return Array(cols).fill(' ');
  const chars = String(v).split('');
  while (chars.length < cols) chars.unshift(' ');
  return chars.slice(chars.length - cols);
};

const filled = (d: ColDigit) => d !== null && d !== undefined && String(d).trim() !== '';

const layout = (p: WrittenSubG3ColumnProps) => {
  const cols = Math.max(1, Math.min(4, p.cols ?? 3));
  const c = p.cell ?? 30;
  const header = p.header ?? true;
  const hasEx = !!p.exchangeRow || (p.exchanges ?? []).some(filled);
  const opW = c * 0.8;
  const headH = header ? c * 0.72 : 0;
  const exH = hasEx ? c * 0.62 : 0;
  const w = opW + cols * c + 6;
  const h = headH + exH + 2 * c + 5 + (p.noResult ? 0 : c + 4);
  return { cols, c, header, hasEx, opW, headH, exH, w, h };
};

/** A rajz mérete viewBox-egységben (beágyazáshoz). */
export const columnSubSize = (p: WrittenSubG3ColumnProps) => {
  const L = layout(p);
  return { w: L.w, h: L.h };
};

const Digit: React.FC<{ x: number; y: number; c: number; ch: string; color?: string; struck?: boolean }> = ({ x, y, c, ch, color = '#0f172a', struck }) => {
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
    <g>
      <text x={x + c / 2} y={y + c * 0.77} textAnchor="middle" fontSize={c * 0.74} fontWeight="bold" fill={color} opacity={struck ? 0.55 : 1} fontFamily={COL_FONT}>{ch}</text>
      {struck && <line x1={x + c * 0.2} y1={y + c * 0.85} x2={x + c * 0.8} y2={y + c * 0.15} stroke={EXCH} strokeWidth={c * 0.07} strokeLinecap="round" />}
    </g>
  );
};

/** A maradék kis száma a kivonandó jegye mellett, balra fent. */
const CarryMark: React.FC<{ x: number; y: number; c: number; ch: string }> = ({ x, y, c, ch }) => {
  const cx = x + c * 0.13;
  const cy = y + c * 0.23;
  const r = c * 0.18;
  const q = ch === '?';
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={q ? '#fee2e2' : '#dcfce7'} stroke={q ? UNK : EXCH} strokeWidth={c * 0.04} />
      <text x={cx} y={cy + c * 0.11} textAnchor="middle" fontSize={c * 0.32} fontWeight="bold" fill={q ? UNK : EXCH} fontFamily={COL_FONT}>{ch}</text>
    </g>
  );
};

/** Beágyazható változat: egy <g> a megadott (x, y) bal felső sarokkal. */
export const WrittenSubG3ColumnG: React.FC<WrittenSubG3ColumnProps & { x?: number; y?: number }> = (props) => {
  const { x = 0, y = 0, minuend, subtrahend, result, exchanges = [], carries = [], colored = true, highlight = null, grid = false, op = '−' } = props;
  const L = layout(props);
  const { cols, c, header, hasEx, opW, headH, exH } = L;
  const gx = x + opW;
  const colX = (i: number) => gx + i * c;
  const fromRight = (i: number) => cols - 1 - i;
  const yHead = y;
  const yEx = y + headH;
  const yRow = (r: number) => y + headH + exH + r * c;
  const yLine = yRow(2) + 2.5;
  const yRes = yLine + 2.5;
  const bodyTop = yEx;
  const bodyBottom = props.noResult ? yLine + 2 : yRes + c;
  const top = toDigits(minuend, cols);
  const bot = toDigits(subtrahend, cols);
  const res = toDigits(result, cols);
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
        return (
          <g key={`col${i}`}>
            {colored && <rect x={colX(i)} y={bodyTop} width={c} height={bodyBottom - bodyTop} fill={BODY_FILL[pr]} />}
            {header && (
              <g>
                <rect x={colX(i)} y={yHead} width={c} height={headH} fill={HEAD_FILL[pr]} stroke="#fff" strokeWidth="1" />
                <text x={colX(i) + c / 2} y={yHead + headH * 0.74} textAnchor="middle" fontSize={c * 0.46} fontWeight="bold" fill={HEAD_TEXT[pr]}>{PLACE[pr]}</text>
              </g>
            )}
            {highlight === pr && <rect x={colX(i) + 1.5} y={bodyTop + 1.5} width={c - 3} height={bodyBottom - bodyTop - 3} rx={c * 0.3} fill="none" stroke="#7c3aed" strokeWidth={c * 0.08} />}
          </g>
        );
      })}
      {hasEx &&
        Array.from({ length: cols }).map((_, i) => {
          const d = exchanges[fromRight(i)];
          if (!filled(d)) return null;
          const ch = String(d);
          const cx = colX(i) + c / 2;
          const cy = yEx + exH / 2;
          const fs = exH * (ch.length > 1 ? 0.66 : 0.72);
          return (
            <g key={`ex${i}`}>
              <rect x={cx - c * 0.42} y={cy - exH * 0.44} width={c * 0.84} height={exH * 0.88} rx={exH * 0.3} fill={ch === '?' ? '#fee2e2' : '#dcfce7'} stroke={ch === '?' ? UNK : EXCH} strokeWidth="1.2" />
              <text x={cx} y={cy + exH * 0.26} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={ch === '?' ? UNK : EXCH}>{ch}</text>
            </g>
          );
        })}
      {top.map((ch, i) => (
        <Digit key={`t${i}`} x={colX(i)} y={yRow(0)} c={c} ch={ch} struck={filled(exchanges[fromRight(i)]) && /[0-9]/.test(ch)} />
      ))}
      <text x={x + opW * 0.5} y={yRow(1) + c * 0.74} textAnchor="middle" fontSize={c * 0.72} fontWeight="bold" fill={op === '+' ? '#16a34a' : '#dc2626'}>{op}</text>
      {bot.map((ch, i) => (
        <Digit key={`b${i}`} x={colX(i)} y={yRow(1)} c={c} ch={ch} />
      ))}
      {Array.from({ length: cols }).map((_, i) => {
        const d = carries[fromRight(i)];
        return filled(d) ? <CarryMark key={`cr${i}`} x={colX(i)} y={yRow(1)} c={c} ch={String(d)} /> : null;
      })}
      <line x1={x + 2} y1={yLine} x2={gx + cols * c + 2} y2={yLine} stroke="#0f172a" strokeWidth={Math.max(1.6, c * 0.07)} strokeLinecap="round" />
      {!props.noResult && res.map((ch, i) => <Digit key={`r${i}`} x={colX(i)} y={yRes} c={c} ch={ch} color="#1d4ed8" />)}
    </g>
  );
};

/** Önálló SVG: a viewBox a tartalomhoz igazodik. */
export const WrittenSubG3Column: React.FC<WrittenSubG3ColumnProps> = (props) => {
  const { w, h } = columnSubSize(props);
  return (
    <svg viewBox={`-4 -4 ${w + 8} ${h + 8}`} className={props.className ?? 'w-full max-w-[180px] h-auto mx-auto'} xmlns="http://www.w3.org/2000/svg">
      <WrittenSubG3ColumnG {...props} x={0} y={0} />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Az írásbeli kivonás lépései (jobbról balra), PÓTLÁSOS-MARADÉKOS módszerrel.
// ---------------------------------------------------------------------------
export interface SubStep {
  /** oszlop jobbról (0 = egyesek) */
  col: number;
  /** a kisebbítendő jegye ebben az oszlopban */
  digit: number;
  /** a kivonandó jegye */
  need: number;
  /** az előző oszlop maradéka (0 vagy 1), ezt a kivonandó jegyéhez adjuk */
  carryIn: number;
  /** innen pótolunk: need + carryIn („6 meg 1 az 7”) */
  from: number;
  /** eddig pótolunk: digit, vagy digit + 10, ha a digit kisebb, mint from */
  target: number;
  /** maradt-e 1 (0 vagy 1) – a következő oszlop kivonandó-jegyéhez adjuk */
  carryOut: number;
  /** a különbség jegye (ezt írjuk le): target − from */
  write: number;
  /** = carryOut === 1 (régi név: „kellett-e felváltani”) */
  exchanged: boolean;
  /** = carryIn (régi név) */
  borrowIn: number;
  /** = target (régi név) */
  top: number;
}

export const subSteps = (a: number, b: number, cols = 3): SubStep[] => {
  const steps: SubStep[] = [];
  let carry = 0;
  for (let col = 0; col < cols; col++) {
    const p = 10 ** col;
    const digit = Math.floor(a / p) % 10;
    const need = Math.floor(b / p) % 10;
    const from = need + carry;
    const carryOut = digit < from ? 1 : 0;
    const target = digit + 10 * carryOut;
    steps.push({ col, digit, need, carryIn: carry, from, target, carryOut, write: target - from, exchanged: carryOut === 1, borrowIn: carry, top: target });
    carry = carryOut;
  }
  return steps;
};

/**
 * A maradék-jelek (a `carries` prophoz) az első `upTo` lépés után:
 * az i. oszlop kivonandó-jegye mellé kerül 1, ha az (i−1). lépésben „maradt 1”.
 */
export const carryMarks = (steps: SubStep[], upTo: number): ColDigit[] =>
  steps.map((_, i) => (i > 0 && i - 1 < upTo && steps[i - 1].carryOut ? 1 : null));

/** Hány oszlopban marad 1 (0, 1 vagy 2 egy háromjegyű kivonásban). */
export const carryCount = (a: number, b: number) => subSteps(a, b).filter((s) => s.carryOut).length;

const PL = ['egyes', 'tízes', 'százas'];
const PLs = ['egyesek', 'tízesek', 'százasok'];
export const placeName = (col: number) => PL[col] ?? '';
export const placePlural = (col: number) => PLs[col] ?? '';
/** „a 4-et”, „a 3-at”, „az 5-öt” – a tárgyrag számjegyhez. */
export const suffixA = (d: number): string => ['t', 'et', 't', 'at', 'et', 'öt', 'ot', 'et', 'at', 'et'][d] ?? 't';
/** „7-hez”, „2-höz”, „3-hoz”, „10-hez” – a -hoz/-hez/-höz rag 0–19-ig. */
export const suffixHoz = (n: number): string => {
  if (n === 10) return 'hez';
  const d = n % 10;
  return ['hoz', 'hez', 'höz', 'hoz', 'hez', 'höz', 'hoz', 'hez', 'hoz', 'hez'][d];
};
const artDigit = (d: number) => (d === 1 || d === 5 ? 'az' : 'a');

/**
 * Egy lépés kimondva a pótlásos-maradékos módszerrel, pl.
 * „6 meg 1 az 7. 7-hez 6, az 13. Leírom a 6-ot, maradt 1.”
 */
export const spokenSubStep = (s: SubStep, _all?: SubStep[]): string => {
  const parts: string[] = [];
  if (s.carryIn) parts.push(`${s.need} meg ${s.carryIn} az ${s.from}.`);
  parts.push(`${s.from}-${suffixHoz(s.from)} ${s.write}, az ${s.target}.`);
  parts.push(`Leírom ${artDigit(s.write)} ${s.write}-${suffixA(s.write)}${s.carryOut ? ', maradt 1.' : '.'}`);
  return parts.join(' ');
};

/** Miért kell 10-zel nagyobb számig pótolni? Pl. „A 2 kisebb, mint a 7, ezért 12-ig pótolok.” */
export const whyTenText = (s: SubStep): string =>
  s.carryOut
    ? `${artDigit(s.digit) === 'az' ? 'Az' : 'A'} ${s.digit} kisebb, mint ${s.from === 1 || s.from === 5 ? 'az' : 'a'} ${s.from}, ezért ${s.target}-ig pótolok, és maradt 1.`
    : `${s.from}-${suffixHoz(s.from)} pótolok ${s.digit}-ig.`;

/** Csak a pótlás mondata: „7-hez 5, az 12.” */
export const fillUpText = (s: SubStep): string => `${s.from}-${suffixHoz(s.from)} ${s.write}, az ${s.target}.`;
