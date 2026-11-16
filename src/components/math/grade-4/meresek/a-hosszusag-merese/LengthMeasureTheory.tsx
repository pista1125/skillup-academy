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
  LengthUnitLadderSvg,
  RulerReadingSvg,
  RoziMapSvg,
  WalkingTwinsSvg,
  FlightAltitudeSvg,
  RunningTrackSvg
} from './LengthMeasureFigures';

const fmtNum = (n: number) => Math.abs(n) < 10000 ? String(n) : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// ---------------------------------------------------------------------------
// Labor II: átváltó feladatok
// ---------------------------------------------------------------------------
type ConvTask = { text: string; answer: string; options: string[] };

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const rnd = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

const makeConvTask = (): ConvTask => {
  const kind = rnd(0, 6);
  let text = '';
  let ans = 0;
  let unit = '';
  let wrong: number[] = [];
  if (kind === 0) {
    const m = rnd(2, 9);
    text = `${m} m = ? cm`;
    ans = m * 100;
    unit = 'cm';
    wrong = [m * 10, m * 1000, m];
  } else if (kind === 1) {
    const km = rnd(2, 9);
    text = `${km} km = ? m`;
    ans = km * 1000;
    unit = 'm';
    wrong = [km * 100, km * 10, km * 10000];
  } else if (kind === 2) {
    const dm = rnd(2, 9);
    text = `${dm} dm = ? cm`;
    ans = dm * 10;
    unit = 'cm';
    wrong = [dm * 100, dm, dm * 1000];
  } else if (kind === 3) {
    const cm = rnd(2, 9);
    text = `${cm} cm = ? mm`;
    ans = cm * 10;
    unit = 'mm';
    wrong = [cm * 100, cm, cm * 1000];
  } else if (kind === 4) {
    const m = rnd(1, 4);
    const cm = rnd(1, 9) * 10 + rnd(0, 9);
    text = `${m} m ${cm} cm = ? cm`;
    ans = m * 100 + cm;
    unit = 'cm';
    wrong = [m * 10 + cm, m + cm, m * 1000 + cm];
  } else if (kind === 5) {
    const km = rnd(1, 4);
    const m = rnd(1, 9) * 100;
    text = `${km} km ${m} m = ? m`;
    ans = km * 1000 + m;
    unit = 'm';
    wrong = [km * 100 + m, km + m, km * 10000 + m];
  } else {
    const m = rnd(1, 3);
    const dm = rnd(1, 9);
    text = `${m} m ${dm} dm = ? dm`;
    ans = m * 10 + dm;
    unit = 'dm';
    wrong = [m * 100 + dm, m + dm, m * 1000 + dm];
  }
  const uniq = Array.from(new Set(wrong.filter((w) => w !== ans))).slice(0, 3);
  const answer = `${fmtNum(ans)} ${unit}`;
  return { text, answer, options: shuffle([answer, ...uniq.map((w) => `${fmtNum(w)} ${unit}`)]) };
};

const FIRST_TASK: ConvTask = {
  text: '3 m 25 cm = ? cm',
  answer: '325 cm',
  options: ['55 cm', '325 cm', '28 cm', '3025 cm']
};

export const LengthMeasureTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: vonalzó-mérő
  const [segMm, setSegMm] = useState<number>(47);
  const [guessCm, setGuessCm] = useState<number>(0);
  const [guessMm, setGuessMm] = useState<number>(0);
  const [rulerChecked, setRulerChecked] = useState<boolean>(false);

  // Labor II: átváltó-gép
  const [task, setTask] = useState<ConvTask>(FIRST_TASK);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState<{ good: number; all: number }>({ good: 0, all: 0 });

  const rulerOk = guessCm * 10 + guessMm === segMm;
  const newSegment = () => {
    let n = segMm;
    while (n === segMm) n = rnd(15, 88);
    setSegMm(n);
    setGuessCm(0);
    setGuessMm(0);
    setRulerChecked(false);
  };

  const pick = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    setScore((s) => ({ good: s.good + (opt === task.answer ? 1 : 0), all: s.all + 1 }));
  };
  const nextTask = () => {
    setTask(makeConvTask());
    setPicked(null);
  };

  const R0 = 30;
  const MMW = 5;

  const stepBtn = 'w-11 h-11 rounded-xl text-xl font-black bg-white border-2 border-slate-300 hover:bg-slate-100 active:scale-95 transition';

  return (
    <TheoryTemplate
      topicId="g4-measurements"
      subtopicId="a-hosszusag-merese"
      title="1. A hosszúság mérése"
      subtitle="Milliméter, centiméter, deciméter, méter és kilométer – mérjünk vonalzóval, váltsunk át mértékegységeket, és számoljunk távolságokkal!"
      badge="4. OSZTÁLY • II. MÉRÉSEK • TANANYAG"
      themeColor="orange"
      pdfFilename="4_osztaly_a_hosszusag_merese_tananyag.pdf"
      practiceTitle="Készen állsz a hosszúságos feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A HOSSZÚSÁG MÉRTÉKEGYSÉGEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center">
              <span className="font-mono text-base font-black text-orange-900 dark:text-orange-200">
                1 km = 1000 m &nbsp;•&nbsp; 1 m = 10 dm = 100 cm = 1000 mm
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>1 dm = 10 cm</strong>, <strong>1 cm = 10 mm</strong>.
              </li>
              <li>Nagyobb egységről kisebbre váltunk: a mérőszám nagyobb lesz (szorzunk).</li>
              <li>Összehasonlítás előtt mindig váltsd át a hosszúságokat ugyanarra az egységre!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? A hosszúság mértékegységei" badge="Tankönyv 54. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A hosszúság alapegysége a <strong>méter (m)</strong>. Ha a métert 10 egyenlő részre vágod, egy rész <strong>1 deciméter</strong> (a méter tized része).
              A méter század része a <strong>centiméter</strong>, ezred része a <strong>milliméter</strong>.
            </p>
            <p>
              Nagy távolságokat <strong>kilométerben (km)</strong> mérünk: <strong>1 km = 1000 m</strong>. Budapesten, a Clark Ádám téren áll a
              <strong> 0 kilométerkő</strong>: innen mérik a magyar főutak hosszát.
            </p>
          </div>
          <LengthUnitLadderSvg />
        </div>
        <TheoryTable
          headers={['Mértékegység', 'Jele', 'Hány van belőle 1 méterben?']}
          rows={[
            ['méter', 'm', '1'],
            ['deciméter', 'dm', '10 (1 tized m)'],
            ['centiméter', 'cm', '100 (1 század m)'],
            ['milliméter', 'mm', '1000 (1 ezred m)'],
            ['kilométer', 'km', '1 km = 1000 m']
          ]}
        />
      </TheorySection>

      {/* 2. Melyik egységet válasszuk? */}
      <TheorySection title="2. Melyik mértékegységgel mérjünk?" badge="Becslés" badgeColor="emerald">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Kicsi dolgok – mm, cm" badge="mm, cm" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              A matematikafüzet vastagsága néhány <strong>mm</strong>. Egy ceruza, egy radír vagy a lépésed hossza <strong>cm</strong>-ben jól megadható.
            </p>
          </TheoryCard>
          <TheoryCard title="Nagyobb dolgok – m, km" badge="m, km" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              A gyerekszoba szélessége néhány <strong>m</strong> (vagy sok <strong>dm</strong>). Két város távolsága, egy kirándulás útja <strong>km</strong>.
            </p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RulerReadingSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Hogyan mérj vonalzóval?</strong> A szakasz eleje a vonalzó <strong>0</strong> jelénél legyen. A számozott vonások a centiméterek, a kis vonások a milliméterek.
            </p>
            <p>
              A rajzon a szakasz a 6-os után még 4 kis vonásig ér: <strong>6 cm 4 mm = 64 mm</strong>.
            </p>
          </div>
        </div>
        <TheoryCallout type="info" title="Lépésekkel mérni nem pontos">
          Ha az udvaron 20 m-t lépéssel mérünk, mindenkinek más szám jön ki, mert nem egyforma hosszút lépünk. Ezért használunk mérőszalagot és vonalzót: ezek mindenkinek ugyanazt mutatják.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Nézzük meg együtt! */}
      <TheorySection title="3. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Gergő távolugrása" badge="Tankönyv 5. feladat" badgeColor="amber">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>Marci 190 cm-t ugrott, 20 cm-rel kisebbet, mint Gergő. Mennyit ugrott Gergő?</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Marci ugrott kevesebbet, tehát Gergőhöz <strong>hozzá kell adni</strong> a 20 cm-t.</li>
                <li>190 cm + 20 cm = <strong>210 cm</strong></li>
                <li>Más egységekkel: 210 cm = 21 dm = 2 m 10 cm = 2100 mm</li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="B) A 0 kilométerkő" badge="Tankönyv 10. feladat" badgeColor="purple">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>A szobor 80 cm-es talapzaton áll, és 3 m magas. Add meg deciméterben!</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>talapzat: 80 cm = <strong>8 dm</strong> (10 cm = 1 dm)</li>
                <li>szobor: 3 m = <strong>30 dm</strong> (1 m = 10 dm)</li>
                <li>együtt: 8 dm + 30 dm = <strong>38 dm</strong></li>
              </ul>
            </div>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RoziMapSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>C) Rozi útja (Tankönyv 7. feladat).</strong> Rozi otthonról indul, és útközben gyümölcsöt vesz a zöldségesnél. Hány métert megy az iskoláig?
            </p>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-center font-mono font-bold text-amber-900">
              550 m + 340 m + 480 m = 1370 m
            </div>
            <p>
              Ha nem vásárol, a nagymamától egyenesen megy: 550 m + 800 m = <strong>1350 m</strong>. Ez 20 m-rel rövidebb.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <TheoryCard title="D) Találkoznak-e?" badge="Tankönyv 2. feladat" badgeColor="sky">
            <WalkingTwinsSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700 leading-relaxed">
              A 20 m-es út két végéről indulnak egymás felé. Ha mindketten 1 m-eseket lépnek, 10 + 10 lépés = 20 m: épp találkoznak. Ha kisebbeket lépnek, még nem.
            </p>
          </TheoryCard>
          <TheoryCard title="E) Repülési magasságok" badge="Munkafüzet 7. feladat" badgeColor="indigo">
            <FlightAltitudeSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Az utasszállító 10 km = 10 000 m magasan repül, a sárkányrepülő 2900 m-en. A különbség: 10 000 m − 2900 m = <strong>7100 m</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="F) Máté futása" badge="Munkafüzet 8. feladat" badgeColor="emerald">
            <RunningTrackSvg className="w-full h-auto mb-2" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Máté 2 km 400 m = 2400 m-t futott a 400 m-es pályán. 2400 : 400 = <strong>6 kör</strong>. Az A pontból indult, és 6 egész kör után újra az <strong>A</strong> pontnál van.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Vigyázz! */}
      <TheorySection title="4. Vigyázz! Ne csak a számokat nézd!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Különböző mértékegységek összehasonlítása"
          wrong="32 cm < 230 mm, mert 32 kisebb, mint 230."
          wrongExplanation="A mértékegységek különbözők! A centiméter tízszer akkora, mint a milliméter, ezért nem elég a számokat összevetni."
          correct="32 cm = 320 mm, és 320 mm > 230 mm, tehát 32 cm > 230 mm."
          correctExplanation="Előbb váltsd át ugyanarra az egységre, csak utána hasonlíts!"
          tip="Ugyanígy: a „vasútállomás 2 km” tábla 2000 m-t jelent, nem 200 m-t!"
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Labor I: Mérj vonalzóval!" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Olvasd le a piros szakasz hosszát! Állítsd be a <strong>cm</strong> és a <strong>mm</strong> számát a gombokkal, majd nyomd meg az <em>Ellenőrzöm</em> gombot.
          </p>
          <svg viewBox="0 0 520 120" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
            <line x1={R0} y1="30" x2={R0 + segMm * MMW} y2="30" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
            <rect x="15" y="48" width="490" height="62" rx="6" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
            {Array.from({ length: 96 }, (_, i) => {
              const x = R0 + i * MMW;
              const h = i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 8;
              return <line key={i} x1={x} y1="48" x2={x} y2={48 + h} stroke="#78350f" strokeWidth={i % 10 === 0 ? 2 : 1} />;
            })}
            {Array.from({ length: 10 }, (_, i) => (
              <text key={i} x={R0 + i * 50} y="86" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">
                {i}
              </text>
            ))}
            {rulerChecked && (
              <line x1={R0 + segMm * MMW} y1="30" x2={R0 + segMm * MMW} y2="70" stroke="#dc2626" strokeDasharray="3 2" />
            )}
          </svg>
          <div className="flex flex-wrap items-center gap-6 justify-center">
            <div className="flex items-center gap-2">
              <button className={stepBtn} onClick={() => setGuessCm((v) => Math.max(0, v - 1))} aria-label="cm csökkentése">−</button>
              <div className="w-20 text-center font-mono text-2xl font-black text-orange-700">{guessCm} cm</div>
              <button className={stepBtn} onClick={() => setGuessCm((v) => Math.min(9, v + 1))} aria-label="cm növelése">+</button>
            </div>
            <div className="flex items-center gap-2">
              <button className={stepBtn} onClick={() => setGuessMm((v) => Math.max(0, v - 1))} aria-label="mm csökkentése">−</button>
              <div className="w-20 text-center font-mono text-2xl font-black text-emerald-700">{guessMm} mm</div>
              <button className={stepBtn} onClick={() => setGuessMm((v) => Math.min(9, v + 1))} aria-label="mm növelése">+</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setRulerChecked(true)}
              className="px-5 py-3 rounded-xl bg-orange-600 text-white font-bold text-base hover:bg-orange-700 active:scale-95 transition"
            >
              Ellenőrzöm
            </button>
            <button
              onClick={newSegment}
              className="px-5 py-3 rounded-xl bg-slate-200 text-slate-800 font-bold text-base hover:bg-slate-300 active:scale-95 transition"
            >
              Új szakasz
            </button>
          </div>
          {rulerChecked && (
            <div
              className={`p-3 rounded-xl text-center font-bold ${rulerOk ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}
            >
              {rulerOk
                ? `Ügyes vagy! A szakasz ${Math.floor(segMm / 10)} cm ${segMm % 10} mm = ${segMm} mm.`
                : `Még nem jó. Te ${guessCm * 10 + guessMm} mm-t állítottál be. Számold meg a teljes centimétereket, aztán a kis vonásokat!`}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Labor II: Átváltó-gép" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-slate-700">Válaszd ki a helyes átváltást! Gondolj a lépcsőre: km → m (· 1000), m → dm → cm → mm (· 10).</p>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-bold">
              Pontok: {score.good} / {score.all}
            </span>
          </div>
          <div className="text-center font-mono text-3xl font-black text-purple-900 py-3">{task.text}</div>
          <div className="grid grid-cols-2 gap-3">
            {task.options.map((opt) => {
              const isAns = opt === task.answer;
              const isPicked = opt === picked;
              const cls = !picked
                ? 'bg-white border-slate-300 hover:bg-purple-50'
                : isAns
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                  : isPicked
                    ? 'bg-rose-100 border-rose-500 text-rose-900'
                    : 'bg-white border-slate-200 opacity-60';
              return (
                <button
                  key={opt}
                  onClick={() => pick(opt)}
                  className={`min-h-[56px] rounded-xl border-2 font-mono text-xl font-bold transition active:scale-95 ${cls}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {picked && (
            <div
              className={`p-3 rounded-xl text-center font-bold ${picked === task.answer ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}
            >
              {picked === task.answer ? 'Szuper, eltaláltad!' : `Nem egészen. A helyes válasz: ${task.answer}.`}
            </div>
          )}
          <div className="text-center">
            <button
              onClick={nextTask}
              className="px-5 py-3 rounded-xl bg-purple-600 text-white font-bold text-base hover:bg-purple-700 active:scale-95 transition"
            >
              Új feladat
            </button>
          </div>
          <TheoryCallout type="tip" title="Segítség">
            3 m 25 cm: a 3 m = 300 cm, ehhez jön még 25 cm, így 325 cm. A 2 km 400 m = 2000 m + 400 m = 2400 m.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default LengthMeasureTheory;
