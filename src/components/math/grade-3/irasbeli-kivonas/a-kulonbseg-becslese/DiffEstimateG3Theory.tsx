import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { RoundHundredsSvg, RoundTensSvg, CompareEstimatesSvg, EstimateStripSvg, ShopEstimateSvg, EstimateCheckSvg } from './DiffEstimateG3Figures';
import { FONT, rnd, shuffle, hoz } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts';

/** Kerekítés a tankönyv szabálya szerint: 5-től (50-től) felfelé. */
export const roundTo = (n: number, step: number) => Math.floor((n + step / 2) / step) * step;

// ---------------------------------------------------------------------------
// Labor I – Becslő gép: kerekítem a kisebbítendőt, a kivonandót, aztán kivonok.
// ---------------------------------------------------------------------------
type Mode = 100 | 10;
interface EstTask { a: number; b: number }
const makeEst = (mode: Mode): EstTask => {
  for (;;) {
    const a = rnd(230, 499);
    const b = rnd(101, a - 60);
    if (a % mode === 0 || b % mode === 0) continue;
    if (roundTo(a, mode) <= roundTo(b, mode)) continue;
    return { a, b };
  }
};
const uniq = (arr: number[], fill: number, step: number) => {
  const out: number[] = [];
  arr.forEach((v) => {
    if (v >= 0 && !out.includes(v) && out.length < 3) out.push(v);
  });
  let k = 1;
  while (out.length < 3) {
    const v = fill + k * step;
    if (!out.includes(v)) out.push(v);
    k++;
  }
  return shuffle(out);
};
const roundOpts = (n: number, mode: Mode) => {
  const other: Mode = mode === 100 ? 10 : 100;
  return uniq([Math.floor(n / mode) * mode, Math.floor(n / mode) * mode + mode, roundTo(n, other)], roundTo(n, mode), mode);
};

// ---------------------------------------------------------------------------
// Labor II – Becslés-sáv (százasra)
// ---------------------------------------------------------------------------
interface StripTask { a: number; b: number }
const makeStrip = (): StripTask => {
  for (;;) {
    const a = rnd(160, 499);
    const b = rnd(51, a - 40);
    if (roundTo(a, 100) <= roundTo(b, 100)) continue;
    if (a % 100 === 0 || b % 100 === 0) continue;
    return { a, b };
  }
};

const Btn: React.FC<{ v: React.ReactNode; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[80px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const DiffEstimateG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [mode, setMode] = useState<Mode>(10);
  const [et, setEt] = useState<EstTask>({ a: 382, b: 145 });
  const [step, setStep] = useState(0); // 0: a kerekítése, 1: b kerekítése, 2: becslés, 3: kész
  const [opts, setOpts] = useState<number[]>(roundOpts(382, 10));
  const [bad, setBad] = useState<number | null>(null);
  const [msg, setMsg] = useState('');
  const ra = roundTo(et.a, mode);
  const rb = roundTo(et.b, mode);
  const est = ra - rb;
  const exact = et.a - et.b;
  const estOpts = (t: EstTask, m: Mode) => {
    const e = roundTo(t.a, m) - roundTo(t.b, m);
    const cand = [e, e + m, e - m >= 0 ? e - m : e + 2 * m, t.a - t.b];
    return shuffle(Array.from(new Set(cand)));
  };
  const newEst = (m: Mode = mode) => {
    const t = makeEst(m);
    setMode(m);
    setEt(t);
    setStep(0);
    setOpts(roundOpts(t.a, m));
    setBad(null);
    setMsg('');
  };
  const pick = (v: number) => {
    if (step >= 3) return;
    const target = step === 0 ? ra : step === 1 ? rb : est;
    if (v === target) {
      const next = step + 1;
      setStep(next);
      setBad(null);
      setMsg('');
      if (next === 1) setOpts(roundOpts(et.b, mode));
      if (next === 2) setOpts(estOpts(et, mode));
      return;
    }
    setBad(v);
    const n = step === 0 ? et.a : et.b;
    const name = mode === 100 ? 'százas' : 'tízes';
    if (step < 2) {
      const lo = Math.floor(n / mode) * mode;
      if (v === roundTo(n, mode === 100 ? 10 : 100) && v !== lo && v !== lo + mode) setMsg(`Most ${mode === 100 ? 'százasra' : 'tízesre'} kerekítünk! Melyik kerek ${name} van közelebb a ${n}-${hoz(n)}?`);
      else setMsg(`A ${n} a ${lo} és a ${lo + mode} között van. ${mode === 100 ? `A ${lo + 50}` : `A ${lo + 5}`}-től már felfelé kerekítünk.`);
    } else if (v === exact) setMsg('Ez a pontos eredmény! Becsléskor a kerek számokkal számolj.');
    else setMsg(`Vond ki a kerek számokat: ${ra} − ${rb} = ?`);
  };
  const other: Mode = mode === 100 ? 10 : 100;
  const estOther = roundTo(et.a, other) - roundTo(et.b, other);
  const closer = Math.abs(est - exact) < Math.abs(estOther - exact) ? 'this' : Math.abs(est - exact) > Math.abs(estOther - exact) ? 'other' : 'same';

  // ---- Labor II ----
  const [st, setSt] = useState<StripTask>({ a: 398, b: 112 });
  const [sBad, setSBad] = useState<number | null>(null);
  const [sOk, setSOk] = useState(false);
  const [sMsg, setSMsg] = useState('');
  const [streak, setStreak] = useState(0);
  const sEst = roundTo(st.a, 100) - roundTo(st.b, 100);
  const sExact = st.a - st.b;
  const newStrip = () => {
    setSt(makeStrip());
    setSBad(null);
    setSOk(false);
    setSMsg('');
  };
  const pickStrip = (v: number) => {
    if (sOk) return;
    if (v === sEst) {
      setSOk(true);
      setSBad(null);
      setSMsg('');
      setStreak((s) => s + 1);
      return;
    }
    setSBad(v);
    setStreak(0);
    if (v === roundTo(sExact, 100)) setSMsg(`Előbb kerekíts, aztán vonj ki! ${st.a} ≈ ${roundTo(st.a, 100)}, ${st.b} ≈ ${roundTo(st.b, 100)}.`);
    else setSMsg(`Kerekítsd százasra: ${st.a} ≈ ?, ${st.b} ≈ ? Aztán vond ki őket!`);
  };
  const SX = (v: number) => 20 + (v * 340) / 500;

  return (
    <TheoryTemplate
      topicId="g3-written-subtraction"
      subtopicId="a-kulonbseg-becslese"
      grade={3}
      chapterId="irasbeli-kivonas"
      title="2. A különbség becslése"
      subtitle="Körülbelül mennyi? Kerekítés százasra és tízesre, a becsült különbség, melyik becslés pontosabb."
      badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_a_kulonbseg_becslese_tananyag.pdf"
      practiceTitle="Készen állsz? Becsüljünk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — BECSLÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
              382 − 145 ≈ 380 − 150 = 230
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Előbb <strong>kerekíts</strong>, aztán <strong>vonj ki</strong>!</li>
              <li>A tízesre kerekített becslés általában <strong>pontosabb</strong>.</li>
              <li>A ≈ jel jelentése: <strong>körülbelül</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 88. o." badgeColor="amber">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Néha elég tudni, hogy <strong>körülbelül</strong> mennyi lesz. Ez a <strong>becslés</strong>.</p>
          <p>Becsléskor kerek számokkal számolunk. Így gyorsan, fejben megy.</p>
          <p>A becslés segít az írásbeli kivonásnál is: megmutatja, jó-e az eredmény.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Kerekítés százasra" badge="50-től felfelé" badgeColor="rose">
        <RoundHundredsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Nézd meg a <strong>tízesek</strong> helyét! Ha 0, 1, 2, 3 vagy 4 áll ott, lefelé kerekítünk. Ha 5, 6, 7, 8 vagy 9, felfelé.</p>
          <p>145 ≈ 100, mert a 4 tízes kevesebb, mint 5. 382 ≈ 400, mert a 8 tízes több. 250 ≈ 300.</p>
        </div>
      </TheorySection>

      <TheorySection title="3. Kerekítés tízesre" badge="5-től felfelé" badgeColor="blue">
        <RoundTensSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Most az <strong>egyesek</strong> helyét nézzük. 382 ≈ 380, mert a 2 kevesebb, mint 5. 145 ≈ 150, mert az 5-öst felfelé kerekítjük.
        </p>
      </TheorySection>

      <TheorySection title="4. Nézzük meg együtt!" badge="Két becslés" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Százasra kerekítve" badge="382 − 145" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>382 ≈ 400, 145 ≈ 100.</li>
              <li>400 − 100 = 300.</li>
              <li>Becslés: <strong>300</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Tízesre kerekítve" badge="382 − 145" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>382 ≈ 380, 145 ≈ 150.</li>
              <li>380 − 150 = 230.</li>
              <li>Becslés: <strong>230</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <CompareEstimatesSvg />
        <TheoryCallout type="tip" title="Melyik a pontosabb?">
          A pontos különbség <strong>237</strong>. A 230 sokkal közelebb van hozzá, mint a 300. A tízesre kerekített becslés pontosabb, a százasra kerekített gyorsabb.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Becslés vásárláskor" badge="Pénz" badgeColor="emerald">
        <ShopEstimateSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          500 Ft-od van, az olló 278 Ft. 278 ≈ 280. 500 − 280 = 220. Körülbelül <strong>220 Ft</strong> marad. (Pontosan 222 Ft.)
        </p>
        <EstimateStripSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          398 − 112: 398 ≈ 400, 112 ≈ 100. 400 − 100 = <strong>300</strong>. Ezért a 300-as dobozba kerül.
        </p>
      </TheorySection>

      <TheorySection title="6. Mire jó a becslés?" badge="Ellenőrzés" badgeColor="sky">
        <EstimateCheckSvg />
        <TheoryCallout type="info" title="Ha messze van, számolj újra!">
          Ha valaki azt kapja, hogy 382 − 145 = 337, a becslés (230) rögtön szól: ez túl sok! Valahol hiba van.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="245 tízesre"
          wrong="245 ≈ 240"
          wrongExplanation="Az 5-ös pont középen van, de ilyenkor felfelé kerekítünk."
          correct="245 ≈ 250"
          correctExplanation="Ha az egyesek helyén 5, 6, 7, 8 vagy 9 áll, felfelé kerekítünk."
          tip="Az 5-ös felfelé visz!"
        />
        <TheoryCallout type="warning" title="A becslés nem a pontos eredmény">
          382 − 145 ≈ 230, de nem egyenlő vele! Ezért írunk ≈ jelet, nem = jelet a kerekítésnél.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="8. Labor I: Becslő gép" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newEst(mode)} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            {([
              [100, 'Százasra'],
              [10, 'Tízesre']
            ] as [Mode, string][]).map(([m, l]) => (
              <button key={m} onClick={() => newEst(m)} className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${mode === m ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-white border-slate-300 text-slate-700'}`}>{l} kerekítek</button>
            ))}
          </div>
          <div className="text-center text-3xl font-black text-slate-800">{et.a} − {et.b}</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { l: `${et.a} ≈`, v: step > 0 ? ra : '?' },
              { l: `${et.b} ≈`, v: step > 1 ? rb : '?' },
              { l: 'becslés', v: step > 2 ? est : '?' }
            ].map((c, i) => (
              <div key={i} className={`rounded-xl p-2 border-2 ${step === i ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50'}`}>
                <div className="text-sm text-slate-600 font-bold">{c.l}</div>
                <div className="text-2xl font-black text-slate-800">{c.v}</div>
              </div>
            ))}
          </div>
          {step < 3 && (
            <>
              <div className="bg-amber-50 rounded-xl p-3 text-center text-amber-900 font-bold">
                {step === 0 && `Kerekítsd ${mode === 100 ? 'százasra' : 'tízesre'} ezt a számot: ${et.a}`}
                {step === 1 && `Most ezt kerekítsd: ${et.b}`}
                {step === 2 && `Most vonj ki: ${ra} − ${rb} = ?`}
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {opts.map((v) => (
                  <Btn key={v} v={v} onClick={() => pick(v)} state={bad === v ? 'bad' : null} />
                ))}
              </div>
            </>
          )}
          {msg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{msg}</div>}
          {step === 3 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800 space-y-1">
              <div>Ügyes! A becslés: {et.a} − {et.b} ≈ {est}.</div>
              <div>A pontos különbség: {exact}. {mode === 100 ? 'Tízesre' : 'Százasra'} kerekítve {estOther} lenne.</div>
              <div>
                {closer === 'this' ? 'Most ez a becslés volt a pontosabb.' : closer === 'other' ? `A ${mode === 100 ? 'tízesre' : 'százasra'} kerekített becslés lett volna pontosabb.` : 'A két becslés egyformán közel van.'} Kérj új feladatot!
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="9. Labor II: Becslés-sáv" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newStrip} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-orange-800 bg-orange-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">Becsüld meg százasra kerekítve! Melyik dobozba kerül?</div>
          <div className="text-center text-3xl font-black text-slate-800">{st.a} − {st.b}</div>
          <div className="grid grid-cols-6 gap-1 sm:gap-2">
            {[0, 100, 200, 300, 400, 500].map((v) => (
              <button
                key={v}
                onClick={() => pickStrip(v)}
                className={`min-h-[56px] rounded-xl text-base sm:text-lg font-black border-2 ${
                  sOk && v === sEst ? 'bg-emerald-500 border-emerald-700 text-white' : sBad === v ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          {sOk && (
            <svg viewBox="0 0 380 70" className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
              <line x1="14" y1="34" x2="366" y2="34" stroke="#334155" strokeWidth="2" />
              {[0, 100, 200, 300, 400, 500].map((v) => (
                <g key={v}>
                  <line x1={SX(v)} y1="26" x2={SX(v)} y2="42" stroke="#334155" strokeWidth="2" />
                  <text x={SX(v)} y="60" textAnchor="middle" fontSize="12" fill="#475569">{v}</text>
                </g>
              ))}
              <rect x={SX(sEst) - 6} y="22" width="12" height="24" rx="3" fill="#16a34a" opacity="0.35" />
              <circle cx={SX(sExact)} cy="34" r="6" fill="#dc2626" />
              <text x={SX(sExact)} y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">pontos: {sExact}</text>
            </svg>
          )}
          {sMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{sMsg}</div>}
          {sOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Jó! {roundTo(st.a, 100)} − {roundTo(st.b, 100)} = {sEst}. A pontos különbség {sExact} – a piros pont mutatja, hol van. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default DiffEstimateG3Theory;
