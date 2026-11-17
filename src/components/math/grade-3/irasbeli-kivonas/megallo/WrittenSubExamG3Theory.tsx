import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  WrittenSubExamCoinsSvg,
  WrittenSubExamEstimateSvg,
  WrittenSubExamStepsSvg,
  WrittenSubExamCheckSvg,
  WrittenSubExamPlanSvg,
  WrittenSubExamChangesSvg
} from './WrittenSubExamG3Figures';
import { WrittenSubG3Column, subSteps, carryMarks, spokenSubStep, whyTenText, suffixHoz, SubStep } from '../irasbeli-kivonas/WrittenSubG3Column';
import { rnd, pick, shuffle, roundTen, roundHundred } from './WrittenSubExamG3Parts';
import { ins, signed } from '../a-kulonbseg-valtozasai/DiffChangesG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Írásbeli kivonás lépésről lépésre
// ---------------------------------------------------------------------------
export type ColKind = 'nincs' | 'egyes' | 'tizes' | 'ketszer' | 'nulla';
export const COL_KINDS: { id: ColKind; label: string }[] = [
  { id: 'nincs', label: 'nem marad semmi' },
  { id: 'egyes', label: 'maradt 1 az egyeseknél' },
  { id: 'tizes', label: 'maradt 1 a tízeseknél' },
  { id: 'ketszer', label: 'kétszer maradt 1' },
  { id: 'nulla', label: '0 a tízesek helyén' }
];

export const kindOf = (a: number, b: number): ColKind => {
  const st = subSteps(a, b);
  if (Math.floor(a / 10) % 10 === 0 && st[0].carryOut) return 'nulla';
  if (st[0].carryOut && st[1].carryOut) return 'ketszer';
  if (st[0].carryOut) return 'egyes';
  if (st[1].carryOut) return 'tizes';
  return 'nincs';
};

export interface ColTask {
  a: number;
  b: number;
  kind: ColKind;
}
/** Háromjegyű kivonás 500-ig, legalább 100 különbséggel (háromjegyű eredmény). */
export const makeColTask = (kind?: ColKind): ColTask => {
  for (let i = 0; i < 5000; i++) {
    const a = rnd(200, 499);
    const b = rnd(100, a - 100);
    const k = kindOf(a, b);
    if (kind && k !== kind) continue;
    return { a, b, kind: k };
  }
  return { a: 405, b: 248, kind: 'nulla' };
};

/** A becslés választási lehetőségei (százasra kerekítve), növekvő sorrendben; az első a jó. */
export const estimateOptions = (a: number, b: number): { right: number; options: number[] } => {
  const right = roundHundred(a) - roundHundred(b);
  const opts = [right, right + 100, right - 100 >= 0 ? right - 100 : right + 200];
  return { right, options: [...opts].sort((x, y) => x - y) };
};

/** Visszajelzés egy beírt számjegyre a tipikus hibák alapján (pótlásos-maradékos módszer). */
export const digitHint = (steps: SubStep[], col: number, typed: number): { ok: boolean; msg: string } => {
  const s = steps[col];
  if (typed === s.write) return { ok: true, msg: '' };
  // a maradékot nem adta hozzá a kivonandó jegyéhez
  if (s.carryIn && typed === s.digit + (s.digit < s.need ? 10 : 0) - s.need)
    return { ok: false, msg: `Elfelejtetted a maradékot! Előbb: ${s.need} meg 1 az ${s.from}. Utána pótolj!` };
  // a kisebb jegytől a nagyobbig pótolt (fordítva)
  if (s.carryOut && typed === s.from - s.digit) return { ok: false, msg: `Fordítva számoltál! ${whyTenText(s)}` };
  return { ok: false, msg: `Segítség: ${spokenSubStep(s)}` };
};

// ---------------------------------------------------------------------------
// Labor II – Vegyes feladatok
// ---------------------------------------------------------------------------
export type MixKind = 'fejben' | 'becsles' | 'hianyzo' | 'szoveges' | 'valtozas' | 'ellenorzes';
export const MIX_KINDS: { id: MixKind; label: string }[] = [
  { id: 'fejben', label: 'Fejben' },
  { id: 'becsles', label: 'Becslés' },
  { id: 'hianyzo', label: 'Hiányzó szám' },
  { id: 'szoveges', label: 'Szöveges' },
  { id: 'valtozas', label: 'Változás' },
  { id: 'ellenorzes', label: 'Ellenőrzés' }
];
export interface MixTask {
  kind: MixKind;
  text: string;
  answer: string;
  options: string[];
  /** Rossz válaszhoz tartozó tipp. */
  why: Record<string, string>;
  explain: string;
  /** Ellenőrző kifejezés (a teszthez): ennek az értéke a jó válasz száma. */
  expr?: string;
}

const NAMES = ['Áron', 'Vilma', 'Noel', 'Lenke', 'Bálint', 'Csilla', 'Jázmin', 'Teo'];
const DATIVE: Record<string, string> = { Áron: 'Áronnak', Vilma: 'Vilmának', Noel: 'Noelnek', Lenke: 'Lenkének', Bálint: 'Bálintnak', Csilla: 'Csillának', Jázmin: 'Jázminnak', Teo: 'Teónak' };
const over500 = (w: string) => (w.match(/[0-9]+/g) || []).some((n) => Number(n) > 500);

const build = (kind: MixKind, text: string, answer: string, wrongs: [string, string][], explain: string, expr?: string, unit = ''): MixTask => {
  const why: Record<string, string> = {};
  const out = [answer];
  wrongs.forEach(([w, m]) => {
    if (out.length < 4 && !out.includes(w) && !/-/.test(w) && !over500(w)) {
      out.push(w);
      why[w] = m;
    }
  });
  const base = parseInt(answer, 10);
  let k = 1;
  while (out.length < 4 && !Number.isNaN(base)) {
    const v = base + (k % 2 ? 10 * Math.ceil(k / 2) : -10 * Math.ceil(k / 2));
    const w = `${v}${unit}`;
    if (v >= 0 && v <= 500 && !out.includes(w)) {
      out.push(w);
      why[w] = 'Nem ez. Számold újra a tízeseket!';
    }
    k++;
  }
  return { kind, text, answer, options: shuffle(out), why, explain, expr };
};

export const makeMixedTask = (kind?: MixKind): MixTask => {
  const kd = kind ?? pick(MIX_KINDS.map((m) => m.id));
  if (kd === 'fejben') {
    if (Math.random() < 0.5) {
      const a = rnd(250, 499);
      const k = rnd(1, Math.floor(a / 100) - 1) * 100;
      const r = a - k;
      return build(
        kd,
        `${a} − ${k} = ?`,
        `${r}`,
        [
          [`${a + k}`, 'Ez összeadás lett! Kivonásnál kevesebb lesz az eredmény.'],
          [`${r + 100}`, 'Számold meg újra a százasokat!'],
          [`${r - 100}`, 'Túl sok százast vettél el.'],
          [`${r + 10}`, 'A tízesek most nem változnak!']
        ].filter(([w]) => +w <= 500) as [string, string][],
        `Csak a százasokból veszünk el: ${a} − ${k} = ${r}.`,
        `${a} - ${k}`
      );
    }
    const a = rnd(21, 49) * 10 + rnd(0, 9);
    const k = rnd(2, 9) * 10;
    const r = a - k;
    return build(
      kd,
      `${a} − ${k} = ?`,
      `${r}`,
      [
        [`${r + 100}`, 'Átléptél egy kerek százast! Bonts két részre: előbb a kerek tízesig, aztán tovább.'],
        [`${r + 10}`, 'Nem ez. Számold újra a tízeseket!'],
        [`${r - 10}`, 'Egy tízessel többet vettél el.'],
        [`${a + k}`, 'Ez összeadás lett! Kivonásnál kevesebb lesz az eredmény.']
      ].filter(([w]) => +w <= 500) as [string, string][],
      `${a} − ${k} = ${r}. Ellenőrzés: ${r} + ${k} = ${a}.`,
      `${a} - ${k}`
    );
  }
  if (kd === 'becsles') {
    const a = rnd(250, 499);
    const b = rnd(100, a - 100);
    const ten = Math.random() < 0.5;
    const r = ten ? roundTen : roundHundred;
    const other = ten ? roundHundred : roundTen;
    const est = r(a) - r(b);
    const step = ten ? 10 : 100;
    return build(
      kd,
      `Becsüld meg ${ten ? 'tízesre' : 'százasra'} kerekítve: ${a} − ${b} ≈ ?`,
      `${est}`,
      [
        [`${a - b}`, 'Ez a pontos eredmény. Most előbb kerekítsd a számokat!'],
        [`${other(a) - other(b)}`, `Ez a másik kerekítés. Most ${ten ? 'tízesre' : 'százasra'} kerekíts!`],
        [`${est + step}`, `Nézd meg újra: ${a} ≈ ${r(a)}, ${b} ≈ ${r(b)}.`],
        [`${est - step}`, `Nézd meg újra: ${a} ≈ ${r(a)}, ${b} ≈ ${r(b)}.`]
      ],
      `${a} ≈ ${r(a)}, ${b} ≈ ${r(b)}. ${r(a)} − ${r(b)} = ${est}. (Pontosan: ${a - b}.)`,
      `${r(a)} - ${r(b)}`
    );
  }
  if (kd === 'hianyzo') {
    if (Math.random() < 0.5) {
      const b = rnd(100, 250);
      const c = rnd(50, 500 - b);
      const r = b + c;
      return build(
        kd,
        `□ − ${b} = ${c}. Melyik szám a □?`,
        `${r}`,
        [
          [`${Math.abs(c - b)}`, 'Kivontál, pedig a □ az egész! Add össze a két számot.'],
          [`${r + 10}`, 'Nem ez. Ellenőrizd: □ − ' + b + ' legyen ' + c + '!'],
          [`${r - 10}`, 'Nem ez. Ellenőrizd: □ − ' + b + ' legyen ' + c + '!'],
          [`${r - 100}`, 'Számold meg újra a százasokat!']
        ],
        `A □ az egész: ${b} + ${c} = ${r}. Ellenőrzés: ${r} − ${b} = ${c}.`,
        `${b} + ${c}`
      );
    }
    const a = rnd(250, 499);
    const c = rnd(50, a - 50);
    const r = a - c;
    return build(
      kd,
      `${a} − □ = ${c}. Melyik szám a □?`,
      `${r}`,
      [
        [`${a + c}`, 'Összeadtál, pedig a □ egy rész: vond ki a ' + c + '-t az egészből!'],
        [`${r + 10}`, 'Nem ez. Ellenőrizd: ' + a + ' − □ legyen ' + c + '!'],
        [`${r - 10}`, 'Nem ez. Ellenőrizd: ' + a + ' − □ legyen ' + c + '!'],
        [`${r + 100}`, 'Számold meg újra a százasokat!']
      ].filter(([w]) => +w <= 500) as [string, string][],
      `□ = ${a} − ${c} = ${r}. Ellenőrzés: ${a} − ${r} = ${c}.`,
      `${a} - ${c}`
    );
  }
  if (kd === 'szoveges') {
    const t = rnd(0, 2);
    const n1 = pick(NAMES);
    if (t === 0) {
      const a = rnd(200, 480);
      const d = rnd(40, 150);
      const r = a - d;
      const n2 = pick(NAMES.filter((n) => n !== n1));
      return build(
        kd,
        `${n1} ${a} pontot gyűjtött. ${n2} ${ins(d)} kevesebbet. Hány pontot gyűjtött ${n2}?`,
        `${r}`,
        [
          [`${a + d}`, '„Kevesebb”: kivonás kell!'],
          [`${r + 10}`, 'Nem ez. Számold újra írásban!'],
          [`${r - 10}`, 'Nem ez. Számold újra írásban!']
        ].filter(([w]) => +w <= 500) as [string, string][],
        `${a} − ${d} = ${r}.`,
        `${a} - ${d}`
      );
    }
    if (t === 1) {
      const a = rnd(200, 340);
      const d = rnd(60, 150);
      const r = a - d;
      return build(
        kd,
        `A piros dobozban ${a} gyöngy van. Ez ${ins(d)} több, mint a kékben. Hány gyöngy van a kékben?`,
        `${r}`,
        [
          [`${a + d}`, 'Vigyázz! A piros a több, tehát a kékben kevesebb van: kivonás kell.'],
          [`${r + 10}`, 'Nem ez. Számold újra írásban!'],
          [`${r - 10}`, 'Nem ez. Számold újra írásban!']
        ],
        `A kékben kevesebb van: ${a} − ${d} = ${r}.`,
        `${a} - ${d}`
      );
    }
    const have = pick([300, 400, 500]);
    const p = rnd(110, have - 30);
    const r = have - p;
    return build(
      kd,
      `${DATIVE[n1]} ${have} Ft-ja van. Vesz egy ${p} Ft-os játékot. Mennyi pénze marad?`,
      `${r} Ft`,
      [
        [`${r + 10} Ft`, 'Nem ez. Számold újra a tízeseket!'],
        [`${r - 10} Ft`, 'Nem ez. Számold újra a tízeseket!'],
        [`${r + 100} Ft`, 'Számold meg újra a százasokat!']
      ].filter(([w]) => parseInt(w, 10) <= 500) as [string, string][],
      `${have} − ${p} = ${r}. ${r} Ft marad.`,
      `${have} - ${p}`,
      ' Ft'
    );
  }
  if (kd === 'valtozas') {
    for (;;) {
      const m = rnd(250, 480);
      const s = rnd(100, m - 100);
      const d0 = m - s;
      const which = pick(['m', 's']);
      const delta = pick([10, 100, 1, 20]) * pick([1, -1]);
      const m2 = which === 'm' ? m + delta : m;
      const s2 = which === 's' ? s + delta : s;
      if (m2 > 500 || s2 < 10 || s2 > m2) continue;
      const r = m2 - s2;
      const wrong = which === 'm' ? d0 - delta : d0 + delta;
      return build(
        kd,
        `${m} − ${s} = ${d0}. Számolás nélkül: ${m2} − ${s2} = ?`,
        `${r}`,
        [
          [`${wrong}`, which === 's' ? 'Fordítva! Ha a kivonandó nő, a különbség csökken (és fordítva).' : 'Fordítva! A kisebbítendővel ugyanarra változik a különbség.'],
          [`${d0}`, 'Valami megváltozott! Melyik szám és mennyivel?'],
          [`${r + 10}`, 'Nem ez. Mennyivel változott a szám?']
        ],
        `${which === 'm' ? 'A kisebbítendő' : 'A kivonandó'} ${signed(delta)}. A különbség ${which === 'm' ? signed(delta) : signed(-delta)}: ${d0} → ${r}.`,
        `${m2} - ${s2}`
      );
    }
  }
  // ellenorzes
  const a = rnd(250, 499);
  const b = rnd(100, a - 100);
  const c = a - b;
  return build(
    'ellenorzes',
    `Melyik összeadással ellenőrzöd? ${a} − ${b} = ${c}`,
    `${c} + ${b}`,
    [
      [`${a} + ${b}`, 'A kisebbítendőhöz nem adunk hozzá. A különbséghez add a kivonandót!'],
      [`${a} + ${c}`, 'Így túl sok lenne. A különbséghez add a kivonandót!'],
      [`${c} + ${c}`, 'A különbséghez a kivonandót add, ne önmagát!']
    ],
    `Különbség + kivonandó = kisebbítendő: ${c} + ${b} = ${a}.`
  );
};

// ---------------------------------------------------------------------------
// A lecke
// ---------------------------------------------------------------------------
const DigitPad: React.FC<{ onDigit: (d: number) => void; disabled?: boolean }> = ({ onDigit, disabled }) => (
  <div className="grid grid-cols-5 gap-1.5 max-w-xs mx-auto">
    {Array.from({ length: 10 }).map((_, d) => (
      <button
        key={d}
        disabled={disabled}
        onClick={() => onDigit(d)}
        className="min-h-[48px] rounded-xl text-xl font-black border-2 bg-white border-slate-300 text-slate-800 hover:bg-slate-50 disabled:opacity-40"
      >
        {d}
      </button>
    ))}
  </div>
);

const PLACE_TXT = ['egyesek', 'tízesek', 'százasok'];

export const WrittenSubExamG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [ct, setCt] = useState<ColTask>({ a: 362, b: 187, kind: 'ketszer' });
  const [phase, setPhase] = useState<'becsles' | 'szamolas' | 'kesz'>('becsles');
  const [col, setCol] = useState(0);
  const [digits, setDigits] = useState<number[]>([]);
  const [msg, setMsg] = useState('');
  const [estPick, setEstPick] = useState<number | null>(null);
  const [showCarry, setShowCarry] = useState(true);
  const steps = subSteps(ct.a, ct.b);
  const est = estimateOptions(ct.a, ct.b);
  const newCol = (k?: ColKind) => {
    setCt(makeColTask(k));
    setPhase('becsles');
    setCol(0);
    setDigits([]);
    setMsg('');
    setEstPick(null);
  };
  const pickEst = (v: number) => {
    setEstPick(v);
    if (v === est.right) {
      setPhase('szamolas');
      setMsg('');
    } else {
      setMsg(`Nem ez. Kerekíts százasra: ${ct.a} ≈ ${roundHundred(ct.a)}, ${ct.b} ≈ ${roundHundred(ct.b)}.`);
    }
  };
  const typeDigit = (d: number) => {
    const h = digitHint(steps, col, d);
    if (!h.ok) {
      setMsg(h.msg);
      return;
    }
    const nd = [...digits, d];
    setDigits(nd);
    setMsg('');
    if (col === 2) setPhase('kesz');
    else setCol(col + 1);
  };
  const cells = [' ', ' ', ' '];
  digits.forEach((d, i) => {
    cells[2 - i] = String(d);
  });
  if (phase === 'szamolas') cells[2 - col] = '_';
  const resultShown = cells.join('');

  // ---- Labor II ----
  const [mt, setMt] = useState<MixTask>(() => makeMixedTask('becsles'));
  const [mPick, setMPick] = useState<string | null>(null);
  const [mScore, setMScore] = useState(0);
  const newMix = (k?: MixKind) => {
    setMt(makeMixedTask(k));
    setMPick(null);
  };
  const pickMix = (o: string) => {
    if (mPick === mt.answer) return;
    setMPick(o);
    if (o === mt.answer) setMScore(mScore + 1);
  };

  return (
    <TheoryTemplate
      topicId="g3-written-subtraction"
      subtopicId="megallo"
      grade={3}
      chapterId="irasbeli-kivonas"
      title="5. Megálló – tudáspróba"
      subtitle="Amit a kivonásról tanultál: fejben, becsléssel, írásban, ellenőrzéssel, szöveges feladatokban."
      badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • TANANYAG"
      themeColor="rose"
      pdfFilename="3_osztaly_irasbeli_kivonas_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat 3 szinten – próbáld ki magad!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — ÍGY KIVONSZ ÍRÁSBAN',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center font-mono text-base font-black text-rose-900 dark:text-rose-200">
              becslés → számítás → ellenőrzés
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Helyi érték szerint írd egymás alá! Kezdd az <strong>egyeseknél</strong>!</li>
              <li><strong>Pótolj</strong>: 7-hez 5, az 12. Ha 10-en felül pótoltál: <strong>maradt 1</strong>.</li>
              <li>A maradékot a következő kivonandó-jegyhez adod: <strong>6 meg 1 az 7</strong>.</li>
              <li>Ellenőrizz: <strong>különbség + kivonandó = kisebbítendő</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Amit már tudsz" badge="Tankönyv 95–97. o." badgeColor="rose">
        <TheoryTable
          headers={['Lecke', 'Mit tudsz?', 'Példa']}
          rows={[
            ['1. Háromjegyű számok kivonása', 'kerek százast, kerek tízest elveszel fejben', '465 − 200 = 265'],
            ['2. A különbség becslése', 'kerekítesz, és úgy számolsz', '389 − 214 ≈ 400 − 200'],
            ['3. Írásbeli kivonás', 'oszlopban, pótlással, maradékkal', '362 − 187 = 175'],
            ['4. A különbség változásai', 'mi lesz, ha egy szám változik', '350 − 130 = 360 − 140']
          ]}
        />
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Kivonás fejben" badge="Kerek számok" badgeColor="amber">
        <WrittenSubExamCoinsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Kerek tízeseket" badge="420 − 60" badgeColor="amber">
            <p className="text-sm text-slate-700">Előbb a kerek százasig: 420 − 20 = 400. Aztán tovább: 400 − 40 = <strong>360</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Pótlással" badge="500 − 320" badgeColor="amber">
            <p className="text-sm text-slate-700">320-tól 500-ig mennyi hiányzik? 320 + 180 = 500, tehát 500 − 320 = <strong>180</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Becslés" badge="Kerekítéssel" badgeColor="sky">
        <WrittenSubExamEstimateSvg />
        <p className="text-sm text-slate-700">Számolás előtt becsülj! Ha az eredmény messze van a becsléstől, valahol hibáztál.</p>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Írásbeli kivonás" badge="Pótlással" badgeColor="purple">
        <WrittenSubExamStepsSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>Egyesek: a 2 kisebb, mint a 7, ezért 12-ig pótolok. „7-hez 5, az 12. Leírom az 5-öt, <strong>maradt 1</strong>.”</li>
          <li>Tízesek: „8 meg 1 az 9. 9-hez 7, az 16. Leírom a 7-et, <strong>maradt 1</strong>.”</li>
          <li>Százasok: „1 meg 1 az 2. 2-höz 1, az 3. Leírom az 1-et.” Az eredmény: <strong>175</strong>.</li>
        </ul>
        <TheoryCallout type="tip" title="0 a tízesek helyén: 405 − 248">
          
          „8-hoz 7, az 15, maradt 1.” „4 meg 1 az 5. 5-höz 5, az <strong>10</strong>. Leírom az 5-öt, maradt 1.” „2 meg 1 az 3. 3-hoz 1, az 4.” Az eredmény 157. A 0 helyett 10-ig pótolunk!
        </TheoryCallout>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Ellenőrzés" badge="Összeadással" badgeColor="emerald">
        <WrittenSubExamCheckSvg />
        <p className="text-sm text-slate-700">A különbséghez add hozzá a kivonandót! Ha a kisebbítendőt kapod, jól számoltál.</p>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Szöveges feladatok" badge="Terv" badgeColor="orange">
        <WrittenSubExamPlanSvg />
        <TheoryCallout type="warning" title="„Több, mint” – mégis kivonás?">
          „A mesekönyv 145-tel több, mint az állatos könyv.” Ha a mesekönyvek számát tudod, az állatos könyv a <strong>kevesebb</strong>: kivonással számolsz! Mindig gondold végig: melyik a több?
        </TheoryCallout>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. A különbség változásai" badge="Számolás nélkül" badgeColor="teal">
        <WrittenSubExamChangesSvg />
        <p className="text-sm text-slate-700">Okos kivonás: 345 − 199 = 346 − 200 = <strong>146</strong>. Mindkét számhoz ugyanannyit adunk.</p>
      </TheorySection>

      {/* 8 */}
      <TheorySection title="8. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Különbség-piramis" badge="450 · 280 · 130" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Minden doboz a fölötte lévő két szám különbsége.</li>
              <li>Középen: 450 − 280 = 170 és 280 − 130 = 150.</li>
              <li>Alul: 170 − 150 = <strong>20</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hiányzó számjegy" badge="4?6 − 231 = 245" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egyesek: 6 − 1 = 5, jó.</li>
              <li>Tízesek: ? − 3 = 4, tehát ? = <strong>7</strong>.</li>
              <li>Ellenőrzés: 476 − 231 = 245.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Melyik szám jó?" badge="□ − 150 > 230 és □ < 500 − 118" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>□ − 150 &gt; 230: a □ nagyobb, mint 380.</li>
            <li>500 − 118 = 382: a □ kisebb, mint 382.</li>
            <li>Csak a <strong>381</strong> jó.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 9 */}
      <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Fordítva számolni"
          wrong="341 − 127 = 226 (7 − 1 = 6)"
          wrongExplanation="A kivonandó jegyétől pótolunk a kisebbítendő jegyéig! Az 1 kisebb, mint a 7, ezért 11-ig pótolunk."
          correct="341 − 127 = 214"
          correctExplanation="7-hez 4, az 11, maradt 1. 2 meg 1 az 3, 3-hoz 1, az 4. 1-hez 2, az 3."
        />
        <TheoryTrapBox
          title="Elfelejtett maradék"
          wrong="405 − 168 = 347"
          wrongExplanation="A maradékot nem adta hozzá a következő kivonandó-jegyhez (sem a tízeseknél, sem a százasoknál)."
          correct="405 − 168 = 237"
          correctExplanation="8-hoz 7, az 15, maradt 1. 6 meg 1 az 7, 7-hez 3, az 10, maradt 1. 1 meg 1 az 2, 2-höz 2, az 4."
          tip="Ellenőrizz összeadással: 237 + 168 = 405."
        />
        <TheoryTrapBox
          title="„Több” szó – összeadás?"
          wrong="312 mesekönyv, 145-tel több, mint az állatos: 312 + 145"
          wrongExplanation="Az állatos könyv a kevesebb!"
          correct="312 − 145 = 167 állatos könyv"
          correctExplanation="Gondold végig, melyik a több, melyik a kevesebb."
        />
      </TheorySection>

      {/* 10 – Labor I */}
      <TheorySection title="10. Labor I: Írásbeli kivonás lépésről lépésre" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => newCol()} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button
              onClick={() => setShowCarry(!showCarry)}
              className={`px-3 py-2 rounded-xl text-xs font-bold min-h-[44px] border-2 ${showCarry ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-white border-slate-300 text-slate-700'}`}
            >
              Maradék mutatása: {showCarry ? 'be' : 'ki'}
            </button>
            {COL_KINDS.map((k) => (
              <button
                key={k.id}
                onClick={() => newCol(k.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold min-h-[44px] border-2 ${ct.kind === k.id ? 'bg-purple-100 border-purple-500 text-purple-900' : 'bg-white border-slate-300 text-slate-700'}`}
              >
                {k.label}
              </button>
            ))}
          </div>
          <WrittenSubG3Column
            minuend={ct.a}
            subtrahend={ct.b}
            result={phase === 'becsles' ? '   ' : resultShown}
            carries={showCarry ? carryMarks(steps, phase === 'kesz' ? 3 : col) : []}
            highlight={phase === 'szamolas' ? col : null}
            className="w-full max-w-[220px] h-auto mx-auto"
          />
          {phase === 'becsles' && (
            <div className="space-y-2">
              <div className="text-center text-base font-bold text-slate-800">1. Becsülj százasra kerekítve! Kb. mennyi lesz?</div>
              <div className="flex gap-3 justify-center">
                {est.options.map((o) => (
                  <button
                    key={o}
                    onClick={() => pickEst(o)}
                    className={`min-w-[72px] min-h-[52px] rounded-2xl text-xl font-black border-2 ${estPick === o && o !== est.right ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'}`}
                  >
                    ≈ {o}
                  </button>
                ))}
              </div>
            </div>
          )}
          {phase === 'szamolas' && (
            <div className="space-y-2">
              <div className="text-center text-base font-bold text-slate-800">
                2. Becslés: ≈ {est.right}. Most a(z) <span className="text-purple-700">{PLACE_TXT[col]}</span>:{' '}
                {steps[col].carryIn ? `${steps[col].need} meg 1 az ${steps[col].from}. ` : ''}
                {steps[col].from}-{suffixHoz(steps[col].from)} mennyi kell? Melyik számjegyet írod le?
              </div>
              <DigitPad onDigit={typeDigit} />
            </div>
          )}
          {msg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{msg}</div>}
          {phase === 'kesz' && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! {ct.a} − {ct.b} = {ct.a - ct.b}. A becslés ≈ {est.right} volt, ez közel van. Ellenőrzés: {ct.a - ct.b} + {ct.b} = {ct.a}.
            </div>
          )}
        </div>
      </TheorySection>

      {/* 11 – Labor II */}
      <TheorySection title="11. Labor II: Vegyes feladatok" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => newMix()} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Új feladat (vegyes)</button>
              {MIX_KINDS.map((k) => (
                <button
                  key={k.id}
                  onClick={() => newMix(k.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold min-h-[44px] border-2 ${mt.kind === k.id ? 'bg-sky-100 border-sky-500 text-sky-900' : 'bg-white border-slate-300 text-slate-700'}`}
                >
                  {k.label}
                </button>
              ))}
            </div>
            <div className="text-sm font-bold text-sky-900 bg-sky-50 rounded-xl px-3 py-2">Jó válasz: {mScore}</div>
          </div>
          <div className="text-center text-lg sm:text-xl font-black text-slate-800">{mt.text}</div>
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {mt.options.map((o) => (
              <button
                key={o}
                onClick={() => pickMix(o)}
                className={`min-h-[56px] rounded-2xl text-lg font-black border-2 ${
                  mPick === o ? (o === mt.answer ? 'bg-emerald-500 border-emerald-700 text-white' : 'bg-rose-100 border-rose-400 text-rose-700') : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          {mPick && mPick !== mt.answer && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{mt.why[mPick] ?? 'Nem ez. Próbáld újra!'} Próbáld újra!</div>
          )}
          {mPick === mt.answer && <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">Igen! {mt.explain}</div>}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenSubExamG3Theory;
