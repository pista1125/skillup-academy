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
  AngleGroupsSvg,
  SolidsVsShapesSvg,
  PolygonVennSvg,
  ShapePropertiesSvg,
  MovesOverviewSvg,
  BuildingPlanSvg,
  EXAM_FLAG,
  examPoly,
  examRotQ,
  XP
} from './ShapesExamFigures';

// ---------------------------------------------------------------------------
// Labor I: vegyes feladatsor a fejezet minden leckéjéből
// ---------------------------------------------------------------------------
type MixTask = { topic: string; q: string; ans: string; wrong: string[]; expl: string };
const MIX_TASKS: MixTask[] = [
  { topic: '1. Sokszögek', q: 'Hány átló húzható egy csúcsból a hatszögben?', ans: '3', wrong: ['6', '4', '2'], expl: 'A saját csúcsába és a két szomszédjába nem húzunk átlót: 6 − 3 = 3.' },
  { topic: '3. Testek', q: 'Hány éle van a téglatestnek?', ans: '12', wrong: ['8', '6', '9'], expl: 'Elöl 4, hátul 4 és a kettőt összekötő 4 él: 12. A rajzon 3 él takart (szaggatott)!' },
  { topic: '5. Nagyítás', q: 'Milyen lesz a 4 · 1-es téglalap háromszorosára nagyítva?', ans: '12 · 3', wrong: ['7 · 4', '12 · 1', '4 · 3'], expl: 'Minden méretet 3-mal szorzunk: 4 · 3 = 12 és 1 · 3 = 3.' },
  { topic: '7. Elforgatás', q: 'A balra mutató nyilat negyed fordulattal jobbra forgatjuk. Merre mutat?', ans: 'felfelé', wrong: ['lefelé', 'jobbra', 'balra'], expl: 'Jobbra = az óramutató irányába: a 9-es felől a 12-es felé fordul, tehát felfelé mutat.' },
  { topic: '4. Tükrözés', q: 'Egy pont 3 négyzetre van a függőleges tükörtengelytől balra. Hol lesz a tükörképe?', ans: '3 négyzetre jobbra', wrong: ['3 négyzetre balra', '6 négyzetre jobbra', 'a tengelyen'], expl: 'A tükörkép ugyanolyan messze van a tengelytől, csak a másik oldalon.' },
  { topic: '6. Eltolás', q: 'A radírt 4 cm-rel keletre, majd 6 cm-rel nyugatra toltuk. Hová került?', ans: '2 cm-rel nyugatra', wrong: ['10 cm-rel nyugatra', '2 cm-rel keletre', 'vissza a helyére'], expl: 'Ellentétes irányok: 6 − 4 = 2 cm, a nagyobbik (nyugat) irányába.' },
  { topic: '8. Tájékozódás', q: 'A sakktáblán a c3 mezőről 2 mezőt jobbra lépünk. Hová érünk?', ans: 'e3', wrong: ['c5', 'a3', 'e5'], expl: 'Jobbra a betű változik: c → d → e. A sor marad: e3.' },
  { topic: '2. A kör', q: 'A kört 4 cm-es körzőnyílással rajzoltuk. Milyen széles a kör a középpontján át?', ans: '8 cm', wrong: ['4 cm', '2 cm', '16 cm'], expl: 'A középponttól mindkét irányban 4 cm-re van a körvonal: 4 + 4 = 8 cm.' },
  { topic: '1. Sokszögek', q: 'Melyik állítás igaz?', ans: 'Minden négyzet téglalap.', wrong: ['Minden téglalap négyzet.', 'Minden síkidom sokszög.', 'A háromszögnek 1 átlója van.'], expl: 'A négyzetnek minden szöge derékszög, tehát téglalap – de nem minden téglalapnak egyenlő minden oldala.' },
  { topic: '3. Testek', q: 'Az alaprajz számai: 2, 3, 1, 2. Hány kis kockából áll az építmény?', ans: '8', wrong: ['4', '6', '9'], expl: 'Az alaprajz számai a tornyok magasságai. Összeadjuk: 2 + 3 + 1 + 2 = 8.' },
  { topic: '5. Kicsinyítés', q: 'Milyen lesz a 8 · 6-os téglalap felére kicsinyítve?', ans: '4 · 3', wrong: ['6 · 4', '4 · 6', '16 · 12'], expl: 'Minden méretet 2-vel osztunk: 8 : 2 = 4 és 6 : 2 = 3.' },
  { topic: '7. Elforgatás', q: 'Hány perc alatt tesz negyed fordulatot az óra nagymutatója?', ans: '15 perc', wrong: ['25 perc', '30 perc', '45 perc'], expl: 'Egész fordulat 60 perc, a negyede 60 : 4 = 15 perc.' },
  { topic: '4. Tükrözés', q: 'Hány szimmetriatengelye van a (nem négyzet) téglalapnak?', ans: '2', wrong: ['4', '1', '0'], expl: 'Egy vízszintes és egy függőleges. Az átlók nem szimmetriatengelyek!' },
  { topic: '8. Tájékozódás', q: 'Ezt a lépéssort követed: 2É, 3K, 2D. Hová érsz a kiindulóponthoz képest?', ans: '3 lépésre keletre', wrong: ['7 lépésre keletre', '3 lépésre nyugatra', '2 lépésre északra'], expl: 'A 2É és a 2D kiejti egymást, marad 3 lépés keletre.' }
];
// determinisztikus keverés: a helyes válasz helye feladatonként változik
const optionsFor = (t: MixTask, i: number) => {
  const all = [t.ans, ...t.wrong];
  const k = i % all.length;
  return [...all.slice(k), ...all.slice(0, k)];
};

// ---------------------------------------------------------------------------
// Labor II: melyik mozgás volt?
// ---------------------------------------------------------------------------
type MoveKind = 'mirror' | 'shift' | 'rot' | 'scale';
const MOVE_LABEL: Record<MoveKind, string> = { mirror: 'Tükrözés', shift: 'Eltolás', rot: 'Elforgatás', scale: 'Nagyítás vagy kicsinyítés' };
const MOVES: { kind: MoveKind; o: XP; ou: number; pts: XP[]; i: XP; iu: number; why: string }[] = [
  { kind: 'mirror', o: [60, 120], ou: 12, pts: EXAM_FLAG.map(([x, y]) => [-x, y] as XP), i: [200, 120], iu: 12, why: 'A zászló a rúd másik oldalára került, de ugyanúgy felfelé áll: ez tükörkép.' },
  { kind: 'shift', o: [50, 130], ou: 12, pts: EXAM_FLAG, i: [190, 90], iu: 12, why: 'Ugyanúgy áll, ugyanakkora, csak arrébb van: eltolás.' },
  { kind: 'rot', o: [120, 90], ou: 12, pts: EXAM_FLAG.map((p) => examRotQ(p, 1)), i: [120, 90], iu: 12, why: 'A tű (piros pont) körül negyed fordulattal jobbra fordult: elforgatás.' },
  { kind: 'scale', o: [60, 130], ou: 10, pts: EXAM_FLAG, i: [170, 140], iu: 20, why: 'Ugyanolyan alakú, de minden mérete kétszeres: nagyítás.' },
  { kind: 'rot', o: [150, 80], ou: 12, pts: EXAM_FLAG.map((p) => examRotQ(p, 2)), i: [150, 80], iu: 12, why: 'Fél fordulat a tű körül: lefelé mutat ÉS a zászló a másik oldalra került. (A tükrözésnél csak az egyik változna.)' },
  { kind: 'mirror', o: [140, 64], ou: 12, pts: EXAM_FLAG.map(([x, y]) => [x, -y] as XP), i: [140, 84], iu: 12, why: 'Vízszintes tükörtengelyre tükröztük: fejjel lefelé lóg, de a zászló ugyanazon az oldalon maradt.' },
  { kind: 'scale', o: [40, 140], ou: 22, pts: EXAM_FLAG, i: [210, 120], iu: 11, why: 'Ugyanolyan alakú, de minden mérete a fele: kicsinyítés.' },
  { kind: 'shift', o: [40, 110], ou: 12, pts: EXAM_FLAG, i: [220, 110], iu: 12, why: 'Egyenesen keletre toltuk, nem fordult el: eltolás.' },
  { kind: 'rot', o: [150, 100], ou: 12, pts: EXAM_FLAG.map((p) => examRotQ(p, 3)), i: [150, 100], iu: 12, why: 'Negyed fordulattal balra fordult a tű körül: elforgatás.' }
];

export const ShapesExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [tIdx, setTIdx] = useState<number>(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState<{ ok: number; all: number }>({ ok: 0, all: 0 });
  const task = MIX_TASKS[tIdx];
  const opts = optionsFor(task, tIdx);

  // Labor II
  const [mIdx, setMIdx] = useState<number>(0);
  const [mPick, setMPick] = useState<MoveKind | null>(null);
  const mv = MOVES[mIdx];

  const btn = 'min-h-[48px] px-4 rounded-xl font-bold text-sm border-2 transition active:scale-95';

  return (
    <TheoryTemplate
      topicId="g4-shapes-solids"
      subtopicId="gyakorlas-tudasproba"
      grade={4}
      chapterId="sikidomok-testek"
      title="9. Gyakorlás, tudáspróba"
      subtitle="Ismételjük át a fejezetet: síkidomok, kör, testek, tükrözés, nagyítás, eltolás, elforgatás és tájékozódás – vegyes feladatokkal!"
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • TANANYAG"
      themeColor="indigo"
      pdfFilename="4_osztaly_sikidomok_testek_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat 3 szinten az egész fejezetből!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A FEJEZET LEGFONTOSABB SZABÁLYAI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
                Tükrözés, eltolás, elforgatás: a méret nem változik. Nagyítás, kicsinyítés: az alak nem változik.
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Téglalap: minden szöge derékszög. Négyzet: olyan téglalap, amelynek minden oldala egyenlő hosszú.</li>
              <li>Téglatest és kocka: 6 lap, 12 él, 8 csúcs.</li>
              <li>Mezőkód: előbb az oszlop betűje, aztán a sor száma (G1, e4).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Amit már tudsz */}
      <TheorySection title="1. Amit már tudsz – a fejezet összefoglalása" badge="1–8. lecke" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="1. Síkidomok, sokszögek" badge="csúcs, oldal, átló" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              A sokszöget csak egyenes szakaszok határolják; ahány csúcsa, annyi oldala van. Átló: két nem szomszédos csúcsot köt össze. Szögek: derékszögnél kisebb, derékszög, derékszögnél nagyobb. Párhuzamos egyenesek sosem találkoznak.
            </p>
          </TheoryCard>
          <TheoryCard title="2. A kör" badge="középpont, körző" badgeColor="rose">
            <p className="text-sm text-slate-700">
              A kör minden pontja ugyanolyan messze van a középponttól. Körzővel rajzoljuk; nagyobb körzőnyílás nagyobb kört ad. Körvonal: a kör széle; körlap: a körvonal a belsejével együtt.
            </p>
          </TheoryCard>
          <TheoryCard title="3. A testek" badge="lap, él, csúcs" badgeColor="amber">
            <p className="text-sm text-slate-700">
              Síklapok határolják a kockát, a téglatestet, a gúlát; görbe felület a gömböt. Téglatest, kocka: 6 lap, 12 él, 8 csúcs. Az alaprajz a felülnézet, a számok a tornyok magasságai.
            </p>
          </TheoryCard>
          <TheoryCard title="4. A tükrözés" badge="tükörtengely" badgeColor="purple">
            <p className="text-sm text-slate-700">
              A tükörkép ugyanakkora, de fordított. Minden pont tükörképe ugyanolyan messze van a tengelytől, a másik oldalon. Szimmetriatengelyek: négyzet 4, téglalap 2, kör végtelen sok.
            </p>
          </TheoryCard>
          <TheoryCard title="5. Nagyítás, kicsinyítés" badge="hasonló" badgeColor="blue">
            <p className="text-sm text-slate-700">
              Minden méret ugyanannyiszorosára változik: 3 · 2 → kétszeresére 6 · 4. Az eredeti és a nagyított rajz ugyanolyan alakú, de nem ugyanakkora: hasonlók.
            </p>
          </TheoryCard>
          <TheoryCard title="6. Eltolás" badge="irány + távolság" badgeColor="orange">
            <p className="text-sm text-slate-700">
              Meg kell mondani: milyen irányban (fő- és mellékvilágtájak) és mekkora távolságra. Az alakzat nem fordul el, a mérete nem változik.
            </p>
          </TheoryCard>
          <TheoryCard title="7. Elforgatás" badge="negyed, fél fordulat" badgeColor="teal">
            <p className="text-sm text-slate-700">
              A tű helye körül forgatunk. Negyed fordulat = derékszög; jobbra = az óramutató járásával megegyezően. Háromnegyed jobbra = negyed balra.
            </p>
          </TheoryCard>
          <TheoryCard title="8. Tájékozódás" badge="G1, e4" badgeColor="cyan">
            <p className="text-sm text-slate-700">
              A mező kódja: oszlop betűje + sor száma. Sakktábla: a–h oszlopok, 1–8 sorok, 64 mező. Négyzetrácson: 3É = 3 lépés észak felé.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Nézzük meg együtt! */}
      <TheorySection title="2. Nézzük meg együtt! Vegyes feladatok" badge="Munkafüzet 43. és 47. o." badgeColor="amber">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <AngleGroupsSvg />
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                <strong>A) Mekkora szöget zárnak be a vonalak? (Ellenőrizd a tudásodat! 4. feladat)</strong>
              </p>
              <p>Tedd a derékszögű vonalzód sarkát a szög csúcsába! Ha a szög szárai pontosan a vonalzó éleire esnek, derékszög. Ha az egyik szár „belül” marad, kisebb; ha kilóg, nagyobb.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <SolidsVsShapesSvg />
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                <strong>B) Karikázd be a testek ábráját! (5. feladat)</strong>
              </p>
              <p>A testek „térbeliek”: a rajzukon látszik a mélységük, és a takart éleiket szaggatottan rajzoljuk. A négyzet, a kör és a ferde négyszög síkidom – a papír síkjában fekszik.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <PolygonVennSvg />
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                <strong>C) Halmazábra (6. feladat)</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A két kör közös részébe azok a négyszögek kerülnek, amelyeknek van párhuzamos oldalpárja: téglalap, négyzet, ferde négyszög.</li>
                <li>A hatszögnek van párhuzamos oldalpárja, de nem négyszög.</li>
                <li>A sárkány alakú négyszögnek nincs párhuzamos oldalpárja.</li>
                <li>A háromszög és ez az ötszög egyik körbe sem kerül, de sokszög.</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <ShapePropertiesSvg />
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                <strong>D) Csoportosítás három szempont szerint (Gyakorolj! 10. feladat)</strong>
              </p>
              <p>Minden síkidomnál külön-külön döntsd el: van-e derékszöge, van-e párhuzamos oldalpárja, van-e szimmetriatengelye. A négyzetnél mindhárom igaz, a ferde négyszögnél csak a párhuzamos oldalpár.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <BuildingPlanSvg />
            <div className="text-sm text-slate-700 leading-relaxed space-y-2">
              <p>
                <strong>E) Építmény és alaprajz</strong>
              </p>
              <p>Az alaprajzon minden mezőbe azt írjuk, hány kocka áll ott egymáson. A kockák száma a számok összege: 3 + 2 + 1 + 2 + 1 + 1 = 10. A takart kockákat is számold!</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. A négy mozgás */}
      <TheorySection title="3. Négy mozgás – mi változik, mi nem?" badge="5–7. lecke + 4. lecke" badgeColor="sky">
        <MovesOverviewSvg />
        <TheoryTable
          headers={['', 'Mérete', 'Alakja', 'Merre néz?', 'Mit kell megadni?']}
          rows={[
            ['Tükrözés', 'nem változik', 'nem változik', 'fordított (tükörkép)', 'a tükörtengelyt'],
            ['Eltolás', 'nem változik', 'nem változik', 'ugyanarra', 'irányt és távolságot'],
            ['Elforgatás', 'nem változik', 'nem változik', 'elfordul', 'a tű helyét, a fordulatot, az irányt'],
            ['Nagyítás, kicsinyítés', 'változik', 'nem változik', 'ugyanarra', 'hányszorosára (felére)']
          ]}
        />
      </TheorySection>

      {/* 4. Vigyázz! */}
      <TheorySection title="4. Vigyázz! Tipikus hibák a fejezetben" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ne keverd össze!"
          wrong="A téglatestnek 9 éle van – ennyit látok a rajzon. A téglalap átlója szimmetriatengely. A 3 · 2-es téglalap kétszerese 5 · 4-es."
          wrongExplanation="A rajzon 3 él takart (szaggatott), ezeket is számolni kell. Az átló mentén összehajtva a téglalap két fele nem fedi egymást. Nagyításkor szorozni kell, nem hozzáadni."
          correct="12 él; a téglalapnak 2 szimmetriatengelye van; 3 · 2 → 6 · 4"
          correctExplanation="Gondold végig minden feladatnál, melyik lecke szabálya kell hozzá!"
          tip="A térképen az 1. sor felül van, a sakktáblán alul – nézd meg, merre nőnek a számok!"
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Labor I: Vegyes feladatsor" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
              {tIdx + 1}. feladat / {MIX_TASKS.length} • {task.topic}
            </span>
            <span className="text-sm font-bold text-slate-700">
              Pontjaid: {score.ok} / {score.all}
            </span>
          </div>
          <p className="text-base font-bold text-slate-800">{task.q}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {opts.map((o) => {
              const cls =
                picked === null
                  ? 'bg-white border-slate-300 hover:bg-indigo-50'
                  : o === task.ans
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                    : o === picked
                      ? 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-white border-slate-200 opacity-60';
              return (
                <button
                  key={o}
                  onClick={() => {
                    if (picked !== null) return;
                    setPicked(o);
                    setScore((s) => ({ ok: s.ok + (o === task.ans ? 1 : 0), all: s.all + 1 }));
                  }}
                  className={`min-h-[56px] px-3 rounded-xl border-2 font-bold text-base transition active:scale-95 ${cls}`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className={`p-3 rounded-xl text-center font-bold ${picked === task.ans ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {picked === task.ans ? 'Helyes! ' : `Nem egészen, a jó válasz: ${task.ans}. `}
              {task.expl}
            </div>
          )}
          <div className="text-center">
            <button
              onClick={() => {
                setTIdx((i) => (i + 1) % MIX_TASKS.length);
                setPicked(null);
              }}
              className={`${btn} bg-indigo-600 text-white border-indigo-700 hover:bg-indigo-700`}
            >
              Következő feladat
            </button>
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Labor II: Melyik mozgás volt?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-sm text-slate-700 text-center">
            A kék zászlóból a narancssárga lett. Mi történt vele? Nézd meg, merre áll, melyik oldalon van a zászló, és mekkora!
          </p>
          <svg viewBox="0 0 300 170" className="w-full max-w-lg mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
            {Array.from({ length: 26 }, (_, i) => (
              <line key={`v${i}`} x1={i * 12} y1={0} x2={i * 12} y2={170} stroke="#e2e8f0" />
            ))}
            {Array.from({ length: 15 }, (_, i) => (
              <line key={`h${i}`} x1={0} y1={i * 12} x2={300} y2={i * 12} stroke="#e2e8f0" />
            ))}
            <polygon points={examPoly(EXAM_FLAG, mv.o[0], mv.o[1], mv.ou)} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" opacity="0.9" />
            <polygon points={examPoly(mv.pts, mv.i[0], mv.i[1], mv.iu)} fill="#fdba74" stroke="#c2410c" strokeWidth="2" opacity="0.9" />
            {mv.kind === 'rot' && <circle cx={mv.i[0]} cy={mv.i[1]} r="4.5" fill="#dc2626" />}
          </svg>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(Object.keys(MOVE_LABEL) as MoveKind[]).map((k) => {
              const cls =
                mPick === null
                  ? 'bg-white border-slate-300 hover:bg-purple-50'
                  : k === mv.kind
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                    : k === mPick
                      ? 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-white border-slate-200 opacity-60';
              return (
                <button key={k} onClick={() => mPick === null && setMPick(k)} className={`min-h-[56px] px-2 rounded-xl border-2 font-bold text-sm transition active:scale-95 ${cls}`}>
                  {MOVE_LABEL[k]}
                </button>
              );
            })}
          </div>
          {mPick !== null && (
            <div className={`p-3 rounded-xl text-center font-bold ${mPick === mv.kind ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {mPick === mv.kind ? 'Eltaláltad! ' : `Nem, ez ${MOVE_LABEL[mv.kind].toLowerCase()} volt. `}
              {mv.why}
            </div>
          )}
          <div className="text-center">
            <button
              onClick={() => {
                setMIdx((i) => (i + 1) % MOVES.length);
                setMPick(null);
              }}
              className={`${btn} bg-purple-600 text-white border-purple-700 hover:bg-purple-700`}
            >
              Következő ábra
            </button>
          </div>
          <TheoryCallout type="tip" title="Segítség">
            Ha a mérete változott: nagyítás vagy kicsinyítés. Ha ugyanúgy áll, csak arrébb van: eltolás. Ha a zászló a rúd másik oldalára került, de ugyanúgy áll: tükrözés. Ha elfordult (oldalra vagy lefelé mutat): elforgatás – kivéve, ha fejjel lefelé lóg, de a zászló ugyanazon az oldalon maradt: az tükrözés.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ShapesExamTheory;
