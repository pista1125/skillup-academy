import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
} from '../TheoryTemplate';
import {
  Count20ClassificationMapSvg,
  Count20BridgingFrameSvg,
  Count20PyramidSvg,
  Count20RadialWheelSvg,
  Count20GamePathSvg,
  Count20StripRecapSvg,
} from './Count20ExamG2Figures';
import {
  EXAM_G2_TASK_KINDS,
  ExamG2Task,
  ExamG2TaskKind,
  FONT,
  PyramidFig,
  PyramidG2Task,
  makeExamG2Task,
  makePyramidG2Task,
} from './Count20ExamG2Parts';

export const Count20ExamG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // -------------------------------------------------------------------------
  // Labor I: Vegyes feladatok 0–20 között
  // -------------------------------------------------------------------------
  const [kind, setKind] = useState<ExamG2TaskKind>('atl_osszeadas');
  const [task, setTask] = useState<ExamG2Task>(() => makeExamG2Task('atl_osszeadas'));
  const [guess, setGuess] = useState('');
  const [fb1, setFb1] = useState<{ ok: boolean; msg: string } | null>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const [counted, setCounted] = useState(false);

  const newTask = (nextKind: ExamG2TaskKind = kind) => {
    setKind(nextKind);
    setTask(makeExamG2Task(nextKind));
    setGuess('');
    setFb1(null);
    setCounted(false);
  };

  const checkTask = () => {
    const trimmed = guess.trim();
    if (trimmed === '') return;
    const val = Number(trimmed);
    if (Number.isNaN(val)) return;
    const ok = val === task.answer;
    let msg = ok ? `Remek! A helyes válasz valóban ${task.answer}.` : `Még nem jó. Tipp: ${task.hint}`;
    if (!ok) {
      const hit = task.mistakes.find((m) => m.value === val);
      if (hit) msg = hit.msg;
    }
    setFb1({ ok, msg });
    if (!counted) {
      setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }));
      setCounted(true);
    }
  };

  // -------------------------------------------------------------------------
  // Labor II: Háromemeletes számpiramis-építő (0–20)
  // -------------------------------------------------------------------------
  const [pyr, setPyr] = useState<PyramidG2Task>(() => makePyramidG2Task());
  const [inA, setInA] = useState('');
  const [inB, setInB] = useState('');
  const [inC, setInC] = useState('');
  const [fb2, setFb2] = useState<{ ok: boolean; msg: string } | null>(null);

  const newPyramid = () => {
    setPyr(makePyramidG2Task());
    setInA('');
    setInB('');
    setInC('');
    setFb2(null);
  };

  const checkPyramid = () => {
    if (inA.trim() === '' || inB.trim() === '' || inC.trim() === '') {
      setFb2({ ok: false, msg: 'Töltsd ki mindhárom hiányzó téglát!' });
      return;
    }
    const a = Number(inA.trim());
    const b = Number(inB.trim());
    const c = Number(inC.trim());
    if (pyr.mode === 'bottom-up') {
      // a = m1, b = m2, c = top
      if (a === pyr.m1 && b === pyr.m2 && c === pyr.top) {
        setFb2({
          ok: true,
          msg: `Hibátlan piramis! ${pyr.b1} + ${pyr.b2} = ${pyr.m1}, ${pyr.b2} + ${pyr.b3} = ${pyr.m2}, és ${pyr.m1} + ${pyr.m2} = ${pyr.top}.`,
        });
      } else if (a !== pyr.m1) {
        setFb2({ ok: false, msg: `Nézd meg a bal középső téglát: ${pyr.b1} + ${pyr.b2} = ?` });
      } else if (b !== pyr.m2) {
        setFb2({ ok: false, msg: `Nézd meg a jobb középső téglát: ${pyr.b2} + ${pyr.b3} = ?` });
      } else {
        setFb2({ ok: false, msg: `A középső sor jó (${pyr.m1} és ${pyr.m2}), most add össze őket a csúcsba!` });
      }
    } else {
      // mixed: given b1, m1, b3 -> missing: a = b2, b = m2, c = top
      if (a === pyr.b2 && b === pyr.m2 && c === pyr.top) {
        setFb2({
          ok: true,
          msg: `Szuper! Előbb ${pyr.m1} − ${pyr.b1} = ${pyr.b2}, aztán ${pyr.b2} + ${pyr.b3} = ${pyr.m2}, végül ${pyr.m1} + ${pyr.m2} = ${pyr.top}.`,
        });
      } else if (a !== pyr.b2) {
        setFb2({ ok: false, msg: `Kezdd az alsó sor közepével! ${pyr.b1} + ? = ${pyr.m1}` });
      } else if (b !== pyr.m2) {
        setFb2({ ok: false, msg: `Az alsó sor közepe jó (${pyr.b2})! Most számold ki: ${pyr.b2} + ${pyr.b3} = ?` });
      } else {
        setFb2({ ok: false, msg: `Már csak a csúcs hiányzik: ${pyr.m1} + ${pyr.m2} = ?` });
      }
    }
  };

  const pyrRows: (string | number)[][] =
    pyr.mode === 'bottom-up'
      ? [
          [inC.trim() || '?'],
          [inA.trim() || '?', inB.trim() || '?'],
          [pyr.b1, pyr.b2, pyr.b3],
        ]
      : [
          [inC.trim() || '?'],
          [pyr.m1, inB.trim() || '?'],
          [pyr.b1, inA.trim() || '?', pyr.b3],
        ];

  return (
    <TheoryTemplate
      topicId="g2-numbers-to-20"
      subtopicId="megallo"
      grade={2}
      chapterId="szamolas-20-ig"
      title="7. Megálló"
      subtitle="Az I. témakör összefoglalása: számok 0-tól 20-ig, műveletek tízesátlépés nélkül és tízesátlépéssel, szöveges feladatok, számpiramis és Kitekintő fejtörők."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • TANANYAG"
      themeColor="rose"
      pdfFilename="2_osztaly_megallo_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a nagy tudáspróbára?"
      practiceSubtitle="Próbáld ki magad a 90 feladatos, 3 szintes összefoglaló kvízben, vagy játssz a Párosítóval és a Csoportosítóval!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A LEGFONTOSABB SZABÁLYOK 0-TÓL 20-IG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center font-mono text-base font-black text-rose-900 dark:text-rose-200">
              10 egyes = 1 tízes • Mindig állj meg a 10-esnél!
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Tízesátlépés:</strong> 8 + 5 = 8 + 2 + 3 = 13, és 14 − 6 = 14 − 4 − 2 = 8.
              </li>
              <li>
                <strong>Ellenőrzés:</strong> a kivonást összeadással ellenőrizd (14 − 6 = 8, mert 8 + 6 = 14).
              </li>
              <li>
                <strong>Nyitott mondat:</strong> a 0 is lehet megoldás (például □ &lt; 3 esetén: 0, 1, 2).
              </li>
            </ul>
          </div>
        ),
      }}
    >
      {/* 1. Amit már tudsz */}
      <TheorySection title="1. Amit már tudsz az I. témakörből" badge="Ismétlés" badgeColor="blue">
        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-3">
          Nagy utat tettél meg a 0-tól 20-ig! Nézzük át röviden az összes eddigi leckét, hogy a tudáspróbán minden könnyen menjen!
        </p>
        <TheoryTable
          headers={['Lecke', 'Mit gyakoroltunk?', 'Példa']}
          rows={[
            ['1. Számok 0-tól 20-ig', 'helyiérték, szomszédok, páros/páratlan, sorszám', '17 = 1 tízes + 7 egyes; 16 < 17 < 18'],
            ['2. Összeadás 10-ig', '10 bontásai, 0 hozzáadása, 3 tag összege', '3 + 7 = 10; 2 + 5 + 1 = 8'],
            ['3. Kivonás 10-ig', 'elvétel, pótlás, műveletcsalád', '9 − 4 = 5, mert 5 + 4 = 9'],
            ['4. Összeadás 20-ig', '10 + egyesek, tízesátlépés, sorozatok', '7 + 6 = 7 + 3 + 3 = 13'],
            ['5. Kivonás 20-ig', 'tízesátlépés lefelé, kétjegyű − kétjegyű', '15 − 12 = 15 − 10 − 2 = 3'],
            ['6. Szöveges feladatok', 'adatok, terv, fordított összehasonlítás', '„5-tel több” néha kivonást jelent!'],
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Négyféle számcsoport (0–20)" badge="1. lecke" badgeColor="amber">
            <Count20ClassificationMapSvg className="w-full h-auto" />
          </TheoryCard>
          <TheoryCard title="Tízesátlépés 20-as kerettel" badge="4–5. lecke" badgeColor="sky">
            <Count20BridgingFrameSvg className="w-full h-auto" />
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Számpiramis és Kitekintő fejtörők */}
      <TheorySection title="2. Számpiramis és Kitekintő rejtvények" badge="Kitekintő" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TheoryCard title="A) Számpiramis" badge="Megálló" badgeColor="amber">
            <Count20PyramidSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 dark:text-slate-200">
              <li>Felfelé mindig az alatta lévő két tégla összegét írd be!</li>
              <li>Ha a felső adott, kivonással találd meg a hiányzó alsót.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Számpárkerék" badge="Kitekintő" badgeColor="emerald">
            <Count20RadialWheelSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 dark:text-slate-200">
              <li>Egy vonal két végén lévő számok összege a középső szám.</li>
              <li>A sorrend nem számít: az 5 + 7 és a 7 + 5 ugyanaz a pár!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Társasjáték-ösvény" badge="Kitekintő" badgeColor="sky">
            <Count20GamePathSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-4 space-y-1 text-xs text-slate-700 dark:text-slate-200">
              <li>Mondd hangosan minden dobásnál: honnan + mennyit = hova lépsz!</li>
              <li>Előre lépéskor összeadsz, visszalépéskor kivonsz.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szöveges feladatok 5 lépésben */}
      <TheorySection title="3. Szöveges feladat és szalagmodell" badge="Megoldás" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TheoryCard title="Öt biztos lépés" badge="6. lecke" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-200 mb-2">
              <strong>Feladat:</strong> Lili 13 kagylót gyűjtött a parton, 5-tel többet, mint Marci. Hány kagylót gyűjtött Marci?
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-200">
              <li><strong>Adatok:</strong> Lili = 13; Lili 5-tel többet gyűjtött Marcinál.</li>
              <li><strong>Kérdés:</strong> Hány kagylót gyűjtött Marci?</li>
              <li><strong>Terv:</strong> Ha Lili többet szedett, akkor Marci <em>kevesebbet</em>: 13 − 5 = □.</li>
              <li><strong>Számolás és ellenőrzés:</strong> 13 − 5 = 8. Ellenőrzés: 8 + 5 = 13.</li>
              <li><strong>Válasz:</strong> Marci 8 kagylót gyűjtött.</li>
            </ol>
          </TheoryCard>
          <TheoryCard title="Szalagmodell segít!" badge="Ábra" badgeColor="rose">
            <Count20StripRecapSvg className="w-full h-auto" />
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Vigyázz! */}
      <TheorySection title="4. Vigyázz a tipikus csapdákra!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ne dőlj be a „több” szónak!"
          wrong="13 + 5 = 18"
          wrongExplanation="Ha Lili szedett 5-tel többet (13-at), akkor Marci nem szedhetett 18-at!"
          correct="13 − 5 = 8"
          correctExplanation="Mindig kérdezd meg: kinek van kevesebb? Marci kevesebbet gyűjtött, ezért kivonunk."
          tip="Rajzolj két csíkot! A hosszabb csík mindig annál van, akinek több van."
        />
        <TheoryCallout type="warning" title="Kivonásnál balról jobbra! És a 0 is számít!">
          17 − 7 − 3 = 10 − 3 = <strong>7</strong> (soha ne a 7 − 3-mal kezdd!). Nyitott mondatoknál pedig ellenőrizd a <strong>0</strong>-t is: a □ &lt; 4 feltételnek a 0, 1, 2 és 3 felel meg.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Labor I: Vegyes gyakorló */}
      <TheorySection title="5. Labor I: Vegyes feladatgenerátor (0–20)" badge="Labor" badgeColor="amber">
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div>
            <div className="text-xs font-bold text-slate-500 mb-1.5">Válassz témát!</div>
            <div className="flex flex-wrap gap-2">
              {EXAM_G2_TASK_KINDS.map((k) => (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => newTask(k.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-black min-h-[44px] cursor-pointer ${
                    k.id === kind
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  {k.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-center space-y-3">
            <div className="text-2xl font-black text-slate-900">{task.text}</div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <input
                value={guess}
                inputMode="numeric"
                onChange={(e) => {
                  setGuess(e.target.value.replace(/[^0-9]/g, ''));
                  setFb1(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') checkTask();
                }}
                aria-label="A te válaszod"
                placeholder="?"
                className="w-24 text-center text-2xl font-black rounded-xl border-2 border-amber-300 bg-white text-slate-900 px-2 py-2 min-h-[48px]"
              />
              <button
                type="button"
                onClick={checkTask}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm min-h-[48px] cursor-pointer"
              >
                Ellenőrzés
              </button>
              <button
                type="button"
                onClick={() => newTask()}
                className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-black text-sm min-h-[48px] cursor-pointer"
              >
                Új feladat
              </button>
            </div>
            {fb1 && (
              <div
                className={`rounded-xl p-3 text-sm font-bold ${
                  fb1.ok ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                }`}
              >
                {fb1.msg}
                {!fb1.ok && (
                  <button
                    type="button"
                    onClick={() => setGuess(String(task.answer))}
                    className="ml-2 underline cursor-pointer"
                  >
                    Mutasd a megoldást
                  </button>
                )}
              </div>
            )}
            <div className="text-xs font-semibold text-slate-600">
              Eddig: {score.ok} jó válasz / {score.all} feladat
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II: Számpiramis-építő */}
      <TheorySection title="6. Labor II: Számpiramis-építő (0–20)" badge="Labor" badgeColor="sky">
        <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sm sm:text-base font-bold text-sky-950">
            {pyr.mode === 'bottom-up'
              ? 'Add össze az egymás melletti téglákat felfelé!'
              : 'Figyelj! Előbb pótold az alsó sort, aztán építs felfelé!'}
          </div>

          <svg viewBox="0 0 300 108" className="w-full max-w-[360px] h-auto mx-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={FONT}>
            <rect x="1" y="1" width="298" height="106" rx="10" fill="#f8fafc" />
            <PyramidFig cx={150} y={12} bw={46} bh={24} rows={pyrRows} palette="sky" />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
            <label className="flex flex-col items-center text-xs font-bold text-slate-600 dark:text-slate-300 gap-1">
              <span>{pyr.mode === 'bottom-up' ? 'Középső bal tégla' : 'Alsó középső tégla'}</span>
              <input
                value={inA}
                inputMode="numeric"
                onChange={(e) => {
                  setInA(e.target.value.replace(/[^0-9]/g, ''));
                  setFb2(null);
                }}
                placeholder="?"
                className="w-full text-center text-xl font-black rounded-xl border-2 border-sky-300 bg-white text-slate-900 py-2 min-h-[48px]"
              />
            </label>
            <label className="flex flex-col items-center text-xs font-bold text-slate-600 dark:text-slate-300 gap-1">
              <span>Középső jobb tégla</span>
              <input
                value={inB}
                inputMode="numeric"
                onChange={(e) => {
                  setInB(e.target.value.replace(/[^0-9]/g, ''));
                  setFb2(null);
                }}
                placeholder="?"
                className="w-full text-center text-xl font-black rounded-xl border-2 border-sky-300 bg-white text-slate-900 py-2 min-h-[48px]"
              />
            </label>
            <label className="flex flex-col items-center text-xs font-bold text-slate-600 dark:text-slate-300 gap-1">
              <span>Legfelső tégla (csúcs)</span>
              <input
                value={inC}
                inputMode="numeric"
                onChange={(e) => {
                  setInC(e.target.value.replace(/[^0-9]/g, ''));
                  setFb2(null);
                }}
                placeholder="?"
                className="w-full text-center text-xl font-black rounded-xl border-2 border-sky-300 bg-white text-slate-900 py-2 min-h-[48px]"
              />
            </label>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={checkPyramid}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm min-h-[48px] cursor-pointer"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newPyramid}
              className="px-5 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-black text-sm min-h-[48px] cursor-pointer"
            >
              Új feladat
            </button>
          </div>

          {fb2 && (
            <div
              className={`rounded-xl p-3 text-center text-sm font-bold ${
                fb2.ok ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
              }`}
            >
              {fb2.msg}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Count20ExamG2Theory;
