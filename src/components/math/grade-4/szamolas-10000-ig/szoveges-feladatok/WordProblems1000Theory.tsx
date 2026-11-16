import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { SolvingStepsSvg, RunnersBarSvg, PairsLineSvg, ColorRodsSvg, MeetingPathSvg, CoinsShareSvg } from './WordProblems1000Figures';

// ---------------------------------------------------------------------------
// Labor I: Lépésről lépésre – a megoldás 6 lépése
// ---------------------------------------------------------------------------
interface StepQ {
  step: string;
  question: string;
  options: string[];
  correct: number;
  ok: string;
}
interface Problem {
  id: string;
  name: string;
  text: string;
  steps: StepQ[];
}

const PROBLEMS: Problem[] = [
  {
    id: 'p1',
    name: 'Sportnap',
    text: 'Az iskolai sportnapon a tanulók ötödrésze, vagyis 154 gyerek vett részt az atlétikai versenyen. Hány tanuló jár ebbe az iskolába?',
    steps: [
      { step: '1. Adatok', question: 'Mit tudunk meg a szövegből?', options: ['154 gyerek az iskola 5 egyenlő részéből 1 rész', '154 gyerek jár az iskolába', '5 gyerek versenyzett'], correct: 0, ok: 'Igen! 154 = az egész 1 ötöd része.' },
      { step: '2. Művelet', question: 'Melyik művelettel kapjuk meg az egészet?', options: ['154 : 5', '154 + 5', '154 · 5'], correct: 2, ok: 'Ügyes! 5 egyenlő rész van, mindegyik 154: 154 · 5.' },
      { step: '3. Becslés', question: 'Mennyi lesz körülbelül?', options: ['kb. 750 (150 · 5)', 'kb. 30', 'kb. 160'], correct: 0, ok: 'Jó becslés: 154 ≈ 150, 150 · 5 = 750.' },
      { step: '4. Számolás', question: '154 · 5 = ?', options: ['720', '770', '550'], correct: 1, ok: '154 · 5 = 770. (4 · 5 = 20, 50 · 5 = 250, 100 · 5 = 500 → 770)' },
      { step: '5. Ellenőrzés', question: 'Hogyan ellenőrizheted?', options: ['154 + 154 + 154 + 154 + 154 = 770', '770 + 5 = 775', '770 − 154 = 616'], correct: 0, ok: 'Igen, ötször összeadva is 770, és közel van a becsléshez (750).' },
      { step: '6. Válasz', question: 'Melyik a jó válasz?', options: ['770 tanuló jár ebbe az iskolába.', '770', '154 tanuló jár ebbe az iskolába.'], correct: 0, ok: 'Szuper! Mindig egész mondattal válaszolj!' }
    ]
  },
  {
    id: 'p2',
    name: 'Könyvvásárlás',
    text: 'Csaba szeretne megvásárolni egy 950 Ft-os könyvet, amelynek hosszabbik oldala 21 cm. Most 485 Ft-ja van. Hány forintot kell még gyűjtenie?',
    steps: [
      { step: '1. Adatok', question: 'Melyik adat FELESLEGES?', options: ['950 Ft', '485 Ft', '21 cm'], correct: 2, ok: 'Igen! A könyv mérete nem kell a számoláshoz.' },
      { step: '2. Művelet', question: 'Melyik nyitott mondat illik?', options: ['485 + □ = 950', '950 + 485 = □', '□ − 950 = 485'], correct: 0, ok: 'A meglévő 485 Ft-hoz még □ Ft kell, hogy 950 legyen.' },
      { step: '3. Becslés', question: 'Mennyi lesz körülbelül?', options: ['kb. 1450', 'kb. 450 (950 − 500)', 'kb. 50'], correct: 1, ok: '485 ≈ 500, 950 − 500 = 450.' },
      { step: '4. Számolás', question: '950 − 485 = ?', options: ['565', '475', '465'], correct: 2, ok: '950 − 485 = 465.' },
      { step: '5. Ellenőrzés', question: 'Hogyan ellenőrizheted?', options: ['465 + 485 = 950', '465 − 485 = 950', '950 + 465 = 1415'], correct: 0, ok: 'Pontosan: 465 + 485 = 950 ✓' },
      { step: '6. Válasz', question: 'Melyik a jó válasz?', options: ['Csaba 950 Ft-ot gyűjt.', 'Csabának még 465 Ft-ot kell gyűjtenie.', '465 cm'], correct: 1, ok: 'Szuper! A válaszban ott a mértékegység is (Ft).' }
    ]
  },
  {
    id: 'p3',
    name: 'Futóverseny',
    text: 'A városi futóversenyre 613 versenyző nevezett. Hány felnőtt vett részt a versenyen, ha a gyerekek közül 88 lány és háromszor ennyi fiú nevezett?',
    steps: [
      { step: '1. Adatok', question: 'Hány fiú nevezett?', options: ['88', '3 · 88 = 264', '88 + 3 = 91'], correct: 1, ok: 'Háromszor ennyi: 3 · 88 = 264 fiú.' },
      { step: '2. Művelet', question: 'Hogyan kapjuk meg a felnőtteket?', options: ['613 − 88 − 264', '613 + 88 + 264', '613 − 88'], correct: 0, ok: 'Az összesből elvesszük a lányokat és a fiúkat.' },
      { step: '3. Becslés', question: 'Mennyi lesz körülbelül?', options: ['kb. 900', 'kb. 520', 'kb. 250 (610 − 90 − 270)'], correct: 2, ok: '610 − 90 − 270 = 250.' },
      { step: '4. Számolás', question: '613 − 88 − 264 = ?', options: ['261', '349', '271'], correct: 0, ok: '613 − 88 = 525, 525 − 264 = 261.' },
      { step: '5. Ellenőrzés', question: 'Hogyan ellenőrizheted?', options: ['88 + 264 + 261 = 613', '261 − 88 = 173', '613 + 261 = 874'], correct: 0, ok: 'Lányok + fiúk + felnőttek = 613 ✓' },
      { step: '6. Válasz', question: 'Melyik a jó válasz?', options: ['261 fiú nevezett.', '261 felnőtt vett részt a versenyen.', '613 felnőtt futott.'], correct: 1, ok: 'Szuper! Pontosan arra válaszoltál, amit kérdeztek.' }
    ]
  }
];

const StepsLab: React.FC = () => {
  const [pIdx, setPIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const p = PROBLEMS[pIdx];
  const s = p.steps[stepIdx];
  const done = stepIdx >= p.steps.length - 1 && picked === s.correct;

  const reset = (i: number) => {
    setPIdx(i);
    setStepIdx(0);
    setPicked(null);
  };

  return (
    <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {PROBLEMS.map((pr, i) => (
          <button
            key={pr.id}
            onClick={() => reset(i)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${i === pIdx ? 'bg-teal-500 text-white border-teal-500' : 'bg-teal-50 text-teal-800 border-teal-200'}`}
          >
            {pr.name}
          </button>
        ))}
      </div>
      <div className="bg-teal-50 rounded-xl p-4 text-slate-800 font-medium">{p.text}</div>
      <div className="flex gap-1">
        {p.steps.map((st, i) => (
          <div key={st.step} className={`flex-1 h-3 rounded-full ${i < stepIdx || (i === stepIdx && picked === s.correct) ? 'bg-teal-500' : i === stepIdx ? 'bg-amber-300' : 'bg-slate-200'}`} />
        ))}
      </div>
      <div className="space-y-3">
        <div className="text-sm font-black text-teal-700 uppercase">{s.step}</div>
        <div className="text-lg font-bold text-slate-800">{s.question}</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {s.options.map((o, i) => (
            <button
              key={o}
              onClick={() => setPicked(i)}
              className={`min-h-[3.5rem] px-3 py-2 rounded-xl font-bold border-2 text-left transition ${
                picked === i ? (i === s.correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-400 text-red-700') : 'bg-white border-slate-200 hover:border-teal-400'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
        {picked !== null && (
          <div className={`rounded-xl p-3 font-bold ${picked === s.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-700'}`}>
            {picked === s.correct ? `✓ ${s.ok}` : 'Még nem jó. Olvasd el újra a szöveget, és próbáld újra!'}
          </div>
        )}
        <div className="flex justify-end gap-2">
          {picked === s.correct && !done && (
            <button
              onClick={() => {
                setStepIdx(stepIdx + 1);
                setPicked(null);
              }}
              className="px-5 py-3 rounded-xl bg-teal-600 text-white font-black"
            >
              Következő lépés →
            </button>
          )}
          {done && (
            <button onClick={() => reset((pIdx + 1) % PROBLEMS.length)} className="px-5 py-3 rounded-xl bg-amber-500 text-white font-black">
              🎉 Kész! Jöhet a következő feladat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II: Találkozás-labor – percről percre táblázat
// ---------------------------------------------------------------------------
const MEET_PRESETS = [
  { a: 140, b: 60, d: 1000 },
  { a: 120, b: 80, d: 1000 },
  { a: 150, b: 100, d: 1000 },
  { a: 90, b: 60, d: 600 }
];

const MeetingLab: React.FC = () => {
  const [pi, setPi] = useState(0);
  const [min, setMin] = useState(0);
  const pr = MEET_PRESETS[pi];
  const a = pr.a * min;
  const b = pr.b * min;
  const met = a + b >= pr.d;
  const W = 300;
  const ax = 20 + (Math.min(a, pr.d) / pr.d) * W;
  const bx = 20 + W - (Math.min(b, pr.d) / pr.d) * W;

  return (
    <div className="bg-white border-2 border-lime-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {MEET_PRESETS.map((m, i) => (
          <button
            key={i}
            onClick={() => {
              setPi(i);
              setMin(0);
            }}
            className={`px-3 py-2 rounded-xl text-sm font-bold border-2 ${i === pi ? 'bg-lime-600 text-white border-lime-600' : 'bg-lime-50 text-lime-800 border-lime-200'}`}
          >
            {m.d} m: 🚲 {m.a} m/perc, 🚶 {m.b} m/perc
          </button>
        ))}
      </div>
      <svg viewBox="0 0 340 90" className="w-full h-auto bg-lime-50 rounded-xl border border-lime-100">
        <line x1="20" y1="50" x2="320" y2="50" stroke="#65a30d" strokeWidth="6" strokeLinecap="round" />
        <line x1={20} y1="50" x2={ax} y2="50" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
        <line x1={bx} y1="50" x2={320} y2="50" stroke="#db2777" strokeWidth="6" strokeLinecap="round" />
        <text x={ax} y="38" fontSize="18" textAnchor="middle">🚲</text>
        <text x={bx} y="80" fontSize="18" textAnchor="middle">🚶</text>
        <text x="20" y="22" fontSize="10" fontWeight="bold" fill="#1d4ed8">Ádám</text>
        <text x="320" y="22" fontSize="10" fontWeight="bold" textAnchor="end" fill="#be185d">Roland</text>
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={() => setMin(Math.max(0, min - 1))} className="h-12 px-4 rounded-xl bg-slate-100 font-black border-2 border-slate-200">− 1 perc</button>
        <div className="text-xl font-black text-slate-800 w-28 text-center">{min}. perc</div>
        <button onClick={() => !met && setMin(min + 1)} disabled={met} className="h-12 px-4 rounded-xl bg-lime-600 text-white font-black disabled:opacity-40">+ 1 perc</button>
      </div>
      <TheoryTable
        headers={['Eltelt idő', 'Ádám', 'Roland', 'Együtt']}
        rows={Array.from({ length: min }, (_, i) => [
          `${i + 1} perc`,
          `${pr.a * (i + 1)} m`,
          `${pr.b * (i + 1)} m`,
          `${(pr.a + pr.b) * (i + 1)} m`
        ])}
      />
      <div className={`rounded-xl p-3 font-bold text-center ${met ? 'bg-green-100 text-green-800' : 'bg-slate-50 text-slate-600'}`}>
        {met
          ? `Találkoztak! ${min} perc alatt együtt ${a + b} m-t tettek meg. Ádám ${a} m-t, Roland ${b} m-t ment.`
          : `Percenként együtt ${pr.a + pr.b} m-rel kerülnek közelebb. Még ${pr.d - a - b} m van köztük.`}
      </div>
    </div>
  );
};

export const WordProblems1000Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="szoveges-feladatok"
      title="6. Szöveges feladatok"
      subtitle="Adatok, rajz, becslés, számolás, ellenőrzés, válasz – így oldj meg bármilyen szöveges feladatot!"
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="teal"
      pdfFilename="4_osztaly_szoveges_feladatok_tananyag.pdf"
      practiceTitle="Készen állsz a szöveges feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A MEGOLDÁS LÉPÉSEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center">
              <span className="font-mono text-sm font-black text-teal-900 dark:text-teal-200">Adatok → Terv (művelet, rajz) → Becslés → Számolás → Ellenőrzés → Válasz</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Olvasd el figyelmesen! <strong>Mit tudunk?</strong> <strong>Mit kérdeznek?</strong></li>
              <li>Segít a <strong>rajz</strong>: szakaszos ábra, számegyenes, színes rudak, táblázat, elágazásos rajz.</li>
              <li>Figyelj: lehet <strong>felesleges</strong> adat, és <strong>hiányozhat</strong> is adat!</li>
              <li>A válasz <strong>egész mondat</strong>, mértékegységgel.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk? A megoldás 6 lépése" badge="Tankönyv 23. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SolvingStepsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Az iskolai sportnapon a tanulók ötödrésze, vagyis 154 gyerek vett részt az atlétikai versenyen. Hány tanuló jár ebbe az iskolába?</strong>
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Adatok:</strong> 154 gyerek = az iskola 5 egyenlő részéből 1 rész.</li>
              <li><strong>Művelet:</strong> 154 · 5 = □</li>
              <li><strong>Becslés:</strong> 154 ≈ 150, 150 · 5 = 750.</li>
              <li><strong>Számolás:</strong> 154 · 5 = 770.</li>
              <li><strong>Ellenőrzés:</strong> 154 + 154 + 154 + 154 + 154 = 770 ✓, és közel van a becsléshez.</li>
              <li><strong>Válasz:</strong> 770 tanuló jár ebbe az iskolába.</li>
            </ol>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="2. Nézzük meg együtt! – Rajzolj a feladathoz" badge="Mintapéldák" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Szakaszos ábra – futóverseny" badge="TK 23/2." badgeColor="orange">
            <RunnersBarSvg className="w-full h-auto mb-3" />
            <div className="text-sm text-slate-700 space-y-1">
              <p>613 versenyző: 88 lány, háromszor ennyi fiú, a többi felnőtt.</p>
              <p>1. Fiúk: 3 · 88 = <strong>264</strong></p>
              <p>2. Gyerekek: 88 + 264 = <strong>352</strong></p>
              <p>3. Felnőttek: 613 − 352 = <strong>261</strong></p>
              <p>Válasz: <strong>261 felnőtt</strong> vett részt a versenyen.</p>
            </div>
          </TheoryCard>
          <TheoryCard title="B) Számegyenes – sorban állás" badge="TK 23/4." badgeColor="sky">
            <PairsLineSvg className="w-full h-auto mb-3" />
            <div className="text-sm text-slate-700 space-y-1">
              <p>22 gyerek párosával áll, a párok között 50 cm van.</p>
              <p>1. Párok: 22 : 2 = <strong>11 pár</strong></p>
              <p>2. Közök: 11 pár között <strong>10 köz</strong> van.</p>
              <p>3. Hossz: 10 · 50 cm = 500 cm = <strong>5 m</strong></p>
            </div>
          </TheoryCard>
          <TheoryCard title="C) Színes rudak – életkorok" badge="TK 24/6." badgeColor="purple">
            <ColorRodsSvg className="w-full h-auto mb-3" />
            <div className="text-sm text-slate-700 space-y-1">
              <p>Anyukája 3-szor, nagymamája 6-szor annyi idős, mint Kristóf. Együtt 110 évesek.</p>
              <p>1. Részek: 1 + 3 + 6 = <strong>10 kocka</strong></p>
              <p>2. Egy kocka: 110 : 10 = <strong>11</strong></p>
              <p>Kristóf <strong>11</strong>, anyukája 3 · 11 = <strong>33</strong>, nagymamája 6 · 11 = <strong>66</strong> éves. (11 + 33 + 66 = 110 ✓)</p>
            </div>
          </TheoryCard>
          <TheoryCard title="D) Táblázat – találkozás" badge="TK 24/8." badgeColor="emerald">
            <MeetingPathSvg className="w-full h-auto mb-3" />
            <div className="text-sm text-slate-700 space-y-1">
              <p>Egymástól 1000 m-re laknak. Ádám 140 m-t, Roland 60 m-t tesz meg percenként.</p>
              <p>Percenként együtt: 140 + 60 = <strong>200 m</strong>.</p>
              <p>1000 : 200 = <strong>5 perc</strong> múlva találkoznak. Ádám 5 · 140 = <strong>700 m</strong>-t, Roland 5 · 60 = <strong>300 m</strong>-t tett meg.</p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Még több ötlet: pénz, sorrend, visszafelé" badge="Feladatok" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2">
            <CoinsShareSvg />
            <p className="text-sm text-slate-700">
              <strong>Máté 350 Ft, Ádám 650 Ft</strong> (TK 25/12.). Együtt 1000 Ft, ennek fele 500 Ft. Ádám 650 − 500 = <strong>150 Ft-ot</strong> ad Máténak. Ellenőrzés: 350 + 150 = 500 ✓
            </p>
          </div>
          <TheoryTable
            headers={['Feladat', 'Ötlet', 'Megoldás']}
            rows={[
              ['Péter 1 m-es lécének egyik darabja 4-szer akkora, mint a másik.', 'színes rudak: 1 + 4 = 5 rész', '100 cm : 5 = 20 cm és 80 cm'],
              ['30 szoba 5 és 6 ágyas, összesen 164 ágy.', 'táblázat, próbálgatás', '16 ötágyas, 14 hatágyas'],
              ['Alex, Barna, Csaba és Dániel fut, Dániel az első.', 'elágazásos rajz', '6-féle sorrend'],
              ['Gondoltam egy számra: · 3, majd + 60 → 300.', 'visszafelé: − 60, majd : 3', '80'],
              ['Ki ugrott messzebb? 2 m 8 cm, 19 dm, 179 cm', 'váltsd át cm-re!', '208 cm > 190 cm > 179 cm']
            ]}
          />
        </div>
      </TheorySection>

      <TheorySection title="4. Felesleges és hiányzó adatok" badge="TK 27. o." badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Felesleges adat" badge="ne használd!" badgeColor="indigo">
            <div className="text-sm text-slate-700 space-y-1">
              <p>Csaba egy <strong>950 Ft</strong>-os könyvet venne, amelynek hosszabbik oldala <s>21 cm</s>, rövidebb oldala <s>15 cm</s>. <strong>485 Ft</strong>-ja van. Mennyi hiányzik?</p>
              <p>950 − 485 = <strong>465</strong>. Csabának még 465 Ft-ot kell gyűjtenie. A könyv mérete felesleges adat.</p>
              <p>385 alsós közül <s>189 lány, 196 fiú</s>; 329-en mentek színházba → 385 − 329 = <strong>56</strong>-an nem mentek.</p>
            </div>
          </TheoryCard>
          <TheoryCard title="Hiányzó adat" badge="nem megoldható" badgeColor="rose">
            <div className="text-sm text-slate-700 space-y-1">
              <p>„Benedek 5 kört futott. Hány métert tett meg?” – Hiányzik: <strong>milyen hosszú egy kör</strong>.</p>
              <p>„Roland apja 2 kg almát vett. Mennyit fizetett?” – Hiányzik: <strong>mennyibe kerül 1 kg alma</strong>.</p>
              <p>Ha kiegészítjük (pl. 1 kör 400 m), már megoldható: 5 · 400 = 2000 m.</p>
            </div>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Gondolkodj, mielőtt számolsz!">
          Egy 650 literes hordóban 410 liter folyadék van. Beleöntünk még 320 litert. Mennyi lesz benne? 410 + 320 = 730 lenne – de a hordóba csak <strong>650 liter</strong> fér, a többi kifolyik!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Vigyázz! Gyakori hibák" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A párok és a közök száma"
          wrong="11 pár → 11 · 50 cm = 550 cm"
          wrongExplanation="Rajzold le: 2 pár között 1 köz van, 3 pár között 2 köz. 11 pár között csak 10 köz van!"
          correct="11 pár → 10 köz → 10 · 50 cm = 500 cm = 5 m"
          correctExplanation="Mindig rajzolj! A számegyenes megmutatja, hány köz van."
          tip="Bendegúz is ilyen hibát vétett: 10 osztálytársát hívta meg, de vele együtt 11-en voltak, ezért 22 szelet kellett volna, nem 20."
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Labor I: Lépésről lépésre" badge="Labor" badgeColor="teal">
        <p className="text-sm text-slate-600 mb-3">Válassz egy feladatot, és oldd meg a 6 lépésben! Minden lépésnél válaszd ki a jó lehetőséget.</p>
        <StepsLab />
      </TheorySection>

      <TheorySection title="7. Interaktív Labor II: Találkozás-labor" badge="Labor" badgeColor="emerald">
        <p className="text-sm text-slate-600 mb-3">Lépj percenként előre! A táblázat megmutatja, mennyit tett meg Ádám és Roland. Mikor találkoznak?</p>
        <MeetingLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WordProblems1000Theory;
