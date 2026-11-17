import React, { useRef, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { ThermoPartsSvg, AboveBelowZeroSvg, ThermoTypesSvg, WeekForecastSvg, LiftBuildingSvg, DiverDepthSvg } from './NegEverydayG3Figures';
import { Thermo, fmtC } from './NegEverydayG3Parts';

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

// ---------------------------------------------------------------------------
// Labor I – Állítsd be a hőmérőt!
// ---------------------------------------------------------------------------
const L1 = { min: -15, max: 25, yTop: 34, yBot: 274 };
const newTarget = (old: number) => {
  for (;;) {
    const t = Math.random() < 0.6 ? between(-12, -1) : between(0, 20);
    if (t !== old) return t;
  }
};

// ---------------------------------------------------------------------------
// Labor II – Olvasd le!
// ---------------------------------------------------------------------------
interface ReadTask {
  v: number;
  min: number;
  max: number;
  step: number;
  opts: number[];
}
const makeRead = (v: number, step: number): ReadTask => {
  const min = step === 10 ? -20 : -15;
  const max = step === 10 ? 20 : 20;
  const cands = shuffle([v === 0 ? 1 : -v, v + 1, v - 1, v + 2, v - 2].filter((x, i, a) => x !== v && a.indexOf(x) === i && x >= min && x <= max));
  const wrong = v !== 0 ? [-v, ...cands.filter((x) => x !== -v)].slice(0, 3) : cands.slice(0, 3);
  return { v, min, max, step, opts: shuffle([v, ...wrong]) };
};
const newRead = (old: number): ReadTask => {
  for (;;) {
    const v = Math.random() < 0.65 ? between(-14, -1) : between(0, 18);
    if (v !== old) return makeRead(v, Math.random() < 0.7 ? 5 : 10);
  }
};
const FIRST_READ: ReadTask = { v: -7, min: -15, max: 20, step: 5, opts: [-7, 7, -6, -8] };

const btn = 'px-3 py-3 rounded-xl font-bold text-lg min-h-[52px] border-2 transition-colors';

export const NegEverydayG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [target, setTarget] = useState(-4);
  const [cur, setCur] = useState(2);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const ok1 = checked && cur === target;
  const set = (v: number) => {
    if (ok1) return;
    setCur(Math.max(L1.min, Math.min(L1.max, v)));
    setChecked(false);
  };
  const onSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const el = svgRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    if (!box.height) return;
    const y = ((e.clientY - box.top) / box.height) * 320;
    set(Math.round(L1.min + ((L1.yBot - y) / (L1.yBot - L1.yTop)) * (L1.max - L1.min)));
  };
  const check = () => {
    if (ok1) return;
    setChecked(true);
    if (cur === target) setScore((s) => s + 1);
  };
  const feedback1 = (): string => {
    if (!checked) return '';
    if (cur === target) return `Pontosan! A hőmérő ${fmtC(target)}-ot mutat.`;
    if (cur === -target) return `Ez ${fmtC(cur)}. ${target < 0 ? 'A mínusz azt jelenti: a 0 alatt!' : 'Itt nincs mínusz: a 0 fölött kell lennie!'}`;
    if (Math.abs(cur - target) <= 2) return `Majdnem! Most ${fmtC(cur)} van beállítva. Számold újra a vonalakat a 0-tól!`;
    return `Most ${fmtC(cur)} van beállítva. Keresd meg előbb a 0-t, aztán lépj ${target < 0 ? 'lefelé' : 'fölfelé'}!`;
  };

  // Labor II
  const [rt, setRt] = useState<ReadTask>(FIRST_READ);
  const [ans, setAns] = useState<number | null>(null);
  const ok2 = ans === rt.v;
  const hint2 = (): string => {
    if (ans === null) return '';
    if (ok2) return `Ügyes! ${fmtC(rt.v)}.`;
    if (ans === -rt.v) return 'Nézd meg: a 0 fölött vagy a 0 alatt van az oszlop teteje?';
    if (Math.abs(ans - rt.v) === 1) return 'Majdnem! Számold újra a vonalakat a legközelebbi számtól.';
    return 'Keresd meg a 0-t, és onnan számold a vonalakat!';
  };

  return (
    <TheoryTemplate
      topicId="g3-negative-numbers"
      subtopicId="negativ-szamok-a-mindennapokban"
      grade={3}
      chapterId="negativ-szamok"
      title="1. Negatív számok a mindennapokban"
      subtitle="Hőmérő, fagypont, mínusz: hideg napok, pince és víz alatt."
      badge="3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • TANANYAG"
      themeColor="sky"
      pdfFilename="3_osztaly_negativ_szamok_a_mindennapokban_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A FAGYPONT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center text-sm font-black text-sky-900 dark:text-sky-200">
              0 °C a fagypont. Ami a 0 alatt van, az elé mínuszt írunk.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>–3 °C: „mínusz három celziusz-fok”.</li>
              <li>A hőmérőn 1 vonal = 1 fok.</li>
              <li>Mindig a 0-tól kezdj számolni!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 98. o." badgeColor="sky">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Télen néha nagyon hideg van. Befagy a tócsa, és a hőmérő oszlopa a 0 alá süllyed.</p>
          <p>
            Ilyenkor egy új fajta számot használunk: a <strong>negatív számot</strong>. Elé egy kis vonalat írunk, ez a <strong>mínuszjel</strong>: –3.
          </p>
          <p>Megtanulod leolvasni a hőmérőt, és megnézzük, hol találkozol még mínuszos számmal.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. A hőmérő" badge="°C" badgeColor="rose">
        <ThermoPartsSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            A hőmérsékletet <strong>hőmérővel</strong> mérjük. A mértékegysége a <strong>Celsius-fok</strong> (olvasd: celziusz-fok). A jele: <strong>°C</strong>.
          </p>
          <p>A skálán minden kis vonal 1 fok. A piros oszlop teteje mutatja, hány fok van.</p>
        </div>
      </TheorySection>

      <TheorySection title="3. Fagypont fölött, fagypont alatt" badge="0 °C" badgeColor="blue">
        <AboveBelowZeroSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            A víz <strong>0 °C</strong>-on megfagy. Ezért a 0 °C neve: <strong>fagypont</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A 0 fölött: 2 °C, 8 °C, 15 °C … Ilyenkor nincs fagy.</li>
            <li>
              A 0 alatt: –2 °C, –7 °C … Ilyenkor <strong>fagy</strong> van. Ezek a negatív számok.
            </li>
          </ul>
        </div>
        <TheoryCallout type="tip" title="Hogyan olvassuk?">
          –3 °C = „mínusz három celziusz-fok”. Röviden: „mínusz három fok”.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Többféle hőmérő" badge="Munkafüzet 19. o." badgeColor="amber">
        <ThermoTypesSvg />
        <p className="text-sm text-slate-700">A lázmérő és a fürdővíz-hőmérő meleget mér. A kinti hőmérőn télen mínuszt is láthatsz.</p>
      </TheorySection>

      <TheorySection title="5. Időjárás-jelentés" badge="nappal és éjjel" badgeColor="purple">
        <WeekForecastSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            A <strong className="text-rose-600">piros</strong> kör a nappali, a <strong className="text-blue-600">kék</strong> kör az éjszakai hőmérséklet.
          </p>
          <p>Kedden, szerdán és csütörtökön éjjel fagy lesz: ott mínusz van. Pénteken éjjel 0 °C: éppen fagypont.</p>
        </div>
      </TheorySection>

      <TheorySection title="6. Mínusz a liftben és a víz alatt" badge="nem csak a hőmérőn" badgeColor="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <LiftBuildingSvg />
          <DiverDepthSvg />
        </div>
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            A liftben a <strong>földszint</strong> a 0. Fölötte az emeletek: 1, 2. Alatta, a föld alatt: a pince <strong>–1</strong>, a mélygarázs <strong>–2</strong>.
          </p>
          <p>
            A víznél a vízfelszín a 0. A búvár 3 méterrel a víz alatt van: <strong>–3 m</strong>.
          </p>
        </div>
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hány fok van?" badge="0 alatt" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az oszlop a 0 alatt ér véget.</li>
              <li>A 0-tól lefelé számolok: 1, 2, … 7 vonal.</li>
              <li>
                Ez <strong>–7 °C</strong>: mínusz hét fok.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hány fok van?" badge="0 fölött" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az oszlop a 10 fölött ér véget.</li>
              <li>A 10-től fölfelé még 2 vonal.</li>
              <li>
                Ez <strong>12 °C</strong>. Nincs mínusz.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Lesz fagy?" badge="időjárás" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Éjjelre –1 °C várható.</li>
              <li>A –1 a 0 alatt van.</li>
              <li>
                Igen, <strong>fagy lesz</strong>. Kell a sapka!
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ne felejtsd el a mínuszt!"
          wrong="Az oszlop 3 vonallal a 0 alatt van. A hőmérő 3 °C-ot mutat."
          wrongExplanation="A 3 °C a 0 fölött van. Ott meleg van, nem fagy."
          correct="Az oszlop 3 vonallal a 0 alatt van: –3 °C."
          correctExplanation="Ha a 0 alatt van, mindig írd elé a mínuszjelet!"
          tip="Először nézd meg: a 0 fölött vagy a 0 alatt van az oszlop teteje?"
        />
        <TheoryCallout type="warning" title="A 0 °C nem mínusz">
          A 0 °C éppen a fagypont. Nem a fagypont alatt van, hanem pont rajta.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="9. Labor I: Állítsd be a hőmérőt!" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-lg font-black text-sky-900 text-center">
            Állítsd be: <span className="text-2xl">{fmtC(target)}</span>
          </p>
          <div className="flex items-center justify-center gap-4">
            <svg ref={svgRef} viewBox="0 0 140 320" className="w-40 h-auto cursor-pointer select-none" xmlns="http://www.w3.org/2000/svg" onClick={onSvgClick}>
              <Thermo cx={84} yTop={L1.yTop} yBot={L1.yBot} min={L1.min} max={L1.max} value={cur} labelStep={5} tw={14} fs={14} />
            </svg>
            <div className="flex flex-col gap-3">
              <button onClick={() => set(cur + 1)} className={`${btn} bg-rose-50 border-rose-300 text-rose-800`}>
                ▲ melegebb
              </button>
              <button onClick={() => set(cur - 1)} className={`${btn} bg-sky-50 border-sky-300 text-sky-800`}>
                ▼ hidegebb
              </button>
              <button onClick={check} className={`${btn} bg-emerald-500 border-emerald-700 text-white`}>
                Kész!
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center">Koppints a skálára, vagy használd a gombokat!</p>
          {checked && <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok1 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{feedback1()}</div>}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-sky-800">Jó válaszok: {score}</span>
            <button
              onClick={() => {
                setTarget(newTarget(target));
                setChecked(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="10. Labor II: Olvasd le!" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-lg font-black text-rose-900 text-center">Hány °C-ot mutat a hőmérő?</p>
          <svg viewBox={`0 0 120 ${(rt.max - rt.min) * 6 + 76}`} className="w-32 h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
            <Thermo cx={72} yTop={36} yBot={36 + (rt.max - rt.min) * 6} min={rt.min} max={rt.max} value={rt.v} labelStep={rt.step} tw={12} fs={13} />
          </svg>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-md mx-auto">
            {rt.opts.map((o) => {
              const chosen = ans === o;
              const c = chosen ? (ok2 ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-400 text-white border-rose-600') : 'bg-white text-slate-800 border-slate-300 hover:bg-rose-50';
              return (
                <button key={o} onClick={() => !ok2 && setAns(o)} className={`${btn} ${c}`}>
                  {fmtC(o)}
                </button>
              );
            })}
          </div>
          {ans !== null && <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok2 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{hint2()}</div>}
          <button
            onClick={() => {
              setRt(newRead(rt.v));
              setAns(null);
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

export default NegEverydayG3Theory;
