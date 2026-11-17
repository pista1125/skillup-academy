import React, { useEffect, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { StepsNoExchangeSvg, FillUpStepsSvg, ExchangeOnesSvg, ExchangeTensSvg, ExchangeBothSvg, ZeroTensSvg, CheckSvg, WordPlanSvg } from './WrittenSubG3Figures';
import { WrittenSubG3Column, subSteps, spokenSubStep, fillUpText, placePlural, suffixA, ColDigit, SubStep } from './WrittenSubG3Column';
import { FONT, DiscCell, PLACE_BODY, PLACE_FILL, PLACE_TEXT, rnd, shuffle } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts';

// ---------------------------------------------------------------------------
// Feladatgenerátor (≤ 499, ahogy a tankönyv): felváltás nélkül / egyeseknél / tízeseknél / kétszer / 0 a tízeseknél
// ---------------------------------------------------------------------------
type Kind = 'nincs' | 'egyes' | 'tizes' | 'mindketto' | 'nulla';
const KIND_LABEL: Record<Kind, string> = {
  nincs: 'Felváltás nélkül',
  egyes: 'Felváltás az egyeseknél',
  tizes: 'Felváltás a tízeseknél',
  mindketto: 'Kétszer felváltunk',
  nulla: '0 a tízeseknél'
};
const kindOf = (a: number, b: number): Kind => {
  const s = subSteps(a, b);
  if (s[1].digit === 0 && s[0].exchanged) return 'nulla';
  if (s[0].exchanged && s[1].exchanged) return 'mindketto';
  if (s[0].exchanged) return 'egyes';
  if (s[1].exchanged) return 'tizes';
  return 'nincs';
};
const makeSubPair = (kind: Kind): [number, number] => {
  for (;;) {
    const a = kind === 'nulla' ? rnd(2, 4) * 100 + rnd(0, 9) : rnd(201, 499);
    const b = rnd(101, 389);
    if (a - b < 10) continue;
    if (kind !== 'nulla' && (Math.floor(a / 10) % 10 === 0 || a % 10 === 0)) continue;
    if (kindOf(a, b) === kind) return [a, b];
  }
};
const randomKind = (): Kind => (['nincs', 'egyes', 'tizes', 'mindketto', 'nulla'] as Kind[])[[0, 1, 1, 2, 2, 3, 3, 4][rnd(0, 7)]];

const KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const KeyPad: React.FC<{ onKey: (d: number) => void; bad?: number | null; disabled?: boolean }> = ({ onKey, bad, disabled }) => (
  <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
    {KEYS.map((d) => (
      <button
        key={d}
        disabled={disabled}
        onClick={() => onKey(d)}
        className={`min-h-[52px] rounded-xl text-2xl font-black border-2 transition-colors ${bad === d ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'} disabled:opacity-40`}
      >
        {d}
      </button>
    ))}
  </div>
);

/** Kell-e kérdezni a felváltást ebben az oszlopban? (A 0-s tízesnél a tízesek már fel vannak váltva.) */
const isZeroTens = (s: SubStep[]) => s[1].digit === 0 && s[0].exchanged;
const needAsk = (s: SubStep[], col: number) => col < 2 && s[col].exchanged && !(col === 1 && isZeroTens(s));

// ---------------------------------------------------------------------------
// Labor II – Hibavadász
// ---------------------------------------------------------------------------
type Mistake = 'jo' | 'felejt' | 'fordit' | 'szazas';
interface Hunt { a: number; b: number; r: number; mistake: Mistake }
const noBorrow = (a: number, b: number) => subSteps(a, b).reduce((s, st) => s + (st.exchanged ? st.digit + 10 - st.need : st.digit - st.need) * 10 ** st.col, 0);
const swapped = (a: number, b: number) => [0, 1, 2].reduce((s, c) => s + Math.abs((Math.floor(a / 10 ** c) % 10) - (Math.floor(b / 10 ** c) % 10)) * 10 ** c, 0);
const makeHunt = (): Hunt => {
  for (;;) {
    const [a, b] = makeSubPair(randomKind());
    const ok = a - b;
    const m = (['jo', 'jo', 'felejt', 'fordit', 'szazas'] as Mistake[])[rnd(0, 4)];
    let r = ok;
    if (m === 'felejt') r = noBorrow(a, b);
    if (m === 'fordit') r = swapped(a, b);
    if (m === 'szazas') r = ok + (rnd(0, 1) ? 100 : -100);
    if (m !== 'jo' && (r === ok || r < 0 || r > 999)) continue;
    return { a, b, r, mistake: m };
  }
};

const Btn: React.FC<{ children: React.ReactNode; onClick: () => void; state?: 'ok' | 'bad' | null; color?: string }> = ({ children, onClick, state, color = 'bg-white border-slate-300 text-slate-800' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-base font-black min-h-[52px] min-w-[80px] border-2 transition-colors ${state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : color}`}
  >
    {children}
  </button>
);

export const WrittenSubG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: lépésről lépésre ----
  const [kind, setKind] = useState<Kind>('mindketto');
  const [pair, setPair] = useState<[number, number]>([364, 178]);
  const [col, setCol] = useState(0); // aktuális oszlop; 3 = kész
  const [exNow, setExNow] = useState(false); // felváltottunk-e már az aktuális oszlopban
  const [phase, setPhase] = useState<'ask' | 'digit' | 'check' | 'done'>('ask');
  const [bad, setBad] = useState<number | null>(null);
  const [hint, setHint] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [marks, setMarks] = useState(true);
  const [demo, setDemo] = useState(false);
  const [checkOpts, setCheckOpts] = useState<number[]>([]);
  const [checkBad, setCheckBad] = useState<number | null>(null);
  const [a, b] = pair;
  const steps = subSteps(a, b);
  const diff = a - b;
  const zero = isZeroTens(steps);
  const startPhase = (c: number) => (c >= 3 ? 'check' : needAsk(steps, c) || c < 2 ? 'ask' : 'digit');
  const reset = (p: [number, number]) => {
    setPair(p);
    setCol(0);
    setExNow(false);
    setPhase('ask');
    setBad(null);
    setHint('');
    setLog([]);
    setCheckBad(null);
    setCheckOpts(shuffle([p[0], p[0] + 10, p[0] - 10 > p[1] ? p[0] - 10 : p[0] + 100]));
  };
  const newTask = (k: Kind = kind) => {
    setKind(k);
    setDemo(false);
    reset(makeSubPair(k));
  };
  useEffect(() => {
    setCheckOpts(shuffle([a, a + 10, a + 100]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // felváltás megtörtént-e a j-edik oszlopban (a 0-s tízes az egyesekkel együtt váltódik)
  const exDone = (j: number): boolean => {
    if (j === 1 && zero) return exDone(0);
    return steps[j]?.exchanged && (j < col || (j === col && exNow));
  };
  const discs = [0, 1, 2].map((i) => steps[i].digit + (exDone(i) ? 10 : 0) - (i > 0 && exDone(i - 1) ? 1 : 0));
  const crossed = [0, 1, 2].map((i) => (i < col ? steps[i].need : 0));
  const freshD = [0, 1, 2].map((i) => (i === col && exNow ? 10 : zero && i === 1 && col === 0 && exNow ? 9 : 0));
  const exMarks: ColDigit[] = [0, 1, 2].map((i) => {
    const s = steps[i];
    if (!marks) return null;
    if (i === 1 && zero && exDone(0)) return 9;
    if (i < col) return s.exchanged || s.borrowIn ? s.top : null;
    if (i === col) return exNow ? s.top : s.borrowIn ? s.avail : null;
    return null;
  });
  const resultStr = String(diff)
    .padStart(3, ' ')
    .split('')
    .map((ch, i) => (2 - i < col ? ch : ' '))
    .join('');

  const doExchange = () => {
    setExNow(true);
    setPhase('digit');
    setHint('');
    setBad(null);
  };
  const writeDigit = (c: number) => {
    const st = steps[c];
    const extra = !st.exchanged && !st.borrowIn ? ` Pótlással: ${fillUpText(st)}` : '';
    setLog((l) => [...l, `${c + 1}. lépés (${placePlural(c)}): ${spokenSubStep(st, steps)}${extra}`]);
    const next = c + 1;
    setCol(next);
    setExNow(false);
    setPhase(startPhase(next));
    setBad(null);
    setHint('');
  };
  const answerAsk = (yes: boolean) => {
    if (phase !== 'ask' || demo) return;
    const st = steps[col];
    const must = needAsk(steps, col);
    const have = col === 1 && zero ? 9 : st.avail;
    if (yes === must) {
      if (yes) doExchange();
      else {
        setPhase('digit');
        setHint(col === 1 && zero ? 'Jó! A tízeseket már felváltottuk: 9 tízes van.' : '');
      }
      return;
    }
    if (must) setHint(`Nézd meg: ${st.avail} ${['egyesből', 'tízesből'][col]} nem lehet ${st.need}-${suffixA(st.need)} elvenni! Fel kell váltani.`);
    else setHint(`Van elég: ${have} ≥ ${st.need}. Most nem kell felváltani.`);
  };
  const press = (d: number) => {
    if (phase !== 'digit' || demo) return;
    const st = steps[col];
    if (d === st.write) {
      writeDigit(col);
      return;
    }
    setBad(d);
    if (st.exchanged && d === st.need - st.avail) setHint(`Nem fordítva! A felső számból veszel el: ${st.top} − ${st.need} = ?`);
    else if (st.borrowIn && st.digit >= st.need && d === st.digit - st.need) setHint(`Ne felejtsd el: a felváltott 1-et el kell venni! ${st.digit} − 1 = ${st.avail}, és ${st.avail} − ${st.need} = ?`);
    else setHint(`Számold ki: ${st.top} − ${st.need} = ?`);
  };
  const pickCheck = (v: number) => {
    if (phase !== 'check') return;
    if (v === a) {
      setPhase('done');
      setCheckBad(null);
      return;
    }
    setCheckBad(v);
  };
  // bemutató: magától végigmegy
  useEffect(() => {
    if (!demo) return;
    if (col >= 3) {
      setDemo(false);
      return;
    }
    const t = window.setTimeout(
      () => {
        if (needAsk(steps, col) && !exNow) doExchange();
        else writeDigit(col);
      },
      col === 0 && !exNow ? 700 : 1500
    );
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo, col, exNow]);
  const startDemo = () => {
    reset(pair);
    setDemo(true);
  };

  // ---- Labor II: hibavadász ----
  const [hunt, setHunt] = useState<Hunt>({ a: 372, b: 145, r: 237, mistake: 'felejt' });
  const [hStage, setHStage] = useState<'judge' | 'fix' | 'done'>('judge');
  const [hMsg, setHMsg] = useState('');
  const [hBad, setHBad] = useState<string | number | null>(null);
  const [hOpts, setHOpts] = useState<number[]>(shuffle([227, 237, 233, 327]));
  const [streak, setStreak] = useState(0);
  const okH = hunt.a - hunt.b;
  const newHunt = () => {
    const h = makeHunt();
    setHunt(h);
    setHStage('judge');
    setHMsg('');
    setHBad(null);
    const ok = h.a - h.b;
    setHOpts(shuffle(Array.from(new Set([ok, h.r === ok ? ok + 10 : h.r, noBorrow(h.a, h.b) === ok ? ok + 100 : noBorrow(h.a, h.b), swapped(h.a, h.b) === ok ? ok - 10 : swapped(h.a, h.b)]))));
  };
  const judge = (good: boolean) => {
    if (hStage !== 'judge') return;
    const isGood = hunt.r === okH;
    if (good === isGood) {
      setHBad(null);
      if (isGood) {
        setHStage('done');
        setStreak((s) => s + 1);
        setHMsg(`Igazad van! Ellenőrzés: ${hunt.r} + ${hunt.b} = ${hunt.a}. Megkaptuk a kisebbítendőt.`);
      } else {
        setHStage('fix');
        setHMsg(`Igen, hibás! Ellenőrzés: ${hunt.r} + ${hunt.b} = ${hunt.r + hunt.b}, nem ${hunt.a}. Mennyi a jó eredmény?`);
      }
      return;
    }
    setHBad(good ? 'jo' : 'rossz');
    setStreak(0);
    setHMsg(`Ellenőrizd összeadással: ${hunt.r} + ${hunt.b} = ? Ha ${hunt.a} jön ki, jó a kivonás.`);
  };
  const fix = (v: number) => {
    if (hStage !== 'fix') return;
    if (v === okH) {
      setHStage('done');
      setHBad(null);
      setStreak((s) => s + 1);
      const why = hunt.mistake === 'felejt' ? 'A hiba: elfelejtette elvenni a felváltott 1-et.' : hunt.mistake === 'fordit' ? 'A hiba: a kisebb jegyből vonta ki a nagyobbat, fordítva.' : 'A hiba: a százasoknál tévedett.';
      setHMsg(`Szuper! ${hunt.a} − ${hunt.b} = ${okH}. ${why}`);
      return;
    }
    setHBad(v);
    setStreak(0);
    setHMsg('Számold ki lépésről lépésre, az egyesekkel kezdve!');
  };

  const cw = [80, 130, 130];
  const xs = [70, 150, 280];

  return (
    <TheoryTemplate
      topicId="g3-written-subtraction"
      subtopicId="irasbeli-kivonas"
      grade={3}
      chapterId="irasbeli-kivonas"
      title="3. Írásbeli kivonás"
      subtitle="Helyi érték szerint egymás alá, az egyesekkel kezdve; felváltás, pótlás, ellenőrzés összeadással."
      badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • TANANYAG"
      themeColor="blue"
      pdfFilename="3_osztaly_irasbeli_kivonas_tananyag.pdf"
      practiceTitle="Készen állsz? Vonjunk ki írásban!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — ÍRÁSBELI KIVONÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-base font-black text-blue-900 dark:text-blue-200">
              2 egyesből nem lehet 5-öt elvenni → felváltok 1 tízest: 12 − 5 = 7
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Írd a számokat helyi érték szerint <strong>egymás alá</strong>!</li>
              <li>Kezdd az <strong>egyesekkel</strong>, aztán tízesek, végül százasok.</li>
              <li>Ha kevés van, <strong>válts fel</strong> 1-et a következő helyi értékről. Ott utána vedd el a felváltott 1-et!</li>
              <li>Ellenőrizz <strong>összeadással</strong>: különbség + kivonandó = kisebbítendő.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 89–93. o." badgeColor="blue">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Háromjegyű számokat vonunk ki <strong>írásban</strong>. Így nagy számokkal is biztosan megy.</p>
          <p><strong>kisebbítendő − kivonandó = különbség</strong>. A kisebbítendő van felül, a kivonandó alatta.</p>
          <p>Sorrend: <strong>becslés → számítás → ellenőrzés</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Felváltás nélkül" badge="486 − 253" badgeColor="emerald">
        <StepsNoExchangeSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Becslés: 490 − 250 = 240. Számítás: az egyesekkel kezdünk. 6 − 3 = 3, 8 − 5 = 3, 4 − 2 = 2. A különbség <strong>233</strong>. Közel van a becsléshez.
        </p>
      </TheorySection>

      <TheorySection title="3. Számolhatsz pótlással is" badge="Mennyi kell még?" badgeColor="teal">
        <FillUpStepsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Ne azt kérdezd, mennyi marad, hanem hogy <strong>mennyit kell adni</strong> a kivonandóhoz: 3 egyeshez 3 egyest kell adni, hogy 6 egyes legyen. 5 tízeshez 3 tízest, hogy 8 legyen. 2 százashoz 2 százast, hogy 4 legyen.
        </p>
      </TheorySection>

      <TheorySection title="4. Felváltás az egyeseknél" badge="372 − 145" badgeColor="sky">
        <ExchangeOnesSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li><strong>1. lépés:</strong> 2 egyesből nem tudunk 5 egyest elvenni. 1 tízest felváltunk 10 egyesre: 12 egyes. 12 − 5 = 7.</li>
          <li><strong>2. lépés:</strong> a kisebbítendőből elvesszük a felváltott 1 tízest: 7 − 1 = 6 tízes. 6 − 4 = 2.</li>
          <li><strong>3. lépés:</strong> 3 − 1 = 2 százas. A különbség <strong>227</strong>.</li>
        </ul>
        <TheoryCallout type="info" title="A zöld számok">
          A tankönyv a felváltást nem írja az oszlopba, csak fejben számol vele. Nálunk az elején zöld kis számok segítenek (12 és 6). Ha már megy, hagyd el őket!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Felváltás a tízeseknél" badge="428 − 175" badgeColor="purple">
        <ExchangeTensSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>8 − 5 = 3 egyes.</li>
          <li>2 tízesből nem tudunk 7-et elvenni. 1 százast felváltunk 10 tízesre: 12 tízes. 12 − 7 = 5.</li>
          <li>Elvesszük a felváltott százast: 4 − 1 = 3. 3 − 1 = 2. A különbség <strong>253</strong>.</li>
        </ul>
      </TheorySection>

      <TheorySection title="6. Kétszer is felváltunk" badge="421 − 186" badgeColor="amber">
        <ExchangeBothSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>1 egyesből nem lehet 6-ot elvenni: 11 − 6 = 5.</li>
          <li>2 − 1 = 1 tízes maradt. 1-ből nem lehet 8-at elvenni: 11 − 8 = 3.</li>
          <li>4 − 1 = 3 százas. 3 − 1 = 2. A különbség <strong>235</strong>.</li>
        </ul>
      </TheorySection>

      <TheorySection title="7. Ha 0 van a tízesek helyén" badge="403 − 157" badgeColor="rose">
        <ZeroTensSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          3 egyesből nem lehet 7-et elvenni, de tízes sincs! Ezért <strong>1 százast felváltunk 9 tízesre és 10 egyesre</strong>. 13 − 7 = 6. 9 − 5 = 4. 3 − 1 = 2. A különbség <strong>246</strong>.
        </p>
      </TheorySection>

      <TheorySection title="8. Ellenőrzés" badge="Összeadással" badgeColor="emerald">
        <CheckSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Add össze a különbséget és a kivonandót! Ha a <strong>kisebbítendőt</strong> kapod, jól számoltál. Kivonással is ellenőrizhetsz: 372 − 227 = 145.
        </p>
      </TheorySection>

      <TheorySection title="9. Nézzük meg együtt!" badge="Szöveges feladat" badgeColor="purple">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p><strong>A moziteremben 364 szék van. 178 néző ül le. Hány szék marad üresen?</strong></p>
        </div>
        <WordPlanSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Számítás" badge="364 − 178" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>4 − 8 nem megy: 14 − 8 = 6.</li>
              <li>6 − 1 = 5 tízes. 5 − 7 nem megy: 15 − 7 = 8.</li>
              <li>3 − 1 = 2 százas. 2 − 1 = 1. Eredmény: 186.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Ellenőrzés" badge="186 + 178" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>186 + 178 = 364. Jó!</li>
              <li>A 186 közel van a becsült 180-hoz.</li>
              <li>Válasz: <strong>186 szék marad üresen.</strong></li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="10. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="372 − 145"
          wrong="372 − 145 = 233"
          wrongExplanation="Az egyeseknél az 5-ből vonta ki a 2-t. De mindig a felső számból kell elvenni!"
          correct="372 − 145 = 227"
          correctExplanation="2 egyesből nem megy, ezért felváltunk: 12 − 5 = 7. Aztán 6 − 4 = 2, és 3 − 1 = 2."
          tip="Felülről vonunk ki, nem alulról!"
        />
        <TheoryCallout type="warning" title="Ne felejtsd el a felváltott 1-et!">
          372 − 145 nem 237! Ha az egyeseknél felváltottál 1 tízest, a tízeseknél már csak 6 tízes van, nem 7.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="11. Labor I: Lépésről lépésre" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newTask(kind)} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={startDemo} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-bold min-h-[48px]">Mutasd meg!</button>
            <button onClick={() => setMarks((m) => !m)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${marks ? 'bg-emerald-100 border-emerald-500 text-emerald-900' : 'bg-white border-slate-300 text-slate-700'}`}>Zöld segítség: {marks ? 'be' : 'ki'}</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(KIND_LABEL) as Kind[]).map((k) => (
              <button key={k} onClick={() => newTask(k)} className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold min-h-[44px] border-2 ${kind === k ? 'bg-blue-100 border-blue-500 text-blue-900' : 'bg-white border-slate-300 text-slate-700'}`}>{KIND_LABEL[k]}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <WrittenSubG3Column minuend={a} subtrahend={b} result={resultStr} exchanges={exMarks} exchangeRow highlight={col < 3 ? col : null} className="w-full max-w-[220px] h-auto mx-auto" />
            <svg viewBox="0 0 420 150" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
              <rect x="1" y="1" width="418" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
              {[0, 1, 2].map((i) => {
                const pr = 2 - i; // jobbról számolt helyi érték
                return (
                  <g key={i}>
                    <rect x={xs[i]} y={8} width={cw[i]} height={20} fill={PLACE_FILL[i]} stroke="#fff" />
                    <text x={xs[i] + cw[i] / 2} y={23} textAnchor="middle" fontSize="13" fontWeight="bold" fill={PLACE_TEXT[i]}>{['sz', 't', 'e'][i]}</text>
                    <rect x={xs[i]} y={28} width={cw[i]} height={114} fill={PLACE_BODY[i]} opacity="0.6" stroke={col === pr ? '#7c3aed' : '#fff'} strokeWidth={col === pr ? 3 : 1} />
                    <DiscCell x={xs[i]} y={36} w={cw[i]} n={discs[pr]} place={i as 0 | 1 | 2} r={i === 0 ? 7 : 6.5} crossed={crossed[pr]} fresh={freshD[pr]} perRow={i === 0 ? 4 : 7} />
                  </g>
                );
              })}
              <text x="62" y="60" textAnchor="end" fontSize="14" fontWeight="bold" fill="#0f172a">{a}</text>
              <text x="62" y="80" textAnchor="end" fontSize="13" fontWeight="bold" fill="#dc2626">− {b}</text>
            </svg>
          </div>
          {phase === 'ask' && !demo && (
            <div className="space-y-2">
              <div className="bg-blue-50 rounded-xl p-3 text-center text-blue-900 font-bold">
                {placePlural(col)[0].toUpperCase() + placePlural(col).slice(1)}: {steps[col].borrowIn && !(col === 1 && zero) ? `előbb elveszed a felváltott 1-et (${steps[col].digit} − 1 = ${steps[col].avail}). ` : ''}
                {col === 1 && zero ? 9 : steps[col].avail} − {steps[col].need}: kell felváltani?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Btn onClick={() => answerAsk(true)} color="bg-emerald-50 border-emerald-400 text-emerald-900">Igen, felváltok</Btn>
                <Btn onClick={() => answerAsk(false)} color="bg-white border-slate-300 text-slate-800">Nem kell</Btn>
              </div>
            </div>
          )}
          {phase === 'digit' && !demo && (
            <div className="space-y-2">
              <div className="bg-blue-50 rounded-xl p-3 text-center text-blue-900 font-bold">
                {placePlural(col)[0].toUpperCase() + placePlural(col).slice(1)}: {steps[col].top} − {steps[col].need} = ? Melyik számjegyet írod le?
              </div>
              <KeyPad onKey={press} bad={bad} />
            </div>
          )}
          {hint && <div className="rounded-xl p-3 text-center text-sm font-bold bg-amber-100 text-amber-900">{hint}</div>}
          {log.length > 0 && (
            <ol className="space-y-1 text-sm text-slate-700 bg-slate-50 rounded-xl p-3">
              {log.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ol>
          )}
          {(phase === 'check' || phase === 'done') && (
            <div className="space-y-2">
              <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">
                {a} − {b} = {diff}. Most ellenőrizz összeadással! {diff} + {b} = ?
              </div>
              <WrittenSubG3Column op="+" minuend={diff} subtrahend={b} result={phase === 'done' ? a : '???'} header={false} className="w-full max-w-[150px] h-auto mx-auto" />
              {phase === 'check' && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {checkOpts.map((v) => (
                    <Btn key={v} onClick={() => pickCheck(v)} state={checkBad === v ? 'bad' : null}>{v}</Btn>
                  ))}
                </div>
              )}
              {checkBad !== null && phase === 'check' && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">Add össze írásban: egyesek, tízesek, százasok!</div>}
              {phase === 'done' && <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">Megkaptad a kisebbítendőt ({a}), tehát jól számoltál! Kérj új feladatot!</div>}
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="12. Labor II: Hibavadász" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newHunt} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-orange-800 bg-orange-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">Egy gyerek így számolt. Jó vagy hibás? Ellenőrizd összeadással!</div>
          <WrittenSubG3Column minuend={hunt.a} subtrahend={hunt.b} result={hunt.r} header={false} className="w-full max-w-[170px] h-auto mx-auto" />
          {hStage === 'judge' && (
            <div className="flex flex-wrap gap-2 justify-center">
              <Btn onClick={() => judge(true)} state={hBad === 'jo' ? 'bad' : null} color="bg-emerald-50 border-emerald-400 text-emerald-900">Jó</Btn>
              <Btn onClick={() => judge(false)} state={hBad === 'rossz' ? 'bad' : null} color="bg-rose-50 border-rose-400 text-rose-900">Hibás</Btn>
            </div>
          )}
          {hStage === 'fix' && (
            <div className="flex flex-wrap gap-2 justify-center">
              {hOpts.map((v) => (
                <Btn key={v} onClick={() => fix(v)} state={hBad === v ? 'bad' : null}>{v}</Btn>
              ))}
            </div>
          )}
          {hMsg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${hStage === 'done' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{hMsg}</div>}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenSubG3Theory;
