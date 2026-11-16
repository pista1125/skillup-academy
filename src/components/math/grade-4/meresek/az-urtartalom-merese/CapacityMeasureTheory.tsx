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
  MeasuringCupsSvg,
  CapacityUnitLadderSvg,
  AquariumsSvg,
  MeasuringVesselsSvg,
  PondPumpChartSvg
} from './CapacityMeasureFigures';

/** ml → „X l Y dl Z cl W ml” olvasható alak */
const fmtCap = (ml: number) => {
  const l = Math.floor(ml / 1000);
  const dl = Math.floor((ml % 1000) / 100);
  const cl = Math.floor((ml % 100) / 10);
  const m = ml % 10;
  const parts: string[] = [];
  if (l) parts.push(`${l} l`);
  if (dl) parts.push(`${dl} dl`);
  if (cl) parts.push(`${cl} cl`);
  if (m) parts.push(`${m} ml`);
  return parts.length ? parts.join(' ') : '0 ml';
};

// ---------------------------------------------------------------------------
// Labor I: töltsd meg a mérőkancsót!
// ---------------------------------------------------------------------------
const TARGETS = [750, 250, 430, 600, 1000, 85, 305, 520, 990];
const POURS = [
  { label: '+ 1 dl', ml: 100 },
  { label: '+ 1 cl', ml: 10 },
  { label: '+ 1 ml', ml: 1 },
  { label: '− 1 dl', ml: -100 },
  { label: '− 1 cl', ml: -10 },
  { label: '− 1 ml', ml: -1 }
];

// ---------------------------------------------------------------------------
// Labor II: átváltó feladatok
// ---------------------------------------------------------------------------
type ConvTask = { text: string; answer: string; options: string[] };
const rnd = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const makeTask = (): ConvTask => {
  const kind = rnd(0, 5);
  let text = '';
  let answer = '';
  let wrong: string[] = [];
  if (kind === 0) {
    const l = rnd(2, 9);
    text = `${l} l = ? dl`;
    answer = `${l * 10} dl`;
    wrong = [`${l * 100} dl`, `${l} dl`, `${l * 1000} dl`];
  } else if (kind === 1) {
    const l = rnd(2, 9);
    text = `${l} l = ? ml`;
    answer = `${l * 1000} ml`;
    wrong = [`${l * 100} ml`, `${l * 10} ml`, `${l} ml`];
  } else if (kind === 2) {
    const cl = rnd(2, 9) * 10 + rnd(1, 9);
    text = `${cl} cl = ? ml`;
    answer = `${cl * 10} ml`;
    wrong = [`${cl * 100} ml`, `${cl} ml`, `${cl * 1000} ml`];
  } else if (kind === 3) {
    const dl = rnd(2, 9);
    text = `${dl} dl = ? cl`;
    answer = `${dl * 10} cl`;
    wrong = [`${dl * 100} cl`, `${dl} cl`, `${dl * 1000} cl`];
  } else if (kind === 4) {
    const l = rnd(1, 3);
    const dl = rnd(1, 9);
    text = `${l} l ${dl} dl = ? dl`;
    answer = `${l * 10 + dl} dl`;
    wrong = [`${l * 100 + dl} dl`, `${l + dl} dl`, `${l * 1000 + dl} dl`];
  } else {
    const ml = rnd(2, 9) * 100;
    text = `${ml} ml = ? dl`;
    answer = `${ml / 100} dl`;
    wrong = [`${ml / 10} dl`, `${ml} dl`, `${ml * 10} dl`];
  }
  const uniq = Array.from(new Set(wrong.filter((w) => w !== answer))).slice(0, 3);
  return { text, answer, options: shuffle([answer, ...uniq]) };
};

const FIRST_TASK: ConvTask = {
  text: '3000 cl = ? l',
  answer: '30 l',
  options: ['300 l', '30 l', '3 l', '3000 l']
};

export const CapacityMeasureTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [tIdx, setTIdx] = useState<number>(0);
  const [inJug, setInJug] = useState<number>(0);
  const [spill, setSpill] = useState<boolean>(false);
  const target = TARGETS[tIdx];
  const done = inJug === target;

  const pour = (ml: number) => {
    const next = inJug + ml;
    if (next > 1000) {
      setSpill(true);
      return;
    }
    setSpill(false);
    setInJug(Math.max(0, next));
  };

  // Labor II
  const [task, setTask] = useState<ConvTask>(FIRST_TASK);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState<{ good: number; all: number }>({ good: 0, all: 0 });

  const pick = (o: string) => {
    if (picked) return;
    setPicked(o);
    setScore((s) => ({ good: s.good + (o === task.answer ? 1 : 0), all: s.all + 1 }));
  };

  const jugTop = 30;
  const jugH = 200;
  const levelY = jugTop + jugH - (jugH * inJug) / 1000;
  const targetY = jugTop + jugH - (jugH * target) / 1000;

  return (
    <TheoryTemplate
      topicId="g4-measurements"
      subtopicId="az-urtartalom-merese"
      title="5. Az űrtartalom mérése"
      subtitle="Liter, deciliter, centiliter és az új egység, a milliliter: mérjünk, váltsunk át, és hasonlítsunk össze folyadékmennyiségeket!"
      badge="4. OSZTÁLY • II. MÉRÉSEK • TANANYAG"
      themeColor="sky"
      pdfFilename="4_osztaly_az_urtartalom_merese_tananyag.pdf"
      practiceTitle="Készen állsz az űrtartalmas feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ ŰRTARTALOM MÉRTÉKEGYSÉGEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center">
              <span className="font-mono text-base font-black text-sky-900 dark:text-sky-200">
                1 l = 10 dl = 100 cl = 1000 ml &nbsp;•&nbsp; 1 dl = 10 cl &nbsp;•&nbsp; 1 cl = 10 ml
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A milliliter jele: <strong>ml</strong>. A nagyon kicsi folyadékmennyiséget milliliterben mérjük.</li>
              <li>A szomszédos egységek között a váltószám mindig <strong>10</strong>.</li>
              <li>Összehasonlítás előtt válts azonos mértékegységre!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? Mennyi fér bele?" badge="Tankönyv 64. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az <strong>űrtartalom</strong> azt mutatja meg, mennyi folyadék fér egy edénybe. Mérőedénnyel mérjük: pohárral, kancsóval, mérőhengerrel.
            </p>
            <p>
              Már tudod: <strong>1 dl = 10 cl</strong> és <strong>1 l = 10 dl = 100 cl</strong>.
            </p>
            <p>
              Mérés előtt mindig <strong>becsülj</strong>, aztán nézd meg, mennyire jártál közel!
            </p>
          </div>
          <MeasuringCupsSvg />
        </div>
      </TheorySection>

      {/* 2. Az új egység: a milliliter */}
      <TheorySection title="2. Az új egység: a milliliter (ml)" badge="Tankönyv 65–66. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Ha nagyon kicsi folyadékmennyiséget szeretnénk mérni (szemcsepp, gyógyszer, injekció), a centiliternél is kisebb egység kell. Ez a <strong>milliliter</strong>.
            </p>
            <p>
              <strong>1 cl = 10 ml</strong>, ezért <strong>1 dl = 100 ml</strong> és <strong>1 l = 1000 ml</strong>.
            </p>
            <TheoryCallout type="tip" title="Hogyan váltsak?">
              Nagyobb egységről kisebbre: a szám <strong>nagyobb</strong> lesz (szorzunk). Kisebb egységről nagyobbra: a szám <strong>kisebb</strong> lesz (osztunk).
            </TheoryCallout>
          </div>
          <CapacityUnitLadderSvg />
        </div>
        <TheoryTable
          headers={['Mi ez?', 'Az űrtartalma', 'Másképp']}
          rows={[
            ['szemcsepp', '10 ml', '1 cl'],
            ['kis pohár joghurt', '200 ml', '2 dl'],
            ['üdítős palack', '250 ml', '25 cl'],
            ['tejesdoboz', '1 l', '10 dl = 1000 ml'],
            ['felmosóvödör', '10 l', '100 dl'],
            ['nagy akvárium', '160 l', '1600 dl']
          ]}
        />
      </TheorySection>

      {/* 3. Nézzük meg együtt! */}
      <TheorySection title="3. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <AquariumsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>A) A három akvárium (Tankönyv 3. feladat).</strong> Váltsuk át literre!
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>3000 cl = 30 l (mert 100 cl = 1 l)</li>
              <li>700 dl = 70 l (mert 10 dl = 1 l)</li>
              <li>Összesen: 160 l + 30 l + 70 l = <strong>260 l</strong></li>
              <li>A legtöbb víz a 160 literesbe fér, a legkevesebb a 3000 cl-esbe.</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="B) Matyi akváriuma" badge="Tankönyv 4. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Összesen 110 dl fér bele.</li>
              <li>Amit beöntött, 30 dl-rel több, mint ami még hiányzik.</li>
              <li>110 − 30 = 80, 80 : 2 = 40 → még <strong>40 dl</strong> hiányzik.</li>
              <li>40 dl = <strong>4 l</strong> (beöntött: 70 dl; 70 − 40 = 30 ✓)</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Locsolás és permetezés" badge="Tankönyv 5. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>2 perc alatt 1880 dl → 1 perc alatt 1880 : 2 = <strong>940 dl</strong></li>
              <li>1 másodperc alatt 12 dl → 5 másodperc alatt 5 · 12 = <strong>60 dl</strong> = 6 l</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MeasuringVesselsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>D) Rendezd csökkenő sorba! (Tankönyv 12. a)</strong> Váltsunk mindent milliliterre:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>80 dl = 8000 ml, 650 cl = 6500 ml, 400 cl = 4000 ml</li>
              <li>60 cl 45 ml = 600 ml + 45 ml = 645 ml</li>
              <li>Sorrend: <strong>80 dl &gt; 650 cl &gt; 6200 ml &gt; 400 cl &gt; 60 cl 45 ml</strong></li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <PondPumpChartSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>E) A dísztó (Munkafüzet 9. feladat).</strong> A 2100 literes tavat szivattyú tölti.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1 perc: 300 l, 2 perc: 600 l, 3 perc: 900 l → percenként <strong>300 l</strong></li>
              <li>2100 : 300 = 7 → a <strong>7. percben</strong> telik meg a tó.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 4. Vigyázz! */}
      <TheorySection title="4. Vigyázz! Nem mindegy a mértékegység!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Csak a számokat hasonlítottad össze?"
          wrong="170 dl < 770 cl, mert 170 < 770"
          wrongExplanation="A mértékegységek különbözőek, ezért a számokat így nem lehet összevetni."
          correct="770 cl = 77 dl, és 77 dl < 170 dl, tehát 770 cl < 170 dl"
          correctExplanation="Előbb váltsd át mindkettőt ugyanarra a mértékegységre, csak utána hasonlíts!"
          tip="1 l = 1000 ml, de 1 dl csak 100 ml, és 1 cl csak 10 ml. Figyelj, melyik egységből váltasz!"
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Labor I: Töltsd meg a mérőkancsót!" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              Önts pontosan <strong>{fmtCap(target)}</strong> vizet a literes kancsóba! A szaggatott vonal mutatja, meddig kell tölteni.
            </p>
            <button
              onClick={() => {
                setTIdx((i) => (i + 1) % TARGETS.length);
                setInJug(0);
                setSpill(false);
              }}
              className="px-4 py-2 rounded-xl bg-sky-100 text-sky-800 font-bold hover:bg-sky-200 active:scale-95 transition"
            >
              Új feladat
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <svg viewBox="0 0 260 260" className="w-full max-w-[260px] mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
              <rect x="70" y={levelY} width="100" height={jugTop + jugH - levelY} fill="#38bdf8" opacity="0.8" />
              <path d={`M 70 ${jugTop} L 70 ${jugTop + jugH} L 170 ${jugTop + jugH} L 170 ${jugTop}`} fill="none" stroke="#334155" strokeWidth="3" />
              <path d={`M 170 ${jugTop + 30} q 40 0 40 50 q 0 50 -40 50`} fill="none" stroke="#334155" strokeWidth="3" />
              {Array.from({ length: 10 }, (_, i) => {
                const y = jugTop + jugH - (jugH * (i + 1)) / 10;
                return (
                  <g key={i}>
                    <line x1="70" y1={y} x2="88" y2={y} stroke="#0f172a" strokeWidth="2" />
                    <text x="64" y={y + 4} textAnchor="end" fontSize="10" fill="#0f172a">{i + 1} dl</text>
                  </g>
                );
              })}
              {Array.from({ length: 100 }, (_, i) =>
                i % 10 === 9 ? null : (
                  <line key={`m${i}`} x1="70" y1={jugTop + jugH - (jugH * (i + 1)) / 100} x2="77" y2={jugTop + jugH - (jugH * (i + 1)) / 100} stroke="#64748b" strokeWidth="0.6" />
                )
              )}
              <line x1="66" y1={targetY} x2="176" y2={targetY} stroke="#dc2626" strokeWidth="2" strokeDasharray="6 4" />
              <text x="130" y="252" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">1 l-es kancsó</text>
            </svg>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {POURS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => pour(p.ml)}
                    className={`min-h-[52px] rounded-xl font-bold text-base active:scale-95 transition ${
                      p.ml > 0 ? 'bg-sky-600 text-white hover:bg-sky-700' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setInJug(0);
                  setSpill(false);
                }}
                className="w-full min-h-[44px] rounded-xl bg-amber-100 text-amber-900 font-bold hover:bg-amber-200 active:scale-95 transition"
              >
                Kiöntöm az egészet
              </button>
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-center">
                <div className="text-xs text-slate-500">A kancsóban most:</div>
                <div className="font-mono text-xl font-black text-sky-900">{fmtCap(inJug)}</div>
                <div className="font-mono text-sm text-sky-800">= {inJug} ml</div>
              </div>
              {spill && (
                <div className="p-2 rounded-xl text-center font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  Hoppá! Ennyi már nem fér a literes kancsóba, kifolyna.
                </div>
              )}
              {done && (
                <div className="p-3 rounded-xl text-center font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Ügyes! {fmtCap(target)} = {target} ml = {target / 10} cl.
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Labor II: Űrtartalom-átváltó" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-slate-700">Válaszd ki a helyes átváltást! (l → dl → cl → ml: lépésenként · 10)</p>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-bold">
              Pontok: {score.good} / {score.all}
            </span>
          </div>
          <div className="text-center font-mono text-3xl font-black text-purple-900 py-3">{task.text}</div>
          <div className="grid grid-cols-2 gap-3">
            {task.options.map((o) => {
              const cls = !picked
                ? 'bg-white border-slate-300 hover:bg-purple-50'
                : o === task.answer
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                  : o === picked
                    ? 'bg-rose-100 border-rose-500 text-rose-900'
                    : 'bg-white border-slate-200 opacity-60';
              return (
                <button key={o} onClick={() => pick(o)} className={`min-h-[56px] rounded-xl border-2 font-mono text-xl font-bold transition active:scale-95 ${cls}`}>
                  {o}
                </button>
              );
            })}
          </div>
          {picked && (
            <div className={`p-3 rounded-xl text-center font-bold ${picked === task.answer ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {picked === task.answer ? 'Szuper, eltaláltad!' : `Nem egészen. A helyes válasz: ${task.answer}.`}
            </div>
          )}
          <div className="text-center">
            <button
              onClick={() => {
                setTask(makeTask());
                setPicked(null);
              }}
              className="px-5 py-3 rounded-xl bg-purple-600 text-white font-bold text-base hover:bg-purple-700 active:scale-95 transition"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CapacityMeasureTheory;
