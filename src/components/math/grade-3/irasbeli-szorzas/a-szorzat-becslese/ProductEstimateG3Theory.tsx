import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { RoundLinesSvg, TwoEstimatesSvg, UpDownSvg, EnoughMoneySvg } from './ProductEstimateG3Figures';
import { rnd, shuffle, opts, ChoiceRow, FONT } from '../szorzas-egyjegyu-szammal/MulOneDigitG3Parts';
import { roundTo } from './ProductEstimateG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Becslőgép: kerekítés → becslés → összevetés a pontos szorzattal.
// ---------------------------------------------------------------------------
interface EstTask { a: number; m: number }
const makeEst = (): EstTask => {
  for (;;) {
    const a = rnd(102, 389);
    const m = rnd(2, 4);
    if (a % 10 === 0) continue;
    if (a * m > 1000 || roundTo(a, 100) * m > 1000 || roundTo(a, 10) * m > 1000) continue;
    return { a, m };
  }
};
const buildEstOpts = (t: EstTask, to: number): string[][] => {
  const r = roundTo(t.a, to);
  const lo = Math.floor(t.a / to) * to;
  const hi = lo + to;
  const other = r === lo ? hi : lo;
  const wrongR = to === 100 ? [other, roundTo(t.a, 10), lo - 100] : [other, roundTo(t.a, 100), t.a];
  const est = r * t.m;
  return [shuffle(opts(r, wrongR)), shuffle(opts(est, [other * t.m, r + t.m, est + to]))];
};

// ---------------------------------------------------------------------------
// Labor II – Több vagy kevesebb?
// ---------------------------------------------------------------------------
const makeUd = (): EstTask => {
  for (;;) {
    const a = rnd(102, 389);
    const m = rnd(2, 4);
    if (a % 10 === 0) continue;
    if (a * m > 1000 || roundTo(a, 10) * m > 1000) continue;
    return { a, m };
  }
};

/** Kis számegyenes a laborhoz. */
const LabLine: React.FC<{ v: number; to: number; show: boolean }> = ({ v, to, show }) => {
  const lo = Math.floor(v / to) * to;
  const hi = lo + to;
  const X = (t: number) => 30 + (300 * (t - lo)) / to;
  return (
    <svg viewBox="0 0 360 90" className="w-full max-w-md h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="20" y1="46" x2="340" y2="46" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={X(lo + (i * to) / 10)} y1={46 - (i % 5 === 0 ? 10 : 5)} x2={X(lo + (i * to) / 10)} y2={46 + (i % 5 === 0 ? 10 : 5)} stroke={i === 5 ? '#7c3aed' : '#334155'} strokeWidth={i % 10 === 0 ? 2.4 : 1.4} />
      ))}
      <text x={X(lo)} y="76" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">{lo}</text>
      <text x={X(hi)} y="76" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">{hi}</text>
      <text x={X(lo + to / 2)} y="74" textAnchor="middle" fontSize="12" fill="#7c3aed">{lo + to / 2}</text>
      <circle cx={X(v)} cy="46" r="6.5" fill="#dc2626" />
      <text x={X(v)} y="26" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#b91c1c">{v}</text>
      {show && <circle cx={X(roundTo(v, to))} cy="46" r="10" fill="none" stroke="#16a34a" strokeWidth="3" />}
    </svg>
  );
};

export const ProductEstimateG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [to, setTo] = useState<10 | 100>(10);
  const [task, setTask] = useState<EstTask>({ a: 236, m: 3 });
  const [step, setStep] = useState(0); // 0: kerekítés, 1: becslés, 2: kész
  const [bad, setBad] = useState<(number | string)[]>([]);
  const [hint, setHint] = useState('');
  const [o, setO] = useState<string[][]>(() => buildEstOpts({ a: 236, m: 3 }, 10));
  const r = roundTo(task.a, to);
  const est = r * task.m;
  const exact = task.a * task.m;
  const reset = (t: EstTask, k: 10 | 100) => {
    setTask(t);
    setTo(k);
    setO(buildEstOpts(t, k));
    setStep(0);
    setBad([]);
    setHint('');
  };
  const pick = (v: number | string) => {
    const n = Number(v);
    if (step === 0) {
      if (n === r) {
        setStep(1);
        setBad([]);
        setHint('');
      } else {
        setBad((b) => [...b, v]);
        const lo = Math.floor(task.a / to) * to;
        setHint(`Nézd a számegyenest! A lila jel a közepe: ${lo + to / 2}. A ${task.a} ${task.a < lo + to / 2 ? 'előtte van, ezért lefelé' : 'ott van vagy utána, ezért felfelé'} kerekítünk.`);
      }
    } else if (step === 1) {
      if (n === est) {
        setStep(2);
        setBad([]);
        setHint('');
      } else {
        setBad((b) => [...b, v]);
        setHint(`Szorozd a kerekített számot: ${r} · ${task.m} = ?`);
      }
    }
  };

  // ---- Labor II ----
  const [ud, setUd] = useState<EstTask>({ a: 157, m: 2 });
  const [udAns, setUdAns] = useState<'tobb' | 'kevesebb' | null>(null);
  const [score, setScore] = useState(0);
  const udR = roundTo(ud.a, 10);
  const udEst = udR * ud.m;
  const udExact = ud.a * ud.m;
  const udRight: 'tobb' | 'kevesebb' = udR < ud.a ? 'tobb' : 'kevesebb';
  const answerUd = (v: 'tobb' | 'kevesebb') => {
    if (udAns) return;
    setUdAns(v);
    if (v === udRight) setScore((s) => s + 1);
  };
  const newUd = () => {
    setUd(makeUd());
    setUdAns(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-written-mult"
      subtopicId="a-szorzat-becslese"
      grade={3}
      chapterId="irasbeli-szorzas"
      title="2. A szorzat becslése"
      subtitle="Körülbelül mennyi? Kerekítsd a nagyobb számot százasra vagy tízesre, és úgy szorozz!"
      badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG"
      themeColor="violet"
      pdfFilename="3_osztaly_a_szorzat_becslese_tananyag.pdf"
      practiceTitle="Készen állsz? Becsüljünk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — BECSLÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base font-black text-violet-900 dark:text-violet-200">
              345 · 2 ≈ 350 · 2 = 700
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A háromjegyű számot <strong>kerekítjük</strong>, az egyjegyűt nem.</li>
              <li>Kerekíthetünk <strong>százasra</strong> vagy <strong>tízesre</strong>. A tízesre kerekítés pontosabb.</li>
              <li>A ≈ jel jelentése: <strong>körülbelül egyenlő</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 124. o." badgeColor="violet">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Néha elég tudni, <strong>körülbelül</strong> mennyi lesz. Például: elég lesz-e a pénzem?</p>
          <p>Ilyenkor <strong>becslünk</strong>. Kerek számmal gyorsan, fejben számolunk.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Kerekítés – emlékszel?" badge="5-től felfelé" badgeColor="amber">
        <RoundLinesSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A 345 közelebb van a 300-hoz, mint a 400-hoz. <strong>Százasra: 345 ≈ 300.</strong></p>
          <p>A 345 pont a 340 és a 350 között van. Ilyenkor felfelé kerekítünk. <strong>Tízesre: 345 ≈ 350.</strong></p>
        </div>
      </TheorySection>

      <TheorySection title="3. Két becslés, melyik a jobb?" badge="345 · 2" badgeColor="sky">
        <TwoEstimatesSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p><strong>Százasra:</strong> 345 · 2 ≈ 300 · 2 = 600.</p>
          <p><strong>Tízesre:</strong> 345 · 2 ≈ 350 · 2 = 700.</p>
          <p>A pontos szorzat 690. A tízesre kerekített becslés <strong>pontosabb</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="4. Több lesz vagy kevesebb?" badge="fel vagy le" badgeColor="emerald">
        <UpDownSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Ha <strong>lefelé</strong> kerekítettünk, a pontos szorzat <strong>több</strong> lesz a becslésnél.</p>
          <p>Ha <strong>felfelé</strong> kerekítettünk, a pontos szorzat <strong>kevesebb</strong> lesz.</p>
        </div>
      </TheorySection>

      <TheorySection title="5. Mire jó a becslés?" badge="Elég a pénz?" badgeColor="orange">
        <EnoughMoneySvg />
        <TheoryCallout type="tip" title="Ellenőrzésre is jó!">
          Ha kiszámoltad a szorzatot, nézd meg: közel van a becsléshez? Ha nagyon messze van, valahol hibáztál.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Szöveges feladat" badgeColor="indigo">
        <TheoryCard title="Egy joghurt 185 Ft. Körülbelül mennyibe kerül 4 joghurt?" badge="lépésről lépésre" badgeColor="indigo">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li><strong>Százasra:</strong> 185 ≈ 200, 200 · 4 = 800.</li>
            <li><strong>Tízesre:</strong> 185 ≈ 190, 190 · 4 = 760.</li>
            <li>Mindkétszer felfelé kerekítettünk, ezért a pontos ár <strong>kevesebb</strong> lesz 760 Ft-nál.</li>
            <li><strong>Válasz:</strong> 4 joghurt körülbelül 760 Ft. (Pontosan 740 Ft.)</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A kis számot ne kerekítsd!"
          wrong="236 · 3 ≈ 240 · 0 = 0"
          wrongExplanation="A 3-at nem kerekítjük 0-ra! Akkor minden szorzat 0 lenne."
          correct="236 · 3 ≈ 240 · 3 = 720"
          correctExplanation="Csak a háromjegyű számot kerekítjük. Az egyjegyű marad."
          tip="Kerekítés után is ugyanazzal a számmal szorozz!"
        />
        <TheoryCallout type="warning" title="≈ és =">
          A becslés nem a pontos eredmény. Ezért ≈ jelet írunk: 236 · 3 ≈ 720. A pontos érték: 236 · 3 = 708.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="8. Labor I: Becslőgép" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => reset(makeEst(), to)} className="px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={() => reset(task, 100)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${to === 100 ? 'bg-rose-100 border-rose-500 text-rose-900' : 'bg-white border-slate-300 text-slate-700'}`}>Százasra</button>
            <button onClick={() => reset(task, 10)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${to === 10 ? 'bg-sky-100 border-sky-500 text-sky-900' : 'bg-white border-slate-300 text-slate-700'}`}>Tízesre</button>
            <div className="ml-auto text-2xl font-black text-slate-800">{task.a} · {task.m} ≈ ?</div>
          </div>
          <LabLine v={task.a} to={to} show={step > 0} />
          <div className="bg-violet-50 rounded-xl p-3 text-center text-violet-900 font-bold">
            {step === 0 && `1. lépés: Kerekítsd ${to === 100 ? 'százasra' : 'tízesre'}: ${task.a} ≈ ?`}
            {step === 1 && `2. lépés: ${task.a} ≈ ${r}. Mennyi ${r} · ${task.m}?`}
            {step === 2 && `Becslés: ${task.a} · ${task.m} ≈ ${r} · ${task.m} = ${est}`}
          </div>
          {step < 2 && <ChoiceRow key={`${task.a}-${to}-${step}`} options={o[step]} onPick={pick} bad={bad} />}
          {hint && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{hint}</div>}
          {step === 2 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800 space-y-1">
              <div>Ügyes! A pontos szorzat: {task.a} · {task.m} = {exact}.</div>
              <div>
                {est === exact ? 'A becslés pont annyi.' : `A becslés ${est > exact ? 'több' : 'kevesebb'}. A különbség: ${Math.abs(est - exact)}.`}
                {to === 100 ? ' Próbáld ki tízesre is!' : ' Próbáld ki százasra is!'}
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="9. Labor II: Több vagy kevesebb?" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newUd} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-emerald-800 bg-emerald-50 rounded-xl px-3 py-2">Jó válaszok: {score}</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl font-black text-slate-800">{ud.a} · {ud.m}</div>
            <div className="text-lg font-bold text-sky-800">Becslés: {ud.a} ≈ {udR}, {udR} · {ud.m} = {udEst}</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">A pontos szorzat több lesz vagy kevesebb, mint {udEst}?</div>
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {(['tobb', 'kevesebb'] as const).map((k) => (
              <button
                key={k}
                onClick={() => answerUd(k)}
                className={`min-h-[60px] rounded-xl text-xl font-black border-2 ${
                  udAns === k ? (k === udRight ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-rose-100 border-rose-500 text-rose-800') : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                {k === 'tobb' ? 'Több lesz' : 'Kevesebb lesz'}
              </button>
            ))}
          </div>
          {udAns && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${udAns === udRight ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {udAns === udRight ? 'Igen! ' : 'Nem egészen. '}
              {udR < ud.a ? `Lefelé kerekítettünk (${ud.a} → ${udR}), ezért a szorzat több lesz.` : `Felfelé kerekítettünk (${ud.a} → ${udR}), ezért a szorzat kevesebb lesz.`} Pontosan: {ud.a} · {ud.m} = {udExact}.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ProductEstimateG3Theory;
