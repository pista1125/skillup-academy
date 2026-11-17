import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { TwoSidesSvg, StepsFromZeroSvg, ThermoIsLineSvg, SameDistanceSvg, ReadBetweenSvg } from './NegNumberLineG3Figures';
import { NumberLine, nlX, VNumberLine, fmt } from './NegNumberLineG3Parts';

/** névelő: „az 1”, „az 5”, de „a –1”, „a 3” */
const az = (n: number) => (n === 1 || n === 5 ? 'az' : 'a');
const Az = (n: number) => (n === 1 || n === 5 ? 'Az' : 'A');
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
const randNonZero = (old: number) => {
  for (;;) {
    const v = Math.random() < 0.7 ? between(-9, -1) : between(1, 9);
    if (v !== old) return v;
  }
};

// ---------------------------------------------------------------------------
// Labor I – Tedd a helyére! (koppints a vonalkára)
// ---------------------------------------------------------------------------
const P1 = { from: -10, to: 10, x0: 20, x1: 300 };
const VALS1 = Array.from({ length: 21 }, (_, i) => i - 10);

// ---------------------------------------------------------------------------
// Labor II – Mit mutat a nyíl?
// ---------------------------------------------------------------------------
interface ArrowTask {
  v: number;
  vertical: boolean;
  labels: number[];
  opts: number[];
}
const makeArrow = (v: number, vertical: boolean): ArrowTask => {
  const labels = vertical ? [-5, 0, 5] : Math.random() < 0.5 ? [-1, 0, 1] : [-10, -5, 0, 5, 10];
  const wrong = [v + 1, v - 1, v + 2, v - 2].filter((x) => x !== 0 && x !== -v && x >= -10 && x <= 10);
  const opts = shuffle([v, -v, ...wrong.slice(0, 2)]);
  return { v, vertical, labels, opts };
};
const FIRST_ARROW: ArrowTask = { v: -4, vertical: false, labels: [-1, 0, 1], opts: [-4, 4, -3, -5] };

const btn = 'px-3 py-3 rounded-xl font-bold text-lg min-h-[52px] border-2 transition-colors';

export const NegNumberLineG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [target, setTarget] = useState(-3);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const ok1 = chosen === target;
  const choose = (v: number) => {
    if (ok1) return;
    setChosen(v);
    if (v === target) setScore((s) => s + 1);
  };
  const side = (v: number) => (v < 0 ? 'balra' : 'jobbra');
  const feedback1 = (): string => {
    if (chosen === null) return '';
    if (ok1) return `Igen! ${Az(target)} ${fmt(target)} a 0-tól ${Math.abs(target)} lépéssel ${side(target)} van.`;
    if (chosen === 0) return 'Ez a 0, a határ. Innen indulj!';
    if (chosen === -target) return `Ez ${az(chosen)} ${fmt(chosen)}. ${target < 0 ? 'A mínuszos számok a 0-tól balra vannak!' : 'A mínusz nélküli számok a 0-tól jobbra vannak!'}`;
    if (Math.sign(chosen) === Math.sign(target) && Math.abs(chosen - target) === 1) return `Majdnem! Ez ${az(chosen)} ${fmt(chosen)}. Számold újra a lépéseket a 0-tól – a 0 nem lépés!`;
    return `Ez ${az(chosen)} ${fmt(chosen)}. Indulj a 0-tól, és lépj ${Math.abs(target)} lépést ${side(target)}!`;
  };

  // Labor II
  const [at, setAt] = useState<ArrowTask>(FIRST_ARROW);
  const [ans, setAns] = useState<number | null>(null);
  const ok2 = ans === at.v;
  const hint2 = (): string => {
    if (ans === null) return '';
    if (ok2) return `Ügyes! A nyíl helyén ${az(at.v)} ${fmt(at.v)} áll.`;
    if (ans === -at.v) return at.vertical ? 'Nézd meg: a 0 fölött vagy a 0 alatt van a nyíl?' : 'Nézd meg: a 0-tól balra vagy jobbra van a nyíl?';
    return 'Majdnem! Keresd meg a legközelebbi kiírt számot, és onnan számold a lépéseket!';
  };

  const x1 = (v: number) => nlX(P1, v);

  return (
    <TheoryTemplate
      topicId="g3-negative-numbers"
      subtopicId="szamegyenes-es-a-nulla"
      grade={3}
      chapterId="negativ-szamok"
      title="2. A számegyenes és a nulla"
      subtitle="A 0-tól jobbra és balra: hol laknak a negatív számok?"
      badge="3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="3_osztaly_a_szamegyenes_es_a_nulla_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A SZÁMEGYENES',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center text-sm font-black text-indigo-900 dark:text-indigo-200">
              A 0-tól balra: –1, –2, –3 … A 0-tól jobbra: 1, 2, 3 …
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A 0 nem negatív szám: ő a határ.</li>
              <li>Számold a lépéseket a 0-tól. A 0 nem lépés!</li>
              <li>A hőmérő álló számegyenes: lent vannak a mínuszos számok.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Munkafüzet 22. o." badgeColor="indigo">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A számegyenest már ismered: a 0-tól jobbra sorban jönnek a számok, 1, 2, 3 …</p>
          <p>
            De mi van a 0-tól <strong>balra</strong>? Ott laknak a <strong>negatív számok</strong>: –1, –2, –3 …
          </p>
        </div>
      </TheorySection>

      <TheorySection title="2. A számegyenes két oldala" badge="balra – jobbra" badgeColor="blue">
        <TwoSidesSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A vonalkák egyforma messze vannak egymástól. Minden lépés 1.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Jobbra: 1, 2, 3 … – ezek az eddig ismert számok.</li>
            <li>
              Balra: –1, –2, –3 … – ezek a <strong>negatív számok</strong>.
            </li>
            <li>
              A <strong>0</strong> a kettő között van. Nem negatív szám: ő a határ.
            </li>
          </ul>
        </div>
      </TheorySection>

      <TheorySection title="3. Lépések a 0-tól" badge="hány lépés?" badgeColor="emerald">
        <StepsFromZeroSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            A –3 a 0-tól <strong>3 lépéssel balra</strong> van. A 3 a 0-tól 3 lépéssel jobbra.
          </p>
          <p>A szám mutatja, hány lépés. A mínusz mutatja, merre: balra.</p>
        </div>
        <SameDistanceSvg />
        <TheoryCallout type="tip" title="Ugyanolyan messze">
          A 4 és a –4 ugyanolyan messze van a 0-tól: 4 lépésre. Csak a 0 két oldalán.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. A hőmérő álló számegyenes" badge="Tankönyv 98–99. o." badgeColor="rose">
        <ThermoIsLineSvg />
        <p className="text-sm text-slate-700">
          Ha a számegyenest felállítod, olyan lesz, mint a hőmérő skálája. Ami a fekvő számegyenesen <strong>jobbra</strong> van, az a hőmérőn <strong>fent</strong>. Ami balra, az lent: a 0 alatt.
        </p>
      </TheorySection>

      <TheorySection title="5. Ha nincs minden szám kiírva" badge="számolj!" badgeColor="amber">
        <ReadBetweenSvg />
        <p className="text-sm text-slate-700">Keresd meg a legközelebbi kiírt számot. Onnan számold a lépéseket. Balra haladva: –5, –6, –7.</p>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hol van a –6?" badge="elhelyezés" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Mínusz van előtte: balra megyek.</li>
              <li>A 0-tól lépek: 1, 2, 3, 4, 5, 6.</li>
              <li>
                Itt a <strong>–6</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Mit mutat a nyíl?" badge="leolvasás" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Csak a –1, 0, 1 van kiírva.</li>
              <li>A nyíl a –1-től még 4 lépéssel balra van.</li>
              <li>
                –1, –2, –3, –4, –5: a nyíl a <strong>–5</strong>-öt mutatja.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Számolj visszafelé!" badge="sorozat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>4, 3, 2, 1, 0 …</li>
              <li>A 0 után is lépek balra.</li>
              <li>
                Tovább: <strong>–1, –2, –3</strong>.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A 0 nem lépés"
          wrong="Megszámolom a vonalkákat a 0-val együtt: 0, –1, –2 – ez 3, tehát –3."
          wrongExplanation="A 0-n állsz, onnan indulsz. A 0 még nem lépés."
          correct="A 0-ról lépek: –1 (1 lépés), –2 (2 lépés). Ez a –2."
          correctExplanation="Mindig a lépéseket számold, ne a vonalkákat!"
          tip="Tedd az ujjad a 0-ra, és ugrálj vele!"
        />
        <TheoryCallout type="warning" title="Mínusz = balra">
          A –3 és a 3 nem ugyanott van! A –3 a 0-tól balra, a 3 a 0-tól jobbra.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Tedd a helyére!" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-lg font-black text-indigo-900 text-center">
            Hol van a <span className="text-2xl">{fmt(target)}</span>? Koppints rá!
          </p>
          <svg viewBox="0 0 330 100" className="w-full max-w-xl mx-auto h-auto select-none" xmlns="http://www.w3.org/2000/svg">
            <NumberLine
              {...P1}
              y={56}
              labels={ok1 ? [-10, -5, 0, 5, 10, target] : [-10, -5, 0, 5, 10]}
              fs={13}
              hops={ok1 ? [{ from: 0, to: target, color: '#059669' }] : []}
              points={chosen !== null ? [{ v: chosen, color: ok1 ? '#059669' : '#dc2626' }] : []}
            />
            {VALS1.map((v) => (
              <rect key={v} x={x1(v) - 7} y="20" width="14" height="70" fill="transparent" style={{ cursor: 'pointer' }} onClick={() => choose(v)} />
            ))}
          </svg>
          <p className="text-xs text-slate-500 text-center">Koppints a számegyenes egyik vonalkájára!</p>
          {chosen !== null && <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok1 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{feedback1()}</div>}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-indigo-800">Jó válaszok: {score}</span>
            <button
              onClick={() => {
                setTarget(randNonZero(target));
                setChosen(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="9. Labor II: Mit mutat a nyíl?" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-lg font-black text-emerald-900 text-center">{at.vertical ? 'Álló számegyenes, mint a hőmérő.' : 'Fekvő számegyenes.'} Melyik számot mutatja a nyíl?</p>
          {at.vertical ? (
            <svg viewBox="0 0 160 270" className="w-40 h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
              <VNumberLine from={-10} to={10} x={64} y0={246} y1={26} labels={at.labels} fs={13} arrow={{ v: at.v, text: '?' }} />
            </svg>
          ) : (
            <svg viewBox="0 0 330 100" className="w-full max-w-xl mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
              <NumberLine {...P1} y={62} labels={at.labels} fs={12} arrows={[{ v: at.v, text: '?' }]} />
            </svg>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-md mx-auto">
            {at.opts.map((o) => {
              const c = ans === o ? (ok2 ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-400 text-white border-rose-600') : 'bg-white text-slate-800 border-slate-300 hover:bg-emerald-50';
              return (
                <button key={o} onClick={() => !ok2 && setAns(o)} className={`${btn} ${c}`}>
                  {fmt(o)}
                </button>
              );
            })}
          </div>
          {ans !== null && <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok2 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{hint2()}</div>}
          <button
            onClick={() => {
              setAt(makeArrow(randNonZero(at.v), Math.random() < 0.4));
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

export default NegNumberLineG3Theory;
