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
  Count50MapSvg,
  Count50PlaceValueSvg,
  Count50NeighborsSvg,
  Count50BridgeSvg,
  Count50EvenOddSvg,
  Count50PyramidSvg
} from './Count50ExamG2Figures';
import {
  EX_FONT,
  PyramidPart,
  EXAM50_TASK_KINDS,
  Exam50Task,
  ExamG2TaskKind,
  makeExam50Task,
  makePyramid50Task,
  Pyramid50Task
} from './Count50ExamG2Parts';

type Msg = { ok: boolean; text: string } | null;

export const Count50ExamG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---------------- Labor I: vegyes feladatok ----------------
  const [kind, setKind] = useState<ExamG2TaskKind>('osszead');
  const [task, setTask] = useState<Exam50Task>(() => makeExam50Task('osszead'));
  const [guess, setGuess] = useState('');
  const [msg1, setMsg1] = useState<Msg>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const [counted, setCounted] = useState(false);

  const newTask = (k: ExamG2TaskKind = kind) => {
    setKind(k);
    setTask(makeExam50Task(k));
    setGuess('');
    setMsg1(null);
    setCounted(false);
  };

  const check1 = () => {
    const t = guess.trim();
    if (t === '' || Number.isNaN(Number(t))) {
      setMsg1({ ok: false, text: 'Írj be egy számot!' });
      return;
    }
    const v = Number(t);
    const ok = v === task.answer;
    let text = ok ? `Remek! A válasz: ${task.answer}.` : `Még nem jó. Tipp: ${task.hint}`;
    if (!ok) {
      const hit = task.mistakes.find((m) => m.value === v);
      if (hit) text = hit.msg;
    }
    setMsg1({ ok, text });
    if (!counted) {
      setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }));
      setCounted(true);
    }
  };

  // ---------------- Labor II: számpiramis ----------------
  const [pyr, setPyr] = useState<Pyramid50Task>(() => ({ b1: 9, b2: 14, b3: 8, m1: 23, m2: 22, top: 45 }));
  const [inA, setInA] = useState('');
  const [inB, setInB] = useState('');
  const [inC, setInC] = useState('');
  const [msg2, setMsg2] = useState<Msg>(null);

  const newPyr = () => {
    setPyr(makePyramid50Task());
    setInA('');
    setInB('');
    setInC('');
    setMsg2(null);
  };

  const check2 = () => {
    const a = Number(inA);
    const b = Number(inB);
    const c = Number(inC);
    if (inA.trim() === '' || a !== pyr.m1) {
      setMsg2({ ok: false, text: `Kezdd a bal középső téglával: ${pyr.b1} + ${pyr.b2} = ?` });
    } else if (inB.trim() === '' || b !== pyr.m2) {
      setMsg2({ ok: false, text: `A bal tégla jó! Most a jobb középső: ${pyr.b2} + ${pyr.b3} = ?` });
    } else if (inC.trim() === '' || c !== pyr.top) {
      setMsg2({ ok: false, text: `A középső sor jó! A csúcs: ${pyr.m1} + ${pyr.m2} = ? Vigyázz a tízesátlépésre!` });
    } else {
      setMsg2({ ok: true, text: `Kész a piramis! ${pyr.m1} + ${pyr.m2} = ${pyr.top}.` });
    }
  };

  const inputCls =
    'w-20 h-14 text-center text-2xl font-black rounded-xl border-2 border-cyan-300 dark:border-cyan-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white';

  return (
    <TheoryTemplate
      topicId="g2-numbers-to-50"
      subtopicId="megallo"
      grade={2}
      chapterId="szamolas-50-ig"
      title="6. Megálló"
      subtitle="A II. témakör összefoglalása: számok 50-ig, számszomszédok, páros és páratlan, összeadás és kivonás tízesátlépéssel, kerek tízesek, szöveges feladatok."
      badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • TANANYAG"
      themeColor="cyan"
      pdfFilename="2_osztaly_megallo_50_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a nagy tudáspróbára?"
      practiceSubtitle="Próbáld ki magad a 90 feladatos, 3 szintes kvízben, vagy játssz a Párosítóval és a Csoportosítóval!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A LEGFONTOSABB SZABÁLYOK 50-IG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-cyan-50/90 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/80 text-center font-mono text-sm sm:text-base font-black text-cyan-900 dark:text-cyan-200">
              Állj meg a kerek tízesnél! 38 + 7 = 38 + 2 + 5 = 45
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Helyiérték:</strong> 37 = 3 tízes + 7 egyes.</li>
              <li><strong>Kerek tízes:</strong> csak a tízes változik: 24 + 20 = 44.</li>
              <li><strong>Ellenőrzés:</strong> 43 − 6 = 37, mert 37 + 6 = 43.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Amit már tudsz" badge="Ismétlés" badgeColor="cyan">
        <Count50MapSvg />
        <TheoryTable
          headers={['Lecke', 'Mit gyakoroltunk?', 'Példa']}
          rows={[
            ['1. Számok 50-ig', 'tízesek és egyesek, szomszédok, páros, páratlan', '37 = 30 + 7; 36 < 37 < 38'],
            ['2. Összeadás 50-ig', 'tízesátlépés, kétjegyű + kétjegyű', '28 + 15 = 28 + 10 + 5 = 43'],
            ['3. Kivonás 50-ig', 'tízesátlépés lefelé, ellenőrzés', '42 − 17 = 42 − 10 − 7 = 25'],
            ['4. Kerek tízesek', 'csak a tízes változik', '47 − 20 = 27'],
            ['5. Szöveges feladatok', '4 lépés, szalagos ábra, csavaros szöveg', '„Ez 9-cel több, mint…”']
          ]}
        />
      </TheorySection>

      <TheorySection title="2. Számok 50-ig" badge="Helyiérték" badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <Count50PlaceValueSvg />
          <Count50NeighborsSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Melyik a nagyobb?" badge="31 > 28" badgeColor="blue">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Előbb a <strong>tízeseket</strong> nézd! Ha egyformák, akkor az egyeseket: 34 &lt; 36.
            </p>
          </TheoryCard>
          <TheoryCard title="Páros és páratlan" badge="0, 2, 4, 6, 8" badgeColor="sky">
            <Count50EvenOddSvg />
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Tízesátlépés oda és vissza" badge="Összeadás, kivonás" badgeColor="emerald">
        <Count50BridgeSvg />
        <TheoryTable
          headers={['Feladat', 'Így bontom', 'Eredmény']}
          rows={[
            ['29 + 6', '29 + 1 + 5', '35'],
            ['36 + 12', '36 + 10 + 2', '48'],
            ['33 + 14', '33 + 10 + 4', '47'],
            ['41 − 5', '41 − 1 − 4', '36'],
            ['50 − 23', '50 − 20 − 3', '27']
          ]}
        />
        <TheoryCallout type="info" title="Számpiramis">
          <Count50PyramidSvg />
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hiányzó szám" badge="19 + □ = 46" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>19 + 1 = 20.</li>
              <li>20 + 26 = 46.</li>
              <li>□ = 1 + 26 = <strong>27</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Két lépés" badge="50 − 15 − 12" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>50 − 15 = <strong>35</strong>.</li>
              <li>35 − 12 = <strong>23</strong>.</li>
              <li>Ellenőrzés: 23 + 12 + 15 = 50.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Csavaros szöveg" badge="kevesebb → +" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Dani 23 kavicsa 8-cal kevesebb, mint Katáé.</li>
              <li>Kata a több: 23 + 8 = <strong>31</strong>.</li>
              <li>Válasz: Katának 31 kavicsa van.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="43 − 6 – ne cseréld meg az egyeseket!"
          wrong="43 − 6 = 43 (6 − 3 = 3)"
          wrongExplanation="A 3-ból nem vehetsz el 6-ot, ezért nem szabad megfordítani! Át kell lépni a 40-et."
          correct="43 − 6 = 43 − 3 − 3 = 37"
          correctExplanation="Előbb lépj vissza a 40-ig (3), aztán még 3-at: 37."
          tip="Ellenőrizd összeadással: 37 + 6 = 43."
        />
        <TheoryCallout type="warning" title="Nyitott mondatnál a 0 is számít!">
          25 + □ &lt; 29 megoldásai: <strong>0, 1, 2, 3</strong>. A 4 már nem jó, mert 25 + 4 = 29.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="6. Labor I: Vegyes gyakorló" badge="Interaktív labor" badgeColor="cyan">
        <div className="bg-white dark:bg-slate-900 border-2 border-cyan-200 dark:border-cyan-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {EXAM50_TASK_KINDS.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => newTask(k.id)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 min-h-[44px] ${
                  kind === k.id ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                {k.label}
              </button>
            ))}
          </div>

          <div className="bg-cyan-50 dark:bg-cyan-950/50 rounded-xl p-4 text-center text-xl sm:text-2xl font-black text-cyan-950 dark:text-cyan-100 leading-relaxed">
            {task.text}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <input
              type="number"
              inputMode="numeric"
              value={guess}
              onChange={(e) => {
                setGuess(e.target.value);
                setMsg1(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') check1();
              }}
              aria-label="Válasz"
              className={inputCls}
            />
            <button type="button" onClick={check1} className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-sm font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button type="button" onClick={() => newTask()} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
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
      <TheorySection title="7. Labor II: Számpiramis-építő" badge="Interaktív labor" badgeColor="amber">
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100 font-bold">
            Két szomszéd tégla összege kerül föléjük. Töltsd ki alulról felfelé!
          </div>

          <svg viewBox="0 0 260 110" className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={EX_FONT}>
            <rect x="1" y="1" width="258" height="108" rx="12" fill="#fffbeb" stroke="#fcd34d" />
            <PyramidPart
              rows={[
                [inC.trim() || '?'],
                [inA.trim() || '?', inB.trim() || '?'],
                [pyr.b1, pyr.b2, pyr.b3]
              ]}
              bw={60}
              bh={30}
              y={10}
            />
          </svg>

          <div className="flex flex-wrap items-end justify-center gap-3">
            <label className="flex flex-col items-center text-xs font-bold text-slate-600 dark:text-slate-300">
              bal közép
              <input type="number" inputMode="numeric" value={inA} onChange={(e) => { setInA(e.target.value); setMsg2(null); }} className={inputCls} />
            </label>
            <label className="flex flex-col items-center text-xs font-bold text-slate-600 dark:text-slate-300">
              jobb közép
              <input type="number" inputMode="numeric" value={inB} onChange={(e) => { setInB(e.target.value); setMsg2(null); }} className={inputCls} />
            </label>
            <label className="flex flex-col items-center text-xs font-bold text-slate-600 dark:text-slate-300">
              csúcs
              <input type="number" inputMode="numeric" value={inC} onChange={(e) => { setInC(e.target.value); setMsg2(null); }} className={inputCls} />
            </label>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={check2} className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button type="button" onClick={newPyr} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
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

export default Count50ExamG2Theory;
