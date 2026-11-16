import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { SpinningThingsSvg, PinTemplateSvg, TurnAmountsSvg, QuarterTurnsSvg, TracingPaperSvg, GridRotationSvg, rotQ } from './Rotation4Figures';

type Pt = [number, number];
const key = (c: number, r: number) => `${c}-${r}`;
const mod4 = (n: number) => ((n % 4) + 4) % 4;
const TURN_NAME = ['nem fordult el (vagy egész fordulat)', 'negyed fordulat jobbra', 'fél fordulat', 'háromnegyed fordulat jobbra (= negyed fordulat balra)'];

// Labor I: a zászló a tű (O) körül
const FLAG: Pt[] = [[0, 0], [0, -3], [2, -3], [2, -2], [1, -2], [1, 0]];
const RED: Pt = [2, -3];
const L1_TASKS: { text: string; q: number; showX?: boolean }[] = [
  { text: 'Forgasd el negyed fordulattal jobbra!', q: 1 },
  { text: 'Forgasd el fél fordulattal!', q: 2 },
  { text: 'Forgasd el negyed fordulattal balra!', q: 3 },
  { text: 'Forgasd el úgy, hogy a piros csúcs az X pontba kerüljön!', q: 3, showX: true },
  { text: 'Forgasd el háromnegyed fordulattal jobbra!', q: 3 },
  { text: 'Forgasd el úgy, hogy a piros csúcs az X pontba kerüljön!', q: 2, showX: true }
];

// Labor II: elforgatott kép rajzolása a négyzethálón, O a (5, 5) rácspont
const L2_TASKS: { cells: Pt[]; q: number; text: string }[] = [
  { cells: [[5, 2], [5, 3], [5, 4], [6, 2]], q: 1, text: 'negyed fordulattal jobbra' },
  { cells: [[6, 4], [7, 4], [8, 4], [8, 3]], q: 2, text: 'fél fordulattal' },
  { cells: [[2, 5], [3, 5], [3, 6], [4, 5]], q: 3, text: 'negyed fordulattal balra' },
  { cells: [[6, 6], [7, 6], [6, 7]], q: 1, text: 'negyed fordulattal jobbra' }
];
const rotCell = ([c, r]: Pt, q: number): Pt => {
  const [x, y] = rotQ([c + 0.5 - 5, r + 0.5 - 5], q);
  return [Math.round(x + 5 - 0.5), Math.round(y + 5 - 0.5)];
};

export const Rotation4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [taskIdx, setTaskIdx] = useState<number>(0);
  const [turns, setTurns] = useState<number>(0);
  const [result, setResult] = useState<boolean | null>(null);
  const task = L1_TASKS[taskIdx];
  const U1 = 22;
  const C1: Pt = [120, 120];
  const xPos = rotQ(RED, task.q);

  // Labor II
  const [l2Idx, setL2Idx] = useState<number>(0);
  const [painted, setPainted] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState<boolean>(false);
  const l2 = L2_TASKS[l2Idx];
  const orig = useMemo(() => new Set(l2.cells.map(([c, r]) => key(c, r))), [l2]);
  const target = useMemo(() => new Set(l2.cells.map((p) => rotCell(p, l2.q)).map(([c, r]) => key(c, r))), [l2]);
  const wrong = [...painted].filter((k) => !target.has(k)).length;
  const missing = [...target].filter((k) => !painted.has(k)).length;
  const U2 = 30;
  const toggle = (c: number, r: number) => {
    if (orig.has(key(c, r))) return;
    setChecked(false);
    setPainted((prev) => {
      const n = new Set(prev);
      const k = key(c, r);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  };

  const btn = 'min-h-[48px] px-4 rounded-xl font-bold text-sm border-2 transition active:scale-95';

  return (
    <TheoryTemplate
      topicId="g4-shapes-solids"
      subtopicId="elforgatas"
      grade={4}
      chapterId="sikidomok-testek"
      title="7. Elforgatás"
      subtitle="Forog a körhinta, a pörgettyű, a földgömb. Hogyan forgassunk el egy alakzatot egy pont körül, és mi változik közben?"
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • TANANYAG"
      themeColor="teal"
      pdfFilename="4_osztaly_elforgatas_tananyag.pdf"
      practiceTitle="Készen állsz a forgatós feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — AZ ELFORGATÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center">
              <span className="font-mono text-base font-black text-teal-900 dark:text-teal-200">
                Elforgatás: MI KÖRÜL (tű helye) + MENNYIVEL (negyed, fél fordulat) + MERRE (jobbra, balra)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Negyed fordulat</strong> = derékszögnyi forgatás. Fél fordulat = 2 negyed, egész fordulat = 4 negyed.
              </li>
              <li>
                <strong>Jobbra</strong> forgatunk, ha az óramutató járásával megegyező irányban forgatunk; <strong>balra</strong>, ha azzal ellentétesen.
              </li>
              <li>Elforgatás után az alakzat mérete és formája nem változik. A tű helye (amely körül forgatunk) nem mozdul el.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk? Mi a közös bennük?" badge="Tankönyv 129. o. 1. feladat" badgeColor="teal">
        <SpinningThingsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>
            A körhinta, a pörgettyű, a földgömb és a játszótéri forgó <strong>forog</strong>. Mindegyik egy pont (egy tengely) körül fordul el, miközben ugyanakkora és ugyanolyan alakú marad.
          </p>
          <p>
            Ha egy rajzot egy pont körül elfordítunk, azt <strong>elforgatásnak</strong> nevezzük.
          </p>
        </div>
      </TheorySection>

      {/* 2. Sablon gombostűvel */}
      <TheorySection title="2. Forgatás ceruzahegy és gombostű körül" badge="Tankönyv 129. o. 2. feladat" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>a)</strong> Rajzolj egy figurát egy lapra, bökd a ceruzád hegyét a lap egy pontjába, és forgasd a lapot. A figura körbe megy a ceruzahegy körül.
            </p>
            <p>
              <strong>b)</strong> Rögzíts egy sablont a szélénél egy <strong>gombostűvel</strong>! Forgasd mindig kicsit arrébb, és rajzold körbe. Virág lesz belőle!
            </p>
            <p>A gombostű helye végig ugyanott marad – ez a forgatás középpontja.</p>
          </div>
          <PinTemplateSvg />
        </div>
      </TheorySection>

      {/* 3. Fordulatok */}
      <TheorySection title="3. Negyed, fél, háromnegyed és egész fordulat" badge="Elmélet" badgeColor="amber">
        <TurnAmountsSvg />
        <TheoryTable
          headers={['Fordulat', 'Hány negyed?', 'Az óra nagymutatója', 'A szög']}
          rows={[
            ['negyed fordulat', '1', '12-től 3-ig (15 perc)', 'derékszög'],
            ['fél fordulat', '2', '12-től 6-ig (30 perc)', '2 derékszög'],
            ['háromnegyed fordulat', '3', '12-től 9-ig (45 perc)', '3 derékszög'],
            ['egész fordulat', '4', '12-től 12-ig (60 perc)', '4 derékszög – visszaér']
          ]}
        />
        <TheoryCallout type="info" title="Jobbra vagy balra?">
          <strong>Jobbra</strong> forgatunk, ha úgy fordul, mint az óramutató. <strong>Balra</strong>, ha az ellenkező irányba. Háromnegyed fordulat jobbra ugyanoda visz, mint negyed fordulat balra!
        </TheoryCallout>
      </TheorySection>

      {/* 4. Logikai lapok */}
      <TheorySection title="4. Forgasd el negyed fordulattal jobbra!" badge="Tankönyv 129. o. 3. feladat" badgeColor="emerald">
        <QuarterTurnsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Milyen szögben áll az eredetihez képest?" badge="negyed fordulat" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              Negyed fordulat után az építmény <strong>derékszögben</strong> áll az eredetihez képest: ami felfelé állt, az most jobbra mutat.
            </p>
          </TheoryCard>
          <TheoryCard title="4 negyed = egész fordulat" badge="visszaér" badgeColor="sky">
            <p className="text-sm text-slate-700">
              Ha négyszer forgatod negyed fordulattal jobbra, az építmény újra úgy áll, mint az elején.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Nézzük meg együtt! */}
      <TheorySection title="5. Nézzük meg együtt! Másolópapírral" badge="Tankönyv 129. o. 4. feladat, Munkafüzet 40. o. 4. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TracingPaperSvg />
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
            <li>Tegyél másolópapírt az ábrára, és rögzítsd egy gombostűvel a <strong>tű</strong> jelnél.</li>
            <li>Másold át a háromszöget a másolópapírra.</li>
            <li>Fordítsd el a papírt úgy, hogy a <strong>piros csúcs az X pontba</strong> kerüljön.</li>
            <li>Nézd meg: a tűtől a piros csúcsig és a tűtől az X-ig tartó szakasz <strong>derékszöget</strong> zár be – ez negyed fordulat jobbra.</li>
            <li>Megváltozott a háromszög mérete vagy formája? <strong>Nem!</strong> Csak elfordult.</li>
          </ol>
        </div>
        <GridRotationSvg />
        <TheoryCallout type="tip" title="Négyzethálón">
          A zászlót az O pont körül forgattuk. Negyed fordulat jobbra: ami felfelé mutatott, az jobbra mutat. Fél fordulat: lefelé. Háromnegyed: balra. Az O pont végig a helyén marad.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Vigyázz! */}
      <TheorySection title="6. Vigyázz! Elforgatás, eltolás vagy tükrözés?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A fél fordulat nem tükrözés!"
          wrong="A fejjel lefelé fordított zászló tükörkép, mert a rúd másik oldalára került a zászló."
          wrongExplanation="Fél fordulatnál a zászló lefelé mutat, és a másik oldalra kerül – de nem tükröztük, hanem forgattuk. A tükörképet nem lehet a lapon forgatással visszaállítani."
          correct="Fél fordulat = két negyed fordulat ugyanabba az irányba."
          correctExplanation="Ha a papírt nem fordítod meg, csak a tű körül forgatod, az mindig elforgatás. Tükrözéshez át kellene fordítani a papírt."
          tip="Eltoláskor az alakzat ugyanúgy áll, csak arrébb van. Elforgatáskor megváltozik, merre néz – de a mérete nem."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Labor I: Forgató – forgasd el a zászlót a tű körül!" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-base font-bold text-teal-900">{task.text}</p>
            <button
              onClick={() => {
                setTaskIdx((i) => (i + 1) % L1_TASKS.length);
                setTurns(0);
                setResult(null);
              }}
              className={`${btn} bg-teal-100 text-teal-900 border-teal-300 hover:bg-teal-200`}
            >
              Új feladat
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
            <svg viewBox="0 0 240 240" className="w-full max-w-sm mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
              {Array.from({ length: 11 }, (_, i) => (
                <g key={i}>
                  <line x1={C1[0] + (i - 5) * U1} y1={C1[1] - 5 * U1} x2={C1[0] + (i - 5) * U1} y2={C1[1] + 5 * U1} stroke="#e2e8f0" />
                  <line x1={C1[0] - 5 * U1} y1={C1[1] + (i - 5) * U1} x2={C1[0] + 5 * U1} y2={C1[1] + (i - 5) * U1} stroke="#e2e8f0" />
                </g>
              ))}
              <polygon
                points={FLAG.map(([x, y]) => `${C1[0] + x * U1},${C1[1] + y * U1}`).join(' ')}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="5 4"
              />
              {task.showX && (
                <text x={C1[0] + xPos[0] * U1} y={C1[1] + xPos[1] * U1 + 6} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">
                  X
                </text>
              )}
              <g
                style={{
                  transform: `rotate(${turns * 90}deg)`,
                  transformOrigin: `${C1[0]}px ${C1[1]}px`,
                  transformBox: 'view-box',
                  transition: 'transform 0.5s ease'
                }}
              >
                <polygon
                  points={FLAG.map(([x, y]) => `${C1[0] + x * U1},${C1[1] + y * U1}`).join(' ')}
                  fill={result === true ? '#86efac' : '#5eead4'}
                  fillOpacity="0.85"
                  stroke="#0f766e"
                  strokeWidth="2.5"
                />
                <circle cx={C1[0] + RED[0] * U1} cy={C1[1] + RED[1] * U1} r="6" fill="#dc2626" />
              </g>
              <circle cx={C1[0]} cy={C1[1]} r="5" fill="#0f172a" />
              <text x={C1[0] - 8} y={C1[1] + 18} textAnchor="end" fontSize="12" fontWeight="bold" fill="#0f172a">
                tű
              </text>
            </svg>
            <div className="flex md:flex-col gap-2 justify-center">
              <button
                onClick={() => {
                  setTurns((t) => t + 1);
                  setResult(null);
                }}
                className={`${btn} bg-teal-600 text-white border-teal-700 hover:bg-teal-700`}
                aria-label="negyed fordulat jobbra"
              >
                ↻ negyed jobbra
              </button>
              <button
                onClick={() => {
                  setTurns((t) => t - 1);
                  setResult(null);
                }}
                className={`${btn} bg-white text-teal-800 border-teal-400 hover:bg-teal-50`}
                aria-label="negyed fordulat balra"
              >
                ↺ negyed balra
              </button>
              <button
                onClick={() => {
                  setTurns(0);
                  setResult(null);
                }}
                className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-50`}
              >
                Vissza
              </button>
            </div>
          </div>
          <div className="text-center text-sm text-slate-700">
            Most a zászló helyzete: <strong>{TURN_NAME[mod4(turns)]}</strong>
          </div>
          <div className="text-center">
            <button onClick={() => setResult(mod4(turns) === task.q)} className={`${btn} bg-teal-600 text-white border-teal-700 hover:bg-teal-700`}>
              Ellenőrzés
            </button>
          </div>
          {result !== null && (
            <div className={`p-3 rounded-xl text-center font-bold ${result ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {result
                ? `Ügyes! Ez a helyzet: ${TURN_NAME[task.q]}. A zászló mérete és formája nem változott.`
                : `Még nem jó. A kért helyzet: ${TURN_NAME[task.q]}. Próbáld újra!`}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Labor II: Rajzold meg az elforgatott képet!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-700">
              Forgasd el a zöld alakzatot az <strong>O pont</strong> körül <strong>{l2.text}</strong>! Kattints a négyzetekre, amelyekből az elforgatott kép áll.
            </p>
            <button
              onClick={() => {
                setL2Idx((i) => (i + 1) % L2_TASKS.length);
                setPainted(new Set());
                setChecked(false);
              }}
              className={`${btn} bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200`}
            >
              Új alakzat
            </button>
          </div>
          <svg viewBox={`0 0 ${10 * U2 + 2} ${10 * U2 + 2}`} className="w-full max-w-md mx-auto h-auto bg-white rounded-xl border-2 border-emerald-300 touch-manipulation">
            {Array.from({ length: 10 }, (_, r) =>
              Array.from({ length: 10 }, (_, c) => {
                const k = key(c, r);
                const isOrig = orig.has(k);
                const on = painted.has(k);
                const should = target.has(k);
                let fill = isOrig ? '#4ade80' : on ? '#fdba74' : '#ffffff';
                if (checked && on) fill = should ? '#86efac' : '#f87171';
                return (
                  <g key={k} onClick={() => toggle(c, r)} style={{ cursor: isOrig ? 'default' : 'pointer' }}>
                    <rect x={1 + c * U2} y={1 + r * U2} width={U2} height={U2} fill={fill} stroke="#cbd5e1" />
                    {checked && !on && should && (
                      <rect x={4 + c * U2} y={4 + r * U2} width={U2 - 6} height={U2 - 6} fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
                    )}
                  </g>
                );
              })
            )}
            <circle cx={1 + 5 * U2} cy={1 + 5 * U2} r="6" fill="#dc2626" pointerEvents="none" />
            <text x={1 + 5 * U2 + 8} y={1 + 5 * U2 - 8} fontSize="14" fontWeight="bold" fill="#dc2626" pointerEvents="none">
              O
            </text>
          </svg>
          <p className="text-xs text-center text-slate-500">Tipp: képzeld el, hogy egy tű van az O pontban, és a lapot forgatod. Ami felfelé volt, negyed fordulat jobbra után jobbra kerül.</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => setChecked(true)} className={`${btn} bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700`}>
              Ellenőrzés
            </button>
            <button
              onClick={() => {
                setPainted(new Set(target));
                setChecked(true);
              }}
              className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-50`}
            >
              Mutasd a megoldást
            </button>
            <button
              onClick={() => {
                setPainted(new Set());
                setChecked(false);
              }}
              className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-50`}
            >
              Törlés
            </button>
          </div>
          {checked && (
            <div className={`p-3 rounded-xl text-center font-bold ${wrong === 0 && missing === 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {wrong === 0 && missing === 0
                ? 'Hibátlan! Az elforgatott kép ugyanakkora és ugyanolyan alakú, csak másfelé néz.'
                : `Még nem jó: ${wrong} négyzet rossz helyen van (piros), ${missing} hiányzik (szaggatott keret).`}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Rotation4Theory;
