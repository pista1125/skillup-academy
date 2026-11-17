import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ThreeQuantitiesSvg, MeasuringToolsSvg, KnownUnitsSvg, RightUnitSvg, MeterLiterSvg, EstimateBucketSvg } from './WhatToMeasureG3Figures';
import { IconCard, IconKind } from './WhatToMeasureG3CardFigures';

// ---------------------------------------------------------------------------
// Labor I – Mivel mérjük?
// ---------------------------------------------------------------------------
type Q = 'h' | 't' | 'u';
const TOOL: Record<Q, string> = { h: 'Vonalzó, mérőszalag', t: 'Mérleg', u: 'Mérőpohár, mérőkancsó' };
const QNAME: Record<Q, string> = { h: 'hosszúságot', t: 'tömeget', u: 'űrtartalmat' };
const QABOUT: Record<Q, string> = { h: 'hosszúságról', t: 'tömegről', u: 'űrtartalomról' };
const TOOL_INSTR: Record<Q, string> = { h: 'A vonalzóval és a mérőszalaggal', t: 'A mérleggel', u: 'A mérőpohárral és a mérőkancsóval' };

const TOOL_TASKS: { icon: IconKind; q: string; a: Q }[] = [
  { icon: 'pencil', q: 'Milyen hosszú a ceruza?', a: 'h' },
  { icon: 'melon', q: 'Milyen nehéz a dinnye?', a: 't' },
  { icon: 'bucket', q: 'Mennyi víz fér a vödörbe?', a: 'u' },
  { icon: 'door', q: 'Milyen magas az ajtó?', a: 'h' },
  { icon: 'apple', q: 'Milyen nehéz az alma?', a: 't' },
  { icon: 'tub', q: 'Mennyi víz fér a kádba?', a: 'u' },
  { icon: 'book', q: 'Milyen hosszú a könyv?', a: 'h' },
  { icon: 'book', q: 'Milyen nehéz a könyv?', a: 't' },
  { icon: 'mug', q: 'Mennyi tea fér a bögrébe?', a: 'u' },
  { icon: 'child', q: 'Milyen magas vagy?', a: 'h' },
  { icon: 'child', q: 'Milyen nehéz vagy?', a: 't' },
  { icon: 'milk', q: 'Mennyi tej van a dobozban?', a: 'u' },
  { icon: 'can', q: 'Mennyi víz fér a kannába?', a: 'u' },
  { icon: 'sack', q: 'Milyen nehéz a zsák krumpli?', a: 't' },
  { icon: 'tree', q: 'Milyen magas a kis fa?', a: 'h' }
];

// ---------------------------------------------------------------------------
// Labor II – Válaszd a jó mértékegységet!
// ---------------------------------------------------------------------------
type U = 'cm' | 'm' | 'kg' | 'dl' | 'l';
const UNITS: U[] = ['cm', 'm', 'kg', 'dl', 'l'];
const UQ: Record<U, Q> = { cm: 'h', m: 'h', kg: 't', dl: 'u', l: 'u' };
const USIZE: Record<U, number> = { cm: 1, m: 2, kg: 1, dl: 1, l: 2 };
const UWITH: Record<U, string> = { cm: 'cm-rel', m: 'm-rel', kg: 'kg-mal', dl: 'dl-rel', l: 'l-rel' };

const UNIT_TASKS: { icon: IconKind; before: string; n: number; after: string; a: U }[] = [
  { icon: 'pencil', before: 'A ceruza', n: 15, after: 'hosszú.', a: 'cm' },
  { icon: 'door', before: 'Az ajtó', n: 2, after: 'magas.', a: 'm' },
  { icon: 'melon', before: 'A dinnye tömege', n: 3, after: '.', a: 'kg' },
  { icon: 'glass', before: 'A pohárba', n: 2, after: 'víz fér.', a: 'dl' },
  { icon: 'bucket', before: 'A vödörbe', n: 10, after: 'víz fér.', a: 'l' },
  { icon: 'book', before: 'A füzet', n: 20, after: 'hosszú.', a: 'cm' },
  { icon: 'child', before: 'Apa tömege', n: 80, after: '.', a: 'kg' },
  { icon: 'tub', before: 'A kádba', n: 150, after: 'víz fér.', a: 'l' },
  { icon: 'milk', before: 'A dobozban', n: 1, after: 'tej van.', a: 'l' },
  { icon: 'mug', before: 'A bögrébe', n: 3, after: 'kakaó fér.', a: 'dl' },
  { icon: 'sack', before: 'A zsák krumpli tömege', n: 10, after: '.', a: 'kg' },
  { icon: 'tree', before: 'A fa', n: 5, after: 'magas.', a: 'm' }
];

const pickOther = (len: number, cur: number) => {
  let k = cur;
  while (k === cur) k = Math.floor(Math.random() * len);
  return k;
};

const btn = 'px-3 py-3 rounded-xl font-bold text-sm min-h-[52px] border-2 transition-colors';

export const WhatToMeasureG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [t1, setT1] = useState(0);
  const [pick1, setPick1] = useState<Q | null>(null);
  const task1 = TOOL_TASKS[t1];
  const ok1 = pick1 === task1.a;

  // Labor II
  const [t2, setT2] = useState(0);
  const [pick2, setPick2] = useState<U | null>(null);
  const task2 = UNIT_TASKS[t2];
  const ok2 = pick2 === task2.a;
  const hint2 = (u: U): string => {
    const need = UQ[task2.a];
    if (UQ[u] !== need) return `${u === 'm' || u === 'l' ? 'Az' : 'A'} ${UWITH[u]} ${QNAME[UQ[u]]} mérünk. Itt ${QABOUT[need]} van szó.`;
    if (USIZE[u] > USIZE[task2.a]) return `${task2.n} ${u}? Az túl sok lenne! Kisebb mértékegység kell.`;
    return `${task2.n} ${u}? Az túl kevés lenne! Nagyobb mértékegység kell.`;
  };

  return (
    <TheoryTemplate
      topicId="g3-measurements-1"
      subtopicId="mit-mivel-merunk"
      grade={3}
      chapterId="meresek"
      title="1. Mit mivel mérünk?"
      subtitle="Hosszúság, tömeg, űrtartalom: mivel mérjük, és melyik mértékegységgel?"
      badge="3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_mit_mivel_merunk_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — MIT MÉRÜNK?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center text-sm font-black text-orange-900 dark:text-orange-200">
              hosszúság: m, cm • tömeg: kg • űrtartalom: l, dl
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Milyen hosszú? → vonalzó, mérőszalag.</li>
              <li>Milyen nehéz? → mérleg.</li>
              <li>Mennyi fér bele? → mérőpohár, mérőkancsó.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 44. o." badgeColor="orange">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A konyhában sokat mérünk. Mérünk lisztet, tejet, és megmérjük az asztalt is.</p>
          <p>Most megnézzük: <strong>mit</strong> mérünk, <strong>mivel</strong> mérünk, és <strong>milyen mértékegységet</strong> írunk a szám mellé.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Három kérdés, három mennyiség" badge="Mit mérünk?" badgeColor="amber">
        <ThreeQuantitiesSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Hosszúság" badge="Milyen hosszú?" badgeColor="amber">
            <p className="text-sm text-slate-700">Milyen hosszú, milyen magas, milyen széles?</p>
          </TheoryCard>
          <TheoryCard title="Tömeg" badge="Milyen nehéz?" badgeColor="slate">
            <p className="text-sm text-slate-700">Milyen nehéz a tárgy? Ezt mérlegen nézzük meg.</p>
          </TheoryCard>
          <TheoryCard title="Űrtartalom" badge="Mennyi fér bele?" badgeColor="blue">
            <p className="text-sm text-slate-700">Mennyi víz, tej vagy tea fér az edénybe?</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Ugyanaz a tárgy, más kérdés">
          A könyvnek van hosszúsága és tömege is. A kérdés dönti el, mit mérünk: „Milyen hosszú?” vagy „Milyen nehéz?”
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Mérőeszközök" badge="Mivel mérünk?" badgeColor="emerald">
        <MeasuringToolsSvg />
        <TheoryCallout type="info" title="Sokféle mérleg van">
          Kétkarú mérleg, konyhai mérleg, személymérleg. Mindegyikkel tömeget mérünk.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Mértékegységek, amelyeket már ismersz" badge="m, cm, kg, l, dl" badgeColor="sky">
        <KnownUnitsSvg />
        <MeterLiterSvg />
        <TheoryTable
          headers={['mennyiség', 'mértékegység', 'jele']}
          rows={[
            ['hosszúság', 'méter, centiméter', 'm, cm'],
            ['tömeg', 'kilogramm', 'kg'],
            ['űrtartalom', 'liter, deciliter', 'l, dl']
          ]}
        />
        <TheoryCallout type="info" title="Mi jön még?">
          A következő leckékben megismersz két új, kisebb mértékegységet. A tömegnél a <strong>dekagrammot (dkg)</strong>, az űrtartalomnál a <strong>centilitert (cl)</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Becsülj, aztán mérj!" badge="Becslés" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <EstimateBucketSvg />
          <div className="space-y-2 text-sm text-slate-700">
            <p><strong>Becslés:</strong> mérés előtt tippelsz. Mennyi lehet?</p>
            <p><strong>Mérés:</strong> megnézed mérőeszközzel.</p>
            <p>Utána összeveted a kettőt. A tipp 8 l volt, a mérés 10 l. Csak 2 l volt az eltérés. Ügyes tipp!</p>
          </div>
        </div>
        <RightUnitSvg />
        <TheoryCallout type="tip" title="Gondold végig!">
          A szám mellé mindig írd oda a mértékegységet! Csak a „15” nem mond semmit. A „15 cm” már igen.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) A tök" badge="Mit? Mivel?" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Kérdés: milyen nehéz a tök?</li>
              <li>Ez <strong>tömeg</strong>.</li>
              <li>Mérleg kell hozzá.</li>
              <li>Mértékegység: <strong>kg</strong>. Például 4 kg.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A kancsó" badge="1 l = 10 dl" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A kancsóba 1 l fér.</li>
              <li>Egy kis pohárba 1 dl fér.</li>
              <li>1 l = 10 dl.</li>
              <li>Tehát <strong>10 pohárral</strong> töltöd meg.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) A pad" badge="m vagy cm?" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A pad hosszát mérjük.</li>
              <li>2 cm? Az olyan rövid, mint egy radír vége!</li>
              <li>2 m? Ez jó, ennyi egy hosszú pad.</li>
              <li>Válasz: <strong>2 m</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ugyanaz a szám, más mértékegység"
          wrong="A pohárba 2 l víz fér."
          wrongExplanation="2 l egy nagy palacknyi víz. Ennyi nem fér egy pohárba!"
          correct="A pohárba 2 dl víz fér."
          correctExplanation="A dl kisebb, mint az l. 10 dl tesz ki 1 litert."
          tip="Nézd meg a mértékegységet is, ne csak a számot!"
        />
        <TheoryCallout type="warning" title="Ne keverd össze!">
          A <strong>kg</strong> tömeg, az <strong>l</strong> űrtartalom, a <strong>m</strong> hosszúság. A dinnye nem lehet 3 l, és a pohár nem lehet 2 m!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Mivel mérjük?" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-emerald-50 rounded-xl p-3">
            <div className="w-40 shrink-0">
              <IconCard kind={task1.icon} />
            </div>
            <p className="text-lg font-black text-emerald-900 text-center sm:text-left">{task1.q}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(['h', 't', 'u'] as Q[]).map((q) => {
              const chosen = pick1 === q;
              const cls = chosen ? (ok1 ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-400 text-white border-rose-600') : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50';
              return (
                <button key={q} onClick={() => !ok1 && setPick1(q)} className={`${btn} ${cls}`}>
                  {TOOL[q]}
                </button>
              );
            })}
          </div>
          {pick1 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok1 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {ok1
                ? `Igen! Itt ${QNAME[task1.a]} mérünk.`
                : `${TOOL_INSTR[pick1]} ${QNAME[pick1]} mérünk. A kérdés most: „${task1.q}” Próbáld újra!`}
            </div>
          )}
          <button
            onClick={() => {
              setT1(pickOther(TOOL_TASKS.length, t1));
              setPick1(null);
            }}
            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
          >
            Új feladat
          </button>
        </div>
      </TheorySection>

      <TheorySection title="9. Labor II: Válaszd a jó mértékegységet!" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-sky-50 rounded-xl p-3">
            <div className="w-40 shrink-0">
              <IconCard kind={task2.icon} />
            </div>
            <p className="text-lg font-black text-sky-900 text-center sm:text-left">
              {task2.before} {task2.n}{' '}
              <span className={`inline-block min-w-[3rem] px-2 rounded-lg border-2 ${ok2 ? 'border-emerald-500 bg-emerald-100' : 'border-sky-400 bg-white'}`}>{ok2 ? task2.a : '?'}</span>
              {task2.after === '.' ? '.' : ` ${task2.after}`}
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {UNITS.map((u) => {
              const chosen = pick2 === u;
              const cls = chosen ? (ok2 ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-400 text-white border-rose-600') : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50';
              return (
                <button key={u} onClick={() => !ok2 && setPick2(u)} className={`${btn} text-lg ${cls}`}>
                  {u}
                </button>
              );
            })}
          </div>
          {pick2 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok2 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {ok2 ? `Szuper! ${task2.n} ${task2.a} – ez illik ide.` : hint2(pick2)}
            </div>
          )}
          <button
            onClick={() => {
              setT2(pickOther(UNIT_TASKS.length, t2));
              setPick2(null);
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

export default WhatToMeasureG3Theory;
