import React from 'react';
import { FONT, UNK, QFig, Coin, Flat, Rod, PriceTag, Note1000, opts, rnd, shuffle } from '../szorzas-es-osztas/MulDiv1000G3Parts';

// ---------------------------------------------------------------------------
// Rajzelemek és feladat-generátorok az 5. Megálló – tudáspróba (1000-ig) leckéhez.
// Színek: ezres/százas = piros lap, tízes = kék rúd, egyes = sárga kocka.
// ---------------------------------------------------------------------------

export { FONT, UNK, QFig, Coin, Flat, Rod, PriceTag, Note1000, opts, rnd, shuffle };

/** Egyeskocka (sárga). */
export const Cube: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 7 }) => (
  <rect x={x} y={y} width={s} height={s} rx="1" fill="#facc15" stroke="#a16207" strokeWidth="0.9" />
);

/** Számkép 1000-ig: felül a százas lapok (akár 10), alul a tízesrudak (akár 15) és az egyeskockák. */
export const Blocks1000Fig: React.FC<{ sz: number; t: number; e: number }> = ({ sz, t, e }) => {
  const s = sz > 0 ? Math.min(34, (220 - (sz - 1) * 4) / sz) : 0;
  const fx0 = 120 - (sz * (s + 4) - 4) / 2;
  const rodStep = t > 10 ? 8 : 10;
  const rw = t * rodStep;
  const ew = e ? 6 + Math.ceil(e / 5) * 9 : 0;
  const rx0 = 120 - (rw + ew) / 2;
  const y2 = sz > 0 ? 14 + s + 8 : 14;
  const hasLow = t + e > 0;
  const h = y2 + (hasLow ? 40 + 10 : 0) + (sz > 0 && !hasLow ? 2 : 0);
  return (
    <QFig h={Math.max(60, h)}>
      {Array.from({ length: sz }).map((_, i) => (
        <Flat key={`f${i}`} x={fx0 + i * (s + 4)} y={14} s={s} />
      ))}
      {Array.from({ length: t }).map((_, i) => (
        <Rod key={`r${i}`} x={rx0 + i * rodStep} y={y2} w={rodStep - 3} h={38} />
      ))}
      {Array.from({ length: e }).map((_, i) => (
        <Cube key={`c${i}`} x={rx0 + rw + 6 + Math.floor(i / 5) * 9} y={y2 + (i % 5) * 8} s={7} />
      ))}
    </QFig>
  );
};

/** Helyiérték-táblázat (Ez, Sz, T, E). d: 4 elem ('' = üres); hl: kiemelt oszlop. */
export const Place4Fig: React.FC<{ d: (number | string)[]; hl?: number }> = ({ d, hl }) => {
  const heads = ['Ez', 'Sz', 'T', 'E'];
  const colors = ['#fce7f3', '#fee2e2', '#dbeafe', '#fef9c3'];
  return (
    <QFig h={84}>
      {heads.map((h, i) => (
        <g key={h}>
          <rect x={30 + i * 45} y={10} width="45" height="26" fill={colors[i]} stroke="#475569" strokeWidth="1.3" />
          <text x={52.5 + i * 45} y={28} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{h}</text>
          <rect x={30 + i * 45} y={36} width="45" height="36" fill={hl === i ? '#fde68a' : '#fff'} stroke="#475569" strokeWidth="1.3" />
          <text x={52.5 + i * 45} y={62} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{d[i]}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Egyiptomi jelek: vonal = 1, kampó = 10, tekercs = 100. */
const EgyOne: React.FC<{ x: number; y: number }> = ({ x, y }) => <line x1={x} y1={y} x2={x} y2={y + 22} stroke="#78350f" strokeWidth="3" strokeLinecap="round" />;
const EgyTen: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <path d={`M ${x} ${y + 22} L ${x} ${y + 8} Q ${x} ${y} ${x + 7} ${y} Q ${x + 14} ${y} ${x + 14} ${y + 8} L ${x + 14} ${y + 22}`} fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
);
const EgyHundred: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <path d={`M ${x + 2} ${y + 22} L ${x + 2} ${y + 10} A 7 7 0 1 1 ${x + 13} ${y + 13} A 3.5 3.5 0 1 1 ${x + 8} ${y + 9}`} fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
);

/** Egyiptomi számírás: h tekercs, t kampó, e vonal; legend: jelmagyarázat alul. */
export const EgyptFig: React.FC<{ h: number; t: number; e: number; legend?: boolean }> = ({ h, t, e, legend = true }) => {
  const items: React.ReactNode[] = [];
  let x = 0;
  for (let i = 0; i < h; i++) { items.push(<EgyHundred key={`h${i}`} x={x} y={18} />); x += 20; }
  if (h) x += 6;
  for (let i = 0; i < t; i++) { items.push(<EgyTen key={`t${i}`} x={x} y={18} />); x += 19; }
  if (t) x += 6;
  for (let i = 0; i < e; i++) { items.push(<EgyOne key={`e${i}`} x={x + 2} y={18} />); x += 9; }
  const w = x;
  return (
    <QFig h={legend ? 96 : 56}>
      <rect x="10" y="8" width="220" height="42" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.4" />
      <g transform={`translate(${120 - w / 2}, 0)`}>{items}</g>
      {legend && (
        <g>
          <EgyOne x={36} y={60} />
          <text x="46" y="78" fontSize="13" fontWeight="bold" fill="#334155">= 1</text>
          <EgyTen x={92} y={60} />
          <text x="112" y="78" fontSize="13" fontWeight="bold" fill="#334155">= 10</text>
          <EgyHundred x={158} y={60} />
          <text x="178" y="78" fontSize="13" fontWeight="bold" fill="#334155">= 100</text>
        </g>
      )}
    </QFig>
  );
};

/** Fizetés 1000 Ft-tal: bankjegy + árcédulák. */
export const Pay1000Fig: React.FC<{ prices: number[] }> = ({ prices }) => (
  <QFig h={80}>
    <Note1000 x={10} y={16} w={74} h={38} />
    <text x="47" y="70" textAnchor="middle" fontSize="11" fill="#475569">ezzel fizetsz</text>
    {prices.map((p, i) => (
      <PriceTag key={i} x={100 + i * 68} y={20} w={62} text={`${p} Ft`} fs={13} />
    ))}
  </QFig>
);

/** Két csík egymás után, kapocs alatta: „? összesen”. */
export const TwoBarsFig: React.FC<{ a: { name: string; v: number }; b: { name: string; v: number } }> = ({ a, b }) => {
  const W = 200;
  const wa = (W * a.v) / (a.v + b.v);
  return (
    <QFig h={92}>
      <text x={20 + wa / 2} y="22" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#334155">{a.name}</text>
      <text x={20 + wa + (W - wa) / 2} y="22" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#334155">{b.name}</text>
      <rect x="20" y="28" width={wa} height="24" fill="#60a5fa" stroke="#1e3a8a" />
      <text x={20 + wa / 2} y="45" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{a.v}</text>
      <rect x={20 + wa} y="28" width={W - wa} height="24" fill="#f9a8d4" stroke="#831843" />
      <text x={20 + wa + (W - wa) / 2} y="45" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{b.v}</text>
      <path d="M 20 58 L 20 64 L 220 64 L 220 58" fill="none" stroke={UNK} strokeWidth="2" />
      <text x="120" y="82" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>összesen ?</text>
    </QFig>
  );
};

/** Rúdmodell: soronként 1, 2, 3 … egyforma rész, jobbra kapocs az összeggel. */
export const PartsBarsFig: React.FC<{ names: string[]; parts: number[]; total: number }> = ({ names, parts, total }) => {
  const u = 24;
  const rows = names.length;
  const h = 14 + rows * 28 + 10;
  const maxW = Math.max(...parts) * u;
  return (
    <QFig h={h}>
      {names.map((n, r) => (
        <g key={r}>
          <text x="58" y={30 + r * 28} textAnchor="end" fontSize="11.5" fontWeight="bold" fill="#334155">{n}</text>
          {Array.from({ length: parts[r] }).map((_, k) => (
            <rect key={k} x={64 + k * u} y={14 + r * 28} width={u} height="22" fill={r === 0 ? '#fee2e2' : '#e0f2fe'} stroke={r === 0 ? UNK : '#0369a1'} strokeWidth="1.4" />
          ))}
          {r === 0 && <text x={64 + u / 2} y={30} textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>?</text>}
        </g>
      ))}
      <path d={`M ${70 + maxW} 14 L ${76 + maxW} 14 L ${76 + maxW} ${10 + rows * 28} L ${70 + maxW} ${10 + rows * 28}`} fill="none" stroke="#334155" strokeWidth="1.6" />
      <text x={84 + maxW} y={16 + rows * 14} fontSize="14" fontWeight="bold" fill="#0f172a">{total}</text>
    </QFig>
  );
};

/** Keretben lévő számok sora. */
export const NumbersFrameFig: React.FC<{ nums: number[] }> = ({ nums }) => {
  const colors = ['#dc2626', '#16a34a', '#7c3aed', '#92400e', '#0369a1', '#ea580c'];
  const step = 220 / nums.length;
  return (
    <QFig h={56}>
      <rect x="8" y="10" width="224" height="36" rx="18" fill="#fff" stroke="#16a34a" strokeWidth="1.8" />
      {nums.map((n, i) => (
        <text key={i} x={10 + step / 2 + i * step} y={35} textAnchor="middle" fontSize="17" fontWeight="bold" fill={colors[i % colors.length]}>{n}</text>
      ))}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Számok betűvel (0 < n ≤ 1000)
// ---------------------------------------------------------------------------
const ONES = ['', 'egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc'];
const TENS = ['', 'tíz', 'húsz', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
export const numberWord = (n: number): string => {
  if (n === 1000) return 'ezer';
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const e = n % 10;
  const hw = h === 0 ? '' : h === 1 ? 'száz' : (h === 2 ? 'két' : ONES[h]) + 'száz';
  const tw = t === 0 ? '' : t === 1 ? (e ? 'tizen' : 'tíz') : t === 2 ? (e ? 'huszon' : 'húsz') : TENS[t];
  return hw + tw + ONES[e];
};
export const roundTen = (n: number) => Math.floor((n + 5) / 10) * 10;
export const roundHundred = (n: number) => Math.floor((n + 50) / 100) * 100;

// ---------------------------------------------------------------------------
// Labor I – Vegyes feladatok
// ---------------------------------------------------------------------------
export type Count1000TaskKind = 'szam' | 'szomszed' | 'kerekites' | 'osszeadas' | 'kivonas' | 'szorzas' | 'osztas' | 'sorrend';
export interface Count1000Task {
  kind: Count1000TaskKind;
  text: string;
  answer: number;
  options: number[];
  hints: Record<number, string>; // rossz válasz → célzott tipp
  general: string; // általános tipp
}

const pickNonRound = () => {
  for (;;) {
    const n = rnd(101, 989);
    if (n % 10 !== 0) return n;
  }
};

const fill = (answer: number, wrong: [number, string][], general: string, kind: Count1000TaskKind, text: string): Count1000Task => {
  const hints: Record<number, string> = {};
  const w: number[] = [];
  wrong.forEach(([v, h]) => {
    if (v !== answer && v > 0 && v <= 1000 && Number.isInteger(v) && !(v in hints)) {
      hints[v] = h;
      w.push(v);
    }
  });
  return { kind, text, answer, options: opts(answer, w), hints, general };
};

export const makeCount1000Task = (kind: Count1000TaskKind): Count1000Task => {
  switch (kind) {
    case 'szam': {
      // legyen benne 0 a tízesek vagy az egyesek helyén, vagy semmi
      const h = rnd(1, 9);
      const mode = rnd(0, 2);
      const t = mode === 0 ? 0 : rnd(1, 9);
      const e = mode === 1 ? 0 : rnd(1, 9);
      const n = h * 100 + t * 10 + e;
      return fill(
        n,
        [
          [h * 100 + e * 10 + t, 'Felcserélted a tízeseket és az egyeseket.'],
          [h * 10 + (t ? t : e), 'Hiányzik egy számjegy! A háromjegyű számnak 3 helye van: százas, tízes, egyes.'],
          [t === 0 ? h * 100 + e * 10 : h * 100 + e, t === 0 ? 'Nézd meg, melyik helyen van 0! A tízesek helyén 0 áll.' : 'Nézd meg, melyik helyen mennyi áll!'],
          [t * 100 + h * 10 + e, 'A százasok vannak elöl!']
        ],
        `Mondd ki lassan: ${numberWord(n)}. Hány százas, hány tízes, hány egyes?`,
        kind,
        `Írd le számjeggyel: ${numberWord(n)}`
      );
    }
    case 'szomszed': {
      const n = pickNonRound();
      const type = rnd(0, 3);
      const lo10 = Math.floor(n / 10) * 10;
      const lo100 = Math.floor(n / 100) * 100;
      const ans = [lo10, lo10 + 10, lo100, lo100 + 100][type];
      const label = ['kisebb tízes', 'nagyobb tízes', 'kisebb százas', 'nagyobb százas'][type];
      return fill(
        ans,
        [
          [[lo10 + 10, lo10, lo100 + 100, lo100][type], 'Ez a másik oldali szomszéd. Kisebbet vagy nagyobbat keresünk?'],
          [type % 2 === 0 ? n - 1 : n + 1, 'Ez egyes szomszéd. Most kerek számot keresünk!'],
          [[lo100, lo100 + 100, lo10, lo10 + 10][type], type < 2 ? 'Ez százas szomszéd. Most tízest keresünk!' : 'Ez tízes szomszéd. Most százast keresünk!']
        ],
        'Keresd meg a számegyenesen, melyik két kerek szám között van!',
        kind,
        `Mi ${String(n)[0] === '5' ? 'az' : 'a'} ${n} ${label} szomszédja?`
      );
    }
    case 'kerekites': {
      const toHundred = rnd(0, 1) === 1;
      let n = pickNonRound();
      if (toHundred && rnd(0, 2) === 0) n = Math.floor(n / 100) * 100 + 40 + rnd(5, 9); // csapda: x45–x49
      if (n > 999) n = 949;
      const ans = toHundred ? roundHundred(n) : roundTen(n);
      const other = toHundred ? (ans === roundHundred(n) && ans > n ? ans - 100 : ans + 100) : ans > n ? ans - 10 : ans + 10;
      return fill(
        ans,
        [
          [other, toHundred ? 'Nézd a tízeseket! 0–4: lefelé, 5–9: felfelé.' : 'Nézd az egyeseket! 0–4: lefelé, 5–9: felfelé.'],
          [toHundred ? roundHundred(roundTen(n)) : -1, 'Kétszer kerekítettél! Mindig az eredeti számból kerekíts.'],
          [toHundred ? roundTen(n) : roundHundred(n), toHundred ? 'Ez tízesre kerekítve. Most százasra kerekítünk!' : 'Ez százasra kerekítve. Most tízesre kerekítünk!']
        ],
        toHundred ? 'Százasra kerekítésnél a tízeseket nézd!' : 'Tízesre kerekítésnél az egyeseket nézd!',
        kind,
        `Kerekítsd ${toHundred ? 'százasra' : 'tízesre'}: ${n}`
      );
    }
    case 'osszeadas': {
      for (;;) {
        const a = rnd(11, 89) * 10;
        const b = rnd(2, 60) * 10;
        const s = a + b;
        if (s > 1000) continue;
        const crosses = Math.floor(a / 100) !== Math.floor(s / 100) && (a % 100) + (b % 100) >= 100;
        if (!crosses && rnd(0, 1)) continue;
        return fill(
          s,
          [
            [s - 100, 'Átléptél egy kerek százast! Ne felejtsd el hozzáadni.'],
            [s + 10, 'Számold újra a tízeseket!'],
            [s - 10, 'Számold újra a tízeseket!']
          ],
          b >= 100 && b % 100 ? `Bontsd fel: ${a} + ${Math.floor(b / 100) * 100} + ${b % 100}` : `Ugorj előbb a következő kerek százasig!`,
          kind,
          `${a} + ${b} = ?`
        );
      }
    }
    case 'kivonas': {
      for (;;) {
        const a = rnd(20, 100) * 10;
        const b = rnd(2, 70) * 10;
        if (b >= a) continue;
        const d = a - b;
        return fill(
          d,
          [
            [d + 100, 'Átléptél egy kerek százast! Ott még egy százast el kell venni.'],
            [d + 10, 'Számold újra a tízeseket!'],
            [a + b, 'Ez összeadás lett. Itt el kell venni!']
          ],
          `Bontsd fel: előbb vond le a százasokat, aztán a tízeseket.`,
          kind,
          `${a} − ${b} = ?`
        );
      }
    }
    case 'szorzas': {
      for (;;) {
        const a = rnd(2, 9);
        const hund = rnd(0, 2) === 0;
        const b = hund ? rnd(1, 5) : rnd(2, 9);
        const m = hund ? b * 100 : b * 10;
        const p = a * m;
        if (p > 1000) continue;
        return fill(
          p,
          [
            [p / 10, 'Ne hagyd le a nullát!'],
            [a + m, 'Összeadtad a két számot. Itt szorozni kell!'],
            [p + m, 'Eggyel több csoportot számoltál.']
          ],
          `A szorzótábla segít: ${a} · ${b} = ${a * b}, és ${hund ? 'százasokkal' : 'tízesekkel'} számolunk.`,
          kind,
          `${a} · ${m} = ?`
        );
      }
    }
    case 'osztas': {
      const a = rnd(2, 9);
      const q = rnd(2, 9);
      const n = a * q * 10;
      const byTen = rnd(0, 1) === 1;
      if (byTen) {
        return fill(q, [[q * 10, 'Hányszor van meg? Az darab, nem tízes!'], [q + 1, 'Ellenőrizz szorzással!'], [q - 1, 'Ellenőrizz szorzással!']], `Gondold: ${a * q} : ${a} = ?`, kind, `${n} : ${a * 10} = ?`);
      }
      return fill(q * 10, [[q, `Ez csak a tízesek száma. ${q} tízes = ${q * 10}.`], [q * 10 + 10, 'Ellenőrizz szorzással!'], [n - a, 'Osztani kell, nem kivonni!']], `Gondold: ${a * q} tízes : ${a} = ? tízes`, kind, `${n} : ${a} = ?`);
    }
    case 'sorrend':
    default: {
      for (;;) {
        const a = rnd(2, 9);
        const b = rnd(2, 9) * 10;
        const p = a * b;
        const plus = rnd(0, 1) === 1;
        const c = rnd(1, 9) * 100;
        const res = plus ? c + p : c - p;
        if (res <= 0 || res > 1000) continue;
        const ltr = plus ? (c + a) * b : (c - a) * b;
        return fill(
          res,
          [
            [ltr, 'Balról jobbra számoltál. Előbb a szorzás!'],
            [p, 'Ez csak a szorzás. Utána még ' + (plus ? 'hozzá kell adni.' : 'ki kell vonni.')],
            [plus ? c - p : c + p, plus ? 'Itt összeadni kell, nem kivonni.' : 'Itt kivonni kell, nem összeadni.']
          ],
          `Előbb szorzunk: ${a} · ${b} = ${p}.`,
          'sorrend',
          plus ? `${c} + ${a} · ${b} = ?` : `${c} − ${a} · ${b} = ?`
        );
      }
    }
  }
};

export const COUNT1000_KINDS: Count1000TaskKind[] = ['szam', 'szomszed', 'kerekites', 'osszeadas', 'kivonas', 'szorzas', 'osztas', 'sorrend'];
export const makeMixedCount1000Task = (): Count1000Task => makeCount1000Task(COUNT1000_KINDS[rnd(0, COUNT1000_KINDS.length - 1)]);

// ---------------------------------------------------------------------------
// Labor II – Visszafelé-gép: ? → · k → + c = cél. Visszafelé: − c, aztán : k.
// ---------------------------------------------------------------------------
export interface BackTask {
  start: number;
  k: number;
  c: number;
  target: number;
  mid: number; // k · start
  midOpts: number[];
  startOpts: number[];
}

export const makeBackTask = (): BackTask => {
  for (;;) {
    const k = rnd(2, 5);
    const big = rnd(0, 2) === 0;
    const start = big ? rnd(1, 3) * 100 : rnd(2, 9) * 10;
    const mid = k * start;
    const c = rnd(1, 6) * (rnd(0, 1) ? 100 : 50);
    const target = mid + c;
    if (target > 1000 || mid < 40) continue;
    return {
      start,
      k,
      c,
      target,
      mid,
      midOpts: opts(mid, [target + c, mid + 100, mid - 50]),
      startOpts: opts(start, [mid * k, target / k, start + 10, start - 10].map((v) => (Number.isInteger(v) ? v : -1)))
    };
  }
};
