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
  NumberLineSvg,
  OppositesSvg,
  GrasshopperSvg,
  DiversSvg,
  NeighboursSvg,
  ScaledLineSvg,
  NumberLineGroup,
  NLJump,
  fmtNum
} from './NumberLineOppositesFigures';

/** Hová érkezik, aki a start számról a megadott lépéseket teszi? (+ jobbra, − balra) */
export const landing = (start: number, moves: number[]): number => moves.reduce((p, m) => p + m, start);

/** Egy szám ellentettje: ugyanolyan messze a 0-tól, a másik oldalon. */
export const opposite = (n: number): number => (n === 0 ? 0 : -n);

const moveText = (m: number) => (m > 0 ? `jobbra ${m}` : `balra ${-m}`);

// ---------------------------------------------------------------------------
// Labor I – Hová ugrik a szöcske?
// ---------------------------------------------------------------------------
export const HOP_TASKS: { start: number; moves: number[] }[] = [
  { start: 3, moves: [4] },
  { start: 3, moves: [-7] },
  { start: 3, moves: [6, -10] },
  { start: 0, moves: [5, -6, 1, -4] },
  { start: -4, moves: [-4, -4, 7, 10, -17] },
  { start: -6, moves: [12] }
];

const HopLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const task = HOP_TASKS[ti];
  const answer = landing(task.start, task.moves);
  const ok = pick === answer;

  const jumps: NLJump[] = [];
  if (ok) {
    let p = task.start;
    task.moves.forEach((m, i) => {
      jumps.push({ from: p, to: p + m, color: i % 2 ? '#7c3aed' : '#16a34a' });
      p += m;
    });
  }

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {HOP_TASKS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setTi(i);
              setPick(null);
            }}
            className={`w-11 h-11 rounded-xl text-sm font-black ${i === ti ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center">
        <div className="text-sm text-slate-600">A szöcske a(z) <strong>{fmtNum(task.start)}</strong> számon áll. Ugrások:</div>
        <div className="text-lg font-black text-emerald-800 mt-1">{task.moves.map(moveText).join(', majd ')}</div>
        <div className="text-sm text-slate-600 mt-1">Kattints a számegyenesen oda, ahová végül érkezik! 🦗</div>
      </div>
      <svg viewBox="0 0 340 110" className="w-full h-auto">
        <NumberLineGroup
          min={-12}
          max={10}
          y={70}
          fontSize={8}
          onPick={(v) => !ok && setPick(v)}
          highlight={pick}
          points={[{ v: task.start, label: '🦗', color: '#16a34a' }, ...(ok ? [{ v: answer, label: fmtNum(answer), color: '#f97316' }] : [])]}
          jumps={jumps}
        />
      </svg>
      {pick !== null && (
        <div className={`text-sm font-bold text-center ${ok ? 'text-emerald-700' : 'text-rose-700'}`}>
          {ok
            ? `Helyes! A szöcske a(z) ${fmtNum(answer)} számra érkezik.`
            : `A(z) ${fmtNum(pick)} nem jó. Lépj egyesével: jobbra a nagyobb, balra a kisebb számok felé!`}
        </div>
      )}
      {ok && ti === HOP_TASKS.length - 1 && (
        <TheoryCallout type="success" title="Minden ugrás kész! 🎉">
          Jobbra ugrálva nagyobb, balra ugrálva kisebb számra érkezünk – a 0-n át is!
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Keresd az ellentettjét!
// ---------------------------------------------------------------------------
const OPP_NUMS = [4, -7, 9, -2, 6, -10, 1, 0];

const OppositeLab: React.FC = () => {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [found, setFound] = useState(0);
  const n = OPP_NUMS[i];
  const ans = opposite(n);
  const ok = pick === ans;

  const click = (v: number) => {
    if (ok) return;
    setPick(v);
    if (v === ans) setFound((f) => f + 1);
  };

  return (
    <div className="bg-white border-2 border-violet-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between text-sm font-bold text-slate-600">
        <span>
          {i + 1}. / {OPP_NUMS.length} szám
        </span>
        <span>Megtalált párok: {found}</span>
      </div>
      <div className="text-center">
        <span className="text-sm text-slate-600">Hol van a(z) </span>
        <span className="text-3xl font-black text-violet-700">{fmtNum(n)}</span>
        <span className="text-sm text-slate-600"> ellentettje? Kattints rá!</span>
      </div>
      <svg viewBox="0 0 340 100" className="w-full h-auto">
        <NumberLineGroup
          min={-10}
          max={10}
          y={60}
          fontSize={8}
          onPick={click}
          highlight={pick}
          points={[{ v: n, label: fmtNum(n), color: '#7c3aed' }, ...(ok && n !== 0 ? [{ v: ans, label: fmtNum(ans), color: '#f97316' }] : [])]}
          jumps={ok && n !== 0 ? [{ from: 0, to: n, color: '#7c3aed' }, { from: 0, to: ans, color: '#f97316' }] : []}
        />
      </svg>
      {pick !== null && (
        <div className={`text-sm font-bold text-center ${ok ? 'text-emerald-700' : 'text-rose-700'}`}>
          {ok
            ? n === 0
              ? 'Ügyes! A 0 ellentettje saját maga, hiszen 0 lépésre van a 0-tól.'
              : `Ügyes! A(z) ${fmtNum(n)} és a(z) ${fmtNum(ans)} is ${Math.abs(n)} lépésre van a 0-tól, csak a két oldalán.`
            : `Ez a(z) ${fmtNum(pick)}. Számold meg, hány lépésre van a(z) ${fmtNum(n)} a 0-tól, és lépj ugyanannyit a másik irányba!`}
        </div>
      )}
      <div className="flex gap-2 justify-center">
        {ok && i < OPP_NUMS.length - 1 && (
          <button
            onClick={() => {
              setI(i + 1);
              setPick(null);
            }}
            className="px-5 h-11 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-black"
          >
            Következő →
          </button>
        )}
        <button
          onClick={() => {
            setI(0);
            setPick(null);
            setFound(0);
          }}
          className="px-4 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700"
        >
          Újrakezdem
        </button>
      </div>
    </div>
  );
};

export const NumberLineOppositesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId="g4-negatives"
      subtopicId="szamegyenes-es-ellentettek"
      title="2. Számegyenes és ellentettek"
      subtitle="A 0-tól balra a negatív, jobbra a pozitív számok. Lépegetés, számszomszédok, ellentett számok."
      badge="4. OSZTÁLY • IV. A NEGATÍV SZÁMOK • TANANYAG"
      themeColor="orange"
      pdfFilename="4_osztaly_szamegyenes_es_ellentettek_tananyag.pdf"
      practiceTitle="Készen állsz a számegyenesen való lépegetésre?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A SZÁMEGYENES',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center">
              <span className="font-mono text-base font-black text-orange-900 dark:text-orange-200">… −3 −2 −1 0 1 2 3 …</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                A 0-tól <strong>balra</strong> a negatív, <strong>jobbra</strong> a pozitív számok vannak.
              </li>
              <li>Jobbra lépve nagyobb, balra lépve kisebb számhoz jutunk.</li>
              <li>
                <strong>Ellentett számok:</strong> ugyanolyan messze vannak a 0-tól, a két oldalán (4 és −4).
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 90. o., 8. feladat" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Mona és Manó pirossal és kékkel jelölte a számegyenes pontjait. A <strong className="text-blue-700">kék</strong> pontok a 0-tól <strong>balra</strong> vannak: ezek a negatív számok (−1, −2, … −10). A <strong className="text-red-600">piros</strong> pontok a 0-tól <strong>jobbra</strong>: ezek a pozitív számok (1, 2, … 10).
            </p>
            <p>A 0 se nem negatív, se nem pozitív: ez a kezdőpont, ehhez viszonyítunk.</p>
            <TheoryCallout type="info" title="Olyan, mint a hőmérő – csak fekve">
              A hőmérőn felfelé melegebb, a számegyenesen jobbra nagyobb. A búvárok mélységét pedig egy lefelé mutató számegyenesen látjuk.
            </TheoryCallout>
          </div>
          <NumberLineSvg />
        </div>
      </TheorySection>

      {/* 2. Ellentettek */}
      <TheorySection title="2. Ellentett számok" badge="Tankönyv 90. o., 8. b)" badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <OppositesSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A 4 a 0-tól 4 lépésre van jobbra, a −4 a 0-tól 4 lépésre van balra. Az ilyen számpárokat <strong>ellentett számoknak</strong> nevezzük.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A 7 ellentettje a −7, a −7 ellentettje a 7.</li>
              <li>A −10 ellentettje a 10.</li>
              <li>A 0 ellentettje saját maga, a 0.</li>
            </ul>
            <p>Az ellentett számok úgy helyezkednek el, mintha a 0-nál tükröt tettünk volna a számegyenesre.</p>
          </div>
        </div>
      </TheorySection>

      {/* 3. Melyik számra gondoltam */}
      <TheorySection title="3. Nézzük meg együtt! Melyik számra gondoltam?" badge="Tankönyv 90. o., 11. feladat" badgeColor="indigo">
        <TheoryTable
          headers={['Feladvány', 'Így lépünk', 'Megoldás']}
          rows={[
            ['A 0-nál 5-tel nagyobb szám', '0-tól 5-öt jobbra', '5'],
            ['A 0-nál 5-tel kisebb szám', '0-tól 5-öt balra', '−5'],
            ['A 2-nél 5-tel nagyobb szám', '2-től 5-öt jobbra', '7'],
            ['A 2-nél 5-tel kisebb szám', '2-től 5-öt balra: 1, 0, −1, −2, −3', '−3'],
            ['A −10-nél eggyel kisebb', '−10-től 1-et balra', '−11'],
            ['A −10-nél eggyel nagyobb', '−10-től 1-et jobbra', '−9'],
            ['A −3 kisebb számszomszédja', 'a −3 bal szomszédja', '−4'],
            ['A −4 nagyobb számszomszédja', 'a −4 jobb szomszédja', '−3']
          ]}
        />
      </TheorySection>

      {/* 4. Szöcske */}
      <TheorySection title="4. Nézzük meg együtt! A szöcske ugrál" badge="Tankönyv 90. o., 12. feladat; Munkafüzet 84. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <GrasshopperSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>A szöcske a 3-on ül. Hová érkezik, ha</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                jobbra ugrik 4-et? 3 → 7, a <strong>7</strong>-re.
              </li>
              <li>
                balra ugrik 7-et? 3-tól a 0-ig 3 ugrás, onnan még 4: a <strong>−4</strong>-re.
              </li>
              <li>
                először jobbra 6-ot (a 9-re), majd balra 10-et? 9-től a 0-ig 9 ugrás, még 1: a <strong>−1</strong>-re.
              </li>
            </ul>
            <TheoryCard title="Hosszú lépegetés" badge="Munkafüzet 84. o., 10. feladat" badgeColor="emerald">
              <p className="text-sm text-slate-700">
                0-tól: jobbra 5 (5), balra 6 (−1), jobbra 1 (0), balra 4 (−4), balra 4 (−8), balra 4 (−12), jobbra 7 (−5), jobbra 10 (5), balra 17: <strong>−12</strong>.
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* 5. Számszomszédok */}
      <TheorySection title="5. Számszomszédok a negatív számoknál" badge="Munkafüzet 86. o., 15. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <NeighboursSvg />
          <TheoryTable
            headers={['Kisebb tízes', 'Kisebb egyes', 'Szám', 'Nagyobb egyes', 'Nagyobb tízes']}
            rows={[
              ['−20', '−16', '−15', '−14', '−10'],
              ['−40', '−38', '−37', '−36', '−30'],
              ['−30', '−30', '−29', '−28', '−20'],
              ['−50', '−42', '−41', '−40', '−40']
            ]}
          />
        </div>
      </TheorySection>

      {/* 6. Nagyobb lépések, mélységek */}
      <TheorySection title="6. Nem csak egyesével! Mélységek a számegyenesen" badge="Tankönyv 90–91. o.; Munkafüzet 85. o." badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Mennyit ér egy osztás?" badge="Tankönyv 90. o., 8. c)" badgeColor="sky">
            <ScaledLineSvg />
            <p className="text-sm text-slate-700 mt-2">
              Először nézd meg, mennyit ér egy osztás! Ha a 0 és a 100 szomszédos osztások, akkor egy lépés 100. A munkafüzetben (85. o.) egy osztás 1000 is lehet.
            </p>
          </TheoryCard>
          <TheoryCard title="Milyen mélyre merültek?" badge="Munkafüzet 85. o., 13. feladat" badgeColor="indigo">
            <DiversSvg />
            <p className="text-sm text-slate-700 mt-2">
              A víz felszíne a 0. A búvárok: A −28 m, B −8 m, C −14 m, D −23 m, E −7 m. Legközelebb a felszínhez az <strong>E</strong> búvár van.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Állatok a mélyben">
          A tankönyv 91. oldalán a kardszárnyú delfin élőhelye a vízfelszín (0 m) és −200 m között van. Az akváriumban a halak merülési mélységét centiméterben mérjük: −5 cm, −10 cm, −15 cm …
        </TheoryCallout>
      </TheorySection>

      {/* 7. Vigyázz */}
      <TheorySection title="7. Vigyázz! Melyik a kisebb szomszéd?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A −15 kisebb számszomszédja nem a −14"
          wrong="A −15 kisebb szomszédja −14, mert 14 kisebb, mint 15."
          wrongExplanation="A negatív számoknál fordítva van: a −14 a −15-től jobbra áll, tehát nagyobb."
          correct="A −15 kisebb szomszédja −16, nagyobb szomszédja −14."
          correctExplanation="A kisebb szám mindig balra van a számegyenesen. A −15-től balra a −16 áll."
          tip="Rajzold le a számegyenest, és nézd meg, melyik szám van balra!"
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Játékos labor I: Hová ugrik a szöcske?" badge="Labor" badgeColor="emerald">
        <p className="text-sm text-slate-600">Olvasd el az ugrásokat, és kattints arra a számra, ahová a szöcske végül érkezik! Ha eltaláltad, megmutatjuk az ugrásokat is.</p>
        <HopLab />
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Játékos labor II: Keresd az ellentettjét!" badge="Labor" badgeColor="violet">
        <p className="text-sm text-slate-600">Hány lépésre van a szám a 0-tól? Lépj ugyanannyit a másik irányba, és kattints oda!</p>
        <OppositeLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NumberLineOppositesTheory;
