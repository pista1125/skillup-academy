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
  ClockFace,
  ClockReadingsSvg,
  TimeUnitsSvg,
  DayPartsSvg,
  BusTimetableSvg,
  HannaRouteSvg
} from './TimeMeasureFigures';

const pad = (n: number) => String(n).padStart(2, '0');
/** perc a nap kezdetétől → „H:MM” */
const fmtClock = (t: number) => `${Math.floor(t / 60)}:${pad(t % 60)}`;
/** perc → „X óra Y perc” */
const fmtDur = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h && m) return `${h} óra ${m} perc`;
  if (h) return `${h} óra`;
  return `${m} perc`;
};

// ---------------------------------------------------------------------------
// Labor I: állítsd be az órát!
// ---------------------------------------------------------------------------
const CLOCK_TASKS = [
  { text: 'fél 8', t: 7 * 60 + 30 },
  { text: 'negyed 10', t: 9 * 60 + 15 },
  { text: 'háromnegyed 7', t: 6 * 60 + 45 },
  { text: 'fél 5 múlt 10 perccel', t: 4 * 60 + 40 },
  { text: 'tíz perc múlva két óra', t: 1 * 60 + 50 },
  { text: 'öt perccel múlt kilenc óra', t: 9 * 60 + 5 },
  { text: 'öt perc múlva fél négy', t: 3 * 60 + 25 },
  { text: 'negyed 12', t: 11 * 60 + 15 }
];
const STEPS = [
  { label: '+ 1 óra', d: 60 },
  { label: '+ 5 perc', d: 5 },
  { label: '+ 1 perc', d: 1 },
  { label: '− 1 óra', d: -60 },
  { label: '− 5 perc', d: -5 },
  { label: '− 1 perc', d: -1 }
];

// ---------------------------------------------------------------------------
// Labor II: időtartam-számoló
// ---------------------------------------------------------------------------
type DurTask = { text: string; answer: string; options: string[] };
const rnd = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const makeTask = (): DurTask => {
  const kind = rnd(0, 4);
  let text = '';
  let answer = '';
  let wrong: string[] = [];
  if (kind === 0) {
    // mennyi idő telt el?
    const start = rnd(7, 16) * 60 + rnd(0, 11) * 5;
    const dur = rnd(1, 2) * 60 + rnd(1, 11) * 5;
    const end = start + dur;
    text = `Kezdés: ${fmtClock(start)}, vége: ${fmtClock(end)}. Mennyi idő telt el?`;
    answer = fmtDur(dur);
    wrong = [fmtDur(dur + 60), fmtDur(dur - 10 > 0 ? dur - 10 : dur + 10), fmtDur(dur + 40)];
  } else if (kind === 1) {
    // mikor ér véget?
    const start = rnd(8, 17) * 60 + rnd(0, 11) * 5;
    const dur = rnd(2, 11) * 5 + rnd(0, 1) * 60;
    text = `Kezdés: ${fmtClock(start)}, időtartam: ${fmtDur(dur)}. Mikor van vége?`;
    answer = fmtClock(start + dur);
    wrong = [fmtClock(start + dur + 60), fmtClock(start + dur - 10), fmtClock(start - dur)];
  } else if (kind === 2) {
    const p = rnd(2, 12);
    text = `${p} perc = ? másodperc`;
    answer = `${p * 60} másodperc`;
    wrong = [`${p * 100} másodperc`, `${p * 10} másodperc`, `${p + 60} másodperc`];
  } else if (kind === 3) {
    const h = rnd(2, 5);
    text = `${h} nap = ? óra`;
    answer = `${h * 24} óra`;
    wrong = [`${h * 12} óra`, `${h * 60} óra`, `${h * 24 + 24} óra`];
  } else {
    const p = rnd(2, 9) * 60;
    text = `${p} másodperc = ? perc`;
    answer = `${p / 60} perc`;
    wrong = [`${p / 10} perc`, `${p} perc`, `${p / 60 + 1} perc`];
  }
  const uniq = Array.from(new Set(wrong.filter((w) => w !== answer))).slice(0, 3);
  return { text, answer, options: shuffle([answer, ...uniq]) };
};

const FIRST_TASK: DurTask = {
  text: 'Kezdés: 16:27, vége: 17:50. Mennyi idő telt el?',
  answer: '1 óra 23 perc',
  options: ['1 óra 23 perc', '1 óra 33 perc', '2 óra 23 perc', '1 óra 50 perc']
};

export const TimeMeasureTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [cIdx, setCIdx] = useState<number>(0);
  const [time, setTime] = useState<number>(12 * 60);
  const goal = CLOCK_TASKS[cIdx];
  const shown = ((time % 720) + 720) % 720;
  const ok = shown === goal.t % 720;
  const shownH = Math.floor(shown / 60) === 0 ? 12 : Math.floor(shown / 60);
  const shownM = shown % 60;

  // Labor II
  const [task, setTask] = useState<DurTask>(FIRST_TASK);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState<{ good: number; all: number }>({ good: 0, all: 0 });

  const pick = (o: string) => {
    if (picked) return;
    setPicked(o);
    setScore((s) => ({ good: s.good + (o === task.answer ? 1 : 0), all: s.all + 1 }));
  };

  return (
    <TheoryTemplate
      topicId="g4-measurements"
      subtopicId="az-ido-merese"
      title="6. Az idő mérése"
      subtitle="Óra, perc, másodperc, nap, hét, hónap, év: olvassuk le az órát, számoljunk menetrenddel, és váltsuk át az időtartamokat!"
      badge="4. OSZTÁLY • II. MÉRÉSEK • TANANYAG"
      themeColor="indigo"
      pdfFilename="4_osztaly_az_ido_merese_tananyag.pdf"
      practiceTitle="Készen állsz az időmérős feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ IDŐ MÉRTÉKEGYSÉGEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
                1 perc = 60 másodperc &nbsp;•&nbsp; 1 óra = 60 perc &nbsp;•&nbsp; 1 nap = 24 óra
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>1 hét = 7 nap, 1 év = 12 hónap. Negyedóra = 15 perc, félóra = 30 perc.</li>
              <li><strong>Időpont:</strong> mikor? (8 óra 15 perckor). <strong>Időtartam:</strong> mennyi ideig? (25 percig).</li>
              <li>Délután és este 12-t adunk az órához: fél 3 délután = 14 óra 30 perc.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? Az idő mértékegységei" badge="Tankönyv 153–155. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az időt <strong>órával</strong> és <strong>stopperrel</strong> mérjük. A sportban másodpercre pontosan mérik az eredményt: 2000 m-en a leggyorsabb 7 perc 30 másodperc alatt ért célba, a leglassabb 12 perc alatt. A különbség <strong>4 perc 30 másodperc</strong>.
            </p>
            <p>
              Hosszabb időt napokban, hetekben, hónapokban és években mérünk. A naptárban az <strong>évszakokat</strong> és a jeles napokat keressük meg.
            </p>
            <TheoryCallout type="tip" title="Melyik a nagyobb egység?">
              Nagyobb egységről kisebbre váltva <strong>szorzunk</strong> (2 perc = 2 · 60 = 120 másodperc), visszafelé <strong>osztunk</strong> (180 másodperc = 180 : 60 = 3 perc).
            </TheoryCallout>
          </div>
          <TimeUnitsSvg />
        </div>
        <DayPartsSvg />
      </TheorySection>

      {/* 2. Az óra leolvasása */}
      <TheorySection title="2. Olvassuk le az órát!" badge="Tankönyv 155. o." badgeColor="sky">
        <ClockReadingsSvg />
        <TheoryTable
          headers={['Szóban', 'Délelőtt', 'Délután, este']}
          rows={[
            ['fél nyolc', '7 óra 30 perc', '19 óra 30 perc'],
            ['negyed tíz', '9 óra 15 perc', '21 óra 15 perc'],
            ['háromnegyed hét', '6 óra 45 perc', '18 óra 45 perc'],
            ['fél 5 múlt 10 perccel', '4 óra 40 perc', '16 óra 40 perc'],
            ['tíz perc múlva két óra', '1 óra 50 perc', '13 óra 50 perc'],
            ['öt perc múlva fél négy', '3 óra 25 perc', '15 óra 25 perc']
          ]}
        />
        <TheoryCallout type="info" title="A kismutató">
          A kismutató 12 óra alatt megy körbe egyszer, ezért <strong>1 nap alatt 2-szer</strong>, 1 hét alatt 7 · 2 = <strong>14-szer</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Nézzük meg együtt! */}
      <TheorySection title="3. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <BusTimetableSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>A) A menetrend (Tankönyv 8. feladat).</strong> Menetidő = érkezés − indulás.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hídtól a Központig: 7:33 − 7:12 = <strong>21 perc</strong></li>
              <li>Karesz a Központtól az Iskoláig: 7:46 − 7:33 = <strong>13 perc</strong></li>
              <li>Kitti a Hídtól az Iskoláig 34 percet utazik, oda-vissza 2 · 34 = <strong>68 percet</strong>.</li>
              <li>Boldizsár naponta 50 percet utazik, egy út 25 perc: Dombtető (7:21) → Iskola (7:46).</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="B) Édesanya vacsorát főz" badge="Tankönyv 11. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Előkészítés: 16:00 → 16:27 = <strong>27 perc</strong></li>
              <li>Főzés: 16:27 → 17:00 = 33 perc, 17:00 → 17:50 = 50 perc, együtt <strong>1 óra 23 perc</strong></li>
              <li>Mindez együtt: 16:00 → 17:50 = <strong>1 óra 50 perc</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Lágytojás és lángos" badge="Tankönyv 12., Munkafüzet 14." badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>8 tojás egyszerre: csak <strong>3 perc</strong> (= 180 másodperc)</li>
              <li>8 tojás egyesével: 8 · 3 = <strong>24 perc</strong> (= 1440 másodperc)</li>
              <li>24 lángos, egyszerre 3 sül 3 percig: 24 : 3 = 8 sütés, 8 · 3 = <strong>24 perc</strong></li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <HannaRouteSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>D) Hanna útja (Tankönyv 16. feladat).</strong> Váltsunk mindent percre!
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>negyedóra = 15 perc</li>
              <li>660 másodperc = 660 : 60 = 11 perc</li>
              <li>15 + 24 + 11 + 10 = <strong>60 perc</strong> = 1 óra</li>
            </ul>
          </div>
        </div>
        <TheoryCard title="E) 1000 m gyaloglás (Tankönyv 15. feladat)" badge="perc:másodperc" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Balogh Béla 7:03 = 7 · 60 + 3 = 423 másodperc – ő a leggyorsabb</li>
            <li>Kiss Péter 7:05 = 425 mp, Nagy Antal 8:09 = 489 mp, Kovács Áron 8:53 = 533 mp</li>
            <li>A legjobb és a legrosszabb között: 533 − 423 = <strong>110 másodperc</strong></li>
            <li>Időeredménynél a <strong>kisebb</strong> szám a jobb eredmény!</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 4. Vigyázz! */}
      <TheorySection title="4. Vigyázz! Egy óra nem 100 perc!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Úgy számoltál, mintha 100 perc lenne egy órában?"
          wrong="A majmoknál 9:28-tól 10:05-ig voltak: 1005 − 928 = 77, tehát 77 percig."
          wrongExplanation="Az órán nem 100, hanem 60 perc van. Nem lehet 60-nál több perc a válaszban."
          correct="9:28 → 10:00 = 32 perc, 10:00 → 10:05 = 5 perc, együtt 32 + 5 = 37 perc"
          correctExplanation="Lépj előbb a következő egész óráig, aztán tovább a végéig, és add össze a darabokat!"
          tip="1 óra = 60 perc, 1 perc = 60 másodperc. A 7:05 (perc:másodperc) 7 · 60 + 5 = 425 másodperc, nem 705."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Labor I: Állítsd be az órát!" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              Állítsd a mutatókat erre az időre: <strong className="text-indigo-800 text-lg">{goal.text}</strong>
            </p>
            <button
              onClick={() => setCIdx((i) => (i + 1) % CLOCK_TASKS.length)}
              className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-800 font-bold hover:bg-indigo-200 active:scale-95 transition"
            >
              Új feladat
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <svg viewBox="0 0 220 220" className="w-full max-w-[240px] mx-auto h-auto">
              <ClockFace cx={110} cy={110} r={95} hour={shownH} minute={shownM} />
            </svg>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {STEPS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setTime((t) => (((t + s.d) % 1440) + 1440) % 1440)}
                    className={`min-h-[52px] rounded-xl font-bold text-base active:scale-95 transition ${
                      s.d > 0 ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
                <div className="text-xs text-slate-500">Az óra most ezt mutatja:</div>
                <div className="font-mono text-2xl font-black text-indigo-900">
                  {shownH}:{pad(shownM)}
                </div>
              </div>
              {ok ? (
                <div className="p-3 rounded-xl text-center font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Ügyes! {goal.text} = {fmtDur(goal.t)}, vagy a nap második felében {fmtDur(goal.t + 720)}.
                </div>
              ) : (
                <div className="p-3 rounded-xl text-center text-sm bg-slate-50 text-slate-600 border border-slate-200">
                  Tipp: a „fél 8” azt jelenti, hogy 7 óra után eltelt egy félóra.
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Labor II: Időtartam-számoló" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-slate-700">Számold ki, és válaszd ki a helyes választ! (1 óra = 60 perc, 1 perc = 60 másodperc)</p>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-bold">
              Pontok: {score.good} / {score.all}
            </span>
          </div>
          <div className="text-center text-2xl font-black text-purple-900 py-3">{task.text}</div>
          <div className="grid grid-cols-2 gap-3">
            {task.options.map((o) => {
              const cls = !picked
                ? 'bg-white border-slate-300 hover:bg-purple-50'
                : o === task.answer
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                  : o === picked
                    ? 'bg-rose-100 border-rose-500 text-rose-900'
                    : 'bg-white border-slate-200 opacity-60';
              return (
                <button key={o} onClick={() => pick(o)} className={`min-h-[56px] rounded-xl border-2 text-lg font-bold transition active:scale-95 ${cls}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {picked && (
            <div className={`p-3 rounded-xl text-center font-bold ${picked === task.answer ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {picked === task.answer ? 'Szuper, eltaláltad!' : `Nem egészen. A helyes válasz: ${task.answer}.`}
            </div>
          )}
          <div className="text-center">
            <button
              onClick={() => {
                setTask(makeTask());
                setPicked(null);
              }}
              className="px-5 py-3 rounded-xl bg-purple-600 text-white font-bold text-base hover:bg-purple-700 active:scale-95 transition"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TimeMeasureTheory;
