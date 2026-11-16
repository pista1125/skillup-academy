import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  ChapterUnitsSvg,
  MotorwayChartSvg,
  AnimalWaterSvg,
  BalloonMassSvg,
  UnitBoardGameSvg,
  BOARD,
  BOARD_TASKS
} from './MeasurementsExamFigures';

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Válaszlehetőségek egy társasjáték-mezőhöz: a helyes érték és tipikus „10-es hibák” */
const boardOptions = (ans: number, unit: string) => {
  const cands = [ans * 10, ans % 10 === 0 ? ans / 10 : ans * 100, ans * 100, ans % 100 === 0 ? ans / 100 : ans + 10];
  const uniq = Array.from(new Set(cands.filter((v) => v !== ans && v > 0))).slice(0, 3);
  return shuffle([ans, ...uniq]).map((v) => `${v} ${unit}`);
};

// ---------------------------------------------------------------------------
// Labor II: mértékegységek csoportosítása
// ---------------------------------------------------------------------------
const UNIT_CHIPS: { u: string; cat: string }[] = [
  { u: 'ml', cat: 'cap' },
  { u: 'mm', cat: 'len' },
  { u: 'kg', cat: 'mass' },
  { u: 'm', cat: 'len' },
  { u: 'cl', cat: 'cap' },
  { u: 'g', cat: 'mass' },
  { u: 'dkg', cat: 'mass' },
  { u: 'cm', cat: 'len' },
  { u: 'km', cat: 'len' },
  { u: 'dl', cat: 'cap' },
  { u: 'l', cat: 'cap' },
  { u: 'perc', cat: 'time' },
  { u: 'óra', cat: 'time' },
  { u: 'másodperc', cat: 'time' },
  { u: 'nap', cat: 'time' },
  { u: 'dm', cat: 'len' }
];
const CATS = [
  { id: 'len', name: 'hosszúság', cls: 'bg-yellow-100 border-yellow-400 text-yellow-900' },
  { id: 'mass', name: 'tömeg', cls: 'bg-green-100 border-green-400 text-green-900' },
  { id: 'cap', name: 'űrtartalom', cls: 'bg-orange-100 border-orange-400 text-orange-900' },
  { id: 'time', name: 'idő', cls: 'bg-indigo-100 border-indigo-400 text-indigo-900' }
];

export const MeasurementsExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: társasjáték
  const [pos, setPos] = useState<number>(-1);
  const [dice, setDice] = useState<number | null>(null);
  const [opts, setOpts] = useState<string[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [covered, setCovered] = useState<number>(0);
  const field = pos >= 0 && pos < BOARD.length ? BOARD[pos] : null;
  const finished = pos >= BOARD.length - 1 && picked !== null;

  const roll = () => {
    if (field && picked === null) return;
    const d = 1 + Math.floor(Math.random() * 6);
    const np = Math.min(BOARD.length - 1, pos + d);
    setDice(d);
    setPos(np);
    setPicked(null);
    setOpts(boardOptions(BOARD[np].ans, BOARD[np].unit));
  };
  const restart = () => {
    setPos(-1);
    setDice(null);
    setPicked(null);
    setCovered(0);
  };
  const answer = (o: string) => {
    if (!field || picked) return;
    setPicked(o);
    if (o === `${field.ans} ${field.unit}`) setCovered((c) => c + 1);
  };

  // Labor II: csoportosítás
  const [sel, setSel] = useState<string | null>(null);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState<string>('');
  const drop = (cat: string) => {
    if (!sel) {
      setMsg('Előbb válassz ki egy mértékegységet!');
      return;
    }
    const chip = UNIT_CHIPS.find((c) => c.u === sel);
    if (!chip) return;
    if (chip.cat === cat) {
      setPlaced((p) => ({ ...p, [sel]: cat }));
      setMsg(`Ügyes! ${sel} → ${CATS.find((c) => c.id === cat)?.name}`);
    } else {
      setMsg(`Nem egészen: ${sel} nem ide tartozik. Próbáld újra!`);
    }
    setSel(null);
  };
  const left = UNIT_CHIPS.filter((c) => !placed[c.u]);

  return (
    <TheoryTemplate
      topicId="g4-measurements"
      subtopicId="megallo"
      title="7. Megálló – tudáspróba"
      subtitle="Ismételjük át a mérések fejezetét: hosszúság, kerület, terület, tömeg, űrtartalom és idő – vegyes feladatokkal!"
      badge="4. OSZTÁLY • II. MÉRÉSEK • TANANYAG"
      themeColor="amber"
      pdfFilename="4_osztaly_meresek_megallo_tananyag.pdf"
      practiceTitle="Készen állsz a nagy tudáspróbára?"
      practiceSubtitle="90 feladat 3 szinten az egész fejezetből!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — ÁTVÁLTÁS ÉS ÖSSZEHASONLÍTÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center">
              <span className="font-mono text-sm font-black text-amber-900 dark:text-amber-200">
                1 km = 1000 m • 1 m = 100 cm • 1 kg = 100 dkg • 1 l = 10 dl • 1 óra = 60 perc
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Nagyobb egységről kisebbre: <strong>szorzunk</strong>, a szám nagyobb lesz.</li>
              <li>Összeadás, kivonás és összehasonlítás előtt <strong>azonos egységre</strong> váltunk.</li>
              <li>A kerület hosszúság (cm, m), a területet egységnégyzetekkel mérjük.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Amit már tudsz */}
      <TheorySection title="1. Amit már tudsz – a fejezet összefoglalása" badge="1–6. lecke" badgeColor="amber">
        <ChapterUnitsSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. A hosszúság mérése" badge="mm, cm, dm, m, km" badgeColor="amber">
            <p className="text-sm text-slate-700">1 m = 10 dm = 100 cm = 1000 mm, 1 km = 1000 m. Kis dolgokat mm-ben, utakat km-ben mérünk.</p>
          </TheoryCard>
          <TheoryCard title="2. A kerület mérése" badge="körbe" badgeColor="emerald">
            <p className="text-sm text-slate-700">A kerület az oldalak hosszának összege. Téglalap: a + b + a + b, négyzet: 4 · oldal.</p>
          </TheoryCard>
          <TheoryCard title="3. A terület mérése" badge="lefedés" badgeColor="sky">
            <p className="text-sm text-slate-700">Hány egység fedi le hézag és átfedés nélkül? Téglalapnál: egy sor · sorok száma.</p>
          </TheoryCard>
          <TheoryCard title="4. A tömeg mérése" badge="g, dkg, kg" badgeColor="rose">
            <p className="text-sm text-slate-700">1 kg = 100 dkg = 1000 g, 1 dkg = 10 g. Kétkarú mérleg: egyensúlyban a két oldal egyenlő.</p>
          </TheoryCard>
          <TheoryCard title="5. Az űrtartalom mérése" badge="ml, cl, dl, l" badgeColor="orange">
            <p className="text-sm text-slate-700">1 l = 10 dl = 100 cl = 1000 ml. A szomszédos egységek között 10 a váltószám.</p>
          </TheoryCard>
          <TheoryCard title="6. Az idő mérése" badge="mp, perc, óra, nap" badgeColor="indigo">
            <p className="text-sm text-slate-700">1 perc = 60 mp, 1 óra = 60 perc, 1 nap = 24 óra. Időtartam = vége − kezdete.</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Melyik egységgel mérjük? (Megálló 2. feladat)">
          egy bögre víz → <strong>dl</strong> • egy logikai lap vastagsága → <strong>mm</strong> • egy táska tömege → <strong>kg</strong> • egy tankönyv szélessége → <strong>cm</strong>
        </TheoryCallout>
      </TheorySection>

      {/* 2. Nézzük meg együtt! */}
      <TheorySection title="2. Nézzük meg együtt! Vegyes feladatok" badge="Tankönyv 67–68. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MotorwayChartSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>A) Autópályák (3. feladat).</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Csökkenő sorrend: 2127 km &gt; 1719 km &gt; 1563 km &gt; 1295 km &gt; 1186 km.</li>
              <li>Tízesre kerekítve: 2127 ≈ 2130, 1186 ≈ 1190.</li>
              <li>A különbség: 2130 − 1190 = <strong>940 km</strong>.</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="B) Málnaszörp" badge="4. a)" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az üveg: 1000 ml, benne 80 cl = 800 ml.</li>
              <li>Még kell: 1000 − 800 = 200 ml = <strong>2 dl</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Zöldségszállítók" badge="4. b)" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az egész út 700 km, eddig 180 km-t tettek meg.</li>
              <li>Még hátra van: 700 − 180 = <strong>520 km</strong>.</li>
              <li>A 220 km csak azt mondja meg, meddig tart az autópálya.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Betti fonatai" badge="4. c)" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>1000 cm : 10 cm = 100 darab szalag.</li>
              <li>100 : 3 = 33, maradék 1 → <strong>33 fonat</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <AnimalWaterSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>E) Állatok vízigénye milliliterben (5. feladat).</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>macska: 200–300 ml • galamb: 80 ml • kígyó: 50–100 ml</li>
              <li>kutya: 800 ml • liba: 800–1000 ml – a liba igényel a legtöbbet.</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <BalloonMassSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>F) A hőlégballon (7. feladat).</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>113 + 22 + 184 + 63 + 320 = 702 kg (a levegő nélkül)</li>
              <li>702 + 3000 = <strong>3702 kg</strong> az össztömeg.</li>
              <li>A léggömbben lévő levegő 3000 − 702 = 2298 kg-mal nehezebb, mint minden más együtt.</li>
            </ul>
          </div>
        </div>
        <TheoryCard title="G) Melyik mértékegység illik? – a befőzés (6. feladat)" badge="szöveg" badgeColor="amber">
          <p className="text-sm text-slate-700">
            Megmosunk 2 <strong>kg</strong> szilvát, majd 7 <strong>dl</strong>-es üvegekbe tesszük. Minden üveg tetejére 2 <strong>dkg</strong> cukrot szórunk. Egy 5 <strong>l</strong>-es edénybe állítjuk az üvegeket, és a forrástól számított 20 <strong>perc</strong>ig főzzük.
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 3. Vigyázz! */}
      <TheorySection title="3. Vigyázz! Előbb válts, aztán számolj!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Különböző egységeket adtál össze?"
          wrong="100 üveg 5 dl-es ásványvíz + 85 l szörp + 3470 dl tea = 500 + 85 + 3470 = 4055 l"
          wrongExplanation="A dl és a l nem ugyanaz! Így nem lehet összeadni a számokat."
          correct="500 dl = 50 l, 3470 dl = 347 l → 50 l + 85 l + 347 l = 482 l"
          correctExplanation="Minden mennyiséget ugyanarra az egységre váltottunk, csak azután adtuk össze."
          tip="Ugyanez igaz a hosszúságra, a tömegre és az időre is: 7 km > 700 m, mert 7 km = 7000 m."
        />
      </TheorySection>

      {/* 4. Labor I */}
      <TheorySection title="4. Labor I: Mértékegység-társasjáték" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Dobj a kockával, lépj annyit, amennyit dobtál, és oldd meg a mező feladatát! A mező színe mondja meg, mit kell csinálni. Minden jó válasz egy letakart mező.
          </p>
          <UnitBoardGameSvg active={pos >= 0 ? pos : undefined} />
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={roll}
              disabled={(!!field && picked === null) || finished}
              className="min-h-[52px] px-6 rounded-xl bg-amber-500 text-white font-bold text-lg hover:bg-amber-600 active:scale-95 transition disabled:opacity-40"
            >
              🎲 Dobok!
            </button>
            {dice !== null && <span className="text-lg font-bold text-amber-900">Dobás: {dice}</span>}
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-sm font-bold">Letakart mezők: {covered}</span>
            <button onClick={restart} className="min-h-[44px] px-4 rounded-xl bg-slate-200 text-slate-800 font-bold hover:bg-slate-300 active:scale-95 transition">
              Újra
            </button>
          </div>
          {field && (
            <div className="space-y-3">
              <div className="text-center">
                <span className="inline-block px-3 py-1 rounded-full text-white font-bold" style={{ background: BOARD_TASKS[field.color].fill }}>
                  {BOARD_TASKS[field.color].text}
                </span>
                <div className="font-mono text-3xl font-black text-slate-900 mt-2">{field.q} = ?</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {opts.map((o) => {
                  const good = o === `${field.ans} ${field.unit}`;
                  const cls = !picked
                    ? 'bg-white border-slate-300 hover:bg-amber-50'
                    : good
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                      : o === picked
                        ? 'bg-rose-100 border-rose-500 text-rose-900'
                        : 'bg-white border-slate-200 opacity-60';
                  return (
                    <button key={o} onClick={() => answer(o)} className={`min-h-[56px] rounded-xl border-2 font-mono text-xl font-bold transition active:scale-95 ${cls}`}>
                      {o}
                    </button>
                  );
                })}
              </div>
              {picked && (
                <div className={`p-3 rounded-xl text-center font-bold ${picked === `${field.ans} ${field.unit}` ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                  {picked === `${field.ans} ${field.unit}` ? 'Szuper! Letakarhatod a mezőt.' : `Nem egészen. ${field.q} = ${field.ans} ${field.unit}.`}
                  {finished && ` Célba értél! ${covered} mezőt takartál le.`}
                </div>
              )}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 5. Labor II */}
      <TheorySection title="5. Labor II: Mit mér ez a mértékegység?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">Koppints egy mértékegységre, aztán arra a dobozra, ahová tartozik! (Megálló 1. feladat)</p>
          <div className="flex flex-wrap gap-2 justify-center min-h-[56px]">
            {left.map((c) => (
              <button
                key={c.u}
                onClick={() => {
                  setSel(c.u);
                  setMsg('');
                }}
                className={`min-h-[48px] min-w-[56px] px-3 rounded-xl border-2 font-bold text-lg transition active:scale-95 ${
                  sel === c.u ? 'bg-purple-600 text-white border-purple-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-purple-50'
                }`}
              >
                {c.u}
              </button>
            ))}
            {left.length === 0 && <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold">Kész! Minden mértékegység a helyére került.</div>}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CATS.map((cat) => (
              <button key={cat.id} onClick={() => drop(cat.id)} className={`min-h-[110px] rounded-2xl border-2 p-2 text-left transition active:scale-95 ${cat.cls}`}>
                <div className="font-black text-base mb-1">{cat.name}</div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(placed)
                    .filter(([, v]) => v === cat.id)
                    .map(([u]) => (
                      <span key={u} className="px-2 py-0.5 rounded-lg bg-white/80 text-sm font-bold">{u}</span>
                    ))}
                </div>
              </button>
            ))}
          </div>
          {msg && <div className="p-3 rounded-xl text-center font-bold bg-purple-50 text-purple-900 border border-purple-200">{msg}</div>}
          <div className="text-center">
            <button
              onClick={() => {
                setPlaced({});
                setSel(null);
                setMsg('');
              }}
              className="px-5 py-3 rounded-xl bg-purple-600 text-white font-bold text-base hover:bg-purple-700 active:scale-95 transition"
            >
              Újrakezdem
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MeasurementsExamTheory;
