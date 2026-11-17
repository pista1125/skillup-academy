import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { EstimateTwoWaysSvg, EstimateLineSvg, NotAlwaysSvg, BudgetSvg, ErrorCheckSvg } from './SumEstimateG3Figures';
import { ELine, EMark, roundTen, roundHundred } from './SumEstimateG3Parts';
import { rnd, opts4, art } from '../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';

type Mode = 'szazas' | 'tizes';
const rf = (m: Mode) => (m === 'tizes' ? roundTen : roundHundred);

// ---------------------------------------------------------------------------
// Labor I – Becslő: kerekítsd a tagokat, add össze, nézd meg a pontos összeget!
// ---------------------------------------------------------------------------
interface EstTask { a: number; b: number }
const makeEst = (): EstTask => {
  for (;;) {
    const a = rnd(101, 389);
    const b = rnd(101, 389);
    if (a + b > 499 || a % 10 === 0 || b % 10 === 0) continue;
    if (roundHundred(a) + roundHundred(b) > 500) continue;
    return { a, b };
  }
};
const choicesFor = (n: number, m: Mode): number[] => {
  const u = m === 'tizes' ? 10 : 100;
  const f = Math.floor(n / u) * u;
  return [f, f + u];
};

// ---------------------------------------------------------------------------
// Labor II – Hibavadász: jó lehet, vagy biztosan hibás?
// ---------------------------------------------------------------------------
interface CheckTask { a: number; b: number; shown: number }
const makeCheck = (): CheckTask => {
  for (;;) {
    const a = rnd(101, 349);
    const b = rnd(101, 349);
    const s = a + b;
    if (s > 499 || s < 230) continue;
    const r = Math.random();
    let shown = s;
    if (r < 0.3) shown = s - 100;
    else if (r < 0.55) shown = s + 100;
    if (shown > 500 || shown < 100) continue;
    return { a, b, shown };
  }
};

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null; wide?: boolean }> = ({ v, onClick, state, wide }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl ${wide ? 'text-base' : 'text-lg'} font-black min-h-[52px] min-w-[80px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const SumEstimateG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [mode, setMode] = useState<Mode>('tizes');
  const [et, setEt] = useState<EstTask>({ a: 187, b: 238 });
  const [step, setStep] = useState(0); // 0: a kerekítése, 1: b kerekítése, 2: becslés, 3: kész
  const [estOpts, setEstOpts] = useState<number[]>([430, 420, 400, 425]);
  const [bad, setBad] = useState<number | null>(null);
  const [msg, setMsg] = useState('');
  const R = rf(mode);
  const ra = R(et.a);
  const rb = R(et.b);
  const est = ra + rb;
  const mkEstOpts = (t: EstTask, m: Mode) => {
    const r = rf(m);
    const e = r(t.a) + r(t.b);
    const other = (m === 'tizes' ? roundHundred : roundTen)(t.a) + (m === 'tizes' ? roundHundred : roundTen)(t.b);
    return opts4(e, [t.a + t.b === e ? e + (m === 'tizes' ? 10 : 100) : t.a + t.b, other, e + (m === 'tizes' ? 10 : 100), e - (m === 'tizes' ? 10 : 100)]);
  };
  const newEst = (m: Mode = mode) => {
    const t = makeEst();
    setMode(m);
    setEt(t);
    setStep(0);
    setEstOpts(mkEstOpts(t, m));
    setBad(null);
    setMsg('');
  };
  const pick = (v: number) => {
    const want = step === 0 ? ra : step === 1 ? rb : est;
    if (v === want) {
      setStep(step + 1);
      setBad(null);
      setMsg('');
      return;
    }
    setBad(v);
    if (step < 2) {
      const n = step === 0 ? et.a : et.b;
      const d = mode === 'tizes' ? n % 10 : Math.floor(n / 10) % 10;
      setMsg(mode === 'tizes' ? `Nézd az egyest! ${d} áll ott. 0–4 → le, 5–9 → fel.` : `Nézd a tízest! ${d} áll ott. 0–4 → le, 5–9 → fel.`);
    } else if (v === et.a + et.b) setMsg('Ez a pontos összeg. Most a kerekített számokat add össze!');
    else setMsg(`Add össze a kerekített számokat: ${ra} + ${rb} = ?`);
  };
  const exact = et.a + et.b;
  const lo = Math.floor(Math.min(exact, est) / 10) * 10 - 20;
  const hi = Math.ceil(Math.max(exact, est) / 10) * 10 + 20;
  const lineMarks: EMark[] = step >= 3 ? [{ v: est, label: `B: ${est}`, color: '#1d4ed8' }, { v: exact, label: '', sub: `pontos: ${exact}`, color: '#15803d' }] : [];
  const labels: number[] = [];
  const bigE = hi - lo > 120 ? 50 : 20;
  for (let v = Math.ceil(lo / bigE) * bigE; v <= hi; v += bigE) labels.push(v);

  // ---- Labor II ----
  const [ct, setCt] = useState<CheckTask>({ a: 236, b: 145, shown: 281 });
  const [ans, setAns] = useState<'jo' | 'hibas' | null>(null);
  const [streak, setStreak] = useState(0);
  const newCheck = () => {
    setCt(makeCheck());
    setAns(null);
  };
  const cExact = ct.a + ct.b;
  const cEst = roundTen(ct.a) + roundTen(ct.b);
  const isOk = ct.shown === cExact;
  const answer = (a: 'jo' | 'hibas') => {
    if (ans) return;
    setAns(a);
    if ((a === 'jo') === isOk) setStreak((s) => s + 1);
    else setStreak(0);
  };
  const right = ans !== null && (ans === 'jo') === isOk;

  return (
    <TheoryTemplate
      topicId="g3-written-addition"
      subtopicId="az-osszeg-becslese"
      grade={3}
      chapterId="irasbeli-osszeadas"
      title="2. Az összeg becslése"
      subtitle="Körülbelül mennyi? Becslés százasra és tízesre kerekített tagokkal, ellenőrzés becsléssel."
      badge="3. OSZTÁLY • VII. ÍRÁSBELI ÖSSZEADÁS • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_az_osszeg_becslese_tananyag.pdf"
      practiceTitle="Készen állsz? Becsüljünk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — ÍGY BECSÜLÜNK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
              187 ≈ 190 &nbsp; 238 ≈ 240 &nbsp; B: 430
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>1. Kerekítsd mindkét tagot! 2. Add össze a kerekített számokat!</li>
              <li>A becslés jele: <strong>B:</strong> A ≈ jelentése: <strong>körülbelül</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 76. o." badgeColor="amber">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Sokszor elég tudni, hogy <strong>körülbelül</strong> mennyi lesz. Elég lesz a pénzem? Kb. hányan leszünk?</p>
          <p>Ilyenkor <strong>becslünk</strong>. Gyors, és fejben is megy!</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Két út: százasra vagy tízesre" badge="Becslés" badgeColor="rose">
        <EstimateTwoWaysSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Százasra kerekítve" badge="gyors" badgeColor="rose">
            <p className="text-sm text-slate-700">187 ≈ 200, 238 ≈ 200. 200 + 200 = 400. <strong>B: 400</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Tízesre kerekítve" badge="pontosabb" badgeColor="blue">
            <p className="text-sm text-slate-700">187 ≈ 190, 238 ≈ 240. 190 + 240 = 430. <strong>B: 430</strong>.</p>
          </TheoryCard>
        </div>
        <EstimateLineSvg />
        <TheoryCallout type="info" title="Melyik van közelebb?">
          A pontos összeg 425. A 430 csak 5-tel tér el, a 400 viszont 25-tel. Most a <strong>tízesre kerekített</strong> becslés a pontosabb.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Nem mindig!" badge="Gondolkodj!" badgeColor="purple">
        <NotAlwaysSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Általában a tízesre kerekített becslés van közelebb. De nézd: 135 + 165 = 300. Itt a százasra kerekített becslés (300) telitalálat, a tízesre kerekített (310) eltér 10-zel.
        </p>
      </TheorySection>

      <TheorySection title="4. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="emerald">
        <BudgetSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Elég az 500 Ft?" badge="236 Ft + 178 Ft" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Kerekítsd tízesre: 236 ≈ 240, 178 ≈ 180.</li>
              <li>240 + 180 = 420. <strong>B: 420</strong>.</li>
              <li>Ez jóval kevesebb, mint 500. <strong>Elég a pénz.</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Ha nagyon közel van" badge="247 Ft + 251 Ft" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Becslés: 250 + 250 = 500. Ez pont a határ!</li>
              <li>Ilyenkor számolj pontosan: 247 + 251 = <strong>498</strong>.</li>
              <li>Elég, és 2 Ft marad.</li>
            </ul>
          </TheoryCard>
        </div>
        <ErrorCheckSvg />
        <TheoryCard title="C) A becslés hibát is talál" badge="ellenőrzés" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Valaki azt írta: 236 + 145 = 281.</li>
            <li>Becslés: 240 + 150 = 390. A 281 messze van a 390-től!</li>
            <li>Biztosan hibás. A jó eredmény: <strong>381</strong>.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="5. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A becslés nem a pontos eredmény"
          wrong="187 + 238 = 430"
          wrongExplanation="Ez nem igaz! A 430 csak körülbelül annyi."
          correct="B: 430, a pontos összeg 425"
          correctExplanation="A becslést B:-vel vagy ≈ jellel írjuk, nem = jellel."
          tip="Becsléskor mindig a kerekített tagokat add össze!"
        />
        <TheoryCallout type="warning" title="Az 5-ös szabály">
          Ha tízesre kerekítesz, és az egyes 5, felfelé kerekíts: 245 ≈ 250. Százasra: ha a tízes 5, felfelé: 250 ≈ 300.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="6. Labor I: Becslő" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newEst(mode)} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={() => newEst('tizes')} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${mode === 'tizes' ? 'bg-blue-100 border-blue-500 text-blue-900' : 'bg-white border-slate-300 text-slate-700'}`}>Tízesre</button>
            <button onClick={() => newEst('szazas')} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${mode === 'szazas' ? 'bg-rose-100 border-rose-500 text-rose-900' : 'bg-white border-slate-300 text-slate-700'}`}>Százasra</button>
          </div>
          <div className="text-center text-3xl font-black text-slate-800">{et.a} + {et.b}</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`rounded-xl border-2 p-2 ${step === 0 ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="text-xs font-bold text-slate-500">1. tag</div>
              <div className="text-xl font-black text-slate-800">{et.a} ≈ {step > 0 ? ra : '?'}</div>
            </div>
            <div className={`rounded-xl border-2 p-2 ${step === 1 ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="text-xs font-bold text-slate-500">2. tag</div>
              <div className="text-xl font-black text-slate-800">{et.b} ≈ {step > 1 ? rb : '?'}</div>
            </div>
            <div className={`rounded-xl border-2 p-2 ${step === 2 ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="text-xs font-bold text-slate-500">becslés</div>
              <div className="text-xl font-black text-slate-800">B: {step > 2 ? est : '?'}</div>
            </div>
          </div>
          {step < 3 && (
            <>
              <div className="bg-amber-50 rounded-xl p-3 text-center text-amber-900 font-bold">
                {step === 0 && `Kerekítsd ${mode === 'tizes' ? 'tízesre' : 'százasra'} ${art(et.a)} ${et.a} számot!`}
                {step === 1 && `Kerekítsd ${mode === 'tizes' ? 'tízesre' : 'százasra'} ${art(et.b)} ${et.b} számot!`}
                {step === 2 && `Mennyi ${ra} + ${rb}?`}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {(step === 0 ? choicesFor(et.a, mode) : step === 1 ? choicesFor(et.b, mode) : estOpts).map((v) => (
                  <OptButton key={`${step}-${v}`} v={v} onClick={() => pick(v)} state={bad === v ? 'bad' : null} />
                ))}
              </div>
            </>
          )}
          {msg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{msg}</div>}
          {step >= 3 && (
            <>
              <ELine lo={lo} hi={hi} tickEvery={10} bigEvery={bigE} labels={labels} marks={lineMarks} W={340} H={100} />
              <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
                Kész! B: {est}. A pontos összeg {exact}. Az eltérés: {Math.abs(exact - est)}. Kérj új feladatot!
              </div>
            </>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="7. Labor II: Hibavadász" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newCheck} className="px-4 py-2 rounded-xl bg-rose-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-rose-800 bg-rose-50 rounded-xl px-3 py-2">Jó döntések egymás után: {streak}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="text-xs font-bold text-slate-500 mb-1">Valaki ezt számolta ki:</div>
            <div className="text-3xl font-black text-slate-800">{ct.a} + {ct.b} = {ct.shown}</div>
          </div>
          <div className="bg-rose-50 rounded-xl p-3 text-center text-rose-900 font-bold">Becsülj tízesre kerekítve! Jó lehet az eredmény?</div>
          <div className="flex flex-wrap gap-3 justify-center">
            <OptButton wide v="Jó lehet" onClick={() => answer('jo')} state={ans === 'jo' ? (isOk ? 'ok' : 'bad') : null} />
            <OptButton wide v="Biztosan hibás" onClick={() => answer('hibas')} state={ans === 'hibas' ? (!isOk ? 'ok' : 'bad') : null} />
          </div>
          {ans && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${right ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {right ? 'Ügyes! ' : 'Nézd meg még egyszer! '}
              Becslés: {roundTen(ct.a)} + {roundTen(ct.b)} = {cEst}. {isOk ? `${art(ct.shown) === 'az' ? 'Az' : 'A'} ${ct.shown} közel van hozzá, és tényleg jó.` : `${art(ct.shown) === 'az' ? 'Az' : 'A'} ${ct.shown} messze van tőle, ezért hibás. A jó eredmény: ${cExact}.`} Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SumEstimateG3Theory;
