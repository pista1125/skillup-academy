import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { ExamThermoSvg, ExamLineSvg, ExamBuildingSvg, ExamOrderSvg, ExamChangeSvg, ExamTwoPartsSvg } from './NegExamG3Figures';
import { ThermoSvg, NLSvg, ChangeThermoSvg, TempCardsSvg, fmt, fmtC, changeText } from './NegExamG3Parts';
import { makeReadOptions } from '../osszehasonlitas-es-valtozasok/NegChangesG3Theory';

const rnd = (n: number) => Math.floor(Math.random() * n);
const between = (a: number, b: number) => a + rnd(b - a + 1);
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const nonZero = (a: number, b: number) => {
  for (;;) {
    const v = between(a, b);
    if (v !== 0) return v;
  }
};
/** 4 különböző válasz: a helyes + az első 3 különböző, a helyestől eltérő jelölt */
const four = (answer: string, candidates: string[]): string[] => {
  const out = [answer];
  for (const c of candidates) if (!out.includes(c) && out.length < 4) out.push(c);
  return shuffle(out);
};

// ---------------------------------------------------------------------------
// Labor I – Vegyes feladatok
// ---------------------------------------------------------------------------
export type ExamKind = 'read' | 'line' | 'colder' | 'change' | 'result';
export const EXAM_KINDS: ExamKind[] = ['read', 'line', 'colder', 'change', 'result'];
export const KIND_NAMES: Record<ExamKind, string> = { read: 'Hőmérő', line: 'Számegyenes', colder: 'Hidegebb', change: 'Hány fokkal?', result: 'Mennyi lett?' };

export interface ExamTask {
  kind: ExamKind;
  text: string;
  /** a feladat számai */
  a: number;
  b: number;
  answer: string;
  options: string[];
  hint: string;
}

export const makeExamTask = (kind: ExamKind): ExamTask => {
  switch (kind) {
    case 'read': {
      const v = nonZero(-12, 12);
      return {
        kind,
        text: 'Hány °C-ot mutat a hőmérő?',
        a: v,
        b: 0,
        answer: fmtC(v),
        options: four(fmtC(v), [fmtC(-v), fmtC(v + 1), fmtC(v - 1), fmtC(v + 2)]),
        hint: v < 0 ? 'Az oszlop teteje a 0 alatt van: mínuszt írunk elé. Keresd a legközelebbi kiírt számot, onnan számolj!' : 'Az oszlop teteje a 0 fölött van. Keresd a legközelebbi kiírt számot, onnan számolj!'
      };
    }
    case 'line': {
      const v = nonZero(-9, 9);
      return {
        kind,
        text: 'Melyik számot mutatja a nyíl?',
        a: v,
        b: 0,
        answer: fmt(v),
        options: four(fmt(v), [fmt(-v), fmt(v + 1), fmt(v - 1), fmt(v + 2), fmt(v - 2), fmt(v + 3)].filter((s) => s !== '0')),
        hint: v < 0 ? 'A nyíl a 0-tól balra van: mínuszos szám. Számold a lépéseket a 0-tól vagy a –5-től!' : 'A nyíl a 0-tól jobbra van. Számold a lépéseket a 0-tól vagy az 5-től!'
      };
    }
    case 'colder': {
      for (;;) {
        const a = between(-12, 6);
        const b = between(-12, 6);
        if (a === b || (a >= 0 && b >= 0)) continue;
        const lo = Math.min(a, b);
        return {
          kind,
          text: 'Melyik a hidegebb?',
          a,
          b,
          answer: fmtC(lo),
          options: shuffle([fmtC(lo), fmtC(Math.max(a, b)), 'egyforma hideg', 'nem lehet eldönteni']),
          hint: 'Az a hidegebb, amelyik lejjebb van a hőmérőn. A mínuszosak közül az, amelyik messzebb van a 0-tól!'
        };
      }
    }
    case 'change': {
      for (;;) {
        const a = between(-9, 9);
        const b = between(-9, 9);
        if (Math.abs(a - b) < 2) continue;
        return {
          kind,
          text: `${fmtC(a)}-ról ${fmtC(b)}-ra változott. Mi történt?`,
          a,
          b,
          answer: changeText(a, b),
          options: makeReadOptions(a, b),
          hint: a * b < 0 ? `Átléptél a 0-n: ${Math.abs(a)} fok a 0-ig, aztán még ${Math.abs(b)} fok.` : 'Fölfelé: melegedett, lefelé: hűlt. Számold a lépéseket!'
        };
      }
    }
    case 'result':
    default: {
      for (;;) {
        const s = nonZero(-8, 8);
        const k = between(2, 9);
        const up = Math.random() < 0.5;
        const e = up ? s + k : s - k;
        if (e < -10 || e > 10) continue;
        const wrong = up ? s - k : s + k;
        return {
          kind: 'result',
          text: `${fmtC(s)} volt. ${up ? 'Melegedett' : 'Hűlt'} ${k} fokkal. Hány fok lett?`,
          a: s,
          b: e,
          answer: fmtC(e),
          options: four(fmtC(e), [fmtC(wrong), e !== 0 ? fmtC(-e) : fmtC(e + 2), fmtC(e + 1), fmtC(e - 1)]),
          hint: `${up ? 'Melegedett: fölfelé' : 'Hűlt: lefelé'} lépj ${k} fokot! Ha átléped a 0-t, számolj két részben.`
        };
      }
    }
  }
};
const FIRST_TASK: ExamTask = {
  kind: 'change',
  text: '–3 °C-ról 4 °C-ra változott. Mi történt?',
  a: -3,
  b: 4,
  answer: 'melegedett 7 fokkal',
  options: ['melegedett 1 fokkal', 'hűlt 7 fokkal', 'melegedett 7 fokkal', 'hűlt 1 fokkal'],
  hint: 'Átléptél a 0-n: 3 fok a 0-ig, aztán még 4 fok.'
};

const TaskFigure: React.FC<{ t: ExamTask }> = ({ t }) => {
  switch (t.kind) {
    case 'read':
      return <ThermoSvg min={-15} max={15} value={t.a} labelStep={5} h={180} className="w-32 h-auto mx-auto" />;
    case 'line':
      return <NLSvg from={-10} to={10} labels={[-5, 0, 5]} arrows={[{ v: t.a, text: '?' }]} className="w-full max-w-md h-auto mx-auto" />;
    case 'colder':
      return <TempCardsSvg values={[t.a, t.b]} className="w-full max-w-[180px] h-auto mx-auto" />;
    case 'change':
      return <ChangeThermoSvg from={t.a} to={t.b} min={-10} max={10} arrowText="? fok" className="w-full max-w-[280px] h-auto mx-auto" />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
// Labor II – Időjárás-napló (reggel → dél → este)
// ---------------------------------------------------------------------------
export interface Diary {
  r: number;
  k1: number;
  k2: number;
}
export const diaryNoon = (d: Diary) => d.r + d.k1;
export const diaryEvening = (d: Diary) => d.r + d.k1 - d.k2;
export const makeDiary = (): Diary => {
  for (;;) {
    const r = between(-7, 4);
    const k1 = between(2, 8);
    const k2 = between(3, 10);
    const n = r + k1;
    const e = n - k2;
    if (n > 10 || e < -10) continue;
    // legalább egyszer átlépjük a 0-t
    if (!(r < 0 && n > 0) && !(n > 0 && e < 0)) continue;
    return { r, k1, k2 };
  }
};
const FIRST_DIARY: Diary = { r: -4, k1: 7, k2: 5 };

const btn = 'px-3 py-3 rounded-xl font-bold text-base min-h-[52px] border-2 transition-colors';

const Stepper: React.FC<{ value: number; onChange: (v: number) => void; state: 'none' | 'ok' | 'bad' }> = ({ value, onChange, state }) => (
  <div className={`flex items-center gap-2 rounded-xl p-1 border-2 ${state === 'ok' ? 'border-emerald-500 bg-emerald-50' : state === 'bad' ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white'}`}>
    <button onClick={() => onChange(Math.max(-15, value - 1))} className="w-11 h-11 rounded-lg bg-sky-100 text-sky-800 font-black text-xl" aria-label="hidegebb">
      ▼
    </button>
    <span className="w-20 text-center text-xl font-black text-slate-800">{fmtC(value)}</span>
    <button onClick={() => onChange(Math.min(15, value + 1))} className="w-11 h-11 rounded-lg bg-orange-100 text-orange-800 font-black text-xl" aria-label="melegebb">
      ▲
    </button>
  </div>
);

export const NegExamG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [kind, setKind] = useState<ExamKind | 'mix'>('mix');
  const [task, setTask] = useState<ExamTask>(FIRST_TASK);
  const [ans, setAns] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const ok1 = ans === task.answer;
  const next = (k: ExamKind | 'mix' = kind) => {
    const kk = k === 'mix' ? EXAM_KINDS[rnd(EXAM_KINDS.length)] : k;
    setTask(makeExamTask(kk));
    setAns(null);
  };

  // Labor II
  const [d, setD] = useState<Diary>(FIRST_DIARY);
  const [noon, setNoon] = useState(FIRST_DIARY.r);
  const [eve, setEve] = useState(FIRST_DIARY.r);
  const [checked, setChecked] = useState(false);
  const noonOk = noon === diaryNoon(d);
  const eveOk = eve === diaryEvening(d);
  const fb2 = (): string => {
    if (!checked) return '';
    if (noonOk && eveOk) return `Szuper! Délben ${fmtC(diaryNoon(d))}, este ${fmtC(diaryEvening(d))} volt.`;
    if (!noonOk) return `Délben: ${fmtC(d.r)}-tól lépj ${d.k1} fokot fölfelé!`;
    return `Este: a déli ${fmtC(diaryNoon(d))}-tól lépj ${d.k2} fokot lefelé!${diaryNoon(d) > 0 && diaryEvening(d) < 0 ? ' A 0-n átlépsz: számolj két részben!' : ''}`;
  };

  return (
    <TheoryTemplate
      topicId="g3-negative-numbers"
      subtopicId="gyakorlas-tudasproba"
      grade={3}
      chapterId="negativ-szamok"
      title="4. Gyakorlás, tudáspróba"
      subtitle="Hőmérő, számegyenes, hidegebb–melegebb, változások – minden együtt"
      badge="3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="3_osztaly_negativ_szamok_tudasproba_tananyag.pdf"
      practiceTitle="Jöhet a tudáspróba!"
      practiceSubtitle="90 feladat 3 szinten a negatív számokról."
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AMIT MÁR TUDSZ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center text-sm font-black text-indigo-900 dark:text-indigo-200">
              0 alatt / 0-tól balra: mínuszos számok. –3 °C: mínusz három celziusz-fok.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>0 °C a fagypont. A földszint és a vízfelszín is 0.</li>
              <li>Lejjebb = hidegebb = kisebb: –6 °C &lt; –1 °C.</li>
              <li>Fölfelé: melegedett, lefelé: hűlt. A 0-n át: két részben.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Amit már tudsz: a hőmérő" badge="1. lecke" badgeColor="indigo">
        <ExamThermoSvg />
        <p className="text-sm text-slate-700">
          A hőmérséklet jele °C. A <strong>0 °C a fagypont</strong>. A 0 alatti hőmérséklet elé mínuszt írunk: –6 °C.
        </p>
      </TheorySection>

      <TheorySection title="2. Amit már tudsz: a 0 máshol is határ" badge="lift, búvár" badgeColor="blue">
        <ExamBuildingSvg />
        <p className="text-sm text-slate-700">
          A liftben a <strong>földszint a 0</strong>, a föld alatti szintek –1, –2. A búvárnál a <strong>vízfelszín a 0 m</strong>, alatta –1 m, –2 m …
        </p>
      </TheorySection>

      <TheorySection title="3. Amit már tudsz: a számegyenes" badge="2. lecke" badgeColor="emerald">
        <ExamLineSvg />
        <p className="text-sm text-slate-700">
          A 0-tól jobbra 1, 2, 3 …, balra –1, –2, –3 … A lépéseket a 0-tól számoljuk – a 0 nem lépés. A hőmérő álló számegyenes.
        </p>
      </TheorySection>

      <TheorySection title="4. Amit már tudsz: hidegebb, melegebb, sorrend" badge="3. lecke" badgeColor="rose">
        <ExamOrderSvg />
        <p className="text-sm text-slate-700">
          A <strong>–9 °C hidegebb</strong>, mint a –4 °C, mert lejjebb van. Növekvő sorrend: a leghidegebbtől. Csökkenő: a legmelegebbtől.
        </p>
      </TheorySection>

      <TheorySection title="5. Amit már tudsz: hány fokkal változott?" badge="3. lecke" badgeColor="amber">
        <ExamChangeSvg />
        <p className="text-sm text-slate-700">
          –3 °C → 6 °C: 3 fok a 0-ig, aztán még 6 fok. 3 + 6 = 9. <strong>Melegedett 9 fokkal.</strong>
        </p>
        <ExamTwoPartsSvg />
        <TheoryCallout type="tip" title="Ugyanez a számegyenesen">
          –4-től 5-ig: 4 lépés a 0-ig, 5 lépés tovább. Összesen 9 lépés. Liftnél és búvárnál is így számolunk.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) A lift a 2. emeletről a –3. szintre megy" badge="lift" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>2-től a 0-ig: 2 szint.</li>
              <li>0-tól a –3-ig: 3 szint.</li>
              <li>
                2 + 3 = <strong>5 szintet megy le.</strong>
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Reggel –5 °C. Délig melegedett 8, estére hűlt 6 fokkal" badge="két lépés" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Délben: –5-től fölfelé 8 fok: 5 a 0-ig, még 3: 3 °C.</li>
              <li>Este: 3-tól lefelé 6 fok: 3 a 0-ig, még 3.</li>
              <li>
                Este <strong>–3 °C</strong> volt.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Rendezd: 2, –8, 0, –3" badge="sorrend" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Előbb a mínuszosak: –8 a hidegebb, aztán –3.</li>
              <li>Utána a 0, végül a 2.</li>
              <li>
                Növekvő: <strong>–8, –3, 0, 2</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapdák" badgeColor="rose">
        <TheoryTrapBox
          title="A –2 nem a 2"
          wrong="Reggel –2 °C, délben 6 °C. 6 – 2 = 4, tehát 4 fokkal melegedett."
          wrongExplanation="A –2 a 0 alatt van, nem a 0 fölött!"
          correct="2 fok a 0-ig, aztán 6 fok. 2 + 6 = 8. Melegedett 8 fokkal."
          correctExplanation="Ha átlépsz a 0-n, a két részt összeadod."
          tip="Lépkedj az ujjaddal a hőmérőn!"
        />
        <TheoryCallout type="warning" title="A nagyobb szám, mégis hidegebb">
          A –9 °C hidegebb, mint a –4 °C. A 0 °C nem fagypont alatti: éppen a fagypont.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Vegyes feladatok" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {(['mix', ...EXAM_KINDS] as const).map((k) => (
              <button
                key={k}
                onClick={() => {
                  setKind(k);
                  next(k);
                }}
                className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[44px] border-2 ${kind === k ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-indigo-800 border-indigo-300'}`}
              >
                {k === 'mix' ? 'Vegyes' : KIND_NAMES[k]}
              </button>
            ))}
          </div>
          <p className="text-lg font-black text-indigo-900 text-center">{task.text}</p>
          <TaskFigure t={task} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto">
            {task.options.map((o) => {
              const c = ans === o ? (ok1 ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-400 text-white border-rose-600') : 'bg-white text-slate-800 border-slate-300 hover:bg-indigo-50';
              return (
                <button
                  key={o}
                  onClick={() => {
                    if (ok1) return;
                    setAns(o);
                    if (o === task.answer) setScore((s) => s + 1);
                  }}
                  className={`${btn} ${c}`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {ans !== null && <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok1 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{ok1 ? `Ügyes! A jó válasz: ${task.answer}.` : task.hint}</div>}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-indigo-800">Jó válaszok: {score}</span>
            <button onClick={() => next()} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Labor II: Időjárás-napló" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-lg font-black text-emerald-900 text-center">Számold ki, mennyit mutatott a hőmérő délben és este!</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center max-w-2xl mx-auto">
            <div className="rounded-xl bg-slate-50 border-2 border-slate-200 p-3 text-center">
              <div className="text-xs font-bold text-slate-500">reggel</div>
              <div className="text-2xl font-black text-slate-800">{fmtC(d.r)}</div>
            </div>
            <div className="text-center text-sm font-bold text-orange-700">délig melegedett {d.k1} fokkal</div>
            <div className="flex flex-col items-center gap-1">
              <div className="text-xs font-bold text-slate-500">délben</div>
              <Stepper value={noon} onChange={(v) => { setNoon(v); setChecked(false); }} state={checked ? (noonOk ? 'ok' : 'bad') : 'none'} />
            </div>
            <div className="hidden sm:block" />
            <div className="text-center text-sm font-bold text-sky-700">estére hűlt {d.k2} fokkal</div>
            <div className="flex flex-col items-center gap-1">
              <div className="text-xs font-bold text-slate-500">este</div>
              <Stepper value={eve} onChange={(v) => { setEve(v); setChecked(false); }} state={checked ? (eveOk ? 'ok' : 'bad') : 'none'} />
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={() => setChecked(true)} className={`${btn} bg-emerald-600 text-white border-emerald-700 px-6`}>
              Ellenőrzés
            </button>
          </div>
          {checked && <div className={`rounded-xl p-3 text-center text-sm font-bold ${noonOk && eveOk ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{fb2()}</div>}
          <button
            onClick={() => {
              const nd = makeDiary();
              setD(nd);
              setNoon(nd.r);
              setEve(nd.r);
              setChecked(false);
            }}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
          >
            Új feladat
          </button>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NegExamG3Theory;
