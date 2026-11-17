import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { CoinsMulSvg, TensMulSvg, SplitMulSvg, SwapSvg, ChainSvg, ThreePartSvg } from './MulOneDigitG3Figures';
import { rnd, shuffle, opts, ChoiceRow, CoinRow, coinRowWidth, FONT, targy } from './MulOneDigitG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Bontsd és szorozd! (kerek tízes · egyjegyű, szorzat ≤ 1000)
// ---------------------------------------------------------------------------
interface SplitTask { a: number; m: number }
const makeSplit = (): SplitTask => {
  for (;;) {
    const a = rnd(11, 49) * 10;
    const m = rnd(2, 6);
    if (a % 100 === 0) continue;
    if (a < 100) continue;
    if (a * m > 1000) continue;
    return { a, m };
  }
};

// ---------------------------------------------------------------------------
// Labor II – Melyik szám illik a □ helyére? (□ = 1…9)
// ---------------------------------------------------------------------------
interface IneqTask { a: number; rel: '<' | '>'; t: number }
const makeIneq = (): IneqTask => {
  const a = [20, 30, 40, 50, 60, 70, 80, 90, 110, 120, 150][rnd(0, 10)];
  const rel = rnd(0, 1) ? '<' : '>';
  for (;;) {
    const k = rnd(2, 8);
    const t = rnd(0, 1) ? a * k : a * k + 10 * rnd(1, a / 10 - 1);
    if (t <= 1000 && t > a) return { a, rel, t };
  }
};
const holds = (task: IneqTask, n: number) => (task.rel === '<' ? n * task.a < task.t : n * task.a > task.t);

export const MulOneDigitG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [task, setTask] = useState<SplitTask>({ a: 240, m: 3 });
  const [step, setStep] = useState(0); // 0: százasok, 1: tízesek, 2: összeg, 3: kész
  const [bad, setBad] = useState<(number | string)[]>([]);
  const [hint, setHint] = useState('');
  const [optsState, setOptsState] = useState<string[][]>(() => buildOpts({ a: 240, m: 3 }));
  const H = Math.floor(task.a / 100) * 100;
  const T = task.a % 100;
  const answers = [H * task.m, T * task.m, task.a * task.m];
  function buildOpts(t: SplitTask): string[][] {
    const h = Math.floor(t.a / 100) * 100;
    const tt = t.a % 100;
    return [
      shuffle(opts(h * t.m, [(h / 100) * t.m, h + t.m, (h / 100 + 1) * t.m * 100, h * t.m + 100])),
      shuffle(opts(tt * t.m, [(tt / 10) * t.m, tt + t.m, tt * t.m + 10, tt * t.m - 10])),
      shuffle(opts(t.a * t.m, [h * t.m + (tt / 10) * t.m, t.a * t.m + 100, t.a * t.m - 100, h * t.m + tt]))
    ];
  }
  const newTask = () => {
    const t = makeSplit();
    setTask(t);
    setOptsState(buildOpts(t));
    setStep(0);
    setBad([]);
    setHint('');
  };
  const pick = (v: number | string) => {
    if (step > 2) return;
    if (Number(v) === answers[step]) {
      setStep(step + 1);
      setBad([]);
      setHint('');
      return;
    }
    setBad((b) => [...b, v]);
    if (step === 0) setHint(`${H} = ${H / 100} százas. ${H / 100} százas · ${task.m} = ${(H / 100) * task.m} százas.`);
    else if (step === 1) setHint(`${T} = ${T / 10} tízes. ${T / 10} tízes · ${task.m} = ${(T / 10) * task.m} tízes.`);
    else setHint(`Add össze a két részt: ${answers[0]} + ${answers[1]}.`);
  };
  const cw = coinRowWidth(task.a, 11, 8.5);
  const figH = 18 + task.m * 28;

  // ---- Labor II ----
  const [iq, setIq] = useState<IneqTask>({ a: 40, rel: '<', t: 360 });
  const [sel, setSel] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [streak, setStreak] = useState(0);
  const correctSet = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => holds(iq, n));
  const toggle = (n: number) => {
    if (checked) return;
    setSel((s) => (s.includes(n) ? s.filter((x) => x !== n) : [...s, n]));
  };
  const allRight = checked && correctSet.length === sel.length && correctSet.every((n) => sel.includes(n));
  const check = () => {
    setChecked(true);
    const ok = correctSet.length === sel.length && correctSet.every((n) => sel.includes(n));
    setStreak((s) => (ok ? s + 1 : 0));
  };
  const firstWrong = [1, 2, 3, 4, 5, 6, 7, 8, 9].find((n) => sel.includes(n) !== holds(iq, n));
  const newIq = () => {
    setIq(makeIneq());
    setSel([]);
    setChecked(false);
  };

  return (
    <TheoryTemplate
      topicId="g3-written-mult"
      subtopicId="szorzas-egyjegyu-szammal"
      grade={3}
      chapterId="irasbeli-szorzas"
      title="1. Szorzás egyjegyű számmal"
      subtitle="Kerek tízesek szorzása fejben: pénzzel, tízesekkel, bontással."
      badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG"
      themeColor="violet"
      pdfFilename="3_osztaly_szorzas_egyjegyu_szammal_tananyag.pdf"
      practiceTitle="Készen állsz? Szorozzunk fejben!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — BONTSD, SZOROZD, ADD ÖSSZE!',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              280 · 2 = 200 · 2 + 80 · 2 = 400 + 160 = 560
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Bontsd a számot <strong>százasokra</strong> és <strong>tízesekre</strong>!</li>
              <li>Mindkét részt szorozd meg!</li>
              <li>A két szorzatot <strong>add össze</strong>!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 122–123. o." badgeColor="violet">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Már tudod: 3 · 4 = 12. Most <strong>nagyobb számokat</strong> szorzunk, például 230 · 3.</p>
          <p>Kerek tízeseket szorzunk egyjegyű számmal. Fejben, ügyes bontással.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Szorozzunk pénzzel!" badge="100 Ft és 10 Ft" badgeColor="amber">
        <CoinsMulSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Egy belépő 230 Ft. Ez 2 darab 100-as és 3 darab 10-es. Hárman megyünk.</p>
          <p>A százasokból 6 lesz, a tízesekből 9. Ez <strong>690 Ft</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="3. Tízesekkel ugyanúgy megy" badge="12 tízes · 3" badgeColor="sky">
        <TensMulSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          120 = 12 tízes. A 12 · 3 = 36-ot már tudod. Akkor 12 tízes · 3 = <strong>36 tízes</strong>, vagyis 360.
        </p>
      </TheorySection>

      <TheorySection title="4. Bontsd szét!" badge="százasok + tízesek" badgeColor="emerald">
        <SplitMulSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A 280 = 200 + 80. Mindkét részt megszorozzuk 2-vel.</p>
          <p><strong>200 · 2 = 400</strong> és <strong>80 · 2 = 160</strong>. Összeadjuk: 400 + 160 = <strong>560</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="5. A tényezők felcserélhetők" badge="4 · 120 = 120 · 4" badgeColor="purple">
        <SwapSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          4 · 120 ugyanannyi, mint 120 · 4. Mindegy, melyik számot írod előre. Válaszd azt, amelyikkel könnyebb számolni!
        </p>
      </TheorySection>

      <TheorySection title="6. Szorzólánc" badge="·2, ·2" badgeColor="indigo">
        <ChainSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Ha egy számot 2-vel, aztán megint 2-vel szorzol, az olyan, mintha 4-gyel szoroztad volna. 140 · 4 = 560.
        </p>
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Szöveges feladat" badgeColor="indigo">
        <TheoryCard title="Egy doboz zsírkréta 160 Ft. Az osztály 4 dobozt vesz. Mennyit fizetnek?" badge="lépésről lépésre" badgeColor="indigo">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li><strong>Adatok:</strong> 1 doboz → 160 Ft, 4 doboz → ? Ft</li>
            <li><strong>Terv:</strong> 4 · 160 = 160 · 4 = □</li>
            <li><strong>Számítás:</strong> 100 · 4 = 400, 60 · 4 = 240, 400 + 240 = <strong>640</strong></li>
            <li><strong>Válasz:</strong> 640 Ft-ot fizetnek.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="8. Kitekintő: ha egyes is van" badge="3 · 124" badgeColor="orange">
        <ThreePartSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          A 124-et három részre bontjuk: 100, 20 és 4. Mindhármat megszorozzuk, aztán összeadjuk.
        </p>
      </TheorySection>

      <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elveszett tízesek"
          wrong="140 · 3 = 320"
          wrongExplanation="A 100 · 3 = 300 jó. De 40 · 3 nem 20! A 4 tízes · 3 = 12 tízes."
          correct="140 · 3 = 420"
          correctExplanation="100 · 3 = 300, 40 · 3 = 120, 300 + 120 = 420."
          tip="Mindkét részt szorozd meg, ne csak az elsőt!"
        />
        <TheoryCallout type="warning" title="Ne add hozzá, szorozd!">
          280 · 2 nem 200 · 2 + 80! A 80-at is meg kell szorozni 2-vel.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="10. Labor I: Bontsd és szorozd!" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newTask} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-2xl font-black text-slate-800">{task.a} · {task.m} = ?</div>
          </div>
          <svg viewBox={`0 0 ${Math.max(260, cw + 70)} ${figH}`} className="w-full max-w-md h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            {Array.from({ length: task.m }).map((_, r) => (
              <g key={r}>
                <text x="6" y={23 + r * 28} fontSize="12" fontWeight="bold" fill="#64748b">{r + 1}.</text>
                <CoinRow x={26} cy={18 + r * 28} amount={task.a} r100={11} r10={8.5} />
              </g>
            ))}
          </svg>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-lg font-black">
            <div className={`rounded-xl p-2 ${step > 0 ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-500'}`}>{H} · {task.m} = {step > 0 ? answers[0] : '?'}</div>
            <div className={`rounded-xl p-2 ${step > 1 ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-500'}`}>{T} · {task.m} = {step > 1 ? answers[1] : '?'}</div>
            <div className={`rounded-xl p-2 ${step > 2 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>{step > 0 ? answers[0] : '?'} + {step > 1 ? answers[1] : '?'} = {step > 2 ? answers[2] : '?'}</div>
          </div>
          {step < 3 && (
            <>
              <div className="bg-violet-50 rounded-xl p-3 text-center text-violet-900 font-bold">
                {step === 0 && `1. lépés: Mennyi ${H} · ${task.m}?`}
                {step === 1 && `2. lépés: Mennyi ${T} · ${task.m}?`}
                {step === 2 && `3. lépés: Add össze! ${answers[0]} + ${answers[1]} = ?`}
              </div>
              <ChoiceRow key={`${task.a}-${task.m}-${step}`} options={optsState[step]} onPick={pick} bad={bad} />
            </>
          )}
          {hint && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{hint}</div>}
          {step >= 3 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! {task.a} · {task.m} = {answers[2]}. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="11. Labor II: Melyik szám illik?" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newIq} className="px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-rose-800 bg-rose-50 rounded-xl px-3 py-2">Hibátlanul egymás után: {streak}</div>
          </div>
          <div className="text-center text-3xl font-black text-slate-800">
            □ · {iq.a} {iq.rel} {iq.t}
          </div>
          <div className="bg-rose-50 rounded-xl p-3 text-center text-rose-900 font-bold">Jelöld meg az összes jó számot! (1-től 9-ig)</div>
          <div className="grid grid-cols-5 sm:grid-cols-9 gap-2 max-w-xl mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
              const on = sel.includes(n);
              const ok = holds(iq, n);
              let cls = on ? 'bg-violet-100 border-violet-500 text-violet-900' : 'bg-white border-slate-300 text-slate-800';
              if (checked) cls = ok ? (on ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-amber-100 border-amber-500 text-amber-800') : on ? 'bg-rose-100 border-rose-500 text-rose-800' : 'bg-white border-slate-200 text-slate-400';
              return (
                <button key={n} onClick={() => toggle(n)} className={`min-h-[56px] rounded-xl text-2xl font-black border-2 ${cls}`}>
                  {n}
                </button>
              );
            })}
          </div>
          {!checked && (
            <div className="text-center">
              <button onClick={check} className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold min-h-[48px]">Ellenőrzöm</button>
            </div>
          )}
          {checked && allRight && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Mind jó! A jó számok: {correctSet.join(', ')}. Kérj új feladatot!
            </div>
          )}
          {checked && !allRight && firstWrong !== undefined && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              Nézd meg {targy(firstWrong)}: {firstWrong} · {iq.a} = {firstWrong * iq.a}. Ez {holds(iq, firstWrong) ? '' : 'nem '}
              {iq.rel === '<' ? 'kisebb' : 'nagyobb'}, mint {iq.t}, ezért {holds(iq, firstWrong) ? 'ez is jó (sárga).' : 'nem jó (piros).'}
              <div className="mt-2">
                <button onClick={() => { setChecked(false); }} className="px-4 py-2 rounded-xl bg-white border-2 border-rose-300 text-rose-700 font-bold min-h-[44px]">Javítom</button>
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MulOneDigitG3Theory;
