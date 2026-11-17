import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  NutsShareSvg,
  PlatesSvg,
  TwoWaysSvg,
  BracketCompareSvg,
  MinusBracketSvg
} from './Brackets100G3Figures';

// ---------------------------------------------------------------------------
// Három szám, két művelet – zárójellel vagy nélküle
// ---------------------------------------------------------------------------
type Op = '+' | '−' | '·' | ':';
type Mode = 'none' | 'left' | 'right';
interface Ex {
  a: number;
  b: number;
  c: number;
  o1: Op;
  o2: Op;
}

const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const high = (o: Op) => o === '·' || o === ':';
const calc = (x: number, o: Op, y: number): number => {
  if (o === '+') return x + y;
  if (o === '−') return x - y;
  if (o === '·') return x * y;
  return x / y;
};
const ok = (v: number) => Number.isInteger(v) && v >= 0 && v <= 100;

/** Lépések adott zárójelezésnél; null, ha nem szép (tört, negatív, 100 fölött). */
const solve = (e: Ex, m: Mode): { lines: string[]; val: number } | null => {
  const first = m === 'left' ? 'left' : m === 'right' ? 'right' : high(e.o2) && !high(e.o1) ? 'right' : 'left';
  if (first === 'left') {
    const s1 = calc(e.a, e.o1, e.b);
    if (!ok(s1)) return null;
    const s2 = calc(s1, e.o2, e.c);
    if (!ok(s2)) return null;
    return { lines: [`${e.a} ${e.o1} ${e.b} = ${s1}`, `${s1} ${e.o2} ${e.c} = ${s2}`], val: s2 };
  }
  const s1 = calc(e.b, e.o2, e.c);
  if (!ok(s1)) return null;
  const s2 = calc(e.a, e.o1, s1);
  if (!ok(s2)) return null;
  return { lines: [`${e.b} ${e.o2} ${e.c} = ${s1}`, `${e.a} ${e.o1} ${s1} = ${s2}`], val: s2 };
};

const text = (e: Ex, m: Mode) =>
  m === 'left' ? `(${e.a} ${e.o1} ${e.b}) ${e.o2} ${e.c}` : m === 'right' ? `${e.a} ${e.o1} (${e.b} ${e.o2} ${e.c})` : `${e.a} ${e.o1} ${e.b} ${e.o2} ${e.c}`;

const OPS: Op[] = ['+', '−', '·', ':'];

const genEx = (needAllValid: boolean): Ex => {
  for (let t = 0; t < 2000; t++) {
    const o1 = OPS[rnd(0, 3)];
    const o2 = OPS[rnd(0, 3)];
    if (high(o1) === high(o2)) continue; // vegyes legyen
    const e: Ex = { a: rnd(2, 40), b: rnd(2, 12), c: rnd(2, 10), o1, o2 };
    if (o1 === '·') e.a = rnd(2, 9);
    if (o1 === ':') e.a = rnd(2, 10) * rnd(2, 10);
    const n = solve(e, 'none');
    const l = solve(e, 'left');
    const r = solve(e, 'right');
    if (needAllValid && (!n || !l || !r)) continue;
    if (!n || (!l && !r)) continue;
    const vals = [n, l, r].filter(Boolean).map((x) => x!.val);
    if (new Set(vals).size < 2) continue;
    return e;
  }
  return { a: 5, b: 3, c: 4, o1: '+', o2: '·' };
};

const MODES: { m: Mode; label: string }[] = [
  { m: 'none', label: 'Zárójel nélkül' },
  { m: 'left', label: 'Elöl zárójel' },
  { m: 'right', label: 'Hátul zárójel' }
];

export const Brackets100G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I – zárójel-kapcsoló
  const [e1, setE1] = useState<Ex>({ a: 5, b: 3, c: 4, o1: '+', o2: '·' });
  const [mode, setMode] = useState<Mode>('none');
  const sol = solve(e1, mode);
  const base = solve(e1, 'none');

  // Labor II – tedd ki a zárójelet
  const [e2, setE2] = useState<Ex>({ a: 6, b: 4, c: 5, o1: '·', o2: '+' });
  const [target, setTarget] = useState<number>(54);
  const [pick, setPick] = useState<Mode | null>(null);
  const newE2 = () => {
    for (let t = 0; t < 200; t++) {
      const e = genEx(true);
      const vals = MODES.map((x) => solve(e, x.m)!.val);
      // olyan célérték, amely csak egy zárójelezéssel jön ki
      const uniq = MODES.map((x, i) => ({ m: x.m, v: vals[i] })).filter((x) => vals.filter((v) => v === x.v).length === 1);
      const cands = uniq.filter((x) => x.m !== 'none');
      if (!cands.length) continue;
      const c = cands[rnd(0, cands.length - 1)];
      setE2(e);
      setTarget(c.v);
      setPick(null);
      return;
    }
  };
  const picked = pick ? solve(e2, pick) : null;
  const right = picked !== null && picked.val === target;

  return (
    <TheoryTemplate
      topicId="g3-count-100"
      subtopicId="a-zarojel-hasznalata"
      grade={3}
      chapterId="szamolas-100-ig"
      title="7. A zárójel használata"
      subtitle="A zárójel megmondja, melyik műveletet végezzük el először."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TANANYAG"
      themeColor="violet"
      pdfFilename="3_osztaly_zarojel_hasznalata_tananyag.pdf"
      practiceTitle="Készen állsz a zárójelekre?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              (7 + 5) : 4 = 12 : 4 = 3
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ami a <strong>zárójelben</strong> van, azt számoljuk <strong>először</strong>.</li>
              <li>Utána jön a többi, a megszokott sorrendben.</li>
              <li>Zárójel nélkül: előbb · és :, utána + és −.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 20–21. o." badgeColor="violet">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>Az előző leckében megtanultuk: előbb szorzunk és osztunk, utána adunk össze és vonunk ki.</p>
          <p>De mi van, ha egy történetben <strong>először össze kell adni</strong>? Ilyenkor <strong>zárójelet</strong> teszünk: ( ).</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Nézzük meg együtt! Diószedés" badge="Mintapélda" badgeColor="amber">
        <NutsShareSvg />
        <TheoryCard title="Hány diót kap egy barát?" badge="(7 + 5) : 4" badgeColor="amber">
          <p className="text-sm text-slate-700">Dorka 7, Ádám 5 diót szedett. Egyenlően elosztják 4 barátjuk között.</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 mt-2">
            <li>Először: hány dió van együtt? 7 + 5 = 12</li>
            <li>Utána: 12 : 4 = 3</li>
          </ol>
          <p className="text-sm text-slate-700 mt-2">Egy műveletsorral: <strong>(7 + 5) : 4 = 3</strong>. Egy barát 3 diót kap.</p>
        </TheoryCard>
        <TheoryCallout type="warning" title="Zárójel nélkül más lenne!">
          7 + 5 : 4 – itt előbb csak Ádám 5 dióját osztanánk el. Pedig az összes diót osztjuk el! Ezért kell a zárójel.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Zárójel szorzásnál" badge="Tányérok" badgeColor="emerald">
        <PlatesSvg />
        <p className="text-sm text-slate-700">Minden tányéron 3 körte és 2 szilva van. Egy tányéron 3 + 2 gyümölcs. 4 tányéron <strong>4 · (3 + 2) = 20</strong>.</p>
      </TheorySection>

      <TheorySection title="4. Két út, ugyanaz az eredmény" badge="Gondolkodj!" badgeColor="sky">
        <TwoWaysSvg />
        <TheoryCallout type="tip" title="Mindkettő jó!">
          Számolhatsz külön a körtékkel és a szilvákkal, vagy tányéronként. <strong>4 · 3 + 4 · 2 = 4 · (3 + 2) = 20</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Ugyanazok a számok, más eredmény" badge="Összehasonlítás" badgeColor="orange">
        <BracketCompareSvg />
        <TheoryTable
          headers={['Zárójel nélkül', 'Eredmény', 'Zárójellel', 'Eredmény']}
          rows={[
            ['6 · 10 − 4', '56', '6 · (10 − 4)', '36'],
            ['40 − 30 : 5', '34', '(40 − 30) : 5', '2'],
            ['4 + 2 · 6', '16', '(4 + 2) · 6', '36'],
            ['50 − 20 + 10', '40', '50 − (20 + 10)', '20']
          ]}
        />
        <TheoryCallout type="info" title="Mikor nem változtat a zárójel?">
          Ha a zárójel olyan műveletet fog közre, amit amúgy is először végeznénk el: <strong>(3 · 4) + 5 = 3 · 4 + 5 = 17</strong>. Ilyenkor a zárójel elhagyható.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Vigyázz a kivonásnál!" badge="Csapda" badgeColor="rose">
        <MinusBracketSvg />
        <TheoryTrapBox
          title="40 − (12 + 8)"
          wrong="40 − 12 + 8 = 36"
          wrongExplanation="Ha elhagyod a zárójelet, a 8-at hozzáadod. Pedig Ákos is elvitt 8 matricát!"
          correct="40 − (12 + 8) = 40 − 20 = 20"
          correctExplanation="Először kiszámolod, mennyit adtál el összesen (20), és ezt vonod ki."
          tip="Ha többen is elvisznek valamit, az egészet vond ki: zárójellel!"
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="7. Labor I: Zárójel-kapcsoló" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-violet-900 bg-violet-50 rounded-xl p-3">Tedd a zárójelet máshova! Figyeld, hogyan változik az eredmény.</p>
          <div className="grid grid-cols-3 gap-2">
            {MODES.map((x) => {
              const s = solve(e1, x.m);
              return (
                <button
                  key={x.m}
                  onClick={() => setMode(x.m)}
                  disabled={!s}
                  className={`rounded-xl px-2 py-3 text-sm font-bold min-h-[52px] border-2 ${mode === x.m ? 'bg-violet-600 border-violet-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'} ${!s ? 'opacity-40' : ''}`}
                >
                  {x.label}
                </button>
              );
            })}
          </div>
          <div className="text-center text-3xl font-black text-slate-800 py-2">{text(e1, mode)}</div>
          {sol ? (
            <div className="bg-slate-50 rounded-xl p-3 text-base font-mono text-slate-700 space-y-1">
              {sol.lines.map((l, i) => (
                <div key={i}>
                  {i + 1}. lépés: {l}
                </div>
              ))}
              <div className="font-sans font-black text-violet-800 text-lg">Eredmény: {sol.val}</div>
            </div>
          ) : (
            <div className="rounded-xl p-2 bg-amber-100 text-amber-900 text-sm font-bold">Így nem jön ki egész szám. Válassz másikat!</div>
          )}
          {sol && base && mode !== 'none' && (
            <div className={`rounded-xl p-2 text-center text-sm font-bold ${sol.val === base.val ? 'bg-sky-100 text-sky-800' : 'bg-emerald-100 text-emerald-800'}`}>
              {sol.val === base.val ? 'Ugyanannyi, mint zárójel nélkül. Itt a zárójel nem változtat.' : `Más lett! Zárójel nélkül ${base.val}, így ${sol.val}.`}
            </div>
          )}
          <button
            onClick={() => {
              setE1(genEx(false));
              setMode('none');
            }}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]"
          >
            Új feladat
          </button>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="8. Labor II: Tedd ki a zárójelet!" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-purple-900 bg-purple-50 rounded-xl p-3">Hova kell a zárójel, hogy igaz legyen?</p>
          <div className="text-center text-3xl font-black text-slate-800 py-2">
            {text(e2, 'none')} = <span className="text-purple-700">{target}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {MODES.map((x) => (
              <button
                key={x.m}
                onClick={() => setPick(x.m)}
                className={`rounded-xl px-2 py-3 text-lg font-black min-h-[56px] border-2 ${pick === x.m ? (right ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-rose-500 border-rose-600 text-white') : 'bg-slate-50 border-slate-200 text-slate-800'}`}
              >
                {x.m === 'none' ? 'Nem kell zárójel' : text(e2, x.m)}
              </button>
            ))}
          </div>
          {pick && (
            <div className={`rounded-xl p-2 text-center text-sm font-bold ${right ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {picked
                ? right
                  ? `Igen! ${text(e2, pick)} = ${target}. Ügyes vagy!`
                  : `Így ${picked.val} lesz, nem ${target}. Próbáld a másikat!`
                : 'Így nem jön ki egész szám. Próbáld a másikat!'}
            </div>
          )}
          <button onClick={newE2} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
            Új feladat
          </button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Brackets100G3Theory;
