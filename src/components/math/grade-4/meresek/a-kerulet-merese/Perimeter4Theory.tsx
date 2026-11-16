import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  WalkAroundRectSvg,
  StickPolygonsSvg,
  SwimmingPoolSvg,
  GardenPlanSvg,
  GridPerimeterSvg
} from './Perimeter4Figures';

const COLS = 8;
const ROWS = 5;
const START_CELLS = ['1-1', '2-1', '3-1', '1-2', '2-2'];

const perimeterOf = (cells: Set<string>) => {
  let p = 0;
  cells.forEach((key) => {
    const [x, y] = key.split('-').map(Number);
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ].forEach(([dx, dy]) => {
      if (!cells.has(`${x + dx}-${y + dy}`)) p += 1;
    });
  });
  return p;
};

const TARGETS = [12, 14, 16, 18, 20, 22, 24, 26];

export const Perimeter4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: négyzetrácsos kerületrajzoló
  const [cells, setCells] = useState<Set<string>>(new Set(START_CELLS));
  const [guess, setGuess] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const realP = useMemo(() => perimeterOf(cells), [cells]);

  const toggle = (key: string) => {
    setCells((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
    setChecked(false);
  };

  // Labor II: kerítésépítő
  const [a, setA] = useState<number>(4);
  const [b, setB] = useState<number>(3);
  const [targetIdx, setTargetIdx] = useState<number>(4);
  const target = TARGETS[targetIdx];
  const K = 2 * (a + b);
  const hit = K === target;

  const U = 34;
  const stepBtn = 'w-11 h-11 rounded-xl text-xl font-black bg-white border-2 border-slate-300 hover:bg-slate-100 active:scale-95 transition';

  return (
    <TheoryTemplate
      topicId="g4-measurements"
      subtopicId="a-kerulet-merese"
      title="2. A kerület mérése"
      subtitle="Mennyi kerítés kell az állatkertbe, a homokozó köré vagy a kert köré? Járjuk körbe a síkidomokat, és adjuk össze az oldalakat!"
      badge="4. OSZTÁLY • II. MÉRÉSEK • TANANYAG"
      themeColor="teal"
      pdfFilename="4_osztaly_a_kerulet_merese_tananyag.pdf"
      practiceTitle="Készen állsz a kerületes feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A KERÜLET',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center">
              <span className="font-mono text-base font-black text-teal-900 dark:text-teal-200">
                Kerület (K) = az oldalak hosszának összege
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Téglalap: <strong>K = a + b + a + b</strong> (két hosszú és két rövid oldal).
              </li>
              <li>
                Négyzet: <strong>K = 4 · a</strong> (négy egyforma oldal).
              </li>
              <li>Összeadás előtt minden oldal legyen ugyanabban a mértékegységben!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? Mi a kerület?" badge="Tankönyv 57. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Kerítsd körbe a füzetedet egy fonallal! A fonal hossza a füzet <strong>kerülete</strong>. Ugyanezt kapod, ha megméred a füzet oldalait, és <strong>összeadod</strong> őket.
            </p>
            <p>
              A kerület tehát <strong>hosszúság</strong>: mm-ben, cm-ben, m-ben vagy km-ben adjuk meg. Jele: <strong>K</strong>.
            </p>
            <p>
              Képzeld el, hogy egy katica körbesétál a téglalap szélén. Amennyit gyalogol, amíg visszaér, az a kerület.
            </p>
          </div>
          <WalkAroundRectSvg />
        </div>
        <TheoryCallout type="info" title="Négyzetrácson">
          Az állatkert terve négyzetrácson van. Ott egy kis négyzet oldala az <strong>egység</strong>. Számold meg, hány egység hosszú a kerítés az állat helye körül!
        </TheoryCallout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <GridPerimeterSvg />
          <p className="text-sm text-slate-700 leading-relaxed">
            Indulj el egy saroktól, és számold a piros vonal darabjait, amíg vissza nem érsz. Ennek az alakzatnak a kerülete <strong>14 egység</strong>. Vigyázz: a belső négyzeteket nem számoljuk, csak a határt!
          </p>
        </div>
      </TheorySection>

      {/* 2. Szabályok */}
      <TheorySection title="2. Téglalap, négyzet és egyenlő oldalú sokszögek" badge="Szabályok" badgeColor="emerald">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Téglalap" badge="a, b" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Két-két szemközti oldala egyenlő. <br />
              6 cm és 4 cm oldalú téglalap: <br />
              <strong>K = 6 + 4 + 6 + 4 = 20 cm</strong>
            </p>
          </TheoryCard>
          <TheoryCard title="Négyzet" badge="4 · a" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              Mind a négy oldala egyenlő. <br />
              5 cm oldalú négyzet: <br />
              <strong>K = 4 · 5 cm = 20 cm</strong>
            </p>
          </TheoryCard>
          <TheoryCard title="Egyenlő oldalú sokszög" badge="oldalszám ·" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              Ha minden oldal 40 mm: <br />
              háromszög 3 · 40 = 120 mm, <br />
              hatszög 6 · 40 = <strong>240 mm = 24 cm</strong>
            </p>
          </TheoryCard>
        </div>
        <StickPolygonsSvg />
        <TheoryTable
          headers={['Négyzet alakú tó oldala', 'Átváltva', 'Kerülete (4 · oldal)']}
          rows={[
            ['2 m', '2 m', '8 m'],
            ['200 cm', '2 m', '800 cm = 8 m'],
            ['2000 mm', '2 m', '8000 mm = 8 m'],
            ['2 m 50 cm', '250 cm', '1000 cm = 10 m'],
            ['2500 mm', '2 m 5 dm', '10 000 mm = 10 m']
          ]}
        />
      </TheorySection>

      {/* 3. Nézzük meg együtt! */}
      <TheorySection title="3. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <SwimmingPoolSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>A) Manó körbejárja a medencét (Tankönyv 5. feladat).</strong> A medence 33 m hosszú és 21 m széles.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Egy hosszú + egy rövid oldal: 33 m + 21 m = 54 m</li>
              <li>Ez kétszer van körben: 54 m + 54 m = <strong>108 m</strong></li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="B) Homokozók deszkakerítése" badge="Tankönyv 6. feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Négyzet, oldala 2000 mm = 2 m: K = 4 · 2 m = <strong>8 m</strong></li>
              <li>Hatszög, minden oldala 3 m: K = 6 · 3 m = <strong>18 m</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Tabló kerete" badge="Munkafüzet 5. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>500 mm és 350 mm: 500 + 350 + 500 + 350 = <strong>1700 mm</strong></li>
              <li>420 mm és 297 mm: 420 + 297 + 420 + 297 = <strong>1434 mm</strong></li>
            </ul>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <GardenPlanSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>D) A telek kerítése (Tankönyv 7. feladat).</strong> A telek 22 m × 12 m, a veteményes 5 m széles.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Egész telek: 22 + 12 + 22 + 12 = <strong>68 m</strong> drót</li>
              <li>Oszlop 2 méterenként: 68 : 2 = <strong>34 oszlop</strong> (körben ahány szakasz, annyi oszlop)</li>
              <li>Veteményes: 5 + 12 + 5 + 12 = <strong>34 m</strong></li>
              <li>Füves rész a ház körül: 22 − 5 = 17 m széles, így 17 + 12 + 17 + 12 = <strong>58 m</strong></li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 4. Vigyázz! */}
      <TheorySection title="4. Vigyázz! Mind a négy oldal számít!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Csak két oldalt adtál össze?"
          wrong="A 33 m × 21 m-es medence kerülete 33 + 21 = 54 m."
          wrongExplanation="Ez csak a körút fele! A téglalapnak négy oldala van: két hosszú és két rövid."
          correct="K = 33 + 21 + 33 + 21 = 108 m"
          correctExplanation="Járd körbe gondolatban: minden oldalt egyszer, összesen négyet."
          tip="Ne keverd a kerületet a területtel! A kerület a határ hossza (m), a terület a belsejét lefedő négyzetek száma."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Labor I: Rajzolj a négyzetrácsra!" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Kattints a négyzetekre: kiszínezed vagy letörlöd őket. Utána tippeld meg a színes alakzat kerületét egységekben, és ellenőrizd!
          </p>
          <svg viewBox={`0 0 ${COLS * U + 20} ${ROWS * U + 20}`} className="w-full max-w-md mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
            {Array.from({ length: ROWS }, (_, y) =>
              Array.from({ length: COLS }, (_, x) => {
                const key = `${x}-${y}`;
                const on = cells.has(key);
                return (
                  <rect
                    key={key}
                    x={10 + x * U}
                    y={10 + y * U}
                    width={U}
                    height={U}
                    fill={on ? '#5eead4' : '#ffffff'}
                    stroke={on ? '#0f766e' : '#cbd5e1'}
                    strokeWidth={on ? 2 : 1}
                    onClick={() => toggle(key)}
                    style={{ cursor: 'pointer' }}
                    role="button"
                    aria-label={`négyzet ${x + 1}. oszlop ${y + 1}. sor`}
                  />
                );
              })
            )}
          </svg>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm font-semibold text-slate-700">Szerintem K =</span>
            <button className={stepBtn} onClick={() => { setGuess((g) => Math.max(0, g - 1)); setChecked(false); }} aria-label="tipp csökkentése">−</button>
            <span className="w-24 text-center font-mono text-2xl font-black text-teal-700">{guess} egység</span>
            <button className={stepBtn} onClick={() => { setGuess((g) => g + 1); setChecked(false); }} aria-label="tipp növelése">+</button>
            <button
              onClick={() => setChecked(true)}
              className="px-5 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 active:scale-95 transition"
            >
              Ellenőrzöm
            </button>
          </div>
          {checked && (
            <div
              className={`p-3 rounded-xl text-center font-bold ${guess === realP ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'}`}
            >
              {cells.size === 0
                ? 'Előbb színezz ki legalább egy négyzetet!'
                : guess === realP
                  ? `Ügyes! A kerület ${realP} egység (${cells.size} négyzetből áll az alakzat).`
                  : `Még nem jó. Számold újra a határvonal darabjait – a kerület ${guess < realP ? 'több' : 'kevesebb'}.`}
            </div>
          )}
          <TheoryCallout type="tip" title="Kísérletezz!">
            Rakj ki 4 négyzetet sorban, aztán 2 × 2-es négyzetet. Ugyanannyi négyzet, mégis más a kerület (10 és 8 egység)!
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Labor II: Kerítésépítő" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              Építs olyan téglalap alakú kertet, amelynek pontosan <strong>{target} m</strong> a kerülete!
            </p>
            <button
              onClick={() => setTargetIdx((i) => (i + 3) % TARGETS.length)}
              className="px-4 py-2 rounded-xl bg-purple-100 text-purple-800 font-bold hover:bg-purple-200 active:scale-95 transition"
            >
              Új feladat
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-bold text-rose-700">hossza:</span>
              <button className={stepBtn} onClick={() => setA((v) => Math.max(1, v - 1))} aria-label="hossz csökkentése">−</button>
              <span className="w-16 text-center font-mono text-2xl font-black text-rose-700">{a} m</span>
              <button className={stepBtn} onClick={() => setA((v) => Math.min(10, v + 1))} aria-label="hossz növelése">+</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-700">szélessége:</span>
              <button className={stepBtn} onClick={() => setB((v) => Math.max(1, v - 1))} aria-label="szélesség csökkentése">−</button>
              <span className="w-16 text-center font-mono text-2xl font-black text-blue-700">{b} m</span>
              <button className={stepBtn} onClick={() => setB((v) => Math.min(6, v + 1))} aria-label="szélesség növelése">+</button>
            </div>
          </div>
          <svg viewBox="0 0 400 230" className="w-full max-w-md mx-auto h-auto bg-lime-50 rounded-xl border border-lime-200">
            <rect x="20" y="20" width={a * 36} height={b * 32} fill="#bbf7d0" stroke="#92400e" strokeWidth="4" strokeDasharray="10 4" />
            {Array.from({ length: a + 1 }, (_, i) => (
              <g key={`t${i}`}>
                <circle cx={20 + i * 36} cy="20" r="4" fill="#78350f" />
                <circle cx={20 + i * 36} cy={20 + b * 32} r="4" fill="#78350f" />
              </g>
            ))}
            {Array.from({ length: b + 1 }, (_, i) => (
              <g key={`s${i}`}>
                <circle cx="20" cy={20 + i * 32} r="4" fill="#78350f" />
                <circle cx={20 + a * 36} cy={20 + i * 32} r="4" fill="#78350f" />
              </g>
            ))}
          </svg>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-center font-mono text-lg font-bold text-slate-800">
            K = {a} + {b} + {a} + {b} = {K} m
          </div>
          <div
            className={`p-3 rounded-xl text-center font-bold ${hit ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}
          >
            {hit
              ? `Szuper! Ez a kert pontosan ${target} m kerítéssel körbekeríthető. Ha 1 méterenként áll egy oszlop, ${K} oszlop kell.`
              : K < target
                ? `Még ${target - K} m kerítés megmaradna. Legyen nagyobb a kert!`
                : `${K - target} m-rel túl hosszú lenne a kerítés. Legyen kisebb a kert!`}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Perimeter4Theory;
