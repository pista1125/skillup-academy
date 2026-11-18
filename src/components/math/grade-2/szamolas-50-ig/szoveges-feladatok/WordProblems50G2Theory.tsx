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
  WordStepsSvg,
  JoinBarSvg,
  TakeBarSvg,
  CompareDiffSvg,
  TrickyCompareSvg,
  TwoStepBarSvg
} from './WordProblems50G2Figures';
import {
  WP_FONT,
  CompareBarsPart,
  makeWordTask,
  makeCompareTask,
  WORD_KINDS,
  WordKind,
  WordTask,
  CompareTask
} from './WordProblems50G2Parts';

type Msg = { ok: boolean; text: string } | null;

export const WordProblems50G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---------------- Labor I: Melyik művelet? ----------------
  const [kind, setKind] = useState<WordKind | 'mix'>('mix');
  const [task, setTask] = useState<WordTask>(() => makeWordTask('join'));
  const [op, setOp] = useState<'+' | '−' | null>(null);
  const [pick, setPick] = useState<number | null>(null);
  const [msg1, setMsg1] = useState<Msg>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const [counted, setCounted] = useState(false);

  const newTask1 = (k: WordKind | 'mix' = kind) => {
    setKind(k);
    setTask(makeWordTask(k === 'mix' ? undefined : k));
    setOp(null);
    setPick(null);
    setMsg1(null);
    setCounted(false);
  };

  const count = (ok: boolean) => {
    if (!counted) {
      setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }));
      setCounted(true);
    }
  };

  const check1 = () => {
    if (op === null) {
      setMsg1({ ok: false, text: 'Először válaszd ki: összeadás (+) vagy kivonás (−)?' });
      return;
    }
    if (op !== task.op) {
      setMsg1({ ok: false, text: `Még nem jó a művelet. ${task.opHint}` });
      count(false);
      return;
    }
    if (pick === null) {
      setMsg1({ ok: false, text: `A művelet jó: ${task.expr}. Most válaszd ki az eredményt!` });
      return;
    }
    if (pick !== task.answer) {
      const other = task.op === '+' ? task.a - task.b : task.a + task.b;
      setMsg1({
        ok: false,
        text:
          pick === other
            ? `Ez a ${task.op === '+' ? 'kivonás' : 'összeadás'} eredménye lenne. Számold ki: ${task.expr} = ?`
            : `Számold újra: ${task.expr} = ? Tipp: állj meg a kerek tízesnél!`
      });
      count(false);
      return;
    }
    setMsg1({ ok: true, text: `Szuper! ${task.expr} = ${task.answer}. Ellenőrizd: illik a válasz a kérdéshez?` });
    count(true);
  };

  // ---------------- Labor II: Szalagos ábra ----------------
  const [ct, setCt] = useState<CompareTask>(() => ({
    nameA: 'Panni',
    nameB: 'Bence',
    datA: 'Panninak',
    datB: 'Bencének',
    item: 'gyöngye',
    a: 18,
    diff: 7,
    more: true,
    answer: 25
  }));
  const [b, setB] = useState(18);
  const [msg2, setMsg2] = useState<Msg>(null);

  const changeB = (d: number) => {
    setB((v) => Math.min(50, Math.max(1, v + d)));
    setMsg2(null);
  };

  const newTask2 = () => {
    const t = makeCompareTask();
    setCt(t);
    setB(t.a);
    setMsg2(null);
  };

  const check2 = () => {
    if (b === ct.answer) {
      setMsg2({
        ok: true,
        text: `Pontos! ${ct.a} ${ct.more ? '+' : '−'} ${ct.diff} = ${ct.answer}. ${ct.datB} ${ct.answer} ${ct.item} van.`
      });
      return;
    }
    const wrongDir = ct.more ? b < ct.a : b > ct.a;
    if (wrongDir) {
      setMsg2({
        ok: false,
        text: ct.more
          ? `${ct.datB} TÖBB van, ezért a szalagja legyen hosszabb, mint ${ct.a}!`
          : `${ct.datB} KEVESEBB van, ezért a szalagja legyen rövidebb, mint ${ct.a}!`
      });
      return;
    }
    const d = Math.abs(b - ct.a);
    setMsg2({
      ok: false,
      text: `A két szalag különbsége most ${d}. Ennyi kell: ${ct.diff}. ${b < ct.answer ? 'Növeld!' : 'Csökkentsd!'}`
    });
  };

  return (
    <TheoryTemplate
      topicId="g2-numbers-to-50"
      subtopicId="szoveges-feladatok"
      grade={2}
      chapterId="szamolas-50-ig"
      title="5. Szöveges feladatok"
      subtitle="Összesen, marad, mennyivel több, „…-val több / kevesebb”, csavaros szöveg és két lépés – mindez 50-ig."
      badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • TANANYAG"
      themeColor="rose"
      pdfFilename="2_osztaly_szoveges_feladatok_50_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A 4 LÉPÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center text-sm sm:text-base font-black text-rose-900 dark:text-rose-200">
              Mit tudunk? → Mit kérdez? → Számolok → Válaszolok
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Kap még, összesen:</strong> összeadás (+).</li>
              <li><strong>Elvisz, marad, mennyivel több?:</strong> kivonás (−).</li>
              <li><strong>Rajzolj szalagot,</strong> ha nem tudod, mi a jó művelet!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="4 lépés" badgeColor="rose">
        <WordStepsSvg />
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>A szöveges feladat egy kis <strong>történet</strong> számokkal.</p>
          <p>Lassan olvasd el! Keresd meg a <strong>számokat</strong> és a <strong>kérdést</strong>.</p>
          <p>A végén mondatban <strong>válaszolj</strong>!</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Összesen hány lesz?" badge="Összeadás" badgeColor="blue">
        <JoinBarSvg />
        <TheoryTable
          headers={['Ha ezt olvasod…', 'Ezt számolod', 'Példa']}
          rows={[
            ['kap még, hozzátesz', '+', '27 + 8 = 35'],
            ['összesen, együtt', '+', '25 + 20 = 45'],
            ['…-val több (a kérdezett a több)', '+', '18 + 9 = 27']
          ]}
        />
      </TheorySection>

      <TheorySection title="3. Mennyi marad? Mennyi hiányzik?" badge="Kivonás" badgeColor="orange">
        <TakeBarSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Elvétel" badge="marad" badgeColor="orange">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Elvisz, elfogy, kipukkad, elrepül – kevesebb <strong>marad</strong>. Kivonunk.
            </p>
          </TheoryCard>
          <TheoryCard title="Hiányzó rész" badge="még mennyi?" badgeColor="amber">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ismerjük az egészet és az egyik részt. A másik rész: <strong>egész − rész</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Mennyivel több?" badge="Összehasonlítás" badgeColor="amber">
        <CompareDiffSvg />
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Tedd egymás alá a két szalagot! A kilógó rész a <strong>különbség</strong>: <strong>31 − 24 = 7</strong>.
        </p>
      </TheorySection>

      <TheorySection title="5. Csavaros szöveg" badge="Figyelj!" badgeColor="purple">
        <TrickyCompareSvg />
        <TheoryCallout type="warning" title="A „több” szó néha kivonást jelent!">
          „34 tulipán van. <strong>Ez</strong> 9-cel több, mint a nárcisz.” A tulipán a több, a nárcisz a kevesebb. Ezért: <strong>34 − 9 = 25</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Két lépés" badge="Lépésenként" badgeColor="sky">
        <TwoStepBarSvg />
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Ha két dolog történik, két lépésben számolj! Előbb az elsőt, aztán a másodikat.
        </p>
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="emerald">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Összesen" badge="+" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Bencének 29 kártyája van, kap még 6-ot.</li>
              <li>29 + 6 = 29 + 1 + 5 = <strong>35</strong>.</li>
              <li>Válasz: 35 kártyája lesz.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) …-val kevesebb" badge="−" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>A ház 43 lépcsős, a torony 15-tel kevesebb.</li>
              <li>43 − 15 = 43 − 10 − 5 = <strong>28</strong>.</li>
              <li>Válasz: a torony 28 lépcsős.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Két lépés" badge="+ és −" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Lili 22 Ft-ot kapott, majd még 20-at. 15 Ft-ot elköltött.</li>
              <li>22 + 20 = 42, és 42 − 15 = <strong>27</strong>.</li>
              <li>Válasz: 27 Ft-ja maradt.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="„Ez 12-vel több, mint…”"
          wrong="35 kacsa, ez 12-vel több, mint a hattyú → 35 + 12 = 47"
          wrongExplanation="A „több” szót láttad, és összeadtál. De a kacsából van több, nem a hattyúból!"
          correct="35 − 12 = 23 hattyú"
          correctExplanation="A hattyúból van kevesebb, ezért kivonunk."
          tip="Kérdezd meg magadtól: kiből van több? Rajzolj két szalagot!"
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="9. Labor I: Melyik művelet?" badge="Interaktív labor" badgeColor="blue">
        <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {[{ id: 'mix' as const, label: 'Vegyes' }, ...WORD_KINDS].map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => newTask1(k.id)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 min-h-[44px] ${
                  kind === k.id ? 'bg-blue-600 text-white border-blue-700' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/50 rounded-xl p-4 text-center text-lg sm:text-xl font-bold text-blue-950 dark:text-blue-100 leading-relaxed">
            {task.text}
          </div>

          <div className="flex justify-center gap-3">
            {(['+', '−'] as const).map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => {
                  setOp(o);
                  setMsg1(null);
                }}
                className={`w-20 h-16 rounded-2xl text-3xl font-black border-4 ${
                  op === o ? 'bg-blue-600 text-white border-blue-800' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-600'
                }`}
              >
                {o}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {task.options.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setPick(n);
                  setMsg1(null);
                }}
                className={`w-14 h-14 rounded-xl font-black text-xl border-2 ${
                  pick === n ? 'bg-rose-500 text-white border-rose-700' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={check1} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button type="button" onClick={() => newTask1()} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>

          <p className="text-center text-xs font-bold text-slate-500 dark:text-slate-400">
            Eredményed: {score.ok} / {score.all}
          </p>

          {msg1 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {msg1.text}
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="10. Labor II: Szalagos ábra" badge="Interaktív labor" badgeColor="rose">
        <div className="bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-rose-50 dark:bg-rose-950/50 rounded-xl p-4 text-center text-lg sm:text-xl font-bold text-rose-950 dark:text-rose-100 leading-relaxed">
            {ct.datA} {ct.a} {ct.item} van. {ct.datB} {ct.diff} darabbal {ct.more ? 'több' : 'kevesebb'} van.
            <div className="text-base mt-1">Állítsd be {ct.nameB} szalagját!</div>
          </div>

          <svg viewBox="0 0 340 110" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={WP_FONT}>
            <rect x="1" y="1" width="338" height="108" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <CompareBarsPart
              x={10}
              y={22}
              w={320}
              labelW={70}
              rowH={28}
              gap={18}
              scaleMax={50}
              rows={[
                { label: ct.nameA, size: ct.a, text: ct.a, color: 'blue' },
                { label: ct.nameB, size: b, text: b, color: 'amber' }
              ]}
            />
          </svg>
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">A szalagok hossza 50-ig ugyanazzal a mércével változik.</p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {[-10, -1, 1, 10].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => changeB(d)}
                className={`px-4 py-2 rounded-xl font-black text-lg min-h-[48px] min-w-[64px] ${
                  d > 0 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-800'
                }`}
              >
                {d > 0 ? `+${d}` : `−${-d}`}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={check2} className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button type="button" onClick={newTask2} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>

          {msg2 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {msg2.text}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WordProblems50G2Theory;
