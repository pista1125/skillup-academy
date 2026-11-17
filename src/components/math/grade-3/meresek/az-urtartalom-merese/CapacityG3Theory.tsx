import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ContainersSvg, LiterDlClSvg, MeasuringJugSvg, ClConvertSvg, DrinkChartSvg } from './CapacityG3Figures';
import { FONT, BigJug } from './CapacityG3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** cl → „4 dl 5 cl” alak (1 l alatt), illetve „1 l” */
const dlCl = (c: number) => {
  if (c === 100) return '1 l';
  const d = Math.floor(c / 10);
  const r = c % 10;
  if (d === 0) return `${r} cl`;
  if (r === 0) return `${d} dl`;
  return `${d} dl ${r} cl`;
};

// ---------------------------------------------------------------------------
// Labor II – átváltás
// ---------------------------------------------------------------------------
type Kind = 'l2dl' | 'dl2cl' | 'ldl2dl' | 'cl2dl' | 'lcl2cl' | 'miss';
interface Task { kind: Kind; a: number; b: number; ans: number; text: string; unit: string }
const makeTask = (): Task => {
  const kinds: Kind[] = ['l2dl', 'dl2cl', 'ldl2dl', 'cl2dl', 'lcl2cl', 'miss'];
  const kind = kinds[rnd(0, kinds.length - 1)];
  switch (kind) {
    case 'l2dl': {
      const a = rnd(2, 19);
      return { kind, a, b: 0, ans: a * 10, text: `${a} l =`, unit: 'dl' };
    }
    case 'dl2cl': {
      const a = rnd(2, 19);
      return { kind, a, b: 0, ans: a * 10, text: `${a} dl =`, unit: 'cl' };
    }
    case 'ldl2dl': {
      const b = rnd(1, 9);
      return { kind, a: 1, b, ans: 10 + b, text: `1 l ${b} dl =`, unit: 'dl' };
    }
    case 'cl2dl': {
      const a = 10 * rnd(2, 19);
      return { kind, a, b: 0, ans: a / 10, text: `${a} cl =`, unit: 'dl' };
    }
    case 'lcl2cl': {
      const b = rnd(5, 95);
      return { kind, a: 1, b, ans: 100 + b, text: `1 l ${b} cl =`, unit: 'cl' };
    }
    default: {
      const a = rnd(11, 89);
      return { kind: 'miss', a, b: 0, ans: 100 - a, text: `${a} cl +`, unit: 'cl = 1 l' };
    }
  }
};

const hintFor = (t: Task, v: number): string => {
  switch (t.kind) {
    case 'l2dl':
      return v === t.a * 100 ? 'Ez cl lenne! 1 l = 10 dl. Itt dl kell.' : `1 l = 10 dl. Akkor ${t.a} l = ${t.a} · 10 dl.`;
    case 'dl2cl':
      return v === t.a * 100 ? 'Túl sok! 1 dl = 10 cl, nem 100 cl.' : `1 dl = 10 cl. Akkor ${t.a} dl = ${t.a} · 10 cl.`;
    case 'ldl2dl':
      return v === 1 + t.b ? 'Az 1 l nem 1 dl! 1 l = 10 dl.' : v === 100 + t.b ? 'Ez cl lenne. 1 l = 10 dl!' : `1 l = 10 dl. 10 dl + ${t.b} dl = ?`;
    case 'cl2dl':
      return v === t.a * 10 ? 'Fordítva! A dl a nagyobb, ezért kevesebb lesz belőle. 10 cl = 1 dl.' : `10 cl = 1 dl. Hány tízes van a ${t.a}-ban?`;
    case 'lcl2cl':
      return v === 10 + t.b ? 'Az 1 l nem 10 cl! 1 l = 100 cl.' : v === 1 + t.b ? 'Az 1 l nem 1 cl! 1 l = 100 cl.' : `1 l = 100 cl. 100 cl + ${t.b} cl = ?`;
    default:
      return Math.abs(v + t.a - 100) === 10 ? 'Majdnem! Figyelj a tízesekre. Add össze, és ellenőrizd: 100 lesz?' : `1 l = 100 cl. Mennyi kell még ${t.a}-hoz, hogy 100 legyen?`;
  }
};

const inputCls = 'w-24 text-center text-2xl font-black rounded-xl border-2 border-sky-300 py-2 focus:outline-none focus:border-sky-600';
const btn = 'px-2 py-3 rounded-xl font-bold text-sm min-h-[52px]';

export const CapacityG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I – töltögetés
  const [goal, setGoal] = useState(45);
  const [asDl, setAsDl] = useState(true);
  const [cl, setCl] = useState(0);
  const [spill, setSpill] = useState(false);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const pour = (d: number) => {
    setMsg1(null);
    const n = cl + d;
    if (n > 100) {
      setSpill(true);
      setCl(100);
    } else {
      setSpill(false);
      setCl(Math.max(0, n));
    }
  };
  const newFill = () => {
    let g = rnd(12, 98);
    if (g % 10 === 0) g += 3;
    setGoal(g);
    setAsDl(Math.random() < 0.5);
    setCl(0);
    setSpill(false);
    setMsg1(null);
  };
  const check1 = () => {
    if (cl === goal) setMsg1({ ok: true, text: `Pontosan! ${dlCl(goal)} = ${goal} cl.` });
    else if (cl < goal) setMsg1({ ok: false, text: `Még kevés: ${cl} cl van benne. Hiányzik ${goal - cl} cl. Önts még!` });
    else setMsg1({ ok: false, text: `Túl sok: ${cl} cl van benne. ${cl - goal} cl-t önts ki!` });
  };

  // Labor II – átváltás
  const [task, setTask] = useState<Task>({ kind: 'ldl2dl', a: 1, b: 4, ans: 14, text: '1 l 4 dl =', unit: 'dl' });
  const [inp, setInp] = useState('');
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);
  const check2 = () => {
    const v = parseInt(inp, 10);
    if (v === task.ans) setMsg2({ ok: true, text: `Ügyes! ${task.text} ${task.ans} ${task.unit}.` });
    else setMsg2({ ok: false, text: Number.isNaN(v) ? 'Írj be egy számot!' : hintFor(task, v) });
  };

  return (
    <TheoryTemplate
      topicId="g3-measurements-1"
      subtopicId="az-urtartalom-merese"
      grade={3}
      chapterId="meresek"
      title="3. Az űrtartalom mérése"
      subtitle="Liter, deciliter és az új mértékegység: a centiliter."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG"
      themeColor="sky"
      pdfFilename="3_osztaly_az_urtartalom_merese_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — L, DL, CL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              1 l = 10 dl = 100 cl
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>1 dl = 10 cl.</li>
              <li>cl = centiliter. Ez a legkisebb.</li>
              <li>1 l 25 cl = 100 cl + 25 cl = 125 cl.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 47–48. o." badgeColor="sky">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Az űrtartalom megmutatja, mennyi folyadék fér egy edénybe.</p>
          <p>Már ismered a <strong>litert (l)</strong> és a <strong>decilitert (dl)</strong>. Egy kis kávéscsészébe azonban 1 dl-nél is kevesebb fér. Ehhez kell egy kisebb mértékegység: a <strong>centiliter (cl)</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Mennyi fér bele?" badge="Becslés" badgeColor="blue">
        <ContainersSvg />
        <TheoryCallout type="tip" title="Kicsi, közepes, nagy">
          Kevés folyadékot <strong>cl</strong>-ben mérünk. Egy pohárnyit <strong>dl</strong>-ben. Sok folyadékot <strong>l</strong>-ben.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. l, dl, cl" badge="10-szer, 10-szer" badgeColor="emerald">
        <LiterDlClSvg />
        <TheoryTable
          headers={['nagyobb', 'kisebb']}
          rows={[
            ['1 l', '10 dl'],
            ['1 dl', '10 cl'],
            ['1 l', '100 cl']
          ]}
        />
        <TheoryCallout type="info" title="Miért 100 cl az 1 l?">
          1 l = 10 dl. Minden dl-ben 10 cl van. 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 10 = 100.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Átváltás" badge="l, dl, cl" badgeColor="orange">
        <ClConvertSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Nagyobból kisebbe" badge="több lesz" badgeColor="orange">
            <p className="text-sm text-slate-700">3 dl = 30 cl</p>
            <p className="text-sm text-slate-700">2 l = 20 dl</p>
          </TheoryCard>
          <TheoryCard title="Kisebből nagyobba" badge="kevesebb lesz" badgeColor="purple">
            <p className="text-sm text-slate-700">60 cl = 6 dl</p>
            <p className="text-sm text-slate-700">30 dl = 3 l</p>
          </TheoryCard>
          <TheoryCard title="Kettő együtt" badge="össze" badgeColor="emerald">
            <p className="text-sm text-slate-700">1 l 4 dl = 14 dl</p>
            <p className="text-sm text-slate-700">1 l 40 cl = 140 cl</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="A boltban hallod">
          „Félliteres üveg”: ebbe 5 dl = 50 cl fér. Két ilyen üveg 1 l.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Olvasd le!" badge="Mérőkancsó, diagram" badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MeasuringJugSvg />
          <div className="space-y-2 text-sm text-slate-700">
            <p>A mérőkancsón vonalak vannak. Egy vonal 1 dl.</p>
            <p>A legfelső piros vonal az <strong>1 l</strong>.</p>
          </div>
        </div>
        <DrinkChartSvg />
        <TheoryCallout type="tip" title="Gyümölcsital">
          Almalé 40 cl, narancslé 30 cl, víz 20 cl, citromlé 10 cl. Együtt: 40 + 30 + 20 + 10 = 100 cl = 1 l.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) 1 literre" badge="Pótlás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az üvegben 38 cl szörp van.</li>
              <li>1 l = 100 cl.</li>
              <li>38 + □ = 100.</li>
              <li>Még <strong>62 cl</strong> víz fér bele.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A termosz" badge="Hány csésze?" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A termoszban 4 dl tea van.</li>
              <li>4 dl = 40 cl.</li>
              <li>Egy csészébe 5 cl-t öntesz.</li>
              <li>40 : 5 = 8. <strong>8 csésze</strong> lesz.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Kifolyik!" badge="Fejtörő" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1 l-es üvegben 70 cl víz van.</li>
              <li>Hozzáöntesz 50 cl-t.</li>
              <li>70 + 50 = 120, de csak 100 cl fér bele.</li>
              <li>Az üvegben <strong>1 l</strong> lesz, 20 cl kifolyik.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="1 l = ? cl"
          wrong="1 l = 10 cl"
          wrongExplanation="Az 1 l 10 dl. A cl még kisebb, abból 100 kell!"
          correct="1 l = 100 cl"
          correctExplanation="1 l = 10 dl, és minden dl 10 cl. Ez 100 cl."
          tip="l → dl: 10. dl → cl: 10. l → cl: 100."
        />
        <TheoryCallout type="warning" title="Nem a szám dönt!">
          8 dl vagy 1 l? A 8 nagyobb szám, de az 1 l = 10 dl a több! Előbb váltsd át ugyanarra a mértékegységre.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Töltsd ki pontosan!" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900">
            Ennyit tölts a kancsóba: <span className="text-3xl font-black align-middle ml-2">{asDl ? dlCl(goal) : `${goal} cl`}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <svg viewBox="0 0 220 190" className="w-full max-w-[260px] h-auto mx-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={FONT}>
              <BigJug x={46} y={14} cl={cl} clTicks />
              {spill && (
                <text x="110" y="184" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#dc2626">Kifolyt! Csak 1 l fér bele.</text>
              )}
            </svg>
            <div className="space-y-2">
              <div className="text-center text-lg font-bold text-slate-700">
                Benne van: {cl} cl{cl >= 10 && cl < 100 ? ` = ${dlCl(cl)}` : cl === 100 ? ' = 1 l' : ''}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => pour(10)} className={`${btn} bg-sky-600 text-white`}>+ 1 dl</button>
                <button onClick={() => pour(5)} className={`${btn} bg-sky-500 text-white`}>+ 5 cl</button>
                <button onClick={() => pour(1)} className={`${btn} bg-sky-400 text-white`}>+ 1 cl</button>
                <button onClick={() => pour(-10)} className={`${btn} bg-sky-100 text-sky-900`}>− 1 dl</button>
                <button onClick={() => pour(-5)} className={`${btn} bg-sky-100 text-sky-900`}>− 5 cl</button>
                <button onClick={() => pour(-1)} className={`${btn} bg-sky-100 text-sky-900`}>− 1 cl</button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={check1} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Ellenőrzés</button>
                <button onClick={() => { setCl(0); setSpill(false); setMsg1(null); }} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold min-h-[48px] border-2 border-slate-300">Kiöntöm</button>
                <button onClick={newFill} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
              </div>
            </div>
          </div>
          {msg1 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg1.text}</div>
          )}
        </div>
      </TheorySection>

      <TheorySection title="9. Labor II: Váltsd át!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 rounded-xl p-4 flex flex-wrap items-center justify-center gap-2 text-2xl font-black text-emerald-900">
            <span>{task.text}</span>
            <input
              inputMode="numeric"
              value={inp}
              onChange={(e) => {
                setInp(e.target.value);
                setMsg2(null);
              }}
              className={inputCls}
              aria-label="válasz"
            />
            <span>{task.unit}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={check2} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Ellenőrzés</button>
            <button
              onClick={() => {
                setTask(makeTask());
                setInp('');
                setMsg2(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
          {msg2 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg2.text}</div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CapacityG3Theory;
